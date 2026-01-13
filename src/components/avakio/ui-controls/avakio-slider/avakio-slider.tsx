import React, { useMemo, useState, useRef, useCallback } from "react";
import { AvakioChangeEvent } from '../../base/avakio-base-props';
import "./avakio-slider.css";

export type AvakioSliderValue = number | [number, number];

export interface AvakioSliderProps {
  /** Single value or range [min, max] */
  value?: AvakioSliderValue;
  /** Default single value or range [min, max] */
  defaultValue?: AvakioSliderValue;
  /** Callback fired when the value changes. Receives { id, value } */
  onChange?: (event: AvakioChangeEvent<AvakioSliderValue>) => void;
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Step increment */
  step?: number;
  /** Enable range mode with two handles */
  range?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Label text */
  label?: string;
  /** Description text */
  description?: string;
  /** Required field indicator */
  required?: boolean;
  /** Error message */
  error?: string;
  /** Show current value */
  showValue?: boolean;
  /** Custom value formatter */
  formatValue?: (value: number) => string;
  /** Mark positions on the track */
  marks?: number[];
  /** Size variant */
  size?: "sm" | "md" | "lg";
  /** ID of the component */
  id?: string;
  /** Test ID for testing purposes */
  testId?: string;
  /** Theme */
  theme?: string;
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
  /** Custom inline styles for the root element */
  style?: React.CSSProperties;
}

function clamp(val: number, min: number, max: number) {
  return Math.min(Math.max(val, min), max);
}

