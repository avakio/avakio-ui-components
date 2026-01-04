import React, { useState, useEffect, useCallback, forwardRef, useImperativeHandle, useRef } from 'react';
import './avakio-excel-viewer.css';

export type AvakioExcelViewerTheme = 'material' | 'flat' | 'compact' | 'dark' | 'ocean' | 'sunset';

/**
 * Column configuration for Excel Viewer
 */
export interface AvakioExcelViewerColumn {
  /** Unique column ID */
  id: string;
  /** Column header text */
  header?: string;
  /** Column width in pixels */
  width?: number;
  /** Minimum column width */
  minWidth?: number;
  /** Maximum column width */
  maxWidth?: number;
  /** CSS class for the column */
  css?: string;
  /** Custom cell renderer */
  template?: (row: any, col: AvakioExcelViewerColumn) => React.ReactNode;
  /** Whether the column is editable */
  editable?: boolean;
  /** Cell editor type */
  editor?: 'text' | 'number' | 'select' | 'date';
  /** Options for select editor */
  options?: { id: string | number; value: string }[];
  /** Text alignment */
  align?: 'left' | 'center' | 'right';
  /** Column sort function or boolean */
  sort?: boolean | 'string' | 'number' | 'date' | ((a: any, b: any) => number);
  /** Whether the column is hidden */
  hidden?: boolean;
}

/**
 * Sheet configuration for Excel Viewer
 */
export interface AvakioExcelViewerSheet {
  /** Sheet name */
  name: string;
  /** Sheet data rows */
  data: Record<string, any>[];
  /** Optional column configuration (auto-generated from data if not provided) */
  columns?: AvakioExcelViewerColumn[];
}

/**
 * Cell span configuration
 */
export interface AvakioExcelViewerSpan {
  /** Row index (0-based) */
  row: number;
  /** Column ID */
  column: string;
  /** Number of rows to span */
  rowspan?: number;
  /** Number of columns to span */
  colspan?: number;
  /** Custom CSS class for the spanned cell */
  css?: string;
}

/**
 * Selection area configuration
 */
export interface AvakioExcelViewerSelection {
  /** Start row index */
  row: number;
  /** Start column index */
  column: number;
  /** End row index (for range selection) */
  endRow?: number;
  /** End column index (for range selection) */
  endColumn?: number;
}

export interface AvakioExcelViewerProps {
  /** Unique identifier */
  id?: string;
  /** Test ID for testing */
  testId?: string;
  /** Theme to apply */
  theme?: AvakioExcelViewerTheme;
  /** Array of sheets */
  sheets?: AvakioExcelViewerSheet[];
  /** Single sheet data (for simple use cases) */
  data?: Record<string, any>[];
  /** Column configuration (for single sheet mode) */
  columns?: AvakioExcelViewerColumn[];
  /** Whether to use first row as header */
  excelHeader?: boolean;
  /** Whether to show the toolbar with sheet tabs */
  toolbar?: boolean;
  /** Default column width */
  columnWidth?: number;
  /** Default row height */
  rowHeight?: number;
  /** Header row height */
  headerRowHeight?: number;
  /** Whether to show row numbers */
  showRowNumbers?: boolean;
  /** Whether to enable column resizing */
  resizeColumn?: boolean;
  /** Whether to enable row resizing */
  resizeRow?: boolean;
  /** Whether to enable editing */
  editable?: boolean;
  /** Edit action: 'click' or 'dblclick' */
  editAction?: 'click' | 'dblclick';
  /** Whether to enable cell selection */
  select?: boolean | 'cell' | 'row' | 'column' | 'area';
  /** Whether to enable multi-selection */
  multiselect?: boolean;
  /** Whether to enable block/area selection */
  blockselect?: boolean;
  /** Whether to show grid lines */
  gridLines?: boolean;
  /** Whether to enable keyboard navigation */
  navigation?: boolean;
  /** Whether to freeze header row */
  freezeHeader?: boolean;
  /** Number of columns frozen to left */
  leftSplit?: number;
  /** Number of rows frozen to top */
  topSplit?: number;
  /** Whether the component is disabled */
  disabled?: boolean;
  /** Whether to auto-size columns to fit content */
  autowidth?: boolean;
  /** Whether to auto-size height to fit content */
  autoheight?: boolean;
  /** Maximum visible rows */
  yCount?: number;
  /** Custom CSS class */
  css?: string;
  /** Cell spans configuration */
  spans?: AvakioExcelViewerSpan[];
  /** Callback when cell is clicked */
  onCellClick?: (row: Record<string, any>, column: AvakioExcelViewerColumn, rowIndex: number, colIndex: number) => void;
  /** Callback when cell is double-clicked */
  onCellDoubleClick?: (row: Record<string, any>, column: AvakioExcelViewerColumn, rowIndex: number, colIndex: number) => void;
  /** Callback when cell value changes */
  onCellChange?: (row: Record<string, any>, column: AvakioExcelViewerColumn, oldValue: any, newValue: any, rowIndex: number) => void;
  /** Callback when selection changes */
  onSelectionChange?: (selection: AvakioExcelViewerSelection | null) => void;
  /** Callback when sheet changes */
  onSheetChange?: (sheetName: string, sheetIndex: number) => void;
  /** Callback when column is resized */
  onColumnResize?: (column: AvakioExcelViewerColumn, newWidth: number) => void;
  /** Callback when row is resized */
  onRowResize?: (rowIndex: number, newHeight: number) => void;
  /** Callback when data is sorted */
  onSort?: (column: AvakioExcelViewerColumn, direction: 'asc' | 'desc') => void;
  /** Callback when data is loaded */
  onDataLoad?: (data: Record<string, any>[]) => void;
}

