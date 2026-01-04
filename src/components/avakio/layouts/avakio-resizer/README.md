# AvakioResizer

A draggable resizer component for creating adjustable panel dividers in layouts. Supports horizontal and vertical resizing with smooth drag interactions and theme-aware styling.

## Features

- ✓ Horizontal and vertical resizer directions
- ✓ Smooth mouse drag interaction
- ✓ Visual feedback on hover and during drag
- ✓ Callbacks for resize lifecycle (start, resize, end)
- ✓ Theme-aware styling for all 6 Avakio themes
- ✓ Accessible with ARIA attributes
- ✓ Customizable styling with CSS classes
- ✓ Delta-based resize calculations

## Installation

```tsx
import { AvakioResizer } from '@/components/avakio/layouts/avakio-resizer/avakio-resizer';
import '@/components/avakio/layouts/avakio-resizer/avakio-resizer.css';
```

## Basic Usage

### Vertical Resizer (For Resizing Columns)

Place between two columns to allow horizontal resizing:

```tsx
import { useState } from 'react';
import { AvakioLayout } from '@/components/avakio/layouts/avakio-layout/avakio-layout';
import { AvakioResizer } from '@/components/avakio/layouts/avakio-resizer/avakio-resizer';

function ResizableColumns() {
  const [leftWidth, setLeftWidth] = useState(250);

  return (
    <AvakioLayout
      theme="material"
      type="clean"
      cols={[
        <div style={{ width: `${leftWidth}px`, minWidth: '200px', maxWidth: '400px' }}>
          Left Panel
        </div>,
        <AvakioResizer
          direction="vertical"
          theme="material"
          onResize={(delta) => {
            setLeftWidth(prev => {
              const newWidth = prev + delta;
              return Math.max(200, Math.min(400, newWidth));
            });
          }}
        />,
        <div style={{ flex: 1 }}>
          Right Panel
        </div>,
      ]}
    />
  );
}
```

### Horizontal Resizer (For Resizing Rows)

Place between two rows to allow vertical resizing:

```tsx
function ResizableRows() {
  const [topHeight, setTopHeight] = useState(200);

  return (
    <AvakioLayout
      theme="material"
      type="clean"
      rows={[
        <div style={{ height: `${topHeight}px`, minHeight: '150px', maxHeight: '400px' }}>
          Top Panel
        </div>,
        <AvakioResizer
          direction="horizontal"
          theme="material"
          onResize={(delta) => {
            setTopHeight(prev => {
              const newHeight = prev + delta;
              return Math.max(150, Math.min(400, newHeight));
            });
          }}
        />,
        <div style={{ flex: 1 }}>
          Bottom Panel
        </div>,
      ]}
    />
  );
}
```

## Advanced Usage

### Resize Lifecycle Callbacks

```tsx
<AvakioResizer
  direction="vertical"
  theme="material"
  onResizeStart={() => {
    console.log('Resize started');
    // Hide content during resize for better performance
  }}
  onResize={(delta) => {
    console.log('Delta:', delta);
    setSidebarWidth(prev => Math.max(180, Math.min(400, prev + delta)));
  }}
  onResizeEnd={() => {
    console.log('Resize ended');
    // Save the new size to localStorage or API
  }}
/>
```

### Complex Resizable Dashboard

