import { useState, useMemo, useRef, useEffect } from 'react';
import { AvakioView } from './components/avakio/views/avakio-view/avakio-view';
import { AvakioLayout } from './components/avakio/layouts/avakio-layout/avakio-layout';
import { AvakioSidebar, SidebarItem, AvakioSidebarToggleButton } from './components/avakio/avakio-sidebar/avakio-sidebar';
import { AvakioMultiview, AvakioMultiviewRef } from './components/avakio/views/avakio-multiview/avakio-multiview';
import { AvakioLayoutExample } from './examples/layouts/avakio-layout-example';
import { AvakioAbsoluteLayoutExample } from './examples/layouts/avakio-absolute-layout-example';
import { AvakioTemplateExample } from './examples/views/avakio-template-example';
import { AvakioMultiviewExample } from './examples/views/avakio-multiview-example';
import { AvakioViewExample } from './examples/views/avakio-view-example';
import { AvakioResizerExample } from './examples/layouts/avakio-resizer-example';
import { AvakioGridExample } from './examples/layouts/avakio-grid-example';
import { AvakioHintExample } from './examples/ui-widgets/avakio-hint-example';
import { AvakioCarouselExample } from './examples/ui-widgets/avakio-carousel-example';
import { AvakioViewHeaderExample } from './examples/ui-widgets/avakio-view-header-example';
import { AvakioTextExample } from './examples/ui-controls/avakio-text-example';
import { AvakioLabelExample } from './examples/ui-controls/avakio-label-example';
import { AvakioButtonExample } from './examples/ui-controls/avakio-button-example';
import { AvakioCheckboxExample } from './examples/ui-controls/avakio-checkbox-example';
import { AvakioToggleButtonExample } from './examples/ui-controls/avakio-toggle-button-example';
import { AvakioSwitchButtonExample } from './examples/ui-controls/avakio-switch-button-example';
import { AvakioColorPickerExample } from './examples/ui-controls/avakio-colorpicker-example';
import { AvakioCounterExample } from './examples/ui-controls/avakio-counter-example';
import AvakioComboExample from './examples/ui-controls/avakio-combo-example';
import { AvakioRichSelectExample } from './examples/ui-controls/avakio-richselect-example';
import { AvakioDatePickerExample } from './examples/ui-controls/avakio-datepicker-example';
import AvakioDateRangePickerExample from './examples/ui-controls/avakio-daterangepicker-example';
import { AvakioSliderExample } from './examples/ui-controls/avakio-slider-example';
import { AvakioMultiComboExample } from './examples/ui-controls/avakio-multicombo-example';
import { AvakioTabBarExample } from './examples/ui-controls/avakio-tabbar-example';
import { AvakioSegmentedButtonExample } from './examples/ui-controls/avakio-segmented-button-example';
import { AvakioRadioExample } from './examples/ui-controls/avakio-radio-example';
import { AvakioMultitextExample } from './examples/ui-controls/avakio-multitext-example';
import { AvakioDoubleListExample } from './examples/ui-controls/avakio-doublelist-example';
import { AvakioFieldsetExample } from './examples/ui-controls/avakio-fieldset-example';
import { AvakioTreeExample } from './examples/ui-widgets/avakio-tree-example';
import { AvakioAccordionExample } from './examples/ui-widgets/avakio-accordion-example';
import { AvakioChartExample } from './examples/ui-widgets/avakio-chart-example';
import { AvakioBulletGraphExample } from './examples/ui-widgets/avakio-bullet-graph-example';
import { AvakioCommentExample } from './examples/ui-widgets/avakio-comment-example';
import { AvakioFormExample } from './examples/ui-widgets/avakio-form-example';
import { AvakioExcelViewerExample } from './examples/ui-widgets/avakio-excel-viewer-example';
import { AvakioGageExample } from './examples/ui-widgets/avakio-gage-example';
import { AvakioGoogleMapExample } from './examples/ui-widgets/avakio-googlemap-example';
import { AvakioGroupListExample } from './examples/ui-widgets/avakio-grouplist-example';
import { AvakioDashboardExample } from './examples/ui-widgets/avakio-dashboard-example';
import { AvakioLabel } from './components/avakio/ui-controls/avakio-label/avakio-label';
import { AvakioButton } from './components/avakio/ui-controls/avakio-button/avakio-button';
import './components/avakio/views/avakio-view/avakio-view.css';
import './components/avakio/layouts/avakio-layout/avakio-layout.css';
import './components/avakio/avakio-sidebar/avakio-sidebar.css';
import './components/avakio/views/avakio-multiview/avakio-multiview.css';
import { AvakioTemplate } from './components/avakio/views/avakio-template/avakio-template';
import { Layout, Layers, Box, AlignJustify, FileText, LayoutGrid, Grid3X3, Lightbulb, ImageIcon, Type, Tag, FolderTree, PanelTopClose, BarChart3, Gauge, Map, List, LayoutDashboard, Palette, Menu } from 'lucide-react';