export interface AvakioExcelViewerRef {
  /** Get all sheet names */
  getSheets: () => string[];
  /** Switch to a specific sheet */
  showSheet: (name: string) => void;
  /** Get current sheet name */
  getCurrentSheet: () => string;
  /** Get data from current sheet */
  getData: () => Record<string, any>[];
  /** Set data for current sheet */
  setData: (data: Record<string, any>[]) => void;
  /** Get column configuration */
  getColumns: () => AvakioExcelViewerColumn[];
  /** Set column configuration */
  setColumns: (columns: AvakioExcelViewerColumn[]) => void;
  /** Get selected cells */
  getSelectedId: () => AvakioExcelViewerSelection | null;
  /** Select a cell or range */
  select: (row: number, column: number, endRow?: number, endColumn?: number) => void;
  /** Clear selection */
  clearSelection: () => void;
  /** Get cell value */
  getCellValue: (rowIndex: number, columnId: string) => any;
  /** Set cell value */
  setCellValue: (rowIndex: number, columnId: string, value: any) => void;
  /** Add a row */
  addRow: (row: Record<string, any>, index?: number) => void;
  /** Remove a row */
  removeRow: (index: number) => void;
  /** Refresh the view */
  refresh: () => void;
  /** Get row by index */
  getItem: (index: number) => Record<string, any> | undefined;
  /** Get total row count */
  count: () => number;
  /** Scroll to a specific cell */
  showCell: (rowIndex: number, columnId: string) => void;
  /** Hide a column */
  hideColumn: (columnId: string) => void;
  /** Show a hidden column */
  showColumn: (columnId: string) => void;
  /** Check if column is visible */
  isColumnVisible: (columnId: string) => boolean;
  /** Sort data */
  sort: (columnId: string, direction?: 'asc' | 'desc') => void;
  /** Filter data */
  filter: (columnId: string, value: any, compare?: (cellValue: any, filterValue: any) => boolean) => void;
  /** Clear all filters */
  clearFilter: () => void;
}

// Helper to generate column letter (A, B, C, ..., Z, AA, AB, ...)
const getColumnLetter = (index: number): string => {
  let letter = '';
  let tempIndex = index;
  while (tempIndex >= 0) {
    letter = String.fromCharCode((tempIndex % 26) + 65) + letter;
    tempIndex = Math.floor(tempIndex / 26) - 1;
  }
  return letter;
};

// Helper to auto-generate columns from data
const generateColumnsFromData = (data: Record<string, any>[], excelHeader?: boolean): AvakioExcelViewerColumn[] => {
  if (!data || data.length === 0) return [];
  
  const firstRow = data[0];
  const keys = Object.keys(firstRow);
  
  return keys.map((key, index) => ({
    id: key,
    header: excelHeader ? String(firstRow[key] || getColumnLetter(index)) : key,
    width: 100,
  }));
};

