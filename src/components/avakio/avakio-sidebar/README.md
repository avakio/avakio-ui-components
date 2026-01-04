# AvakioSidebar Component

A theme-aware hierarchical sidebar navigation component. Features collapsible navigation, multi-level hierarchy, popup menus, and full support for all 6 Avakio themes.

## Features

- ✨ **Multi-level Navigation** - Unlimited nested hierarchy support
- 🎨 **Full Theme Support** - Works with all 6 themes (Material, Flat, Compact, Dark, Ocean, Sunset)
- ↔️ **Collapsible** - Toggle between expanded and collapsed states
- 🎯 **Smart Popups** - Hover over icons in collapsed mode to show popup menus
- 📍 **Position Control** - Can be positioned on left or right side
- 🎨 **Custom Icons** - Supports any React icon component
- ⚙️ **Highly Configurable** - Control widths, heights, expand behavior, and more
- 🎭 **Active States** - Visual feedback for selected and hovered items
- 🔄 **Multiple Open Modes** - Allow single or multiple expanded sections
- 📱 **Mobile Responsive** - Fixed positioning, overlay, auto-close, and touch-friendly interface

## Installation

The component is part of the Avakio component library. Import it directly:

```tsx
import { AvakioSidebar, AvakioSidebarToggleButton } from '@/components/avakio/avakio-sidebar/avakio-sidebar';
import '@/components/avakio/avakio-sidebar/avakio-sidebar.css';
```

## Basic Usage

```tsx
import { AvakioSidebar } from '@/components/avakio/avakio-sidebar/avakio-sidebar';
import { Home, Settings, Users } from 'lucide-react';

const menuData = [
  {
    id: 'dashboard',
    icon: <Home size={18} />,
    value: 'Dashboard',
  },
  {
    id: 'users',
    icon: <Users size={18} />,
    value: 'Users',
    data: [
      { id: 'all-users', value: 'All Users' },
      { id: 'roles', value: 'Roles' },
    ],
  },
  {
    id: 'settings',
    icon: <Settings size={18} />,
    value: 'Settings',
  },
];

function MyApp() {
  return (
    <AvakioSidebar
      data={menuData}
      onSelect={(item) => console.log('Selected:', item)}
    />
  );
}
```

## Props

### AvakioSidebar

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `SidebarItem[]` | **required** | Array of menu items with hierarchical structure |
| `collapsed` | `boolean` | `false` | Whether the sidebar starts in collapsed state |
| `position` | `'left' \| 'right'` | `'left'` | Position of the sidebar |
| `collapsedWidth` | `number` | `41` | Width in pixels when collapsed |
| `width` | `number` | `250` | Width in pixels when expanded |
| `activeTitle` | `boolean` | `true` | Whether first-level items are expandable |
| `titleHeight` | `number` | `40` | Height in pixels for first-level items in popups |
| `multipleOpen` | `boolean` | `false` | Allow multiple menu sections to be open simultaneously |
| `onSelect` | `(item: SidebarItem) => void` | - | Callback when an item is selected |
| `className` | `string` | `''` | Additional CSS classes |
| `mobileBreakpoint` | `number` | `768` | Screen width (px) below which mobile behavior is activated |
| `autoCloseMobile` | `boolean` | `true` | Automatically close sidebar after item selection on mobile |
| `showOverlay` | `boolean` | `true` | Show backdrop overlay on mobile when sidebar is open |
| `onOverlayClick` | `() => void` | - | Callback when overlay is clicked (defaults to closing sidebar) |
| `showMobileDongle` | `boolean` | `true` | Show floating dongle button on mobile when sidebar is closed |
| `dongleIcon` | `React.ReactNode` | Menu icon | Custom icon for the mobile dongle button |

### SidebarItem

```typescript
interface SidebarItem {
  id: string;              // Unique identifier
  value: string;           // Display text
  icon?: React.ReactNode;  // Optional icon component
  data?: SidebarItem[];    // Optional nested children
  [key: string]: any;      // Additional custom properties
}
```

