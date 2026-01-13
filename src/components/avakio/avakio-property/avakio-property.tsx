import React, { useEffect, useMemo, useRef, useState } from "react";
import "./avakio-property.css";
import { AvakioDatePicker } from "../ui-controls/avakio-datepicker/avakio-datepicker";
import { AvakioCheckbox } from "../ui-controls/avakio-checkbox/avakio-checkbox";
import { AvakioButton, AvakioButtonSize, AvakioButtonVariant } from "../ui-controls/avakio-button/avakio-button";
import { AvakioColorPicker, AvakioColorPickerPreset } from "../ui-controls/avakio-colorpicker/avakio-colorpicker";
import { AvakioCombo, AvakioComboOption } from "../ui-controls/avakio-combo/avakio-combo";
import { AvakioCounter } from "../ui-controls/avakio-counter/avakio-counter";
import { AvakioDateRangePicker, AvakioDateRange, PresetRange } from "../ui-controls/avakio-daterangepicker/avakio-daterangepicker";
import { AvakioGridSuggest, AvakioGridSuggestBodyConfig, AvakioGridSuggestOption } from "../ui-controls/avakio-gridsuggest/avakio-gridsuggest";
import { AvakioMultiCombo, AvakioMultiComboOption } from "../ui-controls/avakio-multicombo/avakio-multicombo";
import { AvakioRichSelect, AvakioRichSelectOption } from "../ui-controls/avakio-richselect/avakio-richselect";
import { AvakioSlider } from "../ui-controls/avakio-slider/avakio-slider";

export type AvakioPropertyEditor =
  | "text"
  | "number"
  | "select"
  | "checkbox"
  | "combo"
  | "colorpicker"
  | "counter"
  | "multicombo"
  | "date"
  | "datetime"
  | "button"
  | "daterangepicker"
  | "gridsuggest"
  | "slider"
  | "textarea";

export interface AvakioPropertyOption {
  label: string;
  value: string | number | boolean;
}

