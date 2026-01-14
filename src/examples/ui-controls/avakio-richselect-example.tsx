import React, { useState, useRef } from 'react';
import { AvakioRichSelect, AvakioRichSelectOption, AvakioRichSelectRef } from '../../components/avakio/ui-controls/avakio-richselect/avakio-richselect';
import { AvakioBaseRef } from '../../components/avakio/base/avakio-base-props';
import { AvakioTemplate } from '../../components/avakio/views/avakio-template/avakio-template';
import { AvakioLayout } from '../../components/avakio/layouts/avakio-layout/avakio-layout';
import { AvakioTabBar } from '../../components/avakio/ui-controls/avakio-tabbar/avakio-tabbar';
import { AvakioViewHeader } from '../../components/avakio/ui-widgets/avakio-view-header/avakio-view-header';
import { AvakioProperty, AvakioPropertyItem, AvakioPropertyRef } from '../../components/avakio/data-presentation/avakio-property/avakio-property';
import { AvakioDataTable, AvakioColumn } from '../../components/avakio/data-presentation/avakio-datatable/AvakioDataTable';
import { AvakioButton } from '../../components/avakio/ui-controls/avakio-button/avakio-button';
import { addEventLog } from '../../services/event-log-service';
import { formatSizingValue } from '../../lib/utils';
import { List, Settings2, Play, Book } from 'lucide-react';
import './avakio-richselect-example.css';

// Tab options for navigation
const TAB_OPTIONS = [
  { id: 'basic', label: 'Basic Usage', icon: <List size={14} /> },
  { id: 'options', label: 'Options', icon: <Settings2 size={14} /> },
  { id: 'playground', label: 'Interactive Playground', icon: <Play size={14} /> },
  { id: 'docs', label: 'Documentation', icon: <Book size={14} /> },
];