### AvakioSidebarToggleButton

A helper component for toggling the sidebar state.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onClick` | `() => void` | - | Callback when button is clicked |
| `className` | `string` | `''` | Additional CSS classes |
| `icon` | `React.ReactNode` | Menu icon | Custom icon to display |

## Advanced Examples

### Collapsible Sidebar with Toggle Button

```tsx
import { useState } from 'react';
import { AvakioSidebar, AvakioSidebarToggleButton } from '@/components/avakio/avakio-sidebar/avakio-sidebar';

function App() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div>
      <header>
        <AvakioSidebarToggleButton onClick={() => setCollapsed(!collapsed)} />
        <h1>My Application</h1>
      </header>
      
      <div style={{ display: 'flex' }}>
        <AvakioSidebar
          data={menuData}
          collapsed={collapsed}
          collapsedWidth={56}
          width={260}
        />
        <main style={{ flex: 1 }}>
          {/* Your content */}
        </main>
      </div>
    </div>
  );
}
```

### Multi-Level Navigation

```tsx
const deepMenuData = [
  {
    id: 'forms',
    icon: <Edit size={18} />,
    value: 'Forms',
    data: [
      {
        id: 'buttons',
        value: 'Buttons',
        data: [
          { id: 'button', value: 'Button' },
          { id: 'icon-button', value: 'Icon Button' },
        ],
      },
      {
        id: 'selects',
        value: 'Selectors',
        data: [
          {
            id: 'single',
            value: 'Single value',
            data: [
              { id: 'combo', value: 'Combo' },
              { id: 'richselect', value: 'Rich Select' },
            ],
          },
        ],
      },
    ],
  },
];

<AvakioSidebar
  data={deepMenuData}
  multipleOpen={true}
  onSelect={(item) => {
    console.log('Selected:', item.id);
  }}
/>
```

### Right-Positioned Sidebar

```tsx
<div style={{ display: 'flex' }}>
  <main style={{ flex: 1 }}>
    {/* Your content */}
  </main>
  
  <AvakioSidebar
    data={menuData}
    position="right"
    width={240}
  />
</div>
```

### Mobile-Optimized Sidebar

```tsx
function App() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div>
      <header>
        <AvakioSidebarToggleButton onClick={() => setCollapsed(!collapsed)} />
        <h1>My App</h1>
      </header>
      
      <div style={{ display: 'flex' }}>
        <AvakioSidebar
          data={menuData}
          collapsed={collapsed}
          mobileBreakpoint={768}
          autoCloseMobile={true}
          showOverlay={true}
          onOverlayClick={() => setCollapsed(true)}
          onSelect={(item) => {
            console.log('Selected:', item);
            // Navigation happens here
            // Sidebar auto-closes on mobile
          }}
        />
        <main style={{ flex: 1 }}>
          {/* Your content */}
        </main>
      </div>
    </div>
  );
}
```

### With Selection Handling

```tsx
function App() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <>
      <AvakioSidebar
        data={menuData}
        onSelect={(item) => {
          setSelectedId(item.id);
          // Navigate or update content based on selection
          navigateTo(item.id);
        }}
      />
      
      <main>
        <h2>Selected: {selectedId}</h2>
      </main>
    </>
  );
}
```

## Mobile Responsiveness

The AvakioSidebar component is fully responsive and provides an excellent mobile experience:

### Mobile Features

- **Fixed Positioning** - Sidebar becomes fixed and slides over content on mobile
- **Overlay Backdrop** - Semi-transparent overlay when sidebar is open
- **Floating Dongle Button** - Circular toggle button appears when sidebar is closed
- **Auto-Collapse on Mobile** - Automatically collapses when screen resizes to mobile
- **Auto-Close** - Automatically closes after item selection (configurable)
- **Touch-Friendly** - Larger tap targets (48px minimum height)
- **Slide Animation** - Smooth slide-in/out transitions
- **Body Scroll Lock** - Prevents background scrolling when sidebar is open
- **Responsive Width** - Adapts to screen size (85vw on small devices)

### Mobile Behavior

```tsx
// Sidebar automatically detects mobile screens, collapses, and shows dongle button
<AvakioSidebar
  data={menuData}
  mobileBreakpoint={768}   // Activate mobile mode below 768px
  autoCloseMobile={true}   // Close after item selection
  showOverlay={true}       // Show backdrop overlay
  showMobileDongle={true}  // Show floating toggle button
