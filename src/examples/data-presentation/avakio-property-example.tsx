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
  
  // Ref for the property component
  const propertyRef = useRef<AvakioPropertyRef>(null);
  
  // Event log state
  const [eventLog, setEventLog] = useState<string[]>([]);

  // Add to local event log and global event log
  const addLog = (action: string, details: string = '') => {
    setEventLog(prev => [...prev.slice(-4), `${new Date().toLocaleTimeString()} - ${action}${details ? ': ' + details : ''}`]);
    addEventLog('Property', action, details);
  };
  
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

  // Dense mode demo items
  const [denseItems, setDenseItems] = useState<AvakioPropertyItem[]>([
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

  // Ref Methods demo items
  const [refMethodsItems, setRefMethodsItems] = useState<AvakioPropertyItem[]>([
    { id: 'item1', label: 'Property 1', type: 'text', value: 'Value 1', group: 'Group A' },
    { id: 'item2', label: 'Property 2', type: 'number', value: 42, group: 'Group A' },
    { id: 'item3', label: 'Property 3', type: 'checkbox', value: true, checkboxLabel: 'Enabled', group: 'Group B' },
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
    { id: 'dense', label: 'Dense Mode', type: 'checkbox', value: false, group: 'Component Props', checkboxLabel: 'Enable compact layout' },
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

  // Handle property changes
  const handlePlaygroundPropsChange = (items: AvakioPropertyItem[], changed: AvakioPropertyItem) => {
    setPlaygroundProps(items);
    addLog('Config changed', `${changed.label}: ${changed.value}`);
  };

  // Handle playground items change
  const handlePlaygroundItemsChange = (items: AvakioPropertyItem[], changed: AvakioPropertyItem) => {
    setPlaygroundItems(items);
    if (getPropValue('logOnChange', true)) {
      addLog('Property changed', `${changed.label}: ${changed.value}`);
    }
  };

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

  // Props documentation data
  interface PropDoc {
    id: number;
    name: string;
    type: string;
    defaultValue: string;
    description: string;
  }

  const propsData: PropDoc[] = [
    { id: 1, name: 'items', type: 'AvakioPropertyItem[]', defaultValue: '[]', description: 'Array of property items to display' },
    { id: 2, name: 'onChange', type: '(items, changed) => void', defaultValue: 'undefined', description: 'Callback when any property value changes' },
    { id: 3, name: 'dense', type: 'boolean', defaultValue: 'false', description: 'Enable dense/compact mode with reduced spacing' },
    { id: 4, name: 'showBorders', type: 'boolean', defaultValue: 'true', description: 'Show borders between property rows' },
    { id: 5, name: 'overflowY', type: "'auto' | 'scroll' | 'hidden' | 'visible'", defaultValue: "'auto'", description: 'Vertical overflow behavior' },
    { id: 6, name: 'autoHeight', type: 'boolean', defaultValue: 'false', description: 'Auto-adjust height to fill parent container' },
    { id: 19, name: 'labelWidth', type: 'number | string', defaultValue: 'undefined', description: 'Width of the label column (first column)' },
    { id: 20, name: 'showLabel', type: 'boolean', defaultValue: 'true', description: 'Show or hide the label column' },
    { id: 7, name: 'id', type: 'string', defaultValue: 'undefined', description: 'Component ID' },
    { id: 8, name: 'testId', type: 'string', defaultValue: 'undefined', description: 'Test ID for testing purposes' },
    { id: 9, name: 'className', type: 'string', defaultValue: 'undefined', description: 'Additional CSS class name' },
    { id: 10, name: 'disabled', type: 'boolean', defaultValue: 'false', description: 'Whether the component is disabled' },
    { id: 11, name: 'hidden', type: 'boolean', defaultValue: 'false', description: 'Whether the component is hidden' },
    { id: 12, name: 'borderless', type: 'boolean', defaultValue: 'false', description: 'Remove component borders' },
    { id: 13, name: 'width', type: 'number | string', defaultValue: 'undefined', description: 'Component width' },
    { id: 14, name: 'height', type: 'number | string', defaultValue: 'undefined', description: 'Component height' },
    { id: 15, name: 'minHeight', type: 'number | string', defaultValue: 'undefined', description: 'Minimum height' },
    { id: 16, name: 'maxHeight', type: 'number | string', defaultValue: 'undefined', description: 'Maximum height' },
    { id: 17, name: 'margin', type: 'number | string | [t,r,b,l]', defaultValue: 'undefined', description: 'Component margin' },
    { id: 18, name: 'padding', type: 'number | string | [t,r,b,l]', defaultValue: 'undefined', description: 'Component padding' },
  ];

  const itemPropsData: PropDoc[] = [
    { id: 1, name: 'id', type: 'string', defaultValue: 'required', description: 'Unique identifier for the property item' },
    { id: 2, name: 'label', type: 'string', defaultValue: 'required', description: 'Display label for the property' },
    { id: 3, name: 'type', type: 'AvakioPropertyEditor', defaultValue: "'text'", description: 'Editor type: text, number, select, checkbox, combo, colorpicker, counter, slider, date, datetime, textarea, etc.' },
    { id: 4, name: 'value', type: 'string | number | boolean | string[]', defaultValue: 'undefined', description: 'Current value of the property' },
    { id: 5, name: 'placeholder', type: 'string', defaultValue: 'undefined', description: 'Placeholder text for text inputs' },
    { id: 6, name: 'description', type: 'string', defaultValue: 'undefined', description: 'Description text shown below the input' },
    { id: 7, name: 'group', type: 'string', defaultValue: 'undefined', description: 'Group name for organizing properties' },
    { id: 8, name: 'labelAlign', type: "'left' | 'center' | 'right'", defaultValue: "'left'", description: 'Alignment of the label text (left, center, or right)' },
    { id: 9, name: 'disabled', type: 'boolean', defaultValue: 'false', description: 'Disable this specific property' },
    { id: 10, name: 'required', type: 'boolean', defaultValue: 'false', description: 'Mark property as required' },
    { id: 11, name: 'selectOptions', type: 'AvakioRichSelectOption[]', defaultValue: 'undefined', description: 'Options for select type editor' },
    { id: 12, name: 'comboOptions', type: 'AvakioComboOption[]', defaultValue: 'undefined', description: 'Options for combo type editor' },
    { id: 13, name: 'checkboxLabel', type: 'string', defaultValue: 'undefined', description: 'Label shown next to checkbox' },
    { id: 14, name: 'counterMin/Max/Step', type: 'number', defaultValue: 'undefined', description: 'Counter editor configuration' },
    { id: 15, name: 'sliderMin/Max/Step', type: 'number', defaultValue: 'undefined', description: 'Slider editor configuration' },
    { id: 16, name: 'colorPresets', type: 'AvakioColorPickerPreset[]', defaultValue: 'undefined', description: 'Color presets for colorpicker' },
  ];

  const refMethodsData: PropDoc[] = [
    { id: 1, name: 'getValue()', type: '() => AvakioPropertyItem[]', defaultValue: '-', description: 'Returns the current items array' },
    { id: 2, name: 'setValue(items)', type: '(items: AvakioPropertyItem[]) => void', defaultValue: '-', description: 'Sets new items array' },
    { id: 3, name: 'disable()', type: '() => void', defaultValue: '-', description: 'Disables the component' },
    { id: 4, name: 'enable()', type: '() => void', defaultValue: '-', description: 'Enables the component' },
    { id: 5, name: 'hide()', type: '() => void', defaultValue: '-', description: 'Hides the component' },
    { id: 6, name: 'show()', type: '() => void', defaultValue: '-', description: 'Shows the component' },
    { id: 7, name: 'isEnabled()', type: '() => boolean', defaultValue: '-', description: 'Checks if component is enabled' },
    { id: 8, name: 'isVisible()', type: '() => boolean', defaultValue: '-', description: 'Checks if component is visible' },
    { id: 9, name: 'getElement()', type: '() => HTMLElement | null', defaultValue: '-', description: 'Returns the root DOM element' },
    { id: 10, name: 'focus()', type: '() => void', defaultValue: '-', description: 'Sets focus to the component' },
    { id: 11, name: 'blur()', type: '() => void', defaultValue: '-', description: 'Removes focus from the component' },
  ];

  const propsColumns: AvakioColumn<PropDoc>[] = [
    { id: 'name', header: 'Property', width: 180 },
    { id: 'type', header: 'Type', width: 280 },
    { id: 'defaultValue', header: 'Default', width: 100 },
    { id: 'description', header: 'Description', width: 350 },
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

        {/* Dense Mode */}
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[16, 0, 0, 16]}
          content={<strong>Dense Mode</strong>}
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"          
          padding={[0, 0, 0, 16]}
          content="Use dense={true} for a more compact layout with reduced spacing, ideal for sidebars or panels."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioProperty
              margin={16}
              items={denseItems}
              onChange={(items) => setDenseItems(items)}
              dense
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

        {/* Ref Methods Demo */}
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[24, 0, 0, 16]}
          content={<strong>Ref Methods</strong>}
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="Use ref methods to programmatically control the Property component."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioProperty
              ref={propertyRef}
              items={refMethodsItems}
              onChange={(items) => setRefMethodsItems(items)}
              showBorders
            />,
            <AvakioTemplate
              type="clean"
              borderType="clean"
              padding={[16, 0, 0, 0]}
              flexWrap
              content={
                <>
                  <AvakioButton
                    size="sm"
                    label="getValue()"
                    margin={[0, 8, 8, 0]}
                    onClick={() => {
                      const val = propertyRef.current?.getValue();
                      addLog('getValue()', `${val?.length} items`);
                    }}
                  />
                  <AvakioButton
                    size="sm"
                    label="disable()"
                    margin={[0, 8, 8, 0]}
                    onClick={() => {
                      propertyRef.current?.disable();
                      addLog('disable()', 'called');
                    }}
                  />
                  <AvakioButton
                    size="sm"
                    label="enable()"
                    margin={[0, 8, 8, 0]}
                    onClick={() => {
                      propertyRef.current?.enable();
                      addLog('enable()', 'called');
                    }}
                  />
                  <AvakioButton
                    size="sm"
                    label="hide()"
                    margin={[0, 8, 8, 0]}
                    onClick={() => {
                      propertyRef.current?.hide();
                      addLog('hide()', 'called');
                    }}
                  />
                  <AvakioButton
                    size="sm"
                    label="show()"
                    margin={[0, 8, 8, 0]}
                    onClick={() => {
                      propertyRef.current?.show();
                      addLog('show()', 'called');
                    }}
                  />
                  <AvakioButton
                    size="sm"
                    label="isEnabled()"
                    margin={[0, 8, 8, 0]}
                    onClick={() => {
                      const enabled = propertyRef.current?.isEnabled();
                      addLog('isEnabled()', `${enabled}`);
                    }}
                  />
                  <AvakioButton
                    size="sm"
                    label="isVisible()"
                    margin={[0, 8, 8, 0]}
                    onClick={() => {
                      const visible = propertyRef.current?.isVisible();
                      addLog('isVisible()', `${visible}`);
                    }}
                  />
                </>
              }
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
                      items={playgroundItems}
                      onChange={handlePlaygroundItemsChange}
                      dense={getPropValue('dense', false)}
                      showBorders={getPropValue('showBorders', true)}
                      showLabel={getPropValue('showLabel', true)}
                      labelWidth={getPropValue('labelWidth', '') || undefined}
                      overflowY={getPropValue('overflowY', 'auto') as 'auto' | 'scroll' | 'hidden' | 'visible'}
                      disabled={getPropValue('disabled', false)}
                      hidden={getPropValue('hidden', false)}
                      borderless={getPropValue('borderless', false)}
                      width={getPropValue('width', '') || undefined}
                      height={getPropValue('height', '') ? Number(getPropValue('height', '')) : undefined}
                      minHeight={getPropValue('minHeight', '') ? Number(getPropValue('minHeight', '')) : undefined}
                      maxHeight={getPropValue('maxHeight', '') ? Number(getPropValue('maxHeight', '')) : undefined}
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
                                  { id: 'dense', label: 'Dense Mode', type: 'checkbox', value: false, group: 'Component Props', checkboxLabel: 'Enable compact layout' },
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
                      dense
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
              columns={propsColumns}
              select={false}
              height={500}
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
              columns={propsColumns}
              select={false}
              height={420}
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
              select={false}
              height={350}
            />,
          ]}
        />
      </section>
    </div>
  );
}

export default AvakioPropertyExample;











