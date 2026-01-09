import React, { useState, useRef, useCallback } from 'react';
import { AvakioDataTable } from '../../components/avakio/data-presentation/avakio-datatable/AvakioDataTable';
import type { AvakioColumn, AvakioDataTableRef, AvakioSpan } from '../../components/avakio/data-presentation/avakio-datatable/AvakioDataTable';
import { AvakioTemplate } from '../../components/avakio/views/avakio-template/avakio-template';
import { AvakioLayout } from '../../components/avakio/layouts/avakio-layout/avakio-layout';
import { AvakioCheckbox } from '../../components/avakio/ui-controls/avakio-checkbox/avakio-checkbox';
import { AvakioButton } from '../../components/avakio/ui-controls/avakio-button/avakio-button';
import { AvakioTabBar } from '../../components/avakio/ui-controls/avakio-tabbar/avakio-tabbar';
import { AvakioViewHeader } from '../../components/avakio/ui-widgets/avakio-view-header/avakio-view-header';
import { AvakioProperty, AvakioPropertyItem } from '../../components/avakio/data-presentation/avakio-property/avakio-property';
import { addEventLog } from '../../services/event-log-service';
import { 
  Table2,
  Settings2,
  Book,
  Play,
  Edit3,
} from 'lucide-react';
import './avakio-datatable-example.css';

// Tab options for navigation
const TAB_OPTIONS = [
  { id: 'basic', label: 'Basic Usage', icon: <Table2 size={14} /> },
  { id: 'options', label: 'Options', icon: <Settings2 size={14} /> },
  { id: 'editable', label: 'Editable', icon: <Edit3 size={14} /> },
  { id: 'playground', label: 'Interactive Playground', icon: <Play size={14} /> },
  { id: 'docs', label: 'Documentation', icon: <Book size={14} /> },
];

// Sample data types
interface Person {
  id: number;
  name: string;
  email: string;
  age: number;
  department: string;
  status: string;
  salary: number;
}

// Sample data
const sampleData: Person[] = [
  { id: 1, name: "John Doe", email: "john@example.com", age: 32, department: "Engineering", status: "Active", salary: 85000 },
  { id: 2, name: "Jane Smith", email: "jane@example.com", age: 28, department: "Marketing", status: "Active", salary: 72000 },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", age: 45, department: "Sales", status: "Inactive", salary: 95000 },
  { id: 4, name: "Alice Williams", email: "alice@example.com", age: 35, department: "Engineering", status: "Active", salary: 92000 },
  { id: 5, name: "Charlie Brown", email: "charlie@example.com", age: 29, department: "HR", status: "Active", salary: 65000 },
  { id: 6, name: "Diana Ross", email: "diana@example.com", age: 41, department: "Finance", status: "Active", salary: 88000 },
  { id: 7, name: "Edward King", email: "edward@example.com", age: 38, department: "Engineering", status: "Inactive", salary: 78000 },
  { id: 8, name: "Fiona Green", email: "fiona@example.com", age: 26, department: "Marketing", status: "Active", salary: 68000 },
];

// Props documentation data
interface PropDoc {
  id: number;
  name: string;
  type: string;
  defaultValue: string;
  description: string;
}

const propsData: PropDoc[] = [
  { id: 1, name: 'id', type: 'string', defaultValue: 'undefined', description: 'Component ID' },
  { id: 2, name: 'columns', type: 'AvakioColumn<T>[]', defaultValue: '[]', description: 'Array of column definitions' },
  { id: 3, name: 'data', type: 'T[]', defaultValue: '[]', description: 'Array of data objects to display' },
  { id: 4, name: 'spans', type: 'AvakioSpan[]', defaultValue: 'undefined', description: 'Cell span definitions: [rowId, columnId, colspan, rowspan, value?, cssClass?]' },
  { id: 5, name: 'height', type: 'number | string', defaultValue: "'auto'", description: 'Fixed height of the table' },
  { id: 6, name: 'width', type: 'number | string', defaultValue: "'100%'", description: 'Width of the table' },
  { id: 7, name: 'paging', type: 'boolean', defaultValue: 'false', description: 'Enable pagination' },
  { id: 8, name: 'pageSize', type: 'number', defaultValue: '20', description: 'Number of rows per page' },
  { id: 9, name: 'currentPage', type: 'number', defaultValue: '1', description: 'Current page number' },
  { id: 10, name: 'totalCount', type: 'number', defaultValue: 'undefined', description: 'Total record count (server-side)' },
  { id: 11, name: 'sortable', type: 'boolean', defaultValue: 'false', description: 'Enable column sorting' },
  { id: 12, name: 'filterable', type: 'boolean', defaultValue: 'false', description: 'Enable column filtering' },
  { id: 13, name: 'resizable', type: 'boolean', defaultValue: 'true', description: 'Enable column resizing' },
  { id: 14, name: 'columnBorders', type: 'boolean', defaultValue: 'false', description: 'Show borders between columns' },
  { id: 15, name: 'rowBorders', type: 'boolean', defaultValue: 'false', description: 'Show borders between rows' },
  { id: 16, name: 'select', type: "boolean | 'row' | 'cell' | 'column'", defaultValue: 'false', description: 'Selection mode' },
  { id: 17, name: 'multiselect', type: 'boolean', defaultValue: 'false', description: 'Enable multi-row selection' },
  { id: 18, name: 'hover', type: 'boolean', defaultValue: 'true', description: 'Enable row hover effect' },
  { id: 19, name: 'editable', type: 'boolean', defaultValue: 'false', description: 'Enable cell editing based on column type' },
  { id: 20, name: 'loading', type: 'boolean', defaultValue: 'false', description: 'Show loading state' },
  { id: 21, name: 'emptyText', type: 'string', defaultValue: "'No data available'", description: 'Message when no data' },
  { id: 22, name: 'serverSide', type: 'boolean', defaultValue: 'false', description: 'Enable server-side operations' },
  { id: 23, name: 'allowDragDrop', type: 'boolean', defaultValue: 'false', description: 'Enable drag-and-drop column reordering' },
  { id: 24, name: 'bulkSelection', type: 'boolean', defaultValue: 'false', description: 'Enable bulk selection with checkbox column on the left' },
];

