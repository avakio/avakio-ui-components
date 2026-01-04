import React, { useState, useRef, useCallback, useMemo } from 'react';
import { ChevronRight, ChevronLeft, ChevronsRight, ChevronsLeft, Search, GripVertical } from 'lucide-react';
import { cn } from '@/lib/utils';
import './avakio-doublelist.css';

export interface AvakioDoubleListItem {
  id: string;
  value: string;
  disabled?: boolean;
}

export interface AvakioDoubleListProps {
  /** Array of all available items */
  data: AvakioDoubleListItem[];
  /** Array of selected item IDs (items in the right list) */
  value: string[];
  /** Callback when selection changes */
  onChange: (selectedIds: string[]) => void;
  /** Label for the left list */
  labelLeft?: string;
  /** Label for the right list */
  labelRight?: string;
  /** Label at the bottom of the left list */
  labelBottomLeft?: string;
  /** Label at the bottom of the right list */
  labelBottomRight?: string;
  /** Whether to show the control buttons between lists */
  showButtons?: boolean;
  /** Whether to enable search/filter in lists */
  searchable?: boolean;
  /** Whether to enable drag and drop */
  draggable?: boolean;
  /** Whether the component is disabled */
  disabled?: boolean;
  /** Custom height for the lists */
  listHeight?: number | string;
  /** Unique ID for the component */
  id?: string;
  /** Test ID for testing purposes */
  testId?: string;
  /** Custom class name */
  className?: string;
}