export function AvakioSlider({
  value,
  defaultValue,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  range = false,
  disabled,
  label,
  description,
  required,
  error,
  showValue = true,
  formatValue,
  marks,
  size = "md",
  id,
  testId,
  theme,
  padding,
  margin,
  minWidth,
  minHeight,
  style,
}: AvakioSliderProps) {
  const isControlled = value !== undefined;
  
  // Normalize value to always work with [low, high] internally for range mode
  const normalizeToRange = (val: AvakioSliderValue | undefined, defaultMin: number, defaultMax: number): [number, number] => {
    if (val === undefined) return [defaultMin, defaultMax];
    if (Array.isArray(val)) return [clamp(val[0], min, max), clamp(val[1], min, max)];
    return [min, clamp(val, min, max)];
  };

  const normalizeToSingle = (val: AvakioSliderValue | undefined, defaultVal: number): number => {
    if (val === undefined) return defaultVal;
    if (Array.isArray(val)) return val[1];
    return clamp(val, min, max);
  };

  const [internalRange, setInternalRange] = useState<[number, number]>(() => 
    normalizeToRange(defaultValue, min, range ? max : min)
  );
  const [internalSingle, setInternalSingle] = useState<number>(() => 
    normalizeToSingle(defaultValue, min)
  );

  // Current values
  const currentRange: [number, number] = isControlled 
    ? normalizeToRange(value, min, max)
    : internalRange;
  const currentSingle: number = isControlled 
    ? normalizeToSingle(value, min)
    : internalSingle;

  // Percentages for styling
  const lowPercent = range ? ((currentRange[0] - min) / (max - min || 1)) * 100 : 0;
  const highPercent = range 
    ? ((currentRange[1] - min) / (max - min || 1)) * 100
    : ((currentSingle - min) / (max - min || 1)) * 100;

  // Formatted display values
  const formattedLow = useMemo(() => {
    const val = range ? currentRange[0] : currentSingle;
    return formatValue ? formatValue(val) : val.toString();
  }, [range, currentRange, currentSingle, formatValue]);

  const formattedHigh = useMemo(() => {
    if (!range) return formattedLow;
    return formatValue ? formatValue(currentRange[1]) : currentRange[1].toString();
  }, [range, currentRange, formatValue, formattedLow]);

  const safeMarks = useMemo(() => {
    if (!marks || !marks.length) return [] as number[];
    return marks.filter((m) => m >= min && m <= max);
  }, [marks, min, max]);

  // Handle change for single slider
  const handleSingleChange = useCallback((next: number) => {
    const clamped = clamp(next, min, max);
    if (!isControlled) setInternalSingle(clamped);
    onChange?.({ id: id || '0', value: clamped });
  }, [min, max, isControlled, onChange, id]);

  // Handle change for range slider
  const handleRangeChange = useCallback((index: 0 | 1, next: number) => {
    const clamped = clamp(next, min, max);
    let newRange: [number, number];
    
    if (index === 0) {
      // Low handle - ensure it doesn't exceed high
      newRange = [Math.min(clamped, currentRange[1]), currentRange[1]];
    } else {
      // High handle - ensure it doesn't go below low
      newRange = [currentRange[0], Math.max(clamped, currentRange[0])];
    }
    
    if (!isControlled) setInternalRange(newRange);
    onChange?.({ id: id || '0', value: newRange });
  }, [min, max, currentRange, isControlled, onChange, id]);

  // Track click handler for range mode
  const trackRef = useRef<HTMLDivElement>(null);
  const handleTrackClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || !range || !trackRef.current) return;
    
    const rect = trackRef.current.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const clickValue = min + percent * (max - min);
    const snappedValue = Math.round(clickValue / step) * step;
    
    // Determine which handle is closer
    const distToLow = Math.abs(snappedValue - currentRange[0]);
    const distToHigh = Math.abs(snappedValue - currentRange[1]);
    
    if (distToLow <= distToHigh) {
      handleRangeChange(0, snappedValue);
    } else {
      handleRangeChange(1, snappedValue);
    }
  }, [disabled, range, min, max, step, currentRange, handleRangeChange]);

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

  // CSS custom properties for range progress
  const sliderStyle = range
    ? {
        ["--slider-progress-start" as string]: `${lowPercent}%`,
        ["--slider-progress-end" as string]: `${highPercent}%`,
        ["--slider-progress" as string]: `${highPercent}%`,
        ...(paddingStyle && { padding: paddingStyle }),
        ...(marginStyle && { margin: marginStyle }),
        ...style,
      }
    : {
        ["--slider-progress" as string]: `${highPercent}%`,
        ...(paddingStyle && { padding: paddingStyle }),
        ...(marginStyle && { margin: marginStyle }),
        ...style,
      };

  return (
    <div
      id={id}
      data-testid={testId}
      data-admin-theme={theme}
      className={[
        "avakio-slider",
        `avakio-slider-${size}`,
        range && "avakio-slider-range",
        error && "avakio-slider-error",
        disabled && "avakio-slider-disabled",
      ].filter(Boolean).join(" ")}
      style={sliderStyle}
    >
      {(label || description) && (
        <div className="avakio-slider-header">
          <div className="avakio-slider-label-row">
            {label && <span className="avakio-slider-label">{label}</span>}
            {required && <span className="avakio-slider-required">*</span>}
            {showValue && (
              <span className="avakio-slider-value-chip">
                {range ? `${formattedLow} - ${formattedHigh}` : formattedLow}
              </span>
            )}
          </div>
          {description && <div className="avakio-slider-description">{description}</div>}
        </div>
      )}

      <div className="avakio-slider-body">
        {range ? (
          <>
            {/* Low handle input */}
            <input
              type="range"
              className="avakio-slider-input avakio-slider-input-low"
              min={min}
              max={max}
              step={step}
              value={currentRange[0]}
              disabled={disabled}
              onChange={(e) => handleRangeChange(0, Number(e.target.value))}
              aria-label="Range minimum"
            />
            {/* High handle input */}
            <input
              type="range"
              className="avakio-slider-input avakio-slider-input-high"
              min={min}
              max={max}
              step={step}
              value={currentRange[1]}
              disabled={disabled}
              onChange={(e) => handleRangeChange(1, Number(e.target.value))}
              aria-label="Range maximum"
            />
          </>
        ) : (
          <input
            type="range"
            className="avakio-slider-input"
            min={min}
            max={max}
            step={step}
            value={currentSingle}
            disabled={disabled}
            onChange={(e) => handleSingleChange(Number(e.target.value))}
          />
        )}
        
        <div 
          ref={trackRef} 
          className="avakio-slider-track"
          onClick={range ? handleTrackClick : undefined}
        >
          {range ? (
            <div 
              className="avakio-slider-progress avakio-slider-progress-range" 
              style={{ 
                left: `${lowPercent}%`, 
                width: `${highPercent - lowPercent}%` 
              }}
            />
          ) : (
            <div className="avakio-slider-progress" />
          )}
          
          {range ? (
            <>
              <div 
                className="avakio-slider-thumb avakio-slider-thumb-low" 
                style={{ left: `${lowPercent}%` }} 
              />
              <div 
                className="avakio-slider-thumb avakio-slider-thumb-high" 
                style={{ left: `${highPercent}%` }} 
              />
            </>
          ) : (
            <div className="avakio-slider-thumb" style={{ left: `${highPercent}%` }} />
          )}
        </div>
        
        {safeMarks.length > 0 && (
          <div className="avakio-slider-marks">
            {safeMarks.map((m) => {
              const p = ((m - min) / (max - min || 1)) * 100;
              const isInRange = range 
                ? m >= currentRange[0] && m <= currentRange[1]
                : m <= currentSingle;
              return (
                <div 
                  key={m} 
                  className={`avakio-slider-mark ${isInRange ? 'avakio-slider-mark-active' : ''}`} 
                  style={{ left: `${p}%` }}
                >
                  <span className="avakio-slider-mark-dot" />
                  <span className="avakio-slider-mark-label">{m}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {error && <div className="avakio-slider-error-text">{error}</div>}
    </div>
  );
}











