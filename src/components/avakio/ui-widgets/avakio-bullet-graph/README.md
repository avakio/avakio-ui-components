# AvakioBulletGraph

A compact data visualization widget for comparing a value against a target and qualitative ranges.

## Features

- **Performance Bands**: Colored background bands representing qualitative ranges (poor, satisfactory, good)
- **Target Marker**: Vertical line indicating the target value
- **Animated Value Bar**: Smooth animation when value changes
- **Dynamic Color**: Bar color can change based on current value
- **Customizable Scale**: Configure tick intervals and label templates
- **Theme Support**: Works with all 6 Avakio themes (material, flat, compact, dark, ocean, sunset)
- **Horizontal/Vertical Layout**: Choose orientation based on your UI needs

## Installation

Import the component and its styles:

```tsx
import { AvakioBulletGraph } from '@/components/avakio/ui-widgets/avakio-bullet-graph';
import '@/components/avakio/ui-widgets/avakio-bullet-graph/avakio-bullet-graph.css';
```

## Usage

### Basic Usage

```tsx
import { AvakioBulletGraph } from './avakio-bullet-graph';

function MyComponent() {
  return (
    <AvakioBulletGraph
      value={75}
      minRange={0}
      maxRange={100}
      label="Q1 Revenue"
      placeholder="75% of target"
    />
  );
}
```

### With Target Marker

```tsx
<AvakioBulletGraph
  value={85}
  minRange={0}
  maxRange={120}
  marker={100}
  bands={[
    { value: 120, color: '#dcfce7' },
    { value: 100, color: '#86efac' },
    { value: 80, color: '#22c55e' },
  ]}
  label="Sales YTD"
  placeholder="85% (Target: 100%)"
  scale={{ step: 20, template: "#value#%" }}
/>
```

### Dynamic Color

```tsx
<AvakioBulletGraph
  value={45}
  minRange={0}
  maxRange={100}
  color={(value) => {
    if (value < 30) return '#ef4444'; // red
    if (value < 60) return '#f59e0b'; // yellow
    return '#22c55e'; // green
  }}
  label="System Health"
/>
```

### Custom Performance Bands

```tsx
<AvakioBulletGraph
  value={65}
  minRange={0}
  maxRange={100}
  bands={[
    { value: 100, color: '#fee2e2' }, // Poor (red background)
    { value: 75, color: '#fef08a' },  // Satisfactory (yellow)
    { value: 50, color: '#bbf7d0' },  // Good (green)
  ]}
  label="Risk Level"
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | - | Current value to display (required) |
| `minRange` | `number` | `0` | Minimum range value |
| `maxRange` | `number` | `100` | Maximum range value |
| `marker` | `number \| false` | `false` | Target marker position |
| `markerColor` | `string` | `--bg-marker` | Color of the target marker |
| `color` | `string \| function` | `--bg-primary` | Bar color (static or dynamic) |
| `bands` | `AvakioBulletGraphBand[]` | Default bands | Performance bands/ranges |
| `label` | `string` | `undefined` | Label text |
| `placeholder` | `string` | `undefined` | Additional description (supports #value# placeholder) |
| `stroke` | `number` | `8` | Bar width in pixels |
| `scale` | `AvakioBulletGraphScale` | `undefined` | Scale configuration |
| `tickSize` | `number` | `10` | Length of scale ticks in pixels |
| `flowTime` | `number` | `500` | Animation duration in milliseconds |
| `smoothFlow` | `boolean` | `true` | Enable smooth animation |
| `layout` | `'horizontal' \| 'vertical'` | `'horizontal'` | Layout orientation |
| `labelWidth` | `number` | `120` | Width of label area (horizontal) |
| `labelHeight` | `number` | `40` | Height of label area (vertical) |
| `showLabel` | `boolean` | `true` | Show/hide the label |
| `showScale` | `boolean` | `true` | Show/hide the scale |
| `disabled` | `boolean` | `false` | Disable the component |
| `id` | `string` | `undefined` | Unique ID |
| `testId` | `string` | `undefined` | Test ID for testing |
| `className` | `string` | `undefined` | Additional CSS class |

## Interfaces

### AvakioBulletGraphBand

```typescript
interface AvakioBulletGraphBand {
  value: number;  // The end value of this band
  color: string;  // The color of this band
}
```

### AvakioBulletGraphScale

```typescript
interface AvakioBulletGraphScale {
  step?: number;  // Step interval for scale ticks
  template?: string | ((value: number) => string);  // Label template
}
```

## Theme Support

The component supports all 6 Avakio themes:

- `material` - Default Material Design inspired theme
- `flat` - Flat design with Nordic colors
- `compact` - Smaller sizing for dense layouts
- `dark` - Dark mode theme
- `ocean` - Blue ocean-inspired theme
- `sunset` - Warm orange/amber theme

Themes are automatically applied via the `data-admin-theme` attribute on the document.

## Use Cases

- **KPI Dashboards**: Display metrics against targets
- **Sales Performance**: Show progress toward sales goals
- **System Monitoring**: Visualize resource usage
- **Project Tracking**: Display task completion rates
- **Quality Metrics**: Show customer satisfaction scores

## Accessibility

- Supports `aria-label` through the label prop
- Clear visual distinction between value and target
- High contrast colors for performance bands
- Animated transitions can be disabled via `smoothFlow={false}`

