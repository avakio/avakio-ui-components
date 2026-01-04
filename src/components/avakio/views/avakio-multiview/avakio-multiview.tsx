import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useRef,
  useEffect,
  useMemo,
  CSSProperties,
  ReactNode,
} from 'react';
import './avakio-multiview.css';

// Types
export type AvakioMultiviewTheme = 'material' | 'flat' | 'compact' | 'dark' | 'ocean' | 'sunset';
export type AvakioMultiviewAnimationType = 'slide' | 'flip' | 'none';
export type AvakioMultiviewSlideDirection = 'left' | 'right' | 'top' | 'bottom';
export type AvakioMultiviewFlipDirection = 'horizontal' | 'vertical';

export interface AvakioMultiviewCell {
  /** Unique identifier for the cell */
  id: string;
  /** Content to render in this cell */
  content: ReactNode;
  /** Optional CSS class for this cell */
  className?: string;
  /** Optional inline styles for this cell */
  css?: CSSProperties;
}

export interface AvakioMultiviewAnimateConfig {
  /** Animation type */
  type?: AvakioMultiviewAnimationType;
  /** Animation duration in ms */
  duration?: number;
  /** Animation direction for slide (left, right, top, bottom) */
  direction?: AvakioMultiviewSlideDirection;
  /** Animation direction for flip (horizontal, vertical) */
  flipDirection?: AvakioMultiviewFlipDirection;
}

export interface AvakioMultiviewProps {
  /** Unique identifier */
  id?: string;
  /** Test ID for testing */
  testId?: string;
  /** Array of view cells */
  cells: AvakioMultiviewCell[];
  /** Initially active view ID (defaults to first cell) */
  activeView?: string;
  /** Animation configuration */
  animate?: boolean | AvakioMultiviewAnimateConfig;
  /** Keep inactive views in DOM */
  keepViews?: boolean;
  /** Size container to biggest cell */
  fitBiggest?: boolean;
  /** Theme */
  theme?: AvakioMultiviewTheme;
  /** Custom CSS class */
  className?: string;
  /** Inline styles */
  css?: CSSProperties;
  /** Width */
  width?: number | string;
  /** Height */
  height?: number | string;
  /** Fired when view changes */
  onViewChange?: (newViewId: string, oldViewId: string) => void;
  /** Fired when a view is shown */
  onViewShow?: (viewId: string) => void;
  /** Fired before going back */
  onBeforeBack?: (currentViewId: string) => boolean | void;
}

export interface AvakioMultiviewRef {
  /** Get the ID of the currently active view */
  getValue: () => string;
  /** Alias for getValue */
  getActiveId: () => string;
  /** Switch to a specific view */
  setValue: (viewId: string) => void;
  /** Go back to the previous view */
  back: () => boolean;
  /** Add a new view dynamically */
  addView: (cell: AvakioMultiviewCell, index?: number) => void;
  /** Remove a view by ID */
  removeView: (viewId: string) => boolean;
  /** Get all view IDs */
  getViews: () => string[];
  /** Check if a view exists */
  hasView: (viewId: string) => boolean;
  /** Get the view history */
  getHistory: () => string[];
  /** Clear navigation history */
  clearHistory: () => void;
  /** Show the component */
  show: () => void;
  /** Hide the component */
  hide: () => void;
  /** Check if visible */
  isVisible: () => boolean;
}

/**
 * Get the opposite direction for back navigation
 */
function getOppositeDirection(direction: AvakioMultiviewSlideDirection): AvakioMultiviewSlideDirection {
  const opposites: Record<AvakioMultiviewSlideDirection, AvakioMultiviewSlideDirection> = {
    left: 'right',
    right: 'left',
    top: 'bottom',
    bottom: 'top',
  };
  return opposites[direction];
}

