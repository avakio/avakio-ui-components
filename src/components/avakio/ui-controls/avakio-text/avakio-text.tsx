import React, { forwardRef, useState, useEffect, useImperativeHandle, ChangeEvent, KeyboardEvent, FocusEvent } from 'react';
import { X, Eye, EyeOff, Copy } from 'lucide-react';
import { AvakioChangeEvent, AvakioBaseRef, useAvakioBase, AvakioControlledProps } from '../../base/avakio-base-props';
import { AvakioControlLabel } from '../../base/avakio-control-label/avakio-control-label';
import './avakio-text.css';

export interface AvakioTextProps extends AvakioControlledProps<string> {
  /** The label text */
  label?: string;
  /** Form label text (plain text above the component) */
  labelForm?: string;
  /** The placeholder text */
  placeholder?: string;
  /** The name attribute */
  name?: string;
  /** The type of input (text, password, email, url, number, tel) */
  type?: 'text' | 'password' | 'email' | 'url' | 'number' | 'tel' | 'search';
  /** The theme (material, flat, compact, dark, ocean, sunset) */
  theme?: string;
  /** Label position (left or top) */
  labelPosition?: 'left' | 'top';
  /** Label alignment (left or right) */
  labelAlign?: 'left' | 'right';
  /** The width of the label */
  labelWidth?: number | string;
  /** Input alignment (left, center, right) */
  inputAlign?: 'left' | 'center' | 'right';
  /** Bottom label text */
  bottomLabel?: string;
  /** Marks field as required (shows asterisk) */
  required?: boolean;
  /** Marks the component as invalid */
  invalid?: boolean;
  /** Sets the text of a validation message */
  invalidMessage?: string;
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
  /** Callback fired when the value changes. Receives { id, value, event } */
  onChange?: (event: AvakioChangeEvent<string> & { event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> }) => void;
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
  /** Width of the text input/textarea (e.g., '100%', '200px') */
  textWidth?: string | number;
  /** Bottom padding */
  bottomPadding?: number | string;
}

export interface AvakioTextRef extends AvakioBaseRef<string> {
  /** Clear the input */
  clear: () => void;
}

