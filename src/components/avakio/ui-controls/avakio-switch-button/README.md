# AvakioSwitchButton

A slider variation of the Toggle button and Checkbox for turning settings on and off.

## Features

- **Two States**: Simple on/off toggle functionality
- **Multiple Label Options**: Left label, right label, and labels on the switch track
- **Configurable Label Width**: Customize the width of the left label
- **On/Off Labels**: Display text on the switch track (e.g., "ON"/"OFF", "Yes"/"No")
- **Three Sizes**: Small, medium, and large variants
- **Six Themes**: Material, Flat, Compact, Dark, Ocean, and Sunset
- **Form Integration**: Support for required, invalid, and disabled states
- **Validation Messages**: Display error messages below the switch
- **Bottom Labels**: Add help text below the control
- **Ref Methods**: Programmatic control via imperative API
- **Accessible**: Full keyboard support and ARIA attributes

## Installation

The component is part of the Avakio UI library. Import it from:

```tsx
import { AvakioSwitchButton } from '@/components/avakio/ui-controls/avakio-switch-button';
```

## Basic Usage

```tsx
import { AvakioSwitchButton } from '@/components/avakio/ui-controls/avakio-switch-button';

// Simple switch with left label
<AvakioSwitchButton
  label="Sound"
  value={soundOn}
  onChange={setSoundOn}
/>

// Switch with right label
<AvakioSwitchButton
  labelWidth={0}
  labelRight="Enable notifications"
  value={notificationsOn}
  onChange={setNotificationsOn}
/>

// Switch with on/off labels on track
<AvakioSwitchButton
  label="Power"
  onLabel="ON"
  offLabel="OFF"
  value={powerOn}
  onChange={setPowerOn}
/>
```

## Switch Types

### Default Switch (Left Label)

```tsx
<AvakioSwitchButton
  label="Sound"
  value={soundOn}
  onChange={setSoundOn}
/>
```

### Right-hand Label

```tsx
<AvakioSwitchButton
  labelWidth={0}
  labelRight="Enable dark mode"
  value={darkMode}
  onChange={setDarkMode}
/>
```

### Labels on Switch Track

```tsx
<AvakioSwitchButton
  label="Status"
  onLabel="ON"
  offLabel="OFF"
  value={isOn}
  onChange={setIsOn}
/>
```

## Sizes

```tsx
// Small
<AvakioSwitchButton size="sm" label="Small" />

// Medium (default)
<AvakioSwitchButton size="md" label="Medium" />

// Large
<AvakioSwitchButton size="lg" label="Large" />
```

## States

```tsx
// Disabled
<AvakioSwitchButton label="Disabled" disabled value={true} />

// Required
<AvakioSwitchButton label="Required" required value={value} onChange={setValue} />

// Invalid with message
<AvakioSwitchButton
  label="Invalid"
  invalid
  invalidMessage="This field is required"
  value={false}
/>

// With bottom label
<AvakioSwitchButton
  label="Setting"
  bottomLabel="This affects all users"
  value={value}
  onChange={setValue}
/>
```

## Themes

```tsx
// Material (default)
<AvakioSwitchButton theme="material" label="Material" />

// Flat
<AvakioSwitchButton theme="flat" label="Flat" />

// Compact
<AvakioSwitchButton theme="compact" label="Compact" />

// Dark
<AvakioSwitchButton theme="dark" label="Dark" />

// Ocean
<AvakioSwitchButton theme="ocean" label="Ocean" />

// Sunset
<AvakioSwitchButton theme="sunset" label="Sunset" />
```

## Ref Methods

Use imperative methods to control the switch programmatically:

```tsx
const switchRef = useRef<AvakioSwitchButtonRef>(null);

// Get current value
const value = switchRef.current?.getValue();

// Set value
switchRef.current?.setValue(true);

// Toggle
switchRef.current?.toggle();

// Focus/blur
switchRef.current?.focus();
switchRef.current?.blur();

// Enable/disable
switchRef.current?.enable();
switchRef.current?.disable();
const isEnabled = switchRef.current?.isEnabled();

// Get HTML element
const node = switchRef.current?.getNode();

// Refresh/repaint
switchRef.current?.refresh();
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `boolean \| number` | `undefined` | Current on/off state (controlled) |
| `defaultValue` | `boolean \| number` | `false` | Default state (uncontrolled) |
| `label` | `string` | `undefined` | Left label text (rendered via AvakioControlLabel) |
| `labelWidth` | `number` | `80` | Width of left label in pixels (rendered via AvakioControlLabel) |
| `labelRight` | `string` | `undefined` | Right label text |
| `onLabel` | `string` | `undefined` | Text shown on switch when "on" |
| `offLabel` | `string` | `undefined` | Text shown on switch when "off" |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Switch size |
| `theme` | `string` | `undefined` | Theme variant |
| `disabled` | `boolean` | `false` | Disabled state |
| `required` | `boolean` | `false` | Shows required indicator |
| `invalid` | `boolean` | `false` | Invalid/error state |
| `invalidMessage` | `string` | `undefined` | Error message text |
| `bottomLabel` | `string` | `undefined` | Help text below switch (rendered via AvakioControlLabel) |
| `tooltip` | `string` | `undefined` | Tooltip on hover |
| `onChange` | `(value: boolean) => void` | `undefined` | Change callback |

## Ref Methods

| Method | Type | Description |
|--------|------|-------------|
| `getValue()` | `() => boolean` | Get current on/off state |
| `setValue(value)` | `(value: boolean) => void` | Set the on/off state |
| `toggle()` | `() => void` | Toggle the state |
| `focus()` | `() => void` | Focus the switch |
| `blur()` | `() => void` | Blur the switch |
| `enable()` | `() => void` | Enable the switch |
| `disable()` | `() => void` | Disable the switch |
| `isEnabled()` | `() => boolean` | Check if enabled |
| `getNode()` | `() => HTMLButtonElement \| null` | Get HTML element |
| `refresh()` | `() => void` | Refresh/repaint |

## Accessibility

The component includes:
- `role="switch"` for screen readers
- `aria-checked` state
- `aria-disabled` state
- Full keyboard navigation
- Focus indicators

## Related Components

- [AvakioToggleButton](../avakio-toggle-button/README.md) - Button-style toggle
- [AvakioCheckbox](../avakio-checkbox/README.md) - Standard checkbox control

