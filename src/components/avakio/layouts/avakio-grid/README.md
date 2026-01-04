# AvakioGrid

A grid-based layout component that enables placing elements into columns and rows using grid cells. 

## Overview

`AvakioGrid` creates a grid layout where cells can be positioned at specific coordinates and span multiple columns/rows. The grid automatically calculates cell sizes based on the container dimensions or uses fixed sizes if specified.

## Installation

```tsx
import { AvakioGrid, AvakioGridRef, AvakioGridCell } from '@/components/avakio/layouts/avakio-grid/avakio-grid';
import '@/components/avakio/layouts/avakio-grid/avakio-grid.css';
```

## Basic Usage

```tsx
import { AvakioGrid, AvakioGridCell } from './avakio-grid';

const cells: AvakioGridCell[] = [
  { id: 'a', x: 0, y: 0, dx: 1, dy: 1, content: <div>Cell A</div> },
  { id: 'b', x: 1, y: 0, dx: 2, dy: 1, content: <div>Cell B (Wide)</div> },
  { id: 'c', x: 0, y: 1, dx: 2, dy: 2, content: <div>Cell C (Large)</div> },
  { id: 'd', x: 2, y: 1, dx: 1, dy: 1, content: <div>Cell D</div> },
];

function MyComponent() {
  return (
    <AvakioGrid
      id="my-grid"
      gridColumns={3}
      gridRows={3}
      cells={cells}
      width="100%"
      height={400}
    />
  );
}
```

## API Reference

### Props

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `id` | `string` | - | Unique identifier for the grid |
| `testId` | `string` | - | Test ID for testing purposes |
| `cells` | `AvakioGridCell[]` | `[]` | Array of cell configurations |
| `gridColumns` | `number` | `4` | Number of columns in the grid |
| `gridRows` | `number` | `3` | Number of rows in the grid |
| `cellWidth` | `number` | - | Fixed cell width in pixels (auto if not set) |
| `cellHeight` | `number` | - | Fixed cell height in pixels (auto if not set) |
| `cellMargin` | `number` | `10` | Space between cells in pixels |
| `margin` | `number` | - | Margin around the grid container in pixels |
| `padding` | `number \| [number, number, number, number]` | `10` | Padding around the grid (single value or [top, right, bottom, left]) |
| `width` | `string \| number` | - | Grid container width |
| `height` | `string \| number` | - | Grid container height |
| `minWidth` | `number` | - | Minimum width of the grid |
| `maxWidth` | `number` | - | Maximum width of the grid |
| `minHeight` | `number` | - | Minimum height of the grid |
| `maxHeight` | `number` | - | Maximum height of the grid |
| `hidden` | `boolean` | `false` | Whether the grid is hidden |
| `disabled` | `boolean` | `false` | Whether the grid is disabled |
| `borderless` | `boolean` | `false` | Remove container/view border (not cells) |
| `cellBorderless` | `boolean` | `false` | Remove cell borders, shadows, and background |
| `isDraggable` | `boolean` | `false` | Enable drag & drop reordering of cells |
| `theme` | `Theme` | `'material'` | Visual theme |
| `cssClass` | `string` | - | Additional CSS class |
| `style` | `CSSProperties` | - | Inline styles |
| `autoplace` | `boolean` | `true` | Auto-place cells when adding without position |

