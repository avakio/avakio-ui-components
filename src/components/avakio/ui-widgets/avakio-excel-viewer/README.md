# AvakioExcelViewer

A powerful data grid component for displaying Excel-like tabular data with multiple sheets, sorting, cell editing, and theming support.

## Features

- 📊 **Multiple Sheets** - Support for workbook-style multiple sheets with tab navigation
- 🎨 **6 Themes** - Material, Flat, Compact, Dark, Ocean, and Sunset themes
- ✏️ **Inline Editing** - Edit cells with click or double-click activation
- 🔢 **Row Numbers** - Optional row number column for easy reference
- 📐 **Column Resizing** - Drag column borders to resize
- 🔀 **Sorting** - Click headers to sort by string, number, or date
- 🎯 **Cell Selection** - Support for cell, row, column, and area selection modes
- ⌨️ **Keyboard Navigation** - Arrow keys, Tab, Enter, Home, End navigation
- 🔒 **Frozen Header** - Sticky header that stays visible while scrolling
- 🖼️ **Custom Templates** - Render custom content in cells using templates
- 🔍 **Filtering** - Programmatic filtering support
- 📱 **Responsive** - Adapts to different screen sizes

## Installation

The component is part of the Avakio UI library. Import it directly:

```tsx
import { AvakioExcelViewer } from '@/components/avakio/ui-widgets/avakio-excel-viewer';
```

## Basic Usage

### Simple Data Grid

```tsx
const data = [
  { id: 1, name: 'John Smith', department: 'Engineering', salary: 85000 },
  { id: 2, name: 'Sarah Johnson', department: 'Marketing', salary: 72000 },
  { id: 3, name: 'Michael Brown', department: 'Sales', salary: 68000 },
];

<AvakioExcelViewer
  theme="material"
  data={data}
  showRowNumbers
  gridLines
  select="cell"
/>
```

### With Custom Columns

```tsx
const columns = [
  { id: 'id', header: 'ID', width: 60, align: 'center' },
  { id: 'name', header: 'Full Name', width: 150, sort: 'string' },
  { id: 'department', header: 'Department', width: 120 },
  { id: 'salary', header: 'Salary', width: 100, align: 'right', sort: 'number' },
];

<AvakioExcelViewer
  data={data}
  columns={columns}
  showRowNumbers
  resizeColumn
/>
```

### Multiple Sheets

```tsx
const sheets = [
  {
    name: 'Employees',
    data: employeesData,
    columns: employeeColumns,
  },
  {
    name: 'Products',
    data: productsData,
    columns: productColumns,
  },
  {
    name: 'Sales',
    data: salesData,
    columns: salesColumns,
  },
];

<AvakioExcelViewer
  sheets={sheets}
  toolbar
  onSheetChange={(name, index) => console.log(`Switched to: ${name}`)}
/>
```

### Editable Grid

```tsx
<AvakioExcelViewer
  data={data}
  columns={[
    { id: 'id', header: 'ID', editable: false },
    { id: 'name', header: 'Name', editable: true },
    { id: 'salary', header: 'Salary', editable: true, editor: 'number' },
  ]}
  editable
  editAction="dblclick"
  navigation
  onCellChange={(row, col, oldVal, newVal, rowIndex) => {
    console.log(`Changed ${col.id} from ${oldVal} to ${newVal}`);
  }}
/>
```

### Custom Cell Templates

```tsx
const columns = [
  { id: 'name', header: 'Employee', width: 150 },
  { 
    id: 'salary', 
    header: 'Salary', 
    width: 120,
    template: (row) => (
      <span style={{ color: row.salary > 80000 ? 'green' : 'inherit' }}>
        ${row.salary.toLocaleString()}
      </span>
    )
  },
  { 
    id: 'status', 
    header: 'Status',
    template: (row) => (
      <span className={`badge badge-${row.status.toLowerCase()}`}>
        {row.status}
      </span>
    )
  },
];
```

## Props Reference

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `theme` | `'material' \| 'flat' \| 'compact' \| 'dark' \| 'ocean' \| 'sunset'` | `'material'` | Visual theme |
| `data` | `Record<string, any>[]` | - | Array of row data objects |
| `sheets` | `AvakioExcelViewerSheet[]` | - | Multiple sheet configuration |
| `columns` | `AvakioExcelViewerColumn[]` | auto | Column configuration |
| `toolbar` | `boolean` | `true` | Show sheet tabs toolbar |
| `showRowNumbers` | `boolean` | `true` | Display row number column |
| `gridLines` | `boolean` | `true` | Show cell grid lines |
| `select` | `boolean \| 'cell' \| 'row' \| 'column' \| 'area'` | `'cell'` | Selection mode |
| `multiselect` | `boolean` | `false` | Enable multi-selection |
| `blockselect` | `boolean` | `false` | Enable block/area selection |
| `editable` | `boolean` | `false` | Enable cell editing |
| `editAction` | `'click' \| 'dblclick'` | `'dblclick'` | Action to start editing |
| `resizeColumn` | `boolean` | `true` | Enable column resizing |
| `resizeRow` | `boolean` | `false` | Enable row resizing |
| `freezeHeader` | `boolean` | `true` | Sticky header on scroll |
| `navigation` | `boolean` | `true` | Enable keyboard navigation |
| `columnWidth` | `number` | `100` | Default column width |
| `rowHeight` | `number` | `32` | Default row height |
| `headerRowHeight` | `number` | `36` | Header row height |
| `excelHeader` | `boolean` | `false` | Use first row as header |
| `leftSplit` | `number` | `0` | Frozen columns from left |
| `topSplit` | `number` | `0` | Frozen rows from top |
| `yCount` | `number` | - | Maximum visible rows |
| `disabled` | `boolean` | `false` | Disable the component |
| `spans` | `AvakioExcelViewerSpan[]` | `[]` | Cell span configuration |

