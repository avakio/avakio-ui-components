import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import './avakio-tabbar.css';

export interface AvakioTabBarOption {
  id: string | number;
  label: string;
  icon?: React.ReactNode;
  badge?: string | number;
  close?: boolean;
  disabled?: boolean;
  hidden?: boolean;
  ariaControls?: string;
}

export type AvakioTabBarAlign = 'left' | 'center' | 'justify';
export type AvakioTabBarType = 'top' | 'bottom';
export type AvakioTabBarSize = 'md' | 'sm';

export interface AvakioTabBarProps {
  id?: string;
  value?: string | number | null;
  options?: AvakioTabBarOption[];
  onChange?: (value: string | number | null, option?: AvakioTabBarOption | null) => void;
  onClose?: (value: string | number, option?: AvakioTabBarOption) => void;
  renderTab?: (option: AvakioTabBarOption, isActive: boolean, closeButton: React.ReactNode) => React.ReactNode;
  align?: AvakioTabBarAlign;
  type?: AvakioTabBarType;
  closable?: boolean;
  fill?: boolean;
  size?: AvakioTabBarSize;
  scrollable?: boolean;
  label?: string;
  labelWidth?: number;
  labelAlign?: 'left' | 'right';
  required?: boolean;
  error?: string;
  disabled?: boolean;
  className?: string;
  /** Test ID for testing purposes */
  testId?: string;
  /** Padding (number for all sides, string for CSS, or [top, right, bottom, left]) */
  padding?: string | number | [number, number, number, number];
  /** Margin (number for all sides, string for CSS, or [top, right, bottom, left]) */
  margin?: string | number | [number, number, number, number];
  /** Minimum width */
  minWidth?: string | number;
  /** Minimum height */
  minHeight?: string | number;
  /** Whether the component is borderless */
  borderless?: boolean;
  /** Whether the component is hidden */
  hidden?: boolean;
  /** Maximum height */
  maxHeight?: number | string;
  /** Maximum width */
  maxWidth?: number | string;
}

