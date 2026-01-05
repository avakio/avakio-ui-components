import React, { useState, useRef } from 'react';
import { AvakioTabBar, AvakioTabBarOption } from '../../components/avakio/ui-controls/avakio-tabbar/avakio-tabbar';
import { Home, List, Calendar, Settings, Bell, Folder, FileText, Layers, MousePointer, X, ArrowDown, EyeOff, Paintbrush } from 'lucide-react';
import { AvakioViewHeader } from '../../components/avakio/ui-widgets/avakio-view-header/avakio-view-header';
import { AvakioTemplate } from '../../components/avakio/views/avakio-template/avakio-template';
import { AvakioLayout } from '../../components/avakio/layouts/avakio-layout/avakio-layout';

// Tab options for navigation
const TAB_OPTIONS = [
  { id: 'basic', label: 'Basic Navigation', icon: <Layers size={14} /> },
  { id: 'icons', label: 'Icons & Badges', icon: <Bell size={14} /> },
  { id: 'closable', label: 'Closable Tabs', icon: <X size={14} /> },
  { id: 'bottom', label: 'Bottom Style', icon: <ArrowDown size={14} /> },
  { id: 'states', label: 'Hidden & Disabled', icon: <EyeOff size={14} /> },
  { id: 'custom', label: 'Custom Rendering', icon: <Paintbrush size={14} /> },
];

