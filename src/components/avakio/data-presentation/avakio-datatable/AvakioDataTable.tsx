import React, { useState, useMemo, useCallback, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { ChevronUp, ChevronDown, ChevronsUpDown, ChevronLeft, ChevronRight, Search, X } from 'lucide-react';
import { AvakioText } from '../../ui-controls/avakio-text/avakio-text';
import { AvakioButton } from '../../ui-controls/avakio-button/avakio-button';
import { AvakioRichSelect } from '../../ui-controls/avakio-richselect/avakio-richselect';
import { AvakioMultiCombo } from '../../ui-controls/avakio-multicombo/avakio-multicombo';
import { AvakioCheckbox } from '../../ui-controls/avakio-checkbox/avakio-checkbox';
import { AvakioDatePicker } from '../../ui-controls/avakio-datepicker/avakio-datepicker';
import { 
  AvakioBaseProps, 
  AvakioBaseRef,
  computeBaseStyles,
  formatSize 
} from '../../base/avakio-base-props';
import './avakio-datatable.css';

/**
 * =============================================================================
 * EXCLUDED BASE PROPS, METHODS, AND EVENTS
 * =============================================================================
 * The following properties from AvakioBaseProps are NOT applicable to DataTable
 * because DataTable is a complex data component, not a simple form input.
 * 
 * EXCLUDED PROPS:
 * - clearable: DataTable doesn't have a single value to clear
 * - inputAlign: No single input field in DataTable
 * - inputHeight: No single input field in DataTable  
 * - inputWidth: No single input field in DataTable
 * - invalid: DataTable doesn't have form validation
 * - invalidMessage: DataTable doesn't have form validation
 * - label: DataTable doesn't use a label (has headers instead)
 * - labelAlign: No label support
 * - labelPosition: No label support
 * - labelWidth: No label support
 * - bottomLabel: No label support
 * - placeholder: No single input placeholder
 * - readonly: Use 'editable' prop instead
 * - required: DataTable is not a required form field
 * - validate: No single value validation
 * - value: DataTable uses 'data' prop instead
 * - onChange: DataTable uses specific callbacks (onRowClick, onCellChange, etc.)
 * 
 * EXCLUDED METHODS (from AvakioBaseRef):
 * - getText: DataTable doesn't have single text value
 * - getValue: DataTable uses getData() instead
 * - setValue: DataTable uses setData() instead
 * - validate: No single value validation
 * 
 * EXCLUDED EVENTS:
 * - onItemClick: Use onRowClick, onRowDoubleClick instead
 * =============================================================================
 */

/** Props excluded from AvakioBaseProps for DataTable component */
export type AvakioDataTableExcludedProps = 
  | 'clearable'
  | 'height'
  | 'inputAlign'
  | 'inputHeight'
  | 'inputWidth'
  | 'invalid'
  | 'invalidMessage'
  | 'label'
  | 'labelAlign'
  | 'labelPosition'
  | 'labelWidth'
  | 'bottomLabel'
  | 'placeholder'
  | 'readonly'
  | 'required'
  | 'validate'
  | 'value'
  | 'onChange'
  | 'onItemClick';

export interface AvakioColumn<T = any> {
  id: string;
  header: string;
  /** Data type of the column: text, number, boolean, date, json (default: 'text') */
  type?: 'text' | 'number' | 'boolean' | 'date' | 'json';
  /** Allow header text to wrap to multiple lines */
  headerWrap?: boolean;
  /** Column will fill the remaining available space */
  fillspace?: boolean;
  width?: number | string;
  minWidth?: number;
  maxWidth?: number;
  sort?: 'asc' | 'desc' | boolean;
  /** Whether the column is filterable when table-level filterable is enabled (default: true) */
  filterable?: boolean;
  filterComponent?: (value: any, onChange: (value: any) => void) => React.ReactNode;
  filterType?: 'text' | 'date' | 'number' | 'multicombo' | 'combo';
  hidden?: boolean;
  resizable?: boolean;
  template?: (row: T) => React.ReactNode;
  cssClass?: string;
  headerCssClass?: string;
  /** Inline CSS styles for the header label */
  cssHeader?: React.CSSProperties;
  align?: 'left' | 'center' | 'right';
  format?: (value: any) => string;
  /** Auto-adjust column width: 'data' (widest content), 'header' (header text), or true (both) */
  adjust?: 'data' | 'header' | boolean;
  /** Inline CSS styles for cells in this column, e.g. { textAlign: 'right', fontWeight: 'bold' } */
  css?: React.CSSProperties;
  /** Allow drag-and-drop reordering for this column (default: true). Only effective when table's allowDragDrop is enabled. */
  allowDragDrop?: boolean;
  /** Freeze column to left or right side of the table. Frozen columns don't scroll horizontally. */
  frozen?: 'left' | 'right' | false;
}

export type AvakioSpan = [
  rowId: string | number,
  columnId: string,
  colspan: number,
  rowspan: number,
  value?: any,
  cssClass?: string
];

/**
 * DataTable-specific ref interface extending AvakioBaseRef with exclusions.
 * Provides imperative methods for controlling the DataTable.
 * 
 * Note: The following AvakioBaseRef methods are NOT available for DataTable:
 * - getText: Use getData() to get table data
 * - getValue: Use getData() to get table data  
 * - setValue: Use setData() to set table data
 * - validate: DataTable doesn't support single-value validation
 */
export interface AvakioDataTableRef<T = any> extends Omit<AvakioBaseRef<T[]>, 'getText' | 'getValue' | 'setValue' | 'validate'> {
  /** Returns the current table data */
  getData: () => T[];
  
  /** Sets new data for the table */
  setData: (data: T[]) => void;
  
  /** Returns the IDs of currently selected rows */
  getSelectedRows: () => (string | number)[];
  
  /** Selects rows by indices */
  selectRows: (indices: number[]) => void;
  
  /** Clears all row selections */
  clearSelection: () => void;
  
  /** Scrolls to a specific row index */
  scrollToRow: (index: number) => void;
  
  /** Returns the current sort state */
  getSortState: () => { column: string | null; direction: 'asc' | 'desc' };
  
  /** Sets the sort state programmatically */
  setSortState: (column: string | null, direction: 'asc' | 'desc') => void;
  
  /** Returns the current filter values */
  getFilterValues: () => Record<string, string | string[]>;
  
  /** Sets filter values programmatically */
  setFilterValues: (filters: Record<string, string | string[]>) => void;
  
  /** Clears all filters */
  clearFilters: () => void;
  
  /** Refreshes the table (re-renders with current data) */
  refresh: () => void;
  
  /** Hides a column by its id */
  hideColumn: (columnId: string) => void;
  
  /** Shows a previously hidden column by its id */
  showColumn: (columnId: string) => void;
  
  /** Returns the IDs of currently selected columns (when select='column') */
  getSelectedColumns: () => string[];
}

/**
 * Props interface for AvakioDataTable component.
 * Extends AvakioBaseProps with DataTable-specific exclusions.
 */
export interface AvakioDataTableProps<T = any> extends Omit<AvakioBaseProps, AvakioDataTableExcludedProps> {
  /** Table data array */
  data: T[];
  /** Cell span definitions: [rowId, columnId, colspan, rowspan, value?, cssClass?] */
  spans?: AvakioSpan[];
  /** Column configuration array */
  columns: AvakioColumn<T>[];
  /** Selection mode: false (disabled), 'row', 'cell', or 'column' */
  select?: boolean | 'row' | 'cell' | 'column';
  /** Allow multiple selections */
  multiselect?: boolean;
  /** Height of each data row in pixels */
  rowHeight?: number;
  /** Height of the header row in pixels */
  headerHeight?: number;
  /** Number of fixed (frozen) rows at the top */
  fixedRowNumber?: number;
  /** Enable row hover highlighting */
  hover?: boolean;
  /** Enable column resizing by dragging */
  resizable?: boolean;
  /** Enable column sorting by clicking headers */
  sortable?: boolean;
  /** Enable column filtering */
  filterable?: boolean;
  /** Show borders between columns */
  columnBorders?: boolean;
  /** Show borders between rows */
  rowBorders?: boolean;
  /** Enable pagination */
  paging?: boolean;
  /** Number of rows per page when paging is enabled */
  pageSize?: number;
  /** Auto-configure columns from data keys */
  autoConfig?: boolean;
  /** Scroll behavior: false, 'x', 'y', or 'xy' */
  scroll?: boolean | 'x' | 'y' | 'xy';
  /** Additional CSS class for styling */
  css?: string;
  /** Enable server-side data handling */
  serverSide?: boolean;
  /** Callback when a row is clicked */
  onRowClick?: (row: T, index: number) => void;
  /** Callback when a row is double-clicked */
  onRowDoubleClick?: (row: T, index: number) => void;
  /** Callback when selection changes */
  onSelectChange?: (selected: T[]) => void;
  /** Callback when sorting changes (server-side mode) */
  onSort?: (columnId: string, direction: 'asc' | 'desc') => void;
  /** Callback when filters change (server-side mode) */
  onFilter?: (filters: Record<string, string | string[]>) => void;
  /** Show loading spinner overlay */
  loading?: boolean;
  /** Text to display when table has no data */
  emptyText?: string;
  /** Total row count for server-side pagination */
  totalCount?: number;
  /** Current page number (1-indexed) */
  currentPage?: number;
  /** Callback when page changes */
  onPageChange?: (page: number) => void;
  /** Callback when page size changes */
  onPageSizeChange?: (pageSize: number) => void;
  /** Enable inline cell editing based on column type */
  editable?: boolean;
  /** Callback when a cell value is changed via editing */
  onCellChange?: (rowIndex: number, columnId: string, newValue: any, oldValue: any) => void;
  /** Enable drag-and-drop column reordering */
  allowDragDrop?: boolean;
  /** Callback when columns are reordered via drag-and-drop */
  onColumnReorder?: (newColumnOrder: string[]) => void;
  /** Enable bulk selection with checkbox column on the left */
  bulkSelection?: boolean;
  /** Show row number as first column */
  showRowNum?: boolean;
}

// Inner component with generic type parameter
function AvakioDataTableInner<T extends Record<string, any>>(
  {
    id = 'avakio-datatable',
    data,
    spans,
    columns,
    height = 'auto',
    width = '100%',
    select = false,
    multiselect = false,
    rowHeight = 40,
    headerHeight = 44,
    fixedRowNumber = 0,
    hover = true,
    resizable = true,
    sortable = false,
    filterable = false,
    columnBorders = false,
    rowBorders = false,
    paging = false,
    pageSize = 20,
    autoConfig = false,
    scroll = 'xy',
    css = '',
    serverSide = false,
    onRowClick,
    onRowDoubleClick,
    onSelectChange,
    onSort,
    onFilter,
    loading = false,
    emptyText = 'No data available',
    totalCount,
    currentPage = 1,
    onPageChange,
    onPageSizeChange,
    testId,
    editable = false,
    onCellChange,
    allowDragDrop = false,
    onColumnReorder,
    bulkSelection = false,
    showRowNum = false,
    // Base props
    className,
    style,
    disabled = false,
    hidden = false,
    borderless = false,
    minWidth,
    minHeight,
    maxWidth,
    maxHeight,
    margin,
    padding,
    tooltip,
    align,
    // Event handlers from base
    onBlur,
    onFocus,
    onKeyPress,
    onAfterRender,
    onBeforeRender,
    onViewShow,
    onViewResize,
    onAfterScroll,
  }: AvakioDataTableProps<T>,
  ref: React.ForwardedRef<AvakioDataTableRef<T>>
) {
  // Root element ref
  const rootRef = useRef<HTMLDivElement>(null);
  
  // Refs for three-panel frozen columns scroll synchronization
  const leftFrozenBodyRef = useRef<HTMLDivElement>(null);
  const scrollableBodyRef = useRef<HTMLDivElement>(null);
  const scrollableHeaderRef = useRef<HTMLDivElement>(null);
  const horizontalScrollbarRef = useRef<HTMLDivElement>(null);
  const rightFrozenBodyRef = useRef<HTMLDivElement>(null);
  const isScrollSyncing = useRef(false);
  const isHorizontalScrollSyncing = useRef(false);
  
  // State to track if scrolled horizontally (for shadow effects)
  const [isScrolledLeft, setIsScrolledLeft] = useState(false);
  const [isScrolledRight, setIsScrolledRight] = useState(false);
  
  // State to track scrollbar width for header alignment
  const [scrollbarWidth, setScrollbarWidth] = useState(0);
  
  // State to track if horizontal scroll is needed
  const [hasHorizontalOverflow, setHasHorizontalOverflow] = useState(false);
  
  // Internal data state (for ref methods)
  const [internalData, setInternalData] = useState<T[]>(data);
  
  // NOTE: We do NOT sync data prop changes after mount.
  // The data prop is only used for initial state.
  // If you need to update data externally, use the ref methods or a key prop.
  // This prevents infinite loops when data array is recreated on every parent render.
  
  // Validate that data has 'id' field
  const dataError = useMemo(() => {
    if (internalData.length === 0) return null;
    // Check ALL rows for missing id field
    const rowsWithoutId = internalData
      .map((row, index) => ({ row, index }))
      .filter(({ row }) => !('id' in row) && !('Id' in row));
    
    if (rowsWithoutId.length > 0) {
      const rowIndices = rowsWithoutId.map(r => r.index + 1).join(', ');
      return `Data Error: Row(s) ${rowIndices} missing "id" field. Each row must have a unique "id" property.`;
    }
    return null;
  }, [internalData]);
  
  // Internal disabled/hidden state (for ref methods)
  const [isDisabled, setIsDisabled] = useState(disabled);
  const [isHidden, setIsHidden] = useState(hidden);
  
  useEffect(() => {
    setIsDisabled(disabled);
  }, [disabled]);
  
  useEffect(() => {
    setIsHidden(hidden);
  }, [hidden]);
  
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [selectedCells, setSelectedCells] = useState<Set<string>>(new Set());
  const [selectedColumns, setSelectedColumns] = useState<Set<string>>(new Set());
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [filters, setFilters] = useState<Record<string, string | string[]>>({});
  const [refreshKey, setRefreshKey] = useState(0);
  const [hiddenColumns, setHiddenColumns] = useState<Set<string>>(new Set());
  
  // Column order state for drag-and-drop reordering
  const [columnOrder, setColumnOrder] = useState<string[]>(() => columns.map(c => c.id));
  const [draggedColumnId, setDraggedColumnId] = useState<string | null>(null);
  const [dragOverColumnId, setDragOverColumnId] = useState<string | null>(null);
  
  // Sync column order when columns prop changes
  useEffect(() => {
    const currentIds = new Set(columnOrder);
    const newIds = columns.map(c => c.id);
    const newIdsSet = new Set(newIds);
    
    // Check if columns have changed
    if (newIds.length !== columnOrder.length || !newIds.every(id => currentIds.has(id))) {
      setColumnOrder(newIds);
    }
  }, [columns]);
  
  // Lifecycle events
  useEffect(() => {
    onBeforeRender?.();
  }, []);
  
  useEffect(() => {
    onAfterRender?.();
  });
  
  useEffect(() => {
    if (!isHidden) {
      onViewShow?.();
    }
  }, [isHidden]);
  
  // Clear all selections when selection mode changes
  useEffect(() => {
    setSelectedRows(new Set());
    setSelectedCells(new Set());
    setSelectedColumns(new Set());
  }, [select]);
  
  // Expose imperative methods via ref
  useImperativeHandle(ref, () => ({
    // Methods from AvakioBaseRef
    blur: () => {
      rootRef.current?.blur();
    },
    focus: () => {
      rootRef.current?.focus();
    },
    define: (config: Partial<AvakioBaseProps> | string, value?: unknown) => {
      // This is a simplified implementation - full implementation would handle individual props
      console.log('define called with:', config, value);
    },
    disable: () => {
      setIsDisabled(true);
    },
    enable: () => {
      setIsDisabled(false);
    },
    hide: () => {
      setIsHidden(true);
    },
    show: () => {
      setIsHidden(false);
      onViewShow?.();
    },
    isEnabled: () => !isDisabled,
    isVisible: () => !isHidden,
    getParentView: () => rootRef.current?.parentElement || null,
    getElement: () => rootRef.current,
    
    // DataTable-specific methods
    getData: () => internalData,
    setData: (newData: T[]) => {
      setInternalData(newData);
    },
    getSelectedRows: () => {
      return Array.from(selectedRows)
        .map(index => internalData[index])
        .filter(Boolean)
        .map(row => row.id ?? row.Id);
    },
    selectRows: (indices: number[]) => {
      setSelectedRows(new Set(indices));
    },
    clearSelection: () => {
      setSelectedRows(new Set());
    },
    scrollToRow: (index: number) => {
      // Helper function to scroll row into view
      const scrollRowIntoView = (rowIdx: number) => {
        const rowElement = rootRef.current?.querySelector(`[data-row-index="${rowIdx}"]`) as HTMLElement;
        if (rowElement) {
          // Find the scrollable container (avakio-datatable-scroll-container has overflow: auto)
          const scrollContainer = rootRef.current?.querySelector('.avakio-datatable-scroll-container') as HTMLElement;
          if (scrollContainer) {
            // Get row position relative to scroll container
            const containerRect = scrollContainer.getBoundingClientRect();
            const rowRect = rowElement.getBoundingClientRect();
            const currentScrollTop = scrollContainer.scrollTop;
            
            // Calculate the row's position relative to the scroll container
            const rowTopRelative = rowRect.top - containerRect.top + currentScrollTop;
            const containerHeight = scrollContainer.clientHeight;
            const rowHeight = rowElement.offsetHeight;
            
            // Calculate scroll position to center the row
            const scrollTarget = rowTopRelative - (containerHeight / 2) + (rowHeight / 2);
            scrollContainer.scrollTo({ top: Math.max(0, scrollTarget), behavior: 'smooth' });
          }
        }
      };

      // If paging is enabled, navigate to the correct page first
      if (paging && localPageSize > 0) {
        const targetPage = Math.floor(index / localPageSize) + 1;
        if (targetPage !== page) {
          setPage(targetPage);
          onPageChange?.(targetPage);
        }
        // Calculate the index within the page
        const indexInPage = index % localPageSize;
        // Select the row
        setSelectedRows(new Set([indexInPage]));
        // Use setTimeout to wait for re-render after page change
        setTimeout(() => scrollRowIntoView(indexInPage), 100);
      } else {
        // Select the row
        setSelectedRows(new Set([index]));
        // Use setTimeout to ensure DOM is updated
        setTimeout(() => scrollRowIntoView(index), 50);
      }
    },
    getSortState: () => ({
      column: sortColumn,
      direction: sortDirection,
    }),
    setSortState: (column: string | null, direction: 'asc' | 'desc') => {
      setSortColumn(column);
      setSortDirection(direction);
    },
    getFilterValues: () => filters,
    setFilterValues: (newFilters: Record<string, string | string[]>) => {
      setFilters(newFilters);
    },
    clearFilters: () => {
      setFilters({});
    },
    refresh: () => {
      setRefreshKey(prev => prev + 1);
    },
    hideColumn: (columnId: string) => {
      setHiddenColumns(prev => new Set([...prev, columnId]));
    },
    showColumn: (columnId: string) => {
      setHiddenColumns(prev => {
        const next = new Set(prev);
        next.delete(columnId);
        return next;
      });
    },
    getSelectedColumns: () => {
      return Array.from(selectedColumns);
    },
  }), [internalData, selectedRows, selectedColumns, columns, sortColumn, sortDirection, filters, isDisabled, isHidden]);

  // Process spans to create a map of cells to skip
  const spanMap = useMemo(() => {
    const map = new Map<string, { skip: boolean; colspan?: number; rowspan?: number; value?: any; cssClass?: string }>();
    
    if (!spans || spans.length === 0) return map;
    
    spans.forEach(([rowId, columnId, colspan, rowspan, value, cssClass]) => {
      const rowKey = String(rowId);
      const cellKey = `${rowKey}-${columnId}`;
      
      // Mark the origin cell with span properties
      map.set(cellKey, { skip: false, colspan, rowspan, value, cssClass });
      
      // Mark cells to skip due to colspan
      const colIndex = columns.findIndex(col => col.id === columnId);
      if (colIndex !== -1) {
        for (let c = 1; c < colspan; c++) {
          const nextCol = columns[colIndex + c];
          if (nextCol) {
            map.set(`${rowKey}-${nextCol.id}`, { skip: true });
          }
        }
      }
      
      // Mark cells to skip due to rowspan
      // Use row IDs directly from the span configuration to find consecutive rows
      const allRowIds = internalData.map((row: any) => String(row.id || row.Id));
      const rowIndex = allRowIds.indexOf(rowKey);
      
      if (rowIndex !== -1) {
        for (let r = 1; r < rowspan; r++) {
          const nextRowIndex = rowIndex + r;
          if (nextRowIndex < allRowIds.length) {
            const nextRowKey = allRowIds[nextRowIndex];
            map.set(`${nextRowKey}-${columnId}`, { skip: true });
            
            // Also skip cells affected by both rowspan and colspan
            for (let c = 1; c < colspan; c++) {
              const nextCol = columns[colIndex + c];
              if (nextCol) {
                map.set(`${nextRowKey}-${nextCol.id}`, { skip: true });
              }
            }
          }
        }
      }
    });
    
    return map;
  }, [spans, columns, internalData]);
  const [columnWidths, setColumnWidths] = useState<Record<string, number>>({});

  // Calculate adjusted widths for columns with adjust property
  const adjustedWidths = useMemo(() => {
    const widths: Record<string, number> = {};
    const padding = 32; // 16px padding on each side
    const sortIconWidth = 20; // Space for sort icon
    
    // Helper function to measure text width
    const measureTextWidth = (text: string, fontSize: number = 14, fontWeight: number = 400): number => {
      if (typeof document === 'undefined') return 0;
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      if (!context) return 0;
      context.font = `${fontWeight} ${fontSize}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
      return context.measureText(String(text ?? '')).width;
    };
    
    columns.forEach(column => {
      if (!column.adjust) return;
      
      let maxWidth = 0;
      
      // Measure header width
      if (column.adjust === 'header' || column.adjust === true) {
        const headerWidth = measureTextWidth(column.header, 14, 500) + padding + sortIconWidth;
        maxWidth = Math.max(maxWidth, headerWidth);
      }
      
      // Measure data width
      if (column.adjust === 'data' || column.adjust === true) {
        internalData.forEach(row => {
          const value = row[column.id];
          const displayValue = column.format ? column.format(value) : String(value ?? '');
          const cellWidth = measureTextWidth(displayValue, 14, 400) + padding;
          maxWidth = Math.max(maxWidth, cellWidth);
        });
      }
      
      // Apply min/max constraints
      if (column.minWidth) {
        maxWidth = Math.max(maxWidth, column.minWidth);
      }
      if (column.maxWidth) {
        maxWidth = Math.min(maxWidth, column.maxWidth);
      }
      
      // Ensure minimum reasonable width
      widths[column.id] = Math.max(maxWidth, 60);
    });
    
    return widths;
  }, [columns, internalData]);

  const [page, setPage] = useState(currentPage);
  const [localPageSize, setLocalPageSize] = useState(pageSize);
  const [resizingColumn, setResizingColumn] = useState<string | null>(null);
  const [resizeStartX, setResizeStartX] = useState(0);
  const [resizeStartWidth, setResizeStartWidth] = useState(0);

  useEffect(() => {
    setPage(currentPage);
  }, [currentPage]);

  useEffect(() => {
    setLocalPageSize(pageSize);
    // Reset to page 1 when page size changes to avoid showing empty results
    setPage(1);
  }, [pageSize]);

  // Filter data (skip if server-side)
  const filteredData = useMemo(() => {
    if (serverSide) return internalData;
    
    let result = [...internalData];

    // Apply filters
    Object.entries(filters).forEach(([columnId, filterValue]) => {
      // Skip empty filters
      if (!filterValue) return;
      
      // Handle multicombo filters (array values)
      if (Array.isArray(filterValue) && filterValue.length === 0) return;
      
      const column = columns.find(col => col.id === columnId);
      
      result = result.filter((row) => {
        const value = row[columnId];
        
        // Handle multicombo filtering (array of selected values)
        if (column?.filterType === 'multicombo' && Array.isArray(filterValue) && filterValue.length > 0) {
          const stringValue = String(value || '').toLowerCase();
          return filterValue.some(fv => stringValue.includes(fv.toLowerCase()));
        }
        
        // Handle combo filtering (single selected value) - exact match
        if (column?.filterType === 'combo' && filterValue) {
          const stringValue = String(value || '').toLowerCase();
          const filterStringValue = String(filterValue).toLowerCase();
          return stringValue === filterStringValue;
        }
        
        // Handle date filtering
        if (column?.filterType === 'date' && value) {
          const rowDate = String(value).split('T')[0]; // Get YYYY-MM-DD part
          const filterDate = String(filterValue).split('T')[0];
          return rowDate === filterDate;
        }
        
        // Handle text filtering (default)
        if (typeof filterValue === 'string' && filterValue.trim()) {
          const stringValue = String(value || '').toLowerCase();
          return stringValue.includes(filterValue.toLowerCase());
        }
        
        return true;
      });
    });

    return result;
  }, [data, filters, columns, serverSide]);

  // Sort data (skip if server-side)
  const sortedData = useMemo(() => {
    if (serverSide) return filteredData;
    if (!sortColumn) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aVal = a[sortColumn];
      const bVal = b[sortColumn];

      if (aVal === null || aVal === undefined) return 1;
      if (bVal === null || bVal === undefined) return -1;

      let comparison = 0;
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        comparison = aVal - bVal;
      } else {
        comparison = String(aVal).localeCompare(String(bVal));
      }

      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }, [filteredData, sortColumn, sortDirection, serverSide]);

  // Paginate data (skip if server-side)
  const paginatedData = useMemo(() => {
    if (serverSide) return data; // In server-side mode, data is already paginated
    if (!paging) return sortedData;
    const startIndex = (page - 1) * localPageSize;
    return sortedData.slice(startIndex, startIndex + localPageSize);
  }, [sortedData, paging, page, localPageSize, serverSide, data]);

  const totalPages = Math.ceil((totalCount || sortedData.length) / localPageSize);

  // Handle sort
  const handleSort = useCallback((columnId: string) => {
    if (!sortable) return;

    const newDirection = sortColumn === columnId && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortColumn(columnId);
    setSortDirection(newDirection);

    if (onSort) {
      onSort(columnId, newDirection);
    }
  }, [sortable, sortColumn, sortDirection, onSort]);

  // Handle filter - accepts string or string[] for multicombo support
  const handleFilter = useCallback((columnId: string, value: string | string[]) => {
    const newFilters = { ...filters, [columnId]: value };
    setFilters(newFilters);
    setPage(1); // Reset to first page on filter

    if (onFilter) {
      onFilter(newFilters);
    }
  }, [filters, onFilter]);

  // Handle cell click for cell selection mode
  const handleCellClick = useCallback((row: T, rowIndex: number, columnId: string, event: React.MouseEvent) => {
    if (select === 'cell') {
      const cellKey = `${rowIndex}-${columnId}`;
      if (multiselect && (event.ctrlKey || event.metaKey)) {
        // Multi-select: toggle cell selection
        setSelectedCells((prev) => {
          const newSet = new Set(prev);
          if (newSet.has(cellKey)) {
            newSet.delete(cellKey);
          } else {
            newSet.add(cellKey);
          }
          return newSet;
        });
      } else {
        // Single select: replace selection
        setSelectedCells(new Set([cellKey]));
      }
      // Clear row and column selection when in cell mode
      setSelectedRows(new Set());
      setSelectedColumns(new Set());
    }
  }, [select, multiselect]);

  // Handle column click for column selection mode
  const handleColumnClick = useCallback((columnId: string, event: React.MouseEvent) => {
    if (select === 'column') {
      if (multiselect && (event.ctrlKey || event.metaKey)) {
        // Multi-select: toggle column selection
        setSelectedColumns((prev) => {
          const newSet = new Set(prev);
          if (newSet.has(columnId)) {
            newSet.delete(columnId);
          } else {
            newSet.add(columnId);
          }
          return newSet;
        });
      } else {
        // Single select: replace selection
        setSelectedColumns(new Set([columnId]));
      }
      // Clear row and cell selection when in column mode
      setSelectedRows(new Set());
      setSelectedCells(new Set());
    }
  }, [select, multiselect]);

  // Handle row selection
  const handleRowClick = useCallback((row: T, index: number, event: React.MouseEvent) => {
    // Only handle row selection if not in cell or column selection mode
    if (select && select !== 'cell' && select !== 'column') {
      if (multiselect && (event.ctrlKey || event.metaKey)) {
        setSelectedRows((prev) => {
          const newSet = new Set(prev);
          if (newSet.has(index)) {
            newSet.delete(index);
          } else {
            newSet.add(index);
          }
          return newSet;
        });
      } else {
        setSelectedRows(new Set([index]));
        // Clear cell and column selection when switching to row mode
        setSelectedCells(new Set());
        setSelectedColumns(new Set());
      }
    }

    if (onRowClick) {
      onRowClick(row, index);
    }
  }, [select, multiselect, onRowClick]);

  // Handle row double click
  const handleRowDoubleClick = useCallback((row: T, index: number) => {
    if (onRowDoubleClick) {
      onRowDoubleClick(row, index);
    }
  }, [onRowDoubleClick]);

  // Handle column resize
  const handleResizeStart = useCallback((columnId: string, event: React.MouseEvent) => {
    if (!resizable) return;
    event.preventDefault();
    event.stopPropagation();

    const column = columns.find(c => c.id === columnId);
    const currentWidth = columnWidths[columnId] || (typeof column?.width === 'number' ? column.width : 150);

    setResizingColumn(columnId);
    setResizeStartX(event.clientX);
    setResizeStartWidth(currentWidth);
  }, [resizable, columns, columnWidths]);

  useEffect(() => {
    if (!resizingColumn) return;

    const handleMouseMove = (event: MouseEvent) => {
      const diff = event.clientX - resizeStartX;
      // Check if column has filter to determine minimum width
      const column = columns.find(c => c.id === resizingColumn);
      const hasFilter = filterable && column?.filterable !== false;
      const minWidth = hasFilter ? 90 : 50;
      const newWidth = Math.max(minWidth, resizeStartWidth + diff);
      setColumnWidths(prev => ({ ...prev, [resizingColumn]: newWidth }));
    };

    const handleMouseUp = () => {
      setResizingColumn(null);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [resizingColumn, resizeStartX, resizeStartWidth, columns, filterable]);

  // Drag-and-drop column reordering handlers
  const handleDragStart = useCallback((columnId: string, event: React.DragEvent) => {
    if (!allowDragDrop) return;
    setDraggedColumnId(columnId);
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/plain', columnId);
    // Add a slight delay to allow the drag image to be created
    setTimeout(() => {
      const element = event.target as HTMLElement;
      element.classList.add('dragging');
    }, 0);
  }, [allowDragDrop]);

  const handleDragEnd = useCallback((event: React.DragEvent) => {
    setDraggedColumnId(null);
    setDragOverColumnId(null);
    const element = event.target as HTMLElement;
    element.classList.remove('dragging');
  }, []);

  const handleDragOver = useCallback((columnId: string, event: React.DragEvent) => {
    if (!allowDragDrop || !draggedColumnId || draggedColumnId === columnId) return;
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
    setDragOverColumnId(columnId);
  }, [allowDragDrop, draggedColumnId]);

  const handleDragLeave = useCallback((event: React.DragEvent) => {
    // Only clear if we're leaving the header cell entirely
    const relatedTarget = event.relatedTarget as HTMLElement;
    const currentTarget = event.currentTarget as HTMLElement;
    if (!currentTarget.contains(relatedTarget)) {
      setDragOverColumnId(null);
    }
  }, []);

  const handleDrop = useCallback((targetColumnId: string, event: React.DragEvent) => {
    event.preventDefault();
    if (!allowDragDrop || !draggedColumnId || draggedColumnId === targetColumnId) return;

    const newOrder = [...columnOrder];
    const draggedIndex = newOrder.indexOf(draggedColumnId);
    const targetIndex = newOrder.indexOf(targetColumnId);

    if (draggedIndex !== -1 && targetIndex !== -1) {
      // Remove dragged column and insert at target position
      newOrder.splice(draggedIndex, 1);
      newOrder.splice(targetIndex, 0, draggedColumnId);
      
      setColumnOrder(newOrder);
      onColumnReorder?.(newOrder);
    }

    setDraggedColumnId(null);
    setDragOverColumnId(null);
  }, [allowDragDrop, draggedColumnId, columnOrder, onColumnReorder]);

  // Notify selection changes - only when selectedRows actually changes
  const prevSelectedRowsRef = useRef<Set<number>>(new Set());
  useEffect(() => {
    if (!onSelectChange) return;
    
    // Check if selection actually changed
    const prevSet = prevSelectedRowsRef.current;
    const currentSet = selectedRows;
    
    const sameSize = prevSet.size === currentSet.size;
    const sameContent = sameSize && Array.from(prevSet).every(v => currentSet.has(v));
    
    if (sameContent) return;
    
    prevSelectedRowsRef.current = new Set(selectedRows);
    const selected = Array.from(selectedRows).map(index => paginatedData[index]).filter(Boolean);
    onSelectChange(selected);
  }, [selectedRows]);

  // Order columns according to columnOrder, then filter hidden ones
  const orderedColumns = useMemo(() => {
    const columnMap = new Map(columns.map(col => [col.id, col]));
    return columnOrder
      .map(id => columnMap.get(id))
      .filter((col): col is AvakioColumn<T> => col !== undefined);
  }, [columns, columnOrder]);
  
  // Memoize visible columns to prevent unnecessary recalculations
  const visibleColumns = useMemo(() => 
    orderedColumns.filter(col => !col.hidden && !hiddenColumns.has(col.id)),
    [orderedColumns, hiddenColumns]
  );

  // Split columns into frozen left, scrollable, and frozen right
  const { frozenLeftColumns, scrollableColumns, frozenRightColumns } = useMemo(() => {
    const left: AvakioColumn<T>[] = [];
    const middle: AvakioColumn<T>[] = [];
    const right: AvakioColumn<T>[] = [];
    
    visibleColumns.forEach(col => {
      if (col.frozen === 'left') {
        left.push(col);
      } else if (col.frozen === 'right') {
        right.push(col);
      } else {
        middle.push(col);
      }
    });
    
    return { frozenLeftColumns: left, scrollableColumns: middle, frozenRightColumns: right };
  }, [visibleColumns]);

  // Check if we have any frozen columns
  const hasFrozenColumns = frozenLeftColumns.length > 0 || frozenRightColumns.length > 0;
  
  // Calculate scrollbar width for header alignment with body (when frozen columns are used)
  // Use primitive values in deps to avoid recalculating on every render
  const dataLength = paginatedData.length;
  const scrollableColumnsCount = scrollableColumns.length;
  
  useEffect(() => {
    if (hasFrozenColumns && scrollableBodyRef.current) {
      const body = scrollableBodyRef.current;
      // Scrollbar width = total width - content width
      const scrollbarW = body.offsetWidth - body.clientWidth;
      setScrollbarWidth(scrollbarW);
      
      // Check if horizontal scroll is needed
      const needsHorizontalScroll = body.scrollWidth > body.clientWidth;
      setHasHorizontalOverflow(needsHorizontalScroll);
      
      // Sync horizontal scrollbar content width with body scroll width
      if (horizontalScrollbarRef.current) {
        const scrollbarContent = horizontalScrollbarRef.current.querySelector('.avakio-datatable-horizontal-scrollbar-content') as HTMLElement;
        if (scrollbarContent) {
          scrollbarContent.style.width = `${body.scrollWidth}px`;
        }
      }
    } else {
      setScrollbarWidth(0);
      setHasHorizontalOverflow(false);
    }
  }, [hasFrozenColumns, dataLength, loading, scrollableColumnsCount]);

  // Vertical scroll synchronization handler for frozen columns
  const handleVerticalScroll = useCallback((source: 'left' | 'middle' | 'right') => {
    if (isScrollSyncing.current) return;
    isScrollSyncing.current = true;
    
    let scrollTop = 0;
    if (source === 'left' && leftFrozenBodyRef.current) {
      scrollTop = leftFrozenBodyRef.current.scrollTop;
    } else if (source === 'middle' && scrollableBodyRef.current) {
      scrollTop = scrollableBodyRef.current.scrollTop;
    } else if (source === 'right' && rightFrozenBodyRef.current) {
      scrollTop = rightFrozenBodyRef.current.scrollTop;
    }
    
    // Sync all panels to the same scroll position
    if (leftFrozenBodyRef.current && source !== 'left') {
      leftFrozenBodyRef.current.scrollTop = scrollTop;
    }
    if (scrollableBodyRef.current && source !== 'middle') {
      scrollableBodyRef.current.scrollTop = scrollTop;
    }
    if (rightFrozenBodyRef.current && source !== 'right') {
      rightFrozenBodyRef.current.scrollTop = scrollTop;
    }
    
    // Reset sync flag after a short delay
    requestAnimationFrame(() => {
      isScrollSyncing.current = false;
    });
  }, []);

  // Horizontal scroll synchronization for scrollable header, body, and scrollbar
  const handleHorizontalScroll = useCallback((source: 'header' | 'body' | 'scrollbar') => {
    if (isHorizontalScrollSyncing.current) return;
    isHorizontalScrollSyncing.current = true;
    
    let scrollLeft = 0;
    let scrollWidth = 0;
    let clientWidth = 0;
    
    if (source === 'header' && scrollableHeaderRef.current) {
      scrollLeft = scrollableHeaderRef.current.scrollLeft;
      scrollWidth = scrollableHeaderRef.current.scrollWidth;
      clientWidth = scrollableHeaderRef.current.clientWidth;
    } else if (source === 'body' && scrollableBodyRef.current) {
      scrollLeft = scrollableBodyRef.current.scrollLeft;
      scrollWidth = scrollableBodyRef.current.scrollWidth;
      clientWidth = scrollableBodyRef.current.clientWidth;
    } else if (source === 'scrollbar' && horizontalScrollbarRef.current) {
      scrollLeft = horizontalScrollbarRef.current.scrollLeft;
      scrollWidth = horizontalScrollbarRef.current.scrollWidth;
      clientWidth = horizontalScrollbarRef.current.clientWidth;
    }
    
    // Update shadow states based on scroll position
    setIsScrolledLeft(scrollLeft > 0);
    setIsScrolledRight(scrollLeft < scrollWidth - clientWidth - 1);
    
    // Sync all horizontal scroll elements
    if (scrollableHeaderRef.current && source !== 'header') {
      scrollableHeaderRef.current.scrollLeft = scrollLeft;
    }
    if (scrollableBodyRef.current && source !== 'body') {
      scrollableBodyRef.current.scrollLeft = scrollLeft;
    }
    if (horizontalScrollbarRef.current && source !== 'scrollbar') {
      horizontalScrollbarRef.current.scrollLeft = scrollLeft;
    }
    
    requestAnimationFrame(() => {
      isHorizontalScrollSyncing.current = false;
    });
  }, []);

  // Get column width
  const getColumnWidth = (column: AvakioColumn<T>) => {
    // First check for manual resize
    const customWidth = columnWidths[column.id];
    if (customWidth) return `${customWidth}px`;
    // Then check for auto-adjusted width
    const adjustedWidth = adjustedWidths[column.id];
    if (adjustedWidth) return `${adjustedWidth}px`;
    // Then check for explicit width
    if (column.width) return typeof column.width === 'number' ? `${column.width}px` : column.width;
    return '150px'; // Default width instead of 'auto'
  };

  // Find the first column with fillspace
  const fillspaceColumnId = useMemo(() => {
    const col = visibleColumns.find(c => c.fillspace);
    return col?.id;
  }, [visibleColumns]);

  // Minimum allowed column width
  const MIN_COLUMN_WIDTH = 60;

  // Get effective minWidth (enforce minimum of 60px)
  const getEffectiveMinWidth = (column: AvakioColumn<T>): number | undefined => {
    if (column.minWidth === undefined) return undefined;
    return Math.max(column.minWidth, MIN_COLUMN_WIDTH);
  };

  // Get column style with flex
  const getColumnStyle = (column: AvakioColumn<T>): React.CSSProperties => {
    const effectiveMinWidth = getEffectiveMinWidth(column);
    
    // If this column has fillspace and is the first one with it
    if (column.fillspace && column.id === fillspaceColumnId) {
      return {
        flex: '1 1 auto',
        minWidth: effectiveMinWidth ? `${effectiveMinWidth}px` : '100px',
        maxWidth: column.maxWidth ? `${column.maxWidth}px` : undefined,
      };
    }
    
    const width = getColumnWidth(column);
    // If minWidth is set, allow column to shrink (flex-shrink: 1)
    // Otherwise, keep fixed width (flex-shrink: 0)
    const flexShrink = effectiveMinWidth ? 1 : 0;
    return {
      flex: `0 ${flexShrink} ${width}`,
      width: width,
      minWidth: effectiveMinWidth ? `${effectiveMinWidth}px` : undefined,
      maxWidth: column.maxWidth ? `${column.maxWidth}px` : undefined,
    };
  };

  // Calculate combined width for colspan cells
  const getColspanWidth = (startColIndex: number, colspan: number): string => {
    let totalWidth = 0;
    let hasFillspace = false;
    
    for (let i = 0; i < colspan && startColIndex + i < visibleColumns.length; i++) {
      const col = visibleColumns[startColIndex + i];
      if (col.fillspace) {
        hasFillspace = true;
      }
      const width = columnWidths[col.id] || (typeof col.width === 'number' ? col.width : 150);
      totalWidth += width;
    }
    
    // If any column has fillspace, the span should expand
    if (hasFillspace) {
      return 'auto';
    }
    
    return `${totalWidth}px`;
  };

  // Calculate left offset for a column (used for absolute positioning of rowspan cells)
  const getColumnLeftOffset = (colIndex: number): number => {
    let offset = 0;
    for (let i = 0; i < colIndex; i++) {
      const col = visibleColumns[i];
      const width = columnWidths[col.id] || (typeof col.width === 'number' ? col.width : 150);
      offset += width;
    }
    return offset;
  };

  // Calculate combined height for rowspan cells
  const getRowspanHeight = (rowspan: number): string => {
    return `${rowspan * rowHeight}px`;
  };

  // Calculate total minimum width of all columns for horizontal scroll threshold
  const totalMinWidth = useMemo(() => {
    let total = 0;
    // Add width for row number column if shown
    if (showRowNum) {
      total += 48;
    }
    // Add width for bulk selection column if enabled
    if (bulkSelection) {
      total += 48;
    }
    // Add width for each visible column
    return visibleColumns.reduce((acc, column) => {
      const effectiveMinWidth = getEffectiveMinWidth(column);
      if (effectiveMinWidth) {
        return acc + effectiveMinWidth;
      }
      // Use the column width or default
      const width = columnWidths[column.id] || (typeof column.width === 'number' ? column.width : 150);
      return acc + width;
    }, total);
  }, [visibleColumns, columnWidths, showRowNum, bulkSelection]);

  // Render cell content
  const renderCell = (column: AvakioColumn<T>, row: T, rowIndex: number) => {
    if (column.template) {
      return column.template(row);
    }
    
    const value = row[column.id];
    const columnType = column.type || 'text';
    
    // If editable, render appropriate editor based on column type
    if (editable) {
      const handleChange = (newValue: any) => {
        if (onCellChange) {
          onCellChange(rowIndex, column.id, newValue, value);
        }
      };
      
      switch (columnType) {
        case 'boolean':
          return (
            <AvakioCheckbox
              checked={Boolean(value)}
              onChange={(checked) => handleChange(checked)}
              size="sm"
            />
          );
        case 'date':
          return (
            <AvakioDatePicker
              value={value ? String(value) : ''}
              onChange={({ value: newValue }) => handleChange(newValue)}
              size="compact"
              borderless
            />
          );
        case 'number':
          return (
            <AvakioText
              value={value !== null && value !== undefined ? String(value) : ''}
              onChange={(newValue) => handleChange(newValue ? Number(newValue) : null)}
              type="number"
              borderless
            />
          );
        case 'json':
        case 'text':
        default:
          return (
            <AvakioText
              value={value !== null && value !== undefined ? String(value) : ''}
              onChange={(newValue) => handleChange(newValue)}
              borderless
            />
          );
      }
    }
    
    if (column.format) {
      return column.format(value);
    }
    
    return value !== null && value !== undefined ? String(value) : '';
  };

  // Helper function to render header cells for a set of columns
  const renderHeaderCells = (columnsToRender: AvakioColumn<T>[]) => {
    return columnsToRender.map((column) => {
      const isColumnSelected = select === 'column' && selectedColumns.has(column.id);
      const isDragging = draggedColumnId === column.id;
      const isDragOver = dragOverColumnId === column.id;
      const isColumnDraggable = allowDragDrop && column.allowDragDrop !== false;
      return (
        <div
          key={column.id}
          className={`avakio-datatable-header-cell ${filterable ? 'with-filter' : ''} ${column.headerCssClass || ''} ${isColumnSelected ? 'column-selected' : ''} ${isDragging ? 'dragging' : ''} ${isDragOver ? 'drag-over' : ''}`}
          style={{
            ...getColumnStyle(column),
            cursor: isColumnDraggable ? 'grab' : (select === 'column' ? 'pointer' : undefined),
          }}
          draggable={isColumnDraggable}
          onDragStart={(e) => handleDragStart(column.id, e)}
          onDragEnd={handleDragEnd}
          onDragOver={(e) => handleDragOver(column.id, e)}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(column.id, e)}
          onClick={(e) => {
            if (select === 'column') {
              handleColumnClick(column.id, e);
            }
          }}
        >
          <div
            className="avakio-datatable-header-content"
            style={{ pointerEvents: select === 'column' ? 'none' : undefined }}
            onClick={(e) => {
              if (sortable && column.sort !== false && select !== 'column') {
                e.stopPropagation();
                handleSort(column.id);
              }
            }}
          >
            <span 
              className={`avakio-datatable-header-text ${column.headerWrap ? 'avakio-datatable-header-text-wrap' : ''}`}
              style={column.cssHeader}
            >
              {column.header}
            </span>
            {sortable && column.sort !== false && (
              <span className="avakio-datatable-sort-icon">
                {sortColumn === column.id ? (
                  sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                ) : (
                  <ChevronsUpDown size={16} className="sort-inactive" />
                )}
              </span>
            )}
          </div>
          {filterable && column.filterable !== false && (
            <div
              className="avakio-datatable-header-filter"
              style={{ pointerEvents: select === 'column' ? 'none' : undefined }}
            >
              {column.filterComponent ? (
                column.filterComponent(filters[column.id], (value) => handleFilter(column.id, value))
              ) : column.filterType === 'combo' ? (
                <AvakioRichSelect
                  value={filters[column.id] || ''}
                  onChange={({ value }) => handleFilter(column.id, value)}
                  options={[
                    { id: '', value: 'All' },
                    ...Array.from(new Set(internalData.map(row => String(row[column.id] || '')).filter(v => v)))
                      .sort()
                      .map(v => ({ id: v, value: v }))
                  ]}
                  width="100%"
                  clearable={true}
                  size="compact"
                />
              ) : column.filterType === 'multicombo' ? (
                <AvakioMultiCombo
                  value={Array.isArray(filters[column.id]) ? filters[column.id] : []}
                  onChange={({ value }) => handleFilter(column.id, value)}
                  options={Array.from(new Set(internalData.map(row => String(row[column.id] || '')).filter(v => v)))
                    .sort()
                    .map(v => ({ value: v, label: v }))
                  }
                  placeholder="All"
                  showCount={true}
                  maxDisplayItems={1}
                  size="compact"
                />
              ) : column.filterType === 'date' ? (
                <AvakioDatePicker
                  value={filters[column.id] || ''}
                  onChange={({ value }) => handleFilter(column.id, value)}
                  clearable={true}
                  size="compact"
                  className="avakio-datatable-filter-input"
                  height={24}
                  width="100%"
                />
              ) : column.filterType === 'number' ? (
                <AvakioText
                  type="number"
                  value={filters[column.id] || ''}
                  onChange={({ value }) => handleFilter(column.id, value)}
                  clear={true}
                  className="avakio-datatable-filter-input"
                  height={24}
                  width="100%"
                />
              ) : (column.filterType === 'text' || !column.filterType) ? (
                <AvakioText
                  type="text"
                  value={filters[column.id] || ''}
                  onChange={({ value }) => handleFilter(column.id, value)}
                  clear={true}
                  className="avakio-datatable-filter-input"
                  height={24}
                  width="100%"
                />
              ) : (
                <AvakioText
                  type="text"
                  value={filters[column.id] || ''}
                  onChange={({ value }) => handleFilter(column.id, value)}
                  clear={true}
                  className="avakio-datatable-filter-input"
                  height={24}
                  width="100%"
                />
              )}
            </div>
          )}
          {filterable && column.filterable === false && (
            <div className="avakio-datatable-header-filter avakio-datatable-header-filter-empty" />
          )}
          {resizable && column.resizable !== false && (
            <div
              className="avakio-datatable-resize-handle"
              onMouseDown={(e) => handleResizeStart(column.id, e)}
            />
          )}
        </div>
      );
    });
  };

  // Helper function to render body cells for a row with a set of columns
  const renderBodyCells = (row: T, rowIndex: number, columnsToRender: AvakioColumn<T>[]) => {
    const rowId = String(row.id || row.Id);
    return columnsToRender.map((column, colIndex) => {
      const cellKey = `${rowId}-${column.id}`;
      const spanInfo = spanMap.get(cellKey);
      
      // For cells covered by rowspan, render a transparent spacer to maintain column layout
      if (spanInfo && spanInfo.skip) {
        return (
          <div
            key={column.id}
            className="avakio-datatable-cell avakio-datatable-cell-spacer"
            style={{
              ...getColumnStyle(column),
              background: 'transparent',
              borderColor: 'transparent',
            }}
            aria-hidden="true"
          />
        );
      }
      
      const selectionKey = `${rowIndex}-${column.id}`;
      const isCellSelected = select === 'cell' && selectedCells.has(selectionKey);
      const isColumnSelected = select === 'column' && selectedColumns.has(column.id);
      
      const cellClasses = [
        'avakio-datatable-cell',
        column.cssClass || '',
        spanInfo?.cssClass || '',
        spanInfo?.colspan && spanInfo.colspan > 1 ? 'avakio-datatable-cell-colspan' : '',
        spanInfo?.rowspan && spanInfo.rowspan > 1 ? 'avakio-datatable-cell-rowspan' : '',
        isCellSelected ? 'selected' : '',
        isColumnSelected ? 'column-selected' : ''
      ].filter(Boolean).join(' ');
      
      // Calculate styles for spanned cells
      const cellStyle: React.CSSProperties = {
        ...getColumnStyle(column),
        textAlign: column.align || 'left',
        ...column.css,
      };
      
      // Get the actual column index in visibleColumns for colspan calculation
      const actualColIndex = visibleColumns.findIndex(c => c.id === column.id);
      
      // Override width for colspan cells
      if (spanInfo?.colspan && spanInfo.colspan > 1) {
        const colspanWidth = getColspanWidth(actualColIndex, spanInfo.colspan);
        if (colspanWidth !== 'auto') {
          cellStyle.flex = `0 0 ${colspanWidth}`;
          cellStyle.width = colspanWidth;
        } else {
          cellStyle.flex = `${spanInfo.colspan} 1 auto`;
        }
      }
      
      // Set height for rowspan cells (keep in normal flow, just extend height)
      if (spanInfo?.rowspan && spanInfo.rowspan > 1) {
        cellStyle.height = getRowspanHeight(spanInfo.rowspan);
        cellStyle.alignSelf = 'flex-start';
        cellStyle.display = 'flex';
        cellStyle.alignItems = 'center';
      }
      
      return (
        <div
          key={column.id}
          className={cellClasses}
          style={{
            ...cellStyle,
            cursor: select === 'column' ? 'pointer' : undefined,
          }}
          {...(spanInfo?.colspan && spanInfo.colspan > 1 ? { 'data-colspan': spanInfo.colspan } : {})}
          {...(spanInfo?.rowspan && spanInfo.rowspan > 1 ? { 'data-rowspan': spanInfo.rowspan } : {})}
          onClick={(e) => {
            if (select === 'cell') {
              e.stopPropagation();
              handleCellClick(row, rowIndex, column.id, e);
            } else if (select === 'column') {
              e.stopPropagation();
              handleColumnClick(column.id, e);
            }
          }}
        >
          <span 
            className="avakio-datatable-cell-content" 
            style={{ pointerEvents: column.template ? 'auto' : 'none' }}
          >
            {spanInfo?.value !== undefined ? spanInfo.value : renderCell(column, row, rowIndex)}
          </span>
        </div>
      );
    });
  };

  // Helper function to render rows for a panel
  const renderPanelRows = (columnsToRender: AvakioColumn<T>[]) => {
    return paginatedData.map((row, rowIndex) => {
      const rowKey = row.id !== undefined ? `row-${row.id}` : rowIndex;
      
      return (
        <div
          key={rowKey}
          data-row-index={rowIndex}
          className={`avakio-datatable-row ${
            select !== 'cell' && select !== 'column' && selectedRows.has(rowIndex) ? 'selected' : ''
          } ${hover ? 'hover' : ''}`}
          style={{ height: `${rowHeight}px` }}
          onClick={(e) => handleRowClick(row, rowIndex, e)}
          onDoubleClick={() => handleRowDoubleClick(row, rowIndex)}
        >
          {renderBodyCells(row, rowIndex, columnsToRender)}
        </div>
      );
    });
  };

  // Compute base styles from AvakioBaseProps
  const baseStyles = computeBaseStyles({
    align,
    hidden: isHidden,
    margin,
    minHeight,
    minWidth,
    maxHeight,
    maxWidth,
    padding,
    width,
    style,
  });

  return (
    <div
      ref={rootRef}
      id={id}
      data-testid={testId}
      className={`avakio-datatable ${css} ${className || ''} ${borderless ? 'avakio-datatable-borderless' : ''} ${columnBorders ? 'avakio-datatable-column-borders' : ''} ${rowBorders ? 'avakio-datatable-row-borders' : ''} ${isDisabled ? 'avakio-datatable-disabled' : ''}`}
      style={baseStyles}
      title={tooltip}
      tabIndex={isDisabled ? -1 : 0}
      onBlur={onBlur}
      onFocus={onFocus}
      onKeyDown={onKeyPress as any}
    >
      {/* Three-panel layout for frozen columns */}
      {hasFrozenColumns ? (
        <div className="avakio-datatable-frozen-container">
          {/* Left Frozen Panel */}
          {frozenLeftColumns.length > 0 && (
            <div className={`avakio-datatable-frozen-panel avakio-datatable-frozen-left ${isScrolledLeft ? 'has-shadow' : ''}`}>
              {/* Left Frozen Header */}
              <div className={`avakio-datatable-header ${filterable ? 'has-filters' : ''}`} style={{ minHeight: `${headerHeight}px` }}>
                <div className="avakio-datatable-header-row">
                  {/* Row Number Header in frozen left panel */}
                  {showRowNum && (
                    <div
                      className={`avakio-datatable-header-cell avakio-datatable-rownum-cell ${filterable ? 'with-filter' : ''}`}
                      style={{ width: '48px', minWidth: '48px', maxWidth: '48px', flexShrink: 0, justifyContent: 'center' }}
                    >
                      <div className="avakio-datatable-header-content" style={{ justifyContent: 'center' }}>
                        <span className="avakio-datatable-header-text">#</span>
                      </div>
                      {filterable && (
                        <div className="avakio-datatable-header-filter avakio-datatable-header-filter-empty" />
                      )}
                    </div>
                  )}
                  {/* Bulk Selection Checkbox in frozen left panel */}
                  {bulkSelection && (
                    <div
                      className={`avakio-datatable-header-cell avakio-datatable-checkbox-cell ${filterable ? 'with-filter' : ''}`}
                      style={{ width: '48px', minWidth: '48px', maxWidth: '48px', flexShrink: 0, justifyContent: 'center' }}
                    >
                      <div className="avakio-datatable-header-content" style={{ justifyContent: 'center' }}>
                        <AvakioCheckbox
                          checked={paginatedData.length > 0 && selectedRows.size === paginatedData.length}
                          indeterminate={selectedRows.size > 0 && selectedRows.size < paginatedData.length}
                          onChange={(checked) => {
                            if (checked) {
                              const allIndices = new Set(paginatedData.map((_, idx) => idx));
                              setSelectedRows(allIndices);
                            } else {
                              setSelectedRows(new Set());
                            }
                          }}
                        />
                      </div>
                      {filterable && (
                        <div className="avakio-datatable-header-filter avakio-datatable-header-filter-empty" />
                      )}
                    </div>
                  )}
                  {renderHeaderCells(frozenLeftColumns)}
                </div>
              </div>
              {/* Left Frozen Body */}
              <div
                ref={leftFrozenBodyRef}
                className="avakio-datatable-body avakio-datatable-frozen-body scrollbar-visible"
                onScroll={() => handleVerticalScroll('left')}
              >
                {loading ? (
                  <div className="avakio-datatable-loading">
                    <div className="avakio-datatable-spinner" />
                  </div>
                ) : dataError ? (
                  <div className="avakio-datatable-error">
                    <div className="avakio-datatable-error-icon">⚠</div>
                  </div>
                ) : paginatedData.length === 0 ? null : (
                  <div className="avakio-datatable-rows">
                    {paginatedData.map((row, rowIndex) => {
                      const rowKey = row.id !== undefined ? `row-${row.id}` : rowIndex;
                      return (
                        <div
                          key={rowKey}
                          data-row-index={rowIndex}
                          className={`avakio-datatable-row ${
                            select !== 'cell' && select !== 'column' && selectedRows.has(rowIndex) ? 'selected' : ''
                          } ${hover ? 'hover' : ''}`}
                          style={{ height: `${rowHeight}px` }}
                          onClick={(e) => handleRowClick(row, rowIndex, e)}
                          onDoubleClick={() => handleRowDoubleClick(row, rowIndex)}
                        >
                          {/* Row Number Cell in frozen left */}
                          {showRowNum && (
                            <div
                              className={`avakio-datatable-cell avakio-datatable-rownum-cell ${selectedRows.has(rowIndex) ? 'selected' : ''}`}
                              style={{ width: '48px', minWidth: '48px', maxWidth: '48px', flexShrink: 0, justifyContent: 'center' }}
                            >
                              <span className="avakio-datatable-rownum-text">{(page - 1) * localPageSize + rowIndex + 1}</span>
                            </div>
                          )}
                          {/* Bulk Selection Checkbox Cell in frozen left */}
                          {bulkSelection && (
                            <div
                              className={`avakio-datatable-cell avakio-datatable-checkbox-cell ${selectedRows.has(rowIndex) ? 'selected' : ''}`}
                              style={{ width: '48px', minWidth: '48px', maxWidth: '48px', flexShrink: 0, justifyContent: 'center' }}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <AvakioCheckbox
                                checked={selectedRows.has(rowIndex)}
                                onChange={(checked) => {
                                  const newSet = new Set(selectedRows);
                                  if (checked) {
                                    newSet.add(rowIndex);
                                  } else {
                                    newSet.delete(rowIndex);
                                  }
                                  setSelectedRows(newSet);
                                }}
                              />
                            </div>
                          )}
                          {renderBodyCells(row, rowIndex, frozenLeftColumns)}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Middle Scrollable Panel */}
          <div className="avakio-datatable-scrollable-panel">
            {/* Scrollable Header - horizontal scroll synced with body */}
            <div 
              ref={scrollableHeaderRef}
              className="avakio-datatable-scrollable-header-container"
              style={{ paddingRight: scrollbarWidth > 0 ? `${scrollbarWidth}px` : undefined }}
              onScroll={() => handleHorizontalScroll('header')}
            >
              <div className={`avakio-datatable-header ${filterable ? 'has-filters' : ''}`} style={{ minHeight: `${headerHeight}px` }}>
                <div className="avakio-datatable-header-row">
                  {/* Row Number Header - only if no frozen left columns */}
                  {showRowNum && frozenLeftColumns.length === 0 && (
                    <div
                      className={`avakio-datatable-header-cell avakio-datatable-rownum-cell ${filterable ? 'with-filter' : ''}`}
                      style={{ width: '48px', minWidth: '48px', maxWidth: '48px', flexShrink: 0, justifyContent: 'center' }}
                    >
                      <div className="avakio-datatable-header-content" style={{ justifyContent: 'center' }}>
                        <span className="avakio-datatable-header-text">#</span>
                      </div>
                      {filterable && (
                        <div className="avakio-datatable-header-filter avakio-datatable-header-filter-empty" />
                      )}
                    </div>
                  )}
                  {/* Bulk Selection only in left frozen panel when frozen columns exist */}
                  {bulkSelection && frozenLeftColumns.length === 0 && (
                    <div
                      className={`avakio-datatable-header-cell avakio-datatable-checkbox-cell ${filterable ? 'with-filter' : ''}`}
                      style={{ width: '48px', minWidth: '48px', maxWidth: '48px', flexShrink: 0, justifyContent: 'center' }}
                    >
                      <div className="avakio-datatable-header-content" style={{ justifyContent: 'center' }}>
                        <AvakioCheckbox
                          checked={paginatedData.length > 0 && selectedRows.size === paginatedData.length}
                          indeterminate={selectedRows.size > 0 && selectedRows.size < paginatedData.length}
                          onChange={(checked) => {
                            if (checked) {
                              const allIndices = new Set(paginatedData.map((_, idx) => idx));
                              setSelectedRows(allIndices);
                            } else {
                              setSelectedRows(new Set());
                            }
                          }}
                        />
                      </div>
                      {filterable && (
                        <div className="avakio-datatable-header-filter avakio-datatable-header-filter-empty" />
                      )}
                    </div>
                  )}
                  {renderHeaderCells(scrollableColumns)}
                </div>
              </div>
            </div>
            {/* Scrollable Body - horizontal scroll synced with header, vertical scroll synced with frozen panels */}
            <div
              ref={scrollableBodyRef}
              className={`avakio-datatable-body avakio-datatable-scrollable-body scrollbar-visible`}
              onScroll={(e) => {
                handleVerticalScroll('middle');
                handleHorizontalScroll('body');
              }}
            >
              {loading ? (
                <div className="avakio-datatable-loading">
                  <div className="avakio-datatable-spinner" />
                  <p>Loading data...</p>
                </div>
              ) : dataError ? (
                <div className="avakio-datatable-error">
                  <div className="avakio-datatable-error-icon">⚠</div>
                  <p>{dataError}</p>
                </div>
              ) : paginatedData.length === 0 ? (
                <div className="avakio-datatable-empty">
                  <p>{emptyText}</p>
                </div>
              ) : (
                <div className="avakio-datatable-rows">
                  {paginatedData.map((row, rowIndex) => {
                    const rowKey = row.id !== undefined ? `row-${row.id}` : rowIndex;
                    return (
                      <div
                        key={rowKey}
                        data-row-index={rowIndex}
                        className={`avakio-datatable-row ${
                          select !== 'cell' && select !== 'column' && selectedRows.has(rowIndex) ? 'selected' : ''
                        } ${hover ? 'hover' : ''}`}
                        style={{ height: `${rowHeight}px` }}
                        onClick={(e) => handleRowClick(row, rowIndex, e)}
                        onDoubleClick={() => handleRowDoubleClick(row, rowIndex)}
                      >
                        {/* Row Number Cell - only if no frozen left columns */}
                        {showRowNum && frozenLeftColumns.length === 0 && (
                          <div
                            className={`avakio-datatable-cell avakio-datatable-rownum-cell ${selectedRows.has(rowIndex) ? 'selected' : ''}`}
                            style={{ width: '48px', minWidth: '48px', maxWidth: '48px', flexShrink: 0, justifyContent: 'center' }}
                          >
                            <span className="avakio-datatable-rownum-text">{(page - 1) * localPageSize + rowIndex + 1}</span>
                          </div>
                        )}
                        {/* Bulk Selection only if no frozen left columns */}
                        {bulkSelection && frozenLeftColumns.length === 0 && (
                          <div
                            className={`avakio-datatable-cell avakio-datatable-checkbox-cell ${selectedRows.has(rowIndex) ? 'selected' : ''}`}
                            style={{ width: '48px', minWidth: '48px', maxWidth: '48px', flexShrink: 0, justifyContent: 'center' }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <AvakioCheckbox
                              checked={selectedRows.has(rowIndex)}
                              onChange={(checked) => {
                                const newSet = new Set(selectedRows);
                                if (checked) {
                                  newSet.add(rowIndex);
                                } else {
                                  newSet.delete(rowIndex);
                                }
                                setSelectedRows(newSet);
                              }}
                            />
                          </div>
                        )}
                        {renderBodyCells(row, rowIndex, scrollableColumns)}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            {/* Horizontal Scrollbar - only shown when horizontal overflow exists */}
            {hasHorizontalOverflow && (
              <div
                ref={horizontalScrollbarRef}
                className="avakio-datatable-horizontal-scrollbar"
                onScroll={() => handleHorizontalScroll('scrollbar')}
              >
                <div className="avakio-datatable-horizontal-scrollbar-content" />
              </div>
            )}
          </div>

          {/* Right Frozen Panel */}
          {frozenRightColumns.length > 0 && (
            <div className={`avakio-datatable-frozen-panel avakio-datatable-frozen-right ${isScrolledRight ? 'has-shadow' : ''}`}>
              {/* Right Frozen Header */}
              <div className={`avakio-datatable-header ${filterable ? 'has-filters' : ''}`} style={{ minHeight: `${headerHeight}px` }}>
                <div className="avakio-datatable-header-row">
                  {renderHeaderCells(frozenRightColumns)}
                </div>
              </div>
              {/* Right Frozen Body */}
              <div
                ref={rightFrozenBodyRef}
                className="avakio-datatable-body avakio-datatable-frozen-body scrollbar-visible"
                onScroll={() => handleVerticalScroll('right')}
              >
                {loading || dataError || paginatedData.length === 0 ? null : (
                  <div className="avakio-datatable-rows">
                    {paginatedData.map((row, rowIndex) => {
                      const rowKey = row.id !== undefined ? `row-${row.id}` : rowIndex;
                      return (
                        <div
                          key={rowKey}
                          data-row-index={rowIndex}
                          className={`avakio-datatable-row ${
                            select !== 'cell' && select !== 'column' && selectedRows.has(rowIndex) ? 'selected' : ''
                          } ${hover ? 'hover' : ''}`}
                          style={{ height: `${rowHeight}px` }}
                          onClick={(e) => handleRowClick(row, rowIndex, e)}
                          onDoubleClick={() => handleRowDoubleClick(row, rowIndex)}
                        >
                          {renderBodyCells(row, rowIndex, frozenRightColumns)}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Original single-panel layout when no frozen columns */
        <div className="avakio-datatable-scroll-container">
          {/* Content wrapper - ensures header and body have same width */}
          <div className="avakio-datatable-content" style={{ minWidth: `${totalMinWidth}px` }}>
            {/* Header */}
            <div className={`avakio-datatable-header ${filterable ? 'has-filters' : ''}`} style={{ minHeight: `${headerHeight}px` }}>
              <div className="avakio-datatable-header-row">
                {/* Row Number Column Header */}
                {showRowNum && (
                  <div
                    className={`avakio-datatable-header-cell avakio-datatable-rownum-cell ${filterable ? 'with-filter' : ''}`}
                    style={{ width: '48px', minWidth: '48px', maxWidth: '48px', flexShrink: 0, justifyContent: 'center' }}
                  >
                    <div className="avakio-datatable-header-content" style={{ justifyContent: 'center' }}>
                      <span className="avakio-datatable-header-text">#</span>
                    </div>
                    {filterable && (
                      <div className="avakio-datatable-header-filter avakio-datatable-header-filter-empty" />
                    )}
                  </div>
                )}
                {/* Bulk Selection Checkbox Column Header */}
                {bulkSelection && (
                  <div
                    className={`avakio-datatable-header-cell avakio-datatable-checkbox-cell ${filterable ? 'with-filter' : ''}`}
                    style={{ width: '48px', minWidth: '48px', maxWidth: '48px', flexShrink: 0, justifyContent: 'center' }}
                  >
                    <div className="avakio-datatable-header-content" style={{ justifyContent: 'center' }}>
                      <AvakioCheckbox
                        checked={paginatedData.length > 0 && selectedRows.size === paginatedData.length}
                        indeterminate={selectedRows.size > 0 && selectedRows.size < paginatedData.length}
                        onChange={(checked) => {
                          if (checked) {
                            const allIndices = new Set(paginatedData.map((_, idx) => idx));
                            setSelectedRows(allIndices);
                          } else {
                            setSelectedRows(new Set());
                          }
                        }}
                      />
                    </div>
                    {filterable && (
                      <div className="avakio-datatable-header-filter avakio-datatable-header-filter-empty" />
                    )}
                  </div>
                )}
                {renderHeaderCells(visibleColumns)}
              </div>
            </div>

            {/* Body */}
            <div
              className={`avakio-datatable-body ${scroll ? `scroll-${scroll}` : ''} scrollbar-visible`}
            >
              {loading ? (
                <div className="avakio-datatable-loading">
                  <div className="avakio-datatable-spinner" />
                  <p>Loading data...</p>
                </div>
              ) : dataError ? (
                <div className="avakio-datatable-error">
                  <div className="avakio-datatable-error-icon">⚠</div>
                  <p>{dataError}</p>
                </div>
              ) : paginatedData.length === 0 ? (
                <div className="avakio-datatable-empty">
                  <p>{emptyText}</p>
                </div>
              ) : (
                <div className="avakio-datatable-rows">
                  {paginatedData.map((row, rowIndex) => {
                    const rowKey = row.id !== undefined ? `row-${row.id}` : rowIndex;
                    return (
                      <div
                        key={rowKey}
                        data-row-index={rowIndex}
                        className={`avakio-datatable-row ${
                          select !== 'cell' && select !== 'column' && selectedRows.has(rowIndex) ? 'selected' : ''
                        } ${hover ? 'hover' : ''}`}
                        style={{ height: `${rowHeight}px` }}
                        onClick={(e) => handleRowClick(row, rowIndex, e)}
                        onDoubleClick={() => handleRowDoubleClick(row, rowIndex)}
                      >
                        {/* Row Number Cell */}
                        {showRowNum && (
                          <div
                            className={`avakio-datatable-cell avakio-datatable-rownum-cell ${selectedRows.has(rowIndex) ? 'selected' : ''}`}
                            style={{ width: '48px', minWidth: '48px', maxWidth: '48px', flexShrink: 0, justifyContent: 'center' }}
                          >
                            <span className="avakio-datatable-rownum-text">{(page - 1) * localPageSize + rowIndex + 1}</span>
                          </div>
                        )}
                        {/* Bulk Selection Checkbox Cell */}
                        {bulkSelection && (
                          <div
                            className={`avakio-datatable-cell avakio-datatable-checkbox-cell ${selectedRows.has(rowIndex) ? 'selected' : ''}`}
                            style={{ width: '48px', minWidth: '48px', maxWidth: '48px', flexShrink: 0, justifyContent: 'center' }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <AvakioCheckbox
                              checked={selectedRows.has(rowIndex)}
                              onChange={(checked) => {
                                const newSet = new Set(selectedRows);
                                if (checked) {
                                  newSet.add(rowIndex);
                                } else {
                                  newSet.delete(rowIndex);
                                }
                                setSelectedRows(newSet);
                              }}
                            />
                          </div>
                        )}
                        {renderBodyCells(row, rowIndex, visibleColumns)}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer with Pagination */}
      {paging && !loading && !dataError && paginatedData.length > 0 && (
        <div className="avakio-datatable-footer">
          <div className="avakio-datatable-footer-info">
            Showing {(page - 1) * localPageSize + 1} to{' '}
            {Math.min(page * localPageSize, totalCount || sortedData.length)} of{' '}
            {totalCount || sortedData.length} records
          </div>
          <div className="avakio-datatable-pagination">
            <AvakioRichSelect
              value={String(localPageSize)}
              options={[
                { id: '5', value: '5 / page' },
                { id: '10', value: '10 / page' },
                { id: '20', value: '20 / page' },
                { id: '50', value: '50 / page' },
                { id: '100', value: '100 / page' },
              ]}
              onChange={({ value }) => {
                const newPageSize = Number(value);
                setLocalPageSize(newPageSize);
                setPage(1);
                if (serverSide && onPageSizeChange) {
                  onPageSizeChange(newPageSize);
                }
              }}
              className="avakio-datatable-page-size-select"
              clearable={false}
              width={130}
              size="compact"
            />

            <div className="avakio-datatable-pagination-controls">
              <AvakioButton
                variant="outline"
                size="sm"
                onClick={() => {
                  const newPage = Math.max(1, page - 1);
                  setPage(newPage);
                  onPageChange?.(newPage);
                }}
                disabled={page === 1}
                icon={<ChevronLeft size={16} />}
                buttonType="icon"
                style={{ height: '32px', width: '32px', padding: 0 }}
              />

              <span className="avakio-datatable-page-info">
                Page {page} of {totalPages}
              </span>

              <AvakioButton
                variant="outline"
                size="sm"
                onClick={() => {
                  const newPage = Math.min(totalPages, page + 1);
                  setPage(newPage);
                  onPageChange?.(newPage);
                }}
                disabled={page === totalPages}
                icon={<ChevronRight size={16} />}
                buttonType="icon"
                style={{ height: '32px', width: '32px', padding: 0 }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * AvakioDataTable - High-performance data table component with sorting, filtering, pagination and editing.
 * 
 * Extends AvakioBaseProps (with exclusions for input-specific props).
 * Use AvakioDataTableRef for imperative methods like getData(), setData(), getSelectedRows(), etc.
 * 
 * @example
 * ```tsx
 * const tableRef = useRef<AvakioDataTableRef<MyDataType>>(null);
 * 
 * <AvakioDataTable
 *   ref={tableRef}
 *   data={myData}
 *   columns={columns}
 *   editable
 *   onCellChange={(rowIndex, columnId, newValue, oldValue) => {
 *     console.log('Cell changed:', { rowIndex, columnId, newValue, oldValue });
 *   }}
 * />
 * 
 * // Imperative methods:
 * tableRef.current?.getData();
 * tableRef.current?.setData(newData);
 * tableRef.current?.getSelectedRows();
 * tableRef.current?.clearFilters();
 * ```
 */
export const AvakioDataTable = forwardRef(AvakioDataTableInner) as <T extends Record<string, any>>(
  props: AvakioDataTableProps<T> & { ref?: React.ForwardedRef<AvakioDataTableRef<T>> }
) => React.ReactElement;

export default AvakioDataTable;