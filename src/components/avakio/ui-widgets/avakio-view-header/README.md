# AvakioViewHeader

A themed header component for displaying labels, titles, and subtitles with support for all Avakio themes.

## Features

- **Flexible Display**: Show/hide label, title, and subtitle independently
- **Theme Support**: Full support for all 6 Avakio themes (material, flat, compact, dark, ocean, sunset)
- **Customizable Content**: Easily set label, title, and subtitle text
- **Responsive Design**: Adapts to different screen sizes
- **Clean Typography**: Modern font system with optimized readability

## Installation

```tsx
import { AvakioViewHeader } from '@/components/avakio/ui-widgets/avakio-view-header/avakio-view-header';
import '@/components/avakio/ui-widgets/avakio-view-header/avakio-view-header.css';
```

## Basic Usage

```tsx
<AvakioViewHeader
  label="AVAKIO COMPONENTS"
  title="AvakioText Component"
  subTitle="A versatile text input component with labels, validation, icons, and multiple input types."
  theme="material"
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `showLabel` | `boolean` | `true` | Show/hide the label |
| `showTitle` | `boolean` | `true` | Show/hide the title |
| `showSubTitle` | `boolean` | `true` | Show/hide the subtitle |
| `label` | `string` | `''` | Label text (typically uppercase) |
| `title` | `string` | `''` | Title text (main heading) |
| `subTitle` | `string` | `''` | Subtitle text (description) |
| `theme` | `string` | `'material'` | Theme name (material, flat, compact, dark, ocean, sunset) |
| `className` | `string` | `''` | Additional CSS class names |
| `style` | `React.CSSProperties` | `{}` | Inline styles |

## Examples

### Full Header with All Elements

```tsx
<AvakioViewHeader
  label="DOCUMENTATION"
  title="Getting Started"
  subTitle="Learn how to integrate and use Avakio components in your React applications."
  theme="material"
/>
```

### Title Only

```tsx
<AvakioViewHeader
  showLabel={false}
  showSubTitle={false}
  title="Simple Page Header"
  theme="material"
/>
```

### Title and Subtitle

```tsx
<AvakioViewHeader
  showLabel={false}
  title="Dashboard Overview"
  subTitle="Monitor your key metrics and performance indicators."
  theme="material"
/>
```

### Label and Title

```tsx
<AvakioViewHeader
  showSubTitle={false}
  label="SETTINGS"
  title="User Preferences"
  theme="material"
/>
```

## Themes

The component supports all Avakio themes:

- **material**: Orange gradient (default)
- **flat**: Blue gradient
- **compact**: Teal gradient with reduced padding
- **dark**: Blue gradient
- **ocean**: Deep blue gradient
- **sunset**: Orange gradient

Each theme includes:
- Custom gradient backgrounds
- White text for optimal contrast
- Theme-specific color schemes

## Typography

The component uses a system font stack for optimal readability:
- **Label**: 12px, 600 weight, uppercase, with letter spacing
- **Title**: 32px, 600 weight, with tight letter spacing
- **Subtitle**: 14px, 400 weight, with slight letter spacing

## Responsive Behavior

On mobile devices (< 768px):
- Reduced padding
- Smaller title font size (24px)
- Smaller subtitle font size (13px)

## Styling

### Custom Colors

You can override theme colors using inline styles:

```tsx
<AvakioViewHeader
  title="Custom Header"
  style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
/>
```

### Additional Classes

Add custom classes for further styling:

```tsx
<AvakioViewHeader
  title="Custom Header"
  className="my-custom-header"
/>
```

## Best Practices

1. **Use Label for Context**: The label should provide context about the section or component
2. **Keep Titles Concise**: Titles should be clear and brief
3. **Subtitle for Description**: Use subtitle to provide additional context or description
4. **Theme Consistency**: Use the same theme as your parent components
5. **Conditional Display**: Hide elements you don't need using show* props

## Accessibility

- Semantic HTML structure with proper heading hierarchy
- High contrast text on colored backgrounds
- Responsive font sizes for readability

## See Also

- [AvakioView](../views/avakio-view) - Container component with theming
- [AvakioTemplate](../views/avakio-template) - Template component for layouts

