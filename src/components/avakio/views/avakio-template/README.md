# AvakioTemplate

A versatile template component for displaying HTML content with data binding.

## Features

- 📝 **String Templates** - Use `#property#` syntax for data binding
- ⚛️ **Function Templates** - Return JSX/React components dynamically
- 🎨 **6 Themes** - material, flat, compact, dark, ocean, sunset
- 🎯 **Border Types** - space, wide, clean, line, material
- 📜 **Scroll Modes** - x, y, xy scrolling support
- 🔄 **Imperative API** - Control component via ref methods
- 🌐 **URL Loading** - Load content from external URLs
- ♿ **Accessible** - ID and testId support for testing

## Installation

```typescript
import { AvakioTemplate, AvakioTemplateRef } from '@/components/avakio/views/avakio-template/avakio-template';
import '@/components/avakio/views/avakio-template/avakio-template.css';
```

## Basic Usage

### String Template with Data Binding

```tsx
<AvakioTemplate
  template={`
    <h3>#name#</h3>
    <p>Email: #email#</p>
    <p>Role: #role#</p>
  `}
  data={{
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Admin'
  }}
  theme="material"
/>
```

### Function Template

```tsx
<AvakioTemplate
  template={(data) => (
    <div>
      <h3>{data.name}</h3>
      <p>Email: {data.email}</p>
      <p>Role: {data.role}</p>
    </div>
  )}
  data={{
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Admin'
  }}
  theme="material"
/>
```

### Direct Content

```tsx
<AvakioTemplate
  content={
    <div>
      <h3>Welcome</h3>
      <p>Any React component can be used here</p>
    </div>
  }
  theme="material"
/>
```

### Load from URL

```tsx
<AvakioTemplate
  url="/api/templates/user-card"
  data={{ userId: 123 }}
  theme="material"
  onLoad={() => console.log('Template loaded')}
/>
```

### Padding Options

```tsx
{/* Single value - applies to all sides */}
<AvakioTemplate content="Content" padding={20} />

{/* String value - CSS format */}
<AvakioTemplate content="Content" padding="10px 20px" />

{/* Array - [top, right, bottom, left] */}
<AvakioTemplate content="Content" padding={[10, 20, 30, 40]} />
```

### Margin Options

```tsx
{/* Single value - applies to all sides */}
<AvakioTemplate content="Content" margin={20} />

{/* String value - CSS format */}
<AvakioTemplate content="Content" margin="10px 20px" />

{/* Array - [top, right, bottom, left] */}
<AvakioTemplate content="Content" margin={[10, 20, 30, 40]} />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `template` | `string \| (data: any) => React.ReactNode` | - | Template string or function |
| `data` | `Record<string, any>` | `{}` | Data to populate template |
| `content` | `React.ReactNode` | - | Direct React content |
| `url` | `string` | - | URL to load content from |
| `theme` | `'material' \| 'flat' \| 'compact' \| 'dark' \| 'ocean' \| 'sunset'` | `'material'` | Theme to apply |
| `borderType` | `'space' \| 'wide' \| 'clean' \| 'line' \| 'material'` | `'space'` | Border style |
| `type` | `'header' \| 'section' \| 'clean'` | `'clean'` | Template type for specific use cases |
| `borderless` | `boolean` | `false` | Remove all borders |
| `autoheight` | `boolean` | `false` | Auto-adjust height to content |
| `scroll` | `boolean \| 'x' \| 'y' \| 'xy'` | `false` | Enable scrolling |
| `width` | `number \| string` | - | Width of template |
| `height` | `number \| string` | - | Height of template |
| `minWidth` | `number \| string` | - | Minimum width |
| `minHeight` | `number \| string` | - | Minimum height |
| `maxWidth` | `number \| string` | - | Maximum width |
| `maxHeight` | `number \| string` | - | Maximum height |
| `padding` | `number \| string \| [number, number, number, number]` | - | Padding around content (single value, string, or [top, right, bottom, left]) |
| `margin` | `number \| string \| [number, number, number, number]` | - | Margin around template (single value, string, or [top, right, bottom, left]) |
| `className` | `string` | `''` | Custom CSS class |
| `css` | `React.CSSProperties` | - | Custom inline styles |
| `hidden` | `boolean` | `false` | Hide the template |
| `disabled` | `boolean` | `false` | Disable the template |
| `id` | `string` | - | HTML id attribute |
| `testId` | `string` | - | Test ID for testing |
| `onLoad` | `() => void` | - | Callback when content loads |
| `onChange` | `(data: any) => void` | - | Callback when data changes |
| `onClick` | `(e: React.MouseEvent) => void` | - | Click handler |

## Ref Methods

Access these methods using a ref:

```tsx
const templateRef = useRef<AvakioTemplateRef>(null);

