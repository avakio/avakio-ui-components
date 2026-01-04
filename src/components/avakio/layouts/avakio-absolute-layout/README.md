# AvakioAbsoluteLayout

A layout component that allows specifying exact positions of elements using `top`, `left`, `bottom`, `right` coordinates. This component is similar to Webix's AbsoluteLayout and provides precise control over element positioning within a container.

## Features

- **Absolute Positioning**: Place elements at exact pixel or percentage coordinates
- **Relative Cells**: Fill available space with `relative: true` option
- **Z-Index Stacking**: Control layering order with `zIndex` property
- **Batch Visibility**: Group cells and toggle visibility by batch name
- **Dynamic Management**: Add, remove, and reconstruct cells programmatically
- **6 Themes**: Material, Flat, Compact, Dark, Ocean, Sunset
- **Responsive**: Supports percentage-based sizing

## Installation

Import the component from the layouts module:

```tsx
import { 
  AvakioAbsoluteLayout, 
  AvakioAbsoluteLayoutCell 
} from '@/components/avakio/layouts/avakio-absolute-layout';
```

## Basic Usage

```tsx
const cells: AvakioAbsoluteLayoutCell[] = [
  {
    id: 'header',
    content: <HeaderComponent />,
    top: 0,
    left: 0,
    width: '100%',
    height: 60,
  },
  {
    id: 'sidebar',
    content: <SidebarComponent />,
    top: 60,
    left: 0,
    width: 200,
    bottom: 0,
  },
  {
    id: 'main',
    content: <MainContent />,
    top: 60,
    left: 200,
    right: 0,
    bottom: 0,
  },
];

<AvakioAbsoluteLayout 
  cells={cells}
  theme="material"
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `theme` | `'material' \| 'flat' \| 'compact' \| 'dark' \| 'ocean' \| 'sunset'` | `'material'` | Visual theme |
| `cells` | `AvakioAbsoluteLayoutCell[]` | `[]` | Array of cell configurations |
| `width` | `number \| string` | `'100%'` | Container width |
| `height` | `number \| string` | `'100%'` | Container height |
| `borderless` | `boolean` | `false` | Remove container border |
| `visibleBatch` | `string` | - | Initially visible batch name |
| `disabled` | `boolean` | `false` | Disable the layout |
| `hidden` | `boolean` | `false` | Hide the layout |
| `css` | `string` | - | Additional CSS class |
| `onCellClick` | `(cell, event) => void` | - | Cell click handler |
| `onResize` | `() => void` | - | Resize callback |

## Cell Configuration

| Property | Type | Description |
|----------|------|-------------|
| `id` | `string` | Unique identifier (required) |
| `content` | `ReactNode` | Content to render |
| `top` | `number \| string` | Distance from top |
| `left` | `number \| string` | Distance from left |
| `bottom` | `number \| string` | Distance from bottom |
| `right` | `number \| string` | Distance from right |
| `width` | `number \| string` | Cell width |
| `height` | `number \| string` | Cell height |
| `relative` | `boolean` | If true, fills available space |
| `zIndex` | `number` | Stacking order |
| `batch` | `string` | Batch name for group visibility |
| `hidden` | `boolean` | Hide the cell |
| `disabled` | `boolean` | Disable the cell |

## Ref Methods

Access imperative methods via ref:

```tsx
const layoutRef = useRef<AvakioAbsoluteLayoutRef>(null);

// Add a cell
layoutRef.current?.addView({
  id: 'new-cell',
  content: <NewComponent />,
  top: 100,
  left: 100,
  width: 200,
  height: 150,
});

// Remove a cell
layoutRef.current?.removeView('cell-id');

// Get all cells
const cells = layoutRef.current?.getChildViews();

// Show/hide batch
layoutRef.current?.showBatch('batch-name');

// Show/hide layout
layoutRef.current?.show();
layoutRef.current?.hide();

// Enable/disable layout
layoutRef.current?.enable();
layoutRef.current?.disable();

// Replace all cells
layoutRef.current?.reconstruct(newCellsArray);
```

| Method | Description |
|--------|-------------|
| `addView(cell, index?)` | Add a new cell at optional index |
| `removeView(idOrIndex)` | Remove cell by id or index |
| `getChildViews()` | Get all cells |
| `showBatch(name)` | Show cells matching batch name |
| `show()` | Show the layout |
| `hide()` | Hide the layout |
| `enable()` | Enable the layout |
| `disable()` | Disable the layout |
| `reconstruct(cells)` | Replace all cells |

## Examples

### Relative + Absolute Positioning

Mix cells that fill space with floating elements:

```tsx
const cells = [
  {
    id: 'background',
    content: <ListView />,
    relative: true,  // Takes all available space
  },
  {
    id: 'fab',
    content: <FloatingActionButton />,
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    zIndex: 10,
  },
];
```

### Batch Visibility

Group cells and toggle visibility:

```tsx
const cells = [
  { id: 'view-a', content: <ViewA />, relative: true, batch: 'main' },
  { id: 'view-b', content: <ViewB />, relative: true, batch: 'detail' },
];

// Show only 'main' batch
<AvakioAbsoluteLayout 
  cells={cells}
  visibleBatch="main"
/>

// Or use ref to switch batches
layoutRef.current?.showBatch('detail');
```

### Dynamic Cell Management

```tsx
const [cells, setCells] = useState<AvakioAbsoluteLayoutCell[]>([]);

const addPanel = () => {
  const newCell = {
    id: `panel-${Date.now()}`,
    content: <Panel />,
    top: Math.random() * 200,
    left: Math.random() * 300,
    width: 200,
    height: 150,
  };
  setCells([...cells, newCell]);
};
```

## Themes

The component supports 6 themes:

- **Material**: Modern Material Design styling
- **Flat**: Clean, flat appearance
- **Compact**: Reduced spacing for dense layouts
- **Dark**: Dark mode theme
- **Ocean**: Blue ocean-inspired theme
- **Sunset**: Warm orange/red tones

```tsx
<AvakioAbsoluteLayout theme="ocean" cells={cells} />
```

## CSS Customization

Override CSS variables to customize appearance:

```css
.avakio-absolute-layout {
  --al-bg-primary: #ffffff;
  --al-bg-secondary: #f5f5f5;
  --al-border-color: #e0e0e0;
  --al-text-primary: #333333;
  --al-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
```

## Accessibility

- Cells can be navigated with keyboard
- ARIA attributes applied to container
- Focus management for interactive cells

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
