# AvakioLabel

A versatile label component providing static text display with theming, alignment, and HTML support.

## Features

- 📝 **Simple Text or HTML**: Display plain text or custom HTML content
- 🎨 **6 Built-in Themes**: Material, Flat, Compact, Dark, Ocean, Sunset
- 📐 **Flexible Alignment**: Left, center, right text alignment
- 🎯 **Size Control**: Configurable width, height, padding, and auto-width
- 🎭 **State Management**: Enable/disable, show/hide functionality
- 🔧 **Ref API**: Programmatic control via exposed methods
- 💅 **Custom Styling**: Override with CSS properties
- ♿ **Accessibility**: Tooltip support and disabled states

## Installation

This component is part of the Avakio UI library. Import it from the ui-controls directory:

```tsx
import { AvakioLabel } from '@/components/avakio/ui-controls/avakio-label';
```

## Basic Usage

```tsx
import { AvakioLabel } from '@/components/avakio/ui-controls/avakio-label';

function MyComponent() {
  return (
    <AvakioLabel 
      label="Hello, World!" 
      theme="material"
      align="left"
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | `''` | The text content of the label |
| `html` | `string` | - | Custom HTML content (overrides label if provided) |
| `align` | `'left' \| 'center' \| 'right'` | `'left'` | Text alignment |
| `width` | `number \| string` | - | Width of the label |
| `height` | `number \| string` | - | Height of the label |
| `theme` | `'material' \| 'flat' \| 'compact' \| 'dark' \| 'ocean' \| 'sunset'` | `'material'` | Theme variant |
| `className` | `string` | `''` | Additional CSS class name |
| `css` | `CSSProperties` | `{}` | Custom inline styles |
| `tooltip` | `string` | - | Tooltip text on hover |
| `disabled` | `boolean` | `false` | Disabled state (reduces opacity) |
| `hidden` | `boolean` | `false` | Hidden state (display: none) |
| `onClick` | `(e: MouseEvent) => void` | - | Click event handler |
| `autowidth` | `boolean` | `false` | Auto-adjust width based on content |
| `fontSize` | `number \| string` | - | Custom font size |
| `fontWeight` | `string` | - | Custom font weight (normal, bold, 100-900) |
| `color` | `string` | - | Custom text color |
| `backgroundColor` | `string` | - | Custom background color |
| `padding` | `string \| number \| [number, number, number, number]` | - | Custom padding (single value, string, or [top, right, bottom, left]) |
| `border` | `string` | - | Custom border |
| `borderRadius` | `string \| number` | - | Custom border radius |

## Ref Methods

The component exposes the following methods via ref:

```tsx
interface AvakioLabelRef {
  getValue: () => string;           // Get the label text
  setValue: (value: string) => void; // Set the label text
  setHTML: (html: string) => void;   // Set HTML content
  getNode: () => HTMLDivElement | null; // Get DOM element
  hide: () => void;                  // Hide the label
  show: () => void;                  // Show the label
  isVisible: () => boolean;          // Check visibility
  disable: () => void;               // Disable the label
  enable: () => void;                // Enable the label
  isEnabled: () => boolean;          // Check if enabled
}
```

### Example with Ref

```tsx
import { useRef } from 'react';
import { AvakioLabel, AvakioLabelRef } from '@/components/avakio/ui-controls/avakio-label';

function MyComponent() {
  const labelRef = useRef<AvakioLabelRef>(null);

  const updateLabel = () => {
    labelRef.current?.setValue('Updated text!');
  };

  const hideLabel = () => {
    labelRef.current?.hide();
  };

  return (
    <>
      <AvakioLabel ref={labelRef} label="Initial text" theme="material" />
      <button onClick={updateLabel}>Update</button>
      <button onClick={hideLabel}>Hide</button>
    </>
  );
}
```

## HTML Content

You can display custom HTML instead of plain text:

```tsx
<AvakioLabel 
  html="<span class='avakio-icon fas fa-user'></span> User Profile"
  theme="material"
/>

<AvakioLabel 
  html="<strong>Bold</strong> and <em>italic</em> text"
  theme="flat"
/>
```

## Alignment Examples

```tsx
<AvakioLabel label="Left aligned" align="left" width={200} />
<AvakioLabel label="Center aligned" align="center" width={200} />
<AvakioLabel label="Right aligned" align="right" width={200} />
```

## Custom Styling

```tsx
<AvakioLabel 
  label="Custom styled label"
  fontSize={18}
  fontWeight="bold"
  color="#ff5722"
  backgroundColor="#fff3e0"
  padding="12px 24px"
  borderRadius={8}
/>
```

## Themes

The component includes 6 pre-built themes:

- **material**: Blue accent with Material Design style
- **flat**: Nordic-inspired flat design with subtle background
- **compact**: Teal accent with reduced spacing
- **dark**: Dark background with light text
- **ocean**: Blue ocean colors with light background
- **sunset**: Orange/warm colors with cream background

```tsx
<AvakioLabel label="Material Theme" theme="material" />
<AvakioLabel label="Flat Theme" theme="flat" />
<AvakioLabel label="Compact Theme" theme="compact" />
<AvakioLabel label="Dark Theme" theme="dark" />
<AvakioLabel label="Ocean Theme" theme="ocean" />
<AvakioLabel label="Sunset Theme" theme="sunset" />
```

## Click Handling

```tsx
<AvakioLabel 
  label="Click me!"
  onClick={(e) => console.log('Label clicked!')}
  theme="material"
  css={{ cursor: 'pointer' }}
/>

