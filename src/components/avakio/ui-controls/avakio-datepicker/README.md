# Avakio DatePicker Component

A beautiful and functional date and time picker with calendar view, built with React and TypeScript. Extends `AvakioControlledProps` for full form control support.

## Features

- **📅 Calendar View**: Interactive month calendar with navigation
- **🕐 Time Selection**: Separate hour and minute inputs with 24-hour format
- **📱 Responsive Design**: Mobile-friendly with adaptive layouts
- **🎨 Theme Support**: Integrates with 6 admin themes (Material, Flat, Compact, Dark, Ocean, Sunset)
- **⌨️ Keyboard Accessible**: Full keyboard navigation support
- **🎯 Today Button**: Quick selection of current date/time
- **🧹 Clear Button**: Easy way to reset selection
- **📍 Date Highlighting**: Visual indicators for today and selected date
- **⏰ 12/24 Hour Display**: Shows time in both formats
- **🔄 Preserves Context**: Maintains time when changing date and vice versa
- **📋 Copy Support**: Optional copy button to clipboard
- **📆 Year Selector**: Quick navigation to different years
- **✅ Validation**: Built-in validation with custom validation functions

## Installation

The component is located at:
```
src/components/avakio/ui-controls/avakio-datepicker/
```

## Basic Usage

```tsx
import { AvakioDatePicker } from '@/components/avakio/ui-controls/avakio-datepicker/avakio-datepicker';
import { useState } from 'react';

function MyComponent() {
  const [date, setDate] = useState<string>('');

  return (
    <AvakioDatePicker
      id="my-datepicker"
      value={date}
      onChange={({ value }) => setDate(value)}
      label="Select Date"
    />
  );
}
```

## Props

### Component-Specific Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `showTime` | `boolean` | `false` | If true, returns full ISO datetime; if false, only returns date (YYYY-MM-DD) |
| `inline` | `boolean` | `false` | Use inline calendar instead of dropdown |
| `size` | `'default' \| 'compact'` | `'default'` | Size variant - 'compact' for filter/table use |
| `enableValueCopyButton` | `boolean` | `false` | Enable copy button to copy the value to clipboard |
| `showYearSelector` | `boolean` | `false` | Show year selector to quickly jump to a different year |
| `minYear` | `number` | `currentYear - 100` | Minimum year available in the year selector |
| `maxYear` | `number` | `currentYear + 50` | Maximum year available in the year selector |
| `labelForm` | `string` | `undefined` | Form label displayed above the component |

### Inherited from AvakioControlledProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | `undefined` | ISO string of selected date/time |
| `onChange` | `({ id, value, oldValue? }) => void` | `undefined` | Callback when date/time changes. Receives `{ id, value, oldValue }` object |
| `validate` | `(value: string) => boolean \| string` | `undefined` | Custom validation function |

### Inherited from AvakioBaseProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` | `undefined` | Component ID |
| `testId` | `string` | `undefined` | Test ID for testing purposes |
| `className` | `string` | `undefined` | Additional CSS class name |
| `style` | `React.CSSProperties` | `undefined` | Custom inline styles |
| `disabled` | `boolean` | `false` | Whether the component is disabled |
| `hidden` | `boolean` | `false` | Whether the component is hidden |
| `readonly` | `boolean` | `false` | Configures readonly mode for the input |
| `required` | `boolean` | `false` | Marks field as required |
| `clearable` | `boolean` | `false` | Whether the value can be cleared (displays X icon) |
| `borderless` | `boolean` | `false` | Used to hide the component borders |
| `invalid` | `boolean` | `false` | Specifies whether the control is valid/invalid after validation |
| `invalidMessage` | `string` | `undefined` | Sets the text of a validation message |
| `placeholder` | `string` | `''` | Placeholder text for the input |
| `tooltip` | `string` | `undefined` | Sets a popup message when cursor points to the component |
| `label` | `string` | `undefined` | Sets the text of the label |
| `labelAlign` | `'left' \| 'right' \| 'center'` | `'left'` | The alignment of a label inside its container |
| `labelPosition` | `'top' \| 'left' \| 'right'` | `'left'` | Positions a label in relation to the control |
| `labelWidth` | `number \| string` | `80` | The width of the label |
| `bottomLabel` | `string` | `undefined` | Sets a label under the control |
| `bottomPadding` | `number` | `0` | Sets the bottom offset of the control input |
| `align` | `'left' \| 'center' \| 'right'` | `'left'` | The alignment of the control within the parent container |
| `inputAlign` | `'left' \| 'right'` | `'left'` | The alignment of an input inside its container |
| `inputHeight` | `number \| string` | `undefined` | The height of the input area |
| `inputWidth` | `number \| string` | `undefined` | The width of the input area |
| `height` | `number \| string` | `undefined` | Sets the height of the component |
| `width` | `number \| string` | `undefined` | Sets the width of a component |
| `minHeight` | `number \| string` | `undefined` | Sets the minimal height for the view |
| `minWidth` | `number \| string` | `undefined` | Sets the minimal width for the view |
| `maxHeight` | `number \| string` | `undefined` | Sets the maximum height for the view |
| `maxWidth` | `number \| string` | `undefined` | Sets the maximum width for the view |
| `margin` | `number \| string \| [number, number, number, number]` | `undefined` | Sets the margin around the component |
| `padding` | `number \| string \| [number, number, number, number]` | `undefined` | Sets the padding inside the component |

