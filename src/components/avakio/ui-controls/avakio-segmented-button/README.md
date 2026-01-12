# AvakioSegmentedButton

A holistic panel that contains multiple buttons (segments). Ideal for switching between views, modes, or options.

## Features

- **Multiple Segments**: Display 2 or more button segments in a single control
- **Icons & Badges**: Support for icons and badge indicators on each segment
- **Controlled & Uncontrolled**: Works with or without external state management
- **Dynamic Options**: Add, remove, show, hide, enable, or disable options at runtime
- **Themes**: Supports all Avakio themes (material, flat, compact, dark, ocean, sunset)
- **Sizes**: Small, medium, and large variants
- **Alignment**: Left, center, or right alignment with fill option
- **Validation**: Required field support with error messages
- **Keyboard Navigation**: Full keyboard support with arrow keys
- **Accessibility**: Complete ARIA support with proper roles

## Installation

The component is part of the Avakio UI library. Import it from:

```tsx
import { AvakioSegmentedButton } from '@/components/avakio/ui-controls/avakio-segmented-button';
```

## Basic Usage

```tsx
import { AvakioSegmentedButton } from '@/components/avakio/ui-controls/avakio-segmented-button';
import { useState } from 'react';

function MyComponent() {
  const [view, setView] = useState('section-a');

  return (
    <AvakioSegmentedButton
      value={view}
      options={[
        { id: 'section-a', value: 'Section A' },
        { id: 'section-b', value: 'Section B' },
        { id: 'section-c', value: 'Section C' },
      ]}
      onChange={(val) => setView(val as string)}
    />
  );
}
```

## Simple String Options

Options can be provided as a simple array of strings:

```tsx
<AvakioSegmentedButton
  options={['Small', 'Medium', 'Large']}
  defaultValue="Medium"
/>
```

## With Icons

```tsx
import { Home, List, Calendar } from 'lucide-react';

<AvakioSegmentedButton
  options={[
    { id: 'home', value: 'Home', icon: <Home size={16} /> },
    { id: 'list', value: 'List', icon: <List size={16} /> },
    { id: 'calendar', value: 'Calendar', icon: <Calendar size={16} /> },
  ]}
  defaultValue="home"
/>
```

## With Badges

```tsx
<AvakioSegmentedButton
  options={[
    { id: 'inbox', value: 'Inbox', badge: 12 },
    { id: 'drafts', value: 'Drafts', badge: 3 },
    { id: 'sent', value: 'Sent' },
  ]}
  defaultValue="inbox"
/>
```

## Size Variants

```tsx
// Small
<AvakioSegmentedButton options={options} size="sm" />

// Medium (default)
<AvakioSegmentedButton options={options} size="md" />

// Large
<AvakioSegmentedButton options={options} size="lg" />
```

## Fill Mode

Segments stretch to fill available width:

```tsx
<AvakioSegmentedButton
  options={options}
  fill
/>
```

## With Label

```tsx
<AvakioSegmentedButton
  options={options}
  label="View Mode"
  labelWidth={100}
  labelPosition="left"  // or "top"
  required
/>
```

## Disabled Options

```tsx
<AvakioSegmentedButton
  options={[
    { id: 'available', value: 'Available' },
    { id: 'premium', value: 'Premium', disabled: true },
    { id: 'beta', value: 'Beta' },
  ]}
/>
```

## Imperative Methods

```tsx
import { useRef } from 'react';
import { AvakioSegmentedButton, AvakioSegmentedButtonRef } from './avakio-segmented-button';

function MyComponent() {
  const segmentedRef = useRef<AvakioSegmentedButtonRef>(null);

  const handleGetValue = () => {
    const value = segmentedRef.current?.getValue();
    console.log(value);
  };

  const handleSetValue = () => {
    segmentedRef.current?.setValue('section-b');
  };

  const handleHideOption = () => {
    segmentedRef.current?.hideOption('section-c');
  };

  return (
    <AvakioSegmentedButton
      ref={segmentedRef}
      options={options}
      defaultValue="section-a"
    />
  );
}
```

## Event Callbacks

```tsx
<AvakioSegmentedButton
  options={options}
  onBeforeTabClick={(id) => {
    // Return false to prevent selection
    if (id === 'blocked') return false;
  }}
  onAfterTabClick={(id) => {
    console.log(`Clicked: ${id}`);
  }}
  onChange={(value, option) => {
    console.log(`Changed to: ${value}`, option);
  }}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` | - | Unique identifier |
