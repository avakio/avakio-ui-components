import * as React from 'react';
import { useEffect, useRef, createContext, useContext, useState } from 'react';
import { createPortal } from 'react-dom';

interface PopoverContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLDivElement | null>;
}

const PopoverContext = createContext<PopoverContextType | null>(null);

export interface PopoverProps {
  children?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const Popover: React.FC<PopoverProps> = ({ children, open: controlledOpen, onOpenChange }) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement | null>(null);
  
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  
  const setOpen = (newOpen: boolean) => {
    if (!isControlled) {
      setInternalOpen(newOpen);
    }
    onOpenChange?.(newOpen);
  };

  return (
    <PopoverContext.Provider value={{ open, setOpen, triggerRef }}>
      <div className="avakio-popover-root" style={{ position: 'relative', display: 'inline-block' }}>
        {children}
      </div>
    </PopoverContext.Provider>
  );
};

export interface PopoverTriggerProps {
  asChild?: boolean;
  children?: React.ReactNode;
}

export const PopoverTrigger: React.FC<PopoverTriggerProps> = ({ children, asChild }) => {
  const context = useContext(PopoverContext);
  if (!context) return <>{children}</>;
  
  const { open, setOpen, triggerRef } = context;
  
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpen(!open);
  };

  if (asChild && React.isValidElement(children)) {
    return (
      <div ref={triggerRef} onClick={handleClick} style={{ cursor: 'pointer' }}>
        {children}
      </div>
    );
  }

  return (
    <div ref={triggerRef} onClick={handleClick} style={{ cursor: 'pointer' }}>
      {children}
    </div>
  );
};

export interface PopoverContentProps {
  className?: string;
  align?: 'start' | 'center' | 'end';
  children?: React.ReactNode;
  [key: string]: unknown;
}

export const PopoverContent: React.FC<PopoverContentProps> = ({ className, align = 'start', children, ...props }) => {
  const context = useContext(PopoverContext);
  const contentRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0, adjustedAlign: align });
  
  // Update position when open changes or on scroll/resize
  useEffect(() => {
    if (!context?.open || !context.triggerRef.current) return;
    
    const updatePosition = () => {
      const triggerRect = context.triggerRef.current?.getBoundingClientRect();
      if (!triggerRect) return;
      
      // Check if trigger is visible (not scrolled out of view)
      // If trigger is completely above or below viewport, don't show popover
      if (triggerRect.bottom < 0 || triggerRect.top > window.innerHeight) {
        return;
      }
      
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const popoverWidth = contentRef.current?.offsetWidth || 300; // Default estimate
      const popoverHeight = contentRef.current?.offsetHeight || 300;
      
      let left = triggerRect.left;
      let adjustedAlign = align;
      
      if (align === 'center') {
        left = triggerRect.left + triggerRect.width / 2;
      } else if (align === 'end') {
        left = triggerRect.right;
      }
      
      // Check if popover would extend beyond the right edge of viewport
      const rightEdge = left + popoverWidth;
      if (rightEdge > viewportWidth - 10) {
        // Not enough space on the right, align to the right edge of trigger instead
        if (align === 'start') {
          // Move left so that right edge of popover aligns with right edge of trigger
          left = Math.max(10, triggerRect.right - popoverWidth);
          adjustedAlign = 'end';
        } else if (align === 'center') {
          // Shift left to fit in viewport
          left = Math.max(10, viewportWidth - popoverWidth - 10);
          adjustedAlign = 'end';
        }
      }
      
      // Also check if popover extends beyond left edge
      if (left < 10) {
        left = 10;
        adjustedAlign = 'start';
      }
      
      // Calculate top position - position: fixed uses viewport coordinates
      // getBoundingClientRect already gives viewport-relative coordinates
      let top = triggerRect.bottom + 4;
      
      // Check if popover would extend beyond the bottom of viewport
      if (top + popoverHeight > viewportHeight - 10) {
        // Try positioning above the trigger instead
        const topAbove = triggerRect.top - popoverHeight - 4;
        if (topAbove >= 10) {
          top = topAbove;
        }
        // Otherwise keep it below but let it overflow (user can scroll)
      }
      
      setPosition({
        top,
        left,
        adjustedAlign,
      });
    };
    
    // Initial position update
    updatePosition();
    
    // Update again after a short delay to get actual popover dimensions
    const rafId = requestAnimationFrame(() => {
      updatePosition();
    });
    
    // Listen to all scroll events (including container scrolls with capture: true)
    window.addEventListener('scroll', updatePosition, true);
    window.addEventListener('resize', updatePosition);
    
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
    };
  }, [context?.open, context?.triggerRef, align]);
  
  // Handle click outside
  useEffect(() => {
    if (!context?.open) return;
    
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const isOutsideContent = contentRef.current && !contentRef.current.contains(target);
      const isOutsideTrigger = context.triggerRef.current && !context.triggerRef.current.contains(target);
      
      if (isOutsideContent && isOutsideTrigger) {
        context.setOpen(false);
      }
    };

    // Use setTimeout to avoid the click that opened the popover from immediately closing it
    const timeoutId = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
    }, 0);
    
    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [context?.open, context]);

  if (!context?.open) return null;

  const contentStyles: React.CSSProperties = {
    position: 'fixed',
    top: position.top,
    left: position.left,
    zIndex: 99999,
  };

  // Apply transform for center alignment (only if not adjusted)
  if (align === 'center' && position.adjustedAlign === 'center') {
    contentStyles.transform = 'translateX(-50%)';
  }

  // Render as portal to body to escape overflow constraints
  return createPortal(
    <div 
      ref={contentRef}
      className={className || ''}
      style={contentStyles}
      {...props}
    >
      {children}
    </div>,
    document.body
  );
};
