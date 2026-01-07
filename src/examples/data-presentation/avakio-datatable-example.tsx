import React, { useState, useRef, useCallback } from 'react';
import { AvakioDataTable } from '../../components/avakio/data-presentation/avakio-datatable/AvakioDataTable';
import type { AvakioColumn, AvakioDataTableRef } from '../../components/avakio/data-presentation/avakio-datatable/AvakioDataTable';
import { AvakioTemplate } from '../../components/avakio/views/avakio-template/avakio-template';
import { AvakioLayout } from '../../components/avakio/layouts/avakio-layout/avakio-layout';
import { AvakioCheckbox } from '../../components/avakio/ui-controls/avakio-checkbox/avakio-checkbox';
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
  { id: 4, name: 'height', type: 'number | string', defaultValue: "'auto'", description: 'Fixed height of the table' },
  { id: 5, name: 'width', type: 'number | string', defaultValue: "'100%'", description: 'Width of the table' },
  { id: 6, name: 'paging', type: 'boolean', defaultValue: 'false', description: 'Enable pagination' },
  { id: 7, name: 'pageSize', type: 'number', defaultValue: '20', description: 'Number of rows per page' },
  { id: 8, name: 'currentPage', type: 'number', defaultValue: '1', description: 'Current page number' },
  { id: 9, name: 'totalCount', type: 'number', defaultValue: 'undefined', description: 'Total record count (server-side)' },
  { id: 10, name: 'sortable', type: 'boolean', defaultValue: 'true', description: 'Enable column sorting' },
  { id: 11, name: 'filterable', type: 'boolean', defaultValue: 'true', description: 'Enable column filtering' },
  { id: 12, name: 'resizable', type: 'boolean', defaultValue: 'true', description: 'Enable column resizing' },
  { id: 13, name: 'select', type: "boolean | 'row' | 'cell' | 'column'", defaultValue: 'false', description: 'Selection mode' },
  { id: 14, name: 'multiselect', type: 'boolean', defaultValue: 'false', description: 'Enable multi-row selection' },
  { id: 15, name: 'hover', type: 'boolean', defaultValue: 'true', description: 'Enable row hover effect' },
  { id: 16, name: 'editable', type: 'boolean', defaultValue: 'false', description: 'Enable cell editing based on column type' },
  { id: 17, name: 'loading', type: 'boolean', defaultValue: 'false', description: 'Show loading state' },
  { id: 18, name: 'emptyText', type: 'string', defaultValue: "'No data available'", description: 'Message when no data' },
  { id: 19, name: 'serverSide', type: 'boolean', defaultValue: 'false', description: 'Enable server-side operations' },
  { id: 20, name: 'onRowClick', type: '(row, index) => void', defaultValue: 'undefined', description: 'Row click callback' },
  { id: 21, name: 'onRowDoubleClick', type: '(row, index) => void', defaultValue: 'undefined', description: 'Row double-click callback' },
  { id: 22, name: 'onSelectChange', type: '(rows) => void', defaultValue: 'undefined', description: 'Selection change callback' },
  { id: 23, name: 'onSort', type: '(columnId, direction) => void', defaultValue: 'undefined', description: 'Sort callback' },
  { id: 24, name: 'onFilter', type: '(filters) => void', defaultValue: 'undefined', description: 'Filter callback' },
  { id: 25, name: 'onPageChange', type: '(page) => void', defaultValue: 'undefined', description: 'Page change callback' },
  { id: 26, name: 'onPageSizeChange', type: '(size) => void', defaultValue: 'undefined', description: 'Page size change callback' },
  { id: 27, name: 'onCellChange', type: '(rowIndex, columnId, newValue, oldValue) => void', defaultValue: 'undefined', description: 'Cell value change callback (editable mode)' },
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
    { id: 'hover', label: 'Hover', type: 'checkbox', value: true, group: 'Features', checkboxLabel: 'Enable row hover effect' },
    { id: 'editable', label: 'Editable', type: 'checkbox', value: false, group: 'Features', checkboxLabel: 'Enable cell editing' },
    
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
    { id: 'id', header: 'ID', width: 60, align: 'center', sort: true },
    { id: 'name', header: 'Name', width: 150, sort: true, filterable: true },
    { id: 'email', header: 'Email', fillspace: true, filterable: true },
    { id: 'department', header: 'Department', width: 130, filterable: true },
    { id: 'status', header: 'Status', width: 100, align: 'center', filterable: true },
    { id: 'salary', header: 'Salary', width: 120, align: 'right', sort: true, format: (val) => `$${val.toLocaleString()}` },
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
          rows={[
            <AvakioLayout
              key="playground-layout"
              type="clean"
              borderless={true}
              cols={[
                // Column 1 - Preview
                <AvakioLayout
                  key="preview-col"
                  type="clean"
                  borderless={true}
                  rows={[
                    <AvakioTemplate
                      key="preview-title"
                      type="clean"
                      borderType="clean"
                      padding={[0, 0, 10, 0]}
                      content={<strong>Preview</strong>}
                    />,
                    <div key="playground-table">
                      <AvakioDataTable
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
                        hover={getPropValue('hover', true)}
                        editable={getPropValue('editable', false)}
                        // Selection props
                        select={getPropValue('select', 'false') === 'false' ? false : getPropValue('select', 'row') as 'row' | 'cell'}
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
                      />
                    </div>,
                  ]}
                />,
                // Column 2 - Configuration
                <AvakioLayout
                  key="config-col"
                  type="clean"
                  borderless={true}
                  rows={[
                    <AvakioTemplate
                      key="config-title"
                      type="clean"
                      borderType="clean"
                      padding={[0, 0, 10, 0]}
                      content={<strong>Configuration</strong>}
                    />,
                    <AvakioProperty
                      key="config-property"
                      items={playgroundProps}
                      onChange={handlePlaygroundPropsChange}
                      dense
                      showBorders
                      maxHeight={500}
                      style={{ overflowY: 'auto' }}
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
              select={false}
              height={500}
            />,
          ]}
        />
      </section>
    </div>
  );
}

export default AvakioDataTableExample;