const columnPropsData: PropDoc[] = [
  { id: 1, name: 'id', type: 'string', defaultValue: '-', description: 'Unique column identifier (must match data property name)' },
  { id: 2, name: 'header', type: 'string', defaultValue: '-', description: 'Column header text' },
  { id: 3, name: 'type', type: "'text' | 'number' | 'boolean' | 'date' | 'json'", defaultValue: "'text'", description: 'Data type for editing and formatting' },
  { id: 4, name: 'width', type: 'number | string', defaultValue: '150', description: 'Column width' },
  { id: 5, name: 'minWidth', type: 'number', defaultValue: 'undefined', description: 'Minimum column width' },
  { id: 6, name: 'maxWidth', type: 'number', defaultValue: 'undefined', description: 'Maximum column width' },
  { id: 7, name: 'sort', type: "'asc' | 'desc' | boolean", defaultValue: 'false', description: 'Enable sorting or set initial direction' },
  { id: 8, name: 'filterable', type: 'boolean', defaultValue: 'false', description: 'Enable column filtering' },
  { id: 9, name: 'filterType', type: "'text' | 'combo' | 'multicombo' | 'date' | 'number'", defaultValue: "'text'", description: 'Filter input type' },
  { id: 10, name: 'hidden', type: 'boolean', defaultValue: 'false', description: 'Hide the column' },
  { id: 11, name: 'resizable', type: 'boolean', defaultValue: 'true', description: 'Enable column resizing' },
  { id: 12, name: 'template', type: '(row) => ReactNode', defaultValue: 'undefined', description: 'Custom cell renderer' },
  { id: 13, name: 'format', type: '(value) => string', defaultValue: 'undefined', description: 'Format function for display' },
  { id: 14, name: 'align', type: "'left' | 'center' | 'right'", defaultValue: "'left'", description: 'Cell text alignment' },
  { id: 15, name: 'fillspace', type: 'boolean', defaultValue: 'false', description: 'Column fills remaining space' },
  { id: 16, name: 'adjust', type: "'data' | 'header' | boolean", defaultValue: 'undefined', description: 'Auto-adjust column width' },
  { id: 17, name: 'css', type: 'React.CSSProperties', defaultValue: 'undefined', description: 'Inline styles for cells' },
  { id: 18, name: 'cssClass', type: 'string', defaultValue: 'undefined', description: 'CSS class for cells' },
  { id: 19, name: 'headerCssClass', type: 'string', defaultValue: 'undefined', description: 'CSS class for header' },
  { id: 20, name: 'headerWrap', type: 'boolean', defaultValue: 'false', description: 'Allow header text wrapping' },
  { id: 21, name: 'allowDragDrop', type: 'boolean', defaultValue: 'true', description: 'Allow drag-and-drop reordering for this column (only when table allowDragDrop is enabled)' },
  { id: 22, name: 'frozen', type: "'left' | 'right' | false", defaultValue: 'false', description: 'Freeze column to left or right side. Frozen columns don\'t scroll horizontally.' },
];

// Span configuration documentation
interface SpanDoc {
  id: number;
  index: string;
  type: string;
  description: string;
}

const spanPropsData: SpanDoc[] = [
  { id: 1, index: '0', type: 'string | number', description: 'Row ID - The id value of the row where the span starts' },
  { id: 2, index: '1', type: 'string', description: 'Column ID - The id of the column where the span starts' },
  { id: 3, index: '2', type: 'number', description: 'Colspan - Number of columns to span (1 = no span)' },
  { id: 4, index: '3', type: 'number', description: 'Rowspan - Number of rows to span (1 = no span)' },
  { id: 5, index: '4', type: 'any (optional)', description: 'Value - Custom value to display in the spanned cell' },
  { id: 6, index: '5', type: 'string (optional)', description: 'CSS Class - CSS class to apply to the spanned cell (e.g., "highlight")' },
];

const spanColumns: AvakioColumn<SpanDoc>[] = [
  { id: 'index', header: 'Index', width: 80 },
  { id: 'type', header: 'Type', width: 180 },
  { id: 'description', header: 'Description', fillspace: true },
];

// Methods documentation data
interface MethodDoc {
  id: number;
  name: string;
  signature: string;
  description: string;
}

const methodsData: MethodDoc[] = [
  { id: 1, name: 'getData', signature: '() => T[]', description: 'Returns the current table data' },
  { id: 2, name: 'setData', signature: '(data: T[]) => void', description: 'Sets new data for the table' },
  { id: 3, name: 'getSelectedRows', signature: '() => (string | number)[]', description: 'Returns the IDs of currently selected rows' },
  { id: 4, name: 'getSelectedColumns', signature: '() => string[]', description: 'Returns the IDs of currently selected columns (when select="column")' },
  { id: 5, name: 'selectRows', signature: '(indices: number[]) => void', description: 'Selects rows by indices' },
  { id: 6, name: 'clearSelection', signature: '() => void', description: 'Clears all row selections' },
  { id: 7, name: 'scrollToRow', signature: '(index: number) => void', description: 'Scrolls to a specific row index' },
  { id: 8, name: 'getSortState', signature: '() => { column: string | null; direction: "asc" | "desc" }', description: 'Returns the current sort state' },
  { id: 9, name: 'setSortState', signature: '(column: string | null, direction: "asc" | "desc") => void', description: 'Sets the sort state programmatically' },
  { id: 10, name: 'getFilterValues', signature: '() => Record<string, string>', description: 'Returns the current filter values' },
  { id: 11, name: 'setFilterValues', signature: '(filters: Record<string, string>) => void', description: 'Sets filter values programmatically' },
  { id: 12, name: 'clearFilters', signature: '() => void', description: 'Clears all filters' },
  { id: 13, name: 'refresh', signature: '() => void', description: 'Refreshes the table (re-renders with current data)' },
  { id: 14, name: 'enable', signature: '() => void', description: 'Enables the component' },
  { id: 15, name: 'disable', signature: '() => void', description: 'Disables the component' },
  { id: 16, name: 'show', signature: '() => void', description: 'Shows the component' },
  { id: 17, name: 'hide', signature: '() => void', description: 'Hides the component' },
  { id: 18, name: 'hideColumn', signature: '(columnId: string) => void', description: 'Hides a column by its id' },
  { id: 19, name: 'showColumn', signature: '(columnId: string) => void', description: 'Shows a previously hidden column by its id' },
];

const methodsColumns: AvakioColumn<MethodDoc>[] = [
  { id: 'name', header: 'Method', width: 160 },
  { id: 'signature', header: 'Signature', width: 380 },
  { id: 'description', header: 'Description', fillspace: true },
];

// Events documentation data
interface EventDoc {
  id: number;
  name: string;
  signature: string;
  description: string;
}

