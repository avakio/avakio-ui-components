import React, { useEffect, useMemo, useRef, useState, forwardRef, useImperativeHandle } from "react";
import { Calendar as CalendarIcon, X } from "lucide-react";
import { 
  AvakioChangeEvent,
  AvakioBaseRef,
  useAvakioBase,
  computeBaseStyles,
  computeLabelStyles,
  AVAKIO_BASE_DEFAULTS
} from '../../base/avakio-base-props';
import { AvakioControlLabel } from '../../base/avakio-control-label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { AvakioDatePicker } from "../avakio-datepicker/avakio-datepicker";
import { cn } from '@/lib/utils';
import "./avakio-daterangepicker.css";

export type AvakioDateRange = {
  start: string | null; // ISO or YYYY-MM-DD
  end: string | null;
};

export type PresetRange = {
  label: string;
  range: () => AvakioDateRange;
};

export interface AvakioDateRangePickerProps {
  value?: AvakioDateRange;
  defaultValue?: AvakioDateRange;
  /** Callback fired when the value changes. Receives { id, value } where value is AvakioDateRange */
  onChange?: (event: AvakioChangeEvent<AvakioDateRange>) => void;
  presets?: PresetRange[];
  allowSingleDay?: boolean;
  showTime?: boolean;
  className?: string;
  /** ID of the component */
  id?: string;
  /** Test ID for testing purposes */
  testId?: string;
  /** Minimum width */
  minWidth?: string | number;
  /** Minimum height */
  minHeight?: string | number;
  /** Whether the component is borderless */
  borderless?: boolean;
  /** Whether the component is disabled */
  disabled?: boolean;
  /** Whether the component is hidden */
  hidden?: boolean;
  /** Whether the value can be cleared */
  clearable?: boolean;
  /** Maximum height */
  maxHeight?: number | string;
  /** Maximum width */
  maxWidth?: number | string;
  /** Width of the component */
  width?: number | string;
  /** Height of the component */
  height?: number | string;
  /** Custom inline styles */
  style?: React.CSSProperties;
  /** Placeholder text */
  placeholder?: string;
  /** Tooltip text */
  tooltip?: string;
  /** Label text */
  label?: string;
  /** Label alignment */
  labelAlign?: 'left' | 'right' | 'center';
  /** Label width */
  labelWidth?: number | string;
  /** Label position */
  labelPosition?: 'left' | 'top' | 'right' | 'bottom';
  /** Form label displayed above the component */
  labelForm?: string;
  /** Bottom label text */
  bottomLabel?: string;
  /** Bottom padding */
  bottomPadding?: number;
  /** Whether the field is required */
  required?: boolean;
  /** Whether the field is invalid */
  invalid?: boolean;
  /** Invalid message */
  invalidMessage?: string;
  /** Margin */
  margin?: number | string | [number, number, number, number];
  /** Padding */
  padding?: number | string | [number, number, number, number];
  /** Size variant */
  size?: 'default' | 'compact';
  /** Input alignment */
  inputAlign?: 'left' | 'right';
  /** Align */
  align?: 'left' | 'center' | 'right';
  /** Total width of the component */
  compWidth?: number | string;
  /** Read-only mode */
  readonly?: boolean;
  // Event handlers
  onBlur?: (event: React.FocusEvent) => void;
  onFocus?: (event: React.FocusEvent) => void;
  onItemClick?: (event: React.MouseEvent) => void;
  onKeyPress?: (event: React.KeyboardEvent) => void;
}

