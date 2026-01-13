import React, { useState, useRef } from 'react';
import { AvakioMultiCombo, AvakioMultiComboOption, AvakioMultiComboRef } from '../../components/avakio/ui-controls/avakio-multicombo/avakio-multicombo';
import { AvakioTemplate } from '../../components/avakio/views/avakio-template/avakio-template';
import { AvakioLayout } from '../../components/avakio/layouts/avakio-layout/avakio-layout';
import { AvakioTabBar } from '../../components/avakio/ui-controls/avakio-tabbar/avakio-tabbar';
import { AvakioViewHeader } from '../../components/avakio/ui-widgets/avakio-view-header/avakio-view-header';
import { AvakioProperty, AvakioPropertyItem } from '../../components/avakio/data-presentation/avakio-property/avakio-property';
import { AvakioDataTable, AvakioColumn } from '../../components/avakio/data-presentation/avakio-datatable/AvakioDataTable';
import { AvakioButton } from '../../components/avakio/ui-controls/avakio-button/avakio-button';
import { addEventLog } from '../../services/event-log-service';
import { formatSizingValue } from '../../lib/utils';
import { List, Settings2, Play, Book } from 'lucide-react';
import './avakio-multicombo-example.css';

// Tab options for navigation
const TAB_OPTIONS = [
  { id: 'basic', label: 'Basic Usage', icon: <List size={14} /> },
  { id: 'options', label: 'Options', icon: <Settings2 size={14} /> },
  { id: 'playground', label: 'Interactive Playground', icon: <Play size={14} /> },
  { id: 'docs', label: 'Documentation', icon: <Book size={14} /> },
];

