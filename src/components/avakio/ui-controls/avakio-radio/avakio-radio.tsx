import React, { forwardRef, useImperativeHandle, useState, useRef, useEffect, useId } from 'react';
import { AvakioControlLabel } from '../../base/avakio-control-label/avakio-control-label';
import './avakio-radio.css';

export type AvakioRadioTheme = 'material' | 'flat' | 'compact' | 'dark' | 'ocean' | 'sunset';
export type AvakioRadioSize = 'sm' | 'md' | 'lg';

export interface AvakioRadioOption {
  /** Unique identifier for the option */
  id: string | number;
  /** Display label for the option */
  value: string;
  /** Optional icon */
  icon?: React.ReactNode;
  /** Whether this option is disabled */
  disabled?: boolean;
  /** Whether this option is hidden */
  hidden?: boolean;
  /** Custom CSS class for this option */
  css?: string;
  /** Tooltip for this option */
  tooltip?: string;
}

export interface AvakioRadioProps {
  /** Unique identifier */
  id?: string;
  /** Test ID for testing purposes */
  testId?: string;
  /** Name for form submission */
  name?: string;
  /** Current selected value (controlled) */
  value?: string | number | null;
  /** Default selected value (uncontrolled) */
  defaultValue?: string | number | null;
  /** Array of radio options */
  options: AvakioRadioOption[] | string[];
  /** Label text (displayed to the left or top) */
  label?: string;
  /** Width of the label in pixels */
  labelWidth?: number;
  /** Label alignment ('left' | 'right') */
  labelAlign?: 'left' | 'right';
  /** Label position ('left' | 'top') */
  labelPosition?: 'left' | 'top';
  /** Vertical layout for radio options */
  vertical?: boolean;
  /** Radio button size */
  size?: AvakioRadioSize;
  /** Theme variant */
  theme?: AvakioRadioTheme;
  /** Disabled state for all options */
  disabled?: boolean;
  /** Required field */
  required?: boolean;
  /** Invalid state */
  invalid?: boolean;
  /** Invalid message */
  invalidMessage?: string;
  /** Bottom label text */
  bottomLabel?: string;
  /** Custom radio rendering (false = use native HTML radio) */
  customRadio?: boolean;
  /** Height of each radio option */
  optionHeight?: number;
  /** CSS class name */
  className?: string;
  /** Inline styles */
  css?: React.CSSProperties;
  /** Width */
  width?: number | string;
  /** Height */
  height?: number | string;
  /** Callback when value changes */
  onChange?: (value: string | number) => void;
  /** Callback when an option is clicked */
  onClick?: (e: React.MouseEvent, option: AvakioRadioOption) => void;
  /** Callback when focused */
  onFocus?: (e: React.FocusEvent) => void;
  /** Callback when blurred */
  onBlur?: (e: React.FocusEvent) => void;
  /** Padding (number for all sides, string for CSS, or [top, right, bottom, left]) */
  padding?: string | number | [number, number, number, number];
  /** Margin (number for all sides, string for CSS, or [top, right, bottom, left]) */
  margin?: string | number | [number, number, number, number];
  /** Minimum width */
  minWidth?: string | number;
  /** Minimum height */
  minHeight?: string | number;
  /** Whether the component is borderless */
  borderless?: boolean;
  /** Whether the component is hidden */
  hidden?: boolean;
  /** Maximum height */
  maxHeight?: number | string;
  /** Maximum width */
  maxWidth?: number | string;
}

export interface AvakioRadioRef {
  /** Get the current selected value */
  getValue: () => string | number | null;
  /** Set the selected value */
  setValue: (value: string | number | null) => void;
  /** Focus the first non-disabled option */
  focus: () => void;
  /** Blur the control */
  blur: () => void;
  /** Enable the control */
  enable: () => void;
  /** Disable the control */
  disable: () => void;
  /** Enable a specific option */
  enableOption: (id: string | number) => void;
  /** Disable a specific option */
  disableOption: (id: string | number) => void;
  /** Show a hidden option */
  showOption: (id: string | number) => void;
  /** Hide an option */
  hideOption: (id: string | number) => void;
  /** Check if enabled */
  isEnabled: () => boolean;
  /** Get the HTML container element */
  getNode: () => HTMLDivElement | null;
  /** Get the option configuration by id */
  getOption: (id: string | number) => AvakioRadioOption | undefined;
  /** Refresh/repaint the component */
  refresh: () => void;
}