export interface AvakioPropertyItem {
  id: string;
  label: string;
  type?: AvakioPropertyEditor;
  value?: string | number | boolean | string[] | AvakioDateRange | null;
  placeholder?: string;
  description?: string;
  group?: string;
  options?: AvakioPropertyOption[];
  disabled?: boolean;
  required?: boolean;
  checkboxLabel?: string;
  checkboxDescription?: string;
  checkboxOnChange?: (checked: boolean, item: AvakioPropertyItem) => void;
  buttonVariant?: AvakioButtonVariant;
  buttonSize?: AvakioButtonSize;
  buttonBadge?: string | number;
  buttonIcon?: React.ReactNode;
  buttonIconRight?: React.ReactNode;
  buttonBlock?: boolean;
  buttonLabel?: string;
  buttonOnClick?: (item: AvakioPropertyItem) => void;
  comboOptions?: AvakioComboOption[] | string[];
  comboOnChange?: (value: string | number, option: AvakioComboOption | undefined, item: AvakioPropertyItem) => void;
  comboOnInputChange?: (inputValue: string, item: AvakioPropertyItem) => void;
  comboPlaceholder?: string;
  comboLabel?: string;
  comboLabelAlign?: "left" | "right";
  comboLabelWidth?: number;
  comboDisabled?: boolean;
  comboReadOnly?: boolean;
  comboFilterMode?: "startsWith" | "contains" | "custom";
  comboCustomFilter?: (option: AvakioComboOption, inputValue: string) => boolean;
  comboTemplate?: (option: AvakioComboOption) => React.ReactNode;
  comboWidth?: number | string;
  comboMaxHeight?: number;
  comboRequired?: boolean;
  comboError?: string;
  comboClassName?: string;
  selectOptions?: AvakioRichSelectOption[] | string[];
  selectOnChange?: (value: string | number, option: AvakioRichSelectOption | undefined, item: AvakioPropertyItem) => void;
  selectPlaceholder?: string;
  selectDisabled?: boolean;
  selectReadOnly?: boolean;
  selectTemplate?: (option: AvakioRichSelectOption) => React.ReactNode;
  selectWidth?: number | string;
  selectMaxHeight?: number;
  selectYCount?: number;
  selectRequired?: boolean;
  selectError?: string;
  selectClassName?: string;
  selectClearable?: boolean;
  counterDefaultValue?: number;
  counterStep?: number;
  counterMin?: number;
  counterMax?: number;
  counterLabel?: string;
  counterDescription?: string;
  counterError?: string;
  counterRequired?: boolean;
  counterDisabled?: boolean;
  counterReadOnly?: boolean;
  counterSize?: "sm" | "md" | "lg";
  counterAllowInput?: boolean;
  counterClassName?: string;
  counterOnChange?: (value: number, item: AvakioPropertyItem) => void;
  daterangeDefaultValue?: AvakioDateRange;
  daterangePresets?: PresetRange[];
  daterangeAllowSingleDay?: boolean;
  daterangeShowTime?: boolean;
  daterangeClassName?: string;
  daterangeOnChange?: (range: AvakioDateRange, item: AvakioPropertyItem) => void;
  gridsuggestData?: AvakioGridSuggestOption[];
  gridsuggestOnChange?: (value: string | number, option: AvakioGridSuggestOption | undefined, item: AvakioPropertyItem) => void;
  gridsuggestOnInputChange?: (inputValue: string, item: AvakioPropertyItem) => void;
  gridsuggestPlaceholder?: string;
  gridsuggestLabel?: string;
  gridsuggestLabelAlign?: "left" | "right";
  gridsuggestLabelWidth?: number;
  gridsuggestDisabled?: boolean;
  gridsuggestReadOnly?: boolean;
  gridsuggestTextValue?: string;
  gridsuggestTemplate?: (item: AvakioGridSuggestOption) => React.ReactNode;
  gridsuggestWidth?: number | string;
  gridsuggestBody?: AvakioGridSuggestBodyConfig;
  gridsuggestRequired?: boolean;
  gridsuggestError?: string;
  gridsuggestClassName?: string;
  gridsuggestEditable?: boolean;
  gridsuggestFilterMode?: "startsWith" | "contains";
  multicomboOptions?: AvakioMultiComboOption[];
  multicomboValue?: string[];
  multicomboOnChange?: (values: string[], item: AvakioPropertyItem) => void;
  multicomboPlaceholder?: string;
  multicomboClassName?: string;
  multicomboShowCount?: boolean;
  multicomboMaxDisplayItems?: number;
  multicomboDisabled?: boolean;
  sliderDefaultValue?: number;
  sliderMin?: number;
  sliderMax?: number;
  sliderStep?: number;
  sliderDisabled?: boolean;
  sliderLabel?: string;
  sliderDescription?: string;
  sliderRequired?: boolean;
  sliderError?: string;
  sliderShowValue?: boolean;
  sliderFormatValue?: (value: number) => string;
  sliderMarks?: number[];
  sliderSize?: "sm" | "md" | "lg";
  sliderOnChange?: (value: number, item: AvakioPropertyItem) => void;
  dateShowTime?: boolean;
  dateClassName?: string;
  dateOnChange?: (value: string, item: AvakioPropertyItem) => void;
  colorDefaultValue?: string;
  colorLabel?: string;
  colorDescription?: string;
  colorError?: string;
  colorDisabled?: boolean;
  colorReadOnly?: boolean;
  colorRequired?: boolean;
  colorPresets?: AvakioColorPickerPreset[];
  colorAllowCustomInput?: boolean;
  colorShowPreview?: boolean;
  colorClassName?: string;
  colorOnChange?: (color: string, item: AvakioPropertyItem) => void;
}

