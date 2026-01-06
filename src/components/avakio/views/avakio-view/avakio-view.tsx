import React, { useEffect, useRef, useState, useCallback } from 'react';
import './avakio-view.css';

export interface AvakioViewProps {
  /** The content to display inside the view */
  children?: React.ReactNode;
  
  /** Custom CSS class name */
  className?: string;
  
  /** Custom CSS styles object */
  css?: React.CSSProperties;
  
  /** Width of the view */
  width?: number | string;
  
  /** Height of the view */
  height?: number | string;
  
  /** Minimum width */
  minWidth?: number | string;
  
  /** Minimum height */
  minHeight?: number | string;
  
  /** Maximum width */
  maxWidth?: number | string;
  
  /** Maximum height */
  maxHeight?: number | string;
  
  /** Whether to remove borders */
  borderless?: boolean;
  
  /** Whether the view is initially hidden */
  hidden?: boolean;
  
  /** Whether the view is disabled */
  disabled?: boolean;
  
  /** View gravity for flexible layouts */
  gravity?: number;
  
  /** ID of the view */
  id?: string;
  
  /** Test ID for testing purposes */
  testId?: string;
  
  /** Animation type for showing/hiding */
  animate?: boolean | 'fade' | 'slide' | 'flip';
  
  /** Container element or selector */
  container?: string | HTMLElement;
  
  /** Padding inside the view - can be a number (all sides), string, or array [top, right, bottom, left] */
  padding?: number | string | [number, number, number, number];
  
  /** Theme to apply */
  theme?: 'material' | 'flat' | 'compact' | 'dark' | 'ocean' | 'sunset';
  
  /** View type (header, section, clean) */
  type?: 'header' | 'section' | 'clean';
  
  /** Event handlers */
  onShow?: () => void;
  onHide?: () => void;
  onResize?: (width: number, height: number) => void;
  onClick?: (e: React.MouseEvent) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onKeyPress?: (e: React.KeyboardEvent) => void;
  /** Custom inline styles for the root element */
  style?: React.CSSProperties;
}

