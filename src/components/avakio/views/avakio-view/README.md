# AvakioView Component

A versatile, theme-aware view container component. The AvakioView provides a flexible base for creating UI layouts with support for animations, theming, sizing constraints, and event handling.

## Features

- 🎨 **Six Built-in Themes**: Material, Flat, Compact, Dark, Ocean, and Sunset
- 🎬 **Animations**: Fade, slide, and flip animations for showing/hiding
- 📏 **Flexible Sizing**: Support for fixed, flexible (gravity), and constrained (min/max) sizing
- 🎯 **Event Handlers**: onClick, onFocus, onBlur, onKeyPress, onShow, onHide, onResize
- 🔄 **Dynamic State**: Show/hide and enable/disable views programmatically
- 🎭 **Borderless Mode**: Remove borders for seamless integration
- 📱 **Responsive**: Works great on all screen sizes
- ♿ **Accessible**: Proper ARIA attributes and keyboard navigation

## Installation

```bash
# The component is already part of your project
# Located at: client/src/components/avakio/avakio-view/
```

## Basic Usage

```tsx
import { AvakioView } from '@/components/avakio/views/avakio-view/avakio-view';

function MyComponent() {
  return (
    <AvakioView
      theme="material"
      width={300}
      height={200}
      padding={20}
    >
      <h2>Hello World</h2>
      <p>This is a basic view container.</p>
    </AvakioView>
  );
}
```

## Props

### Basic Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Content to display inside the view |
| `className` | `string` | `''` | Additional CSS class names |
| `css` | `CSSProperties` | - | Inline CSS styles object |
| `id` | `string` | - | HTML id attribute |
| `theme` | `'material' \| 'flat' \| 'compact' \| 'dark' \| 'ocean' \| 'sunset'` | `'material'` | Visual theme |

### Sizing Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `width` | `number \| string` | - | Width in pixels or CSS value |
| `height` | `number \| string` | - | Height in pixels or CSS value |
| `minWidth` | `number \| string` | - | Minimum width |
| `minHeight` | `number \| string` | - | Minimum height |
| `maxWidth` | `number \| string` | - | Maximum width |
| `maxHeight` | `number \| string` | - | Maximum height |
| `gravity` | `number` | - | Flex grow factor for flexible layouts |
| `padding` | `number \| string \| [number, number, number, number]` | - | Internal padding (single value, string, or [top, right, bottom, left]) |

### State Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `hidden` | `boolean` | `false` | Whether the view is initially hidden |
| `disabled` | `boolean` | `false` | Whether the view is disabled |
| `borderless` | `boolean` | `false` | Remove all borders from the view |
| `animate` | `boolean \| 'fade' \| 'slide' \| 'flip'` | `false` | Animation type for show/hide |
| `type` | `'header' \| 'section' \| 'clean'` | `'clean'` | View type for specialized styling |

### Type Prop

The `type` prop allows specialized styling for different view purposes:

- **`'clean'`** (default): Minimal styling with standard borders and theme-specific border-radius
- **`'header'`**: Designed for header sections with special border rules
  - Horizontal layout with space-between alignment
  - Font-weight: 600
  - Min-height: 60px
  - Padding: 16px 24px
  - When `borderless={false}`: Only displays bottom border, border-radius is set to 0 (applies to all themes)
  - When `borderless={true}`: No borders at all
- **`'section'`**: Content section with padding: 20px and margin-bottom: 18px

**Header Type Border Rules:**
```tsx
// Header with bottom border only (border-radius: 0)
<AvakioView type="header" borderless={false} theme="material">
  <h1>My Header</h1>
</AvakioView>

// Header with no borders at all
<AvakioView type="header" borderless={true} theme="dark">
  <h1>Borderless Header</h1>
</AvakioView>
```

### Event Props

| Prop | Type | Description |
|------|------|-------------|
| `onShow` | `() => void` | Called when view becomes visible |
| `onHide` | `() => void` | Called when view becomes hidden |
| `onResize` | `(width: number, height: number) => void` | Called when view is resized |
| `onClick` | `(e: MouseEvent) => void` | Called when view is clicked |
| `onFocus` | `() => void` | Called when view receives focus |
| `onBlur` | `() => void` | Called when view loses focus |
| `onKeyPress` | `(e: KeyboardEvent) => void` | Called on key press |

## Examples

### View Types

