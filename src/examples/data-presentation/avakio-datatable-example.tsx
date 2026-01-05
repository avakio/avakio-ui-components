import React, { useState, useRef, useEffect, useCallback } from 'react';
import { AvakioDataTable } from '../../components/avakio/data-presentation/avakio-datatable/AvakioDataTable';
import type { AvakioColumn } from '../../components/avakio/data-presentation/avakio-datatable/AvakioDataTable';
import { AvakioTemplate } from '../../components/avakio/views/avakio-template/avakio-template';
import { AvakioLayout } from '../../components/avakio/layouts/avakio-layout/avakio-layout';
import { AvakioRichSelect } from '../../components/avakio/ui-controls/avakio-richselect/avakio-richselect';
import { AvakioCheckbox } from '../../components/avakio/ui-controls/avakio-checkbox/avakio-checkbox';
import { AvakioButton } from '../../components/avakio/ui-controls/avakio-button/avakio-button';
import { AvakioTabBar } from '../../components/avakio/ui-controls/avakio-tabbar/avakio-tabbar';
import { AvakioViewHeader } from '../../components/avakio/ui-widgets/avakio-view-header/avakio-view-header';
import { AvakioCombo } from '../../components/avakio/ui-controls/avakio-combo/avakio-combo';
import { AvakioDatePicker } from '../../components/avakio/ui-controls/avakio-datepicker/avakio-datepicker';
import { 
  Table2,
  Settings2,
  Book,
  Play,
  Server,
  Filter,
  Calendar,
} from 'lucide-react';
import './avakio-datatable-example.css';

