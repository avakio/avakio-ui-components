import React, { useState, useRef, useMemo } from 'react';
import { AvakioDateRangePicker, AvakioDateRange } from '../../components/avakio/ui-controls/avakio-daterangepicker/avakio-daterangepicker';
import { AvakioBaseRef } from '../../components/avakio/base/avakio-base-props';
import { AvakioTemplate } from '../../components/avakio/views/avakio-template/avakio-template';
import { AvakioLayout } from '../../components/avakio/layouts/avakio-layout/avakio-layout';
import { AvakioTabBar } from '../../components/avakio/ui-controls/avakio-tabbar/avakio-tabbar';
import { AvakioViewHeader } from '../../components/avakio/ui-widgets/avakio-view-header/avakio-view-header';
import { AvakioProperty, AvakioPropertyItem } from '../../components/avakio/data-presentation/avakio-property/avakio-property';
import { AvakioDataTable } from '../../components/avakio/data-presentation/avakio-datatable/AvakioDataTable';
import type { AvakioColumn } from '../../components/avakio/data-presentation/avakio-datatable/AvakioDataTable';
import { AvakioButton } from '../../components/avakio/ui-controls/avakio-button/avakio-button';
import { addEventLog } from '../../services/event-log-service';
import { 
  CalendarRange, 
  Settings2, 
  Play, 
  Book,
  Clock,
} from 'lucide-react';
import './avakio-daterangepicker-example.css';

// Tab options for navigation
const TAB_OPTIONS = [
  { id: 'basic', label: 'Basic Usage', icon: <CalendarRange size={14} /> },
  { id: 'options', label: 'Options', icon: <Settings2 size={14} /> },
  { id: 'playground', label: 'Interactive Playground', icon: <Play size={14} /> },
  { id: 'docs', label: 'Documentation', icon: <Book size={14} /> },
];

// Helper to format date range for display
function formatDisplay(range: AvakioDateRange, includeTime = false) {
  if (!range.start && !range.end) return 'No range selected';
  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return '—';
    const date = new Date(dateStr);
    if (includeTime) {
      return date.toLocaleString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    }
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };
  return `${formatDate(range.start)} → ${formatDate(range.end)}`;
}

