import React, {
  CSSProperties,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { AvakioChangeEvent } from '../../base/avakio-base-props';
import { AvakioGrid, AvakioGridCell, AvakioGridRef } from '../../layouts/avakio-grid/avakio-grid';
import './avakio-dashboard.css';

export type AvakioDashboardTheme = 'material' | 'flat' | 'compact' | 'dark' | 'ocean' | 'sunset';

export interface AvakioDashboardWidget {
  id: string;

  x: number;
  y: number;
  dx?: number;
  dy?: number;

  header?: React.ReactNode;
  icon?: React.ReactNode;
  body?: React.ReactNode;

  /** Whether this widget can be dragged (when `editable` is true) */
  draggable?: boolean;
  /** Whether this widget can be resized (when `editable` is true) */
  resizable?: boolean;

  minDx?: number;
  minDy?: number;

  /** Optional custom class for the widget panel */
  className?: string;
  /** Optional inline styles for the widget panel */
  style?: React.CSSProperties;
}

export interface AvakioDashboardLayoutItem {
  id: string;
  x: number;
  y: number;
  dx: number;
  dy: number;
}

export interface AvakioDashboardProps {
  id?: string;
  testId?: string;

  /** Number of columns in the dashboard grid */
  gridColumns?: number;
  /** Number of rows in the dashboard grid */
  gridRows?: number;

  /** Fixed cell width in px (optional; auto-calculated if not set) */
  cellWidth?: number;
  /** Fixed cell height in px (optional; auto-calculated if not set) */
  cellHeight?: number;

  /** Margin (gap) between cells in px */
  cellMargin?: number;

  /** Outer margin around the dashboard container */
  margin?: number;

  /** Padding around the dashboard content */
  padding?: number | [number, number, number, number];
  paddingX?: number;
  paddingY?: number;

  width?: number | string;
  height?: number | string;

  /** Minimum width */
  minWidth?: number | string;
  /** Minimum height */
  minHeight?: number | string;

  theme?: AvakioDashboardTheme;

  /** Widgets to render */
  widgets: AvakioDashboardWidget[];

  /** When true, enables drag and resize interactions */
  editable?: boolean;

  /** Drag handle behavior */
  dragHandle?: 'any' | 'header';

  className?: string;
  style?: React.CSSProperties;

  /** Callback fired when widgets change. Receives { id, value } where value is widgets array */
  onChange?: (event: AvakioChangeEvent<AvakioDashboardWidget[]>) => void;
  onWidgetClick?: (widget: AvakioDashboardWidget) => void;
  onDragStart?: (widget: AvakioDashboardWidget) => void;
  onDragEnd?: (widget: AvakioDashboardWidget, newPosition: { x: number; y: number }) => void;
  onResizeStart?: (widget: AvakioDashboardWidget) => void;
  onResizeEnd?: (widget: AvakioDashboardWidget, newSize: { dx: number; dy: number }) => void;
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
}

export interface AvakioDashboardRef {
  addWidget: (widget: AvakioDashboardWidget, index?: number) => void;
  removeWidget: (id: string) => void;
  moveWidget: (id: string, position: { x?: number; y?: number; dx?: number; dy?: number }) => void;
  getWidgets: () => AvakioDashboardWidget[];
  getWidget: (id: string) => AvakioDashboardWidget | undefined;
  serialize: () => AvakioDashboardLayoutItem[];
  restore: (layout: AvakioDashboardLayoutItem[]) => void;
}

type ResizeState = {
  widgetId: string;
  startClientX: number;
  startClientY: number;
  startDx: number;
  startDy: number;
};

function asBoxPadding(padding: number | [number, number, number, number] | undefined): [number, number, number, number] {
  if (Array.isArray(padding)) return padding;
  if (typeof padding === 'number') return [padding, padding, padding, padding];
  return [0, 0, 0, 0];
}

function intersects(a: { x: number; y: number; dx: number; dy: number }, b: { x: number; y: number; dx: number; dy: number }): boolean {
  return a.x < b.x + b.dx && a.x + a.dx > b.x && a.y < b.y + b.dy && a.y + a.dy > b.y;
}

export const AvakioDashboard = forwardRef<AvakioDashboardRef, AvakioDashboardProps>(
  (
    {
      id,
      testId,
      gridColumns = 2,
      gridRows = 2,
      cellWidth,
      cellHeight,
      cellMargin = 10,
      margin,
      padding = 10,
      paddingX,
      paddingY,
      width,
      height,
      minWidth,
      minHeight,
      maxWidth,
      maxHeight,
      borderless = false,
      disabled = false,
      hidden = false,
      theme = 'material',
      widgets: widgetsProp,
      editable = true,
      dragHandle = 'any',
      className = '',
      style,
      onChange,
      onWidgetClick,
      onDragStart,
      onDragEnd,
      onResizeStart,
      onResizeEnd,
    },
    ref
  ) => {
    const gridRef = useRef<AvakioGridRef>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const [widgets, setWidgets] = useState<AvakioDashboardWidget[]>(widgetsProp);
    const widgetsRef = useRef<AvakioDashboardWidget[]>(widgetsProp);

    // Resize measuring (for dx/dy updates during interactive resize)
    const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
    const resizeStateRef = useRef<ResizeState | null>(null);

    // Keep in sync with prop
    useEffect(() => {
      setWidgets(widgetsProp);
    }, [widgetsProp]);

    useEffect(() => {
      widgetsRef.current = widgets;
    }, [widgets]);

    // Observe container size
    useEffect(() => {
      const el = containerRef.current;
      if (!el) return;

      const update = () => {
        setContainerSize({ width: el.clientWidth, height: el.clientHeight });
      };
      update();

      let rafId: number | null = null;
      const ro = new ResizeObserver(() => {
        if (rafId !== null) return;
        rafId = requestAnimationFrame(() => {
          rafId = null;
          update();
        });
      });

      ro.observe(el);
      return () => {
        ro.disconnect();
        if (rafId !== null) cancelAnimationFrame(rafId);
      };
    }, []);

    const resolvedUnitWidth = useMemo(() => {
      if (cellWidth) return cellWidth;
      const base = asBoxPadding(padding);
      const px = paddingX !== undefined ? paddingX : base[1];
      const availableWidth = containerSize.width - px * 2 - cellMargin * (gridColumns - 1);
      return Math.max(50, availableWidth / Math.max(1, gridColumns));
    }, [cellWidth, containerSize.width, padding, paddingX, cellMargin, gridColumns]);

    const resolvedUnitHeight = useMemo(() => {
      if (cellHeight) return cellHeight;
      const base = asBoxPadding(padding);
      const py = paddingY !== undefined ? paddingY : base[0];
      const availableHeight = containerSize.height - py * 2 - cellMargin * (gridRows - 1);
      return Math.max(50, availableHeight / Math.max(1, gridRows));
    }, [cellHeight, containerSize.height, padding, paddingY, cellMargin, gridRows]);

    const updateWidgets = useCallback(
      (
        nextOrUpdater:
          | AvakioDashboardWidget[]
          | ((prev: AvakioDashboardWidget[]) => AvakioDashboardWidget[])
      ) => {
        setWidgets((prev) => {
          const next = typeof nextOrUpdater === 'function' ? nextOrUpdater(prev) : nextOrUpdater;
          onChange?.({ id: id || '0', value: next });
          return next;
        });
      },
      [onChange, id]
    );

    const getWidgetById = useCallback(
      (wid: string) => widgetsRef.current.find((w) => w.id === wid),
      []
    );

    const canPlaceRect = useCallback(
      (rect: { id?: string; x: number; y: number; dx: number; dy: number }) => {
        if (rect.x < 0 || rect.y < 0) return false;
        if (rect.x + rect.dx > gridColumns) return false;
        if (rect.y + rect.dy > gridRows) return false;

        for (const w of widgetsRef.current) {
          if (rect.id && w.id === rect.id) continue;
          const other = { x: w.x, y: w.y, dx: w.dx ?? 1, dy: w.dy ?? 1 };
          if (intersects({ x: rect.x, y: rect.y, dx: rect.dx, dy: rect.dy }, other)) return false;
        }
        return true;
      },
      [gridColumns, gridRows]
    );

    const findFirstFreeSpot = useCallback(
      (dx: number, dy: number) => {
        for (let y = 0; y <= gridRows - dy; y++) {
          for (let x = 0; x <= gridColumns - dx; x++) {
            if (canPlaceRect({ x, y, dx, dy })) {
              return { x, y };
            }
          }
        }
        return null;
      },
      [gridRows, gridColumns, canPlaceRect]
    );

    useImperativeHandle(
      ref,
      () => ({
        addWidget: (widget, index) => {
          const dx = widget.dx ?? 1;
          const dy = widget.dy ?? 1;
          const spot = findFirstFreeSpot(dx, dy);
          const placed = spot ? { ...widget, x: spot.x, y: spot.y, dx, dy } : { ...widget, dx, dy };

          updateWidgets((prev) => {
            const next = [...prev];
            if (typeof index === 'number') next.splice(index, 0, placed);
            else next.push(placed);
            return next;
          });
        },
        removeWidget: (wid) => {
          updateWidgets((prev) => prev.filter((w) => w.id !== wid));
        },
        moveWidget: (wid, position) => {
          const current = getWidgetById(wid);
          if (!current) return;

          const nextRect = {
            id: wid,
            x: position.x ?? current.x,
            y: position.y ?? current.y,
            dx: position.dx ?? (current.dx ?? 1),
            dy: position.dy ?? (current.dy ?? 1),
          };

          if (!canPlaceRect(nextRect)) return;

          updateWidgets((prev) => prev.map((w) => (w.id === wid ? { ...w, ...position } : w)));
        },
        getWidgets: () => [...widgetsRef.current],
        getWidget: (wid) => widgetsRef.current.find((w) => w.id === wid),
        serialize: () =>
          widgetsRef.current.map((w) => ({
            id: w.id,
            x: w.x,
            y: w.y,
            dx: w.dx ?? 1,
            dy: w.dy ?? 1,
          })),
        restore: (layout) => {
          const byId = new Map(layout.map((l) => [l.id, l] as const));
          updateWidgets((prev) =>
            prev.map((w) => {
              const l = byId.get(w.id);
              if (!l) return w;
              return { ...w, x: l.x, y: l.y, dx: l.dx, dy: l.dy };
            })
          );
        },
      }),
      [updateWidgets, getWidgetById, canPlaceRect, findFirstFreeSpot]
    );

    const handleGridChange = useCallback(
      (cells: AvakioGridCell[]) => {
        updateWidgets((prev) =>
          prev.map((w) => {
            const c = cells.find((x) => x.id === w.id);
            if (!c) return w;
            return { ...w, x: c.x, y: c.y, dx: c.dx ?? 1, dy: c.dy ?? 1 };
          })
        );
      },
      [updateWidgets]
    );

    const handleDragStartInternal = useCallback(
      (cell: AvakioGridCell) => {
        const w = getWidgetById(cell.id);
        if (w) onDragStart?.(w);
      },
      [getWidgetById, onDragStart]
    );

    const handleDragEndInternal = useCallback(
      (cell: AvakioGridCell, pos: { x: number; y: number }) => {
        const w = getWidgetById(cell.id);
        if (w) onDragEnd?.({ ...w, x: pos.x, y: pos.y }, pos);
      },
      [getWidgetById, onDragEnd]
    );

    const beginResize = useCallback(
      (e: React.PointerEvent, widgetId: string) => {
        if (!editable) return;

        const w = getWidgetById(widgetId);
        if (!w || w.resizable !== true) return;

        e.preventDefault();
        e.stopPropagation();

        resizeStateRef.current = {
          widgetId,
          startClientX: e.clientX,
          startClientY: e.clientY,
          startDx: w.dx ?? 1,
          startDy: w.dy ?? 1,
        };

        onResizeStart?.(w);

        (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
      },
      [editable, getWidgetById, onResizeStart]
    );

    const handlePointerMove = useCallback(
      (e: React.PointerEvent) => {
        const state = resizeStateRef.current;
        if (!state) return;

        const w = getWidgetById(state.widgetId);
        if (!w) return;

        const unitW = resolvedUnitWidth + cellMargin;
        const unitH = resolvedUnitHeight + cellMargin;

        const deltaX = e.clientX - state.startClientX;
        const deltaY = e.clientY - state.startClientY;

        const minDx = Math.max(1, w.minDx ?? 1);
        const minDy = Math.max(1, w.minDy ?? 1);

        const maxDx = Math.max(1, gridColumns - w.x);
        const maxDy = Math.max(1, gridRows - w.y);

        const nextDx = Math.max(minDx, Math.min(maxDx, state.startDx + Math.round(deltaX / unitW)));
        const nextDy = Math.max(minDy, Math.min(maxDy, state.startDy + Math.round(deltaY / unitH)));

        const rect = { id: w.id, x: w.x, y: w.y, dx: nextDx, dy: nextDy };
        if (!canPlaceRect(rect)) return;

        if ((w.dx ?? 1) === nextDx && (w.dy ?? 1) === nextDy) return;

        updateWidgets((prev) => prev.map((x) => (x.id === w.id ? { ...x, dx: nextDx, dy: nextDy } : x)));
      },
      [getWidgetById, resolvedUnitWidth, resolvedUnitHeight, cellMargin, gridColumns, gridRows, canPlaceRect, updateWidgets]
    );

    const handlePointerUp = useCallback(
      () => {
        const state = resizeStateRef.current;
        if (!state) return;

        const w = getWidgetById(state.widgetId);
        if (w) {
          onResizeEnd?.(w, { dx: w.dx ?? 1, dy: w.dy ?? 1 });
        }

        resizeStateRef.current = null;
      },
      [getWidgetById, onResizeEnd]
    );

    const gridCells: AvakioGridCell[] = useMemo(() => {
      return widgets.map((w) => {
        const dx = w.dx ?? 1;
        const dy = w.dy ?? 1;

        const header = w.header ?? null;
        const hasHeader = header !== null && header !== undefined;

        const stopBodyDrag = dragHandle === 'header' && editable;

        return {
          id: w.id,
          x: w.x,
          y: w.y,
          dx,
          dy,
          draggable: w.draggable !== false,
          content: (
            <div
              className={[
                'avakio-dashboard__panel',
                hasHeader ? 'avakio-dashboard__panel--with-header' : 'avakio-dashboard__panel--no-header',
                editable ? 'avakio-dashboard__panel--editable' : 'avakio-dashboard__panel--readonly',
                w.className,
              ]
                .filter(Boolean)
                .join(' ')}
              style={w.style}
              data-widget-id={w.id}
            >
              {hasHeader && (
                <div className="avakio-dashboard__panel-header">
                  {w.icon && <span className="avakio-dashboard__panel-icon">{w.icon}</span>}
                  <div className="avakio-dashboard__panel-title">{header}</div>
                </div>
              )}

              <div
                className="avakio-dashboard__panel-body"
                onMouseDown={stopBodyDrag ? (e) => e.stopPropagation() : undefined}
                onTouchStart={stopBodyDrag ? (e) => e.stopPropagation() : undefined}
              >
                {w.body}
              </div>

              {editable && w.resizable === true && (
                <div
                  className="avakio-dashboard__resize-handle"
                  onPointerDown={(e) => beginResize(e, w.id)}
                  onMouseDown={(e) => e.stopPropagation()}
                  onTouchStart={(e) => e.stopPropagation()}
                />
              )}
            </div>
          ),
        };
      });
    }, [widgets, dragHandle, editable, beginResize]);

    const containerClassName = [
      'avakio-dashboard',
      `avakio-dashboard--${theme}`,
      borderless && 'avakio-dashboard--borderless',
      disabled && 'avakio-dashboard--disabled',
      hidden && 'avakio-dashboard--hidden',
      className,
    ].filter(Boolean).join(' ');

    const containerStyle: CSSProperties = {
      width,
      height,
      ...(style && typeof style === 'object' && !Array.isArray(style) ? style : {}),
      ...(minWidth && { minWidth: typeof minWidth === 'number' ? `${minWidth}px` : minWidth }),
      ...(minHeight && { minHeight: typeof minHeight === 'number' ? `${minHeight}px` : minHeight }),
      ...(maxWidth && { maxWidth: typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth }),
      ...(maxHeight && { maxHeight: typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight }),
      ...(hidden && { display: 'none' }),
    };

    return (
      <div
        ref={containerRef}
        id={id}
        data-testid={testId}
        className={containerClassName}
        data-admin-theme={theme}
        style={containerStyle}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <AvakioGrid
          ref={gridRef}
          id={id ? `${id}__grid` : undefined}
          testId={testId ? `${testId}__grid` : undefined}
          gridColumns={gridColumns}
          gridRows={gridRows}
          cellWidth={cellWidth}
          cellHeight={cellHeight}
          cellMargin={cellMargin}
          margin={margin}
          padding={padding}
          paddingX={paddingX}
          paddingY={paddingY}
          width={'100%'}
          height={'100%'}
          theme={theme}
          borderless
          cellBorderless
          isDraggable={editable}
          cells={gridCells}
          onChange={handleGridChange}
          onCellClick={(cell) => {
            const w = getWidgetById(cell.id);
            if (w) onWidgetClick?.(w);
          }}
          onDragStart={handleDragStartInternal}
          onDragEnd={handleDragEndInternal}
        />
      </div>
    );
  }
);

AvakioDashboard.displayName = 'AvakioDashboard';










