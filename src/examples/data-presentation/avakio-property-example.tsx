import React, { useState } from "react";
import { AvakioProperty, AvakioPropertyItem } from "../../components/avakio/data-presentation/avakio-property/avakio-property";
import "../../components/avakio/data-presentation/avakio-property/avakio-property.css";

const initialItems: AvakioPropertyItem[] = [
  {
    id: "title",
    label: "Title",
    type: "text",
    value: "Dashboard",
    placeholder: "Enter title",
    group: "General",
  },
  {
    id: "columns",
    label: "Columns",
    type: "number",
    value: 3,
    description: "Number of columns to display",
    group: "General",
  },
  {
    id: "layout",
    label: "Layout",
    type: "select",
    value: "grid",
    placeholder: "Choose layout",
    selectOptions: [
      { id: "grid", value: "Grid layout", detail: "Rows and columns" },
      { id: "list", value: "List layout", detail: "Single column" },
      { id: "cards", value: "Cards layout", detail: "Stacked panels" },
    ],
    selectTemplate: (opt) => (
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <span style={{ fontWeight: 600 }}>{opt.value}</span>
        {opt.detail && <small style={{ color: "#6b7280" }}>{opt.detail}</small>}
      </div>
    ),
    selectYCount: 3,
    selectClearable: true,
    selectOnChange: (val, opt) => console.log("RichSelect changed", val, opt?.value),
    group: "General",
  },
  {
    id: "audience",
    label: "Target audience",
    type: "combo",
    value: "designers",
    placeholder: "Pick a primary audience",
    description: "Used to tailor messaging and visuals",
    comboOptions: [
      { id: "designers", value: "Designers" },
      { id: "developers", value: "Developers" },
      { id: "managers", value: "Managers" },
      { id: "qa", value: "QA Engineers" },
    ],
    comboFilterMode: "contains",
    comboMaxHeight: 220,
    comboOnChange: (val, opt) => console.log("Combo changed", val, opt?.value),
    comboOnInputChange: (text) => console.log("Combo input", text),
    group: "General",
  },
  {
    id: "lead",
    label: "Primary lead",
    type: "gridsuggest",
    value: "pm-1",
    placeholder: "Search leads by role or location",
    description: "Grid dropdown with multiple columns",
    gridsuggestData: [
      { id: "pm-1", name: "Alex Doe", role: "Product Manager", location: "NYC" },
      { id: "des-2", name: "Jamie Lee", role: "Designer", location: "Austin" },
      { id: "eng-3", name: "Sam Kim", role: "Engineer", location: "Remote" },
      { id: "qa-4", name: "Dana Fox", role: "QA", location: "Seattle" },
    ],
    gridsuggestTextValue: "#name# - #role#",
    gridsuggestBody: {
      columns: [
        { id: "name", header: "Name", width: "40%" },
        { id: "role", header: "Role", width: "30%" },
        { id: "location", header: "Location", width: "30%" },
      ],
      scroll: true,
      yCount: 4,
    },
    gridsuggestFilterMode: "contains",
    gridsuggestOnChange: (val, opt) => console.log("GridSuggest changed", val, opt?.name),
    gridsuggestOnInputChange: (txt) => console.log("GridSuggest input", txt),
    group: "General",
  },
  {
    id: "skills",
    label: "Required skills",
    type: "multicombo",
    value: ["js", "ts"],
    placeholder: "Select skills",
    description: "Multi-select with chips/count",
    multicomboOptions: [
      { value: "js", label: "JavaScript" },
      { value: "ts", label: "TypeScript" },
      { value: "react", label: "React" },
      { value: "node", label: "Node.js" },
      { value: "python", label: "Python" },
    ],
    multicomboShowCount: false,
    multicomboMaxDisplayItems: 3,
    multicomboOnChange: (vals) => console.log("MultiCombo changed", vals),
    group: "General",
  },
  {
    id: "compact",
    label: "Compact mode",
    type: "checkbox",
    value: true,
    placeholder: "Enable compact spacing",
    description: "Reduces padding for denser layouts",
    checkboxLabel: "Compact spacing",
    checkboxDescription: "Shrink paddings for dense mode",
    checkboxOnChange: (checked) => console.log("Checkbox toggled", checked),
    group: "Appearance",
  },
  {
    id: "accent",
    label: "Accent color",
    type: "colorpicker",
    value: "#1ca1c1",
    description: "Choose the brand accent",
    colorDefaultValue: "#1ca1c1",
    colorLabel: "Accent swatch",
    colorDescription: "Used for primary UI highlights",
    colorPresets: [
      { label: "Sky", value: "#38bdf8" },
      { label: "Coral", value: "#fb923c" },
      { label: "Mint", value: "#34d399" },
      { label: "Grape", value: "#a855f7" },
      { label: "Steel", value: "#64748b" },
    ],
    colorAllowCustomInput: true,
    colorShowPreview: true,
    colorRequired: true,
    colorOnChange: (color) => console.log("Color changed", color),
    group: "Appearance",
  },
  {
    id: "notes",
    label: "Notes",
    type: "textarea",
    value: "Optional description or internal notes.",
    placeholder: "Add notes",
    group: "Metadata",
  },
  {
    id: "go-live",
    label: "Go-live date",
    type: "date",
    value: "2024-05-10",
    placeholder: "Pick go-live date",
    description: "Date only, no time",
    dateShowTime: false,
    dateClassName: "av-prop-datepicker",
    dateOnChange: (val) => console.log("Go-live date", val),
    group: "Metadata",
  },
  {
    id: "launch-window",
    label: "Launch window",
    type: "datetime",
    value: new Date().toISOString(),
    placeholder: "Select launch datetime",
    description: "Full date & time with custom class",
    dateShowTime: true,
    dateClassName: "av-prop-datepicker is-wide",
    dateOnChange: (val) => console.log("Launch window", val),
    group: "Metadata",
  },
  {
    id: "campaign-range",
    label: "Campaign range",
    type: "daterangepicker",
    value: { start: null, end: null },
    description: "Select start/end with presets",
    daterangeAllowSingleDay: true,
    daterangeShowTime: false,
    daterangePresets: [
      { label: "Next 7 days", range: () => {
        const start = new Date();
        const end = new Date();
        end.setDate(start.getDate() + 6);
        return { start: start.toISOString(), end: end.toISOString() };
      }},
      { label: "This month", range: () => {
        const now = new Date();
        const start = new Date(now.getFullYear(), now.getMonth(), 1);
        const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        return { start: start.toISOString(), end: end.toISOString() };
      }},
    ],
    daterangeOnChange: (range) => console.log("Range picked", range),
    group: "Metadata",
  },
  {
    id: "quota",
    label: "User quota",
    type: "counter",
    value: 5,
    placeholder: "Set allowed users",
    description: "Clamped between 1 and 10",
    counterMin: 1,
    counterMax: 100,
    counterStep: 1,
    counterSize: "md",
    counterAllowInput: true,
    counterOnChange: (val) => console.log("Counter changed", val),
    group: "Metadata",
  },
  {
    id: "importance",
    label: "Importance",
    type: "slider",
    value: 40,
    description: "Weighted importance for prioritization",
    sliderMin: 0,
    sliderMax: 100,
    sliderStep: 5,
    sliderMarks: [0, 25, 50, 75, 100],
    sliderSize: "md",
    sliderShowValue: true,
    sliderFormatValue: (v) => `${v}%`,
    sliderOnChange: (v) => console.log("Slider changed", v),
    group: "Metadata",
  },
  {
    id: "publish",
    label: "Publish",
    type: "button",
    group: "Actions",
    buttonVariant: "primary",
    buttonSize: "md",
    buttonBadge: "Go",
    buttonIcon: "🚀",
    buttonBlock: true,
    buttonLabel: "Launch",
    buttonOnClick: () => console.log("Publish clicked"),
  },
];

export function AvakioPropertyExample() {
  const [items, setItems] = useState<AvakioPropertyItem[]>(initialItems);
  const [theme, setTheme] = useState("material");

  return (
    <div
      style={{
        padding: 24,
        maxWidth: 760,
        display: "flex",
        flexDirection: "column",
        gap: 12,
        background: "var(--prop-bg-alt, #f8fafc)",
        color: "var(--prop-strong, #0f172a)",
        borderRadius: 12,
      }}
    >
      <label style={{ display: "inline-flex", alignItems: "center", gap: 8, fontWeight: 700 }}>
        Theme
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          style={{ padding: "6px 10px", borderRadius: 8, border: "1px solid #d1d5db" }}
        >
          {[
            "material",
            "flat",
            "compact",
            "dark",
            "ocean",
            "sunset",
          ].map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </label>
      <AvakioProperty
        items={items}
        onChange={(next, changed) => {
          setItems(next);
          console.log("changed", changed.id, "to", changed.value);
        }}
      />
    </div>
  );
}

export default AvakioPropertyExample;











