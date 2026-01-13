# AvakioRichSelect

A non-editable select dropdown component  Perfect for dropdown selections without text input capability.

## Overview

AvakioRichSelect is a **non-editable combo-box** that provides a clean dropdown interface for selecting from a list of options. Unlike AvakioCombo which allows text input and filtering, RichSelect is purely for selection via dropdown.

## Features

- ✓ **Non-editable dropdown** - Select only, no text input
- ✓ **Simple or complex options** - String array or full object format
- ✓ **Custom templates** - Render options with custom React components
- ✓ **Keyboard navigation** - Arrow keys, Enter, and Escape support
- ✓ **Label support** - Optional label with alignment and width control
- ✓ **Clearable selection** - Optional clear button
- ✓ **yCount property** - Limit visible items in dropdown
- ✓ **Multiple states** - Disabled, readonly, error states
- ✓ **Full theme support** - Works with all 6 Avakio themes
- ✓ **Smooth animations** - Polished user experience
- ✓ **Accessible** - ARIA attributes and keyboard support

## Installation

```tsx
import { AvakioRichSelect } from '@/components/avakio/ui-controls/avakio-richselect/avakio-richselect';
import '@/components/avakio/ui-controls/avakio-richselect/avakio-richselect.css';
```

## Basic Usage

### Simple String Array

```tsx
const [value, setValue] = useState('');
const options = ['Option One', 'Option Two', 'Option Three'];

<AvakioRichSelect
  id="simple-select"
  value={value}
  options={options}
  onChange={({ value: v }) => setValue(v)}
  placeholder="Select an option..."
  label="Simple Select"
/>
```

### Object Options (Full Form)

```tsx
const [value, setValue] = useState(1);
const options = [
  { id: 1, value: 'One' },
  { id: 2, value: 'Two' },
  { id: 3, value: 'Three' },
];

<AvakioRichSelect
  id="rich-select"
  value={value}
  options={options}
  onChange={({ value: v, option }) => {
    setValue(v);
    console.log('Selected:', option);
  }}
  label="Rich Select"
/>
```

## Advanced Examples

### Custom Template with Icons

```tsx
const countryOptions = [
  { id: 'us', value: 'United States', flag: '🇺🇸' },
  { id: 'uk', value: 'United Kingdom', flag: '🇬🇧' },
  { id: 'ca', value: 'Canada', flag: '🇨🇦' },
];

<AvakioRichSelect
  id="country-select"
  value={selectedCountry}
  options={countryOptions}
  onChange={({ value }) => setSelectedCountry(value)}
  label="Country"
  template={(option) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <span style={{ fontSize: '20px' }}>{option.flag}</span>
      <span>{option.value}</span>
    </div>
  )}
/>
```

### Status Select with Color Indicators

```tsx
const statusOptions = [
  { id: 'active', value: 'Active', color: '#10b981' },
  { id: 'pending', value: 'Pending', color: '#f59e0b' },
  { id: 'inactive', value: 'Inactive', color: '#6b7280' },
];

<AvakioRichSelect
  id="status-select"
  value={status}
  options={statusOptions}
  onChange={({ value }) => setStatus(value)}
  label="Status"
  template={(option) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <span
        style={{
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          backgroundColor: option.color,
        }}
      />
      <span>{option.value}</span>
    </div>
  )}
/>
```

### Large Dataset with yCount

```tsx
const largeOptions = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  value: `Item ${i + 1}`,
}));

<AvakioRichSelect
  id="large-list-select"
  value={selectedItem}
  options={largeOptions}
  onChange={({ value }) => setSelectedItem(value)}
  label="Large List"
  yCount={5} // Show only 5 items at a time
/>
```

## Props API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string \| number` | - | Selected value (ID or value) |
| `options` | `Array` | `[]` | Options array (string[] or object[]) |
| `onChange` | `({ id, value, option? }) => void` | - | Callback when value changes. Receives `{ id, value, option }` object |
| `placeholder` | `string` | `'Select...'` | Placeholder text when no selection |
| `label` | `string` | - | Label text |
| `labelAlign` | `'left' \| 'right'` | `'left'` | Label alignment |
| `labelWidth` | `number` | `100` | Label width in pixels |
| `disabled` | `boolean` | `false` | Disable the component |
| `readonly` | `boolean` | `false` | Make component read-only |
| `template` | `(option) => ReactNode` | - | Custom option renderer |
| `width` | `number \| string` | - | Component width |
| `maxHeight` | `number \| string` | - | Dropdown max height (defaults to 300px) |
| `yCount` | `number` | - | Number of visible items in dropdown list |
| `required` | `boolean` | `false` | Show required indicator (*) |
| `error` | `string` | - | Error message to display |
| `clearable` | `boolean` | `false` | Show clear button |
| `className` | `string` | `''` | Additional CSS classes |
| `id` | `string` | - | HTML ID attribute |

