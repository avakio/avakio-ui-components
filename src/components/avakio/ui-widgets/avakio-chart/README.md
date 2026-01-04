# Avakio Chart

A comprehensive, SVG-based charting component for data visualization. Supports multiple chart types, themes, legends, tooltips, and smooth animations.

## Features

- **Multiple Chart Types**: Line, spline, area, bar, pie, donut, scatter, radar
- **Theme Support**: 6 built-in themes (material, dark, ocean, sunset, flat, compact)
- **Interactive**: Tooltips, hover effects, click events, legend toggle
- **Customizable**: Colors, gradients, animations, axis configuration
- **Responsive**: Automatically resizes to container
- **Export**: Export charts as PNG/JPEG images

## Installation

```tsx
import { AvakioChart } from '@/components/avakio/ui-widgets/avakio-chart';
```

## Basic Usage

```tsx
import { AvakioChart } from './avakio-chart';

const data = [
  {
    name: 'Sales',
    data: [
      { x: 'Jan', y: 120 },
      { x: 'Feb', y: 150 },
      { x: 'Mar', y: 180 },
      { x: 'Apr', y: 220 },
    ],
  },
];

function MyChart() {
  return (
    <AvakioChart
      type="line"
      series={data}
      title="Monthly Sales"
      height={400}
    />
  );
}
```

## Chart Types

| Type | Description |
|------|-------------|
| `line` | Standard line chart |
| `spline` | Smooth curved line chart |
| `area` | Line chart with filled area |
| `splineArea` | Smooth curved area chart |
| `bar` | Vertical bar chart |
| `stackedBar` | Stacked vertical bars |
| `barH` | Horizontal bar chart |
| `stackedBarH` | Stacked horizontal bars |
| `pie` | Pie chart |
| `pie3D` | 3D pie chart |
| `donut` | Donut chart (pie with hole) |
| `scatter` | Scatter plot |
| `radar` | Radar/Spider chart |

## Props

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `type` | `AvakioChartType` | `'line'` | Chart type |
| `series` | `AvakioChartSeries[]` | required | Data series array |
| `title` | `string` | - | Chart title |
| `subtitle` | `string` | - | Chart subtitle |
| `xAxis` | `AvakioChartAxis` | `{}` | X-axis configuration |
| `yAxis` | `AvakioChartAxis` | `{}` | Y-axis configuration |
| `legend` | `AvakioChartLegend` | `{ show: true }` | Legend configuration |
| `tooltip` | `AvakioChartTooltip` | `{ show: true }` | Tooltip configuration |
| `theme` | `AvakioChartTheme` | `'material'` | Visual theme |
| `width` | `number \| string` | `'100%'` | Chart width |
| `height` | `number \| string` | `400` | Chart height |
| `padding` | `AvakioChartPadding` | `{ top: 40, right: 40, bottom: 60, left: 60 }` | Chart padding |
| `colors` | `string[]` | `[palette]` | Custom color palette |
| `animate` | `boolean` | `true` | Enable animations |
| `animateDuration` | `number` | `500` | Animation duration (ms) |
| `gradient` | `boolean` | `false` | Enable gradient fills |
| `barWidth` | `number` | `24` | Bar width (for bar charts) |
| `barOffset` | `number` | `8` | Gap between bar groups |
| `borderRadius` | `number` | `4` | Bar corner radius |
| `donutInnerRadius` | `number` | `0.5` | Inner radius ratio (0-1) |
| `pieStartAngle` | `number` | `0` | Start angle in degrees |
| `pieLabels` | `boolean` | `true` | Show pie/donut labels |
| `donutInnerText` | `string` | - | Center text for donut |
| `stacked` | `boolean` | `false` | Enable stacked mode |

## Series Properties

```tsx
interface AvakioChartSeries {
  id?: string;           // Unique identifier
  name: string;          // Series name (shown in legend)
  data: AvakioChartDataPoint[];
  color?: string;        // Series color
  type?: AvakioChartType; // Override chart type
  lineWidth?: number;    // Line thickness
  fillOpacity?: number;  // Area fill opacity
  showLabels?: boolean;  // Show data labels
  showMarkers?: boolean; // Show data point markers
  markerSize?: number;   // Marker size
  hidden?: boolean;      // Initially hidden
}
```

## Data Point Properties

```tsx
interface AvakioChartDataPoint {
  x?: string | number;   // X-axis value
  y: number;             // Y-axis value
  label?: string;        // Label (for pie/donut)
  color?: string;        // Color override
  tooltip?: string;      // Custom tooltip text
}
```

## Axis Configuration

```tsx
interface AvakioChartAxis {
  title?: string;        // Axis title
  min?: number;          // Minimum value
  max?: number;          // Maximum value
  step?: number;         // Tick step
  format?: (value) => string; // Label format function
  showGrid?: boolean;    // Show grid lines
  showLine?: boolean;    // Show axis line
  showTicks?: boolean;   // Show tick marks
  labelRotation?: number; // Label rotation angle
}
```

## Legend Configuration

```tsx
interface AvakioChartLegend {
  show?: boolean;        // Show legend
  position?: 'top' | 'bottom' | 'left' | 'right';
  align?: 'start' | 'center' | 'end';
  toggle?: boolean;      // Click to toggle series
}
```

## Tooltip Configuration

```tsx
interface AvakioChartTooltip {
  show?: boolean;
  format?: (point, series) => string;
  shared?: boolean;      // Share across series
}
```

## Imperative API

Access chart methods via ref:

```tsx
const chartRef = useRef<AvakioChartRef>(null);

// Methods
chartRef.current?.showSeries('series-id');
chartRef.current?.hideSeries('series-id');
chartRef.current?.toggleSeries('series-id');
chartRef.current?.getVisibleSeries();
chartRef.current?.exportImage('png');
chartRef.current?.refresh();
chartRef.current?.getNode();
```

## Events

```tsx
<AvakioChart
  onClick={(point, series, index) => {
    console.log('Clicked:', point, series.name);
  }}
  onHover={(point, series, index) => {
    if (point) console.log('Hovering:', point);
  }}
  onLegendClick={(series, visible) => {
    console.log('Legend toggle:', series.name, visible);
  }}
/>
```

## Themes

Available themes:
- `material` (default) - Material Design inspired
- `dark` - Dark mode
- `ocean` - Blue/teal palette
- `sunset` - Warm orange/amber palette
- `flat` - Minimal flat design
- `compact` - Smaller fonts and spacing

## Examples

### Multi-Series Line Chart

```tsx
<AvakioChart
  type="spline"
  series={[
    { name: '2023', data: [...], color: '#EA4335' },
    { name: '2024', data: [...], color: '#34A853' },
  ]}
  legend={{ show: true, position: 'bottom', toggle: true }}
  tooltip={{ format: (p, s) => `${s.name}: $${p.y}K` }}
/>
```

### Donut Chart with Center Text

```tsx
<AvakioChart
  type="donut"
  series={budgetData}
  donutInnerRadius={0.6}
  donutInnerText="Total"
  pieLabels
  gradient
/>
```

### Stacked Bar Chart

```tsx
<AvakioChart
  type="stackedBar"
  series={deviceData}
  stacked
  barWidth={36}
  borderRadius={4}
  gradient
/>
```

### Radar Chart

```tsx
<AvakioChart
  type="radar"
  series={skillsData}
  legend={{ show: true, position: 'bottom' }}
  height={350}
/>
```

## Keyboard Navigation

- Charts are focusable for accessibility
- Legend items can be toggled via click

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- SVG-based rendering for crisp visuals at any scale