```tsx
function Dashboard() {
  const [sidebarWidth, setSidebarWidth] = useState(250);
  const [headerHeight, setHeaderHeight] = useState(80);
  const [rightPanelWidth, setRightPanelWidth] = useState(300);

  return (
    <AvakioLayout
      theme="ocean"
      type="clean"
      css={{ height: '100vh' }}
      rows={[
        {/* Resizable Header */}
        <div style={{ height: `${headerHeight}px` }}>
          <header>Dashboard Header</header>
        </div>,
        <AvakioResizer
          direction="horizontal"
          theme="ocean"
          onResize={(delta) => {
            setHeaderHeight(prev => Math.max(60, Math.min(200, prev + delta)));
          }}
        />,
        {/* Main content with resizable sidebar and right panel */}
        <AvakioLayout
          cols={[
            <div style={{ width: `${sidebarWidth}px` }}>
              <nav>Sidebar Navigation</nav>
            </div>,
            <AvakioResizer
              direction="vertical"
              theme="ocean"
              onResize={(delta) => {
                setSidebarWidth(prev => Math.max(180, Math.min(400, prev + delta)));
              }}
            />,
            <div style={{ flex: 1 }}>
              <main>Main Content</main>
            </div>,
            <AvakioResizer
              direction="vertical"
              theme="ocean"
              onResize={(delta) => {
                setRightPanelWidth(prev => Math.max(200, Math.min(500, prev - delta)));
              }}
            />,
            <div style={{ width: `${rightPanelWidth}px` }}>
              <aside>Right Panel</aside>
            </div>,
          ]}
        />,
      ]}
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `direction` | `'horizontal' \| 'vertical'` | **required** | Direction of the resizer. `'horizontal'` for resizing rows (vertical drag), `'vertical'` for resizing columns (horizontal drag) |
| `theme` | `'material' \| 'flat' \| 'compact' \| 'dark' \| 'ocean' \| 'sunset'` | `'material'` | Theme to apply for styling |
| `onResizeStart` | `() => void` | `undefined` | Callback fired when the user starts dragging the resizer |
| `onResize` | `(delta: number) => void` | `undefined` | Callback fired during dragging with the pixel delta from the start position |
| `onResizeEnd` | `() => void` | `undefined` | Callback fired when the user releases the resizer |
| `className` | `string` | `''` | Additional CSS classes to apply |
| `css` | `React.CSSProperties` | `undefined` | Inline styles to apply |

## Direction Explained

- **`direction="horizontal"`**: Creates a horizontal resizer bar (looks like `—`). Used between **rows** to allow vertical resizing. User drags up/down.
- **`direction="vertical"`**: Creates a vertical resizer bar (looks like `|`). Used between **columns** to allow horizontal resizing. User drags left/right.

## Delta Calculation

The `onResize` callback receives a `delta` value representing the pixel change from the start position:

```tsx
onResize={(delta) => {
  // For vertical resizer (columns):
  // Positive delta = dragged right (increase left panel width)
  // Negative delta = dragged left (decrease left panel width)
  
  // For horizontal resizer (rows):
  // Positive delta = dragged down (increase top panel height)
  // Negative delta = dragged up (decrease top panel height)
  
  setWidth(prev => prev + delta);
}}
```

## Implementing Min/Max Constraints

Always use `Math.max` and `Math.min` to enforce size limits:

```tsx
onResize={(delta) => {
  setSidebarWidth(prev => {
    const newWidth = prev + delta;
    // Min width: 200px, Max width: 500px
    return Math.max(200, Math.min(500, newWidth));
  });
}}
```

## Theming

The resizer automatically adapts to the current theme. Supported themes:

- **Material** (`#1CA1C1`) - Teal/cyan accent
- **Flat** (`#5E81AC`) - Muted blue
- **Compact** (`#00796B`) - Dark teal
- **Dark** (`#64b5f6`) - Light blue for dark backgrounds
- **Ocean** (`#0277BD`) - Deep blue
- **Sunset** (`#f57c00`) - Orange

```tsx
{/* Via theme prop */}
<AvakioResizer direction="vertical" theme="sunset" />

{/* Via data-admin-theme attribute */}
<div data-admin-theme="dark">
  <AvakioResizer direction="vertical" />
</div>
```

## Styling

### Default Styles

- **Width** (vertical resizer): 8px clickable area with 2px visible handle
- **Height** (horizontal resizer): 8px clickable area with 2px visible handle
- **Hover**: Handle becomes more visible (opacity 0.3 → 0.8)
- **Dragging**: Elevated z-index (100) and highlighted appearance

### Custom Styling

```tsx
{/* Add custom classes */}
<AvakioResizer
  direction="vertical"
  className="my-custom-resizer"
/>

{/* Inline styles */}
<AvakioResizer
  direction="vertical"
  css={{ cursor: 'col-resize' }}
/>
```

## Accessibility

The component includes proper ARIA attributes:

- `role="separator"` - Identifies the element as a separator
- `aria-orientation="horizontal"` or `"vertical"` - Indicates resize direction
- `aria-label="Resizer"` - Provides accessible label
- Keyboard support can be added by handling `onKeyDown` events

## Performance Tips

1. **Use `onResizeStart` and `onResizeEnd`** to hide/show content during resize for smoother dragging
2. **Throttle expensive operations** inside `onResize` callback if needed
3. **Use CSS `will-change`** on resizable panels for better rendering performance
4. **Avoid re-rendering heavy content** during resize by memoizing child components

```tsx
onResizeStart={() => setIsResizing(true)}
onResizeEnd={() => {
  setIsResizing(false);
  // Save to localStorage or API
  saveLayout({ sidebarWidth });
}}
```

## Browser Support

- Chrome, Edge, Safari, Firefox (modern versions)
- Requires mouse events (no touch support yet)
- Uses `mousedown`, `mousemove`, `mouseup` events

## Example

See [avakio-layout-example.tsx](../avakio-layout/avakio-layout-example.tsx) for comprehensive demos including:
- Horizontal resizer between columns
- Vertical resizer between rows
- Complex dashboard with multiple resizers
- Min/max constraint enforcement
- Theme integration
- Real-world usage patterns

