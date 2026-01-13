# AvakioToggleButton

A two-state button component that can be pressed and unpressed.

## Features

- **Two-state toggle**: Press to toggle between on/off states
- **Controlled & Uncontrolled**: Works with or without external state management
- **State-specific labels**: Different labels for on/off states (`onLabel`, `offLabel`)
- **State-specific icons**: Different icons for on/off states (`onIcon`, `offIcon`)
- **Multiple types**: Default, icon-only, icon-top, image, image-top layouts
- **Sizes**: Small, medium, and large variants
- **Themes**: Supports all Avakio themes (material, flat, compact, dark, ocean, sunset)
- **Keyboard shortcuts**: Configurable hotkey support
- **Accessibility**: Full ARIA support with `aria-pressed` attribute
- **Ref API**: Programmatic control via ref methods

## Installation

The component is part of the Avakio UI library. Import it from:

```tsx
import { AvakioToggleButton } from '@/components/avakio/ui-controls/avakio-toggle-button';
```

## Basic Usage

```tsx
import { AvakioToggleButton } from '@/components/avakio/ui-controls/avakio-toggle-button';
import { useState } from 'react';

function MyComponent() {
  const [isEnabled, setIsEnabled] = useState(false);

  return (
    <AvakioToggleButton
      id="feature-toggle"
      label="Toggle Feature"
      value={isEnabled}
      onChange={({ value }) => setIsEnabled(value)}
    />
  );
}
```

## With Different On/Off Labels

```tsx
<AvakioToggleButton
  id="enable-toggle"
  onLabel="Enabled"
  offLabel="Disabled"
  value={isEnabled}
  onChange={({ value }) => setIsEnabled(value)}
/>
```

## With Icons

```tsx
import { Play, Pause } from 'lucide-react';

<AvakioToggleButton
  id="play-toggle"
  onLabel="Playing"
  offLabel="Paused"
  onIcon={<Pause size={16} />}
  offIcon={<Play size={16} />}
  value={isPlaying}
  onChange={({ value }) => setIsPlaying(value)}
/>
```

## Icon Only Type

```tsx
<AvakioToggleButton
  id="sound-toggle"
  type="icon"
  onIcon={<Volume2 size={16} />}
  offIcon={<VolumeX size={16} />}
  value={isMuted}
  onChange={({ value }) => setIsMuted(value)}
  tooltip="Toggle sound"
/>
```

## Icon Top Type

```tsx
<AvakioToggleButton
  id="power-toggle"
  type="iconTop"
  onLabel="Power On"
  offLabel="Power Off"
  icon={<Power size={24} />}
  value={isPowerOn}
  onChange={({ value }) => setIsPowerOn(value)}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` | - | Unique identifier passed to onChange callback |
| `testId` | `string` | - | Test ID for testing purposes |
| `name` | `string` | - | Name for form submission |
| `value` | `boolean` | - | Current pressed state (controlled) |
| `defaultValue` | `boolean` | `false` | Default pressed state (uncontrolled) |
| `label` | `string` | - | Label text (same for both states) |
| `onLabel` | `string` | - | Label when pressed/on |
| `offLabel` | `string` | - | Label when unpressed/off |
| `icon` | `ReactNode` | - | Icon (same for both states) |
| `onIcon` | `ReactNode` | - | Icon when pressed/on |
| `offIcon` | `ReactNode` | - | Icon when unpressed/off |
| `image` | `string` | - | Image URL (same for both states) |
| `onImage` | `string` | - | Image URL when pressed/on |
| `offImage` | `string` | - | Image URL when unpressed/off |
| `type` | `'default' \| 'icon' \| 'iconTop' \| 'image' \| 'imageTop'` | `'default'` | Button type/layout |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Button size |
| `theme` | `'material' \| 'flat' \| 'compact' \| 'dark' \| 'ocean' \| 'sunset'` | - | Theme variant |
| `disabled` | `boolean` | `false` | Disabled state |
| `autowidth` | `boolean` | `false` | Auto-adjust width to content |
| `block` | `boolean` | `false` | Full width button |
| `tooltip` | `string` | - | Tooltip text |
| `hotkey` | `string` | - | Keyboard hotkey (e.g., 'ctrl+t') |
| `className` | `string` | - | CSS class name |
| `css` | `CSSProperties` | - | Inline styles |
| `width` | `number \| string` | - | Width |
| `height` | `number \| string` | - | Height |
| `padding` | `string \| number \| [number, number, number, number]` | - | Padding |
| `margin` | `string \| number \| [number, number, number, number]` | - | Margin |
| `onChange` | `({ id, value }) => void` | - | Callback when value changes. Receives `{ id, value }` object |
| `onClick` | `(e: MouseEvent) => void` | - | Callback when clicked |
| `onFocus` | `(e: FocusEvent) => void` | - | Callback when focused |
| `onBlur` | `(e: FocusEvent) => void` | - | Callback when blurred |

## Ref Methods

Access these methods via a ref:

```tsx
const toggleRef = useRef<AvakioToggleButtonRef>(null);

// Get current value
const value = toggleRef.current?.getValue();

// Set value
toggleRef.current?.setValue(true);

// Toggle state
toggleRef.current?.toggle();

// Focus/blur
toggleRef.current?.focus();
toggleRef.current?.blur();

// Enable/disable
toggleRef.current?.enable();
toggleRef.current?.disable();
toggleRef.current?.isEnabled();

// Get HTML element
const node = toggleRef.current?.getNode();
```

| Method | Return Type | Description |
|--------|-------------|-------------|
| `getValue()` | `boolean` | Get the current pressed state |
| `setValue(value)` | `void` | Set the pressed state |
| `toggle()` | `void` | Toggle the state |
| `focus()` | `void` | Focus the button |
| `blur()` | `void` | Blur the button |
| `enable()` | `void` | Enable the button |
| `disable()` | `void` | Disable the button |
| `isEnabled()` | `boolean` | Check if enabled |
| `getNode()` | `HTMLButtonElement \| null` | Get the HTML element |

## Hotkey Support

Bind a keyboard shortcut to toggle the button:

```tsx
<AvakioToggleButton
  id="hotkey-toggle"
  label="Toggle (Ctrl+T)"
  hotkey="ctrl+t"
  value={isEnabled}
  onChange={({ value }) => setIsEnabled(value)}
/>
```

Supported modifiers: `ctrl`, `shift`, `alt`

## Theming

The component automatically adapts to the current Avakio theme. You can also explicitly set a theme:

```tsx
<AvakioToggleButton
  id="dark-theme-toggle"
  theme="dark"
  label="Dark Theme Toggle"
  value={isEnabled}
  onChange={({ value }) => setIsEnabled(value)}
/>
```

## Accessibility

- Uses `role="button"` with `aria-pressed` attribute
- Keyboard accessible (Space/Enter to toggle)
- Supports custom tooltips for screen readers
- Focus visible styles for keyboard navigation

## Related Components

- [AvakioButton](../avakio-button/README.md) - Standard button component
- [AvakioCheckbox](../avakio-checkbox/README.md) - Checkbox for boolean values
- [AvakioSwitch](../avakio-switch/README.md) - Switch toggle control (if available)

