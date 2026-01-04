import React, { forwardRef, useImperativeHandle, useState, useRef, useEffect } from 'react';
import './avakio-switch-button.css';

export type AvakioSwitchButtonTheme = 'material' | 'flat' | 'compact' | 'dark' | 'ocean' | 'sunset';
export type AvakioSwitchButtonSize = 'sm' | 'md' | 'lg';

export interface AvakioSwitchButtonProps {
  /** Unique identifier */
  id?: string;
  /** Test ID for testing purposes */
  testId?: string;
  /** Name for form submission */
  name?: string;
  /** Current on/off state (controlled) - 1 for on, 0 for off */
  value?: boolean | number;
  /** Default on/off state (uncontrolled) */
  defaultValue?: boolean | number;
  /** Label text (displayed to the left) */
  label?: string;
  /** Width of the label in pixels */
  labelWidth?: number;
  /** Right-hand label text */
  labelRight?: string;
  /** Text label on the switch when in the "on" state */
  onLabel?: string;
  /** Text label on the switch when in the "off" state */
  offLabel?: string;
  /** Button size */
  size?: AvakioSwitchButtonSize;
  /** Theme variant */
  theme?: AvakioSwitchButtonTheme;
  /** Disabled state */
  disabled?: boolean;
  /** Required field */
  required?: boolean;
  /** Invalid state */
  invalid?: boolean;
  /** Invalid message */
  invalidMessage?: string;
  /** Bottom label text */
  bottomLabel?: string;
  /** Tooltip text */
  tooltip?: string;
  /** CSS class name */
  className?: string;
  /** Inline styles */
  css?: React.CSSProperties;
  /** Width */
  width?: number | string;
  /** Height */
  height?: number | string;
  /** Callback when value changes */
  onChange?: (value: boolean) => void;
  /** Callback when clicked */
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  /** Callback when focused */
  onFocus?: (e: React.FocusEvent<HTMLButtonElement>) => void;
  /** Callback when blurred */
  onBlur?: (e: React.FocusEvent<HTMLButtonElement>) => void;
}

export interface AvakioSwitchButtonRef {
  /** Get the current on/off state */
  getValue: () => boolean;
  /** Set the on/off state */
  setValue: (value: boolean) => void;
  /** Toggle the state */
  toggle: () => void;
  /** Focus the switch */
  focus: () => void;
  /** Blur the switch */
  blur: () => void;
  /** Enable the switch */
  enable: () => void;
  /** Disable the switch */
  disable: () => void;
  /** Check if enabled */
  isEnabled: () => boolean;
  /** Get the HTML element */
  getNode: () => HTMLButtonElement | null;
  /** Refresh/repaint the component */
  refresh: () => void;
}