export function AvakioDoubleList({
  data,
  value = [],
  onChange,
  labelLeft = "Available",
  labelRight = "Selected",
  labelBottomLeft,
  labelBottomRight,
  showButtons = true,
  searchable = true,
  draggable = true,
  disabled = false,
  listHeight = 300,
  id,
  testId,
  className,
}: AvakioDoubleListProps) {
  const [leftSearch, setLeftSearch] = useState('');
  const [rightSearch, setRightSearch] = useState('');
  const [leftSelection, setLeftSelection] = useState<string[]>([]);
  const [rightSelection, setRightSelection] = useState<string[]>([]);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [dragOverSide, setDragOverSide] = useState<'left' | 'right' | null>(null);

  const leftListRef = useRef<HTMLDivElement>(null);
  const rightListRef = useRef<HTMLDivElement>(null);

  // Compute left and right lists
  const selectedSet = useMemo(() => new Set(value), [value]);
  
  const leftItems = useMemo(() => 
    data.filter(item => !selectedSet.has(item.id)),
    [data, selectedSet]
  );
  
  const rightItems = useMemo(() => 
    data.filter(item => selectedSet.has(item.id)),
    [data, selectedSet]
  );

  // Filter items based on search
  const filteredLeftItems = useMemo(() => {
    if (!leftSearch.trim()) return leftItems;
    const search = leftSearch.toLowerCase();
    return leftItems.filter(item => item.value.toLowerCase().includes(search));
  }, [leftItems, leftSearch]);

  const filteredRightItems = useMemo(() => {
    if (!rightSearch.trim()) return rightItems;
    const search = rightSearch.toLowerCase();
    return rightItems.filter(item => item.value.toLowerCase().includes(search));
  }, [rightItems, rightSearch]);

  // Move items to right (select)
  const moveToRight = useCallback((ids: string[]) => {
    const validIds = ids.filter(id => {
      const item = data.find(d => d.id === id);
      return item && !item.disabled && !selectedSet.has(id);
    });
    if (validIds.length > 0) {
      onChange([...value, ...validIds]);
      setLeftSelection([]);
    }
  }, [data, selectedSet, value, onChange]);

  // Move items to left (deselect)
  const moveToLeft = useCallback((ids: string[]) => {
    const idsToRemove = new Set(ids.filter(id => {
      const item = data.find(d => d.id === id);
      return item && !item.disabled;
    }));
    if (idsToRemove.size > 0) {
      onChange(value.filter(id => !idsToRemove.has(id)));
      setRightSelection([]);
    }
  }, [data, value, onChange]);

  // Move all to right
  const moveAllToRight = useCallback(() => {
    const newIds = leftItems
      .filter(item => !item.disabled)
      .map(item => item.id);
    onChange([...value, ...newIds]);
    setLeftSelection([]);
  }, [leftItems, value, onChange]);

  // Move all to left
  const moveAllToLeft = useCallback(() => {
    const disabledIds = rightItems
      .filter(item => item.disabled)
      .map(item => item.id);
    onChange(disabledIds);
    setRightSelection([]);
  }, [rightItems, onChange]);

  // Handle item click with multi-select support
  const handleItemClick = useCallback((
    itemId: string,
    side: 'left' | 'right',
    event: React.MouseEvent
  ) => {
    const item = data.find(d => d.id === itemId);
    if (!item || item.disabled || disabled) return;

    const setSelection = side === 'left' ? setLeftSelection : setRightSelection;
    const selection = side === 'left' ? leftSelection : rightSelection;

    if (event.ctrlKey || event.metaKey) {
      // Toggle single item
      setSelection(prev =>
        prev.includes(itemId)
          ? prev.filter(id => id !== itemId)
          : [...prev, itemId]
      );
    } else if (event.shiftKey && selection.length > 0) {
      // Range selection
      const items = side === 'left' ? filteredLeftItems : filteredRightItems;
      const lastSelected = selection[selection.length - 1];
      const lastIndex = items.findIndex(i => i.id === lastSelected);
      const currentIndex = items.findIndex(i => i.id === itemId);
      
      if (lastIndex !== -1 && currentIndex !== -1) {
        const start = Math.min(lastIndex, currentIndex);
        const end = Math.max(lastIndex, currentIndex);
        const rangeIds = items
          .slice(start, end + 1)
          .filter(i => !i.disabled)
          .map(i => i.id);
        setSelection(rangeIds);
      }
    } else {
      // Single selection
      setSelection([itemId]);
    }
  }, [data, disabled, leftSelection, rightSelection, filteredLeftItems, filteredRightItems]);

  // Handle double-click to move item
  const handleItemDoubleClick = useCallback((itemId: string, side: 'left' | 'right') => {
    if (disabled) return;
    if (side === 'left') {
      moveToRight([itemId]);
    } else {
      moveToLeft([itemId]);
    }
  }, [disabled, moveToRight, moveToLeft]);

  // Drag and drop handlers
  const handleDragStart = useCallback((e: React.DragEvent, itemId: string) => {
    if (!draggable || disabled) return;
    e.dataTransfer.setData('text/plain', itemId);
    e.dataTransfer.effectAllowed = 'move';
    setDraggedItem(itemId);
  }, [draggable, disabled]);

  const handleDragEnd = useCallback(() => {
    setDraggedItem(null);
    setDragOverSide(null);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent, side: 'left' | 'right') => {
    if (!draggable || disabled) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverSide(side);
  }, [draggable, disabled]);

  const handleDragLeave = useCallback(() => {
    setDragOverSide(null);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent, side: 'left' | 'right') => {
    if (!draggable || disabled) return;
    e.preventDefault();
    const itemId = e.dataTransfer.getData('text/plain');
    
    if (itemId) {
      const isCurrentlySelected = selectedSet.has(itemId);
      
      if (side === 'right' && !isCurrentlySelected) {
        moveToRight([itemId]);
      } else if (side === 'left' && isCurrentlySelected) {
        moveToLeft([itemId]);
      }
    }
    
    setDraggedItem(null);
    setDragOverSide(null);
  }, [draggable, disabled, selectedSet, moveToRight, moveToLeft]);

  // Render list item
  const renderItem = (item: AvakioDoubleListItem, side: 'left' | 'right') => {
    const selection = side === 'left' ? leftSelection : rightSelection;
    const isSelected = selection.includes(item.id);
    const isDragging = draggedItem === item.id;

    return (
      <div
        key={item.id}
        className={cn(
          'avakio-doublelist-item',
          isSelected && 'avakio-doublelist-item-selected',
          item.disabled && 'avakio-doublelist-item-disabled',
          isDragging && 'avakio-doublelist-item-dragging'
        )}
        onClick={(e) => handleItemClick(item.id, side, e)}
        onDoubleClick={() => handleItemDoubleClick(item.id, side)}
        draggable={draggable && !item.disabled && !disabled}
        onDragStart={(e) => handleDragStart(e, item.id)}
        onDragEnd={handleDragEnd}
        data-item-id={item.id}
      >
        {draggable && !item.disabled && !disabled && (
          <GripVertical size={14} className="avakio-doublelist-drag-handle" />
        )}
        <span className="avakio-doublelist-item-text">{item.value}</span>
      </div>
    );
  };

  const listStyle = { height: typeof listHeight === 'number' ? `${listHeight}px` : listHeight };

  return (
    <div
      id={id}
      data-testid={testId}
      className={cn(
        'avakio-doublelist',
        disabled && 'avakio-doublelist-disabled',
        className
      )}
    >
      {/* Left Panel */}
      <div className="avakio-doublelist-panel">
        {labelLeft && (
          <div className="avakio-doublelist-label avakio-doublelist-label-top">
            {labelLeft}
            <span className="avakio-doublelist-count">({filteredLeftItems.length})</span>
          </div>
        )}
        
        {searchable && (
          <div className="avakio-doublelist-search">
            <Search size={14} className="avakio-doublelist-search-icon" />
            <input
              type="text"
              placeholder="Search..."
              value={leftSearch}
              onChange={(e) => setLeftSearch(e.target.value)}
              disabled={disabled}
              className="avakio-doublelist-search-input"
            />
          </div>
        )}
        
        <div
          ref={leftListRef}
          className={cn(
            'avakio-doublelist-list',
            dragOverSide === 'left' && 'avakio-doublelist-list-dragover'
          )}
          style={listStyle}
          onDragOver={(e) => handleDragOver(e, 'left')}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, 'left')}
        >
          {filteredLeftItems.length === 0 ? (
            <div className="avakio-doublelist-empty">
              {leftSearch ? 'No matches found' : 'No items available'}
            </div>
          ) : (
            filteredLeftItems.map(item => renderItem(item, 'left'))
          )}
        </div>
        
        {labelBottomLeft && (
          <div className="avakio-doublelist-label avakio-doublelist-label-bottom">
            {labelBottomLeft}
          </div>
        )}
      </div>

      {/* Buttons */}
      {showButtons && (
        <div className="avakio-doublelist-buttons">
          <button
            type="button"
            className="avakio-doublelist-btn"
            onClick={() => moveToRight(leftSelection)}
            disabled={disabled || leftSelection.length === 0}
            title="Move selected to right"
          >
            <ChevronRight size={18} />
          </button>
          <button
            type="button"
            className="avakio-doublelist-btn"
            onClick={moveAllToRight}
            disabled={disabled || leftItems.filter(i => !i.disabled).length === 0}
            title="Move all to right"
          >
            <ChevronsRight size={18} />
          </button>
          <button
            type="button"
            className="avakio-doublelist-btn"
            onClick={() => moveToLeft(rightSelection)}
            disabled={disabled || rightSelection.length === 0}
            title="Move selected to left"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            className="avakio-doublelist-btn"
            onClick={moveAllToLeft}
            disabled={disabled || rightItems.filter(i => !i.disabled).length === 0}
            title="Move all to left"
          >
            <ChevronsLeft size={18} />
          </button>
        </div>
      )}

      {/* Right Panel */}
      <div className="avakio-doublelist-panel">
        {labelRight && (
          <div className="avakio-doublelist-label avakio-doublelist-label-top">
            {labelRight}
            <span className="avakio-doublelist-count">({filteredRightItems.length})</span>
          </div>
        )}
        
        {searchable && (
          <div className="avakio-doublelist-search">
            <Search size={14} className="avakio-doublelist-search-icon" />
            <input
              type="text"
              placeholder="Search..."
              value={rightSearch}
              onChange={(e) => setRightSearch(e.target.value)}
              disabled={disabled}
              className="avakio-doublelist-search-input"
            />
          </div>
        )}
        
        <div
          ref={rightListRef}
          className={cn(
            'avakio-doublelist-list',
            dragOverSide === 'right' && 'avakio-doublelist-list-dragover'
          )}
          style={listStyle}
          onDragOver={(e) => handleDragOver(e, 'right')}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, 'right')}
        >
          {filteredRightItems.length === 0 ? (
            <div className="avakio-doublelist-empty">
              {rightSearch ? 'No matches found' : 'No items selected'}
            </div>
          ) : (
            filteredRightItems.map(item => renderItem(item, 'right'))
          )}
        </div>
        
        {labelBottomRight && (
          <div className="avakio-doublelist-label avakio-doublelist-label-bottom">
            {labelBottomRight}
          </div>
        )}
      </div>
    </div>
  );
}

export default AvakioDoubleList;











