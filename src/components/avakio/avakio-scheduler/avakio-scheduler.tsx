import React, { useEffect, useMemo, useState } from "react";
import "./avakio-scheduler.css";
import { AvakioPopup } from "../avakio-popup/avakio-popup";
import "../avakio-popup/avakio-popup.css";
import { AvakioCalendar, AvakioCalendarMarker } from "../ui-controls/avakio-calendar/avakio-calendar";

function startOfWeek(date: Date) {
  const d = new Date(date);
  const day = (d.getDay() + 6) % 7; // Monday as start
  d.setDate(d.getDate() - day);
  d.setHours(0, 0, 0, 0);
  return d;
}

function addDays(date: Date, days: number) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function formatDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function parseDateKey(key: string) {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function formatTime(date: Date) {
  return date.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
}

function formatDay(date: Date) {
  return date.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });
}

export type AvakioEvent = {
  id: string;
  title: string;
  start: string; // ISO string
  end: string;   // ISO string
  color?: string;
};

export type AvakioSchedulerView = "month" | "week" | "day";

export interface AvakioSchedulerProps {
  events?: AvakioEvent[];
  defaultView?: AvakioSchedulerView;
  defaultDate?: string; // ISO date to anchor the view
  theme?: string; // optional theme token forwarded to popup overlays
  userId?: string; // user ID to fetch calendar events for
  dataUrl?: string; // deprecated alias for eventsUrl
  eventsUrl?: string; // optional remote source for fetching events
  loadRemoteOnNavigate?: boolean; // refetch when view/anchor changes
  fetchOptions?: RequestInit; // custom fetch options
  transformEvent?: (raw: any) => AvakioEvent; // adapter for remote payload
  buildEventsQuery?: (range: { start: Date; end: Date; view: AvakioSchedulerView; userId?: string }) => string; // build query string
  mutationUrl?: string; // fixed endpoint for creating/updating events (POST by default)
  buildMutationUrl?: (event: AvakioEvent, action: "create" | "update") => string; // override mutation target
  mutationMethod?: "post" | "put" | "patch"; // HTTP verb for create/update
  onNavigate?: (date: string, view: AvakioSchedulerView) => void;
  onViewChange?: (view: AvakioSchedulerView) => void;
  onEventClick?: (event: AvakioEvent) => void;
  onEventCreate?: (event: AvakioEvent) => void;
  className?: string;
  /** ID of the component */
  id?: string;
  /** Test ID for testing purposes */
  testId?: string;
}
export function AvakioScheduler({
  events = [],
  defaultView = "month",
  defaultDate,
  theme,
  userId,
  dataUrl,
  eventsUrl,
  loadRemoteOnNavigate,
  fetchOptions,
  transformEvent,
  buildEventsQuery,
  mutationUrl,
  buildMutationUrl,
  mutationMethod = "post",
  onNavigate,
  onViewChange,
  onEventClick,
  onEventCreate,
  className,
  id,
  testId,
}: AvakioSchedulerProps) {
  const [view, setView] = useState<AvakioSchedulerView>(defaultView);
  const [anchor, setAnchor] = useState<Date>(
    defaultDate ? new Date(defaultDate) : new Date(2020, 9, 1)
  );
  const [selectedDateKey, setSelectedDateKey] = useState<string>(formatDateKey(defaultDate ? new Date(defaultDate) : new Date()));
  const [isMobile, setIsMobile] = useState(false);
  const [remoteEvents, setRemoteEvents] = useState<AvakioEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasFetchedOnce, setHasFetchedOnce] = useState(false);
  const [morePopup, setMorePopup] = useState<{ dateKey: string; anchorRect: DOMRect | null } | null>(null);

  const eventsEndpoint = eventsUrl || dataUrl;

  const rangeForView = (currentView: AvakioSchedulerView, currentAnchor: Date) => {
    if (currentView === "month") {
      const start = startOfWeek(new Date(currentAnchor.getFullYear(), currentAnchor.getMonth(), 1));
      const end = addDays(start, 42);
      return { start, end };
    }
    if (currentView === "week") {
      const start = startOfWeek(currentAnchor);
      const end = addDays(start, 7);
      return { start, end };
    }
    const start = new Date(currentAnchor);
    start.setHours(0, 0, 0, 0);
    const end = addDays(start, 1);
    return { start, end };
  };

  useEffect(() => {
    if (!eventsEndpoint) return;
    if (!loadRemoteOnNavigate && hasFetchedOnce) return;
    let cancelled = false;
    setLoading(true);
    setError(null);

    const { start, end } = rangeForView(view, anchor);
    const query = buildEventsQuery
      ? buildEventsQuery({ start, end, view, userId })
      : `?start=${start.toISOString()}&end=${end.toISOString()}${userId ? `&userId=${userId}` : ''}`;
    const url = eventsEndpoint + query;

    const mapEvent = (raw: any): AvakioEvent => {
      if (transformEvent) return transformEvent(raw);
      const hasLegacyShape = raw.start_date && raw.end_date;
      const start = hasLegacyShape ? new Date(raw.start_date) : new Date(raw.start || raw.startDate || raw.date);
      const end = hasLegacyShape ? new Date(raw.end_date) : new Date(raw.end || raw.endDate || raw.finish || raw.finishDate || start);
      return {
        id: String(raw.id ?? raw._id ?? `${start?.toISOString() || "evt"}-${Math.random()}`),
        title: raw.title || raw.text || "Event",
        start: start?.toISOString(),
        end: end?.toISOString(),
        color: raw.color,
      };
    };

    fetch(url, fetchOptions)
      .then(async (res) => {
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
        const json = await res.json();
        const payload = Array.isArray(json)
          ? json
          : Array.isArray((json as any).data)
            ? (json as any).data
            : Array.isArray((json as any).events)
              ? (json as any).events
              : [];
        const mapped = payload.map(mapEvent).filter((e: AvakioEvent) => e.start && e.end);
        if (!cancelled) {
          setRemoteEvents(mapped);
          setHasFetchedOnce(true);
        }
      })
      .catch((err: Error) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [eventsEndpoint, loadRemoteOnNavigate, view, anchor, userId, fetchOptions, transformEvent, buildEventsQuery, hasFetchedOnce]);

  // Track mobile viewport
  useEffect(() => {
    const detect = () => {
      if (typeof window === "undefined") return false;
      return window.innerWidth <= 768;
    };
    setIsMobile(detect());
    const onResize = () => setIsMobile(detect());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Keep selected date aligned with anchor changes
  useEffect(() => {
    setSelectedDateKey(formatDateKey(anchor));
  }, [anchor]);

  const monthGrid = useMemo(() => {
    const first = new Date(anchor.getFullYear(), anchor.getMonth(), 1);
    const start = startOfWeek(first);
    const cells: Date[] = [];
    for (let i = 0; i < 42; i++) cells.push(addDays(start, i));
    return cells;
  }, [anchor]);

  const weekGrid = useMemo(() => {
    const start = startOfWeek(anchor);
    return Array.from({ length: 7 }, (_, i) => addDays(start, i));
  }, [anchor]);

  const dayGrid = useMemo(() => [anchor], [anchor]);

  const filteredEvents = useMemo(() => {
    const merged = [...remoteEvents, ...events];
    return merged.map((e) => ({ ...e, _start: new Date(e.start), _end: new Date(e.end) }));
  }, [events, remoteEvents]);

  const selectedDate = useMemo(() => parseDateKey(selectedDateKey), [selectedDateKey]);

  const monthAgenda = useMemo(() => {
    if (view !== "month") return [] as typeof filteredEvents;
    return [...filteredEvents]
      .filter((e) => e._start.getMonth() === anchor.getMonth() && e._start.getFullYear() === anchor.getFullYear())
      .sort((a, b) => a._start.getTime() - b._start.getTime());
  }, [view, filteredEvents, anchor]);

  const visibleEvents = useMemo(() => {
    if (view === "month") {
      const start = monthGrid[0];
      const end = addDays(monthGrid[monthGrid.length - 1], 1);
      return filteredEvents.filter((e) => e._start < end && e._end >= start);
    }
    if (view === "week") {
      const start = weekGrid[0];
      const end = addDays(weekGrid[weekGrid.length - 1], 1);
      return filteredEvents.filter((e) => e._start < end && e._end >= start);
    }
    return filteredEvents.filter((e) => {
      const d = dayGrid[0];
      return e._start.toDateString() === d.toDateString();
    });
  }, [view, monthGrid, weekGrid, dayGrid, filteredEvents]);

  const go = (delta: number) => {
    let next = new Date(anchor);
    if (view === "month") next = new Date(anchor.getFullYear(), anchor.getMonth() + delta, 1);
    if (view === "week") next = addDays(anchor, delta * 7);
    if (view === "day") next = addDays(anchor, delta);
    setAnchor(next);
    onNavigate?.(next.toISOString(), view);
  };

  const changeView = (next: AvakioSchedulerView) => {
    setView(next);
    onViewChange?.(next);
  };

  const createEvent = () => {
    const start = new Date(anchor);
    const end = addDays(start, 0);
    start.setHours(9, 0, 0, 0);
    end.setHours(10, 0, 0, 0);
    const evt: AvakioEvent = {
      id: `${Date.now()}`,
      title: "New event",
      start: start.toISOString(),
      end: end.toISOString(),
    };

    const maybePersist = async () => {
      if (!mutationUrl) return onEventCreate?.(evt);
      const target = buildMutationUrl ? buildMutationUrl(evt, "create") : mutationUrl;
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(target, {
          method: mutationMethod,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(evt),
        });
        if (!res.ok) throw new Error(`Failed to save event: ${res.status}`);
        const saved = await res.json();
        const mapped = transformEvent ? transformEvent(saved) : saved;
        setRemoteEvents((prev) => [...prev, mapped]);
        onEventCreate?.(mapped);
      } catch (err: any) {
        setError(err.message || "Failed to save event");
      } finally {
        setLoading(false);
      }
    };

    void maybePersist();
  };

  const eventsForDay = (date: Date) => visibleEvents.filter((e) => e._start.toDateString() === date.toDateString());
  const eventsForDayKey = (dateKey: string) => visibleEvents.filter((e) => e._start.toDateString() === dateKey);
  const eventsForDateKey = (dateKey: string) => visibleEvents.filter((e) => formatDateKey(e._start) === dateKey);

  const mobileMarkers: AvakioCalendarMarker[] = useMemo(
    () =>
      visibleEvents.map((e) => ({
        date: formatDateKey(e._start),
        color: e.color,
        text: e.title,
      })),
    [visibleEvents]
  );

  const selectedDateEvents = useMemo(() => eventsForDateKey(selectedDateKey), [selectedDateKey, visibleEvents]);

  const renderEventPill = (e: any) => (
    <div
      key={e.id}
      className="avakio-sch-event"
      style={{ background: e.color || "var(--sch-primary)" }}
      onClick={() => onEventClick?.(e)}
    >
      <div className="avakio-sch-event-title">{e.title}</div>
      <div className="avakio-sch-event-time">
        {formatTime(e._start)} – {formatTime(e._end)}
      </div>
    </div>
  );

  const renderEventsForDay = (date: Date) => {
    const events = eventsForDay(date).sort((a, b) => a._start.getTime() - b._start.getTime());
    if (!events.length) return <div className="avakio-sch-mobile-empty">No events</div>;
    return events.map((evt) => renderEventPill(evt));
  };

  return (
    <div id={id} data-testid={testId} className={["avakio-scheduler", className || ""].join(" ")}>
      <div className="avakio-sch-toolbar">
        <div className="avakio-sch-nav">
          <button onClick={() => go(-1)} className="avakio-sch-btn">Prev</button>
          <button onClick={() => setAnchor(new Date())} className="avakio-sch-btn">Today</button>
          <button onClick={() => go(1)} className="avakio-sch-btn">Next</button>
        </div>
        <div className="avakio-sch-title">
          {anchor.toLocaleString(undefined, { month: "long", year: "numeric", day: view === "day" ? "numeric" : undefined })}
        </div>
        <div className="avakio-sch-views">
          <button onClick={() => changeView("month")} className={`avakio-sch-btn ${view === "month" ? "is-active" : ""}`}>Month</button>
          <button onClick={() => changeView("week")} className={`avakio-sch-btn ${view === "week" ? "is-active" : ""}`}>Week</button>
          <button onClick={() => changeView("day")} className={`avakio-sch-btn ${view === "day" ? "is-active" : ""}`}>Day</button>
          <button onClick={createEvent} className="avakio-sch-btn">New</button>
        </div>
        {loading && <div className="avakio-sch-status">Loading remote events…</div>}
        {error && <div className="avakio-sch-status is-error">{error}</div>}
      </div>

      {view === "month" && isMobile && (
        <div className="avakio-sch-month-mobile">
          <AvakioCalendar
            value={selectedDateKey}
            onChange={(val) => {
              const nextKey = Array.isArray(val) ? val[0] : val;
              if (!nextKey) return;
              setSelectedDateKey(nextKey);
              setAnchor(parseDateKey(nextKey));
            }}
            onMonthChange={(date) => setAnchor(date)}
            markers={mobileMarkers}
            weekStart={1}
          />

          <div className="avakio-sch-mobile-events">
            <div className="avakio-sch-mobile-events-header">
              {formatDay(selectedDate)} — {selectedDateEvents.length} event{selectedDateEvents.length === 1 ? "" : "s"}
            </div>
            <div className="avakio-sch-mobile-list">
              {selectedDateEvents.length === 0 && <div className="avakio-sch-mobile-empty">No events for this date.</div>}
              {selectedDateEvents
                .slice()
                .sort((a, b) => a._start.getTime() - b._start.getTime())
                .map((evt) => (
                  <div
                    key={evt.id}
                    className="avakio-sch-mobile-item"
                    onClick={() => onEventClick?.(evt)}
                  >
                    <span className="avakio-sch-dot" style={{ background: evt.color || "var(--sch-primary)" }} />
                    <div className="avakio-sch-mobile-meta">
                      <div className="avakio-sch-mobile-title">{evt.title}</div>
                      <div className="avakio-sch-mobile-time">
                        {formatTime(evt._start)} – {formatTime(evt._end)}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {view === "month" && !isMobile && (
        <div className="avakio-sch-month">
          <div className="avakio-sch-weekdays">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
              <div key={d} className="avakio-sch-weekday">{d}</div>
            ))}
          </div>
          <div className="avakio-sch-grid">
            {monthGrid.map((d) => (
              <div key={d.toISOString()} className={`avakio-sch-cell ${d.getMonth() === anchor.getMonth() ? "" : "is-out"}`}>
                <div className="avakio-sch-cell-date">
                  <span>{d.getDate()}</span>
                  {eventsForDay(d).length > 1 && (
                    <button
                      className="avakio-sch-more-btn"
                      onClick={(e) =>
                        setMorePopup({
                          dateKey: d.toDateString(),
                          anchorRect: (e.currentTarget as HTMLButtonElement).getBoundingClientRect(),
                        })
                      }
                      title={`${eventsForDay(d).length - 1} more`}
                    >
                      {eventsForDay(d).length - 1} more
                    </button>
                  )}
                </div>
                <div className="avakio-sch-cell-events">
                  {eventsForDay(d)
                    .slice(0, 1)
                    .map((evt) => renderEventPill(evt))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {view === "month" && !isMobile && monthAgenda.length > 0 && (
        <div className="avakio-sch-month-agenda">
          {monthAgenda.map((evt) => (
            <div
              key={evt.id}
              className="avakio-sch-agenda-item"
              onClick={() => onEventClick?.(evt)}
            >
              <div className="avakio-sch-agenda-time">
                <div>{formatTime(evt._start)}</div>
                <div className="avakio-sch-agenda-time-end">{formatTime(evt._end)}</div>
              </div>
              <span className="avakio-sch-dot" style={{ background: evt.color || "var(--sch-primary)" }} />
              <div className="avakio-sch-agenda-meta">
                <div className="avakio-sch-agenda-title">{evt.title}</div>
                <div className="avakio-sch-agenda-date">
                  {evt._start.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" })}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {morePopup && (
        <AvakioPopup
          open
          anchorRect={morePopup.anchorRect || undefined}
          offset={{ y: 6 }}
          theme={theme}
          closeOnOutside
          closeOnEsc
          onClose={() => setMorePopup(null)}
        >
          <h4>Other events</h4>
          <div className="avakio-sch-more-list">
            {eventsForDayKey(morePopup.dateKey)
              .slice(1)
              .map((evt) => (
                <div
                  key={evt.id}
                  className="avakio-sch-more-item"
                  onClick={() => onEventClick?.(evt)}
                >
                  <span className="avakio-sch-dot" style={{ background: evt.color || "var(--sch-primary)" }} />
                  <div className="avakio-sch-more-meta">
                    <div className="avakio-sch-more-title">{evt.title}</div>
                    <div className="avakio-sch-more-time">
                      {formatTime(evt._start)} – {formatTime(evt._end)}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </AvakioPopup>
      )}

      {view === "week" && (
        <div className="avakio-sch-week">
          <div className="avakio-sch-week-row">
            {weekGrid.map((d) => (
              <div key={d.toISOString()} className="avakio-sch-daycol">
                <div className="avakio-sch-day-header">{formatDay(d)}</div>
                <div className="avakio-sch-day-events">{renderEventsForDay(d)}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {view === "day" && (
        <div className="avakio-sch-day">
          <div className="avakio-sch-day-header">{formatDay(dayGrid[0])}</div>
          <div className="avakio-sch-day-events">{renderEventsForDay(dayGrid[0])}</div>
        </div>
      )}
    </div>
  );
}