## Events

All events are inherited from `AvakioBaseProps`:

| Event | Type | Description |
|-------|------|-------------|
| `onChange` | `({ id, value, oldValue? }) => void` | Fires when the value changes. Receives `{ id, value, oldValue }` object |
| `onBlur` | `(event: React.FocusEvent) => void` | Fires when focus is moved out of the view |
| `onFocus` | `(event: React.FocusEvent) => void` | Fires when a view gets focus |
| `onItemClick` | `(event: React.MouseEvent) => void` | Fires after the control has been clicked |
| `onKeyPress` | `(event: React.KeyboardEvent) => void` | Occurs when keyboard key is pressed for the control in focus |
| `onAfterRender` | `() => void` | Occurs immediately after the component has been rendered |
| `onBeforeRender` | `() => void` | Occurs immediately before the component has been rendered |
| `onViewShow` | `() => void` | Fires when any hidden view is shown |
| `onViewResize` | `(width: number, height: number) => void` | Fires when the size of a view has been changed by resizer |
| `onAfterScroll` | `(scrollTop: number, scrollLeft: number) => void` | Occurs when the view has been scrolled |

## Ref Methods (AvakioBaseRef)

Use a ref to access imperative methods:

```tsx
import { useRef } from 'react';
import { AvakioDatePicker } from './avakio-datepicker';
import type { AvakioBaseRef } from '../../base/avakio-base-props';

function MyComponent() {
  const datePickerRef = useRef<AvakioBaseRef<string>>(null);

  const handleValidate = () => {
    const result = datePickerRef.current?.validate();
    console.log('Validation result:', result);
  };

  return (
    <>
      <AvakioDatePicker ref={datePickerRef} required />
      <button onClick={handleValidate}>Validate</button>
    </>
  );
}
```

| Method | Return Type | Description |
|--------|-------------|-------------|
| `blur()` | `void` | Removes focus from the control |
| `focus()` | `void` | Sets focus to the control |
| `disable()` | `void` | Disables the component (makes it dimmed and unclickable) |
| `enable()` | `void` | Enables the component that was disabled |
| `hide()` | `void` | Hides the component |
| `show()` | `void` | Makes the component visible |
| `getValue()` | `string \| undefined` | Returns the current value of the control |
| `setValue(value: string)` | `void` | Sets a new value for the component |
| `getText()` | `string` | Gets actual text value from the control input |
| `validate()` | `boolean \| string` | Validates the value of the input. Returns true if valid, false or error message if invalid |
| `isEnabled()` | `boolean` | Checks whether the component is enabled |
| `isVisible()` | `boolean` | Checks whether the component is visible |
| `getElement()` | `HTMLElement \| null` | Returns the root DOM element of the component |
| `getParentView()` | `HTMLElement \| null` | Returns the parent view/element of the component |
| `define(config, value?)` | `void` | Redefines a single configuration property or multiple properties |

## Value Format

The component uses ISO 8601 format for date/time values:

### With `showTime={true}`:
```
2025-12-26T15:30:00.000
```

### With `showTime={false}` (default):
```
2025-12-26
```

### Converting to/from Date Objects

```tsx
// From Date to ISO string (local timezone)
const toLocalISOString = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// From ISO string to Date
const date = new Date(isoString);

// Formatting for display
const formatted = date.toLocaleString('en-US', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
});
// Output: "Thursday, December 26, 2025, 03:30 PM"
```

## Advanced Usage

### With Time Selection

```tsx
<AvakioDatePicker
  id="event-datetime"
  value={date}
  onChange={({ value }) => setDate(value)}
  showTime
  label="Event Date & Time"
/>
```

### Inline Calendar Mode

```tsx
<AvakioDatePicker
  id="inline-calendar"
  value={date}
  onChange={({ value }) => setDate(value)}
  inline
  showTime
/>
```

### Compact Mode (for filters/tables)

```tsx
<AvakioDatePicker
  id="compact-date"
  value={date}
  onChange={({ value }) => setDate(value)}
  size="compact"
  clearable
/>
```

