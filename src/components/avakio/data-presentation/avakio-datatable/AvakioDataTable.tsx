import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { ChevronUp, ChevronDown, ChevronsUpDown, ChevronLeft, ChevronRight, Search, X } from 'lucide-react';
import { AvakioText } from '../../ui-controls/avakio-text/avakio-text';
import { AvakioButton } from '../../ui-controls/avakio-button/avakio-button';
import { AvakioRichSelect } from '../../ui-controls/avakio-richselect/avakio-richselect';
import './avakio-datatable.css';

export interface AvakioColumn<T = any> {
  id: string;
  header: string;
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
}

export type AvakioSpan = [
  rowId: string | number,
  columnId: string,
  colspan: number,
  rowspan: number,
  value?: any,
  cssClass?: string
];

export interface AvakioDataTableProps<T = any> {
  id?: string;
  data: T[];
  spans?: AvakioSpan[];
  columns: AvakioColumn<T>[];
  height?: number | string;
  width?: number | string;
  select?: boolean | 'row' | 'cell' | 'column';
  multiselect?: boolean;
  rowHeight?: number;
  headerHeight?: number;
  fixedRowNumber?: number;
  hover?: boolean;
  resizable?: boolean;
  sortable?: boolean;
  filterable?: boolean;
  paging?: boolean;
  pageSize?: number;
  autoConfig?: boolean;
  scroll?: boolean | 'x' | 'y' | 'xy';
  css?: string;
  serverSide?: boolean;
  onRowClick?: (row: T, index: number) => void;
  onRowDoubleClick?: (row: T, index: number) => void;
  onSelectChange?: (selected: T[]) => void;
  onSort?: (columnId: string, direction: 'asc' | 'desc') => void;
  onFilter?: (filters: Record<string, string>) => void;
  loading?: boolean;
  emptyText?: string;
  totalCount?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  /** Test ID for testing purposes */
  testId?: string;
  /** Minimum width */
  minWidth?: number | string;
  /** Minimum height */
  minHeight?: number | string;
  /** Whether the component is borderless */
  borderless?: boolean;
  /** Whether the component is disabled */
  disabled?: boolean;
  /** Whether the component is hidden */
  hidden?: boolean;
  /** Maximum height */
  maxHeight?: number | string;
  /** Maximum width */
  maxWidth?: number | string;
  /** Custom inline styles for the root element */
  style?: React.CSSProperties;
}

export function AvakioDataTable<T extends Record<string, any>>({
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
  style,
}: AvakioDataTableProps<T>) {
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

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
      const allRowIds = data.map((row: any) => String(row.id || row.Id));
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
  }, [spans, columns, data]);
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [columnWidths, setColumnWidths] = useState<Record<string, number>>({});
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
    if (serverSide) return data;
    
    let result = [...data];

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
    const customWidth = columnWidths[column.id];
    if (customWidth) return `${customWidth}px`;
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
  const renderCell = (column: AvakioColumn<T>, row: T) => {
    if (column.template) {
      return column.template(row);
    }
    
    const value = row[column.id];
    if (column.format) {
      return column.format(value);
    }
    
    return value !== null && value !== undefined ? String(value) : '';
  };

  return (
    <div
      id={id}
      data-testid={testId}
      className={`avakio-datatable ${css}`}
      style={{
        height: typeof height === 'number' ? `${height}px` : height,
        width: typeof width === 'number' ? `${width}px` : width,
        ...style,
      }}
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
                      }}
                      {...(spanInfo?.colspan && spanInfo.colspan > 1 ? { 'data-colspan': spanInfo.colspan } : {})}
                      {...(spanInfo?.rowspan && spanInfo.rowspan > 1 ? { 'data-rowspan': spanInfo.rowspan } : {})}
                    >
                      {spanInfo?.value !== undefined ? spanInfo.value : renderCell(column, row)}
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

export default AvakioDataTable;