export function AvakioView({
  children,
  className = '',
  css,
  width,
  height,
  minWidth,
  minHeight,
  maxWidth,
  maxHeight,
  borderless = false,
  hidden = false,
  disabled = false,
  gravity,
  id,
  testId,
  animate = false,
  padding,
  theme = 'material',
  type = 'clean',
  onShow,
  onHide,
  onResize,
  onClick,
  onFocus,
  onBlur,
  onKeyPress,
  style,
}: AvakioViewProps) {
  const viewRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(!hidden);
  const [isEnabled, setIsEnabled] = useState(!disabled);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Handle visibility
  useEffect(() => {
    setIsVisible(!hidden);
  }, [hidden]);

  // Handle disabled state
  useEffect(() => {
    setIsEnabled(!disabled);
  }, [disabled]);

  // Resize observer
  useEffect(() => {
    if (!viewRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setDimensions({ width, height });
        if (onResize) {
          onResize(width, height);
        }
      }
    });

    resizeObserver.observe(viewRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [onResize]);

  // Show/hide callbacks
  useEffect(() => {
    if (isVisible && onShow) {
      onShow();
    } else if (!isVisible && onHide) {
      onHide();
    }
  }, [isVisible, onShow, onHide]);

  // Public methods via ref (can be exposed if needed)
  const show = useCallback(() => {
    setIsVisible(true);
  }, []);

  const hide = useCallback(() => {
    setIsVisible(false);
  }, []);

  const enable = useCallback(() => {
    setIsEnabled(true);
  }, []);

  const disable = useCallback(() => {
    setIsEnabled(false);
  }, []);

  const resize = useCallback((newWidth?: number | string, newHeight?: number | string) => {
    if (viewRef.current) {
      if (newWidth) viewRef.current.style.width = typeof newWidth === 'number' ? `${newWidth}px` : newWidth;
      if (newHeight) viewRef.current.style.height = typeof newHeight === 'number' ? `${newHeight}px` : newHeight;
    }
  }, []);

  // Build inline styles
  const inlineStyles: React.CSSProperties = {
    ...(css && typeof css === 'object' && !Array.isArray(css) ? css : {}),
    ...(typeof width !== 'undefined' && { width: typeof width === 'number' ? `${width}px` : width }),
    ...(typeof height !== 'undefined' && { height: typeof height === 'number' ? `${height}px` : height }),
    ...(typeof minWidth !== 'undefined' && { minWidth: typeof minWidth === 'number' ? `${minWidth}px` : minWidth }),
    ...(typeof minHeight !== 'undefined' && { minHeight: typeof minHeight === 'number' ? `${minHeight}px` : minHeight }),
    ...(typeof maxWidth !== 'undefined' && { maxWidth: typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth }),
    ...(typeof maxHeight !== 'undefined' && { maxHeight: typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight }),
    ...(typeof padding !== 'undefined' && { 
      padding: Array.isArray(padding) 
        ? `${padding[0]}px ${padding[1]}px ${padding[2]}px ${padding[3]}px`
        : typeof padding === 'number' ? `${padding}px` : padding 
    }),
    ...(typeof gravity !== 'undefined' && { flex: gravity }),
    ...style,
  };

  // Build class names
  const getAnimationClass = () => {
    if (!animate) return '';
    if (animate === true) return 'avakio-view-animate-fade';
    if (animate === 'fade') return 'avakio-view-animate-fade';
    if (animate === 'slide') return 'avakio-view-animate-slide';
    if (animate === 'flip') return 'avakio-view-animate-flip';
    return '';
  };

  const classNames = [
    'avakio-view',
    `avakio-view-theme-${theme}`,
    type ? `avakio-view-type-${type}` : '',
    borderless ? 'avakio-view-borderless' : '',
    !isVisible ? 'avakio-view-hidden' : '',
    !isEnabled ? 'avakio-view-disabled' : '',
    getAnimationClass(),
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // Handle focus
  const handleFocus = useCallback(() => {
    if (onFocus && isEnabled) {
      onFocus();
    }
  }, [onFocus, isEnabled]);

  const handleBlur = useCallback(() => {
    if (onBlur && isEnabled) {
      onBlur();
    }
  }, [onBlur, isEnabled]);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      if (onClick && isEnabled) {
        onClick(e);
      }
    },
    [onClick, isEnabled]
  );

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent) => {
      if (onKeyPress && isEnabled) {
        onKeyPress(e);
      }
    },
    [onKeyPress, isEnabled]
  );

  if (!isVisible) {
    return null;
  }

  return (
    <div
      ref={viewRef}
      id={id}
      data-testid={testId}
      className={classNames}
      style={inlineStyles}
      onClick={handleClick}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyDown={handleKeyPress}
      tabIndex={isEnabled ? 0 : -1}
      role="region"
      aria-disabled={!isEnabled}
    >
      {children}
    </div>
  );
}

// Export a version with imperative handle for advanced usage
export interface AvakioViewHandle {
  show: () => void;
  hide: () => void;
  enable: () => void;
  disable: () => void;
  resize: (width?: number | string, height?: number | string) => void;
  getNode: () => HTMLDivElement | null;
  isVisible: () => boolean;
  isEnabled: () => boolean;
}

export const AvakioViewWithRef = React.forwardRef<AvakioViewHandle, AvakioViewProps>(
  (props, ref) => {
    const viewRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(!props.hidden);
    const [isEnabled, setIsEnabled] = useState(!props.disabled);

    React.useImperativeHandle(ref, () => ({
      show: () => setIsVisible(true),
      hide: () => setIsVisible(false),
      enable: () => setIsEnabled(true),
      disable: () => setIsEnabled(false),
      resize: (newWidth?: number | string, newHeight?: number | string) => {
        if (viewRef.current) {
          if (newWidth) viewRef.current.style.width = typeof newWidth === 'number' ? `${newWidth}px` : newWidth;
          if (newHeight) viewRef.current.style.height = typeof newHeight === 'number' ? `${newHeight}px` : newHeight;
        }
      },
      getNode: () => viewRef.current,
      isVisible: () => isVisible,
      isEnabled: () => isEnabled,
    }));

    return <AvakioView {...props} hidden={!isVisible} disabled={!isEnabled} />;
  }
);

AvakioViewWithRef.displayName = 'AvakioViewWithRef';








