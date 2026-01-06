import React, { useEffect, useMemo, useRef, useState, forwardRef, useImperativeHandle } from "react";
import "./avakio-property.css";
import {
  AvakioBaseProps,
  AvakioBaseRef,
  AVAKIO_BASE_DEFAULTS,
  computeBaseStyles,
  useAvakioBase,
} from "../../base/avakio-base-props";
import { AvakioDatePicker } from "../../ui-controls/avakio-datepicker/avakio-datepicker";
import { AvakioCheckbox } from "../../ui-controls/avakio-checkbox/avakio-checkbox";
import { AvakioButton, AvakioButtonSize, AvakioButtonVariant } from "../../ui-controls/avakio-button/avakio-button";
import { AvakioColorPicker, AvakioColorPickerPreset } from "../../ui-controls/avakio-colorpicker/avakio-colorpicker";
import { AvakioCombo, AvakioComboOption } from "../../ui-controls/avakio-combo/avakio-combo";
import { AvakioCounter } from "../../ui-controls/avakio-counter/avakio-counter";
import { AvakioDateRangePicker, AvakioDateRange, PresetRange } from "../../ui-controls/avakio-daterangepicker/avakio-daterangepicker";
import { AvakioGridSuggest, AvakioGridSuggestBodyConfig, AvakioGridSuggestOption } from "../../ui-controls/avakio-gridsuggest/avakio-gridsuggest";
import { AvakioMultiCombo, AvakioMultiComboOption } from "../../ui-controls/avakio-multicombo/avakio-multicombo";
import { AvakioRichSelect, AvakioRichSelectOption } from "../../ui-controls/avakio-richselect/avakio-richselect";
import { AvakioSlider } from "../../ui-controls/avakio-slider/avakio-slider";
import { AvakioText } from "../../ui-controls/avakio-text/avakio-text";

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

export interface AvakioPropertyProps extends AvakioBaseProps {
  /** Array of property items to display */
  items: AvakioPropertyItem[];
  /** Callback when any property value changes */
  onChange?: (items: AvakioPropertyItem[], changed: AvakioPropertyItem) => void;
  /** Enable dense/compact mode */
  dense?: boolean;
  /** Show borders between rows */
  showBorders?: boolean;
}

/** Ref type for AvakioProperty component */
export type AvakioPropertyRef = AvakioBaseRef<AvakioPropertyItem[]>;