export const AvakioExcelViewer = forwardRef<AvakioExcelViewerRef, AvakioExcelViewerProps>((props, ref) => {
  const {
    id,
    testId,
    theme = 'material',
    sheets: initialSheets,
    data: initialData,
    columns: initialColumns,
    excelHeader = false,
    toolbar = true,
    columnWidth = 100,
    rowHeight = 32,
    headerRowHeight = 36,
    showRowNumbers = true,
    resizeColumn = true,
    resizeRow = false,
    editable = false,
    editAction = 'dblclick',
    select = 'cell',
    multiselect = false,
    blockselect = false,
    gridLines = true,
    navigation = true,
    freezeHeader = true,
    leftSplit = 0,
    topSplit = 0,
    disabled = false,
    autowidth = false,
    autoheight = false,
    yCount,
    css,
    spans = [],
    onCellClick,
    onCellDoubleClick,
    onCellChange,
    onSelectionChange,
    onSheetChange,
    onColumnResize,
    onRowResize,
    onSort,
    onDataLoad,
  } = props;

  // State
  const [sheets, setSheets] = useState<AvakioExcelViewerSheet[]>(() => {
    if (initialSheets && initialSheets.length > 0) {
      return initialSheets;
    }
    if (initialData) {
      const cols = initialColumns || generateColumnsFromData(initialData, excelHeader);
      return [{ name: 'Sheet1', data: excelHeader ? initialData.slice(1) : initialData, columns: cols }];
    }
    return [{ name: 'Sheet1', data: [], columns: [] }];
  });
  
  const [activeSheet, setActiveSheet] = useState(0);
  const [columns, setColumns] = useState<AvakioExcelViewerColumn[]>(() => {
    const sheet = sheets[0];
    return sheet?.columns || generateColumnsFromData(sheet?.data || [], excelHeader);
  });
  const [data, setData] = useState<Record<string, any>[]>(() => sheets[0]?.data || []);
  const [selection, setSelection] = useState<AvakioExcelViewerSelection | null>(null);
  const [editingCell, setEditingCell] = useState<{ row: number; col: number } | null>(null);
  const [editValue, setEditValue] = useState<string>('');
  const [sortConfig, setSortConfig] = useState<{ columnId: string; direction: 'asc' | 'desc' } | null>(null);
  const [columnWidths, setColumnWidths] = useState<Record<string, number>>({});
  const [rowHeights, setRowHeights] = useState<Record<number, number>>({});
  const [hiddenColumns, setHiddenColumns] = useState<Set<string>>(new Set());
  const [filterConfig, setFilterConfig] = useState<{ columnId: string; value: any; compare?: (cellValue: any, filterValue: any) => boolean } | null>(null);
  
  // Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLTableElement>(null);
  const resizeRef = useRef<{ columnId: string; startX: number; startWidth: number } | null>(null);
  const selectionStartRef = useRef<{ row: number; col: number } | null>(null);
  
  // Update sheets when props change
  useEffect(() => {
    if (initialSheets && initialSheets.length > 0) {
      setSheets(initialSheets);
      const sheet = initialSheets[activeSheet] || initialSheets[0];
      setData(sheet.data);
      setColumns(sheet.columns || generateColumnsFromData(sheet.data, excelHeader));
    }
  }, [initialSheets, activeSheet, excelHeader]);
  
  useEffect(() => {
    if (initialData && !initialSheets) {
      const cols = initialColumns || generateColumnsFromData(initialData, excelHeader);
      const processedData = excelHeader ? initialData.slice(1) : initialData;
      setSheets([{ name: 'Sheet1', data: processedData, columns: cols }]);
      setData(processedData);
      setColumns(cols);
    }
  }, [initialData, initialColumns, initialSheets, excelHeader]);

  // Get visible columns
  const visibleColumns = columns.filter(col => !col.hidden && !hiddenColumns.has(col.id));
  
  // Get filtered and sorted data
  const processedData = React.useMemo(() => {
    let result = [...data];
    
    // Apply filter
    if (filterConfig) {
      const { columnId, value, compare } = filterConfig;
      result = result.filter(row => {
        const cellValue = row[columnId];
        if (compare) {
          return compare(cellValue, value);
        }
        if (value === '' || value === null || value === undefined) return true;
        return String(cellValue).toLowerCase().includes(String(value).toLowerCase());
      });
    }
    
    // Apply sort
    if (sortConfig) {
      const { columnId, direction } = sortConfig;
      const column = columns.find(c => c.id === columnId);
      
      result.sort((a, b) => {
        const aVal = a[columnId];
        const bVal = b[columnId];
        
        let comparison = 0;
        
        if (typeof column?.sort === 'function') {
          comparison = column.sort(aVal, bVal);
        } else if (column?.sort === 'number') {
          comparison = (Number(aVal) || 0) - (Number(bVal) || 0);
        } else if (column?.sort === 'date') {
          comparison = new Date(aVal).getTime() - new Date(bVal).getTime();
        } else {
          comparison = String(aVal || '').localeCompare(String(bVal || ''));
        }
        
        return direction === 'desc' ? -comparison : comparison;
      });
    }
    
    return result;
  }, [data, filterConfig, sortConfig, columns]);

  // Handle sheet change
  const handleSheetChange = useCallback((index: number) => {
    if (index >= 0 && index < sheets.length) {
      setActiveSheet(index);
      const sheet = sheets[index];
      setData(sheet.data);
      setColumns(sheet.columns || generateColumnsFromData(sheet.data, excelHeader));
      setSelection(null);
      setEditingCell(null);
      setSortConfig(null);
      setFilterConfig(null);
      onSheetChange?.(sheet.name, index);
    }
  }, [sheets, excelHeader, onSheetChange]);

  // Handle cell click
  const handleCellClick = useCallback((rowIndex: number, colIndex: number, e: React.MouseEvent) => {
    if (disabled) return;
    
    const column = visibleColumns[colIndex];
    const row = processedData[rowIndex];
    
    if (select) {
      if (blockselect && e.shiftKey && selection) {
        // Extend selection
        setSelection({
          ...selection,
          endRow: rowIndex,
          endColumn: colIndex,
        });
      } else {
        setSelection({ row: rowIndex, column: colIndex });
        selectionStartRef.current = { row: rowIndex, col: colIndex };
      }
      onSelectionChange?.({ row: rowIndex, column: colIndex });
    }
    
    if (editable && editAction === 'click' && column?.editable !== false) {
      setEditingCell({ row: rowIndex, col: colIndex });
      setEditValue(String(row?.[column?.id] || ''));
    }
    
    onCellClick?.(row, column, rowIndex, colIndex);
  }, [disabled, select, blockselect, selection, editable, editAction, visibleColumns, processedData, onSelectionChange, onCellClick]);

  // Handle cell double click
  const handleCellDoubleClick = useCallback((rowIndex: number, colIndex: number) => {
    if (disabled) return;
    
    const column = visibleColumns[colIndex];
    const row = processedData[rowIndex];
    
    if (editable && editAction === 'dblclick' && column?.editable !== false) {
      setEditingCell({ row: rowIndex, col: colIndex });
      setEditValue(String(row?.[column?.id] || ''));
    }
    
    onCellDoubleClick?.(row, column, rowIndex, colIndex);
  }, [disabled, editable, editAction, visibleColumns, processedData, onCellDoubleClick]);

  // Handle edit complete
  const handleEditComplete = useCallback(() => {
    if (!editingCell) return;
    
    const { row: rowIndex, col: colIndex } = editingCell;
    const column = visibleColumns[colIndex];
    const row = processedData[rowIndex];
    const oldValue = row?.[column?.id];
    
    if (editValue !== String(oldValue || '')) {
      const newData = [...data];
      const originalIndex = data.indexOf(row);
      if (originalIndex >= 0) {
        newData[originalIndex] = { ...newData[originalIndex], [column.id]: editValue };
        setData(newData);
        onCellChange?.(row, column, oldValue, editValue, originalIndex);
      }
    }
    
    setEditingCell(null);
    setEditValue('');
  }, [editingCell, editValue, visibleColumns, processedData, data, onCellChange]);

  // Handle column resize
  const handleColumnResizeStart = useCallback((columnId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const column = columns.find(c => c.id === columnId);
    const currentWidth = columnWidths[columnId] || column?.width || columnWidth;
    
    resizeRef.current = { columnId, startX: e.clientX, startWidth: currentWidth };
    
    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (!resizeRef.current) return;
      
      const diff = moveEvent.clientX - resizeRef.current.startX;
      const newWidth = Math.max(50, resizeRef.current.startWidth + diff);
      
      setColumnWidths(prev => ({ ...prev, [columnId]: newWidth }));
    };
    
    const handleMouseUp = () => {
      if (resizeRef.current) {
        const column = columns.find(c => c.id === resizeRef.current!.columnId);
        const newWidth = columnWidths[resizeRef.current.columnId] || column?.width || columnWidth;
        onColumnResize?.(column!, newWidth);
      }
      resizeRef.current = null;
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [columns, columnWidths, columnWidth, onColumnResize]);

  // Handle sort
  const handleHeaderClick = useCallback((column: AvakioExcelViewerColumn) => {
    if (!column.sort) return;
    
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig?.columnId === column.id) {
      direction = sortConfig.direction === 'asc' ? 'desc' : 'asc';
    }
    
    setSortConfig({ columnId: column.id, direction });
    onSort?.(column, direction);
  }, [sortConfig, onSort]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (disabled || !navigation || !selection) return;
    
    const { row, column } = selection;
    let newRow = row;
    let newCol = column;
    
    switch (e.key) {
      case 'ArrowUp':
        newRow = Math.max(0, row - 1);
        break;
      case 'ArrowDown':
        newRow = Math.min(processedData.length - 1, row + 1);
        break;
      case 'ArrowLeft':
        newCol = Math.max(0, column - 1);
        break;
      case 'ArrowRight':
        newCol = Math.min(visibleColumns.length - 1, column + 1);
        break;
      case 'Tab':
        e.preventDefault();
        if (e.shiftKey) {
          newCol = column - 1;
          if (newCol < 0) {
            newCol = visibleColumns.length - 1;
            newRow = Math.max(0, row - 1);
          }
        } else {
          newCol = column + 1;
          if (newCol >= visibleColumns.length) {
            newCol = 0;
            newRow = Math.min(processedData.length - 1, row + 1);
          }
        }
        break;
      case 'Enter':
        if (editingCell) {
          handleEditComplete();
          newRow = Math.min(processedData.length - 1, row + 1);
        } else if (editable) {
          const col = visibleColumns[column];
          if (col?.editable !== false) {
            setEditingCell({ row, col: column });
            setEditValue(String(processedData[row]?.[col?.id] || ''));
            return;
          }
        }
        break;
      case 'Escape':
        if (editingCell) {
          setEditingCell(null);
          setEditValue('');
          return;
        }
        break;
      case 'Home':
        if (e.ctrlKey) {
          newRow = 0;
          newCol = 0;
        } else {
          newCol = 0;
        }
        break;
      case 'End':
        if (e.ctrlKey) {
          newRow = processedData.length - 1;
          newCol = visibleColumns.length - 1;
        } else {
          newCol = visibleColumns.length - 1;
        }
        break;
      default:
        return;
    }
    
    if (newRow !== row || newCol !== column) {
      e.preventDefault();
      setSelection({ row: newRow, column: newCol });
      onSelectionChange?.({ row: newRow, column: newCol });
    }
  }, [disabled, navigation, selection, processedData, visibleColumns, editingCell, editable, handleEditComplete, onSelectionChange]);

  // Check if cell is in selection range
  const isCellSelected = useCallback((rowIndex: number, colIndex: number): boolean => {
    if (!selection) return false;
    
    const { row, column, endRow, endColumn } = selection;
    
    if (endRow !== undefined && endColumn !== undefined) {
      const minRow = Math.min(row, endRow);
      const maxRow = Math.max(row, endRow);
      const minCol = Math.min(column, endColumn);
      const maxCol = Math.max(column, endColumn);
      
      return rowIndex >= minRow && rowIndex <= maxRow && colIndex >= minCol && colIndex <= maxCol;
    }
    
    return row === rowIndex && column === colIndex;
  }, [selection]);

  // Check if cell is spanned
  const getCellSpan = useCallback((rowIndex: number, columnId: string): { rowspan?: number; colspan?: number; hidden?: boolean } => {
    for (const span of spans) {
      if (span.row === rowIndex && span.column === columnId) {
        return { rowspan: span.rowspan, colspan: span.colspan };
      }
      
      // Check if this cell is hidden by a span
      if (span.rowspan && span.colspan) {
        const spanEndRow = span.row + (span.rowspan - 1);
        const colIndex = visibleColumns.findIndex(c => c.id === span.column);
        const spanEndCol = colIndex + (span.colspan - 1);
        const currentColIndex = visibleColumns.findIndex(c => c.id === columnId);
        
        if (
          rowIndex >= span.row && rowIndex <= spanEndRow &&
          currentColIndex >= colIndex && currentColIndex <= spanEndCol &&
          !(rowIndex === span.row && columnId === span.column)
        ) {
          return { hidden: true };
        }
      }
    }
    return {};
  }, [spans, visibleColumns]);

  // Imperative handle
  useImperativeHandle(ref, () => ({
    getSheets: () => sheets.map(s => s.name),
    showSheet: (name: string) => {
      const index = sheets.findIndex(s => s.name === name);
      if (index >= 0) handleSheetChange(index);
    },
    getCurrentSheet: () => sheets[activeSheet]?.name || '',
    getData: () => data,
    setData: (newData: Record<string, any>[]) => {
      setData(newData);
      onDataLoad?.(newData);
    },
    getColumns: () => columns,
    setColumns: (newColumns: AvakioExcelViewerColumn[]) => setColumns(newColumns),
    getSelectedId: () => selection,
    select: (row: number, column: number, endRow?: number, endColumn?: number) => {
      setSelection({ row, column, endRow, endColumn });
      onSelectionChange?.({ row, column, endRow, endColumn });
    },
    clearSelection: () => {
      setSelection(null);
      onSelectionChange?.(null);
    },
    getCellValue: (rowIndex: number, columnId: string) => data[rowIndex]?.[columnId],
    setCellValue: (rowIndex: number, columnId: string, value: any) => {
      const newData = [...data];
      if (newData[rowIndex]) {
        newData[rowIndex] = { ...newData[rowIndex], [columnId]: value };
        setData(newData);
      }
    },
    addRow: (row: Record<string, any>, index?: number) => {
      const newData = [...data];
      if (index !== undefined) {
        newData.splice(index, 0, row);
      } else {
        newData.push(row);
      }
      setData(newData);
    },
    removeRow: (index: number) => {
      const newData = [...data];
      newData.splice(index, 1);
      setData(newData);
    },
    refresh: () => {
      setData([...data]);
    },
    getItem: (index: number) => data[index],
    count: () => data.length,
    showCell: (rowIndex: number, columnId: string) => {
      const cell = containerRef.current?.querySelector(`[data-row="${rowIndex}"][data-col="${columnId}"]`);
      cell?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
    },
    hideColumn: (columnId: string) => {
      setHiddenColumns(prev => new Set([...Array.from(prev), columnId]));
    },
    showColumn: (columnId: string) => {
      setHiddenColumns(prev => {
        const next = new Set(prev);
        next.delete(columnId);
        return next;
      });
    },
    isColumnVisible: (columnId: string) => !hiddenColumns.has(columnId),
    sort: (columnId: string, direction?: 'asc' | 'desc') => {
      const column = columns.find(c => c.id === columnId);
      if (column) {
        const dir = direction || (sortConfig?.columnId === columnId && sortConfig?.direction === 'asc' ? 'desc' : 'asc');
        setSortConfig({ columnId, direction: dir });
        onSort?.(column, dir);
      }
    },
    filter: (columnId: string, value: any, compare?: (cellValue: any, filterValue: any) => boolean) => {
      setFilterConfig({ columnId, value, compare });
    },
    clearFilter: () => {
      setFilterConfig(null);
    },
  }), [sheets, activeSheet, data, columns, selection, hiddenColumns, sortConfig, handleSheetChange, onDataLoad, onSelectionChange, onSort]);

  // Calculate table height
  const tableHeight = yCount ? yCount * rowHeight + headerRowHeight : undefined;

  return (
    <div
      ref={containerRef}
      id={id}
      data-testid={testId}
      className={`avakio-excel-viewer avakio-excel-viewer-theme-${theme} ${css || ''} ${disabled ? 'avakio-excel-viewer-disabled' : ''} ${gridLines ? 'avakio-excel-viewer-grid-lines' : ''}`}
      tabIndex={navigation ? 0 : -1}
      onKeyDown={handleKeyDown}
    >
      {toolbar && sheets.length > 1 && (
        <div className="avakio-excel-viewer-toolbar">
          {sheets.map((sheet, index) => (
            <button
              key={sheet.name}
              className={`avakio-excel-viewer-sheet-tab ${index === activeSheet ? 'active' : ''}`}
              onClick={() => handleSheetChange(index)}
              disabled={disabled}
            >
              {sheet.name}
            </button>
          ))}
        </div>
      )}
      
      <div 
        className="avakio-excel-viewer-table-container"
        style={{ maxHeight: tableHeight }}
      >
        <table 
          ref={tableRef}
          className="avakio-excel-viewer-table"
        >
          <thead className={freezeHeader ? 'avakio-excel-viewer-sticky-header' : ''}>
            <tr style={{ height: headerRowHeight }}>
              {showRowNumbers && (
                <th className="avakio-excel-viewer-row-number-header">#</th>
              )}
              {visibleColumns.map((column, colIndex) => (
                <th
                  key={column.id}
                  className={`avakio-excel-viewer-header-cell ${column.css || ''} ${column.sort ? 'sortable' : ''} ${sortConfig?.columnId === column.id ? `sorted-${sortConfig.direction}` : ''}`}
                  style={{
                    width: columnWidths[column.id] || column.width || columnWidth,
                    minWidth: column.minWidth,
                    maxWidth: column.maxWidth,
                    textAlign: column.align || 'left',
                  }}
                  onClick={() => handleHeaderClick(column)}
                >
                  <span className="avakio-excel-viewer-header-text">{column.header || column.id}</span>
                  {column.sort && sortConfig?.columnId === column.id && (
                    <span className="avakio-excel-viewer-sort-icon">
                      {sortConfig.direction === 'asc' ? '▲' : '▼'}
                    </span>
                  )}
                  {resizeColumn && (
                    <div
                      className="avakio-excel-viewer-resize-handle"
                      onMouseDown={(e) => handleColumnResizeStart(column.id, e)}
                    />
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {processedData.length === 0 ? (
              <tr>
                <td 
                  colSpan={visibleColumns.length + (showRowNumbers ? 1 : 0)}
                  className="avakio-excel-viewer-empty"
                >
                  No data available
                </td>
              </tr>
            ) : (
              processedData.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  style={{ height: rowHeights[rowIndex] || rowHeight }}
                  className={select === 'row' && selection?.row === rowIndex ? 'selected-row' : ''}
                >
                  {showRowNumbers && (
                    <td className="avakio-excel-viewer-row-number">{rowIndex + 1}</td>
                  )}
                  {visibleColumns.map((column, colIndex) => {
                    const span = getCellSpan(rowIndex, column.id);
                    if (span.hidden) return null;
                    
                    const isEditing = editingCell?.row === rowIndex && editingCell?.col === colIndex;
                    const isSelected = isCellSelected(rowIndex, colIndex);
                    const cellValue = row[column.id];
                    
                    return (
                      <td
                        key={column.id}
                        data-row={rowIndex}
                        data-col={column.id}
                        className={`avakio-excel-viewer-cell ${column.css || ''} ${isSelected ? 'selected' : ''} ${isEditing ? 'editing' : ''}`}
                        style={{
                          textAlign: column.align || 'left',
                          width: columnWidths[column.id] || column.width || columnWidth,
                        }}
                        rowSpan={span.rowspan}
                        colSpan={span.colspan}
                        onClick={(e) => handleCellClick(rowIndex, colIndex, e)}
                        onDoubleClick={() => handleCellDoubleClick(rowIndex, colIndex)}
                      >
                        {isEditing ? (
                          <input
                            type={column.editor === 'number' ? 'number' : 'text'}
                            className="avakio-excel-viewer-editor"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            onBlur={handleEditComplete}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                handleEditComplete();
                              } else if (e.key === 'Escape') {
                                setEditingCell(null);
                                setEditValue('');
                              }
                              e.stopPropagation();
                            }}
                            autoFocus
                          />
                        ) : column.template ? (
                          column.template(row, column)
                        ) : (
                          <span className="avakio-excel-viewer-cell-text">
                            {cellValue !== undefined && cellValue !== null ? String(cellValue) : ''}
                          </span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
});

AvakioExcelViewer.displayName = 'AvakioExcelViewer';

export default AvakioExcelViewer;












