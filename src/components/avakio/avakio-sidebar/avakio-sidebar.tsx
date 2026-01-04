import React, { useState, useCallback, useMemo } from 'react';
import './avakio-sidebar.css';

export interface SidebarItem {
  id: string;
  value: string;
  icon?: React.ReactNode;
  data?: SidebarItem[];
  [key: string]: any;
}

export type SidebarPosition = 'left' | 'right';

export interface AvakioSidebarProps {
  data: SidebarItem[];
  collapsed?: boolean;
  position?: SidebarPosition;
  collapsedWidth?: number;
  width?: number;
  activeTitle?: boolean;
  titleHeight?: number;
  multipleOpen?: boolean;
  onSelect?: (item: SidebarItem) => void;
  onToggle?: (collapsed: boolean) => void;
  className?: string;
  mobileBreakpoint?: number;
  tabletBreakpoint?: number;
  autoCloseMobile?: boolean;
  showOverlay?: boolean;
  onOverlayClick?: () => void;
  showMobileDongle?: boolean;
  dongleIcon?: React.ReactNode;
  /** ID of the component */
  id?: string;
  /** Test ID for testing purposes */
  testId?: string;
}

interface ItemState {
  [key: string]: boolean;
}

export function AvakioSidebar({
  data,
  collapsed = false,
  position = 'left',
  collapsedWidth = 41,
  width = 250,
  activeTitle = true,
  titleHeight = 40,
  multipleOpen = false,
  onSelect,
  onToggle,
  className = '',
  mobileBreakpoint = 768,
  tabletBreakpoint = 1024,
  autoCloseMobile = true,
  showOverlay = true,
  onOverlayClick,
  showMobileDongle = true,
  dongleIcon,
  id,
  testId,
}: AvakioSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(collapsed);
  const [openItems, setOpenItems] = useState<ItemState>({});
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  // Detect screen size: mobile (dongle), tablet (collapsed), desktop (expanded)
  React.useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      const isMobileScreen = width < mobileBreakpoint;
      const isTabletScreen = width >= mobileBreakpoint && width < tabletBreakpoint;
      
      setIsMobile(isMobileScreen);
      setIsTablet(isTabletScreen);
      
      // Mobile: hide sidebar (show dongle only)
      // Tablet: show collapsed sidebar
      // Desktop: show expanded sidebar
      if (isMobileScreen || isTabletScreen) {
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
      }
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, [mobileBreakpoint, tabletBreakpoint]);

  // Sync internal state with external collapsed prop
  React.useEffect(() => {
    setIsCollapsed(collapsed);
  }, [collapsed]);

  // Prevent body scroll when sidebar is open on mobile
  React.useEffect(() => {
    if (isMobile && !isCollapsed) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobile, isCollapsed]);

  const toggleCollapse = useCallback(() => {
    const newCollapsed = !isCollapsed;
    setIsCollapsed(newCollapsed);
    if (onToggle) {
      onToggle(newCollapsed);
    }
  }, [isCollapsed, onToggle]);

  const toggleItem = useCallback(
    (itemId: string, hasChildren: boolean) => {
      if (!hasChildren || !activeTitle) return;

      setOpenItems((prev) => {
        if (multipleOpen) {
          return { ...prev, [itemId]: !prev[itemId] };
        } else {
          return { [itemId]: !prev[itemId] };
        }
      });
    },
    [multipleOpen, activeTitle]
  );

  const handleItemClick = useCallback(
    (item: SidebarItem, hasChildren: boolean, level: number = 0, parentId?: string) => {
      // If collapsed and has children, expand the sidebar instead of toggling children
      if (isCollapsed && hasChildren) {
        setIsCollapsed(false);
        return;
      }
      
      // Always set the selected item and call onSelect
      setSelectedItem(item.id);
      if (onSelect) {
        onSelect(item);
      }
      
      // Auto-close/collapse sidebar on mobile and tablet:
      // - Mobile: Close if it's a child item (level > 0) or parent without children
      // - Tablet: Same behavior - collapse to show icons only, but select parent
      // - Desktop: Don't auto-close, just toggle children
      const shouldCollapseOnMobileOrTablet = (isMobile || isTablet) && autoCloseMobile && (level > 0 || !hasChildren);
      
      if (shouldCollapseOnMobileOrTablet) {
        // On tablet, when collapsing after selecting a child, keep the parent selected
        if (isTablet && level > 0 && parentId) {
          setSelectedItem(parentId);
        }
        setIsCollapsed(true);
      } else {
        // Toggle children expansion when sidebar is not collapsed and not closing
        if (hasChildren && !isCollapsed) {
          toggleItem(item.id, hasChildren);
        }
      }
    },
    [toggleItem, onSelect, isMobile, isTablet, autoCloseMobile, isCollapsed]
  );

  const handleOverlayClick = useCallback(() => {
    if (onOverlayClick) {
      onOverlayClick();
    } else {
      setIsCollapsed(true);
    }
  }, [onOverlayClick]);

  const renderIcon = (icon?: React.ReactNode) => {
    if (!icon) return null;
    return <span className="avakio-sidebar-icon">{icon}</span>;
  };

  const renderArrow = (hasChildren: boolean, isOpen: boolean, level: number) => {
    if (!hasChildren || level === 0) return null;
    return (
      <span className={`avakio-sidebar-arrow ${isOpen ? 'open' : ''}`}>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
          <path d="M4 3l4 3-4 3V3z" />
        </svg>
      </span>
    );
  };

  const renderItem = (item: SidebarItem, level: number = 0, parentId?: string): React.ReactNode => {
    const hasChildren = !!(item.data && item.data.length > 0);
    const isOpen = openItems[item.id] || false;
    const isSelected = selectedItem === item.id;
    const isHovered = hoveredItem === item.id;

    return (
      <div key={item.id} className="avakio-sidebar-item-wrapper">
        <div
          className={[
            'avakio-sidebar-item',
            `level-${level}`,
            isSelected ? 'selected' : '',
            hasChildren ? 'has-children' : '',
          ]
            .filter(Boolean)
            .join(' ')}
          onClick={() => handleItemClick(item, hasChildren, level, parentId)}
          onMouseEnter={() => setHoveredItem(item.id)}
          onMouseLeave={() => setHoveredItem(null)}
          style={{
            paddingLeft: level === 0 ? undefined : `${16 + level * 20}px`,
            minHeight: level === 0 ? `${titleHeight}px` : undefined,
          }}
        >
          {renderArrow(hasChildren, isOpen, level)}
          {renderIcon(item.icon)}
          {!isCollapsed && <span className="avakio-sidebar-value">{item.value}</span>}
        </div>

        {/* Popup for collapsed mode */}
        {isCollapsed && isHovered && level === 0 && (
          <div
            className={`avakio-sidebar-popup ${position === 'right' ? 'popup-left' : 'popup-right'}`}
            style={{ minHeight: `${titleHeight}px` }}
          >
            <div className="avakio-sidebar-popup-title">{item.value}</div>
            {hasChildren && (
              <div className="avakio-sidebar-popup-children">
                {item.data?.map((child) => (
                  <div
                    key={child.id}
                    className={`avakio-sidebar-popup-item ${selectedItem === child.id ? 'selected' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleItemClick(child, false, 1, item.id);
                    }}
                  >
                    {renderIcon(child.icon)}
                    <span className="avakio-sidebar-value">{child.value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Expanded children */}
        {!isCollapsed && hasChildren && isOpen && (
          <div className="avakio-sidebar-children">
            {item.data?.map((child) => renderItem(child, level + 1, level === 0 ? item.id : parentId))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Mobile overlay */}
      {isMobile && !isCollapsed && showOverlay && (
        <div
          className="avakio-sidebar-overlay"
          onClick={handleOverlayClick}
          aria-hidden="true"
        />
      )}

      {/* Mobile dongle/toggle button */}
      {isMobile && isCollapsed && showMobileDongle && (
        <button
          type="button"
          className={`avakio-sidebar-mobile-dongle position-${position}`}
          onClick={() => setIsCollapsed(false)}
          aria-label="Open sidebar"
        >
          {dongleIcon || (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 4h16v2H2V4zm0 5h16v2H2V9zm0 5h16v2H2v-2z" />
            </svg>
          )}
        </button>
      )}

      <div
        id={id}
        data-testid={testId}
        className={[
          'avakio-sidebar',
          isCollapsed ? 'collapsed' : 'expanded',
          `position-${position}`,
          isMobile ? 'mobile' : 'desktop',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        style={{
          width: isCollapsed ? `${collapsedWidth}px` : `${width}px`,
        }}
      >
        <div className="avakio-sidebar-content">{data.map((item) => renderItem(item))}</div>
      </div>
    </>
  );
}

// Export toggle function component for external use
export interface AvakioSidebarToggleButtonProps {
  onClick?: () => void;
  className?: string;
  icon?: React.ReactNode;
  isCollapsed?: boolean;
}

export function AvakioSidebarToggleButton({
  onClick,
  className = '',
  icon,
  isCollapsed = false,
}: AvakioSidebarToggleButtonProps) {
  return (
    <button
      type="button"
      className={`avakio-sidebar-toggle-button ${isCollapsed ? 'collapsed' : 'expanded'} ${className}`}
      onClick={onClick}
      aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
    >
      {icon || (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
          <path d="M2 4h16v2H2V4zm0 5h16v2H2V9zm0 5h16v2H2v-2z" />
        </svg>
      )}
    </button>
  );
}








