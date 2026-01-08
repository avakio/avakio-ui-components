# AvakioLayout

A flexible layout container component for organizing views in rows and columns. Supports responsive behavior, multiple themes, gap control, alignment, and various border types.

## Features

- ✓ Rows and columns arrangement
- ✓ Nested layouts (rows within cols, cols within rows)
- ✓ Six layout types: space, wide, clean, line, head, material
- ✓ Responsive behavior (adapts to screen size)
- ✓ Flexible padding: padding, paddingX, paddingY
- ✓ Gap control for spacing between items
- ✓ Alignment and justification options
- ✓ Gravity for flexible sizing
- ✓ Flex-wrap support for wrapping items
- ✓ Theme-aware for all 6 Avakio themes
- ✓ Container border control (borderless prop)
- ✓ Hidden and disabled states

## Installation

```tsx
import { AvakioLayout } from '@/components/avakio/layouts/avakio-layout/avakio-layout';
import { AvakioResizer } from '@/components/avakio/layouts/avakio-resizer/avakio-resizer';
import '@/components/avakio/layouts/avakio-layout/avakio-layout.css';
import '@/components/avakio/layouts/avakio-resizer/avakio-resizer.css';
```

## Basic Usage

### Rows Layout (Vertical)

```tsx
<AvakioLayout
  theme="material"
  rows={[
    <div>Row 1</div>,
    <div>Row 2</div>,
    <div>Row 3</div>,
  ]}
/>
```

### Columns Layout (Horizontal)

```tsx
<AvakioLayout
  theme="material"
  cols={[
    <div>Column 1</div>,
    <div>Column 2</div>,
    <div>Column 3</div>,
  ]}
/>
```

## Nested Layouts

```tsx
<AvakioLayout
  rows={[
    <div>Header</div>,
    <AvakioLayout
      cols={[
        <div>Sidebar</div>,
        <div>Content</div>,
      ]}
    />,
    <div>Footer</div>,
  ]}
/>
```

## Layout Types

```tsx
{/* Space - margins between items */}
<AvakioLayout type="space" rows={[...]} />

{/* Wide - larger margins */}
<AvakioLayout type="wide" rows={[...]} />

{/* Clean - no borders */}
<AvakioLayout type="clean" rows={[...]} />

{/* Line - separator lines between items */}
<AvakioLayout type="line" rows={[...]} />

{/* Head - emphasized first item */}
<AvakioLayout type="head" rows={[...]} />

{/* Material - rounded corners with shadows */}
<AvakioLayout type="material" rows={[...]} />
```

## Container Borders

The `borderless` prop controls whether the container itself has a border. This is independent of the `type` prop which controls borders on child items.

```tsx
{/* Container has border (default), child items have borders based on type */}
<AvakioLayout borderless={false} type="space" rows={[...]} />

{/* Container has no border, child items still have borders based on type */}
<AvakioLayout borderless={true} type="space" rows={[...]} />

{/* Container has border, child items have no borders */}
<AvakioLayout borderless={false} type="clean" rows={[...]} />

{/* Neither container nor child items have borders */}
<AvakioLayout borderless={true} type="clean" rows={[...]} />
```

## Padding & Spacing

```tsx
{/* Uniform padding */}
<AvakioLayout padding={16} rows={[...]} />

{/* Horizontal and vertical padding */}
<AvakioLayout paddingX={20} paddingY={10} rows={[...]} />

{/* Gap between items */}
<AvakioLayout gap={12} cols={[...]} />

{/* Margin around layout */}
<AvakioLayout margin={16} rows={[...]} />
```

## Responsive Layout

```tsx
{/* Automatically stacks columns on mobile */}
<AvakioLayout
  responsive
  cols={[
    <div style={{ minWidth: '200px' }}>Panel 1</div>,
    <div style={{ minWidth: '200px' }}>Panel 2</div>,
    <div style={{ minWidth: '200px' }}>Panel 3</div>,
  ]}
/>

{/* With custom resize callback */}
<AvakioLayout
  responsive
  autoResize
  onResize={() => console.log('Layout resized')}
  cols={[...]}
/>
```

## Resizable Layouts

Use the `AvakioResizer` component to create draggable dividers between layout items:

### Horizontal Resizer (Resize Columns)