export const AvakioProperty = forwardRef<AvakioPropertyRef, AvakioPropertyProps>(
  function AvakioProperty(props, ref) {
    const {
      // Property-specific props
      items,
      onChange,
      dense,
      showBorders,
      // Base props
      id,
      testId,
      className,
      style,
      disabled = AVAKIO_BASE_DEFAULTS.disabled,
      hidden = AVAKIO_BASE_DEFAULTS.hidden,
      borderless = AVAKIO_BASE_DEFAULTS.borderless,
      width,
      height,
      minWidth,
      minHeight,
      maxWidth,
      maxHeight,
      margin,
      padding,
      tooltip,
      // Event handlers
      onBlur,
      onFocus,
      onItemClick,
      onKeyPress,
      onAfterRender,
      onBeforeRender,
      onViewShow,
      onViewResize,
      onAfterScroll,
    } = props;

    const [rows, setRows] = useState<AvakioPropertyItem[]>(items);
    
    // Use the base hook for common functionality
    const {
      rootRef,
      isDisabled,
      isHidden,
      setIsDisabled,
      setIsHidden,
      getRefMethods,
      eventHandlers,
    } = useAvakioBase<AvakioPropertyItem[]>({
      initialValue: items,
      onChange: (newVal) => {
        if (newVal) setRows(newVal);
      },
      disabled,
      hidden,
      getTextValue: (v) => (v ? JSON.stringify(v) : ''),
      onBlur,
      onFocus,
      onItemClick,
      onKeyPress,
      onAfterRender,
      onBeforeRender,
      onViewShow,
      onViewResize,
      onAfterScroll,
    });
  const [lastChanged, setLastChanged] = useState<AvakioPropertyItem | null>(null);

  useEffect(() => {
    setRows(items);
  }, [items]);

  useEffect(() => {
    if (lastChanged) {
      onChange?.(rows, lastChanged);
      setLastChanged(null);
    }
  }, [lastChanged, onChange, rows]);

  const groupedRows = useMemo(() => {
    const groups: Record<string, AvakioPropertyItem[]> = {};
    rows.forEach((row) => {
      const key = row.group || "__ungrouped";
      if (!groups[key]) groups[key] = [];
      groups[key].push(row);
    });
    return groups;
  }, [rows]);

  // Expose imperative methods via ref (extending base methods)
  useImperativeHandle(ref, () => ({
    ...getRefMethods(),
    getValue: () => rows,
    setValue: (newItems: AvakioPropertyItem[]) => setRows(newItems),
    getText: () => JSON.stringify(rows),
  }), [rows, getRefMethods]);

  // Compute styles from base props
  const computedStyle: React.CSSProperties = {
    ...computeBaseStyles({
      style,
      hidden: isHidden,
      height,
      width,
      minHeight,
      minWidth,
      maxHeight,
      maxWidth,
      margin,
      padding,
    }),
  };

  const handleChange = (id: string, value: string | number | boolean | string[] | AvakioDateRange | null) => {
    if (isDisabled) return;
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
          <AvakioText
            id={item.id}
            name={item.id}
            type="number"
            value={
              item.value === undefined || item.value === null
                ? ""
                : String(item.value)
            }
            placeholder={item.placeholder}
            disabled={item.disabled}
            readonly={item.disabled}
            onChange={(val) => handleChange(item.id, val === "" ? "" : Number(val))}
            width="100%"
            borderless
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
              onChange={(next) => {
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
            onChange={(val, opt) => {
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
            onChange={(val) => {
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
            onChange={(val) => {
              const numericVal = typeof val === "number" ? val : val[0];
              item.sliderOnChange?.(numericVal, item);
              handleChange(item.id, numericVal);
            }}
          />
        );
      case "date":
        return (
          <AvakioDatePicker
            id={item.id}
            value={(item.value as string | undefined) ?? ""}
            onChange={(val) => {
              item.dateOnChange?.(val, item);
              handleChange(item.id, val);
            }}
            showTime={item.dateShowTime ?? false}
            placeholder={item.placeholder}
            disabled={item.disabled}
            className={item.dateClassName}
            width="100%"
          />
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
            onChange={(range) => {
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
            onChange={(val, opt) => {
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
            onChange={(vals) => {
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
          <AvakioDatePicker
            id={item.id}
            value={(item.value as string | undefined) ?? ""}
            onChange={(val) => {
              item.dateOnChange?.(val, item);
              handleChange(item.id, val);
            }}
            showTime
            placeholder={item.placeholder}
            disabled={item.disabled}
            className={item.dateClassName}
            width="100%"
          />
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
          <AvakioText
            id={item.id}
            name={item.id}
            value={(item.value as string | undefined) ?? ""}
            placeholder={item.placeholder}
            disabled={item.disabled}
            readonly={item.disabled}
            onChange={(val) => handleChange(item.id, val)}
            width="100%"
            borderless
            multiline
            rows={3}
          />
        );
      case "text":
      default:
        return (
          <AvakioText
            id={item.id}
            name={item.id}
            value={(item.value as string | undefined) ?? ""}
            placeholder={item.placeholder}
            disabled={item.disabled}
            readonly={item.disabled}
            onChange={(val) => handleChange(item.id, val)}
            width="100%"
            borderless
          />
        );
    }
  };

  const rootClass = [
    "avakio-property",
    dense ? "is-dense" : "",
    showBorders ? "has-borders" : "",
    borderless ? "is-borderless" : "",
    isDisabled ? "is-disabled" : "",
    className || "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      ref={rootRef}
      id={id}
      data-testid={testId}
      className={rootClass}
      style={computedStyle}
      title={tooltip}
      onBlur={eventHandlers.onBlur}
      onFocus={eventHandlers.onFocus}
      onClick={eventHandlers.onClick}
      onKeyDown={eventHandlers.onKeyPress}
      onScroll={eventHandlers.onScroll}
      tabIndex={isDisabled ? -1 : 0}
    >
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
});