const eventsData: EventDoc[] = [
  { id: 1, name: 'onRowClick', signature: '(row: T, index: number) => void', description: 'Fired when a row is clicked' },
  { id: 2, name: 'onRowDoubleClick', signature: '(row: T, index: number) => void', description: 'Fired when a row is double-clicked' },
  { id: 3, name: 'onSelectChange', signature: '(selected: T[]) => void', description: 'Fired when selection changes' },
  { id: 4, name: 'onSort', signature: '(columnId: string, direction: "asc" | "desc") => void', description: 'Fired when sorting changes (server-side mode)' },
  { id: 5, name: 'onFilter', signature: '(filters: Record<string, string>) => void', description: 'Fired when filters change (server-side mode)' },
  { id: 6, name: 'onPageChange', signature: '(page: number) => void', description: 'Fired when page changes' },
  { id: 7, name: 'onPageSizeChange', signature: '(pageSize: number) => void', description: 'Fired when page size changes' },
  { id: 8, name: 'onCellChange', signature: '(rowIndex: number, columnId: string, newValue: any, oldValue: any) => void', description: 'Fired when a cell value is changed via editing' },
  { id: 9, name: 'onColumnReorder', signature: '(newColumnOrder: string[]) => void', description: 'Fired when columns are reordered via drag-and-drop' },
  { id: 10, name: 'onBlur', signature: '(e: FocusEvent) => void', description: 'Fired when the component loses focus' },
  { id: 11, name: 'onFocus', signature: '(e: FocusEvent) => void', description: 'Fired when the component gains focus' },
  { id: 12, name: 'onKeyPress', signature: '(e: KeyboardEvent) => void', description: 'Fired when a key is pressed' },
];

const eventsColumns: AvakioColumn<EventDoc>[] = [
  { id: 'name', header: 'Event', width: 180 },
  { id: 'signature', header: 'Signature', width: 450 },
  { id: 'description', header: 'Description', fillspace: true },
];

const propsColumns: AvakioColumn<PropDoc>[] = [
  { id: 'name', header: 'Property', width: 160 },
  { id: 'type', header: 'Type', width: 280 },
  { id: 'defaultValue', header: 'Default', width: 120 },
  { id: 'description', header: 'Description', fillspace: true },
];

