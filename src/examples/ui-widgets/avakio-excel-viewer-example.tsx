import React, { useState, useEffect, useRef } from "react";
import "./avakio-excel-viewer-example.css";
import { AvakioExcelViewer, AvakioExcelViewerSheet, AvakioExcelViewerColumn, AvakioExcelViewerRef } from "../../components/avakio/ui-widgets/avakio-excel-viewer/avakio-excel-viewer";
import { AvakioViewHeader } from "../../components/avakio/ui-widgets/avakio-view-header/avakio-view-header";
import { AvakioTabBar } from "../../components/avakio/ui-controls/avakio-tabbar/avakio-tabbar";
import { AvakioTemplate } from "../../components/avakio/views/avakio-template/avakio-template";
import { AvakioLayout } from "../../components/avakio/layouts/avakio-layout/avakio-layout";
import { Table2, FileSpreadsheet, Settings, FileText, Columns, Edit } from "lucide-react";

// Sample data for demonstrations
const EMPLOYEES_DATA = [
  { id: 1, name: 'John Smith', department: 'Engineering', salary: 85000, startDate: '2020-03-15', status: 'Active' },
  { id: 2, name: 'Sarah Johnson', department: 'Marketing', salary: 72000, startDate: '2019-07-22', status: 'Active' },
  { id: 3, name: 'Michael Brown', department: 'Sales', salary: 68000, startDate: '2021-01-10', status: 'Active' },
  { id: 4, name: 'Emily Davis', department: 'Engineering', salary: 92000, startDate: '2018-11-05', status: 'Active' },
  { id: 5, name: 'Robert Wilson', department: 'HR', salary: 65000, startDate: '2020-06-18', status: 'Inactive' },
  { id: 6, name: 'Lisa Anderson', department: 'Finance', salary: 78000, startDate: '2019-04-30', status: 'Active' },
  { id: 7, name: 'David Martinez', department: 'Engineering', salary: 88000, startDate: '2017-09-12', status: 'Active' },
  { id: 8, name: 'Jennifer Taylor', department: 'Marketing', salary: 71000, startDate: '2021-08-25', status: 'Active' },
];

const PRODUCTS_DATA = [
  { sku: 'PRD-001', name: 'Laptop Pro 15"', category: 'Electronics', price: 1299.99, stock: 45, rating: 4.5 },
  { sku: 'PRD-002', name: 'Wireless Mouse', category: 'Accessories', price: 29.99, stock: 200, rating: 4.2 },
  { sku: 'PRD-003', name: 'USB-C Hub', category: 'Accessories', price: 49.99, stock: 150, rating: 4.7 },
  { sku: 'PRD-004', name: 'Monitor 27"', category: 'Electronics', price: 449.99, stock: 30, rating: 4.6 },
  { sku: 'PRD-005', name: 'Keyboard Mechanical', category: 'Accessories', price: 89.99, stock: 85, rating: 4.4 },
  { sku: 'PRD-006', name: 'Webcam HD', category: 'Electronics', price: 79.99, stock: 60, rating: 4.3 },
];

const SALES_DATA = [
  { month: 'January', revenue: 125000, expenses: 85000, profit: 40000, growth: '12%' },
  { month: 'February', revenue: 132000, expenses: 88000, profit: 44000, growth: '5.6%' },
  { month: 'March', revenue: 148000, expenses: 92000, profit: 56000, growth: '12.1%' },
  { month: 'April', revenue: 141000, expenses: 89000, profit: 52000, growth: '-4.7%' },
  { month: 'May', revenue: 156000, expenses: 95000, profit: 61000, growth: '10.6%' },
  { month: 'June', revenue: 168000, expenses: 98000, profit: 70000, growth: '7.7%' },
];

