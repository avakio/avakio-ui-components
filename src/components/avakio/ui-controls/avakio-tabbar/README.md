# AvakioTabBar

A flexible tab navigation component  Supports icons, badges, closable tabs, top/bottom styling, custom tab rendering, and keyboard navigation.

## Overview

AvakioTabBar provides lightweight tab navigation with built-in themes, optional close buttons, and accessibility-friendly keyboard controls.

## Features

- ✓ Top or bottom indicator styles
- ✓ Icons, badges, and compact sizing
- ✓ Optional close buttons (per-tab or global)
- ✓ Custom rendering via `renderTab`
- ✓ Hidden/disabled tabs handled out of the box
- ✓ Keyboard navigation (Left/Right, Home/End, Delete to close)
- ✓ Theme-aware styling for all 6 Avakio themes

## Installation

```tsx
import { AvakioTabBar } from '@/components/avakio/ui-controls/avakio-tabbar/avakio-tabbar';
import '@/components/avakio/ui-controls/avakio-tabbar/avakio-tabbar.css';
```

## Basic Usage

```tsx
const tabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'activity', label: 'Activity' },
  { id: 'files', label: 'Files' },
];

<AvakioTabBar
  value={activeTab}
  options={tabs}
  onChange={(val) => setActiveTab(val as string)}
  label="Section"
  required
/>
```

## Icons & Badges

```tsx
import { Home, Bell, Settings } from 'lucide-react';

const tabs = [
  { id: 'home', label: 'Home', icon: <Home size={16} /> },
  { id: 'alerts', label: 'Alerts', icon: <Bell size={16} />, badge: 5 },
  { id: 'settings', label: 'Settings', icon: <Settings size={16} /> },
];

<AvakioTabBar
  value={active}
  options={tabs}
  onChange={(val) => setActive(val as string)}
  align="justify"
  fill
  size="sm"
/>
```

## Closable Tabs

```tsx
<AvakioTabBar
  value={active}
  options={tabs}
  onChange={(val) => setActive(val as string)}
  onClose={(val) => setTabs((prev) => prev.filter((t) => t.id !== val))}
  closable
/>
```

## Custom Rendering (renderTab)

Use `renderTab` to supply a fully custom layout. A ready-to-use `closeButton` is passed so you can place it where you like.

```tsx
<AvakioTabBar
  value={active}
  options={tabs}
  onChange={(val) => setActive(val as string)}
  closable
  renderTab={(option, isActive, closeButton) => (
    <div style={{ display: 'grid', gap: 4 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontWeight: 700 }}>{option.label}</span>
        {option.badge && <span style={{ fontSize: 11, padding: '2px 6px', background: '#0ea5e9', color: '#fff', borderRadius: 999 }}>{option.badge}</span>}
      </div>
      <small style={{ color: '#64748b' }}>{option.description}</small>
      {closeButton}
    </div>
  )}
/>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `string \| number \| null` | `null` | Active tab id (controlled) |
| `options` | `AvakioTabBarOption[]` | `[]` | Tabs to render |
| `onChange` | `(value, option?) => void` | `undefined` | Fired when a tab is selected |
| `onClose` | `(value, option?) => void` | `undefined` | Fired when a tab is closed |
| `renderTab` | `(option, isActive, closeButton) => ReactNode` | `undefined` | Custom renderer for tab content; use `closeButton` to place the built-in closer |
| `align` | `'left' \| 'center' \| 'justify'` | `'left'` | Tab alignment |
| `type` | `'top' \| 'bottom'` | `'top'` | Indicator placement |
| `closable` | `boolean` | `false` | Enable close buttons for all tabs (per-tab close can override) |
| `fill` | `boolean` | `false` | Stretch tabs to fill available width |
| `size` | `'md' \| 'sm'` | `'md'` | Tab sizing preset |
| `scrollable` | `boolean` | `true` | Allow horizontal scroll; `false` wraps tabs |
| `label` | `string` | `undefined` | Optional label text (rendered via AvakioControlLabel) |
| `labelWidth` | `number` | `120` | Label width in pixels (rendered via AvakioControlLabel) |
| `labelAlign` | `'left' \| 'right'` | `'left'` | Label alignment (rendered via AvakioControlLabel) |
| `required` | `boolean` | `false` | Show required asterisk |
| `error` | `string` | `undefined` | Error text below the control |
| `disabled` | `boolean` | `false` | Disable all tabs |
| `className` | `string` | `''` | Additional CSS classes |

### AvakioTabBarOption

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string \| number` | Unique identifier for the tab |
| `label` | `string` | Visible tab text |
| `icon` | `React.ReactNode` | Optional icon element |
| `badge` | `string \| number` | Small badge shown to the right of the label |
| `close` | `boolean` | Show a close button for this tab |
| `disabled` | `boolean` | Disable this tab |
| `hidden` | `boolean` | Hide this tab from rendering |
| `ariaControls` | `string` | Optional `aria-controls` value for accessibility |

## Keyboard Navigation

- Arrow Left / Arrow Up: focus previous tab
- Arrow Right / Arrow Down: focus next tab
- Home / End: jump to first/last tab
- Delete / Backspace: close active tab (when `closable`)

## Theming

The component responds to the `data-admin-theme` attribute on any ancestor. Supported themes: Material, Flat, Compact, Dark, Ocean, Sunset.

```tsx
document.documentElement.setAttribute('data-admin-theme', 'ocean');
```

## Example

See the full example at `avakio-tabbar-example.tsx` with live demos for icons, badges, closable tabs, bottom style, and hidden/disabled tabs.

