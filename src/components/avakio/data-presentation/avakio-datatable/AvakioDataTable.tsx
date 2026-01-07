import React, { useState, useMemo, useCallback, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { ChevronUp, ChevronDown, ChevronsUpDown, ChevronLeft, ChevronRight, Search, X } from 'lucide-react';
import { AvakioText } from '../../ui-controls/avakio-text/avakio-text';
import { AvakioButton } from '../../ui-controls/avakio-button/avakio-button';
import { AvakioRichSelect } from '../../ui-controls/avakio-richselect/avakio-richselect';
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
  filterable?: boolean;
  filterComponent?: (value: any, onChange: (value: any) => void) => React.ReactNode;
  filterType?: 'text' | 'date' | 'number' | 'multicombo' | 'combo';
  hidden?: boolean;
  resizable?: boolean;
  template?: (row: T) => React.ReactNode;
  cssClass?: string;
  headerCssClass?: string;
  align?: 'left' | 'center' | 'right';
  format?: (value: any) => string;
  /** Auto-adjust column width: 'data' (widest content), 'header' (header text), or true (both) */
  adjust?: 'data' | 'header' | boolean;
  /** Inline CSS styles for cells in this column, e.g. { textAlign: 'right', fontWeight: 'bold' } */
  css?: React.CSSProperties;
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
  
  /** Returns the currently selected rows */
  getSelectedRows: () => T[];
  
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
  getFilterValues: () => Record<string, string>;
  
  /** Sets filter values programmatically */
  setFilterValues: (filters: Record<string, string>) => void;
  
  /** Clears all filters */
  clearFilters: () => void;
  
  /** Refreshes the table (re-renders with current data) */
  refresh: () => void;
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
  onFilter?: (filters: Record<string, string>) => void;
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
    sortable = true,
    filterable = true,
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
  
  // Internal data state (for ref methods)
  const [internalData, setInternalData] = useState<T[]>(data);
  
  // Sync internal data with prop changes
  useEffect(() => {
    setInternalData(data);
  }, [data]);
  
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
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [refreshKey, setRefreshKey] = useState(0);
  
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
      return Array.from(selectedRows).map(index => internalData[index]).filter(Boolean);
    },
    selectRows: (indices: number[]) => {
      setSelectedRows(new Set(indices));
    },
    clearSelection: () => {
      setSelectedRows(new Set());
    },
    scrollToRow: (index: number) => {
      const rowElement = rootRef.current?.querySelector(`[data-row-index="${index}"]`);
      rowElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
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
    setFilterValues: (newFilters: Record<string, string>) => {
      setFilters(newFilters);
    },
    clearFilters: () => {
      setFilters({});
    },
    refresh: () => {
      setRefreshKey(prev => prev + 1);
    },
  }), [internalData, selectedRows, sortColumn, sortDirection, filters, isDisabled, isHidden]);

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
        
        // Handle combo filtering (single selected value)
        if (column?.filterType === 'combo' && filterValue) {
          const stringValue = String(value || '').toLowerCase();
          const filterStringValue = String(filterValue).toLowerCase();
          return stringValue.includes(filterStringValue);
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

  // Handle filter
  const handleFilter = useCallback((columnId: string, value: string) => {
    const newFilters = { ...filters, [columnId]: value };
    setFilters(newFilters);
    setPage(1); // Reset to first page on filter

    if (onFilter) {
      onFilter(newFilters);
    }
  }, [filters, onFilter]);

  // Handle row selection
  const handleRowClick = useCallback((row: T, index: number, event: React.MouseEvent) => {
    if (select) {
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
      const newWidth = Math.max(50, resizeStartWidth + diff);
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
  }, [resizingColumn, resizeStartX, resizeStartWidth]);

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

  const visibleColumns = columns.filter(col => !col.hidden);

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

  // Calculate total minimum width of all columns for horizontal scroll threshold
  const totalMinWidth = useMemo(() => {
    return visibleColumns.reduce((total, column) => {
      const effectiveMinWidth = getEffectiveMinWidth(column);
      if (effectiveMinWidth) {
        return total + effectiveMinWidth;
      }
      // Use the column width or default
      const width = columnWidths[column.id] || (typeof column.width === 'number' ? column.width : 150);
      return total + width;
    }, 0);
  }, [visibleColumns, columnWidths]);

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
              onChange={(newValue) => handleChange(newValue)}
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

  // Compute base styles from AvakioBaseProps
  const baseStyles = computeBaseStyles({
    align,
    height,
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
      className={`avakio-datatable ${css} ${className || ''} ${borderless ? 'avakio-datatable-borderless' : ''} ${isDisabled ? 'avakio-datatable-disabled' : ''}`}
      style={baseStyles}
      title={tooltip}
      tabIndex={isDisabled ? -1 : 0}
      onBlur={onBlur}
      onFocus={onFocus}
      onKeyDown={onKeyPress as any}
    >
      {/* Scroll Container - single horizontal scroll for header and body */}
      <div className="avakio-datatable-scroll-container">
        {/* Content wrapper - ensures header and body have same width */}
        <div className="avakio-datatable-content" style={{ minWidth: `${totalMinWidth}px` }}>
        {/* Header */}
        <div className="avakio-datatable-header" style={{ minHeight: `${headerHeight}px` }}>
        <div className="avakio-datatable-header-row">
          {visibleColumns.map((column, colIndex) => (
            <div
              key={column.id}
              className={`avakio-datatable-header-cell ${column.headerCssClass || ''} ${
                sortColumn === column.id ? 'sorted' : ''
              }`}
              style={{
                ...getColumnStyle(column),
                textAlign: column.align || 'left',
              }}
            >
              <div
                className="avakio-datatable-header-content"
                onClick={() => sortable && column.sort !== false && handleSort(column.id)}
              >
                <span className={`avakio-datatable-header-text ${column.headerWrap ? 'avakio-datatable-header-text-wrap' : ''}`}>{column.header}</span>
                {sortable && column.sort !== false && (
                  <span className="avakio-datatable-sort-icon">
                    {sortColumn === column.id ? (
                      sortDirection === 'asc' ? (
                        <ChevronUp size={16} />
                      ) : (
                        <ChevronDown size={16} />
                      )
                    ) : (
                      <ChevronsUpDown size={16} style={{ opacity: 0.4 }} />
                    )}
                  </span>
                )}
              </div>
              {resizable && column.resizable !== false && (
                <div
                  className="avakio-datatable-resize-handle"
                  onMouseDown={(e) => handleResizeStart(column.id, e)}
                />
              )}
            </div>
          ))}
        </div>

        {/* Filter Row */}
        {filterable && (
          <div className="avakio-datatable-filter-row">
            {visibleColumns.map((column, colIndex) => (
              <div
                key={column.id}
                className="avakio-datatable-filter-cell"
                style={getColumnStyle(column)}
              >
                {column.filterable !== false && (
                  <>
                    {column.filterComponent ? (
                      column.filterComponent(filters[column.id], (value) => handleFilter(column.id, value))
                    ) : (
                      <AvakioText
                        type="text"
                        placeholder="Filter..."
                        value={filters[column.id] || ''}
                        onChange={(value) => handleFilter(column.id, value)}
                        clear={true}
                        icon={<Search size={12} />}
                        iconPosition="left"
                        className="avakio-datatable-filter-input"
                        height={28}
                        width="100%"
                      />
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        )}
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
        ) : paginatedData.length === 0 ? (
          <div className="avakio-datatable-empty">
            <p>{emptyText}</p>
          </div>
        ) : (
          <div className="avakio-datatable-rows">
            {paginatedData.map((row, rowIndex) => {
              // Use a unique identifier from the row if available, otherwise fall back to rowIndex
              const rowKey = row.id !== undefined ? `row-${row.id}` : rowIndex;
              const rowId = String(row.id || row.Id);
              
              return (
              <div
                key={rowKey}
                className={`avakio-datatable-row ${
                  selectedRows.has(rowIndex) ? 'selected' : ''
                } ${hover ? 'hover' : ''}`}
                style={{ height: `${rowHeight}px` }}
                onClick={(e) => handleRowClick(row, rowIndex, e)}
                onDoubleClick={() => handleRowDoubleClick(row, rowIndex)}
              >
                {visibleColumns.map((column, colIndex) => {
                  const cellKey = `${rowId}-${column.id}`;
                  const spanInfo = spanMap.get(cellKey);
                  
                  // Skip cells that are covered by a span
                  if (spanInfo && spanInfo.skip) {
                    return null;
                  }
                  
                  const cellClasses = [
                    'avakio-datatable-cell',
                    column.cssClass || '',
                    spanInfo?.cssClass || ''
                  ].filter(Boolean).join(' ');
                  
                  return (
                    <div
                      key={column.id}
                      className={cellClasses}
                      style={{
                        ...getColumnStyle(column),
                        textAlign: column.align || 'left',
                        ...column.css,
                      }}
                      {...(spanInfo?.colspan && spanInfo.colspan > 1 ? { 'data-colspan': spanInfo.colspan } : {})}
                      {...(spanInfo?.rowspan && spanInfo.rowspan > 1 ? { 'data-rowspan': spanInfo.rowspan } : {})}
                    >
                      <span className="avakio-datatable-cell-content">
                        {spanInfo?.value !== undefined ? spanInfo.value : renderCell(column, row, rowIndex)}
                      </span>
                    </div>
                  );
                })}
              </div>
              );
            })}
          </div>
        )}
      </div>
      </div>
      </div>

      {/* Footer with Pagination */}
      {paging && !loading && paginatedData.length > 0 && (
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
              onChange={(value) => {
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