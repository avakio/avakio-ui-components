# AvakioRadio

A flexible radio button group component. Supports horizontal and vertical layouts, icons, disabled/hidden states, and full keyboard navigation.

## Features

- **Horizontal & Vertical Layout**: Arrange options horizontally (default) or vertically
- **Icons Support**: Add icons to individual options
- **Disabled & Hidden States**: Per-option or group-level disabled/hidden states
- **Keyboard Navigation**: Full arrow key navigation between options
- **Multiple Sizes**: Small, medium, and large variants
- **Theme Support**: Works with all Avakio themes (material, dark, ocean, sunset, flat, compact)
- **Imperative API**: Programmatic control via ref
- **Form Integration**: Works with standard form patterns

## Installation

The component is part of the Avakio UI library. Import it from the ui-controls folder:

```tsx
import { AvakioRadio } from '@/components/avakio/ui-controls/avakio-radio/avakio-radio';
```

## Basic Usage

```tsx
import { AvakioRadio } from '@/components/avakio/ui-controls/avakio-radio/avakio-radio';

function MyComponent() {
  const [value, setValue] = useState('master');

  return (
    <AvakioRadio
      value={value}
      options={[
        { id: 'master', value: 'Master' },
        { id: 'develop', value: 'Develop' },
        { id: 'feature', value: 'Feature' },
      ]}
      onChange={(val) => setValue(val)}
      label="Branch"
      labelWidth={80}
    />
  );
}
```

### Simple String Options

```tsx
<AvakioRadio
  options={['Option A', 'Option B', 'Option C']}
  defaultValue="Option A"
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` | - | Unique identifier |
| `testId` | `string` | - | Test ID for testing purposes |
| `name` | `string` | auto | Name for form submission |
| `value` | `string \| number \| null` | - | Current selected value (controlled) |
| `defaultValue` | `string \| number \| null` | `null` | Default selected value (uncontrolled) |
| `options` | `AvakioRadioOption[] \| string[]` | **required** | Array of radio options |
| `label` | `string` | - | Label text (rendered via AvakioControlLabel) |
| `labelWidth` | `number` | `80` | Width of the label in pixels (rendered via AvakioControlLabel) |
| `labelAlign` | `'left' \| 'right'` | `'left'` | Label alignment (rendered via AvakioControlLabel) |
| `labelPosition` | `'left' \| 'top'` | `'left'` | Label position relative to options (rendered via AvakioControlLabel) |
| `vertical` | `boolean` | `false` | Stack options vertically |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Radio button size |
| `theme` | `string` | - | Theme variant |
| `disabled` | `boolean` | `false` | Disable all options |
| `required` | `boolean` | `false` | Mark as required field |
| `invalid` | `boolean` | `false` | Invalid state |
| `invalidMessage` | `string` | - | Error message to display |
| `bottomLabel` | `string` | - | Helper text below the options (rendered via AvakioControlLabel) |
| `customRadio` | `boolean` | `true` | Use custom styled radio (vs native) |
| `optionHeight` | `number` | - | Fixed height for each option |
| `className` | `string` | - | Additional CSS class |
| `css` | `React.CSSProperties` | - | Inline styles |
| `width` | `number \| string` | - | Component width |
| `height` | `number \| string` | - | Component height |
| `onChange` | `(value: string \| number) => void` | - | Called when selection changes |
| `onClick` | `(e, option) => void` | - | Called when an option is clicked |
| `onFocus` | `(e) => void` | - | Called when focused |
| `onBlur` | `(e) => void` | - | Called when blurred |

## Option Interface

```typescript
interface AvakioRadioOption {
  id: string | number;      // Unique identifier
  value: string;            // Display label
  icon?: React.ReactNode;   // Optional icon
  disabled?: boolean;       // Disable this option
  hidden?: boolean;         // Hide this option
  css?: string;             // Custom CSS class
  tooltip?: string;         // Tooltip text
}
```

## Layouts

### Horizontal (Default)

```tsx
<AvakioRadio
  options={options}
  label="Choose"
/>
```

### Vertical

