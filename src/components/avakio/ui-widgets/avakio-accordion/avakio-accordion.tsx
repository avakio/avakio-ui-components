import React, { forwardRef, useImperativeHandle, useState, useRef, useEffect, useCallback, useId } from 'react';
import { AvakioChangeEvent } from '../../base/avakio-base-props';
import './avakio-accordion.css';
import { ChevronRight, ChevronDown } from 'lucide-react';

export type AvakioAccordionTheme = 'material' | 'flat' | 'compact' | 'dark' | 'ocean' | 'sunset';

export type AvakioAccordionMultiMode = boolean | 'mixed';

export interface AvakioAccordionItem {
  /** Unique identifier for the item */
  id: string | number;
  /** Header text or element */
  header: React.ReactNode;
  /** Body content */
  body: React.ReactNode;
  /** Whether this item is initially collapsed */
  collapsed?: boolean;
  /** Whether this item is disabled */
  disabled?: boolean;
  /** Custom icon for the header */
  icon?: React.ReactNode;
  /** CSS class for this item */
  css?: string;
  /** Whether this item header is visible */
  headerVisible?: boolean;
}

export interface AvakioAccordionProps {
  /** Unique identifier */
  id?: string;
  /** Test ID for testing */
  testId?: string;
  /** Accordion items */
  items: AvakioAccordionItem[];
  /** 
   * Multi-expand mode:
   * - true: all panels can be expanded/collapsed at a time
   * - false: only one panel can be visible at a time (default)
   * - 'mixed': all panels can be expanded at a time, but one must remain visible
   */
  multi?: AvakioAccordionMultiMode;
  /** Layout type (horizontal or vertical) */
  type?: 'rows' | 'cols';
  /** Theme */
  theme?: AvakioAccordionTheme;
  /** Show icons on headers */
  showIcons?: boolean;
  /** Custom toggle icon for collapsed state */
  collapseIcon?: React.ReactNode;
  /** Custom toggle icon for expanded state */
  expandIcon?: React.ReactNode;
  /** Enable animation */
  animate?: boolean;
  /** Width */
  width?: number | string;
  /** Height */
  height?: number | string;
  /** Minimum width */
  minWidth?: number | string;
  /** Minimum height */
  minHeight?: number | string;
  /** CSS class */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Callback when an item is expanded */
  onExpand?: (id: string | number) => void;
  /** Callback when an item is collapsed */
  onCollapse?: (id: string | number) => void;
  /** Callback fired when expanded state changes. Receives { id, value } where value is expandedIds array */
  onChange?: (event: AvakioChangeEvent<(string | number)[]>) => void;
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
}

export interface AvakioAccordionRef {
  /** Get IDs of expanded items */
  getExpandedIds: () => (string | number)[];
  /** Expand an item by ID */
  expand: (id: string | number) => void;
  /** Collapse an item by ID */
  collapse: (id: string | number) => void;
  /** Toggle an item by ID */
  toggle: (id: string | number) => void;
  /** Expand all items */
  expandAll: () => void;
  /** Collapse all items */
  collapseAll: () => void;
  /** Check if an item is expanded */
  isExpanded: (id: string | number) => boolean;
  /** Check if an item is disabled */
  isDisabled: (id: string | number) => boolean;
  /** Enable an item */
  enable: (id: string | number) => void;
  /** Disable an item */
  disable: (id: string | number) => void;
}

