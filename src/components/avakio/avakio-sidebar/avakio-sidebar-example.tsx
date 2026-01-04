import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AvakioSidebar, AvakioSidebarToggleButton, SidebarItem } from './avakio-sidebar';
import './avakio-sidebar-example.css';
import {
  LayoutDashboard,
  Columns,
  Table,
  FileText,
  Settings,
  Users,
  Bell,
  HelpCircle,
  PieChart,
  BarChart,
  LineChart,
  Database,
  Mail,
  Calendar,
  FolderOpen,
  Edit,
  List,
  Grid,
} from 'lucide-react';

export function AvakioSidebarExample() {
  const [theme, setTheme] = useState<string>('material');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    // Start expanded only on desktop (>= 1024px)
    return window.innerWidth < 1024;
  });
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const themes = useMemo(
    () => [
      { id: 'material', name: 'Material', color: '#1CA1C1' },
      { id: 'flat', name: 'Flat', color: '#5E81AC' },
      { id: 'compact', name: 'Compact', color: '#00796B' },
      { id: 'dark', name: 'Dark', color: '#3b82f6' },
      { id: 'ocean', name: 'Ocean', color: '#0277BD' },
      { id: 'sunset', name: 'Sunset', color: '#f57c00' },
    ],
    []
  );

  const menuData: SidebarItem[] = useMemo(
    () => [
      {
        id: 'dashboard',
        icon: <LayoutDashboard size={18} />,
        value: 'Dashboards',
        data: [
          { id: 'dashboard1', icon: <PieChart size={16} />, value: 'Analytics Dashboard' },
          { id: 'dashboard2', icon: <BarChart size={16} />, value: 'Sales Dashboard' },
          { id: 'dashboard3', icon: <LineChart size={16} />, value: 'Marketing Dashboard' },
        ],
      },
      {
        id: 'layouts',
        icon: <Columns size={18} />,
        value: 'Layouts',
        data: [
          { id: 'grids', icon: <Grid size={16} />, value: 'Grids' },
          { id: 'accordions', icon: <List size={16} />, value: 'Accordions' },
          { id: 'portlets', value: 'Portlets' },
        ],
      },
      {
        id: 'tables',
        icon: <Table size={18} />,
        value: 'Data Tables',
        data: [
          { id: 'datatable', icon: <Database size={16} />, value: 'DataTable' },
          { id: 'treetable', value: 'TreeTable' },
          { id: 'pivot', value: 'Pivot' },
        ],
      },
      {
        id: 'forms',
        icon: <Edit size={18} />,
        value: 'Forms',
        data: [
          {
            id: 'buttons',
            value: 'Buttons',
            data: [
              { id: 'button', value: 'Button' },
              { id: 'icon-button', value: 'Icon Button' },
              { id: 'split-button', value: 'Split Button' },
            ],
          },
          {
            id: 'texts',
            value: 'Text Fields',
            data: [
              { id: 'text-input', value: 'Text Input' },
              { id: 'textarea', value: 'Text Area' },
              { id: 'password', value: 'Password' },
            ],
          },
          {
            id: 'selects',
            value: 'Selectors',
            data: [
              {
                id: 'single',
                value: 'Single value',
                data: [
                  { id: 'combo', value: 'Combo' },
                  { id: 'richselect', value: 'Rich Select' },
                  { id: 'select', value: 'Select' },
                ],
              },
              {
                id: 'multi',
                value: 'Multiple values',
                data: [
                  { id: 'multiselect', value: 'Multi Select' },
                  { id: 'multicombo', value: 'Multi Combo' },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'documents',
        icon: <FileText size={18} />,
        value: 'Documents',
        data: [
          { id: 'reports', icon: <FolderOpen size={16} />, value: 'Reports' },
          { id: 'invoices', value: 'Invoices' },
          { id: 'contracts', value: 'Contracts' },
        ],
      },
      {
        id: 'calendar',
        icon: <Calendar size={18} />,
        value: 'Calendar',
      },
      {
        id: 'mail',
        icon: <Mail size={18} />,
        value: 'Mail',
        data: [
          { id: 'inbox', value: 'Inbox' },
          { id: 'sent', value: 'Sent' },
          { id: 'drafts', value: 'Drafts' },
        ],
      },
      {
        id: 'users',
        icon: <Users size={18} />,
        value: 'Users',
      },
      {
        id: 'notifications',
        icon: <Bell size={18} />,
        value: 'Notifications',
      },
      {
        id: 'settings',
        icon: <Settings size={18} />,
        value: 'Settings',
        data: [
          { id: 'general', value: 'General' },
          { id: 'security', value: 'Security' },
          { id: 'preferences', value: 'Preferences' },
        ],
      },
      {
        id: 'help',
        icon: <HelpCircle size={18} />,
        value: 'Help & Support',
      },
    ],
    []
  );

  // Sync with global theme
  useEffect(() => {
    const currentTheme = document.documentElement.getAttribute('data-admin-theme');
    if (currentTheme) {
      setTheme(currentTheme);
    }
    
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-admin-theme') {
          const newTheme = document.documentElement.getAttribute('data-admin-theme');
          if (newTheme) {
            setTheme(newTheme);
          }
        }
      });
    });
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-admin-theme'],
    });
    
    return () => observer.disconnect();
  }, []);

  return (
    <div className="avakio-sidebar-example" data-admin-theme={theme}>
      <header className="avakio-sidebar-hero">
        <div>
          <p className="avakio-sidebar-kicker">Avakio Components</p>
          <h1 className="avakio-sidebar-title">AvakioSidebar Component</h1>
          <p className="avakio-sidebar-subtitle">
            A theme-aware hierarchical sidebar  Supports collapsing, multi-level navigation,
            icons, and popup menus in collapsed state.
          </p>
        </div>
      </header>

      <Card className="avakio-sidebar-card">
        <CardHeader>
          <CardTitle>Interactive Sidebar Demo (Mobile Responsive)</CardTitle>
          <CardDescription>
            Toggle the sidebar to see the collapsed state with popup menus. On mobile, a floating dongle button appears to open the sidebar. Try resizing your browser!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="avakio-sidebar-demo-container">
            {/* Toolbar with toggle button */}
            <div className="avakio-sidebar-toolbar">
              <AvakioSidebarToggleButton onClick={() => setSidebarCollapsed(!sidebarCollapsed)} />
              <h2 className="avakio-sidebar-toolbar-title">Application Layout</h2>
              <span className="avakio-sidebar-mobile-hint">📱 Try on mobile - see the dongle!</span>
            </div>

            {/* Main layout with sidebar and content */}
            <div className="avakio-sidebar-layout">
              <AvakioSidebar
                data={menuData}
                collapsed={sidebarCollapsed}
                position="left"
                collapsedWidth={56}
                width={260}
                activeTitle={true}
                titleHeight={44}
                multipleOpen={false}
                mobileBreakpoint={768}
                tabletBreakpoint={1024}
                autoCloseMobile={true}
                showOverlay={true}
                showMobileDongle={true}
                onSelect={(item) => {
                  console.log('Selected:', item);
                  setSelectedItem(item.id);
                }}
                onOverlayClick={() => setSidebarCollapsed(true)}
              />

              <div className="avakio-sidebar-content-area">
                <div className="avakio-sidebar-content-card">
                  <h3>Content Area</h3>
                  {selectedItem ? (
                    <p>
                      Selected item: <strong>{selectedItem}</strong>
                    </p>
                  ) : (
                    <p>Click any sidebar item to see it here.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="avakio-sidebar-card">
        <CardHeader>
          <CardTitle>Right-Positioned Sidebar</CardTitle>
          <CardDescription>Sidebar can be positioned on the right with popups appearing on the left.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="avakio-sidebar-demo-container">
            <div className="avakio-sidebar-toolbar">
              <h2 className="avakio-sidebar-toolbar-title">Right Sidebar Layout</h2>
            </div>

            <div className="avakio-sidebar-layout">
              <div className="avakio-sidebar-content-area">
                <div className="avakio-sidebar-content-card">
                  <h3>Main Content</h3>
                  <p>Sidebar positioned on the right side.</p>
                </div>
              </div>

              <AvakioSidebar
                data={menuData}
                collapsed={false}
                position="right"
                width={240}
                multipleOpen={true}
                onSelect={(item) => console.log('Right sidebar selected:', item)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="avakio-sidebar-card">
        <CardHeader>
          <CardTitle>Features Overview</CardTitle>
          <CardDescription>Key features of the AvakioSidebar component</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="avakio-sidebar-features">
            <div className="avakio-sidebar-feature">
              <h4>🎨 Theme Support</h4>
              <p>All 6 themes supported: Material, Flat, Compact, Dark, Ocean, and Sunset</p>
            </div>
            <div className="avakio-sidebar-feature">
              <h4>📁 Hierarchical Data</h4>
              <p>Multi-level nested navigation with unlimited depth</p>
            </div>
            <div className="avakio-sidebar-feature">
              <h4>↔️ Collapsible</h4>
              <p>Toggle between expanded and collapsed states with popup menus</p>
            </div>
            <div className="avakio-sidebar-feature">
              <h4>🎯 Position Control</h4>
              <p>Can be positioned on left or right side</p>
            </div>
            <div className="avakio-sidebar-feature">
              <h4>🎨 Custom Icons</h4>
              <p>Support for any React icon component</p>
            </div>
            <div className="avakio-sidebar-feature">
              <h4>⚙️ Configurable</h4>
              <p>Width, collapsed width, title height, and multi-open options</p>
            </div>
            <div className="avakio-sidebar-feature">
              <h4>📱 Mobile Responsive</h4>
              <p>Fixed positioning, overlay backdrop, auto-close, floating dongle button, and touch-friendly targets</p>
            </div>
            <div className="avakio-sidebar-feature">
              <h4>♿ Accessible</h4>
              <p>Keyboard navigation, proper ARIA labels, and semantic HTML</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}











