import React, { forwardRef, useImperativeHandle, useState, useRef, useEffect, useCallback, useMemo } from 'react';
import './avakio-chart.css';

export type AvakioChartTheme = 'material' | 'flat' | 'compact' | 'dark' | 'ocean' | 'sunset';

export type AvakioChartType = 
  | 'line' 
  | 'spline' 
  | 'area' 
  | 'splineArea'
  | 'bar' 
  | 'barH'
  | 'stackedBar'
  | 'stackedBarH'
  | 'pie' 
  | 'pie3D'
  | 'donut' 
  | 'scatter' 
  | 'radar';

export interface AvakioChartDataPoint {
  /** X-axis value or label */
  x?: string | number;
  /** Y-axis value */
  y: number;
  /** Label for pie/donut charts */
  label?: string;
  /** Color override for this data point */
  color?: string;
  /** Tooltip text */
  tooltip?: string;
  /** Any additional custom data */
  [key: string]: any;
}

export interface AvakioChartSeries {
  /** Unique identifier for the series */
  id?: string;
  /** Series name (shown in legend) */
  name: string;
  /** Data points */
  data: AvakioChartDataPoint[];
  /** Series color */
  color?: string;
  /** Series type override */
  type?: AvakioChartType;
  /** Line width (for line/spline/area) */
  lineWidth?: number;
  /** Fill opacity (for area charts) */
  fillOpacity?: number;
  /** Show data labels */
  showLabels?: boolean;
  /** Show data points/markers */
  showMarkers?: boolean;
  /** Marker size */
  markerSize?: number;
  /** Hidden initially */
  hidden?: boolean;
}

export interface AvakioChartAxis {
  /** Axis title */
  title?: string;
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Step between ticks */
  step?: number;
  /** Format function for labels */
  format?: (value: number | string) => string;
  /** Show grid lines */
  showGrid?: boolean;
  /** Show axis line */
  showLine?: boolean;
  /** Show tick marks */
  showTicks?: boolean;
  /** Rotation angle for labels */
  labelRotation?: number;
}

export interface AvakioChartLegend {
  /** Show legend */
  show?: boolean;
  /** Legend position */
  position?: 'top' | 'bottom' | 'left' | 'right';
  /** Legend alignment */
  align?: 'start' | 'center' | 'end';
  /** Allow clicking to toggle series */
  toggle?: boolean;
}

export interface AvakioChartTooltip {
  /** Show tooltip */
  show?: boolean;
  /** Tooltip format function */
  format?: (point: AvakioChartDataPoint, series: AvakioChartSeries) => string;
  /** Share tooltip across series */
  shared?: boolean;
}

export interface AvakioChartPadding {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
}

export interface AvakioChartProps {
  /** Unique identifier */
  id?: string;
  /** Test ID for testing */
  testId?: string;
  /** Chart type */
  type?: AvakioChartType;
  /** Chart data series */
  series: AvakioChartSeries[];
  /** X-axis configuration */
  xAxis?: AvakioChartAxis;
  /** Y-axis configuration */
  yAxis?: AvakioChartAxis;
  /** Legend configuration */
  legend?: AvakioChartLegend;
  /** Tooltip configuration */
  tooltip?: AvakioChartTooltip;
  /** Chart title */
  title?: string;
  /** Chart subtitle */
  subtitle?: string;
  /** Color palette */
  colors?: string[];
  /** Theme */
  theme?: AvakioChartTheme;
  /** Width */
  width?: number | string;
  /** Height */
  height?: number | string;
  /** Padding */
  padding?: AvakioChartPadding;
  /** Enable animation */
  animate?: boolean;
  /** Animation duration in ms */
  animateDuration?: number;
  /** Show gradient fills */
  gradient?: boolean | 'horizontal' | 'vertical' | 'falling' | 'rising';
  /** Bar width (for bar charts) */
  barWidth?: number;
  /** Bar offset between groups */
  barOffset?: number;
  /** Border radius for bars */
  borderRadius?: number;
  /** Inner radius for donut chart (0-1) */
  donutInnerRadius?: number;
  /** Start angle for pie/donut (degrees) */
  pieStartAngle?: number;
  /** Show pie labels */
  pieLabels?: boolean;
  /** Inner text for donut */
  donutInnerText?: string;
  /** Stacked mode */
  stacked?: boolean;
  /** CSS class */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Callback when data point is clicked */
  onClick?: (point: AvakioChartDataPoint, series: AvakioChartSeries, index: number) => void;
  /** Callback when data point is hovered */
  onHover?: (point: AvakioChartDataPoint | null, series: AvakioChartSeries | null, index: number | null) => void;
  /** Callback when legend item is clicked */
  onLegendClick?: (series: AvakioChartSeries, visible: boolean) => void;
}

export interface AvakioChartRef {
  /** Get chart container */
  getNode: () => HTMLDivElement | null;
  /** Show a series */
  showSeries: (id: string) => void;
  /** Hide a series */
  hideSeries: (id: string) => void;
  /** Toggle series visibility */
  toggleSeries: (id: string) => void;
  /** Get visible series IDs */
  getVisibleSeries: () => string[];
  /** Export chart as base64 image */
  exportImage: (format?: 'png' | 'jpeg') => Promise<string>;
  /** Refresh chart */
  refresh: () => void;
}

