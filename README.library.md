# Avakio UI Components

A comprehensive React UI component library with 50+ components for building modern web applications.

## Installation

```bash
npm install avakio-ui-components
# or
yarn add avakio-ui-components
# or
pnpm add avakio-ui-components
```

## Usage

Import components and their styles:

```tsx
import { AvakioButton, AvakioCalendar } from 'avakio-ui-components';
import 'avakio-ui-components/styles';

function App() {
  return (
    <div>
      <AvakioButton label="Click me" variant="primary" />
      <AvakioCalendar mode="single" />
    </div>
  );
}
```

## Components

### UI Controls (20+ components)
- Button, Checkbox, Radio, Switch
- DatePicker, DateRangePicker, Calendar
- Combo, MultiCombo, RichSelect
- Slider, Counter, ColorPicker
- Text, Label, Fieldset
- TabBar, ToggleButton, SegmentedButton

### UI Widgets (14+ components)
- DataTable, ExcelViewer
- Chart, BulletGraph, Gage
- GoogleMap, Carousel
- Accordion, Tree, GroupList
- Form, Dashboard
- Hint, ViewHeader, Comment

### Layouts (4 components)
- Layout, AbsoluteLayout
- Grid, Resizer

### Views (3 components)
- View, MultiView, Template

### Additional Components
- Sidebar, Timeline
- Popup, Portlet, Property
- Scheduler, GridSuggest

## Theming

Components support multiple themes:
- Material
- Flat
- Compact
- Dark
- Ocean
- Sunset

Apply themes using the `data-admin-theme` attribute:

```tsx
<div data-admin-theme="dark">
  <AvakioButton label="Dark themed button" />
</div>
```

## TypeScript Support

Fully typed with TypeScript declarations included.

## Development

```bash
# Install dependencies
npm install

# Run development server with examples
npm run dev

# Build library
npm run build

# Lint
npm run lint
```

## License

MIT
