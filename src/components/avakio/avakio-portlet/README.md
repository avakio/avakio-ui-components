# Avakio Portlet

A lightweight portlet board  Provides drag-and-drop cards across columns with theme-aware styling.

## Usage

```tsx
import { AvakioPortletBoard } from "@/components/avakio/avakio-portlet/avakio-portlet";

const columns = [
  { id: "todo", title: "To Do" },
  { id: "done", title: "Done" },
];

const items = [
  { id: "a", title: "Task A", content: "Alpha", columnId: "todo" },
  { id: "b", title: "Task B", content: "Beta", columnId: "done" },
];

<AvakioPortletBoard
  columns={columns}
  items={items}
  onMove={(id, col) => console.log("moved", id, col)}
  theme="material"
/>;
```

## Props

- `columns`: array of `{ id, title }`.
- `items`: array of `{ id, title, content, columnId }`.
- `onMove`: callback when a card is dropped into a column `(itemId, toColumnId)`.
- `theme`: one of `material | flat | compact | dark | ocean | sunset` (applies via `data-admin-theme`).
- `className`, `style`: optional passthrough props.

## Themes

`avakio-portlet.css` defines tokens for all Avakio themes: material, flat, compact, dark, ocean, sunset. The board reacts to `data-admin-theme` on itself or an ancestor.

## Example

See `avakio-portlet-example.tsx` for a theme selector and live drag/drop between columns.

## Testing

`avakio-portlet.test.tsx` covers rendering and drag-drop callback behavior using HTML5 drag events.

