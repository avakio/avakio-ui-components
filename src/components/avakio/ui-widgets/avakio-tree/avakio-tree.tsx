import React, { forwardRef, useImperativeHandle, useState, useRef, useEffect, useCallback, useId } from 'react';
import './avakio-tree.css';
import { ChevronRight, ChevronDown, Folder, FolderOpen, File, Check, Minus } from 'lucide-react';

export type AvakioTreeTheme = 'material' | 'flat' | 'compact' | 'dark' | 'ocean' | 'sunset';

export interface AvakioTreeNode {
  /** Unique identifier for the node */
  id: string | number;
  /** Display value/label for the node */
  value: string;
  /** Optional icon for the node */
  icon?: React.ReactNode;
  /** Optional icon when node is open (for branches) */
  openIcon?: React.ReactNode;
  /** Children nodes (makes this a branch) */
  data?: AvakioTreeNode[];
  /** Whether the branch is initially open */
  open?: boolean;
  /** Whether this node is disabled */
  disabled?: boolean;
  /** Whether this node has checkbox checked (for three-state checkbox) */
  checked?: boolean | 'indeterminate';
  /** Custom CSS class for this node */
  css?: string;
  /** Tooltip for this node */
  tooltip?: string;
  /** Any additional custom data */
  [key: string]: any;
}

export interface AvakioTreeProps {
  /** Unique identifier */
  id?: string;
  /** Test ID for testing */
  testId?: string;
  /** Tree data */
  data: AvakioTreeNode[];
  /** Enable selection */
  select?: boolean | 'multi';
  /** Enable checkboxes */
  checkbox?: boolean;
  /** Enable three-state checkboxes (parent reflects children state) */
  threeState?: boolean;
  /** Show folder/file icons */
  showIcons?: boolean;
  /** Show branch toggle icons */
  showToggle?: boolean;
  /** Show connecting lines between nodes */
  showLines?: boolean;
  /** Enable keyboard navigation */
  navigation?: boolean;
  /** Enable drag and drop */
  drag?: boolean;
  /** Allow editing node values inline */
  editable?: boolean;
  /** Theme */
  theme?: AvakioTreeTheme;
  /** Filter function */
  filterMode?: {
    showSubItems?: boolean;
    openParents?: boolean;
    level?: number;
  };
  /** Height of each tree item */
  itemHeight?: number;
  /** Width */
  width?: number | string;
  /** Height */
  height?: number | string;
  /** CSS class */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Callback when node is selected */
  onSelect?: (id: string | number, node: AvakioTreeNode) => void;
  /** Callback when selection changes (for multi-select) */
  onSelectChange?: (ids: (string | number)[]) => void;
  /** Callback when node is clicked */
  onClick?: (id: string | number, node: AvakioTreeNode, e: React.MouseEvent) => void;
  /** Callback when node is double-clicked */
  onDblClick?: (id: string | number, node: AvakioTreeNode, e: React.MouseEvent) => void;
  /** Callback when branch opens */
  onOpen?: (id: string | number, node: AvakioTreeNode) => void;
  /** Callback when branch closes */
  onClose?: (id: string | number, node: AvakioTreeNode) => void;
  /** Callback when checkbox state changes */
  onCheck?: (id: string | number, checked: boolean | 'indeterminate', node: AvakioTreeNode) => void;
  /** Callback when node is edited */
  onEdit?: (id: string | number, newValue: string, node: AvakioTreeNode) => void;
  /** Callback on context menu */
  onContext?: (id: string | number, node: AvakioTreeNode, e: React.MouseEvent) => void;
}

