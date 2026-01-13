# Avakio GroupList

A hierarchical list component that displays data in groups with drill-down navigation. Users can navigate into groups to see child items and navigate back to parent levels.

## Features

- **Hierarchical Navigation** - Drill down through nested data levels
- **Animated Transitions** - Smooth slide animations between levels
- **Custom Templates** - Full control over item and header rendering
- **Selection Support** - Track and control selected items
- **Theme Support** - Works with all 6 Avakio themes
- **Keyboard Navigation** - Full keyboard accessibility

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `GroupListItem[]` | required | Hierarchical data source |
| `value` | `string \| number` | - | Controlled selected value |
| `defaultValue` | `string \| number` | - | Default selected value (uncontrolled) |
| `onSelect` | `(item) => void` | - | Called when a leaf item is selected |
| `onChange` | `({ id, value, item }) => void` | - | Called when selection changes. Receives `{ id, value, item }` object |
| `onNavigate` | `(state) => void` | - | Called when navigation state changes |
| `templateItem` | `(item) => ReactNode` | - | Custom renderer for leaf items |
| `templateGroup` | `(item, count) => ReactNode` | - | Custom renderer for group headers |
| `templateBack` | `(item, count) => ReactNode` | - | Custom renderer for back header |
| `select` | `boolean` | `true` | Enable item selection |
| `animate` | `boolean` | `true` | Enable slide animations |
| `animationDuration` | `number` | `250` | Animation duration in ms |
| `showBack` | `boolean` | `true` | Show back navigation button |
| `backLabel` | `string` | `"Back"` | Default back button label |
| `width` | `number \| string` | - | Component width |
| `height` | `number \| string` | - | Component height |
| `scroll` | `boolean` | `true` | Enable scrolling |
| `className` | `string` | - | Additional CSS class |
| `style` | `CSSProperties` | - | Inline styles |

## Data Structure

```typescript
interface GroupListItem {
  id: string | number;      // Unique identifier
  value: string;            // Display text
  icon?: ReactNode;         // Optional icon element
  data?: GroupListItem[];   // Child items (presence makes this a group)
  disabled?: boolean;       // Disable the item
  className?: string;       // Additional CSS class
  [key: string]: any;       // Additional custom properties
}
```

## Usage

### Basic Usage

```tsx
import { AvakioGroupList } from "./avakio-grouplist";
import "./avakio-grouplist.css";

const data = [
  {
    id: 'movies',
    value: 'Movies',
    data: [
      {
        id: '2024',
        value: '2024 Films',
        data: [
          { id: 'f1', value: 'Dune: Part Two' },
          { id: 'f2', value: 'Inside Out 2' },
        ],
      },
      {
        id: '2023',
        value: '2023 Films',
        data: [
          { id: 'f3', value: 'Oppenheimer' },
          { id: 'f4', value: 'Barbie' },
        ],
      },
    ],
  },
];

function Example() {
  const [selected, setSelected] = useState(null);
  
  return (
    <div data-admin-theme="material">
      <AvakioGroupList
        data={data}
        value={selected}
        onSelect={(item) => setSelected(item.id)}
        height={300}
      />
    </div>
  );
}
```

### With Custom Templates

```tsx
<AvakioGroupList
  data={data}
  templateGroup={(item, count) => (
    <span>
      <strong>{item.value}</strong>
      <span className="badge">{count} items</span>
    </span>
  )}
  templateItem={(item) => (
    <span style={{ fontStyle: 'italic' }}>{item.value}</span>
  )}
  templateBack={(item) => (
    <span>← Back to {item.value}</span>
  )}
/>
```

### Track Navigation State

```tsx
const [navState, setNavState] = useState(null);

<AvakioGroupList
  data={data}
  onNavigate={(state) => {
    console.log('Parents:', state.parents);
    console.log('Current items:', state.branch);
    setNavState(state);
  }}
/>
```

## Theming

The component supports all 6 Avakio themes. Apply a theme by setting `data-admin-theme` on an ancestor element or directly on the component.

Supported themes:
- `material` (default)
- `flat`
- `compact`
- `dark`
- `ocean`
- `sunset`

```tsx
<div data-admin-theme="dark">
  <AvakioGroupList data={data} />
</div>
```

## CSS Variables

The component uses CSS custom properties for theming:

```css
--gl-bg: background color
--gl-text: text color
--gl-text-muted: muted text color
--gl-border: border color
--gl-hover: hover background
--gl-selected: selected item background
--gl-selected-text: selected item text color
--gl-accent: accent color (arrows, focus)
--gl-back-bg: back header background
--gl-arrow: arrow color
--gl-count: count badge color
--gl-radius: border radius
```

## Example

See `avakio-grouplist-example.tsx` for a comprehensive demo with all features.
