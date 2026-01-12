import React, { forwardRef, useImperativeHandle, useState, useRef, useEffect, useCallback } from 'react';
import { AvakioControlLabel } from '../../base/avakio-control-label/avakio-control-label';
import './avakio-segmented-button.css';

export type AvakioSegmentedButtonTheme = 'material' | 'flat' | 'compact' | 'dark' | 'ocean' | 'sunset';
export type AvakioSegmentedButtonSize = 'sm' | 'md' | 'lg';
export type AvakioSegmentedButtonAlign = 'left' | 'center' | 'right';

export interface AvakioSegmentedOption {
  /** Unique identifier for the option */
  id: string | number;
  /** Display label for the segment */
  value: string;
  /** Optional icon to display */
  icon?: React.ReactNode;
  /** Badge content (string or number) */
  badge?: string | number;
  /** Whether this option is disabled */
  disabled?: boolean;
  /** Whether this option is hidden */
  hidden?: boolean;
  /** Tooltip text for this option */
  tooltip?: string;
  /** ARIA controls ID */
  ariaControls?: string;
}

export interface AvakioSegmentedButtonProps {
  /** Unique identifier */
  id?: string;
  /** Test ID for testing purposes */
  testId?: string;
  /** Name for form submission */
  name?: string;
  /** Current selected value (controlled) */
  value?: string | number | null;
  /** Default selected value (uncontrolled) */
  defaultValue?: string | number;
  /** Array of options or simple string array */
  options?: AvakioSegmentedOption[] | string[];
  /** Label text */
  label?: string;
  /** Label width */
  labelWidth?: number;
  /** Label alignment */
  labelAlign?: 'left' | 'right';
  /** Label position */
  labelPosition?: 'left' | 'top';
  /** Mark as required */
  required?: boolean;
  /** Error message */
  error?: string;
  /** Invalid message (shown on validation) */
  invalidMessage?: string;
  /** Bottom label text */
  bottomLabel?: string;
  /** Button size */
  size?: AvakioSegmentedButtonSize;
  /** Content alignment */
  align?: AvakioSegmentedButtonAlign;
  /** Theme variant */
  theme?: AvakioSegmentedButtonTheme;
  /** Whether to fill available width */
  fill?: boolean;
  /** Fixed option width */
  optionWidth?: number;
  /** Disabled state */
  disabled?: boolean;
  /** Borderless style */
  borderless?: boolean;
  /** CSS class name */
  className?: string;
  /** Inline styles */
  css?: React.CSSProperties;
  /** Width */
  width?: number | string;
  /** Height */
  height?: number | string;
  /** Minimum width */
  minWidth?: number | string;
  /** Minimum height */
  minHeight?: number | string;
  /** Maximum width */
  maxWidth?: number | string;
  /** Maximum height */
  maxHeight?: number | string;
  /** Whether the component is hidden */
  hidden?: boolean;
  /** Connect to multiview (for switching views) */
  multiview?: boolean;
  /** Tooltip text */
  tooltip?: string;
  /** Input alignment */
  inputAlign?: 'left' | 'center' | 'right';
  /** Input width */
  inputWidth?: number;
  /** Input height */
  inputHeight?: number;
  /** Callback when value changes */
  onChange?: (value: string | number | null, option?: AvakioSegmentedOption | null) => void;
  /** Callback before segment is clicked (return false to cancel) */
  onBeforeTabClick?: (id: string | number) => boolean | void;
  /** Callback after segment is clicked */
  onAfterTabClick?: (id: string | number) => void;
  /** Callback when an option is added */
  onOptionAdd?: (option: AvakioSegmentedOption) => void;
  /** Callback when an option is removed */
  onOptionRemove?: (id: string | number) => void;
  /** Padding (number for all sides, string for CSS, or [top, right, bottom, left]) */
  padding?: string | number | [number, number, number, number];
  /** Margin (number for all sides, string for CSS, or [top, right, bottom, left]) */
  margin?: string | number | [number, number, number, number];
}

