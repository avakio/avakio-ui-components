import React, { forwardRef, useState, useEffect, useRef, useImperativeHandle, ChangeEvent, KeyboardEvent, FocusEvent } from 'react';
import { X, Eye, EyeOff, Copy } from 'lucide-react';
import './avakio-text.css';

export interface AvakioTextProps {
  /** The value of the text input */
  value?: string;
  /** The label text */
  label?: string;
  /** The placeholder text */
  placeholder?: string;
  /** The name attribute */
  name?: string;
  /** The type of input (text, password, email, url, number, tel) */
  type?: 'text' | 'password' | 'email' | 'url' | 'number' | 'tel' | 'search';
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Whether the input is readonly */
  readonly?: boolean;
  /** Whether the input is required */
  required?: boolean;
  /** The theme (material, flat, compact, dark, ocean, sunset) */
  theme?: string;
  /** Custom CSS class */
  className?: string;
  /** Width of the component */
  width?: string | number;
  /** Height of the component */
  height?: string | number;
  /** Label width */
  labelWidth?: number;
  /** Label position (left or top) */
  labelPosition?: 'left' | 'top';
  /** Label alignment (left or right) */
  labelAlign?: 'left' | 'right';
  /** Input alignment (left, center, right) */
  inputAlign?: 'left' | 'center' | 'right';
  /** Bottom label text */
  bottomLabel?: string;
  /** Shows clear button when input has value */
  clear?: boolean;
  /** Enables copy button to copy the input value to clipboard */
  enableValueCopyButton?: boolean;
  /** Enables copy button to copy the placeholder text to clipboard */
  enablePlaceHolderCopyButton?: boolean;
  /** Icon to show in the input */
  icon?: React.ReactNode;
  /** Icon position (left or right) */
  iconPosition?: 'left' | 'right';
  /** Validation rules */
  validate?: (value: string) => boolean | string;
  /** Validation event (change, blur, submit) */
  validateEvent?: 'change' | 'blur' | 'submit';
  /** Invalid state */
  invalid?: boolean;
  /** Invalid message */
  invalidMessage?: string;
  /** Maximum length */
  maxLength?: number;
  /** Pattern for HTML5 validation */
  pattern?: string;
  /** Minimum value (for number type) */
  min?: number;
  /** Maximum value (for number type) */
  max?: number;
  /** Step value (for number type) */
  step?: number;
  /** Autocomplete attribute */
  autoComplete?: string;
  /** Enable multiline mode (renders textarea instead of input) */
  multiline?: boolean;
  /** Number of visible rows (only for multiline) */
  rows?: number;
  /** onChange callback */
  onChange?: (value: string, event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  /** onBlur callback */
  onBlur?: (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  /** onFocus callback */
  onFocus?: (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  /** onEnter callback */
  onEnter?: (value: string) => void;
  /** onKeyPress callback (deprecated, use onKeyDown) */
  onKeyPress?: (event: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  /** onKeyDown callback */
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  /** onClick callback for the entire component */
  onClick?: () => void;
  /** Padding (number for all sides, string for CSS, or [top, right, bottom, left]) */
  padding?: string | number | [number, number, number, number];
  /** Margin (number for all sides, string for CSS, or [top, right, bottom, left]) */
  margin?: string | number | [number, number, number, number];
  /** Minimum width */
  minWidth?: string | number;
  /** Minimum height */
  minHeight?: string | number;
  /** Width of the text input/textarea (e.g., '100%', '200px') */
  textWidth?: string | number;
  /** Whether the component is borderless */
  borderless?: boolean;
  /** Whether the component is hidden */
  hidden?: boolean;
  /** Component ID */
  id?: string;
  /** Maximum height */
  maxHeight?: number | string;
  /** Maximum width */
  maxWidth?: number | string;
}

export interface AvakioTextRef {
  /** Get the current value */
  getValue: () => string;
  /** Set a new value */
  setValue: (value: string) => void;
  /** Focus the input */
  focus: () => void;
  /** Blur the input */
  blur: () => void;
  /** Validate the input */
  validate: () => boolean;
  /** Get the input element */
  getInputNode: () => HTMLInputElement | HTMLTextAreaElement | null;
  /** Clear the input */
  clear: () => void;
  /** Check if input is enabled */
  isEnabled: () => boolean;
  /** Disable the input */
  disable: () => void;
  /** Enable the input */
  enable: () => void;
}

export const AvakioText = forwardRef<AvakioTextRef, AvakioTextProps>(
  (
    {
      value = '',
      label,
      placeholder,
      name,
      type = 'text',
      disabled = false,
      readonly = false,
      required = false,
      theme = 'material',
      className = '',
      width,
      height,
      labelWidth = 100,
      labelPosition = 'left',
      labelAlign = 'left',
      inputAlign = 'left',
      bottomLabel,
      clear = false,
      enableValueCopyButton = false,
      enablePlaceHolderCopyButton = false,
      icon,
      iconPosition = 'left',
      validate,
      validateEvent = 'blur',
      invalid = false,
      invalidMessage,
      maxLength,
      pattern,
      min,
      max,
      step,
      autoComplete,
      multiline = false,
      rows = 4,
      onChange,
      onBlur,
      onFocus,
      onEnter,
      onKeyPress,
      onKeyDown,
      onClick,
      padding,
      margin,
      textWidth,
    },
    ref
  ) => {
    const [currentValue, setCurrentValue] = useState<string>(value);
    const [isInvalid, setIsInvalid] = useState(invalid);
    const [validationMessage, setValidationMessage] = useState(invalidMessage || '');
    const [isFocused, setIsFocused] = useState(false);
    const [isDisabled, setIsDisabled] = useState(disabled);
    const [showPassword, setShowPassword] = useState(false);
    const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

    useEffect(() => {
      setCurrentValue(value);
    }, [value]);

    useEffect(() => {
      setIsInvalid(invalid);
    }, [invalid]);

    useEffect(() => {
      setIsDisabled(disabled);
    }, [disabled]);

    const validateInput = (val: string): boolean => {
      if (validate) {
        const result = validate(val);
        if (typeof result === 'string') {
          setIsInvalid(true);
          setValidationMessage(result);
          return false;
        } else if (result === false) {
          setIsInvalid(true);
          setValidationMessage(invalidMessage || 'Invalid value');
          return false;
        }
      }

      // HTML5 validation
      if (required && !val.trim()) {
        setIsInvalid(true);
        setValidationMessage('This field is required');
        return false;
      }

      if (type === 'email' && val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
        setIsInvalid(true);
        setValidationMessage('Please enter a valid email address');
        return false;
      }

      if (type === 'url' && val && !/^https?:\/\/.+/.test(val)) {
        setIsInvalid(true);
        setValidationMessage('Please enter a valid URL');
        return false;
      }

      if (type === 'number' && val) {
        const num = parseFloat(val);
        if (isNaN(num)) {
          setIsInvalid(true);
          setValidationMessage('Please enter a valid number');
          return false;
        }
        if (min !== undefined && num < min) {
          setIsInvalid(true);
          setValidationMessage(`Value must be at least ${min}`);
          return false;
        }
        if (max !== undefined && num > max) {
          setIsInvalid(true);
          setValidationMessage(`Value must be at most ${max}`);
          return false;
        }
      }

      if (pattern && val && !new RegExp(pattern).test(val)) {
        setIsInvalid(true);
        setValidationMessage(invalidMessage || 'Invalid format');
        return false;
      }

      if (maxLength && val.length > maxLength) {
        setIsInvalid(true);
        setValidationMessage(`Maximum length is ${maxLength} characters`);
        return false;
      }

      setIsInvalid(false);
      setValidationMessage('');
      return true;
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const newValue = e.target.value;
      setCurrentValue(newValue);

      if (validateEvent === 'change') {
        validateInput(newValue);
      }

      if (onChange) {
        onChange(newValue, e);
      }
    };

    const handleBlur = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setIsFocused(false);

      if (validateEvent === 'blur') {
        validateInput(currentValue);
      }

      if (onBlur) {
        onBlur(e);
      }
    };

    const handleFocus = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setIsFocused(true);

      if (onFocus) {
        onFocus(e);
      }
    };

    const handleKeyPress = (e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !multiline && onEnter) {
        onEnter(currentValue);
      }

      if (onKeyPress) {
        onKeyPress(e);
      }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !multiline && onEnter) {
        onEnter(currentValue);
      }

      if (onKeyDown) {
        onKeyDown(e);
      }
    };

    const handleClear = () => {
      setCurrentValue('');
      setIsInvalid(false);
      setValidationMessage('');
      if (onChange) {
        onChange('', {} as ChangeEvent<HTMLInputElement | HTMLTextAreaElement>);
      }
      inputRef.current?.focus();
    };

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    const handleCopyToClipboard = () => {
      if (currentValue) {
        navigator.clipboard.writeText(currentValue).then(() => {
          // Optional: You could add a toast notification here
        }).catch((err) => {
          console.error('Failed to copy text: ', err);
        });
      }
    };

    const handleCopyPlaceholder = () => {
      if (placeholder) {
        navigator.clipboard.writeText(placeholder).then(() => {
          // Optional: You could add a toast notification here
        }).catch((err) => {
          console.error('Failed to copy placeholder: ', err);
        });
      }
    };

    useImperativeHandle(ref, () => ({
      getValue: () => currentValue,
      setValue: (val: string) => {
        setCurrentValue(val);
        if (validateEvent === 'change') {
          validateInput(val);
        }
      },
      focus: () => inputRef.current?.focus(),
      blur: () => inputRef.current?.blur(),
      validate: () => validateInput(currentValue),
      getInputNode: () => inputRef.current,
      clear: handleClear,
      isEnabled: () => !isDisabled,
      disable: () => setIsDisabled(true),
      enable: () => setIsDisabled(false),
    }));

    const labelStyle: React.CSSProperties = {
      width: labelPosition === 'left' ? labelWidth : undefined,
      textAlign: labelAlign,
    };

    const inputType = type === 'password' && showPassword ? 'text' : type;

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
      width: typeof width === 'number' ? `${width}px` : width,
      height: typeof height === 'number' ? `${height}px` : height,
      ...(paddingStyle && { padding: paddingStyle }),
      ...(marginStyle && { margin: marginStyle }),
    };