| `testId` | `string` | - | Test ID for testing |
| `name` | `string` | - | Name for form submission |
| `value` | `string \| number \| null` | - | Selected value (controlled) |
| `defaultValue` | `string \| number` | - | Default value (uncontrolled) |
| `options` | `AvakioSegmentedOption[] \| string[]` | `[]` | Array of options |
| `label` | `string` | - | Label text (rendered via AvakioControlLabel) |
| `labelWidth` | `number` | `120` | Label width in pixels (rendered via AvakioControlLabel) |
| `labelAlign` | `'left' \| 'right'` | `'left'` | Label text alignment (rendered via AvakioControlLabel) |
| `labelPosition` | `'left' \| 'top'` | `'left'` | Label position (rendered via AvakioControlLabel) |
| `required` | `boolean` | `false` | Mark as required |
| `error` | `string` | - | Error message |
| `invalidMessage` | `string` | - | Validation message |
| `bottomLabel` | `string` | - | Text below the control (rendered via AvakioControlLabel) |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Button size |
| `align` | `'left' \| 'center' \| 'right'` | `'left'` | Content alignment |
| `theme` | `string` | - | Theme variant |
| `fill` | `boolean` | `false` | Fill available width |
| `optionWidth` | `number` | - | Fixed width per option |
| `disabled` | `boolean` | `false` | Disable the control |
| `borderless` | `boolean` | `false` | Remove borders |
| `className` | `string` | - | CSS class name |
| `css` | `CSSProperties` | - | Inline styles |
| `width` | `number \| string` | - | Component width |
| `height` | `number \| string` | - | Component height |
| `multiview` | `boolean` | `false` | Connect to multiview |
| `tooltip` | `string` | - | Tooltip text |
| `onChange` | `(value, option) => void` | - | Value change callback |
| `onBeforeTabClick` | `(id) => boolean \| void` | - | Before click callback |
| `onAfterTabClick` | `(id) => void` | - | After click callback |
| `onOptionAdd` | `(option) => void` | - | Option added callback |
| `onOptionRemove` | `(id) => void` | - | Option removed callback |

## Option Interface

```tsx
interface AvakioSegmentedOption {
  id: string | number;      // Unique identifier
  value: string;            // Display label
  icon?: React.ReactNode;   // Optional icon
  badge?: string | number;  // Optional badge
  disabled?: boolean;       // Disable this option
  hidden?: boolean;         // Hide this option
  tooltip?: string;         // Tooltip for this option
  ariaControls?: string;    // ARIA controls ID
}
```

## Ref Methods

| Method | Signature | Description |
|--------|-----------|-------------|
| `getValue` | `() => string \| number \| null` | Get current value |
| `setValue` | `(value) => void` | Set selected value |
| `getOption` | `(id) => AvakioSegmentedOption \| undefined` | Get option by ID |
| `getOptions` | `() => AvakioSegmentedOption[]` | Get all options |
| `addOption` | `(option, index?) => void` | Add new option |
| `removeOption` | `(id) => void` | Remove option |
| `hideOption` | `(id) => void` | Hide option |
| `showOption` | `(id) => void` | Show hidden option |
| `disableOption` | `(id) => void` | Disable option |
| `enableOption` | `(id) => void` | Enable option |
| `optionIndex` | `(id) => number` | Get option index |
| `refresh` | `() => void` | Refresh component |
| `focus` | `() => void` | Focus component |
| `blur` | `() => void` | Remove focus |
| `enable` | `() => void` | Enable component |
| `disable` | `() => void` | Disable component |
| `isEnabled` | `() => boolean` | Check if enabled |
| `hide` | `() => void` | Hide component |
| `show` | `() => void` | Show component |
| `isVisible` | `() => boolean` | Check if visible |
| `validate` | `() => boolean` | Validate value |
| `getNode` | `() => HTMLDivElement \| null` | Get DOM element |

## Themes

The component supports all Avakio themes:

- **Material** - Teal accent (#1CA1C1)
- **Flat** - Blue-gray accent (#5E81AC)
- **Compact** - Teal accent with reduced padding (#00796B)
- **Dark** - Dark mode with blue accent
- **Ocean** - Deep blue accent (#0277BD)
- **Sunset** - Orange accent (#f57c00)

Apply themes via the `data-admin-theme` attribute or the `theme` prop:

```tsx
<AvakioSegmentedButton theme="dark" options={options} />
```

## Keyboard Navigation

- **Arrow Left/Up**: Move to previous segment
- **Arrow Right/Down**: Move to next segment
- **Home**: Move to first segment
- **End**: Move to last segment
- **Enter/Space**: Select focused segment

## Accessibility

- Uses `role="tablist"` for the container
- Each segment has `role="tab"` with appropriate `aria-selected`
- Disabled segments have `aria-disabled="true"`
- Supports `aria-controls` for connected content panels
- Proper focus management with `tabindex`

## Related Components

- [AvakioTabBar](../avakio-tabbar/README.md) - Tab navigation with closable tabs
- [AvakioToggleButton](../avakio-toggle-button/README.md) - Two-state toggle button
- [AvakioButton](../avakio-button/README.md) - Standard button component