// Default colors palette
const DEFAULT_COLORS = [
  '#4285F4', // Blue
  '#EA4335', // Red
  '#FBBC05', // Yellow
  '#34A853', // Green
  '#8E24AA', // Purple
  '#00ACC1', // Cyan
  '#FF7043', // Orange
  '#5C6BC0', // Indigo
  '#26A69A', // Teal
  '#D81B60', // Pink
];

// Helper to calculate nice axis bounds
function calculateAxisBounds(data: number[], step?: number): { min: number; max: number; step: number; ticks: number[] } {
  const dataMin = Math.min(...data);
  const dataMax = Math.max(...data);
  const range = dataMax - dataMin || 1;
  
  // Calculate a nice step
  const magnitude = Math.pow(10, Math.floor(Math.log10(range)));
  const residual = range / magnitude;
  
  let niceStep: number;
  if (residual <= 1.5) niceStep = magnitude * 0.2;
  else if (residual <= 3) niceStep = magnitude * 0.5;
  else if (residual <= 7) niceStep = magnitude;
  else niceStep = magnitude * 2;
  
  if (step) niceStep = step;
  
  const min = Math.floor(dataMin / niceStep) * niceStep;
  const max = Math.ceil(dataMax / niceStep) * niceStep;
  
  const ticks: number[] = [];
  for (let tick = min; tick <= max; tick += niceStep) {
    ticks.push(Math.round(tick * 1000) / 1000);
  }
  
  return { min, max, step: niceStep, ticks };
}

// Generate spline path using Catmull-Rom
function createSplinePath(points: { x: number; y: number }[]): string {
  if (points.length < 2) return '';
  if (points.length === 2) {
    return `M ${points[0].x} ${points[0].y} L ${points[1].x} ${points[1].y}`;
  }
  
  const tension = 0.3;
  let path = `M ${points[0].x} ${points[0].y}`;
  
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(0, i - 1)];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[Math.min(points.length - 1, i + 2)];
    
    const cp1x = p1.x + (p2.x - p0.x) * tension;
    const cp1y = p1.y + (p2.y - p0.y) * tension;
    const cp2x = p2.x - (p3.x - p1.x) * tension;
    const cp2y = p2.y - (p3.y - p1.y) * tension;
    
    path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
  }
  
  return path;
}