export interface AvakioTreeRef {
  /** Get the selected node ID */
  getSelectedId: () => string | number | null;
  /** Get multiple selected IDs */
  getSelectedIds: () => (string | number)[];
  /** Select a node by ID */
  select: (id: string | number) => void;
  /** Unselect a node */
  unselect: (id?: string | number) => void;
  /** Open a branch */
  open: (id: string | number) => void;
  /** Close a branch */
  close: (id: string | number) => void;
  /** Open all branches */
  openAll: () => void;
  /** Close all branches */
  closeAll: () => void;
  /** Check a node */
  checkItem: (id: string | number) => void;
  /** Uncheck a node */
  uncheckItem: (id: string | number) => void;
  /** Check all items */
  checkAll: () => void;
  /** Uncheck all items */
  uncheckAll: () => void;
  /** Get checked item IDs */
  getChecked: () => (string | number)[];
  /** Is node checked */
  isChecked: (id: string | number) => boolean | 'indeterminate';
  /** Is branch open */
  isBranchOpen: (id: string | number) => boolean;
  /** Check if node is a branch */
  isBranch: (id: string | number) => boolean;
  /** Get node by ID */
  getItem: (id: string | number) => AvakioTreeNode | undefined;
  /** Get parent ID */
  getParentId: (id: string | number) => string | number | null;
  /** Filter tree */
  filter: (fn: (node: AvakioTreeNode) => boolean) => void;
  /** Clear filter */
  clearFilter: () => void;
  /** Refresh the tree */
  refresh: () => void;
  /** Focus the tree */
  focus: () => void;
  /** Get the HTML container */
  getNode: () => HTMLDivElement | null;
  /** Scroll to make an item visible */
  showItem: (id: string | number) => void;
}

// Build a flat lookup map from the tree data
function buildNodeMap(
  nodes: AvakioTreeNode[],
  map: Map<string | number, { node: AvakioTreeNode; parentId: string | number | null; depth: number }>,
  parentId: string | number | null = null,
  depth: number = 0
) {
  nodes.forEach((node) => {
    map.set(node.id, { node, parentId, depth });
    if (node.data && node.data.length > 0) {
      buildNodeMap(node.data, map, node.id, depth + 1);
    }
  });
}

// Get all descendant IDs of a node
function getDescendantIds(node: AvakioTreeNode): (string | number)[] {
  const ids: (string | number)[] = [];
  if (node.data) {
    node.data.forEach((child) => {
      ids.push(child.id);
      ids.push(...getDescendantIds(child));
    });
  }
  return ids;
}

// Get all node IDs
function getAllNodeIds(nodes: AvakioTreeNode[]): (string | number)[] {
  const ids: (string | number)[] = [];
  nodes.forEach((node) => {
    ids.push(node.id);
    if (node.data) {
      ids.push(...getAllNodeIds(node.data));
    }
  });
  return ids;
}

