import React, { useState, useRef } from 'react';
import { AvakioViewHeader, AvakioViewHeaderRef } from '../../components/avakio/ui-widgets/avakio-view-header/avakio-view-header';
import { AvakioTemplate } from '../../components/avakio/views/avakio-template/avakio-template';
import { AvakioLayout } from '../../components/avakio/layouts/avakio-layout/avakio-layout';
import { AvakioButton } from '../../components/avakio/ui-controls/avakio-button/avakio-button';
import { AvakioDataTable } from '../../components/avakio/data-presentation/avakio-datatable/AvakioDataTable';
import type { AvakioColumn } from '../../components/avakio/data-presentation/avakio-datatable/AvakioDataTable';
import { AvakioTabBar } from '../../components/avakio/ui-controls/avakio-tabbar/avakio-tabbar';
import { AvakioProperty, AvakioPropertyItem, AvakioPropertyRef } from '../../components/avakio/data-presentation/avakio-property/avakio-property';
import { addEventLog } from '../../services/event-log-service';
import { formatSizingValue } from '../../lib/utils';
import { 
  PanelTop,
  Settings2,
  Play,
  Book,
} from 'lucide-react';
import './avakio-view-header-example.css';

// Tab options for navigation
const TAB_OPTIONS = [
  { id: 'basic', label: 'Basic Usage', icon: <PanelTop size={14} /> },
  { id: 'options', label: 'Options', icon: <Settings2 size={14} /> },
  { id: 'playground', label: 'Interactive Playground', icon: <Play size={14} /> },
  { id: 'docs', label: 'Documentation', icon: <Book size={14} /> },
];

