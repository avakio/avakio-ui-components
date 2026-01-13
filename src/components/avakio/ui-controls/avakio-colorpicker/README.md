# AvakioColorPicker

A theme-aware color picker  Supports presets, hex input, native color input, preview, and error/disabled states.

## Features

- ✓ Native color input with live preview
- ✓ Hex input with validation and normalization (#abc → #aabbcc)
- ✓ Preset swatches (customizable)
- ✓ Disabled/read-only support
- ✓ Theme-aware across all 6 Avakio themes

## Installation

```tsx
import { AvakioColorPicker } from '@/components/avakio/ui-controls/avakio-colorpicker/avakio-colorpicker';
import '@/components/avakio/ui-controls/avakio-colorpicker/avakio-colorpicker.css';
```

## Basic Usage

```tsx
const [color, setColor] = useState('#1ca1c1');

<AvakioColorPicker
  id="accent-color"
  label="Accent color"
  description="Used for primary actions"
  value={color}
  onChange={({ value }) => setColor(value)}
/>
```

## Custom Presets & Validation

```tsx
const presets = [
  { label: 'Sky', value: '#38bdf8' },
  { label: 'Coral', value: '#fb923c' },
];

<AvakioColorPicker
  id="brand-color"
  label="Brand color"
  value={color}
  onChange={({ value }) => setColor(value)}
  presets={presets}
  error={color === '#000000' ? 'Too dark for branding' : undefined}
/>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `string` | `undefined` | Controlled color (hex) |
| `defaultValue` | `string` | `'#1ca1c1'` | Uncontrolled initial color |
| `onChange` | `({ id, value }) => void` | `undefined` | Fired on color change. Receives `{ id, value }` object |
| `label` | `string` | `undefined` | Label text |
| `description` | `string` | `undefined` | Helper text |
| `error` | `string` | `undefined` | Error message |
| `disabled` | `boolean` | `false` | Disables interaction |
| `readOnly` | `boolean` | `false` | Prevents changes while showing value |
| `required` | `boolean` | `false` | Shows required asterisk |
| `presets` | `AvakioColorPickerPreset[]` | built-in palette | Preset swatches |
| `allowCustomInput` | `boolean` | `true` | Show hex text input |
| `showPreview` | `boolean` | `true` | Show color preview block |
| `className` | `string` | `''` | Extra CSS classes |

### AvakioColorPickerPreset

| Field | Type | Description |
| --- | --- | --- |
| `label` | `string` | Optional display label |
| `value` | `string` | Hex color (e.g. `#1ca1c1`) |

## Theming

Responds to `data-admin-theme` on any ancestor. Supported: Material, Flat, Compact, Dark, Ocean, Sunset.

```tsx
document.documentElement.setAttribute('data-admin-theme', 'ocean');
```

## Example

See `avakio-colorpicker-example.tsx` for live demos (basic, validation, disabled).