// DatePicker Filter Component - defined outside to prevent recreation on every render
const DatePickerFilter = React.memo(({ value, onChange }: { value: any; onChange: (value: any) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tempValue, setTempValue] = useState(value || "");
  const containerRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);

  // Sync tempValue when external value changes
  useEffect(() => {
    if (initializedRef.current) {
      setTempValue(value || "");
    }
    initializedRef.current = true;
  }, [value]);

  const displayValue = value ? (() => {
    const date = new Date(value);
    if (isNaN(date.getTime())) return value;
    return date.toISOString().split('T')[0];
  })() : "";

  useEffect(() => {
    if (!isOpen) return;
    
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleDateChange = useCallback((newValue: string) => {
    setTempValue(newValue);
  }, []);

  const handleApply = useCallback(() => {
    if (tempValue) {
      const date = new Date(tempValue);
      if (!isNaN(date.getTime())) {
        onChange(date.toISOString());
      }
    }
    setIsOpen(false);
  }, [tempValue, onChange]);

  const handleClear = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setTempValue("");
    onChange("");
  }, [onChange]);

  const handleCancel = useCallback(() => {
    setTempValue(value || "");
    setIsOpen(false);
  }, [value]);

  return (
    <div ref={containerRef} className="relative">
      <div 
        className="avakio-datatable-filter-input-wrapper cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Calendar className="h-3 w-3 text-muted-foreground" />
        <input
          type="text"
          className="avakio-datatable-filter-input cursor-pointer"
          placeholder="Select date..."
          value={displayValue}
          readOnly
        />
        {value && (
          <button
            className="avakio-datatable-filter-clear"
            onClick={handleClear}
          >
            ✕
          </button>
        )}
      </div>
      {isOpen && (
        <div className="avakio-datatable-datepicker-dropdown">
          <AvakioDatePicker
            value={tempValue}
            onChange={handleDateChange}
          />
          <div className="avakio-datepicker-filter-actions">
            <button
              className="avakio-datepicker-filter-apply"
              onClick={handleApply}
            >
              Apply
            </button>
            <button
              className="avakio-datepicker-filter-cancel"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
});

// Tab options for navigation
const TAB_OPTIONS = [
  { id: 'basic', label: 'Basic Usage', icon: <Table2 size={14} /> },
  { id: 'server', label: 'Server-Side Data', icon: <Server size={14} /> },
  { id: 'filtering', label: 'Filtering', icon: <Filter size={14} /> },
  { id: 'options', label: 'Options', icon: <Settings2 size={14} /> },
  { id: 'playground', label: 'Interactive Playground', icon: <Play size={14} /> },
  { id: 'docs', label: 'Documentation', icon: <Book size={14} /> },
];

// Interfaces
interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: string;
  joinDate: string;
  revenue: number;
}

// Static sample data for basic example
const staticCustomers: Customer[] = [
  { id: 1, name: "John Doe", email: "john.doe@example.com", phone: "+1-555-0101", company: "Tech Corp", status: "active", joinDate: "2023-01-15", revenue: 125000 },
  { id: 2, name: "Jane Smith", email: "jane.smith@example.com", phone: "+1-555-0102", company: "Design Studio", status: "active", joinDate: "2023-02-20", revenue: 89000 },
  { id: 3, name: "Bob Johnson", email: "bob.johnson@example.com", phone: "+1-555-0103", company: "Marketing Inc", status: "inactive", joinDate: "2022-12-10", revenue: 156000 },
  { id: 4, name: "Alice Williams", email: "alice.williams@example.com", phone: "+1-555-0104", company: "Finance Group", status: "active", joinDate: "2023-11-05", revenue: 234000 },
  { id: 5, name: "Charlie Brown", email: "charlie.brown@example.com", phone: "+1-555-0105", company: "Software Solutions", status: "active", joinDate: "2023-10-12", revenue: 78000 },
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
  { id: 4, name: 'pageSize', type: 'number', defaultValue: '10', description: 'Number of rows per page' },
  { id: 5, name: 'currentPage', type: 'number', defaultValue: '1', description: 'Current page number (server-side)' },
  { id: 6, name: 'totalCount', type: 'number', defaultValue: 'undefined', description: 'Total record count (server-side pagination)' },
  { id: 7, name: 'paging', type: 'boolean', defaultValue: 'true', description: 'Enable pagination' },
  { id: 8, name: 'sortable', type: 'boolean', defaultValue: 'true', description: 'Enable column sorting' },
  { id: 9, name: 'filterable', type: 'boolean', defaultValue: 'true', description: 'Enable column filtering' },
  { id: 10, name: 'resizable', type: 'boolean', defaultValue: 'true', description: 'Enable column resizing' },
  { id: 11, name: 'select', type: "'row' | 'cell' | false", defaultValue: 'false', description: 'Selection mode' },
  { id: 12, name: 'serverSide', type: 'boolean', defaultValue: 'false', description: 'Enable server-side operations' },
  { id: 13, name: 'loading', type: 'boolean', defaultValue: 'false', description: 'Show loading state' },
  { id: 14, name: 'height', type: 'number | string', defaultValue: 'undefined', description: 'Fixed height' },
  { id: 15, name: 'emptyMessage', type: 'string', defaultValue: '"No data"', description: 'Message when no data' },
  { id: 16, name: 'onPageChange', type: '(page: number) => void', defaultValue: 'undefined', description: 'Page change callback' },
  { id: 17, name: 'onPageSizeChange', type: '(size: number) => void', defaultValue: 'undefined', description: 'Page size change callback' },
  { id: 18, name: 'onSort', type: '(col, dir) => void', defaultValue: 'undefined', description: 'Sort callback' },
  { id: 19, name: 'onFilter', type: '(filters) => void', defaultValue: 'undefined', description: 'Filter callback' },
  { id: 20, name: 'onSelectChange', type: '(rows) => void', defaultValue: 'undefined', description: 'Selection change callback' },
];

const columnPropsData: PropDoc[] = [
  { id: 1, name: 'id', type: 'string', defaultValue: '-', description: 'Unique column identifier' },
  { id: 2, name: 'header', type: 'string | ReactNode', defaultValue: '-', description: 'Column header content' },
  { id: 3, name: 'width', type: 'number', defaultValue: '100', description: 'Column width in pixels' },
  { id: 4, name: 'minWidth', type: 'number', defaultValue: 'undefined', description: 'Minimum column width' },
  { id: 5, name: 'maxWidth', type: 'number', defaultValue: 'undefined', description: 'Maximum column width' },
  { id: 6, name: 'sort', type: 'boolean', defaultValue: 'false', description: 'Enable sorting for column' },
  { id: 7, name: 'filterable', type: 'boolean', defaultValue: 'false', description: 'Enable filtering for column' },
  { id: 8, name: 'filterType', type: "'text' | 'combo' | 'multicombo' | 'date'", defaultValue: "'text'", description: 'Filter input type' },
  { id: 9, name: 'filterComponent', type: '(value, onChange) => ReactNode', defaultValue: 'undefined', description: 'Custom filter component' },
  { id: 10, name: 'resizable', type: 'boolean', defaultValue: 'true', description: 'Enable column resizing' },
  { id: 11, name: 'template', type: '(row: T) => ReactNode', defaultValue: 'undefined', description: 'Custom cell renderer' },
  { id: 12, name: 'headerWrap', type: 'boolean', defaultValue: 'false', description: 'Allow header text to wrap to multiple lines' },
  { id: 13, name: 'fillspace', type: 'boolean', defaultValue: 'false', description: 'Column will fill the remaining available space' },
];

export function AvakioDataTableExample() {
  const [activeSection, setActiveSection] = useState<string | number | null>('basic');
  
  // Section refs for scroll navigation
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  
  // Server-side state for customers
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [customersLoading, setCustomersLoading] = useState(false);
  const [customersPage, setCustomersPage] = useState(1);
  const [customersPageSize, setCustomersPageSize] = useState(5);
  const [customersTotalCount, setCustomersTotalCount] = useState(0);
  const [customersSortColumn, setCustomersSortColumn] = useState<string | null>(null);
  const [customersSortDirection, setCustomersSortDirection] = useState<'asc' | 'desc'>('asc');
  const [customersFilters, setCustomersFilters] = useState<Record<string, string>>({});
  const [customerStatusOptions, setCustomerStatusOptions] = useState<Array<{ id: string; value: string }>>([]);

  // Playground state
  const [playgroundPaging, setPlaygroundPaging] = useState(true);
  const [playgroundSortable, setPlaygroundSortable] = useState(true);
  const [playgroundFilterable, setPlaygroundFilterable] = useState(true);
  const [playgroundResizable, setPlaygroundResizable] = useState(true);
  const [playgroundSelect, setPlaygroundSelect] = useState<string>('false');
  const [playgroundPageSize, setPlaygroundPageSize] = useState<string>('5');
  const [eventLog, setEventLog] = useState<string[]>([]);

  // Add to event log - memoized to prevent infinite loops
  const addLog = useCallback((message: string) => {
    setEventLog(prev => [...prev.slice(-4), `${new Date().toLocaleTimeString()} - ${message}`]);
  }, []);

  // Memoized selection change handlers to prevent re-creation on every render
  const handleServerSelectChange = useCallback((rows: Customer[]) => {
    addLog(`Selected ${rows.length} customers`);
  }, [addLog]);

  const handleOptionsSelectChange = useCallback((rows: Customer[]) => {
    addLog(`Selected ${rows.length} rows`);
  }, [addLog]);

  const handlePlaygroundSelectChange = useCallback((rows: Customer[]) => {
    addLog(`Selected ${rows.length} rows`);
  }, [addLog]);

  const handlePlaygroundSort = useCallback((col: string, dir: 'asc' | 'desc') => {
    addLog(`Sorted by ${col} (${dir})`);
  }, [addLog]);

  const handlePlaygroundFilter = useCallback((filters: Record<string, string>) => {
    addLog(`Filters: ${JSON.stringify(filters)}`);
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

  // Fetch customer status options
  const fetchCustomerStatuses = useCallback(async () => {
    try {
      const res = await fetch('/api/customer-statuses');
      if (!res.ok) return;
      const data = await res.json();
      setCustomerStatusOptions(data.statuses?.map((s: { value: string; label: string }) => ({ id: s.value, value: s.label })) || []);
    } catch (error) {
      console.error('Error fetching customer statuses:', error);
    }
  }, []);

  // Fetch customers from API
  const fetchCustomers = useCallback(async (
    page: number,
    pageSize: number,
    sortColumn: string | null,
    sortDirection: 'asc' | 'desc',
    filters: Record<string, string>
  ) => {
    setCustomersLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: pageSize.toString(),
      });

      if (sortColumn) {
        params.append('sortBy', sortColumn);
        params.append('sortOrder', sortDirection);
      }

      Object.entries(filters).forEach(([key, value]) => {
        if (value) {
          params.append(`filter_${key}`, value);
        }
      });

      const res = await fetch(`/api/customers?${params.toString()}`);
      
      if (!res.ok) {
        throw new Error(`Failed to fetch customers: ${res.status}`);
      }
      
      const data = await res.json();
      setCustomers(data.customers || []);
      setCustomersTotalCount(data.total || 0);
    } catch (error) {
      console.error("Error fetching customers:", error);
      setCustomers([]);
      setCustomersTotalCount(0);
    } finally {
      setCustomersLoading(false);
    }
  }, []);

  // Load data on mount
  useEffect(() => {
    fetchCustomerStatuses();
    fetchCustomers(customersPage, customersPageSize, customersSortColumn, customersSortDirection, customersFilters);
  }, []);

  // Customer handlers
  const handleCustomersPageChange = (newPage: number) => {
    setCustomersPage(newPage);
    fetchCustomers(newPage, customersPageSize, customersSortColumn, customersSortDirection, customersFilters);
  };

  const handleCustomersPageSizeChange = (newPageSize: number) => {
    setCustomersPageSize(newPageSize);
    setCustomersPage(1);
    fetchCustomers(1, newPageSize, customersSortColumn, customersSortDirection, customersFilters);
  };

  const handleCustomersSort = (columnId: string, direction: 'asc' | 'desc') => {
    setCustomersSortColumn(columnId);
    setCustomersSortDirection(direction);
    setCustomersPage(1);
    fetchCustomers(1, customersPageSize, columnId, direction, customersFilters);
  };

  const handleCustomersFilter = (filters: Record<string, string>) => {
    setCustomersFilters(filters);
    setCustomersPage(1);
    fetchCustomers(1, customersPageSize, customersSortColumn, customersSortDirection, filters);
  };

  // Basic columns (static data)
  const basicColumns: AvakioColumn<Customer>[] = [
    {
      id: "id",
      header: "ID",
      width: 60,
      sort: true,
      filterable: true,
      resizable: false,
      template: (row) => row.id,
    },
    {
      id: "name",
      header: "Name",
      width: 150,
      sort: true,
      filterable: true,
      template: (row) => row.name,
    },
    {
      id: "email",
      header: "Email",
      width:440,
      minWidth: 60,
      sort: true,
      filterable: true,
      template: (row) => row.email,
    },
    {
      id: "company",
      header: "Company",
      width: 150,
      sort: true,
      filterable: true,
      resizable: false,
      fillspace: true,
      template: (row) => row.company,
    },
    {
      id: "status",
      header: "Status",
      width: 150,
      sort: true,
      filterable: true,
      template: (row) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            row.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
          }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      id: "revenue",
      header: "Annual Revenue ($)",
      headerWrap: false,
      width: 100,
      sort: true,
      template: (row) => `$${row.revenue.toLocaleString()}`,
    },
  ];

  // Server-side columns
  const serverColumns: AvakioColumn<Customer>[] = [
    {
      id: "id",
      header: "ID",
      width: 60,
      sort: true,
      template: (row) => row.id,
    },
    {
      id: "name",
      header: "Name",
      width: 150,
      sort: true,
      filterable: true,
      template: (row) => row.name,
    },
    {
      id: "email",
      header: "Email",
      width: 220,
      sort: true,
      filterable: true,
      template: (row) => row.email,
    },
    {
      id: "phone",
      header: "Phone",
      width: 130,
      filterable: true,
      template: (row) => row.phone,
    },
    {
      id: "company",
      header: "Company",
      width: 160,
      sort: true,
      filterable: true,
      template: (row) => row.company,
    },
    {
      id: "status",
      header: "Status",
      width: 120,
      sort: true,
      filterable: true,
      filterType: 'combo' as const,
      filterComponent: (value, onChange) => (
        <AvakioCombo
          options={customerStatusOptions}
          value={value || ''}
          onChange={onChange}
          placeholder="Filter status..."
        />
      ),
      template: (row) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            row.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
          }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      id: "joinDate",
      header: "Join Date",
      width: 140,
      sort: true,
      filterable: true,
      filterType: 'date' as const,
      filterComponent: (value, onChange) => (
        <DatePickerFilter value={value} onChange={onChange} />
      ),
      template: (row) => row.joinDate,
    },
    {
      id: "revenue",
      header: "Revenue",
      width: 120,
      sort: true,
      template: (row) => (
        <span className={row.revenue >= 200000 ? "text-green-600 font-medium" : ""}>
          ${row.revenue.toLocaleString()}
        </span>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      width: 100,
      template: (row) => (
        <AvakioButton
          size="sm"
          variant="outline"
          onClick={() => alert(`View customer: ${row.name}`)}
        >
          View
        </AvakioButton>
      ),
    },
  ];

  // Props documentation columns
  const propsColumns: AvakioColumn<PropDoc>[] = [
    { id: 'name', header: 'Property', width: 150 },
    { id: 'type', header: 'Type', width: 280 },
    { id: 'defaultValue', header: 'Default', width: 120 },
    { id: 'description', header: 'Description', width: 380 },
  ];

  return (
    <div className="avakio-datatable-demo-container">
      {/* Sticky Header + Tab Navigation */}
      <div className="avakio-example-sticky-header">
        {/* Header */}
        <AvakioViewHeader
          label="Data Presentation"
          title="DataTable"                                
          subTitle="A high-performance data table component with sorting, filtering, pagination, column resizing, and server-side data support."
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
          content="A simple data table displaying customer information with built-in sorting, filtering, and pagination."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <div key="basic" style={{ width: '100%' }}>
              <AvakioDataTable
                columns={basicColumns}
                data={staticCustomers}
                pageSize={5}
                resizable={true}
                filterable={true}
                sortable={true}
              />
            </div>,
          ]}
        />
      </section>

      {/* Server-Side Data Section */}
      <section 
        ref={(el) => { sectionRefs.current['server'] = el; }}
        className="avakio-datatable-demo-section"
      >
        <AvakioTemplate
          type="section"
          borderType="clean"
          content="Server-Side Data"
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="DataTable with server-side pagination, sorting, and filtering. Data is fetched from a backend API endpoint."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <div key="server" style={{ width: '100%' }}>
              <AvakioDataTable
                columns={serverColumns}
                data={customers}
                serverSide={true}
                paging={true}
                pageSize={customersPageSize}
                currentPage={customersPage}
                totalCount={customersTotalCount}
                loading={customersLoading}
                resizable={true}
                filterable={true}
                sortable={true}
                select="row"
                onPageChange={handleCustomersPageChange}
                onPageSizeChange={handleCustomersPageSizeChange}
                onSort={handleCustomersSort}
                onFilter={handleCustomersFilter}
                onSelectChange={handleServerSelectChange}
              />
            </div>,
            <div key="api-info" style={{ marginTop: '16px', padding: '12px', background: '#f5f5f5', borderRadius: '6px', fontSize: '12px' }}>
              <strong>API Endpoint:</strong> <code>GET /api/customers</code>
              <div style={{ marginTop: '8px', color: '#666' }}>
                Supports query parameters: page, limit, sortBy, sortOrder, filter_*
              </div>
            </div>,
          ]}
        />
      </section>

      {/* Filtering Section */}
      <section 
        ref={(el) => { sectionRefs.current['filtering'] = el; }}
        className="avakio-datatable-demo-section"
      >
        <AvakioTemplate
          type="section"
          borderType="clean"
          content="Filtering"
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="DataTable supports various filter types including text input, combo select, and date picker filters."
        />

        {/* Text Filter */}
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioTemplate
              key="text-filter-title"
              type="clean"
              borderType="clean"
              content={<strong>Text Filter (Default)</strong>}
            />,
            <AvakioTemplate
              key="text-filter-desc"
              type="clean"
              borderType="clean"
              padding={[8, 0, 0, 0]}
              content="Simple text input for searching within column values."
            />,
            <div key="text-filter" style={{ marginTop: '16px' }}>
              <pre style={{ background: '#f5f5f5', padding: '12px', borderRadius: '6px', fontSize: '12px', overflow: 'auto' }}>
{`{
  id: "name",
  header: "Name",
  filterable: true,  // Uses text filter by default
}`}
              </pre>
            </div>,
          ]}
        />

        {/* Combo Filter */}
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioTemplate
              key="combo-filter-title"
              type="clean"
              borderType="clean"
              content={<strong>Combo Filter</strong>}
            />,
            <AvakioTemplate
              key="combo-filter-desc"
              type="clean"
              borderType="clean"
              padding={[8, 0, 0, 0]}
              content="Dropdown select for filtering by predefined options."
            />,
            <div key="combo-filter" style={{ marginTop: '16px' }}>
              <pre style={{ background: '#f5f5f5', padding: '12px', borderRadius: '6px', fontSize: '12px', overflow: 'auto' }}>
{`{
  id: "status",
  header: "Status",
  filterable: true,
  filterType: 'combo',
  filterComponent: (value, onChange) => (
    <AvakioCombo
      options={statusOptions}
      value={value}
      onChange={onChange}
      placeholder="Filter status..."
    />
  ),
}`}
              </pre>
            </div>,
          ]}
        />

        {/* Date Filter */}
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioTemplate
              key="date-filter-title"
              type="clean"
              borderType="clean"
              content={<strong>Date Filter</strong>}
            />,
            <AvakioTemplate
              key="date-filter-desc"
              type="clean"
              borderType="clean"
              padding={[8, 0, 0, 0]}
              content="Date picker for filtering by date values."
            />,
            <div key="date-filter" style={{ marginTop: '16px' }}>
              <pre style={{ background: '#f5f5f5', padding: '12px', borderRadius: '6px', fontSize: '12px', overflow: 'auto' }}>
{`{
  id: "joinDate",
  header: "Join Date",
  filterable: true,
  filterType: 'date',
  filterComponent: (value, onChange) => (
    <DatePickerFilter value={value} onChange={onChange} />
  ),
}`}
              </pre>
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
          content="Configure the DataTable with various options for different use cases."
        />

        {/* Row Selection */}
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioTemplate
              key="selection-title"
              type="clean"
              borderType="clean"
              content={<strong>Row Selection</strong>}
            />,
            <AvakioTemplate
              key="selection-desc"
              type="clean"
              borderType="clean"
              padding={[8, 0, 0, 0]}
              content="Enable row selection with checkboxes for batch operations."
            />,
            <div key="selection" style={{ marginTop: '16px' }}>
              <AvakioDataTable
                columns={basicColumns.slice(0, 4)}
                data={staticCustomers.slice(0, 3)}
                pageSize={5}
                paging={false}
                select="row"
                onSelectChange={handleOptionsSelectChange}
              />
            </div>,
          ]}
        />

        {/* Without Pagination */}
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioTemplate
              key="no-paging-title"
              type="clean"
              borderType="clean"
              content={<strong>Without Pagination</strong>}
            />,
            <AvakioTemplate
              key="no-paging-desc"
              type="clean"
              borderType="clean"
              padding={[8, 0, 0, 0]}
              content="Display all data without pagination controls."
            />,
            <div key="no-paging" style={{ marginTop: '16px' }}>
              <AvakioDataTable
                columns={basicColumns.slice(0, 4)}
                data={staticCustomers.slice(0, 3)}
                paging={false}
              />
            </div>,
          ]}
        />

        {/* Custom Cell Templates */}
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
              content={<strong>Custom Cell Templates</strong>}
            />,
            <AvakioTemplate
              key="template-desc"
              type="clean"
              borderType="clean"
              padding={[8, 0, 0, 0]}
              content="Use the template property to render custom cell content."
            />,
            <div key="template" style={{ marginTop: '16px' }}>
              <pre style={{ background: '#f5f5f5', padding: '12px', borderRadius: '6px', fontSize: '12px', overflow: 'auto' }}>
{`{
  id: "status",
  header: "Status",
  template: (row) => (
    <span className={\`badge \${row.status === 'active' ? 'badge-success' : 'badge-default'}\`}>
      {row.status}
    </span>
  ),
}`}
              </pre>
            </div>,
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
          content="Experiment with different DataTable configurations in real-time."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <div key="playground" style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
              {/* Preview */}
              <div style={{ flex: 1, minWidth: 400, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <AvakioTemplate
                  type="clean"
                  borderType="clean"
                  content={<strong>Preview</strong>}
                />
                <div>
                  <AvakioDataTable
                    columns={basicColumns}
                    data={staticCustomers}
                    paging={playgroundPaging}
                    pageSize={parseInt(playgroundPageSize)}
                    sortable={playgroundSortable}
                    filterable={playgroundFilterable}
                    resizable={playgroundResizable}
                    select={playgroundSelect === 'false' ? false : playgroundSelect as 'row' | 'cell'}
                    onSelectChange={handlePlaygroundSelectChange}
                    onSort={handlePlaygroundSort}
                    onFilter={handlePlaygroundFilter}
                  />
                </div>
              </div>

              {/* Controls */}
              <div style={{ width: '280px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <AvakioTemplate
                  type="clean"
                  borderType="clean"
                  content={<strong>Configuration</strong>}
                />
                <AvakioRichSelect
                  label="Selection Mode"
                  value={playgroundSelect}
                  options={[
                    { id: 'false', value: 'None' },
                    { id: 'row', value: 'Row Selection' },
                    { id: 'cell', value: 'Cell Selection' },
                  ]}
                  onChange={(val) => setPlaygroundSelect(String(val))}
                />
                <AvakioRichSelect
                  label="Page Size"
                  value={playgroundPageSize}
                  options={[
                    { id: '3', value: '3 rows' },
                    { id: '5', value: '5 rows' },
                    { id: '10', value: '10 rows' },
                  ]}
                  onChange={(val) => setPlaygroundPageSize(String(val))}
                />
                <AvakioCheckbox
                  label="Enable Pagination"
                  checked={playgroundPaging}
                  onChange={setPlaygroundPaging}
                />
                <AvakioCheckbox
                  label="Enable Sorting"
                  checked={playgroundSortable}
                  onChange={setPlaygroundSortable}
                />
                <AvakioCheckbox
                  label="Enable Filtering"
                  checked={playgroundFilterable}
                  onChange={setPlaygroundFilterable}
                />
                <AvakioCheckbox
                  label="Enable Resizing"
                  checked={playgroundResizable}
                  onChange={setPlaygroundResizable}
                />
              </div>
            </div>,
            <div key="event-log" style={{ marginTop: '16px', padding: '12px', background: '#f5f5f5', borderRadius: '6px', fontSize: '12px' }}>
              <strong>Event Log:</strong>
              <div style={{ marginTop: '8px', maxHeight: '100px', overflow: 'auto' }}>
                {eventLog.length === 0 ? (<div style={{ color: '#888' }}>No events yet...</div>) : (
                  eventLog.map((log, i) => (
                    <div key={i} style={{ padding: '2px 0', color: '#666' }}>{log}</div>
                  ))
                )}
              </div>
            </div>,
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

        {/* Props Table */}
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[16, 0, 0, 16]}
          content={<strong>Component Props</strong>}
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
              height={500}
            />,
          ]}
        />

        {/* Column Props Table */}
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[24, 0, 0, 16]}
          content={<strong>Column Configuration</strong>}
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
              height={350}
            />,
          ]}
        />

        {/* Usage Example */}
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[24, 0, 0, 16]}
          content={<strong>Usage Example</strong>}
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <pre key="usage" style={{ background: '#f5f5f5', padding: '16px', borderRadius: '6px', fontSize: '12px', overflow: 'auto' }}>
{`import { AvakioDataTable } from '@avakio/ui-components';
import type { AvakioColumn } from '@avakio/ui-components';

interface Customer {
  id: number;
  name: string;
  email: string;
  status: string;
}

const columns: AvakioColumn<Customer>[] = [
  { id: "id", header: "ID", width: 60, sort: true },
  { id: "name", header: "Name", width: 150, sort: true, filterable: true },
  { id: "email", header: "Email", width: 200, filterable: true },
  { 
    id: "status", 
    header: "Status", 
    width: 100,
    template: (row) => (
      <span className={\`badge \${row.status === 'active' ? 'badge-success' : 'badge-default'}\`}>
        {row.status}
      </span>
    ),
  },
];

// Basic usage
<AvakioDataTable
  columns={columns}
  data={customers}
  pageSize={10}
  sortable={true}
  filterable={true}
  resizable={true}
/>

// Server-side usage
<AvakioDataTable
  columns={columns}
  data={customers}
  serverSide={true}
  currentPage={page}
  pageSize={pageSize}
  totalCount={totalCount}
  loading={loading}
  onPageChange={handlePageChange}
  onSort={handleSort}
  onFilter={handleFilter}
/>`}
            </pre>,
          ]}
        />
      </section>
    </div>
  );
}

export default AvakioDataTableExample;











