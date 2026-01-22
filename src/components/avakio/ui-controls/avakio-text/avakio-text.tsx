import React, { forwardRef, useState, useEffect, useImperativeHandle, ChangeEvent, KeyboardEvent, FocusEvent } from 'react';
import { X, Eye, EyeOff, Copy } from 'lucide-react';
import { 
  AvakioChangeEvent, 
  AvakioBaseRef, 
  useAvakioBase, 
  AvakioBaseProps,
  computeBaseStyles
} from '../../base/avakio-base-props';
import { AvakioControlLabel, AvakioControlLabelProps } from '../../base/avakio-control-label/avakio-control-label';
import './avakio-text.css';

export interface AvakioTextProps extends 
  AvakioBaseProps,
  Omit<AvakioControlLabelProps, 'children' | 'classPrefix' | 'wrapperClassName' | 'wrapperStyle' | 'labelStyle'> {
  /** Value of the input */
  value?: string;
  /** Callback fired when the value changes. Receives { id, value, event } */
  onChange?: (event: AvakioChangeEvent<string> & { event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> }) => void;
  /** onBlur callback */
  onBlur?: (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  /** onFocus callback */
  onFocus?: (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  /** The placeholder text */
  placeholder?: string;
  /** The name attribute */
  name?: string;
  /** The type of input (text, password, email, url, number, tel) */
  type?: 'text' | 'password' | 'email' | 'url' | 'number' | 'tel' | 'search';
  /** The theme (material, flat, compact, dark, ocean, sunset) */
  theme?: string;
  /** Text alignment inside input (left, center, right) */
  textAlign?: 'left' | 'center' | 'right';
  /** readonly flag */
  readonly?: boolean;
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
  /** onEnter callback */
  onEnter?: (value: string) => void;
  /** onKeyPress callback (deprecated, use onKeyDown) */
  onKeyPress?: (event: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  /** onKeyDown callback */
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  /** onClick callback for the entire component */
  onClick?: () => void;
  /** Width of the text input/textarea (e.g., '100%', '200px') */
  textWidth?: string | number;
  /** Custom validation function */
  validate?: (value: string) => boolean | string;
}

export interface AvakioTextRef extends AvakioBaseRef<string> {
  /** Clear the input */
  clear: () => void;
}

export const AvakioText = forwardRef<AvakioTextRef, AvakioTextProps>(
  (props, ref) => {
    const {
      value = '',
      label,
      placeholder,
      readonly = false,
      required = false,
      invalid = false,
      invalidMessage,
      validate,
      onChange,
      className = '',
      labelWidth = 100,
      labelPosition = 'left',
      labelAlign = 'left',
      bottomLabel,
      borderless = false,
      style,
      
      // Text-specific props
      labelForm,
      name,
      type = 'text',
      theme = 'material',
      textAlign = 'left',
      clear = false,
      enableValueCopyButton = false,
      enablePlaceHolderCopyButton = false,
      icon,
      iconPosition = 'left',
      maxLength,
      pattern,
      min,
      max,
      step,
      autoComplete,
      multiline = false,
      rows = 4,
      onEnter,
      onKeyDown,
      textWidth,
      ...baseProps
    } = props;

    // Use AvakioBase hook for state management and ref methods
    const {
      rootRef,
      isDisabled,
      isHidden,
      config,
      methods,
      eventHandlers,
    } = useAvakioBase({
      hidden: baseProps.hidden,
      disabled: baseProps.disabled,
      onItemClick: baseProps.onItemClick,
      onBlur: baseProps.onBlur,
      onFocus: baseProps.onFocus,
      onKeyPress: baseProps.onKeyPress,
      onClick: baseProps.onClick,
      onViewShow: baseProps.onViewShow,
      onAfterRender: baseProps.onAfterRender,
      onBeforeRender: baseProps.onBeforeRender,
      onViewResize: baseProps.onViewResize,
      onAfterScroll: baseProps.onAfterScroll,
    });

    // Merge config from define() with baseProps
    const mergedProps = { ...baseProps, ...config };

    const [internalValue, setInternalValue] = useState(value);
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isInvalid, setIsInvalid] = useState(invalid);
    const [validationMessage, setValidationMessage] = useState(invalidMessage);
    const inputRef = React.useRef<HTMLInputElement | HTMLTextAreaElement>(null);

    // Sync value from props
    useEffect(() => {
      if (value !== internalValue) {
        setInternalValue(value);
      }
    }, [value]);

    // ResizeObserver to detect size changes
    useEffect(() => {
      if (!rootRef.current) return;

      const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const { width, height } = entry.contentRect;
          eventHandlers.onResize?.(width, height);
        }
      });

      resizeObserver.observe(rootRef.current);

      return () => {
        resizeObserver.disconnect();
      };
    }, []); // Empty deps - only set up once on mount

    // Validation function
    const validateValue = (val: string): boolean | string => {
      // HTML5 validation for email
      if (type === 'email' && val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
        return 'Please enter a valid email address';
      }

      // HTML5 validation for url
      if (type === 'url' && val && !/^https?:\/\/.+/.test(val)) {
        return 'Please enter a valid URL';
      }

      // HTML5 validation for number
      if (type === 'number' && val) {
        const num = parseFloat(val);
        if (isNaN(num)) {
          return 'Please enter a valid number';
        }
        if (min !== undefined && num < min) {
          return `Value must be at least ${min}`;
        }
        if (max !== undefined && num > max) {
          return `Value must be at most ${max}`;
        }
      }

      // Pattern validation
      if (pattern && val && !new RegExp(pattern).test(val)) {
        return invalidMessage || 'Invalid format';
      }

      // Max length validation
      if (maxLength && val.length > maxLength) {
        return `Maximum length is ${maxLength} characters`;
      }

      // Custom validation
      if (validate) {
        return validate(val);
      }

      return true;
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const newValue = e.target.value;
      setInternalValue(newValue);

      const validationResult = validateValue(newValue);
      if (typeof validationResult === 'string') {
        setIsInvalid(true);
        setValidationMessage(validationResult);
      } else {
        setIsInvalid(false);
        setValidationMessage(undefined);
      }

      if (onChange) {
        onChange({ id: mergedProps.id || '0', value: newValue, event: e });
      }
    };

    const handleBlur = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setIsFocused(false);

      if (baseProps.onBlur) {
        baseProps.onBlur(e);
      }
    };

    const handleFocus = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setIsFocused(true);

      if (baseProps.onFocus) {
        baseProps.onFocus(e);
      }
    };

    const handleKeyPress = (e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (baseProps.onKeyPress) {
        baseProps.onKeyPress(e);
      }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !multiline && onEnter) {
        onEnter(internalValue || '');
      }

      if (onKeyDown) {
        onKeyDown(e);
      }
    };

    const handleClear = () => {
      setInternalValue('');
      setIsInvalid(false);
      if (onChange) {
        onChange({ id: mergedProps.id || '0', value: '', event: {} as ChangeEvent<HTMLInputElement | HTMLTextAreaElement> });
      }
      inputRef.current?.focus();
    };

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    const handleCopyToClipboard = () => {
      if (internalValue) {
        navigator.clipboard.writeText(internalValue).then(() => {
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

    // Expose ref methods (combining base methods + component-specific methods)
    useImperativeHandle(ref, () => ({
      ...methods,
      focus: () => inputRef.current?.focus(),
      blur: () => inputRef.current?.blur(),
      getValue: () => internalValue,
      setValue: (val: string) => setInternalValue(val),
      getText: () => internalValue,
      validate: () => validateValue(internalValue),
      getElement: () => rootRef.current,
      clear: handleClear,
    }), [methods, internalValue, validateValue]);

    const inputType = type === 'password' && showPassword ? 'text' : type;

    // Don't render if hidden
    if (isHidden) {
      return null;
    }

    // Build inline styles using base styles
    const baseStyles = computeBaseStyles({ ...mergedProps, hidden: isHidden });
    const containerStyle: React.CSSProperties = {
      ...baseStyles,
      display: isHidden ? 'none' : undefined,
      ...style,
    };

    const containerClasses = [
      'avakio-text',
      `avakio-text-theme-${theme}`,
      labelPosition === 'top' ? 'avakio-text-label-top' : 'avakio-text-label-left',
      isInvalid ? 'avakio-text-invalid' : '',
      isDisabled ? 'avakio-text-disabled' : '',
      isFocused ? 'avakio-text-focused' : '',
      readonly ? 'avakio-text-readonly' : '',
      borderless ? 'avakio-text-borderless' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const hasActionButton = (clear && internalValue) || type === 'password' || (enableValueCopyButton && internalValue) || (enablePlaceHolderCopyButton && placeholder);
    
    const inputClasses = [
      'avakio-text-input',
      `avakio-text-input-align-${textAlign}`,
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
      <div ref={rootRef} className={containerClasses} style={containerStyle} onClick={eventHandlers.onClick} data-testid={mergedProps.testId}>
        <AvakioControlLabel
          label={label}
          labelForm={labelForm}
          labelPosition={labelPosition}
          labelAlign={labelAlign}
          labelWidth={labelWidth}
          bottomLabel={bottomLabel}
          required={required}
          invalid={isInvalid}
          invalidMessage={validationMessage}
          classPrefix="avakio-text"
        >
        <div className="avakio-text-content">
          <div className="avakio-text-input-wrapper" style={wrapperStyle}>
            {icon && iconPosition === 'left' && (
              <span className="avakio-text-icon avakio-text-icon-left">{icon}</span>
            )}
            {multiline ? (
              <textarea
                ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                className={inputClasses}
                value={internalValue || ''}
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
                onClick={eventHandlers.onItemClick}
                onScroll={eventHandlers.onScroll}
                onKeyPress={handleKeyPress as any}
                onKeyDown={handleKeyDown as any}
              />
            ) : (
              <input
                ref={inputRef as React.RefObject<HTMLInputElement>}
                type={inputType}
                className={inputClasses}
                value={internalValue || ''}
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
                onClick={eventHandlers.onItemClick}
                onScroll={eventHandlers.onScroll}
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
            {clear && internalValue && type !== 'password' && (
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
            {enableValueCopyButton && internalValue && type !== 'password' && (
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
        </div>
        </AvakioControlLabel>
      </div>
    );
  }
);

AvakioText.displayName = 'AvakioText';











