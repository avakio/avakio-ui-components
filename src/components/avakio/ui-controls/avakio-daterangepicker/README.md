# Avakio DateRangePicker

A range selector that opens a dropdown containing two AvakioDatePicker instances (From/To) plus quick presets. Supports time selection via `showTime` and theme tokens via `data-admin-theme`.

## Props

- `value?: { start: string | null; end: string | null }` – Controlled range (ISO or YYYY-MM-DD).
- `defaultValue?: { start: string | null; end: string | null }` – Initial value for uncontrolled mode.
- `onChange?: (range) => void` – Fired whenever the range changes.
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
      value={range}
      onChange={setRange}
      allowSingleDay
      showTime={false}
    />
  );
}
```

## Theming

Inherit `data-admin-theme` from an ancestor; supported keys: `material`, `flat`, `compact`, `dark`, `ocean`, `sunset`.

