import React, { useRef, useEffect, useState, useCallback } from 'react';
import './avakio-layout.css';

export type AvakioLayoutType = 'space' | 'wide' | 'clean' | 'line' | 'head' | 'material';

export interface AvakioLayoutProps {
  /** Array of child views arranged vertically */
  rows?: React.ReactNode[];
  
  /** Array of child views arranged horizontally */
  cols?: React.ReactNode[];
  
  /** Direct children (alternative to rows/cols) */
  children?: React.ReactNode;
  
  /** Theme to apply */
  theme?: 'material' | 'flat' | 'compact' | 'dark' | 'ocean' | 'sunset';
  
  /** Custom CSS class name */
  className?: string;
  
  /** Custom CSS styles object */
  css?: React.CSSProperties;
  
  /** Width of the layout */
  width?: number | string;
  
  /** Height of the layout */
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
  
  /** Layout type (defines border style) */
  type?: AvakioLayoutType;
  
  /** Padding around content - can be a number (all sides), string, or array [top, right, bottom, left] */
  padding?: number | string | [number, number, number, number];
  
  /** Padding on X axis (left and right) */
  paddingX?: number | string;
  
  /** Padding on Y axis (top and bottom) */
  paddingY?: number | string;
  
  /** Margin around layout */
  margin?: number | string;
  
  /** Layout gravity for flexible sizing */
  gravity?: number;
  
  /** Whether the layout is initially hidden */
  hidden?: boolean;
  
  /** Whether the layout is disabled */
  disabled?: boolean;
  
  /** Enable responsive behavior */
  responsive?: boolean | string;
  
  /** ID of the layout */
  id?: string;
  
  /** Test ID for testing purposes */
  testId?: string;

  /** Custom inline styles for the root element */
  style?: React.CSSProperties;

  /** Gap between items (CSS gap property) */
  gap?: number | string;
  
  /** Alignment of items */
  align?: 'start' | 'center' | 'end' | 'stretch';
  
  /** Justify content */
  justify?: 'start' | 'center' | 'end' | 'space-between' | 'space-around' | 'space-evenly';
  
  /** Callback when window is resized (for responsive layouts) */
  onResize?: () => void;
  
  /** Enable auto-resize observer */
  autoResize?: boolean;
}

export function AvakioLayout({
  rows,
  cols,
  children,
  theme = 'material',
  className = '',
  css,
  width,
  height,
  minWidth,
  minHeight,
  maxWidth,
  maxHeight,
  borderless = false,
  type = 'space',
  padding,
  paddingX,
  paddingY,
  margin,
  gravity,
  hidden = false,
  disabled = false,
  responsive = false,
  id,
  testId,
  gap,
  align = 'stretch',
  justify = 'start',
  onResize,
  autoResize = false,
  style,
}: AvakioLayoutProps) {
  const layoutRef = useRef<HTMLDivElement>(null);
  const [responsiveMode, setResponsiveMode] = useState(false);
  
  const isRows = !!rows || (!cols && !rows);
  const items = rows || cols || [];

  // Handle responsive behavior
  const checkResponsive = useCallback(() => {
    if (!responsive || !layoutRef.current) return;
    
    const container = layoutRef.current;
    const containerWidth = container.offsetWidth;
    
    // Switch to vertical layout if width is less than 768px
    if (containerWidth < 768 && !isRows) {
      setResponsiveMode(true);
    } else {
      setResponsiveMode(false);
    }
    
    if (onResize) {
      onResize();
    }
  }, [responsive, isRows, onResize]);

  // Window resize observer
  useEffect(() => {
    if (!responsive && !autoResize) return;

    checkResponsive();
    
    const handleResize = () => {
      checkResponsive();
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [responsive, autoResize, checkResponsive]);

  // ResizeObserver for container size changes
  useEffect(() => {
    if (!autoResize || !layoutRef.current) return;

    const resizeObserver = new ResizeObserver(() => {
      checkResponsive();
    });

    resizeObserver.observe(layoutRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [autoResize, checkResponsive]);
  
  const layoutClasses = [
    'avakio-layout',
    `avakio-layout-theme-${theme}`,
    `avakio-layout-type-${type}`,
    (isRows || responsiveMode) ? 'avakio-layout-rows' : 'avakio-layout-cols',
    borderless ? 'avakio-layout-borderless' : '',
    disabled ? 'avakio-layout-disabled' : '',
    hidden ? 'avakio-layout-hidden' : '',
    responsive ? 'avakio-layout-responsive' : '',
    responsiveMode ? 'avakio-layout-responsive-active' : '',
    className,
  ].filter(Boolean).join(' ');

  const layoutStyles: React.CSSProperties = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
    minWidth: typeof minWidth === 'number' ? `${minWidth}px` : minWidth,
    minHeight: typeof minHeight === 'number' ? `${minHeight}px` : minHeight,
    maxWidth: typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth,
    maxHeight: typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight,
    margin: typeof margin === 'number' ? `${margin}px` : margin,
    gap: typeof gap === 'number' ? `${gap}px` : gap,
    alignItems: align,
    justifyContent: justify,
    flex: gravity,
    ...(css && typeof css === 'object' && !Array.isArray(css) ? css : {}),
    ...style,
  };

  // Handle padding
  if (padding !== undefined) {
    layoutStyles.padding = Array.isArray(padding) 
      ? `${padding[0]}px ${padding[1]}px ${padding[2]}px ${padding[3]}px`
      : typeof padding === 'number' ? `${padding}px` : padding;
  } else {
    if (paddingX !== undefined) {
      layoutStyles.paddingLeft = typeof paddingX === 'number' ? `${paddingX}px` : paddingX;
      layoutStyles.paddingRight = typeof paddingX === 'number' ? `${paddingX}px` : paddingX;
    }
    if (paddingY !== undefined) {
      layoutStyles.paddingTop = typeof paddingY === 'number' ? `${paddingY}px` : paddingY;
      layoutStyles.paddingBottom = typeof paddingY === 'number' ? `${paddingY}px` : paddingY;
    }
  }

  // Helper to check if a child element should flex
  const shouldItemFlex = (item: React.ReactNode): boolean => {
    if (!React.isValidElement(item)) return false;
    const props = item.props as Record<string, unknown>;
    // Check for flex in css prop or gravity prop
    if (props.gravity) return true;
    if (props.css && typeof props.css === 'object') {
      const css = props.css as Record<string, unknown>;
      if (css.flex === 1 || css.flex === '1') return true;
    }
    return false;
  };

  return (
    <div
      ref={layoutRef}
      id={id}
      data-testid={testId}
      className={layoutClasses}
      style={layoutStyles}
    >
      {items.length > 0
        ? items.map((item, index) => {
            const itemClasses = ['avakio-layout-item'];
            if (shouldItemFlex(item)) {
              itemClasses.push('avakio-layout-item-flex');
            }
            return (
              <div key={index} className={itemClasses.join(' ')}>
                {item}
              </div>
            );
          })
        : children}
    </div>
  );
}