export function AvakioTabBar({
  id,
  value,
  options = [],
  onChange,
  onClose,
  renderTab,
  align = 'left',
  type = 'top',
  closable = false,
  fill = false,
  size = 'md',
  scrollable = true,
  label,
  labelWidth = 120,
  labelAlign = 'left',
  required = false,
  error,
  disabled = false,
  className = '',
  testId,
  padding,
  margin,
  minWidth,
  minHeight,
}: AvakioTabBarProps) {
  const [internalValue, setInternalValue] = useState<string | number | null>(value ?? null);
  const [closedIds, setClosedIds] = useState<Set<string | number>>(new Set());
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const trackRef = useRef<HTMLDivElement>(null);

  // Normalize options and filter hidden/closed ones
  const visibleOptions = useMemo(() => {
    return options
      .filter((opt) => !opt.hidden)
      .filter((opt) => !closedIds.has(opt.id));
  }, [options, closedIds]);

  // Resolve controlled vs uncontrolled value
  const currentValue = value !== undefined ? value : internalValue;

  // Ensure we always point to an existing tab
  useEffect(() => {
    if (value !== undefined) return;
    const exists = visibleOptions.some((opt) => opt.id === internalValue && !opt.disabled);
    if (!exists) {
      const fallback = visibleOptions.find((opt) => !opt.disabled)?.id ?? null;
      setInternalValue(fallback);
    }
  }, [visibleOptions, internalValue, value]);

  // Mirror controlled value into internal state for focus management
  useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value ?? null);
    }
  }, [value]);

  // Check if scroll arrows should be visible
  const checkScrollButtons = useCallback(() => {
    const track = trackRef.current;
    if (!track || !scrollable) {
      setCanScrollLeft(false);
      setCanScrollRight(false);
      return;
    }
    
    const { scrollLeft, scrollWidth, clientWidth } = track;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
  }, [scrollable]);

  // Update scroll buttons on mount, resize, and when options change
  useEffect(() => {
    checkScrollButtons();
    
    const track = trackRef.current;
    if (track) {
      track.addEventListener('scroll', checkScrollButtons);
      
      // Use ResizeObserver to detect size changes
      const resizeObserver = new ResizeObserver(checkScrollButtons);
      resizeObserver.observe(track);
      
      return () => {
        track.removeEventListener('scroll', checkScrollButtons);
        resizeObserver.disconnect();
      };
    }
  }, [checkScrollButtons, visibleOptions]);

  // Scroll handlers
  const scrollLeft = () => {
    const track = trackRef.current;
    if (track) {
      track.scrollBy({ left: -150, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    const track = trackRef.current;
    if (track) {
      track.scrollBy({ left: 150, behavior: 'smooth' });
    }
  };

  const setTabRef = (index: number, el: HTMLButtonElement | null) => {
    tabRefs.current[index] = el;
  };

  const focusTabById = (id: string | number | null) => {
    if (id === null || id === undefined) return;
    const idx = visibleOptions.findIndex((opt) => opt.id === id);
    if (idx >= 0) {
      tabRefs.current[idx]?.focus();
    }
  };

  const selectTab = (option: AvakioTabBarOption | undefined | null) => {
    if (!option || option.disabled || disabled) return;
    if (value === undefined) {
      setInternalValue(option.id);
    }
    onChange?.(option.id, option);
  };

  const handleClose = (option: AvakioTabBarOption, event?: React.MouseEvent) => {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    if (option.disabled || disabled) return;

    setClosedIds((prev) => {
      const next = new Set(prev);
      next.add(option.id);
      return next;
    });

    onClose?.(option.id, option);

    // Move selection if we closed the active tab in uncontrolled mode
    if (value === undefined && currentValue === option.id) {
      const remaining = visibleOptions.filter((opt) => opt.id !== option.id && !opt.disabled);
      const nextActive = remaining[0]?.id ?? null;
      setInternalValue(nextActive);
      requestAnimationFrame(() => focusTabById(nextActive));
    }
  };

  const moveFocus = (direction: 'next' | 'prev' | 'first' | 'last') => {
    if (!visibleOptions.length) return;
    const enabled = visibleOptions.filter((opt) => !opt.disabled);
    if (!enabled.length) return;

    const currentIdx = enabled.findIndex((opt) => opt.id === currentValue);
    const safeIdx = currentIdx === -1 ? 0 : currentIdx;

    let target: AvakioTabBarOption;
    switch (direction) {
      case 'next':
        target = enabled[(safeIdx + 1) % enabled.length];
        break;
      case 'prev':
        target = enabled[(safeIdx - 1 + enabled.length) % enabled.length];
        break;
      case 'first':
        target = enabled[0];
        break;
      case 'last':
        target = enabled[enabled.length - 1];
        break;
    }

    selectTab(target);
    focusTabById(target.id);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        e.preventDefault();
        moveFocus('next');
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        e.preventDefault();
        moveFocus('prev');
        break;
      case 'Home':
        e.preventDefault();
        moveFocus('first');
        break;
      case 'End':
        e.preventDefault();
        moveFocus('last');
        break;
      case 'Delete':
      case 'Backspace':
        if (closable) {
          const active = visibleOptions.find((opt) => opt.id === currentValue);
          if (active) {
            e.preventDefault();
            handleClose(active);
          }
        }
        break;
    }
  };

  // Handle padding
  const paddingStyle = padding
    ? typeof padding === 'number'
      ? `${padding}px`
      : Array.isArray(padding)
      ? `${padding[0]}px ${padding[1]}px ${padding[2]}px ${padding[3]}px`
      : padding
    : undefined;

  // Handle margin
  const marginStyle = margin
    ? typeof margin === 'number'
      ? `${margin}px`
      : Array.isArray(margin)
      ? `${margin[0]}px ${margin[1]}px ${margin[2]}px ${margin[3]}px`
      : margin
    : undefined;

  const containerStyle: React.CSSProperties = {
    ...(paddingStyle && { padding: paddingStyle }),
    ...(marginStyle && { margin: marginStyle }),
  };

  return (
    <div
      id={id}
      data-testid={testId}
      className={`avakio-tabbar ${className}`.trim()}
      style={containerStyle}
      data-type={type}
      data-align={align}
      data-size={size}
      data-fill={fill}
      data-disabled={disabled}
      data-error={!!error}
    >
      {label && (
        <div
          className="avakio-tabbar-label"
          style={{ width: labelWidth, textAlign: labelAlign }}
        >
          <span>{label}</span>
          {required && <span className="avakio-tabbar-required">*</span>}
        </div>
      )}

      <div className="avakio-tabbar-wrapper">
        {/* Left scroll arrow */}
        {scrollable && canScrollLeft && (
          <button
            type="button"
            className="avakio-tabbar-scroll-btn avakio-tabbar-scroll-left"
            onClick={scrollLeft}
            aria-label="Scroll tabs left"
          >
            <ChevronLeft size={16} strokeWidth={2.5} />
          </button>
        )}

        <div
          ref={trackRef}
          className="avakio-tabbar-track"
          role="tablist"
          aria-label={label || 'Tab Bar'}
          data-scrollable={scrollable}
          data-has-scroll-left={canScrollLeft}
          data-has-scroll-right={canScrollRight}
          onKeyDown={handleKeyDown}
        >
          {visibleOptions.map((option, index) => {
            const isActive = option.id === currentValue;
            const isDisabled = disabled || option.disabled;
            const showClose = (option.close || closable) && !isDisabled;

            const closeButton = showClose ? (
              <button
                type="button"
                className="avakio-tabbar-close"
                aria-label={`Close ${option.label}`}
                onClick={(e) => handleClose(option, e)}
              >
                <X size={14} strokeWidth={2.5} />
              </button>
            ) : null;

            const defaultContent = (
              <>
                <span className="avakio-tabbar-inner">
                  {option.icon && <span className="avakio-tabbar-icon">{option.icon}</span>}
                  <span className="avakio-tabbar-text">{option.label}</span>
                  {option.badge !== undefined && (
                    <span className="avakio-tabbar-badge">{option.badge}</span>
                  )}
                </span>
                {closeButton}
              </>
            );

            const tabContent = renderTab
              ? renderTab(option, isActive, closeButton)
              : defaultContent;

            return (
              <div
                key={option.id}
                ref={(el) => setTabRef(index, el as unknown as HTMLButtonElement)}
                className={`avakio-tabbar-tab${isActive ? ' active' : ''}`}
                role="tab"
                aria-selected={isActive}
                aria-controls={option.ariaControls}
                tabIndex={isActive && !isDisabled ? 0 : -1}
                onClick={() => selectTab(option)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    selectTab(option);
                  }
                }}
                aria-disabled={isDisabled}
                data-active={isActive}
                data-disabled={isDisabled}
              >
                {tabContent}
              </div>
            );
          })}
        </div>

        {/* Right scroll arrow */}
        {scrollable && canScrollRight && (
          <button
            type="button"
            className="avakio-tabbar-scroll-btn avakio-tabbar-scroll-right"
            onClick={scrollRight}
            aria-label="Scroll tabs right"
          >
            <ChevronRight size={16} strokeWidth={2.5} />
          </button>
        )}

        {error && <div className="avakio-tabbar-error">{error}</div>}
      </div>
    </div>
  );
}











