import React, { useEffect, useMemo, useRef, useState } from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { AvakioDatePicker } from "../avakio-datepicker/avakio-datepicker";
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
  onChange?: (range: AvakioDateRange) => void;
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
  /** Maximum height */
  maxHeight?: number | string;
  /** Maximum width */
  maxWidth?: number | string;
}

const formatDate = (value: string | null) => {
  if (!value) return "—";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
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

export function AvakioDateRangePicker({
  value,
  defaultValue,
  onChange,
  presets,
  allowSingleDay = true,
  showTime = false,
  className,
  id,
  testId,
}: AvakioDateRangePickerProps) {
  const isControlled = value !== undefined;
  const [internalRange, setInternalRange] = useState<AvakioDateRange>(
    value || defaultValue || { start: null, end: null }
  );
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [themeAttr, setThemeAttr] = useState<string | null>(null);

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

  const range = useMemo(
    () => normalize(isControlled ? value! : internalRange, allowSingleDay),
    [isControlled, value, internalRange, allowSingleDay]
  );

  const applyRange = (next: AvakioDateRange) => {
    const normalized = normalize(next, allowSingleDay);
    if (!isControlled) setInternalRange(normalized);
    onChange?.(normalized);
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

  const display = `${formatDate(range?.start)} → ${formatDate(range?.end)}`;

  return (
    <div
      ref={rootRef}
      id={id}
      data-testid={testId}
      className={["avakio-drp", className || ""].join(" ")}
      data-admin-theme={themeAttr || undefined}
    >
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button type="button" className="avakio-drp-trigger">
            <div className="avakio-drp-trigger-label">
              <CalendarIcon size={16} />
              <span>Date Range</span>
            </div>
            <div className="avakio-drp-trigger-value">{display}</div>
          </button>
        </PopoverTrigger>
        <PopoverContent
          className="avakio-drp-popover"
          align="center"
          data-admin-theme={themeAttr || undefined}
        >
          <div className="avakio-drp-panel">
            <div className="avakio-drp-col">
              <div className="avakio-drp-col-header">From</div>
              <div data-admin-theme={themeAttr || undefined}>
                <AvakioDatePicker value={range?.start || ""} onChange={handleStart} showTime={showTime} inline />
              </div>
            </div>
            <div className="avakio-drp-col">
              <div className="avakio-drp-col-header">To</div>
              <div data-admin-theme={themeAttr || undefined}>
                <AvakioDatePicker value={range?.end || ""} onChange={handleEnd} showTime={showTime} inline />
              </div>
            </div>
          </div>

          <div className="avakio-drp-presets">
            {presetItems.map((p) => (
              <button
                key={p.label}
                type="button"
                className="avakio-drp-preset"
                onClick={() => applyRange(p.range())}
              >
                {p.label}
              </button>
            ))}
          </div>

          <div className="avakio-drp-footer">
            <button type="button" className="avakio-drp-action" onClick={() => applyRange({ start: null, end: null })}>
              Clear
            </button>
            <button type="button" className="avakio-drp-action" onClick={() => setOpen(false)}>
              Close
            </button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}