### With Year Selector

```tsx
<AvakioDatePicker
  id="year-select-date"
  value={date}
  onChange={({ value }) => setDate(value)}
  showYearSelector
  minYear={1900}
  maxYear={2100}
/>
```

### With Validation

```tsx
<AvakioDatePicker
  id="validated-date"
  value={date}
  onChange={({ value }) => setDate(value)}
  required
  invalidMessage="Date is required"
  validate={(value) => {
    if (!value) return 'Please select a date';
    const d = new Date(value);
    if (d < new Date()) return 'Date must be in the future';
    return true;
  }}
/>
```

### With Label Configuration

```tsx
<AvakioDatePicker
  id="labeled-date"
  value={date}
  onChange={({ value }) => setDate(value)}
  label="Start Date"
  labelPosition="top"
  labelWidth={100}
  labelAlign="left"
/>
```

### With Form Label (above component)

```tsx
<AvakioDatePicker
  id="form-date"
  value={date}
  onChange={({ value }) => setDate(value)}
  labelForm="Appointment Date"
  placeholder="Select a date..."
/>
```

### With Copy Button

```tsx
<AvakioDatePicker
  id="copy-date"
  value={date}
  onChange={({ value }) => setDate(value)}
  enableValueCopyButton
/>
```

### Read-Only Mode

```tsx
<AvakioDatePicker
  id="readonly-date"
  value={date}
  onChange={({ value }) => setDate(value)}
  readonly
/>
```

## Theme Support

The component automatically adapts to the active admin theme:

### Applying Themes

Themes are controlled by the `data-admin-theme` attribute:

```tsx
<div data-admin-theme="ocean">
  <AvakioDatePicker value={date} onChange={setDate} />
</div>
```

### Available Themes
- `material` - Subtle box shadow, rounded corners
- `flat` - No border radius, flat design
- `compact` - Reduced padding, smaller size
- `dark` - Dark navy background, light text
- `ocean` - Blue accent color
- `sunset` - Orange accent color

## CSS Classes

| Class | Purpose |
|-------|---------|
| `.avakio-dp` | Main dropdown container |
| `.avakio-dp-inline` | Inline mode container |
| `.avakio-dp-compact` | Compact mode container |
| `.avakio-dp-borderless` | Borderless variant |
| `.avakio-dp-disabled` | Disabled state |
| `.avakio-dp-invalid` | Invalid validation state |
| `.avakio-dp-label-top` | Label positioned on top |
| `.avakio-dp-wrapper` | Inner wrapper |
| `.avakio-dp-label` | Label element |
| `.avakio-dp-required` | Required indicator (*) |
| `.avakio-dp-input-group` | Input with buttons group |
| `.avakio-dp-input` | Input field |
| `.avakio-dp-icon-btn` | Calendar icon button |
| `.avakio-dp-clear-btn` | Clear button |
| `.avakio-dp-copy-btn` | Copy button |
| `.avakio-dp-popover` | Calendar popover |
| `.avakio-dp-label-form` | Form label |
| `.avakio-dp-bottom-label` | Bottom label |
| `.avakio-dp-invalid-message` | Validation error message |
| `.avakio-datepicker-container` | Calendar container |
| `.avakio-dp-nav` | Navigation header |
| `.avakio-dp-nav-btn` | Prev/next month buttons |
| `.avakio-dp-nav-label` | Month/year label |
| `.avakio-dp-weekdays` | Weekday header row |
| `.avakio-dp-weekday` | Individual weekday label |
| `.avakio-dp-days` | Calendar grid |
| `.avakio-dp-day` | Day cell |
| `.avakio-dp-day-outside` | Adjacent month day |
| `.avakio-dp-day-today` | Today indicator |
| `.avakio-dp-day-selected` | Selected day |
| `.avakio-dp-time` | Time picker section |
| `.avakio-dp-time-input` | Hour/minute input |
| `.avakio-dp-actions` | Action buttons row |
| `.avakio-dp-year-selector` | Year/month selector panel |

## Accessibility

- **Keyboard Navigation**: All interactive elements are keyboard accessible
- **Arrow Keys**: Navigate hours/minutes with arrow up/down
- **Button Types**: Proper `button` types prevent form submission
- **Labels**: Clear visual labels for all inputs
- **Disabled States**: Time inputs disabled when no date selected
- **Required Indicator**: Visual asterisk for required fields

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Dependencies

- React 18+
- TypeScript 4.5+
- Lucide React (icons)
- shadcn/ui Popover component

## Related Components

- **AvakioDateRangePicker**: Date range selection component
- **AvakioCalendar**: Standalone calendar component
- **AvakioText**: Text input component
