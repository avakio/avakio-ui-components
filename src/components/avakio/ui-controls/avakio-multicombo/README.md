# AvakioMultiCombo

A multi-select dropdown component with chips display, search filtering, select all functionality, and comprehensive label support via `AvakioControlLabel`.

## Features

- Multiple selection with checkboxes
- Chips display with configurable max items
- Show count mode alternative to chips
- Search/filter functionality
- Select All / Deselect All
- Custom option templates
- Full label support (left, top, right, bottom positions)
- Compact size variant
- Validation states (required, invalid)
- forwardRef with imperative API

## Usage

```tsx
import { AvakioMultiCombo } from '@avakio/ui-components';

// Basic usage
<AvakioMultiCombo
  id="tech-select"
  value={selectedValues}
  options={[
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue.js' },
    { value: 'angular', label: 'Angular' },
  ]}
  onChange={({ value }) => setSelectedValues(value)}
  label="Technologies"
  placeholder="Select technologies..."
/>

// With show count mode
<AvakioMultiCombo
  id="items-select"
  value={selectedValues}
  options={options}
  onChange={({ value }) => setSelectedValues(value)}
  label="Select Items"
  showCount
/>

// With custom template
<AvakioMultiCombo
  id="countries-select"
  value={selectedValues}
  options={countryOptions}
  onChange={({ value }) => setSelectedValues(value)}
  label="Countries"
  template={(option) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <span>{option.flag}</span>
      <span>{option.label}</span>
    </div>
  )}
/>

// Compact size for tables/filters
<AvakioMultiCombo
  id="compact-select"
  value={selectedValues}
  options={options}
  onChange={({ value }) => setSelectedValues(value)}
  size="compact"
/>
```

## Props

### Component-Specific Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string[]` | `[]` | Array of selected values |
| `options` | `AvakioMultiComboOption[]` | `[]` | Array of options with value and label |
| `placeholder` | `string` | `'Select items...'` | Placeholder text when no selection |
| `showCount` | `boolean` | `false` | Show count instead of chips |
| `maxDisplayItems` | `number` | `3` | Max chips to display before "+N more" |
| `clearable` | `boolean` | `true` | Whether the selection can be cleared |
| `size` | `'default' \| 'compact'` | `'default'` | Size variant |
| `template` | `(option) => ReactNode` | `undefined` | Custom render function for options |
| `yCount` | `number` | `undefined` | Number of visible items in dropdown |

### Label Props (via AvakioControlLabel)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | `undefined` | Label text displayed beside the control |
| `labelForm` | `string` | `undefined` | Form label displayed above the component |
| `labelPosition` | `'left' \| 'top' \| 'right' \| 'bottom'` | `'left'` | Position of the label |
| `labelAlign` | `'left' \| 'center' \| 'right'` | `'left'` | Alignment of the label text |
| `labelWidth` | `number \| string` | `100` | Width of the label |
| `bottomLabel` | `string` | `undefined` | Help text displayed below the component |

### State Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `disabled` | `boolean` | `false` | Whether the component is disabled |
| `readonly` | `boolean` | `false` | Whether the component is read-only |
| `hidden` | `boolean` | `false` | Whether the component is hidden |
| `borderless` | `boolean` | `false` | Removes the border |

### Validation Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `required` | `boolean` | `false` | Marks field as required (shows asterisk) |
| `invalid` | `boolean` | `false` | Marks the component as invalid |
| `invalidMessage` | `string` | `undefined` | Validation error message |

### Sizing Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `width` | `number \| string` | `undefined` | Width of the component |
| `maxHeight` | `number \| string` | `undefined` | Maximum height of the dropdown |
| `minWidth` | `number \| string` | `undefined` | Minimum width |
| `maxWidth` | `number \| string` | `undefined` | Maximum width |
| `margin` | `number \| string \| [number, number, number, number]` | `undefined` | Margin around the component |
| `padding` | `number \| string \| [number, number, number, number]` | `undefined` | Padding inside the component |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `onChange` | `({ id, value }) => void` | Fires when selected values change. Receives `{ id, value }` object |

## Ref Methods

The component exposes imperative methods via `forwardRef`:

```tsx
const multiComboRef = useRef<AvakioMultiComboRef>(null);

// Usage
multiComboRef.current?.getValue();      // Returns string[]
multiComboRef.current?.setValue(['a', 'b']);
multiComboRef.current?.getText();       // Returns comma-separated labels
multiComboRef.current?.clear();         // Clears all selections
multiComboRef.current?.selectAll();     // Selects all options
multiComboRef.current?.focus();
multiComboRef.current?.blur();
multiComboRef.current?.enable();
multiComboRef.current?.disable();
multiComboRef.current?.show();
multiComboRef.current?.hide();
multiComboRef.current?.isEnabled();     // Returns boolean
multiComboRef.current?.isVisible();     // Returns boolean
multiComboRef.current?.getElement();    // Returns HTMLElement | null
multiComboRef.current?.getParentView(); // Returns string | null
multiComboRef.current?.validate();      // Returns boolean | string
```

## Option Interface

```tsx
interface AvakioMultiComboOption {
  value: string;
  label: string;
  [key: string]: any; // Additional custom properties for templates
}
```

## CSS Classes

The component uses the `avakio-multicombo` prefix for all CSS classes:

- `.avakio-multicombo` - Root container
- `.avakio-multicombo-trigger` - Clickable trigger area
- `.avakio-multicombo-chips` - Chips container
- `.avakio-multicombo-chip` - Individual chip
- `.avakio-multicombo-dropdown` - Dropdown portal
- `.avakio-multicombo-option` - Option item
- `.avakio-multicombo-checkbox` - Option checkbox
- `.avakio-multicombo-label` - Label element
- `.avakio-multicombo-compact` - Compact size modifier
- `.avakio-multicombo-disabled` - Disabled state

## Theme Support

The component supports all Avakio themes:
- Default
- Material
- Flat
- Compact
- Dark
- Ocean
- Sunset