export function AvakioMultiComboExample() {
  const [activeSection, setActiveSection] = useState<string | number | null>('basic');
  
  // Section refs for scroll navigation
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  
  // Demo state values
  const [basicValue, setBasicValue] = useState<string[]>([]);
  const [countValue, setCountValue] = useState<string[]>(['react', 'vue']);
  const [templateValue, setTemplateValue] = useState<string[]>([]);
  const [statusValue, setStatusValue] = useState<string[]>([]);
  const [largeListValue, setLargeListValue] = useState<string[]>([]);
  
  // Label Positions section state
  const [labelLeftValue, setLabelLeftValue] = useState<string[]>([]);
  const [labelTopValue, setLabelTopValue] = useState<string[]>([]);
  const [labelRightValue, setLabelRightValue] = useState<string[]>([]);
  const [labelBottomValue, setLabelBottomValue] = useState<string[]>([]);
  
  // Validation States section state
  const [requiredValue, setRequiredValue] = useState<string[]>([]);
  const [errorValue, setErrorValue] = useState<string[]>([]);
  
  // Other Options section state
  const [disabledValue, setDisabledValue] = useState<string[]>(['react', 'typescript']);
  const [readonlyValue, setReadonlyValue] = useState<string[]>(['vue', 'angular']);
  const [clearableValue, setClearableValue] = useState<string[]>(['react']);
  
  // Size Variants section state
  const [defaultSizeValue, setDefaultSizeValue] = useState<string[]>(['react']);
  const [compactSizeValue, setCompactSizeValue] = useState<string[]>(['vue', 'angular']);
  
  // Playground state
  const [playgroundValue, setPlaygroundValue] = useState<string[]>(['react', 'typescript']);
  
  // Sample options
  const simpleOptions: AvakioMultiComboOption[] = [
    { value: 'opt1', label: 'Option One' },
    { value: 'opt2', label: 'Option Two' },
    { value: 'opt3', label: 'Option Three' },
    { value: 'opt4', label: 'Option Four' },
    { value: 'opt5', label: 'Option Five' },
  ];

  const techOptions: AvakioMultiComboOption[] = [
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue.js' },
    { value: 'angular', label: 'Angular' },
    { value: 'svelte', label: 'Svelte' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'nodejs', label: 'Node.js' },
    { value: 'python', label: 'Python' },
  ];

  const countryOptions: AvakioMultiComboOption[] = [
    { value: 'us', label: 'United States', flag: 'https://flagcdn.com/w40/us.png' },
    { value: 'gb', label: 'United Kingdom', flag: 'https://flagcdn.com/w40/gb.png' },
    { value: 'ca', label: 'Canada', flag: 'https://flagcdn.com/w40/ca.png' },
    { value: 'au', label: 'Australia', flag: 'https://flagcdn.com/w40/au.png' },
    { value: 'de', label: 'Germany', flag: 'https://flagcdn.com/w40/de.png' },
    { value: 'fr', label: 'France', flag: 'https://flagcdn.com/w40/fr.png' },
    { value: 'jp', label: 'Japan', flag: 'https://flagcdn.com/w40/jp.png' },
    { value: 'cn', label: 'China', flag: 'https://flagcdn.com/w40/cn.png' },
  ];

  const statusOptions: AvakioMultiComboOption[] = [
    { value: 'active', label: 'Active', color: '#10b981' },
    { value: 'pending', label: 'Pending', color: '#f59e0b' },
    { value: 'inactive', label: 'Inactive', color: '#6b7280' },
    { value: 'blocked', label: 'Blocked', color: '#ef4444' },
  ];

  const largeOptions: AvakioMultiComboOption[] = Array.from({ length: 100 }, (_, i) => ({
    value: `item-${i + 1}`,
    label: `Item ${i + 1}`,
  }));

  // Playground property items for AvakioProperty
  const [playgroundProps, setPlaygroundProps] = useState<AvakioPropertyItem[]>([
    // Identity Group
    { id: 'componentId', label: 'ID', type: 'text', value: 'playground-multicombo', group: 'Identity', placeholder: 'Component ID' },
    { id: 'testId', label: 'Test ID', type: 'text', value: '', group: 'Identity', placeholder: 'Test ID for testing' },
    { id: 'className', label: 'Class Name', type: 'text', value: '', group: 'Identity', placeholder: 'Additional CSS class' },
    
    // Appearance Group
    { id: 'label', label: 'Label', type: 'text', value: 'Technologies', group: 'Appearance', placeholder: 'Enter label text' },
    { id: 'labelForm', label: 'Label Form', type: 'text', value: '', group: 'Appearance', placeholder: 'Form label above the component' },
    { id: 'placeholder', label: 'Placeholder', type: 'text', value: 'Select technologies...', group: 'Appearance', placeholder: 'Enter placeholder' },
    { id: 'bottomLabel', label: 'Bottom Label', type: 'text', value: '', group: 'Appearance', placeholder: 'Help text below component' },
    { id: 'invalidMessage', label: 'Error Message', type: 'text', value: '', group: 'Appearance', placeholder: 'Error message' },
    {
      id: 'size',
      label: 'Size',
      type: 'select',
      value: 'default',
      group: 'Appearance',
      selectOptions: [
        { id: 'default', value: 'Default' },
        { id: 'compact', value: 'Compact' },
      ],
    },
    {
      id: 'labelPosition',
      label: 'Label Position',
      type: 'select',
      value: 'left',
      group: 'Appearance',
      selectOptions: [
        { id: 'left', value: 'Left' },
        { id: 'top', value: 'Top' },
        { id: 'right', value: 'Right' },
        { id: 'bottom', value: 'Bottom' },
      ],
    },
    {
      id: 'labelAlign',
      label: 'Label Align',
      type: 'select',
      value: 'left',
      group: 'Appearance',
      selectOptions: [
        { id: 'left', value: 'Left' },
        { id: 'center', value: 'Center' },
        { id: 'right', value: 'Right' },
      ],
    },
    { id: 'labelWidth', label: 'Label Width', type: 'text', value: '100', group: 'Appearance', placeholder: 'e.g. 100 or 100px' },
    
    // Features Group
    { id: 'clearable', label: 'Clearable', type: 'checkbox', value: false, group: 'Features', checkboxLabel: 'Show clear button' },
    { id: 'showCount', label: 'Show Count', type: 'checkbox', value: false, group: 'Features', checkboxLabel: 'Show count instead of chips' },
    { id: 'maxDisplayItems', label: 'Max Display Items', type: 'number', value: 3, group: 'Features', placeholder: 'e.g. 3' },
    { id: 'yCount', label: 'Y Count', type: 'number', value: '', group: 'Features', placeholder: 'Visible items (e.g. 5)' },
    
    // Sizing Group
    { id: 'width', label: 'Width', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 300 or 100%' },
    { id: 'maxHeight', label: 'Max Height', type: 'number', value: '', group: 'Sizing', placeholder: 'e.g. 300' },
    { id: 'minWidth', label: 'Min Width', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 200' },
    { id: 'minHeight', label: 'Min Height', type: 'number', value: '', group: 'Sizing', placeholder: 'e.g. 30' },
    { id: 'maxWidth', label: 'Max Width', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 500' },
    { id: 'margin', label: 'Margin', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 8 or 8,16,8,16' },
    { id: 'padding', label: 'Padding', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 8 or 8,16,8,16' },
    { id: 'bottomPadding', label: 'Bottom Padding', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 10 or 10px' },
    
    // State Group
    { id: 'disabled', label: 'Disabled', type: 'checkbox', value: false, group: 'State', checkboxLabel: 'Disable the component' },
    { id: 'readonly', label: 'Read Only', type: 'checkbox', value: false, group: 'State', checkboxLabel: 'Make select read-only' },
    { id: 'hidden', label: 'Hidden', type: 'checkbox', value: false, group: 'State', checkboxLabel: 'Hide the component' },
    { id: 'borderless', label: 'Borderless', type: 'checkbox', value: false, group: 'State', checkboxLabel: 'Remove border' },
    
    // Validation Group
    { id: 'required', label: 'Required', type: 'checkbox', value: false, group: 'Validation', checkboxLabel: 'Mark as required field' },
    { id: 'invalid', label: 'Invalid', type: 'checkbox', value: false, group: 'Validation', checkboxLabel: 'Mark as invalid' },
    
    // Events Group (toggles to enable event logging)
    { id: 'logOnChange', label: 'Log onChange', type: 'checkbox', value: true, group: 'Events', checkboxLabel: 'Log onChange events' },
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
    addLog('Playground prop changed', `${changed.label}: ${changed.value}`);
  };

  // Ref example
  const multiComboRef = useRef<AvakioMultiComboRef>(null);
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
    setEventLog(prev => [...prev.slice(-4), `${new Date().toLocaleTimeString()} - ${action}${details ? ': ' + details : ''}`]);
    addEventLog('MultiCombo', action, details);
  };

  // Get display value for a selection
  const getDisplayText = (values: string[], options: AvakioMultiComboOption[]) => {
    if (!values || values.length === 0) return 'None selected';
    return values.map(v => options.find(o => o.value === v)?.label || v).join(', ');
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
    { id: 1, name: 'value', type: 'string[]', defaultValue: '[]', description: 'Array of selected values', from: 'MultiCombo' },
    { id: 2, name: 'options', type: 'AvakioMultiComboOption[]', defaultValue: '[]', description: 'Array of options with value and label', from: 'MultiCombo' },
    { id: 3, name: 'placeholder', type: 'string', defaultValue: "'Select items...'", description: 'Placeholder text when no selection', from: 'MultiCombo' },
    { id: 4, name: 'template', type: '(option: AvakioMultiComboOption) => React.ReactNode', defaultValue: 'undefined', description: 'Custom render function for options', from: 'MultiCombo' },
    { id: 5, name: 'yCount', type: 'number', defaultValue: 'undefined', description: 'Number of visible items in dropdown (limits height)', from: 'MultiCombo' },
    { id: 6, name: 'showCount', type: 'boolean', defaultValue: 'false', description: 'Show count instead of chips', from: 'MultiCombo' },
    { id: 7, name: 'maxDisplayItems', type: 'number', defaultValue: '3', description: 'Max chips to display before "+N more"', from: 'MultiCombo' },
    { id: 8, name: 'clearable', type: 'boolean', defaultValue: 'false', description: 'Whether the selection can be cleared', from: 'Base' },
    { id: 9, name: 'size', type: "'default' | 'compact'", defaultValue: "'default'", description: 'Size variant - compact for filters/tables', from: 'MultiCombo' },
    
    // Label Props
    { id: 10, name: 'label', type: 'string', defaultValue: 'undefined', description: 'Label text displayed beside the select', from: 'ControlLabel' },
    { id: 11, name: 'labelForm', type: 'string', defaultValue: 'undefined', description: 'Plain text form label displayed above the component', from: 'ControlLabel' },
    { id: 12, name: 'labelPosition', type: "'left' | 'top' | 'right' | 'bottom'", defaultValue: "'left'", description: 'Position of the styled label', from: 'ControlLabel' },
    { id: 13, name: 'labelAlign', type: "'left' | 'center' | 'right'", defaultValue: "'left'", description: 'Alignment of the label text within the label area', from: 'ControlLabel' },
    { id: 14, name: 'labelWidth', type: 'number | string', defaultValue: '100', description: 'Width of the label', from: 'ControlLabel' },
    { id: 15, name: 'bottomLabel', type: 'string', defaultValue: 'undefined', description: 'Help text displayed below the component', from: 'ControlLabel' },
    { id: 16, name: 'bottomPadding', type: 'number | string', defaultValue: 'undefined', description: 'Padding at the bottom of the component', from: 'ControlLabel' },
    
    // State Props
    { id: 17, name: 'disabled', type: 'boolean', defaultValue: 'false', description: 'Whether the component is disabled', from: 'Base' },
    { id: 18, name: 'readonly', type: 'boolean', defaultValue: 'false', description: 'Whether the component is read-only', from: 'Base' },
    { id: 19, name: 'hidden', type: 'boolean', defaultValue: 'false', description: 'Whether the component is hidden', from: 'Base' },
    { id: 20, name: 'borderless', type: 'boolean', defaultValue: 'false', description: 'Removes the border from the component', from: 'Base' },
    
    // Validation Props
    { id: 21, name: 'required', type: 'boolean', defaultValue: 'false', description: 'Marks the field as required (shows asterisk)', from: 'ControlLabel' },
    { id: 22, name: 'invalid', type: 'boolean', defaultValue: 'false', description: 'Marks the component as invalid', from: 'ControlLabel' },
    { id: 23, name: 'invalidMessage', type: 'string', defaultValue: 'undefined', description: 'Sets the text of a validation message', from: 'ControlLabel' },
    
    // Sizing Props
    { id: 24, name: 'width', type: 'number | string', defaultValue: 'undefined', description: 'Width of the component', from: 'Base' },
    { id: 25, name: 'maxHeight', type: 'number | string', defaultValue: 'undefined', description: 'Maximum height of the dropdown', from: 'Base' },
    { id: 26, name: 'minWidth', type: 'number | string', defaultValue: 'undefined', description: 'Minimum width of the component', from: 'Base' },
    { id: 27, name: 'maxWidth', type: 'number | string', defaultValue: 'undefined', description: 'Maximum width of the component', from: 'Base' },
    { id: 28, name: 'minHeight', type: 'number | string', defaultValue: 'undefined', description: 'Minimum height of the component', from: 'Base' },
    { id: 29, name: 'margin', type: 'number | string | [number, number, number, number]', defaultValue: 'undefined', description: 'Margin around the component', from: 'Base' },
    { id: 30, name: 'padding', type: 'number | string | [number, number, number, number]', defaultValue: 'undefined', description: 'Padding inside the component', from: 'Base' },
    
    // Identity Props
    { id: 31, name: 'id', type: 'string', defaultValue: 'undefined', description: 'Component ID', from: 'Base' },
    { id: 32, name: 'testId', type: 'string', defaultValue: 'undefined', description: 'Test ID for testing purposes', from: 'Base' },
    { id: 33, name: 'className', type: 'string', defaultValue: "''", description: 'Additional CSS class name', from: 'Base' },
    { id: 34, name: 'style', type: 'React.CSSProperties', defaultValue: 'undefined', description: 'Custom inline styles', from: 'Base' },
  ];

  const eventsData: PropDoc[] = [
    { id: 1, name: 'onChange', type: '(values: string[]) => void', defaultValue: 'undefined', description: 'Fires when the selected values change', from: 'MultiCombo' },
  ];

  const refMethodsData: PropDoc[] = [
    { id: 1, name: 'getValue()', type: '() => string[]', defaultValue: '-', description: 'Returns the array of selected values', from: 'MultiCombo' },
    { id: 2, name: 'getText()', type: '() => string', defaultValue: '-', description: 'Returns comma-separated text of selected options', from: 'MultiCombo' },
    { id: 3, name: 'setValue(values)', type: '(values: string[]) => void', defaultValue: '-', description: 'Sets the selected values', from: 'MultiCombo' },
    { id: 4, name: 'clear()', type: '() => void', defaultValue: '-', description: 'Clears all selected values', from: 'MultiCombo' },
    { id: 5, name: 'selectAll()', type: '() => void', defaultValue: '-', description: 'Selects all available options', from: 'MultiCombo' },
    { id: 6, name: 'focus()', type: '() => void', defaultValue: '-', description: 'Sets focus to the control', from: 'Base' },
    { id: 7, name: 'blur()', type: '() => void', defaultValue: '-', description: 'Removes focus from the control', from: 'Base' },
    { id: 8, name: 'enable()', type: '() => void', defaultValue: '-', description: 'Enables the component', from: 'Base' },
    { id: 9, name: 'disable()', type: '() => void', defaultValue: '-', description: 'Disables the component', from: 'Base' },
    { id: 10, name: 'show()', type: '() => void', defaultValue: '-', description: 'Makes the component visible', from: 'Base' },
    { id: 11, name: 'hide()', type: '() => void', defaultValue: '-', description: 'Hides the component', from: 'Base' },
    { id: 12, name: 'isEnabled()', type: '() => boolean', defaultValue: '-', description: 'Checks whether the component is enabled', from: 'Base' },
    { id: 13, name: 'isVisible()', type: '() => boolean', defaultValue: '-', description: 'Checks whether the component is visible', from: 'Base' },
    { id: 14, name: 'getElement()', type: '() => HTMLElement | null', defaultValue: '-', description: 'Returns the root DOM element', from: 'Base' },
    { id: 15, name: 'getParentView()', type: '() => string | null', defaultValue: '-', description: 'Returns the ID of the parent Avakio container', from: 'Base' },
    { id: 16, name: 'validate()', type: '() => boolean | string', defaultValue: '-', description: 'Validates the component value', from: 'Base' },
  ];

  const propsColumns: AvakioColumn<PropDoc>[] = [
    { id: 'name', header: 'Property', width: 180 },
    { id: 'type', header: 'Type', width: 380 },
    { id: 'defaultValue', header: 'Default', width: 120 },
    { id: 'from', header: 'From', width: 100, filterType: 'combo' },
    { id: 'description', header: 'Description', width: 320 },
  ];

  return (
    <div className="avakio-multicombo-demo-container">
      {/* Sticky Header + Tab Navigation */}
      <div className="avakio-example-sticky-header">
        {/* Header */}
        <AvakioViewHeader
          label="UI Controls"
          title="MultiCombo"
          subTitle="A multi-select dropdown component with chips display, search filtering, and select all functionality."
          isSticky={false}
        />

        {/* Tab Navigation */}
        <div className="avakio-example-tabbar-container">
          <AvakioTabBar
            id="multicombo-demo-tabs"
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
        className="avakio-multicombo-demo-section"
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
          content="The MultiCombo displays a dropdown with checkboxes allowing multiple selections. Selected items appear as chips."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioMultiCombo
              value={basicValue}
              options={simpleOptions}
              onChange={({ value }) => {
                setBasicValue(value);
                addLog('onChange', `values: [${value.join(', ')}]`);
              }}
              placeholder="Select options..."
              label="Basic Select"
              labelWidth={120}
            />,
            <AvakioTemplate
              type="clean"
              borderType="clean"
              padding={[10,0,10,0]}
              content={<>Selected: <strong>{basicValue.length > 0 ? basicValue.join(', ') : 'None'}</strong></>}
            />,
          ]}
        />

        {/* With Show Count */}
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[16, 0, 0, 16]}
          content={<strong>Show Count Mode</strong>}
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content='Use showCount={true} to display selection count instead of chips.'
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioMultiCombo
              value={countValue}
              options={techOptions}
              onChange={({ value }) => {
                setCountValue(value);
                addLog('onChange (count)', `values: [${value.join(', ')}]`);
              }}
              label="Technologies"
              labelWidth={120}
              placeholder="Choose technologies..."
              showCount
            />,
            <AvakioTemplate
              type="clean"
              borderType="clean"
              padding={[10,0,10,0]}
              content={<>Selected: <strong>{getDisplayText(countValue, techOptions)}</strong></>}
            />,
          ]}
        />

        {/* Custom Template */}
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[16, 0, 0, 16]}
          content={<strong>Custom Template</strong>}
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="Use the template prop to customize how options are rendered. This example shows country flags."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioMultiCombo
              value={templateValue}
              options={countryOptions}
              onChange={({ value }) => {
                setTemplateValue(value);
                addLog('onChange (template)', `values: [${value.join(', ')}]`);
              }}
              label="Countries"
              labelWidth={120}
              placeholder="Select countries..."
              template={(option) => (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <img src={option.flag} alt={option.label} style={{ width: '24px', height: '16px', objectFit: 'cover', borderRadius: '2px' }} />
                  <span>{option.label}</span>
                </div>
              )}
            />,
            <AvakioTemplate
              type="clean"
              borderType="clean"
              padding={[10,0,10,0]}
              content={<>Selected: <strong>{getDisplayText(templateValue, countryOptions)}</strong></>}
            />,
          ]}
        />

        {/* Status with Colors */}
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[16, 0, 0, 16]}
          content={<strong>Status with Color Indicators</strong>}
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="Options can include custom data like colors for status indicators."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioMultiCombo
              value={statusValue}
              options={statusOptions}
              onChange={({ value }) => {
                setStatusValue(value);
                addLog('onChange (status)', `values: [${value.join(', ')}]`);
              }}
              label="Status"
              labelWidth={120}
              placeholder="Select statuses..."
              template={(option) => (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span
                    style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      backgroundColor: option.color,
                    }}
                  />
                  <span>{option.label}</span>
                </div>
              )}
            />,
            <AvakioTemplate
              type="clean"
              borderType="clean"
              padding={[10,0,10,0]}
              content={<>Selected: <strong>{getDisplayText(statusValue, statusOptions)}</strong></>}
            />,
          ]}
        />
      </section>

      {/* Options Section */}
      <section 
        ref={(el) => { sectionRefs.current['options'] = el; }}
        className="avakio-multicombo-demo-section"
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
          content="Customize the MultiCombo with various options like large datasets, label alignment, and validation states."
        />

        {/* Large Dataset with yCount */}
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioTemplate
              key="large-title"
              type="clean"
              borderType="clean"
              content={<strong>Large Dataset with yCount</strong>}
            />,
            <AvakioTemplate
              key="large-desc"
              type="clean"
              borderType="clean"
              padding={[8, 0, 0, 0]}
              content="Use yCount to limit the number of visible items in the dropdown. This example has 100 items with yCount={5}."
            />,
            <AvakioMultiCombo
              value={largeListValue}
              options={largeOptions}
              onChange={({ value }) => {
                setLargeListValue(value);
                addLog('onChange (large)', `count: ${value.length}`);
              }}
              label="Large List"
              labelWidth={120}
              placeholder="Select from 100 items..."
              yCount={5}
              margin={[8, 0, 0, 0]}
              showCount
            />,
            <AvakioTemplate
              type="clean"
              borderType="clean"
              padding={[10,0,10,0]}
              content={<>Selected: <strong>{largeListValue.length} items</strong></>}
            />,
          ]}
        />

        {/* Label Positions */}
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioTemplate
              key="label-positions-title"
              type="clean"
              borderType="clean"
              content={<strong>Label Positions</strong>}
            />,
            <AvakioTemplate
              key="label-pos-left"
              type="clean"
              borderType="clean"
              padding={[8, 0, 8, 0]}
              content='labelPosition="left" (default)'
            />,
            <AvakioMultiCombo
              value={labelLeftValue}
              options={simpleOptions}
              onChange={({ value }) => setLabelLeftValue(value)}
              label="Left"
              labelPosition="left"
              labelWidth={100}
              placeholder="Select..."
            />,
            <AvakioTemplate
              key="label-pos-top"
              type="clean"
              borderType="clean"
              padding={[16, 0, 8, 0]}
              content='labelPosition="top"'
            />,
            <AvakioMultiCombo
              value={labelTopValue}
              options={simpleOptions}
              onChange={({ value }) => setLabelTopValue(value)}
              label="Top"
              labelPosition="top"
              labelWidth={100}
              placeholder="Select..."
            />,
            <AvakioTemplate
              key="label-pos-right"
              type="clean"
              borderType="clean"
              padding={[16, 0, 8, 0]}
              content='labelPosition="right"'
            />,
            <AvakioMultiCombo
              value={labelRightValue}
              options={simpleOptions}
              onChange={({ value }) => setLabelRightValue(value)}
              label="Right"
              labelPosition="right"
              labelWidth={100}
              placeholder="Select..."
            />,
            <AvakioTemplate
              key="label-pos-bottom"
              type="clean"
              borderType="clean"
              padding={[16, 0, 8, 0]}
              content='labelPosition="bottom"'
            />,
            <AvakioMultiCombo
              value={labelBottomValue}
              options={simpleOptions}
              onChange={({ value }) => setLabelBottomValue(value)}
              label="Bottom"
              labelPosition="bottom"
              labelWidth={100}
              placeholder="Select..."
            />,
          ]}
        />

        {/* Label Alignment */}
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioTemplate
              key="label-title"
              type="clean"
              borderType="clean"
              content={<strong>Label Alignment</strong>}
            />,
            <AvakioTemplate
              key="label-left"
              type="clean"
              borderType="clean"
              padding={[8, 0, 8, 0]}
              content='labelAlign="left" (default)'
            />,
            <AvakioMultiCombo
              value={labelLeftValue}
              options={simpleOptions}
              onChange={({ value }) => setLabelLeftValue(value)}
              label="Left Aligned"
              labelAlign="left"
              labelWidth={120}
              placeholder="Select..."
            />,
            <AvakioTemplate
              key="label-right"
              type="clean"
              borderType="clean"
              padding={[16, 0, 8, 0]}
              content='labelAlign="right"'
            />,
            <AvakioMultiCombo
              value={labelRightValue}
              options={simpleOptions}
              onChange={({ value }) => setLabelRightValue(value)}
              label="Right Aligned"
              labelAlign="right"
              labelWidth={120}
              placeholder="Select..."
            />,
          ]}
        />

        {/* Validation States */}
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioTemplate
              key="validation-title"
              type="clean"
              borderType="clean"
              content={<strong>Validation States</strong>}
            />,
            <AvakioTemplate
              key="required-label"
              type="clean"
              borderType="clean"
              margin={[8, 0, 8, 0]}
              style={{ fontSize: '12px'}}
              content='required=true'
            />,
            <AvakioMultiCombo
              value={requiredValue}
              options={simpleOptions}
              onChange={({ value }) => setRequiredValue(value)}
              label="Required Field"
              labelWidth={120}
              required
              placeholder="Select..."
            />,
            <AvakioTemplate
              key="error-label"
              type="clean"
              borderType="clean"
              margin={[16, 0, 8, 0]}
              style={{ fontSize: '12px'}}
              content='invalid=true invalidMessage="Error message"'
            />,
            <AvakioMultiCombo
              value={errorValue}
              options={simpleOptions}
              onChange={({ value }) => setErrorValue(value)}
              label="With Error"
              labelWidth={120}
              invalid
              invalidMessage="At least one option is required"
              placeholder="Select..."
            />,
          ]}
        />

        {/* Other Options */}
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioTemplate
              key="other-title"
              type="clean"
              borderType="clean"
              content={<strong>Other Options</strong>}
            />,
            <AvakioTemplate
              key="disabled-label"
              type="clean"
              borderType="clean"
              margin={[8, 0, 8, 0]}
              style={{ fontSize: '12px'}}
              content='disabled=true'
            />,
            <AvakioMultiCombo
              value={disabledValue}
              options={techOptions}
              onChange={({ value }) => setDisabledValue(value)}
              label="Disabled"
              labelWidth={120}
              disabled
            />,
            <AvakioTemplate
              key="readonly-label"
              type="clean"
              borderType="clean"
              margin={[16, 0, 8, 0]}
              style={{ fontSize: '12px'}}
              content='readonly=true'
            />,
            <AvakioMultiCombo
              value={readonlyValue}
              options={techOptions}
              onChange={({ value }) => setReadonlyValue(value)}
              label="Read Only"
              labelWidth={120}
              readonly
            />,
            <AvakioTemplate
              key="clearable-label"
              type="clean"
              borderType="clean"
              margin={[16, 0, 8, 0]}
              style={{ fontSize: '12px'}}
              content='clearable=true'
            />,
            <AvakioMultiCombo
              value={clearableValue}
              options={techOptions}
              onChange={({ value }) => setClearableValue(value)}
              label="Clearable"
              labelWidth={120}
              clearable={true}
            />,
          ]}
        />

        {/* Size Variants */}
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioTemplate
              key="size-title"
              type="clean"
              borderType="clean"
              content={<strong>Size Variants</strong>}
            />,
            <AvakioTemplate
              key="default-size-label"
              type="clean"
              borderType="clean"
              margin={[8, 0, 8, 0]}
              style={{ fontSize: '12px'}}
              content='size="default" (default)'
            />,
            <AvakioMultiCombo
              value={defaultSizeValue}
              options={techOptions}
              onChange={({ value }) => setDefaultSizeValue(value)}
              label="Default Size"
              labelWidth={120}
              size="default"
              placeholder="Select..."
            />,
            <AvakioTemplate
              key="compact-size-label"
              type="clean"
              borderType="clean"
              margin={[16, 0, 8, 0]}
              style={{ fontSize: '12px'}}
              content='size="compact" - Ideal for filters and tables'
            />,
            <AvakioMultiCombo
              value={compactSizeValue}
              options={techOptions}
              onChange={({ value }) => setCompactSizeValue(value)}
              label="Compact Size"
              labelWidth={100}
              size="compact"
              placeholder="Select..."
            />,
          ]}
        />
      </section>

      {/* Interactive Playground Section */}
      <section 
        ref={(el) => { sectionRefs.current['playground'] = el; }}
        className="avakio-multicombo-demo-section"
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
          content="Experiment with different MultiCombo configurations in real-time. Change any property below to see the effect on the preview."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          height={700}
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
                      padding={[0,0,10,0]}
                      content={<span><strong>Preview</strong></span>}
                    />,
                    <AvakioMultiCombo
                      ref={multiComboRef}
                      id={getPropValue('componentId', 'playground-multicombo')}
                      testId={getPropValue('testId', '') || undefined}
                      className={getPropValue('className', '') || undefined}
                      value={playgroundValue}
                      options={techOptions}
                      onChange={({ value }) => {
                        setPlaygroundValue(value);
                        if (getPropValue('logOnChange', true)) addLog('onChange', `values: [${value.join(', ')}]`);
                      }}
                      // Appearance props
                      label={getPropValue('label', '')}
                      labelForm={getPropValue('labelForm', '') || undefined}
                      placeholder={getPropValue('placeholder', '')}
                      bottomLabel={getPropValue('bottomLabel', '') || undefined}
                      invalidMessage={getPropValue('invalid', false) ? getPropValue('invalidMessage', '') : undefined}
                      size={getPropValue('size', 'default') as 'default' | 'compact'}
                      labelPosition={getPropValue('labelPosition', 'left') as 'left' | 'top' | 'right' | 'bottom'}
                      labelAlign={getPropValue('labelAlign', 'left') as 'left' | 'center' | 'right'}
                      labelWidth={formatSizingValue(getPropValue('labelWidth', '100'))}
                      // Features props
                      clearable={getPropValue('clearable', false)}
                      showCount={getPropValue('showCount', false)}
                      maxDisplayItems={getPropValue('maxDisplayItems', 3) ? Number(getPropValue('maxDisplayItems', 3)) : 3}
                      yCount={getPropValue('yCount', '') ? Number(getPropValue('yCount', '')) : undefined}
                      // Sizing props
                      width={formatSizingValue(getPropValue('width', ''))}
                      maxHeight={formatSizingValue(getPropValue('maxHeight', ''))}
                      minWidth={formatSizingValue(getPropValue('minWidth', ''))}
                      minHeight={formatSizingValue(getPropValue('minHeight', ''))}
                      maxWidth={formatSizingValue(getPropValue('maxWidth', ''))}
                      bottomPadding={formatSizingValue(getPropValue('bottomPadding', '')) as number | undefined}
                      // State props
                      disabled={getPropValue('disabled', false)}
                      readonly={getPropValue('readonly', false)}
                      hidden={getPropValue('hidden', false)}
                      borderless={getPropValue('borderless', false)}
                      // Validation props
                      required={getPropValue('required', false)}
                      invalid={getPropValue('invalid', false)}
                      // Margin & Padding
                      margin={getPropValue('margin', '') ? getPropValue('margin', '').includes(',') ? getPropValue('margin', '').split(',').map(Number) as [number, number, number, number] : Number(getPropValue('margin', '')) : undefined}
                      padding={getPropValue('padding', '') ? getPropValue('padding', '').includes(',') ? getPropValue('padding', '').split(',').map(Number) as [number, number, number, number] : Number(getPropValue('padding', '')) : undefined}
                    />,
                    <AvakioTemplate
                      type="clean"
                      borderType="clean"
                      padding={[10,0,10,0]}
                      content={<span>Value: <strong>{getDisplayText(playgroundValue, techOptions)}</strong></span>}
                    />,
                    <AvakioTemplate
                      type="clean"
                      padding={[10,0,10,0]}
                      borderType="clean"
                      content={<strong>Ref Methods</strong>}
                    />,
                    // Ref Methods
                    <AvakioTemplate
                      type="clean"
                      padding={[10,0,10,0]}
                      borderType="clean"
                      scroll="xy"
                      flexWrap={true}
                      content={<>
                        <AvakioButton
                          size="sm"
                          label='Focus()'
                          margin={[0,10,10,0]}
                          labelAlign='center'
                          width='200px'
                          buttonWidth='150px'
                          onClick={() => {
                            multiComboRef.current?.focus();
                            addLog('focus()', 'called via ref');
                          }}
                        />
                        <AvakioButton
                          labelAlign='center'
                          width='200px'
                          buttonWidth='150px'
                          size="sm"
                          label='Blur()'
                          margin={[0,10,10,0]}
                          onClick={() => {
                            multiComboRef.current?.blur();
                            addLog('blur()', 'called via ref');
                          }}
                        />
                        <AvakioButton
                          size="sm"
                          labelAlign='center'
                          width='200px'
                          buttonWidth='150px'
                          label='getValue()'
                          margin={[0,10,10,0]}
                          onClick={() => {
                            const val = multiComboRef.current?.getValue();
                            addLog('getValue()', `returned: [${val?.join(', ') || ''}]`);
                          }}
                        />
                        <AvakioButton
                          size="sm"
                          label='setValue([react, vue])'
                          labelAlign='center'
                          width='200px'
                          buttonWidth='150px'
                          margin={[0,10,10,0]}
                          onClick={() => {
                            multiComboRef.current?.setValue(['react', 'vue']);
                            setPlaygroundValue(['react', 'vue']);
                            addLog('setValue()', 'set to [react, vue]');
                          }}
                        />
                        <AvakioButton
                          size="sm"
                          labelAlign='center'
                          width='200px'
                          buttonWidth='150px'
                          label='getText()'
                          margin={[0,10,10,0]}
                          onClick={() => {
                            const text = multiComboRef.current?.getText();
                            addLog('getText()', `returned: ${text || '(empty)'}`);
                          }}
                        />
                        <AvakioButton
                          size="sm"
                          labelAlign='center'
                          width='200px'
                          buttonWidth='150px'
                          label='clear()'
                          margin={[0,10,10,0]}
                          onClick={() => {
                            multiComboRef.current?.clear();
                            setPlaygroundValue([]);
                            addLog('clear()', 'called via ref');
                          }}
                        />
                        <AvakioButton
                          size="sm"
                          labelAlign='center'
                          width='200px'
                          buttonWidth='150px'
                          label='selectAll()'
                          margin={[0,10,10,0]}
                          onClick={() => {
                            multiComboRef.current?.selectAll();
                            setPlaygroundValue(techOptions.map(o => o.value));
                            addLog('selectAll()', 'called via ref');
                          }}
                        />
                        <AvakioButton
                          size="sm"
                          labelAlign='center'
                          width='200px'
                          buttonWidth='150px'
                          label='enable()'
                          margin={[0,10,10,0]}
                          onClick={() => {
                            multiComboRef.current?.enable();
                            addLog('enable()', 'called via ref');
                          }}
                        />
                        <AvakioButton
                          size="sm"
                          labelAlign='center'
                          width='200px'
                          buttonWidth='150px'
                          label='disable()'
                          margin={[0,10,10,0]}
                          onClick={() => {
                            multiComboRef.current?.disable();
                            addLog('disable()', 'called via ref');
                          }}
                        />
                        <AvakioButton
                          size="sm"
                          labelAlign='center'
                          width='200px'
                          buttonWidth='150px'
                          label='isEnabled()'
                          margin={[0,10,10,0]}
                          onClick={() => {
                            const enabled = multiComboRef.current?.isEnabled();
                            addLog('isEnabled()', `returned: ${enabled}`);
                          }}
                        />
                        <AvakioButton
                          size="sm"
                          labelAlign='center'
                          width='200px'
                          buttonWidth='150px'
                          label='show()'
                          margin={[0,10,10,0]}
                          onClick={() => {
                            multiComboRef.current?.show();
                            addLog('show()', 'called via ref');
                          }}
                        />
                        <AvakioButton
                          size="sm"
                          labelAlign='center'
                          width='200px'
                          buttonWidth='150px'
                          label='hide()'
                          margin={[0,10,10,0]}
                          onClick={() => {
                            multiComboRef.current?.hide();
                            addLog('hide()', 'called via ref');
                          }}
                        />
                        <AvakioButton
                          size="sm"
                          labelAlign='center'
                          width='200px'
                          buttonWidth='150px'
                          label='isVisible()'
                          margin={[0,10,10,0]}
                          onClick={() => {
                            const visible = multiComboRef.current?.isVisible();
                            addLog('isVisible()', `returned: ${visible}`);
                          }}
                        />
                        <AvakioButton
                          size="sm"
                          labelAlign='center'
                          width='200px'
                          buttonWidth='150px'
                          label='getElement()'
                          margin={[0,10,10,0]}
                          onClick={() => {
                            const el = multiComboRef.current?.getElement();
                            addLog('getElement()', `returned: ${el ? el.tagName : 'null'}`);
                          }}
                        />
                        <AvakioButton
                          size="sm"
                          labelAlign='center'
                          width='200px'
                          buttonWidth='150px'
                          label='getParentView()'
                          margin={[0,10,10,0]}
                          onClick={() => {
                            const parentView = multiComboRef.current?.getParentView();
                            addLog('getParentView()', `returned: ${parentView || 'null'}`);
                          }}
                        />
                        <AvakioButton
                          size="sm"
                          labelAlign='center'
                          width='200px'
                          buttonWidth='150px'
                          label='validate()'
                          margin={[0,10,10,0]}
                          onClick={() => {
                            const result = multiComboRef.current?.validate();
                            addLog('validate()', `returned: ${result}`);
                          }}
                        />
                      </>}
                    />
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
                            <AvakioButton
                              id='Button-reset-playground'
                              size="sm"
                              label="Reset"
                              align="right"
                              onClick={() => {
                                // Reset to initial values
                                setPlaygroundProps([
                                  // Identity Group
                                  { id: 'componentId', label: 'ID', type: 'text', value: 'playground-multicombo', group: 'Identity', placeholder: 'Component ID' },
                                  { id: 'testId', label: 'Test ID', type: 'text', value: '', group: 'Identity', placeholder: 'Test ID for testing' },
                                  { id: 'className', label: 'Class Name', type: 'text', value: '', group: 'Identity', placeholder: 'Additional CSS class' },
                                  // Appearance Group
                                  { id: 'label', label: 'Label', type: 'text', value: 'Technologies', group: 'Appearance', placeholder: 'Enter label text' },
                                  { id: 'labelForm', label: 'Label Form', type: 'text', value: '', group: 'Appearance', placeholder: 'Form label above the component' },
                                  { id: 'placeholder', label: 'Placeholder', type: 'text', value: 'Select technologies...', group: 'Appearance', placeholder: 'Enter placeholder' },
                                  { id: 'bottomLabel', label: 'Bottom Label', type: 'text', value: '', group: 'Appearance', placeholder: 'Help text below component' },
                                  { id: 'invalidMessage', label: 'Error Message', type: 'text', value: '', group: 'Appearance', placeholder: 'Error message' },
                                  { id: 'size', label: 'Size', type: 'select', value: 'default', group: 'Appearance', selectOptions: [{ id: 'default', value: 'Default' }, { id: 'compact', value: 'Compact' }] },
                                  { id: 'labelPosition', label: 'Label Position', type: 'select', value: 'left', group: 'Appearance', selectOptions: [{ id: 'left', value: 'Left' }, { id: 'top', value: 'Top' }, { id: 'right', value: 'Right' }, { id: 'bottom', value: 'Bottom' }] },
                                  { id: 'labelAlign', label: 'Label Align', type: 'select', value: 'left', group: 'Appearance', selectOptions: [{ id: 'left', value: 'Left' }, { id: 'center', value: 'Center' }, { id: 'right', value: 'Right' }] },
                                  { id: 'labelWidth', label: 'Label Width', type: 'text', value: '100', group: 'Appearance', placeholder: 'e.g. 100 or 100px' },
                                  // Features Group
                                  { id: 'clearable', label: 'Clearable', type: 'checkbox', value: false, group: 'Features', checkboxLabel: 'Show clear button' },
                                  { id: 'showCount', label: 'Show Count', type: 'checkbox', value: false, group: 'Features', checkboxLabel: 'Show count instead of chips' },
                                  { id: 'maxDisplayItems', label: 'Max Display Items', type: 'number', value: 3, group: 'Features', placeholder: 'e.g. 3' },
                                  { id: 'yCount', label: 'Y Count', type: 'number', value: '', group: 'Features', placeholder: 'Visible items (e.g. 5)' },
                                  // Sizing Group
                                  { id: 'width', label: 'Width', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 300 or 100%' },
                                  { id: 'maxHeight', label: 'Max Height', type: 'number', value: '', group: 'Sizing', placeholder: 'e.g. 300' },
                                  { id: 'minWidth', label: 'Min Width', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 200' },
                                  { id: 'minHeight', label: 'Min Height', type: 'number', value: '', group: 'Sizing', placeholder: 'e.g. 30' },
                                  { id: 'maxWidth', label: 'Max Width', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 500' },
                                  { id: 'margin', label: 'Margin', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 8 or 8,16,8,16' },
                                  { id: 'padding', label: 'Padding', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 8 or 8,16,8,16' },
                                  { id: 'bottomPadding', label: 'Bottom Padding', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 10 or 10px' },
                                  // State Group
                                  { id: 'disabled', label: 'Disabled', type: 'checkbox', value: false, group: 'State', checkboxLabel: 'Disable the component' },
                                  { id: 'readonly', label: 'Read Only', type: 'checkbox', value: false, group: 'State', checkboxLabel: 'Make select read-only' },
                                  { id: 'hidden', label: 'Hidden', type: 'checkbox', value: false, group: 'State', checkboxLabel: 'Hide the component' },
                                  { id: 'borderless', label: 'Borderless', type: 'checkbox', value: false, group: 'State', checkboxLabel: 'Remove border' },
                                  // Validation Group
                                  { id: 'required', label: 'Required', type: 'checkbox', value: false, group: 'Validation', checkboxLabel: 'Mark as required field' },
                                  { id: 'invalid', label: 'Invalid', type: 'checkbox', value: false, group: 'Validation', checkboxLabel: 'Mark as invalid' },
                                  // Events Group
                                  { id: 'logOnChange', label: 'Log onChange', type: 'checkbox', value: true, group: 'Events', checkboxLabel: 'Log onChange events' },
                                ]);
                                setPlaygroundValue(['react', 'typescript']);
                                addLog('Reset', 'playground configuration reset to defaults');
                              }}
                            />
                          }
                        />,
                      ]}
                    />,
                    <AvakioProperty
                      id='Property-playground-props'
                      className='avakio-fill-container'
                      items={playgroundProps}
                      onChange={handlePlaygroundPropsChange}
                      size='compact'
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
        className="avakio-multicombo-demo-section"
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
          content={<strong>Props</strong>}
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={0}
          rows={[
            <AvakioDataTable<PropDoc>
              key="props-table"
              id="multicombo-props-table"
              data={propsData}
              filterable
              sortable
              columns={propsColumns}
              select={false}
              showRowNum
              height={700}
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
              id="multicombo-events-table"
              data={eventsData}
              columns={propsColumns}
              filterable
              sortable
              select={false}
              showRowNum
              height={120}
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
              id="multicombo-methods-table"
              data={refMethodsData}
              columns={propsColumns}
              filterable
              sortable
              select={false}
              showRowNum
              height={420}
            />,
          ]}
        />
      </section>
    </div>
  );
}

export default AvakioMultiComboExample;