// Multi-sheet data
const MULTI_SHEET_DATA: AvakioExcelViewerSheet[] = [
  {
    name: 'Employees',
    data: EMPLOYEES_DATA,
    columns: [
      { id: 'id', header: 'ID', width: 60, align: 'center' },
      { id: 'name', header: 'Full Name', width: 150, sort: 'string' },
      { id: 'department', header: 'Department', width: 120, sort: 'string' },
      { id: 'salary', header: 'Salary ($)', width: 100, align: 'right', sort: 'number' },
      { id: 'startDate', header: 'Start Date', width: 110, sort: 'date' },
      { id: 'status', header: 'Status', width: 80, align: 'center' },
    ],
  },
  {
    name: 'Products',
    data: PRODUCTS_DATA,
    columns: [
      { id: 'sku', header: 'SKU', width: 90 },
      { id: 'name', header: 'Product Name', width: 180, sort: 'string' },
      { id: 'category', header: 'Category', width: 100, sort: 'string' },
      { id: 'price', header: 'Price ($)', width: 90, align: 'right', sort: 'number' },
      { id: 'stock', header: 'Stock', width: 70, align: 'right', sort: 'number' },
      { id: 'rating', header: 'Rating', width: 70, align: 'center' },
    ],
  },
  {
    name: 'Sales',
    data: SALES_DATA,
    columns: [
      { id: 'month', header: 'Month', width: 100 },
      { id: 'revenue', header: 'Revenue ($)', width: 110, align: 'right', sort: 'number' },
      { id: 'expenses', header: 'Expenses ($)', width: 110, align: 'right', sort: 'number' },
      { id: 'profit', header: 'Profit ($)', width: 100, align: 'right', sort: 'number' },
      { id: 'growth', header: 'Growth', width: 80, align: 'center' },
    ],
  },
];

// Tab options for navigation
const TAB_OPTIONS = [
  { id: 'basic', label: 'Basic Usage', icon: <Table2 size={14} /> },
  { id: 'sheets', label: 'Multiple Sheets', icon: <FileSpreadsheet size={14} /> },
  { id: 'columns', label: 'Column Config', icon: <Columns size={14} /> },
  { id: 'editing', label: 'Editing', icon: <Edit size={14} /> },
  { id: 'features', label: 'Features', icon: <Settings size={14} /> },
  { id: 'docs', label: 'Documentation', icon: <FileText size={14} /> },
];

