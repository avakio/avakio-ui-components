import React, { useEffect, useMemo, useRef, useState } from 'react';
import './avakio-checkbox.css';

export type AvakioCheckboxSize = 'sm' | 'md';

export interface AvakioCheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange'> {
  checked?: boolean;
  defaultChecked?: boolean;
  indeterminate?: boolean;
  label?: string;
  description?: string;
  size?: AvakioCheckboxSize;
  error?: string;
  required?: boolean;
  onChange?: (checked: boolean) => void;
  /** Padding (number for all sides, string for CSS, or [top, right, bottom, left]) */
  padding?: string | number | [number, number, number, number];
  /** Margin (number for all sides, string for CSS, or [top, right, bottom, left]) */
  margin?: string | number | [number, number, number, number];
  /** Minimum width */
  minWidth?: string | number;
  /** Minimum height */
  minHeight?: string | number;
  /** Test ID for testing purposes */
  testId?: string;
  /** Whether the component is borderless */
  borderless?: boolean;
  /** Whether the component is hidden */
  hidden?: boolean;
  /** Maximum height */
  maxHeight?: number | string;
  /** Maximum width */
  maxWidth?: number | string;
  /** Custom inline styles for the root element */
  style?: React.CSSProperties;
}

export function AvakioCheckbox({
  id,
  name,
  value,
  checked,
  defaultChecked,
  indeterminate = false,
  label,
  description,
  size = 'md',
  disabled = false,
  error,
  required = false,
  className = '',
  onChange,
  padding,
  margin,
  minWidth,
  minHeight,
  testId,
  style,
  ...rest
}: AvakioCheckboxProps) {
  const isControlled = checked !== undefined;
  const [internalChecked, setInternalChecked] = useState<boolean>(defaultChecked ?? false);
  const checkboxRef = useRef<HTMLInputElement>(null);

  const isChecked = isControlled ? !!checked : internalChecked;

  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = indeterminate && !isChecked;
    }
  }, [indeterminate, isChecked]);

  const status = useMemo(() => {
    if (indeterminate && !isChecked) return 'indeterminate';
    return isChecked ? 'checked' : 'unchecked';
  }, [indeterminate, isChecked]);

  const handleToggle = () => {
    if (disabled) return;
    if (!isControlled) {
      setInternalChecked((prev) => (indeterminate ? true : !prev));
    }
    const next = indeterminate ? true : !isChecked;
    onChange?.(next);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      handleToggle();
    }
  };

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
    ...(paddingStyle && { padding: paddingStyle }),
    ...(marginStyle && { margin: marginStyle }),
    ...(minWidth && { minWidth: typeof minWidth === 'number' ? `${minWidth}px` : minWidth }),
    ...(minHeight && { minHeight: typeof minHeight === 'number' ? `${minHeight}px` : minHeight }),
    ...style,
  };

  return (
    <div
      data-testid={testId}
      className={[
        'avakio-checkbox',
        `avakio-checkbox-${size}`,
        disabled ? 'avakio-checkbox-disabled' : '',
        error ? 'avakio-checkbox-error' : '',
        className,
      ].filter(Boolean).join(' ')}
      data-status={status}
      style={containerStyle}
      onClick={handleToggle}
    >
      <div
        className="avakio-checkbox-box"
        role="checkbox"
        tabIndex={disabled ? -1 : 0}
        aria-checked={status === 'indeterminate' ? 'mixed' : isChecked}
        aria-disabled={disabled}
        aria-invalid={!!error}
        onKeyDown={handleKeyDown}
      >
        <input
          ref={checkboxRef}
          id={id}
          name={name}
          value={value}
          type="checkbox"
          checked={isChecked}
          onChange={() => {}}
          disabled={disabled}
          tabIndex={-1}
          {...rest}
        />
        <span className="avakio-checkbox-mark" />
      </div>

      {(label || description || error) && (
        <div className="avakio-checkbox-text">
          <div className="avakio-checkbox-label-row">
            {label && <span className="avakio-checkbox-label">{label}</span>}
            {required && <span className="avakio-checkbox-required">*</span>}
          </div>
          {description && <div className="avakio-checkbox-description">{description}</div>}
          {error && <div className="avakio-checkbox-error-text">{error}</div>}
        </div>
      )}
    </div>
  );
}