export interface AvakioSegmentedButtonRef {
  /** Get the current selected value */
  getValue: () => string | number | null;
  /** Set the selected value */
  setValue: (value: string | number | null) => void;
  /** Get a specific option by ID */
  getOption: (id: string | number) => AvakioSegmentedOption | undefined;
  /** Get all options */
  getOptions: () => AvakioSegmentedOption[];
  /** Add a new option */
  addOption: (option: AvakioSegmentedOption, index?: number) => void;
  /** Remove an option by ID */
  removeOption: (id: string | number) => void;
  /** Hide an option */
  hideOption: (id: string | number) => void;
  /** Show a hidden option */
  showOption: (id: string | number) => void;
  /** Disable a specific option */
  disableOption: (id: string | number) => void;
  /** Enable a specific option */
  enableOption: (id: string | number) => void;
  /** Get the index of an option */
  optionIndex: (id: string | number) => number;
  /** Refresh the component */
  refresh: () => void;
  /** Focus the component */
  focus: () => void;
  /** Blur the component */
  blur: () => void;
  /** Enable the component */
  enable: () => void;
  /** Disable the component */
  disable: () => void;
  /** Check if enabled */
  isEnabled: () => boolean;
  /** Hide the component */
  hide: () => void;
  /** Show the component */
  show: () => void;
  /** Check if visible */
  isVisible: () => boolean;
  /** Validate the control */
  validate: () => boolean;
  /** Get the HTML element */
  getNode: () => HTMLDivElement | null;
}

// Normalize options to AvakioSegmentedOption[]
const normalizeOptions = (options: AvakioSegmentedOption[] | string[]): AvakioSegmentedOption[] => {
  return options.map((opt, index) => {
    if (typeof opt === 'string') {
      return { id: opt, value: opt };
    }
    return opt;
  });
};

