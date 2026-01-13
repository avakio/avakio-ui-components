# AvakioDoubleList

A dual-list selection widget for moving items between "available" and "selected" lists.

## Features

- **Two-panel layout**: Available items on the left, selected items on the right
- **Multiple selection methods**:
  - Click to select single item
  - Ctrl+Click for multi-select
  - Shift+Click for range selection
  - Double-click to move item
  - Arrow buttons to move selected items
- **Drag and Drop**: Drag items between lists using grip handles
- **Search/Filter**: Filter items in each list with search input
- **Disabled items**: Individual items can be disabled
- **Custom labels**: Top and bottom labels for each list
- **Theme support**: Works with all 6 Avakio themes (material, flat, compact, dark, ocean, sunset)

## Installation

Import the component and its styles:

```tsx
import { AvakioDoubleList } from '@/components/avakio/ui-controls/avakio-doublelist';
import '@/components/avakio/ui-controls/avakio-doublelist/avakio-doublelist.css';
```

## Usage

### Basic Usage

```tsx
import { useState } from 'react';
import { AvakioDoubleList } from './avakio-doublelist';

const data = [
  { id: "1", value: "Contacts" },
  { id: "2", value: "Products" },
  { id: "3", value: "Reports" },
  { id: "4", value: "Customers" },
];

function MyComponent() {
  const [selected, setSelected] = useState<string[]>(["1"]);

  return (
    <AvakioDoubleList
      id="screen-selector"
      data={data}
      value={selected}
      onChange={({ value }) => setSelected(value)}
      labelLeft="Available Screens"
      labelRight="Selected Screens"
    />
  );
}
```

### With Search and Custom Labels

```tsx
<AvakioDoubleList
  id="searchable-list"
  data={data}
  value={selected}
  onChange={({ value }) => setSelected(value)}
  labelLeft="All Items"
  labelRight="Selected Items"
  labelBottomLeft="Double-click to add"
  labelBottomRight="Double-click to remove"
  searchable={true}
  listHeight={300}
/>
```

### Without Buttons

```tsx
<AvakioDoubleList
  id="no-buttons-list"
  data={data}
  value={selected}
  onChange={({ value }) => setSelected(value)}
  showButtons={false}
  draggable={true}
/>
```

### With Disabled Items

```tsx
const data = [
  { id: "1", value: "Normal Item" },
  { id: "2", value: "Disabled Item", disabled: true },
  { id: "3", value: "Another Item" },
];

<AvakioDoubleList
  id="disabled-items-list"
  data={data}
  value={selected}
  onChange={({ value }) => setSelected(value)}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `AvakioDoubleListItem[]` | `[]` | Array of all available items |
| `value` | `string[]` | `[]` | Array of selected item IDs (items in right list) |
| `onChange` | `({ id, value }) => void` | - | Callback when selection changes. Receives `{ id, value }` object |
| `labelLeft` | `string` | `"Available"` | Label for the left list |
| `labelRight` | `string` | `"Selected"` | Label for the right list |
| `labelBottomLeft` | `string` | `undefined` | Bottom label for left list |
| `labelBottomRight` | `string` | `undefined` | Bottom label for right list |
| `showButtons` | `boolean` | `true` | Show/hide control buttons |
| `searchable` | `boolean` | `true` | Enable search/filter in lists |
| `draggable` | `boolean` | `true` | Enable drag and drop |
| `disabled` | `boolean` | `false` | Disable the entire component |
| `listHeight` | `number \| string` | `300` | Height of each list |
| `id` | `string` | `undefined` | Unique ID for the component |
| `testId` | `string` | `undefined` | Test ID for testing purposes |
| `className` | `string` | `undefined` | Additional CSS class |

## Item Interface

```typescript
interface AvakioDoubleListItem {
  id: string;      // Unique identifier
  value: string;   // Display text
  disabled?: boolean; // Optional: prevent item from being moved
}
```

## Interaction Methods

1. **Click**: Select a single item (clears previous selection)
2. **Ctrl/Cmd + Click**: Add/remove item from multi-selection
3. **Shift + Click**: Select range from last selected item
4. **Double-click**: Move item to the other list
5. **Arrow buttons**: Move selected items between lists
6. **Double arrows**: Move all items between lists
7. **Drag and drop**: Drag items using the grip handle

## Theme Support

The component supports all 6 Avakio themes:

- `material` - Default Material Design inspired theme
- `flat` - Flat design with subtle shadows
- `compact` - Smaller padding for dense layouts
- `dark` - Dark mode theme
- `ocean` - Blue ocean-inspired theme
- `sunset` - Warm orange/amber theme

Themes are automatically applied via the `data-admin-theme` attribute on the document.

## Events

The component uses a controlled pattern with `value` and `onChange`. The `onChange` callback is called with the updated array of selected item IDs whenever:

- Items are moved using buttons
- Items are double-clicked
- Items are dragged between lists

## Accessibility

- Keyboard navigation support
- ARIA labels on buttons
- Focus management for multi-select
- Screen reader friendly labels

