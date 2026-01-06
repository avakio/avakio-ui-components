import React, { useState, useMemo, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { ChevronLeft, ChevronRight, Clock, Calendar as CalendarIcon, X, Copy } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { AvakioButton } from '../avakio-button/avakio-button';
import { cn } from '@/lib/utils';
import { 
  AvakioControlledProps, 
  AvakioBaseRef, 
  useAvakioBase,
  formatSize,
  computeBaseStyles,
  computeLabelStyles,
  AVAKIO_BASE_DEFAULTS 
} from '../../base/avakio-base-props';
import './avakio-datepicker.css';

export interface AvakioDatePickerProps extends AvakioControlledProps<string> {
  /** If false, only returns date (YYYY-MM-DD), if true returns full ISO datetime */
  showTime?: boolean;
  /** Use inline calendar instead of dropdown (legacy mode) */
  inline?: boolean;
  /** Size variant - 'default' for normal, 'compact' for filter/table use */
  size?: 'default' | 'compact';
  /** Enable copy button to copy the value to clipboard */
  enableValueCopyButton?: boolean;
}

const formatDisplayDate = (value: string | null | undefined, showTime: boolean) => {
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

// Internal calendar component (can be used inline or in popover)
function AvakioDatePickerCalendar({ 
  value, 
  onChange, 
  className, 
  showTime = true,
  onDateSelect,
  onCancel
}: { 
  value?: string; 
  onChange: (value: string) => void; 
  className?: string; 
  showTime?: boolean;
  onDateSelect?: () => void;
  onCancel?: () => void;
}) {
  const selectedDate = value ? new Date(value) : null;
  const [viewDate, setViewDate] = useState(selectedDate || new Date());

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const { year, month } = useMemo(() => ({
    year: viewDate.getFullYear(),
    month: viewDate.getMonth()
  }), [viewDate]);

  const calendarDays = useMemo(() => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDay = firstDay.getDay();
    const daysInMonth = lastDay.getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const days: Array<{ day: number; isCurrentMonth: boolean; date: Date }> = [];

    // Previous month days
    for (let i = startDay - 1; i >= 0; i--) {
      days.push({
        day: daysInPrevMonth - i,
        isCurrentMonth: false,
        date: new Date(year, month - 1, daysInPrevMonth - i)
      });
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        day: i,
        isCurrentMonth: true,
        date: new Date(year, month, i)
      });
    }

    // Next month days to fill the grid
    const remainingDays = 42 - days.length; // 6 rows * 7 days
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        day: i,
        isCurrentMonth: false,
        date: new Date(year, month + 1, i)
      });
    }

    return days;
  }, [year, month]);

  const handlePrevMonth = () => {
    setViewDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setViewDate(new Date(year, month + 1, 1));
  };

  const handleDateSelect = (date: Date) => {
    const newDate = new Date(date);
    if (showTime) {
      // Include time in the result
      if (selectedDate) {
        newDate.setHours(selectedDate.getHours());
        newDate.setMinutes(selectedDate.getMinutes());
      } else {
        newDate.setHours(0);
        newDate.setMinutes(0);
      }
      newDate.setSeconds(0);
      newDate.setMilliseconds(0);
      onChange(newDate.toISOString());
    } else {
      // Return only date without time (YYYY-MM-DD)
      const year = newDate.getFullYear();
      const month = String(newDate.getMonth() + 1).padStart(2, '0');
      const day = String(newDate.getDate()).padStart(2, '0');
      onChange(`${year}-${month}-${day}`);
      // Close the dropdown after date selection (not for time mode)
      onDateSelect?.();
    }
  };

  const handleTimeChange = (hours: number, minutes: number) => {
    const date = selectedDate ? new Date(selectedDate) : new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(0);
    date.setMilliseconds(0);
    onChange(date.toISOString());
  };

  const handleToday = () => {
    const now = new Date();
    now.setSeconds(0);
    now.setMilliseconds(0);
    onChange(now.toISOString());
    setViewDate(now);
  };

  const handleClear = () => {
    onChange('');
  };

  const isSelected = (date: Date) => {
    if (!selectedDate) return false;
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  return (
    <div className={cn('avakio-datepicker-container', className)}>
      {/* Navigation */}
      <div className="avakio-dp-nav">
        <AvakioButton
          variant="ghost"
          size="sm"
          buttonType="icon"
          icon={<ChevronLeft size={16} />}
          onClick={handlePrevMonth}
          className="avakio-dp-nav-btn"
        />
        <div className="avakio-dp-nav-label">
          {monthNames[month]} {year}
        </div>
        <AvakioButton
          variant="ghost"
          size="sm"
          buttonType="icon"
          icon={<ChevronRight size={16} />}
          onClick={handleNextMonth}
          className="avakio-dp-nav-btn"
        />
      </div>

      {/* Weekday headers */}
      <div className="avakio-dp-weekdays">
        {weekDays.map(day => (
          <div key={day} className="avakio-dp-weekday">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="avakio-dp-days">
        {calendarDays.map((dayInfo, index) => (
          <AvakioButton
            key={index}
            variant={isSelected(dayInfo.date) ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => handleDateSelect(dayInfo.date)}
            className={cn(
              'avakio-dp-day',
              !dayInfo.isCurrentMonth && 'avakio-dp-day-outside',
              isSelected(dayInfo.date) && 'avakio-dp-day-selected',
              isToday(dayInfo.date) && !isSelected(dayInfo.date) && 'avakio-dp-day-today'
            )}
            label={String(dayInfo.day)}
          />
        ))}
      </div>

      {/* Time picker */}
      {showTime && (
      <div className="avakio-dp-time">
        <div className="avakio-dp-time-header">
          <Clock size={16} />
          <span className="avakio-dp-time-display">
            {selectedDate ? (
              (() => {
                const hours = selectedDate.getHours();
                const minutes = selectedDate.getMinutes();
                const ampm = hours >= 12 ? 'PM' : 'AM';
                const displayHours = hours % 12 || 12;
                return `${displayHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${ampm}`;
              })()
            ) : '00:00 AM'}
          </span>
        </div>
        <div className="avakio-dp-time-inputs">
          <input
            type="number"
            placeholder="00"
            value={selectedDate ? selectedDate.getHours().toString().padStart(2, '0') : ''}
            onChange={(e) => {
              if (!e.target.value) return;
              let hours = parseInt(e.target.value) || 0;
              // Wrap around: if user types value > 23, wrap to 0-23 range
              hours = ((hours % 24) + 24) % 24;
              const minutes = selectedDate ? selectedDate.getMinutes() : 0;
              handleTimeChange(hours, minutes);
            }}
            onKeyDown={(e) => {
              if (!selectedDate) return;
              const currentHours = selectedDate.getHours();
              if (e.key === 'ArrowDown') {
                e.preventDefault();
                // Wrap from 0 to 23
                const newHours = currentHours === 0 ? 23 : currentHours - 1;
                handleTimeChange(newHours, selectedDate.getMinutes());
              } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                // Wrap from 23 to 0
                const newHours = currentHours === 23 ? 0 : currentHours + 1;
                handleTimeChange(newHours, selectedDate.getMinutes());
              }
            }}
            className="avakio-dp-time-input"
            disabled={!selectedDate}
          />
          <span className="avakio-dp-time-separator">:</span>
          <input
            type="number"
            placeholder="00"
            value={selectedDate ? selectedDate.getMinutes().toString().padStart(2, '0') : ''}
            onChange={(e) => {
              if (!e.target.value) return;
              let minutes = parseInt(e.target.value) || 0;
              // Wrap around: if user types value > 59, wrap to 0-59 range
              minutes = ((minutes % 60) + 60) % 60;
              const hours = selectedDate ? selectedDate.getHours() : 0;
              handleTimeChange(hours, minutes);
            }}
            onKeyDown={(e) => {
              if (!selectedDate) return;
              const currentMinutes = selectedDate.getMinutes();
              if (e.key === 'ArrowDown') {
                e.preventDefault();
                // Wrap from 0 to 59
                const newMinutes = currentMinutes === 0 ? 59 : currentMinutes - 1;
                handleTimeChange(selectedDate.getHours(), newMinutes);
              } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                // Wrap from 59 to 0
                const newMinutes = currentMinutes === 59 ? 0 : currentMinutes + 1;
                handleTimeChange(selectedDate.getHours(), newMinutes);
              }
            }}
            className="avakio-dp-time-input"
            disabled={!selectedDate}
          />
        </div>
        {!selectedDate && (
          <p className="avakio-dp-hint">Select a date first</p>
        )}
      </div>
      )}

      {/* Action buttons - always visible */}
      <div className="avakio-dp-actions">
        <AvakioButton
          variant="outline"
          size="sm"
          onClick={handleToday}
          className="avakio-dp-action-btn"
          label="Today"
        />
        <AvakioButton
          variant="outline"
          size="sm"
          onClick={handleClear}
          className="avakio-dp-action-btn"
          label="Clear"
        />
      </div>

      {/* OK/Cancel buttons for time mode */}
      {showTime && (onDateSelect || onCancel) && (
        <div className="avakio-dp-confirm-actions">
          {onCancel && (
            <AvakioButton
              variant="outline"
              size="sm"
              onClick={onCancel}
              className="avakio-dp-confirm-btn"
              label="Cancel"
            />
          )}
          {onDateSelect && (
            <AvakioButton
              variant="primary"
              size="sm"
              onClick={onDateSelect}
              className="avakio-dp-confirm-btn"
              label="OK"
            />
          )}
        </div>
      )}
    </div>
  );
}

// Main exported component - dropdown version by default
export const AvakioDatePicker = forwardRef<AvakioBaseRef<string>, AvakioDatePickerProps>(function AvakioDatePicker(props, ref) {
  const {
    value,
    onChange,
    className, 
    showTime = false, 
    id, 
    testId,
    label,
    placeholder = "",
    inline = false,
    size = 'default',
    clearable = AVAKIO_BASE_DEFAULTS.clearable,
    style,
    labelWidth = AVAKIO_BASE_DEFAULTS.labelWidth,
    labelPosition = AVAKIO_BASE_DEFAULTS.labelPosition,
    labelAlign = AVAKIO_BASE_DEFAULTS.labelAlign,
    enableValueCopyButton = false,
    invalid = false,
    invalidMessage,
    borderless = AVAKIO_BASE_DEFAULTS.borderless,
    hidden = AVAKIO_BASE_DEFAULTS.hidden,
    disabled = AVAKIO_BASE_DEFAULTS.disabled,
    readonly = AVAKIO_BASE_DEFAULTS.readonly,
    minWidth,
    minHeight,
    width,
    height,
    bottomPadding,
    bottomLabel,
    tooltip,
    required,
    align,
    inputAlign,
    inputWidth,
    inputHeight,
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
    validate,
  } = props;

  // Use the base hook for common functionality
  const {
    rootRef,
    inputRef,
    isDisabled,
    isHidden,
    methods,
    getRefMethods,
    eventHandlers,
  } = useAvakioBase<string>({
    initialValue: value,
    onChange: (newVal, oldVal) => onChange?.(newVal, oldVal),
    validate,
    disabled,
    hidden,
    getTextValue: (v) => v || '',
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

  // Expose ref methods
  useImperativeHandle(ref, () => getRefMethods());

  const [open, setOpen] = useState(false);
  const [valueOnOpen, setValueOnOpen] = useState<string | undefined>(value);
  const [themeAttr, setThemeAttr] = useState<string | null>(null);

  // Track value when popover opens for cancel functionality
  useEffect(() => {
    if (open) {
      setValueOnOpen(value);
    }
  }, [open, value]);

  const handleCancel = () => {
    // Revert to the value when popover was opened
    if (valueOnOpen !== value) {
      onChange(valueOnOpen || '');
    }
    setOpen(false);
  };

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

  // Format value for input display using browser locale
  const inputDisplayValue = value ? (() => {
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return value;
    
    if (showTime) {
      // Include time in display using locale format
      return d.toLocaleString(undefined, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
    
    // Date only using locale format
    return d.toLocaleDateString(undefined, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  })() : '';

  // Copy value to clipboard
  const handleCopyValue = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (inputDisplayValue) {
      navigator.clipboard.writeText(inputDisplayValue);
    }
  };

  // Compute combined styles using base helpers
  const computedStyle: React.CSSProperties = {
    ...computeBaseStyles({
      style,
      hidden: isHidden,
      height,
      width,
      minHeight,
      minWidth,
      bottomPadding,
      align,
    }),
  };

  // Label styles using base helpers
  const labelStyle: React.CSSProperties = computeLabelStyles({ labelWidth, labelAlign });

  // Input styles
  const inputStyle: React.CSSProperties = {
    textAlign: inputAlign,
    width: formatSize(inputWidth),
    height: formatSize(inputHeight),
  };

  // Handle value change with old value tracking
  const handleValueChange = (newValue: string) => {
    onChange?.(newValue, value);
  };

  // If inline mode, render the calendar directly
  if (inline) {
    return (
      <div 
        ref={rootRef}
        id={id} 
        data-testid={testId} 
        className={cn(
          'avakio-dp-inline', 
          borderless && 'avakio-dp-borderless',
          isDisabled && 'avakio-dp-disabled',
          className
        )}
        data-admin-theme={themeAttr || undefined}
        style={computedStyle}
        title={tooltip}
        onClick={eventHandlers.onClick}
      >
        <AvakioDatePickerCalendar 
          value={value} 
          onChange={handleValueChange} 
          showTime={showTime} 
        />
        {bottomLabel && <div className="avakio-dp-bottom-label">{bottomLabel}</div>}
      </div>
    );
  }

  // Compact mode for filters/tables
  if (size === 'compact') {
    return (
      <div
        ref={rootRef}
        id={id}
        data-testid={testId}
        className={cn(
          'avakio-dp avakio-dp-compact',
          borderless && 'avakio-dp-borderless',
          invalid && 'avakio-dp-invalid',
          isDisabled && 'avakio-dp-disabled',
          className
        )}
        data-admin-theme={themeAttr || undefined}
        style={computedStyle}
        title={tooltip}
        onClick={eventHandlers.onClick}
      >
        <Popover open={!isDisabled && open} onOpenChange={(o) => !isDisabled && setOpen(o)}>
          <PopoverTrigger asChild>
            <div className="avakio-dp-input-group-compact">
              <input
                type="text"
                className="avakio-dp-input-compact"
                placeholder={placeholder}
                value={inputDisplayValue}
                readOnly={readonly || true}
                disabled={isDisabled}
                style={inputStyle}
                onBlur={eventHandlers.onBlur}
                onFocus={eventHandlers.onFocus}
                onKeyDown={eventHandlers.onKeyPress}
              />
              {enableValueCopyButton && value && (
                <button
                  type="button"
                  className="avakio-dp-copy-btn-compact"
                  onClick={handleCopyValue}
                  title="Copy to clipboard"
                  disabled={isDisabled}
                >
                  <Copy size={12} />
                </button>
              )}
              {clearable && value && !isDisabled && (
                <button
                  type="button"
                  className="avakio-dp-clear-btn-compact"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleValueChange('');
                  }}
                >
                  <X size={12} />
                </button>
              )}
              <button type="button" className="avakio-dp-icon-btn-compact" disabled={isDisabled}>
                <CalendarIcon size={12} />
              </button>
            </div>
          </PopoverTrigger>
          <PopoverContent
            className="avakio-dp-popover"
            align="start"
            data-admin-theme={themeAttr || undefined}
          >
            <AvakioDatePickerCalendar 
              value={value} 
              onChange={handleValueChange} 
              showTime={showTime}
              onDateSelect={() => setOpen(false)}
              onCancel={handleCancel}
            />
          </PopoverContent>
        </Popover>
        {invalid && invalidMessage && (
          <div className="avakio-dp-invalid-message">{invalidMessage}</div>
        )}
        {bottomLabel && <div className="avakio-dp-bottom-label">{bottomLabel}</div>}
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
        'avakio-dp',
        borderless && 'avakio-dp-borderless',
        invalid && 'avakio-dp-invalid',
        isDisabled && 'avakio-dp-disabled',
        labelPosition === 'top' && 'avakio-dp-label-top',
        className
      )}
      data-admin-theme={themeAttr || undefined}
      style={computedStyle}
      title={tooltip}
      onClick={eventHandlers.onClick}
    >
      <Popover open={!isDisabled && open} onOpenChange={(o) => !isDisabled && setOpen(o)}>
        <div className={cn('avakio-dp-wrapper', labelPosition === 'top' && 'avakio-dp-wrapper-vertical')}>
          {label && (
            <div className="avakio-dp-label" style={labelStyle}>
              {label}
              {required && <span className="avakio-dp-required">*</span>}
            </div>
          )}
          <PopoverTrigger asChild>
            <div className="avakio-dp-input-group">
              <input
                ref={inputRef as React.RefObject<HTMLInputElement>}
                type="text"
                className="avakio-dp-input"
                placeholder={placeholder}
                value={inputDisplayValue}
                readOnly={readonly || true}
                disabled={isDisabled}
                style={inputStyle}
                onBlur={eventHandlers.onBlur}
                onFocus={eventHandlers.onFocus}
                onKeyDown={eventHandlers.onKeyPress}
              />
              {enableValueCopyButton && value && (
                <button
                  type="button"
                  className="avakio-dp-copy-btn"
                  onClick={handleCopyValue}
                  title="Copy to clipboard"
                  disabled={isDisabled}
                >
                  <Copy size={14} />
                </button>
              )}
              {clearable && value && !isDisabled && (
                <button
                  type="button"
                  className="avakio-dp-clear-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleValueChange('');
                  }}
                >
                  <X size={14} />
                </button>
              )}
              <button type="button" className="avakio-dp-icon-btn" disabled={isDisabled}>
                <CalendarIcon size={16} />
              </button>
            </div>
          </PopoverTrigger>
        </div>
        <PopoverContent
          className="avakio-dp-popover"
          align="end"
          data-admin-theme={themeAttr || undefined}
        >
          <AvakioDatePickerCalendar 
            value={value} 
            onChange={handleValueChange} 
            showTime={showTime}
            onDateSelect={() => setOpen(false)}
            onCancel={handleCancel}
          />
        </PopoverContent>
      </Popover>
      {invalid && invalidMessage && (
        <div className="avakio-dp-invalid-message">{invalidMessage}</div>
      )}
      {bottomLabel && <div className="avakio-dp-bottom-label">{bottomLabel}</div>}
    </div>
  );
});













