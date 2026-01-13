# AvakioAccordion

A collapsible accordion component for organizing content into expandable panels.

## Features

- **Multi-expand modes**: Single panel, multiple panels, or mixed mode (at least one must stay open)
- **Layout options**: Vertical (rows) or horizontal (cols) orientation
- **Theming**: 6 built-in themes (material, dark, ocean, sunset, flat, compact)
- **Keyboard navigation**: Full keyboard support for accessibility
- **Custom icons**: Customize expand/collapse icons
- **Disabled state**: Disable individual accordion items
- **Imperative API**: Programmatically control expand/collapse state

## Installation

Import the component from the ui-widgets module:

```tsx
import { AvakioAccordion } from '@/components/avakio/ui-widgets/avakio-accordion';
```

## Basic Usage

```tsx
import { AvakioAccordion, AvakioAccordionItem } from './avakio-accordion';

const items: AvakioAccordionItem[] = [
  {
    id: 'section1',
    header: 'Section 1',
    body: <p>Content for section 1</p>,
  },
  {
    id: 'section2',
    header: 'Section 2',
    body: <p>Content for section 2</p>,
    collapsed: true,
  },
  {
    id: 'section3',
    header: 'Section 3',
    body: <p>Content for section 3</p>,
    collapsed: true,
  },
];

function App() {
  return (
    <AvakioAccordion
      items={items}
      theme="material"
      onExpand={(id) => console.log('Expanded:', id)}
      onCollapse={(id) => console.log('Collapsed:', id)}
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `AvakioAccordionItem[]` | *required* | Array of accordion items |
| `multi` | `boolean \| "mixed"` | `false` | Multi-expand mode |
| `type` | `"rows" \| "cols"` | `"rows"` | Layout orientation |
| `theme` | `AvakioAccordionTheme` | `"material"` | Visual theme |
| `showIcons` | `boolean` | `true` | Show toggle icons |
| `collapseIcon` | `ReactNode` | `<ChevronRight />` | Custom collapse icon |
| `expandIcon` | `ReactNode` | `<ChevronDown />` | Custom expand icon |
| `animate` | `boolean` | `true` | Enable animations |
| `width` | `number \| string` | - | Component width |
| `height` | `number \| string` | - | Component height |
| `className` | `string` | - | Additional CSS class |
| `style` | `CSSProperties` | - | Inline styles |
| `onExpand` | `(id) => void` | - | Called when item expands |
| `onCollapse` | `(id) => void` | - | Called when item collapses |
| `onChange` | `({ id, value }) => void` | - | Called when expanded state changes. Receives `{ id, value }` where value is the expandedIds array |

## Accordion Item Properties

| Property | Type | Description |
|----------|------|-------------|
| `id` | `string \| number` | Unique identifier |
| `header` | `ReactNode` | Header content |
| `body` | `ReactNode` | Body content |
| `collapsed` | `boolean` | Initially collapsed |
| `disabled` | `boolean` | Disable the item |
| `icon` | `ReactNode` | Custom header icon |
| `css` | `string` | Custom CSS class |
| `headerVisible` | `boolean` | Whether header is visible |

## Multi-Expand Modes

```tsx
// Single mode (default) - only one panel open at a time
<AvakioAccordion items={items} multi={false} />

// Multi mode - all panels can be expanded/collapsed independently
<AvakioAccordion items={items} multi={true} />

// Mixed mode - multiple panels can open, but at least one must stay open
<AvakioAccordion items={items} multi="mixed" />
```

## Horizontal Layout

```tsx
<AvakioAccordion
  items={items}
  type="cols"
  height={300}
/>
```

## Custom Icons

```tsx
import { ChevronUp, ChevronLeft } from 'lucide-react';

<AvakioAccordion
  items={items}
  expandIcon={<ChevronUp size={18} />}
  collapseIcon={<ChevronLeft size={18} />}
/>
```

## Disabled Items

```tsx
const items = [
  { id: '1', header: 'Active', body: <p>Content</p> },
  { id: '2', header: 'Disabled', body: <p>Content</p>, disabled: true },
];
```

## Imperative API

```tsx
import { useRef } from 'react';
import { AvakioAccordion, AvakioAccordionRef } from './avakio-accordion';

function App() {
  const accordionRef = useRef<AvakioAccordionRef>(null);

  return (
    <>
      <AvakioAccordion ref={accordionRef} items={items} multi={true} />
      
      <button onClick={() => accordionRef.current?.expand('section1')}>
        Expand Section 1
      </button>
      <button onClick={() => accordionRef.current?.collapse('section1')}>
        Collapse Section 1
      </button>
      <button onClick={() => accordionRef.current?.expandAll()}>
        Expand All
      </button>
      <button onClick={() => accordionRef.current?.collapseAll()}>
        Collapse All
      </button>
    </>
  );
}
```

### Ref Methods

| Method | Description |
|--------|-------------|
| `getExpandedIds()` | Returns array of expanded item IDs |
| `expand(id)` | Expands specified item |
| `collapse(id)` | Collapses specified item |
| `toggle(id)` | Toggles specified item |
| `expandAll()` | Expands all items (multi mode only) |
| `collapseAll()` | Collapses all items |
| `isExpanded(id)` | Checks if item is expanded |
| `isDisabled(id)` | Checks if item is disabled |
| `enable(id)` | Enables a disabled item |
| `disable(id)` | Disables an item |

## Themes

The accordion supports 6 themes:

- `material` - Material Design inspired
- `dark` - Dark mode theme
- `ocean` - Blue ocean theme
- `sunset` - Warm sunset theme
- `flat` - Minimal flat theme
- `compact` - Compact spacing theme

```tsx
<AvakioAccordion items={items} theme="dark" />
```

## Events

| Event | Parameters | Description |
|-------|------------|-------------|
| `onExpand` | `id: string \| number` | Fired when an item is expanded |
| `onCollapse` | `id: string \| number` | Fired when an item is collapsed |
| `onChange` | `{ id, value }` where value is `(string \| number)[]` | Fired when expanded state changes. Receives `{ id, value }` object |

## Keyboard Navigation

| Key | Action |
|-----|--------|
| `Enter` / `Space` | Toggle focused panel |
| `↑` / `←` | Move to previous panel |
| `↓` / `→` | Move to next panel |
| `Home` | Move to first panel |
| `End` | Move to last panel |

## Accessibility

- ARIA attributes for expanded/collapsed state
- Keyboard navigation support
- Focus management
- Screen reader friendly

