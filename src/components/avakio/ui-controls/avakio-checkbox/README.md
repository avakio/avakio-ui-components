# AvakioCheckbox

A theme-aware checkbox  Supports indeterminate, descriptions, errors, disabled state, and keyboard navigation.

## Features

- ✓ Checked, unchecked, and indeterminate states
- ✓ Descriptions, required indicator, and error text
- ✓ Disabled handling with focus/keyboard support
- ✓ Sizes: sm, md
- ✓ Theme-aware for all 6 Avakio themes

## Installation

```tsx
import { AvakioCheckbox } from '@/components/avakio/ui-controls/avakio-checkbox/avakio-checkbox';
import '@/components/avakio/ui-controls/avakio-checkbox/avakio-checkbox.css';
```

## Basic Usage

```tsx
<AvakioCheckbox
  label="Enable feature"
  description="Turns on the new capability."
  checked={value}
  onChange={setValue}
/>
```

## Indeterminate Example

```tsx
const allChecked = selected.length === items.length;
const indeterminate = selected.length > 0 && !allChecked;

<AvakioCheckbox
  label="Select all"
  indeterminate={indeterminate}
  checked={allChecked}
  onChange={(all) => setSelected(all ? items : [])}
/>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `checked` | `boolean` | `undefined` | Controlled checked state |
| `defaultChecked` | `boolean` | `undefined` | Uncontrolled initial state |
| `indeterminate` | `boolean` | `false` | Shows mixed state when true and unchecked |
| `label` | `string` | `undefined` | Primary label text |
| `description` | `string` | `undefined` | Secondary helper text |
| `size` | `'sm'\|'md'` | `'md'` | Visual size |
| `error` | `string` | `undefined` | Error message below the field |
| `required` | `boolean` | `false` | Shows required asterisk |
| `disabled` | `boolean` | `false` | Disables interaction |
| `onChange` | `(checked: boolean) => void` | `undefined` | Fired on toggle |
| `className` | `string` | `''` | Additional classes |
| `...rest` | `InputHTMLAttributes` | - | Passed to the input element |

## Keyboard Navigation

- Space / Enter: toggle
- Focus ring appears on the box for accessibility

## Theming

Responds to `data-admin-theme` on any ancestor. Supported themes: Material, Flat, Compact, Dark, Ocean, Sunset.

```tsx
document.documentElement.setAttribute('data-admin-theme', 'ocean');
```

## Example

See `avakio-checkbox-example.tsx` for live demos (basic, disabled, error, and indeterminate group).

