# AvakioForm

A theme-aware form component with validation, layouts, and dirty checking.

## Features

- **6 Theme Variants**: material, flat, compact, dark, ocean, sunset
- **Layout Options**: rows, columns, sections, fieldsets
- **Validation**: Built-in rules + custom validation functions
- **Dirty Checking**: Track changed/unchanged values
- **Complex Data**: Support for nested data with dot notation
- **Ref Methods**: Programmatic control via ref
- **Type Variants**: form, clean, line, wide, space

## Installation

```tsx
import { AvakioForm, FormRules } from '@/components/avakio/ui-widgets/avakio-form';
```

## Basic Usage

```tsx
import { AvakioForm, FormRules } from '@/components/avakio/ui-widgets/avakio-form';
import { AvakioText } from '@/components/avakio/ui-controls/avakio-text';
import { AvakioButton } from '@/components/avakio/ui-controls/avakio-button';

function LoginForm() {
  const [values, setValues] = useState({ email: '', password: '' });

  return (
    <AvakioForm
      width={400}
      padding={20}
      margin={12}
      onChange={(name, value, allValues) => setValues(allValues)}
      onSubmit={(values) => console.log('Submit:', values)}
    >
      <AvakioText
        label="Email"
        value={values.email}
        onChange={(val) => setValues(prev => ({ ...prev, email: val }))}
      />
      <AvakioText
        label="Password"
        type="password"
        value={values.password}
        onChange={(val) => setValues(prev => ({ ...prev, password: val }))}
      />
      <AvakioButton value="Login" type="form" />
    </AvakioForm>
  );
}
```

## With Validation

```tsx
<AvakioForm
  width={400}
  rules={{
    email: [FormRules.isRequired, FormRules.isEmail],
    password: [FormRules.isRequired, FormRules.minLength(8)],
    confirmPassword: [
      FormRules.isRequired,
      (value, name, values) => {
        if (value !== values.password) {
          return 'Passwords do not match';
        }
        return true;
      },
    ],
  }}
  onValidation={(isValid, errors) => {
    if (!isValid) {
      console.log('Validation errors:', errors);
    }
  }}
  onSubmit={(values) => {
    console.log('Valid form submitted:', values);
  }}
>
  {/* Form fields */}
</AvakioForm>
```

## Layout Options

### Columns
```tsx
<AvakioForm>
  <div className="avakio-form__cols">
    <AvakioText label="First Name" />
    <AvakioText label="Last Name" />
  </div>
</AvakioForm>
```

### With Fieldset
```tsx
<AvakioForm>
  <AvakioFieldset label="Personal Info">
    <AvakioText label="Name" />
    <AvakioText label="Email" />
  </AvakioFieldset>
  <AvakioFieldset label="Address">
    <AvakioText label="Street" />
    <AvakioText label="City" />
  </AvakioFieldset>
</AvakioForm>
```

## Ref Methods

```tsx
const formRef = useRef<AvakioFormRef>(null);

// Get all values
const values = formRef.current?.getValues();

// Set values
formRef.current?.setValues({ email: 'test@example.com' });

// Validate
const isValid = formRef.current?.validate();

// Check if dirty
const hasChanges = formRef.current?.isDirty();

// Get changed values only
const dirtyValues = formRef.current?.getDirtyValues();

// Clear form
formRef.current?.clear();

// Enable/Disable
formRef.current?.disable();
formRef.current?.enable();
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Child form elements |
| `elements` | `FormElement[]` | - | Form elements config (alternative) |
| `values` | `FormValues` | `{}` | Initial form values |
| `defaultValues` | `FormValues` | - | Default values for dirty checking |
| `rules` | `FormValidationRules` | `{}` | Validation rules |
| `complexData` | `boolean` | `false` | Enable dot notation for nested data |
| `autoHeight` | `boolean` | `false` | Auto height based on content |
| `borderless` | `boolean` | `false` | Remove form border |
| `disabled` | `boolean` | `false` | Disable the form |
| `width` | `number \| string` | - | Form width |
| `height` | `number \| string` | - | Form height |
| `padding` | `number \| string` | - | Internal padding |
| `margin` | `number \| string` | - | Gap between elements |
| `scroll` | `boolean \| 'x' \| 'y' \| 'xy'` | - | Enable scrolling |
| `type` | `'clean' \| 'line' \| 'wide' \| 'space' \| 'form'` | `'form'` | Layout type |
| `theme` | `AvakioFormTheme` | - | Theme variant |
| `onChange` | `(name, value, values) => void` | - | Field change callback |
| `onValidation` | `(isValid, errors) => void` | - | Validation callback |
| `onSubmit` | `(values) => void` | - | Form submit callback |

## Validation Rules

| Rule | Description |
|------|-------------|
| `FormRules.isRequired` | Field must not be empty |
| `FormRules.isEmail` | Must be valid email format |
| `FormRules.isNumber` | Must be a valid number |
| `FormRules.isPositive` | Must be a positive number |
| `FormRules.isInteger` | Must be an integer |
| `FormRules.pattern(regex)` | Must match regex pattern |
| `FormRules.minLength(n)` | Minimum string length |
| `FormRules.maxLength(n)` | Maximum string length |
| `FormRules.minValue(n)` | Minimum numeric value |
| `FormRules.maxValue(n)` | Maximum numeric value |
| `FormRules.custom(fn)` | Custom validation function |

## Themes

- `material` - Default Material Design theme
- `flat` - Flat design theme
- `compact` - Compact theme with smaller spacing
- `dark` - Dark theme
- `ocean` - Ocean blue theme
- `sunset` - Warm sunset theme

## Related Components

- [AvakioFieldset](../avakio-fieldset) - Group form fields
- [AvakioText](../../ui-controls/avakio-text) - Text input
- [AvakioCheckbox](../../ui-controls/avakio-checkbox) - Checkbox
- [AvakioRichSelect](../../ui-controls/avakio-richselect) - Select dropdown

