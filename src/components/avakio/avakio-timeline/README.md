timeline for milestones and activity feeds. Supports vertical or horizontal layouts with connectors and colored dots.

## Features
- Vertical timeline with connectors and colored status dots
- Titles, subtitles, description, meta text, and time chip
- Click handling per item (row and dot are clickable)
- Theme-aware styles for all admin themes (material, flat, compact, dark, ocean, sunset)
- Optional `dense` mode for tighter spacing
- Two layout styles each for vertical and horizontal (classic and style 2 variants)

## Usage
```tsx
import { AvakioTimeline, AvakioTimelineItem } from "./avakio-timeline";
import "./avakio-timeline.css";

const items: AvakioTimelineItem[] = [
  { id: 1, title: "Kickoff", subtitle: "Project alignment", time: "09:00", status: "info" },
  { id: 2, title: "Design review", subtitle: "Flows v2", time: "11:30", status: "success" },
  { id: 3, title: "Backend sync", subtitle: "API surface", time: "14:00", status: "warning" },
];

<AvakioTimeline
  items={items}
  theme="material"
  onItemClick={(item) => console.log("clicked", item.id)}
/>
<AvakioTimeline
  items={items}
  theme="material"
  orientation="horizontal"
  onItemClick={(item) => console.log("clicked", item.id)}
/>
<AvakioTimeline
  items={items}
  theme="material"
  variant="split" // vertical style 2
  onItemClick={(item) => console.log("clicked", item.id)}
/>
<AvakioTimeline
  items={items}
  theme="material"
  orientation="horizontal"
  variant="colorband" // horizontal style 2
  onItemClick={(item) => console.log("clicked", item.id)}
/>
```

## Props
- `items: AvakioTimelineItem[]` — data to render.
- `theme?: string` — optional theme token (material, flat, compact, dark, ocean, sunset). Inherits from parent `data-admin-theme` when omitted.
- `onItemClick?: (item) => void` — callback when an item (row/dot/card) is clicked.
- `className?: string` — custom class names.
- `style?: React.CSSProperties` — inline styles for the root.
- `dense?: boolean` — tighter spacing.
- `orientation?: "vertical" | "horizontal"` — layout direction (default vertical).
- `variant?: "default" | "split" | "colorband"` — style variants (vertical split centerline; horizontal colorband).

## Item shape
- `id: string | number` — unique key.
- `title: string` — main label.
- `subtitle?: string` — secondary line.
- `description?: string` — body copy.
- `meta?: string` — small, muted line (e.g., date).
- `time?: string` — right-aligned time badge.
- `status?: "success" | "warning" | "danger" | "info" | "neutral" | string` — maps to dot color.
- `color?: string` — overrides dot color.

## Theming
The component reads CSS variables from the host. You can set `data-admin-theme` on a parent or pass `theme` to the component. Theme files define `--tl-surface`, `--tl-border`, `--tl-muted`, `--tl-strong`, `--tl-accent`, `--tl-line`, and shadows per theme.

## Example
See `avakio-timeline-example.tsx` for a ready-to-run demo with theme selector.