export interface AvakioPropertyProps {
  items: AvakioPropertyItem[];
  onChange?: (items: AvakioPropertyItem[], changed: AvakioPropertyItem) => void;
  theme?: string;
  className?: string;
  style?: React.CSSProperties;
  dense?: boolean;
  showBorders?: boolean;
  /** ID of the component */
  id?: string;
  /** Test ID for testing purposes */
  testId?: string;
}

export function AvakioProperty({
  items,
  onChange,
  theme,
  className,
  style,
  dense,
  showBorders,
  id,
  testId,
}: AvakioPropertyProps) {
  const [rows, setRows] = useState<AvakioPropertyItem[]>(items);
  const [lastChanged, setLastChanged] = useState<AvakioPropertyItem | null>(null);
  const [openDateId, setOpenDateId] = useState<string | null>(null);
  const [openDatePlacement, setOpenDatePlacement] = useState<"bottom" | "top">("bottom");
  const rootRef = useRef<HTMLDivElement | null>(null);
  const dateBtnRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  useEffect(() => {
    setRows(items);
  }, [items]);

  useEffect(() => {
    if (lastChanged) {
      onChange?.(rows, lastChanged);
      setLastChanged(null);
    }
  }, [lastChanged, onChange, rows]);

  useEffect(() => {
    if (!openDateId) return;
    const handleClickOutside = (evt: MouseEvent) => {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(evt.target as Node)) {
        setOpenDateId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openDateId]);

  const computeDatePlacement = (id: string) => {
    const btn = dateBtnRefs.current[id];
    if (!btn) return "bottom" as const;
    const rect = btn.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const estimatedHeight = 360;
    const spaceBelow = viewportHeight - rect.bottom;
    const spaceAbove = rect.top;
    return spaceBelow < estimatedHeight && spaceAbove > spaceBelow ? "top" : "bottom";
  };

  const coerceDate = (val: unknown) => {
    if (val === undefined || val === null || val === "") return null;
    const raw = String(val);
    const normalized = raw.includes("T") ? raw : `${raw}T00:00:00`;
    const d = new Date(normalized);
    return Number.isNaN(d.getTime()) ? null : d;
  };

  const formatDisplayValue = (item: AvakioPropertyItem) => {
    if (item.value === undefined || item.value === null || item.value === "") {
      return item.placeholder || (item.type === "datetime" ? "Select date & time" : "Select date");
    }

    if (item.type === "date" && typeof item.value === "string") {
      const date = coerceDate(item.value);
      return date ? date.toLocaleDateString(undefined, { dateStyle: "medium" }) : "Invalid date";
    }

    if (item.type === "datetime" && typeof item.value === "string") {
      const date = coerceDate(item.value);
      return date ? date.toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" }) : "Invalid date";
    }

    return String(item.value);
  };

  const groupedRows = useMemo(() => {
    const groups: Record<string, AvakioPropertyItem[]> = {};
    rows.forEach((row) => {
      const key = row.group || "__ungrouped";
      if (!groups[key]) groups[key] = [];
      groups[key].push(row);
    });
    return groups;
  }, [rows]);

  const handleChange = (id: string, value: string | number | boolean | string[] | AvakioDateRange | null) => {
    setRows((prev) => {
      const next = prev.map((r) => (r.id === id ? { ...r, value } : r));
      const changed = next.find((r) => r.id === id)!;
      setLastChanged(changed);
      return next;
    });
  };

  const renderControl = (item: AvakioPropertyItem) => {
    const common = {
      id: item.id,
      name: item.id,
      disabled: item.disabled,
      required: item.required,
      placeholder: item.placeholder,
    } as const;

    switch (item.type) {
      case "number":
        return (
          <input
            type="number"
            className="av-prop-input"
            {...common}
            value={
              item.value === undefined || item.value === null
                ? ""
                : (item.value as number | string)
            }
            onChange={(e) => handleChange(item.id, e.target.value === "" ? "" : Number(e.target.value))}
          />
        );
      case "select":
        {
          const richOptions = (item.selectOptions ?? item.options ?? []).map((opt): string | AvakioRichSelectOption => {
            if (typeof opt === "string") return opt;
            if ((opt as AvakioRichSelectOption).id !== undefined) return opt as AvakioRichSelectOption;
            const propOpt = opt as AvakioPropertyOption;
            const normalizedId = typeof propOpt.value === "boolean" ? String(propOpt.value) : propOpt.value;
            return { id: normalizedId, value: propOpt.label } as AvakioRichSelectOption;
          }) as AvakioRichSelectOption[] | string[];

          return (
            <AvakioRichSelect
              id={item.id}
              value={typeof item.value === "string" || typeof item.value === "number" ? item.value : undefined}
              options={richOptions}
              onChange={(val, opt) => {
                item.selectOnChange?.(val, opt, item);
                handleChange(item.id, (val as string | number) ?? "");
              }}
              placeholder={item.selectPlaceholder ?? item.placeholder}
              disabled={item.selectDisabled ?? item.disabled}
              readonly={item.selectReadOnly}
              template={item.selectTemplate}
              width={item.selectWidth}
              maxHeight={item.selectMaxHeight}
              yCount={item.selectYCount}
              required={item.selectRequired ?? item.required}
              error={item.selectError}
              className={item.selectClassName}
              clearable={item.selectClearable}
            />
          );
        }
      case "checkbox":
        {
          const checked = item.value === undefined ? false : Boolean(item.value);
        return (
          <AvakioCheckbox
            id={item.id}
            name={item.id}
              checked={checked}
              onChange={({ value: next }) => {
                item.checkboxOnChange?.(next, item);
                handleChange(item.id, next);
              }}
              label={item.checkboxLabel ?? item.placeholder ?? item.label}
              description={item.checkboxDescription ?? item.description}
            disabled={item.disabled}
            required={item.required}
          />
        );
        }
      case "combo":
        return (
          <AvakioCombo
            id={item.id}
            value={typeof item.value === "string" || typeof item.value === "number" ? item.value : undefined}
            options={(item.comboOptions ?? item.options ?? []) as AvakioComboOption[] | string[]}
            onChange={({ value: val, option: opt }) => {
              item.comboOnChange?.(val, opt, item);
              handleChange(item.id, (val as string | number) ?? "");
            }}
            onInputChange={(inputVal) => item.comboOnInputChange?.(inputVal, item)}
            placeholder={item.comboPlaceholder ?? item.placeholder}
            label={item.comboLabel}
            labelAlign={item.comboLabelAlign}
            labelWidth={item.comboLabelWidth}
            disabled={item.comboDisabled ?? item.disabled}
            readonly={item.comboReadOnly}
            filterMode={item.comboFilterMode}
            customFilter={item.comboCustomFilter}
            template={item.comboTemplate}
            width={item.comboWidth}
            maxHeight={item.comboMaxHeight}
            required={item.comboRequired ?? item.required}
            error={item.comboError}
            className={item.comboClassName}
          />
        );
      case "colorpicker":
        return (
          <AvakioColorPicker
            id={item.id}
            value={typeof item.value === "string" ? item.value : undefined}
            defaultValue={item.colorDefaultValue}
            label={item.colorLabel}
            description={item.colorDescription}
            error={item.colorError}
            disabled={item.colorDisabled ?? item.disabled}
            readOnly={item.colorReadOnly}
            required={item.colorRequired ?? item.required}
            presets={item.colorPresets}
            allowCustomInput={item.colorAllowCustomInput}
            showPreview={item.colorShowPreview}
            className={item.colorClassName}
            onChange={(color) => {
              item.colorOnChange?.(color, item);
              handleChange(item.id, color);
            }}
          />
        );
      case "counter":
        return (
          <AvakioCounter
            id={item.id}
            value={typeof item.value === "number" ? item.value : undefined}
            defaultValue={item.counterDefaultValue}
            step={item.counterStep}
            min={item.counterMin}
            max={item.counterMax}
            label={item.counterLabel ?? item.label}
            description={item.counterDescription ?? item.description}
            error={item.counterError}
            required={item.counterRequired ?? item.required}
            disabled={item.counterDisabled ?? item.disabled}
            readOnly={item.counterReadOnly}
            size={item.counterSize}
            allowInput={item.counterAllowInput}
            className={item.counterClassName}
            onChange={({ value: val }) => {
              item.counterOnChange?.(val, item);
              handleChange(item.id, val);
            }}
          />
        );
      case "slider":
        return (
          <AvakioSlider
            value={typeof item.value === "number" ? item.value : undefined}
            defaultValue={item.sliderDefaultValue}
            min={item.sliderMin}
            max={item.sliderMax}
            step={item.sliderStep}
            disabled={item.sliderDisabled ?? item.disabled}
            label={item.sliderLabel ?? item.label}
            description={item.sliderDescription ?? item.description}
            required={item.sliderRequired ?? item.required}
            error={item.sliderError}
            showValue={item.sliderShowValue}
            formatValue={item.sliderFormatValue}
            marks={item.sliderMarks}
            size={item.sliderSize}
            onChange={({ value: val }) => {
              const numericVal = typeof val === "number" ? val : val[0];
              item.sliderOnChange?.(numericVal, item);
              handleChange(item.id, numericVal);
            }}
          />
        );
      case "date":
        return (
          <div className="av-prop-datewrap">
            <button
              type="button"
              className="av-prop-datebtn"
              ref={(el) => {
                dateBtnRefs.current[item.id] = el;
              }}
              onClick={() => {
                if (openDateId === item.id) {
                  setOpenDateId(null);
                  return;
                }
                const placement = computeDatePlacement(item.id);
                setOpenDatePlacement(placement);
                setOpenDateId(item.id);
              }}
            >
              {formatDisplayValue(item)}
            </button>
            {openDateId === item.id && (
              <div className={`av-prop-datepop ${openDatePlacement === "top" ? "is-top" : ""}`}>
                <AvakioDatePicker
                  value={(item.value as string | undefined) ?? ""}
                  onChange={(val) => {
                    item.dateOnChange?.(val, item);
                    handleChange(item.id, val);
                    setOpenDateId(null);
                  }}
                  showTime={item.dateShowTime ?? false}
                  className={item.dateClassName ?? "av-prop-datepicker"}
                />
              </div>
            )}
          </div>
        );
      case "daterangepicker":
        return (
          <AvakioDateRangePicker
            value={item.value && typeof item.value === "object" ? (item.value as AvakioDateRange) : undefined}
            defaultValue={item.daterangeDefaultValue}
            presets={item.daterangePresets}
            allowSingleDay={item.daterangeAllowSingleDay}
            showTime={item.daterangeShowTime}
            className={item.daterangeClassName}
            onChange={({ value: range }) => {
              item.daterangeOnChange?.(range, item);
              handleChange(item.id, range);
            }}
          />
        );
      case "gridsuggest":
        return (
          <AvakioGridSuggest
            id={item.id}
            value={typeof item.value === "string" || typeof item.value === "number" ? item.value : undefined}
            data={item.gridsuggestData ?? (item.options as unknown as AvakioGridSuggestOption[] | undefined) ?? []}
            onChange={({ value: val, option: opt }) => {
              item.gridsuggestOnChange?.(val, opt, item);
              handleChange(item.id, (val as string | number) ?? "");
            }}
            onInputChange={(text) => item.gridsuggestOnInputChange?.(text, item)}
            placeholder={item.gridsuggestPlaceholder ?? item.placeholder}
            label={item.gridsuggestLabel}
            labelAlign={item.gridsuggestLabelAlign}
            labelWidth={item.gridsuggestLabelWidth}
            disabled={item.gridsuggestDisabled ?? item.disabled}
            readonly={item.gridsuggestReadOnly}
            textValue={item.gridsuggestTextValue}
            template={item.gridsuggestTemplate}
            width={item.gridsuggestWidth}
            body={item.gridsuggestBody}
            required={item.gridsuggestRequired ?? item.required}
            error={item.gridsuggestError}
            className={item.gridsuggestClassName}
            editable={item.gridsuggestEditable}
            filterMode={item.gridsuggestFilterMode}
          />
        );
      case "multicombo":
        return (
          <AvakioMultiCombo
            options={item.multicomboOptions ?? []}
            value={Array.isArray(item.multicomboValue ?? item.value) ? (item.multicomboValue ?? (item.value as string[])) : []}
            onChange={({ value: vals }) => {
              item.multicomboOnChange?.(vals, item);
              handleChange(item.id, vals);
            }}
            placeholder={item.multicomboPlaceholder ?? item.placeholder}
            className={item.multicomboClassName}
            showCount={item.multicomboShowCount}
            maxDisplayItems={item.multicomboMaxDisplayItems}
            disabled={item.multicomboDisabled ?? item.disabled}
          />
        );
      case "datetime":
        return (
          <div className="av-prop-datewrap">
            <button
              type="button"
              className="av-prop-datebtn"
              ref={(el) => {
                dateBtnRefs.current[item.id] = el;
              }}
              onClick={() => {
                if (openDateId === item.id) {
                  setOpenDateId(null);
                  return;
                }
                const placement = computeDatePlacement(item.id);
                setOpenDatePlacement(placement);
                setOpenDateId(item.id);
              }}
            >
              {formatDisplayValue(item)}
            </button>
            {openDateId === item.id && (
              <div className={`av-prop-datepop ${openDatePlacement === "top" ? "is-top" : ""}`}>
                <AvakioDatePicker
                  value={(item.value as string | undefined) ?? ""}
                  onChange={(val) => {
                    item.dateOnChange?.(val, item);
                    handleChange(item.id, val);
                    setOpenDateId(null);
                  }}
                  showTime={item.dateShowTime ?? true}
                  className={item.dateClassName ?? "av-prop-datepicker"}
                />
              </div>
            )}
          </div>
        );
      case "button":
        return (
          <AvakioButton
            label={item.buttonLabel || item.placeholder || "Action"}
            onClick={() => {
              if (item.disabled) return;
              item.buttonOnClick?.(item);
              handleChange(item.id, true);
            }}
            disabled={item.disabled}
            variant={item.buttonVariant}
            size={item.buttonSize}
            badge={item.buttonBadge}
            icon={item.buttonIcon}
            iconRight={item.buttonIconRight}
            block={item.buttonBlock}
          />
        );
      case "textarea":
        return (
          <textarea
            className="av-prop-input av-prop-textarea"
            {...common}
            value={(item.value as string | undefined) ?? ""}
            onChange={(e) => handleChange(item.id, e.target.value)}
          />
        );
      case "text":
      default:
        return (
          <input
            type="text"
            className="av-prop-input"
            {...common}
            value={(item.value as string | undefined) ?? ""}
            onChange={(e) => handleChange(item.id, e.target.value)}
          />
        );
    }
  };

  const rootClass = [
    "avakio-property",
    dense ? "is-dense" : "",
    showBorders ? "has-borders" : "",
    className || "",
  ]
    .filter(Boolean)
    .join(" ");

  const themeProps = theme ? { "data-admin-theme": theme } : undefined;

  return (
    <div ref={rootRef} id={id} data-testid={testId} className={rootClass} style={style} {...themeProps}>
      <div className="av-prop-table">
        {Object.entries(groupedRows).map(([group, rowsInGroup]) => (
          <React.Fragment key={group}>
            {group !== "__ungrouped" && <div className="av-prop-group">{group}</div>}
            {rowsInGroup.map((item) => (
              <div key={item.id} className="av-prop-row">
                <div className="av-prop-label">
                  <label htmlFor={item.id}>{item.label}</label>
                  {item.description && <div className="av-prop-desc">{item.description}</div>}
                </div>
                <div className="av-prop-control">{renderControl(item)}</div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}