/>
```

**Note:** The sidebar automatically collapses when the screen size goes below the `mobileBreakpoint`. When resizing from desktop to mobile, the sidebar will auto-minimize and show the dongle button.

### Customizing the Mobile Dongle

```tsx
import { Menu } from 'lucide-react';

<AvakioSidebar
  data={menuData}
  showMobileDongle={true}
  dongleIcon={<Menu size={20} />}  // Custom icon
/>
```

### Hiding the Mobile Dongle

```tsx
// If you want to control the sidebar with your own button
<AvakioSidebar
  data={menuData}
  showMobileDongle={false}  // Hide the floating button
  collapsed={isCollapsed}
  onOverlayClick={() => setIsCollapsed(true)}
/>
```

### Customizing Mobile Breakpoint

```tsx
// Use a custom breakpoint
<AvakioSidebar
  data={menuData}
  mobileBreakpoint={1024}  // Tablet and mobile
  autoCloseMobile={false}  // Keep open after selection
/>
```

### Desktop vs Mobile

| Feature | Desktop | Mobile (< 768px) |
|---------|---------|------------------|
| Position | Relative/static | Fixed overlay |
| Backdrop | None | Semi-transparent |
| Dongle button | Hidden | Floating circle button |
| Initial state | As specified | Auto-collapsed |
| Auto-close | No | Yes (configurable) |
| Tap targets | Standard | Larger (48px min) |
| Body scroll | Normal | Locked when open |
| Animation | Instant | Slide transition |

## Theme Support

The component automatically adapts to the active theme via the `data-admin-theme` attribute:

```tsx
// Set theme on root element
document.documentElement.setAttribute('data-admin-theme', 'dark');
```

Available themes:
- **material** (default) - Clean, modern Material Design style
- **flat** - Flat design with soft colors
- **compact** - Tighter spacing for dense layouts
- **dark** - Dark mode with high contrast
- **ocean** - Blue-toned professional theme
- **sunset** - Warm orange-toned theme

## Styling

The component uses CSS custom properties for theming:

```css
.avakio-sidebar {
  --sidebar-bg: #ffffff;
  --sidebar-border: #e5e7eb;
  --sidebar-text: #374151;
  --sidebar-hover-bg: #f3f4f6;
  --sidebar-selected-bg: #1ca1c1;
  --sidebar-selected-text: #ffffff;
  /* ... more variables */
}
```

You can override these in your own CSS:

```css
[data-admin-theme="custom"] .avakio-sidebar {
  --sidebar-bg: #f0f0f0;
  --sidebar-selected-bg: #ff6b6b;
}
```

## Accessibility

- Proper ARIA labels on interactive elements
- Keyboard navigation support
- Focus management
- Semantic HTML structure
- Screen reader compatible
- Touch-friendly for mobile devices

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile Safari (iOS)
- Chrome Mobile (Android)

## Examples

Check out the [example page](./avakio-sidebar-example.tsx) for a comprehensive demonstration with:
- Theme switching
- Collapsed/expanded states
- Left and right positioning
- Multi-level navigation
- Selection handling
- Multiple open modes
- Mobile responsiveness with overlay
- Touch-friendly interactions

## License

Part of the Resume-Scribe project.