```tsx
<AvakioRadio
  options={options}
  label="Choose"
  vertical
/>
```

### Label on Top

```tsx
<AvakioRadio
  options={options}
  label="Choose"
  labelPosition="top"
  vertical
/>
```

## With Icons

```tsx
<AvakioRadio
  options={[
    { id: 'home', value: 'Home', icon: <Home size={16} /> },
    { id: 'settings', value: 'Settings', icon: <Settings size={16} /> },
  ]}
  label="Navigate"
/>
```

## Disabled & Hidden Options

```tsx
<AvakioRadio
  options={[
    { id: 'active', value: 'Active' },
    { id: 'disabled', value: 'Disabled', disabled: true },
    { id: 'hidden', value: 'Hidden', hidden: true },
  ]}
/>
```

## Sizes

```tsx
<AvakioRadio options={options} size="sm" />
<AvakioRadio options={options} size="md" />
<AvakioRadio options={options} size="lg" />
```

## Validation

```tsx
<AvakioRadio
  options={options}
  required
  invalid={!value}
  invalidMessage="Please select an option"
/>
```

## Imperative API

Use the ref to programmatically control the component:

```tsx
const radioRef = useRef<AvakioRadioRef>(null);

// Get current value
const currentValue = radioRef.current?.getValue();

// Set value
radioRef.current?.setValue('option2');

// Enable/disable specific options
radioRef.current?.disableOption('option1');
radioRef.current?.enableOption('option1');

// Show/hide specific options
radioRef.current?.hideOption('option3');
radioRef.current?.showOption('option3');

// Focus the control
radioRef.current?.focus();

// Get option config
const option = radioRef.current?.getOption('option1');
```

### Ref Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `getValue()` | `string \| number \| null` | Get current selected value |
| `setValue(value)` | `void` | Set the selected value |
| `focus()` | `void` | Focus the first enabled option |
| `blur()` | `void` | Remove focus |
| `enable()` | `void` | Enable the entire group |
| `disable()` | `void` | Disable the entire group |
| `enableOption(id)` | `void` | Enable a specific option |
| `disableOption(id)` | `void` | Disable a specific option |
| `showOption(id)` | `void` | Show a hidden option |
| `hideOption(id)` | `void` | Hide an option |
| `isEnabled()` | `boolean` | Check if group is enabled |
| `getNode()` | `HTMLDivElement \| null` | Get container element |
| `getOption(id)` | `AvakioRadioOption \| undefined` | Get option by ID |
| `refresh()` | `void` | Force re-render |

## Keyboard Navigation

- **Arrow Right/Down**: Move to next option
- **Arrow Left/Up**: Move to previous option
- **Space/Enter**: Select focused option (native behavior)
- **Tab**: Move focus to/from the radio group

## Theming

The component supports all Avakio themes:

```tsx
<AvakioRadio theme="material" options={options} />
<AvakioRadio theme="dark" options={options} />
<AvakioRadio theme="ocean" options={options} />
<AvakioRadio theme="sunset" options={options} />
<AvakioRadio theme="flat" options={options} />
<AvakioRadio theme="compact" options={options} />
```

Or inherit from parent via `data-admin-theme` attribute.

## CSS Customization

Override CSS variables for custom styling:

```css
.avakio-radio-container {
  --avakio-radio-border: #9ca3af;
  --avakio-radio-border-hover: #6b7280;
  --avakio-radio-bg: #ffffff;
  --avakio-radio-checked: #3b82f6;
}
```

## Accessibility

- Uses proper `role="radiogroup"` and `role="radio"` attributes
- Supports `aria-checked`, `aria-disabled`, `aria-required`, `aria-invalid`
- Full keyboard navigation
- Focus indicators for keyboard users
- Associates label with group via `aria-labelledby`

## Related Components

- [AvakioCheckbox](../avakio-checkbox/README.md) - For multiple selections
- [AvakioSwitchButton](../avakio-switch-button/README.md) - For on/off toggles
- [AvakioSegmentedButton](../avakio-segmented-button/README.md) - For button-style selection