export function AvakioRichSelectExample() {
  const [activeSection, setActiveSection] = useState<string | number | null>('basic');
  
  // Section refs for scroll navigation
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  
  // Demo state values
  const [basicValue, setBasicValue] = useState<string | number>('');
  const [objectValue, setObjectValue] = useState<string | number>(2);
  const [templateValue, setTemplateValue] = useState<string | number>('');
  const [statusValue, setStatusValue] = useState<string | number>('');
  const [largeListValue, setLargeListValue] = useState<string | number>('');
  
  // Label Positions section state
  const [labelLeftValue, setLabelLeftValue] = useState<string | number>('');
  const [labelTopValue, setLabelTopValue] = useState<string | number>('');
  const [labelRightValue, setLabelRightValue] = useState<string | number>('');
  const [labelBottomValue, setLabelBottomValue] = useState<string | number>('');
  
  // Validation States section state
  const [requiredValue, setRequiredValue] = useState<string | number>('');
  const [errorValue, setErrorValue] = useState<string | number>('');
  
  // Other Options section state
  const [disabledValue, setDisabledValue] = useState<string | number>('us');
  const [readonlyValue, setReadonlyValue] = useState<string | number>('uk');
  const [notClearableValue, setNotClearableValue] = useState<string | number>('ca');
  
  // Playground state
  const [playgroundValue, setPlaygroundValue] = useState<string | number>('us');
  
  // Sample options
  const simpleOptions = ['Option One', 'Option Two', 'Option Three', 'Option Four', 'Option Five'];

  const fullOptions: AvakioRichSelectOption[] = [
    { id: 1, value: 'One' },
    { id: 2, value: 'Two' },
    { id: 3, value: 'Three' },
    { id: 4, value: 'Four' },
    { id: 5, value: 'Five' },
  ];

  const countryOptions: AvakioRichSelectOption[] = [
    { id: 'us', value: 'United States', flag: '🇺🇸' },
    { id: 'uk', value: 'United Kingdom', flag: '🇬🇧' },
    { id: 'ca', value: 'Canada', flag: '🇨🇦' },
    { id: 'au', value: 'Australia', flag: '🇦🇺' },
    { id: 'de', value: 'Germany', flag: '🇩🇪' },
    { id: 'fr', value: 'France', flag: '🇫🇷' },
    { id: 'jp', value: 'Japan', flag: '🇯🇵' },
    { id: 'cn', value: 'China', flag: '🇨🇳' },
  ];

  const statusOptions: AvakioRichSelectOption[] = [
    { id: 'active', value: 'Active', color: '#10b981' },
    { id: 'pending', value: 'Pending', color: '#f59e0b' },
    { id: 'inactive', value: 'Inactive', color: '#6b7280' },
    { id: 'blocked', value: 'Blocked', color: '#ef4444' },
  ];

  const largeOptions: AvakioRichSelectOption[] = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    value: `Item ${i + 1}`,
  }));

  // Playground property items for AvakioProperty
  const [playgroundProps, setPlaygroundProps] = useState<AvakioPropertyItem[]>([
    // Identity Group
    { id: 'componentId', label: 'ID', type: 'text', value: 'playground-richselect', group: 'Identity', placeholder: 'Component ID' },
    { id: 'testId', label: 'Test ID', type: 'text', value: '', group: 'Identity', placeholder: 'Test ID for testing' },
    { id: 'className', label: 'Class Name', type: 'text', value: '', group: 'Identity', placeholder: 'Additional CSS class' },
    
    // Appearance Group
    { id: 'label', label: 'Label', type: 'text', value: 'Country', group: 'Appearance', placeholder: 'Enter label text' },
    { id: 'labelForm', label: 'Label Form', type: 'text', value: '', group: 'Appearance', placeholder: 'Form label above the component' },
    { id: 'placeholder', label: 'Placeholder', type: 'text', value: 'Select a country...', group: 'Appearance', placeholder: 'Enter placeholder' },
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

  // Handle property changes (update state only, no logging)
  const handlePlaygroundPropsChange = (items: AvakioPropertyItem[], changed: AvakioPropertyItem) => {
    setPlaygroundProps(items);
  };

  // Ref example
  const richSelectRef = useRef<AvakioRichSelectRef>(null);
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
    setEventLog(prev => [...prev.slice(-4), `${new Date().toLocaleTimeString()} - ${action}${details ? ': ' + details : ''}`]);
    addEventLog('RichSelect', action, details);
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

  // Get display value for a selection
  const getDisplayValue = (value: string | number, options: AvakioRichSelectOption[]) => {
    if (!value) return 'None selected';
    const option = options.find(o => o.id === value);
    return option?.value || String(value);
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
    { id: 1, name: 'value', type: 'string | number', defaultValue: 'undefined', description: 'Selected value (ID or value string)', from: 'RichSelect' },
    { id: 2, name: 'options', type: 'AvakioRichSelectOption[] | string[]', defaultValue: '[]', description: 'Array of options - can be simple strings or objects with id/value', from: 'RichSelect' },
    { id: 3, name: 'placeholder', type: 'string', defaultValue: "'Select...'", description: 'Placeholder text when no selection', from: 'RichSelect' },
    { id: 4, name: 'template', type: '(option: AvakioRichSelectOption) => React.ReactNode', defaultValue: 'undefined', description: 'Custom render function for options', from: 'RichSelect' },
    { id: 5, name: 'yCount', type: 'number', defaultValue: 'undefined', description: 'Number of visible items in dropdown (limits height)', from: 'RichSelect' },
    { id: 6, name: 'clearable', type: 'boolean', defaultValue: 'false', description: 'Whether the selection can be cleared', from: 'Base' },
    { id: 7, name: 'size', type: "'default' | 'compact'", defaultValue: "'default'", description: 'Size variant - compact for filters/tables', from: 'RichSelect' },
    
    // Label Props
    { id: 8, name: 'label', type: 'string', defaultValue: 'undefined', description: 'Label text displayed beside the select (styled with background color)', from: 'ControlLabel' },
    { id: 9, name: 'labelForm', type: 'string', defaultValue: 'undefined', description: 'Plain text form label displayed above the component', from: 'ControlLabel' },
    { id: 10, name: 'labelPosition', type: "'left' | 'top' | 'right' | 'bottom'", defaultValue: "'left'", description: 'Position of the styled label', from: 'ControlLabel' },
    { id: 11, name: 'labelAlign', type: "'left' | 'center' | 'right'", defaultValue: "'left'", description: 'Alignment of the label text within the label area', from: 'ControlLabel' },
    { id: 12, name: 'labelWidth', type: 'number | string', defaultValue: '100', description: 'Width of the label (e.g. 100 or "100px")', from: 'ControlLabel' },
    { id: 13, name: 'bottomLabel', type: 'string', defaultValue: 'undefined', description: 'Help text displayed below the component (rendered via AvakioControlLabel)', from: 'ControlLabel' },
    { id: 14, name: 'bottomPadding', type: 'number | string', defaultValue: 'undefined', description: 'Padding at the bottom of the component', from: 'ControlLabel' },
    
    // State Props
    { id: 15, name: 'disabled', type: 'boolean', defaultValue: 'false', description: 'Whether the component is disabled', from: 'Base' },
    { id: 16, name: 'readonly', type: 'boolean', defaultValue: 'false', description: 'Whether the component is read-only', from: 'Base' },
    { id: 17, name: 'hidden', type: 'boolean', defaultValue: 'false', description: 'Whether the component is hidden', from: 'Base' },
    { id: 18, name: 'borderless', type: 'boolean', defaultValue: 'false', description: 'Removes the border from the component', from: 'Base' },
    
    // Validation Props
    { id: 19, name: 'required', type: 'boolean', defaultValue: 'false', description: 'Marks the field as required (shows asterisk)', from: 'ControlLabel' },
    { id: 20, name: 'invalid', type: 'boolean', defaultValue: 'false', description: 'Marks the component as invalid', from: 'ControlLabel' },
    { id: 21, name: 'invalidMessage', type: 'string', defaultValue: 'undefined', description: 'Sets the text of a validation message', from: 'ControlLabel' },
    
    // Sizing Props
    { id: 22, name: 'width', type: 'number | string', defaultValue: 'undefined', description: 'Width of the component', from: 'Base' },
    { id: 23, name: 'maxHeight', type: 'number | string', defaultValue: 'undefined', description: 'Maximum height of the dropdown (defaults to 300px)', from: 'Base' },
    { id: 24, name: 'minWidth', type: 'number | string', defaultValue: 'undefined', description: 'Minimum width of the component', from: 'Base' },
    { id: 25, name: 'maxWidth', type: 'number | string', defaultValue: 'undefined', description: 'Maximum width of the component', from: 'Base' },
    { id: 26, name: 'minHeight', type: 'number | string', defaultValue: 'undefined', description: 'Minimum height of the component', from: 'Base' },
    { id: 27, name: 'margin', type: 'number | string | [number, number, number, number]', defaultValue: 'undefined', description: 'Margin around the component', from: 'Base' },
    { id: 28, name: 'padding', type: 'number | string | [number, number, number, number]', defaultValue: 'undefined', description: 'Padding inside the component', from: 'Base' },
    
    // Identity Props
    { id: 29, name: 'id', type: 'string', defaultValue: 'undefined', description: 'Component ID', from: 'Base' },
    { id: 30, name: 'testId', type: 'string', defaultValue: 'undefined', description: 'Test ID for testing purposes', from: 'Base' },
    { id: 31, name: 'className', type: 'string', defaultValue: "''", description: 'Additional CSS class name', from: 'Base' },
    { id: 32, name: 'style', type: 'React.CSSProperties', defaultValue: 'undefined', description: 'Custom inline styles', from: 'Base' },
  ];

  const eventsData: PropDoc[] = [
    { id: 1, name: 'onChange', type: '(value: string | number, option?: AvakioRichSelectOption) => void', defaultValue: 'undefined', description: 'Fires when the selected value changes', from: 'RichSelect' },
  ];

  const refMethodsData: PropDoc[] = [
    { id: 1, name: 'getValue()', type: '() => string | number | undefined', defaultValue: '-', description: 'Returns the ID of the selected option', from: 'RichSelect' },
    { id: 2, name: 'getText()', type: '() => string', defaultValue: '-', description: 'Returns the text value of the selected option', from: 'RichSelect' },
    { id: 3, name: 'setValue(value)', type: '(value: string | number) => void', defaultValue: '-', description: 'Sets the selected value', from: 'RichSelect' },
    { id: 4, name: 'focus()', type: '() => void', defaultValue: '-', description: 'Sets focus to the control', from: 'Base' },
    { id: 5, name: 'blur()', type: '() => void', defaultValue: '-', description: 'Removes focus from the control', from: 'Base' },
    { id: 6, name: 'enable()', type: '() => void', defaultValue: '-', description: 'Enables the component', from: 'Base' },
    { id: 7, name: 'disable()', type: '() => void', defaultValue: '-', description: 'Disables the component', from: 'Base' },
    { id: 8, name: 'show()', type: '() => void', defaultValue: '-', description: 'Makes the component visible', from: 'Base' },
    { id: 9, name: 'hide()', type: '() => void', defaultValue: '-', description: 'Hides the component', from: 'Base' },
    { id: 10, name: 'isEnabled()', type: '() => boolean', defaultValue: '-', description: 'Checks whether the component is enabled', from: 'Base' },
    { id: 11, name: 'isVisible()', type: '() => boolean', defaultValue: '-', description: 'Checks whether the component is visible', from: 'Base' },
    { id: 12, name: 'getElement()', type: '() => HTMLElement | null', defaultValue: '-', description: 'Returns the root DOM element', from: 'Base' },
    { id: 13, name: 'getParentView()', type: '() => string | null', defaultValue: '-', description: 'Returns the ID or classname of the parent Avakio container', from: 'Base' },
    { id: 14, name: 'validate()', type: '() => boolean | string', defaultValue: '-', description: 'Validates the component value', from: 'Base' },
  ];

  const propsColumns: AvakioColumn<PropDoc>[] = [
    { id: 'name', header: 'Property', width: 180 },
    { id: 'type', header: 'Type', width: 320 },
    { id: 'defaultValue', header: 'Default', width: 100 },
    { id: 'from', header: 'From', width: 100, filterType: 'combo' },
    { id: 'description', header: 'Description', width: 320 },
  ];

  return (
    <div className="avakio-richselect-demo-container">
      {/* Sticky Header + Tab Navigation */}
      <div className="avakio-example-sticky-header">
        {/* Header */}
        <AvakioViewHeader
          label="UI Controls"
          title="RichSelect"
          subTitle="A non-editable dropdown select component with support for custom templates, keyboard navigation, and various states."
          isSticky={false}
        />

        {/* Tab Navigation */}
        <div className="avakio-example-tabbar-container">
          <AvakioTabBar
            id="richselect-demo-tabs"
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
        className="avakio-richselect-demo-section"
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
          content="The RichSelect displays a dropdown button that opens a list of options. Click to select an option."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioRichSelect
              value={basicValue}
              options={simpleOptions}
              onChange={({ value }) => {
                setBasicValue(value);
                addLog('onChange', `value: ${value || '(empty)'}`);
              }}
              placeholder="Select an option..."
              label="Simple Select"
              labelWidth={120}
            />,
            <AvakioTemplate
              type="clean"
              borderType="clean"
              padding={[10,0,10,0]}
              content={<>Selected: <strong>{basicValue || 'None'}</strong></>}
            />,
          ]}
        />

        {/* Object Options */}
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[16, 0, 0, 16]}
          content={<strong>Object Options with Initial Value</strong>}
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="Use objects with id and value properties for more control. Set an initial value by passing the option ID."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioRichSelect
              value={objectValue}
              options={fullOptions}
              onChange={({ value, option }) => {
                setObjectValue(value);
                addLog('onChange', `ID: ${value}, Value: ${option?.value || '(empty)'}`);
              }}
              label="Rich Select"
              labelWidth={120}
              placeholder="Choose one..."
            />,
            <AvakioTemplate
              type="clean"
              borderType="clean"
              padding={[10,0,10,0]}
              content={<>Selected ID: <strong>{objectValue || 'None'}</strong></>}
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
            <AvakioRichSelect
              value={templateValue}
              options={countryOptions}
              onChange={({ value }) => {
                setTemplateValue(value);
                addLog('onChange (template)', `value: ${value || '(empty)'}`);
              }}
              label="Country"
              labelWidth={120}
              placeholder="Select a country..."
              template={(option) => (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '20px' }}>{option.flag}</span>
                  <span>{option.value}</span>
                </div>
              )}
            />,
            <AvakioTemplate
              type="clean"
              borderType="clean"
              padding={[10,0,10,0]}
              content={<>Selected: <strong>{getDisplayValue(templateValue, countryOptions)}</strong></>}
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
            <AvakioRichSelect
              value={statusValue}
              options={statusOptions}
              onChange={({ value }) => {
                setStatusValue(value);
                addLog('onChange (status)', `value: ${value || '(empty)'}`);
              }}
              label="Status"
              labelWidth={120}
              placeholder="Select status..."
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
                  <span>{option.value}</span>
                </div>
              )}
            />,
            <AvakioTemplate
              type="clean"
              borderType="clean"
              padding={[10,0,10,0]}
              content={<>Selected: <strong>{getDisplayValue(statusValue, statusOptions)}</strong></>}
            />,
          ]}
        />
      </section>

      {/* Options Section */}
      <section 
        ref={(el) => { sectionRefs.current['options'] = el; }}
        className="avakio-richselect-demo-section"
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
          content="Customize the RichSelect with various options like large datasets, label alignment, and validation states."
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
            <AvakioRichSelect
              value={largeListValue}
              options={largeOptions}
              onChange={({ value }) => {
                setLargeListValue(value);
                addLog('onChange (large)', `value: ${value || '(empty)'}`);
              }}
              label="Large List"
              labelWidth={120}
              placeholder="Select from 100 items..."
              yCount={5}
              margin={[8, 0, 0, 0]}
            />,
            <AvakioTemplate
              type="clean"
              borderType="clean"
              padding={[10,0,10,0]}
              content={<>Selected: <strong>{largeListValue ? `Item ${largeListValue}` : 'None'}</strong></>}
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
            <AvakioRichSelect
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
            <AvakioRichSelect
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
            <AvakioRichSelect
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
            <AvakioRichSelect
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
            <AvakioRichSelect
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
            <AvakioRichSelect
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
            <AvakioRichSelect
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
            <AvakioRichSelect
              value={errorValue}
              options={simpleOptions}
              onChange={({ value }) => setErrorValue(value)}
              label="With Error"
              labelWidth={120}
              invalid
              invalidMessage="This field is required"
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
            <AvakioRichSelect
              value={disabledValue}
              options={countryOptions}
              onChange={({ value }) => setDisabledValue(value)}
              label="Disabled"
              labelWidth={120}
              disabled
              template={(option) => (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '20px' }}>{option.flag}</span>
                  <span>{option.value}</span>
                </div>
              )}
            />,
            <AvakioTemplate
              key="readonly-label"
              type="clean"
              borderType="clean"
              margin={[16, 0, 8, 0]}
              style={{ fontSize: '12px'}}
              content='readonly=true'
            />,
            <AvakioRichSelect
              value={readonlyValue}
              options={countryOptions}
              onChange={({ value }) => setReadonlyValue(value)}
              label="Read Only"
              labelWidth={120}
              readonly
              template={(option) => (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '20px' }}>{option.flag}</span>
                  <span>{option.value}</span>
                </div>
              )}
            />,
            <AvakioTemplate
              key="notclearable-label"
              type="clean"
              borderType="clean"
              margin={[16, 0, 8, 0]}
              style={{ fontSize: '12px'}}
              content='clearable=false'
            />,
            <AvakioRichSelect
              value={notClearableValue}
              options={countryOptions}
              onChange={({ value }) => setNotClearableValue(value)}
              label="Not Clearable"
              labelWidth={120}
              clearable={false}
              template={(option) => (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '20px' }}>{option.flag}</span>
                  <span>{option.value}</span>
                </div>
              )}
            />,
          ]}
        />
      </section>

      {/* Interactive Playground Section */}
      <section 
        ref={(el) => { sectionRefs.current['playground'] = el; }}
        className="avakio-richselect-demo-section"
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
          content="Experiment with different RichSelect configurations in real-time. Change any property below to see the effect on the preview."
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
                      padding={[0,0,10,0]}
                      content={<span><strong>Preview</strong></span>}
                    />,
                    <AvakioRichSelect
                      ref={richSelectRef}
                      id={getPropValue('componentId', 'playground-richselect')}
                      testId={getPropValue('testId', '') || undefined}
                      className={getPropValue('className', '') || undefined}
                      value={playgroundValue}
                      options={countryOptions}
                      onChange={({ value, option }) => {
                        setPlaygroundValue(value);
                        if (getPropValue('logOnChange', true)) addLog('onChange', `ID: ${value}, Value: ${option?.value || '(empty)'}`);
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
                      yCount={getPropValue('yCount', '') ? Number(getPropValue('yCount', '')) : undefined}
                      // Sizing props
                      width={formatSizingValue(getPropValue('width', ''))}
                      maxHeight={formatSizingValue(getPropValue('maxHeight', ''))}
                      minWidth={formatSizingValue(getPropValue('minWidth', ''))}
                      minHeight={formatSizingValue(getPropValue('minHeight', ''))}
                      maxWidth={formatSizingValue(getPropValue('maxWidth', ''))}
                      bottomPadding={formatSizingValue(getPropValue('bottomPadding', ''))}
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
                      template={(option) => (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontSize: '20px' }}>{option.flag}</span>
                          <span>{option.value}</span>
                        </div>
                      )}
                    />,
                    <AvakioTemplate
                      type="clean"
                      borderType="clean"
                      padding={[10,0,10,0]}
                      content={<span>Value: <strong>{getDisplayValue(playgroundValue, countryOptions)}</strong></span>}
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
                            richSelectRef.current?.focus();
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
                            richSelectRef.current?.blur();
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
                            const val = playgroundValue;
                            addLog('getValue()', `returned: ${val || '(empty)'}`);
                          }}
                        />
                        <AvakioButton
                          size="sm"
                          label='setValue(de)'
                          labelAlign='center'
                          width='200px'
                          buttonWidth='150px'
                          margin={[0,10,10,0]}
                          onClick={() => {
                            setPlaygroundValue('de');
                            addLog('setValue()', 'set to Germany (de)');
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
                            const text = getDisplayValue(playgroundValue, countryOptions);
                            addLog('getText()', `returned: ${text || '(empty)'}`);
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
                            richSelectRef.current?.enable();
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
                            richSelectRef.current?.disable();
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
                            const enabled = richSelectRef.current?.isEnabled();
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
                            richSelectRef.current?.show();
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
                            richSelectRef.current?.hide();
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
                            const visible = richSelectRef.current?.isVisible();
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
                            const el = richSelectRef.current?.getElement();
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
                            const parentView = richSelectRef.current?.getParentView();
                            addLog('getParentView()', `returned: ${parentView || 'null'}`);
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
                                  { id: 'componentId', label: 'ID', type: 'text', value: 'playground-richselect', group: 'Identity', placeholder: 'Component ID' },
                                  { id: 'testId', label: 'Test ID', type: 'text', value: '', group: 'Identity', placeholder: 'Test ID for testing' },
                                  { id: 'className', label: 'Class Name', type: 'text', value: '', group: 'Identity', placeholder: 'Additional CSS class' },
                                  // Appearance Group
                                  { id: 'label', label: 'Label', type: 'text', value: 'Country', group: 'Appearance', placeholder: 'Enter label text' },
                                  { id: 'placeholder', label: 'Placeholder', type: 'text', value: 'Select a country...', group: 'Appearance', placeholder: 'Enter placeholder' },
                                  { id: 'invalidMessage', label: 'Error Message', type: 'text', value: '', group: 'Appearance', placeholder: 'Error message' },
                                  { id: 'size', label: 'Size', type: 'select', value: 'default', group: 'Appearance', selectOptions: [{ id: 'default', value: 'Default' }, { id: 'compact', value: 'Compact' }] },
                                  { id: 'labelAlign', label: 'Label Align', type: 'select', value: 'left', group: 'Appearance', selectOptions: [{ id: 'left', value: 'Left' }, { id: 'right', value: 'Right' }] },
                                  { id: 'labelWidth', label: 'Label Width', type: 'number', value: 100, group: 'Appearance', placeholder: 'e.g. 100' },
                                  // Features Group
                                  { id: 'clearable', label: 'Clearable', type: 'checkbox', value: false, group: 'Features', checkboxLabel: 'Show clear button' },
                                  { id: 'yCount', label: 'Y Count', type: 'number', value: '', group: 'Features', placeholder: 'Visible items (e.g. 5)' },
                                  // Sizing Group
                                  { id: 'width', label: 'Width', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 300 or 100%' },
                                  { id: 'maxHeight', label: 'Max Height', type: 'number', value: '', group: 'Sizing', placeholder: 'e.g. 300' },
                                  { id: 'minWidth', label: 'Min Width', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 200' },
                                  { id: 'minHeight', label: 'Min Height', type: 'number', value: '', group: 'Sizing', placeholder: 'e.g. 30' },
                                  { id: 'maxWidth', label: 'Max Width', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 500' },
                                  { id: 'margin', label: 'Margin', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 8 or 8,16,8,16' },
                                  { id: 'padding', label: 'Padding', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 8 or 8,16,8,16' },
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
                                setPlaygroundValue('us');
                                addLog('Reset', 'playground configuration reset to defaults');
                              }}
                            />
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
                      label="Get Item Count"
                      align="right"
                      onClick={() => {
                        const count = propertyRef.current?.getItemCount();
                        addLog('Item Count', `Num of Items: ${count}`);
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
        className="avakio-richselect-demo-section"
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
              id="richselect-props-table"
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
              id="richselect-events-table"
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
              id="richselect-methods-table"
              data={refMethodsData}
              columns={propsColumns}
              filterable
              sortable
              select={false}
              showRowNum
              height={380}
            />,
          ]}
        />
      </section>
    </div>
  );
}

export default AvakioRichSelectExample;
