# Avakio Dashboard

A Webix-like dashboard for arranging panels in a grid using `x/y/dx/dy`. Supports drag-and-drop (optional per widget), resizing (optional per widget), themes, and serialize/restore.

## Features

- **Grid layout**: place panels via `x`, `y`, `dx`, `dy`
- **Drag & drop**: enable with `editable`, disable per-widget via `draggable: false`
- **Resize**: optional per-widget via `resizable: true` (with `minDx`/`minDy`)
- **Collision rules**: prevents overlap and out-of-bounds placement
- **Imperative API**: `addWidget`, `removeWidget`, `moveWidget`, `serialize`, `restore`
- **Theme support**: 6 themes (material, flat, compact, dark, ocean, sunset)

## Installation

```tsx
import { AvakioDashboard } from '@/components/avakio/ui-widgets/avakio-dashboard';
```

## Basic Usage

```tsx
import { useState } from 'react';
import { AvakioDashboard, AvakioDashboardWidget } from './avakio-dashboard';

const initial: AvakioDashboardWidget[] = [
  { id: 'a', x: 0, y: 0, dx: 2, dy: 1, header: 'Revenue', body: '...' },
  { id: 'b', x: 2, y: 0, dx: 2, dy: 2, header: 'Pipeline', body: '...' },
];

export function MyDashboard() {
  const [widgets, setWidgets] = useState(initial);

  return (
    <AvakioDashboard
      gridColumns={4}
      gridRows={3}
      cellMargin={10}
      height={480}
      widgets={widgets}
      editable
      dragHandle="header"
      onChange={setWidgets}
    />
  );
}
```

## Widget Model

```ts
export interface AvakioDashboardWidget {
  id: string;
  x: number;
  y: number;
  dx?: number;
  dy?: number;

  header?: React.ReactNode;
  icon?: React.ReactNode;
  body?: React.ReactNode;

  draggable?: boolean;
  resizable?: boolean;
  minDx?: number;
  minDy?: number;

  className?: string;
  style?: React.CSSProperties;
}
```

## Imperative API

```tsx
import { useRef } from 'react';
import type { AvakioDashboardRef } from './avakio-dashboard';

const ref = useRef<AvakioDashboardRef>(null);

ref.current?.addWidget({ id: 'x', x: 0, y: 0, dx: 1, dy: 1, header: 'New' });
ref.current?.removeWidget('x');
ref.current?.moveWidget('x', { x: 1, y: 1, dx: 2, dy: 1 });

const layout = ref.current?.serialize();
ref.current?.restore(layout ?? []);
```

## Notes

- `widgets` is treated as the source of truth; use `onChange` to keep parent state in sync.
- When `dragHandle="header"`, dragging is restricted to the header area.
- Resizing uses grid units (`dx`/`dy`) and respects `gridColumns`/`gridRows` bounds.
