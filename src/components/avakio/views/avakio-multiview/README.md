# AvakioMultiview

A container component that displays one view at a time from a collection of views, with smooth animations and navigation history.

## Features

- 🎬 **Multiple animation types**: slide, fade, flip, or none
- 📜 **Navigation history**: Built-in back() function to return to previous views
- ➕ **Dynamic views**: Add and remove views at runtime
- 🎨 **Theme support**: All 6 Avakio themes (material, flat, compact, dark, ocean, sunset)
- 💾 **Keep views mode**: Option to preserve inactive views in DOM
- 📐 **Flexible sizing**: Supports fixed dimensions or fit-to-biggest

## Installation

Import the component and its CSS:

```tsx
import { AvakioMultiview, AvakioMultiviewRef } from '@/components/avakio/views/avakio-multiview/avakio-multiview';
import '@/components/avakio/views/avakio-multiview/avakio-multiview.css';
```

## Basic Usage

```tsx
import { useRef } from 'react';
import { AvakioMultiview, AvakioMultiviewRef } from './avakio-multiview';

function MyComponent() {
  const multiviewRef = useRef<AvakioMultiviewRef>(null);

  return (
    <AvakioMultiview
      ref={multiviewRef}
      id="my-multiview"
      theme="material"
      activeView="view1"
      cells={[
        { id: 'view1', content: <div>First View</div> },
        { id: 'view2', content: <div>Second View</div> },
        { id: 'view3', content: <div>Third View</div> },
      ]}
      onViewChange={(newId, oldId) => {
        console.log(`Changed from ${oldId} to ${newId}`);
      }}
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` | - | Unique identifier for the component |
| `testId` | `string` | - | Test ID for testing frameworks |
| `cells` | `AvakioMultiviewCell[]` | **required** | Array of view definitions |
| `activeView` | `string` | First cell ID | Initially active view ID |
| `animate` | `boolean \| AnimateConfig` | `true` | Animation configuration |
| `keepViews` | `boolean` | `false` | Keep inactive views in DOM |
| `fitBiggest` | `boolean` | `false` | Size container to biggest cell |
| `theme` | `AvakioMultiviewTheme` | `'material'` | Visual theme |
| `className` | `string` | - | Additional CSS class |
| `css` | `CSSProperties` | - | Inline styles |
| `width` | `number \| string` | - | Component width |
| `height` | `number \| string` | - | Component height |
| `onViewChange` | `(newId, oldId) => void` | - | Callback when view changes |
| `onViewShow` | `(viewId) => void` | - | Callback when view is shown |
| `onBeforeBack` | `(currentId) => boolean \| void` | - | Called before back(), return `false` to cancel |

### Cell Definition

```tsx
interface AvakioMultiviewCell {
  id: string;        // Unique identifier
  content: ReactNode; // Content to render
  className?: string; // Optional CSS class
  css?: CSSProperties; // Optional inline styles
}
```

### Animation Configuration

```tsx
interface AvakioMultiviewAnimateConfig {
  type?: 'slide' | 'fade' | 'flip' | 'none';
  duration?: number; // in milliseconds
  direction?: 'left' | 'right';
}
```

## Ref Methods (Imperative API)

Access methods via ref:

```tsx
const multiviewRef = useRef<AvakioMultiviewRef>(null);

// Get current view
const currentView = multiviewRef.current?.getValue();

// Switch to a view
multiviewRef.current?.setValue('view2');

// Go back to previous view
multiviewRef.current?.back();
```

| Method | Returns | Description |
|--------|---------|-------------|
| `getValue()` | `string` | Get current active view ID |
| `getActiveId()` | `string` | Alias for getValue() |
| `setValue(viewId)` | `void` | Switch to specified view |
| `back()` | `boolean` | Go back to previous view (returns false if no history) |
| `addView(cell, index?)` | `void` | Add a new view dynamically |
| `removeView(viewId)` | `boolean` | Remove a view (cannot remove active view) |
| `getViews()` | `string[]` | Get all view IDs |
| `hasView(viewId)` | `boolean` | Check if a view exists |
| `getHistory()` | `string[]` | Get navigation history |
| `clearHistory()` | `void` | Clear navigation history |
| `show()` | `void` | Show the component |
| `hide()` | `void` | Hide the component |
| `isVisible()` | `boolean` | Check if component is visible |

