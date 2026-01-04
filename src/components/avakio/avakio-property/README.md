property sheet for editing key/value settings. Supports grouped rows, multiple editor types, theming, and change callbacks.

## Features
- Text, number, rich select, checkbox, combo, color picker, counter, slider, multicombo, date, datetime, date range, grid suggest, button, and textarea editors
- Optional grouping via `group` field
- Per-row descriptions, disabled/required flags, and placeholders
- Theme-aware styles for all admin themes (material, flat, compact, dark, ocean, sunset)
- Controlled change handler returning the updated items and the row that changed
- Dense mode and optional border emphasis

## Usage
```tsx
import { useState } from "react";
import { AvakioProperty, AvakioPropertyItem } from "./avakio-property";
import "./avakio-property.css";

const initial: AvakioPropertyItem[] = [
  { id: "title", label: "Title", type: "text", value: "Dashboard", group: "General" },
  { id: "columns", label: "Columns", type: "number", value: 3, group: "General" },
  {
    id: "layout",
    label: "Layout",
    type: "select",
    value: "grid",
    placeholder: "Choose layout",
    selectOptions: [
      { id: "grid", value: "Grid layout" },
      { id: "list", value: "List layout" },
      { id: "cards", value: "Cards layout" },
    ],
    selectYCount: 3,
    group: "General",
  },
  { id: "compact", label: "Compact mode", type: "checkbox", value: true, group: "Appearance", placeholder: "Enable compact spacing" },
  { id: "launchWindow", label: "Launch window", type: "datetime", value: new Date().toISOString(), group: "Metadata" },
];

export function Example() {
  const [items, setItems] = useState(initial);

  return (
    <AvakioProperty
      items={items}
      onChange={(next, changed) => setItems(next)}
      theme="material"
      dense
    />
  );
}
```

## Props
- `items: AvakioPropertyItem[]` — rows to render.
- `onChange?: (items, changed) => void` — called with updated rows and the row that changed.
- `theme?: string` — optional theme token (`material`, `flat`, `compact`, `dark`, `ocean`, `sunset`). Inherits from parent `data-admin-theme` when omitted.
- `className?: string` — custom class names.
  {
    id: "emphasis",
    label: "Emphasis",
    type: "slider",
    value: 50,
    sliderMin: 0,
    sliderMax: 100,
    sliderStep: 5,
    sliderMarks: [0, 25, 50, 75, 100],
    sliderFormatValue: (v) => `${v}%`,
    group: "General",
  },
- `style?: React.CSSProperties` — inline styles for the root.
- `dense?: boolean` — tighter padding.
- `showBorders?: boolean` — emphasizes outer border.

### Item shape
- `id: string` — unique key and form name.
- `label: string` — row label.
- `type?: "text" | "number" | "select" | "checkbox" | "combo" | "colorpicker" | "counter" | "slider" | "multicombo" | "date" | "datetime" | "daterangepicker" | "gridsuggest" | "button" | "textarea"` — editor type (default `text`).
- `value?: string | number | boolean | string[] | AvakioDateRange | null` — current value.
- `placeholder?: string` — placeholder text.
- `description?: string` — helper text under the label.
- `group?: string` — optional group heading.
- `disabled?: boolean` — disable the row.
- `required?: boolean` — mark the control required.
- For `slider`: `sliderDefaultValue?`, `sliderMin?`, `sliderMax?`, `sliderStep?`, `sliderDisabled?`, `sliderLabel?`, `sliderDescription?`, `sliderRequired?`, `sliderError?`, `sliderShowValue?`, `sliderFormatValue?`, `sliderMarks?`, `sliderSize?`, `sliderOnChange?`.
- For `select` (rich select): `selectOptions?` (rich options or string[]), `selectOnChange?(value, option, item)`, `selectPlaceholder?`, `selectDisabled?`, `selectReadOnly?`, `selectTemplate?`, `selectWidth?`, `selectMaxHeight?`, `selectYCount?`, `selectRequired?`, `selectError?`, `selectClassName?`, `selectClearable?`.
- For `combo`: `comboOptions?`, `comboOnChange?(value, option, item)`, `comboOnInputChange?`, `comboPlaceholder?`, `comboLabel?`, `comboLabelAlign?`, `comboLabelWidth?`, `comboDisabled?`, `comboReadOnly?`, `comboFilterMode?`, `comboCustomFilter?`, `comboTemplate?`, `comboWidth?`, `comboMaxHeight?`, `comboRequired?`, `comboError?`, `comboClassName?`.
- For `colorpicker`: `colorDefaultValue?`, `colorLabel?`, `colorDescription?`, `colorError?`, `colorDisabled?`, `colorReadOnly?`, `colorRequired?`, `colorPresets?`, `colorAllowCustomInput?`, `colorShowPreview?`, `colorClassName?`, `colorOnChange?`.
- For `counter`: `counterDefaultValue?`, `counterStep?`, `counterMin?`, `counterMax?`, `counterLabel?`, `counterDescription?`, `counterError?`, `counterRequired?`, `counterDisabled?`, `counterReadOnly?`, `counterSize?`, `counterAllowInput?`, `counterClassName?`, `counterOnChange?`.
- For `daterangepicker`: `daterangeDefaultValue?`, `daterangePresets?`, `daterangeAllowSingleDay?`, `daterangeShowTime?`, `daterangeClassName?`, `daterangeOnChange?`.
- For `gridsuggest`: `gridsuggestData?`, `gridsuggestOnChange?`, `gridsuggestOnInputChange?`, `gridsuggestPlaceholder?`, `gridsuggestLabel?`, `gridsuggestLabelAlign?`, `gridsuggestLabelWidth?`, `gridsuggestDisabled?`, `gridsuggestReadOnly?`, `gridsuggestTextValue?`, `gridsuggestTemplate?`, `gridsuggestWidth?`, `gridsuggestBody?`, `gridsuggestRequired?`, `gridsuggestError?`, `gridsuggestClassName?`, `gridsuggestEditable?`, `gridsuggestFilterMode?`.
- For `multicombo`: `multicomboOptions?`, `multicomboValue?`, `multicomboOnChange?`, `multicomboPlaceholder?`, `multicomboClassName?`, `multicomboShowCount?`, `multicomboMaxDisplayItems?`, `multicomboDisabled?`.
- For `checkbox`: `checkboxLabel?`, `checkboxDescription?`, `checkboxOnChange?(checked, item)`.
- For `button`: `buttonLabel?`, `buttonVariant?`, `buttonSize?`, `buttonBadge?`, `buttonIcon?`, `buttonIconRight?`, `buttonBlock?`, `buttonOnClick?(item)`.

## Example
See `avakio-property-example.tsx` for a ready-to-run demo with grouped rows and change handling.