const formatDisplayDate = (value: string | null, showTime: boolean = false) => {
  if (!value) return "—";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  if (showTime) {
    return d.toLocaleString(undefined, { 
      year: "numeric", 
      month: "short", 
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  }
  return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
};

const normalize = (range: AvakioDateRange, allowSingleDay: boolean): AvakioDateRange => {
  if (!range.start || !range.end) return range;
  const s = new Date(range.start);
  const e = new Date(range.end);
  if (s.getTime() > e.getTime()) return { start: range.end, end: range.start };
  if (!allowSingleDay && s.getTime() === e.getTime()) return { start: range.start, end: null };
  return range;
};

export const AvakioDateRangePicker = forwardRef<AvakioBaseRef<AvakioDateRange>, AvakioDateRangePickerProps>(function AvakioDateRangePicker(props, ref) {
  const {
    value,
    defaultValue,
    onChange,
    presets,
    allowSingleDay = true,
    showTime = false,
    className,
    id,
    testId,
    minWidth,
    minHeight,
    borderless = false,
    disabled = false,
    hidden = false,
    clearable = false,
    maxHeight,
    maxWidth,
    width,
    height,
    style,
    placeholder = "Select date range...",
    tooltip,
    label,
    labelAlign = AVAKIO_BASE_DEFAULTS.labelAlign,
    labelWidth = AVAKIO_BASE_DEFAULTS.labelWidth,
    labelPosition = AVAKIO_BASE_DEFAULTS.labelPosition,
    labelForm,
    bottomLabel,
    bottomPadding,
    required = false,
    invalid = false,
    invalidMessage,
    margin,
    padding,
    size = 'default',
    inputAlign,
    align,
    compWidth = 'auto',
    readonly = false,
    onBlur,
    onFocus,
    onItemClick,
    onKeyPress,
    onAfterRender,
    onBeforeRender,
  } = props;

  const isControlled = value !== undefined;
  const [internalRange, setInternalRange] = useState<AvakioDateRange>(
    value || defaultValue || { start: null, end: null }
  );
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [themeAttr, setThemeAttr] = useState<string | null>(null);

  // Use the base hook for common functionality
  const {
    isDisabled,
    isHidden,
    isInvalid: internalInvalid,
    getRefMethods,
    eventHandlers,
  } = useAvakioBase<AvakioDateRange>({
    id,
    initialValue: value || defaultValue || { start: null, end: null },
    onChange,
    disabled,
    hidden,
    required,
    invalid,
    invalidMessage,
    getTextValue: (v) => v ? `${formatDisplayDate(v.start, showTime)} → ${formatDisplayDate(v.end, showTime)}` : '',
    onBlur,
    onFocus,
    onItemClick,
    onKeyPress,
    onAfterRender,
    onBeforeRender,
  });

  // Combine external invalid prop with internal validation state
  const isInvalid = invalid || internalInvalid;

  // Expose ref methods
  useImperativeHandle(ref, () => getRefMethods());

  useEffect(() => {
    const host = rootRef.current;
    if (!host) return;
    const nearest = host.closest('[data-admin-theme]') as HTMLElement | null;
    setThemeAttr(nearest?.getAttribute('data-admin-theme') ?? null);

    if (!nearest) return;
    const observer = new MutationObserver(() => {
      setThemeAttr(nearest.getAttribute('data-admin-theme') ?? null);
    });
    observer.observe(nearest, { attributes: true, attributeFilter: ['data-admin-theme'] });
    return () => observer.disconnect();
  }, []);

  // Sync with controlled value
  useEffect(() => {
    if (isControlled && value) {
      setInternalRange(value);
    }
  }, [isControlled, value]);

  const range = useMemo(
    () => normalize(internalRange, allowSingleDay),
    [internalRange, allowSingleDay]
  );

  const applyRange = (next: AvakioDateRange) => {
    const normalized = normalize(next, allowSingleDay);
    console.log('DateRangePicker - Start:', normalized.start);
    console.log('DateRangePicker - End:', normalized.end);
    setInternalRange(normalized);
  };

  const handleClose = () => {
    const normalized = normalize(internalRange, allowSingleDay);
    onChange?.({ id: id || '0', value: normalized });
    setOpen(false);
  };

  const presetItems: PresetRange[] = presets || [
    {
      label: "Today",
      range: () => {
        const t = new Date();
        const iso = t.toISOString();
        return { start: iso, end: iso };
      },
    },
    {
      label: "Last 7 days",
      range: () => {
        const end = new Date();
        const start = new Date();
        start.setDate(end.getDate() - 6);
        return { start: start.toISOString(), end: end.toISOString() };
      },
    },
    {
      label: "This month",
      range: () => {
        const now = new Date();
        const start = new Date(now.getFullYear(), now.getMonth(), 1);
        const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        return { start: start.toISOString(), end: end.toISOString() };
      },
    },
    {
      label: "Clear",
      range: () => ({ start: null, end: null }),
    },
  ];

  const handleStart = (next: string) => {
    applyRange({ start: next, end: range?.end ?? null });
  };

  const handleEnd = (next: string) => {
    applyRange({ start: range?.start ?? null, end: next });
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    applyRange({ start: null, end: null });
  };

  const display = `${formatDisplayDate(range?.start, showTime)} → ${formatDisplayDate(range?.end, showTime)}`;
  const hasValue = range?.start || range?.end;

  // Format compWidth value
  const formattedCompWidth = typeof compWidth === 'number' ? `${compWidth}px` : compWidth;

  // Compute combined styles using base helpers
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
      padding,
      margin,
      bottomPadding,
      align,
    }),
  };

  // Wrapper style - set the actual component width
  const wrapperStyle: React.CSSProperties = {
    ...(compWidth !== 'auto' && { 
      width: formattedCompWidth,
      minWidth: formattedCompWidth,
      maxWidth: formattedCompWidth,
      overflow: 'hidden',
    }),
  };

  // Label styles - keep label width fixed (not used directly, passed to AvakioControlLabel)
  const labelStyle: React.CSSProperties = {
    ...(compWidth !== 'auto' && { flexShrink: 0 }), // Don't shrink label
  };

  // Input styles
  const inputStyle: React.CSSProperties = {
    textAlign: inputAlign,
    ...(compWidth !== 'auto' && { minWidth: 0, width: '100%' }),
  };

  // Input group style - allow shrinking when compWidth is set
  const inputGroupStyle: React.CSSProperties = {
    ...(compWidth !== 'auto' && { minWidth: 0, flex: '1 1 0' }),
  };

  // Don't render if hidden
  if (isHidden) {
    return null;
  }

  // Compact mode
  if (size === 'compact') {
    return (
      <div
        ref={rootRef}
        id={id}
        data-testid={testId}
        className={cn(
          'avakio-drp avakio-drp-compact',
          borderless && 'avakio-drp-borderless',
          isInvalid && 'avakio-drp-invalid',
          isDisabled && 'avakio-drp-disabled',
          (labelPosition === 'top' || labelPosition === 'bottom') && 'avakio-drp-label-vertical',
          className
        )}
        data-admin-theme={themeAttr || undefined}
        data-label-position={labelPosition}
        style={computedStyle}
        title={tooltip}
        onClick={eventHandlers.onClick}
      >
        <AvakioControlLabel
          label={label}
          labelForm={labelForm}
          labelPosition={labelPosition}
          labelAlign={labelAlign}
          labelWidth={labelWidth}
          bottomLabel={bottomLabel}
          required={required}
          invalid={isInvalid}
          invalidMessage={invalidMessage}
          classPrefix="avakio-drp"
          wrapperClassName={(labelPosition === 'top' || labelPosition === 'bottom') ? 'avakio-drp-wrapper-vertical' : ''}
          wrapperStyle={wrapperStyle}
          labelStyle={labelStyle}
          size="compact"
        >
          <Popover open={!isDisabled && open} onOpenChange={(o) => !isDisabled && setOpen(o)}>
            <PopoverTrigger asChild>
              <div className="avakio-drp-input-group-compact" style={inputGroupStyle}>
                <input
                  type="text"
                  className="avakio-drp-input-compact"
                  placeholder={placeholder}
                  value={hasValue ? display : ''}
                  readOnly
                  disabled={isDisabled}
                  style={inputStyle}
                  onBlur={eventHandlers.onBlur}
                  onFocus={eventHandlers.onFocus}
                  onKeyDown={eventHandlers.onKeyPress}
                />
                {clearable && hasValue && !isDisabled && !readonly && (
                  <button
                    type="button"
                    className="avakio-drp-clear-btn-compact"
                    onClick={handleClear}
                  >
                    <X size={12} />
                  </button>
                )}
                {!hasValue && (
                  <button type="button" className="avakio-drp-icon-btn-compact" disabled={isDisabled}>
                    <CalendarIcon size={12} />
                  </button>
                )}
              </div>
            </PopoverTrigger>
            <PopoverContent
              className="avakio-drp-popover"
              align="start"
              data-admin-theme={themeAttr || undefined}
            >
              <div className="avakio-drp-panel">
                <div className="avakio-drp-content">
                  <div className="avakio-drp-col">
                    <div className="avakio-drp-col-header">From</div>
                    <div data-admin-theme={themeAttr || undefined}>
                      <AvakioDatePicker value={range?.start || ""} onChange={({ value }) => handleStart(value)} showTime={showTime} inline />
                    </div>
                  </div>
                  <div className="avakio-drp-col">
                    <div className="avakio-drp-col-header">To</div>
                    <div data-admin-theme={themeAttr || undefined}>
                      <AvakioDatePicker value={range?.end || ""} onChange={({ value }) => handleEnd(value)} showTime={showTime} inline />
                    </div>
                  </div>
                </div>
              </div>
              <div className="avakio-drp-footer">
                <button type="button" className="avakio-drp-action" onClick={() => { applyRange({ start: null, end: null }); handleClose(); }}>
                  Clear
                </button>
                <button type="button" className="avakio-drp-action" onClick={handleClose}>
                  Close
                </button>
              </div>
            </PopoverContent>
          </Popover>
        </AvakioControlLabel>
      </div>
    );
  }

  // Default mode - label + input with calendar button
  return (
    <div
      ref={rootRef}
      id={id}
      data-testid={testId}
      className={cn(
        'avakio-drp',
        borderless && 'avakio-drp-borderless',
        isInvalid && 'avakio-drp-invalid',
        isDisabled && 'avakio-drp-disabled',
        (labelPosition === 'top' || labelPosition === 'bottom') && 'avakio-drp-label-vertical',
        className
      )}
      data-admin-theme={themeAttr || undefined}
      data-label-position={labelPosition}
      style={computedStyle}
      title={tooltip}
      onClick={eventHandlers.onClick}
    >
      <AvakioControlLabel
        label={label}
        labelForm={labelForm}
        labelPosition={labelPosition}
        labelAlign={labelAlign}
        labelWidth={labelWidth}
        bottomLabel={bottomLabel}
        required={required}
        invalid={isInvalid}
        invalidMessage={invalidMessage}
        classPrefix="avakio-drp"
        wrapperClassName={(labelPosition === 'top' || labelPosition === 'bottom') ? 'avakio-drp-wrapper-vertical' : ''}
        wrapperStyle={wrapperStyle}
        labelStyle={labelStyle}
      >
        <Popover open={!isDisabled && open} onOpenChange={(o) => !isDisabled && setOpen(o)}>
          <PopoverTrigger asChild>
            <div className="avakio-drp-input-group" style={inputGroupStyle}>
              <input
                type="text"
                className="avakio-drp-input"
                placeholder={placeholder}
                value={hasValue ? display : ''}
                readOnly
                disabled={isDisabled}
                style={inputStyle}
                onBlur={eventHandlers.onBlur}
                onFocus={eventHandlers.onFocus}
                onKeyDown={eventHandlers.onKeyPress}
              />
              {clearable && hasValue && !isDisabled && !readonly && (
                <button
                  type="button"
                  className="avakio-drp-clear-btn"
                  onClick={handleClear}
                >
                  <X size={14} />
                </button>
              )}
              {!hasValue && (
                <button type="button" className="avakio-drp-icon-btn" disabled={isDisabled}>
                  <CalendarIcon size={16} />
                </button>
              )}
            </div>
          </PopoverTrigger>
          <PopoverContent
            className="avakio-drp-popover"
            side="bottom"
            align="start"
            data-admin-theme={themeAttr || undefined}
          >
            <div className="avakio-drp-panel">
              <div className="avakio-drp-content">
                <div className="avakio-drp-col">
                  <div className="avakio-drp-col-header">From</div>
                  <div data-admin-theme={themeAttr || undefined}>
                    <AvakioDatePicker value={range?.start || ""} onChange={({ value }) => handleStart(value)} showTime={showTime} inline />
                  </div>
                </div>
                <div className="avakio-drp-col">
                  <div className="avakio-drp-col-header">To</div>
                  <div data-admin-theme={themeAttr || undefined}>
                    <AvakioDatePicker value={range?.end || ""} onChange={({ value }) => handleEnd(value)} showTime={showTime} inline />
                  </div>
                </div>
              </div>
            </div>
            <div className="avakio-drp-footer">
              <button type="button" className="avakio-drp-action" onClick={() => { applyRange({ start: null, end: null }); handleClose(); }}>
                Clear
              </button>
              <button type="button" className="avakio-drp-action" onClick={handleClose}>
                Close
              </button>
            </div>
          </PopoverContent>
        </Popover>
      </AvakioControlLabel>
    </div>
  );
});

// Re-export the ref type for consumers
export type AvakioDateRangePickerRef = AvakioBaseRef<AvakioDateRange>;