// Create pie/donut arc path
function describeArc(cx: number, cy: number, r: number, startAngle: number, endAngle: number): string {
  const start = {
    x: cx + r * Math.cos((startAngle - 90) * Math.PI / 180),
    y: cy + r * Math.sin((startAngle - 90) * Math.PI / 180),
  };
  const end = {
    x: cx + r * Math.cos((endAngle - 90) * Math.PI / 180),
    y: cy + r * Math.sin((endAngle - 90) * Math.PI / 180),
  };
  const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;
  
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`;
}

function describePieSlice(cx: number, cy: number, r: number, innerR: number, startAngle: number, endAngle: number): string {
  const startOuter = {
    x: cx + r * Math.cos((startAngle - 90) * Math.PI / 180),
    y: cy + r * Math.sin((startAngle - 90) * Math.PI / 180),
  };
  const endOuter = {
    x: cx + r * Math.cos((endAngle - 90) * Math.PI / 180),
    y: cy + r * Math.sin((endAngle - 90) * Math.PI / 180),
  };
  const startInner = {
    x: cx + innerR * Math.cos((endAngle - 90) * Math.PI / 180),
    y: cy + innerR * Math.sin((endAngle - 90) * Math.PI / 180),
  };
  const endInner = {
    x: cx + innerR * Math.cos((startAngle - 90) * Math.PI / 180),
    y: cy + innerR * Math.sin((startAngle - 90) * Math.PI / 180),
  };
  
  const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;
  
  if (innerR === 0) {
    return `M ${cx} ${cy} L ${startOuter.x} ${startOuter.y} A ${r} ${r} 0 ${largeArcFlag} 1 ${endOuter.x} ${endOuter.y} Z`;
  }
  
  return `M ${startOuter.x} ${startOuter.y} A ${r} ${r} 0 ${largeArcFlag} 1 ${endOuter.x} ${endOuter.y} L ${startInner.x} ${startInner.y} A ${innerR} ${innerR} 0 ${largeArcFlag} 0 ${endInner.x} ${endInner.y} Z`;
}

export const AvakioChart = forwardRef<AvakioChartRef, AvakioChartProps>((props, ref) => {
  const {
    id,
    testId,
    type = 'line',
    series,
    xAxis = {},
    yAxis = {},
    legend = { show: true, position: 'bottom', toggle: true },
    tooltip = { show: true },
    title,
    subtitle,
    colors = DEFAULT_COLORS,
    theme = 'material',
    width = '100%',
    height = 400,
    padding = { top: 40, right: 40, bottom: 60, left: 60 },
    animate = true,
    animateDuration = 500,
    gradient = false,
    barWidth = 24,
    barOffset = 8,
    borderRadius = 4,
    donutInnerRadius = 0.5,
    pieStartAngle = 0,
    pieLabels = true,
    donutInnerText,
    stacked = false,
    className,
    style,
    onClick,
    onHover,
    onLegendClick,
  } = props;

  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [hiddenSeries, setHiddenSeries] = useState<Set<string>>(new Set());
  const [hoveredPoint, setHoveredPoint] = useState<{ seriesId: string; index: number } | null>(null);
  const [tooltipData, setTooltipData] = useState<{ x: number; y: number; content: string } | null>(null);
  const [animationProgress, setAnimationProgress] = useState(animate ? 0 : 1);

  // Measure container
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        setDimensions({
          width: Math.max(0, entry.contentRect.width),
          height: Math.max(0, typeof height === 'number' ? height : entry.contentRect.height),
        });
      }
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, [height]);

  // Animation
  useEffect(() => {
    if (!animate) {
      setAnimationProgress(1);
      return;
    }

    setAnimationProgress(0);
    const startTime = performance.now();
    
    const animateFrame = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / animateDuration, 1);
      setAnimationProgress(easeOutCubic(progress));
      
      if (progress < 1) {
        requestAnimationFrame(animateFrame);
      }
    };

    requestAnimationFrame(animateFrame);
  }, [animate, animateDuration, series]);

  const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);

  // Calculate chart area
  const chartArea = useMemo(() => {
    const pad = {
      top: padding.top ?? 40,
      right: padding.right ?? 40,
      bottom: padding.bottom ?? 60,
      left: padding.left ?? 60,
    };

    // Adjust for legend
    if (legend.show) {
      switch (legend.position) {
        case 'top':
          pad.top += 30;
          break;
        case 'bottom':
          pad.bottom += 30;
          break;
        case 'left':
          pad.left += 100;
          break;
        case 'right':
          pad.right += 100;
          break;
      }
    }

    // Adjust for title
    if (title) {
      pad.top += 24;
      if (subtitle) pad.top += 16;
    }

    return {
      x: pad.left,
      y: pad.top,
      width: Math.max(0, dimensions.width - pad.left - pad.right),
      height: Math.max(0, dimensions.height - pad.top - pad.bottom),
    };
  }, [dimensions, padding, legend, title, subtitle]);

  // Get visible series
  const visibleSeries = useMemo(() => {
    return series.filter((s) => {
      const seriesId = s.id || s.name;
      return !hiddenSeries.has(seriesId);
    });
  }, [series, hiddenSeries]);

  // Calculate scales
  const scales = useMemo(() => {
    const isPie = type === 'pie' || type === 'pie3D' || type === 'donut';
    const isRadar = type === 'radar';
    const isHorizontalBar = type === 'barH' || type === 'stackedBarH';

    if (isPie || isRadar) {
      return { xScale: null, yScale: null };
    }

    // Collect all data points
    const allXValues: (string | number)[] = [];
    const allYValues: number[] = [];

    visibleSeries.forEach((s) => {
      s.data.forEach((d) => {
        if (d.x !== undefined) allXValues.push(d.x);
        allYValues.push(d.y);
      });
    });

    // Get unique x values (for categorical)
    const uniqueXValues = Array.from(new Set(allXValues));
    const isXNumeric = uniqueXValues.every((v) => typeof v === 'number');

    // Y-axis bounds
    const yBounds = calculateAxisBounds(
      stacked ? calculateStackedMaxValues(visibleSeries) : allYValues,
      yAxis.step
    );

    if (yAxis.min !== undefined) yBounds.min = yAxis.min;
    if (yAxis.max !== undefined) yBounds.max = yAxis.max;

    return {
      xValues: uniqueXValues,
      isXNumeric,
      yBounds,
      xScale: (value: string | number): number => {
        if (isXNumeric) {
          const numValue = value as number;
          const min = Math.min(...(uniqueXValues as number[]));
          const max = Math.max(...(uniqueXValues as number[]));
          return chartArea.x + ((numValue - min) / (max - min || 1)) * chartArea.width;
        }
        const index = uniqueXValues.indexOf(value);
        return chartArea.x + (index + 0.5) * (chartArea.width / uniqueXValues.length);
      },
      yScale: (value: number): number => {
        const range = yBounds.max - yBounds.min || 1;
        return chartArea.y + chartArea.height - ((value - yBounds.min) / range) * chartArea.height;
      },
    };
  }, [visibleSeries, chartArea, type, xAxis, yAxis, stacked]);

  // Helper for stacked values
  function calculateStackedMaxValues(series: AvakioChartSeries[]): number[] {
    const maxValues: number[] = [];
    if (series.length === 0) return [0];
    
    const numPoints = series[0].data.length;
    for (let i = 0; i < numPoints; i++) {
      let sum = 0;
      series.forEach((s) => {
        if (s.data[i]) sum += s.data[i].y;
      });
      maxValues.push(sum);
    }
    return maxValues;
  }

  // Handle legend click
  const handleLegendClick = (seriesItem: AvakioChartSeries) => {
    if (!legend.toggle) return;
    
    const seriesId = seriesItem.id || seriesItem.name;
    const newHidden = new Set(hiddenSeries);
    
    if (newHidden.has(seriesId)) {
      newHidden.delete(seriesId);
    } else {
      newHidden.add(seriesId);
    }
    
    setHiddenSeries(newHidden);
    onLegendClick?.(seriesItem, !newHidden.has(seriesId));
  };

  // Handle point hover
  const handlePointHover = (seriesItem: AvakioChartSeries | null, point: AvakioChartDataPoint | null, index: number | null, event: React.MouseEvent) => {
    if (point && seriesItem && index !== null) {
      const seriesId = seriesItem.id || seriesItem.name;
      setHoveredPoint({ seriesId, index });
      
      if (tooltip.show) {
        const content = tooltip.format 
          ? tooltip.format(point, seriesItem)
          : `${seriesItem.name}: ${point.y}`;
        
        const rect = containerRef.current?.getBoundingClientRect();
        if (rect) {
          setTooltipData({
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
            content,
          });
        }
      }
      
      onHover?.(point, seriesItem, index);
    } else {
      setHoveredPoint(null);
      setTooltipData(null);
      onHover?.(null, null, null);
    }
  };

  // Handle point click
  const handlePointClick = (seriesItem: AvakioChartSeries, point: AvakioChartDataPoint, index: number) => {
    onClick?.(point, seriesItem, index);
  };

  // Imperative handle
  useImperativeHandle(ref, () => ({
    getNode: () => containerRef.current,
    showSeries: (seriesId: string) => {
      setHiddenSeries((prev) => {
        const next = new Set(prev);
        next.delete(seriesId);
        return next;
      });
    },
    hideSeries: (seriesId: string) => {
      setHiddenSeries((prev) => new Set(prev).add(seriesId));
    },
    toggleSeries: (seriesId: string) => {
      setHiddenSeries((prev) => {
        const next = new Set(prev);
        if (next.has(seriesId)) {
          next.delete(seriesId);
        } else {
          next.add(seriesId);
        }
        return next;
      });
    },
    getVisibleSeries: () => {
      return series
        .filter((s) => !hiddenSeries.has(s.id || s.name))
        .map((s) => s.id || s.name);
    },
    exportImage: async (format = 'png') => {
      if (!svgRef.current) return '';
      
      const svgData = new XMLSerializer().serializeToString(svgRef.current);
      const canvas = document.createElement('canvas');
      canvas.width = dimensions.width;
      canvas.height = dimensions.height;
      const ctx = canvas.getContext('2d');
      
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          ctx?.drawImage(img, 0, 0);
          resolve(canvas.toDataURL(`image/${format}`));
        };
        img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
      });
    },
    refresh: () => {
      setAnimationProgress(0);
      setTimeout(() => setAnimationProgress(1), 10);
    },
  }), [series, hiddenSeries, dimensions]);

  // Render functions
  const renderTitle = () => {
    if (!title) return null;
    
    return (
      <g className="avakio-chart__title">
        <text
          x={dimensions.width / 2}
          y={24}
          textAnchor="middle"
          className="avakio-chart__title-text"
        >
          {title}
        </text>
        {subtitle && (
          <text
            x={dimensions.width / 2}
            y={44}
            textAnchor="middle"
            className="avakio-chart__subtitle-text"
          >
            {subtitle}
          </text>
        )}
      </g>
    );
  };

  const renderAxis = () => {
    if (type === 'pie' || type === 'pie3D' || type === 'donut' || type === 'radar') {
      return null;
    }

    if (!scales.xValues || !scales.yBounds) return null;

    const xAxisY = chartArea.y + chartArea.height;
    const yAxisX = chartArea.x;

    return (
      <g className="avakio-chart__axes">
        {/* X Axis */}
        {(xAxis.showLine !== false) && (
          <line
            x1={chartArea.x}
            y1={xAxisY}
            x2={chartArea.x + chartArea.width}
            y2={xAxisY}
            className="avakio-chart__axis-line"
          />
        )}
        
        {/* X Axis Labels */}
        {scales.xValues.map((value, i) => {
          const x = scales.xScale!(value);
          return (
            <g key={`x-${i}`}>
              {(xAxis.showTicks !== false) && (
                <line
                  x1={x}
                  y1={xAxisY}
                  x2={x}
                  y2={xAxisY + 6}
                  className="avakio-chart__tick"
                />
              )}
              <text
                x={x}
                y={xAxisY + 20}
                textAnchor="middle"
                className="avakio-chart__axis-label"
                transform={xAxis.labelRotation ? `rotate(${xAxis.labelRotation}, ${x}, ${xAxisY + 20})` : undefined}
              >
                {xAxis.format ? xAxis.format(value) : String(value)}
              </text>
            </g>
          );
        })}
        
        {/* X Axis Title */}
        {xAxis.title && (
          <text
            x={chartArea.x + chartArea.width / 2}
            y={xAxisY + 45}
            textAnchor="middle"
            className="avakio-chart__axis-title"
          >
            {xAxis.title}
          </text>
        )}

        {/* Y Axis */}
        {(yAxis.showLine !== false) && (
          <line
            x1={yAxisX}
            y1={chartArea.y}
            x2={yAxisX}
            y2={chartArea.y + chartArea.height}
            className="avakio-chart__axis-line"
          />
        )}
        
        {/* Y Axis Labels and Grid */}
        {scales.yBounds.ticks.map((value, i) => {
          const y = scales.yScale!(value);
          return (
            <g key={`y-${i}`}>
              {(yAxis.showGrid !== false) && (
                <line
                  x1={chartArea.x}
                  y1={y}
                  x2={chartArea.x + chartArea.width}
                  y2={y}
                  className="avakio-chart__grid-line"
                />
              )}
              {(yAxis.showTicks !== false) && (
                <line
                  x1={yAxisX - 6}
                  y1={y}
                  x2={yAxisX}
                  y2={y}
                  className="avakio-chart__tick"
                />
              )}
              <text
                x={yAxisX - 12}
                y={y + 4}
                textAnchor="end"
                className="avakio-chart__axis-label"
              >
                {yAxis.format ? yAxis.format(value) : String(value)}
              </text>
            </g>
          );
        })}
        
        {/* Y Axis Title */}
        {yAxis.title && (
          <text
            x={20}
            y={chartArea.y + chartArea.height / 2}
            textAnchor="middle"
            className="avakio-chart__axis-title"
            transform={`rotate(-90, 20, ${chartArea.y + chartArea.height / 2})`}
          >
            {yAxis.title}
          </text>
        )}
      </g>
    );
  };

  const renderLineChart = (isSpline: boolean = false, isArea: boolean = false) => {
    if (!scales.xScale || !scales.yScale) return null;

    return (
      <g className="avakio-chart__series">
        {visibleSeries.map((s, seriesIdx) => {
          const seriesId = s.id || s.name;
          const color = s.color || colors[seriesIdx % colors.length];
          const points = s.data.map((d) => ({
            x: scales.xScale!(d.x ?? seriesIdx),
            y: scales.yScale!(d.y * animationProgress),
          }));

          const linePath = isSpline
            ? createSplinePath(points)
            : `M ${points.map((p) => `${p.x} ${p.y}`).join(' L ')}`;

          const areaPath = isArea
            ? `${linePath} L ${points[points.length - 1]?.x ?? 0} ${chartArea.y + chartArea.height} L ${points[0]?.x ?? 0} ${chartArea.y + chartArea.height} Z`
            : '';

          return (
            <g key={seriesId} className="avakio-chart__series-group">
              {/* Gradient definition */}
              {gradient && isArea && (
                <defs>
                  <linearGradient id={`gradient-${seriesId}`} x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor={color} stopOpacity="0.6" />
                    <stop offset="100%" stopColor={color} stopOpacity="0.05" />
                  </linearGradient>
                </defs>
              )}
              
              {/* Area fill */}
              {isArea && (
                <path
                  d={areaPath}
                  fill={gradient ? `url(#gradient-${seriesId})` : color}
                  fillOpacity={gradient ? 1 : s.fillOpacity ?? 0.2}
                  className="avakio-chart__area"
                />
              )}
              
              {/* Line */}
              <path
                d={linePath}
                stroke={color}
                strokeWidth={s.lineWidth ?? 2}
                fill="none"
                className="avakio-chart__line"
              />
              
              {/* Data points */}
              {(s.showMarkers !== false) && points.map((point, i) => (
                <circle
                  key={i}
                  cx={point.x}
                  cy={point.y}
                  r={hoveredPoint?.seriesId === seriesId && hoveredPoint?.index === i 
                    ? (s.markerSize ?? 4) + 2 
                    : s.markerSize ?? 4}
                  fill={color}
                  stroke="#fff"
                  strokeWidth={2}
                  className="avakio-chart__marker"
                  onMouseEnter={(e) => handlePointHover(s, s.data[i], i, e)}
                  onMouseLeave={() => handlePointHover(null, null, null, {} as React.MouseEvent)}
                  onClick={() => handlePointClick(s, s.data[i], i)}
                  style={{ cursor: onClick ? 'pointer' : 'default' }}
                />
              ))}
              
              {/* Labels */}
              {s.showLabels && points.map((point, i) => (
                <text
                  key={`label-${i}`}
                  x={point.x}
                  y={point.y - 10}
                  textAnchor="middle"
                  className="avakio-chart__data-label"
                >
                  {s.data[i].y}
                </text>
              ))}
            </g>
          );
        })}
      </g>
    );
  };

  const renderBarChart = (horizontal: boolean = false) => {
    if (!scales.xScale || !scales.yScale || !scales.xValues) return null;

    const numSeries = visibleSeries.length;
    const groupWidth = chartArea.width / Math.max(1, scales.xValues.length);
    const effectiveBarWidth = Math.max(1, Math.min(barWidth, (groupWidth - barOffset * 2) / Math.max(1, numSeries)));
    const totalBarWidth = effectiveBarWidth * numSeries;
    const groupOffset = Math.max(0, (groupWidth - totalBarWidth) / 2);

    return (
      <g className="avakio-chart__series">
        {scales.xValues.map((xVal, xIdx) => {
          const groupX = chartArea.x + xIdx * groupWidth;
          
          let stackedY = chartArea.y + chartArea.height;
          
          return (
            <g key={`group-${xIdx}`} className="avakio-chart__bar-group">
              {visibleSeries.map((s, seriesIdx) => {
                const seriesId = s.id || s.name;
                const color = s.color || colors[seriesIdx % colors.length];
                const dataPoint = s.data.find((d) => d.x === xVal) || s.data[xIdx];
                
                if (!dataPoint) return null;

                const value = dataPoint.y * animationProgress;
                const yRange = Math.max(1, scales.yBounds.max - scales.yBounds.min);
                const barHeight = Math.max(0, (value / yRange) * chartArea.height);
                
                let x: number, y: number, w: number, h: number;
                
                if (stacked) {
                  x = groupX + groupOffset;
                  h = barHeight;
                  y = stackedY - h;
                  w = Math.max(1, totalBarWidth);
                  stackedY = y;
                } else {
                  x = groupX + groupOffset + seriesIdx * effectiveBarWidth;
                  y = scales.yScale!(value);
                  w = Math.max(1, effectiveBarWidth - 2);
                  h = Math.max(0, chartArea.y + chartArea.height - y);
                }

                const isHovered = hoveredPoint?.seriesId === seriesId && hoveredPoint?.index === xIdx;

                return (
                  <g key={seriesId}>
                    {/* Gradient definition */}
                    {gradient && (
                      <defs>
                        <linearGradient id={`bar-gradient-${seriesId}-${xIdx}`} x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor={color} stopOpacity="1" />
                          <stop offset="100%" stopColor={color} stopOpacity="0.7" />
                        </linearGradient>
                      </defs>
                    )}
                    <rect
                      x={x}
                      y={y}
                      width={w}
                      height={Math.max(0, h)}
                      rx={borderRadius}
                      fill={gradient ? `url(#bar-gradient-${seriesId}-${xIdx})` : color}
                      className={`avakio-chart__bar ${isHovered ? 'avakio-chart__bar--hovered' : ''}`}
                      onMouseEnter={(e) => handlePointHover(s, dataPoint, xIdx, e)}
                      onMouseLeave={() => handlePointHover(null, null, null, {} as React.MouseEvent)}
                      onClick={() => handlePointClick(s, dataPoint, xIdx)}
                      style={{ cursor: onClick ? 'pointer' : 'default' }}
                    />
                    {s.showLabels && (
                      <text
                        x={x + w / 2}
                        y={y - 5}
                        textAnchor="middle"
                        className="avakio-chart__data-label"
                      >
                        {dataPoint.y}
                      </text>
                    )}
                  </g>
                );
              })}
            </g>
          );
        })}
      </g>
    );
  };

  const renderPieChart = (isDonut: boolean = false) => {
    // Use first series for pie/donut
    const seriesData = visibleSeries[0];
    if (!seriesData) return null;

    const cx = chartArea.x + chartArea.width / 2;
    const cy = chartArea.y + chartArea.height / 2;
    const radius = Math.min(chartArea.width, chartArea.height) / 2 - 20;
    const innerRadius = isDonut ? radius * donutInnerRadius : 0;

    const total = seriesData.data.reduce((sum, d) => sum + d.y, 0);
    let currentAngle = pieStartAngle;

    return (
      <g className="avakio-chart__pie">
        {seriesData.data.map((d, i) => {
          const sliceAngle = (d.y / total) * 360 * animationProgress;
          const startAngle = currentAngle;
          const endAngle = currentAngle + sliceAngle;
          currentAngle = endAngle;

          const color = d.color || colors[i % colors.length];
          const midAngle = (startAngle + endAngle) / 2;
          const isHovered = hoveredPoint?.seriesId === (seriesData.id || seriesData.name) && hoveredPoint?.index === i;
          
          // Calculate label position
          const labelRadius = radius + 25;
          const labelX = cx + labelRadius * Math.cos((midAngle - 90) * Math.PI / 180);
          const labelY = cy + labelRadius * Math.sin((midAngle - 90) * Math.PI / 180);

          // Hover offset
          const offsetDistance = isHovered ? 8 : 0;
          const offsetX = offsetDistance * Math.cos((midAngle - 90) * Math.PI / 180);
          const offsetY = offsetDistance * Math.sin((midAngle - 90) * Math.PI / 180);

          return (
            <g key={i} transform={`translate(${offsetX}, ${offsetY})`}>
              {/* Gradient definition */}
              {gradient && (
                <defs>
                  <radialGradient id={`pie-gradient-${i}`} cx="30%" cy="30%">
                    <stop offset="0%" stopColor={color} stopOpacity="1" />
                    <stop offset="100%" stopColor={color} stopOpacity="0.8" />
                  </radialGradient>
                </defs>
              )}
              <path
                d={describePieSlice(cx, cy, radius, innerRadius, startAngle, endAngle)}
                fill={gradient ? `url(#pie-gradient-${i})` : color}
                stroke="#fff"
                strokeWidth={2}
                className={`avakio-chart__pie-slice ${isHovered ? 'avakio-chart__pie-slice--hovered' : ''}`}
                onMouseEnter={(e) => handlePointHover(seriesData, d, i, e)}
                onMouseLeave={() => handlePointHover(null, null, null, {} as React.MouseEvent)}
                onClick={() => handlePointClick(seriesData, d, i)}
                style={{ cursor: onClick ? 'pointer' : 'default' }}
              />
              {pieLabels && sliceAngle > 15 && (
                <text
                  x={labelX}
                  y={labelY}
                  textAnchor={labelX > cx ? 'start' : 'end'}
                  className="avakio-chart__pie-label"
                >
                  {d.label || d.x || ''} ({((d.y / total) * 100).toFixed(1)}%)
                </text>
              )}
            </g>
          );
        })}
        
        {/* Donut inner text */}
        {isDonut && donutInnerText && (
          <text
            x={cx}
            y={cy}
            textAnchor="middle"
            dominantBaseline="middle"
            className="avakio-chart__donut-text"
          >
            {donutInnerText}
          </text>
        )}
      </g>
    );
  };

  const renderScatterChart = () => {
    if (!scales.xScale || !scales.yScale) return null;

    return (
      <g className="avakio-chart__series">
        {visibleSeries.map((s, seriesIdx) => {
          const seriesId = s.id || s.name;
          const color = s.color || colors[seriesIdx % colors.length];

          return (
            <g key={seriesId} className="avakio-chart__scatter-group">
              {s.data.map((d, i) => {
                const x = scales.xScale!(d.x ?? i);
                const y = scales.yScale!(d.y * animationProgress);
                const isHovered = hoveredPoint?.seriesId === seriesId && hoveredPoint?.index === i;

                return (
                  <circle
                    key={i}
                    cx={x}
                    cy={y}
                    r={isHovered ? (s.markerSize ?? 6) + 2 : s.markerSize ?? 6}
                    fill={d.color || color}
                    fillOpacity={0.7}
                    stroke={d.color || color}
                    strokeWidth={2}
                    className="avakio-chart__scatter-point"
                    onMouseEnter={(e) => handlePointHover(s, d, i, e)}
                    onMouseLeave={() => handlePointHover(null, null, null, {} as React.MouseEvent)}
                    onClick={() => handlePointClick(s, d, i)}
                    style={{ cursor: onClick ? 'pointer' : 'default' }}
                  />
                );
              })}
            </g>
          );
        })}
      </g>
    );
  };

  const renderRadarChart = () => {
    // Use first series to get categories from x values
    if (visibleSeries.length === 0) return null;
    
    const categories = visibleSeries[0].data.map((d) => String(d.label || d.x || ''));
    const numCategories = categories.length;
    const angleStep = (Math.PI * 2) / numCategories;
    
    const cx = chartArea.x + chartArea.width / 2;
    const cy = chartArea.y + chartArea.height / 2;
    const radius = Math.min(chartArea.width, chartArea.height) / 2 - 40;
    
    // Calculate max value for scaling
    const maxValue = Math.max(...visibleSeries.flatMap((s) => s.data.map((d) => d.y)));
    const numLevels = 5;

    return (
      <g className="avakio-chart__radar">
        {/* Background levels */}
        {Array.from({ length: numLevels }).map((_, levelIdx) => {
          const levelRadius = (radius * (levelIdx + 1)) / numLevels;
          const points = Array.from({ length: numCategories }).map((_, i) => {
            const angle = i * angleStep - Math.PI / 2;
            return {
              x: cx + levelRadius * Math.cos(angle),
              y: cy + levelRadius * Math.sin(angle),
            };
          });
          
          return (
            <polygon
              key={levelIdx}
              points={points.map((p) => `${p.x},${p.y}`).join(' ')}
              fill="none"
              stroke="currentColor"
              strokeOpacity={0.2}
              className="avakio-chart__radar-level"
            />
          );
        })}
        
        {/* Axis lines */}
        {categories.map((_, i) => {
          const angle = i * angleStep - Math.PI / 2;
          const x = cx + radius * Math.cos(angle);
          const y = cy + radius * Math.sin(angle);
          
          return (
            <line
              key={i}
              x1={cx}
              y1={cy}
              x2={x}
              y2={y}
              stroke="currentColor"
              strokeOpacity={0.2}
              className="avakio-chart__radar-axis"
            />
          );
        })}
        
        {/* Category labels */}
        {categories.map((cat, i) => {
          const angle = i * angleStep - Math.PI / 2;
          const x = cx + (radius + 20) * Math.cos(angle);
          const y = cy + (radius + 20) * Math.sin(angle);
          
          return (
            <text
              key={i}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="avakio-chart__radar-label"
            >
              {cat}
            </text>
          );
        })}
        
        {/* Data polygons */}
        {visibleSeries.map((s, seriesIdx) => {
          const seriesId = s.id || s.name;
          const color = s.color || colors[seriesIdx % colors.length];
          
          const points = s.data.map((d, i) => {
            const angle = i * angleStep - Math.PI / 2;
            const r = (d.y / maxValue) * radius * animationProgress;
            return {
              x: cx + r * Math.cos(angle),
              y: cy + r * Math.sin(angle),
            };
          });
          
          return (
            <g key={seriesId}>
              <polygon
                points={points.map((p) => `${p.x},${p.y}`).join(' ')}
                fill={color}
                fillOpacity={0.2}
                stroke={color}
                strokeWidth={2}
                className="avakio-chart__radar-polygon"
              />
              {points.map((point, i) => (
                <circle
                  key={i}
                  cx={point.x}
                  cy={point.y}
                  r={s.markerSize ?? 4}
                  fill={color}
                  stroke="#fff"
                  strokeWidth={2}
                  className="avakio-chart__radar-point"
                  onMouseEnter={(e) => handlePointHover(s, s.data[i], i, e)}
                  onMouseLeave={() => handlePointHover(null, null, null, {} as React.MouseEvent)}
                  onClick={() => handlePointClick(s, s.data[i], i)}
                  style={{ cursor: onClick ? 'pointer' : 'default' }}
                />
              ))}
            </g>
          );
        })}
      </g>
    );
  };

  const renderLegend = () => {
    if (!legend.show) return null;

    const isVertical = legend.position === 'left' || legend.position === 'right';
    
    let x: number, y: number;
    switch (legend.position) {
      case 'top':
        x = dimensions.width / 2;
        y = title ? 60 : 20;
        break;
      case 'bottom':
        x = dimensions.width / 2;
        y = dimensions.height - 15;
        break;
      case 'left':
        x = 20;
        y = chartArea.y + 20;
        break;
      case 'right':
        x = dimensions.width - 100;
        y = chartArea.y + 20;
        break;
      default:
        x = dimensions.width / 2;
        y = dimensions.height - 15;
    }

    return (
      <g 
        className="avakio-chart__legend"
        transform={`translate(${x}, ${y})`}
      >
        {series.map((s, i) => {
          const seriesId = s.id || s.name;
          const color = s.color || colors[i % colors.length];
          const isHidden = hiddenSeries.has(seriesId);
          
          const itemX = isVertical ? 0 : (i - series.length / 2) * 100;
          const itemY = isVertical ? i * 24 : 0;
          
          return (
            <g
              key={seriesId}
              className={`avakio-chart__legend-item ${isHidden ? 'avakio-chart__legend-item--hidden' : ''}`}
              transform={`translate(${itemX}, ${itemY})`}
              onClick={() => handleLegendClick(s)}
              style={{ cursor: legend.toggle ? 'pointer' : 'default' }}
            >
              <rect
                x={0}
                y={-8}
                width={12}
                height={12}
                rx={2}
                fill={isHidden ? 'transparent' : color}
                stroke={color}
                strokeWidth={2}
              />
              <text
                x={18}
                y={0}
                dominantBaseline="middle"
                className="avakio-chart__legend-text"
                style={{ opacity: isHidden ? 0.5 : 1 }}
              >
                {s.name}
              </text>
            </g>
          );
        })}
      </g>
    );
  };

  const renderTooltip = () => {
    if (!tooltipData) return null;

    return (
      <div
        className="avakio-chart__tooltip"
        style={{
          left: tooltipData.x + 10,
          top: tooltipData.y - 10,
        }}
      >
        {tooltipData.content}
      </div>
    );
  };

  const renderChartContent = () => {
    switch (type) {
      case 'line':
        return renderLineChart(false, false);
      case 'spline':
        return renderLineChart(true, false);
      case 'area':
        return renderLineChart(false, true);
      case 'splineArea':
        return renderLineChart(true, true);
      case 'bar':
      case 'stackedBar':
        return renderBarChart(false);
      case 'barH':
      case 'stackedBarH':
        return renderBarChart(true);
      case 'pie':
      case 'pie3D':
        return renderPieChart(false);
      case 'donut':
        return renderPieChart(true);
      case 'scatter':
        return renderScatterChart();
      case 'radar':
        return renderRadarChart();
      default:
        return renderLineChart(false, false);
    }
  };

  const containerStyle: React.CSSProperties = {
    width,
    height,
    ...style,
  };

  return (
    <div
      ref={containerRef}
      id={id}
      data-testid={testId}
      className={`avakio-chart avakio-chart--${theme} avakio-chart--${type} ${className || ''}`}
      style={containerStyle}
    >
      <svg
        ref={svgRef}
        width={dimensions.width}
        height={dimensions.height}
        className="avakio-chart__svg"
      >
        {renderTitle()}
        {renderAxis()}
        {renderChartContent()}
        {renderLegend()}
      </svg>
      {renderTooltip()}
    </div>
  );
});

AvakioChart.displayName = 'AvakioChart';

export default AvakioChart;