export function AvakioExcelViewerExample() {
  
  const [activeSection, setActiveSection] = useState<string | number | null>('basic');
  
  // Refs
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const editableViewerRef = useRef<AvakioExcelViewerRef>(null);
  
  // Editable data state
  const [editableData, setEditableData] = useState([...EMPLOYEES_DATA]);

  // Scroll to section when tab is clicked
  const handleTabChange = ({ value }: { value: string | number | null }) => {
    setActiveSection(value);
    if (value && sectionRefs.current[value as string]) {
      const element = sectionRefs.current[value as string];
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  // Sync with global theme
  

  // Custom column with template
  const customColumns: AvakioExcelViewerColumn[] = [
    { id: 'id', header: 'ID', width: 60, align: 'center' },
    { id: 'name', header: 'Employee', width: 150, sort: 'string' },
    { id: 'department', header: 'Dept', width: 100 },
    { 
      id: 'salary', 
      header: 'Salary', 
      width: 120, 
      align: 'right',
      sort: 'number',
      template: (row) => (
        <span style={{ fontWeight: 600, color: row.salary > 80000 ? '#16a34a' : 'inherit' }}>
          ${row.salary.toLocaleString()}
        </span>
      )
    },
    { 
      id: 'status', 
      header: 'Status', 
      width: 100, 
      align: 'center',
      template: (row) => (
        <span 
          style={{ 
            padding: '2px 8px', 
            borderRadius: '12px', 
            fontSize: '11px',
            fontWeight: 500,
            background: row.status === 'Active' ? '#dcfce7' : '#fee2e2',
            color: row.status === 'Active' ? '#166534' : '#991b1b',
          }}
        >
          {row.status}
        </span>
      )
    },
  ];

  return (
    <AvakioLayout type="clean" className="avakio-excel-viewer-example">
      {/* Header */}
      <AvakioViewHeader
        title="Excel Viewer"
        subTitle="A powerful data grid component for displaying Excel-like tabular data with sheets, sorting, and editing"
      />

      {/* Tab Navigation */}
      <div className="avakio-excel-viewer-example-tabs">
        <AvakioTabBar
          options={TAB_OPTIONS}
          value={activeSection}
          onChange={handleTabChange}
          padding={[6, 16, 16, 16]}
        />
      </div>

      {/* Content */}
      <div className="avakio-excel-viewer-example-content">
        
        {/* Basic Usage Section */}
        <section 
          ref={(el) => { sectionRefs.current['basic'] = el; }}
          className="avakio-excel-viewer-example-section"
        >
          <h2 className="avakio-excel-viewer-example-section-title">Basic Usage</h2>
          <p className="avakio-excel-viewer-example-section-description">
            The Excel Viewer displays tabular data in a spreadsheet-like format with row numbers, headers, and cell selection.
          </p>
          
          <div className="avakio-excel-viewer-example-demo">
            <h3 className="avakio-excel-viewer-example-demo-title">Simple Data Grid</h3>
            <div className="avakio-excel-viewer-example-demo-container" style={{ height: '350px' }}>
              <AvakioExcelViewer
                data={EMPLOYEES_DATA}
                showRowNumbers
                gridLines
                select="cell"
              />
            </div>
          </div>

          <div className="avakio-excel-viewer-example-demo">
            <h3 className="avakio-excel-viewer-example-demo-title">Without Row Numbers</h3>
            <div className="avakio-excel-viewer-example-demo-container" style={{ height: '280px' }}>
              <AvakioExcelViewer
                data={PRODUCTS_DATA}
                showRowNumbers={false}
                gridLines
                select="row"
              />
            </div>
          </div>

          <div className="avakio-excel-viewer-example-code"><pre>
{`// Basic usage
<AvakioExcelViewer
  theme="material"
  data={employeesData}
  showRowNumbers
  gridLines
  select="cell"
/>

// Row selection mode
<AvakioExcelViewer
  data={productsData}
  showRowNumbers={false}
  select="row"
/>`}
            </pre></div>
        </section>

        {/* Multiple Sheets Section */}
        <section 
          ref={(el) => { sectionRefs.current['sheets'] = el; }}
          className="avakio-excel-viewer-example-section"
        >
          <h2 className="avakio-excel-viewer-example-section-title">Multiple Sheets</h2>
          <p className="avakio-excel-viewer-example-section-description">
            Excel Viewer supports multiple sheets with a toolbar that allows switching between them, similar to Excel workbooks.
          </p>
          
          <div className="avakio-excel-viewer-example-demo">
            <h3 className="avakio-excel-viewer-example-demo-title">Workbook with Sheet Tabs</h3>
            <div className="avakio-excel-viewer-example-demo-container" style={{ height: '400px' }}>
              <AvakioExcelViewer
                sheets={MULTI_SHEET_DATA}
                toolbar
                showRowNumbers
                gridLines
                select="cell"
                onSheetChange={(name, index) => console.log(`Switched to sheet: ${name} (index: ${index})`)}
              />
            </div>
          </div>

          <div className="avakio-excel-viewer-example-code"><pre>
{`// Multiple sheets configuration
const sheets = [
  {
    name: 'Employees',
    data: employeesData,
    columns: [
      { id: 'id', header: 'ID', width: 60 },
      { id: 'name', header: 'Name', width: 150 },
      // ...more columns
    ],
  },
  {
    name: 'Products',
    data: productsData,
    columns: [...],
  },
];

<AvakioExcelViewer
  sheets={sheets}
  toolbar
  onSheetChange={(name, index) => console.log(name)}
/>`}
            </pre></div>
        </section>

        {/* Column Configuration Section */}
        <section 
          ref={(el) => { sectionRefs.current['columns'] = el; }}
          className="avakio-excel-viewer-example-section"
        >
          <h2 className="avakio-excel-viewer-example-section-title">Column Configuration</h2>
          <p className="avakio-excel-viewer-example-section-description">
            Customize columns with custom widths, alignment, sorting, and cell templates for rich content rendering.
          </p>
          
          <div className="avakio-excel-viewer-example-demo">
            <h3 className="avakio-excel-viewer-example-demo-title">Custom Column Templates</h3>
            <div className="avakio-excel-viewer-example-demo-container" style={{ height: '350px' }}>
              <AvakioExcelViewer
                data={EMPLOYEES_DATA}
                columns={customColumns}
                showRowNumbers
                gridLines
                resizeColumn
              />
            </div>
          </div>

          <div className="avakio-excel-viewer-example-demo">
            <h3 className="avakio-excel-viewer-example-demo-title">Sortable Columns</h3>
            <p className="avakio-excel-viewer-example-demo-description">
              Click on column headers to sort. Supports string, number, and date sorting.
            </p>
            <div className="avakio-excel-viewer-example-demo-container" style={{ height: '300px' }}>
              <AvakioExcelViewer
                data={PRODUCTS_DATA}
                columns={[
                  { id: 'sku', header: 'SKU', width: 90, sort: 'string' },
                  { id: 'name', header: 'Product', width: 180, sort: 'string' },
                  { id: 'price', header: 'Price', width: 100, align: 'right', sort: 'number' },
                  { id: 'stock', header: 'Stock', width: 80, align: 'right', sort: 'number' },
                  { id: 'rating', header: 'Rating', width: 80, align: 'center', sort: 'number' },
                ]}
                showRowNumbers
                gridLines
                onSort={(col, dir) => console.log(`Sorted ${col.id} ${dir}`)}
              />
            </div>
          </div>

          <div className="avakio-excel-viewer-example-code"><pre>
{`// Custom column with template
const columns = [
  { id: 'name', header: 'Employee', width: 150, sort: 'string' },
  { 
    id: 'salary', 
    header: 'Salary', 
    width: 120, 
    align: 'right',
    sort: 'number',
    template: (row) => (
      <span style={{ color: row.salary > 80000 ? 'green' : 'inherit' }}>
        \${row.salary.toLocaleString()}
      </span>
    )
  },
  { 
    id: 'status', 
    header: 'Status', 
    template: (row) => (
      <span className={row.status === 'Active' ? 'badge-success' : 'badge-error'}>
        {row.status}
      </span>
    )
  },
];`}
            </pre></div>
        </section>

        {/* Editing Section */}
        <section 
          ref={(el) => { sectionRefs.current['editing'] = el; }}
          className="avakio-excel-viewer-example-section"
        >
          <h2 className="avakio-excel-viewer-example-section-title">Inline Editing</h2>
          <p className="avakio-excel-viewer-example-section-description">
            Enable inline cell editing with single-click or double-click activation. Changes can be tracked via callbacks.
          </p>
          
          <div className="avakio-excel-viewer-example-demo">
            <h3 className="avakio-excel-viewer-example-demo-title">Editable Grid (Double-click to edit)</h3>
            <div className="avakio-excel-viewer-example-demo-container" style={{ height: '350px' }}>
              <AvakioExcelViewer
                ref={editableViewerRef}
                data={editableData}
                columns={[
                  { id: 'id', header: 'ID', width: 60, editable: false },
                  { id: 'name', header: 'Name', width: 150, editable: true },
                  { id: 'department', header: 'Department', width: 120, editable: true },
                  { id: 'salary', header: 'Salary', width: 100, editable: true, editor: 'number' },
                  { id: 'status', header: 'Status', width: 100, editable: true },
                ]}
                showRowNumbers
                gridLines
                editable
                editAction="dblclick"
                navigation
                onCellChange={(row, col, oldVal, newVal, idx) => {
                  console.log(`Cell changed: ${col.id} from "${oldVal}" to "${newVal}" at row ${idx}`);
                  const newData = [...editableData];
                  newData[idx] = { ...newData[idx], [col.id]: newVal };
                  setEditableData(newData);
                }}
              />
            </div>
            <div className="avakio-excel-viewer-example-demo-actions">
              <button
                className="avakio-excel-viewer-example-btn"
                onClick={() => {
                  const newRow = {
                    id: editableData.length + 1,
                    name: 'New Employee',
                    department: 'TBD',
                    salary: 50000,
                    startDate: new Date().toISOString().split('T')[0],
                    status: 'Active',
                  };
                  setEditableData([...editableData, newRow]);
                }}
              >
                Add Row
              </button>
              <button
                className="avakio-excel-viewer-example-btn secondary"
                onClick={() => setEditableData([...EMPLOYEES_DATA])}
              >
                Reset Data
              </button>
            </div>
          </div>

          <div className="avakio-excel-viewer-example-code"><pre>
{`<AvakioExcelViewer
  data={data}
  columns={[
    { id: 'id', header: 'ID', editable: false },
    { id: 'name', header: 'Name', editable: true },
    { id: 'salary', header: 'Salary', editable: true, editor: 'number' },
  ]}
  editable
  editAction="dblclick"
  navigation
  onCellChange={(row, col, oldVal, newVal, idx) => {
    console.log(\`Changed \${col.id} to \${newVal}\`);
    // Update your data state here
  }}
/>`}
            </pre></div>
        </section>

        {/* Features Section */}
        <section 
          ref={(el) => { sectionRefs.current['features'] = el; }}
          className="avakio-excel-viewer-example-section"
        >
          <h2 className="avakio-excel-viewer-example-section-title">Features</h2>
          <p className="avakio-excel-viewer-example-section-description">
            Explore various features like keyboard navigation, column resizing, and different selection modes.
          </p>
          
          <div className="avakio-excel-viewer-example-features-grid">
            <div className="avakio-excel-viewer-example-feature-card">
              <h4>Keyboard Navigation</h4>
              <p>Use arrow keys, Tab, Enter, Home, End to navigate cells.</p>
            </div>
            <div className="avakio-excel-viewer-example-feature-card">
              <h4>Column Resizing</h4>
              <p>Drag column borders to resize. Set <code>resizeColumn</code> prop.</p>
            </div>
            <div className="avakio-excel-viewer-example-feature-card">
              <h4>Cell Selection</h4>
              <p>Support for cell, row, column, and area selection modes.</p>
            </div>
            <div className="avakio-excel-viewer-example-feature-card">
              <h4>Frozen Header</h4>
              <p>Header stays visible while scrolling with <code>freezeHeader</code>.</p>
            </div>
            <div className="avakio-excel-viewer-example-feature-card">
              <h4>Sorting</h4>
              <p>Click headers to sort. Supports string, number, date, custom.</p>
            </div>
            <div className="avakio-excel-viewer-example-feature-card">
              <h4>Cell Spans</h4>
              <p>Merge cells with rowspan and colspan configuration.</p>
            </div>
          </div>

          <div className="avakio-excel-viewer-example-demo">
            <h3 className="avakio-excel-viewer-example-demo-title">All Themes</h3>
            <div className="avakio-excel-viewer-example-themes-grid">
              {['material', 'flat', 'compact', 'dark', 'ocean', 'sunset'].map((t) => (
                <div key={t} className="avakio-excel-viewer-example-theme-demo">
                  <h4 className="avakio-excel-viewer-example-theme-title">{t}</h4>
                  <div style={{ height: '200px' }}>
                    <AvakioExcelViewer
                      theme={t as any}
                      data={PRODUCTS_DATA.slice(0, 4)}
                      columns={[
                        { id: 'name', header: 'Product', width: 120 },
                        { id: 'price', header: 'Price', width: 80, align: 'right' },
                        { id: 'stock', header: 'Stock', width: 60, align: 'right' },
                      ]}
                      showRowNumbers={false}
                      gridLines
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Documentation Section */}
        <section 
          ref={(el) => { sectionRefs.current['docs'] = el; }}
          className="avakio-excel-viewer-example-section"
          data-section="docs"
        >
          <h2 className="avakio-excel-viewer-example-section-title">Documentation</h2>
          
          <div className="avakio-excel-viewer-example-docs">
            <h3>Props Reference</h3>
            <table className="avakio-excel-viewer-example-props-table">
              <thead>
                <tr>
                  <th>Prop</th>
                  <th>Type</th>
                  <th>Default</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>theme</code></td>
                  <td><code>'material' | 'flat' | 'compact' | 'dark' | 'ocean' | 'sunset'</code></td>
                  <td><code>'material'</code></td>
                  <td>Visual theme to apply</td>
                </tr>
                <tr>
                  <td><code>data</code></td>
                  <td><code>Record&lt;string, any&gt;[]</code></td>
                  <td>-</td>
                  <td>Array of row data objects</td>
                </tr>
                <tr>
                  <td><code>sheets</code></td>
                  <td><code>AvakioExcelViewerSheet[]</code></td>
                  <td>-</td>
                  <td>Multiple sheet configuration</td>
                </tr>
                <tr>
                  <td><code>columns</code></td>
                  <td><code>AvakioExcelViewerColumn[]</code></td>
                  <td>auto</td>
                  <td>Column configuration array</td>
                </tr>
                <tr>
                  <td><code>toolbar</code></td>
                  <td><code>boolean</code></td>
                  <td><code>true</code></td>
                  <td>Show sheet tabs toolbar</td>
                </tr>
                <tr>
                  <td><code>showRowNumbers</code></td>
                  <td><code>boolean</code></td>
                  <td><code>true</code></td>
                  <td>Display row number column</td>
                </tr>
                <tr>
                  <td><code>gridLines</code></td>
                  <td><code>boolean</code></td>
                  <td><code>true</code></td>
                  <td>Show cell grid lines</td>
                </tr>
                <tr>
                  <td><code>select</code></td>
                  <td><code>boolean | 'cell' | 'row' | 'column' | 'area'</code></td>
                  <td><code>'cell'</code></td>
                  <td>Selection mode</td>
                </tr>
                <tr>
                  <td><code>editable</code></td>
                  <td><code>boolean</code></td>
                  <td><code>false</code></td>
                  <td>Enable cell editing</td>
                </tr>
                <tr>
                  <td><code>editAction</code></td>
                  <td><code>'click' | 'dblclick'</code></td>
                  <td><code>'dblclick'</code></td>
                  <td>Action to start editing</td>
                </tr>
                <tr>
                  <td><code>resizeColumn</code></td>
                  <td><code>boolean</code></td>
                  <td><code>true</code></td>
                  <td>Enable column resizing</td>
                </tr>
                <tr>
                  <td><code>freezeHeader</code></td>
                  <td><code>boolean</code></td>
                  <td><code>true</code></td>
                  <td>Sticky header on scroll</td>
                </tr>
                <tr>
                  <td><code>navigation</code></td>
                  <td><code>boolean</code></td>
                  <td><code>true</code></td>
                  <td>Enable keyboard navigation</td>
                </tr>
              </tbody>
            </table>

            <h3>Column Configuration</h3>
            <table className="avakio-excel-viewer-example-props-table">
              <thead>
                <tr>
                  <th>Property</th>
                  <th>Type</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>id</code></td>
                  <td><code>string</code></td>
                  <td>Unique column ID (matches data key)</td>
                </tr>
                <tr>
                  <td><code>header</code></td>
                  <td><code>string</code></td>
                  <td>Column header text</td>
                </tr>
                <tr>
                  <td><code>width</code></td>
                  <td><code>number</code></td>
                  <td>Column width in pixels</td>
                </tr>
                <tr>
                  <td><code>align</code></td>
                  <td><code>'left' | 'center' | 'right'</code></td>
                  <td>Cell text alignment</td>
                </tr>
                <tr>
                  <td><code>sort</code></td>
                  <td><code>boolean | 'string' | 'number' | 'date'</code></td>
                  <td>Enable/configure sorting</td>
                </tr>
                <tr>
                  <td><code>editable</code></td>
                  <td><code>boolean</code></td>
                  <td>Whether column is editable</td>
                </tr>
                <tr>
                  <td><code>template</code></td>
                  <td><code>(row, col) =&gt; ReactNode</code></td>
                  <td>Custom cell renderer</td>
                </tr>
              </tbody>
            </table>

            <h3>Ref Methods</h3>
            <table className="avakio-excel-viewer-example-props-table">
              <thead>
                <tr>
                  <th>Method</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>getSheets()</code></td>
                  <td>Get array of sheet names</td>
                </tr>
                <tr>
                  <td><code>showSheet(name)</code></td>
                  <td>Switch to a specific sheet</td>
                </tr>
                <tr>
                  <td><code>getData()</code></td>
                  <td>Get current sheet data</td>
                </tr>
                <tr>
                  <td><code>setData(data)</code></td>
                  <td>Set data for current sheet</td>
                </tr>
                <tr>
                  <td><code>select(row, col)</code></td>
                  <td>Select a cell</td>
                </tr>
                <tr>
                  <td><code>sort(columnId, direction)</code></td>
                  <td>Sort by column</td>
                </tr>
                <tr>
                  <td><code>filter(columnId, value)</code></td>
                  <td>Filter by column value</td>
                </tr>
                <tr>
                  <td><code>addRow(row, index?)</code></td>
                  <td>Add a new row</td>
                </tr>
                <tr>
                  <td><code>removeRow(index)</code></td>
                  <td>Remove a row by index</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

      </div>
    </AvakioLayout>
  );
}

export default AvakioExcelViewerExample;






















