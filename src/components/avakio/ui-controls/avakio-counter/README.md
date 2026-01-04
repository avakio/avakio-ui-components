# Avakio Counter

A lightweight numeric stepper  Supports clamp-based min/max, custom step, optional free typing, disabled/readonly modes, and theme tokens shared with other Avakio components.

## Props

- `label?: string` – Optional title text.
- `description?: string` – Helper text displayed under the label.
- `value?: number` – Controlled value. If omitted, the counter manages its own state.
- `defaultValue?: number` – Initial value for uncontrolled mode.
- `onChange?: (value: number) => void` – Fired whenever the value updates.
- `min?: number` – Minimum allowed value (default `-Infinity`).
- `max?: number` – Maximum allowed value (default `Infinity`).
- `step?: number` – Increment size (default `1`).
- `size?: "sm" | "md" | "lg"` – Control height/spacing (default `md`).
- `disabled?: boolean` – Disables the control entirely.
- `readOnly?: boolean` – Prevents changes; allows focus/selection.
- `allowInput?: boolean` – If true, input is editable; otherwise display-only.
- `required?: boolean` – Adds a required indicator by the label.
- `error?: string` – Error state with message and red outline.

## Usage

```tsx
import { AvakioCounter } from "./avakio-counter";
import "./avakio-counter.css";

function Example() {
  const [value, setValue] = useState(2);
  return (
    <AvakioCounter
      label="Quantity"
      description="Clamped between 0 and 10"
      min={0}
      max={10}
      step={1}
      value={value}
      onChange={setValue}
      allowInput
    />
  );
}
```

## Theming

The counter consumes the shared `data-admin-theme` attribute on an ancestor (e.g., `body`) and maps to the same palettes used by other Avakio controls.

Supported theme keys: `material`, `flat`, `compact`, `dark`, `ocean`, `sunset`.

