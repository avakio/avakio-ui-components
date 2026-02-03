import React, { useEffect, useMemo, useRef, useState, forwardRef, useImperativeHandle, useCallback } from 'react';
import { AvakioChangeEvent, AvakioBaseRef, AvakioBaseProps, formatSpacing, formatSize } from '../../base/avakio-base-props';
import { AvakioControlLabel, AvakioControlLabelProps } from '../../base/avakio-control-label';
import './avakio-checkbox.css';

export type AvakioCheckboxSize = 'sm' | 'md';

/** Ref type specific to AvakioCheckbox */
export interface AvakioCheckboxRef extends AvakioBaseRef<boolean> {
  /** Toggles the checkbox state */
  toggle: () => void;
  /** Sets the checkbox to checked state */
  check: () => void;
  /** Sets the checkbox to unchecked state */
  uncheck: () => void;
  /** Returns whether the checkbox is checked */
  isChecked: () => boolean;
  /** Returns whether the checkbox is in indeterminate state */
  isIndeterminate: () => boolean;
  /** Sets the readonly state */
  setReadonly: (value: boolean) => void;
  /** Returns whether the checkbox is readonly */
  isReadonly: () => boolean;
  /** Sets the invalid state */
  setInvalid: (value: boolean) => void;
  /** Returns whether the checkbox is in invalid state */
  isInvalid: () => boolean;
}

export interface AvakioCheckboxProps extends 
  Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange'>,
  Pick<AvakioBaseProps, 
    | 'tooltip' 
    | 'readonly' 
    | 'borderless' 
    | 'hidden' 
    | 'testId' 
    | 'style' 
    | 'minWidth' 
    | 'minHeight' 
    | 'maxWidth' 
    | 'maxHeight' 
    | 'margin' 
    | 'padding'
    | 'onAfterRender'
    | 'onBeforeRender'
  >,
  Pick<AvakioControlLabelProps,
    | 'invalid'
    | 'invalidMessage'
  > {
  /** Controlled checked state */
  checked?: boolean;
  /** Initial checked state for uncontrolled mode */
  defaultChecked?: boolean;
  /** Shows indeterminate state (partially checked) */
  indeterminate?: boolean;
  /** Label text displayed next to the checkbox */
  label?: string;
  /** Additional descriptive text below the label */
  description?: string;
  /** Size variant of the checkbox */
  size?: AvakioCheckboxSize;
  /** Error message to display */
  error?: string;
  /** Marks the checkbox as required */
  required?: boolean;
  /** Callback fired when the value changes. Receives { id, value } */
  onChange?: (event: AvakioChangeEvent<boolean>) => void;
}