export const AvakioSegmentedButton = forwardRef<AvakioSegmentedButtonRef, AvakioSegmentedButtonProps>(
  (
    {
      id,
      testId,
      name,
      value,
      defaultValue,
      options: optionsProp = [],
      label,
      labelWidth = 120,
      labelAlign = 'left',
      labelPosition = 'left',
      required = false,
      error,
      invalidMessage,
      bottomLabel,
      size = 'md',
      align = 'left',
      theme,
      fill = false,
      optionWidth,
      disabled: disabledProp = false,
      borderless = false,
      className = '',
      css,
      width,
      height,
      minWidth,
      maxWidth,
      multiview = false,
      tooltip,
      inputAlign,
      inputWidth,
      inputHeight,
      onChange,
      onBeforeTabClick,
      onAfterTabClick,
      onOptionAdd,
      onOptionRemove,
      padding,
      margin,
    },
    ref
  ) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const segmentRefs = useRef<(HTMLButtonElement | null)[]>([]);
    
    // State
    const [internalOptions, setInternalOptions] = useState<AvakioSegmentedOption[]>(() => 
      normalizeOptions(optionsProp)
    );
    const isControlled = value !== undefined;
    const [internalValue, setInternalValue] = useState<string | number | null>(() => {
      if (defaultValue !== undefined) return defaultValue;
      const normalized = normalizeOptions(optionsProp);
      const firstEnabled = normalized.find(opt => !opt.disabled && !opt.hidden);
      return firstEnabled?.id ?? null;
    });
    const [disabled, setDisabled] = useState<boolean>(disabledProp);
    const [visible, setVisible] = useState<boolean>(true);
    const [hiddenOptions, setHiddenOptions] = useState<Set<string | number>>(new Set());
    const [disabledOptions, setDisabledOptions] = useState<Set<string | number>>(new Set());
    const [refreshKey, setRefreshKey] = useState(0);

    const currentValue = isControlled ? value : internalValue;

    // Sync options when prop changes
    useEffect(() => {
      setInternalOptions(normalizeOptions(optionsProp));
    }, [optionsProp]);

    // Sync disabled prop
    useEffect(() => {
      setDisabled(disabledProp);
    }, [disabledProp]);

    // Ensure value points to valid option
    useEffect(() => {
      if (isControlled) return;
      
      const visibleOptions = internalOptions.filter(
        opt => !opt.hidden && !hiddenOptions.has(opt.id)
      );
      const exists = visibleOptions.some(
        opt => opt.id === internalValue && !opt.disabled && !disabledOptions.has(opt.id)
      );
      
      if (!exists && visibleOptions.length > 0) {
        const fallback = visibleOptions.find(
          opt => !opt.disabled && !disabledOptions.has(opt.id)
        )?.id ?? null;
        setInternalValue(fallback);
      }
    }, [internalOptions, internalValue, isControlled, hiddenOptions, disabledOptions]);

    // Get visible options
    const visibleOptions = internalOptions.filter(
      opt => !opt.hidden && !hiddenOptions.has(opt.id)
    );

    // Handle segment click
    const handleSegmentClick = useCallback((optionId: string | number) => {
      if (disabled) return;
      
      const option = internalOptions.find(opt => opt.id === optionId);
      if (!option) return;
      if (option.disabled || disabledOptions.has(optionId)) return;

      // Check before click callback
      if (onBeforeTabClick) {
        const result = onBeforeTabClick(optionId);
        if (result === false) return;
      }

      if (!isControlled) {
        setInternalValue(optionId);
      }

      onChange?.(optionId, option);
      onAfterTabClick?.(optionId);
    }, [disabled, internalOptions, disabledOptions, isControlled, onChange, onBeforeTabClick, onAfterTabClick]);

    // Handle keyboard navigation
    const handleKeyDown = useCallback((e: React.KeyboardEvent, index: number) => {
      if (disabled) return;

      let targetIndex = -1;

      switch (e.key) {
        case 'ArrowLeft':
        case 'ArrowUp':
          e.preventDefault();
          targetIndex = index - 1;
          while (targetIndex >= 0) {
            const opt = visibleOptions[targetIndex];
            if (!opt.disabled && !disabledOptions.has(opt.id)) break;
            targetIndex--;
          }
          break;
        case 'ArrowRight':
        case 'ArrowDown':
          e.preventDefault();
          targetIndex = index + 1;
          while (targetIndex < visibleOptions.length) {
            const opt = visibleOptions[targetIndex];
            if (!opt.disabled && !disabledOptions.has(opt.id)) break;
            targetIndex++;
          }
          break;
        case 'Home':
          e.preventDefault();
          targetIndex = 0;
          while (targetIndex < visibleOptions.length) {
            const opt = visibleOptions[targetIndex];
            if (!opt.disabled && !disabledOptions.has(opt.id)) break;
            targetIndex++;
          }
          break;
        case 'End':
          e.preventDefault();
          targetIndex = visibleOptions.length - 1;
          while (targetIndex >= 0) {
            const opt = visibleOptions[targetIndex];
            if (!opt.disabled && !disabledOptions.has(opt.id)) break;
            targetIndex--;
          }
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          handleSegmentClick(visibleOptions[index].id);
          return;
      }

      if (targetIndex >= 0 && targetIndex < visibleOptions.length) {
        segmentRefs.current[targetIndex]?.focus();
      }
    }, [disabled, visibleOptions, disabledOptions, handleSegmentClick]);

    // Expose imperative methods
    useImperativeHandle(ref, () => ({
      getValue: () => currentValue,
      setValue: (val: string | number | null) => {
        if (!isControlled) {
          setInternalValue(val);
        }
        const option = internalOptions.find(opt => opt.id === val);
        onChange?.(val, option);
      },
      getOption: (optId: string | number) => internalOptions.find(opt => opt.id === optId),
      getOptions: () => internalOptions,
      addOption: (option: AvakioSegmentedOption, index?: number) => {
        setInternalOptions(prev => {
          const newOptions = [...prev];
          if (index !== undefined && index >= 0 && index <= prev.length) {
            newOptions.splice(index, 0, option);
          } else {
            newOptions.push(option);
          }
          return newOptions;
        });
        onOptionAdd?.(option);
      },
      removeOption: (optId: string | number) => {
        setInternalOptions(prev => prev.filter(opt => opt.id !== optId));
        onOptionRemove?.(optId);
        // If removed option was selected, select first available
        if (currentValue === optId && !isControlled) {
          const remaining = internalOptions.filter(
            opt => opt.id !== optId && !opt.hidden && !hiddenOptions.has(opt.id)
          );
          const fallback = remaining.find(
            opt => !opt.disabled && !disabledOptions.has(opt.id)
          )?.id ?? null;
          setInternalValue(fallback);
        }
      },
      hideOption: (optId: string | number) => {
        setHiddenOptions(prev => {
          const next = new Set(Array.from(prev));
          next.add(optId);
          return next;
        });
      },
      showOption: (optId: string | number) => {
        setHiddenOptions(prev => {
          const next = new Set(prev);
          next.delete(optId);
          return next;
        });
      },
      disableOption: (optId: string | number) => {
        setDisabledOptions(prev => {
          const next = new Set(Array.from(prev));
          next.add(optId);
          return next;
        });
      },
      enableOption: (optId: string | number) => {
        setDisabledOptions(prev => {
          const next = new Set(prev);
          next.delete(optId);
          return next;
        });
      },
      optionIndex: (optId: string | number) => internalOptions.findIndex(opt => opt.id === optId),
      refresh: () => setRefreshKey(k => k + 1),
      focus: () => {
        const currentIndex = visibleOptions.findIndex(opt => opt.id === currentValue);
        const focusIndex = currentIndex >= 0 ? currentIndex : 0;
        segmentRefs.current[focusIndex]?.focus();
      },
      blur: () => {
        segmentRefs.current.forEach(el => el?.blur());
      },
      enable: () => setDisabled(false),
      disable: () => setDisabled(true),
      isEnabled: () => !disabled,
      hide: () => setVisible(false),
      show: () => setVisible(true),
      isVisible: () => visible,
      validate: () => {
        if (required && currentValue === null) {
          return false;
        }
        return true;
      },
      getNode: () => containerRef.current,
    }), [
      currentValue, isControlled, internalOptions, visibleOptions, 
      hiddenOptions, disabledOptions, disabled, visible, required, 
      onChange, onOptionAdd, onOptionRemove
    ]);

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

    // Build container styles
    const containerStyles: React.CSSProperties = {
      ...(css && typeof css === 'object' && !Array.isArray(css) ? css : {}),
      ...(width !== undefined && { width: typeof width === 'number' ? `${width}px` : width }),
      ...(height !== undefined && { height: typeof height === 'number' ? `${height}px` : height }),
      ...(minWidth !== undefined && { minWidth: typeof minWidth === 'number' ? `${minWidth}px` : minWidth }),
      ...(maxWidth !== undefined && { maxWidth: typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth }),
      ...(visible === false && { display: 'none' }),
      ...(paddingStyle && { padding: paddingStyle }),
      ...(marginStyle && { margin: marginStyle }),
    };

    // Build input container styles
    const inputContainerStyles: React.CSSProperties = {
      ...(inputWidth !== undefined && { width: typeof inputWidth === 'number' ? `${inputWidth}px` : inputWidth }),
      ...(inputHeight !== undefined && { height: typeof inputHeight === 'number' ? `${inputHeight}px` : inputHeight }),
      ...(inputAlign !== undefined && { justifyContent: inputAlign === 'left' ? 'flex-start' : inputAlign === 'right' ? 'flex-end' : 'center' }),
    };

    const hasError = !!error || !!invalidMessage;

    return (
      <AvakioControlLabel
        label={label}
        labelPosition={labelPosition}
        labelAlign={labelAlign}
        labelWidth={labelWidth}
        bottomLabel={!hasError ? bottomLabel : undefined}
        required={required}
        invalid={hasError}
        invalidMessage={error || invalidMessage}
        classPrefix="avakio-segmented"
      >
      <div
        ref={containerRef}
        id={id}
        data-testid={testId}
        data-admin-theme={theme}
        className={[
          'avakio-segmented',
          `avakio-segmented-size-${size}`,
          `avakio-segmented-align-${align}`,
          fill ? 'avakio-segmented-fill' : '',
          borderless ? 'avakio-segmented-borderless' : '',
          disabled ? 'avakio-segmented-disabled' : '',
          hasError ? 'avakio-segmented-error' : '',
          labelPosition === 'top' ? 'avakio-segmented-label-top' : '',
          className,
        ].filter(Boolean).join(' ')}
        style={containerStyles}
        title={tooltip}
        key={refreshKey}
      >
        <div className="avakio-segmented-wrapper" style={inputContainerStyles}>
          <div 
            className="avakio-segmented-track"
            role="tablist"
            aria-label={label || 'Segmented control'}
          >
            {visibleOptions.map((option, index) => {
              const isActive = option.id === currentValue;
              const isDisabled = disabled || option.disabled || disabledOptions.has(option.id);

              return (
                <button
                  key={option.id}
                  ref={(el) => { segmentRefs.current[index] = el; }}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-disabled={isDisabled}
                  aria-controls={option.ariaControls}
                  tabIndex={isActive ? 0 : -1}
                  className={[
                    'avakio-segmented-segment',
                    isActive ? 'avakio-segmented-segment-active' : '',
                    isDisabled ? 'avakio-segmented-segment-disabled' : '',
                  ].filter(Boolean).join(' ')}
                  style={optionWidth ? { width: optionWidth } : undefined}
                  title={option.tooltip}
                  disabled={isDisabled}
                  onClick={() => handleSegmentClick(option.id)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                >
                  {option.icon && (
                    <span className="avakio-segmented-icon">{option.icon}</span>
                  )}
                  <span className="avakio-segmented-text">{option.value}</span>
                  {option.badge !== undefined && (
                    <span className="avakio-segmented-badge">{option.badge}</span>
                  )}
                </button>
              );
            })}
          </div>

          {name && (
            <input
              type="hidden"
              name={name}
              value={currentValue?.toString() ?? ''}
            />
          )}
        </div>
      </div>
      </AvakioControlLabel>
    );
  }
);

AvakioSegmentedButton.displayName = 'AvakioSegmentedButton';

export default AvakioSegmentedButton;











