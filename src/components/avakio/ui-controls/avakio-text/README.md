# AvakioText Component

A React text input component with label, validation, icons, and theme support.

## Features

- **Multiple Input Types**: text, password, email, url, number, tel, search
- **Label Support**: Configurable position (left/top) and alignment
- **Validation**: Built-in HTML5 validation + custom validation rules
- **Icons**: Left or right positioned icons
- **Clear Button**: Optional clear button for easy value removal
- **Copy Button**: Optional copy button to copy input value to clipboard
- **Placeholder Copy Button**: Optional copy button to copy placeholder text to clipboard
- **Password Toggle**: Eye icon to show/hide password
- **Themes**: 6 built-in themes (material, flat, compact, dark, ocean, sunset)
- **Bottom Label**: Additional help text below input
- **Readonly & Disabled States**: Full support for all states
- **Keyboard Support**: Enter key handler and key press events
- **Ref Methods**: Programmatic control via ref

## Installation

```tsx
import { AvakioText } from '@/components/avakio/ui-controls/avakio-text';
import '@/components/avakio/ui-controls/avakio-text/avakio-text.css';
```

## Basic Usage

```tsx
import { AvakioText } from '@/components/avakio/ui-controls/avakio-text';

function MyForm() {
  const [name, setName] = useState('');

  return (
    <AvakioText
      label="Name"
      placeholder="Enter your name"
      value={name}
      onChange={(value) => setName(value)}
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | `''` | The value of the text input |
| `label` | `string` | - | The label text |
| `placeholder` | `string` | - | The placeholder text |
| `name` | `string` | - | The name attribute |
| `type` | `'text' \| 'password' \| 'email' \| 'url' \| 'number' \| 'tel' \| 'search'` | `'text'` | The type of input |
| `disabled` | `boolean` | `false` | Whether the input is disabled |
| `readonly` | `boolean` | `false` | Whether the input is readonly |
| `required` | `boolean` | `false` | Whether the input is required |
| `theme` | `string` | `'material'` | Theme name |
| `className` | `string` | `''` | Custom CSS class |
| `width` | `string \| number` | - | Width of the component |
| `height` | `string \| number` | - | Height of the component |
| `labelWidth` | `number` | `100` | Label width in pixels |
| `labelPosition` | `'left' \| 'top'` | `'left'` | Label position |
| `labelAlign` | `'left' \| 'right'` | `'left'` | Label alignment |
| `inputAlign` | `'left' \| 'center' \| 'right'` | `'left'` | Input text alignment |
| `bottomLabel` | `string` | - | Bottom label text (rendered via AvakioControlLabel) |
| `clear` | `boolean` | `false` | Shows clear button when input has value |
| `enableValueCopyButton` | `boolean` | `false` | Enables copy button to copy the input value to clipboard |
| `enablePlaceHolderCopyButton` | `boolean` | `false` | Enables copy button to copy the placeholder text to clipboard |
| `icon` | `React.ReactNode` | - | Icon to show in the input |
| `iconPosition` | `'left' \| 'right'` | `'left'` | Icon position |
| `validate` | `(value: string) => boolean \| string` | - | Validation function |
| `validateEvent` | `'change' \| 'blur' \| 'submit'` | `'blur'` | When to validate |
| `invalid` | `boolean` | `false` | Invalid state |
| `invalidMessage` | `string` | - | Invalid message |
| `maxLength` | `number` | - | Maximum length |
| `pattern` | `string` | - | Pattern for HTML5 validation |
| `min` | `number` | - | Minimum value (for number type) |
| `max` | `number` | - | Maximum value (for number type) |
| `step` | `number` | - | Step value (for number type) |
| `autoComplete` | `string` | - | Autocomplete attribute |
| `multiline` | `boolean` | `false` | Enable multiline mode (renders textarea instead of input) |
| `rows` | `number` | `4` | Number of visible rows (only for multiline) |
| `padding` | `string \| number \| [number, number, number, number]` | - | Padding (number for all sides, string for CSS, or [top, right, bottom, left]) |
| `margin` | `string \| number \| [number, number, number, number]` | - | Margin (number for all sides, string for CSS, or [top, right, bottom, left]) |
| `onChange` | `(value: string, event: ChangeEvent<HTMLInputElement \| HTMLTextAreaElement>) => void` | - | Change callback |
| `onBlur` | `(event: FocusEvent<HTMLInputElement \| HTMLTextAreaElement>) => void` | - | Blur callback |
| `onFocus` | `(event: FocusEvent<HTMLInputElement \| HTMLTextAreaElement>) => void` | - | Focus callback |
| `onEnter` | `(value: string) => void` | - | Enter key callback (not triggered in multiline mode) |
| `onKeyPress` | `(event: KeyboardEvent<HTMLInputElement \| HTMLTextAreaElement>) => void` | - | Key press callback |
| `onClick` | `() => void` | - | Click callback |

## Ref Methods

```tsx
const textRef = useRef<AvakioTextRef>(null);

