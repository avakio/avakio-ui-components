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
  const [position, setPosition] = useState({ top: 0, left: 0 });
  
  // Update position when open changes or on scroll/resize
  useEffect(() => {
    if (!context?.open || !context.triggerRef.current) return;
    
    const updatePosition = () => {
      const triggerRect = context.triggerRef.current?.getBoundingClientRect();
      if (!triggerRect) return;
      
      let left = triggerRect.left;
      if (align === 'center') {
        left = triggerRect.left + triggerRect.width / 2;
      } else if (align === 'end') {
        left = triggerRect.right;
      }
      
      setPosition({
        top: triggerRect.bottom + window.scrollY + 4,
        left: left + window.scrollX,
      });
    };
    
    updatePosition();
    
    window.addEventListener('scroll', updatePosition, true);
    window.addEventListener('resize', updatePosition);
    
    return () => {
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
    zIndex: 99999,
  };

  // Apply alignment-specific positioning
  if (align === 'start') {
    contentStyles.left = position.left;
  } else if (align === 'center') {
    contentStyles.left = position.left;
    contentStyles.transform = 'translateX(-50%)';
  } else if (align === 'end') {
    // Position right edge of popover at the trigger's right edge
    contentStyles.right = window.innerWidth - position.left;
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