    const containerClasses = [
      'avakio-text',
      `avakio-text-theme-${theme}`,
      labelPosition === 'top' ? 'avakio-text-label-top' : 'avakio-text-label-left',
      isInvalid ? 'avakio-text-invalid' : '',
      isDisabled ? 'avakio-text-disabled' : '',
      isFocused ? 'avakio-text-focused' : '',
      readonly ? 'avakio-text-readonly' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const hasActionButton = (clear && currentValue) || type === 'password' || (enableValueCopyButton && currentValue) || (enablePlaceHolderCopyButton && placeholder);
    
    const inputClasses = [
      'avakio-text-input',
      `avakio-text-input-align-${inputAlign}`,
      icon && iconPosition === 'left' ? 'avakio-text-input-with-icon-left' : '',
      icon && iconPosition === 'right' && !hasActionButton ? 'avakio-text-input-with-icon-right' : '',
      hasActionButton ? 'avakio-text-input-with-action' : '',
    ]
      .filter(Boolean)
      .join(' ');

    const wrapperStyle: React.CSSProperties = textWidth
      ? { width: typeof textWidth === 'number' ? `${textWidth}px` : textWidth }
      : {};

    return (
      <div className={containerClasses} style={containerStyle} onClick={onClick}>
        {label && (
          <label className="avakio-text-label" style={labelStyle}>
            {label}
            {required && <span className="avakio-text-required">*</span>}
          </label>
        )}
        <div className="avakio-text-content">
          <div className="avakio-text-input-wrapper" style={wrapperStyle}>
            {icon && iconPosition === 'left' && (
              <span className="avakio-text-icon avakio-text-icon-left">{icon}</span>
            )}
            {multiline ? (
              <textarea
                ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                className={inputClasses}
                value={currentValue}
                placeholder={placeholder}
                name={name}
                disabled={isDisabled}
                readOnly={readonly}
                required={required}
                maxLength={maxLength}
                rows={rows}
                onChange={handleChange as any}
                onBlur={handleBlur as any}
                onFocus={handleFocus as any}
                onKeyPress={handleKeyPress as any}
                onKeyDown={handleKeyDown as any}
              />
            ) : (
              <input
                ref={inputRef as React.RefObject<HTMLInputElement>}
                type={inputType}
                className={inputClasses}
                value={currentValue}
                placeholder={placeholder}
                name={name}
                disabled={isDisabled}
                readOnly={readonly}
                required={required}
                maxLength={maxLength}
                pattern={pattern}
                min={min}
                max={max}
                step={step}
                autoComplete={autoComplete}
                onChange={handleChange as any}
                onBlur={handleBlur as any}
                onFocus={handleFocus as any}
                onKeyPress={handleKeyPress as any}
                onKeyDown={handleKeyDown as any}
              />
            )}
            {icon && iconPosition === 'right' && !hasActionButton && (
              <span className="avakio-text-icon avakio-text-icon-right">{icon}</span>
            )}
            {type === 'password' && (
              <button
                type="button"
                className="avakio-text-action"
                onClick={togglePasswordVisibility}
                disabled={isDisabled}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            )}
            {clear && currentValue && type !== 'password' && (
              <button
                type="button"
                className="avakio-text-action avakio-text-clear"
                onClick={handleClear}
                disabled={isDisabled || readonly}
                tabIndex={-1}
              >
                <X size={16} />
              </button>
            )}
            {enableValueCopyButton && currentValue && type !== 'password' && (
              <button
                type="button"
                className="avakio-text-action avakio-text-copy"
                onClick={handleCopyToClipboard}
                disabled={isDisabled}
                tabIndex={-1}
                title="Copy value to clipboard"
              >
                <Copy size={16} />
              </button>
            )}
            {enablePlaceHolderCopyButton && placeholder && type !== 'password' && !enableValueCopyButton && (
              <button
                type="button"
                className="avakio-text-action avakio-text-copy"
                onClick={handleCopyPlaceholder}
                disabled={isDisabled}
                tabIndex={-1}
                title="Copy placeholder to clipboard"
              >
                <Copy size={16} />
              </button>
            )}
          </div>
          {bottomLabel && <div className="avakio-text-bottom-label">{bottomLabel}</div>}
          {isInvalid && validationMessage && (
            <div className="avakio-text-error-message">{validationMessage}</div>
          )}
        </div>
      </div>
    );
  }
);

AvakioText.displayName = 'AvakioText';











