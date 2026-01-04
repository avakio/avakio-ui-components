import React, { useMemo, useState } from "react";
import "./avakio-scheduler.css";
import "./avakio-scheduler-example.css";
import { AvakioScheduler, AvakioEvent } from "./avakio-scheduler";

export function AvakioSchedulerExample() {
  const [theme, setTheme] = useState<string>("material");
  const schedulerApiBase = import.meta.env.VITE_SCHEDULER_API_BASE as string | undefined;
  const schedulerUserId = import.meta.env.VITE_SCHEDULER_USER_ID as string | undefined;
  const eventsUrl = schedulerApiBase && schedulerUserId
    ? `${schedulerApiBase}/admin/users/${schedulerUserId}/profile/calendar-events`
    : undefined;
  const [events, setEvents] = useState<AvakioEvent[]>([]);

  const addEvent = (evt: AvakioEvent) => {
    setEvents((prev) => [...prev, evt]);
  };

  const handleEventClick = (evt: AvakioEvent) => {
    alert(`Event: ${evt.title}\n${evt.start} → ${evt.end}`);
  };

  const today = useMemo(() => new Date().toISOString(), []);

  return (
    <div
      className="min-h-screen p-8"
      data-admin-theme={theme}
      style={{
        background: theme === "dark" ? "hsl(222, 47%, 11%)" : "#f8fafc",
        color: theme === "dark" ? "hsl(210, 40%, 96%)" : "#0f172a",
      }}
    >
      <div className="sch-demo-meta" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 24 }}>Avakio Scheduler</h2>
          <p className="sch-demo-meta">scheduler with month/week/day views and theme tokens.</p>
        </div>
        <select className="sch-theme-select" value={theme} onChange={(e) => setTheme(e.target.value)}>
          {["material", "flat", "compact", "dark", "ocean", "sunset"].map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div className="sch-demo-grid">
        <div className="sch-demo-card" style={{ gridColumn: "1 / -1" }}>
          <h4>Scheduler</h4>
          <p className="sch-demo-meta">Switch between Month / Week / Day, navigate, and add quick events.</p>
          <AvakioScheduler
            events={events}
            defaultView="month"
            defaultDate={today}
            theme={theme}
            userId="c442fc68-1f91-4a28-b2ba-e6ff69ad4089"
            eventsUrl={eventsUrl || " /api/test/calendar-events"}
            loadRemoteOnNavigate = {true}
            buildEventsQuery={({ start, end, userId }) => `?from=${start.toISOString()}&to=${end.toISOString()}&userId=${userId}`}
            transformEvent={(row) => ({
              id: String(row.id),
              title: row.title || row.text,
              start: row.startTime || row.start_date,
              end: row.endTime || row.end_date,
              color: row.color,
            })}
            mutationUrl={eventsUrl}
            mutationMethod="post"
            buildMutationUrl={(evt) => (eventsUrl ? `${eventsUrl}/${evt.id || "new"}` : "")}
            onEventClick={handleEventClick}
            onEventCreate={addEvent}
          />
          <div className="sch-chip">Events: {events.length}</div>
        </div>
      </div>
    </div>
  );
}

export default AvakioSchedulerExample;