export const AvakioMultiview = forwardRef<AvakioMultiviewRef, AvakioMultiviewProps>(
  (
    {
      id,
      testId,
      cells: initialCells,
      activeView,
      animate = true,
      keepViews = false,
      fitBiggest = false,
      theme = 'material',
      className,
      css,
      width,
      height,
      onViewChange,
      onViewShow,
      onBeforeBack,
    },
    ref
  ) => {
    // Compute animation config directly from props (no memoization to avoid stale values)
    let animationType: AvakioMultiviewAnimationType = 'slide';
    let animationDuration = 300;
    let animationDirection: AvakioMultiviewSlideDirection = 'left';
    let animationFlipDirection: AvakioMultiviewFlipDirection = 'horizontal';
    
    if (typeof animate === 'object' && animate !== null) {
      animationType = animate.type ?? 'slide';
      animationDuration = animate.duration ?? 300;
      animationDirection = animate.direction ?? 'left';
      animationFlipDirection = animate.flipDirection ?? 'horizontal';
    } else if (typeof animate === 'boolean') {
      animationType = animate ? 'slide' : 'none';
    }
    
    // Validate animation type
    if (!['slide', 'flip', 'none'].includes(animationType)) {
      animationType = 'slide';
    }
    
    // Ensure minimum duration
    animationDuration = Math.max(animationDuration, 200);
    
    const animateConfig: AvakioMultiviewAnimateConfig = {
      type: animationType,
      duration: animationDuration,
      direction: animationDirection,
      flipDirection: animationFlipDirection,
    };

    // State
    const [cells, setCells] = useState<AvakioMultiviewCell[]>(initialCells);
    const [currentViewId, setCurrentViewId] = useState<string>(
      activeView || initialCells[0]?.id || ''
    );
    const [previousViewId, setPreviousViewId] = useState<string | null>(null);
    const [isAnimating, setIsAnimating] = useState(false);
    const [activeDirection, setActiveDirection] = useState<AvakioMultiviewSlideDirection>(
      animateConfig.direction || 'left'
    );
    const [hidden, setHidden] = useState(false);

    // Refs for avoiding stale closures
    const historyRef = useRef<string[]>([activeView || initialCells[0]?.id || '']);
    const containerRef = useRef<HTMLDivElement>(null);
    const cellsRef = useRef<AvakioMultiviewCell[]>(initialCells);
    const currentViewIdRef = useRef<string>(activeView || initialCells[0]?.id || '');
    const isAnimatingRef = useRef(false);
    const animationTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const animateConfigRef = useRef(animateConfig);

    // Keep animateConfig ref updated
    useEffect(() => {
      animateConfigRef.current = animateConfig;
    }, [animateConfig.type, animateConfig.direction, animateConfig.duration]);

    // Update cells if prop changes
    useEffect(() => {
      setCells(initialCells);
      cellsRef.current = initialCells;
    }, [initialCells]);

    // Keep refs in sync with state
    useEffect(() => {
      cellsRef.current = cells;
    }, [cells]);

    useEffect(() => {
      currentViewIdRef.current = currentViewId;
    }, [currentViewId]);

    // Cleanup animation timeout on unmount
    useEffect(() => {
      return () => {
        if (animationTimeoutRef.current) {
          clearTimeout(animationTimeoutRef.current);
        }
      };
    }, []);

    /**
     * Core view switching function with animation
     */
    const switchView = (
      newViewId: string,
      direction: AvakioMultiviewSlideDirection
    ) => {
      // Guard: same view or already animating
      const currentId = currentViewIdRef.current;
      if (newViewId === currentId || isAnimatingRef.current) return;

      // Guard: view must exist
      if (!cellsRef.current.find((c) => c.id === newViewId)) return;

      const oldViewId = currentId;

      // Clear any pending animation timeout
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }

      // Add to history
      historyRef.current.push(newViewId);

      // Start animation
      setActiveDirection(direction);
      setPreviousViewId(oldViewId);
      setCurrentViewId(newViewId);
      currentViewIdRef.current = newViewId;
      setIsAnimating(true);
      isAnimatingRef.current = true;

      // Fire callbacks
      onViewChange?.(newViewId, oldViewId);
      onViewShow?.(newViewId);

      // End animation after duration
      animationTimeoutRef.current = setTimeout(() => {
        setIsAnimating(false);
        isAnimatingRef.current = false;
        setPreviousViewId(null);
      }, animationDuration);
    };

    // Imperative methods
    useImperativeHandle(ref, () => ({
      getValue: () => currentViewIdRef.current,
      getActiveId: () => currentViewIdRef.current,

      setValue: (viewId: string) => {
        // Use the configured direction from animate prop
        switchView(viewId, animateConfigRef.current.direction || 'left');
      },

      back: () => {
        if (historyRef.current.length <= 1) return false;

        const currentId = currentViewIdRef.current;
        const shouldProceed = onBeforeBack?.(currentId);
        if (shouldProceed === false) return false;

        // Remove current from history
        historyRef.current.pop();
        const targetId = historyRef.current[historyRef.current.length - 1];

        if (targetId) {
          // Clear any pending animation timeout
          if (animationTimeoutRef.current) {
            clearTimeout(animationTimeoutRef.current);
          }

          const oldViewId = currentId;
          // Use opposite direction for back navigation
          const backDirection = getOppositeDirection(animateConfigRef.current.direction || 'left');

          // Start animation
          setActiveDirection(backDirection);
          setPreviousViewId(oldViewId);
          setCurrentViewId(targetId);
          currentViewIdRef.current = targetId;
          setIsAnimating(true);
          isAnimatingRef.current = true;

          // Fire callbacks
          onViewChange?.(targetId, oldViewId);
          onViewShow?.(targetId);

          // End animation after duration
          animationTimeoutRef.current = setTimeout(() => {
            setIsAnimating(false);
            isAnimatingRef.current = false;
            setPreviousViewId(null);
          }, animationDuration);

          return true;
        }
        return false;
      },

      addView: (cell: AvakioMultiviewCell, index?: number) => {
        if (cellsRef.current.find((c) => c.id === cell.id)) return;

        if (index !== undefined) {
          const newCells = [...cellsRef.current];
          newCells.splice(index, 0, cell);
          cellsRef.current = newCells;
        } else {
          cellsRef.current = [...cellsRef.current, cell];
        }

        setCells([...cellsRef.current]);
      },

      removeView: (viewId: string) => {
        if (viewId === currentViewIdRef.current) return false;
        const newCells = cellsRef.current.filter((c) => c.id !== viewId);
        cellsRef.current = newCells;
        setCells(newCells);
        historyRef.current = historyRef.current.filter((id) => id !== viewId);
        return true;
      },

      getViews: () => cellsRef.current.map((c) => c.id),

      hasView: (viewId: string) => cellsRef.current.some((c) => c.id === viewId),

      getHistory: () => [...historyRef.current],

      clearHistory: () => {
        historyRef.current = [currentViewIdRef.current];
      },

      show: () => setHidden(false),
      hide: () => setHidden(true),
      isVisible: () => !hidden,
    }));

    // Build class names
    const containerClasses = [
      'avakio-multiview',
      `avakio-multiview-theme-${theme}`,
      `avakio-multiview-animate-${animateConfig.type}`,
      animateConfig.type === 'flip' && `avakio-multiview-flip-${animateConfig.flipDirection}`,
      fitBiggest && 'avakio-multiview-fit-biggest',
      isAnimating && 'avakio-multiview-animating',
      hidden && 'avakio-multiview-hidden',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    // Build styles
    const containerStyle: CSSProperties = {
      ...(css && typeof css === 'object' && !Array.isArray(css) ? css : {}),
      width: width,
      height: height,
      '--animation-duration': `${animationDuration}ms`,
    } as CSSProperties;

    // Determine which cells to render
    const allCells = cellsRef.current;
    const activeViewId = currentViewId;
    const cellsToRender = keepViews
      ? allCells
      : allCells.filter(
          (c) =>
            c.id === activeViewId || (isAnimating && c.id === previousViewId)
        );

    return (
      <div
        ref={containerRef}
        id={id}
        data-testid={testId}
        className={containerClasses}
        style={containerStyle}
      >
        <div className="avakio-multiview-cells">
          {cellsToRender.map((cell) => {
            const isActive = cell.id === activeViewId;
            const isLeaving = isAnimating && cell.id === previousViewId;
            const isEntering = isAnimating && isActive;

            const cellClasses = [
              'avakio-multiview-cell',
              isActive && !isEntering && 'avakio-multiview-cell-active',
              isEntering && `avakio-multiview-cell-entering-${activeDirection}`,
              isLeaving && `avakio-multiview-cell-leaving-${activeDirection}`,
              !isActive && !isLeaving && 'avakio-multiview-cell-hidden',
              cell.className,
            ]
              .filter(Boolean)
              .join(' ');

            const cellStyle: CSSProperties = { ...cell.css };
            if (isEntering || isLeaving) {
              cellStyle.animationDuration = `${animationDuration}ms`;
              cellStyle.animationTimingFunction = 'ease-out';
              cellStyle.animationFillMode = 'both';
              cellStyle.animationPlayState = 'running';
            }

            return (
              <div
                key={cell.id}
                data-view-id={cell.id}
                className={cellClasses}
                style={cellStyle}
              >
                {cell.content}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);

AvakioMultiview.displayName = 'AvakioMultiview';








