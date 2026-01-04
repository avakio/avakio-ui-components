# AvakioCalendar

A flexible, calendar component for date selection with multiple modes, event markers, and comprehensive theming support.

## Features

- **Three Selection Modes**: Single date, multiple dates, or date range
- **Date Constraints**: Min/max dates and disabled dates
- **Event Markers**: Colored indicators with tooltips
- **Week Numbers**: Optional ISO week number display
- **Multi-Month Views**: Display 1-3 months side by side
- **Configurable Week Start**: Sunday or Monday
- **Theme Support**: Material, Flat, Compact, Dark, Ocean, Sunset
- **Responsive Design**: Mobile-friendly with adaptive layouts

## Installation

```tsx
import { AvakioCalendar } from './components/avakio/avakio-calendar/avakio-calendar';
import './components/avakio/avakio-calendar/avakio-calendar.css';
```

## Basic Usage

### Single Date Selection

```tsx
import { useState } from 'react';
import { AvakioCalendar } from './avakio-calendar';

function MyComponent() {
  const [selectedDate, setSelectedDate] = useState<string>('');

  return (
    <AvakioCalendar
      mode="single"
      value={selectedDate}
      onChange={(value) => setSelectedDate(value as string)}
    />
  );
}
```

### Multiple Date Selection

```tsx
const [selectedDates, setSelectedDates] = useState<string[]>([]);

<AvakioCalendar
  mode="multiple"
  value={selectedDates}
  onChange={(value) => setSelectedDates(value as string[])}
/>
```

### Date Range Selection

```tsx
const [dateRange, setDateRange] = useState<string[]>([]);

<AvakioCalendar
  mode="range"
  value={dateRange}
  onChange={(value) => setDateRange(value as string[])}
/>

// dateRange will be ['2025-01-01', '2025-01-15'] when both dates are selected
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string \| string[]` | `undefined` | Selected date(s) in ISO format (YYYY-MM-DD) |
| `onChange` | `(value: string \| string[]) => void` | `undefined` | Callback when selection changes |
| `mode` | `'single' \| 'multiple' \| 'range'` | `'single'` | Selection mode |
| `minDate` | `string` | `undefined` | Minimum selectable date (ISO format) |
| `maxDate` | `string` | `undefined` | Maximum selectable date (ISO format) |
| `disabledDates` | `string[]` | `[]` | Array of disabled dates (ISO format) |
| `markers` | `AvakioCalendarMarker[]` | `[]` | Event markers to display |
| `showWeekNumbers` | `boolean` | `false` | Show ISO week numbers |
| `monthsToShow` | `1 \| 2 \| 3` | `1` | Number of months to display |
| `weekStart` | `0 \| 1` | `0` | Week start day (0=Sunday, 1=Monday) |
| `className` | `string` | `''` | Additional CSS class |
| `onMonthChange` | `(date: Date) => void` | `undefined` | Callback when month changes |

## Advanced Examples

### With Date Constraints

```tsx
const today = new Date().toISOString().split('T')[0];
const nextMonth = new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0];

<AvakioCalendar
  mode="single"
  value={selectedDate}
  onChange={setSelectedDate}
  minDate={today}
  maxDate={nextMonth}
  disabledDates={['2025-01-15', '2025-01-20']}
/>
```

### With Event Markers

```tsx
import { AvakioCalendarMarker } from './avakio-calendar';

const markers: AvakioCalendarMarker[] = [
  { date: '2025-01-15', color: '#3b82f6', text: 'Team Meeting' },
  { date: '2025-01-20', color: '#10b981', text: 'Project Deadline' },
  { date: '2025-01-25', color: '#f59e0b', text: 'Code Review' },
];

<AvakioCalendar
  mode="single"
  value={selectedDate}
  onChange={setSelectedDate}
  markers={markers}
/>
```

### Multiple Months with Week Numbers

```tsx
<AvakioCalendar
  mode="range"
  value={dateRange}
  onChange={setDateRange}
  monthsToShow={2}
  showWeekNumbers={true}
  weekStart={1} // Monday
/>
```

### With Theme

```tsx
<div data-admin-theme="ocean">
  <AvakioCalendar
    mode="single"
    value={selectedDate}
    onChange={setSelectedDate}
  />
</div>
```