## Column Configuration

| Property | Type | Description |
|----------|------|-------------|
| `id` | `string` | Unique column ID (matches data key) |
| `header` | `string` | Column header text |
| `width` | `number` | Column width in pixels |
| `minWidth` | `number` | Minimum column width |
| `maxWidth` | `number` | Maximum column width |
| `align` | `'left' \| 'center' \| 'right'` | Cell text alignment |
| `sort` | `boolean \| 'string' \| 'number' \| 'date' \| function` | Sorting configuration |
| `editable` | `boolean` | Whether column is editable |
| `editor` | `'text' \| 'number' \| 'select' \| 'date'` | Editor type |
| `hidden` | `boolean` | Whether column is hidden |
| `css` | `string` | Custom CSS class |
| `template` | `(row, col) => ReactNode` | Custom cell renderer |

## Event Callbacks

| Callback | Parameters | Description |
|----------|------------|-------------|
| `onCellClick` | `(row, column, rowIndex, colIndex)` | Cell clicked |
| `onCellDoubleClick` | `(row, column, rowIndex, colIndex)` | Cell double-clicked |
| `onCellChange` | `(row, column, oldValue, newValue, rowIndex)` | Cell value changed |
| `onSelectionChange` | `(selection)` | Selection changed |
| `onSheetChange` | `(sheetName, sheetIndex)` | Active sheet changed |
| `onColumnResize` | `(column, newWidth)` | Column resized |
| `onRowResize` | `(rowIndex, newHeight)` | Row resized |
| `onSort` | `(column, direction)` | Data sorted |
| `onDataLoad` | `(data)` | Data loaded |

## Ref Methods

```tsx
const viewerRef = useRef<AvakioExcelViewerRef>(null);

// Access methods
viewerRef.current?.getSheets();        // Get sheet names
viewerRef.current?.showSheet('Sales'); // Switch sheet
viewerRef.current?.getData();          // Get current data
viewerRef.current?.setData(newData);   // Set data
viewerRef.current?.select(0, 0);       // Select cell
viewerRef.current?.clearSelection();   // Clear selection
viewerRef.current?.getCellValue(0, 'name'); // Get cell value
viewerRef.current?.setCellValue(0, 'name', 'New Name'); // Set cell
viewerRef.current?.addRow({ ... });    // Add row
viewerRef.current?.removeRow(0);       // Remove row
viewerRef.current?.sort('salary', 'desc'); // Sort
viewerRef.current?.filter('department', 'Engineering'); // Filter
viewerRef.current?.clearFilter();      // Clear filter
viewerRef.current?.hideColumn('id');   // Hide column
viewerRef.current?.showColumn('id');   // Show column
viewerRef.current?.refresh();          // Refresh view
```

## Keyboard Navigation

| Key | Action |
|-----|--------|
| `Arrow Keys` | Move selection |
| `Tab` | Move to next cell |
| `Shift + Tab` | Move to previous cell |
| `Enter` | Start editing / Move to next row |
| `Escape` | Cancel editing |
| `Home` | Move to first column |
| `End` | Move to last column |
| `Ctrl + Home` | Move to first cell |
| `Ctrl + End` | Move to last cell |

## Themes

The component supports 6 built-in themes:

- **Material** - Google Material Design inspired (default)
- **Flat** - Clean, minimal flat design
- **Compact** - Space-efficient compact layout
- **Dark** - Dark mode theme
- **Ocean** - Blue ocean-inspired colors
- **Sunset** - Warm orange/amber tones

## TypeScript Interfaces

```typescript
interface AvakioExcelViewerColumn {
  id: string;
  header?: string;
  width?: number;
  minWidth?: number;
  maxWidth?: number;
  css?: string;
  template?: (row: any, col: AvakioExcelViewerColumn) => React.ReactNode;
  editable?: boolean;
  editor?: 'text' | 'number' | 'select' | 'date';
  options?: { id: string | number; value: string }[];
  align?: 'left' | 'center' | 'right';
  sort?: boolean | 'string' | 'number' | 'date' | ((a: any, b: any) => number);
  hidden?: boolean;
}

interface AvakioExcelViewerSheet {
  name: string;
  data: Record<string, any>[];
  columns?: AvakioExcelViewerColumn[];
}

interface AvakioExcelViewerSpan {
  row: number;
  column: string;
  rowspan?: number;
  colspan?: number;
  css?: string;
}

interface AvakioExcelViewerSelection {
  row: number;
  column: number;
  endRow?: number;
  endColumn?: number;
}
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Part of the Avakio UI component library.