// Get current value
const value = textRef.current?.getValue();

// Set value
textRef.current?.setValue('New value');

// Focus input
textRef.current?.focus();

// Blur input
textRef.current?.blur();

// Validate
const isValid = textRef.current?.validate();

// Get input element
const inputElement = textRef.current?.getInputNode();

// Clear input
textRef.current?.clear();

// Check if enabled
const enabled = textRef.current?.isEnabled();

// Disable/Enable
textRef.current?.disable();
textRef.current?.enable();
```

## Examples

### With Icon

```tsx
<AvakioText
  label="Email"
  placeholder="Enter email"
  type="email"
  icon={<Mail size={16} />}
  iconPosition="left"
/>
```

### With Clear Button

```tsx
<AvakioText
  label="Search"
  placeholder="Type to search..."
  clear={true}
  value={searchTerm}
  onChange={(value) => setSearchTerm(value)}
/>
```

### With Copy Button

```tsx
<AvakioText
  label="API Key"
  placeholder="Your API key"
  enableValueCopyButton={true}
  value={apiKey}
  readonly={true}
/>
```

### With Placeholder Copy Button

```tsx
<AvakioText
  label="Template"
  placeholder="Copy this template text"
  enablePlaceHolderCopyButton={true}
/>
```

### Password Input

```tsx
<AvakioText
  label="Password"
  type="password"
  placeholder="Enter password"
  required
/>
```

### Multiline Input (Textarea)

```tsx
<AvakioText
  label="Description"
  placeholder="Enter description..."
  multiline={true}
  rows={6}
  value={description}
  onChange={(value) => setDescription(value)}
/>
```

### With Validation

```tsx
<AvakioText
  label="Username"
  placeholder="Enter username"
  validate={(value) => {
    if (value.length < 3) return 'Username must be at least 3 characters';
    if (!/^[a-zA-Z0-9_]+$/.test(value)) return 'Username can only contain letters, numbers, and underscores';
    return true;
  }}
  validateEvent="change"
/>
```

### Number Input

```tsx
<AvakioText
  label="Age"
  type="number"
  min={18}
  max={100}
  step={1}
  placeholder="Enter age"
/>
```

### Top Label

```tsx
<AvakioText
  label="Full Name"
  labelPosition="top"
  placeholder="Enter your full name"
  bottomLabel="Enter your first and last name"
/>
```

### Different Themes

```tsx
<AvakioText label="Material" theme="material" value="Material theme" />
<AvakioText label="Flat" theme="flat" value="Flat theme" />
<AvakioText label="Compact" theme="compact" value="Compact theme" />
<AvakioText label="Dark" theme="dark" value="Dark theme" />
<AvakioText label="Ocean" theme="ocean" value="Ocean theme" />
<AvakioText label="Sunset" theme="sunset" value="Sunset theme" />
```

### With Padding and Margin

Supports three formats: number (all sides), CSS string, or array [top, right, bottom, left]:

```tsx
{/* All sides */}
<AvakioText label="Name" padding={20} margin={10} />

{/* CSS string */}
<AvakioText label="Email" padding="10px 20px" margin="5px 10px" />

{/* Array [top, right, bottom, left] */}
<AvakioText label="Phone" padding={[10, 20, 10, 20]} margin={[5, 0, 15, 0]} />
```

## Events

### onChange
Fired when the value changes:
```tsx
<AvakioText onChange={(value, event) => console.log(value)} />
```

### onEnter
Fired when Enter key is pressed:
```tsx
<AvakioText onEnter={(value) => handleSubmit(value)} />
```

### onBlur / onFocus
Fired when input loses/gains focus:
```tsx
<AvakioText
  onFocus={(e) => console.log('Focused')}
  onBlur={(e) => console.log('Blurred')}
/>
```

## Validation

The component supports both built-in HTML5 validation and custom validation:

### HTML5 Validation
- `required`: Field must have a value
- `type="email"`: Must be a valid email
- `type="url"`: Must be a valid URL
- `min/max`: For number inputs
- `maxLength`: Maximum character length
- `pattern`: Regex pattern

### Custom Validation
Use the `validate` prop with a function that returns:
- `true`: Valid
- `false`: Invalid (uses `invalidMessage` prop)
- `string`: Invalid with custom message

```tsx
<AvakioText
  validate={(value) => {
    if (value.includes(' ')) return 'No spaces allowed';
    return true;
  }}
/>
```

## Styling

The component uses CSS classes with theme support. Override styles by targeting:
- `.avakio-text`: Container
- `.avakio-text-label`: Label
- `.avakio-text-input`: Input field
- `.avakio-text-theme-{themeName}`: Theme-specific styles

## License

MIT