export function AvakioTabBarExample({ theme = 'material' }: { theme?: string }) {
  const [activeSection, setActiveSection] = useState<string | number | null>('basic');
  const [basicTab, setBasicTab] = useState<string | number>('overview');
  const [iconTab, setIconTab] = useState<string | number>('list');
  const [bottomTab, setBottomTab] = useState<string | number>('files');
  const [statefulTab, setStatefulTab] = useState<string | number>('live');
  const [customTab, setCustomTab] = useState<string | number>('analytics');

  const [closableTabs, setClosableTabs] = useState<AvakioTabBarOption[]>([
    { id: 'alpha', label: 'Alpha', close: true },
    { id: 'beta', label: 'Beta', close: true },
    { id: 'gamma', label: 'Gamma', close: true },
    { id: 'delta', label: 'Delta', close: true },
  ]);
  const [closableValue, setClosableValue] = useState<string | number | null>('alpha');
  const [tabCounter, setTabCounter] = useState<number>(5);

  // Section refs for scroll navigation
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  // Scroll to section when tab is clicked
  const handleTabChange = (value: string | number | null) => {
    setActiveSection(value);
    if (value && sectionRefs.current[value as string]) {
      const element = sectionRefs.current[value as string];
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const basicTabs: AvakioTabBarOption[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'activity', label: 'Activity' },
    { id: 'files', label: 'Files' },
    { id: 'team', label: 'Team' },
  ];

  const iconTabs: AvakioTabBarOption[] = [
    { id: 'home', label: 'Home', icon: <Home size={16} /> },
    { id: 'list', label: 'List', icon: <List size={16} /> },
    { id: 'calendar', label: 'Calendar', icon: <Calendar size={16} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={16} />, badge: 2 },
    { id: 'notifications', label: 'Alerts', icon: <Bell size={16} />, badge: 6 },
  ];

  const bottomTabs: AvakioTabBarOption[] = [
    { id: 'files', label: 'Files', icon: <Folder size={16} /> },
    { id: 'drafts', label: 'Drafts', icon: <FileText size={16} /> },
    { id: 'shared', label: 'Shared' },
    { id: 'archived', label: 'Archived', disabled: true },
  ];

  const hiddenTabs: AvakioTabBarOption[] = [
    { id: 'live', label: 'Live' },
    { id: 'beta', label: 'Beta (hidden)', hidden: true },
    { id: 'readonly', label: 'Read Only', disabled: true },
    { id: 'stable', label: 'Stable' },
  ];

  const customTabs: AvakioTabBarOption[] = [
    { id: 'analytics', label: 'Analytics', badge: 'New' },
    { id: 'reports', label: 'Reports', badge: 12 },
    { id: 'settings-advanced', label: 'Settings', close: true },
  ];

  return (
    <div className="avakio-tabbar-demo-container">
      {/* Sticky Header + Tab Navigation */}
      <div className="avakio-example-sticky-header">
        {/* Header */}
        <AvakioViewHeader
          label="UI Controls"
          title="TabBar Component"
          subTitle="A flexible tab navigation component. Supports icons, badges, closable tabs, top/bottom styling, and keyboard navigation."
          isSticky={false}
        />

        {/* Tab Navigation */}
        <div className="avakio-example-tabbar-container">
          <AvakioTabBar
            id="tabbar-demo-tabs"
            value={activeSection}
            options={TAB_OPTIONS}
            onChange={handleTabChange}
            align="left"
            padding={[6, 16, 16, 16]}
            size="sm"
            scrollable
          />
        </div>
      </div>

      {/* Basic Navigation Section */}
      <section 
        ref={(el) => { sectionRefs.current['basic'] = el; }}
        className="avakio-tabbar-demo-section"
      >
        <AvakioTemplate
          type="section"
          borderType="clean"
          content="Basic Navigation"
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="Simple top tabbar with automatic selection and keyboard navigation. Use arrow keys to navigate between tabs."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioTabBar
              key="basic-tabbar"
              value={basicTab}
              options={basicTabs}
              onChange={(val) => setBasicTab(val as string)}
              label="Section"
              labelWidth={110}
              required
            />,
            <div key="basic-result" className="avakio-tabbar-result">
              Active tab: <strong>{basicTab}</strong>
            </div>,
          ]}
        />
      </section>

      {/* Icons & Badges Section */}
      <section 
        ref={(el) => { sectionRefs.current['icons'] = el; }}
        className="avakio-tabbar-demo-section"
      >
        <AvakioTemplate
          type="section"
          borderType="clean"
          content="Icons & Badges"
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="Tabs with icons, badges, and stretched layout. Badges can show counts or text labels."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioTabBar
              key="icon-tabbar"
              value={iconTab}
              options={iconTabs}
              onChange={(val) => setIconTab(val as string)}
              align="justify"
              fill
              size="sm"
            />,
            <div key="icon-result" className="avakio-tabbar-result">
              Currently viewing: <strong>{iconTab}</strong>
            </div>,
          ]}
        />
      </section>

      {/* Closable Tabs Section */}
      <section 
        ref={(el) => { sectionRefs.current['closable'] = el; }}
        className="avakio-tabbar-demo-section"
      >
        <AvakioTemplate
          type="section"
          borderType="clean"
          content="Closable Tabs"
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="Per-tab close buttons with fallback selection. Press Delete/Backspace while focused to close the active tab."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioTabBar
              key="closable-tabbar"
              value={closableValue}
              options={closableTabs}
              onChange={(val) => setClosableValue(val as string)}
              onClose={(val) => {
                setClosableTabs((prev) => {
                  const next = prev.filter((t) => t.id !== val);
                  setClosableValue((curr) => {
                    if (curr !== val) return curr;
                    return next[0]?.id ?? null;
                  });
                  return next;
                });
              }}
              closable
              scrollable={false}
              align="left"
            />,
            <div key="closable-actions" className="avakio-tabbar-actions">
              <button
                type="button"
                className="avakio-tabbar-add-btn"
                onClick={() => {
                  const nextId = `tab-${tabCounter}`;
                  setTabCounter((n) => n + 1);
                  const newTab = { id: nextId, label: `New Tab ${tabCounter}`, close: true };
                  setClosableTabs((prev) => [...prev, newTab]);
                  setClosableValue(nextId);
                }}
              >
                + Add tab
              </button>
            </div>,
          ]}
        />
      </section>

      {/* Bottom Style Section */}
      <section 
        ref={(el) => { sectionRefs.current['bottom'] = el; }}
        className="avakio-tabbar-demo-section"
      >
        <AvakioTemplate
          type="section"
          borderType="clean"
          content="Bottom Style"
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="Tab indicator rendered above for bottom-aligned styling. Use type='bottom' prop."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioTabBar
              key="bottom-tabbar"
              value={bottomTab}
              options={bottomTabs}
              onChange={(val) => setBottomTab(val as string)}
              type="bottom"
              align="center"
              size="sm"
            />,
            <div key="bottom-result" className="avakio-tabbar-result">
              Selected folder: <strong>{bottomTab}</strong>
            </div>,
          ]}
        />
      </section>

      {/* Hidden & Disabled Section */}
      <section 
        ref={(el) => { sectionRefs.current['states'] = el; }}
        className="avakio-tabbar-demo-section"
      >
        <AvakioTemplate
          type="section"
          borderType="clean"
          content="Hidden & Disabled States"
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="Tabs can be hidden (not rendered) or disabled (visible but not clickable)."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioTabBar
              key="states-tabbar"
              value={statefulTab}
              options={hiddenTabs}
              onChange={(val) => setStatefulTab(val as string)}
              label="Release"
              labelWidth={110}
              size="sm"
              error={statefulTab === 'readonly' ? 'Read-only tab cannot be activated.' : undefined}
            />,
            <div key="states-result" className="avakio-tabbar-result">
              Active channel: <strong>{statefulTab}</strong>
            </div>,
          ]}
        />
      </section>

      {/* Custom Rendering Section */}
      <section 
        ref={(el) => { sectionRefs.current['custom'] = el; }}
        className="avakio-tabbar-demo-section"
      >
        <AvakioTemplate
          type="section"
          borderType="clean"
          content="Custom Rendering"
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="Use renderTab prop to fully control tab layout while reusing the built-in close button."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioTabBar
              key="custom-tabbar"
              value={customTab}
              options={customTabs}
              onChange={(val) => setCustomTab(val as string)}
              closable
              renderTab={(option, isActive, closeButton) => (
                <div className={`avakio-tabbar-custom-tab${isActive ? ' active' : ''}`}>
                  <div className="avakio-tabbar-custom-top">
                    <span className="avakio-tabbar-custom-title">{option.label}</span>
                    {option.badge !== undefined && (
                      <span className="avakio-tabbar-custom-badge">{option.badge}</span>
                    )}
                  </div>
                  <div className="avakio-tabbar-custom-sub">
                    {option.id === 'analytics' && 'Dashboards & funnels'}
                    {option.id === 'reports' && 'Exports and schedules'}
                    {option.id === 'settings-advanced' && 'Advanced configuration'}
                  </div>
                  {closeButton}
                </div>
              )}
            />,
            <div key="custom-result" className="avakio-tabbar-result">
              Active tab: <strong>{customTab}</strong>
            </div>,
          ]}
        />
      </section>
    </div>
  );
}




