export function AvakioViewHeaderExample() {
  const [activeSection, setActiveSection] = useState<string | number | null>('basic');
  
  // Section refs for scroll navigation
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  
  // Playground state
  const [playgroundProps, setPlaygroundProps] = useState<AvakioPropertyItem[]>([
    // Identity Group
    { id: 'componentId', label: 'ID', type: 'text', value: 'playground-header', group: 'Identity', placeholder: 'Component ID' },
    { id: 'testId', label: 'Test ID', type: 'text', value: '', group: 'Identity', placeholder: 'Test ID for testing' },
    { id: 'className', label: 'Class Name', type: 'text', value: '', group: 'Identity', placeholder: 'Additional CSS class' },
    
    // Content Group
    { id: 'label', label: 'Label', type: 'text', value: 'UI WIDGETS', group: 'Content', placeholder: 'Label text' },
    { id: 'title', label: 'Title', type: 'text', value: 'View Header Component', group: 'Content', placeholder: 'Title text' },
    { id: 'subTitle', label: 'Subtitle', type: 'text', value: 'A themed header component for displaying labels, titles, and subtitles', group: 'Content', placeholder: 'Subtitle text' },
    { id: 'theme', label: 'Theme', type: 'select', value: 'material', group: 'Content', selectOptions: [
      { id: 'material', value: 'Material' },
      { id: 'flat', value: 'Flat' },
      { id: 'compact', value: 'Compact' },
      { id: 'dark', value: 'Dark' },
      { id: 'ocean', value: 'Ocean' },
      { id: 'sunset', value: 'Sunset' },
    ]},
    { id: 'tooltip', label: 'Tooltip', type: 'text', value: '', group: 'Content', placeholder: 'Tooltip text' },
    { id: 'size', label: 'Size', type: 'select', value: 'default', group: 'Content', selectOptions: [
      { id: 'default', value: 'Default' },
      { id: 'compact', value: 'Compact' },
    ]},
    
    // Visibility Group
    { id: 'showLabel', label: 'Show Label', type: 'checkbox', value: true, group: 'Visibility', checkboxLabel: 'Display label' },
    { id: 'showTitle', label: 'Show Title', type: 'checkbox', value: true, group: 'Visibility', checkboxLabel: 'Display title' },
    { id: 'showSubTitle', label: 'Show Subtitle', type: 'checkbox', value: true, group: 'Visibility', checkboxLabel: 'Display subtitle' },
    
    // Layout Group
    { id: 'isSticky', label: 'Sticky', type: 'checkbox', value: false, group: 'Layout', checkboxLabel: 'Stick to top when scrolling' },
    { id: 'borderless', label: 'Borderless', type: 'checkbox', value: false, group: 'Layout', checkboxLabel: 'Remove borders' },
    
    // Sizing Group
    { id: 'width', label: 'Width', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 100% or 800px' },
    { id: 'height', label: 'Height', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 80px' },
    { id: 'minWidth', label: 'Min Width', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 600px' },
    { id: 'maxWidth', label: 'Max Width', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 1200px' },
    { id: 'minHeight', label: 'Min Height', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 60px' },
    { id: 'maxHeight', label: 'Max Height', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 100px' },
    { id: 'margin', label: 'Margin', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 8 or 8,16,8,16' },
    { id: 'padding', label: 'Padding', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 16 or 16,24,16,24' },
    
    // State Group
    { id: 'disabled', label: 'Disabled', type: 'checkbox', value: false, group: 'State', checkboxLabel: 'Disable the component' },
    { id: 'hidden', label: 'Hidden', type: 'checkbox', value: false, group: 'State', checkboxLabel: 'Hide the component' },
    
    // Events Group (toggles to enable event logging)
    { id: 'logOnClick', label: 'Log onItemClick', type: 'checkbox', value: true, group: 'Events', checkboxLabel: 'Log onItemClick events' },
    { id: 'logOnBlur', label: 'Log onBlur', type: 'checkbox', value: false, group: 'Events', checkboxLabel: 'Log onBlur events' },
    { id: 'logOnFocus', label: 'Log onFocus', type: 'checkbox', value: false, group: 'Events', checkboxLabel: 'Log onFocus events' },
    { id: 'logOnKeyPress', label: 'Log onKeyPress', type: 'checkbox', value: false, group: 'Events', checkboxLabel: 'Log onKeyPress events' },
    { id: 'logOnAfterRender', label: 'Log onAfterRender', type: 'checkbox', value: false, group: 'Events', checkboxLabel: 'Log onAfterRender events', disabled: true, description: 'Disabled: causes infinite render loop' },
    { id: 'logOnBeforeRender', label: 'Log onBeforeRender', type: 'checkbox', value: false, group: 'Events', checkboxLabel: 'Log onBeforeRender events', disabled: true, description: 'Disabled: causes infinite render loop' },
    { id: 'logOnViewShow', label: 'Log onViewShow', type: 'checkbox', value: false, group: 'Events', checkboxLabel: 'Log onViewShow events' },
  ]);

  // Helper to get prop value from playground props
  const getPropValue = <T,>(propId: string, defaultValue: T): T => {
    const prop = playgroundProps.find(p => p.id === propId);
    if (prop?.value === undefined || prop?.value === null || prop?.value === '') return defaultValue;
    return prop.value as T;
  };

  // Handle property changes (update state only, no logging)
  const handlePlaygroundPropsChange = (items: AvakioPropertyItem[], changed: AvakioPropertyItem) => {
    setPlaygroundProps(items);
  };

  // Ref example
  const viewHeaderRef = useRef<AvakioViewHeaderRef>(null);
  const propertyRef = useRef<AvakioPropertyRef>(null);
  const [eventLog, setEventLog] = useState<string[]>([]);

  // Scroll to section when tab is clicked
  const handleTabChange = ({ value }: { value: string | number | null }) => {
    setActiveSection(value);
    if (value && sectionRefs.current[value as string]) {
      const element = sectionRefs.current[value as string];
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  // Add to local event log and global event log
  const addLog = (action: string, details: string = '') => {
    // Add to local log for display in the example
    setEventLog(prev => [...prev.slice(-4), `${new Date().toLocaleTimeString()} - ${action}${details ? ': ' + details : ''}`]);
    // Add to global event log sidebar
    addEventLog('ViewHeader', action, details);
  };

  // Add textOnBlur handlers to text fields after addLog is defined
  React.useEffect(() => {
    setPlaygroundProps(prev => prev.map(item => {
      if (item.type === 'text' && ['componentId', 'testId', 'className', 'label', 'title', 'subTitle', 'tooltip', 'width', 'height', 'minWidth', 'maxWidth', 'minHeight', 'maxHeight', 'margin', 'padding'].includes(item.id)) {
        return {
          ...item,
          textOnBlur: (value: string, itm: AvakioPropertyItem) => addLog('Playground prop changed', `${itm.label}: ${value}`)
        };
      }
      return item;
    }));
  }, []);

  // Props documentation data
  interface PropDoc {
    id: number;
    name: string;
    type: string;
    defaultValue: string;
    description: string;
    from: string;
  }

  const propsData: PropDoc[] = [
    // Component-Specific Props
    { id: 1, name: 'label', type: 'string', defaultValue: "''", description: 'The label text displayed above the title', from: 'ViewHeader' },
    { id: 2, name: 'title', type: 'string', defaultValue: "''", description: 'The main title text', from: 'ViewHeader' },
    { id: 3, name: 'subTitle', type: 'string', defaultValue: "''", description: 'The subtitle text displayed below the title', from: 'ViewHeader' },
    { id: 4, name: 'theme', type: 'string', defaultValue: 'undefined', description: 'Theme variant (material, flat, compact, dark, ocean, sunset)', from: 'ViewHeader' },
    { id: 5, name: 'showLabel', type: 'boolean', defaultValue: 'true', description: 'Controls visibility of the label', from: 'ViewHeader' },
    { id: 6, name: 'showTitle', type: 'boolean', defaultValue: 'true', description: 'Controls visibility of the title', from: 'ViewHeader' },
    { id: 7, name: 'showSubTitle', type: 'boolean', defaultValue: 'true', description: 'Controls visibility of the subtitle', from: 'ViewHeader' },
    { id: 8, name: 'isSticky', type: 'boolean', defaultValue: 'true', description: 'Whether the header sticks to the top when scrolling', from: 'ViewHeader' },
    { id: 9, name: 'size', type: "'default' | 'compact'", defaultValue: "'default'", description: 'Size variant. Compact shows only title with max height of 30', from: 'ViewHeader' },
    
    // Base Props - Identity
    { id: 10, name: 'id', type: 'string', defaultValue: 'undefined', description: 'Component ID', from: 'Base' },
    { id: 11, name: 'testId', type: 'string', defaultValue: 'undefined', description: 'Test ID for testing purposes', from: 'Base' },
    { id: 12, name: 'className', type: 'string', defaultValue: 'undefined', description: 'Additional CSS class names', from: 'Base' },
    { id: 13, name: 'style', type: 'React.CSSProperties', defaultValue: 'undefined', description: 'Custom inline styles for the root element', from: 'Base' },
    
    // Base Props - Appearance
    { id: 14, name: 'tooltip', type: 'string', defaultValue: 'undefined', description: 'Tooltip text shown on hover', from: 'Base' },
    { id: 15, name: 'borderless', type: 'boolean', defaultValue: 'false', description: 'Removes borders from the component', from: 'Base' },
    
    // Base Props - Sizing
    { id: 16, name: 'width', type: 'number | string', defaultValue: 'undefined', description: 'Width of the component', from: 'Base' },
    { id: 17, name: 'height', type: 'number | string', defaultValue: 'undefined', description: 'Height of the component', from: 'Base' },
    { id: 18, name: 'minWidth', type: 'number | string', defaultValue: 'undefined', description: 'Minimum width of the component', from: 'Base' },
    { id: 19, name: 'maxWidth', type: 'number | string', defaultValue: 'undefined', description: 'Maximum width of the component', from: 'Base' },
    { id: 20, name: 'minHeight', type: 'number | string', defaultValue: 'undefined', description: 'Minimum height of the component', from: 'Base' },
    { id: 21, name: 'maxHeight', type: 'number | string', defaultValue: 'undefined', description: 'Maximum height of the component', from: 'Base' },
    { id: 22, name: 'margin', type: 'number | string | [number, number, number, number]', defaultValue: 'undefined', description: 'Margin around the component', from: 'Base' },
    { id: 23, name: 'padding', type: 'number | string | [number, number, number, number]', defaultValue: 'undefined', description: 'Padding inside the component', from: 'Base' },
    
    // Base Props - State
    { id: 24, name: 'disabled', type: 'boolean', defaultValue: 'false', description: 'Whether the component is disabled', from: 'Base' },
    { id: 25, name: 'hidden', type: 'boolean', defaultValue: 'false', description: 'Whether the component is hidden', from: 'Base' },
  ];

  const eventsData: PropDoc[] = [
    { id: 1, name: 'onItemClick', type: '(event: MouseEvent) => void', defaultValue: 'undefined', description: 'Fires after the control has been clicked', from: 'Base' },
    { id: 2, name: 'onBlur', type: '(event: FocusEvent) => void', defaultValue: 'undefined', description: 'Fires when focus is moved out of the view', from: 'Base' },
    { id: 3, name: 'onFocus', type: '(event: FocusEvent) => void', defaultValue: 'undefined', description: 'Fires when a view gets focus', from: 'Base' },
    { id: 4, name: 'onKeyPress', type: '(event: KeyboardEvent) => void', defaultValue: 'undefined', description: 'Occurs when keyboard key is pressed for the control in focus', from: 'Base' },
    { id: 5, name: 'onAfterRender', type: '() => void', defaultValue: 'undefined', description: 'Occurs immediately after the component has been rendered', from: 'Base' },
    { id: 6, name: 'onBeforeRender', type: '() => void', defaultValue: 'undefined', description: 'Occurs immediately before the component has been rendered', from: 'Base' },
    { id: 7, name: 'onViewShow', type: '() => void', defaultValue: 'undefined', description: 'Fires when any hidden view is shown', from: 'Base' },
  ];

  const refMethodsData: PropDoc[] = [
    { id: 1, name: 'getValue()', type: '() => string | undefined', defaultValue: '-', description: 'Returns the current title or label text', from: 'Base' },
    { id: 2, name: 'getText()', type: '() => string', defaultValue: '-', description: 'Gets actual text value from the control', from: 'Base' },
    { id: 3, name: 'focus()', type: '() => void', defaultValue: '-', description: 'Sets focus to the control', from: 'Base' },
    { id: 4, name: 'blur()', type: '() => void', defaultValue: '-', description: 'Removes focus from the control', from: 'Base' },
    { id: 5, name: 'validate()', type: '() => boolean | string', defaultValue: '-', description: 'Validates the component (always returns true)', from: 'Base' },
    { id: 6, name: 'isEnabled()', type: '() => boolean', defaultValue: '-', description: 'Checks whether the component is enabled', from: 'Base' },
    { id: 7, name: 'enable()', type: '() => void', defaultValue: '-', description: 'Enables the component that was disabled', from: 'Base' },
    { id: 8, name: 'disable()', type: '() => void', defaultValue: '-', description: 'Disables the component (makes it dimmed)', from: 'Base' },
    { id: 9, name: 'isVisible()', type: '() => boolean', defaultValue: '-', description: 'Checks whether the component is visible', from: 'Base' },
    { id: 10, name: 'show()', type: '() => void', defaultValue: '-', description: 'Makes the component visible', from: 'Base' },
    { id: 11, name: 'hide()', type: '() => void', defaultValue: '-', description: 'Hides the component', from: 'Base' },
    { id: 12, name: 'getElement()', type: '() => HTMLElement | null', defaultValue: '-', description: 'Returns the root DOM element of the component', from: 'Base' },
    { id: 13, name: 'getParentView()', type: '() => string | null', defaultValue: '-', description: 'Returns the ID of the parent Avakio container, or its classname if no ID is set', from: 'Base' },
    { id: 14, name: 'define(config, value?)', type: '(config: Partial<Props> | string, value?: unknown) => void', defaultValue: '-', description: 'Redefines a single configuration property or multiple properties', from: 'Base' },
  ];

  const propsColumns: AvakioColumn<PropDoc>[] = [
    { id: 'name', header: 'Property', width: 180 },
    { id: 'type', header: 'Type', width: 320 },
    { id: 'defaultValue', header: 'Default', width: 100 },
    { id: 'from', header: 'From', width: 100, filterType: 'combo' },
    { id: 'description', header: 'Description', width: 320 },
  ];

  return (
    <div className="avakio-view-header-demo-container">
      {/* Sticky Header + Tab Navigation */}
      <div className="avakio-example-sticky-header">
        {/* Header */}
        <AvakioViewHeader
          label="UI Widgets"
          title="View Header"
          subTitle="A themed header component for displaying labels, titles, and subtitles with full Base component features."
          isSticky={false}
        />

        {/* Tab Navigation */}
        <div className="avakio-example-tabbar-container">
          <AvakioTabBar
            id="view-header-demo-tabs"
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

      {/* Basic Usage Section */}
      <section 
        ref={(el) => { sectionRefs.current['basic'] = el; }}
        className="avakio-view-header-demo-section"
      >
        <AvakioTemplate
          type="section"
          borderType="clean"
          content="Basic Usage"
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="The ViewHeader component is a themed header for displaying labels, titles, and subtitles. It inherits all Base component functionality including sizing, state management, and event handling."
        />
        
        {/* Simple Headers */}
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[16, 0, 0, 16]}
          content={<strong>Simple Headers</strong>}
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioViewHeader
              isSticky={false}
              label="DOCUMENTATION"
              title="Getting Started"
              subTitle="Learn how to integrate and use Avakio components in your React applications."
            />,
          ]}
        />

        {/* Title Only */}
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[16, 0, 0, 16]}
          content={<strong>Title Only</strong>}
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioViewHeader
              isSticky={false}
              showLabel={false}
              showSubTitle={false}
              title="Simple Page Header"
            />,
          ]}
        />

        {/* Title and Subtitle */}
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[16, 0, 0, 16]}
          content={<strong>Title and Subtitle</strong>}
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioViewHeader
              isSticky={false}
              showLabel={false}
              title="Component Overview"
              subTitle="Explore the features and capabilities of this component."
            />,
          ]}
        />
      </section>

      {/* Options Section */}
      <section 
        ref={(el) => { sectionRefs.current['options'] = el; }}
        className="avakio-view-header-demo-section"
      >
        <AvakioTemplate
          type="section"
          borderType="clean"
          content="Options"
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="Customize the ViewHeader using component-specific and Base properties like theme, visibility toggles, sizing, and state."
        />

        {/* Theme Variations */}
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioTemplate
              key="theme-title"
              type="clean"
              borderType="clean"
              content={<strong>Theme Variations</strong>}
            />,
            ...['material', 'flat', 'compact', 'dark', 'ocean', 'sunset'].map((themeVariant) => (
              <div key={themeVariant} style={{ marginTop: 16 }}>
                <AvakioTemplate
                  type="clean"
                  borderType="clean"
                  margin={[0, 0, 8, 0]}
                  style={{ fontSize: '12px' }}
                  content={`theme="${themeVariant}"`}
                />
                <AvakioViewHeader
                  isSticky={false}
                  theme={themeVariant}
                  label="AVAKIO COMPONENTS"
                  title="View Header Example"
                  subTitle="This is how the header looks in the selected theme."
                />
              </div>
            )),
          ]}
        />

        {/* Sticky Header */}
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioTemplate
              key="sticky-title"
              type="clean"
              borderType="clean"
              content={<strong>Sticky Header</strong>}
            />,
            <AvakioTemplate
              key="sticky-desc"
              type="clean"
              borderType="clean"
              margin={[8, 0, 8, 0]}
              style={{ fontSize: '12px' }}
              content='isSticky={true}'
            />,
            <div key="sticky-demo" style={{ height: 200, overflow: 'auto', border: '1px solid #e2e8f0' }}>
              <AvakioViewHeader
                isSticky={true}
                label="STICKY HEADER"
                title="Scroll Demo"
                subTitle="This header will stick to the top of its container when scrolling."
              />
              <div style={{ padding: 16 }}>
                {Array.from({ length: 10 }, (_, i) => (
                  <p key={i}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.
                  </p>
                ))}
              </div>
            </div>,
          ]}
        />

        {/* States */}
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioTemplate
              key="states-title"
              type="clean"
              borderType="clean"
              content={<strong>States</strong>}
            />,
            <AvakioTemplate
              key="disabled-desc"
              type="clean"
              borderType="clean"
              margin={[8, 0, 8, 0]}
              style={{ fontSize: '12px' }}
              content='disabled=true'
            />,
            <AvakioViewHeader
              isSticky={false}
              label="DISABLED"
              title="Disabled Header"
              subTitle="This header is disabled."
              disabled
            />,
          ]}
        />
      </section>

      {/* Playground Section */}
      <section 
        ref={(el) => { sectionRefs.current['playground'] = el; }}
        className="avakio-view-header-demo-section"
      >
        <AvakioTemplate
          type="section"
          borderType="clean"
          content="Interactive Playground"
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="Experiment with different ViewHeader configurations in real-time. Change any property below to see the effect on the preview."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          height={650}            
          rows={[
            <AvakioLayout
              type="clean"
              borderless={true}
              responsive
              autoResize
              gap={16}
              height='100%'
              cols={[
                // Column 1 - Preview
                <AvakioLayout
                  type="clean"
                  borderless={true}                  
                  height='100%'
                  rows={[
                    <AvakioTemplate
                      type="clean"
                      borderType="clean"
                      padding={[0, 0, 10, 0]}
                      content={<span><strong>Preview</strong></span>}
                    />,
                    <AvakioLayout
                      type="clean"
                      padding={10}
                      borderless={false}
                      maxHeight='150px'
                      height='100%'
                      rows={[
                        <AvakioViewHeader
                          ref={viewHeaderRef}
                          id={getPropValue('componentId', 'playground-header')}
                          testId={getPropValue('testId', '') || undefined}
                          className={getPropValue('className', '') || undefined}
                          label={getPropValue('label', 'UI WIDGETS')}
                          title={getPropValue('title', 'View Header Component')}
                          subTitle={getPropValue('subTitle', 'A themed header component')}
                          theme={getPropValue('theme', 'material')}
                          size={getPropValue('size', 'default')}
                          tooltip={getPropValue('tooltip', '') || undefined}
                          showLabel={getPropValue('showLabel', true)}
                          showTitle={getPropValue('showTitle', true)}
                          showSubTitle={getPropValue('showSubTitle', true)}
                          isSticky={getPropValue('isSticky', false)}
                          borderless={getPropValue('borderless', false)}
                          width={formatSizingValue(getPropValue('width', ''))}
                          height={formatSizingValue(getPropValue('height', ''))}
                          minWidth={formatSizingValue(getPropValue('minWidth', ''))}
                          maxWidth={formatSizingValue(getPropValue('maxWidth', ''))}
                          minHeight={formatSizingValue(getPropValue('minHeight', ''))}
                          maxHeight={formatSizingValue(getPropValue('maxHeight', ''))}
                          margin={getPropValue('margin', '') ? getPropValue('margin', '').includes(',') ? getPropValue('margin', '').split(',').map(Number) as [number, number, number, number] : Number(getPropValue('margin', '')) : undefined}
                          padding={getPropValue('padding', '') ? getPropValue('padding', '').includes(',') ? getPropValue('padding', '').split(',').map(Number) as [number, number, number, number] : Number(getPropValue('padding', '')) : undefined}
                          disabled={getPropValue('disabled', false)}
                          hidden={getPropValue('hidden', false)}
                          onItemClick={() => {
                            if (getPropValue('logOnClick', true)) addLog('onItemClick', 'header clicked');
                          }}
                          onBlur={(e) => {
                            if (getPropValue('logOnBlur', false)) addLog('onBlur', 'focus lost');
                          }}
                          onFocus={(e) => {
                            if (getPropValue('logOnFocus', false)) addLog('onFocus', 'focus gained');
                          }}
                          onKeyPress={(e) => {
                            if (getPropValue('logOnKeyPress', false)) addLog('onKeyPress', `key: ${e.key}`);
                          }}
                          onAfterRender={() => {
                            // Disabled: would cause infinite loop
                          }}
                          onBeforeRender={() => {
                            // Disabled: would cause infinite loop
                          }}
                          onViewShow={() => {
                            if (getPropValue('logOnViewShow', false)) addLog('onViewShow', 'view shown');
                          }}
                        />
                      ]}
                    />,
                    <AvakioTemplate
                      type="clean"
                      padding={[10, 0, 10, 0]}
                      borderType="clean"
                      content={<strong>Ref Methods</strong>}
                    />,
                    // Ref Methods
                    <AvakioLayout
                      type="clean"
                      padding={10}
                      borderless={false}                  
                      height='100%'
                      rows={[
                        <AvakioTemplate
                          type="clean"
                          padding={[10, 0, 10, 0]}
                          borderType="clean"
                          scroll="xy"
                          flexWrap={true}
                          content={
                            <>
                              <AvakioButton
                                size="sm"
                                label='getValue()'
                                margin={[0, 10, 10, 0]}
                                width='200px'
                                buttonWidth='150px'
                                onClick={() => {
                                  const val = viewHeaderRef.current?.getValue();
                                  addLog('getValue()', `returned: ${val || '(empty)'}`);
                                }}
                              />
                              <AvakioButton
                                size="sm"
                                label='getText()'
                                margin={[0, 10, 10, 0]}
                                width='200px'
                                buttonWidth='150px'
                                onClick={() => {
                                  const text = viewHeaderRef.current?.getText();
                                  addLog('getText()', `returned: ${text || '(empty)'}`);
                                }}
                              />
                              <AvakioButton
                                size="sm"
                                label='validate()'
                                margin={[0, 10, 10, 0]}
                                width='200px'
                                buttonWidth='150px'
                                onClick={() => {
                                  const result = viewHeaderRef.current?.validate();
                                  addLog('validate()', `returned: ${result}`);
                                }}
                              />
                              <AvakioButton
                                size="sm"
                                label='getParentView()'
                                margin={[0, 10, 10, 0]}
                                width='200px'
                                buttonWidth='150px'
                                onClick={() => {
                                  const parent = viewHeaderRef.current?.getParentView();
                                  addLog('getParentView()', `returned: ${parent || 'null'}`);
                                }}
                              />
                              <AvakioButton
                                size="sm"
                                label='getElement()'
                                margin={[0, 10, 10, 0]}
                                width='200px'
                                buttonWidth='150px'
                                onClick={() => {
                                  const node = viewHeaderRef.current?.getElement();
                                  addLog('getElement()', `returned: ${node ? node.tagName : 'null'}`);
                                }}
                              />
                              <AvakioButton
                                size="sm"
                                label='focus()'
                                margin={[0, 10, 10, 0]}
                                width='200px'
                                buttonWidth='150px'
                                onClick={() => {
                                  viewHeaderRef.current?.focus();
                                  addLog('focus()', 'called via ref');
                                }}
                              />
                              <AvakioButton
                                size="sm"
                                label='blur()'
                                margin={[0, 10, 10, 0]}
                                width='200px'
                                buttonWidth='150px'
                                onClick={() => {
                                  viewHeaderRef.current?.blur();
                                  addLog('blur()', 'called via ref');
                                }}
                              />
                              <AvakioButton
                                size="sm"
                                label='show()'
                                margin={[0, 10, 10, 0]}
                                width='200px'
                                buttonWidth='150px'
                                onClick={() => {
                                  viewHeaderRef.current?.show();
                                  addLog('show()', 'called via ref');
                                }}
                              />
                              <AvakioButton
                                size="sm"
                                label='hide()'
                                margin={[0, 10, 10, 0]}
                                width='200px'
                                buttonWidth='150px'
                                onClick={() => {
                                  viewHeaderRef.current?.hide();
                                  addLog('hide()', 'called via ref');
                                }}
                              />
                              <AvakioButton
                                size="sm"
                                label='isVisible()'
                                margin={[0, 10, 10, 0]}
                                width='200px'
                                buttonWidth='150px'
                                onClick={() => {
                                  const visible = viewHeaderRef.current?.isVisible();
                                  addLog('isVisible()', `returned: ${visible}`);
                                }}
                              />
                              <AvakioButton
                                size="sm"
                                label='enable()'
                                margin={[0, 10, 10, 0]}
                                width='200px'
                                buttonWidth='150px'
                                onClick={() => {
                                  viewHeaderRef.current?.enable();
                                  addLog('enable()', 'called via ref');
                                }}
                              />
                              <AvakioButton
                                size="sm"
                                label='disable()'
                                margin={[0, 10, 10, 0]}
                                width='200px'
                                buttonWidth='150px'
                                onClick={() => {
                                  viewHeaderRef.current?.disable();
                                  addLog('disable()', 'called via ref');
                                }}
                              />
                              <AvakioButton
                                size="sm"
                                label='isEnabled()'
                                margin={[0, 10, 10, 0]}
                                width='200px'
                                buttonWidth='150px'
                                onClick={() => {
                                  const enabled = viewHeaderRef.current?.isEnabled();
                                  addLog('isEnabled()', `returned: ${enabled}`);
                                }}
                              />
                              <AvakioButton
                                size="sm"
                                label='define()'
                                margin={[0, 10, 10, 0]}
                                width='200px'
                                buttonWidth='150px'
                                onClick={() => {
                                  viewHeaderRef.current?.define('title', 'Updated via define()');
                                  addLog('define()', 'set title to "Updated via define()"');
                                }}
                              />
                            </>
                          }
                        />
                      ]}
                    />,
                  ]}
                />,
                // Column 2 - Configuration
                <AvakioLayout
                  id='Layout-row-Column2'
                  type="clean"
                  borderless={true}
                  height='100%'
                  rows={[
                    <AvakioLayout
                      id='Layout-row1-col-Column2'
                      key="config-header"
                      type="clean"
                      borderless={true}
                      height='50px'
                      width='100%'
                      cols={[
                        <AvakioTemplate
                          id='Template-config-header'
                          type="clean"
                          borderType="clean"
                          content={<strong>Configuration</strong>}
                        />,
                        <AvakioTemplate
                          id='Template-config-header-button'
                          type="clean"
                          borderType="clean"
                          width='100%'
                          align="right"
                          content={
                            <>
                            <AvakioButton
                              id='Button-reset-playground'
                              size="sm"
                              label="Reset"
                              align="right"
                              onClick={() => {
                                // Reset to initial values
                                setPlaygroundProps([
                                  // Identity Group
                                  { id: 'componentId', label: 'ID', type: 'text', value: 'playground-header', group: 'Identity', placeholder: 'Component ID' },
                                  { id: 'testId', label: 'Test ID', type: 'text', value: '', group: 'Identity', placeholder: 'Test ID for testing' },
                                  { id: 'className', label: 'Class Name', type: 'text', value: '', group: 'Identity', placeholder: 'Additional CSS class' },
                                  // Content Group
                                  { id: 'label', label: 'Label', type: 'text', value: 'UI WIDGETS', group: 'Content', placeholder: 'Label text' },
                                  { id: 'title', label: 'Title', type: 'text', value: 'View Header Component', group: 'Content', placeholder: 'Title text' },
                                  { id: 'subTitle', label: 'Subtitle', type: 'text', value: 'A themed header component for displaying labels, titles, and subtitles', group: 'Content', placeholder: 'Subtitle text' },
                                  { id: 'theme', label: 'Theme', type: 'select', value: 'material', group: 'Content', selectOptions: [
                                    { id: 'material', value: 'Material' },
                                    { id: 'flat', value: 'Flat' },
                                    { id: 'compact', value: 'Compact' },
                                    { id: 'dark', value: 'Dark' },
                                    { id: 'ocean', value: 'Ocean' },
                                    { id: 'sunset', value: 'Sunset' },
                                  ]},
                                  { id: 'tooltip', label: 'Tooltip', type: 'text', value: '', group: 'Content', placeholder: 'Tooltip text' },
                                  { id: 'size', label: 'Size', type: 'select', value: 'default', group: 'Content', selectOptions: [
                                    { id: 'default', value: 'Default' },
                                    { id: 'compact', value: 'Compact' },
                                  ]},
                                  // Visibility Group
                                  { id: 'showLabel', label: 'Show Label', type: 'checkbox', value: true, group: 'Visibility', checkboxLabel: 'Display label' },
                                  { id: 'showTitle', label: 'Show Title', type: 'checkbox', value: true, group: 'Visibility', checkboxLabel: 'Display title' },
                                  { id: 'showSubTitle', label: 'Show Subtitle', type: 'checkbox', value: true, group: 'Visibility', checkboxLabel: 'Display subtitle' },
                                  // Layout Group
                                  { id: 'isSticky', label: 'Sticky', type: 'checkbox', value: false, group: 'Layout', checkboxLabel: 'Stick to top when scrolling' },
                                  { id: 'borderless', label: 'Borderless', type: 'checkbox', value: false, group: 'Layout', checkboxLabel: 'Remove borders' },
                                  // Sizing Group
                                  { id: 'width', label: 'Width', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 100% or 800px' },
                                  { id: 'height', label: 'Height', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 80px' },
                                  { id: 'minWidth', label: 'Min Width', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 600px' },
                                  { id: 'maxWidth', label: 'Max Width', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 1200px' },
                                  { id: 'minHeight', label: 'Min Height', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 60px' },
                                  { id: 'maxHeight', label: 'Max Height', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 100px' },
                                  { id: 'margin', label: 'Margin', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 8 or 8,16,8,16' },
                                  { id: 'padding', label: 'Padding', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 16 or 16,24,16,24' },
                                  // State Group
                                  { id: 'disabled', label: 'Disabled', type: 'checkbox', value: false, group: 'State', checkboxLabel: 'Disable the component' },
                                  { id: 'hidden', label: 'Hidden', type: 'checkbox', value: false, group: 'State', checkboxLabel: 'Hide the component' },
                                  // Events Group
                                  { id: 'logOnClick', label: 'Log onItemClick', type: 'checkbox', value: true, group: 'Events', checkboxLabel: 'Log onItemClick events' },
                                  { id: 'logOnBlur', label: 'Log onBlur', type: 'checkbox', value: false, group: 'Events', checkboxLabel: 'Log onBlur events' },
                                  { id: 'logOnFocus', label: 'Log onFocus', type: 'checkbox', value: false, group: 'Events', checkboxLabel: 'Log onFocus events' },
                                  { id: 'logOnKeyPress', label: 'Log onKeyPress', type: 'checkbox', value: false, group: 'Events', checkboxLabel: 'Log onKeyPress events' },
                                  { id: 'logOnAfterRender', label: 'Log onAfterRender', type: 'checkbox', value: false, group: 'Events', checkboxLabel: 'Log onAfterRender events', disabled: true, description: 'Disabled: causes infinite render loop' },
                                  { id: 'logOnBeforeRender', label: 'Log onBeforeRender', type: 'checkbox', value: false, group: 'Events', checkboxLabel: 'Log onBeforeRender events', disabled: true, description: 'Disabled: causes infinite render loop' },
                                  { id: 'logOnViewShow', label: 'Log onViewShow', type: 'checkbox', value: false, group: 'Events', checkboxLabel: 'Log onViewShow events' },
                                ]);
                                addLog('Reset', 'playground configuration reset to defaults');
                              }}
                            />                            
                            </>
                          }
                        />,
                      ]}
                    />,
                    <AvakioProperty
                      ref={propertyRef}
                      id='Property-playground-props'
                      className='avakio-fill-container'
                      items={playgroundProps}
                      onChange={handlePlaygroundPropsChange}
                      size='compact'
                      showBorders
                      autoHeight
                      overflowY='auto'
                    />,
                    <AvakioButton
                      size="sm"
                      padding={[10,10,10,10]}
                      label="Get Item Count"
                      align="right"
                      onClick={() => {
                        const count = propertyRef.current?.getItemCount();
                        addLog('PropertyItem Count', `Num of Items: ${count}`);
                      }}
                    />
                  ]}
                />,
              ]}
            />,
          ]}
        />
      </section>

      {/* Documentation Section */}
      <section 
        ref={(el) => { sectionRefs.current['docs'] = el; }}
        className="avakio-view-header-demo-section"
      >
        <AvakioTemplate
          type="section"
          borderType="clean"
          content="Documentation"
        />

        {/* Props Table */}
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[16, 0, 0, 16]}
          content={<strong>Props</strong>}
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={0}
          rows={[
            <AvakioDataTable<PropDoc>
              data={propsData}
              columns={propsColumns}
              filterable
              sortable
              select={false}
              showRowNum
            />,
          ]}
        />

        {/* Events Table */}
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[16, 0, 0, 16]}
          content={<strong>Events</strong>}
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={0}
          rows={[
            <AvakioDataTable<PropDoc>
              data={eventsData}
              columns={propsColumns}
              filterable
              sortable
              select={false}
              showRowNum
            />,
          ]}
        />

        {/* Ref Methods Table */}
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[16, 0, 0, 16]}
          content={<strong>Ref Methods</strong>}
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={0}
          rows={[
            <AvakioDataTable<PropDoc>
              data={refMethodsData}
              columns={propsColumns}
              filterable
              sortable
              select={false}
              showRowNum
            />,
          ]}
        />
      </section>
    </div>
  );
}

export default AvakioViewHeaderExample;




















