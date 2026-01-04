# AvakioTree

A hierarchical tree component for displaying and interacting with nested data structures. Supports selection, checkboxes with three-state, expand/collapse, keyboard navigation, custom icons, and full theming.

## Features

- **Hierarchical Data Display**: Render nested tree structures with unlimited depth
- **Selection Modes**: Single selection or multi-selection with Ctrl+Click
- **Checkboxes**: Optional checkboxes with three-state support (checked, unchecked, indeterminate)
- **Expand/Collapse**: Collapsible branch nodes with animated toggle icons
- **Keyboard Navigation**: Full keyboard support (Arrow keys, Enter, Space, Home, End)
- **Custom Icons**: Per-node custom icons with separate open/closed states
- **Inline Editing**: Double-click to edit node values
- **Filtering**: Filter tree nodes programmatically
- **Themes**: 6 built-in themes (material, dark, ocean, sunset, flat, compact)
- **Imperative API**: Rich ref-based API for programmatic control

## Installation

The component is part of the Avakio UI library. Import it from the ui-widgets folder:

```tsx
import { AvakioTree, AvakioTreeNode, AvakioTreeRef } from '@/components/avakio/ui-widgets/avakio-tree';
```

## Basic Usage

```tsx
import { AvakioTree, AvakioTreeNode } from '@/components/avakio/ui-widgets/avakio-tree';

const treeData: AvakioTreeNode[] = [
  {
    id: 'root',
    value: 'My Project',
    open: true,
    data: [
      {
        id: 'src',
        value: 'src',
        data: [
          { id: 'app.tsx', value: 'App.tsx' },
          { id: 'main.tsx', value: 'main.tsx' },
        ],
      },
      { id: 'readme', value: 'README.md' },
    ],
  },
];

function MyComponent() {
  return (
    <AvakioTree
      data={treeData}
      select
      showIcons
      height={400}
      onSelect={(id, node) => console.log('Selected:', node.value)}
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `AvakioTreeNode[]` | required | Tree data structure |
| `select` | `boolean \| 'multi'` | `true` | Enable single or multi selection |
| `checkbox` | `boolean` | `false` | Show checkboxes on nodes |
| `threeState` | `boolean` | `false` | Enable three-state checkboxes (indeterminate state) |
| `showIcons` | `boolean` | `true` | Show node icons (folder/file or custom) |
| `showToggle` | `boolean` | `true` | Show expand/collapse toggle icons |
| `showLines` | `boolean` | `false` | Show connecting lines between nodes |
| `navigation` | `boolean` | `true` | Enable keyboard navigation |
| `editable` | `boolean` | `false` | Enable inline editing on double-click |
| `theme` | `AvakioTreeTheme` | auto | Theme variant |
| `itemHeight` | `number` | `32` | Height of each tree item in pixels |
| `width` | `number \| string` | - | Component width |
| `height` | `number \| string` | - | Component height |
| `className` | `string` | - | Additional CSS classes |
| `style` | `CSSProperties` | - | Inline styles |

## Events

| Event | Type | Description |
|-------|------|-------------|
| `onSelect` | `(id, node) => void` | Fired when a node is selected |
| `onSelectChange` | `(ids) => void` | Fired when selection changes (array of IDs) |
| `onClick` | `(id, node, e) => void` | Fired when a node is clicked |
| `onDblClick` | `(id, node, e) => void` | Fired when a node is double-clicked |
| `onOpen` | `(id, node) => void` | Fired when a branch is expanded |
| `onClose` | `(id, node) => void` | Fired when a branch is collapsed |
| `onCheck` | `(id, checked, node) => void` | Fired when checkbox state changes |
| `onEdit` | `(id, newValue, node) => void` | Fired when node value is edited |
| `onContext` | `(id, node, e) => void` | Fired on right-click (context menu) |

## Tree Node Structure

```typescript
interface AvakioTreeNode {
  id: string | number;           // Unique identifier
  value: string;                 // Display text
  icon?: React.ReactNode;        // Custom icon
  openIcon?: React.ReactNode;    // Icon when branch is open
  data?: AvakioTreeNode[];       // Children (makes this a branch)
  open?: boolean;                // Initially expanded
  disabled?: boolean;            // Disable interactions
  checked?: boolean;             // Initial checkbox state
  css?: string;                  // Custom CSS class
  tooltip?: string;              // Tooltip text
  [key: string]: any;            // Additional custom properties
}
```

## Imperative API (ref)

Access methods via ref:

```tsx
const treeRef = useRef<AvakioTreeRef>(null);