```tsx
function ResizableColumns() {
  const [leftWidth, setLeftWidth] = useState(200);

  return (
    <AvakioLayout
      theme="material"
      type="clean"
      cols={[
        <div style={{ width: `${leftWidth}px`, minWidth: '150px', maxWidth: '400px' }}>
          Left Panel
        </div>,
        <AvakioResizer
          direction="vertical"
          theme="material"
          onResize={(delta) => {
            setLeftWidth(prev => Math.max(150, Math.min(400, prev + delta)));
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

### Vertical Resizer (Resize Rows)

```tsx
function ResizableRows() {
  const [topHeight, setTopHeight] = useState(150);

  return (
    <AvakioLayout
      theme="material"
      type="clean"
      rows={[
        <div style={{ height: `${topHeight}px`, minHeight: '100px', maxHeight: '300px' }}>
          Top Panel
        </div>,
        <AvakioResizer
          direction="horizontal"
          theme="material"
          onResize={(delta) => {
            setTopHeight(prev => Math.max(100, Math.min(300, prev + delta)));
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

### Resizer Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `direction` | `'horizontal'\|'vertical'` | **required** | Direction of resize: horizontal for row separation, vertical for column separation |
| `theme` | `'material'\|'flat'\|'compact'\|'dark'\|'ocean'\|'sunset'` | `'material'` | Theme to apply |
| `onResizeStart` | `() => void` | `undefined` | Callback when drag starts |
| `onResize` | `(delta: number) => void` | `undefined` | Callback during drag with pixel delta |
| `onResizeEnd` | `() => void` | `undefined` | Callback when drag ends |
| `className` | `string` | `''` | Custom CSS classes |
| `css` | `React.CSSProperties` | `undefined` | Inline styles |

### Complex Resizable Layout

```tsx
function Dashboard() {
  const [sidebarWidth, setSidebarWidth] = useState(250);
  const [topHeight, setTopHeight] = useState(200);

  return (
    <AvakioLayout
      theme="material"
      type="clean"
      rows={[
        <div style={{ height: `${topHeight}px` }}>Header</div>,
        <AvakioResizer
          direction="horizontal"
          onResize={(delta) => setTopHeight(prev => Math.max(100, Math.min(400, prev + delta)))}
        />,
        <AvakioLayout
          cols={[
            <div style={{ width: `${sidebarWidth}px` }}>Sidebar</div>,
            <AvakioResizer
              direction="vertical"
              onResize={(delta) => setSidebarWidth(prev => Math.max(180, Math.min(400, prev + delta)))}
            />,
            <div style={{ flex: 1 }}>Content</div>,
          ]}
        />,
      ]}
    />
  );
}
```

## Alignment & Justification

```tsx
{/* Center items vertically */}
<AvakioLayout align="center" height={200} cols={[...]} />

{/* Space items evenly */}
<AvakioLayout justify="space-between" cols={[...]} />

{/* Center items horizontally */}
<AvakioLayout justify="center" cols={[...]} />
```

## Flex Wrap

Enable wrapping of items to the next line when they don't fit:

```tsx
{/* Items wrap to next line when space runs out */}
<AvakioLayout
  flexWrap
  gap={12}
  cols={[
    <AvakioButton label="Button 1" />,
    <AvakioButton label="Button 2" />,
    <AvakioButton label="Button 3" />,
    <AvakioButton label="Button 4" />,
    <AvakioButton label="Button 5" />,
  ]}
/>
```

## Sizing

```tsx
<AvakioLayout
  width={800}
  height={400}
  minWidth={600}
  maxWidth={1000}
  rows={[...]}
/>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `rows` | `ReactNode[]` | `undefined` | Array of views arranged vertically |
| `cols` | `ReactNode[]` | `undefined` | Array of views arranged horizontally |
| `children` | `ReactNode` | `undefined` | Direct children (alternative to rows/cols) |
| `theme` | `'material'\|'flat'\|'compact'\|'dark'\|'ocean'\|'sunset'` | `'material'` | Theme to apply |
| `type` | `'space'\|'wide'\|'clean'\|'line'\|'head'\|'material'` | `'space'` | Border style for child items |
| `borderless` | `boolean` | `false` | When false (default), container has border; when true, container border is removed (does not affect child items) |
| `padding` | `number\|string\|[number, number, number, number]` | `undefined` | Padding on all sides (single value, string, or [top, right, bottom, left]) |
| `paddingX` | `number\|string` | `undefined` | Horizontal padding (left and right) |
| `paddingY` | `number\|string` | `undefined` | Vertical padding (top and bottom) |
| `margin` | `number\|string` | `undefined` | Margin around layout |
| `gap` | `number\|string` | `undefined` | Space between items |
| `width` | `number\|string` | `undefined` | Layout width |
| `height` | `number\|string` | `undefined` | Layout height |
| `minWidth` | `number\|string` | `undefined` | Minimum width |
| `minHeight` | `number\|string` | `undefined` | Minimum height |
| `maxWidth` | `number\|string` | `undefined` | Maximum width |
| `maxHeight` | `number\|string` | `undefined` | Maximum height |
| `gravity` | `number` | `undefined` | Flex grow value for flexible sizing |
| `responsive` | `boolean\|string` | `false` | Enable responsive behavior |
| `autoResize` | `boolean` | `false` | Enable ResizeObserver for automatic responsiveness |
| `onResize` | `() => void` | `undefined` | Callback when layout is resized |
| `align` | `'start'\|'center'\|'end'\|'stretch'` | `'stretch'` | Cross-axis alignment |
| `justify` | `'start'\|'center'\|'end'\|'space-between'\|'space-around'\|'space-evenly'` | `'start'` | Main-axis justification |
| `flexWrap` | `boolean` | `false` | Enable flex-wrap to allow items to wrap to the next line |
| `hidden` | `boolean` | `false` | Hide the layout |
| `disabled` | `boolean` | `false` | Disable interaction |
| `id` | `string` | `undefined` | HTML ID attribute |
| `testId` | `string` | `undefined` | Test ID for testing |
| `className` | `string` | `''` | Custom CSS classes |
| `css` | `React.CSSProperties` | `undefined` | Inline styles |

## Layout Type Details

- **`space`**: Small margins (4px) between items with borders
- **`wide`**: Larger margins (8px) between items with borders
- **`clean`**: No borders or margins between items
- **`line`**: Separator lines between items (no surrounding borders)
- **`head`**: First item has emphasized bottom border (acts as header)
- **`material`**: Rounded corners with box shadows and margins

## Theming

Layout colors and borders respond to `data-admin-theme` attribute or the `theme` prop. Supported themes: Material, Flat, Compact, Dark, Ocean, Sunset.

```tsx
{/* Via theme prop */}
<AvakioLayout theme="ocean" rows={[...]} />

{/* Via data attribute */}
document.documentElement.setAttribute('data-admin-theme', 'sunset');
```

## Real-world Example: Dashboard

```tsx
<AvakioLayout
  rows={[
    <div>Header</div>,
    <AvakioLayout
      cols={[
        <nav>Sidebar Navigation</nav>,
        <main>
          <AvakioLayout
            cols={[
              <div>Widget 1</div>,
              <div>Widget 2</div>,
              <div>Widget 3</div>,
            ]}
            type="material"
            gap={12}
          />
        </main>,
      ]}
    />,
    <footer>Footer</footer>,
  ]}
  type="clean"
/>
```

## Example

See [avakio-layout-example.tsx](./avakio-layout-example.tsx) for comprehensive demos including:
- Basic rows and columns layouts
- Complex nested structures
- All layout types (space, wide, clean, line, head, material)
- Padding and spacing examples
- **Resizable layouts with drag-to-resize panels**
- Responsive behavior with automatic stacking
- Alignment and justification
- Real-world dashboard implementation

## Features Summary

### Core Features
- ✓ Rows and columns arrangement
- ✓ Nested layouts (unlimited depth)
- ✓ Six layout types with different border styles
- ✓ Six themes (material, flat, compact, dark, ocean, sunset)

### Resizing
- ✓ **Draggable resizers between panels**
- ✓ **Min/max width and height constraints**
- ✓ **Smooth resize with visual feedback**
- ✓ **Horizontal and vertical resizers**
- ✓ **Theme-aware resizer styling**

### Responsive
- ✓ **ResizeObserver for container-based responsiveness**
- ✓ **Window resize listener for viewport changes**
- ✓ **Automatic stacking at 768px breakpoint**
- ✓ **onResize callback for custom logic**

### Styling
- ✓ Flexible padding (padding, paddingX, paddingY)
- ✓ Gap control for spacing
- ✓ Alignment and justification
- ✓ Gravity for flexible sizing
- ✓ Container border control
- ✓ Hidden and disabled states

