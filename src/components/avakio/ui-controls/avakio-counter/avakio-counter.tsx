import React, { useEffect, useState } from 'react';
import './avakio-counter.css';
import { Minus, Plus } from 'lucide-react';

type Size = 'sm' | 'md' | 'lg';

export interface AvakioCounterProps {
  id?: string;
  value?: number;
  defaultValue?: number;
  step?: number;
  min?: number;
  max?: number;
  label?: string;
  labelPosition?: 'left' | 'top';
  labelWidth?: number;
  description?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  size?: Size;
  allowInput?: boolean;
  onChange?: (value: number) => void;
  className?: string;
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

export function AvakioCounter({
  id,
  value,
  defaultValue = 0,
  step = 1,
  min,
  max,
  label,
  labelPosition = 'top',
  labelWidth = 100,
  description,
  error,
  required = false,
  disabled = false,
  readOnly = false,
  size = 'md',
  allowInput = true,
  onChange,
  className = '',
  padding,
  margin,
  minWidth,
  minHeight,
  testId,
  style,
}: AvakioCounterProps) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = useState<number>(value ?? defaultValue);

  useEffect(() => {
    if (isControlled && value !== undefined) {
      setInternal(value);
    }
  }, [isControlled, value]);

  const clamp = (val: number) => {
    let next = val;
    if (min !== undefined) next = Math.max(next, min);
    if (max !== undefined) next = Math.min(next, max);
    return next;
  };

  const current = clamp(internal);

  const emitChange = (next: number) => {
    if (!isControlled) {
      setInternal(next);
    }
    onChange?.(next);
  };

  const handleStep = (delta: number) => {
    if (disabled || readOnly) return;
    const next = clamp(current + delta * step);
    emitChange(next);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled || readOnly) return;
    const raw = e.target.value;
    if (raw === '') {
      if (!isControlled) setInternal(NaN);
      return;
    }
    const parsed = Number(raw);
    if (Number.isNaN(parsed)) return;
    emitChange(clamp(parsed));
  };

  const displayValue = Number.isNaN(current) ? '' : current;
  const canDecrement = min === undefined ? true : displayValue === '' ? true : displayValue > min;
  const canIncrement = max === undefined ? true : displayValue === '' ? true : displayValue < max;

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
        'avakio-counter',
        `avakio-counter-${size}`,
        `avakio-counter-label-${labelPosition}`,
        disabled ? 'avakio-counter-disabled' : '',
        error ? 'avakio-counter-error' : '',
        className,
      ].filter(Boolean).join(' ')}
      style={containerStyle}
    >
      {(label || description || error) && labelPosition === 'top' && (
        <div className="avakio-counter-header">
          <div className="avakio-counter-label-row">
            {label && <span className="avakio-counter-label">{label}</span>}
            {required && <span className="avakio-counter-required">*</span>}
          </div>
          {description && <div className="avakio-counter-description">{description}</div>}
          {error && <div className="avakio-counter-error-text">{error}</div>}
        </div>
      )}

      <div className="avakio-counter-content">
        {label && labelPosition === 'left' && (
          <div className="avakio-counter-label-left" style={{ width: labelWidth }}>
            <span className="avakio-counter-label">{label}</span>
            {required && <span className="avakio-counter-required">*</span>}
          </div>
        )}

        <div className="avakio-counter-body">
        <button
          type="button"
          className="avakio-counter-btn"
          onClick={() => handleStep(-1)}
          disabled={disabled || readOnly || !canDecrement}
          aria-label="Decrease"
        >
          <Minus size={16} />
        </button>

        <input
          id={id}
          type="number"
          className="avakio-counter-input"
          value={displayValue}
          onChange={handleInput}
          disabled={disabled || readOnly || !allowInput}
          readOnly={!allowInput}
          min={min}
          max={max}
          step={step}
          aria-live="polite"
        />

        <button
          type="button"
          className="avakio-counter-btn"
          onClick={() => handleStep(1)}
          disabled={disabled || readOnly || !canIncrement}
          aria-label="Increase"
        >
          <Plus size={16} />
        </button>
      </div>

      {labelPosition === 'left' && (description || error) && (
        <div className="avakio-counter-footer">
          {description && <div className="avakio-counter-description">{description}</div>}
          {error && <div className="avakio-counter-error-text">{error}</div>}
        </div>
      )}
      </div>
    </div>
  );
}