export const AvakioText = forwardRef<AvakioTextRef, AvakioTextProps>(
  (props, ref) => {
    const {
      // Base props handled by useAvakioBase
      id,
      value = '',
      label,
      placeholder,
      disabled = false,
      readonly = false,
      required = false,
      invalid = false,
      invalidMessage,
      validate,
      onChange,
      onBlur,
      onFocus,
      className = '',
      width,
      height,
      labelWidth = 100,
      labelPosition = 'left',
      labelAlign = 'left',
      bottomLabel,
      padding,
      margin,
      minWidth,
      maxWidth,
      minHeight,
      maxHeight,
      borderless = false,
      hidden = false,
      style,
      testId,
      
      // Text-specific props
      labelForm,
      name,
      type = 'text',
      theme = 'material',
      inputAlign = 'left',
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
      onKeyPress,
      onKeyDown,
      onClick,
      textWidth,
      bottomPadding,
    } = props;

    // Use the base hook for common functionality
    const base = useAvakioBase<string>({
      id,
      initialValue: value,
      onChange,
      validate: (val: string) => {
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
      },
      disabled,
      hidden,
      required,
      invalid,
      invalidMessage,
      getTextValue: (v) => v || '',
      onBlur,
      onFocus,
    });

    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [validateEvent] = useState<'change' | 'blur' | 'submit'>('blur');

    // Sync value from props
    useEffect(() => {
      if (value !== base.value) {
        base.setValueState(value);
      }
    }, [value]);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const newValue = e.target.value;
      base.setValueState(newValue);

      // Validate on change if validateEvent is 'change'
      if (validateEvent === 'change') {
        base.methods.validate();
      }

      if (onChange) {
        onChange({ id: id || '0', value: newValue, event: e });
      }
    };

    const handleBlur = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setIsFocused(false);

      // Validate on blur if validateEvent is 'blur'
      if (validateEvent === 'blur') {
        base.methods.validate();
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
        onEnter(base.value || '');
      }

      if (onKeyPress) {
        onKeyPress(e);
      }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !multiline && onEnter) {
        onEnter(base.value || '');
      }

      if (onKeyDown) {
        onKeyDown(e);
      }
    };

    const handleClear = () => {
      base.setValueState('');
      base.setIsInvalid(false);
      if (onChange) {
        onChange({ id: id || '0', value: '', event: {} as ChangeEvent<HTMLInputElement | HTMLTextAreaElement> });
      }
      base.inputRef.current?.focus();
    };

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    const handleCopyToClipboard = () => {
      if (base.value) {
        navigator.clipboard.writeText(base.value).then(() => {
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
      ...base.getRefMethods(),
      clear: handleClear,
    }));

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
      minWidth: typeof minWidth === 'number' ? `${minWidth}px` : minWidth,
      maxWidth: typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth,
      minHeight: typeof minHeight === 'number' ? `${minHeight}px` : minHeight,
      maxHeight: typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight,
      ...(paddingStyle && { padding: paddingStyle }),
      ...(marginStyle && { margin: marginStyle }),
      display: base.isHidden ? 'none' : undefined,
      ...style,
    };

    const containerClasses = [
      'avakio-text',
      `avakio-text-theme-${theme}`,
      labelPosition === 'top' ? 'avakio-text-label-top' : 'avakio-text-label-left',
      base.isInvalid ? 'avakio-text-invalid' : '',
      base.isDisabled ? 'avakio-text-disabled' : '',
      isFocused ? 'avakio-text-focused' : '',
      readonly ? 'avakio-text-readonly' : '',
      borderless ? 'avakio-text-borderless' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const hasActionButton = (clear && base.value) || type === 'password' || (enableValueCopyButton && base.value) || (enablePlaceHolderCopyButton && placeholder);
    
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
      <div ref={base.rootRef} className={containerClasses} style={containerStyle} onClick={onClick} data-testid={testId}>
        <AvakioControlLabel
          label={label}
          labelForm={labelForm}
          labelPosition={labelPosition}
          labelAlign={labelAlign}
          labelWidth={labelWidth}
          bottomLabel={bottomLabel}
          bottomPadding={bottomPadding}
          required={required}
          invalid={base.isInvalid}
          invalidMessage={base.invalidMessage}
          classPrefix="avakio-text"
        >
        <div className="avakio-text-content">
          <div className="avakio-text-input-wrapper" style={wrapperStyle}>
            {icon && iconPosition === 'left' && (
              <span className="avakio-text-icon avakio-text-icon-left">{icon}</span>
            )}
            {multiline ? (
              <textarea
                ref={base.inputRef as React.RefObject<HTMLTextAreaElement>}
                className={inputClasses}
                value={base.value || ''}
                placeholder={placeholder}
                name={name}
                disabled={base.isDisabled}
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
                ref={base.inputRef as React.RefObject<HTMLInputElement>}
                type={inputType}
                className={inputClasses}
                value={base.value || ''}
                placeholder={placeholder}
                name={name}
                disabled={base.isDisabled}
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
                disabled={base.isDisabled}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            )}
            {clear && base.value && type !== 'password' && (
              <button
                type="button"
                className="avakio-text-action avakio-text-clear"
                onClick={handleClear}
                disabled={base.isDisabled || readonly}
                tabIndex={-1}
              >
                <X size={16} />
              </button>
            )}
            {enableValueCopyButton && base.value && type !== 'password' && (
              <button
                type="button"
                className="avakio-text-action avakio-text-copy"
                onClick={handleCopyToClipboard}
                disabled={base.isDisabled}
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
                disabled={base.isDisabled}
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











