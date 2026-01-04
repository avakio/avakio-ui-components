# Avakio Components - Quick Reference

## 📋 Component Inventory

### Direct Components (9)
Located in: `src/components/avakio/`

1. **avakio-calendar** - Full-featured calendar component
2. **avakio-datatable** - Advanced data table with sorting/filtering
3. **avakio-gridsuggest** - Grid-based autocomplete/suggestion
4. **avakio-popup** - Modal/popup dialog system
5. **avakio-portlet** - Portlet container for widgets
6. **avakio-property** - Property editor interface
7. **avakio-scheduler** - Schedule/timeline management
8. **avakio-sidebar** - Collapsible sidebar navigation
9. **avakio-timeline** - Visual timeline component

### Layouts (4)
Located in: `src/components/avakio/layouts/`

1. **avakio-absolute-layout** - Absolute positioning system
2. **avakio-grid** - Responsive grid layout
3. **avakio-layout** - Flexible layout container
4. **avakio-resizer** - Resizable panel system

### UI Controls (20)
Located in: `src/components/avakio/ui-controls/`

1. **avakio-button** - Button component
2. **avakio-checkbox** - Checkbox input
3. **avakio-colorpicker** - Color picker
4. **avakio-combo** - Dropdown/combobox
5. **avakio-counter** - Numeric counter
6. **avakio-datepicker** - Date picker
7. **avakio-daterangepicker** - Date range picker
8. **avakio-doublelist** - Transfer list
9. **avakio-fieldset** - Fieldset container
10. **avakio-label** - Label component
11. **avakio-multicombo** - Multi-select combo
12. **avakio-multitext** - Multi-line text
13. **avakio-radio** - Radio button group
14. **avakio-richselect** - Rich select dropdown
15. **avakio-segmented-button** - Segmented buttons
16. **avakio-slider** - Range slider
17. **avakio-switch-button** - Toggle switch
18. **avakio-tabbar** - Tab navigation
19. **avakio-text** - Text input
20. **avakio-toggle-button** - Toggle button

### UI Widgets (14)
Located in: `src/components/avakio/ui-widgets/`

1. **avakio-accordion** - Accordion/collapsible
2. **avakio-bullet-graph** - Bullet chart
3. **avakio-carousel** - Image carousel
4. **avakio-chart** - Data charts
5. **avakio-comment** - Comment system
6. **avakio-dashboard** - Dashboard layout
7. **avakio-excel-viewer** - Excel file viewer
8. **avakio-form** - Form builder
9. **avakio-gage** - Gauge/meter
10. **avakio-googlemap** - Google Maps
11. **avakio-grouplist** - Grouped list
12. **avakio-hint** - Tooltip/hints
13. **avakio-tree** - Tree view
14. **avakio-view-header** - View header

### Views (3)
Located in: `src/components/avakio/views/`

1. **avakio-multiview** - Multi-view container
2. **avakio-template** - Template system
3. **avakio-view** - View container

### Themes
Located in: `src/components/avakio/themes/`

- **avakio-themes.css** - Theme styles

## 📊 Statistics

- **Total Components**: 50
- **Total Files**: 274
- **Total Directories**: 56
- **Source**: Resume-Scribe project

## 🎯 Usage Example

```typescript
// Import specific components
import { AvakioButton } from './components/avakio';
import { AvakioDataTable } from './components/avakio';

// Import theme
import './components/avakio/themes/avakio-themes.css';

function MyApp() {
  return (
    <div className="avakio-theme-light">
      <AvakioButton onClick={() => alert('Clicked!')}>
        Click Me
      </AvakioButton>
    </div>
  );
}
```

## 📂 File Structure per Component

Each component typically includes:

```
component-name/
├── component-name.tsx          # Main component
├── component-name.css          # Styles
├── component-name-example.tsx  # Usage examples
├── component-name-example.css  # Example styles (optional)
├── component-name.test.tsx     # Tests (optional)
├── index.ts                    # Export file (some components)
└── README.md                   # Documentation
```

## ✅ Copy Status

✅ All files successfully copied from `C:\code\Resume-Scribe\client\src\components\avakio`  
✅ Destination: `C:\code\avakio-ui-components\src\components\avakio`  
✅ Structure preserved  
✅ All subdirectories maintained  
✅ Ready for development
