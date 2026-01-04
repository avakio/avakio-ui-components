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
  /** ID of the component */
  id?: string;
  /** Test ID for testing purposes */
  testId?: string;
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
  id,
  testId,
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
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      ref={resizerRef}
      id={id}
      data-testid={testId}
      className={classes}
      data-admin-theme={theme}
      onMouseDown={handleMouseDown}
      style={css}
      role="separator"
      aria-orientation={direction === 'horizontal' ? 'horizontal' : 'vertical'}
      aria-label="Resizer"
    >
      <div className="avakio-resizer-handle" />
    </div>
  );
}








