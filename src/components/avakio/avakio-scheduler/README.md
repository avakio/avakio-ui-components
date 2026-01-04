# Avakio Scheduler

A scheduler with month/week/day views, quick navigation, and themed UI.

## Props

- `events?: { id: string; title: string; start: string; end: string; color?: string; }[]` – Event list (ISO times).
- `defaultView?: "month" | "week" | "day"` – Starting view (default `month`).
- `defaultDate?: string` – ISO date to anchor the initial view. Defaults to Oct 1, 2020.
- `userId?: string` – User ID to fetch calendar events for. Automatically appended to the query string.
- `dataUrl?: string` – Deprecated alias of `eventsUrl`.
- `eventsUrl?: string` – Remote endpoint to fetch events (GET). Accepts Avakio shape or legacy `start_date`/`end_date`/`text` fields.
- `loadRemoteOnNavigate?: boolean` – If true, refetch when view/date changes (default false; single fetch otherwise).
- `buildEventsQuery?: ({ start, end, view, userId }) => string` – Build query string for remote fetch (defaults to `?start=..&end=..&userId=..`).
- `fetchOptions?: RequestInit` – Extra fetch options when fetching events.
- `transformEvent?: (raw) => AvakioEvent` – Adapter to map remote payloads into the Avakio shape.
- `mutationUrl?: string` – Fixed endpoint to create/update events (POST by default).
- `buildMutationUrl?: (event, action) => string` – Override mutation target (e.g., include event id).
- `mutationMethod?: "post" | "put" | "patch"` – HTTP verb for create/update (default `post`).
- `onNavigate?: (date: string, view: "month" | "week" | "day") => void` – Fired on prev/next/today navigation.
- `onViewChange?: (view) => void` – Fired when the view changes.
- `onEventClick?: (event) => void` – Fired when an event pill is clicked.
- `onEventCreate?: (event) => void` – Fired when the “New” button is pressed (simple stub event is provided).
- `className?: string` – Optional wrapper class.

## Usage (local data)

```tsx
import { AvakioScheduler } from "./avakio-scheduler";
import "./avakio-scheduler.css";

const events = [
  {
    id: "1",
    title: "Design review",
    start: "2025-01-12T09:00:00.000Z",
    end: "2025-01-12T10:00:00.000Z",
    color: "#1ca1c1",
  },
];

function Example() {
  return (
    <AvakioScheduler
      events={events}
      defaultView="month"
      defaultDate="2026-01-01T00:00:00.000Z"
      userId="user-123"
      eventsUrl="https://your-backend.example.com/scheduler"
      loadRemoteOnNavigate
      buildEventsQuery={({ start, end, userId }) => `?from=${start.toISOString()}&to=${end.toISOString()}&userId=${userId}`}
      transformEvent={(row) => ({
        id: row.id,
        title: row.text,
        start: row.start_date,
        end: row.end_date,
        color: row.color,
      })}
      mutationUrl="https://your-backend.example.com/scheduler"
      mutationMethod="post"
      buildMutationUrl={(evt) => `https://your-backend.example.com/scheduler/${evt.id || "new"}`}
    />
  );
}
```

## Usage (server-backed)

```tsx
import { AvakioScheduler } from "./avakio-scheduler";
import "./avakio-scheduler.css";

// Optionally configure via env so examples don’t break when the API isn’t present
const base = import.meta.env.VITE_SCHEDULER_API_BASE; // e.g. https://api.example.com
const userId = import.meta.env.VITE_SCHEDULER_USER_ID; // the profile owner
const eventsUrl = base && userId ? `${base}/admin/users/${userId}/profile/calendar-events` : undefined;

function Example() {
  return (
    <AvakioScheduler
      defaultView="month"
      defaultDate="2020-10-01T00:00:00.000Z"
      userId={userId}
      eventsUrl={eventsUrl}
      loadRemoteOnNavigate
      buildEventsQuery={({ start, end, userId }) => `?startDate=${start.toISOString()}&endDate=${end.toISOString()}&userId=${userId}`}
      transformEvent={(row) => ({
        id: row.id,
        title: row.title ?? row.text,
        start: row.startTime ?? row.start_date,
        end: row.endTime ?? row.end_date,
        color: row.color,
      })}
      mutationUrl={eventsUrl}
      mutationMethod="post"
      buildMutationUrl={(evt, action) => `${eventsUrl}/${action === "update" ? evt.id : "new"}`}
    />
  );
}
```

## Theming

Scheduler uses the shared `data-admin-theme` tokens: `material`, `flat`, `compact`, `dark`, `ocean`, `sunset`. Apply the attribute on an ancestor or on the component.