### Cell Configuration (`AvakioGridCell`)

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `id` | `string` | - | Unique cell identifier (must be unique across all cells) |
| `x` | `number` | - | Column position (0-indexed) |
| `y` | `number` | - | Row position (0-indexed) |
| `dx` | `number` | `1` | Column span (width in grid units) |
| `dy` | `number` | `1` | Row span (height in grid units) |
| `height` | `number` | - | Fixed height in pixels (overrides grid calculation) |
| `content` | `ReactNode` | - | Cell content to render |
| `template` | `string \| function` | - | HTML template string or function returning ReactNode |
| `css` | `CSSProperties` | - | Custom inline styles (e.g., `{ background: 'transparent' }`) |
| `cssClass` | `string` | - | Additional CSS class for the cell |
| `hidden` | `boolean` | `false` | Whether the cell is hidden |
| `disabled` | `boolean` | `false` | Whether the cell is disabled |
| `data` | `Record<string, any>` | - | Custom data attached to the cell |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `onChange` | `(cells: AvakioGridCell[]) => void` | Called when cells are modified |
| `onCellClick` | `(cell: AvakioGridCell, event: MouseEvent) => void` | Called when a cell is clicked |
| `onCellDoubleClick` | `(cell: AvakioGridCell, event: MouseEvent) => void` | Called on cell double-click |
| `onCellMouseEnter` | `(cell: AvakioGridCell, event: MouseEvent) => void` | Called when mouse enters a cell |
| `onCellMouseLeave` | `(cell: AvakioGridCell, event: MouseEvent) => void` | Called when mouse leaves a cell |
| `onDragStart` | `(cell: AvakioGridCell) => void` | Called when drag starts on a cell |
| `onDragEnd` | `(cell: AvakioGridCell, newPosition: { x: number; y: number }) => void` | Called when drag ends with new position |

### Methods (via ref)

Access methods using a ref:

```tsx
const gridRef = useRef<AvakioGridRef>(null);

// Later...
gridRef.current?.addView({ id: 'new', x: 0, y: 0, dx: 1, dy: 1, content: <div>New</div> });
```

| Method | Signature | Description |
|--------|-----------|-------------|
| `addView` | `(cell: AvakioGridCell) => void` | Add a new cell to the grid |
| `removeView` | `(id: string) => void` | Remove a cell by ID |
| `moveView` | `(id: string, pos: { x?: number; y?: number; dx?: number; dy?: number }) => void` | Move/resize a cell |
| `clearAll` | `() => void` | Remove all cells |
| `getCells` | `() => AvakioGridCell[]` | Get all cells |
| `getCell` | `(id: string) => AvakioGridCell \| undefined` | Get a cell by ID |
| `serialize` | `() => AvakioGridCell[]` | Serialize grid state (without ReactNode content) |
| `restore` | `(cells: AvakioGridCell[]) => void` | Restore cells from serialized state |
| `reconstruct` | `(newCells: AvakioGridCell[]) => void` | Replace all cells with new configuration |
| `show` | `() => void` | Show the grid |
| `hide` | `() => void` | Hide the grid |
| `getNode` | `() => HTMLDivElement \| null` | Get the DOM element |

## Examples

### Dashboard Layout

```tsx
<AvakioGrid
  id="dashboard"
  gridColumns={4}
  gridRows={3}
  cells={[
    { id: 'header', x: 0, y: 0, dx: 4, dy: 1, content: <Header /> },
    { id: 'sidebar', x: 0, y: 1, dx: 1, dy: 2, content: <Sidebar /> },
    { id: 'main', x: 1, y: 1, dx: 2, dy: 2, content: <MainContent /> },
    { id: 'widgets', x: 3, y: 1, dx: 1, dy: 2, content: <Widgets /> },
  ]}
  cellMargin={16}
  padding={16}
  height={600}
/>
```

### Fixed Cell Sizes

```tsx
<AvakioGrid
  id="fixed-grid"
  gridColumns={4}
  gridRows={3}
  cellWidth={150}
  cellHeight={100}
  cells={cells}
/>
```

### Single Column with Fixed Height Header

```tsx
<AvakioGrid
  id="single-column-layout"
  gridColumns={1}
  gridRows={4}
  margin={12}
  width={'100%'}
  height={600}
  cells={[
    { 
      id: 'description', 
      x: 0, 
      y: 0, 
      height: 50,  // Fixed 50px height
      css: { background: 'transparent', border: 'none', boxShadow: 'none' },
      content: <p>Description text that stays compact</p>
    },
    { 
      id: 'header-section', 
      x: 0, 
      y: 1, 
      // No height = flexible, shares remaining space
      content: <HeaderComponent />
    },
    { 
      id: 'content-section', 
      x: 0, 
      y: 2, 
      // No height = flexible
      content: <ContentComponent />
    },
    { 
      id: 'footer-section', 
      x: 0, 
      y: 3, 
      height: 80,  // Fixed 80px height
      content: <FooterComponent />
    },
  ]}
/>
```