```tsx
// Clean type (default) - standard view with borders and theme styling
<AvakioView type="clean" theme="material" padding={20}>
  <p>Standard view with default borders and styling</p>
</AvakioView>

// Header type with bottom border only (border-radius: 0)
<AvakioView type="header" borderless={false} theme="material">
  <h1>Page Title</h1>
  <button>Action</button>
</AvakioView>

// Header type without any borders
<AvakioView type="header" borderless={true} theme="dark">
  <h1>Seamless Header</h1>
</AvakioView>

// Section type for content areas
<AvakioView type="section" theme="ocean" padding={20}>
  <h2>Section Title</h2>
  <p>Section content with consistent padding</p>
</AvakioView>
```

### Themed Views

```tsx
<AvakioView theme="material" width={300} height={200} padding={20}>
  <h3>Material Theme</h3>
  <p>Clean and modern design</p>
</AvakioView>

<AvakioView theme="dark" width={300} height={200} padding={20}>
  <h3>Dark Theme</h3>
  <p>Perfect for dark mode</p>
</AvakioView>
```

### Animated Views

```tsx
<AvakioView
  animate="fade"
  hidden={!isVisible}
  onShow={() => console.log('View shown!')}
>
  <p>This view fades in when shown</p>
</AvakioView>

<AvakioView animate="slide">
  <p>This view slides in from top</p>
</AvakioView>

<AvakioView animate="flip">
  <p>This view flips in</p>
</AvakioView>
```

### Flexible Layouts with Gravity

```tsx
<div style={{ display: 'flex', gap: '16px' }}>
  <AvakioView gravity={1} height={150}>
    <p>Takes 1 part</p>
  </AvakioView>
  
  <AvakioView gravity={2} height={150}>
    <p>Takes 2 parts (twice as wide)</p>
  </AvakioView>
  
  <AvakioView gravity={1} height={150}>
    <p>Takes 1 part</p>
  </AvakioView>
</div>
```

### Size Constraints

```tsx
<AvakioView
  width="100%"
  minHeight={100}
  maxHeight={300}
  padding={20}
>
  <p>This view has minimum and maximum height constraints</p>
</AvakioView>

<AvakioView
  minWidth={200}
  maxWidth={600}
  padding={20}
>
  <p>This view has width constraints</p>
</AvakioView>
```

### Interactive Views

```tsx
const [isDisabled, setIsDisabled] = useState(false);

<AvakioView
  disabled={isDisabled}
  onClick={() => alert('View clicked!')}
  onFocus={() => console.log('Focused')}
  onBlur={() => console.log('Blurred')}
>
  <p>Click me!</p>
</AvakioView>
```

### Borderless Views

The `borderless` prop removes all borders from the view, making it perfect for seamless integration with other components or when creating custom layouts without visual separation.

```tsx
// Basic borderless view
<AvakioView borderless theme="material" padding={20}>
  <p>This view has no borders - perfect for seamless layouts</p>
</AvakioView>

// Borderless view in a layout
<div style={{ display: 'flex', gap: '16px' }}>
  <AvakioView borderless theme="ocean" padding={15} width="50%">
    <h4>No Borders</h4>
    <p>Integrates seamlessly</p>
  </AvakioView>
  <AvakioView theme="ocean" padding={15} width="50%">
    <h4>With Borders</h4>
    <p>Has visible borders</p>
  </AvakioView>
</div>

// Combining with other props
<AvakioView
  borderless
  theme="dark"
  padding={20}
  animate="fade"
  css={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
>
  <p>Borderless with custom styling and animations</p>
</AvakioView>
```

**Use Cases for Borderless:**
- Creating seamless card layouts
- Nested views that shouldn't have visual separation
- Custom themed containers
- Content areas that blend with the background
- Header and footer sections

### Nested Views

```tsx
<AvakioView theme="material" padding={20}>
  <h3>Parent View</h3>
  <div style={{ display: 'flex', gap: '16px' }}>
    <AvakioView theme="ocean" gravity={1} padding={15} borderless>
      <p>Child 1</p>
    </AvakioView>
    <AvakioView theme="sunset" gravity={1} padding={15} borderless>
      <p>Child 2</p>
    </AvakioView>
  </div>
</AvakioView>
```

## Imperative API with Ref

For advanced use cases, you can use `AvakioViewWithRef` to access imperative methods:

