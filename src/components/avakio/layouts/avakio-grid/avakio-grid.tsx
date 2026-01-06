import React, { forwardRef, useImperativeHandle, useState, useRef, useEffect, useMemo, useCallback } from 'react';
import './avakio-grid.css';

export type AvakioGridTheme = 'material' | 'flat' | 'compact' | 'dark' | 'ocean' | 'sunset';

/**
 * Cell configuration for AvakioGrid
 * x, y: Grid position (0-indexed)
 * dx, dy: Cell span (width/height in grid units)
 */
export interface AvakioGridCell {
  /** Unique identifier for the cell */
  id: string;
  /** Whether this cell can be dragged when grid dragging is enabled */
  draggable?: boolean;
  /** Content to display in the cell */
  content?: React.ReactNode;
  /** Template string or function */
  template?: string | ((cell: AvakioGridCell) => React.ReactNode);
  /** X position in grid (0-indexed) */
  x: number;
  /** Y position in grid (0-indexed) */
  y: number;
  /** Width in grid units (default: 1) */
  dx?: number;
  /** Height in grid units (default: 1) */
  dy?: number;
  /** Fixed height for this cell in pixels (overrides grid calculation) */
  height?: number;
  /** Custom CSS class for the cell */
  cssClass?: string;
  /** Custom inline styles */
  css?: React.CSSProperties;
  /** Whether the cell is hidden */
  hidden?: boolean;
  /** Whether the cell is disabled */
  disabled?: boolean;
  /** Additional data attached to cell */
  data?: Record<string, any>;
}

export interface AvakioGridProps {
  /** Unique identifier */
  id?: string;
  /** Test ID for testing */
  testId?: string;
  /** Number of columns in the grid */
  gridColumns?: number;
  /** Number of rows in the grid */
  gridRows?: number;
  /** Fixed cell width in pixels (auto-calculated if not set) */
  cellWidth?: number;
  /** Fixed cell height in pixels (auto-calculated if not set) */
  cellHeight?: number;
  /** Array of cell configurations */
  cells: AvakioGridCell[];
  /** Theme to apply */
  theme?: AvakioGridTheme;
  /** Margin between cells in pixels */
  cellMargin?: number;
  /** Margin around the grid container in pixels */
  margin?: number;
  /** Padding around the grid - can be a number (all sides) or array [top, right, bottom, left] */
  padding?: number | [number, number, number, number];
  /** Horizontal padding */
  paddingX?: number;
  /** Vertical padding */
  paddingY?: number;
  /** Width of the grid container */
  width?: number | string;
  /** Height of the grid container */
  height?: number | string;
  /** Minimum width */
  minWidth?: number | string;
  /** Minimum height */
  minHeight?: number | string;
  /** Remove container/view borders */
  borderless?: boolean;
  /** Remove cell borders */
  cellBorderless?: boolean;
  /** Custom CSS class */
  className?: string;
  /** Custom inline styles */
  css?: React.CSSProperties;
  /** Whether the grid is hidden */
  hidden?: boolean;
  /** Whether the grid is disabled */
  disabled?: boolean;
  /** Auto-place new views vertically */
  autoplace?: boolean;
  /** Factory function to create cell content */
  factory?: (cell: AvakioGridCell) => React.ReactNode;
  /** Callback when cells change */
  onChange?: (cells: AvakioGridCell[]) => void;
  /** Callback when a cell is clicked */
  onCellClick?: (cell: AvakioGridCell) => void;
  /** Enable drag and drop functionality for cells */
  isDraggable?: boolean;
  /** Callback when drag starts */
  onDragStart?: (cell: AvakioGridCell) => void;
  /** Callback when drag ends */
  onDragEnd?: (cell: AvakioGridCell, newPosition: { x: number; y: number }) => void;
  /** Custom inline styles for the root element */
  style?: React.CSSProperties;
}

export interface AvakioGridRef {
  /** Add a new cell to the grid */
  addView: (cell: AvakioGridCell, index?: number) => void;
  /** Remove a cell by ID */
  removeView: (id: string) => void;
  /** Move/resize a cell */
  moveView: (id: string, position: { x?: number; y?: number; dx?: number; dy?: number }) => void;
  /** Clear all cells */
  clearAll: () => void;
  /** Get all cells */
  getCells: () => AvakioGridCell[];
  /** Get a cell by ID */
  getCell: (id: string) => AvakioGridCell | undefined;
  /** Serialize the grid state */
  serialize: () => AvakioGridCell[];
  /** Restore grid state */
  restore: (cells: AvakioGridCell[]) => void;
  /** Rebuild the grid */
  reconstruct: () => void;
  /** Show the grid */
  show: () => void;
  /** Hide the grid */
  hide: () => void;
  /** Get the DOM node */
  getNode: () => HTMLDivElement | null;
}

