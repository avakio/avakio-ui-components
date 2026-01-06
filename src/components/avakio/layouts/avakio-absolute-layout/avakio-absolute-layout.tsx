import React, { forwardRef, useImperativeHandle, useRef, useState, useCallback, useEffect } from 'react';
import './avakio-absolute-layout.css';

export type AvakioAbsoluteLayoutTheme = 'material' | 'flat' | 'compact' | 'dark' | 'ocean' | 'sunset';

/**
 * Cell configuration for AbsoluteLayout
 * Each cell can be positioned absolutely using top/left/bottom/right
 * or relatively using the relative flag
 */
export interface AvakioAbsoluteLayoutCell {
  /** Unique identifier for the cell */
  id?: string;
  /** The content to render in this cell */
  content: React.ReactNode;
  /** Distance from top of container (px or %) */
  top?: number | string;
  /** Distance from left of container (px or %) */
  left?: number | string;
  /** Distance from bottom of container (px or %) */
  bottom?: number | string;
  /** Distance from right of container (px or %) */
  right?: number | string;
  /** Width of the cell (px or %) */
  width?: number | string;
  /** Height of the cell (px or %) */
  height?: number | string;
  /** Minimum width */
  minWidth?: number | string;
  /** Minimum height */
  minHeight?: number | string;
  /** Maximum width */
  maxWidth?: number | string;
  /** Maximum height */
  maxHeight?: number | string;
  /** If true, the cell takes all available space (like position: relative) */
  relative?: boolean;
  /** CSS class for this cell */
  css?: string;
  /** Z-index for stacking order */
  zIndex?: number;
  /** Whether this cell is hidden */
  hidden?: boolean;
  /** Whether this cell is disabled */
  disabled?: boolean;
  /** Batch name for showing/hiding groups of cells */
  batch?: string;
}

export interface AvakioAbsoluteLayoutProps {
  /** Unique identifier */
  id?: string;
  /** Test ID for testing */
  testId?: string;
  /** Theme to apply */
  theme?: AvakioAbsoluteLayoutTheme;
  /** Array of cells with absolute positioning configuration */
  cells: AvakioAbsoluteLayoutCell[];
  /** Width of the layout container */
  width?: number | string;
  /** Height of the layout container */
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
  /** Custom CSS class */
  css?: string;
  /** Whether the layout is initially hidden */
  hidden?: boolean;
  /** Whether the layout is disabled */
  disabled?: boolean;
  /** Initial visible batch */
  visibleBatch?: string;
  /** Background color */
  background?: string;
  /** Padding inside the container */
  padding?: number | string;
  /** Callback when a cell is clicked */
  onCellClick?: (cellId: string | undefined, cell: AvakioAbsoluteLayoutCell) => void;
  /** Callback when the layout is resized */
  onResize?: (width: number, height: number) => void;
  /** Custom inline styles for the root element */
  style?: React.CSSProperties;
}

export interface AvakioAbsoluteLayoutRef {
  /** Add a new cell to the layout */
  addView: (cell: AvakioAbsoluteLayoutCell, index?: number) => void;
  /** Remove a cell by id or index */
  removeView: (idOrIndex: string | number) => void;
  /** Get all child cells */
  getChildViews: () => AvakioAbsoluteLayoutCell[];
  /** Get the DOM node */
  getNode: () => HTMLDivElement | null;
  /** Show the layout */
  show: () => void;
  /** Hide the layout */
  hide: () => void;
  /** Check if visible */
  isVisible: () => boolean;
  /** Enable the layout */
  enable: () => void;
  /** Disable the layout */
  disable: () => void;
  /** Check if enabled */
  isEnabled: () => boolean;
  /** Resize the layout */
  resize: () => void;
  /** Show cells by batch name */
  showBatch: (batchName: string) => void;
  /** Get index of a cell by id */
  index: (cellId: string) => number;
  /** Reconstruct the layout with new cells */
  reconstruct: (cells: AvakioAbsoluteLayoutCell[]) => void;
}

// Helper to convert number/string to CSS value
const toCssValue = (value: number | string | undefined): string | undefined => {
  if (value === undefined) return undefined;
  if (typeof value === 'number') return `${value}px`;
  return value;
};

