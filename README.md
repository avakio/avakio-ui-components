# Avakio UI Components Library

A comprehensive React component library with 50+ production-ready components for building modern web applications.

## 📦 What's Inside

All components have been successfully copied from Resume-Scribe and are ready to use:

- **274 files** across **56 directories**
- Complete TypeScript support
- CSS styling included
- Example files for each component
- Comprehensive README documentation

## 🎨 Component Categories

### UI Controls (20 components)
Interactive form elements and input controls:

- **AvakioButton** - Customizable button component
- **AvakioCheckbox** - Checkbox input with styling
- **AvakioColorPicker** - Color selection widget
- **AvakioCombo** - Combobox/dropdown selector
- **AvakioCounter** - Numeric counter input
- **AvakioDatePicker** - Date selection calendar
- **AvakioDateRangePicker** - Date range selector
- **AvakioDoubleList** - Dual list transfer component
- **AvakioFieldset** - Form fieldset container
- **AvakioLabel** - Enhanced label component
- **AvakioMultiCombo** - Multi-select combobox
- **AvakioMultiText** - Multi-line text input
- **AvakioRadio** - Radio button group
- **AvakioRichSelect** - Rich dropdown with custom content
- **AvakioSegmentedButton** - Segmented button group
- **AvakioSlider** - Range slider control
- **AvakioSwitchButton** - Toggle switch
- **AvakioTabBar** - Tab navigation bar
- **AvakioText** - Enhanced text input
- **AvakioToggleButton** - Toggle button control

### Widgets (14 components)
Complex UI widgets for data visualization and interaction:

- **AvakioAccordion** - Collapsible content sections
- **AvakioBulletGraph** - Bullet chart visualization
- **AvakioCarousel** - Image/content carousel
- **AvakioChart** - Data charting widget
- **AvakioComment** - Comment/discussion widget
- **AvakioDashboard** - Dashboard layout system
- **AvakioExcelViewer** - Excel file viewer
- **AvakioForm** - Advanced form builder
- **AvakioGage** - Gauge/meter display
- **AvakioGoogleMap** - Google Maps integration
- **AvakioGroupList** - Grouped list display
- **AvakioHint** - Tooltip/hint component
- **AvakioTree** - Tree view component
- **AvakioViewHeader** - View header component

### Layouts (4 components)
Flexible layout systems:

- **AvakioAbsoluteLayout** - Absolute positioning layout
- **AvakioGrid** - Grid layout system
- **AvakioLayout** - Flexible layout container
- **AvakioResizer** - Resizable panels

### Components (12 components)
Advanced specialized components:

- **AvakioCalendar** - Full calendar component
- **AvakioDataTable** - Advanced data table with sorting/filtering
- **AvakioGridSuggest** - Grid-based suggestion widget
- **AvakioPopup** - Modal/popup dialog
- **AvakioPortlet** - Portlet container
- **AvakioProperty** - Property editor
- **AvakioScheduler** - Scheduling/timeline component
- **AvakioSidebar** - Sidebar navigation
- **AvakioTimeline** - Timeline visualization
- **AvakioMultiView** - Multi-view container
- **AvakioTemplate** - Template component
- **AvakioView** - View container

### Themes
- **avakio-themes.css** - Pre-built theme styles

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm 9+

### Installation

```bash
# Install dependencies
npm install

# Install API server dependencies (optional, for full showcase)
npm run api:install
```

---

## 🖥️ Running the Showcase

The showcase is an interactive demo that displays all components with live examples.

### Development Mode (Frontend Only)

```bash
npm run dev
```

This starts the Vite dev server at **http://localhost:5000**

### Development Mode (Full Stack)

To run the showcase with the mock API backend (required for some components like DataTable):

```bash
npm run dev:full
```

This runs both:
- Frontend at **http://localhost:5000**
- API server at **http://localhost:3001**

### API Server Only

```bash
npm run api
```

---

## 🔨 Building the Project

### Build for Deployment (Showcase App)

Builds the showcase application for production deployment:

```bash
npm run build
```

Output: `dist/` folder ready for static hosting

### Preview Production Build

```bash
npm run preview
```

### Deploy to GitHub Pages