// Normalize options to consistent format
function normalizeOptions(options: AvakioRadioOption[] | string[]): AvakioRadioOption[] {
  return options.map((opt, index) => {
    if (typeof opt === 'string') {
      return { id: opt, value: opt };
    }
    return opt;
  });
}

export const AvakioRadio = forwardRef<AvakioRadioRef, AvakioRadioProps>(
  (
    {
      id,
      testId,
      name,
      value,
      defaultValue = null,
      options: optionsProp,
      label,
      labelWidth = 80,
      labelAlign = 'left',
      labelPosition = 'left',
      vertical = false,
      size = 'md',
      theme,
      disabled: disabledProp = false,
      required = false,
      invalid = false,
      invalidMessage,
      bottomLabel,
      customRadio = true,
      optionHeight,
      className = '',
      css,
      width,
      height,
      onChange,
      onClick,
      onFocus,
      onBlur,
      padding,
      margin,
    },
    ref
  ) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRefs = useRef<Map<string | number, HTMLInputElement>>(new Map());
    const autoId = useId();
    const radioName = name || `avakio-radio-${autoId}`;
    
    const isControlled = value !== undefined;
    const [internalValue, setInternalValue] = useState<string | number | null>(defaultValue);
    const [disabled, setDisabled] = useState<boolean>(disabledProp);
    const [optionStates, setOptionStates] = useState<Map<string | number, { disabled?: boolean; hidden?: boolean }>>(new Map());
    const [, forceUpdate] = useState({});

    const currentValue = isControlled ? value : internalValue;
    const options = normalizeOptions(optionsProp);

    // Sync disabled prop
    useEffect(() => {
      setDisabled(disabledProp);
    }, [disabledProp]);

    // Get effective option state (merged with local overrides)
    const getOptionState = (opt: AvakioRadioOption) => {
      const override = optionStates.get(opt.id);
      return {
        disabled: override?.disabled ?? opt.disabled ?? false,
        hidden: override?.hidden ?? opt.hidden ?? false,
      };
    };

    // Expose imperative methods
    useImperativeHandle(ref, () => ({
      getValue: () => (isControlled ? value : internalValue) ?? null,
      setValue: (newValue: string | number | null) => {
        if (!isControlled) {
          setInternalValue(newValue);
        }
        if (newValue !== null) {
          onChange?.(newValue);
        }
      },
      focus: () => {
        const firstEnabled = options.find(opt => !getOptionState(opt).disabled && !getOptionState(opt).hidden);
        if (firstEnabled) {
          inputRefs.current.get(firstEnabled.id)?.focus();
        }
      },
      blur: () => {
        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur();
        }
      },
      enable: () => setDisabled(false),
      disable: () => setDisabled(true),
      enableOption: (optId: string | number) => {
        setOptionStates(prev => {
          const next = new Map(prev);
          const current = next.get(optId) || {};
          next.set(optId, { ...current, disabled: false });
          return next;
        });
      },
      disableOption: (optId: string | number) => {
        setOptionStates(prev => {
          const next = new Map(prev);
          const current = next.get(optId) || {};
          next.set(optId, { ...current, disabled: true });
          return next;
        });
      },
      showOption: (optId: string | number) => {
        setOptionStates(prev => {
          const next = new Map(prev);
          const current = next.get(optId) || {};
          next.set(optId, { ...current, hidden: false });
          return next;
        });
      },
      hideOption: (optId: string | number) => {
        setOptionStates(prev => {
          const next = new Map(prev);
          const current = next.get(optId) || {};
          next.set(optId, { ...current, hidden: true });
          return next;
        });
      },
      isEnabled: () => !disabled,
      getNode: () => containerRef.current,
      getOption: (optId: string | number) => options.find(opt => opt.id === optId),
      refresh: () => forceUpdate({}),
    }));

    const handleChange = (optionId: string | number) => {
      if (!isControlled) {
        setInternalValue(optionId);
      }
      onChange?.(optionId);
    };

    const handleKeyDown = (e: React.KeyboardEvent, currentIndex: number) => {
      const visibleOptions = options.filter(opt => !getOptionState(opt).hidden);
      const currentVisibleIndex = visibleOptions.findIndex(opt => opt.id === options[currentIndex].id);
      
      let nextIndex = -1;
      
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        for (let i = 1; i <= visibleOptions.length; i++) {
          const idx = (currentVisibleIndex + i) % visibleOptions.length;
          if (!getOptionState(visibleOptions[idx]).disabled) {
            nextIndex = idx;
            break;
          }
        }
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        for (let i = 1; i <= visibleOptions.length; i++) {
          const idx = (currentVisibleIndex - i + visibleOptions.length) % visibleOptions.length;
          if (!getOptionState(visibleOptions[idx]).disabled) {
            nextIndex = idx;
            break;
          }
        }
      }

      if (nextIndex >= 0) {
        const nextOption = visibleOptions[nextIndex];
        inputRefs.current.get(nextOption.id)?.focus();
        handleChange(nextOption.id);
      }
    };

    const containerClasses = [
      'avakio-radio-container',
      `avakio-radio-container-${size}`,
      vertical ? 'avakio-radio-vertical' : 'avakio-radio-horizontal',
      labelPosition === 'top' ? 'avakio-radio-label-top' : '',
      disabled ? 'avakio-radio-container-disabled' : '',
      invalid ? 'avakio-radio-container-invalid' : '',
      className,
    ].filter(Boolean).join(' ');

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

    const containerStyle: React.CSSProperties = {
      ...(css && typeof css === 'object' && !Array.isArray(css) ? css : {}),
      ...(width ? { width: typeof width === 'number' ? `${width}px` : width } : {}),
      ...(height ? { height: typeof height === 'number' ? `${height}px` : height } : {}),
      ...(paddingStyle && { padding: paddingStyle }),
      ...(marginStyle && { margin: marginStyle }),
    };

    return (
      <AvakioControlLabel
        label={label}
        labelPosition={labelPosition}
        labelAlign={labelAlign}
        labelWidth={labelWidth}
        bottomLabel={bottomLabel}
        required={required}
        invalid={invalid}
        invalidMessage={invalidMessage}
        classPrefix="avakio-radio"
      >
      <div
        ref={containerRef}
        id={id}
        data-testid={testId}
        className={containerClasses}
        style={containerStyle}
        data-admin-theme={theme}
        role="radiogroup"
        aria-labelledby={label ? `${radioName}-label` : undefined}
        aria-required={required}
        aria-invalid={invalid}
      >
        {/* Options Container */}
        <div className="avakio-radio-options">
          {options.map((option, index) => {
            const optState = getOptionState(option);
            if (optState.hidden) return null;

            const isChecked = currentValue === option.id;
            const isDisabled = disabled || optState.disabled;

            const optionClasses = [
              'avakio-radio-option',
              isChecked ? 'avakio-radio-option-checked' : '',
              isDisabled ? 'avakio-radio-option-disabled' : '',
              customRadio ? 'avakio-radio-custom' : 'avakio-radio-native',
              option.css || '',
            ].filter(Boolean).join(' ');

            const optionStyle: React.CSSProperties = optionHeight
              ? { height: optionHeight }
              : {};

            return (
              <label
                key={option.id}
                className={optionClasses}
                style={optionStyle}
                title={option.tooltip}
                onClick={(e) => {
                  if (!isDisabled) {
                    onClick?.(e, option);
                  }
                }}
              >
                <input
                  ref={(el) => {
                    if (el) {
                      inputRefs.current.set(option.id, el);
                    } else {
                      inputRefs.current.delete(option.id);
                    }
                  }}
                  type="radio"
                  name={radioName}
                  value={String(option.id)}
                  checked={isChecked}
                  disabled={isDisabled}
                  onChange={() => handleChange(option.id)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onFocus={onFocus}
                  onBlur={onBlur}
                  className="avakio-radio-input"
                  aria-checked={isChecked}
                />
                {customRadio && (
                  <span className="avakio-radio-indicator">
                    <span className="avakio-radio-dot" />
                  </span>
                )}
                {option.icon && (
                  <span className="avakio-radio-icon">{option.icon}</span>
                )}
                <span className="avakio-radio-text">{option.value}</span>
              </label>
            );
          })}
        </div>
      </div>
      </AvakioControlLabel>
    );
  }
);

AvakioRadio.displayName = 'AvakioRadio';

export default AvakioRadio;











