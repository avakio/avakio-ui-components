import React, { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import "./avakio-grouplist.css";

export interface GroupListItem {
  /** Unique identifier for the item */
  id: string | number;
  /** Display value/label for the item */
  value: string;
  /** Optional icon to display */
  icon?: React.ReactNode;
  /** Child items - presence indicates this is a group header */
  data?: GroupListItem[];
  /** Whether the item is disabled */
  disabled?: boolean;
  /** Additional CSS class */
  className?: string;
  /** Any additional data to store */
  [key: string]: any;
}

export interface GroupListOpenState {
  /** Array of parent IDs from root to current level */
  parents: (string | number)[];
  /** Items in the currently displayed branch */
  branch: GroupListItem[];
}

export interface AvakioGroupListProps {
  /** Data source - hierarchical array of items */
  data: GroupListItem[];
  /** Currently selected item ID */
  value?: string | number | null;
  /** Default selected item ID (uncontrolled) */
  defaultValue?: string | number | null;
  /** Callback when an item is selected */
  onSelect?: (item: GroupListItem) => void;
  /** Callback when selection changes (item or null if navigating) */
  onChange?: (value: string | number | null, item: GroupListItem | null) => void;
  /** Callback when navigation state changes */
  onNavigate?: (state: GroupListOpenState) => void;
  /** Custom template for rendering items (leaf nodes) */
  templateItem?: (item: GroupListItem) => React.ReactNode;
  /** Custom template for rendering group headers (collapsed state - shows arrow) */
  templateGroup?: (item: GroupListItem, count: number) => React.ReactNode;
  /** Custom template for back button header (expanded state) */
  templateBack?: (item: GroupListItem, count: number) => React.ReactNode;
  /** Enable/disable item selection */
  select?: boolean;
  /** Enable animation when navigating */
  animate?: boolean;
  /** Animation duration in ms */
  animationDuration?: number;
  /** Show back navigation button */
  showBack?: boolean;
  /** Custom back button label */
  backLabel?: string;
  /** Width of the component */
  width?: number | string;
  /** Height of the component */
  height?: number | string;
  /** Enable scrolling */
  scroll?: boolean;
  /** Additional CSS class */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Component ID */
  id?: string;
  /** Test ID for testing */
  testId?: string;
}

export function AvakioGroupList({
  data,
  value: controlledValue,
  defaultValue,
  onSelect,
  onChange,
  onNavigate,
  templateItem,
  templateGroup,
  templateBack,
  select = true,
  animate = true,
  animationDuration = 250,
  showBack = true,
  backLabel = "Back",
  width,
  height,
  scroll = true,
  className,
  style,
  id,
  testId,
}: AvakioGroupListProps) {
  // Track navigation stack (array of parent IDs)
  const [parentStack, setParentStack] = useState<(string | number)[]>([]);
  // Track current branch items
  const [currentBranch, setCurrentBranch] = useState<GroupListItem[]>(data);
  // Internal selected value for uncontrolled mode
  const [internalValue, setInternalValue] = useState<string | number | null>(defaultValue ?? null);
  // Animation state
  const [animating, setAnimating] = useState(false);
  const [animationDirection, setAnimationDirection] = useState<'forward' | 'backward'>('forward');
  
  const containerRef = useRef<HTMLDivElement>(null);

  // Controlled vs uncontrolled
  const selectedValue = controlledValue !== undefined ? controlledValue : internalValue;

  // Get items at a specific path
  const getItemsAtPath = useCallback((path: (string | number)[]): GroupListItem[] => {
    let items = data;
    for (const parentId of path) {
      const parent = items.find(item => item.id === parentId);
      if (parent?.data) {
        items = parent.data;
      } else {
        return [];
      }
    }
    return items;
  }, [data]);

  // Get parent item at current level
  const getCurrentParent = useCallback((): GroupListItem | null => {
    if (parentStack.length === 0) return null;
    
    let items = data;
    let parent: GroupListItem | null = null;
    
    for (const parentId of parentStack) {
      parent = items.find(item => item.id === parentId) || null;
      if (parent?.data) {
        items = parent.data;
      }
    }
    
    return parent;
  }, [data, parentStack]);

  // Navigate into a group
  const navigateInto = useCallback((item: GroupListItem) => {
    if (!item.data || item.disabled) return;
    
    if (animate) {
      setAnimating(true);
      setAnimationDirection('forward');
    }
    
    const newStack = [...parentStack, item.id];
    setParentStack(newStack);
    
    setTimeout(() => {
      setCurrentBranch(item.data!);
      setAnimating(false);
      
      onNavigate?.({
        parents: newStack,
        branch: item.data!,
      });
    }, animate ? animationDuration : 0);
  }, [parentStack, animate, animationDuration, onNavigate]);

  // Navigate back one level
  const navigateBack = useCallback(() => {
    if (parentStack.length === 0) return;
    
    if (animate) {
      setAnimating(true);
      setAnimationDirection('backward');
    }
    
    const newStack = parentStack.slice(0, -1);
    setParentStack(newStack);
    
    setTimeout(() => {
      const items = getItemsAtPath(newStack);
      setCurrentBranch(items);
      setAnimating(false);
      
      onNavigate?.({
        parents: newStack,
        branch: items,
      });
    }, animate ? animationDuration : 0);
  }, [parentStack, animate, animationDuration, getItemsAtPath, onNavigate]);

  // Handle item click
  const handleItemClick = useCallback((item: GroupListItem) => {
    if (item.disabled) return;
    
    // If item has children, navigate into it
    if (item.data && item.data.length > 0) {
      navigateInto(item);
    } else if (select) {
      // Select the item
      setInternalValue(item.id);
      onSelect?.(item);
      onChange?.(item.id, item);
    }
  }, [navigateInto, select, onSelect, onChange]);

  // Get open state
  const getOpenState = useCallback((): GroupListOpenState => ({
    parents: parentStack,
    branch: currentBranch,
  }), [parentStack, currentBranch]);

  // Set open state programmatically
  const setOpenState = useCallback((itemId: string | number) => {
    // Find path to item
    const findPath = (items: GroupListItem[], targetId: string | number, path: (string | number)[]): (string | number)[] | null => {
      for (const item of items) {
        if (item.id === targetId) {
          return path;
        }
        if (item.data) {
          const result = findPath(item.data, targetId, [...path, item.id]);
          if (result) return result;
        }
      }
      return null;
    };
    
    const path = findPath(data, itemId, []);
    if (path) {
      setParentStack(path);
      const items = getItemsAtPath(path);
      setCurrentBranch(items);
    }
  }, [data, getItemsAtPath]);

  // Reset to root level when data changes
  useEffect(() => {
    setParentStack([]);
    setCurrentBranch(data);
  }, [data]);

  // Render a single item
  const renderItem = useCallback((item: GroupListItem) => {
    const isGroup = item.data && item.data.length > 0;
    const isSelected = selectedValue === item.id;
    const itemCount = item.data?.length || 0;
    
    const itemClass = [
      'avakio-grouplist-item',
      isGroup && 'avakio-grouplist-item-group',
      isSelected && 'avakio-grouplist-item-selected',
      item.disabled && 'avakio-grouplist-item-disabled',
      item.className,
    ].filter(Boolean).join(' ');

    return (
      <div
        key={item.id}
        className={itemClass}
        onClick={() => handleItemClick(item)}
        role={isGroup ? 'button' : 'option'}
        aria-selected={isSelected}
        aria-disabled={item.disabled}
        tabIndex={item.disabled ? -1 : 0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleItemClick(item);
          }
        }}
      >
        <div className="avakio-grouplist-item-content">
          {item.icon && <span className="avakio-grouplist-item-icon">{item.icon}</span>}
          <span className="avakio-grouplist-item-value">
            {isGroup
              ? (templateGroup ? templateGroup(item, itemCount) : item.value)
              : (templateItem ? templateItem(item) : item.value)
            }
          </span>
          {isGroup && <span className="avakio-grouplist-item-count">({itemCount})</span>}
        </div>
        {isGroup && (
          <ChevronRight className="avakio-grouplist-item-arrow" size={18} />
        )}
      </div>
    );
  }, [selectedValue, templateItem, templateGroup, handleItemClick]);

  // Render back header
  const renderBackHeader = useCallback(() => {
    if (!showBack || parentStack.length === 0) return null;
    
    const currentParent = getCurrentParent();
    const itemCount = currentBranch.length;
    
    return (
      <div
        className="avakio-grouplist-back"
        onClick={navigateBack}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            navigateBack();
          }
        }}
      >
        <ChevronLeft className="avakio-grouplist-back-arrow" size={18} />
        <span className="avakio-grouplist-back-content">
          {currentParent && templateBack
            ? templateBack(currentParent, itemCount)
            : (currentParent?.value || backLabel)
          }
        </span>
        <span className="avakio-grouplist-back-count">({itemCount})</span>
      </div>
    );
  }, [showBack, parentStack, currentBranch, getCurrentParent, navigateBack, templateBack, backLabel]);

  // Build class names
  const containerClass = useMemo(() => [
    'avakio-grouplist',
    animating && `avakio-grouplist-animating avakio-grouplist-${animationDirection}`,
    scroll && 'avakio-grouplist-scroll',
    className,
  ].filter(Boolean).join(' '), [animating, animationDirection, scroll, className]);

  // Build styles
  const containerStyle: React.CSSProperties = useMemo(() => ({
    ...style,
    ...(width !== undefined ? { width: typeof width === 'number' ? `${width}px` : width } : {}),
    ...(height !== undefined ? { height: typeof height === 'number' ? `${height}px` : height } : {}),
    ...(animate ? { '--grouplist-animation-duration': `${animationDuration}ms` } as React.CSSProperties : {}),
  }), [style, width, height, animate, animationDuration]);

  return (
    <div
      ref={containerRef}
      id={id}
      data-testid={testId}
      className={containerClass}
      style={containerStyle}
      role="listbox"
      aria-label="Group list"
    >
      {renderBackHeader()}
      <div className="avakio-grouplist-items">
        {currentBranch.map(renderItem)}
      </div>
    </div>
  );
}










