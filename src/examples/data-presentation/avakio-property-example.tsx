import React, { useState, useRef } from 'react';
import { AvakioProperty, AvakioPropertyItem, AvakioPropertyRef } from '../../components/avakio/data-presentation/avakio-property/avakio-property';
import { AvakioTemplate } from '../../components/avakio/views/avakio-template/avakio-template';
import { AvakioLayout } from '../../components/avakio/layouts/avakio-layout/avakio-layout';
import { AvakioButton } from '../../components/avakio/ui-controls/avakio-button/avakio-button';
import { AvakioDataTable } from '../../components/avakio/data-presentation/avakio-datatable/AvakioDataTable';
import type { AvakioColumn } from '../../components/avakio/data-presentation/avakio-datatable/AvakioDataTable';
import { AvakioTabBar } from '../../components/avakio/ui-controls/avakio-tabbar/avakio-tabbar';
import { AvakioViewHeader } from '../../components/avakio/ui-widgets/avakio-view-header/avakio-view-header';
import { addEventLog } from '../../services/event-log-service';
import { formatSizingValue } from '../../lib/utils';
import { 
  Settings,
  Settings2,
  Book,
  Play,
} from 'lucide-react';
import './avakio-property-example.css';

// Tab options for navigation
const TAB_OPTIONS = [
  { id: 'basic', label: 'Basic Usage', icon: <Settings size={14} /> },
  { id: 'options', label: 'Options', icon: <Settings2 size={14} /> },
  { id: 'playground', label: 'Interactive Playground', icon: <Play size={14} /> },
  { id: 'docs', label: 'Documentation', icon: <Book size={14} /> },
];

