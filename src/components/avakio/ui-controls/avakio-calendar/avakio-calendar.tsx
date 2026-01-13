import React, { useState, useMemo, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { AvakioChangeEvent } from '../../base/avakio-base-props';
import './avakio-calendar.css';

export type AvakioCalendarMode = 'single' | 'multiple' | 'range';

export interface AvakioCalendarMarker {
  date: string; // ISO date string
  color?: string;
  text?: string;
}

export interface AvakioCalendarProps {
  value?: string | string[]; // ISO date string(s)
  /** Callback fired when the value changes. Receives { id, value } */
  onChange?: (event: AvakioChangeEvent<string | string[]>) => void;
  mode?: AvakioCalendarMode;
  minDate?: string; // ISO date string
  maxDate?: string; // ISO date string
  disabledDates?: string[]; // Array of ISO date strings
  markers?: AvakioCalendarMarker[]; // Event indicators
  showWeekNumbers?: boolean;
  monthsToShow?: number; // Display multiple months (1-3)
  weekStart?: 0 | 1; // 0 = Sunday, 1 = Monday
  className?: string;
  onMonthChange?: (date: Date) => void;
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
  /** Custom inline styles for the root element */
  style?: React.CSSProperties;
}

function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

function formatDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function parseDate(str: string): Date {
  // Parse as local date to avoid timezone shifts
  const [year, month, day] = str.split('-').map(Number);
  return new Date(year, month - 1, day);
}

export function AvakioCalendar({
  value,
  onChange,
  mode = 'single',
  minDate,
  maxDate,
  disabledDates = [],
  markers = [],
  showWeekNumbers = false,
  monthsToShow = 1,
  weekStart = 0,
  className = '',
  onMonthChange,
  id,
  testId,
  minWidth,
  minHeight,
  style,
}: AvakioCalendarProps) {
  // Initialize view to the first selected date's month, or today if no selection
  const getInitialViewDate = () => {
    if (value) {
      const firstDate = Array.isArray(value) ? value[0] : value;
      if (firstDate && firstDate.trim()) {
        return parseDate(firstDate);
      }
    }
    return new Date();
  };

  const [viewDate, setViewDate] = useState(getInitialViewDate);
  
  // Clamp monthsToShow between 1 and 3
  const safeMonthsToShow = Math.max(1, Math.min(3, monthsToShow));

  // Update viewDate when value prop changes to a different month
  useEffect(() => {
    if (value) {
      const firstDate = Array.isArray(value) ? value[0] : value;
      if (firstDate && firstDate.trim()) {
        const selectedDate = parseDate(firstDate);
        // Only update if the selected date is in a different month than current view
        if (selectedDate.getFullYear() !== viewDate.getFullYear() ||
            selectedDate.getMonth() !== viewDate.getMonth()) {
          setViewDate(selectedDate);
        }
      }
    }
  }, [value]); // Only depend on value, not viewDate to avoid loops

  const selectedDates = useMemo(() => {
    if (!value) return [];
    const dates = Array.isArray(value) ? value : [value];
    // Filter out empty strings before parsing
    return dates.filter(d => d && d.trim()).map(parseDate);
  }, [value]);

  const disabledDatesSet = useMemo(() => {
    return new Set(disabledDates);
  }, [disabledDates]);

  const markersByDate = useMemo(() => {
    const map = new Map<string, AvakioCalendarMarker[]>();
    markers.forEach(marker => {
      // Ensure we always use YYYY-MM-DD format (remove time if present)
      const key = marker.date.includes('T') ? marker.date.split('T')[0] : marker.date;
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(marker);
    });
    return map;
  }, [markers]);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const weekDays = weekStart === 0
    ? ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const getMonthGrid = (baseDate: Date) => {
    const year = baseDate.getFullYear();
    const month = baseDate.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    let startDay = firstDay.getDay();
    if (weekStart === 1) {
      startDay = startDay === 0 ? 6 : startDay - 1;
    }
    
    const daysInMonth = lastDay.getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();
    
    const days: Array<{
      date: Date;
      isCurrentMonth: boolean;
      weekNumber?: number;
    }> = [];
    
    // Previous month days
    for (let i = startDay - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month - 1, daysInPrevMonth - i),
        isCurrentMonth: false,
      });
    }
    
    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      days.push({
        date,
        isCurrentMonth: true,
        weekNumber: showWeekNumbers ? getWeekNumber(date) : undefined,
      });
    }
    
    // Next month days to fill grid
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false,
      });
    }
    
    return days;
  };

  const getWeekNumber = (date: Date): number => {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
  };

  const isDateDisabled = (date: Date): boolean => {
    const key = formatDateKey(date);
    if (disabledDatesSet.has(key)) return true;
    
    // Compare dates only (ignore time)
    if (minDate) {
      const min = parseDate(minDate);
      if (date.getFullYear() < min.getFullYear() ||
          (date.getFullYear() === min.getFullYear() && date.getMonth() < min.getMonth()) ||
          (date.getFullYear() === min.getFullYear() && date.getMonth() === min.getMonth() && date.getDate() < min.getDate())) {
        return true;
      }
    }
    
    if (maxDate) {
      const max = parseDate(maxDate);
      if (date.getFullYear() > max.getFullYear() ||
          (date.getFullYear() === max.getFullYear() && date.getMonth() > max.getMonth()) ||
          (date.getFullYear() === max.getFullYear() && date.getMonth() === max.getMonth() && date.getDate() > max.getDate())) {
        return true;
      }
    }
    
    return false;
  };

  const isDateSelected = (date: Date): boolean => {
    return selectedDates.some(selected => isSameDay(selected, date));
  };

  const isDateInRange = (date: Date): boolean => {
    if (mode !== 'range' || selectedDates.length !== 2) return false;
    const [start, end] = selectedDates.sort((a, b) => a.getTime() - b.getTime());
    return date > start && date < end;
  };

  const handleDateClick = (date: Date) => {
    if (isDateDisabled(date)) return;

    const dateKey = formatDateKey(date);

    if (mode === 'single') {
      // Allow deselecting by clicking the same date
      const currentValue = typeof value === 'string' ? value : '';
      onChange?.({ id: id || '0', value: currentValue === dateKey ? '' : dateKey });
    } else if (mode === 'multiple') {
      const currentDates = Array.isArray(value) ? value : value ? [value] : [];
      const exists = currentDates.includes(dateKey);
      const newDates = exists
        ? currentDates.filter(d => d !== dateKey)
        : [...currentDates, dateKey];
      onChange?.({ id: id || '0', value: newDates });
    } else if (mode === 'range') {
      // Normalize current range to an array for safety
      const currentRange = Array.isArray(value) ? value : value ? [value] : [];

      if (currentRange.length === 0 || currentRange.length === 2) {
        // Start new range
        onChange?.({ id: id || '0', value: [dateKey] });
      } else if (currentRange.length === 1) {
        // Complete range - if same date clicked, clear selection
        if (currentRange[0] === dateKey) {
          onChange?.({ id: id || '0', value: [] });
        } else {
          const sorted = [currentRange[0], dateKey].sort();
          onChange?.({ id: id || '0', value: sorted });
        }
      }
    }
  };

  const handlePrevMonth = () => {
    const newDate = new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1);
    setViewDate(newDate);
    onMonthChange?.(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1);
    setViewDate(newDate);
    onMonthChange?.(newDate);
  };

  const handleToday = () => {
    const today = new Date();
    setViewDate(today);
    onMonthChange?.(today);
    
    // Also select today's date
    const todayKey = formatDateKey(today);
    if (mode === 'single') {
      onChange?.({ id: id || '0', value: todayKey });
    } else if (mode === 'multiple') {
      const currentDates = Array.isArray(value) ? value : value ? [value] : [];
      if (!currentDates.includes(todayKey)) {
        onChange?.({ id: id || '0', value: [...currentDates, todayKey] });
      }
    } else if (mode === 'range') {
      onChange?.({ id: id || '0', value: [todayKey] });
    }
  };

  const renderMonth = (monthOffset: number) => {
    const displayDate = new Date(viewDate.getFullYear(), viewDate.getMonth() + monthOffset, 1);
    const days = getMonthGrid(displayDate);
    const today = new Date();

    return (
      <div key={monthOffset} className="avakio-cal-month">
        <div className="avakio-cal-header">
          {monthOffset === 0 && safeMonthsToShow === 1 && (
            <button
              type="button"
              className="avakio-cal-nav-btn"
              onClick={handlePrevMonth}
            >
              <ChevronLeft size={16} />
            </button>
          )}
          <div className="avakio-cal-title">
            {monthNames[displayDate.getMonth()]} {displayDate.getFullYear()}
          </div>
          {monthOffset === monthsToShow - 1 && safeMonthsToShow === 1 && (
            <button
              type="button"
              className="avakio-cal-nav-btn"
              onClick={handleNextMonth}
            >
              <ChevronRight size={16} />
            </button>
          )}
        </div>

        <div className={`avakio-cal-weekdays ${showWeekNumbers ? 'avakio-cal-with-week-nums' : ''}`}>
          {showWeekNumbers && <div className="avakio-cal-weekday avakio-cal-week-num-header">#</div>}
          {weekDays.map(day => (
            <div key={day} className="avakio-cal-weekday">
              {day}
            </div>
          ))}
        </div>

        <div className={`avakio-cal-grid ${showWeekNumbers ? 'avakio-cal-with-week-nums' : ''}`}>
          {days.map((dayInfo, index) => {
            const isSelected = isDateSelected(dayInfo.date);
            const isToday = isSameDay(dayInfo.date, today);
            const isDisabled = isDateDisabled(dayInfo.date);
            const isInRange = isDateInRange(dayInfo.date);
            const dateKey = formatDateKey(dayInfo.date);
            const dayMarkers = markersByDate.get(dateKey) || [];
            const showWeekNum = showWeekNumbers && index % 7 === 0;
            const uniqueKey = `${dateKey}-${index}`;
            const displayWeekNumber = showWeekNum
              ? (dayInfo.weekNumber ?? getWeekNumber(dayInfo.date))
              : undefined;

            return (
              <React.Fragment key={uniqueKey}>
                {showWeekNum && (
                  <div className="avakio-cal-week-num">
                    {displayWeekNumber}
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => handleDateClick(dayInfo.date)}
                  disabled={isDisabled}
                  className={`avakio-cal-day ${
                    !dayInfo.isCurrentMonth ? 'avakio-cal-day-outside' : ''
                  } ${isSelected ? 'avakio-cal-day-selected' : ''} ${
                    isToday ? 'avakio-cal-day-today' : ''
                  } ${isDisabled ? 'avakio-cal-day-disabled' : ''} ${
                    isInRange ? 'avakio-cal-day-in-range' : ''
                  }`}
                >
                  <span className="avakio-cal-day-number">{dayInfo.date.getDate()}</span>
                  {dayMarkers.length > 0 && (
                    <div className="avakio-cal-markers">
                      {dayMarkers.slice(0, 3).map((marker, idx) => (
                        <span
                          key={`marker-${uniqueKey}-${idx}`}
                          className="avakio-cal-marker"
                          style={{ backgroundColor: marker.color || '#3b82f6' }}
                          title={marker.text}
                        />
                      ))}
                    </div>
                  )}
                </button>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div id={id} data-testid={testId} className={`avakio-calendar ${className}`} style={style}>
      {safeMonthsToShow > 1 && (
        <div className="avakio-cal-multi-nav">
          <button
            type="button"
            className="avakio-cal-nav-btn"
            onClick={handlePrevMonth}
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            className="avakio-cal-today-btn"
            onClick={handleToday}
          >
            Today
          </button>
          <button
            type="button"
            className="avakio-cal-nav-btn"
            onClick={handleNextMonth}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}
      
      <div className={`avakio-cal-months avakio-cal-months-${safeMonthsToShow}`}>
        {Array.from({ length: safeMonthsToShow }, (_, i) => renderMonth(i))}
      </div>

      {safeMonthsToShow === 1 && (
        <div className="avakio-cal-footer">
          <button
            type="button"
            className="avakio-cal-today-btn"
            onClick={handleToday}
          >
            Today
          </button>
        </div>
      )}
    </div>
  );
}








