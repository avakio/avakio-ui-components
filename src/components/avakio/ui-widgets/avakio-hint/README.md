# AvakioHint

A step-by-step hint/tour component for guided user onboarding and feature discovery.

## Features

- **Step-by-step tours** - Guide users through your application with sequential hints
- **Overlay highlighting** - Semi-transparent overlay with spotlight on target elements
- **Multiple positions** - Auto, top, bottom, left, right popup positioning
- **Interactive events** - Click, enter, or manual navigation modes
- **Built-in themes** - Material, Flat, Compact, Dark, Ocean, Sunset
- **Keyboard navigation** - ESC to close, arrow keys support
- **Programmatic control** - Start, end, pause, resume via ref methods
- **TypeScript support** - Full type definitions included

## Installation

The component is part of the Avakio UI library. Import it from the ui-widgets module:

```tsx
import { AvakioHint, AvakioHintRef, AvakioHintStep } from '@/components/avakio/ui-widgets/avakio-hint';
```

## Basic Usage

```tsx
import { useRef } from 'react';
import { AvakioHint, AvakioHintRef, AvakioHintStep } from '@/components/avakio/ui-widgets/avakio-hint';

function App() {
  const hintRef = useRef<AvakioHintRef>(null);

  const steps: AvakioHintStep[] = [
    {
      el: '#header',
      title: 'Welcome!',
      text: 'This is your dashboard header.',
      position: 'bottom',
    },
    {
      el: '#sidebar',
      title: 'Navigation',
      text: 'Use the sidebar to navigate.',
      position: 'right',
    },
    {
      el: '#content',
      title: 'Main Content',
      text: 'Your workspace area.',
      position: 'left',
    },
  ];

  return (
    <>
      <button onClick={() => hintRef.current?.start()}>
        Start Tour
      </button>

      <AvakioHint
        ref={hintRef}
        steps={steps}
        onEnd={() => console.log('Tour completed!')}
      />
    </>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `steps` | `AvakioHintStep[]` | `[]` | Array of step configurations |
| `theme` | `AvakioHintTheme` | `'material'` | Visual theme |
| `prevButton` | `string \| false` | `'Previous'` | Previous button text, or `false` to hide |
| `nextButton` | `string` | `'Next'` | Next button text |
| `finishButton` | `string` | `'Finish'` | Finish button text (shown on last step) |
| `padding` | `number \| [number, number, number, number]` | `8` | Padding around highlighted element (single value or [top, right, bottom, left]) |
| `onStepChange` | `(step: number) => void` | - | Callback when step changes |
| `onEnd` | `() => void` | - | Callback when tour ends |

## Step Configuration

Each step in the `steps` array can have the following properties:

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `el` | `string` | Yes | CSS selector for target element |
| `title` | `string` | No | Step title |
| `text` | `string \| ReactNode` | No | Step description (supports JSX) |
| `event` | `'click' \| 'enter' \| 'none'` | No | Event to trigger next step |
| `position` | `'top' \| 'bottom' \| 'left' \| 'right' \| 'auto'` | No | Popup position |
| `padding` | `number \| [number, number, number, number]` | No | Override default padding (single value or [top, right, bottom, left]) |

### Event Types

- **`none`** (default) - User must click Next/Previous buttons
- **`click`** - Advances when user clicks the target element
- **`enter`** - Advances when user focuses element and presses Enter

```tsx
const steps: AvakioHintStep[] = [
  {
    el: '#signup-button',
    title: 'Click to Sign Up',
    text: 'Click this button to create your account.',
    event: 'click', // Wait for user to click the button
  },
];
```

## Ref Methods

Access these methods via the ref:

| Method | Return Type | Description |
|--------|-------------|-------------|
| `start(stepIndex?)` | `void` | Start tour at optional step index |
| `end()` | `void` | End the tour |
| `next()` | `void` | Go to next step |
| `prev()` | `void` | Go to previous step |
| `goTo(stepIndex)` | `void` | Go to specific step (0-indexed) |
| `resume()` | `void` | Resume from current step |
| `getCurrentStep()` | `number` | Get current step index |
| `isVisible()` | `boolean` | Check if tour is currently visible |

### Example

```tsx
const hintRef = useRef<AvakioHintRef>(null);

// Start at step 2
hintRef.current?.start(1);

// Skip to step 4
hintRef.current?.goTo(3);

// Check current progress
const step = hintRef.current?.getCurrentStep();

