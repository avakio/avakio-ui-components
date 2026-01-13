# Avakio Slider

A slider control with themed styling, marks, size variants, and controlled/uncontrolled modes.

## Props

- `id?: string` – Component ID passed to onChange callback.
- `value?: number` – Controlled value.
- `defaultValue?: number` – Initial value for uncontrolled mode.
- `onChange?: ({ id, value }) => void` – Fired when the value changes. Receives `{ id, value }` object.
- `min?: number` – Minimum value (default 0).
- `max?: number` – Maximum value (default 100).
- `step?: number` – Step interval (default 1).
- `disabled?: boolean` – Disables interaction.
- `label?: string` – Optional label text.
- `description?: string` – Helper text under the label.
- `required?: boolean` – Shows required indicator.
- `error?: string` – Error message and red styling.
- `showValue?: boolean` – Displays a value chip near the label (default true).
- `formatValue?: (value: number) => string` – Custom value formatter.
- `marks?: number[]` – Optional tick marks within the range.
- `size?: "sm" | "md" | "lg"` – Height/thumb sizing (default `md`).

## Usage

```tsx
import { useState } from "react";
import { AvakioSlider } from "./avakio-slider";
import "./avakio-slider.css";

export function Example() {
  const [value, setValue] = useState(40);
  return (
    <AvakioSlider
      id="volume-slider"
      label="Volume"
      min={0}
      max={100}
      step={5}
      value={value}
      onChange={({ value: v }) => setValue(v)}
      marks={[0, 25, 50, 75, 100]}
    />
  );
}
```

## Theming

Theme tokens are sourced from the `data-admin-theme` attribute on an ancestor (or directly on the component). Supported keys: `material`, `flat`, `compact`, `dark`, `ocean`, `sunset`.