```tsx
import { AvakioViewWithRef, AvakioViewHandle } from '@/components/avakio/views/avakio-view/avakio-view';

function MyComponent() {
  const viewRef = useRef<AvakioViewHandle>(null);

  const handleShow = () => viewRef.current?.show();
  const handleHide = () => viewRef.current?.hide();
  const handleResize = () => viewRef.current?.resize(400, 300);

  return (
    <>
      <button onClick={handleShow}>Show</button>
      <button onClick={handleHide}>Hide</button>
      <button onClick={handleResize}>Resize</button>
      
      <AvakioViewWithRef ref={viewRef} theme="material">
        <p>Controlled view</p>
      </AvakioViewWithRef>
    </>
  );
}
```

### Available Ref Methods

- `show()` - Show the view
- `hide()` - Hide the view
- `enable()` - Enable the view
- `disable()` - Disable the view
- `resize(width?, height?)` - Resize the view
- `getNode()` - Get the DOM node
- `isVisible()` - Check if visible
- `isEnabled()` - Check if enabled

## Themes

### Material
- Clean and modern design with subtle shadows and rounded corners
- Border-radius: 4px
- Shadow: 0 2px 4px rgba(0, 0, 0, 0.1)
- Focus color: #1ca1c1

### Flat
- Minimalist design with no shadows and flat colors
- Border-radius: 0 (sharp edges)
- No box shadows
- Focus color: #5e81ac

### Compact
- Space-efficient design with reduced padding and smaller fonts
- Border-radius: 2px
- Padding: 8px
- Font-size: 14px
- Focus color: #00796b

### Dark
- Dark theme perfect for dark mode applications
- Border-radius: 6px
- Background: #1e293b
- Shadow: 0 4px 6px rgba(0, 0, 0, 0.3)
- Focus color: #3b82f6

### Ocean
- Blue-themed design with ocean-inspired colors
- Border-radius: 4px
- Background: #e3f2fd
- Shadow: 0 2px 8px rgba(2, 119, 189, 0.2)
- Focus color: #0277bd

### Sunset
- Warm orange-themed design inspired by sunset colors
- Border-radius: 4px
- Background: #fff3e0
- Shadow: 0 2px 8px rgba(245, 124, 0, 0.2)
- Focus color: #f57c00

**Note:** When `type="header"` and `borderless={false}`, the border-radius is overridden to 0 for all themes to ensure consistent header appearance.

## Styling

### Border Rules Summary

The AvakioView applies different border rules based on the `type` and `borderless` props:

| Type | Borderless | Result |
|------|-----------|--------|
| `'clean'` | `false` | All borders with theme-specific border-radius |
| `'clean'` | `true` | No borders, no shadows |
| `'header'` | `false` | **Bottom border only, border-radius: 0** (applies to all themes) |
| `'header'` | `true` | No borders at all |
| `'section'` | `false` | All borders with theme-specific border-radius |
| `'section'` | `true` | No borders, no shadows |

**Important:** When using `type="header"` with `borderless={false}`, the view will:
- Display only a bottom border (no top, left, or right borders)
- Have `border-radius: 0` to ensure straight edges
- This applies consistently across all themes (material, flat, compact, dark, ocean, sunset)

### Using CSS Classes

```tsx
<AvakioView className="my-custom-view">
  <p>Custom styled view</p>
</AvakioView>
```

### Using Inline Styles

```tsx
<AvakioView
  css={{
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
  }}
>
  <p>Gradient background</p>
</AvakioView>
```

### Utility Classes

The component includes utility classes:

- `.avakio-view-scrollable` - Enable scrolling
- `.avakio-view-no-scroll` - Disable scrolling
- `.avakio-view-flex` - Flex container
- `.avakio-view-flex-column` - Flex column
- `.avakio-view-flex-row` - Flex row
- `.avakio-view-center` - Center content
- `.avakio-view-full-height` - 100% height
- `.avakio-view-full-width` - 100% width

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Accessibility

- Proper ARIA attributes (`role="region"`, `aria-disabled`)
- Keyboard navigation support (focusable with Tab)
- Screen reader friendly
- Respects user's motion preferences

## Performance

- Uses ResizeObserver for efficient resize detection
- CSS-based animations with hardware acceleration
- Minimal re-renders with React hooks optimization

## License

Part of the Resume-Scribe project.

## Support

For issues, questions, or contributions, please refer to the main project repository.

