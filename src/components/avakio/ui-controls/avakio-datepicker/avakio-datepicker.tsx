import React, { useState, useMemo, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Clock, Calendar as CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import './avakio-datepicker.css';

export interface AvakioDatePickerProps {
  value?: string;
  onChange: (value: string) => void;
  className?: string;
  showTime?: boolean; // If false, only returns date (YYYY-MM-DD), if true returns full ISO datetime
  /** ID of the component */
  id?: string;
  /** Test ID for testing purposes */
  testId?: string;
  /** Label displayed in the trigger button */
  label?: string;
  /** Placeholder when no date is selected */
  placeholder?: string;
  /** Use inline calendar instead of dropdown (legacy mode) */
  inline?: boolean;
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
  showTime = true 
}: { 
  value?: string; 
  onChange: (value: string) => void; 
  className?: string; 
  showTime?: boolean;
}) {
  const selectedDate = value ? new Date(value) : null;
  const [viewDate, setViewDate] = useState(selectedDate || new Date());

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const weekDays = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];

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
        <button
          type="button"
          onClick={handlePrevMonth}
          className="avakio-dp-nav-btn"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div className="avakio-dp-nav-label">
          {monthNames[month]} {year}
        </div>
        <button
          type="button"
          onClick={handleNextMonth}
          className="avakio-dp-nav-btn"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
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
          <button
            key={index}
            type="button"
            onClick={() => handleDateSelect(dayInfo.date)}
            className={cn(
              'avakio-dp-day',
              !dayInfo.isCurrentMonth && 'avakio-dp-day-outside',
              isSelected(dayInfo.date) && 'avakio-dp-day-selected',
              isToday(dayInfo.date) && !isSelected(dayInfo.date) && 'avakio-dp-day-today'
            )}
          >
            {dayInfo.day}
          </button>
        ))}
      </div>

      {/* Time picker */}
      {showTime && (
      <div className="avakio-dp-time">
        <div className="avakio-dp-time-header">
          <Clock className="h-4 w-4" />
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
          <Input
            type="number"
            min="0"
            max="23"
            placeholder="00"
            value={selectedDate ? selectedDate.getHours().toString().padStart(2, '0') : ''}
            onChange={(e) => {
              if (!e.target.value) return;
              const hours = Math.max(0, Math.min(23, parseInt(e.target.value) || 0));
              const minutes = selectedDate ? selectedDate.getMinutes() : 0;
              handleTimeChange(hours, minutes);
            }}
            className="avakio-dp-time-input"
            disabled={!selectedDate}
          />
          <span className="avakio-dp-time-separator">:</span>
          <Input
            type="number"
            min="0"
            max="59"
            placeholder="00"
            value={selectedDate ? selectedDate.getMinutes().toString().padStart(2, '0') : ''}
            onChange={(e) => {
              if (!e.target.value) return;
              const minutes = Math.max(0, Math.min(59, parseInt(e.target.value) || 0));
              const hours = selectedDate ? selectedDate.getHours() : 0;
              handleTimeChange(hours, minutes);
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
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={handleToday}
          className="avakio-dp-action-btn"
        >
          Today
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={handleClear}
          className="avakio-dp-action-btn"
        >
          Clear
        </Button>
      </div>
    </div>
  );
}

// Main exported component - dropdown version by default
export function AvakioDatePicker({ 
  value, 
  onChange, 
  className, 
  showTime = true, 
  id, 
  testId,
  label = "Date",
  placeholder = "Select date",
  inline = false
}: AvakioDatePickerProps) {
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

  const displayValue = formatDisplayDate(value, showTime);

  // If inline mode, render the calendar directly
  if (inline) {
    return (
      <div 
        ref={rootRef}
        id={id} 
        data-testid={testId} 
        className={cn('avakio-dp-inline', className)}
        data-admin-theme={themeAttr || undefined}
      >
        <AvakioDatePickerCalendar 
          value={value} 
          onChange={onChange} 
          showTime={showTime} 
        />
      </div>
    );
  }

  // Dropdown mode (default)
  return (
    <div
      ref={rootRef}
      id={id}
      data-testid={testId}
      className={cn('avakio-dp', className)}
      data-admin-theme={themeAttr || undefined}
    >
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button type="button" className="avakio-dp-trigger">
            <div className="avakio-dp-trigger-label">
              <CalendarIcon size={16} />
              <span>{label}</span>
            </div>
            <div className="avakio-dp-trigger-value">
              {value ? displayValue : <span className="avakio-dp-placeholder">{placeholder}</span>}
            </div>
          </button>
        </PopoverTrigger>
        <PopoverContent
          className="avakio-dp-popover"
          align="start"
          data-admin-theme={themeAttr || undefined}
        >
          <AvakioDatePickerCalendar 
            value={value} 
            onChange={(val) => {
              onChange(val);
              // Auto-close after selection if not showing time
              if (!showTime && val) {
                setOpen(false);
              }
            }} 
            showTime={showTime} 
          />
          <div className="avakio-dp-footer">
            <button 
              type="button" 
              className="avakio-dp-footer-action" 
              onClick={() => {
                onChange('');
                setOpen(false);
              }}
            >
              Clear
            </button>
            <button 
              type="button" 
              className="avakio-dp-footer-action avakio-dp-footer-action-primary" 
              onClick={() => setOpen(false)}
            >
              Done
            </button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}