export function AvakioDateRangePickerExample({ theme = 'material' }: { theme?: string }) {
  const [activeSection, setActiveSection] = useState<string | number | null>('basic');

  // Section refs for scroll navigation
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  // Demo state values
  const [basicRange, setBasicRange] = useState<AvakioDateRange>({ start: null, end: null });
  const [timeRange, setTimeRange] = useState<AvakioDateRange>({ start: null, end: null });
  const [compactRange, setCompactRange] = useState<AvakioDateRange>({ start: null, end: null });

  // Label Positions section state
  const [labelLeftRange, setLabelLeftRange] = useState<AvakioDateRange>({ start: null, end: null });
  const [labelTopRange, setLabelTopRange] = useState<AvakioDateRange>({ start: null, end: null });
  const [labelRightRange, setLabelRightRange] = useState<AvakioDateRange>({ start: null, end: null });
  const [labelBottomRange, setLabelBottomRange] = useState<AvakioDateRange>({ start: null, end: null });

  // Validation States section state
  const [requiredRange, setRequiredRange] = useState<AvakioDateRange>({ start: null, end: null });
  const [invalidRange, setInvalidRange] = useState<AvakioDateRange>({ start: null, end: null });

  // Other Options section state
  const [disabledRange, setDisabledRange] = useState<AvakioDateRange>({ 
    start: new Date().toISOString(), 
    end: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() 
  });
  const [borderlessRange, setBorderlessRange] = useState<AvakioDateRange>({ start: null, end: null });

  // Playground state
  const [playgroundValue, setPlaygroundValue] = useState<AvakioDateRange>({ 
    start: new Date().toISOString(),
    end: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
  });

  // Playground property items for AvakioProperty
  const [playgroundProps, setPlaygroundProps] = useState<AvakioPropertyItem[]>([
    // Identity Group
    { id: 'componentId', label: 'ID', type: 'text', value: 'playground-daterangepicker', group: 'Identity', placeholder: 'Component ID' },
    { id: 'testId', label: 'Test ID', type: 'text', value: '', group: 'Identity', placeholder: 'Test ID for testing' },
    { id: 'className', label: 'Class Name', type: 'text', value: '', group: 'Identity', placeholder: 'Additional CSS class' },

    // Appearance Group
    { id: 'label', label: 'Label', type: 'text', value: 'Date Range', group: 'Appearance', placeholder: 'Enter label text' },
    { id: 'labelForm', label: 'Label Form', type: 'text', value: '', group: 'Appearance', placeholder: 'Form label title' },
    { id: 'placeholder', label: 'Placeholder', type: 'text', value: 'Select date range...', group: 'Appearance', placeholder: 'Enter placeholder' },
    { id: 'bottomLabel', label: 'Bottom Label', type: 'text', value: '', group: 'Appearance', placeholder: 'Helper text' },
    { id: 'bottomPadding', label: 'Bottom Padding', type: 'number', value: '', group: 'Appearance', placeholder: 'e.g. 8' },
    { id: 'tooltip', label: 'Tooltip', type: 'text', value: '', group: 'Appearance', placeholder: 'Tooltip text' },
    { id: 'invalidMessage', label: 'Error Message', type: 'text', value: 'This field is required', group: 'Appearance', placeholder: 'Error message' },
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
    { id: 'labelWidth', label: 'Label Width', type: 'number', value: 100, group: 'Appearance', placeholder: 'e.g. 100' },

    // Features Group
    { id: 'showTime', label: 'Show Time', type: 'checkbox', value: false, group: 'Features', checkboxLabel: 'Enable time selection' },
    { id: 'allowSingleDay', label: 'Allow Single Day', type: 'checkbox', value: true, group: 'Features', checkboxLabel: 'Allow same start and end date' },
    { id: 'clearable', label: 'Clearable', type: 'checkbox', value: true, group: 'Features', checkboxLabel: 'Show clear button' },

    // Sizing Group
    { id: 'width', label: 'Width', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 300 or 100%' },
    { id: 'height', label: 'Height', type: 'number', value: '', group: 'Sizing', placeholder: 'e.g. 38' },
    { id: 'minWidth', label: 'Min Width', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 200' },
    { id: 'maxWidth', label: 'Max Width', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 500' },
    { id: 'margin', label: 'Margin', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 8 or 8,16,8,16' },
    { id: 'padding', label: 'Padding', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 8 or 8,16,8,16' },

    // State Group
    { id: 'disabled', label: 'Disabled', type: 'checkbox', value: false, group: 'State', checkboxLabel: 'Disable the component' },
    { id: 'readonly', label: 'Read Only', type: 'checkbox', value: false, group: 'State', checkboxLabel: 'Make input read-only' },
    { id: 'hidden', label: 'Hidden', type: 'checkbox', value: false, group: 'State', checkboxLabel: 'Hide the component' },
    { id: 'borderless', label: 'Borderless', type: 'checkbox', value: false, group: 'State', checkboxLabel: 'Remove border' },

    // Validation Group
    { id: 'required', label: 'Required', type: 'checkbox', value: false, group: 'Validation', checkboxLabel: 'Mark as required field' },
    { id: 'invalid', label: 'Invalid', type: 'checkbox', value: false, group: 'Validation', checkboxLabel: 'Show invalid/error state' },

    // Events Group
    { id: 'logOnChange', label: 'Log onChange', type: 'checkbox', value: true, group: 'Events', checkboxLabel: 'Log onChange events' },
    { id: 'logOnFocus', label: 'Log onFocus', type: 'checkbox', value: true, group: 'Events', checkboxLabel: 'Log onFocus events' },
    { id: 'logOnBlur', label: 'Log onBlur', type: 'checkbox', value: true, group: 'Events', checkboxLabel: 'Log onBlur events' },
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
  const dateRangePickerRef = useRef<AvakioBaseRef<AvakioDateRange>>(null);
  const [eventLog, setEventLog] = useState<string[]>([]);

  // Add to local event log and global event log
  const addLog = (action: string, details: string = '') => {
    setEventLog(prev => [...prev.slice(-4), `${new Date().toLocaleTimeString()} - ${action}${details ? ': ' + details : ''}`]);
    addEventLog('DateRangePicker', action, details);
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

  // Custom presets
  const presets = useMemo(
    () => [
      {
        label: 'Today',
        range: () => {
          const today = new Date();
          const iso = today.toISOString();
          return { start: iso, end: iso };
        },
      },
      {
        label: 'Last 7 days',
        range: () => {
          const end = new Date();
          const start = new Date();
          start.setDate(end.getDate() - 6);
          return { start: start.toISOString(), end: end.toISOString() };
        },
      },
      {
        label: 'This Month',
        range: () => {
          const now = new Date();
          const start = new Date(now.getFullYear(), now.getMonth(), 1);
          const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
          return { start: start.toISOString(), end: end.toISOString() };
        },
      },
      {
        label: 'Clear',
        range: () => ({ start: null, end: null }),
      },
    ],
    []
  );

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
    { id: 1, name: 'showTime', type: 'boolean', defaultValue: 'false', description: 'Enable time selection (returns datetime with time)', from: 'DateRangePicker' },
    { id: 2, name: 'allowSingleDay', type: 'boolean', defaultValue: 'true', description: 'Allow selecting same start and end date', from: 'DateRangePicker' },
    { id: 3, name: 'presets', type: 'PresetRange[]', defaultValue: 'undefined', description: 'Array of quick selection presets', from: 'DateRangePicker' },
    { id: 4, name: 'size', type: "'default' | 'compact'", defaultValue: "'default'", description: 'Size variant - compact for filters/tables', from: 'DateRangePicker' },
    { id: 5, name: 'labelForm', type: 'string', defaultValue: 'undefined', description: 'Form label displayed above the component', from: 'ControlLabel' },
    { id: 6, name: 'compWidth', type: 'number | string', defaultValue: "'auto'", description: 'Total width of the component', from: 'DateRangePicker' },

    // AvakioControlledProps
    { id: 7, name: 'value', type: 'AvakioDateRange', defaultValue: 'undefined', description: 'Object with start and end date strings', from: 'DateRangePicker' },
    { id: 8, name: 'defaultValue', type: 'AvakioDateRange', defaultValue: 'undefined', description: 'Default value for uncontrolled mode', from: 'DateRangePicker' },

    // AvakioBaseProps - Identity
    { id: 9, name: 'id', type: 'string', defaultValue: 'undefined', description: 'Component ID', from: 'Base' },
    { id: 10, name: 'testId', type: 'string', defaultValue: 'undefined', description: 'Test ID for testing purposes', from: 'Base' },
    { id: 11, name: 'className', type: 'string', defaultValue: 'undefined', description: 'Additional CSS class name', from: 'Base' },
    { id: 12, name: 'style', type: 'React.CSSProperties', defaultValue: 'undefined', description: 'Custom inline styles', from: 'Base' },

    // AvakioBaseProps - State
    { id: 13, name: 'disabled', type: 'boolean', defaultValue: 'false', description: 'Whether the component is disabled', from: 'Base' },
    { id: 14, name: 'hidden', type: 'boolean', defaultValue: 'false', description: 'Whether the component is hidden', from: 'Base' },
    { id: 15, name: 'readonly', type: 'boolean', defaultValue: 'false', description: 'Configures readonly mode for the input', from: 'Base' },
    { id: 16, name: 'required', type: 'boolean', defaultValue: 'false', description: 'Marks field as required', from: 'ControlLabel' },
    { id: 17, name: 'clearable', type: 'boolean', defaultValue: 'false', description: 'Whether the value can be cleared', from: 'DateRangePicker' },
    { id: 18, name: 'borderless', type: 'boolean', defaultValue: 'false', description: 'Used to hide the component borders', from: 'Base' },

    // AvakioBaseProps - Labels & Text
    { id: 19, name: 'label', type: 'string', defaultValue: 'undefined', description: 'Sets the text of the label', from: 'ControlLabel' },
    { id: 20, name: 'labelAlign', type: "'left' | 'right' | 'center'", defaultValue: "'left'", description: 'The alignment of a label inside its container', from: 'ControlLabel' },
    { id: 21, name: 'labelPosition', type: "'left' | 'top' | 'right' | 'bottom'", defaultValue: "'left'", description: 'Positions a label in relation to the control', from: 'ControlLabel' },
    { id: 22, name: 'labelWidth', type: 'number | string', defaultValue: '80', description: 'The width of the label', from: 'ControlLabel' },
    { id: 23, name: 'placeholder', type: 'string', defaultValue: "'Select date range...'", description: 'Placeholder text for the input', from: 'DateRangePicker' },
    { id: 24, name: 'tooltip', type: 'string', defaultValue: 'undefined', description: 'Sets a popup message when cursor points to the component', from: 'Base' },
    { id: 25, name: 'bottomLabel', type: 'string', defaultValue: 'undefined', description: 'Sets a label under the control', from: 'ControlLabel' },
    { id: 26, name: 'bottomPadding', type: 'number', defaultValue: '0', description: 'Sets the bottom offset of the control input', from: 'ControlLabel' },

    // Validation
    { id: 27, name: 'invalid', type: 'boolean', defaultValue: 'false', description: 'Specifies whether the control is invalid', from: 'ControlLabel' },
    { id: 28, name: 'invalidMessage', type: 'string', defaultValue: 'undefined', description: 'Sets the text of a validation message', from: 'ControlLabel' },

    // Sizing
    { id: 29, name: 'width', type: 'number | string', defaultValue: 'undefined', description: 'Sets the width of a component', from: 'Base' },
    { id: 30, name: 'height', type: 'number | string', defaultValue: 'undefined', description: 'Sets the height of the component', from: 'Base' },
    { id: 31, name: 'minWidth', type: 'number | string', defaultValue: 'undefined', description: 'Sets the minimal width for the view', from: 'Base' },
    { id: 32, name: 'maxWidth', type: 'number | string', defaultValue: 'undefined', description: 'Sets the maximum width for the view', from: 'Base' },
    { id: 33, name: 'margin', type: 'number | string | [number, number, number, number]', defaultValue: 'undefined', description: 'Sets the margin around the component', from: 'Base' },
    { id: 34, name: 'padding', type: 'number | string | [number, number, number, number]', defaultValue: 'undefined', description: 'Sets the padding inside the component', from: 'Base' },
  ];

  const eventsData: PropDoc[] = [
    { id: 1, name: 'onChange', type: '(event: AvakioChangeEvent<AvakioDateRange>) => void', defaultValue: 'undefined', description: 'Fires when the value changes', from: 'DateRangePicker' },
    { id: 2, name: 'onBlur', type: '(event: React.FocusEvent) => void', defaultValue: 'undefined', description: 'Fires when focus is moved out of the view', from: 'Base' },
    { id: 3, name: 'onFocus', type: '(event: React.FocusEvent) => void', defaultValue: 'undefined', description: 'Fires when a view gets focus', from: 'Base' },
    { id: 4, name: 'onItemClick', type: '(event: React.MouseEvent) => void', defaultValue: 'undefined', description: 'Fires after the control has been clicked', from: 'Base' },
    { id: 5, name: 'onKeyPress', type: '(event: React.KeyboardEvent) => void', defaultValue: 'undefined', description: 'Occurs when keyboard key is pressed', from: 'Base' },
  ];

  const propsColumns: AvakioColumn<PropDoc>[] = [
    { id: 'name', header: 'Property', width: 180 },
    { id: 'type', header: 'Type', width: 280 },
    { id: 'defaultValue', header: 'Default', width: 100 },
    { id: 'from', header: 'From', width: 100, filterType: 'combo' },
    { id: 'description', header: 'Description', width: 320 },
  ];

  return (
    <div className="avakio-drp-demo-container">
      {/* Sticky Header + Tab Navigation */}
      <div className="avakio-example-sticky-header">
        {/* Header */}
        <AvakioViewHeader
          label="UI Controls"
          title="DateRangePicker"
          subTitle="A date range picker component with dual calendars, quick presets, optional time selection, and full theme support."
          isSticky={false}
        />

        {/* Tab Navigation */}
        <div className="avakio-example-tabbar-container">
          <AvakioTabBar
            id="drp-demo-tabs"
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
        className="avakio-drp-demo-section"
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
          content="The DateRangePicker displays a trigger input that opens a popover with two calendars for selecting a date range."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioDateRangePicker
              key="basic-drp"
              margin={[8, 0, 0, 0]}
              value={basicRange}
              label="Select Range"
              labelWidth={100}
              compWidth={450}
              placeholder="Select a date range"
              clearable
              onChange={({ value }) => {
                setBasicRange(value);
                addLog('onChange', formatDisplay(value));
              }}
            />,
            <AvakioTemplate
              key="basic-result"
              type="clean"
              borderType="clean"
              padding={[10, 0, 10, 0]}
              content={<>Selected: <strong>{formatDisplay(basicRange)}</strong></>}
            />,
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
          content="Enable time selection with showTime={true}. Each calendar includes hour and minute inputs."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioDateRangePicker
              key="time-drp"
              value={timeRange}
              label="Date & Time"
              labelWidth={100}
              showTime={true}
              clearable
              onChange={({ value }) => {
                setTimeRange(value);
                addLog('onChange (time)', formatDisplay(value, true));
              }}
            />,
            <AvakioTemplate
              key="time-result"
              type="clean"
              borderType="clean"
              padding={[10, 0, 10, 0]}
              content={<>Selected: <strong>{formatDisplay(timeRange, true)}</strong></>}
            />,
          ]}
        />

        {/* Compact Mode */}
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[16, 0, 0, 16]}
          content={<strong>Compact Mode</strong>}
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="Use size='compact' for a smaller version suitable for filters and tables."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioDateRangePicker
              key="compact-drp"
              value={compactRange}
              label="Filter"
              labelWidth={60}
              size="compact"
              clearable
              onChange={({ value }) => {
                setCompactRange(value);
                addLog('onChange (compact)', formatDisplay(value));
              }}
            />,
            <AvakioTemplate
              key="compact-result"
              type="clean"
              borderType="clean"
              padding={[10, 0, 10, 0]}
              content={<>Selected: <strong>{formatDisplay(compactRange)}</strong></>}
            />,
          ]}
        />
      </section>

      {/* Options Section */}
      <section
        ref={(el) => { sectionRefs.current['options'] = el; }}
        className="avakio-drp-demo-section"
      >
        <AvakioTemplate
          type="section"
          borderType="clean"
          content="Options"
        />

        {/* Label Positions */}
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[16, 0, 0, 16]}
          content={<strong>Label Positions</strong>}
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="Control label position using labelPosition prop: left, top, right, or bottom."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          cols={[
            <AvakioDateRangePicker
              key="label-left"
              value={labelLeftRange}
              onChange={({ value }) => setLabelLeftRange(value)}
              label="Left Label"
              labelPosition="left"
              labelWidth={100}
              padding={[10,10,10,10]}
            />,
            <AvakioDateRangePicker
              key="label-top"
              padding={[10,10,10,10]}
              value={labelTopRange}
              onChange={({ value }) => setLabelTopRange(value)}
              label="Top Label"
              labelPosition="top"
              labelWidth={100}
            />,
          ]}
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          cols={[
            <AvakioDateRangePicker
              key="label-right"
              value={labelRightRange}
              onChange={({ value }) => setLabelRightRange(value)}
              label="Right Label"
              labelPosition="right"
              padding={[10,10,10,10]}
              labelWidth={100}
            />,
            <AvakioDateRangePicker
              key="label-bottom"
              value={labelBottomRange}
              onChange={({ value }) => setLabelBottomRange(value)}
              label="Bottom Label"
              labelPosition="bottom"
              labelWidth={100}
              padding={[10,10,10,10]}
            />,
          ]}
        />

        {/* Validation States */}
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[16, 0, 0, 16]}
          content={<strong>Validation States</strong>}
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="Mark fields as required or show validation errors with invalid and invalidMessage props."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          cols={[
            <AvakioDateRangePicker
              key="required"
              value={requiredRange}
              onChange={({ value }) => setRequiredRange(value)}
              label="Required"
              labelWidth={100}
              padding={[10,10,10,10]}
              required
              clearable
            />,
            <AvakioDateRangePicker
              key="invalid"
              value={invalidRange}
              onChange={({ value }) => setInvalidRange(value)}
              label="Invalid"
              labelWidth={100}
              padding={[10,10,10,10]} 
              invalid
              invalidMessage="Please select a valid date range"
              clearable
            />,
          ]}
        />

        {/* Other Options */}
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[16, 0, 0, 16]}
          content={<strong>Other Options</strong>}
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          cols={[
            <AvakioDateRangePicker
              key="disabled"
              value={disabledRange}
              onChange={({ value }) => setDisabledRange(value)}
              label="Disabled"
              labelWidth={100}
              padding={[10,10,10,10]}
              disabled
            />,
            <AvakioDateRangePicker
              key="borderless"
              value={borderlessRange}
              onChange={({ value }) => setBorderlessRange(value)}
              label="Borderless"
              labelWidth={100}
              padding={[10,10,10,10]}
              borderless
            />,
          ]}
        />
      </section>

      {/* Interactive Playground Section */}
      <section
        ref={(el) => { sectionRefs.current['playground'] = el; }}
        className="avakio-drp-demo-section"
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
          content="Experiment with different DateRangePicker configurations in real-time. Change any property below to see the effect on the preview."
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
                    <AvakioDateRangePicker
                      key="playground-drp"
                      ref={dateRangePickerRef}
                      id={getPropValue('componentId', 'playground-daterangepicker')}
                      testId={getPropValue('testId', '')}
                      className={getPropValue('className', '')}
                      value={playgroundValue}
                      onChange={({ value }) => {
                        setPlaygroundValue(value);
                        if (getPropValue('logOnChange', true)) {
                          addLog('onChange', formatDisplay(value, getPropValue('showTime', false)));
                        }
                      }}
                      onFocus={(e) => {
                        if (getPropValue('logOnFocus', true)) {
                          addLog('onFocus', 'Input focused');
                        }
                      }}
                      onBlur={(e) => {
                        if (getPropValue('logOnBlur', true)) {
                          addLog('onBlur', 'Input blurred');
                        }
                      }}
                      label={getPropValue('label', 'Date Range')}
                      labelForm={getPropValue('labelForm', '')}
                      labelPosition={getPropValue('labelPosition', 'left') as 'left' | 'top' | 'right' | 'bottom'}
                      labelAlign={getPropValue('labelAlign', 'left') as 'left' | 'center' | 'right'}
                      labelWidth={getPropValue('labelWidth', 100)}
                      placeholder={getPropValue('placeholder', 'Select date range...')}
                      bottomLabel={getPropValue('bottomLabel', '')}
                      bottomPadding={getPropValue('bottomPadding', 0)}
                      tooltip={getPropValue('tooltip', '')}
                      size={getPropValue('size', 'default') as 'default' | 'compact'}
                      showTime={getPropValue('showTime', false)}
                      allowSingleDay={getPropValue('allowSingleDay', true)}
                      clearable={getPropValue('clearable', true)}
                      disabled={getPropValue('disabled', false)}
                      readonly={getPropValue('readonly', false)}
                      hidden={getPropValue('hidden', false)}
                      borderless={getPropValue('borderless', false)}
                      required={getPropValue('required', false)}
                      invalid={getPropValue('invalid', false)}
                      invalidMessage={getPropValue('invalidMessage', 'This field is required')}
                      presets={presets}
                    />,
                    <AvakioTemplate
                      type="clean"
                      borderType="clean"
                      padding={[10,0,10,0]}
                      content={<span>Selected: <strong>{formatDisplay(playgroundValue, getPropValue('showTime', false))}</strong></span>}
                    />,
                    <AvakioTemplate
                      type="clean"
                      borderType="clean"
                      padding={[10,0,10,0]}
                      content={<strong>Ref Methods</strong>}
                    />,
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
                            dateRangePickerRef.current?.focus();
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
                            dateRangePickerRef.current?.blur();
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
                            addLog('getValue()', `start: ${val.start}, end: ${val.end}`);
                          }}
                        />
                        <AvakioButton
                          size="sm"
                          label='setValue(range)'
                          labelAlign='center'
                          width='200px'
                          buttonWidth='150px'
                          margin={[0,10,10,0]}
                          onClick={() => {
                            const newRange = {
                              start: new Date().toISOString(),
                              end: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
                            };
                            dateRangePickerRef.current?.setValue(newRange);
                            setPlaygroundValue(newRange);
                            addLog('setValue()', 'set to current date + 7 days');
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
                            const text = formatDisplay(playgroundValue, getPropValue('showTime', false));
                            addLog('getText()', `returned: ${text}`);
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
                            dateRangePickerRef.current?.enable();
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
                            dateRangePickerRef.current?.disable();
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
                            const enabled = dateRangePickerRef.current?.isEnabled();
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
                            dateRangePickerRef.current?.show();
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
                            dateRangePickerRef.current?.hide();
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
                            const visible = dateRangePickerRef.current?.isVisible();
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
                            const el = dateRangePickerRef.current?.getElement();
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
                            const parent = dateRangePickerRef.current?.getParentView();
                            addLog('getParentView()', `returned: ${parent || 'null'}`);
                          }}
                        />
                      </>}
                    />,
                  ]}
                />,
                // Column 2 - Configuration
                <AvakioLayout
                  type="clean"
                  borderless={true}
                  height='100%'
                  rows={[
                    <AvakioTemplate
                      type="clean"
                      borderType="clean"
                      padding={[0,0,10,0]}
                      content={<strong>Configuration</strong>}
                    />,
                    <AvakioProperty
                      key="playground-props"
                      items={playgroundProps}
                      onChange={handlePlaygroundPropsChange}
                      size='compact'
                      labelWidth={120}
                      height='calc(100% - 40px)'
                    />,
                  ]}
                />,
              ]}
            />
          ]}
        />
      </section>

      {/* Documentation Section */}
      <section
        ref={(el) => { sectionRefs.current['docs'] = el; }}
        className="avakio-drp-demo-section"
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
          content={<strong>Properties</strong>}
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          rows={[
            <AvakioDataTable
              key="props-table"
              data={propsData}
              columns={propsColumns}
              filterable
              sortable
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
          rows={[
            <AvakioDataTable
              key="events-table"
              data={eventsData}
              columns={propsColumns}
              showRowNum
            />,
          ]}
        />

        {/* Type Definitions */}
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[16, 0, 0, 16]}
          content={<strong>Type Definitions</strong>}
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <pre key="types-code" className="avakio-drp-code">{`// Type definitions
interface AvakioDateRange {
  start: string | null;  // ISO date string
  end: string | null;    // ISO date string
}

interface PresetRange {
  label: string;
  range: () => AvakioDateRange;
}

// Usage example
import { AvakioDateRangePicker, AvakioDateRange } from 'avakio-ui';

function MyComponent() {
  const [range, setRange] = useState<AvakioDateRange>({ 
    start: null, 
    end: null 
  });

  return (
    <AvakioDateRangePicker
      value={range}
      onChange={({ value }) => setRange(value)}
      label="Select Range"
      showTime={false}
      clearable
    />
  );
}`}</pre>,
          ]}
        />
      </section>
    </div>
  );
}

export default AvakioDateRangePickerExample;



















