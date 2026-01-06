import React, { useState, useRef } from 'react';
import { AvakioDatePicker } from '../../components/avakio/ui-controls/avakio-datepicker';
import { AvakioBaseRef } from '../../components/avakio/base/avakio-base-props';
import { AvakioTemplate } from '../../components/avakio/views/avakio-template/avakio-template';
import { AvakioLayout } from '../../components/avakio/layouts/avakio-layout/avakio-layout';
import { AvakioRichSelect } from '../../components/avakio/ui-controls/avakio-richselect/avakio-richselect';
import { AvakioCheckbox } from '../../components/avakio/ui-controls/avakio-checkbox/avakio-checkbox';
import { AvakioButton } from '../../components/avakio/ui-controls/avakio-button/avakio-button';
import { AvakioDataTable } from '../../components/avakio/data-presentation/avakio-datatable/AvakioDataTable';
import type { AvakioColumn } from '../../components/avakio/data-presentation/avakio-datatable/AvakioDataTable';
import { AvakioTabBar } from '../../components/avakio/ui-controls/avakio-tabbar/avakio-tabbar';
import { AvakioViewHeader } from '../../components/avakio/ui-widgets/avakio-view-header/avakio-view-header';
import { AvakioProperty, AvakioPropertyItem } from '../../components/avakio/data-presentation/avakio-property/avakio-property';
import { addEventLog } from '../../services/event-log-service';
import { 
  Calendar,
  Settings2,
  Wand2,
  Book,
  Play,
} from 'lucide-react';
import './avakio-datepicker-example.css';

// Tab options for navigation
const TAB_OPTIONS = [
  { id: 'basic', label: 'Basic Usage', icon: <Calendar size={14} /> },
  { id: 'options', label: 'Options', icon: <Settings2 size={14} /> },
  { id: 'playground', label: 'Interactive Playground', icon: <Play size={14} /> },
  { id: 'docs', label: 'Documentation', icon: <Book size={14} /> },
];