export const AvakioGrid = forwardRef<AvakioGridRef, AvakioGridProps>(
  (
    {
      id,
      testId,
      gridColumns = 2,
      gridRows = 2,
      cellWidth,
      cellHeight,
      cells: initialCells = [],
      theme = 'material',
      cellMargin = 10,
      margin,
      padding = 10,
      paddingX,
      paddingY,
      width,
      height,
      minWidth,
      minHeight,
      borderless = false,
      cellBorderless = false,
      className = '',
      css,
      hidden = false,
      disabled = false,
      autoplace = false,
      factory,
      onChange,
      onCellClick,
      isDraggable = false,
      onDragStart,
      onDragEnd,
      style,
    },
    ref
  ) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [cells, setCells] = useState<AvakioGridCell[]>(initialCells);
    const [isHidden, setIsHidden] = useState(hidden);
    const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
    const cellsRef = useRef(cells);
    
    // Drag state
    const [draggingCell, setDraggingCell] = useState<string | null>(null);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });

    // Keep cellsRef in sync
    useEffect(() => {
      cellsRef.current = cells;
    }, [cells]);

    // Update cells when prop changes
    useEffect(() => {
      setCells(initialCells);
    }, [initialCells]);

    // Observe container size for responsive cell sizing
    useEffect(() => {
      if (!containerRef.current) return;

      // Get initial size immediately using clientWidth/clientHeight (content + padding, excludes border)
      const initialWidth = containerRef.current.clientWidth;
      const initialHeight = containerRef.current.clientHeight;
      if (initialWidth > 0 || initialHeight > 0) {
        setContainerSize({ width: initialWidth, height: initialHeight });
      }

      let rafId: number | null = null;
      let pendingSize: { width: number; height: number } | null = null;

      const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const target = entry.target as HTMLElement;
          pendingSize = { width: target.clientWidth, height: target.clientHeight };
          
          // Use requestAnimationFrame to throttle updates for smooth resizing
          if (rafId === null) {
            rafId = requestAnimationFrame(() => {
              if (pendingSize) {
                setContainerSize(pendingSize);
                pendingSize = null;
              }
              rafId = null;
            });
          }
        }
      });

      resizeObserver.observe(containerRef.current);
      return () => {
        resizeObserver.disconnect();
        if (rafId !== null) {
          cancelAnimationFrame(rafId);
        }
      };
    }, []);

    // Calculate actual cell dimensions
    const calculatedCellWidth = useMemo(() => {
      if (cellWidth) return cellWidth;
      const basePadding = Array.isArray(padding) ? padding : [padding, padding, padding, padding];
      const px = paddingX !== undefined ? paddingX : basePadding[1];
      const paddingHorizontal = px * 2;
      const totalMargin = cellMargin * (gridColumns - 1);
      const availableWidth = containerSize.width - paddingHorizontal - totalMargin;
      return Math.max(availableWidth / gridColumns, 50);
    }, [cellWidth, containerSize.width, gridColumns, cellMargin, padding, paddingX]);

    // Calculate heights for cells, accounting for fixed-height cells
    const cellHeights = useMemo(() => {
      // If cellHeight is explicitly set, use it for all cells
      if (cellHeight) {
        return cells.reduce((acc, cell) => {
          acc[cell.id] = cell.height || cellHeight;
          return acc;
        }, {} as Record<string, number>);
      }

      const basePadding = Array.isArray(padding) ? padding : [padding, padding, padding, padding];
      const py = paddingY !== undefined ? paddingY : basePadding[0];
      const paddingVertical = py * 2;
      const totalMargin = cellMargin * (gridRows - 1);
      const availableHeight = containerSize.height - paddingVertical - totalMargin;

      // Calculate fixed heights and count flexible cells
      let fixedHeightTotal = 0;
      let flexibleRowCount = 0;
      const rowHeights: Record<number, number | 'flex'> = {};

      // Group cells by row and determine which rows have fixed heights
      for (let row = 0; row < gridRows; row++) {
        const cellsInRow = cells.filter(c => c.y === row && !c.hidden);
        const fixedHeightCell = cellsInRow.find(c => c.height !== undefined);
        
        if (fixedHeightCell && fixedHeightCell.height) {
          rowHeights[row] = fixedHeightCell.height;
          fixedHeightTotal += fixedHeightCell.height;
        } else {
          rowHeights[row] = 'flex';
          flexibleRowCount++;
        }
      }

      // Calculate height for flexible rows
      const remainingHeight = availableHeight - fixedHeightTotal;
      const flexRowHeight = flexibleRowCount > 0 
        ? Math.max(remainingHeight / flexibleRowCount, 50) 
        : 50;

      // Build heights map for each cell
      const heights: Record<string, number> = {};
      cells.forEach(cell => {
        if (cell.height) {
          heights[cell.id] = cell.height;
        } else {
          const dy = cell.dy || 1;
          let totalHeight = 0;
          for (let i = 0; i < dy; i++) {
            const rowH = rowHeights[cell.y + i];
            totalHeight += rowH === 'flex' ? flexRowHeight : rowH;
            if (i > 0) totalHeight += cellMargin;
          }
          heights[cell.id] = totalHeight;
        }
      });

      return heights;
    }, [cells, cellHeight, containerSize.height, gridRows, cellMargin, padding, paddingY]);

    // Calculate row top positions (accounting for variable heights)
    const rowPositions = useMemo(() => {
      const basePadding = Array.isArray(padding) ? padding : [padding, padding, padding, padding];
      const py = paddingY !== undefined ? paddingY : basePadding[0];
      const paddingVertical = py * 2;
      const availableHeight = containerSize.height - paddingVertical - (cellMargin * (gridRows - 1));
      
      // Calculate fixed heights and flexible row count
      let fixedHeightTotal = 0;
      let flexibleRowCount = 0;
      const rowHeights: (number | 'flex')[] = [];

      for (let row = 0; row < gridRows; row++) {
        const cellsInRow = cells.filter(c => c.y === row && !c.hidden);
        const fixedHeightCell = cellsInRow.find(c => c.height !== undefined);
        
        if (fixedHeightCell && fixedHeightCell.height) {
          rowHeights[row] = fixedHeightCell.height;
          fixedHeightTotal += fixedHeightCell.height;
        } else if (cellHeight) {
          rowHeights[row] = cellHeight;
        } else {
          rowHeights[row] = 'flex';
          flexibleRowCount++;
        }
      }

      const remainingHeight = availableHeight - fixedHeightTotal;
      const flexRowHeight = flexibleRowCount > 0 
        ? Math.max(remainingHeight / flexibleRowCount, 50) 
        : (cellHeight || 50);

      // Calculate cumulative positions
      const positions: number[] = [0];
      for (let row = 0; row < gridRows; row++) {
        const h = rowHeights[row] === 'flex' ? flexRowHeight : (rowHeights[row] as number);
        positions[row + 1] = positions[row] + h + cellMargin;
      }

      return positions;
    }, [cells, cellHeight, containerSize.height, gridRows, cellMargin, padding, paddingY]);

    // Calculate cell position and size
    const getCellStyle = useCallback((cell: AvakioGridCell): React.CSSProperties => {
      const dx = cell.dx || 1;
      const basePadding = Array.isArray(padding) ? padding : [padding, padding, padding, padding];
      const px = paddingX !== undefined ? paddingX : basePadding[1];
      const py = paddingY !== undefined ? paddingY : basePadding[0];

      const left = px + cell.x * (calculatedCellWidth + cellMargin);
      const top = py + rowPositions[cell.y];
      const width = dx * calculatedCellWidth + (dx - 1) * cellMargin;
      const height = cellHeights[cell.id] || 50;

      return {
        position: 'absolute',
        left: `${left}px`,
        top: `${top}px`,
        width: `${width}px`,
        height: `${height}px`,
        ...cell.css,
      };
    }, [calculatedCellWidth, cellHeights, rowPositions, cellMargin, padding, paddingX, paddingY]);

    // Render cell content
    const renderCellContent = useCallback((cell: AvakioGridCell): React.ReactNode => {
      if (factory) {
        return factory(cell);
      }
      if (cell.content) {
        return cell.content;
      }
      if (typeof cell.template === 'function') {
        return cell.template(cell);
      }
      if (typeof cell.template === 'string') {
        // Simple template replacement
        let result = cell.template;
        if (cell.data) {
          Object.entries(cell.data).forEach(([key, value]) => {
            result = result.replace(new RegExp(`#${key}#`, 'g'), String(value));
          });
        }
        return <div dangerouslySetInnerHTML={{ __html: result }} />;
      }
      return null;
    }, [factory]);

    // Calculate grid position from pixel coordinates
    const getGridPositionFromPixels = useCallback((pixelX: number, pixelY: number): { x: number; y: number } => {
      const basePadding = Array.isArray(padding) ? padding : [padding, padding, padding, padding];
      const px = paddingX !== undefined ? paddingX : basePadding[1];
      const py = paddingY !== undefined ? paddingY : basePadding[0];
      
      // Calculate x position
      const adjustedX = pixelX - px;
      const colWidth = calculatedCellWidth + cellMargin;
      let gridX = Math.round(adjustedX / colWidth);
      gridX = Math.max(0, Math.min(gridX, gridColumns - 1));
      
      // Calculate y position based on row positions
      const adjustedY = pixelY - py;
      let gridY = 0;
      for (let i = 0; i < rowPositions.length - 1; i++) {
        const rowMid = rowPositions[i] + (rowPositions[i + 1] - rowPositions[i] - cellMargin) / 2;
        if (adjustedY > rowMid) {
          gridY = i + 1;
        }
      }
      gridY = Math.max(0, Math.min(gridY, gridRows - 1));
      
      return { x: gridX, y: gridY };
    }, [calculatedCellWidth, cellMargin, gridColumns, gridRows, padding, paddingX, paddingY, rowPositions]);

    // Check if a position is occupied by another cell
    const isPositionOccupied = useCallback((gridX: number, gridY: number, excludeCellId?: string): boolean => {
      return cellsRef.current.some(cell => {
        if (cell.id === excludeCellId) return false;
        const dx = cell.dx || 1;
        const dy = cell.dy || 1;
        return gridX >= cell.x && gridX < cell.x + dx && gridY >= cell.y && gridY < cell.y + dy;
      });
    }, []);

    // Handle drag start
    const handleDragStart = useCallback((e: React.MouseEvent | React.TouchEvent, cell: AvakioGridCell) => {
      if (!isDraggable || disabled || cell.disabled || cell.draggable === false) return;
      
      e.preventDefault();
      e.stopPropagation();
      
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      
      const cellStyle = getCellStyle(cell);
      const cellLeft = parseFloat(String(cellStyle.left));
      const cellTop = parseFloat(String(cellStyle.top));
      
      setDragOffset({
        x: clientX - rect.left - cellLeft,
        y: clientY - rect.top - cellTop,
      });
      setDragPosition({
        x: clientX - rect.left - (clientX - rect.left - cellLeft),
        y: clientY - rect.top - (clientY - rect.top - cellTop),
      });
      setDraggingCell(cell.id);
      onDragStart?.(cell);
    }, [isDraggable, disabled, getCellStyle, onDragStart]);

    // Handle drag move
    const handleDragMove = useCallback((e: MouseEvent | TouchEvent) => {
      if (!draggingCell || !containerRef.current) return;
      
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      
      const rect = containerRef.current.getBoundingClientRect();
      
      setDragPosition({
        x: clientX - rect.left - dragOffset.x,
        y: clientY - rect.top - dragOffset.y,
      });
    }, [draggingCell, dragOffset]);

    // Handle drag end
    const handleDragEnd = useCallback(() => {
      if (!draggingCell) return;
      
      const cell = cellsRef.current.find(c => c.id === draggingCell);
      if (!cell) {
        setDraggingCell(null);
        return;
      }
      
      // Calculate new grid position
      const newGridPos = getGridPositionFromPixels(dragPosition.x, dragPosition.y);
      
      // Check if the position is within bounds
      const dx = cell.dx || 1;
      const dy = cell.dy || 1;
      
      let canPlace = true;
      for (let i = 0; i < dx && canPlace; i++) {
        for (let j = 0; j < dy && canPlace; j++) {
          const checkX = newGridPos.x + i;
          const checkY = newGridPos.y + j;
          if (checkX >= gridColumns || checkY >= gridRows) {
            canPlace = false;
          }
        }
      }
      
      // Check if position actually changed
      const positionChanged = newGridPos.x !== cell.x || newGridPos.y !== cell.y;
      
      if (canPlace && positionChanged) {
        // For single-column grids with 1x1 cells, use shift reordering
        const isSingleColumn = gridColumns === 1;
        const allCellsSimple = cellsRef.current.every(c => (c.dx || 1) === 1 && (c.dy || 1) === 1);
        
        if (isSingleColumn && allCellsSimple) {
          // Shift-based reordering for single-column lists
          const oldY = cell.y;
          const newY = newGridPos.y;
          
          setCells(prev => {
            const updated = prev.map(c => {
              if (c.id === draggingCell) {
                return { ...c, y: newY };
              }
              
              if (oldY < newY) {
                if (c.y > oldY && c.y <= newY) {
                  return { ...c, y: c.y - 1 };
                }
              } else {
                if (c.y >= newY && c.y < oldY) {
                  return { ...c, y: c.y + 1 };
                }
              }
              return c;
            });
            onChange?.(updated);
            return updated;
          });
        } else {
          // Swap-based approach for multi-column grids or complex cells
          // Find if there's a cell at the target position
          const targetCell = cellsRef.current.find(c => {
            if (c.id === draggingCell) return false;
            const cDx = c.dx || 1;
            const cDy = c.dy || 1;
            // Check if new position overlaps with this cell
            return newGridPos.x >= c.x && newGridPos.x < c.x + cDx &&
                   newGridPos.y >= c.y && newGridPos.y < c.y + cDy;
          });
          
          setCells(prev => {
            const updated = prev.map(c => {
              if (c.id === draggingCell) {
                // Move dragged cell to new position
                return { ...c, x: newGridPos.x, y: newGridPos.y };
              }
              if (targetCell && c.id === targetCell.id) {
                // Swap: move target cell to dragged cell's old position
                return { ...c, x: cell.x, y: cell.y };
              }
              return c;
            });
            onChange?.(updated);
            return updated;
          });
        }
        onDragEnd?.(cell, newGridPos);
      }
      
      setDraggingCell(null);
    }, [draggingCell, dragPosition, getGridPositionFromPixels, gridColumns, gridRows, onChange, onDragEnd]);

    // Add global mouse/touch event listeners for drag
    useEffect(() => {
      if (!isDraggable || !draggingCell) return;
      
      const handleMove = (e: MouseEvent | TouchEvent) => handleDragMove(e);
      const handleUp = () => handleDragEnd();
      
      document.addEventListener('mousemove', handleMove);
      document.addEventListener('mouseup', handleUp);
      document.addEventListener('touchmove', handleMove, { passive: false });
      document.addEventListener('touchend', handleUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMove);
        document.removeEventListener('mouseup', handleUp);
        document.removeEventListener('touchmove', handleMove);
        document.removeEventListener('touchend', handleUp);
      };
    }, [isDraggable, draggingCell, handleDragMove, handleDragEnd]);

    // Find next available position for autoplace
    const findNextPosition = useCallback((): { x: number; y: number } => {
      const occupied = new Set<string>();
      cellsRef.current.forEach(cell => {
        const dx = cell.dx || 1;
        const dy = cell.dy || 1;
        for (let i = 0; i < dx; i++) {
          for (let j = 0; j < dy; j++) {
            occupied.add(`${cell.x + i},${cell.y + j}`);
          }
        }
      });

      for (let y = 0; y < gridRows; y++) {
        for (let x = 0; x < gridColumns; x++) {
          if (!occupied.has(`${x},${y}`)) {
            return { x, y };
          }
        }
      }
      return { x: 0, y: gridRows }; // Add below existing rows
    }, [gridColumns, gridRows]);

    // Imperative methods
    useImperativeHandle(ref, () => ({
      addView: (cell: AvakioGridCell, index?: number) => {
        const newCell = autoplace && (cell.x === undefined || cell.y === undefined)
          ? { ...cell, ...findNextPosition() }
          : cell;
        
        setCells(prev => {
          const updated = index !== undefined
            ? [...prev.slice(0, index), newCell, ...prev.slice(index)]
            : [...prev, newCell];
          onChange?.(updated);
          return updated;
        });
      },

      removeView: (cellId: string) => {
        setCells(prev => {
          const updated = prev.filter(c => c.id !== cellId);
          onChange?.(updated);
          return updated;
        });
      },

      moveView: (cellId: string, position: { x?: number; y?: number; dx?: number; dy?: number }) => {
        setCells(prev => {
          const updated = prev.map(c => {
            if (c.id === cellId) {
              return {
                ...c,
                x: position.x ?? c.x,
                y: position.y ?? c.y,
                dx: position.dx ?? c.dx,
                dy: position.dy ?? c.dy,
              };
            }
            return c;
          });
          onChange?.(updated);
          return updated;
        });
      },

      clearAll: () => {
        setCells([]);
        onChange?.([]);
      },

      getCells: () => cellsRef.current,

      getCell: (cellId: string) => cellsRef.current.find(c => c.id === cellId),

      serialize: () => cellsRef.current.map(({ id, x, y, dx, dy, data }) => ({ 
        id, x, y, dx: dx || 1, dy: dy || 1, data 
      })),

      restore: (newCells: AvakioGridCell[]) => {
        setCells(newCells);
        onChange?.(newCells);
      },

      reconstruct: () => {
        setCells([...cellsRef.current]);
      },

      show: () => setIsHidden(false),

      hide: () => setIsHidden(true),

      getNode: () => containerRef.current,
    }));

    // Build class names
    const containerClasses = [
      'avakio-grid',
      `avakio-grid-theme-${theme}`,
      borderless ? 'avakio-grid-borderless' : '',
      cellBorderless ? 'avakio-grid-cell-borderless' : '',
      isHidden ? 'avakio-grid-hidden' : '',
      disabled ? 'avakio-grid-disabled' : '',
      isDraggable ? 'avakio-grid-draggable' : '',
      draggingCell ? 'avakio-grid-dragging' : '',
      className,
    ].filter(Boolean).join(' ');

    // Calculate width accounting for margin
    const calculateWidth = () => {
      if (width === undefined) return undefined;
      if (typeof width === 'number') return `${width}px`;
      // If width is '100%' and margin is set, use calc to subtract margin
      if (width === '100%' && margin !== undefined) {
        const marginValue = typeof margin === 'number' ? margin * 2 : 0;
        return marginValue > 0 ? `calc(100% - ${marginValue}px)` : '100%';
      }
      return width;
    };

    // Build container styles
    const containerStyles: React.CSSProperties = {
      position: 'relative',
      width: calculateWidth(),
      height: typeof height === 'number' ? `${height}px` : height,
      minWidth: typeof minWidth === 'number' ? `${minWidth}px` : minWidth,
      minHeight: typeof minHeight === 'number' ? `${minHeight}px` : minHeight,
      margin: margin !== undefined ? (typeof margin === 'number' ? `${margin}px` : margin) : undefined,
      ...(css && typeof css === 'object' && !Array.isArray(css) ? css : {}),
      ...style,
    };

    return (
      <div
        ref={containerRef}
        id={id}
        data-testid={testId}
        className={containerClasses}
        style={containerStyles}
      >
        {cells.map(cell => {
          if (cell.hidden) return null;

          const isDragging = draggingCell === cell.id;
          const cellClasses = [
            'avakio-grid-cell',
            cell.cssClass || '',
            cell.disabled ? 'avakio-grid-cell-disabled' : '',
            isDraggable && !cell.disabled && cell.draggable !== false ? 'avakio-grid-cell-draggable' : '',
            isDragging ? 'avakio-grid-cell-dragging' : '',
          ].filter(Boolean).join(' ');

          // Use drag position if this cell is being dragged
          const cellStyle = isDragging
            ? { ...getCellStyle(cell), left: `${dragPosition.x}px`, top: `${dragPosition.y}px`, zIndex: 1000 }
            : getCellStyle(cell);

          return (
            <div
              key={cell.id}
              id={cell.id}
              className={cellClasses}
              style={cellStyle}
              onClick={() => !isDragging && onCellClick?.(cell)}
              onMouseDown={(e) => handleDragStart(e, cell)}
              onTouchStart={(e) => handleDragStart(e, cell)}
              data-cell-id={cell.id}
            >
              <div className="avakio-grid-cell-content">
                {renderCellContent(cell)}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
);

AvakioGrid.displayName = 'AvakioGrid';








