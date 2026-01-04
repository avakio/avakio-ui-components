# AvakioButton

A comprehensive button component with full-featured API. Supports variants, sizes, types, alignment, icons, images, badges, tooltips, hotkeys, loading, and form integration.

## Features

- ✓ Variants: primary, secondary, outline, ghost, danger
- ✓ Sizes: sm, md, lg, plus full-width block and auto-width
- ✓ Types: default, icon-only, iconButton, icon-top layouts
- ✓ Alignment: left, center, right text alignment
- ✓ Icons on left/right, images, badges, and loading spinner
- ✓ Tooltips with HTML title attribute
- ✓ Keyboard hotkeys (Ctrl/Shift/Alt combinations)
- ✓ Form integration with name and value attributes
- ✓ Disabled handling and hover/active states
- ✓ Theme-aware for all 6 Avakio themes

## Installation

```tsx
import { AvakioButton } from '@/components/avakio/ui-controls/avakio-button/avakio-button';
import '@/components/avakio/ui-controls/avakio-button/avakio-button.css';
```

## Basic Usage

```tsx
<AvakioButton variant="primary" onClick={() => alert('Clicked!')}>
  Save
</AvakioButton>
```

## With Icons and Badges

```tsx
import { Check, ArrowRight, Bell } from 'lucide-react';

<AvakioButton variant="primary" icon={<Check size={16} />}>Confirm</AvakioButton>
<AvakioButton variant="secondary" iconRight={<ArrowRight size={16} />} badge="New">
  Updates
</AvakioButton>
<AvakioButton variant="primary" badge={5} icon={<Bell size={16} />}>
  Notifications
</AvakioButton>
```

## Button Types

```tsx
import { Settings, Heart } from 'lucide-react';

{/* Default button with icon and label */}
<AvakioButton type="default" icon={<Settings size={16} />}>Settings</AvakioButton>

{/* Icon-only button (square) */}
<AvakioButton type="icon" icon={<Heart size={20} />} tooltip="Like" />

{/* Icon button (same as icon, alias) */}
<AvakioButton type="iconButton" icon={<Heart size={20} />} tooltip="Favorite" />

{/* Icon above label layout */}
<AvakioButton type="iconTop" icon={<Settings size={24} />}>Settings</AvakioButton>
```

## Alignment & Auto-width

```tsx
{/* Text alignment for block buttons */}
<AvakioButton align="left" block>Left Aligned</AvakioButton>
<AvakioButton align="center" block>Center Aligned</AvakioButton>
<AvakioButton align="right" block>Right Aligned</AvakioButton>

{/* Auto-width fits content instead of default width */}
<AvakioButton autowidth>Fits Content</AvakioButton>
```

## Tooltips & Hotkeys

```tsx
{/* Tooltip on hover */}
<AvakioButton tooltip="Save your work">Save</AvakioButton>

{/* Keyboard hotkey triggers click */}
<AvakioButton 
  hotkey="ctrl+s" 
  onClick={() => console.log('Saved!')}
>
  Save (Ctrl+S)
</AvakioButton>

{/* Hotkeys support: ctrl, shift, alt, and keys */}
<AvakioButton hotkey="ctrl+shift+k">Keyboard Shortcut</AvakioButton>
<AvakioButton hotkey="delete">Delete</AvakioButton>
```

## Image Buttons

```tsx
{/* Use image instead of icon */}
<AvakioButton image="https://example.com/avatar.jpg">
  Profile
</AvakioButton>

{/* Image with icon-only type */}
<AvakioButton 
  type="icon" 
  image="https://example.com/avatar.jpg"
  tooltip="User profile"
/>
```

## Loading State

```tsx
<AvakioButton variant="primary" loading>
  Processing...
</AvakioButton>
```

## Block & Sizes

```tsx
<AvakioButton size="sm">Small</AvakioButton>
<AvakioButton size="md">Medium</AvakioButton>
<AvakioButton size="lg">Large</AvakioButton>
<AvakioButton block>Full width</AvakioButton>
```

## Form Integration

```tsx
{/* Buttons with name and value for form submission */}
<form onSubmit={handleSubmit}>
  <AvakioButton type="submit" name="action" value="save">
    Save
  </AvakioButton>
  <AvakioButton type="submit" name="action" value="draft">
    Save as Draft
  </AvakioButton>
  <AvakioButton type="button">Cancel</AvakioButton>
</form>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | `string` | `undefined` | Optional text (children override) |
| `icon` | `ReactNode` | `undefined` | Left icon |
| `iconRight` | `ReactNode` | `undefined` | Right icon |
| `image` | `string` | `undefined` | Image URL (replaces icon) |
| `variant` | `'primary'\|'secondary'\|'outline'\|'ghost'\|'danger'` | `'primary'` | Visual style |
| `size` | `'sm'\|'md'\|'lg'` | `'md'` | Button size |
| `type` | `'default'\|'icon'\|'iconButton'\|'iconTop'` | `'default'` | Layout type |
| `align` | `'left'\|'center'\|'right'` | `'center'` | Text alignment |
| `block` | `boolean` | `false` | Full width |
| `autowidth` | `boolean` | `false` | Fit content width |
| `loading` | `boolean` | `false` | Shows spinner and disables button |
| `badge` | `string\|number` | `undefined` | Small badge beside label |
| `tooltip` | `string` | `undefined` | Tooltip text on hover |
| `hotkey` | `string` | `undefined` | Keyboard shortcut (e.g., "ctrl+s") |
| `popup` | `string` | `undefined` | Popup reference ID |
| `value` | `string` | `undefined` | Form value attribute |
| `name` | `string` | `undefined` | Form name attribute |
| `id` | `string` | `undefined` | HTML ID attribute |
| `testId` | `string` | `undefined` | Test ID for testing |
| `disabled` | `boolean` | `false` | Disable interaction |
| `className` | `string` | `''` | Custom classes |
| `...rest` | `ButtonHTMLAttributes` | - | Native button props |

### Type Details

- **`default`**: Standard button with optional icon on left/right
- **`icon`**: Icon-only button (square aspect ratio, no label shown)
- **`iconButton`**: Alias for `icon` type
- **`iconTop`**: Vertical layout with icon above label

### Hotkey Format

Hotkeys support modifier keys and regular keys:
- Modifiers: `ctrl`, `shift`, `alt`, `meta`
- Combine with `+`: `ctrl+s`, `ctrl+shift+k`, `alt+enter`
- Special keys: `delete`, `escape`, `enter`, `space`, etc.

## Theming

Button colors respond to `data-admin-theme` on any ancestor. Supported themes: Material, Flat, Compact, Dark, Ocean, Sunset.

```tsx
document.documentElement.setAttribute('data-admin-theme', 'ocean');
```

## Example

See [avakio-button-example.tsx](./avakio-button-example.tsx) for comprehensive demos including:
- All variants and states (disabled, loading)
- All sizes and block layout
- Button types (icon-only, icon-top)
- Alignment and auto-width
- Tooltips and keyboard hotkeys
- Image buttons
- Form integration with name/value attributes