## Option Format

### String Array (Short Form)
```tsx
['Option 1', 'Option 2', 'Option 3']
```

### Object Array (Full Form)
```tsx
[
  { id: 1, value: 'Option 1' },
  { id: 2, value: 'Option 2' },
  { id: 3, value: 'Option 3' },
]
```

The object format allows:
- `id`: Unique identifier (what gets passed to onChange)
- `value`: Display text
- Any additional custom properties for use in templates

## Getting Current Value

When using object options, `onChange` provides the ID, value, and the full option:

```tsx
onChange={({ id, value, option }) => {
  console.log('Component ID:', id);   // Returns the component's id prop
  console.log('Value:', value);       // Returns the selected ID (e.g., 1)
  console.log('Text:', option?.value); // Returns the text (e.g., 'Option 1')
  console.log('Full:', option);       // Returns the complete option object
}}
```

## Keyboard Navigation

- **Arrow Down** - Navigate to next option
- **Arrow Up** - Navigate to previous option
- **Enter** - Select highlighted option
- **Escape** - Close dropdown

## Themes

AvakioRichSelect supports all 6 Avakio themes:

1. **Material** (#1CA1C1) - Google Material Design inspired
2. **Flat** (#5E81AC) - Nordic inspired flat design
3. **Compact** (#00796B) - Compact, space-efficient design
4. **Dark** - Full dark mode with HSL colors
5. **Ocean** (#0277BD) - Deep blue ocean theme
6. **Sunset** (#f57c00) - Warm orange sunset theme

Set theme via data attribute:
```tsx
<div data-admin-theme="material">
  <AvakioRichSelect ... />
</div>
```

## Comparison with AvakioCombo

| Feature | AvakioRichSelect | AvakioCombo |
|---------|-----------------|-------------|
| Text Input | ❌ No | ✓ Yes |
| Filtering | ❌ No | ✓ Yes |
| Search | ❌ No | ✓ Yes |
| Pure Selection | ✓ Yes | - |
| Custom Templates | ✓ Yes | ✓ Yes |
| Keyboard Nav | ✓ Yes | ✓ Yes |

**Use AvakioRichSelect when:**
- You want a pure selection dropdown (no typing)
- Options are pre-defined and limited
- You don't need search/filter functionality

**Use AvakioCombo when:**
- You want users to type and filter options
- Large option lists that benefit from search
- Autocomplete functionality is needed

## Ref Methods

AvakioRichSelect exposes imperative methods via ref:

```tsx
const richSelectRef = useRef<AvakioRichSelectRef>(null);

// Use ref methods
richSelectRef.current?.focus();           // Focus the control
richSelectRef.current?.blur();            // Remove focus
richSelectRef.current?.getValue();        // Get current value (ID)
richSelectRef.current?.getText();         // Get display text
richSelectRef.current?.setValue('us');    // Set value by ID
richSelectRef.current?.enable();          // Enable component
richSelectRef.current?.disable();         // Disable component
richSelectRef.current?.show();            // Show component
richSelectRef.current?.hide();            // Hide component
richSelectRef.current?.isEnabled();       // Check if enabled
richSelectRef.current?.isVisible();       // Check if visible
richSelectRef.current?.getElement();      // Get root DOM element
richSelectRef.current?.getParentView();   // Get parent Avakio container ID or classname
richSelectRef.current?.validate();        // Run validation
```

### getParentView()

Returns the ID of the nearest parent Avakio container (AvakioView, AvakioTemplate, AvakioMultiView, AvakioLayout, AvakioGrid, or AvakioAbsoluteLayout). If the container has no ID, returns its classname instead.

```tsx
const parentId = richSelectRef.current?.getParentView();
// Returns: 'my-layout-id' or 'avakio-layout' if no ID is set
```

## Best Practices

1. **Use object options** for better control with IDs
2. **Keep option lists reasonable** - Use yCount for large lists
3. **Provide clear labels** - Help users understand the selection
4. **Use templates** for rich option displays (icons, colors, etc.)
5. **Enable clearable** when selection is optional
6. **Set yCount** for lists with more than 10 items

## Examples

See `avakio-richselect-example.tsx` for comprehensive examples including:
- Basic usage with strings and objects
- Custom templates with flags and icons
- Status selectors with color indicators
- Large datasets with yCount
- All component states (disabled, readonly, error)
- Theme demonstrations

## License

Part of the Avakio Component Library

