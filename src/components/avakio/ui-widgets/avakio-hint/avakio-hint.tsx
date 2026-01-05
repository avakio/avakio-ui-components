import React, { useState, useEffect, useCallback, useRef, forwardRef, useImperativeHandle } from 'react';
import { createPortal } from 'react-dom';
import './avakio-hint.css';

export type AvakioHintTheme = 'material' | 'flat' | 'compact' | 'dark' | 'ocean' | 'sunset';

/**
 * Step configuration for AvakioHint
 */
export interface AvakioHintStep {
  /** CSS selector or element ID (without #) for the element to highlight */
  el: string;
  /** Title of the hint step */
  title?: string;
  /** Description/instruction text */
  text?: string | React.ReactNode;
  /** Event that triggers moving to the next step: 'click' or 'enter' */
  event?: 'click' | 'enter' | 'none';
  /** Optional selector for the element that triggers the event (defaults to el) */
  eventEl?: string;
  /** Padding around the highlighted element - can be a number (all sides) or array [top, right, bottom, left] */
  padding?: number | [number, number, number, number];
  /** Custom position for the hint popup */
  position?: 'top' | 'bottom' | 'left' | 'right' | 'auto';
  /** Custom top offset for the hint popup */
  top?: number;
  /** Custom left offset for the hint popup */
  left?: number;
}