export function AvakioPropertyExample() {
  const [activeSection, setActiveSection] = useState<string | number | null>('basic');
  
  // Section refs for scroll navigation
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  
  // Ref for the playground property
  const playgroundPropertyRef = useRef<AvakioPropertyRef>(null);
  
  // Event log state
  const [eventLog, setEventLog] = useState<string[]>([]);

  // Add to local event log and global event log
  const addLog = (action: string, details: string = '') => {
    setEventLog(prev => [...prev.slice(-4), `${new Date().toLocaleTimeString()} - ${action}${details ? ': ' + details : ''}`]);
    addEventLog('Property', action, details);
  };

  // Add textOnBlur handlers to text fields after addLog is defined
  React.useEffect(() => {
    setPlaygroundProps(prev => prev.map(item => {
      if (item.type === 'text') {
        return {
          ...item,
          textOnBlur: (value: string, itm: AvakioPropertyItem) => addLog('Playground prop changed', `${itm.label}: ${value}`)
        };
      }
      return item;
    }));
  }, []);
  
  // Basic Usage demo items
  const [basicItems, setBasicItems] = useState<AvakioPropertyItem[]>([
    { 
      id: 'title', 
      label: 'Title', 
      type: 'text', 
      value: 'My Dashboard', 
      placeholder: 'Enter title', 
      group: 'General',
      textOnBlur: (value, item) => addEventLog('Property', 'onBlur', `${item.label}: "${value}"`),
      textOnFocus: (value, item) => addEventLog('Property', 'onFocus', `${item.label}: "${value}"`),
      textOnEnter: (value, item) => addEventLog('Property', 'onEnter', `${item.label}: "${value}"`),
    },
    { id: 'columns', label: 'Columns', type: 'number', value: 3, group: 'General' },
    { id: 'layout', label: 'Layout', type: 'select', value: 'grid', selectOptions: [
      { id: 'grid', value: 'Grid' },
      { id: 'list', value: 'List' },
      { id: 'cards', value: 'Cards' },
    ], group: 'General' },
    { id: 'compact', label: 'Compact Mode', type: 'checkbox', value: true, checkboxLabel: 'Enable compact spacing', group: 'Appearance' },
    { id: 'accent', label: 'Accent Color', type: 'colorpicker', value: '#1ca1c1', group: 'Appearance' },
  ]);

  // Compact size demo items
  const [compactItems, setCompactItems] = useState<AvakioPropertyItem[]>([
    { id: 'width', label: 'Width', type: 'number', value: 800, group: 'Size' },
    { id: 'height', label: 'Height', type: 'number', value: 600, group: 'Size' },
    { id: 'padding', label: 'Padding', type: 'number', value: 16, group: 'Size' },
    { id: 'margin', label: 'Margin', type: 'number', value: 8, group: 'Size' },
  ]);

  // Editor types demo items
  const [editorItems, setEditorItems] = useState<AvakioPropertyItem[]>([
    { id: 'name', label: 'Name', type: 'text', value: 'John Doe', placeholder: 'Enter name', group: 'Text Inputs' },
    { id: 'age', label: 'Age', type: 'number', value: 25, group: 'Text Inputs' },
    { id: 'bio', label: 'Bio', type: 'textarea', value: 'A passionate developer...', group: 'Text Inputs' },
    { id: 'status', label: 'Status', type: 'select', value: 'active', selectOptions: [
      { id: 'active', value: 'Active' },
      { id: 'inactive', value: 'Inactive' },
      { id: 'pending', value: 'Pending' },
    ], group: 'Selectors' },
    { id: 'role', label: 'Role', type: 'combo', value: 'developer', comboOptions: [
      { id: 'admin', value: 'Administrator' },
      { id: 'developer', value: 'Developer' },
      { id: 'designer', value: 'Designer' },
    ], group: 'Selectors' },
    { id: 'enabled', label: 'Enabled', type: 'checkbox', value: true, checkboxLabel: 'Enable feature', group: 'Toggles' },
    { id: 'priority', label: 'Priority', type: 'counter', value: 5, counterMin: 1, counterMax: 10, group: 'Numeric' },
    { id: 'progress', label: 'Progress', type: 'slider', value: 75, sliderMin: 0, sliderMax: 100, sliderShowValue: true, group: 'Numeric' },
    { id: 'color', label: 'Color', type: 'colorpicker', value: '#3b82f6', group: 'Pickers' },
    { id: 'startDate', label: 'Start Date', type: 'date', value: new Date().toISOString().split('T')[0], group: 'Pickers' },
  ]);

  // Playground state
  const [playgroundItems, setPlaygroundItems] = useState<AvakioPropertyItem[]>([
    { id: 'name', label: 'Component Name 123', type: 'text', value: 'MyComponent', placeholder: 'Enter name', group: 'Identity' },
    { id: 'id', label: 'ID', type: 'text', value: 'comp-001', group: 'Identity', labelAlign: 'right' },
    { id: 'visible', label: 'Visible', type: 'checkbox', value: true, checkboxLabel: 'Show component', group: 'State' },
    { id: 'enabled', label: 'Enabled', type: 'checkbox', value: true, checkboxLabel: 'Enable interactions', group: 'State' },
    { id: 'width', label: 'Width', type: 'number', value: 300, group: 'Sizing' },
    { id: 'height', label: 'Height', type: 'number', value: 200, group: 'Sizing' },
    { id: 'theme', label: 'Theme', type: 'select', value: 'light', selectOptions: [
      { id: 'light', value: 'Light' },
      { id: 'dark', value: 'Dark' },
      { id: 'auto', value: 'Auto' },
    ], group: 'Appearance' },
    { id: 'color', label: 'Primary Color', type: 'colorpicker', value: '#3b82f6', group: 'Appearance' },
  ]);

  // Playground configuration items for AvakioProperty
  const [playgroundProps, setPlaygroundProps] = useState<AvakioPropertyItem[]>([
    // Component Props Group
    { id: 'size', label: 'Size', type: 'select', value: 'default', group: 'Component Props', selectOptions: [{ id: 'default', value: 'Default' }, { id: 'compact', value: 'Compact' }] },
    { id: 'showBorders', label: 'Show Borders', type: 'checkbox', value: true, group: 'Component Props', checkboxLabel: 'Show row borders' },
    { id: 'showLabel', label: 'Show Label', type: 'checkbox', value: true, group: 'Component Props', checkboxLabel: 'Show label column' },
    { id: 'labelWidth', label: 'Label Width', type: 'text', value: '150', group: 'Component Props', placeholder: 'e.g. 150 or 30%' },
    { id: 'overflowY', label: 'Overflow Y', type: 'select', value: 'auto', group: 'Component Props', selectOptions: [
      { id: 'auto', value: 'Auto' },
      { id: 'scroll', value: 'Scroll' },
      { id: 'hidden', value: 'Hidden' },
      { id: 'visible', value: 'Visible' },
    ]},
    // State Group
    { id: 'disabled', label: 'Disabled', type: 'checkbox', value: false, group: 'State', checkboxLabel: 'Disable component' },
    { id: 'hidden', label: 'Hidden', type: 'checkbox', value: false, group: 'State', checkboxLabel: 'Hide component' },
    { id: 'borderless', label: 'Borderless', type: 'checkbox', value: false, group: 'State', checkboxLabel: 'Remove borders' },
    // Sizing Group
    { id: 'width', label: 'Width', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 400 or 100%' },
    { id: 'height', label: 'Height', type: 'text', value: '300', group: 'Sizing', placeholder: 'e.g. 300' },
    { id: 'minHeight', label: 'Min Height', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 200' },
    { id: 'maxHeight', label: 'Max Height', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 500' },
    // Events Group
    { id: 'logOnChange', label: 'Log onChange', type: 'checkbox', value: true, group: 'Events', checkboxLabel: 'Log property changes' },
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

  // Handle playground items change
  const handlePlaygroundItemsChange = (items: AvakioPropertyItem[], changed: AvakioPropertyItem) => {
    setPlaygroundItems(items);
    if (getPropValue('logOnChange', true)) {
      addLog('Property changed', `${changed.label}: ${changed.value}`);
    }
  };

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
    { id: 1, name: 'items', type: 'AvakioPropertyItem[]', defaultValue: '[]', description: 'Array of property items to display and edit', from: 'Property' },
    { id: 2, name: 'size', type: "'default' | 'compact'", defaultValue: "'default'", description: 'Size variant - compact for reduced spacing, ideal for sidebars or panels', from: 'Property' },
    { id: 3, name: 'showBorders', type: 'boolean', defaultValue: 'true', description: 'Show borders between property rows', from: 'Property' },
    { id: 4, name: 'overflowY', type: "'auto' | 'scroll' | 'hidden' | 'visible'", defaultValue: "'auto'", description: 'Vertical overflow behavior for scrolling', from: 'Property' },
    { id: 5, name: 'autoHeight', type: 'boolean', defaultValue: 'false', description: 'Auto-adjust height to fill parent container', from: 'Property' },
    { id: 6, name: 'labelWidth', type: 'number | string', defaultValue: 'undefined', description: 'Width of the label column (first column)', from: 'Property' },
    { id: 7, name: 'showLabel', type: 'boolean', defaultValue: 'true', description: 'Show or hide the label column', from: 'Property' },
    
    // AvakioBaseProps - Identity
    { id: 8, name: 'id', type: 'string', defaultValue: 'undefined', description: 'Component ID', from: 'Base' },
    { id: 9, name: 'testId', type: 'string', defaultValue: 'undefined', description: 'Test ID for testing purposes', from: 'Base' },
    { id: 10, name: 'className', type: 'string', defaultValue: 'undefined', description: 'Additional CSS class name', from: 'Base' },
    { id: 11, name: 'style', type: 'React.CSSProperties', defaultValue: 'undefined', description: 'Custom inline styles', from: 'Base' },
    
    // AvakioBaseProps - State
    { id: 12, name: 'disabled', type: 'boolean', defaultValue: 'false', description: 'Whether the component is disabled', from: 'Base' },
    { id: 13, name: 'hidden', type: 'boolean', defaultValue: 'false', description: 'Whether the component is hidden', from: 'Base' },
    { id: 14, name: 'borderless', type: 'boolean', defaultValue: 'false', description: 'Used to hide the component borders', from: 'Base' },
    
    // AvakioBaseProps - Sizing
    { id: 15, name: 'width', type: 'number | string', defaultValue: 'undefined', description: 'Sets the width of the component', from: 'Base' },
    { id: 16, name: 'height', type: 'number | string', defaultValue: 'undefined', description: 'Sets the height of the component', from: 'Base' },
    { id: 17, name: 'minHeight', type: 'number | string', defaultValue: 'undefined', description: 'Sets the minimal height for the view', from: 'Base' },
    { id: 18, name: 'minWidth', type: 'number | string', defaultValue: 'undefined', description: 'Sets the minimal width for the view', from: 'Base' },
    { id: 19, name: 'maxHeight', type: 'number | string', defaultValue: 'undefined', description: 'Sets the maximum height for the view', from: 'Base' },
    { id: 20, name: 'maxWidth', type: 'number | string', defaultValue: 'undefined', description: 'Sets the maximum width for the view', from: 'Base' },
    { id: 21, name: 'margin', type: 'number | string | [number, number, number, number]', defaultValue: 'undefined', description: 'Sets the margin around the component', from: 'Base' },
    { id: 22, name: 'padding', type: 'number | string | [number, number, number, number]', defaultValue: 'undefined', description: 'Sets the padding inside the component', from: 'Base' },
  ];

  const itemPropsData: PropDoc[] = [
    { id: 1, name: 'id', type: 'string', defaultValue: 'required', description: 'Unique identifier for the property item', from: 'PropertyItem' },
    { id: 2, name: 'label', type: 'string', defaultValue: 'required', description: 'Display label for the property', from: 'PropertyItem' },
    { id: 3, name: 'type', type: 'AvakioPropertyEditor', defaultValue: "'text'", description: 'Editor type: text, number, select, checkbox, combo, colorpicker, counter, slider, date, datetime, textarea, etc.', from: 'PropertyItem' },
    { id: 4, name: 'value', type: 'string | number | boolean | string[]', defaultValue: 'undefined', description: 'Current value of the property', from: 'PropertyItem' },
    { id: 5, name: 'placeholder', type: 'string', defaultValue: 'undefined', description: 'Placeholder text for text inputs', from: 'PropertyItem' },
    { id: 6, name: 'description', type: 'string', defaultValue: 'undefined', description: 'Description text shown below the input', from: 'PropertyItem' },
    { id: 7, name: 'group', type: 'string', defaultValue: 'undefined', description: 'Group name for organizing properties into sections', from: 'PropertyItem' },
    { id: 8, name: 'labelAlign', type: "'left' | 'center' | 'right'", defaultValue: "'left'", description: 'Alignment of the label text within the label column', from: 'PropertyItem' },
    { id: 9, name: 'disabled', type: 'boolean', defaultValue: 'false', description: 'Disable this specific property item', from: 'PropertyItem' },
    { id: 10, name: 'required', type: 'boolean', defaultValue: 'false', description: 'Mark property as required (shows asterisk)', from: 'PropertyItem' },
    { id: 11, name: 'selectOptions', type: 'AvakioRichSelectOption[]', defaultValue: 'undefined', description: 'Options array for select type editor', from: 'PropertyItem' },
    { id: 12, name: 'comboOptions', type: 'AvakioComboOption[]', defaultValue: 'undefined', description: 'Options array for combo type editor', from: 'PropertyItem' },
    { id: 13, name: 'checkboxLabel', type: 'string', defaultValue: 'undefined', description: 'Label text shown next to checkbox', from: 'PropertyItem' },
    { id: 14, name: 'counterMin', type: 'number', defaultValue: 'undefined', description: 'Minimum value for counter editor', from: 'PropertyItem' },
    { id: 15, name: 'counterMax', type: 'number', defaultValue: 'undefined', description: 'Maximum value for counter editor', from: 'PropertyItem' },
    { id: 16, name: 'counterStep', type: 'number', defaultValue: '1', description: 'Step increment for counter editor', from: 'PropertyItem' },
    { id: 17, name: 'sliderMin', type: 'number', defaultValue: '0', description: 'Minimum value for slider editor', from: 'PropertyItem' },
    { id: 18, name: 'sliderMax', type: 'number', defaultValue: '100', description: 'Maximum value for slider editor', from: 'PropertyItem' },
    { id: 19, name: 'sliderStep', type: 'number', defaultValue: '1', description: 'Step increment for slider editor', from: 'PropertyItem' },
    { id: 20, name: 'colorPresets', type: 'AvakioColorPickerPreset[]', defaultValue: 'undefined', description: 'Color presets for colorpicker editor', from: 'PropertyItem' },
  ];

  const eventsData: PropDoc[] = [
    { id: 1, name: 'onChange', type: '(items: AvakioPropertyItem[], changedItem: AvakioPropertyItem) => void', defaultValue: 'undefined', description: 'Fires when any property value changes', from: 'Property' },
    { id: 2, name: 'onBlur', type: '(event: React.FocusEvent) => void', defaultValue: 'undefined', description: 'Fires when focus is moved out of the view', from: 'Base' },
    { id: 3, name: 'onFocus', type: '(event: React.FocusEvent) => void', defaultValue: 'undefined', description: 'Fires when a view gets focus', from: 'Base' },
    { id: 4, name: 'onItemClick', type: '(event: React.MouseEvent) => void', defaultValue: 'undefined', description: 'Fires after the control has been clicked', from: 'Base' },
    { id: 5, name: 'onKeyPress', type: '(event: React.KeyboardEvent) => void', defaultValue: 'undefined', description: 'Occurs when keyboard key is pressed for the control in focus', from: 'Base' },
    { id: 6, name: 'onAfterRender', type: '() => void', defaultValue: 'undefined', description: 'Occurs immediately after the component has been rendered', from: 'Base' },
    { id: 7, name: 'onBeforeRender', type: '() => void', defaultValue: 'undefined', description: 'Occurs immediately before the component has been rendered', from: 'Base' },
    { id: 8, name: 'onViewShow', type: '() => void', defaultValue: 'undefined', description: 'Fires when any hidden view is shown', from: 'Base' },
    { id: 9, name: 'onViewResize', type: '(width: number, height: number) => void', defaultValue: 'undefined', description: 'Fires when the size of a view has been changed by resizer', from: 'Base' },
    { id: 10, name: 'onAfterScroll', type: '(scrollTop: number, scrollLeft: number) => void', defaultValue: 'undefined', description: 'Occurs when the view has been scrolled', from: 'Base' },
  ];

  const refMethodsData: PropDoc[] = [
    { id: 1, name: 'blur()', type: '() => void', defaultValue: '-', description: 'Removes focus from the control', from: 'Base' },
    { id: 2, name: 'focus()', type: '() => void', defaultValue: '-', description: 'Sets focus to the control', from: 'Base' },
    { id: 3, name: 'disable()', type: '() => void', defaultValue: '-', description: 'Disables the component (makes it dimmed and unclickable)', from: 'Base' },
    { id: 4, name: 'enable()', type: '() => void', defaultValue: '-', description: 'Enables the component that was disabled', from: 'Base' },
    { id: 5, name: 'hide()', type: '() => void', defaultValue: '-', description: 'Hides the component', from: 'Base' },
    { id: 6, name: 'show()', type: '() => void', defaultValue: '-', description: 'Makes the component visible', from: 'Base' },
    { id: 7, name: 'getValue()', type: '() => AvakioPropertyItem[] | undefined', defaultValue: '-', description: 'Returns the current items array', from: 'Property' },
    { id: 8, name: 'setValue(items)', type: '(items: AvakioPropertyItem[]) => void', defaultValue: '-', description: 'Sets a new items array for the component', from: 'Property' },
    { id: 9, name: 'getText()', type: '() => string', defaultValue: '-', description: 'Gets text representation of the current value', from: 'Property' },
    { id: 10, name: 'validate()', type: '() => boolean | string', defaultValue: '-', description: 'Validates the value of the input. Returns true if valid, false or error message if invalid', from: 'Property' },
    { id: 11, name: 'isEnabled()', type: '() => boolean', defaultValue: '-', description: 'Checks whether the component is enabled', from: 'Base' },
    { id: 12, name: 'isVisible()', type: '() => boolean', defaultValue: '-', description: 'Checks whether the component is visible', from: 'Base' },
    { id: 13, name: 'getElement()', type: '() => HTMLElement | null', defaultValue: '-', description: 'Returns the root DOM element of the component', from: 'Base' },
    { id: 14, name: 'getParentView()', type: '() => string | null', defaultValue: '-', description: 'Returns the ID or classname of the parent Avakio container', from: 'Base' },
    { id: 15, name: 'define(config, value?)', type: '(config: Partial<Props> | string, value?: unknown) => void', defaultValue: '-', description: 'Redefines a single configuration property or multiple properties', from: 'Base' },
  ];

  const propsColumns: AvakioColumn<PropDoc>[] = [
    { id: 'name', header: 'Property', width: 180 },
    { id: 'type', header: 'Type', width: 280 },
    { id: 'defaultValue', header: 'Default', width: 100 },
    { id: 'from', header: 'From', width: 100, filterType: 'combo' },
    { id: 'description', header: 'Description', width: 320 },
  ];

  return (
    <div className="avakio-property-demo-container">
      {/* Sticky Header + Tab Navigation */}
      <div className="avakio-example-sticky-header">
        {/* Header */}
        <AvakioViewHeader
          label="Data Presentation"
          title="Property"
          subTitle="A property editor component for displaying and editing key-value pairs with various editor types."
          isSticky={false}
        />

        {/* Tab Navigation */}
        <div className="avakio-example-tabbar-container">
          <AvakioTabBar
            id="property-demo-tabs"
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
        className="avakio-property-demo-section"
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
          content="The Property component displays a list of editable properties organized in groups with various editor types."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[ 
            <AvakioProperty
              id='basic-usage-property'
              items={basicItems}
              onChange={(items) => {
                setBasicItems(items);
                addLog('Basic property changed');
              }}
              showBorders
            />,
          ]}
        />

        {/* Compact Size */}
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[16, 0, 0, 16]}
          content={<strong>Compact Size</strong>}
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"          
          padding={[0, 0, 0, 16]}
          content="Use size='compact' for a more compact layout with reduced spacing, ideal for sidebars or panels."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioProperty
              margin={16}
              items={compactItems}
              onChange={(items) => setCompactItems(items)}
              size="compact"
              showBorders
            />,
          ]}
        />
      </section>

      {/* Options Section */}
      <section 
        ref={(el) => { sectionRefs.current['options'] = el; }}
        className="avakio-property-demo-section"
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
          content="The Property component supports various editor types for different data types."
        />

        {/* Editor Types */}
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[16, 0, 0, 16]}
          content={<strong>Editor Types</strong>}
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="text, number, textarea, select, combo, checkbox, counter, slider, colorpicker, date, datetime, and more."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioProperty
              items={editorItems}
              onChange={(items) => {
                setEditorItems(items);
                addLog('Editor demo changed');
              }}
              showBorders
              height={400}
              overflowY="auto"
            />,
          ]}
        />
      </section>

      {/* Interactive Playground Section */}
      <section 
        ref={(el) => { sectionRefs.current['playground'] = el; }}
        className="avakio-property-demo-section"
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
          content="Experiment with different Property configurations in real-time. Change any setting below to see the effect on the preview."
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
                      content={<strong>Preview</strong>}
                    />,
                    <AvakioProperty
                      ref={playgroundPropertyRef}
                      items={playgroundItems}
                      onChange={handlePlaygroundItemsChange}
                      size={getPropValue('size', 'default') as 'default' | 'compact'}
                      showBorders={getPropValue('showBorders', true)}
                      showLabel={getPropValue('showLabel', true)}
                      labelWidth={formatSizingValue(getPropValue('labelWidth', ''))}
                      overflowY={getPropValue('overflowY', 'auto') as 'auto' | 'scroll' | 'hidden' | 'visible'}
                      disabled={getPropValue('disabled', false)}
                      hidden={getPropValue('hidden', false)}
                      borderless={getPropValue('borderless', false)}
                      width={formatSizingValue(getPropValue('width', ''))}
                      height={formatSizingValue(getPropValue('height', ''))}
                      minHeight={formatSizingValue(getPropValue('minHeight', ''))}
                      maxHeight={formatSizingValue(getPropValue('maxHeight', ''))}
                    />,
                    <AvakioTemplate
                      type="clean"
                      borderType="clean"
                      padding={[16, 0, 10, 0]}
                      content={<strong>Ref Methods</strong>}
                    />,
                    <AvakioTemplate
                      type="clean"
                      borderType="clean"
                      padding={[0, 0, 0, 0]}
                      scroll="xy"
                      flexWrap={true}
                      content={
                        <>
                          <AvakioButton
                            size="sm"
                            label="getValue()"
                            margin={[0, 10, 10, 0]}
                            labelAlign="center"
                            width="150px"
                            buttonWidth="140px"
                            onClick={() => {
                              const val = playgroundPropertyRef.current?.getValue();
                              addLog('getValue()', `${val?.length} items`);
                            }}
                          />
                          <AvakioButton
                            size="sm"
                            label="disable()"
                            margin={[0, 10, 10, 0]}
                            labelAlign="center"
                            width="150px"
                            buttonWidth="140px"
                            onClick={() => {
                              playgroundPropertyRef.current?.disable();
                              addLog('disable()', 'called');
                            }}
                          />
                          <AvakioButton
                            size="sm"
                            label="enable()"
                            margin={[0, 10, 10, 0]}
                            labelAlign="center"
                            width="150px"
                            buttonWidth="140px"
                            onClick={() => {
                              playgroundPropertyRef.current?.enable();
                              addLog('enable()', 'called');
                            }}
                          />
                          <AvakioButton
                            size="sm"
                            label="hide()"
                            margin={[0, 10, 10, 0]}
                            labelAlign="center"
                            width="150px"
                            buttonWidth="140px"
                            onClick={() => {
                              playgroundPropertyRef.current?.hide();
                              addLog('hide()', 'called');
                            }}
                          />
                          <AvakioButton
                            size="sm"
                            label="show()"
                            margin={[0, 10, 10, 0]}
                            labelAlign="center"
                            width="150px"
                            buttonWidth="140px"
                            onClick={() => {
                              playgroundPropertyRef.current?.show();
                              addLog('show()', 'called');
                            }}
                          />
                          <AvakioButton
                            size="sm"
                            label="isEnabled()"
                            margin={[0, 10, 10, 0]}
                            labelAlign="center"
                            width="150px"
                            buttonWidth="140px"
                            onClick={() => {
                              const enabled = playgroundPropertyRef.current?.isEnabled();
                              addLog('isEnabled()', `${enabled}`);
                            }}
                          />
                          <AvakioButton
                            size="sm"
                            label="isVisible()"
                            margin={[0, 10, 10, 0]}
                            labelAlign="center"
                            width="150px"
                            buttonWidth="140px"
                            onClick={() => {
                              const visible = playgroundPropertyRef.current?.isVisible();
                              addLog('isVisible()', `${visible}`);
                            }}
                          />
                          <AvakioButton
                            size="sm"
                            label="blur()"
                            margin={[0, 10, 10, 0]}
                            labelAlign="center"
                            width="150px"
                            buttonWidth="140px"
                            onClick={() => {
                              playgroundPropertyRef.current?.blur();
                              addLog('blur()', 'called');
                            }}
                          />
                          <AvakioButton
                            size="sm"
                            label="focus()"
                            margin={[0, 10, 10, 0]}
                            labelAlign="center"
                            width="150px"
                            buttonWidth="140px"
                            onClick={() => {
                              playgroundPropertyRef.current?.focus();
                              addLog('focus()', 'called');
                            }}
                          />
                          <AvakioButton
                            size="sm"
                            label="setValue([...])"
                            margin={[0, 10, 10, 0]}
                            labelAlign="center"
                            width="150px"
                            buttonWidth="140px"
                            onClick={() => {
                              const newItems = [
                                { id: 'name', label: 'Name', value: 'Updated Name', type: 'text' as const },
                                { id: 'age', label: 'Age', value: 99, type: 'number' as const },
                              ];
                              playgroundPropertyRef.current?.setValue(newItems);
                              addLog('setValue()', 'Updated with new items');
                            }}
                          />
                          <AvakioButton
                            size="sm"
                            label="getText()"
                            margin={[0, 10, 10, 0]}
                            labelAlign="center"
                            width="150px"
                            buttonWidth="140px"
                            onClick={() => {
                              const text = playgroundPropertyRef.current?.getText();
                              addLog('getText()', text || 'empty');
                            }}
                          />
                          <AvakioButton
                            size="sm"
                            label="getParentView()"
                            margin={[0, 10, 10, 0]}
                            labelAlign="center"
                            width="150px"
                            buttonWidth="140px"
                            onClick={() => {
                              const parent = playgroundPropertyRef.current?.getParentView();
                              addLog('getParentView()', parent || 'null');
                            }}
                          />
                          <AvakioButton
                            size="sm"
                            label="getElement()"
                            margin={[0, 10, 10, 0]}
                            labelAlign="center"
                            width="150px"
                            buttonWidth="140px"
                            onClick={() => {
                              const el = playgroundPropertyRef.current?.getElement();
                              addLog('getElement()', `${el?.tagName || 'null'}`);
                            }}
                          />
                          <AvakioButton
                            size="sm"
                            label="validate()"
                            margin={[0, 10, 10, 0]}
                            labelAlign="center"
                            width="150px"
                            buttonWidth="140px"
                            onClick={() => {
                              const result = playgroundPropertyRef.current?.validate();
                              addLog('validate()', `${result}`);
                            }}
                          />
                          <AvakioButton
                            size="sm"
                            label="define({...})"
                            margin={[0, 10, 10, 0]}
                            labelAlign="center"
                            width="150px"
                            buttonWidth="140px"
                            onClick={() => {
                              playgroundPropertyRef.current?.define({ disabled: false });
                              addLog('define()', 'Updated config');
                            }}
                          />
                        </>
                      }
                    />,
                  ]}
                />,
                // Column 2 - Configuration
                <AvakioLayout
                  type="clean"
                  borderless={true}
                  height='100%'
                  rows={[
                    <AvakioLayout
                      type="clean"
                      borderless={true}
                      height='50px'
                      width='100%'
                      cols={[
                        <AvakioTemplate
                          type="clean"
                          borderType="clean"
                          content={<strong>Configuration</strong>}
                        />,
                        <AvakioTemplate
                          type="clean"
                          borderType="clean"
                          width='100%'
                          align="right"
                          content={
                            <AvakioButton
                              size="sm"
                              label="Reset"
                              align="right"
                              onClick={() => {
                                setPlaygroundProps([
                                  { id: 'size', label: 'Size', type: 'select', value: 'default', group: 'Component Props', selectOptions: [{ id: 'default', value: 'Default' }, { id: 'compact', value: 'Compact' }] },
                                  { id: 'showBorders', label: 'Show Borders', type: 'checkbox', value: true, group: 'Component Props', checkboxLabel: 'Show row borders' },
                                  { id: 'showLabel', label: 'Show Label', type: 'checkbox', value: true, group: 'Component Props', checkboxLabel: 'Show label column' },
                                  { id: 'labelWidth', label: 'Label Width', type: 'text', value: '', group: 'Component Props', placeholder: 'e.g. 150 or 30%' },
                                  { id: 'overflowY', label: 'Overflow Y', type: 'select', value: 'auto', group: 'Component Props', selectOptions: [
                                    { id: 'auto', value: 'Auto' },
                                    { id: 'scroll', value: 'Scroll' },
                                    { id: 'hidden', value: 'Hidden' },
                                    { id: 'visible', value: 'Visible' },
                                  ]},
                                  { id: 'disabled', label: 'Disabled', type: 'checkbox', value: false, group: 'State', checkboxLabel: 'Disable component' },
                                  { id: 'hidden', label: 'Hidden', type: 'checkbox', value: false, group: 'State', checkboxLabel: 'Hide component' },
                                  { id: 'borderless', label: 'Borderless', type: 'checkbox', value: false, group: 'State', checkboxLabel: 'Remove borders' },
                                  { id: 'width', label: 'Width', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 400 or 100%' },
                                  { id: 'height', label: 'Height', type: 'text', value: '300', group: 'Sizing', placeholder: 'e.g. 300' },
                                  { id: 'minHeight', label: 'Min Height', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 200' },
                                  { id: 'maxHeight', label: 'Max Height', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 500' },
                                  { id: 'logOnChange', label: 'Log onChange', type: 'checkbox', value: true, group: 'Events', checkboxLabel: 'Log property changes' },
                                ]);
                                setPlaygroundItems([
                                  { id: 'name', label: 'Component Name', type: 'text', value: 'MyComponent', placeholder: 'Enter name', group: 'Identity' },
                                  { id: 'id', label: 'ID', type: 'text', value: 'comp-001', group: 'Identity' },
                                  { id: 'visible', label: 'Visible', type: 'checkbox', value: true, checkboxLabel: 'Show component', group: 'State' },
                                  { id: 'enabled', label: 'Enabled', type: 'checkbox', value: true, checkboxLabel: 'Enable interactions', group: 'State' },
                                  { id: 'width', label: 'Width', type: 'number', value: 300, group: 'Sizing' },
                                  { id: 'height', label: 'Height', type: 'number', value: 200, group: 'Sizing' },
                                  { id: 'theme', label: 'Theme', type: 'select', value: 'light', selectOptions: [
                                    { id: 'light', value: 'Light' },
                                    { id: 'dark', value: 'Dark' },
                                    { id: 'auto', value: 'Auto' },
                                  ], group: 'Appearance' },
                                  { id: 'color', label: 'Primary Color', type: 'colorpicker', value: '#3b82f6', group: 'Appearance' },
                                ]);
                                addLog('Reset', 'configuration reset to defaults');
                              }}
                            />
                          }
                        />,
                      ]}
                    />,
                    <AvakioProperty
                      className='avakio-fill-container'
                      items={playgroundProps}
                      onChange={handlePlaygroundPropsChange}
                      size="compact"
                      showBorders
                      autoHeight
                      overflowY='auto'
                    />,
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
        className="avakio-property-demo-section"
        data-section="docs"
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
          content={<strong>Component Props</strong>}
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={0}
          rows={[
            <AvakioDataTable<PropDoc>
              key="props-table"
              id="property-props-table"
              data={propsData}
              filterable
              sortable
              columns={propsColumns}
              select={false}
              showRowNum
            />,
          ]}
        />

        {/* Item Props Table */}
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[24, 0, 0, 16]}
          content={<strong>Property Item Props</strong>}
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={0}
          rows={[
            <AvakioDataTable<PropDoc>
              key="item-props-table"
              id="property-item-props-table"
              data={itemPropsData}
              filterable
              sortable
              columns={propsColumns}
              select={false}
              showRowNum
            />,
          ]}
        />

        {/* Events Table */}
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[24, 0, 0, 16]}
          content={<strong>Events</strong>}
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={0}
          rows={[
            <AvakioDataTable<PropDoc>
              key="events-table"
              id="property-events-table"
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
          padding={[24, 0, 0, 16]}
          content={<strong>Ref Methods</strong>}
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={0}
          rows={[
            <AvakioDataTable<PropDoc>
              key="methods-table"
              id="property-methods-table"
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

export default AvakioPropertyExample;











