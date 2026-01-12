# AvakioCombo

A powerful, flexible combo box component for React with editable input, dropdown selection, and advanced filtering capabilities. 

## Live Example

View the live example page at: **http://localhost:5000/avakio-combo-example**

The example page demonstrates all features, states, and theme variations.

## Features

✓ **Editable Input** - Type to filter options or enter custom text  
✓ **Dropdown Selection** - Click to select from a list of options  
✓ **Keyboard Navigation** - Full keyboard support (Arrow keys, Enter, Escape, Tab)  
✓ **Flexible Options** - Support for both simple strings and complex objects  
✓ **Custom Templates** - Render custom option content  
✓ **Filter Modes** - Built-in filtering strategies (startsWith, contains, custom)  
✓ **Clear Button** - Quick way to reset selection  
✓ **Theme Support** - Six built-in themes (Material, Flat, Compact, Dark, Ocean, Sunset)  
✓ **Component States** - Disabled, readonly, required, error states  
✓ **Labels** - Optional labels with customizable alignment and width  
✓ **Accessible** - ARIA-compliant with proper focus management

## Installation

```tsx
import { AvakioCombo } from "@/components/avakio/ui-controls/avakio-combo/avakio-combo";
import type { AvakioComboOption } from "@/components/avakio/ui-controls/avakio-combo/avakio-combo";
```

## Basic Usage

### Simple String Options

```tsx
const cities = ["New York", "London", "Paris", "Tokyo"];

<AvakioCombo
  label="City"
  placeholder="Select or type a city..."
  options={cities}
  value={selectedCity}
  onChange={(value) => setSelectedCity(value)}
/>
```

### Object Options (Full Form)

```tsx
const countries: AvakioComboOption[] = [
  { id: 1, value: "United States" },
  { id: 2, value: "United Kingdom" },
  { id: 3, value: "Canada" },
];

<AvakioCombo
  label="Country"
  placeholder="Select or type a country..."
  options={countries}
  value={selectedCountry}
  onChange={(value, option) => {
    setSelectedCountry(value);
    console.log("Selected:", option);
  }}
/>
```

### Custom Template

```tsx
const users: AvakioComboOption[] = [
  { id: "u1", value: "John Doe", email: "john@example.com", role: "Admin" },
  { id: "u2", value: "Jane Smith", email: "jane@example.com", role: "User" },
];

<AvakioCombo
  label="User"
  placeholder="Select a user..."
  options={users}
  value={selectedUser}
  onChange={(value) => setSelectedUser(value)}
  template={(option) => (
    <div className="flex flex-col">
      <span className="font-medium">{option.value}</span>
      <span className="text-xs text-muted-foreground">
        {option.email} - {option.role}
      </span>
    </div>
  )}
/>
```

## Props API

### AvakioComboProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` | `undefined` | HTML id attribute |
| `value` | `string \| number` | `undefined` | Selected option id/value (controlled) |
| `options` | `AvakioComboOption[] \| string[]` | `[]` | Options as strings or rich objects |
| `onChange` | `(value: string \| number, option?: AvakioComboOption) => void` | `undefined` | Fired when selection changes |
| `onInputChange` | `(inputValue: string) => void` | `undefined` | Fired on input text change |
| `placeholder` | `string` | `"Select or type..."` | Input placeholder text |
| `label` | `string` | `undefined` | Optional label text (rendered via AvakioControlLabel) |
| `labelAlign` | `'left' \| 'right'` | `'left'` | Label alignment (rendered via AvakioControlLabel) |
| `labelWidth` | `number` | `100` | Label width in pixels (rendered via AvakioControlLabel) |
| `disabled` | `boolean` | `false` | Disable all interactions |
| `readonly` | `boolean` | `false` | Prevent edits/opening while showing value |
| `filterMode` | `'startsWith' \| 'contains' \| 'custom'` | `'contains'` | Filtering strategy |
| `customFilter` | `(option: AvakioComboOption, inputValue: string) => boolean` | `undefined` | Custom filter when `filterMode="custom"` |
| `template` | `(option: AvakioComboOption) => React.ReactNode` | `undefined` | Custom option renderer |
| `width` | `number \| string` | `'100%'` | Component width |
| `maxHeight` | `number` | `300` | Max dropdown height (px) |
| `required` | `boolean` | `false` | Mark as required field |
| `error` | `string` | `undefined` | Error message to display |
| `className` | `string` | `''` | Additional CSS classes |

### AvakioComboOption

```tsx
interface AvakioComboOption {
  id: string | number;
  value: string;
  [key: string]: any;  // Additional custom properties
}
```