export interface AvakioHintProps {
  /** Unique identifier */
  id?: string;
  /** Test ID for testing */
  testId?: string;
  /** Array of hint steps */
  steps: AvakioHintStep[];
  /** Theme to apply */
  theme?: AvakioHintTheme;
  /** Whether to show the Previous button */
  prevButton?: boolean | string;
  /** Whether to show the Next button */
  nextButton?: boolean | string;
  /** Label for the last step's Next button */
  endLabel?: string;
  /** Time in ms before auto-advancing to next step (0 = manual only) */
  stepTimeout?: number;
  /** Whether the hint is visible */
  visible?: boolean;
  /** Callback when hint starts */
  onStart?: () => void;
  /** Callback before hint starts */
  onBeforeStart?: () => boolean | void;
  /** Callback after hint starts */
  onAfterStart?: () => void;
  /** Callback when hint ends (last step completed) */
  onEnd?: (step: number) => void;
  /** Callback when hint is skipped/closed */
  onSkip?: (step: number) => void;
  /** Callback when moving to next step */
  onNext?: (step: number) => void;
  /** Callback when moving to previous step */
  onPrevious?: (step: number) => void;
  /** Callback when step changes */
  onStepChange?: (step: number) => void;
  /** Minimum width */
  minWidth?: string | number;
  /** Minimum height */
  minHeight?: string | number;
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

export interface AvakioHintRef {
  /** Start showing hints from the beginning */
  start: () => void;
  /** End the hint tour */
  end: () => void;
  /** Resume from a specific step (1-indexed) */
  resume: (step?: number) => void;
  /** Get current step number (1-indexed) */
  getCurrentStep: () => number;
  /** Get all steps */
  getSteps: () => AvakioHintStep[];
  /** Set new steps */
  setSteps: (steps: AvakioHintStep[]) => void;
  /** Show the hint */
  show: () => void;
  /** Hide the hint */
  hide: () => void;
  /** Check if hint is visible */
  isVisible: () => boolean;
}

export const AvakioHint = forwardRef<AvakioHintRef, AvakioHintProps>((props, ref) => {
  const {
    id,
    testId,
    steps: initialSteps,
    theme = 'material',
    prevButton = true,
    nextButton = true,
    endLabel = 'End Tour',
    stepTimeout = 0,
    visible: controlledVisible,
    onStart,
    onBeforeStart,
    onAfterStart,
    onEnd,
    onSkip,
    onNext,
    onPrevious,
    onStepChange,
    minWidth,
    minHeight,
    maxWidth,
    maxHeight,
    borderless = false,
    disabled = false,
    hidden = false,
  } = props;

  const [steps, setSteps] = useState<AvakioHintStep[]>(initialSteps);
  const [currentStep, setCurrentStep] = useState(0); // 0-indexed internally
  const [isVisible, setIsVisible] = useState(false);
  const [highlightRect, setHighlightRect] = useState<DOMRect | null>(null);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const popupRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Sync with controlled visible prop
  useEffect(() => {
    if (controlledVisible !== undefined) {
      setIsVisible(controlledVisible);
    }
  }, [controlledVisible]);

  // Update steps when props change
  useEffect(() => {
    setSteps(initialSteps);
  }, [initialSteps]);

  // Get the target element for the current step
  const getTargetElement = useCallback((selector: string): Element | null => {
    if (!selector) return null;
    
    // Try as CSS selector first
    let element = document.querySelector(selector);
    if (element) return element;
    
    // Try as ID (without #)
    element = document.getElementById(selector);
    if (element) return element;
    
    // Try with # prefix
    if (!selector.startsWith('#') && !selector.startsWith('.')) {
      element = document.querySelector(`#${selector}`);
      if (element) return element;
    }
    
    return null;
  }, []);

  // Calculate highlight rectangle for current step
  const updateHighlight = useCallback(() => {
    if (!isVisible || currentStep >= steps.length) {
      setHighlightRect(null);
      return;
    }

    const step = steps[currentStep];
    const element = getTargetElement(step.el);
    
    if (element) {
      const rect = element.getBoundingClientRect();
      const padding = step.padding || 8;
      
      // Handle array padding [top, right, bottom, left]
      const [pTop, pRight, pBottom, pLeft] = Array.isArray(padding) 
        ? padding 
        : [padding, padding, padding, padding];
      
      setHighlightRect(new DOMRect(
        rect.left - pLeft + window.scrollX,
        rect.top - pTop + window.scrollY,
        rect.width + pLeft + pRight,
        rect.height + pTop + pBottom
      ));
    } else {
      setHighlightRect(null);
    }
  }, [isVisible, currentStep, steps, getTargetElement]);

  // Calculate popup position
  const updatePopupPosition = useCallback(() => {
    if (!highlightRect || !popupRef.current) return;

    const popup = popupRef.current;
    const popupRect = popup.getBoundingClientRect();
    const step = steps[currentStep];
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    let top = 0;
    let left = 0;
    
    // Calculate based on position preference or auto
    const position = step.position || 'auto';
    const scrollTop = window.scrollY;
    const scrollLeft = window.scrollX;
    
    // Adjust highlightRect for scroll position for calculations
    const highlightTop = highlightRect.top - scrollTop;
    const highlightLeft = highlightRect.left - scrollLeft;
    const highlightBottom = highlightTop + highlightRect.height;
    const highlightRight = highlightLeft + highlightRect.width;
    
    const gap = 16; // Gap between highlight and popup
    
    if (position === 'auto') {
      // Prefer bottom, then top, then right, then left
      const spaceBelow = viewportHeight - highlightBottom;
      const spaceAbove = highlightTop;
      const spaceRight = viewportWidth - highlightRight;
      const spaceLeft = highlightLeft;
      
      if (spaceBelow >= popupRect.height + gap) {
        // Position below
        top = highlightRect.top + highlightRect.height + gap;
        left = highlightRect.left + (highlightRect.width - popupRect.width) / 2;
      } else if (spaceAbove >= popupRect.height + gap) {
        // Position above
        top = highlightRect.top - popupRect.height - gap;
        left = highlightRect.left + (highlightRect.width - popupRect.width) / 2;
      } else if (spaceRight >= popupRect.width + gap) {
        // Position right
        top = highlightRect.top + (highlightRect.height - popupRect.height) / 2;
        left = highlightRect.left + highlightRect.width + gap;
      } else {
        // Position left
        top = highlightRect.top + (highlightRect.height - popupRect.height) / 2;
        left = highlightRect.left - popupRect.width - gap;
      }
    } else {
      switch (position) {
        case 'bottom':
          top = highlightRect.top + highlightRect.height + gap;
          left = highlightRect.left + (highlightRect.width - popupRect.width) / 2;
          break;
        case 'top':
          top = highlightRect.top - popupRect.height - gap;
          left = highlightRect.left + (highlightRect.width - popupRect.width) / 2;
          break;
        case 'right':
          top = highlightRect.top + (highlightRect.height - popupRect.height) / 2;
          left = highlightRect.left + highlightRect.width + gap;
          break;
        case 'left':
          top = highlightRect.top + (highlightRect.height - popupRect.height) / 2;
          left = highlightRect.left - popupRect.width - gap;
          break;
      }
    }
    
    // Apply custom offsets if provided
    if (step.top !== undefined) top = step.top + scrollTop;
    if (step.left !== undefined) left = step.left + scrollLeft;
    
    // Keep popup within viewport
    top = Math.max(scrollTop + 16, Math.min(top, scrollTop + viewportHeight - popupRect.height - 16));
    left = Math.max(scrollLeft + 16, Math.min(left, scrollLeft + viewportWidth - popupRect.width - 16));
    
    setPopupPosition({ top, left });
  }, [highlightRect, currentStep, steps]);

  // Update highlight and popup position
  useEffect(() => {
    updateHighlight();
  }, [updateHighlight]);

  useEffect(() => {
    if (highlightRect) {
      // Use requestAnimationFrame to ensure popup is rendered before calculating position
      requestAnimationFrame(() => {
        updatePopupPosition();
      });
    }
  }, [highlightRect, updatePopupPosition]);

  // Handle window resize and scroll
  useEffect(() => {
    if (!isVisible) return;

    const handleUpdate = () => {
      updateHighlight();
    };

    window.addEventListener('resize', handleUpdate);
    window.addEventListener('scroll', handleUpdate, true);

    return () => {
      window.removeEventListener('resize', handleUpdate);
      window.removeEventListener('scroll', handleUpdate, true);
    };
  }, [isVisible, updateHighlight]);

  // Go to next step function (defined before event listeners)
  const goToNextStep = useCallback(() => {
    if (currentStep >= steps.length - 1) {
      // Last step completed
      onEnd?.(currentStep + 1);
      setIsVisible(false);
      setCurrentStep(0);
    } else {
      const nextStep = currentStep + 1;
      onNext?.(currentStep + 1);
      onStepChange?.(nextStep + 1);
      setCurrentStep(nextStep);
    }
  }, [currentStep, steps.length, onEnd, onNext, onStepChange]);

  // Handle step event listeners
  useEffect(() => {
    if (!isVisible || currentStep >= steps.length) return;

    const step = steps[currentStep];
    if (step.event === 'none' || !step.event) return;

    const eventSelector = step.eventEl || step.el;
    const element = getTargetElement(eventSelector);
    
    if (!element) return;

    const handleClick = () => {
      if (step.event === 'click') {
        goToNextStep();
      }
    };

    const handleKeyDown = (e: Event) => {
      if (step.event === 'enter' && (e as KeyboardEvent).key === 'Enter') {
        goToNextStep();
      }
    };

    if (step.event === 'click') {
      element.addEventListener('click', handleClick, true); // Use capture phase
    } else if (step.event === 'enter') {
      element.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      element.removeEventListener('click', handleClick, true);
      element.removeEventListener('keydown', handleKeyDown);
    };
  }, [isVisible, currentStep, steps, getTargetElement, goToNextStep]);

  // Handle step timeout
  useEffect(() => {
    if (!isVisible || stepTimeout <= 0 || currentStep >= steps.length) return;

    timeoutRef.current = setTimeout(() => {
      goToNextStep();
    }, stepTimeout);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isVisible, stepTimeout, currentStep, steps.length, goToNextStep]);

  // Handle keyboard events (Escape to close)
  useEffect(() => {
    if (!isVisible) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleSkip();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isVisible]);

  const goToPreviousStep = useCallback(() => {
    if (currentStep > 0) {
      const prevStep = currentStep - 1;
      onPrevious?.(currentStep + 1);
      onStepChange?.(prevStep + 1);
      setCurrentStep(prevStep);
    }
  }, [currentStep, onPrevious, onStepChange]);

  const handleSkip = useCallback(() => {
    onSkip?.(currentStep + 1);
    setIsVisible(false);
    setCurrentStep(0);
  }, [currentStep, onSkip]);

  const start = useCallback(() => {
    const shouldStart = onBeforeStart?.();
    if (shouldStart === false) return;
    
    onStart?.();
    setCurrentStep(0);
    setIsVisible(true);
    onAfterStart?.();
  }, [onBeforeStart, onStart, onAfterStart]);

  const end = useCallback(() => {
    onEnd?.(currentStep + 1);
    setIsVisible(false);
    setCurrentStep(0);
  }, [currentStep, onEnd]);

  const resume = useCallback((step?: number) => {
    const targetStep = step !== undefined ? Math.max(1, Math.min(step, steps.length)) - 1 : 0;
    setCurrentStep(targetStep);
    setIsVisible(true);
    onStepChange?.(targetStep + 1);
  }, [steps.length, onStepChange]);

  // Expose methods via ref
  useImperativeHandle(ref, () => ({
    start,
    end,
    resume,
    getCurrentStep: () => currentStep + 1,
    getSteps: () => [...steps],
    setSteps: (newSteps: AvakioHintStep[]) => setSteps(newSteps),
    show: () => setIsVisible(true),
    hide: () => setIsVisible(false),
    isVisible: () => isVisible,
  }), [start, end, resume, currentStep, steps, isVisible]);

  if (!isVisible || steps.length === 0) {
    return null;
  }

  const step = steps[currentStep];
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;

  const prevLabel = typeof prevButton === 'string' ? prevButton : 'Previous';
  const nextLabel = typeof nextButton === 'string' ? nextButton : (isLastStep ? endLabel : 'Next');
  const showPrev = prevButton !== false && !isFirstStep;
  const showNext = nextButton !== false;

  // Don't render if hidden or disabled
  if (hidden || disabled) return null;

  const hintClassName = [
    'avakio-hint',
    `avakio-hint-theme-${theme}`,
    borderless && 'avakio-hint-borderless',
  ].filter(Boolean).join(' ');

  const popupStyle: React.CSSProperties = {
    top: popupPosition.top,
    left: popupPosition.left,
    ...(minWidth && { minWidth: typeof minWidth === 'number' ? `${minWidth}px` : minWidth }),
    ...(minHeight && { minHeight: typeof minHeight === 'number' ? `${minHeight}px` : minHeight }),
    ...(maxWidth && { maxWidth: typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth }),
    ...(maxHeight && { maxHeight: typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight }),
  };

  return createPortal(
    <div
      id={id}
      data-testid={testId}
      className={hintClassName}
    >
      {/* Overlay with cutout */}
      <div className="avakio-hint-overlay">
        <svg className="avakio-hint-mask" width="100%" height="100%">
          <defs>
            <mask id={`avakio-hint-mask-${id || 'default'}`}>
              <rect x="0" y="0" width="100%" height="100%" fill="white" />
              {highlightRect && (
                <rect
                  x={highlightRect.left}
                  y={highlightRect.top}
                  width={highlightRect.width}
                  height={highlightRect.height}
                  rx="8"
                  ry="8"
                  fill="black"
                />
              )}
            </mask>
          </defs>
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="rgba(0, 0, 0, 0.5)"
            mask={`url(#avakio-hint-mask-${id || 'default'})`}
          />
        </svg>
      </div>

      {/* Highlight border */}
      {highlightRect && (
        <div
          className="avakio-hint-highlight"
          style={{
            top: highlightRect.top,
            left: highlightRect.left,
            width: highlightRect.width,
            height: highlightRect.height,
          }}
        />
      )}

      {/* Popup */}
      <div
        ref={popupRef}
        className="avakio-hint-popup"
        style={popupStyle}
      >
        <button
          className="avakio-hint-close"
          onClick={handleSkip}
          aria-label="Close hint"
        >
          ×
        </button>

        {step.title && (
          <div className="avakio-hint-title">{step.title}</div>
        )}

        {step.text && (
          <div className="avakio-hint-text">
            {typeof step.text === 'string' ? step.text : step.text}
          </div>
        )}

        <div className="avakio-hint-footer">
          <div className="avakio-hint-step-indicator">
            {currentStep + 1} / {steps.length}
          </div>
          <div className="avakio-hint-buttons">
            {showPrev && (
              <button
                className="avakio-hint-btn avakio-hint-btn-prev"
                onClick={goToPreviousStep}
              >
                {prevLabel}
              </button>
            )}
            {showNext && (
              <button
                className="avakio-hint-btn avakio-hint-btn-next"
                onClick={goToNextStep}
              >
                {nextLabel}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
});

AvakioHint.displayName = 'AvakioHint';

export default AvakioHint;











