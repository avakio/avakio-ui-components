# Avakio DateRangePicker

A range selector that opens a dropdown containing two AvakioDatePicker instances (From/To) plus quick presets. Supports time selection via `showTime` and theme tokens via `data-admin-theme`.

## Props

- `id?: string` – Component ID passed to onChange callback.
- `value?: { start: string | null; end: string | null }` – Controlled range (ISO or YYYY-MM-DD).
- `defaultValue?: { start: string | null; end: string | null }` – Initial value for uncontrolled mode.
- `onChange?: ({ id, value }) => void` – Fired whenever the range changes. Receives `{ id, value }` object where value is `{ start, end }`.
- `presets?: { label: string; range: () => { start: string | null; end: string | null } }[]` – Quick actions list. Defaults to Today / Last 7 days / This month / Clear.
- `allowSingleDay?: boolean` – Allow same-day ranges (default true).
- `showTime?: boolean` – Pass-through to the inner AvakioDatePicker to enable time selection (default false).
- `className?: string` – Optional wrapper class.

## Usage

```tsx
import { useState } from "react";
import { AvakioDateRangePicker } from "./avakio-daterangepicker";
import "./avakio-daterangepicker.css";

export function Example() {
  const [range, setRange] = useState({ start: null, end: null });

  return (
    <AvakioDateRangePicker
      id="date-range-picker"
      value={range}
      onChange={({ value }) => setRange(value)}
      allowSingleDay
      showTime={false}
    />
  );
}
```

## Theming

Inherit `data-admin-theme` from an ancestor; supported keys: `material`, `flat`, `compact`, `dark`, `ocean`, `sunset`.