export const AvakioAccordion = forwardRef<AvakioAccordionRef, AvakioAccordionProps>(
  (props, ref) => {
    const {
      id,
      testId,
      items,
      multi = false,
      type = 'rows',
      theme = 'material',
      showIcons = true,
      collapseIcon,
      expandIcon,
      animate = true,
      width,
      height,
      minWidth,
      minHeight,
      maxWidth,
      maxHeight,
      borderless = false,
      disabled = false,
      hidden = false,
      className = '',
      style,
      onExpand,
      onCollapse,
      onChange,
    } = props;

    const generatedId = useId();
    const accordionId = id || generatedId;
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRefs = useRef<Map<string | number, HTMLDivElement>>(new Map());

    // Initialize expanded state based on items' collapsed property
    const getInitialExpandedIds = useCallback(() => {
      const expanded: (string | number)[] = [];
      items.forEach((item) => {
        if (!item.collapsed && item.headerVisible !== false) {
          expanded.push(item.id);
        }
      });
      // If multi is false and no items are expanded, expand the first non-disabled item
      if (expanded.length === 0 && multi === false) {
        const firstEnabled = items.find((item) => !item.disabled && item.headerVisible !== false);
        if (firstEnabled) {
          expanded.push(firstEnabled.id);
        }
      }
      return expanded;
    }, [items, multi]);

    const [expandedIds, setExpandedIds] = useState<(string | number)[]>(getInitialExpandedIds);
    const [disabledIds, setDisabledIds] = useState<Set<string | number>>(() => {
      return new Set(items.filter((item) => item.disabled).map((item) => item.id));
    });

    // Update state when items change
    useEffect(() => {
      setExpandedIds(getInitialExpandedIds());
      setDisabledIds(new Set(items.filter((item) => item.disabled).map((item) => item.id)));
    }, [items, getInitialExpandedIds]);

    // Handle item toggle
    const handleToggle = useCallback(
      (itemId: string | number) => {
        if (disabledIds.has(itemId)) return;

        setExpandedIds((prev) => {
          const isCurrentlyExpanded = prev.includes(itemId);
          let newExpandedIds: (string | number)[];

          if (isCurrentlyExpanded) {
            // Collapsing
            if (multi === false) {
              // In single mode, always keep one item open
              // Find another non-disabled item to expand
              const otherItem = items.find(
                (item) => item.id !== itemId && !disabledIds.has(item.id) && item.headerVisible !== false
              );
              newExpandedIds = otherItem ? [otherItem.id] : prev;
            } else if (multi === 'mixed') {
              // In mixed mode, prevent closing the last item
              if (prev.length <= 1) {
                return prev;
              }
              newExpandedIds = prev.filter((id) => id !== itemId);
            } else {
              // In multi mode, allow collapsing
              newExpandedIds = prev.filter((id) => id !== itemId);
            }
            if (newExpandedIds !== prev) {
              onCollapse?.(itemId);
            }
          } else {
            // Expanding
            if (multi === false) {
              // In single mode, collapse others
              prev.forEach((id) => {
                if (id !== itemId) {
                  onCollapse?.(id);
                }
              });
              newExpandedIds = [itemId];
            } else {
              // In multi or mixed mode, add to expanded
              newExpandedIds = [...prev, itemId];
            }
            onExpand?.(itemId);
          }

          if (newExpandedIds !== prev) {
            onChange?.({ id: id || '0', value: newExpandedIds });
          }
          return newExpandedIds;
        });
      },
      [multi, items, disabledIds, onExpand, onCollapse, onChange, id]
    );

    // Handle keyboard navigation
    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent, itemId: string | number, index: number) => {
        const enabledItems = items.filter(
          (item) => !disabledIds.has(item.id) && item.headerVisible !== false
        );
        const currentIndex = enabledItems.findIndex((item) => item.id === itemId);

        switch (e.key) {
          case 'Enter':
          case ' ':
            e.preventDefault();
            handleToggle(itemId);
            break;
          case 'ArrowDown':
          case 'ArrowRight':
            e.preventDefault();
            if (currentIndex < enabledItems.length - 1) {
              const nextItem = enabledItems[currentIndex + 1];
              const nextHeader = containerRef.current?.querySelector(
                `[data-item-id="${nextItem.id}"] .avakio-accordion-header`
              ) as HTMLElement;
              nextHeader?.focus();
            }
            break;
          case 'ArrowUp':
          case 'ArrowLeft':
            e.preventDefault();
            if (currentIndex > 0) {
              const prevItem = enabledItems[currentIndex - 1];
              const prevHeader = containerRef.current?.querySelector(
                `[data-item-id="${prevItem.id}"] .avakio-accordion-header`
              ) as HTMLElement;
              prevHeader?.focus();
            }
            break;
          case 'Home':
            e.preventDefault();
            if (enabledItems.length > 0) {
              const firstItem = enabledItems[0];
              const firstHeader = containerRef.current?.querySelector(
                `[data-item-id="${firstItem.id}"] .avakio-accordion-header`
              ) as HTMLElement;
              firstHeader?.focus();
            }
            break;
          case 'End':
            e.preventDefault();
            if (enabledItems.length > 0) {
              const lastItem = enabledItems[enabledItems.length - 1];
              const lastHeader = containerRef.current?.querySelector(
                `[data-item-id="${lastItem.id}"] .avakio-accordion-header`
              ) as HTMLElement;
              lastHeader?.focus();
            }
            break;
        }
      },
      [items, disabledIds, handleToggle]
    );

    // Imperative handle
    useImperativeHandle(ref, () => ({
      getExpandedIds: () => expandedIds,
      expand: (itemId: string | number) => {
        if (!expandedIds.includes(itemId) && !disabledIds.has(itemId)) {
          handleToggle(itemId);
        }
      },
      collapse: (itemId: string | number) => {
        if (expandedIds.includes(itemId)) {
          handleToggle(itemId);
        }
      },
      toggle: (itemId: string | number) => {
        if (!disabledIds.has(itemId)) {
          handleToggle(itemId);
        }
      },
      expandAll: () => {
        if (multi === true) {
          const allIds = items
            .filter((item) => !disabledIds.has(item.id) && item.headerVisible !== false)
            .map((item) => item.id);
          setExpandedIds(allIds);
          allIds.forEach((itemId) => {
            if (!expandedIds.includes(itemId)) {
              onExpand?.(itemId);
            }
          });
          onChange?.({ id: id || '0', value: allIds });
        }
      },
      collapseAll: () => {
        if (multi === true) {
          expandedIds.forEach((itemId) => onCollapse?.(itemId));
          setExpandedIds([]);
          onChange?.({ id: id || '0', value: [] });
        } else if (multi === 'mixed') {
          // Keep only the first expanded item
          const firstExpanded = expandedIds[0];
          if (firstExpanded) {
            expandedIds.slice(1).forEach((itemId) => onCollapse?.(itemId));
            setExpandedIds([firstExpanded]);
            onChange?.({ id: id || '0', value: [firstExpanded] });
          }
        }
      },
      isExpanded: (itemId: string | number) => expandedIds.includes(itemId),
      isDisabled: (itemId: string | number) => disabledIds.has(itemId),
      enable: (itemId: string | number) => {
        setDisabledIds((prev) => {
          const newSet = new Set(prev);
          newSet.delete(itemId);
          return newSet;
        });
      },
      disable: (itemId: string | number) => {
        setDisabledIds((prev) => new Set(prev).add(itemId));
      },
    }), [expandedIds, disabledIds, items, multi, handleToggle, onExpand, onCollapse, onChange]);

    // Render toggle icon
    const renderToggleIcon = (isExpanded: boolean) => {
      if (!showIcons) return null;

      if (isExpanded) {
        return expandIcon || <ChevronDown size={18} />;
      }
      return collapseIcon || <ChevronRight size={18} />;
    };

    // Build class names
    const containerClasses = [
      'avakio-accordion',
      `avakio-accordion--${theme}`,
      `avakio-accordion--${type}`,
      animate && 'avakio-accordion--animated',
      borderless && 'avakio-accordion--borderless',
      disabled && 'avakio-accordion--disabled',
      hidden && 'avakio-accordion--hidden',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    // Build style
    const containerStyle: React.CSSProperties = {
      width: typeof width === 'number' ? `${width}px` : width,
      height: typeof height === 'number' ? `${height}px` : height,
      ...style,
      ...(minWidth && { minWidth: typeof minWidth === 'number' ? `${minWidth}px` : minWidth }),
      ...(minHeight && { minHeight: typeof minHeight === 'number' ? `${minHeight}px` : minHeight }),
      ...(maxWidth && { maxWidth: typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth }),
      ...(maxHeight && { maxHeight: typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight }),
      ...(hidden && { display: 'none' }),
    };

    return (
      <div
        ref={containerRef}
        id={accordionId}
        data-testid={testId}
        className={containerClasses}
        style={containerStyle}
        role="presentation"
      >
        {items.map((item, index) => {
          const isExpanded = expandedIds.includes(item.id);
          const isDisabled = disabledIds.has(item.id);
          const headerVisible = item.headerVisible !== false;

          const itemClasses = [
            'avakio-accordion-item',
            isExpanded && 'avakio-accordion-item--expanded',
            isDisabled && 'avakio-accordion-item--disabled',
            !headerVisible && 'avakio-accordion-item--no-header',
            item.css,
          ]
            .filter(Boolean)
            .join(' ');

          const headerId = `${accordionId}-header-${item.id}`;
          const panelId = `${accordionId}-panel-${item.id}`;

          return (
            <div
              key={item.id}
              className={itemClasses}
              data-item-id={item.id}
            >
              {headerVisible && (
                <div
                  id={headerId}
                  className="avakio-accordion-header"
                  role="button"
                  tabIndex={isDisabled ? -1 : 0}
                  aria-expanded={isExpanded}
                  aria-controls={panelId}
                  aria-disabled={isDisabled}
                  onClick={() => handleToggle(item.id)}
                  onKeyDown={(e) => handleKeyDown(e, item.id, index)}
                >
                  <span className="avakio-accordion-toggle">
                    {renderToggleIcon(isExpanded)}
                  </span>
                  {item.icon && (
                    <span className="avakio-accordion-icon">{item.icon}</span>
                  )}
                  <span className="avakio-accordion-header-text">{item.header}</span>
                </div>
              )}
              <div
                id={panelId}
                ref={(el) => {
                  if (el) {
                    contentRefs.current.set(item.id, el);
                  } else {
                    contentRefs.current.delete(item.id);
                  }
                }}
                className="avakio-accordion-content"
                role="region"
                aria-labelledby={headerId}
                aria-hidden={!isExpanded}
                style={{
                  maxHeight: isExpanded ? undefined : 0,
                  overflow: isExpanded ? 'visible' : 'hidden',
                }}
              >
                <div className="avakio-accordion-body">{item.body}</div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
);

AvakioAccordion.displayName = 'AvakioAccordion';

export default AvakioAccordion;











