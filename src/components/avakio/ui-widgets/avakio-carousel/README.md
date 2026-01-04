# AvakioCarousel

A continuous circular navigation component for presenting content blocks in a slideshow format.

## Overview

AvakioCarousel provides smooth, interactive navigation through a collection of slides with support for:
- Touch/swipe gestures
- Keyboard navigation
- Multiple navigation styles
- Autoplay functionality
- Customizable themes
- Programmatic control via ref methods

## Basic Usage

```tsx
import { AvakioCarousel, AvakioCarouselSlide } from '@/components/avakio/ui-widgets/avakio-carousel';

const slides: AvakioCarouselSlide[] = [
  {
    id: 'slide-1',
    content: <div>Slide 1 Content</div>,
  },
  {
    id: 'slide-2',
    content: <div>Slide 2 Content</div>,
  },
  {
    id: 'slide-3',
    content: <div>Slide 3 Content</div>,
  },
];

function MyComponent() {
  return (
    <AvakioCarousel
      slides={slides}
      theme="material"
      height={400}
      autoplay
      autoplayDelay={3000}
    />
  );
}
```

## Props

### AvakioCarouselProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `slides` | `AvakioCarouselSlide[]` | **required** | Array of slide objects with id and content |
| `theme` | `'material' \| 'flat' \| 'compact' \| 'dark' \| 'ocean' \| 'sunset'` | `'material'` | Visual theme for the carousel |
| `navigation` | `AvakioCarouselNavigation` | `{ type: 'bottom', items: true, buttons: true, position: 'center' }` | Navigation configuration |
| `autoplay` | `boolean` | `false` | Enable automatic slide progression |
| `autoplayDelay` | `number` | `3000` | Delay between slides in ms (when autoplay is enabled) |
| `scrollSpeed` | `number` | `300` | Transition speed in ms |
| `loop` | `boolean` | `true` | Enable continuous looping |
| `activeIndex` | `number` | `0` | Initial active slide index |
| `width` | `number \| string` | `undefined` | Carousel width |
| `height` | `number \| string` | `400` | Carousel height |
| `css` | `React.CSSProperties` | `undefined` | Additional inline styles |
| `onShow` | `(id: string, index: number) => void` | `undefined` | Callback when a slide is shown |
| `onSlideChange` | `(id: string, index: number) => void` | `undefined` | Callback when slide changes |
| `id` | `string` | `undefined` | HTML id attribute |
| `testId` | `string` | `undefined` | data-testid attribute |

### AvakioCarouselSlide

```typescript
interface AvakioCarouselSlide {
  id: string;          // Unique identifier
  content: ReactNode;  // Slide content (any React component)
}
```

### AvakioCarouselNavigation

```typescript
interface AvakioCarouselNavigation {
  type?: 'side' | 'bottom';           // Navigation placement
  items?: boolean;                     // Show indicator dots
  buttons?: boolean;                   // Show prev/next buttons
  position?: 'left' | 'right' | 'center'; // Position for bottom navigation
}
```

## Navigation Types

### Bottom Navigation (Default)

Navigation controls appear at the bottom of the carousel:

```tsx
<AvakioCarousel
  slides={slides}
  navigation={{
    type: 'bottom',
    items: true,
    buttons: true,
    position: 'center'
  }}
/>
```

### Side Navigation

Navigation buttons appear on the left and right sides:

```tsx
<AvakioCarousel
  slides={slides}
  navigation={{
    type: 'side',
    items: false,
    buttons: true
  }}
/>
```

### No Navigation

Hide all navigation controls:

```tsx
<AvakioCarousel
  slides={slides}
  navigation={{
    items: false,
    buttons: false
  }}
/>
```

## Ref Methods

Control the carousel programmatically using a ref:

```tsx
import { useRef } from 'react';
import { AvakioCarousel, AvakioCarouselRef } from '@/components/avakio/ui-widgets/avakio-carousel';

function MyComponent() {
  const carouselRef = useRef<AvakioCarouselRef>(null);

  return (
    <>
      <AvakioCarousel ref={carouselRef} slides={slides} />
      
      <button onClick={() => carouselRef.current?.showNext()}>
        Next
      </button>
      <button onClick={() => carouselRef.current?.showPrev()}>
        Previous
      </button>
      <button onClick={() => carouselRef.current?.setActiveIndex(2)}>
        Go to Slide 3
      </button>
    </>
  );
}
```

### Available Methods

| Method | Parameters | Description |
|--------|------------|-------------|
| `showNext()` | none | Navigate to next slide |
| `showPrev()` | none | Navigate to previous slide |
| `setActive(id)` | `id: string` | Show slide by ID |
| `setActiveIndex(index)` | `index: number` | Show slide by index |
| `getActiveId()` | none | Returns current slide ID |
| `getActiveIndex()` | none | Returns current slide index |
| `addView(slide, position?)` | `slide: AvakioCarouselSlide, position?: number` | Add new slide |
| `removeView(id)` | `id: string` | Remove slide by ID |

## Themes

AvakioCarousel supports six built-in themes:

- **material** - Material Design style with shadows
- **flat** - Flat design with borders
- **compact** - Smaller navigation elements
- **dark** - Dark background with light controls
- **ocean** - Blue gradient background
- **sunset** - Pink/red gradient background

```tsx
<AvakioCarousel slides={slides} theme="dark" />
```

## Autoplay

Enable automatic slide progression:

```tsx
<AvakioCarousel
  slides={slides}
  autoplay
  autoplayDelay={5000}  // 5 seconds between slides
  loop={true}           // Loop back to start
/>
```

## Touch & Keyboard Support

- **Touch Devices**: Swipe left/right to navigate
- **Keyboard**: Use Arrow Left/Right keys to navigate
- **Mouse**: Click navigation buttons or indicator dots

## Dynamic Slides

Add or remove slides dynamically:

```tsx
function DynamicCarousel() {
  const carouselRef = useRef<AvakioCarouselRef>(null);

  const addSlide = () => {
    const newSlide = {
      id: `slide-${Date.now()}`,
      content: <div>New Slide</div>,
    };
    carouselRef.current?.addView(newSlide);
  };

  const removeSlide = (id: string) => {
    carouselRef.current?.removeView(id);
  };

  return (
    <>
      <AvakioCarousel ref={carouselRef} slides={initialSlides} />
      <button onClick={addSlide}>Add Slide</button>
    </>
  );
}
```

## Events

Track slide changes with callbacks:

```tsx
<AvakioCarousel
  slides={slides}
  onShow={(id, index) => {
    console.log(`Showing slide ${id} at index ${index}`);
  }}
  onSlideChange={(id, index) => {
    console.log(`Changed to slide ${id} at index ${index}`);
  }}
/>
```

## Accessibility

- Navigation buttons have `aria-label` attributes
- Disabled state for prev/next when at boundaries (non-loop mode)
- Keyboard navigation support
- Focus indicators for keyboard users

## Examples

See [avakio-carousel-example.tsx](./avakio-carousel-example.tsx) for comprehensive usage examples.

## Related Components

- **AvakioMultiview** - Switch between views without automatic sliding
- **AvakioLayout** - Organize components in rows/columns
- **AvakioGrid** - Grid-based layout system

## Browser Support

Works in all modern browsers with support for:
- CSS Transforms
- Touch Events
- Flexbox

