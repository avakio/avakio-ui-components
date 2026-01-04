# Avakio DatePicker Component

A beautiful and functional date and time picker with calendar view, built with React and TypeScript.

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

## Installation

The component is located at:
```
client/src/components/avakio/avakio-datepicker/
```

## Basic Usage

```tsx
import { AvakioDatePicker } from '@/components/avakio/ui-controls/avakio-datepicker/avakio-datepicker';
import { useState } from 'react';

function MyComponent() {
  const [date, setDate] = useState<string>('');

  return (
    <div>
      <label>Select Date & Time</label>
      <AvakioDatePicker
        value={date}
        onChange={setDate}
      />
      <p>Selected: {date}</p>
    </div>
  );
}
```

## Advanced Usage

### With Initial Value

```tsx
function MyComponent() {
  const [date, setDate] = useState<string>(new Date().toISOString());

  return (
    <AvakioDatePicker
      value={date}
      onChange={setDate}
    />
  );
}
```

### With Custom Styling

```tsx
<AvakioDatePicker
  value={date}
  onChange={setDate}
  className="my-custom-class"
/>
```

### In a Form

```tsx
function EventForm() {
  const [eventDate, setEventDate] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Event scheduled for:', new Date(eventDate));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Event Date & Time</label>
      <AvakioDatePicker
        value={eventDate}
        onChange={setEventDate}
      />
      <button type="submit">Schedule Event</button>
    </form>
  );
}
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `value` | `string` | No | `undefined` | ISO string of selected date/time |
| `onChange` | `(value: string) => void` | Yes | - | Callback when date/time changes |
| `className` | `string` | No | `undefined` | Additional CSS classes |

## Value Format

The component uses ISO 8601 format for date/time values:
```
2025-12-26T15:30:00.000Z
```

### Converting to/from Date Objects

```tsx
// From Date to ISO string
const isoString = new Date().toISOString();

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

## Calendar Features

### Month Navigation
- **Previous Month**: Click the left chevron
- **Next Month**: Click the right chevron
- Current month and year displayed in header

### Day Selection
- **Current Month Days**: Full opacity, clickable
- **Adjacent Month Days**: Reduced opacity (previous/next month dates)
- **Today**: Highlighted with primary color border
- **Selected Date**: Filled with primary color background

### Date States
```tsx
// No date selected
<AvakioDatePicker value="" onChange={setDate} />

// Today pre-selected
<AvakioDatePicker 
  value={new Date().toISOString()} 
  onChange={setDate} 
/>

// Specific date pre-selected
<AvakioDatePicker 
  value={new Date('2025-12-25T12:00:00').toISOString()} 
  onChange={setDate} 
/>
```

## Time Selection

### Hour Input
- Range: 0-23 (24-hour format)
- Auto-constrains values to valid range
- Pads single digits with zero (e.g., "09")

### Minute Input
- Range: 0-59
- Auto-constrains values to valid range
- Pads single digits with zero (e.g., "05")

### Time Display
Shows selected time in 12-hour format with AM/PM:
```
11:30 PM  (23:30 in 24-hour format)
```

### Time Actions

**Today Button**
- Sets date to current date
- Sets time to current time
- Useful for quick "now" selection

**Clear Button**
- Resets selection to empty
- Clears both date and time
- Enables fresh selection

## Theme Support

The component automatically adapts to the active admin theme:

### Material Theme
- Subtle box shadow for depth
- Rounded corners (8px)
- Standard spacing

### Flat Theme
- No border radius (square corners)
- Flat design aesthetic
- No shadows

### Compact Theme
- Reduced padding (12px)
- Smaller calendar size (320px max-width)
- Tighter spacing
- Smaller fonts (13px days, 14px time inputs)

### Dark Theme
- Dark navy background (#0a0e1a)
- Light text (#fafafa)
- Dark borders
- Proper contrast for readability

### Ocean Theme
- Blue accent color (#0094ff)
- Blue highlights for selected/today
- Cool color palette

### Sunset Theme
- Orange accent color (#ff5722)
- Warm color palette
- Orange highlights

### Applying Themes

Themes are controlled by the `data-admin-theme` attribute:

```tsx
<div data-admin-theme="ocean">
  <AvakioDatePicker value={date} onChange={setDate} />
</div>
```

## Styling

### Default Styles
The component comes with complete styling in `avakio-datepicker.css`.

### Custom Styling
You can override styles using CSS:

```css
/* Custom calendar size */
.avakio-datepicker-container {
  max-width: 400px;
}

/* Custom day styling */
.avakio-dp-day {
  font-weight: 600;
}

/* Custom selected color */
[data-admin-theme="custom"] .avakio-dp-day-selected {
  background: #your-color;
}
```

### CSS Classes

| Class | Purpose |
|-------|---------|
| `.avakio-datepicker-container` | Main container |
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

## Accessibility

- **Keyboard Navigation**: All interactive elements are keyboard accessible
- **Button Types**: Proper `button` types prevent form submission
- **Labels**: Clear visual labels for all inputs
- **Disabled States**: Time inputs disabled when no date selected
- **Focus Management**: Automatic focus on search input when opened

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Dependencies

- React 18+
- TypeScript 4.5+
- Lucide React (icons)
- Tailwind CSS / shadcn/ui (Button, Input components)

## Related Components

- **AvakioMultiCombo**: Multi-select dropdown component
- **AvakioDataTable**: High-performance data table

## Demo

View the live demo at:
```
http://localhost:5000/avakio-datepicker-demo
```

## License

Part of the Resume-Scribe project.