## Animation Types

### Slide (Default)
```tsx
<AvakioMultiview animate={{ type: 'slide', duration: 300 }} />
```
Horizontal sliding animation between views.

### Fade
```tsx
<AvakioMultiview animate={{ type: 'fade', duration: 300 }} />
```
Cross-fade between views.

### Flip
```tsx
<AvakioMultiview animate={{ type: 'flip', duration: 300 }} />
```
3D flip effect.

### None
```tsx
<AvakioMultiview animate={false} />
// or
<AvakioMultiview animate={{ type: 'none' }} />
```
Instant switch with no animation.

## Themes

Available themes: `material`, `flat`, `compact`, `dark`, `ocean`, `sunset`

```tsx
<AvakioMultiview theme="dark" />
```

## Examples

### With TabBar Integration

```tsx
function TabExample() {
  const [activeTab, setActiveTab] = useState('tab1');
  const multiviewRef = useRef<AvakioMultiviewRef>(null);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    multiviewRef.current?.setValue(tabId);
  };

  return (
    <div>
      <div className="tabs">
        <button onClick={() => handleTabChange('tab1')}>Tab 1</button>
        <button onClick={() => handleTabChange('tab2')}>Tab 2</button>
        <button onClick={() => handleTabChange('tab3')}>Tab 3</button>
      </div>
      <AvakioMultiview
        ref={multiviewRef}
        activeView={activeTab}
        cells={[
          { id: 'tab1', content: <Tab1Content /> },
          { id: 'tab2', content: <Tab2Content /> },
          { id: 'tab3', content: <Tab3Content /> },
        ]}
      />
    </div>
  );
}
```

### Wizard/Step Form

```tsx
function WizardExample() {
  const multiviewRef = useRef<AvakioMultiviewRef>(null);

  const nextStep = () => {
    const current = multiviewRef.current?.getValue();
    if (current === 'step1') multiviewRef.current?.setValue('step2');
    else if (current === 'step2') multiviewRef.current?.setValue('step3');
  };

  const prevStep = () => {
    multiviewRef.current?.back();
  };

  return (
    <AvakioMultiview
      ref={multiviewRef}
      activeView="step1"
      animate={{ type: 'slide', duration: 300 }}
      cells={[
        {
          id: 'step1',
          content: (
            <div>
              <h2>Step 1: Personal Info</h2>
              <button onClick={nextStep}>Next</button>
            </div>
          ),
        },
        {
          id: 'step2',
          content: (
            <div>
              <h2>Step 2: Address</h2>
              <button onClick={prevStep}>Back</button>
              <button onClick={nextStep}>Next</button>
            </div>
          ),
        },
        {
          id: 'step3',
          content: (
            <div>
              <h2>Step 3: Confirmation</h2>
              <button onClick={prevStep}>Back</button>
              <button>Submit</button>
            </div>
          ),
        },
      ]}
    />
  );
}
```

### Keep Views Mode (for iframes/editors)

```tsx
<AvakioMultiview
  keepViews={true}
  cells={[
    { id: 'editor1', content: <WYSIWYGEditor /> },
    { id: 'editor2', content: <CodeEditor /> },
  ]}
/>
```

## CSS Classes

| Class | Description |
|-------|-------------|
| `.avakio-multiview` | Main container |
| `.avakio-multiview-theme-{theme}` | Theme class |
| `.avakio-multiview-animate-{type}` | Animation type class |
| `.avakio-multiview-cell` | Individual view cell |
| `.avakio-multiview-cell-active` | Currently visible cell |
| `.avakio-multiview-cell-hidden` | Hidden cell |
| `.avakio-multiview-cell-leaving` | Cell being animated out |

## Browser Support

Works in all modern browsers. Animations use CSS transforms and require no JavaScript animation libraries.

