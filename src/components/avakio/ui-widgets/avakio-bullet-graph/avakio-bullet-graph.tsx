import React, { useMemo, useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import './avakio-bullet-graph.css';

export interface AvakioBulletGraphBand {
  /** The end value of this band (bands are rendered from highest to lowest) */
  value: number;
  /** The color of this band */
  color: string;
}

export interface AvakioBulletGraphScale {
  /** Step interval for scale ticks */
  step?: number;
  /** Template for scale labels. Use #value# as placeholder */
  template?: string | ((value: number) => string);
}

export interface AvakioBulletGraphProps {
  /** Current value to display */
  value: number;
  /** Minimum range value */
  minRange?: number;
  /** Maximum range value */
  maxRange?: number;
  /** Target marker position (vertical line). Set to false to hide */
  marker?: number | false;
  /** Color of the marker */
  markerColor?: string;
  /** Color of the value bar. Can be a string or function that receives value */
  color?: string | ((value: number) => string);
  /** Performance bands (qualitative ranges) */
  bands?: AvakioBulletGraphBand[];
  /** Label text */
  label?: string;
  /** Additional description. Use #value# as placeholder for current value */
  placeholder?: string;
  /** Width of the value bar in pixels */
  stroke?: number;
  /** Scale configuration */
  scale?: AvakioBulletGraphScale;
  /** Length of scale ticks in pixels */
  tickSize?: number;
  /** Animation duration in milliseconds */
  flowTime?: number;
  /** Enable smooth animation */
  smoothFlow?: boolean;
  /** Layout orientation */
  layout?: 'horizontal' | 'vertical';
  /** Width of the label area (horizontal layout) */
  labelWidth?: number;
  /** Height of the label area (vertical layout) */
  labelHeight?: number;
  /** Show/hide the label */
  showLabel?: boolean;
  /** Show/hide the scale */
  showScale?: boolean;
  /** Whether the component is disabled */
  disabled?: boolean;
  /** Unique ID */
  id?: string;
  /** Test ID for testing */
  testId?: string;
  /** Minimum width */
  minWidth?: string | number;
  /** Minimum height */
  minHeight?: string | number;
  /** Additional CSS class */
  className?: string;
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

const DEFAULT_BANDS: AvakioBulletGraphBand[] = [
  { value: 100, color: '#5be5d6' },
  { value: 80, color: '#fff07e' },
  { value: 60, color: '#fd8b8c' },
];

export function AvakioBulletGraph({
  value,
  minRange = 0,
  maxRange = 100,
  marker = false,
  markerColor,
  color = 'var(--bg-primary)',
  bands = DEFAULT_BANDS,
  label,
  placeholder,
  stroke = 8,
  scale,
  tickSize = 10,
  flowTime = 500,
  smoothFlow = true,
  layout = 'horizontal',
  labelWidth = 120,
  labelHeight = 40,
  showLabel = true,
  showScale = true,
  disabled = false,
  id,
  testId,
  minWidth,
  minHeight,
  className,
  style,
}: AvakioBulletGraphProps) {
  const [animatedValue, setAnimatedValue] = useState(minRange);
  const animationRef = useRef<number | null>(null);
  const prevValueRef = useRef(minRange);

  // Clamp value to range
  const clampedValue = useMemo(() => {
    return Math.max(minRange, Math.min(maxRange, value));
  }, [value, minRange, maxRange]);

  // Animate value changes
  useEffect(() => {
    if (!smoothFlow || flowTime === 0) {
      setAnimatedValue(clampedValue);
      prevValueRef.current = clampedValue;
      return;
    }

    const startValue = prevValueRef.current;
    const endValue = clampedValue;
    
    // Skip animation if values are the same (with small epsilon for floating point)
    if (Math.abs(startValue - endValue) < 0.001) {
      prevValueRef.current = endValue;
      return;
    }
    
    const startTime = performance.now();
    let rafId: number | null = null;
    let isCancelled = false;

    const animate = (currentTime: number) => {
      if (isCancelled) return;
      
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / flowTime, 1);
      
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentValue = startValue + (endValue - startValue) * easeProgress;
      
      setAnimatedValue(currentValue);

      if (progress < 1 && !isCancelled) {
        rafId = requestAnimationFrame(animate);
        animationRef.current = rafId;
      } else {
        prevValueRef.current = endValue;
        animationRef.current = null;
      }
    };

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    rafId = requestAnimationFrame(animate);
    animationRef.current = rafId;

    return () => {
      isCancelled = true;
      if (rafId) {
        cancelAnimationFrame(rafId);
        animationRef.current = null;
      }
    };
  }, [clampedValue, flowTime]);

  // Calculate percentage position
  const getPercentage = (val: number) => {
    const range = maxRange - minRange;
    if (range === 0) return 0;
    return ((val - minRange) / range) * 100;
  };

  // Get bar color
  const barColor = useMemo(() => {
    if (typeof color === 'function') {
      return color(clampedValue);
    }
    return color;
  }, [color, clampedValue]);

  // Generate scale ticks
  const scaleTicks = useMemo(() => {
    if (!showScale || !scale) return [];
    
    const step = scale.step || 10;
    const ticks: { value: number; label: string; position: number }[] = [];
    
    for (let v = minRange; v <= maxRange; v += step) {
      let label = String(v);
      if (scale.template) {
        if (typeof scale.template === 'function') {
          label = scale.template(v);
        } else {
          label = scale.template.replace('#value#', String(v));
        }
      }
      ticks.push({
        value: v,
        label,
        position: getPercentage(v),
      });
    }
    
    return ticks;
  }, [showScale, scale, minRange, maxRange]);

  // Sort bands by value descending (render highest first as background)
  const sortedBands = useMemo(() => {
    return [...bands].sort((a, b) => b.value - a.value);
  }, [bands]);

  // Format placeholder text
  const formattedPlaceholder = useMemo(() => {
    if (!placeholder) return null;
    return placeholder.replace('#value#', String(Math.round(clampedValue)));
  }, [placeholder, clampedValue]);

  const isVertical = layout === 'vertical';

  return (
    <div
      id={id}
      data-testid={testId}
      className={cn(
        'avakio-bullet-graph',
        isVertical && 'avakio-bullet-graph-vertical',
        disabled && 'avakio-bullet-graph-disabled',
        className
      )}
      style={{
        '--bg-label-width': `${labelWidth}px`,
        '--bg-label-height': `${labelHeight}px`,
        ...style,
      } as React.CSSProperties}
    >
      {/* Label Section */}
      {showLabel && label && (
        <div className="avakio-bullet-graph-label">
          <span className="avakio-bullet-graph-label-text">{label}</span>
          {formattedPlaceholder && (
            <span className="avakio-bullet-graph-placeholder">{formattedPlaceholder}</span>
          )}
        </div>
      )}

      {/* Graph Section */}
      <div className="avakio-bullet-graph-container">
        <div className="avakio-bullet-graph-track">
          {/* Performance Bands */}
          {sortedBands.map((band, index) => (
            <div
              key={index}
              className="avakio-bullet-graph-band"
              style={{
                [isVertical ? 'height' : 'width']: `${getPercentage(band.value)}%`,
                backgroundColor: band.color,
              }}
            />
          ))}

          {/* Value Bar */}
          <div
            className="avakio-bullet-graph-bar"
            style={{
              [isVertical ? 'height' : 'width']: `${getPercentage(animatedValue)}%`,
              [isVertical ? 'width' : 'height']: `${stroke}px`,
              backgroundColor: barColor,
              transition: smoothFlow ? `all ${flowTime}ms ease-out` : 'none',
            }}
          />

          {/* Target Marker */}
          {marker !== false && (
            <div
              className="avakio-bullet-graph-marker"
              style={{
                [isVertical ? 'bottom' : 'left']: `${getPercentage(marker)}%`,
                backgroundColor: markerColor || 'var(--bg-marker)',
              }}
            />
          )}
        </div>

        {/* Scale */}
        {showScale && scaleTicks.length > 0 && (
          <div className="avakio-bullet-graph-scale">
            {scaleTicks.map((tick, index) => (
              <div
                key={index}
                className="avakio-bullet-graph-tick"
                style={{
                  [isVertical ? 'bottom' : 'left']: `${tick.position}%`,
                }}
              >
                <div
                  className="avakio-bullet-graph-tick-line"
                  style={{
                    [isVertical ? 'width' : 'height']: `${tickSize}px`,
                  }}
                />
                <span className="avakio-bullet-graph-tick-label">{tick.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AvakioBulletGraph;