export default function ComponentsShowcasePage() {
  const [selectedView, setSelectedView] = useState<string>(() => {
    return localStorage.getItem('avakio-showcase-view') || 'components';
  });
  const [theme, setTheme] = useState<string>(() => {
    return localStorage.getItem('avakio-showcase-theme') || 'material';
  });
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const mainContentRef = useRef<AvakioMultiviewRef>(null);

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

  const setAdminTheme = (val: string) => {
    setTheme(val);
    localStorage.setItem('avakio-showcase-theme', val);
    document.documentElement.setAttribute('data-admin-theme', val);
  };

  // Sidebar menu data
  const sidebarData: SidebarItem[] = [
    {
      id: 'complex',
      value: 'Complex',
      icon: <Layers size={18} />,
    },
    {
      id: 'layout',
      value: 'Layout',
      icon: <Layout size={18} />,
      data: [
        {
          id: 'layout-examples',
          value: 'Layout',
          icon: <AlignJustify size={16} />,
        },
        {
          id: 'absolute-layout-examples',
          value: 'Absolute Layout',
          icon: <Layers size={16} />,
        },
        {
          id: 'resizer-examples',
          value: 'Resizer',
          icon: <Box size={16} />,
        },
        {
          id: 'grid-examples',
          value: 'Grid',
          icon: <Grid3X3 size={16} />,
        },
      ],
    },
    {
      id: 'views',
      value: 'Views',
      icon: <Layers size={18} />,
      data: [
        {
          id: 'view-example',
          value: 'View',
          icon: <Box size={16} />,
        },
        {
          id: 'template-example',
          value: 'Template',
          icon: <FileText size={16} />,
        },
        {
          id: 'multiview-example',
          value: 'Multiview',
          icon: <LayoutGrid size={16} />,
        },
      ],
    },
    {
      id: 'ui-widgets',
      value: 'UI Widgets',
      icon: <Box size={18} />,
      data: [
        {
          id: 'hint-example',
          value: 'Hint',
          icon: <Lightbulb size={16} />,
        },
        {
          id: 'carousel-example',
          value: 'Carousel',
          icon: <ImageIcon size={16} />,
        },
        {
          id: 'view-header-example',
          value: 'View Header',
          icon: <FileText size={16} />,
        },
        {
          id: 'tree-example',
          value: 'Tree',
          icon: <FolderTree size={16} />,
        },
        {
          id: 'accordion-example',
          value: 'Accordion',
          icon: <PanelTopClose size={16} />,
        },
        {
          id: 'chart-example',
          value: 'Chart',
          icon: <BarChart3 size={16} />,
        },
        {
          id: 'bullet-graph-example',
          value: 'Bullet Graph',
          icon: <AlignJustify size={16} />,
        },
        {
          id: 'comment-example',
          value: 'Comment',
          icon: <Box size={16} />,
        },
        {
          id: 'form-example',
          value: 'Form',
          icon: <FileText size={16} />,
        },
        {
          id: 'excel-viewer-example',
          value: 'Excel Viewer',
          icon: <Grid3X3 size={16} />,
        },
        {
          id: 'gage-example',
          value: 'Gage',
          icon: <Gauge size={16} />,
        },
        {
          id: 'googlemap-example',
          value: 'Google Map',
          icon: <Map size={16} />,
        },
        {
          id: 'grouplist-example',
          value: 'GroupList',
          icon: <List size={16} />,
        },
      ],
    },
    {
      id: 'ui-controls',
      value: 'UI Controls',
      icon: <Type size={18} />,
      data: [
        {
          id: 'text-example',
          value: 'Text',
          icon: <Type size={16} />,
        },
        {
          id: 'label-example',
          value: 'Label',
          icon: <Tag size={16} />,
        },
        {
          id: 'button-example',
          value: 'Button',
          icon: <Box size={16} />,
        },
        {
          id: 'checkbox-example',
          value: 'Checkbox',
          icon: <Box size={16} />,
        },
        {
          id: 'togglebutton-example',
          value: 'Toggle Button',
          icon: <Box size={16} />,
        },
        {
          id: 'switchbutton-example',
          value: 'Switch Button',
          icon: <Box size={16} />,
        },
        {
          id: 'colorpicker-example',
          value: 'Color Picker',
          icon: <Palette size={16} />,
        },
        {
          id: 'counter-example',
          value: 'Counter',
          icon: <Box size={16} />,
        },
        {
          id: 'combo-example',
          value: 'Combo',
          icon: <Box size={16} />,
        },
        {
          id: 'richselect-example',
          value: 'RichSelect',
          icon: <Box size={16} />,
        },
        {
          id: 'datepicker-example',
          value: 'DatePicker',
          icon: <Box size={16} />,
        },
        {
          id: 'daterangepicker-example',
          value: 'DateRangePicker',
          icon: <Box size={16} />,
        },
        {
          id: 'slider-example',
          value: 'Slider',
          icon: <Box size={16} />,
        },
        {
          id: 'multicombo-example',
          value: 'MultiCombo',
          icon: <Box size={16} />,
        },
        {
          id: 'tabbar-example',
          value: 'TabBar',
          icon: <Menu size={16} />,
        },
        {
          id: 'segmentedbutton-example',
          value: 'Segmented Button',
          icon: <Box size={16} />,
        },
        {
          id: 'radio-example',
          value: 'Radio',
          icon: <Box size={16} />,
        },
        {
          id: 'multitext-example',
          value: 'Multitext',
          icon: <Box size={16} />,
        },
        {
          id: 'doublelist-example',
          value: 'DoubleList',
          icon: <Box size={16} />,
        },
        {
          id: 'fieldset-example',
          value: 'Fieldset',
          icon: <Box size={16} />,
        },
        {
          id: 'dashboard-example',
          value: 'Dashboard',
          icon: <LayoutDashboard size={16} />,
        },
      ],
    },
    {
      id: 'future2',
      value: 'Future 2',
      icon: <Box size={18} />,
    },
  ];

  const handleSidebarSelect = (item: SidebarItem) => {
    setSelectedView(item.id);
    localStorage.setItem('avakio-showcase-view', item.id);
    mainContentRef.current?.setValue(item.id);
  };

  // Restore view and theme on mount
  useEffect(() => {
    const savedView = localStorage.getItem('avakio-showcase-view');
    const savedTheme = localStorage.getItem('avakio-showcase-theme');
    
    if (savedTheme) {
      document.documentElement.setAttribute('data-admin-theme', savedTheme);
    }
    
    if (savedView && mainContentRef.current) {
      mainContentRef.current.setValue(savedView);
    }
  }, []);

  // Stable callback for navigation (removed - not needed in standalone demo)

  const components = useMemo(() => [
    {
      title: 'AvakioCombo',
      description: 'Editable combo box with filtering and search',
      path: '/avakio-combo-example',
    },
    {
      title: 'AvakioRichSelect',
      description: 'Non-editable select dropdown ()',
      path: '/avakio-richselect-example',
    },
    {
      title: 'AvakioGridSuggest',
      description: 'Dropdown with datatable/grid display ()',
      path: '/avakio-gridsuggest-example',
    },
    {
      title: 'AvakioCheckbox',
      description: 'Theme-aware checkbox with indeterminate, descriptions, and errors',
      path: '/avakio-checkbox-example',
    },
    {
      title: 'AvakioColorPicker',
      description: 'Theme-aware color picker with presets, hex input, and preview',
      path: '/avakio-colorpicker-example',
    },
    {
      title: 'AvakioCounter',
      description: 'Numeric stepper with clamp, themes, and editable input',
      path: '/avakio-counter-example',
    },
    {
      title: 'AvakioButton',
      description: 'Theme-aware button with variants, icons, badges, and loading state',
      path: '/avakio-button-example',
    },
    {
      title: 'AvakioTabBar',
      description: 'Tab navigation with icons, badges, closable tabs ()',
      path: '/avakio-tabbar-example',
    },
    {
      title: 'AvakioMultiCombo',
      description: 'Multi-select combo box with tags',
      path: '/avakio-multicombo-demo',
    },
    {
      title: 'AvakioDatePicker',
      description: 'Date picker component',
      path: '/avakio-datepicker-demo',
    },
    {
      title: 'AvakioDataTable',
      description: 'Advanced data table with filtering, sorting, and pagination',
      path: '/avakio-datatable-demo',
    },
    {
      title: 'AvakioDateRangePicker',
      description: 'Dual-calendar date range picker with presets and themes',
      path: '/avakio-daterangepicker-example',
    },
    {
      title: 'AvakioSlider',
      description: 'Theme-aware slider with marks, steps, and value display',
      path: '/avakio-slider-example',
    },
    {
      title: 'AvakioScheduler',
      description: 'scheduler with month/week/day views and themed UI',
      path: '/avakio-scheduler-example',
    },
    {
      title: 'AvakioPopup',
      description: 'Theme-aware popup/modal )',
      path: '/avakio-sidebar-example',
    },
    {
      title: 'AvakioView',
      description: 'Versatile view container with theming, animations, and flexible layouts',
      path: '/avakio-view-example',
    },
  ], []);

  // Main content cells for the multiview
  const mainContentCells = useMemo(() => [
    {
      id: 'layout-examples',
      content: <AvakioLayoutExample />,
    },
    {
      id: 'absolute-layout-examples',
      content: <AvakioAbsoluteLayoutExample />,
    },
    {
      id: 'resizer-examples',
      content: <AvakioResizerExample />,
    },
    {
      id: 'grid-examples',
      content: <AvakioGridExample />,
    },
    {
      id: 'template-example',
      content: <AvakioTemplateExample />,
    },
    {
      id: 'multiview-example',
      content: <AvakioMultiviewExample />,
    },
    {
      id: 'view-example',
      content: <AvakioViewExample />,
    },
    {
      id: 'hint-example',
      content: <AvakioHintExample />,
    },
    {
      id: 'carousel-example',
      content: <AvakioCarouselExample />,
    },
    {
      id: 'view-header-example',
      content: <AvakioViewHeaderExample />,
    },
    {
      id: 'tree-example',
      content: <AvakioTreeExample />,
    },
    {
      id: 'accordion-example',
      content: <AvakioAccordionExample />,
    },
    {
      id: 'chart-example',
      content: <AvakioChartExample />,
    },
    {
      id: 'bullet-graph-example',
      content: <AvakioBulletGraphExample />,
    },
    {
      id: 'comment-example',
      content: <AvakioCommentExample />,
    },
    {
      id: 'form-example',
      content: <AvakioFormExample />,
    },
    {
      id: 'excel-viewer-example',
      content: <AvakioExcelViewerExample />,
    },
    {
      id: 'gage-example',
      content: <AvakioGageExample />,
    },
    {
      id: 'googlemap-example',
      content: <AvakioGoogleMapExample />,
    },
    {
      id: 'grouplist-example',
      content: <AvakioGroupListExample />,
    },
    {
      id: 'text-example',
      content: <AvakioTextExample />,
    },
    {
      id: 'label-example',
      content: <AvakioLabelExample />,
    },
    {
      id: 'button-example',
      content: <AvakioButtonExample />,
    },
    {
      id: 'checkbox-example',
      content: <AvakioCheckboxExample />,
    },
    {
      id: 'togglebutton-example',
      content: <AvakioToggleButtonExample />,
    },
    {
      id: 'switchbutton-example',
      content: <AvakioSwitchButtonExample />,
    },
    {
      id: 'colorpicker-example',
      content: <AvakioColorPickerExample />,
    },
    {
      id: 'counter-example',
      content: <AvakioCounterExample />,
    },
    {
      id: 'combo-example',
      content: <AvakioComboExample />,
    },
    {
      id: 'richselect-example',
      content: <AvakioRichSelectExample />,
    },
    {
      id: 'datepicker-example',
      content: <AvakioDatePickerExample />,
    },
    {
      id: 'daterangepicker-example',
      content: <AvakioDateRangePickerExample />,
    },
    {
      id: 'slider-example',
      content: <AvakioSliderExample />,
    },
    {
      id: 'multicombo-example',
      content: <AvakioMultiComboExample />,
    },
    {
      id: 'tabbar-example',
      content: <AvakioTabBarExample />,
    },
    {
      id: 'segmentedbutton-example',
      content: <AvakioSegmentedButtonExample />,
    },
    {
      id: 'radio-example',
      content: <AvakioRadioExample />,
    },
    {
      id: 'multitext-example',
      content: <AvakioMultitextExample />,
    },
    {
      id: 'doublelist-example',
      content: <AvakioDoubleListExample />,
    },
    {
      id: 'fieldset-example',
      content: <AvakioFieldsetExample />,
    },
    {
      id: 'dashboard-example',
      content: <AvakioDashboardExample />,
    },
    {
      id: 'ui-widgets',
      content: (
        <div style={{ padding: '20px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>UI Widgets</h2>
          <p style={{ color: '#666' }}>Select a specific UI widget component from the sidebar submenu.</p>
        </div>
      ),
    },
    {
      id: 'ui-controls',
      content: (
        <div style={{ padding: '20px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>UI Controls</h2>
          <p style={{ color: '#666' }}>Select a specific UI control component from the sidebar submenu.</p>
        </div>
      ),
    },
    {
      id: 'layout',
      content: (
        <div style={{ padding: '20px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>Layout Components</h2>
          <p style={{ color: '#666' }}>Select a specific layout component from the sidebar submenu.</p>
        </div>
      ),
    },
    {
      id: 'views',
      content: (
        <div style={{ padding: '20px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>View Components</h2>
          <p style={{ color: '#666' }}>Select a specific view component from the sidebar submenu.</p>
        </div>
      ),
    },
    {
      id: 'complex',
      content: (
        <div style={{ padding: '20px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>Complex Components</h2>
          <p style={{ color: '#666' }}>Complex component examples will be displayed here.</p>
        </div>
      ),
    },
    {
      id: 'future2',
      content: (
        <div style={{ padding: '20px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>Future 2</h2>
          <p style={{ color: '#666' }}>Future component examples will be displayed here.</p>
        </div>
      ),
    },
    {
      id: 'components',
      content: (
        <div style={{ padding: '20px' }}>
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Avakio Components Showcase</h1>
            <p className="text-lg text-gray-600">
              Explore all available Avakio components with live examples and documentation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {components.map((component) => (
              <div
                key={component.path}
                className="cursor-pointer hover:shadow-lg transition-shadow border rounded-lg p-4 bg-white"
                style={{ border: '1px solid #e5e7eb' }}
              >
                <div>
                  <h3 className="text-lg font-semibold mb-2">{component.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{component.description}</p>
                </div>
                <div>
                  <button className="text-blue-600 hover:text-blue-700 font-medium">
                    View Examples →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
  ], [components]);

  return (
    <AvakioLayout
      id='WebAppMainLayout'
      type="clean"
      height="100vh"
      css={{ height: '100vh', width: '100%' }}
      data-admin-theme={theme}
      rows={[        
        // Header
        <AvakioView
          id="WebAppMainLayoutViewHeader"
          data-admin-theme={theme}
          theme={theme as any}
          borderless={false}
          padding="0 0 0 0"
          width="100%"
          type='header'                    
        >

          <AvakioLayout
            id="WebAppMainLayoutViewLayoutHeader"
            type='clean'
            height="100%"
            width="100%"
            gravity={1}
            cols={[
              <AvakioView
                id="WebAppMainLayoutHeaderToggle"
                data-admin-theme={theme}
                theme={theme as any}
                borderless={true}                
                padding="10px 10px 10px 10px"
                type='header'                    
              >
                <AvakioButton
                  id="WebAppMainLayoutHeaderToggleBtn"
                  onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                  variant="outline"
                  size="md"
                  className="header-sidebar-toggle"
                  aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                  autowidth={true}
                >
                  <Menu size={20} />
                </AvakioButton>
              </AvakioView>,
              <AvakioView
                id="WebAppMainLayoutHeaderTitle"
                data-admin-theme={theme}
                theme={theme as any}
                borderless={true}
                gravity={1}
                padding="0 0 10px 0"
                type='header'                    
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>            
                  <AvakioLabel
                    id="WebAppMainLayoutHeaderTitleLabel"
                    label="Avakio UI Components Showcase"
                    theme={theme as any}
                    fontSize={24}
                    fontWeight="bold"
                  />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Palette size={18} />
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {themes.map((t) => (
                      <AvakioButton
                        key={t.id}
                        onClick={() => setAdminTheme(t.id)}
                        theme={(theme === t.id ? t.id : 'material') as any}
                        variant={theme === t.id ? 'primary' : 'outline'}
                        size="sm"
                      >
                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: t.color, marginRight: '6px' }} />
                        {t.name}
                      </AvakioButton>
                    ))}
                  </div>
                </div>
              </AvakioView>,
            ]}
          />
        </AvakioView>,
          
        // Main content area with left, content, right
          <AvakioLayout
            id="WebAppMainLayoutMain"
            type="clean"
            height="100%"
            gravity={1}
            cols={[
              // Left Sidebar
              <AvakioSidebar
                id="WebAppMainLayoutMainSidebar"
                data={sidebarData}
                position="left"
                width={260}
                onSelect={handleSidebarSelect}
                multipleOpen={false}
                collapsed={sidebarCollapsed}
                onToggle={setSidebarCollapsed}
              />,
              
              // Main Content
              <AvakioMultiview
                ref={mainContentRef}
                id="WebAppMainLayoutMainContent"
                testId="WebAppMainLayoutMainContent"
                theme={theme as any}
                cells={mainContentCells}
                activeView="components"
                animate={{ type: 'fade' as any, duration: 200 }}
                keepViews={true}
                css={{ flex: 1, overflow: 'auto', background: 'white', height: '100%' }}
                height="100%"
              />,
            ]}
            css={{ minHeight: 0 }}
          />,
          
          // Footer
          <AvakioView
            id="WebAppMainLayoutFooter"
            css={{
              padding: '12px 24px',
              background: '#f5f5f5',
              borderTop: '1px solid #e0e0e0',
              textAlign: 'center',
              fontSize: '14px',
              color: '#666',
            }}
          >
            © 2025 Avakio UI Components • Built with React & TypeScript
          </AvakioView>,
        ]}
      />
  );
}