```bash
npm run deploy
```

---

## 📦 Building as a Library

To build the components as a reusable npm package:

### Windows

```bash
npm run build:lib
```

### macOS / Linux

```bash
BUILD_MODE=lib npm run build:lib
```

This generates:
- `dist/avakio-ui-components.js` - ES module
- `dist/avakio-ui-components.umd.cjs` - UMD module
- `dist/style.css` - All component styles
- `dist/index.d.ts` - TypeScript definitions

---

## 📜 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server (port 5000) |
| `npm run dev:full` | Start frontend + API server |
| `npm run api` | Start API server only (port 3001) |
| `npm run api:install` | Install API server dependencies |
| `npm run build` | Build showcase for production |
| `npm run build:lib` | Build as npm library package |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run deploy` | Deploy to GitHub Pages |

## 📖 Usage

Import components from the library:

```typescript
import {
  AvakioButton,
  AvakioDataTable,
  AvakioCalendar,
  AvakioChart
} from './components/avakio';

// Import theme
import './components/avakio/themes/avakio-themes.css';
```

## 📁 Project Structure

```
src/
├── components/
│   └── avakio/
│       ├── avakio-calendar/
│       ├── avakio-datatable/
│       ├── avakio-gridsuggest/
│       ├── avakio-popup/
│       ├── avakio-portlet/
│       ├── avakio-property/
│       ├── avakio-scheduler/
│       ├── avakio-sidebar/
│       ├── avakio-timeline/
│       ├── layouts/
│       │   ├── avakio-absolute-layout/
│       │   ├── avakio-grid/
│       │   ├── avakio-layout/
│       │   └── avakio-resizer/
│       ├── themes/
│       │   └── avakio-themes.css
│       ├── ui-controls/
│       │   ├── avakio-button/
│       │   ├── avakio-checkbox/
│       │   ├── avakio-colorpicker/
│       │   ├── avakio-combo/
│       │   ├── avakio-counter/
│       │   ├── avakio-datepicker/
│       │   ├── avakio-daterangepicker/
│       │   ├── avakio-doublelist/
│       │   ├── avakio-fieldset/
│       │   ├── avakio-label/
│       │   ├── avakio-multicombo/
│       │   ├── avakio-multitext/
│       │   ├── avakio-radio/
│       │   ├── avakio-richselect/
│       │   ├── avakio-segmented-button/
│       │   ├── avakio-slider/
│       │   ├── avakio-switch-button/
│       │   ├── avakio-tabbar/
│       │   ├── avakio-text/
│       │   └── avakio-toggle-button/
│       ├── ui-widgets/
│       │   ├── avakio-accordion/
│       │   ├── avakio-bullet-graph/
│       │   ├── avakio-carousel/
│       │   ├── avakio-chart/
│       │   ├── avakio-comment/
│       │   ├── avakio-dashboard/
│       │   ├── avakio-excel-viewer/
│       │   ├── avakio-form/
│       │   ├── avakio-gage/
│       │   ├── avakio-googlemap/
│       │   ├── avakio-grouplist/
│       │   ├── avakio-hint/
│       │   ├── avakio-tree/
│       │   └── avakio-view-header/
│       └── views/
│           ├── avakio-multiview/
│           ├── avakio-template/
│           └── avakio-view/
├── App.tsx
└── index.ts
```

## 📝 Component Documentation

Each component includes:
- TypeScript definitions (`.tsx`)
- Styling (`.css`)
- Example usage (`*-example.tsx`)
- README documentation
- Test files (for select components)

Check individual component README files for detailed usage instructions.

## 🎯 Features

- ✅ Full TypeScript support
- ✅ Modular CSS styling
- ✅ Comprehensive examples
- ✅ Responsive design
- ✅ Theme support
- ✅ Production-ready components

## 🛠️ Tech Stack

- React 18+
- TypeScript
- Vite
- CSS Modules

## 📄 License

All components copied from Resume-Scribe project.

## 🤝 Contributing

This is a component library extracted from the Resume-Scribe project. Each component maintains its original implementation and styling.

---

**Total Components**: 50+  
**Total Files**: 274  
**Total Directories**: 56  
**Status**: ✅ All files successfully copied