### Interactive Grid with State Management

```tsx
function InteractiveGrid() {
  const gridRef = useRef<AvakioGridRef>(null);
  const [cells, setCells] = useState<AvakioGridCell[]>([]);

  const handleAdd = () => {
    const newCell: AvakioGridCell = {
      id: `cell-${Date.now()}`,
      x: 0,
      y: 0,
      dx: 1,
      dy: 1,
      content: <div>New Cell</div>
    };
    gridRef.current?.addView(newCell);
  };

  const handleSave = () => {
    const state = gridRef.current?.serialize();
    localStorage.setItem('gridState', JSON.stringify(state));
  };

  const handleLoad = () => {
    const saved = localStorage.getItem('gridState');
    if (saved) {
      const state = JSON.parse(saved);
      // Re-add content since it's not serialized
      const restoredCells = state.map(cell => ({
        ...cell,
        content: <div>{cell.id}</div>
      }));
      gridRef.current?.restore(restoredCells);
    }
  };

  return (
    <>
      <button onClick={handleAdd}>Add Cell</button>
      <button onClick={handleSave}>Save</button>
      <button onClick={handleLoad}>Load</button>
      <AvakioGrid
        ref={gridRef}
        id="interactive"
        gridColumns={4}
        gridRows={4}
        cells={cells}
        onChange={setCells}
      />
    </>
  );
}
```

### Borderless Options

The grid provides two separate borderless options:

- `borderless` - Removes only the container/view border
- `cellBorderless` - Removes cell borders, shadows, and background

```tsx
// Only container borderless (cells keep their borders)
<AvakioGrid
  id="container-borderless"
  borderless
  gridColumns={3}
  gridRows={2}
  cells={cells}
/>

// Only cells borderless (container keeps its border)
<AvakioGrid
  id="cells-borderless"
  cellBorderless
  gridColumns={3}
  gridRows={2}
  cells={cells}
/>

// Both borderless (fully transparent grid)
<AvakioGrid
  id="fully-borderless"
  borderless
  cellBorderless
  gridColumns={3}
  gridRows={2}
  cells={cells}
/>
```

### Borderless Cards

```tsx
<AvakioGrid
  id="cards"
  cellBorderless
  gridColumns={3}
  gridRows={2}
  cellMargin={16}
  cells={[
    { id: '1', x: 0, y: 0, dx: 1, dy: 1, content: <Card>Card 1</Card> },
    { id: '2', x: 1, y: 0, dx: 1, dy: 1, content: <Card>Card 2</Card> },
    { id: '3', x: 2, y: 0, dx: 1, dy: 1, content: <Card>Card 3</Card> },
  ]}
/>
```

### Drag & Drop Reordering

Enable drag & drop to allow users to reorder cells by dragging them to new positions:

```tsx
function DragDropGrid() {
  const [cells, setCells] = useState<AvakioGridCell[]>([
    { id: 'item-1', x: 0, y: 0, dx: 1, dy: 1, height: 100, content: <div>Item 1</div> },
    { id: 'item-2', x: 0, y: 1, dx: 1, dy: 1, height: 100, content: <div>Item 2</div> },
    { id: 'item-3', x: 0, y: 2, dx: 1, dy: 1, height: 100, content: <div>Item 3</div> },
  ]);

  return (
    <AvakioGrid
      id="drag-drop-grid"
      gridColumns={1}
      gridRows={10}
      cells={cells}
      isDraggable={true}
      onChange={(updatedCells) => setCells(updatedCells)}
      onDragStart={(cell) => console.log('Started dragging:', cell.id)}
      onDragEnd={(cell, pos) => console.log('Dropped:', cell.id, 'at', pos)}
    />
  );
}
```

**How it works:**
- When `isDraggable={true}`, cells display a drag handle indicator on hover
- Dragging a cell to a new position shifts other cells up or down to make room
- The `onChange` callback receives the updated cell array after reordering
- Works with both single-column and multi-column layouts
- In multi-column grids, cells only shift within the same column

### Fixed Height Cells

You can set a specific height for individual cells. The remaining cells will automatically calculate their height to fill the available space.