export const AvakioSwitchButton = forwardRef<AvakioSwitchButtonRef, AvakioSwitchButtonProps>(
  (
    {
      id,
      testId,
      name,
      value,
      defaultValue = false,
      label,
      labelWidth = 80,
      labelRight,
      onLabel,
      offLabel,
      size = 'md',
      theme,
      disabled: disabledProp = false,
      required = false,
      invalid = false,
      invalidMessage,
      bottomLabel,
      tooltip,
      className = '',
      css,
      width,
      height,
      onChange,
      onClick,
      onFocus,
      onBlur,
    },
    ref
  ) => {
    const switchRef = useRef<HTMLButtonElement>(null);
    const isControlled = value !== undefined;
    const normalizeValue = (val: boolean | number | undefined): boolean => {
      if (val === undefined) return false;
      return val === true || val === 1;
    };
    const [internalValue, setInternalValue] = useState<boolean>(normalizeValue(defaultValue));
    const [disabled, setDisabled] = useState<boolean>(disabledProp);
    const [, forceUpdate] = useState({});

    const isOn = isControlled ? normalizeValue(value) : internalValue;

    // Sync disabled prop
    useEffect(() => {
      setDisabled(disabledProp);
    }, [disabledProp]);

    // Expose imperative methods
    useImperativeHandle(ref, () => ({
      getValue: () => (isControlled ? normalizeValue(value) : internalValue),
      setValue: (newValue: boolean) => {
        if (!isControlled) {
          setInternalValue(newValue);
        }
        onChange?.(newValue);
      },
      toggle: () => {
        const currentValue = isControlled ? normalizeValue(value) : internalValue;
        const newValue = !currentValue;
        if (!isControlled) {
          setInternalValue(newValue);
        }
        onChange?.(newValue);
      },
      focus: () => switchRef.current?.focus(),
      blur: () => switchRef.current?.blur(),
      enable: () => setDisabled(false),
      disable: () => setDisabled(true),
      isEnabled: () => !disabled,
      getNode: () => switchRef.current,
      refresh: () => forceUpdate({}),
    }), [isControlled, value, internalValue, disabled, onChange]);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) return;
      
      const newValue = !isOn;
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
      onClick?.(e);
    };

    // Build class names
    const containerClassNames = [
      'avakio-switch-container',
      `avakio-switch-container-${size}`,
      theme && `avakio-switch-theme-${theme}`,
      disabled && 'avakio-switch-container-disabled',
      invalid && 'avakio-switch-container-invalid',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const switchClassNames = [
      'avakio-switch-button',
      `avakio-switch-button-${size}`,
      isOn && 'avakio-switch-button-on',
      disabled && 'avakio-switch-button-disabled',
      (onLabel || offLabel) && 'avakio-switch-button-with-labels',
    ]
      .filter(Boolean)
      .join(' ');

    // Build styles
    const containerStyles: React.CSSProperties = {
      ...(css && typeof css === 'object' && !Array.isArray(css) ? css : {}),
      width: typeof width === 'number' ? `${width}px` : width,
      height: typeof height === 'number' ? `${height}px` : height,
    };

    const labelStyles: React.CSSProperties = {
      width: labelWidth > 0 ? `${labelWidth}px` : undefined,
      minWidth: labelWidth > 0 ? `${labelWidth}px` : undefined,
    };

    // Determine switch inner text
    const switchInnerText = isOn ? onLabel : offLabel;
    const hasInnerLabels = onLabel || offLabel;

    return (
      <div
        className={containerClassNames}
        style={containerStyles}
        data-admin-theme={theme}
      >
        {/* Left Label */}
        {label && (
          <label 
            className="avakio-switch-label avakio-switch-label-left"
            style={labelStyles}
          >
            {label}
            {required && <span className="avakio-switch-required">*</span>}
          </label>
        )}

        {/* Switch Track */}
        <button
          ref={switchRef}
          id={id}
          data-testid={testId}
          name={name}
          type="button"
          role="switch"
          aria-checked={isOn}
          aria-disabled={disabled}
          aria-label={label || labelRight || 'Switch'}
          className={switchClassNames}
          disabled={disabled}
          title={tooltip}
          onClick={handleClick}
          onFocus={onFocus}
          onBlur={onBlur}
        >
          {/* Track with inner labels */}
          <span className="avakio-switch-track">
            {hasInnerLabels && (
              <>
                <span className="avakio-switch-track-on-label">{onLabel}</span>
                <span className="avakio-switch-track-off-label">{offLabel}</span>
              </>
            )}
            <span className="avakio-switch-thumb" />
          </span>
        </button>

        {/* Right Label */}
        {labelRight && (
          <label className="avakio-switch-label avakio-switch-label-right">
            {labelRight}
            {required && !label && <span className="avakio-switch-required">*</span>}
          </label>
        )}

        {/* Bottom Label / Invalid Message */}
        {(bottomLabel || (invalid && invalidMessage)) && (
          <div className="avakio-switch-bottom">
            {invalid && invalidMessage ? (
              <span className="avakio-switch-invalid-message">{invalidMessage}</span>
            ) : (
              <span className="avakio-switch-bottom-label">{bottomLabel}</span>
            )}
          </div>
        )}
      </div>
    );
  }
);

AvakioSwitchButton.displayName = 'AvakioSwitchButton';











