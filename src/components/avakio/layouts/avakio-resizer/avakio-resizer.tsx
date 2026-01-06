import React, { useRef, useState, useEffect } from 'react';
import './avakio-resizer.css';

export interface AvakioResizerProps {
  /** Direction of the resizer: horizontal for row separation, vertical for column separation */
  direction: 'horizontal' | 'vertical';
  /** Theme to apply */
  theme?: 'material' | 'flat' | 'compact' | 'dark' | 'ocean' | 'sunset';
  /** Callback when resize starts */
  onResizeStart?: () => void;
  /** Callback during resize with delta value */
  onResize?: (delta: number) => void;
  /** Callback when resize ends */
  onResizeEnd?: () => void;
  /** Additional CSS classes */
  className?: string;
  /** Inline styles */
  css?: React.CSSProperties;
  /** Minimum width */
  minWidth?: string | number;
  /** Minimum height */
  minHeight?: string | number;
  /** ID of the component */
  id?: string;
  /** Test ID for testing purposes */
  testId?: string;
  /** Whether the component is borderless */
  borderless?: boolean;
  /** Whether the component is disabled */
  disabled?: boolean;
  /** Whether the component is hidden */
  hidden?: boolean;
  /** Maximum height */
  maxHeight?: number | string;
  /** Maximum width */
  maxWidth?: number | string;
  /** Custom inline styles for the root element */
  style?: React.CSSProperties;
}

/**
 * AvakioResizer - A draggable resizer component for adjusting panel sizes
 * 
 * Place between layout items to create resizable panels:
 * - Use direction="vertical" between columns (horizontal drag)
 * - Use direction="horizontal" between rows (vertical drag)
 * 
 * @example
 * ```tsx
 * <AvakioLayout cols={[
 *   <div style={{ width: `${width}px` }}>Panel 1</div>,
 *   <AvakioResizer 
 *     direction="vertical" 
 *     onResize={(delta) => setWidth(prev => prev + delta)} 
 *   />,
 *   <div style={{ flex: 1 }}>Panel 2</div>
 * ]} />
 * ```
 */
export function AvakioResizer({
  direction,
  theme = 'material',
  onResizeStart,
  onResize,
  onResizeEnd,
  className = '',
  css,
  minWidth,
  minHeight,
  maxWidth,
  maxHeight,
  borderless = false,
  disabled = false,
  hidden = false,
  id,
  testId,
  style,
}: AvakioResizerProps) {
  const resizerRef = useRef<HTMLDivElement>(null);
  const startPosRef = useRef<number>(0);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      e.preventDefault();
      
      // Calculate delta based on direction
      const currentPos = direction === 'horizontal' ? e.clientY : e.clientX;
      const delta = currentPos - startPosRef.current;
      
      if (onResize) {
        onResize(delta);
      }
      
      // Update start position for next delta calculation
      startPosRef.current = currentPos;
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      
      if (onResizeEnd) {
        onResizeEnd();
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, direction, onResize, onResizeEnd]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Set initial position
    startPosRef.current = direction === 'horizontal' ? e.clientY : e.clientX;
    setIsDragging(true);
    
    // Set cursor for the entire document
    document.body.style.cursor = direction === 'horizontal' ? 'row-resize' : 'col-resize';
    document.body.style.userSelect = 'none';
    
    if (onResizeStart) {
      onResizeStart();
    }
  };

  const classes = [
    'avakio-resizer',
    `avakio-resizer-${direction}`,
    `avakio-resizer-theme-${theme}`,
    isDragging ? 'avakio-resizer-dragging' : '',
    borderless && 'avakio-resizer-borderless',
    disabled && 'avakio-resizer-disabled',
    hidden && 'avakio-resizer-hidden',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const containerStyle: React.CSSProperties = {
    ...css,
    ...(minWidth && { minWidth: typeof minWidth === 'number' ? `${minWidth}px` : minWidth }),
    ...(minHeight && { minHeight: typeof minHeight === 'number' ? `${minHeight}px` : minHeight }),
    ...(maxWidth && { maxWidth: typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth }),
    ...(maxHeight && { maxHeight: typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight }),
    ...(hidden && { display: 'none' }),
    ...style,
  };

  return (
    <div
      ref={resizerRef}
      id={id}
      data-testid={testId}
      className={classes}
      data-admin-theme={theme}
      onMouseDown={disabled ? undefined : handleMouseDown}
      style={containerStyle}
      role="separator"
      aria-orientation={direction === 'horizontal' ? 'horizontal' : 'vertical'}
      aria-label="Resizer"
      aria-disabled={disabled}
    >
      <div className="avakio-resizer-handle" />
    </div>
  );
}