export const AvakioTree = forwardRef<AvakioTreeRef, AvakioTreeProps>(
  (
    {
      id,
      testId,
      data,
      select = true,
      checkbox = false,
      threeState = false,
      showIcons = true,
      showToggle = true,
      showLines = false,
      navigation = true,
      drag = false,
      editable = false,
      theme,
      filterMode,
      itemHeight = 32,
      width,
      height,
      className = '',
      style,
      onSelect,
      onSelectChange,
      onClick,
      onDblClick,
      onOpen,
      onClose,
      onCheck,
      onEdit,
      onContext,
    },
    ref
  ) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const autoId = useId();
    const treeId = id || `avakio-tree-${autoId}`;

    // State
    const [selectedIds, setSelectedIds] = useState<Set<string | number>>(new Set());
    const [openIds, setOpenIds] = useState<Set<string | number>>(() => {
      // Initialize with initially open nodes
      const initialOpen = new Set<string | number>();
      const collectOpen = (nodes: AvakioTreeNode[]) => {
        nodes.forEach((node) => {
          if (node.open) {
            initialOpen.add(node.id);
          }
          if (node.data) {
            collectOpen(node.data);
          }
        });
      };
      collectOpen(data);
      return initialOpen;
    });
    const [checkedIds, setCheckedIds] = useState<Set<string | number>>(() => {
      // Initialize with initially checked nodes
      const initialChecked = new Set<string | number>();
      const collectChecked = (nodes: AvakioTreeNode[]) => {
        nodes.forEach((node) => {
          if (node.checked === true) {
            initialChecked.add(node.id);
          }
          if (node.data) {
            collectChecked(node.data);
          }
        });
      };
      collectChecked(data);
      return initialChecked;
    });
    const [focusedId, setFocusedId] = useState<string | number | null>(null);
    const [editingId, setEditingId] = useState<string | number | null>(null);
    const [editValue, setEditValue] = useState<string>('');
    const [filterFn, setFilterFn] = useState<((node: AvakioTreeNode) => boolean) | null>(null);
    const [, forceUpdate] = useState({});

    // Build node lookup map
    const nodeMap = useRef(new Map<string | number, { node: AvakioTreeNode; parentId: string | number | null; depth: number }>());
    useEffect(() => {
      nodeMap.current.clear();
      buildNodeMap(data, nodeMap.current);
    }, [data]);

    // Compute three-state checkbox status
    const getCheckState = useCallback(
      (nodeId: string | number): boolean | 'indeterminate' => {
        if (!threeState) {
          return checkedIds.has(nodeId);
        }
        
        const entry = nodeMap.current.get(nodeId);
        if (!entry) return false;
        
        const { node } = entry;
        if (!node.data || node.data.length === 0) {
          return checkedIds.has(nodeId);
        }
        
        // Check children recursively
        const descendantIds = getDescendantIds(node);
        const checkedCount = descendantIds.filter((id) => checkedIds.has(id)).length;
        
        if (checkedCount === 0) return false;
        if (checkedCount === descendantIds.length) return true;
        return 'indeterminate';
      },
      [checkedIds, threeState]
    );

    // Handle checkbox toggle with three-state propagation
    const handleCheckToggle = useCallback(
      (nodeId: string | number) => {
        const entry = nodeMap.current.get(nodeId);
        if (!entry) return;
        
        const currentState = getCheckState(nodeId);
        const newChecked = currentState !== true;
        
        setCheckedIds((prev) => {
          const next = new Set(prev);
          
          if (threeState) {
            // Update this node and all descendants
            const { node } = entry;
            const descendantIds = getDescendantIds(node);
            
            if (newChecked) {
              next.add(nodeId);
              descendantIds.forEach((id) => next.add(id));
            } else {
              next.delete(nodeId);
              descendantIds.forEach((id) => next.delete(id));
            }
            
            // Update ancestors
            let parentId = entry.parentId;
            while (parentId !== null) {
              const parentEntry = nodeMap.current.get(parentId);
              if (!parentEntry) break;
              
              const parentNode = parentEntry.node;
              if (parentNode.data) {
                const childIds = parentNode.data.map((c) => c.id);
                const allChecked = childIds.every((id) => next.has(id));
                const anyChecked = childIds.some((id) => next.has(id));
                
                if (allChecked) {
                  next.add(parentId);
                } else {
                  next.delete(parentId);
                }
              }
              
              parentId = parentEntry.parentId;
            }
          } else {
            if (newChecked) {
              next.add(nodeId);
            } else {
              next.delete(nodeId);
            }
          }
          
          return next;
        });
        
        onCheck?.(nodeId, newChecked, entry.node);
      },
      [threeState, getCheckState, onCheck]
    );

    // Handle selection
    const handleSelect = useCallback(
      (nodeId: string | number, e?: React.MouseEvent) => {
        const entry = nodeMap.current.get(nodeId);
        if (!entry || entry.node.disabled) return;
        
        if (select === 'multi' && e?.ctrlKey) {
          setSelectedIds((prev) => {
            const next = new Set(prev);
            if (next.has(nodeId)) {
              next.delete(nodeId);
            } else {
              next.add(nodeId);
            }
            onSelectChange?.(Array.from(next));
            return next;
          });
        } else if (select) {
          setSelectedIds(new Set([nodeId]));
          onSelect?.(nodeId, entry.node);
          onSelectChange?.([nodeId]);
        }
        
        setFocusedId(nodeId);
      },
      [select, onSelect, onSelectChange]
    );

    // Handle toggle branch
    const handleToggle = useCallback(
      (nodeId: string | number, e?: React.MouseEvent) => {
        e?.stopPropagation();
        const entry = nodeMap.current.get(nodeId);
        if (!entry || !entry.node.data) return;
        
        setOpenIds((prev) => {
          const next = new Set(prev);
          if (next.has(nodeId)) {
            next.delete(nodeId);
            onClose?.(nodeId, entry.node);
          } else {
            next.add(nodeId);
            onOpen?.(nodeId, entry.node);
          }
          return next;
        });
      },
      [onOpen, onClose]
    );

    // Handle node click
    const handleNodeClick = useCallback(
      (nodeId: string | number, e: React.MouseEvent) => {
        const entry = nodeMap.current.get(nodeId);
        if (!entry) return;
        
        handleSelect(nodeId, e);
        onClick?.(nodeId, entry.node, e);
      },
      [handleSelect, onClick]
    );

    // Handle double click
    const handleNodeDblClick = useCallback(
      (nodeId: string | number, e: React.MouseEvent) => {
        const entry = nodeMap.current.get(nodeId);
        if (!entry) return;
        
        if (editable && !entry.node.disabled) {
          setEditingId(nodeId);
          setEditValue(entry.node.value);
        } else if (entry.node.data) {
          handleToggle(nodeId, e);
        }
        
        onDblClick?.(nodeId, entry.node, e);
      },
      [editable, handleToggle, onDblClick]
    );

    // Handle edit submit
    const handleEditSubmit = useCallback(
      (nodeId: string | number) => {
        const entry = nodeMap.current.get(nodeId);
        if (entry && editValue !== entry.node.value) {
          onEdit?.(nodeId, editValue, entry.node);
        }
        setEditingId(null);
        setEditValue('');
      },
      [editValue, onEdit]
    );

    // Handle context menu
    const handleContextMenu = useCallback(
      (nodeId: string | number, e: React.MouseEvent) => {
        const entry = nodeMap.current.get(nodeId);
        if (entry && onContext) {
          e.preventDefault();
          onContext(nodeId, entry.node, e);
        }
      },
      [onContext]
    );

    // Keyboard navigation
    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (!navigation || focusedId === null) return;
        
        const allIds = getAllNodeIds(data);
        const visibleIds = allIds.filter((nodeId) => {
          const entry = nodeMap.current.get(nodeId);
          if (!entry) return false;
          
          // Check if all ancestors are open
          let parentId = entry.parentId;
          while (parentId !== null) {
            if (!openIds.has(parentId)) return false;
            const parentEntry = nodeMap.current.get(parentId);
            if (!parentEntry) return false;
            parentId = parentEntry.parentId;
          }
          return true;
        });
        
        const currentIndex = visibleIds.indexOf(focusedId);
        
        switch (e.key) {
          case 'ArrowDown':
            e.preventDefault();
            if (currentIndex < visibleIds.length - 1) {
              setFocusedId(visibleIds[currentIndex + 1]);
            }
            break;
          case 'ArrowUp':
            e.preventDefault();
            if (currentIndex > 0) {
              setFocusedId(visibleIds[currentIndex - 1]);
            }
            break;
          case 'ArrowRight': {
            e.preventDefault();
            const entry = nodeMap.current.get(focusedId);
            if (entry?.node.data) {
              if (!openIds.has(focusedId)) {
                handleToggle(focusedId);
              } else if (entry.node.data.length > 0) {
                setFocusedId(entry.node.data[0].id);
              }
            }
            break;
          }
          case 'ArrowLeft': {
            e.preventDefault();
            const entry = nodeMap.current.get(focusedId);
            if (entry) {
              if (openIds.has(focusedId) && entry.node.data) {
                handleToggle(focusedId);
              } else if (entry.parentId !== null) {
                setFocusedId(entry.parentId);
              }
            }
            break;
          }
          case 'Enter':
          case ' ':
            e.preventDefault();
            if (checkbox) {
              handleCheckToggle(focusedId);
            } else {
              handleSelect(focusedId);
            }
            break;
          case 'Home':
            e.preventDefault();
            if (visibleIds.length > 0) {
              setFocusedId(visibleIds[0]);
            }
            break;
          case 'End':
            e.preventDefault();
            if (visibleIds.length > 0) {
              setFocusedId(visibleIds[visibleIds.length - 1]);
            }
            break;
        }
      },
      [navigation, focusedId, data, openIds, checkbox, handleToggle, handleCheckToggle, handleSelect]
    );

    // Imperative handle
    useImperativeHandle(ref, () => ({
      getSelectedId: () => (selectedIds.size > 0 ? Array.from(selectedIds)[0] : null),
      getSelectedIds: () => Array.from(selectedIds),
      select: (nodeId) => handleSelect(nodeId),
      unselect: (nodeId) => {
        if (nodeId) {
          setSelectedIds((prev) => {
            const next = new Set(prev);
            next.delete(nodeId);
            return next;
          });
        } else {
          setSelectedIds(new Set());
        }
      },
      open: (nodeId) => {
        setOpenIds((prev) => new Set(prev).add(nodeId));
        const entry = nodeMap.current.get(nodeId);
        if (entry) onOpen?.(nodeId, entry.node);
      },
      close: (nodeId) => {
        setOpenIds((prev) => {
          const next = new Set(prev);
          next.delete(nodeId);
          return next;
        });
        const entry = nodeMap.current.get(nodeId);
        if (entry) onClose?.(nodeId, entry.node);
      },
      openAll: () => {
        const allBranchIds = getAllNodeIds(data).filter((nodeId) => {
          const entry = nodeMap.current.get(nodeId);
          return entry?.node.data && entry.node.data.length > 0;
        });
        setOpenIds(new Set(allBranchIds));
      },
      closeAll: () => setOpenIds(new Set()),
      checkItem: (nodeId) => {
        if (!checkedIds.has(nodeId)) {
          handleCheckToggle(nodeId);
        }
      },
      uncheckItem: (nodeId) => {
        if (checkedIds.has(nodeId)) {
          handleCheckToggle(nodeId);
        }
      },
      checkAll: () => {
        const allIds = getAllNodeIds(data);
        setCheckedIds(new Set(allIds));
      },
      uncheckAll: () => setCheckedIds(new Set()),
      getChecked: () => Array.from(checkedIds),
      isChecked: (nodeId) => getCheckState(nodeId),
      isBranchOpen: (nodeId) => openIds.has(nodeId),
      isBranch: (nodeId) => {
        const entry = nodeMap.current.get(nodeId);
        return entry?.node.data !== undefined && entry.node.data.length > 0;
      },
      getItem: (nodeId) => nodeMap.current.get(nodeId)?.node,
      getParentId: (nodeId) => nodeMap.current.get(nodeId)?.parentId ?? null,
      filter: (fn) => setFilterFn(() => fn),
      clearFilter: () => setFilterFn(null),
      refresh: () => forceUpdate({}),
      focus: () => containerRef.current?.focus(),
      getNode: () => containerRef.current,
      showItem: (nodeId) => {
        // Open all ancestors
        let parentId = nodeMap.current.get(nodeId)?.parentId ?? null;
        const toOpen: (string | number)[] = [];
        while (parentId !== null) {
          toOpen.push(parentId);
          parentId = nodeMap.current.get(parentId)?.parentId ?? null;
        }
        setOpenIds((prev) => {
          const next = new Set(prev);
          toOpen.forEach((id) => next.add(id));
          return next;
        });
        
        // Scroll into view after state update
        setTimeout(() => {
          const element = containerRef.current?.querySelector(`[data-node-id="${nodeId}"]`);
          element?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 50);
      },
    }));

    // Render a tree node recursively
    const renderNode = (node: AvakioTreeNode, depth: number = 0): React.ReactNode => {
      const isBranch = node.data && node.data.length > 0;
      const isOpen = openIds.has(node.id);
      const isSelected = selectedIds.has(node.id);
      const isFocused = focusedId === node.id;
      const isEditing = editingId === node.id;
      const checkState = checkbox ? getCheckState(node.id) : false;
      
      // Apply filter
      if (filterFn && !filterFn(node)) {
        // Check if any descendants match
        if (!node.data?.some((child) => filterFn(child) || getDescendantIds(child).some((id) => {
          const entry = nodeMap.current.get(id);
          return entry && filterFn(entry.node);
        }))) {
          return null;
        }
      }

      const nodeClasses = [
        'avakio-tree-node',
        isSelected && 'avakio-tree-node--selected',
        isFocused && 'avakio-tree-node--focused',
        node.disabled && 'avakio-tree-node--disabled',
        isBranch && 'avakio-tree-node--branch',
        node.css,
      ].filter(Boolean).join(' ');

      const indent = depth * 20;

      return (
        <div key={node.id} className="avakio-tree-node-wrapper">
          <div
            className={nodeClasses}
            data-node-id={node.id}
            style={{ 
              paddingLeft: indent + 8,
              height: itemHeight,
            }}
            onClick={(e) => handleNodeClick(node.id, e)}
            onDoubleClick={(e) => handleNodeDblClick(node.id, e)}
            onContextMenu={(e) => handleContextMenu(node.id, e)}
            title={node.tooltip}
            role="treeitem"
            aria-selected={isSelected}
            aria-expanded={isBranch ? isOpen : undefined}
            tabIndex={isFocused ? 0 : -1}
          >
            {/* Toggle icon */}
            {showToggle && (
              <span
                className={`avakio-tree-toggle ${isBranch ? 'avakio-tree-toggle--visible' : ''}`}
                onClick={(e) => isBranch && handleToggle(node.id, e)}
              >
                {isBranch ? (
                  isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />
                ) : null}
              </span>
            )}

            {/* Checkbox */}
            {checkbox && (
              <span
                className={`avakio-tree-checkbox ${checkState === true ? 'avakio-tree-checkbox--checked' : ''} ${checkState === 'indeterminate' ? 'avakio-tree-checkbox--indeterminate' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  if (!node.disabled) handleCheckToggle(node.id);
                }}
              >
                {checkState === true && <Check size={12} />}
                {checkState === 'indeterminate' && <Minus size={12} />}
              </span>
            )}

            {/* Icon */}
            {showIcons && (
              <span className="avakio-tree-icon">
                {node.icon ? (
                  isOpen && node.openIcon ? node.openIcon : node.icon
                ) : isBranch ? (
                  isOpen ? <FolderOpen size={16} /> : <Folder size={16} />
                ) : (
                  <File size={16} />
                )}
              </span>
            )}

            {/* Label */}
            {isEditing ? (
              <input
                type="text"
                className="avakio-tree-edit-input"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onBlur={() => handleEditSubmit(node.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleEditSubmit(node.id);
                  if (e.key === 'Escape') {
                    setEditingId(null);
                    setEditValue('');
                  }
                }}
                autoFocus
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <span className="avakio-tree-label">{node.value}</span>
            )}
          </div>

          {/* Children */}
          {isBranch && isOpen && (
            <div className={`avakio-tree-children ${showLines ? 'avakio-tree-children--lines' : ''}`}>
              {node.data!.map((child) => renderNode(child, depth + 1))}
            </div>
          )}
        </div>
      );
    };

    // Detect theme from parent if not provided
    const [detectedTheme, setDetectedTheme] = useState<string>(theme || 'material');
    useEffect(() => {
      if (!theme) {
        const globalTheme = document.documentElement.getAttribute('data-admin-theme');
        if (globalTheme) setDetectedTheme(globalTheme);

        const observer = new MutationObserver(() => {
          const newTheme = document.documentElement.getAttribute('data-admin-theme');
          if (newTheme) setDetectedTheme(newTheme);
        });
        observer.observe(document.documentElement, {
          attributes: true,
          attributeFilter: ['data-admin-theme'],
        });
        return () => observer.disconnect();
      }
    }, [theme]);

    const effectiveTheme = theme || detectedTheme;

    const containerClasses = [
      'avakio-tree',
      `avakio-tree--${effectiveTheme}`,
      showLines && 'avakio-tree--lines',
      className,
    ].filter(Boolean).join(' ');

    return (
      <div
        ref={containerRef}
        id={treeId}
        data-testid={testId}
        className={containerClasses}
        style={{
          width,
          height,
          ...style,
        }}
        role="tree"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onFocus={() => {
          if (focusedId === null && data.length > 0) {
            setFocusedId(data[0].id);
          }
        }}
      >
        {data.map((node) => renderNode(node, 0))}
      </div>
    );
  }
);

AvakioTree.displayName = 'AvakioTree';

export default AvakioTree;