// Use methods
templateRef.current?.setValues({ name: 'Jane' });
```

### Available Methods

| Method | Parameters | Description |
|--------|------------|-------------|
| `setValues` | `data: Record<string, any>` | Update template data |
| `getValues` | - | Get current data |
| `setHTML` | `html: string` | Set HTML content directly |
| `getHTML` | - | Get current HTML content |
| `refresh` | - | Force re-render template |
| `parse` | `data: Record<string, any>` | Parse and apply new data |
| `show` | - | Show the template |
| `hide` | - | Hide the template |
| `enable` | - | Enable the template |
| `disable` | - | Disable the template |
| `getNode` | - | Get the DOM element |

## Examples

### Using Imperative Methods

```tsx
import { useRef } from 'react';
import { AvakioTemplate, AvakioTemplateRef } from './avakio-template';

function MyComponent() {
  const templateRef = useRef<AvakioTemplateRef>(null);

  const handleUpdate = () => {
    templateRef.current?.setValues({
      name: 'Updated Name',
      email: 'new@example.com'
    });
  };

  const handleGetData = () => {
    const data = templateRef.current?.getValues();
    console.log(data);
  };

  return (
    <>
      <button onClick={handleUpdate}>Update</button>
      <button onClick={handleGetData}>Get Data</button>
      
      <AvakioTemplate
        ref={templateRef}
        template="<h3>#name#</h3><p>#email#</p>"
        data={{ name: 'John', email: 'john@example.com' }}
      />
    </>
  );
}
```

### With Scrolling

```tsx
<AvakioTemplate
  template="<p>Long content...</p>"
  scroll="y"
  height={200}
  theme="material"
/>
```

### With Different Border Types

```tsx
// Material border with shadow
<AvakioTemplate
  content={<p>Content</p>}
  borderType="material"
  theme="material"
/>

// Clean (no border)
<AvakioTemplate
  content={<p>Content</p>}
  borderType="clean"
  theme="material"
/>

// Line border (bottom only)
<AvakioTemplate
  content={<p>Content</p>}
  borderType="line"
  theme="material"
/>
```

### Template Types

```tsx
// Header type - colored background based on theme
<AvakioTemplate
  type="header"
  content={<h3>Application Header</h3>}
  theme="material"
/>

// Section type - subtle background
<AvakioTemplate
  type="section"
  content={<p>Section content with subtle background</p>}
  theme="material"
/>

// Clean type (default) - no special styling
<AvakioTemplate
  type="clean"
  content={<p>Regular content</p>}
  theme="material"
/>
```

### Auto-height

```tsx
<AvakioTemplate
  content={
    <div>
      <p>Dynamic content</p>
      <p>Height adjusts automatically</p>
    </div>
  }
  autoheight
  theme="material"
/>
```

## Template Syntax

### Data Binding

Use `#property#` to reference data properties:

```tsx
<AvakioTemplate
  template="<h3>#title#</h3><p>#description#</p>"
  data={{
    title: 'Hello',
    description: 'World'
  }}
/>
```

### Nested Properties

```tsx
<AvakioTemplate
  template="<p>#user.name# - #user.email#</p>"
  data={{
    user: {
      name: 'John',
      email: 'john@example.com'
    }
  }}
/>
```

## Themes

The component supports 6 built-in themes:

- **material** - Clean white background, subtle borders
- **flat** - Light gray background, flat design
- **compact** - Minimal spacing, smaller fonts
- **dark** - Dark background, light text
- **ocean** - Blue tones, ocean inspired
- **sunset** - Orange/warm tones

```tsx
<AvakioTemplate content={<p>Content</p>} theme="dark" />
<AvakioTemplate content={<p>Content</p>} theme="ocean" />
<AvakioTemplate content={<p>Content</p>} theme="sunset" />
```

## Styling

### Custom CSS

```tsx
<AvakioTemplate
  content={<p>Content</p>}
  className="my-template"
  css={{
    background: 'linear-gradient(to right, #667eea, #764ba2)',
    color: 'white',
    borderRadius: '8px'
  }}
/>
```

### Theme-specific Styling

```css
.avakio-template-theme-material .custom-content {
  color: #1ca1c1;
}

.avakio-template-theme-dark .custom-content {
  color: #3b82f6;
}
```

## Accessibility

- Use `id` prop for HTML id attribute
- Use `testId` prop for testing (data-testid)
- Semantic HTML in templates
- Keyboard navigation support

```tsx
<AvakioTemplate
  id="user-profile-template"
  testId="user-profile"
  template="<h3>#name#</h3>"
  data={{ name: 'John' }}
/>
```

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## License

MIT

## Related Components

- [AvakioView](../avakio-view/README.md) - Base view container
- [AvakioLayout](../../layouts/avakio-layout/README.md) - Layout management
- [AvakioPortlet](../../avakio-portlet/README.md) - Draggable panels

