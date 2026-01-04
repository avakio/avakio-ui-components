# AvakioFieldset

A grouping control based on the HTML `<fieldset>` element, designed to visually group related form elements with an optional legend/label.

## Features

- **Themed Variants**: Supports material, flat, compact, dark, ocean, and sunset themes
- **Collapsible**: Can be made collapsible to save space
- **Custom Padding**: Configurable horizontal and vertical padding
- **Borderless Mode**: Option to hide borders
- **Icon Support**: Display icons before the label
- **Disabled State**: Can be disabled to prevent interaction
- **Ref Methods**: Programmatic control via ref

## Basic Usage

```tsx
import { AvakioFieldset } from '@/components/avakio/ui-controls/avakio-fieldset';

function MyComponent() {
  return (
    <AvakioFieldset label="Personal Information">
      <input type="text" placeholder="First Name" />
      <input type="text" placeholder="Last Name" />
      <input type="email" placeholder="Email" />
    </AvakioFieldset>
  );
}
```

## With Theme

```tsx
<AvakioFieldset 
  label="Settings" 
  theme="material"
>
  {/* content */}
</AvakioFieldset>
```

## Collapsible Fieldset

```tsx
import { useState } from 'react';

function MyComponent() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <AvakioFieldset
      label="Advanced Options"
      collapsible
      collapsed={collapsed}
      onCollapse={setCollapsed}
    >
      {/* content */}
    </AvakioFieldset>
  );
}
```

## With Icon

```tsx
import { User } from 'lucide-react';

<AvakioFieldset 
  label="User Info" 
  icon={<User size={14} />}
>
  {/* content */}
</AvakioFieldset>
```

## Borderless

```tsx
<AvakioFieldset 
  label="Preferences" 
  borderless
>
  {/* content */}
</AvakioFieldset>
```

## Custom Padding

```tsx
<AvakioFieldset 
  label="Content" 
  paddingX={24}
  paddingY={20}
>
  {/* content */}
</AvakioFieldset>
```

## Using Ref Methods

```tsx
import { useRef } from 'react';
import { AvakioFieldset, AvakioFieldsetRef } from '@/components/avakio/ui-controls/avakio-fieldset';

function MyComponent() {
  const fieldsetRef = useRef<AvakioFieldsetRef>(null);

  const handleToggle = () => {
    fieldsetRef.current?.toggle();
  };

  const handleDisable = () => {
    fieldsetRef.current?.disable();
  };

  return (
    <>
      <AvakioFieldset
        ref={fieldsetRef}
        label="My Fieldset"
        collapsible
      >
        {/* content */}
      </AvakioFieldset>
      <button onClick={handleToggle}>Toggle</button>
      <button onClick={handleDisable}>Disable</button>
    </>
  );
}
```

## Props

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `label` | `string` | - | Legend/label text for the fieldset |
| `children` | `ReactNode` | - | Body content of the fieldset |
| `borderless` | `boolean` | `false` | Whether to hide the border |
| `theme` | `'material' \| 'flat' \| 'compact' \| 'dark' \| 'ocean' \| 'sunset'` | - | Theme variant |
| `disabled` | `boolean` | `false` | Disabled state |
| `width` | `number \| string` | - | Width of the fieldset |
| `height` | `number \| string` | - | Height of the fieldset |
| `paddingX` | `number` | `18` | Horizontal padding (px) |
| `paddingY` | `number` | `16` | Vertical padding (px) |
| `collapsible` | `boolean` | `false` | Whether the fieldset is collapsible |
| `defaultCollapsed` | `boolean` | `false` | Default collapsed state (uncontrolled) |
| `collapsed` | `boolean` | - | Controlled collapsed state |
| `onCollapse` | `(collapsed: boolean) => void` | - | Callback when collapsed state changes |
| `icon` | `ReactNode` | - | Icon before the label |
| `css` | `React.CSSProperties` | - | Custom inline styles |
| `className` | `string` | `''` | Additional CSS class name |
| `id` | `string` | - | Unique identifier |
| `testId` | `string` | - | Test ID for testing |

## Ref Methods

| Method | Type | Description |
|--------|------|-------------|
| `getNode()` | `() => HTMLFieldSetElement \| null` | Get the fieldset DOM node |
| `getBody()` | `() => HTMLDivElement \| null` | Get the body container element |
| `isEnabled()` | `() => boolean` | Check if enabled |
| `enable()` | `() => void` | Enable the fieldset |
| `disable()` | `() => void` | Disable the fieldset |
| `collapse()` | `() => void` | Collapse (if collapsible) |
| `expand()` | `() => void` | Expand (if collapsible) |
| `isCollapsed()` | `() => boolean` | Check if collapsed |
| `toggle()` | `() => void` | Toggle collapsed state |

## Theming

The component supports six built-in themes:

- **material**: Default Material Design inspired theme
- **flat**: Clean, flat design with uppercase labels
- **compact**: Smaller, more compact appearance
- **dark**: Dark background with light text
- **ocean**: Blue/teal color scheme with gradient
- **sunset**: Orange/warm color scheme with gradient

## Accessibility

- Uses native HTML `<fieldset>` and `<legend>` elements
- Keyboard accessible (Tab navigation)
- Focus indicators for accessibility
- Disabled state is properly communicated
- Collapsible sections are clickable via legend

## Related Components

- [AvakioAccordion](../avakio-accordion/README.md) - For multiple collapsible sections
- [AvakioLayout](../../layouts/avakio-layout/README.md) - For complex layouts
- [AvakioTemplate](../../views/avakio-template/README.md) - For content sections