## Filter Modes

### Contains (Default)

Matches options that contain the input text anywhere in the value.

```tsx
<AvakioCombo
  options={countries}
  filterMode="contains"
/>
```

### Starts With

Matches options that start with the input text.

```tsx
<AvakioCombo
  options={countries}
  filterMode="startsWith"
/>
```

### Custom Filter

Provide your own filtering logic.

```tsx
<AvakioCombo
  options={users}
  filterMode="custom"
  customFilter={(option, inputValue) => {
    const search = inputValue.toLowerCase();
    return (
      option.value.toLowerCase().includes(search) ||
      option.email.toLowerCase().includes(search)
    );
  }}
/>
```

## Keyboard Navigation

- **Arrow Down** - Open dropdown or move to next option
- **Arrow Up** - Move to previous option
- **Enter** - Select highlighted option
- **Escape** - Close dropdown
- **Tab** - Close dropdown and move to next field

## Component States

### Disabled

```tsx
<AvakioCombo
  options={options}
  value={value}
  disabled={true}
/>
```

### Readonly

```tsx
<AvakioCombo
  options={options}
  value={value}
  readonly={true}
/>
```

### Required

```tsx
<AvakioCombo
  options={options}
  required={true}
/>
```

### Error State

```tsx
<AvakioCombo
  options={options}
  error="Please select a valid option"
/>
```

## Theme Support

The component supports six built-in themes:

- **Material** - Cyan accent color (#1CA1C1)
- **Flat** - Blue-gray accent color (#5E81AC)
- **Compact** - Teal accent with smaller padding (#00796B)
- **Dark** - Dark background with light text
- **Ocean** - Deep blue accent (#0277BD)
- **Sunset** - Orange accent (#f57c00)

Set the theme using the `data-admin-theme` attribute:

```tsx
document.documentElement.setAttribute("data-admin-theme", "material");
```

## Label Configuration

### Left Aligned (Default)

```tsx
<AvakioCombo
  label="Country"
  labelAlign="left"
  labelWidth={100}
  options={countries}
/>
```

### Right Aligned

```tsx
<AvakioCombo
  label="Country"
  labelAlign="right"
  labelWidth={120}
  options={countries}
/>
```

## Advanced Examples

### Controlled Component with Validation

```tsx
const [value, setValue] = useState("");
const [error, setError] = useState("");

const handleChange = (newValue: string | number) => {
  setValue(newValue);
  if (!newValue) {
    setError("This field is required");
  } else {
    setError("");
  }
};

<AvakioCombo
  options={options}
  value={value}
  onChange={handleChange}
  required={true}
  error={error}
/>
```

### Dynamic Options Loading

```tsx
const [options, setOptions] = useState<AvakioComboOption[]>([]);
const [loading, setLoading] = useState(false);

const handleInputChange = async (inputValue: string) => {
  if (inputValue.length >= 3) {
    setLoading(true);
    const results = await fetchOptions(inputValue);
    setOptions(results);
    setLoading(false);
  }
};

<AvakioCombo
  options={options}
  onInputChange={handleInputChange}
  placeholder="Type at least 3 characters..."
/>
```

## Comparison with Similar Components

### vs. AvakioMultiCombo

- **AvakioCombo**: Single selection, editable input
- **AvakioMultiCombo**: Multiple selections, checkbox list

### vs. Native Select

- **AvakioCombo**: Editable, searchable, custom templates
- **Native Select**: Basic dropdown, no filtering

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Accessibility

- Proper ARIA roles and attributes
- Keyboard navigation support
- Focus management
- Screen reader compatible
- High contrast mode support

## Tips & Best Practices

1. **Use Object Options for Complex Data** - When you need to store additional data with each option, use the object format instead of simple strings.

2. **Implement Custom Filters for Better UX** - For options with multiple searchable fields (e.g., name, email), implement a custom filter.

3. **Set Appropriate maxHeight** - For long option lists, adjust `maxHeight` to prevent the dropdown from becoming too tall.

4. **Provide Clear Placeholders** - Help users understand what to enter or select with descriptive placeholders.

5. **Use Templates for Rich Content** - Display additional information (icons, descriptions, badges) using custom templates.

6. **Handle Empty States** - The component shows "No options found" when no options match the filter.

## Examples

See the complete example implementation in `avakio-combo-example.tsx` for:
- Basic usage with strings and objects
- Custom templates
- Filter modes
- Component states
- Theme switching

## License

Part of the Resume-Scribe project.