export const AvakioCheckbox = forwardRef<AvakioCheckboxRef, AvakioCheckboxProps>(function AvakioCheckbox({
  id,
  name,
  value,
  checked,
  defaultChecked,
  indeterminate: indeterminateProp = false,
  label,
  description,
  size = 'md',
  disabled: disabledProp = false,
  error,
  required = false,
  className = '',
  onChange,
  onClick,
  onFocus,
  onBlur,
  onMouseEnter,
  onMouseLeave,
  onKeyDown,
  onKeyUp,
  padding,
  margin,
  minWidth,
  minHeight,
  maxWidth,
  maxHeight,
  borderless = true,
  testId,
  style,
  hidden: hiddenProp = false,
  tooltip,
  readonly: readonlyProp = false,
  invalid: invalidProp = false,
  invalidMessage,
  onAfterRender,
  onBeforeRender,
  ...rest
}: AvakioCheckboxProps, ref) {
  const isControlled = checked !== undefined;
  const [internalChecked, setInternalChecked] = useState<boolean>(defaultChecked ?? false);
  const [isDisabled, setIsDisabled] = useState<boolean>(disabledProp);
  const [isHidden, setIsHidden] = useState<boolean>(hiddenProp);
  const [indeterminate, setIndeterminate] = useState<boolean>(indeterminateProp);
  const [isReadonly, setIsReadonly] = useState<boolean>(readonlyProp);
  const [isInvalid, setIsInvalid] = useState<boolean>(invalidProp);
  const checkboxRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const focusableRef = useRef<HTMLDivElement>(null);

  const isChecked = isControlled ? !!checked : internalChecked;

  // Sync props with internal state
  useEffect(() => {
    setIsDisabled(disabledProp);
  }, [disabledProp]);

  useEffect(() => {
    setIsHidden(hiddenProp);
  }, [hiddenProp]);

  useEffect(() => {
    setIndeterminate(indeterminateProp);
  }, [indeterminateProp]);

  useEffect(() => {
    setIsReadonly(readonlyProp);
  }, [readonlyProp]);

  useEffect(() => {
    setIsInvalid(invalidProp);
  }, [invalidProp]);

  // Lifecycle events
  useEffect(() => {
    onBeforeRender?.();
    // Use setTimeout to ensure onAfterRender fires after render
    const timer = setTimeout(() => {
      onAfterRender?.();
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = indeterminate && !isChecked;
    }
  }, [indeterminate, isChecked]);

  const status = useMemo(() => {
    if (indeterminate && !isChecked) return 'indeterminate';
    return isChecked ? 'checked' : 'unchecked';
  }, [indeterminate, isChecked]);

  const handleToggle = useCallback((e?: React.MouseEvent<HTMLDivElement>) => {
    if (isDisabled || isReadonly) return;
    if (!isControlled) {
      setInternalChecked((prev) => (indeterminate ? true : !prev));
    }
    const next = indeterminate ? true : !isChecked;
    onChange?.({ id: id || '0', value: next });
  }, [isDisabled, isReadonly, isControlled, indeterminate, isChecked, onChange, id]);

  // Expose imperative methods via ref
  useImperativeHandle(ref, () => ({
    // AvakioBaseRef methods
    blur: () => focusableRef.current?.blur(),
    focus: () => focusableRef.current?.focus(),
    getElement: () => containerRef.current,
    getText: () => label || '',
    getValue: () => isChecked,
    setValue: (val: boolean) => {
      if (!isControlled) {
        setInternalChecked(val);
      }
      onChange?.({ id: id || '0', value: val });
    },
    validate: () => {
      if (isInvalid) {
        return invalidMessage || error || 'Invalid value';
      }
      if (required && !isChecked) {
        return error || 'This field is required';
      }
      return true;
    },
    enable: () => setIsDisabled(false),
    disable: () => setIsDisabled(true),
    isEnabled: () => !isDisabled,
    show: () => setIsHidden(false),
    hide: () => setIsHidden(true),
    isVisible: () => !isHidden,
    getParentView: () => {
      let parent = containerRef.current?.parentElement;
      while (parent) {
        if (parent.classList.contains('avakio-view') || 
            parent.classList.contains('avakio-template') ||
            parent.classList.contains('avakio-layout')) {
          return parent.id || parent.className;
        }
        parent = parent.parentElement;
      }
      return null;
    },
    define: (config: any, value?: unknown) => {
      if (typeof config === 'string') {
        switch (config) {
          case 'disabled':
            setIsDisabled(!!value);
            break;
          case 'hidden':
            setIsHidden(!!value);
            break;
          case 'indeterminate':
            setIndeterminate(!!value);
            break;
          case 'readonly':
            setIsReadonly(!!value);
            break;
          case 'invalid':
            setIsInvalid(!!value);
            break;
        }
      }
    },
    // AvakioCheckboxRef specific methods
    toggle: () => {
      if (isDisabled) return;
      if (!isControlled) {
        setInternalChecked((prev) => !prev);
      }
      onChange?.({ id: id || '0', value: !isChecked });
    },
    check: () => {
      if (isDisabled) return;
      if (!isControlled) {
        setInternalChecked(true);
      }
      onChange?.({ id: id || '0', value: true });
    },
    uncheck: () => {
      if (isDisabled) return;
      if (!isControlled) {
        setInternalChecked(false);
      }
      onChange?.({ id: id || '0', value: false });
    },
    isChecked: () => isChecked,
    isIndeterminate: () => indeterminate && !isChecked,
    // Readonly methods
    setReadonly: (val: boolean) => setIsReadonly(val),
    isReadonly: () => isReadonly,
    // Invalid methods
    setInvalid: (val: boolean) => setIsInvalid(val),
    isInvalid: () => isInvalid,
  }), [isChecked, isControlled, isDisabled, isHidden, indeterminate, isReadonly, isInvalid, label, required, error, onChange, id]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    handleToggle(e);
    onClick?.(e as unknown as React.MouseEvent<HTMLInputElement>);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      handleToggle();
    }
    onKeyDown?.(e as unknown as React.KeyboardEvent<HTMLInputElement>);
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLDivElement>) => {
    onKeyUp?.(e as unknown as React.KeyboardEvent<HTMLInputElement>);
  };

  const handleFocus = (e: React.FocusEvent<HTMLDivElement>) => {
    onFocus?.(e as unknown as React.FocusEvent<HTMLInputElement>);
  };

  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    onBlur?.(e as unknown as React.FocusEvent<HTMLInputElement>);
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    onMouseEnter?.(e as unknown as React.MouseEvent<HTMLInputElement>);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    onMouseLeave?.(e as unknown as React.MouseEvent<HTMLInputElement>);
  };

  // Handle padding/margin using base utilities
  const paddingStyle = formatSpacing(padding);
  const marginStyle = formatSpacing(margin);

  const containerStyle: React.CSSProperties = {
    ...(paddingStyle && { padding: paddingStyle }),
    ...(marginStyle && { margin: marginStyle }),
    ...(minWidth && { minWidth: formatSize(minWidth) }),
    ...(minHeight && { minHeight: formatSize(minHeight) }),
    ...(maxWidth && { maxWidth: formatSize(maxWidth) }),
    ...(maxHeight && { maxHeight: formatSize(maxHeight) }),
    ...(isHidden && { display: 'none' }),
    ...style,
  };

  // Determine error message to display (error prop takes precedence for inline display)
  const errorMessage = error;

  return (
    <AvakioControlLabel
      invalid={isInvalid}
      invalidMessage={invalidMessage}
      classPrefix="avakio-checkbox"
      hidden={isHidden}
    >
      <div
        ref={containerRef}
        data-testid={testId}
        title={tooltip}
        className={[
          'avakio-checkbox',
          `avakio-checkbox-${size}`,
          !borderless ? 'avakio-checkbox-bordered' : '',
          isDisabled ? 'avakio-checkbox-disabled' : '',
          isReadonly ? 'avakio-checkbox-readonly' : '',
          (errorMessage || isInvalid) ? 'avakio-checkbox-error' : '',
          className,
        ].filter(Boolean).join(' ')}
        data-status={status}
        style={containerStyle}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          ref={focusableRef}
          className="avakio-checkbox-box"
          role="checkbox"
          tabIndex={isDisabled ? -1 : 0}
          aria-checked={status === 'indeterminate' ? 'mixed' : isChecked}
          aria-disabled={isDisabled}
          aria-readonly={isReadonly}
          aria-invalid={!!(errorMessage || isInvalid)}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
          onFocus={handleFocus}
          onBlur={handleBlur}
        >
          <input
            ref={checkboxRef}
            id={id}
            name={name}
            value={value}
            type="checkbox"
            checked={isChecked}
            onChange={() => {}}
            disabled={isDisabled}
            readOnly={isReadonly}
            tabIndex={-1}
            {...rest}
          />
          <span className="avakio-checkbox-mark" />
        </div>

        {(label || description || errorMessage) && (
          <div className="avakio-checkbox-text">
            <div className="avakio-checkbox-label-row">
              {label && <span className="avakio-checkbox-label">{label}</span>}
              {required && <span className="avakio-checkbox-required">*</span>}
            </div>
            {description && <div className="avakio-checkbox-description">{description}</div>}
            {errorMessage && <div className="avakio-checkbox-error-text">{errorMessage}</div>}
          </div>
        )}
      </div>
    </AvakioControlLabel>
  );
});











