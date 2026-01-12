# AvakioMultitext

A dynamic multi-field text input component. Allows users to add and remove text fields on the fly, ideal for collecting multiple values like emails, phone numbers, tags, or any repeated text entries.

## Features

- **Dynamic Fields**: Add and remove fields with + and × buttons
- **Primary Field**: First field cannot be removed, always present
- **Controlled/Uncontrolled**: Works with both patterns
- **Value Formats**: Accept/return comma-separated string or array
- **Validation**: Built-in required validation and custom validation support
- **Theming**: 6 themes (material, flat, compact, dark, ocean, sunset)
- **Label Options**: Left or top position, customizable width and alignment
- **Line Numbers**: Optional numbered fields
- **Sub-Configuration**: Different settings for primary vs additional fields
- **Imperative API**: Full programmatic control via ref methods
- **Accessibility**: ARIA attributes and keyboard support

## Installation

The component is part of the Avakio UI library. Import it from the ui-controls folder:

```tsx
import { AvakioMultitext } from '@/components/avakio/ui-controls/avakio-multitext';
```

## Basic Usage

```tsx
import { AvakioMultitext } from './avakio-multitext';

function MyForm() {
  const [emails, setEmails] = useState<string[]>(['']);

  return (
    <AvakioMultitext
      label="Email Addresses"
      labelWidth={120}
      placeholder="Enter email"
      value={emails}
      onChange={(values) => setEmails(values)}
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` | - | Unique identifier |
| `name` | `string` | - | Form field name |
| `value` | `string \| string[]` | - | Controlled value |
| `defaultValue` | `string \| string[]` | - | Default value (uncontrolled) |
| `label` | `string` | - | Label text (rendered via AvakioControlLabel) |
| `labelWidth` | `number` | `100` | Label width in pixels (rendered via AvakioControlLabel) |
| `labelAlign` | `'left' \| 'right'` | `'left'` | Label text alignment (rendered via AvakioControlLabel) |
| `labelPosition` | `'left' \| 'top'` | `'left'` | Label position (rendered via AvakioControlLabel) |
| `placeholder` | `string` | - | Input placeholder |
| `required` | `boolean` | `false` | Mark as required |
| `disabled` | `boolean` | `false` | Disable all inputs |
| `readonly` | `boolean` | `false` | Make fields readonly |
| `theme` | `string` | `'material'` | Theme variant |
| `maxFields` | `number` | - | Maximum number of fields |
| `separator` | `string` | `', '` | Separator for combined value |
| `showNumbers` | `boolean` | `false` | Show line numbers |
| `subConfig` | `object` | - | Config for additional fields |
| `error` | `string` | - | Error message to display |
| `invalidMessage` | `string` | - | Validation error message |
| `bottomLabel` | `string` | - | Help text below fields (rendered via AvakioControlLabel) |
| `maxLength` | `number` | - | Max characters per field |
| `inputAlign` | `'left' \| 'center' \| 'right'` | `'left'` | Input text alignment |
| `addButtonLabel` | `string` | - | Custom add button text |
| `addButtonTooltip` | `string` | `'Add field'` | Add button tooltip |
| `validate` | `function` | - | Custom validation function |
| `validateEvent` | `'change' \| 'blur'` | `'blur'` | When to validate |

## Events

| Event | Parameters | Description |
|-------|------------|-------------|
| `onChange` | `(values: string[], combined: string)` | Fired when any value changes |
| `onSectionAdd` | `(fieldId: string, index: number)` | Fired when a field is added |
| `onSectionRemove` | `(fieldId: string, value: string)` | Fired when a field is removed |
| `onFocus` | `(fieldId: string, event: FocusEvent)` | Fired when a field gains focus |
| `onBlur` | `(fieldId: string, event: FocusEvent)` | Fired when a field loses focus |
| `onEnter` | `(fieldId: string, value: string)` | Fired on Enter key press |

## Ref Methods

Access these methods via a ref:

```tsx
const multitextRef = useRef<AvakioMultitextRef>(null);

// Get combined value string
const combined = multitextRef.current?.getValue();

// Get values as array
const values = multitextRef.current?.getValues();

// Set values
multitextRef.current?.setValue(['value1', 'value2']);

// Add a new field
const newId = multitextRef.current?.addSection('initial value');

// Remove a field
multitextRef.current?.removeSection(fieldId);

// Get field count
const count = multitextRef.current?.getFieldCount();

// Clear additional fields (keep primary)
multitextRef.current?.clearAdditional();

// Clear everything
multitextRef.current?.clear();

// Focus management
multitextRef.current?.focus();
multitextRef.current?.focusField(fieldId);

// Validation
const isValid = multitextRef.current?.validate();
```

| Method | Return | Description |
|--------|--------|-------------|
| `getValue()` | `string` | Get combined comma-separated string |
| `getValues()` | `string[]` | Get array of all values |
| `setValue(value)` | `void` | Set value (string or array) |
| `getValueHere()` | `string` | Get primary field value only |
| `setValueHere(value)` | `void` | Set primary field value only |
| `addSection(value?)` | `string` | Add field, returns new field ID |
| `removeSection(fieldId?)` | `void` | Remove field (last if no ID) |
| `getFieldIds()` | `string[]` | Get all field IDs |
| `getField(fieldId)` | `object` | Get field object by ID |
| `getFieldCount()` | `number` | Get number of fields |
| `clearAdditional()` | `void` | Remove all except primary |
| `clear()` | `void` | Clear all values |
| `focus()` | `void` | Focus primary field |
| `focusField(fieldId)` | `void` | Focus specific field |
| `blur()` | `void` | Blur all fields |
| `refresh()` | `void` | Force re-render |
| `enable()` | `void` | Enable component |
| `disable()` | `void` | Disable component |
| `isEnabled()` | `boolean` | Check if enabled |
| `hide()` | `void` | Hide component |
| `show()` | `void` | Show component |
| `isVisible()` | `boolean` | Check if visible |
| `validate()` | `boolean` | Trigger validation |
| `getNode()` | `HTMLDivElement` | Get DOM element |

## Themes

The component supports 6 themes:

- `material` - Default theme with cyan accent (#1CA1C1)
- `flat` - Nordic-inspired flat design (#5E81AC)
- `compact` - Smaller, teal-accented (#00796B)
- `dark` - Dark mode with blue accent (#3b82f6)
- `ocean` - Light blue oceanic theme (#0277BD)
- `sunset` - Warm orange theme (#f57c00)

```tsx
<AvakioMultitext theme="dark" ... />
```

## Examples

### Email List

```tsx
<AvakioMultitext
  label="CC Recipients"
  placeholder="Enter email address"
  validate={(values) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const invalid = values.filter(v => v && !emailRegex.test(v));
    return invalid.length ? `Invalid: ${invalid.join(', ')}` : true;
  }}
/>
```

### Phone Numbers with Limit

```tsx
<AvakioMultitext
  label="Phone Numbers"
  placeholder="+1 (555) 000-0000"
  maxFields={5}
  showNumbers
/>
```

### Tags with Sub-Config

```tsx
<AvakioMultitext
  label="Tags"
  placeholder="Primary tag (no limit)"
  subConfig={{
    placeholder: "Additional tag (max 30 chars)",
    maxLength: 30
  }}
  defaultValue="React, TypeScript, CSS"
/>
```

### Readonly Display

```tsx
<AvakioMultitext
  label="Saved Emails"
  value={savedEmails}
  readonly
/>
```

## CSS Customization

The component uses CSS custom properties for theming:

```css
.avakio-multitext {
  --multitext-primary: #1CA1C1;
  --multitext-bg: #ffffff;
  --multitext-border: #d1d5db;
  --multitext-border-focus: #1CA1C1;
  --multitext-text: #1e293b;
  --multitext-placeholder: #94a3b8;
  --multitext-error: #dc2626;
  --multitext-radius: 6px;
}
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Related Components

- [AvakioText](../avakio-text) - Single text input
- [AvakioCombo](../avakio-combo) - Combo box with suggestions
- [AvakioTagInput](../avakio-tag-input) - Tag input with chips