export const AvakioAbsoluteLayout = forwardRef<AvakioAbsoluteLayoutRef, AvakioAbsoluteLayoutProps>((props, ref) => {
  const {
    id,
    testId,
    theme = 'material',
    cells: initialCells,
    width,
    height,
    minWidth,
    minHeight,
    maxWidth,
    maxHeight,
    borderless = false,
    css,
    hidden: initialHidden = false,
    disabled: initialDisabled = false,
    visibleBatch: initialVisibleBatch,
    background,
    padding,
    onCellClick,
    onResize,
    style,
  } = props;

  // State
  const [cells, setCells] = useState<AvakioAbsoluteLayoutCell[]>(initialCells);
  const [isHidden, setIsHidden] = useState(initialHidden);
  const [isDisabled, setIsDisabled] = useState(initialDisabled);
  const [visibleBatch, setVisibleBatch] = useState<string | undefined>(initialVisibleBatch);
  
  // Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  // Update cells when props change
  useEffect(() => {
    setCells(initialCells);
  }, [initialCells]);

  // Setup resize observer
  useEffect(() => {
    if (!containerRef.current || !onResize) return;

    resizeObserverRef.current = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        onResize(width, height);
      }
    });

    resizeObserverRef.current.observe(containerRef.current);

    return () => {
      resizeObserverRef.current?.disconnect();
    };
  }, [onResize]);

  // Handle cell click
  const handleCellClick = useCallback((cell: AvakioAbsoluteLayoutCell) => {
    if (isDisabled || cell.disabled) return;
    onCellClick?.(cell.id, cell);
  }, [isDisabled, onCellClick]);

  // Check if cell should be visible based on batch
  const isCellVisible = useCallback((cell: AvakioAbsoluteLayoutCell): boolean => {
    if (cell.hidden) return false;
    if (!visibleBatch) return true;
    if (!cell.batch) return true;
    return cell.batch === visibleBatch;
  }, [visibleBatch]);

  // Imperative handle
  useImperativeHandle(ref, () => ({
    addView: (cell: AvakioAbsoluteLayoutCell, index?: number) => {
      setCells(prev => {
        if (index !== undefined && index >= 0 && index <= prev.length) {
          const newCells = [...prev];
          newCells.splice(index, 0, cell);
          return newCells;
        }
        return [...prev, cell];
      });
    },
    removeView: (idOrIndex: string | number) => {
      setCells(prev => {
        if (typeof idOrIndex === 'number') {
          return prev.filter((_, i) => i !== idOrIndex);
        }
        return prev.filter(c => c.id !== idOrIndex);
      });
    },
    getChildViews: () => cells,
    getNode: () => containerRef.current,
    show: () => setIsHidden(false),
    hide: () => setIsHidden(true),
    isVisible: () => !isHidden,
    enable: () => setIsDisabled(false),
    disable: () => setIsDisabled(true),
    isEnabled: () => !isDisabled,
    resize: () => {
      if (containerRef.current && onResize) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        onResize(width, height);
      }
    },
    showBatch: (batchName: string) => setVisibleBatch(batchName),
    index: (cellId: string) => cells.findIndex(c => c.id === cellId),
    reconstruct: (newCells: AvakioAbsoluteLayoutCell[]) => setCells(newCells),
  }), [cells, isHidden, isDisabled, onResize]);

  // Container styles
  const containerStyle: React.CSSProperties = {
    width: toCssValue(width),
    height: toCssValue(height),
    minWidth: toCssValue(minWidth),
    minHeight: toCssValue(minHeight),
    maxWidth: toCssValue(maxWidth),
    maxHeight: toCssValue(maxHeight),
    background,
    padding: toCssValue(padding),
    ...style,
  };

  if (isHidden) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      id={id}
      data-testid={testId}
      className={`avakio-absolute-layout avakio-absolute-layout-theme-${theme} ${borderless ? 'borderless' : ''} ${isDisabled ? 'disabled' : ''} ${css || ''}`}
      style={containerStyle}
    >
      {cells.map((cell, index) => {
        if (!isCellVisible(cell)) return null;

        const cellStyle: React.CSSProperties = cell.relative
          ? {
              position: 'relative',
              width: toCssValue(cell.width) || '100%',
              height: toCssValue(cell.height) || '100%',
              minWidth: toCssValue(cell.minWidth),
              minHeight: toCssValue(cell.minHeight),
              maxWidth: toCssValue(cell.maxWidth),
              maxHeight: toCssValue(cell.maxHeight),
              zIndex: cell.zIndex,
            }
          : {
              position: 'absolute',
              top: toCssValue(cell.top),
              left: toCssValue(cell.left),
              bottom: toCssValue(cell.bottom),
              right: toCssValue(cell.right),
              width: toCssValue(cell.width),
              height: toCssValue(cell.height),
              minWidth: toCssValue(cell.minWidth),
              minHeight: toCssValue(cell.minHeight),
              maxWidth: toCssValue(cell.maxWidth),
              maxHeight: toCssValue(cell.maxHeight),
              zIndex: cell.zIndex,
            };

        return (
          <div
            key={cell.id || index}
            className={`avakio-absolute-layout-cell ${cell.relative ? 'relative' : 'absolute'} ${cell.disabled ? 'disabled' : ''} ${cell.css || ''}`}
            style={cellStyle}
            onClick={() => handleCellClick(cell)}
            data-cell-id={cell.id}
            data-batch={cell.batch}
          >
            {cell.content}
          </div>
        );
      })}
    </div>
  );
});

AvakioAbsoluteLayout.displayName = 'AvakioAbsoluteLayout';

export default AvakioAbsoluteLayout;