// Selection
treeRef.current?.select('node-id');
treeRef.current?.unselect();
treeRef.current?.getSelectedId();
treeRef.current?.getSelectedIds();

// Expand/Collapse
treeRef.current?.open('branch-id');
treeRef.current?.close('branch-id');
treeRef.current?.openAll();
treeRef.current?.closeAll();
treeRef.current?.isBranchOpen('branch-id');

// Checkboxes
treeRef.current?.checkItem('node-id');
treeRef.current?.uncheckItem('node-id');
treeRef.current?.checkAll();
treeRef.current?.uncheckAll();
treeRef.current?.getChecked();
treeRef.current?.isChecked('node-id');

// Utilities
treeRef.current?.getItem('node-id');
treeRef.current?.getParentId('node-id');
treeRef.current?.isBranch('node-id');
treeRef.current?.filter((node) => node.value.includes('search'));
treeRef.current?.clearFilter();
treeRef.current?.showItem('node-id');
treeRef.current?.refresh();
treeRef.current?.focus();
treeRef.current?.getNode();
```

## With Checkboxes and Three-State

```tsx
<AvakioTree
  data={treeData}
  checkbox
  threeState
  select={false}
  onCheck={(id, checked, node) => {
    console.log(`${node.value} is now ${checked}`);
  }}
/>
```

When `threeState` is enabled:
- Parent nodes show indeterminate state when some (but not all) children are checked
- Checking a parent checks all descendants
- Unchecking a parent unchecks all descendants

## Custom Icons

```tsx
import { Database, Server, Globe } from 'lucide-react';

const data: AvakioTreeNode[] = [
  {
    id: 'servers',
    value: 'Servers',
    icon: <Server size={16} />,
    data: [
      { id: 'web', value: 'Web Server', icon: <Globe size={16} /> },
      { id: 'db', value: 'Database', icon: <Database size={16} /> },
    ],
  },
];
```

## Themes

Available themes: `material`, `dark`, `ocean`, `sunset`, `flat`, `compact`

```tsx
<AvakioTree data={data} theme="dark" />
```

The component also auto-detects the global theme from `data-admin-theme` attribute on `<html>`.

## Keyboard Navigation

| Key | Action |
|-----|--------|
| `↑` / `↓` | Move focus up/down |
| `→` | Expand branch or move to first child |
| `←` | Collapse branch or move to parent |
| `Enter` / `Space` | Select node or toggle checkbox |
| `Home` | Move to first visible node |
| `End` | Move to last visible node |

## Styling

The component uses CSS variables for theming. Override these in your styles:

```css
.avakio-tree {
  --avakio-tree-bg: #ffffff;
  --avakio-tree-text: #1f2937;
  --avakio-tree-border: #e5e7eb;
  --avakio-tree-hover-bg: #f3f4f6;
  --avakio-tree-selected-bg: #dbeafe;
  --avakio-tree-selected-text: #1d4ed8;
  --avakio-tree-focus-ring: #3b82f6;
  /* ... more variables */
}
```

## Files

- `avakio-tree.tsx` - Main component
- `avakio-tree.css` - Styles with theme support
- `avakio-tree-example.tsx` - Interactive examples
- `avakio-tree-example.css` - Example page styles
- `index.ts` - Barrel exports
- `README.md` - This documentation