## Date Format

All date values use ISO 8601 format: `YYYY-MM-DD`

```tsx
// Examples
'2025-01-15'  // January 15, 2025
'2025-12-31'  // December 31, 2025
```

## Selection Modes

### Single Mode
- Click a date to select it
- Click the selected date to deselect
- `value` is a string: `'2025-01-15'`

### Multiple Mode
- Click dates to toggle selection
- Multiple dates can be selected
- `value` is an array: `['2025-01-15', '2025-01-20']`

### Range Mode
- Click start date, then end date
- All dates between are highlighted
- `value` is an array: `['2025-01-01', '2025-01-15']`
- Array is always sorted chronologically

## Event Markers

Markers display colored dots under dates with optional tooltips:

```tsx
interface AvakioCalendarMarker {
  date: string;        // ISO date
  color?: string;      // Hex color (default: #3b82f6)
  text?: string;       // Tooltip text
}
```

- Maximum 3 markers displayed per day
- Hover over markers to see tooltip text

## Week Numbers

Enable ISO week numbers with `showWeekNumbers={true}`:

```tsx
<AvakioCalendar
  showWeekNumbers={true}
  weekStart={1} // Monday for ISO compliance
/>
```

## Multi-Month Display

Show multiple months side by side:

```tsx
<AvakioCalendar
  monthsToShow={2}  // or 3
  mode="range"      // Great for range selection
/>
```

- Responsive: Collapses to single column on mobile (<768px)
- Shares navigation controls
- Ideal for date range picking

## Themes

Available themes via `data-admin-theme` attribute:

```tsx
// Material (default) - Rounded, elevated
<div data-admin-theme="material">
  <AvakioCalendar {...props} />
</div>

// Flat - Bordered, minimal
<div data-admin-theme="flat">
  <AvakioCalendar {...props} />
</div>

// Compact - Reduced spacing
<div data-admin-theme="compact">
  <AvakioCalendar {...props} />
</div>

// Dark - Dark backgrounds
<div data-admin-theme="dark">
  <AvakioCalendar {...props} />
</div>

// Ocean - Blue theme
<div data-admin-theme="ocean">
  <AvakioCalendar {...props} />
</div>

// Sunset - Orange theme
<div data-admin-theme="sunset">
  <AvakioCalendar {...props} />
</div>
```

## Callbacks

### onChange

Called when selection changes:

```tsx
onChange={(value) => {
  if (mode === 'single') {
    console.log('Selected date:', value); // string
  } else {
    console.log('Selected dates:', value); // string[]
  }
}}
```

### onMonthChange

Called when navigating between months:

```tsx
onMonthChange={(date) => {
  console.log('Current month:', date.getMonth() + 1);
  console.log('Current year:', date.getFullYear());
}}
```

## Accessibility

- Keyboard navigation with arrow keys (future enhancement)
- Semantic HTML structure
- ARIA labels for navigation buttons
- Focus management

## Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Examples

See [avakio-calendar-example.tsx](./avakio-calendar-example.tsx) for comprehensive examples including:
- All selection modes
- Disabled dates
- Event markers
- Week numbers
- Multiple months
- Theme switching

## Integration with Forms

```tsx
import { useForm } from 'react-hook-form';

function MyForm() {
  const { watch, setValue } = useForm();
  const eventDate = watch('eventDate');

  return (
    <form>
      <label>Event Date</label>
      <AvakioCalendar
        mode="single"
        value={eventDate}
        onChange={(date) => setValue('eventDate', date)}
      />
    </form>
  );
}
```

## Tips

1. **Use Range Mode for Date Ranges**: Better UX than two separate date pickers
2. **Combine with Week Numbers**: Shows ISO weeks for business scheduling
3. **Multiple Months for Longer Ranges**: Easier to select dates across months
4. **Markers for Events**: Show existing events/bookings to users
5. **Disable Past Dates**: Use `minDate={today}` for future-only selection
6. **Mobile Friendly**: Component automatically adapts to small screens

## Related Components

- **AvakioDatePicker**: Date + time picker with input field
- **AvakioScheduler**: Full event scheduling with month/week/day views

## License

Part of the Avakio component library for Resume-Scribe application.

