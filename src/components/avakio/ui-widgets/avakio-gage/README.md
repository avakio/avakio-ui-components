# Avakio Gage

radial gage that visualizes a numeric value within a range, with theming for all admin themes.

## Props
- `value?: number` — Controlled value.
- `defaultValue?: number` — Fallback when `value` is not provided.
- `min?: number` — Minimum bound (default `0`).
- `max?: number` — Maximum bound (default `100`).
- `label?: string` — Optional title above the gage.
- `subLabel?: string` — Secondary line shown in the center.
- `size?: "sm" | "md" | "lg"` — Diameter presets (default `md`).
- `thickness?: number` — Stroke width for the ring.
- `prefix?: string` — Text before the value.
- `suffix?: string` — Text after the value.
- `formatValue?: (value: number) => string` — Custom value formatter.
- `showValue?: boolean` — Toggle the centered value (default `true`).
- `showMinMax?: boolean` — Show min/max labels under the gage (default `true`).
- `trackColor?: string` — Override track color.
- `color?: string` — Override value ring color.
- `target?: number` — Optional target marker on the ring.
- `className?: string` — Additional class names.
- `style?: React.CSSProperties` — Inline style overrides.

## Usage
```tsx
import { AvakioGage } from "./avakio-gage";
import "./avakio-gage.css";

export function Example() {
  return (
    <div data-admin-theme="material" style={{ padding: 24 }}>
      <AvakioGage
        label="CPU Load"
        value={72}
        suffix="%"
        min={0}
        max={100}
        target={80}
        size="lg"
      />
    </div>
  );
}
```

## Theming
Place `data-admin-theme` on an ancestor or on the component. Supported tokens: `material`, `flat`, `compact`, `dark`, `ocean`, `sunset`.

## Example
See `avakio-gage-example.tsx` for a multi-theme demo with live value updates.