```tsx
<AvakioGrid
  id="mixed-heights"
  gridColumns={1}
  gridRows={3}
  margin={12}
  width={'100%'}
  height={500}
  cells={[
    { 
      id: 'header', 
      x: 0, 
      y: 0, 
      height: 60,  // Fixed 60px height
      content: <div>Header (60px)</div>
    },
    { 
      id: 'content', 
      x: 0, 
      y: 1, 
      // No height = flexible, fills remaining space
      content: <div>Content (flexible)</div>
    },
    { 
      id: 'footer', 
      x: 0, 
      y: 2, 
      height: 50,  // Fixed 50px height
      content: <div>Footer (50px)</div>
    },
  ]}
/>
```

**How it works:**
- Cells with `height` property get that exact pixel height
- Remaining cells share the leftover space equally
- Works best with single-column grids (`gridColumns={1}`)
- Also works with multi-column grids (cells in the same row share the row height)

### Cell Styling with CSS Property

Use the `css` property to customize individual cell appearance:

```tsx
<AvakioGrid
  id="styled-cells"
  gridColumns={2}
  gridRows={2}
  cells={[
    // Transparent cell (no background, border, or shadow)
    { 
      id: 'transparent', 
      x: 0, 
      y: 0, 
      css: { background: 'transparent', border: 'none', boxShadow: 'none' },
      content: <div>Transparent Cell</div>
    },
    // Custom background color
    { 
      id: 'colored', 
      x: 1, 
      y: 0, 
      css: { background: '#e3f2fd', borderColor: '#2196f3' },
      content: <div>Blue Cell</div>
    },
    // Custom border radius
    { 
      id: 'rounded', 
      x: 0, 
      y: 1, 
      css: { borderRadius: '16px' },
      content: <div>Rounded Cell</div>
    },
  ]}
/>
```

### Container Margin with 100% Width

When using `width="100%"` with `margin`, the grid automatically calculates the correct width to prevent overflow:

```tsx
<AvakioGrid
  id="full-width-with-margin"
  width="100%"
  margin={16}  // Adds 16px margin around the container
  height={400}
  gridColumns={3}
  gridRows={2}
  cells={cells}
/>
// Container will be calc(100% - 32px) to account for left + right margins
```

## Themes

AvakioGrid supports 6 built-in themes:

- `material` - Material Design inspired (default)
- `flat` - Flat, minimal design
- `compact` - Dense layout with smaller spacing
- `dark` - Dark mode theme
- `ocean` - Blue/teal color scheme
- `sunset` - Warm orange/coral colors

```tsx
<AvakioGrid theme="dark" ... />
```

## Cell Positioning

Cells are positioned using a coordinate system:

- `x` - Column position (0 = first column)
- `y` - Row position (0 = first row)
- `dx` - Number of columns to span (default: 1)
- `dy` - Number of rows to span (default: 1)

```
┌───────────────────────────────────────┐
│ (0,0)  │ (1,0)  │ (2,0)  │ (3,0)     │
├────────┼────────┼────────┼───────────┤
│ (0,1)  │ (1,1)  │ (2,1)  │ (3,1)     │
├────────┼────────┼────────┼───────────┤
│ (0,2)  │ (1,2)  │ (2,2)  │ (3,2)     │
└────────┴────────┴────────┴───────────┘

Example: { x: 1, y: 1, dx: 2, dy: 2 }
Creates a cell at column 1, row 1, spanning 2 columns and 2 rows.
```

## CSS Customization

The component uses CSS custom properties for theming. You can override them:

```css
.avakio-grid {
  --avakio-grid-cell-bg: #ffffff;
  --avakio-grid-cell-border: #e0e0e0;
  --avakio-grid-cell-shadow: 0 2px 4px rgba(0,0,0,0.1);
  --avakio-grid-cell-radius: 6px;
}
```

## Accessibility

- Cells use `role="gridcell"` for screen readers
- The container uses `role="grid"`
- Click handlers support keyboard navigation when used with focusable content

## Browser Support

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

Uses CSS Grid and ResizeObserver (polyfill may be needed for older browsers).