export function AvakioDatePickerExample() {
  const [activeSection, setActiveSection] = useState<string | number | null>('basic');
  
  // Section refs for scroll navigation
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  
  // Demo state values
  const [basicDate, setBasicDate] = useState<string>('');
  const [inlineDate, setInlineDate] = useState<string>('');
  const [timeDate, setTimeDate] = useState<string>('');
  const [compactDate, setCompactDate] = useState<string>('');
  
  // Playground state
  const [playgroundValue, setPlaygroundValue] = useState<string>(new Date().toISOString());
  
  // Playground property items for AvakioProperty
  const [playgroundProps, setPlaygroundProps] = useState<AvakioPropertyItem[]>([
    // Appearance Group
    { id: 'label', label: 'Label', type: 'text', value: 'Event Date', group: 'Appearance', placeholder: 'Enter label text' },
    { id: 'placeholder', label: 'Placeholder', type: 'text', value: 'Select a date...', group: 'Appearance', placeholder: 'Enter placeholder' },
    { id: 'bottomLabel', label: 'Bottom Label', type: 'text', value: '', group: 'Appearance', placeholder: 'Helper text' },
    { id: 'tooltip', label: 'Tooltip', type: 'text', value: '', group: 'Appearance', placeholder: 'Tooltip text' },
    { id: 'invalidMessage', label: 'Invalid Message', type: 'text', value: 'This field is required', group: 'Appearance', placeholder: 'Error message' },
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
    { id: 'labelWidth', label: 'Label Width', type: 'number', value: 100, group: 'Appearance', placeholder: 'e.g. 100' },
    
    // Features Group
    { id: 'showTime', label: 'Show Time', type: 'checkbox', value: false, group: 'Features', checkboxLabel: 'Enable time selection' },
    { id: 'inline', label: 'Inline Mode', type: 'checkbox', value: false, group: 'Features', checkboxLabel: 'Display calendar inline' },
    { id: 'showYearSelector', label: 'Year Selector', type: 'checkbox', value: false, group: 'Features', checkboxLabel: 'Show month/year quick selector' },
    { id: 'clearable', label: 'Clearable', type: 'checkbox', value: true, group: 'Features', checkboxLabel: 'Show clear button' },
    { id: 'enableValueCopyButton', label: 'Copy Button', type: 'checkbox', value: false, group: 'Features', checkboxLabel: 'Show copy value button' },
    
    // Year Selector Range
    { id: 'minYear', label: 'Min Year', type: 'number', value: '', group: 'Year Selector', placeholder: 'e.g. 1920' },
    { id: 'maxYear', label: 'Max Year', type: 'number', value: '', group: 'Year Selector', placeholder: 'e.g. 2030' },
    
    // Sizing Group
    { id: 'width', label: 'Width', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 300 or 100%' },
    { id: 'height', label: 'Height', type: 'number', value: '', group: 'Sizing', placeholder: 'e.g. 38' },
    { id: 'minWidth', label: 'Min Width', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 200' },
    { id: 'maxWidth', label: 'Max Width', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 500' },
    { id: 'minHeight', label: 'Min Height', type: 'number', value: '', group: 'Sizing', placeholder: 'e.g. 30' },
    { id: 'maxHeight', label: 'Max Height', type: 'number', value: '', group: 'Sizing', placeholder: 'e.g. 50' },
    
    // State Group
    { id: 'disabled', label: 'Disabled', type: 'checkbox', value: false, group: 'State', checkboxLabel: 'Disable the component' },
    { id: 'readonly', label: 'Read Only', type: 'checkbox', value: false, group: 'State', checkboxLabel: 'Make input read-only' },
    { id: 'hidden', label: 'Hidden', type: 'checkbox', value: false, group: 'State', checkboxLabel: 'Hide the component' },
    { id: 'borderless', label: 'Borderless', type: 'checkbox', value: false, group: 'State', checkboxLabel: 'Remove border' },
    
    // Validation Group
    { id: 'required', label: 'Required', type: 'checkbox', value: false, group: 'Validation', checkboxLabel: 'Mark as required field' },
    { id: 'invalid', label: 'Invalid', type: 'checkbox', value: false, group: 'Validation', checkboxLabel: 'Show invalid/error state' },
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
  const datePickerRef = useRef<AvakioBaseRef<string>>(null);
  const [eventLog, setEventLog] = useState<string[]>([]);

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

  // Add to local event log and global event log
  const addLog = (action: string, details: string = '') => {
    // Add to local log for display in the example
    setEventLog(prev => [...prev.slice(-4), `${new Date().toLocaleTimeString()} - ${action}${details ? ': ' + details : ''}`]);
    // Add to global event log sidebar
    addEventLog('DatePicker', action, details);
  };

  // Format date for display
  const formatDate = (isoString: string, includeTime = false) => {
    if (!isoString) return 'No date selected';
    const date = new Date(isoString);
    if (Number.isNaN(date.getTime())) return isoString;
    if (includeTime) {
      return date.toLocaleString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
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
    { id: 1, name: 'id', type: 'string', defaultValue: 'undefined', description: 'Component ID' },
    { id: 2, name: 'testId', type: 'string', defaultValue: 'undefined', description: 'Test ID for testing purposes' },
    { id: 3, name: 'value', type: 'string', defaultValue: "''", description: 'ISO string of selected date/time' },
    { id: 4, name: 'onChange', type: '(newValue: string, oldValue?: string) => void', defaultValue: 'required', description: 'Callback when date/time changes, receives new and old value' },
    { id: 5, name: 'label', type: 'string', defaultValue: 'undefined', description: 'Label text displayed next to the input' },
    { id: 6, name: 'placeholder', type: 'string', defaultValue: "''", description: 'Placeholder text when no date is selected' },
    { id: 7, name: 'showTime', type: 'boolean', defaultValue: 'false', description: 'Enable time selection (returns full ISO datetime)' },
    { id: 8, name: 'inline', type: 'boolean', defaultValue: 'false', description: 'Display calendar inline without dropdown' },
    { id: 9, name: 'showYearSelector', type: 'boolean', defaultValue: 'false', description: 'Show month/year selector to quickly jump to different dates' },
    { id: 10, name: 'minYear', type: 'number', defaultValue: 'currentYear - 100', description: 'Minimum year available in the year selector' },
    { id: 11, name: 'maxYear', type: 'number', defaultValue: 'currentYear + 50', description: 'Maximum year available in the year selector' },
    { id: 12, name: 'size', type: "'default' | 'compact'", defaultValue: "'default'", description: 'Size variant - compact for filters/tables' },
    { id: 13, name: 'clearable', type: 'boolean', defaultValue: 'false', description: 'Show clear button when value exists' },
    { id: 14, name: 'enableValueCopyButton', type: 'boolean', defaultValue: 'false', description: 'Show copy button to copy value to clipboard' },
    { id: 15, name: 'borderless', type: 'boolean', defaultValue: 'false', description: 'Remove border from component' },
    { id: 16, name: 'disabled', type: 'boolean', defaultValue: 'false', description: 'Disable the component' },
    { id: 17, name: 'readonly', type: 'boolean', defaultValue: 'false', description: 'Make the input read-only' },
    { id: 18, name: 'hidden', type: 'boolean', defaultValue: 'false', description: 'Hide the component' },
    { id: 19, name: 'required', type: 'boolean', defaultValue: 'false', description: 'Mark field as required (shows asterisk)' },
    { id: 20, name: 'invalid', type: 'boolean', defaultValue: 'false', description: 'Show invalid/error state' },
    { id: 21, name: 'invalidMessage', type: 'string', defaultValue: 'undefined', description: 'Error message to display when invalid' },
    { id: 22, name: 'labelPosition', type: "'left' | 'top'", defaultValue: "'left'", description: 'Position of the label relative to input' },
    { id: 23, name: 'labelAlign', type: "'left' | 'right' | 'center'", defaultValue: "'left'", description: 'Alignment of label text' },
    { id: 24, name: 'labelWidth', type: 'number | string', defaultValue: '80', description: 'Width of the label area' },
    { id: 25, name: 'width', type: 'number | string', defaultValue: 'undefined', description: 'Width of the component' },
    { id: 26, name: 'height', type: 'number | string', defaultValue: '38', description: 'Height of the component' },
    { id: 27, name: 'minWidth', type: 'number | string', defaultValue: 'undefined', description: 'Minimum width' },
    { id: 28, name: 'minHeight', type: 'number | string', defaultValue: 'undefined', description: 'Minimum height' },
    { id: 29, name: 'maxWidth', type: 'number | string', defaultValue: 'undefined', description: 'Maximum width' },
    { id: 30, name: 'maxHeight', type: 'number | string', defaultValue: 'undefined', description: 'Maximum height' },
    { id: 31, name: 'bottomLabel', type: 'string', defaultValue: 'undefined', description: 'Helper text below the input' },
    { id: 32, name: 'tooltip', type: 'string', defaultValue: 'undefined', description: 'Tooltip text on hover' },
    { id: 33, name: 'className', type: 'string', defaultValue: 'undefined', description: 'Additional CSS class name' },
    { id: 34, name: 'style', type: 'React.CSSProperties', defaultValue: 'undefined', description: 'Custom inline styles' },
    { id: 35, name: 'onBlur', type: '(event: FocusEvent) => void', defaultValue: 'undefined', description: 'Callback when focus leaves the input' },
    { id: 36, name: 'onFocus', type: '(event: FocusEvent) => void', defaultValue: 'undefined', description: 'Callback when input receives focus' },
    { id: 37, name: 'onKeyPress', type: '(event: KeyboardEvent) => void', defaultValue: 'undefined', description: 'Callback on keyboard key press' },
  ];

  const refMethodsData: PropDoc[] = [
    { id: 1, name: 'blur()', type: '() => void', defaultValue: '-', description: 'Remove focus from the control' },
    { id: 2, name: 'focus()', type: '() => void', defaultValue: '-', description: 'Set focus to the control' },
    { id: 3, name: 'getValue()', type: '() => string | undefined', defaultValue: '-', description: 'Get the current value' },
    { id: 4, name: 'setValue(value)', type: '(value: string) => void', defaultValue: '-', description: 'Set a new value' },
    { id: 5, name: 'getText()', type: '() => string', defaultValue: '-', description: 'Get the display text value' },
    { id: 6, name: 'enable()', type: '() => void', defaultValue: '-', description: 'Enable the component' },
    { id: 7, name: 'disable()', type: '() => void', defaultValue: '-', description: 'Disable the component' },
    { id: 8, name: 'isEnabled()', type: '() => boolean', defaultValue: '-', description: 'Check if enabled' },
    { id: 9, name: 'show()', type: '() => void', defaultValue: '-', description: 'Show the component' },
    { id: 10, name: 'hide()', type: '() => void', defaultValue: '-', description: 'Hide the component' },
    { id: 11, name: 'isVisible()', type: '() => boolean', defaultValue: '-', description: 'Check if visible' },
    { id: 12, name: 'validate()', type: '() => boolean | string', defaultValue: '-', description: 'Run validation and return result' },
    { id: 13, name: 'getElement()', type: '() => HTMLElement | null', defaultValue: '-', description: 'Get the root DOM element' },
    { id: 14, name: 'getParentView()', type: '() => HTMLElement | null', defaultValue: '-', description: 'Get the parent element' },
  ];

  const propsColumns: AvakioColumn<PropDoc>[] = [
    { id: 'name', header: 'Property', width: 180 },
    { id: 'type', header: 'Type', width: 300 },
    { id: 'defaultValue', header: 'Default', width: 100 },
    { id: 'description', header: 'Description', width: 350 },
  ];

  return (
    <div className="avakio-datepicker-demo-container">
      {/* Sticky Header + Tab Navigation */}
      <div className="avakio-example-sticky-header">
        {/* Header */}
        <AvakioViewHeader
          label="UI Controls"
          title="DatePicker"
          subTitle="A date and time picker component with dropdown and inline modes, time selection, and full theme support."
          isSticky={false}
        />

        {/* Tab Navigation */}
        <div className="avakio-example-tabbar-container">
          <AvakioTabBar
            id="datepicker-demo-tabs"
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
        className="avakio-datepicker-demo-section"
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
          content="The DatePicker displays a trigger button that opens a calendar popover. Click to select a date."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <div key="basic" style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
              <AvakioDatePicker
                margin={[5, 5, 5, 5]} 
                value={basicDate}
                labelWidth={100}
                onChange={(newVal) => {
                  setBasicDate(newVal);
                  addLog('onChange', `value: ${newVal || '(empty)'}`);
                }}
                label="Select Date"
                showTime={false}
                clearable
              />
              <div className="avakio-datepicker-result" style={{ margin: '5px' }}>
                Selected: <strong>{formatDate(basicDate)}</strong>
              </div>
            </div>,
          ]}
        />

        {/* Inline Mode */}
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[16, 0, 0, 16]}
          content={<strong>Inline Mode</strong>}
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="Set inline={true} to display the calendar directly without a dropdown. Use showYearSelector={true} to enable month/year quick selection."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <div key="inline" style={{ display: 'flex', justifyContent: 'center' }}>
              <AvakioDatePicker
                value={inlineDate}
                onChange={(newVal) => {
                  setInlineDate(newVal);
                  addLog('onChange (inline)', `value: ${newVal || '(empty)'}`);
                }}
                showTime={false}
                inline
                showYearSelector
              />
            </div>,
            <div key="inline-result" className="avakio-datepicker-result" style={{ textAlign: 'center' }}>
              Selected: <strong>{formatDate(inlineDate)}</strong>
            </div>,
          ]}
        />

        {/* With Time */}
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[16, 0, 0, 16]}
          content={<strong>With Time Selection</strong>}
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="Enable time selection with showTime={true}. The picker includes hour and minute inputs with OK/Cancel buttons."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <div key="time" style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
              <AvakioDatePicker
                value={timeDate}
                onChange={setTimeDate}
                label="Date & Time"
                showTime={true}
                clearable
              />
              <div className="avakio-datepicker-result">
                Selected: <strong>{formatDate(timeDate, true)}</strong>
              </div>
            </div>,
          ]}
        />
      </section>

      {/* Options Section */}
      <section 
        ref={(el) => { sectionRefs.current['options'] = el; }}
        className="avakio-datepicker-demo-section"
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
          content="Customize the DatePicker with various options like size variants, label positions, and validation states."
        />

        {/* Compact Size */}
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioTemplate
              key="compact-title"
              type="clean"
              borderType="clean"
              content={<strong>Compact Size</strong>}
            />,
            <AvakioTemplate
              key="compact-desc"
              type="clean"
              borderType="clean"
              padding={[8, 0, 0, 0]}
              content="Use size='compact' for filters, table cells, or tight spaces."
            />,
            <div key="compact" style={{ display: 'flex', gap: '16px', marginTop: '12px', alignItems: 'center' }}>
              <span>Filter by date:</span>
              <AvakioDatePicker
                value={compactDate}
                onChange={setCompactDate}
                showTime={false}
                size="compact"
                clearable
                placeholder="Select..."
              />
            </div>,
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
              key="label-title"
              type="clean"
              borderType="clean"
              content={<strong>Label Positions</strong>}
            />,
            <div key="labels" style={{ display: 'flex', gap: '32px', marginTop: '12px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontSize: '12px', color: '#666' }}>labelPosition="left" (default)</span>
                <AvakioDatePicker
                  value=""
                  onChange={() => {}}
                  label="Date"
                  labelPosition="left"
                  showTime={false}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontSize: '12px', color: '#666' }}>labelPosition="top"</span>
                <AvakioDatePicker
                  value=""
                  onChange={() => {}}
                  label="Date"
                  labelPosition="top"
                  showTime={false}
                />
              </div>
            </div>,
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
            <div key="validation" style={{ display: 'flex', gap: '32px', marginTop: '12px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontSize: '12px', color: '#666' }}>required=true</span>
                <AvakioDatePicker
                  value=""
                  onChange={() => {}}
                  label="Birth Date"
                  required
                  showTime={false}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontSize: '12px', color: '#666' }}>invalid=true</span>
                <AvakioDatePicker
                  value=""
                  onChange={() => {}}
                  label="Due Date"
                  invalid
                  invalidMessage="Please select a valid date"
                  showTime={false}
                />
              </div>
            </div>,
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
            <div key="other" style={{ display: 'flex', gap: '32px', marginTop: '12px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontSize: '12px', color: '#666' }}>disabled=true</span>
                <AvakioDatePicker
                  value={new Date().toISOString()}
                  onChange={() => {}}
                  label="Date"
                  disabled
                  showTime={false}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontSize: '12px', color: '#666' }}>borderless=true</span>
                <AvakioDatePicker
                  value=""
                  onChange={() => {}}
                  label="Date"
                  borderless
                  showTime={false}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontSize: '12px', color: '#666' }}>enableValueCopyButton=true</span>
                <AvakioDatePicker
                  value={new Date().toISOString()}
                  onChange={() => {}}
                  label="Date"
                  enableValueCopyButton
                  clearable
                  showTime={false}
                />
              </div>
            </div>,
          ]}
        />
      </section>

      {/* Interactive Playground Section */}
      <section 
        ref={(el) => { sectionRefs.current['playground'] = el; }}
        className="avakio-datepicker-demo-section"
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
          content="Experiment with different DatePicker configurations in real-time. Change any property below to see the effect on the preview."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[ <AvakioLayout
              type="clean"
              borderless={true}              
              cols={[
                //Column 1
                <AvakioLayout
                  type="clean"
                  borderless={true}                  
                  rows={[
                    <AvakioTemplate
                      type="clean"
                      borderType="clean"
                      padding={[0,0,10,0]}
                      content={<strong>Preview</strong>}
                    />,
                    <AvakioDatePicker
                      id='Playground_DatePicker'
                      ref={datePickerRef}                    
                      value={playgroundValue}
                      onChange={(newVal) => {
                        setPlaygroundValue(newVal);
                        addLog('onChange', `value: ${newVal || '(empty)'}`);
                      }}
                      // Appearance props
                      label={getPropValue('label', '')}
                      placeholder={getPropValue('placeholder', '')}
                      bottomLabel={getPropValue('bottomLabel', '')}
                      tooltip={getPropValue('tooltip', '')}
                      size={getPropValue('size', 'default') as 'default' | 'compact'}
                      labelPosition={getPropValue('labelPosition', 'left') as 'left' | 'top'}
                      labelAlign={getPropValue('labelAlign', 'left') as 'left' | 'center' | 'right'}
                      labelWidth={getPropValue('labelWidth', 100)}
                      // Features props
                      showTime={getPropValue('showTime', false)}
                      inline={getPropValue('inline', false)}
                      showYearSelector={getPropValue('showYearSelector', false)}
                      clearable={getPropValue('clearable', true)}
                      enableValueCopyButton={getPropValue('enableValueCopyButton', false)}
                      // Year selector range
                      minYear={getPropValue('minYear', '') ? Number(getPropValue('minYear', '')) : undefined}
                      maxYear={getPropValue('maxYear', '') ? Number(getPropValue('maxYear', '')) : undefined}
                      // Sizing props
                      width={getPropValue('width', '') || undefined}
                      height={getPropValue('height', '') ? Number(getPropValue('height', '')) : undefined}
                      minWidth={getPropValue('minWidth', '') || undefined}
                      maxWidth={getPropValue('maxWidth', '') || undefined}
                      minHeight={getPropValue('minHeight', '') ? Number(getPropValue('minHeight', '')) : undefined}
                      maxHeight={getPropValue('maxHeight', '') ? Number(getPropValue('maxHeight', '')) : undefined}
                      // State props
                      disabled={getPropValue('disabled', false)}
                      readonly={getPropValue('readonly', false)}
                      hidden={getPropValue('hidden', false)}
                      borderless={getPropValue('borderless', false)}
                      // Validation props
                      required={getPropValue('required', false)}
                      invalid={getPropValue('invalid', false)}
                      invalidMessage={getPropValue('invalid', false) ? getPropValue('invalidMessage', 'This field is required') : undefined}
                    />,
                    <AvakioTemplate
                      type="clean"
                      borderType="clean"
                      padding={[10,0,10,0]}
                      content={<>Value: <strong>{formatDate(playgroundValue, getPropValue('showTime', false))}</strong></>}
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
                      content={<>
                        <AvakioButton 
                          size="sm"
                          label='Focus()'
                          margin={[0,10,10,0]}
                          onClick={() => {
                            datePickerRef.current?.focus();
                            addLog('focus()', 'called via ref');
                          }}
                        />
                        <AvakioButton 
                          size="sm"
                          label='Blur()'
                          margin={[0,10,10,0]}
                          onClick={() => {
                            datePickerRef.current?.blur();
                            addLog('blur()', 'called via ref');
                          }}
                        />
                         <AvakioButton 
                            size="sm"
                            label='getValue()'
                            margin={[0,10,10,0]}
                            onClick={() => {
                              const val = playgroundValue;
                              addLog('getValue()', `returned: ${val || '(empty)'}`);
                            }}
                          />                                      
                          <AvakioButton 
                            size="sm"
                            label='setValue(now)' 
                            margin={[0,10,10,0]}
                            onClick={() => {
                              datePickerRef.current?.setValue(new Date().toISOString());
                              setPlaygroundValue(new Date().toISOString());
                              addLog('setValue()', 'set to current date/time');
                            }}
                          />
                          <AvakioButton 
                            size="sm"
                            label='getText()'
                            margin={[0,10,10,0]}
                            onClick={() => {
                              const text = formatDate(playgroundValue, getPropValue('showTime', false));
                              addLog('getText()', `returned: ${text || '(empty)'}`);
                            }}
                          />                                      
                          <AvakioButton 
                            size="sm"
                            label='enable()'
                            margin={[0,10,10,0]}  
                            onClick={() => {
                              datePickerRef.current?.enable();
                              addLog('enable()', 'called via ref');
                            }}
                          />                                                      
                          <AvakioButton 
                            size="sm"
                            label='disable()'
                            margin={[0,10,10,0]}  
                            onClick={() => {
                              datePickerRef.current?.disable();
                              addLog('disable()', 'called via ref');
                            }}
                          />                                                      
                          <AvakioButton 
                            size="sm"
                            label='isEnabled()'
                            margin={[0,10,10,0]}
                            onClick={() => {
                              const enabled = datePickerRef.current?.isEnabled();
                              addLog('isEnabled()', `returned: ${enabled}`);
                            }}
                          />                                                      
                          <AvakioButton 
                            size="sm"
                            label='show()'
                            margin={[0,10,10,0]}  
                            onClick={() => {
                              datePickerRef.current?.show();
                              addLog('show()', 'called via ref');
                            }}
                          />                                                      
                          <AvakioButton 
                            size="sm"
                            label='hide()'
                            margin={[0,10,10,0]}
                            onClick={() => {
                              datePickerRef.current?.hide();
                              addLog('hide()', 'called via ref');
                            }}
                          />                                                      
                          <AvakioButton 
                            size="sm"
                            label='isVisible()'
                            margin={[0,10,10,0]}
                            onClick={() => {
                              const visible = datePickerRef.current?.isVisible();
                              addLog('isVisible()', `returned: ${visible}`);
                            }}
                          />                                                      
                          <AvakioButton 
                            size="sm"
                            label='validate()'
                            margin={[0,10,10,0]}
                            onClick={() => {
                              const result = datePickerRef.current?.validate();
                              addLog('validate()', `returned: ${result}`);
                            }}
                          />                                                      
                          <AvakioButton 
                            size="sm"
                            label='getElement()'
                            margin={[0,10,10,0]}
                            onClick={() => {
                              const el = datePickerRef.current?.getElement();
                              addLog('getElement()', `returned: ${el ? el.tagName : 'null'}`);
                            }}
                          />                                                      
                          <AvakioButton 
                            size="sm"
                            label='getParentView()'
                            margin={[0,10,10,0]}
                            onClick={() => {
                              const parent = datePickerRef.current?.getParentView();
                              addLog('getParentView()', `returned: ${parent ? parent.tagName : 'null'}`);
                            }}
                          />                                                      
                      </>

                      }
                    />                    
                  ]}
                />,
                // Column 2 - Configuration
                <AvakioLayout
                  type="clean"
                  borderless={true}
                  rows={[
                    <AvakioTemplate
                      type="clean"
                      borderType="clean"
                      padding={[0,0,10,0]}  
                      content={<strong>Configuration</strong>}
                    />,
                    <AvakioProperty
                      items={playgroundProps}
                      onChange={handlePlaygroundPropsChange}
                      dense
                      showBorders
                      maxHeight={600}
                      style={{ overflowY: 'auto' }}
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
        className="avakio-datepicker-demo-section"
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
              id="datepicker-props-table"
              data={propsData}
              columns={propsColumns}
              select={false}
              height={700}
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
              id="datepicker-methods-table"
              data={refMethodsData}
              columns={propsColumns}
              select={false}
              height={420}
            />,
          ]}
        />
      </section>
    </div>
  );
}

export default AvakioDatePickerExample;




