export function AvakioDataTableExample() {
  const [activeSection, setActiveSection] = useState<string | number | null>('basic');
  
  // Section refs for scroll navigation
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  
  // Playground DataTable ref for method testing
  const playgroundTableRef = useRef<AvakioDataTableRef<Person>>(null);
  
  // Editable table state
  const [editableData, setEditableData] = useState([
    { id: 1, name: 'John Doe', age: 28, email: 'john@example.com', active: true, joinDate: '2024-03-15' },
    { id: 2, name: 'Jane Smith', age: 34, email: 'jane@example.com', active: true, joinDate: '2023-11-20' },
    { id: 3, name: 'Bob Johnson', age: 45, email: 'bob@example.com', active: false, joinDate: '2024-01-10' },
    { id: 4, name: 'Alice Brown', age: 29, email: 'alice@example.com', active: true, joinDate: '2024-06-05' },
    { id: 5, name: 'Charlie Wilson', age: 52, email: 'charlie@example.com', active: false, joinDate: '2022-08-30' },
  ]);
  
  // Playground state with AvakioProperty
  const [playgroundProps, setPlaygroundProps] = useState<AvakioPropertyItem[]>([
    // Data & Display Group
    { id: 'height', label: 'Height', type: 'number', value: 300, group: 'Display', placeholder: 'e.g. 400' },
    { id: 'emptyText', label: 'Empty Text', type: 'text', value: 'No data available', group: 'Display', placeholder: 'Message when empty' },
    
    // Features Group
    { id: 'paging', label: 'Paging', type: 'checkbox', value: true, group: 'Features', checkboxLabel: 'Enable pagination' },
    { id: 'sortable', label: 'Sortable', type: 'checkbox', value: true, group: 'Features', checkboxLabel: 'Enable column sorting' },
    { id: 'filterable', label: 'Filterable', type: 'checkbox', value: true, group: 'Features', checkboxLabel: 'Enable column filtering' },
    { id: 'resizable', label: 'Resizable', type: 'checkbox', value: true, group: 'Features', checkboxLabel: 'Enable column resizing' },
    { id: 'columnBorders', label: 'Column Borders', type: 'checkbox', value: false, group: 'Features', checkboxLabel: 'Show borders between columns' },
    { id: 'rowBorders', label: 'Row Borders', type: 'checkbox', value: false, group: 'Features', checkboxLabel: 'Show borders between rows' },
    { id: 'hover', label: 'Hover', type: 'checkbox', value: true, group: 'Features', checkboxLabel: 'Enable row hover effect' },
    { id: 'editable', label: 'Editable', type: 'checkbox', value: false, group: 'Features', checkboxLabel: 'Enable cell editing' },
    { id: 'allowDragDrop', label: 'Allow Drag Drop', type: 'checkbox', value: false, group: 'Features', checkboxLabel: 'Enable column drag-drop reordering' },
    { id: 'bulkSelection', label: 'Bulk Selection', type: 'checkbox', value: false, group: 'Features', checkboxLabel: 'Enable checkbox column for bulk selection' },
    
    // Selection Group
    {
      id: 'select',
      label: 'Selection Mode',
      type: 'select',
      value: 'false',
      group: 'Selection',
      selectOptions: [
        { id: 'false', value: 'None' },
        { id: 'row', value: 'Row' },
        { id: 'cell', value: 'Cell' },
        { id: 'column', value: 'Column' },
      ],
    },
    { id: 'multiselect', label: 'Multi-select', type: 'checkbox', value: false, group: 'Selection', checkboxLabel: 'Allow multiple selection' },
    
    // Pagination Group
    {
      id: 'pageSize',
      label: 'Page Size',
      type: 'select',
      value: '5',
      group: 'Pagination',
      selectOptions: [
        { id: '5', value: '5 rows' },
        { id: '10', value: '10 rows' },
        { id: '20', value: '20 rows' },
        { id: '50', value: '50 rows' },
      ],
    },
    
    // State Group
    { id: 'loading', label: 'Loading', type: 'checkbox', value: false, group: 'State', checkboxLabel: 'Show loading state' },
  ]);

  // Helper to get prop value
  const getPropValue = <T,>(propId: string, defaultValue: T): T => {
    const prop = playgroundProps.find(p => p.id === propId);
    if (prop?.value === undefined || prop?.value === null || prop?.value === '') return defaultValue;
    return prop.value as T;
  };

  // Add to local event log and global event log
  const addLog = useCallback((action: string, details: string = '') => {
    // Add to global event log sidebar
    addEventLog('DataTable', action, details);
  }, []);

  // Handle property changes
  const handlePlaygroundPropsChange = (items: AvakioPropertyItem[], changed: AvakioPropertyItem) => {
    setPlaygroundProps(items);
    addLog('Playground prop changed', `${changed.label}: ${changed.value}`);
  };

  // Handle cell change for editable table
  const handleCellChange = useCallback((rowIndex: number, columnId: string, newValue: any, oldValue: any) => {
    setEditableData(prev => prev.map((row, idx) =>
      idx === rowIndex ? { ...row, [columnId]: newValue } : row
    ));
    addLog('onCellChange', `row ${rowIndex}, ${columnId}: ${oldValue} → ${newValue}`);
  }, [addLog]);

  // Scroll to section when tab is clicked
  const handleTabChange = (value: string | number | null) => {
    setActiveSection(value);
    if (value && sectionRefs.current[value as string]) {
      const element = sectionRefs.current[value as string];
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  // Basic columns
  const basicColumns: AvakioColumn<Person>[] = [
    { id: 'id', header: 'ID', width: 60, align: 'center' },
    { id: 'name', header: 'Name', width: 150 },
    { id: 'email', header: 'Email', fillspace: true },
    { id: 'department', header: 'Department', width: 120 },
    { id: 'status', header: 'Status', width: 100, align: 'center' },
  ];

  // Columns with sorting
  const sortableColumns: AvakioColumn<Person>[] = [
    { id: 'id', header: 'ID', width: 60, align: 'center', sort: true },
    { id: 'name', header: 'Name', width: 150, sort: true },
    { id: 'email', header: 'Email', fillspace: true },
    { id: 'age', header: 'Age', width: 80, align: 'center', sort: true },
    { id: 'salary', header: 'Salary', width: 120, align: 'right', sort: true, format: (val) => `$${val.toLocaleString()}` },
  ];

  // Columns with filtering
  const filterableColumns: AvakioColumn<Person>[] = [
    { id: 'id', header: 'ID', width: 60, align: 'center' },
    { id: 'name', header: 'Name', width: 150, filterable: true },
    { id: 'email', header: 'Email', fillspace: true, filterable: true },
    { id: 'department', header: 'Department', width: 140, filterable: true },
    { id: 'status', header: 'Status', width: 100, align: 'center', filterable: true },
  ];

  // Editable columns
  const editableColumns: AvakioColumn<typeof editableData[0]>[] = [
    { id: 'id', header: 'ID', type: 'number', width: 60, css: { color: '#999' } },
    { id: 'name', header: 'Name', type: 'text', width: 150 },
    { id: 'age', header: 'Age', type: 'number', width: 80 },
    { id: 'email', header: 'Email', type: 'text', fillspace: true },
    { id: 'active', header: 'Active', type: 'boolean', width: 80, align: 'center' },
    { id: 'joinDate', header: 'Join Date', type: 'date', width: 150 },
  ];

  // Playground columns
  const playgroundColumns: AvakioColumn<Person>[] = [
    
    { id: 'name', header: 'Name', width: 150, sort: true, filterable: true },
    { id: 'email', header: 'Email', fillspace: true, filterable: true },
    { id: 'department', header: 'Department', width: 130, filterable: true },
    { id: 'status', header: 'Status', width: 100, align: 'center', filterable: true },
    { id: 'salary', header: 'Salary', width: 120, align: 'right', sort: true, format: (val) => `$${val.toLocaleString()}` },
  ];

  // Spans example data (similar to Webix example)
  const spanFilmData = [
    { id: 1, title: "The Shawshank Redemption", country: "USA", year: 1994, votes: 678790, rating: 9.5 },
    { id: 2, title: "The Godfather", country: "USA", year: 1972, votes: 511495, rating: 9.2 },
    { id: 3, title: "The Godfather: Part II", country: "USA", year: 1974, votes: 319352, rating: 9.0 },
    { id: "sub1", title: "", country: "", year: "", votes: "", rating: 9.5, $css: "highlight-row" },
    { id: 4, title: "The Good, the Bad and the Ugly", country: "Italy", year: 1966, votes: 213030, rating: 8.9 },
    { id: 5, title: "The Star Maker", country: "Italy", year: 1995, votes: 164558, rating: 7.9 },
    { id: "sub2", title: "", country: "", year: "", votes: "", rating: 8.9, $css: "highlight-row" },
    { id: 6, title: "Amelie", country: "France", year: 2001, votes: 533848, rating: 8.5 },
    { id: 7, title: "The Intouchables", country: "France", year: 2011, votes: 352058, rating: 8.6 },
    { id: 8, title: "Van Gogh", country: "France", year: 1991, votes: 352058, rating: 7.4 },
    { id: "sub3", title: "", country: "", year: "", votes: "", rating: 8.6, $css: "highlight-row" },
  ];

  const spanFilmColumns: AvakioColumn<typeof spanFilmData[0]>[] = [
    { id: 'country', header: 'Country', width: 100 },
    { id: 'title', header: 'Film Title', fillspace: true },
    { id: 'year', header: 'Released', width: 80 },
    { id: 'votes', header: 'Votes', width: 100 },
    { id: 'rating', header: 'Rating', width: 100 },
  ];

  const filmSpans: AvakioSpan[] = [
    // Country column spans 3 rows for USA
    [1, "country", 1, 3],
    // Country column spans 2 rows for Italy
    [4, "country", 1, 2],
    // Country column spans 3 rows for France
    [6, "country", 1, 3],
    // Highlight rows: first 4 columns show "Highest Rating", rating column shows value with highlight
    ["sub1", "country", 4, 1, "Highest Rating", "highlight"],
    ["sub1", "rating", 1, 1, undefined, "highlight"],
    ["sub2", "country", 4, 1, "Highest Rating", "highlight"],
    ["sub2", "rating", 1, 1, undefined, "highlight"],
    ["sub3", "country", 4, 1, "Highest Rating", "highlight"],
    ["sub3", "rating", 1, 1, undefined, "highlight"],
  ];

  return (
    <div className="avakio-datatable-demo-container">
      {/* Sticky Header + Tab Navigation */}
      <div className="avakio-example-sticky-header">
        {/* Header */}
        <AvakioViewHeader
          label="Data Presentation"
          title="DataTable"
          subTitle="A high-performance data table with sorting, filtering, pagination, column resizing, and inline editing support."
          isSticky={false}
        />

        {/* Tab Navigation */}
        <div className="avakio-example-tabbar-container">
          <AvakioTabBar
            id="datatable-demo-tabs"
            value={activeSection}
            options={TAB_OPTIONS}
            onChange={handleTabChange}
            align="left"
            padding={[6, 16, 16, 16]}
            size="sm"
            scrollable
          />
        </div>
      </div>

      {/* Basic Usage Section */}
      <section 
        ref={(el) => { sectionRefs.current['basic'] = el; }}
        className="avakio-datatable-demo-section"
      >
        <AvakioTemplate
          type="section"
          borderType="clean"
          content="Basic Usage"
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="The DataTable displays tabular data with columns and rows. Define columns with id (matching data property) and header text."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <div key="basic-table">
              <AvakioDataTable
                data={sampleData}
                columns={basicColumns}
                height={280}
                columnBorders={true}
                rowBorders={true}
                onRowClick={(row, index) => addLog('onRowClick', `row ${index}: ${row.name}`)}
              />
            </div>,
          ]}
        />

        {/* With Sorting */}
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[16, 0, 0, 16]}
          content={<strong>With Sorting</strong>}
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="Add sort={true} to columns to enable sorting. Click column headers to sort ascending/descending."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <div key="sortable-table">
              <AvakioDataTable
                data={sampleData}
                columns={sortableColumns}
                height={280}
                onSort={(col, dir) => addLog('onSort', `${col} ${dir}`)}
              />
            </div>,
          ]}
        />

        {/* With Filtering */}
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[16, 0, 0, 16]}
          content={<strong>With Filtering</strong>}
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="Add filterable={true} to columns to enable text filtering. Type in the filter input to search within column values."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <div key="filterable-table">
              <AvakioDataTable
                data={sampleData}
                columns={filterableColumns}
                height={320}
                onFilter={(filters) => addLog('onFilter', JSON.stringify(filters))}
              />
            </div>,
          ]}
        />
      </section>

      {/* Options Section */}
      <section 
        ref={(el) => { sectionRefs.current['options'] = el; }}
        className="avakio-datatable-demo-section"
      >
        <AvakioTemplate
          type="section"
          borderType="clean"
          content="Options"
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="Configure the DataTable with various options like pagination, row selection, and custom formatting."
        />

        {/* Pagination */}
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioTemplate
              key="paging-title"
              type="clean"
              borderType="clean"
              content={<strong>Pagination</strong>}
            />,
            <AvakioTemplate
              key="paging-desc"
              type="clean"
              borderType="clean"
              padding={[8, 0, 0, 0]}
              content="Set paging={true} to enable pagination. Use pageSize to control rows per page."
            />,
            <div key="paging-table" style={{ marginTop: '16px' }}>
              <AvakioDataTable
                data={sampleData}
                columns={basicColumns}
                paging
                pageSize={3}
                height={220}
                onPageChange={(page) => addLog('onPageChange', `page ${page}`)}
                onPageSizeChange={(size) => addLog('onPageSizeChange', `${size} rows`)}
              />
            </div>,
          ]}
        />

        {/* Row Selection */}
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioTemplate
              key="select-title"
              type="clean"
              borderType="clean"
              content={<strong>Row Selection</strong>}
            />,
            <AvakioTemplate
              key="select-desc"
              type="clean"
              borderType="clean"
              padding={[8, 0, 0, 0]}
              content="Set select='row' for single selection or add multiselect={true} for multi-row selection with checkboxes."
            />,
            <div key="select-table" style={{ marginTop: '16px' }}>
              <AvakioDataTable
                data={sampleData}
                columns={basicColumns}
                select="row"
                multiselect
                height={280}
                onSelectChange={(rows) => addLog('onSelectChange', `${rows.length} rows selected`)}
              />
            </div>,
          ]}
        />

        {/* Column Selection */}
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioTemplate
              key="col-select-title"
              type="clean"
              borderType="clean"
              content={<strong>Column Selection</strong>}
            />,
            <AvakioTemplate
              key="col-select-desc"
              type="clean"
              borderType="clean"
              padding={[8, 0, 0, 0]}
              content="Set select='column' to enable column selection. Click any cell or header to select the entire column. Use multiselect={true} with Ctrl+click for multiple columns."
            />,
            <div key="col-select-table" style={{ marginTop: '16px' }}>
              <AvakioDataTable
                data={sampleData}
                columns={basicColumns}
                select="column"
                multiselect
                height={280}
              />
            </div>,
          ]}
        />

        {/* Custom Cell Rendering */}
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioTemplate
              key="template-title"
              type="clean"
              borderType="clean"
              content={<strong>Custom Cell Rendering</strong>}
            />,
            <AvakioTemplate
              key="template-desc"
              type="clean"
              borderType="clean"
              padding={[8, 0, 0, 0]}
              content="Use template function for custom cell rendering, format for value formatting, and css for inline styles."
            />,
            <div key="template-table" style={{ marginTop: '16px' }}>
              <AvakioDataTable
                data={sampleData}
                columns={[
                  { id: 'id', header: 'ID', width: 60, align: 'center' },
                  { id: 'name', header: 'Name', width: 150, css: { fontWeight: 'bold' } },
                  { id: 'email', header: 'Email', fillspace: true },
                  { 
                    id: 'status', 
                    header: 'Status', 
                    width: 100, 
                    align: 'center',
                    template: (row) => (
                      <span style={{ 
                        padding: '2px 8px', 
                        borderRadius: '4px',
                        backgroundColor: row.status === 'Active' ? '#dcfce7' : '#fee2e2',
                        color: row.status === 'Active' ? '#166534' : '#991b1b',
                        fontSize: '12px'
                      }}>
                        {row.status}
                      </span>
                    )
                  },
                  { 
                    id: 'salary', 
                    header: 'Salary', 
                    width: 120, 
                    align: 'right',
                    format: (val) => `$${val.toLocaleString()}`,
                    css: { color: '#059669', fontWeight: '500' }
                  },
                ]}
                height={280}
              />
            </div>,
          ]}
        />

        {/* Cell Spans */}
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioTemplate
              key="spans-title"
              type="clean"
              borderType="clean"
              content={<strong>Cell Spans (colspan & rowspan)</strong>}
            />,
            <AvakioTemplate
              key="spans-desc"
              type="clean"
              borderType="clean"
              padding={[8, 0, 0, 0]}
              content="Use the spans prop to merge cells across columns (colspan) or rows (rowspan). Format: [rowId, columnId, colspan, rowspan, value?, cssClass?]"
            />,
            <div key="spans-table" style={{ marginTop: '16px' }}>
              <AvakioDataTable
                data={spanFilmData}
                columns={spanFilmColumns}
                spans={filmSpans}
                columnBorders
                rowBorders
                height={400}
              />
            </div>,
          ]}
        />

        {/* Frozen Columns */}
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioTemplate
              key="frozen-title"
              type="clean"
              borderType="clean"
              content={<strong>Frozen Columns</strong>}
            />,
            <AvakioTemplate
              key="frozen-desc"
              type="clean"
              borderType="clean"
              padding={[8, 0, 0, 0]}
              content="Use frozen: 'left' or frozen: 'right' on columns to freeze them. Frozen columns stay visible while scrolling horizontally. Vertical scroll is synchronized across all panels."
            />,
            <div key="frozen-table" style={{ marginTop: '16px' }}>
              <AvakioDataTable
                data={sampleData}
                columns={[
                  { id: 'id', header: 'ID', width: 60, align: 'center', frozen: 'left' },
                  { id: 'name', header: 'Name', width: 150, frozen: 'left' },
                  { id: 'email', header: 'Email', width: 200 },
                  { id: 'age', header: 'Age', width: 80, align: 'center' },
                  { id: 'department', header: 'Department', width: 150 },
                  { id: 'salary', header: 'Salary', width: 120, align: 'right', format: (val) => `$${val.toLocaleString()}` },
                  { id: 'status', header: 'Status', width: 100, frozen: 'right' },
                ]}
                height={300}
                columnBorders
                select="row"
              />
            </div>,
          ]}
        />
      </section>

      {/* Editable Section */}
      <section 
        ref={(el) => { sectionRefs.current['editable'] = el; }}
        className="avakio-datatable-demo-section"
      >
        <AvakioTemplate
          type="section"
          borderType="clean"
          content="Editable Table"
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="Enable inline cell editing with editable={true}. Set column type to control the editor: text/number use text inputs, boolean uses checkbox, date uses date picker."
        />

        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioTemplate
              key="editable-title"
              type="clean"
              borderType="clean"
              content={<strong>Inline Cell Editing</strong>}
            />,
            <AvakioTemplate
              key="editable-desc"
              type="clean"
              borderType="clean"
              padding={[8, 0, 0, 0]}
              content="Click on any cell to edit its value. Changes trigger onCellChange callback with row index, column id, and new/old values."
            />,
            <AvakioDataTable
              margin={[16, 0, 0, 0]}
              data={editableData}
              columns={editableColumns}
              editable
              onCellChange={handleCellChange}
              paging={false}
              height={280}
            />,
            <AvakioTemplate
              key="editable-data"
              type="clean"
              borderType="clean"
              padding={[16, 0, 0, 0]}
              content={
                <div>
                  <strong>Current Data (JSON):</strong>
                  <pre style={{ 
                    background: 'var(--background-secondary)', 
                    padding: '12px', 
                    borderRadius: '4px', 
                    fontSize: '12px',
                    overflow: 'auto',
                    maxHeight: '150px',
                    marginTop: '8px'
                  }}>
                    {JSON.stringify(editableData, null, 2)}
                  </pre>
                </div>
              }
            />,
          ]}
        />
      </section>

      {/* Interactive Playground Section */}
      <section 
        ref={(el) => { sectionRefs.current['playground'] = el; }}
        className="avakio-datatable-demo-section"
      >
        <AvakioTemplate
          type="section"
          borderType="clean"
          content="Interactive Playground"
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="Experiment with different DataTable configurations in real-time. Change any property below to see the effect on the preview."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          height={750}
          rows={[
            <AvakioLayout
              key="playground-layout"
              type="clean"
              borderless={true}
              responsive
              autoResize
              gap={16}
              height="100%"
              cols={[
                // Column 1 - Preview
                <AvakioLayout
                  key="preview-col"
                  type="clean"
                  borderless={true}
                  height="100%"
                  rows={[
                    <AvakioTemplate
                      key="preview-title"
                      type="clean"
                      borderType="clean"
                      padding={[0, 0, 10, 0]}
                      content={<strong>Preview</strong>}
                    />,
                    <AvakioDataTable
                      key="playground-table"
                      ref={playgroundTableRef}
                      id="Playground_DataTable"
                      data={sampleData}
                      columns={playgroundColumns}
                      // Display props
                      height={getPropValue('height', 300)}
                      emptyText={getPropValue('emptyText', 'No data available')}
                      // Features props
                      paging={getPropValue('paging', true)}
                      sortable={getPropValue('sortable', true)}
                      filterable={getPropValue('filterable', true)}
                      resizable={getPropValue('resizable', true)}
                      columnBorders={getPropValue('columnBorders', false)}
                      rowBorders={getPropValue('rowBorders', false)}
                      hover={getPropValue('hover', true)}
                      editable={getPropValue('editable', false)}
                      allowDragDrop={getPropValue('allowDragDrop', false)}
                      bulkSelection={getPropValue('bulkSelection', false)}
                      // Selection props
                      select={getPropValue('select', 'false') === 'false' ? false : getPropValue('select', 'row') as 'row' | 'cell' | 'column'}
                      multiselect={getPropValue('multiselect', false)}
                      // Pagination props
                      pageSize={Number(getPropValue('pageSize', '5'))}
                      // State props
                      loading={getPropValue('loading', false)}
                      // Callbacks
                      onRowClick={(row, index) => addLog('onRowClick', `row ${index}: ${row.name}`)}
                      onRowDoubleClick={(row, index) => addLog('onRowDoubleClick', `row ${index}: ${row.name}`)}
                      onSelectChange={(rows) => addLog('onSelectChange', `${rows.length} rows`)}
                      onSort={(col, dir) => addLog('onSort', `${col} ${dir}`)}
                      onFilter={(filters) => addLog('onFilter', JSON.stringify(filters))}
                      onPageChange={(page) => addLog('onPageChange', `page ${page}`)}
                      onPageSizeChange={(size) => addLog('onPageSizeChange', `${size} rows`)}
                      onCellChange={(rowIdx, colId, newVal, oldVal) => addLog('onCellChange', `[${rowIdx}].${colId}: ${oldVal} → ${newVal}`)}
                      onColumnReorder={(newOrder) => addLog('onColumnReorder', newOrder.join(', '))}
                    />,
                    <AvakioTemplate
                      key="methods-title"
                      type="clean"
                      borderType="clean"
                      padding={[16, 0, 10, 0]}
                      content={<strong>Ref Methods</strong>}
                    />,
                    <AvakioTemplate
                      key="methods-buttons"
                      type="clean"
                      borderType="clean"
                      padding={[0, 0, 0, 0]}
                      scroll="xy"
                      flexWrap={true}
                      content={
                        <>
                          <AvakioButton
                            size="sm"
                            label="getData()"
                            margin={[0, 10, 10, 0]}
                            labelAlign="center"
                            width="150px"
                            buttonWidth="140px"
                            onClick={() => {
                              const data = playgroundTableRef.current?.getData();
                              addLog('getData()', `${data?.length} rows returned`);
                            }}
                          />
                          <AvakioButton
                            size="sm"
                            label="getSelectedRows()"
                            margin={[0, 10, 10, 0]}
                            labelAlign="center"
                            width="150px"
                            buttonWidth="140px"
                            onClick={() => {
                              const selected = playgroundTableRef.current?.getSelectedRows();
                              addLog('getSelectedRows()', selected?.length ? `IDs: [${selected.join(', ')}]` : 'No rows selected');
                            }}
                          />
                          <AvakioButton
                            size="sm"
                            label="getSelectedColumns()"
                            margin={[0, 10, 10, 0]}
                            labelAlign="center"
                            width="150px"
                            buttonWidth="140px"
                            onClick={() => {
                              const selected = playgroundTableRef.current?.getSelectedColumns();
                              addLog('getSelectedColumns()', selected?.length ? `IDs: [${selected.join(', ')}]` : 'No columns selected');
                            }}
                          />
                          <AvakioButton
                            size="sm"
                            label="selectRows([0,2])"
                            margin={[0, 10, 10, 0]}
                            labelAlign="center"
                            width="150px"
                            buttonWidth="140px"
                            onClick={() => {
                              playgroundTableRef.current?.selectRows([0, 2]);
                              addLog('selectRows([0,2])', 'Selected rows 0 and 2');
                            }}
                          />
                          <AvakioButton
                            size="sm"
                            label="clearSelection()"
                            margin={[0, 10, 10, 0]}
                            labelAlign="center"
                            width="150px"
                            buttonWidth="140px"
                            onClick={() => {
                              playgroundTableRef.current?.clearSelection();
                              addLog('clearSelection()', 'Cleared selection');
                            }}
                          />
                          <AvakioButton
                            size="sm"
                            label="scrollToRow(5)"
                            margin={[0, 10, 10, 0]}
                            labelAlign="center"
                            width="150px"
                            buttonWidth="140px"
                            onClick={() => {
                              playgroundTableRef.current?.scrollToRow(5);
                              addLog('scrollToRow(5)', 'Scrolled to row 5');
                            }}
                          />
                          <AvakioButton
                            size="sm"
                            label="getSortState()"
                            margin={[0, 10, 10, 0]}
                            labelAlign="center"
                            width="150px"
                            buttonWidth="140px"
                            onClick={() => {
                              const sort = playgroundTableRef.current?.getSortState();
                              addLog('getSortState()', JSON.stringify(sort));
                            }}
                          />
                          <AvakioButton
                            size="sm"
                            label="setSortState()"
                            margin={[0, 10, 10, 0]}
                            labelAlign="center"
                            width="150px"
                            buttonWidth="140px"
                            onClick={() => {
                              playgroundTableRef.current?.setSortState('name', 'asc');
                              addLog('setSortState()', 'name asc');
                            }}
                          />
                          <AvakioButton
                            size="sm"
                            label="getFilterValues()"
                            margin={[0, 10, 10, 0]}
                            labelAlign="center"
                            width="150px"
                            buttonWidth="140px"
                            onClick={() => {
                              const filters = playgroundTableRef.current?.getFilterValues();
                              addLog('getFilterValues()', JSON.stringify(filters));
                            }}
                          />
                          <AvakioButton
                            size="sm"
                            label="setFilterValues()"
                            margin={[0, 10, 10, 0]}
                            labelAlign="center"
                            width="150px"
                            buttonWidth="140px"
                            onClick={() => {
                              playgroundTableRef.current?.setFilterValues({ name: 'John' });
                              addLog('setFilterValues()', '{ name: "John" }');
                            }}
                          />
                          <AvakioButton
                            size="sm"
                            label="clearFilters()"
                            margin={[0, 10, 10, 0]}
                            labelAlign="center"
                            width="150px"
                            buttonWidth="140px"
                            onClick={() => {
                              playgroundTableRef.current?.clearFilters();
                              addLog('clearFilters()', 'Cleared filters');
                            }}
                          />
                          <AvakioButton
                            size="sm"
                            label="hideColumn(email)"
                            margin={[0, 10, 10, 0]}
                            labelAlign="center"
                            width="150px"
                            buttonWidth="140px"
                            onClick={() => {
                              playgroundTableRef.current?.hideColumn('email');
                              addLog('hideColumn()', 'email hidden');
                            }}
                          />
                          <AvakioButton
                            size="sm"
                            label="showColumn(email)"
                            margin={[0, 10, 10, 0]}
                            labelAlign="center"
                            width="150px"
                            buttonWidth="140px"
                            onClick={() => {
                              playgroundTableRef.current?.showColumn('email');
                              addLog('showColumn()', 'email shown');
                            }}
                          />
                          <AvakioButton
                            size="sm"
                            label="refresh()"
                            margin={[0, 10, 10, 0]}
                            labelAlign="center"
                            width="150px"
                            buttonWidth="140px"
                            onClick={() => {
                              playgroundTableRef.current?.refresh();
                              addLog('refresh()', 'Table refreshed');
                            }}
                          />
                          <AvakioButton
                            size="sm"
                            label="disable()"
                            margin={[0, 10, 10, 0]}
                            labelAlign="center"
                            width="150px"
                            buttonWidth="140px"
                            onClick={() => {
                              playgroundTableRef.current?.disable();
                              addLog('disable()', 'Table disabled');
                            }}
                          />
                          <AvakioButton
                            size="sm"
                            label="enable()"
                            margin={[0, 10, 10, 0]}
                            labelAlign="center"
                            width="150px"
                            buttonWidth="140px"
                            onClick={() => {
                              playgroundTableRef.current?.enable();
                              addLog('enable()', 'Table enabled');
                            }}
                          />
                        </>
                      }
                    />,
                  ]}
                />,
                // Column 2 - Configuration
                <AvakioLayout
                  key="config-col"
                  id="Layout-row-Column2"
                  type="clean"
                  borderless={true}
                  height="100%"
                  rows={[
                    <AvakioLayout
                      id="Layout-row1-col-Column2"
                      key="config-header"
                      type="clean"
                      borderless={true}
                      height="50px"
                      width="100%"
                      cols={[
                        <AvakioTemplate
                          id="Template-config-header"
                          key="config-title"
                          type="clean"
                          borderType="clean"
                          content={<strong>Configuration</strong>}
                        />,
                        <AvakioTemplate
                          id="Template-config-header-button"
                          key="config-reset"
                          type="clean"
                          borderType="clean"
                          width="100%"
                          align="right"
                          content={
                            <AvakioButton
                              id="Button-reset-playground"
                              size="sm"
                              label="Reset"
                              align="right"
                              onClick={() => {
                                // Reset to initial values
                                setPlaygroundProps([
                                  // Data & Display Group
                                  { id: 'height', label: 'Height', type: 'number', value: 300, group: 'Display', placeholder: 'e.g. 400' },
                                  { id: 'emptyText', label: 'Empty Text', type: 'text', value: 'No data available', group: 'Display', placeholder: 'Message when empty' },
                                  // Features Group
                                  { id: 'paging', label: 'Paging', type: 'checkbox', value: true, group: 'Features', checkboxLabel: 'Enable pagination' },
                                  { id: 'sortable', label: 'Sortable', type: 'checkbox', value: true, group: 'Features', checkboxLabel: 'Enable column sorting' },
                                  { id: 'filterable', label: 'Filterable', type: 'checkbox', value: true, group: 'Features', checkboxLabel: 'Enable column filtering' },
                                  { id: 'resizable', label: 'Resizable', type: 'checkbox', value: true, group: 'Features', checkboxLabel: 'Enable column resizing' },
                                  { id: 'columnBorders', label: 'Column Borders', type: 'checkbox', value: false, group: 'Features', checkboxLabel: 'Show borders between columns' },
                                  { id: 'rowBorders', label: 'Row Borders', type: 'checkbox', value: false, group: 'Features', checkboxLabel: 'Show borders between rows' },
                                  { id: 'hover', label: 'Hover', type: 'checkbox', value: true, group: 'Features', checkboxLabel: 'Enable row hover effect' },
                                  { id: 'editable', label: 'Editable', type: 'checkbox', value: false, group: 'Features', checkboxLabel: 'Enable cell editing' },
                                  { id: 'allowDragDrop', label: 'Allow Drag Drop', type: 'checkbox', value: false, group: 'Features', checkboxLabel: 'Enable column drag-drop reordering' },
                                  { id: 'bulkSelection', label: 'Bulk Selection', type: 'checkbox', value: false, group: 'Features', checkboxLabel: 'Enable checkbox column for bulk selection' },
                                  // Selection Group
                                  {
                                    id: 'select',
                                    label: 'Selection Mode',
                                    type: 'select',
                                    value: 'false',
                                    group: 'Selection',
                                    selectOptions: [
                                      { id: 'false', value: 'None' },
                                      { id: 'row', value: 'Row' },
                                      { id: 'cell', value: 'Cell' },
                                      { id: 'column', value: 'Column' },
                                    ],
                                  },
                                  { id: 'multiselect', label: 'Multi-select', type: 'checkbox', value: false, group: 'Selection', checkboxLabel: 'Allow multiple selection' },
                                  // Pagination Group
                                  {
                                    id: 'pageSize',
                                    label: 'Page Size',
                                    type: 'select',
                                    value: '5',
                                    group: 'Pagination',
                                    selectOptions: [
                                      { id: '5', value: '5 rows' },
                                      { id: '10', value: '10 rows' },
                                      { id: '20', value: '20 rows' },
                                      { id: '50', value: '50 rows' },
                                    ],
                                  },
                                  // State Group
                                  { id: 'loading', label: 'Loading', type: 'checkbox', value: false, group: 'State', checkboxLabel: 'Show loading state' },
                                ]);
                                addLog('Reset', 'playground configuration reset to defaults');
                              }}
                            />
                          }
                        />,
                      ]}
                    />,
                    <AvakioProperty
                      id="Property-playground-props"
                      key="config-property"
                      className="avakio-fill-container"
                      items={playgroundProps}
                      onChange={handlePlaygroundPropsChange}
                      dense
                      showBorders
                      autoHeight
                      overflowY="auto"
                    />,
                  ]}
                />,
              ]}
            />,
          ]}
        />
      </section>

      {/* Documentation Section */}
      <section 
        ref={(el) => { sectionRefs.current['docs'] = el; }}
        className="avakio-datatable-demo-section"
      >
        <AvakioTemplate
          type="section"
          borderType="clean"
          content="Documentation"
        />

        {/* DataTable Props Table */}
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[16, 0, 0, 16]}
          content={<strong>DataTable Props</strong>}
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={0}
          rows={[
            <AvakioDataTable<PropDoc>
              key="props-table"
              id="datatable-props-table"
              data={propsData}
              columns={propsColumns}
              filterable={true}
              sortable={true}
              rowBorders={true}
              select={false}
              height={600}
            />,
          ]}
        />

        {/* Column Props Table */}
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[24, 0, 0, 16]}
          content={<strong>Column Configuration (AvakioColumn)</strong>}
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={0}
          rows={[
            <AvakioDataTable<PropDoc>
              key="column-props-table"
              id="datatable-column-props-table"
              data={columnPropsData}
              columns={propsColumns}
              filterable={true}
              sortable={true}
              rowBorders={true}
              select={false}
              height={500}
            />,
          ]}
        />

        {/* Methods Table */}
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[24, 0, 0, 16]}
          content={<strong>Methods (via ref)</strong>}
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[4, 0, 0, 16]}
          content="Access methods using a ref: const tableRef = useRef<AvakioDataTableRef<T>>(null)"
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={0}
          rows={[
            <AvakioDataTable<MethodDoc>
              key="methods-table"
              id="datatable-methods-table"
              data={methodsData}
              columns={methodsColumns}
              filterable={true}
              sortable={true}
              rowBorders={true}
              select={false}
              height={400}
            />,
          ]}
        />

        {/* Events Table */}
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[24, 0, 0, 16]}
          content={<strong>Events</strong>}
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={0}
          rows={[
            <AvakioDataTable<EventDoc>
              key="events-table"
              id="datatable-events-table"
              data={eventsData}
              columns={eventsColumns}
              filterable={true}
              sortable={true}
              rowBorders={true}
              select={false}
              height={320}
            />,
          ]}
        />

        {/* Spans Configuration */}
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[24, 0, 0, 16]}
          content={<strong>Spans Configuration (AvakioSpan)</strong>}
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[8, 0, 8, 16]}
          content="The spans prop accepts an array of AvakioSpan tuples. Each span is defined as a tuple with the following elements:"
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={0}
          rows={[
            <AvakioDataTable<SpanDoc>
              key="span-docs-table"
              id="datatable-span-docs-table"
              data={spanPropsData}
              columns={spanColumns}
              rowBorders={true}
              select={false}
              height={260}
            />,
          ]}
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[8, 0, 0, 16]}
          content={
            <code style={{ fontSize: '13px', background: '#f1f5f9', padding: '8px 12px', borderRadius: '4px', display: 'block' }}>
              {`type AvakioSpan = [rowId: string | number, columnId: string, colspan: number, rowspan: number, value?: any, cssClass?: string]`}
            </code>
          }
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[16, 0, 0, 16]}
          content={
            <div>
              <strong>Example:</strong>
              <pre style={{ fontSize: '12px', background: '#f1f5f9', padding: '12px', borderRadius: '4px', marginTop: '8px', overflow: 'auto' }}>
{`const spans: AvakioSpan[] = [
  // Country column spans multiple rows
  [1, 'country', 1, 3],           // Row 1, "country" column, colspan=1, rowspan=3
  
  // Highlight row spanning all columns
  [4, 'country', 4, 1, 'Highest Rating', 'highlight'],  // Full row span with custom value and CSS class
  
  // Single cell highlight
  [3, 'rating', 1, 1, null, 'highlight'],  // Apply highlight class to rating cell
];`}
              </pre>
            </div>
          }
        />
      </section>
    </div>
  );
}

export default AvakioDataTableExample;