// End tour programmatically
hintRef.current?.end();
```

## Themes

Six built-in themes are available:

```tsx
type AvakioHintTheme = 
  | 'material'  // Default - blue accent
  | 'flat'      // Nordic-inspired palette
  | 'compact'   // Smaller popup, teal accent
  | 'dark'      // Dark mode compatible
  | 'ocean'     // Blue ocean colors
  | 'sunset'    // Warm orange tones
```

### Using Themes

```tsx
<AvakioHint
  ref={hintRef}
  steps={steps}
  theme="dark"
/>
```

### Custom Theme via CSS Variables

Override CSS variables to create custom themes:

```css
.avakio-hint-theme-custom {
  --avakio-hint-highlight-color: #your-color;
  --avakio-hint-popup-bg: #your-bg;
  --avakio-hint-title-color: #your-title;
  --avakio-hint-text-color: #your-text;
  --avakio-hint-btn-next-bg: #your-button-bg;
  --avakio-hint-btn-next-color: #your-button-text;
  /* ... see CSS file for all variables */
}
```

## Position Options

Control popup placement relative to the target element:

| Position | Description |
|----------|-------------|
| `'auto'` | Automatically choose best position based on viewport |
| `'top'` | Above the target element |
| `'bottom'` | Below the target element |
| `'left'` | To the left of the target element |
| `'right'` | To the right of the target element |

## Keyboard Navigation

- **ESC** - Close the tour at any time
- **Enter** - Proceed if step has `event: 'enter'`

## Events & Callbacks

```tsx
<AvakioHint
  ref={hintRef}
  steps={steps}
  onStepChange={(stepIndex) => {
    console.log(`Now on step ${stepIndex + 1}`);
    analytics.track('tour_step', { step: stepIndex });
  }}
  onEnd={() => {
    console.log('Tour completed');
    localStorage.setItem('tourCompleted', 'true');
  }}
/>
```

## Rich Content

Steps support ReactNode for rich text content:

```tsx
const steps: AvakioHintStep[] = [
  {
    el: '#feature',
    title: 'New Feature!',
    text: (
      <div>
        <p>Check out our latest update:</p>
        <ul>
          <li>Improved performance</li>
          <li>New dark mode</li>
          <li>Better accessibility</li>
        </ul>
        <a href="/changelog">View changelog</a>
      </div>
    ),
  },
];
```

## Button Customization

```tsx
<AvakioHint
  ref={hintRef}
  steps={steps}
  prevButton="Back"        // Custom text
  nextButton="Continue"    // Custom text
  finishButton="Done!"     // Last step button
  prevButton={false}       // Hide previous button
/>
```

## Complete Example

```tsx
import { useRef, useState } from 'react';
import { AvakioHint, AvakioHintRef, AvakioHintStep } from '@/components/avakio/ui-widgets/avakio-hint';

function OnboardingTour() {
  const hintRef = useRef<AvakioHintRef>(null);
  const [tourCompleted, setTourCompleted] = useState(false);

  const steps: AvakioHintStep[] = [
    {
      el: '#new-project-btn',
      title: 'Create a Project',
      text: 'Click here to start a new project.',
      event: 'click',
      position: 'bottom',
    },
    {
      el: '#project-name-input',
      title: 'Name Your Project',
      text: 'Enter a name and press Enter to continue.',
      event: 'enter',
      position: 'right',
    },
    {
      el: '#template-gallery',
      title: 'Choose a Template',
      text: 'Browse our templates or start from scratch.',
      position: 'top',
    },
    {
      el: '#save-btn',
      title: 'Save Your Work',
      text: 'Don\'t forget to save your project regularly!',
      position: 'left',
    },
  ];

  return (
    <>
      {!tourCompleted && (
        <button onClick={() => hintRef.current?.start()}>
          Take the Tour
        </button>
      )}

      <AvakioHint
        ref={hintRef}
        steps={steps}
        theme="material"
        prevButton="Back"
        nextButton="Got it"
        finishButton="Start Creating!"
        onStepChange={(step) => console.log(`Step ${step + 1}/${steps.length}`)}
        onEnd={() => {
          setTourCompleted(true);
          localStorage.setItem('onboarding_complete', 'true');
        }}
      />
    </>
  );
}
```

## Accessibility

- Keyboard navigation support (ESC to close)
- Focus management during tour
- ARIA attributes for screen readers
- High contrast theme option (dark theme)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Related Components

- [AvakioView](../views/avakio-view/README.md) - Multi-view container
- [AvakioGrid](../../data/avakio-grid/README.md) - Data grid with drag & drop
- [AvakioLayout](../../layouts/avakio-layout/README.md) - Flexible layout system

