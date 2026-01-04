import React, { useMemo } from "react";
import "./avakio-gage.css";

export interface AvakioGageProps {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  label?: string;
  subLabel?: string;
  size?: "sm" | "md" | "lg";
  thickness?: number;
  prefix?: string;
  suffix?: string;
  formatValue?: (value: number) => string;
  showValue?: boolean;
  showMinMax?: boolean;
  trackColor?: string;
  color?: string;
  target?: number;
  className?: string;
  style?: React.CSSProperties;
  /** ID of the component */
  id?: string;
  /** Test ID for testing purposes */
  testId?: string;
}

export function AvakioGage({
  value,
  defaultValue,
  min = 0,
  max = 100,
  label,
  subLabel,
  size = "md",
  thickness,
  prefix = "",
  suffix = "",
  formatValue,
  showValue = true,
  showMinMax = true,
  trackColor,
  color,
  target,
  className,
  style,
  id,
  testId,
}: AvakioGageProps) {
  const safeRange = max - min === 0 ? 1 : max - min;
  const rawValue = value ?? defaultValue ?? min;
  const clamped = Math.min(Math.max(rawValue, min), max);
  const percent = ((clamped - min) / safeRange) * 100;

  const strokeWidth = thickness ?? (size === "sm" ? 10 : size === "lg" ? 14 : 12);
  const radius = 88;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - percent / 100);

  const targetPosition = useMemo(() => {
    if (target === undefined || target === null) return null;
    const targetPercent = ((Math.min(Math.max(target, min), max) - min) / safeRange) * 100;
    const angle = (targetPercent / 100) * 2 * Math.PI - Math.PI / 2;
    const x = 100 + (radius * Math.cos(angle));
    const y = 100 + (radius * Math.sin(angle));
    return { x, y };
  }, [target, min, max, safeRange]);

  const displayValue = useMemo(() => {
    if (!showValue) return "";
    const base = formatValue ? formatValue(clamped) : clamped.toString();
    return `${prefix}${base}${suffix}`;
  }, [clamped, formatValue, prefix, suffix, showValue]);

  const mergedClass = ["avakio-gage", `avakio-gage-${size}`, className].filter(Boolean).join(" ");
  const styleVars: React.CSSProperties = {
    ...style,
    ...(color ? { ["--gg-fill" as string]: color } : null),
    ...(trackColor ? { ["--gg-track" as string]: trackColor } : null),
  };

  return (
    <div id={id} data-testid={testId} className={mergedClass} style={styleVars} data-percent={percent.toFixed(1)}>
      {label && <div className="avakio-gage-label">{label}</div>}
      <div className="avakio-gage-shell">
        <svg viewBox="0 0 200 200" role="img" aria-label={label ? `${label} ${displayValue}` : displayValue}>
          <circle
            className="avakio-gage-track"
            cx="100"
            cy="100"
            r={radius}
            strokeWidth={strokeWidth}
          />
          <circle
            className="avakio-gage-value"
            cx="100"
            cy="100"
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={dashOffset}
          />
          {targetPosition && (
            <circle
              className="avakio-gage-target"
              cx={targetPosition.x}
              cy={targetPosition.y}
              r={6}
              strokeWidth={2}
            />
          )}
        </svg>
        {showValue && (
          <div className="avakio-gage-center">
            <div className="avakio-gage-value-text">{displayValue}</div>
            {subLabel && <div className="avakio-gage-sublabel">{subLabel}</div>}
          </div>
        )}
      </div>
      {showMinMax && (
        <div className="avakio-gage-minmax">
          <span>{min}</span>
          <span>{max}</span>
        </div>
      )}
    </div>
  );
}











