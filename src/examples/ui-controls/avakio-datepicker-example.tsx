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
import { formatSizingValue } from '../../lib/utils';
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
  
  // Label Positions section state
  const [labelLeftDate, setLabelLeftDate] = useState<string>('');
  const [labelTopDate, setLabelTopDate] = useState<string>('');
  const [labelRightDate, setLabelRightDate] = useState<string>('');
  const [labelBottomDate, setLabelBottomDate] = useState<string>('');
  
  // Validation States section state
  const [requiredDate, setRequiredDate] = useState<string>('');
  const [invalidDate, setInvalidDate] = useState<string>('');
  
  // Other Options section state
  const [disabledDate, setDisabledDate] = useState<string>(new Date().toISOString());
  const [borderlessDate, setBorderlessDate] = useState<string>('');
  const [copyButtonDate, setCopyButtonDate] = useState<string>(new Date().toISOString());
  
  // Playground state
  const [playgroundValue, setPlaygroundValue] = useState<string>(new Date().toISOString());
  
  // Playground property items for AvakioProperty
  const [playgroundProps, setPlaygroundProps] = useState<AvakioPropertyItem[]>([
    // Identity Group
    { id: 'componentId', label: 'ID', type: 'text', value: 'playground-datepicker', group: 'Identity', placeholder: 'Component ID' },
    { id: 'testId', label: 'Test ID', type: 'text', value: '', group: 'Identity', placeholder: 'Test ID for testing' },
    { id: 'className', label: 'Class Name', type: 'text', value: '', group: 'Identity', placeholder: 'Additional CSS class' },
    
    // Appearance Group
    { id: 'label', label: 'Label', type: 'text', value: 'Event Date', group: 'Appearance', placeholder: 'Enter label text' },
    { id: 'labelForm', label: 'Label Form', type: 'text', value: '', group: 'Appearance', placeholder: 'Form label title' },
    { id: 'placeholder', label: 'Placeholder', type: 'text', value: 'Select a date...', group: 'Appearance', placeholder: 'Enter placeholder' },
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
    
    // Layout & Alignment Group
    {
      id: 'align',
      label: 'Align',
      type: 'select',
      value: 'left',
      group: 'Layout',
      selectOptions: [
        { id: 'left', value: 'Left' },
        { id: 'center', value: 'Center' },
        { id: 'right', value: 'Right' },
      ],
    },
    {
      id: 'inputAlign',
      label: 'Input Align',
      type: 'select',
      value: 'left',
      group: 'Layout',
      selectOptions: [
        { id: 'left', value: 'Left' },
        { id: 'right', value: 'Right' },
      ],
    },
    //{ id: 'inputWidth', label: 'Input Width', type: 'text', value: '', group: 'Layout', placeholder: 'e.g. 200' },
    //{ id: 'inputHeight', label: 'Input Height', type: 'text', value: '', group: 'Layout', placeholder: 'e.g. 38' },
    //{ id: 'compWidth', label: 'Comp Width', type: 'text', value: '', group: 'Layout', placeholder: 'e.g. 300 or auto' },
    
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
    
    // Events Group (toggles to enable event logging)
    { id: 'logOnChange', label: 'Log onChange', type: 'checkbox', value: true, group: 'Events', checkboxLabel: 'Log onChange events' },
    { id: 'logOnFocus', label: 'Log onFocus', type: 'checkbox', value: true, group: 'Events', checkboxLabel: 'Log onFocus events' },
    { id: 'logOnBlur', label: 'Log onBlur', type: 'checkbox', value: true, group: 'Events', checkboxLabel: 'Log onBlur events' },
    { id: 'logOnKeyPress', label: 'Log onKeyPress', type: 'checkbox', value: false, group: 'Events', checkboxLabel: 'Log onKeyPress events' },
    { id: 'logOnItemClick', label: 'Log onItemClick', type: 'checkbox', value: false, group: 'Events', checkboxLabel: 'Log onItemClick events' },
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
    from: string;
  }

  const propsData: PropDoc[] = [
    // Component-Specific Props
    { id: 1, name: 'showTime', type: 'boolean', defaultValue: 'false', description: 'Enable time selection (returns datetime with time)', from: 'DatePicker' },
    { id: 2, name: 'inline', type: 'boolean', defaultValue: 'false', description: 'Display calendar inline without dropdown', from: 'DatePicker' },
    { id: 3, name: 'size', type: "'default' | 'compact'", defaultValue: "'default'", description: 'Size variant - compact for filters/tables', from: 'DatePicker' },
    { id: 4, name: 'enableValueCopyButton', type: 'boolean', defaultValue: 'false', description: 'Show copy button to copy value to clipboard', from: 'DatePicker' },
    { id: 5, name: 'showYearSelector', type: 'boolean', defaultValue: 'false', description: 'Show month/year selector to quickly jump to different dates', from: 'DatePicker' },
    { id: 6, name: 'minYear', type: 'number', defaultValue: 'currentYear - 100', description: 'Minimum year available in the year selector', from: 'DatePicker' },
    { id: 7, name: 'maxYear', type: 'number', defaultValue: 'currentYear + 50', description: 'Maximum year available in the year selector', from: 'DatePicker' },
    { id: 8, name: 'labelForm', type: 'string', defaultValue: 'undefined', description: 'Form label displayed above the component', from: 'ControlLabel' },
    { id: 9, name: 'compWidth', type: 'number | string', defaultValue: "'auto'", description: 'Total width of the component (e.g., 300 or "100%")', from: 'DatePicker' },
    
    // AvakioControlledProps
    { id: 10, name: 'value', type: 'string', defaultValue: 'undefined', description: 'ISO string of selected date/time', from: 'DatePicker' },
    { id: 11, name: 'validate', type: '(value: string) => boolean | string', defaultValue: 'undefined', description: 'Custom validation function', from: 'DatePicker' },
    
    // AvakioBaseProps - Identity
    { id: 12, name: 'id', type: 'string', defaultValue: 'undefined', description: 'Component ID', from: 'Base' },
    { id: 15, name: 'testId', type: 'string', defaultValue: 'undefined', description: 'Test ID for testing purposes', from: 'Base' },
    { id: 16, name: 'className', type: 'string', defaultValue: 'undefined', description: 'Additional CSS class name', from: 'Base' },
    { id: 17, name: 'style', type: 'React.CSSProperties', defaultValue: 'undefined', description: 'Custom inline styles', from: 'Base' },
    
    // AvakioBaseProps - State
    { id: 18, name: 'disabled', type: 'boolean', defaultValue: 'false', description: 'Whether the component is disabled', from: 'Base' },
    { id: 19, name: 'hidden', type: 'boolean', defaultValue: 'false', description: 'Whether the component is hidden', from: 'Base' },
    { id: 20, name: 'readonly', type: 'boolean', defaultValue: 'false', description: 'Configures readonly mode for the input', from: 'Base' },
    { id: 21, name: 'required', type: 'boolean', defaultValue: 'false', description: 'Marks field as required', from: 'ControlLabel' },
    { id: 22, name: 'clearable', type: 'boolean', defaultValue: 'false', description: 'Whether the value can be cleared. When enabled and a value is present, displays X icon (calendar icon is hidden when value exists)', from: 'DatePicker' },
    { id: 23, name: 'borderless', type: 'boolean', defaultValue: 'false', description: 'Used to hide the component borders', from: 'Base' },
    
    // AvakioBaseProps - Validation
    { id: 24, name: 'invalid', type: 'boolean', defaultValue: 'false', description: 'Specifies whether the control is valid/invalid after validation', from: 'ControlLabel' },
    { id: 25, name: 'invalidMessage', type: 'string', defaultValue: 'undefined', description: 'Sets the text of a validation message', from: 'ControlLabel' },
    
    // AvakioBaseProps - Labels & Text
    { id: 26, name: 'placeholder', type: 'string', defaultValue: "''", description: 'Placeholder text for the input', from: 'DatePicker' },
    { id: 27, name: 'tooltip', type: 'string', defaultValue: 'undefined', description: 'Sets a popup message when cursor points to the component', from: 'Base' },
    { id: 28, name: 'label', type: 'string', defaultValue: 'undefined', description: 'Sets the text of the label', from: 'ControlLabel' },
    { id: 29, name: 'labelAlign', type: "'left' | 'right' | 'center'", defaultValue: "'left'", description: 'The alignment of a label inside its container', from: 'ControlLabel' },
    { id: 30, name: 'labelPosition', type: "'left' | 'top' | 'right' | 'bottom'", defaultValue: "'left'", description: 'Positions a label in relation to the control', from: 'ControlLabel' },
    { id: 31, name: 'labelWidth', type: 'number | string', defaultValue: '80', description: 'The width of the label', from: 'ControlLabel' },
    { id: 32, name: 'bottomLabel', type: 'string', defaultValue: 'undefined', description: 'Sets a label under the control (rendered via AvakioControlLabel)', from: 'ControlLabel' },
    { id: 33, name: 'bottomPadding', type: 'number', defaultValue: '0', description: 'Sets the bottom offset of the control input', from: 'ControlLabel' },
    
    // AvakioBaseProps - Layout & Alignment
    { id: 34, name: 'align', type: "'left' | 'center' | 'right'", defaultValue: "'left'", description: 'The alignment of the control within the parent container', from: 'Base' },
    { id: 35, name: 'inputAlign', type: "'left' | 'right'", defaultValue: "'left'", description: 'The alignment of an input inside its container', from: 'DatePicker' },
    { id: 36, name: 'inputHeight', type: 'number | string', defaultValue: 'undefined', description: 'The height of the input area', from: 'DatePicker' },
    { id: 37, name: 'inputWidth', type: 'number | string', defaultValue: 'undefined', description: 'The width of the input area', from: 'DatePicker' },
    
    // AvakioBaseProps - Sizing
    { id: 38, name: 'height', type: 'number | string', defaultValue: 'undefined', description: 'Sets the height of the component', from: 'Base' },
    { id: 39, name: 'width', type: 'number | string', defaultValue: 'undefined', description: 'Sets the width of a component', from: 'Base' },
    { id: 40, name: 'minHeight', type: 'number | string', defaultValue: 'undefined', description: 'Sets the minimal height for the view', from: 'Base' },
    { id: 41, name: 'minWidth', type: 'number | string', defaultValue: 'undefined', description: 'Sets the minimal width for the view', from: 'Base' },
    { id: 42, name: 'maxHeight', type: 'number | string', defaultValue: 'undefined', description: 'Sets the maximum height for the view', from: 'Base' },
    { id: 43, name: 'maxWidth', type: 'number | string', defaultValue: 'undefined', description: 'Sets the maximum width for the view', from: 'Base' },
    { id: 44, name: 'margin', type: 'number | string | [number, number, number, number]', defaultValue: 'undefined', description: 'Sets the margin around the component', from: 'Base' },
    { id: 45, name: 'padding', type: 'number | string | [number, number, number, number]', defaultValue: 'undefined', description: 'Sets the padding inside the component', from: 'Base' },
  ];

  const eventsData: PropDoc[] = [
    { id: 1, name: 'onChange', type: '(newValue: string, oldValue?: string) => void', defaultValue: 'undefined', description: 'Fires when the value changes', from: 'DatePicker' },
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
    { id: 7, name: 'getValue()', type: '() => string | undefined', defaultValue: '-', description: 'Returns the current value of the control', from: 'DatePicker' },
    { id: 8, name: 'setValue(value)', type: '(value: string) => void', defaultValue: '-', description: 'Sets a new value for the component', from: 'DatePicker' },
    { id: 9, name: 'getText()', type: '() => string', defaultValue: '-', description: 'Gets actual text value from the control input', from: 'DatePicker' },
    { id: 10, name: 'validate()', type: '() => boolean | string', defaultValue: '-', description: 'Validates the value of the input. Returns true if valid, false or error message if invalid', from: 'DatePicker' },
    { id: 11, name: 'isEnabled()', type: '() => boolean', defaultValue: '-', description: 'Checks whether the component is enabled', from: 'Base' },
    { id: 12, name: 'isVisible()', type: '() => boolean', defaultValue: '-', description: 'Checks whether the component is visible', from: 'Base' },
    { id: 13, name: 'getElement()', type: '() => HTMLElement | null', defaultValue: '-', description: 'Returns the root DOM element of the component', from: 'Base' },
    { id: 14, name: 'getParentView()', type: '() => HTMLElement | null', defaultValue: '-', description: 'Returns the parent view/element of the component', from: 'Base' },
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
            <AvakioDatePicker
              margin={[8, 0, 0, 0]} 
              value={basicDate}
              align='left'
              labelWidth={100}                 
              compWidth={350}
              placeholder='Select a date'
              //enableValueCopyButton              
              onChange={({ value }) => {
                setBasicDate(value);
                addLog('onChange', `value: ${value || '(empty)'}`);
              }}
              label="Select Date"
              showTime={false}
              
            />,
            <AvakioTemplate
              type="clean"
              borderType="clean"
              padding={[10,0,10,0]}
              content={<>Selected: <strong>{formatDate(basicDate)}</strong></>}
            />,             
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
            <AvakioDatePicker
              align='center'
              value={inlineDate}
              onChange={({ value }) => {
                setInlineDate(value);
                addLog('onChange (inline)', `value: ${value || '(empty)'}`);
              }}
              showTime={true}
              inline
              
              //size="compact"

              showYearSelector
            />,
            <AvakioTemplate
              type="clean"
              borderType="clean"
              align='center'
              padding={[10,0,10,0]}
              content={<>Selected: <strong>{formatDate(inlineDate)}</strong></>}
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
          content="Enable time selection with showTime={true}. The picker includes hour and minute inputs with OK/Cancel buttons."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioDatePicker
              value={timeDate}
              onChange={({ value }) => setTimeDate(value)}
              label="Date & Time"
              labelWidth={100}
              labelAlign='center'
              showTime={true}
              clearable
            />,
            <AvakioTemplate
              type="clean"
              borderType="clean"
              padding={[10,0,10,0]}
              content={<>Selected: <strong>{formatDate(timeDate)}</strong></>}
            />,            
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
            <AvakioDatePicker
                value={compactDate}
                onChange={({ value }) => setCompactDate(value)}
                showTime={false}
                padding={[8, 0, 0, 0]}
                size="compact"
                clearable
                placeholder="Select..."
                labelWidth={100}
                labelForm='Filter by date:'
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
              key="label-title"
              type="clean"
              borderType="clean"
              content={<strong>Label Positions</strong>}
            />,
            <AvakioTemplate
              key="label-left-title"
              type="clean"
              borderType="clean"
              padding={[8, 0, 8, 0]}              
              content='labelPosition="left" (default)'
            />,
            <AvakioDatePicker
              value={labelLeftDate}
              onChange={({ value }) => setLabelLeftDate(value)}
              labelAlign='center'
              label="Date"
              labelPosition="left"
              showTime={false}
            />,
            <AvakioTemplate
              key="label-top-title"
              type="clean"
              borderType="clean"
              padding={[16, 0, 8, 0]}              
              content='labelPosition="top"'
            />,
            <AvakioDatePicker
              value={labelTopDate}
              onChange={({ value }) => setLabelTopDate(value)}
              label="Date"
              labelPosition="top"
              placeholder='Select a date ...'
              labelAlign='center'
              clearable
              showTime={true}
            />,
            <AvakioTemplate
              key="label-right-title"
              type="clean"
              borderType="clean"
              padding={[16, 0, 8, 0]}              
              content='labelPosition="right"'
            />,
            <AvakioDatePicker
              value={labelRightDate}
              onChange={({ value }) => setLabelRightDate(value)}
              label="Date"
              labelPosition="right"
              placeholder='Select a date ...'
              labelAlign='center'
              clearable
              showTime={false}
            />,
            <AvakioTemplate
              key="label-bottom-title"
              type="clean"
              borderType="clean"
              padding={[16, 0, 8, 0]}              
              content='labelPosition="bottom"'
            />,
            <AvakioDatePicker
              value={labelBottomDate}
              onChange={({ value }) => setLabelBottomDate(value)}
              label="Date"
              labelPosition="bottom"
              placeholder='Select a date ...'
              labelAlign='center'
              clearable
              showTime={false}
            />,
            <AvakioTemplate
              key="labelform-left-title"
              type="clean"
              borderType="clean"
              padding={[16, 0, 8, 0]}              
              content='labelForm value & labelPosition="left" (default)'
            />,
            <AvakioDatePicker
              value={labelTopDate}
              onChange={({ value }) => setLabelTopDate(value)}                            
              placeholder='Select a date ...'              
              clearable
              showTime={false}              
              labelAlign='left'              
              labelWidth={150}
              
              labelForm='Date of birthday:'
            />,
            <AvakioTemplate
              key="labelform-top-title"
              type="clean"
              borderType="clean"
              padding={[16, 0, 8, 0]}              
              content='labelForm value & labelPosition="top"'
            />,
            <AvakioDatePicker
              value={labelTopDate}
              onChange={({ value }) => setLabelTopDate(value)}                            
              placeholder='Select a date ...'              
              clearable
              showTime={false}              
              labelPosition='top'
              labelAlign='left'              
              labelWidth={150}
              labelForm='Date of birthday:'
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
              key="other-title"
              type="clean"
              borderType="clean"
              margin={[8, 0, 8, 0]}
              style={{ fontSize: '12px'}}
              content='required=true'
            />,
            <AvakioDatePicker
              value={requiredDate}              
              onChange={({ value }) => setRequiredDate(value)}
              labelAlign='center'
              label="Birth Date"
              required
              showTime={false}
            />,
            <AvakioTemplate
              key="other-title"
              type="clean"
              borderType="clean"
              margin={[16, 0, 8, 0]}
              style={{ fontSize: '12px'}}
              content='invalid=true'
            />,
            <AvakioDatePicker
              value={invalidDate}
              onChange={({ value }) => setInvalidDate(value)}
              labelAlign='center'
              label="Due Date"
              invalid
              invalidMessage="Please select a valid date"
              showTime={false}
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
              key="other-title"
              type="clean"
              borderType="clean"
              margin={[8, 0, 8, 0]}
              style={{ fontSize: '12px'}}
              content='disabled=true'
            />,
            <AvakioDatePicker
              value={disabledDate}
              onChange={({ value }) => setDisabledDate(value)}
              label="Date"
              disabled
              labelAlign='center'
              showTime={false}
            />,
            <AvakioTemplate
              key="other-title"
              type="clean"
              borderType="clean"
              margin={[16, 0, 8, 0]}
              style={{ fontSize: '12px'}}
              content='borderless=true'
            />,
            <AvakioDatePicker
              value={borderlessDate}
              onChange={({ value }) => setBorderlessDate(value)}
              label="Date"
              labelAlign='center'
              borderless
              placeholder='Select a date...'
              showTime={false}
            />,
            <AvakioTemplate
              key="other-title"
              type="clean"
              borderType="clean"              
              margin={[16, 0, 8, 0]}
              style={{ fontSize: '12px'}}
              content='enableValueCopyButton=true'
            />,
            <AvakioDatePicker
              value={copyButtonDate}
              onChange={({ value }) => setCopyButtonDate(value)}
              labelAlign='center'
              label="Date"
              enableValueCopyButton
              clearable
              showTime={false}
            />,                            
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
          height={750}            
          rows={[ <AvakioLayout
              type="clean"
              borderless={true}
              responsive
              autoResize
              gap={16}
              height='100%'
              cols={[
                //Column 1
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
                    <AvakioDatePicker
                      id={getPropValue('componentId', 'playground-datepicker')}
                      testId={getPropValue('testId', '') || undefined}
                      className={getPropValue('className', '') || undefined}
                      ref={datePickerRef}                    
                      value={playgroundValue}
                      onChange={({ value }) => {
                        setPlaygroundValue(value);
                        if (getPropValue('logOnChange', true)) addLog('onChange', `value: ${value || '(empty)'}`);
                      }}
                      // Appearance props
                      label={getPropValue('label', '')}
                      labelForm={getPropValue('labelForm', '') || undefined}
                      placeholder={getPropValue('placeholder', '')}
                      //bottomLabel={getPropValue('bottomLabel', '')}
                      //bottomPadding={formatSizingValue(getPropValue('bottomPadding', ''))}
                      tooltip={getPropValue('tooltip', '')}
                      size={getPropValue('size', 'default') as 'default' | 'compact'}
                      labelPosition={getPropValue('labelPosition', 'left') as 'left' | 'top' | 'right' | 'bottom'}
                      labelAlign={getPropValue('labelAlign', 'left') as 'left' | 'center' | 'right'}
                      labelWidth={formatSizingValue(getPropValue('labelWidth', 100))}
                      // Layout & Alignment props
                      align={getPropValue('align', 'left') as 'left' | 'center' | 'right'}
                      inputAlign={getPropValue('inputAlign', 'left') as 'left' | 'right'}
                      inputWidth={formatSizingValue(getPropValue('inputWidth', ''))}
                      inputHeight={formatSizingValue(getPropValue('inputHeight', ''))}
                      compWidth={formatSizingValue(getPropValue('compWidth', ''))}
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
                      width={formatSizingValue(getPropValue('width', ''))}
                      height={formatSizingValue(getPropValue('height', ''))}
                      minWidth={formatSizingValue(getPropValue('minWidth', ''))}
                      maxWidth={formatSizingValue(getPropValue('maxWidth', ''))}
                      minHeight={formatSizingValue(getPropValue('minHeight', ''))}
                      maxHeight={formatSizingValue(getPropValue('maxHeight', ''))}
                      // State props
                      disabled={getPropValue('disabled', false)}
                      readonly={getPropValue('readonly', false)}
                      hidden={getPropValue('hidden', false)}
                      borderless={getPropValue('borderless', false)}
                      // Validation props
                      required={getPropValue('required', false)}
                      invalid={getPropValue('invalid', false)}
                      invalidMessage={getPropValue('invalid', false) ? getPropValue('invalidMessage', 'This field is required') : undefined}
                      // Margin & Padding
                      margin={getPropValue('margin', '') ? getPropValue('margin', '').includes(',') ? getPropValue('margin', '').split(',').map(Number) as [number, number, number, number] : Number(getPropValue('margin', '')) : undefined}
                      padding={getPropValue('padding', '') ? getPropValue('padding', '').includes(',') ? getPropValue('padding', '').split(',').map(Number) as [number, number, number, number] : Number(getPropValue('padding', '')) : undefined}
                      // Event handlers
                      onFocus={(e) => {
                        if (getPropValue('logOnFocus', true)) addLog('onFocus', 'component received focus');
                      }}
                      onBlur={(e) => {
                        if (getPropValue('logOnBlur', true)) addLog('onBlur', 'component lost focus');
                      }}
                      onKeyPress={(e) => {
                        if (getPropValue('logOnKeyPress', false)) addLog('onKeyPress', `key: ${e.key}`);
                      }}
                      onItemClick={(e) => {
                        if (getPropValue('logOnItemClick', false)) addLog('onItemClick', 'item clicked');
                      }}
                    />,
                    <AvakioTemplate
                      type="clean"
                      borderType="clean"
                      padding={[10,0,10,0]}
                      content={<span>Value: <strong>{formatDate(playgroundValue, getPropValue('showTime', false))}</strong></span>}
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
                            datePickerRef.current?.focus();
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
                            datePickerRef.current?.blur();
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
                            label='setValue(now)' 
                            labelAlign='center'
                            width='200px'
                            buttonWidth='150px'
                            margin={[0,10,10,0]}
                            onClick={() => {
                              datePickerRef.current?.setValue(new Date().toISOString());
                              setPlaygroundValue(new Date().toISOString());
                              addLog('setValue()', 'set to current date/time');
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
                              const text = formatDate(playgroundValue, getPropValue('showTime', false));
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
                              datePickerRef.current?.enable();
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
                              datePickerRef.current?.disable();
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
                              const enabled = datePickerRef.current?.isEnabled();
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
                              datePickerRef.current?.show();
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
                              datePickerRef.current?.hide();
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
                              const visible = datePickerRef.current?.isVisible();
                              addLog('isVisible()', `returned: ${visible}`);
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
                              const result = datePickerRef.current?.validate();
                              addLog('validate()', `returned: ${result}`);
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
                              const el = datePickerRef.current?.getElement();
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
                              const parent = datePickerRef.current?.getParentView();
                              //addLog('getParentView()', `returned: ${parent ? parent.tagName : 'null'}`);
                            }}
                          />                                                      
                          <AvakioButton 
                            size="sm"
                            labelAlign='center'
                            width='200px'
                            buttonWidth='150px'
                            label='define(label)'
                            margin={[0,10,10,0]}
                            onClick={() => {
                              datePickerRef.current?.define('label', 'Updated Label');
                              // Update playground state to sync with the change
                              setPlaygroundProps(prev => prev.map(p => 
                                p.id === 'label' ? { ...p, value: 'Updated Label' } : p
                              ));
                              addLog('define()', 'set label to "Updated Label"');
                            }}
                          />                                                      
                          <AvakioButton 
                            size="sm"
                            labelAlign='center'
                            width='200px'
                            buttonWidth='150px'
                            label='define(config)'
                            margin={[0,10,10,0]}
                            onClick={() => {
                              datePickerRef.current?.define({ placeholder: 'New placeholder...', clearable: true });
                              // Update playground state to sync with the changes
                              setPlaygroundProps(prev => prev.map(p => {
                                if (p.id === 'placeholder') return { ...p, value: 'New placeholder...' };
                                if (p.id === 'clearable') return { ...p, value: true };
                                return p;
                              }));
                              addLog('define()', 'set { placeholder: "New placeholder...", clearable: true }');
                            }}
                          />                                                      
                      </>

                      }
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
                                  { id: 'componentId', label: 'ID', type: 'text', value: 'playground-datepicker', group: 'Identity', placeholder: 'Component ID' },
                                  { id: 'testId', label: 'Test ID', type: 'text', value: '', group: 'Identity', placeholder: 'Test ID for testing' },
                                  { id: 'className', label: 'Class Name', type: 'text', value: '', group: 'Identity', placeholder: 'Additional CSS class' },
                                  // Appearance Group
                                  { id: 'label', label: 'Label', type: 'text', value: 'Event Date', group: 'Appearance', placeholder: 'Enter label text' },
                                  { id: 'labelForm', label: 'Label Form', type: 'text', value: '', group: 'Appearance', placeholder: 'Form label title' },
                                  { id: 'placeholder', label: 'Placeholder', type: 'text', value: 'Select a date...', group: 'Appearance', placeholder: 'Enter placeholder' },
                                  { id: 'bottomLabel', label: 'Bottom Label', type: 'text', value: '', group: 'Appearance', placeholder: 'Helper text' },
                                  { id: 'bottomPadding', label: 'Bottom Padding', type: 'number', value: '', group: 'Appearance', placeholder: 'e.g. 8' },
                                  { id: 'tooltip', label: 'Tooltip', type: 'text', value: '', group: 'Appearance', placeholder: 'Tooltip text' },
                                  { id: 'invalidMessage', label: 'Error Message', type: 'text', value: 'This field is required', group: 'Appearance', placeholder: 'Error message' },
                                  { id: 'size', label: 'Size', type: 'select', value: 'default', group: 'Appearance', selectOptions: [{ id: 'default', value: 'Default' }, { id: 'compact', value: 'Compact' }] },
                                  { id: 'labelPosition', label: 'Label Position', type: 'select', value: 'left', group: 'Appearance', selectOptions: [{ id: 'left', value: 'Left' }, { id: 'top', value: 'Top' }] },
                                  { id: 'labelAlign', label: 'Label Align', type: 'select', value: 'left', group: 'Appearance', selectOptions: [{ id: 'left', value: 'Left' }, { id: 'center', value: 'Center' }, { id: 'right', value: 'Right' }] },
                                  { id: 'labelWidth', label: 'Label Width', type: 'number', value: 100, group: 'Appearance', placeholder: 'e.g. 100' },
                                  // Layout & Alignment Group
                                  { id: 'align', label: 'Align', type: 'select', value: 'left', group: 'Layout', selectOptions: [{ id: 'left', value: 'Left' }, { id: 'center', value: 'Center' }, { id: 'right', value: 'Right' }] },
                                  { id: 'inputAlign', label: 'Input Align', type: 'select', value: 'left', group: 'Layout', selectOptions: [{ id: 'left', value: 'Left' }, { id: 'right', value: 'Right' }] },
                                  { id: 'inputWidth', label: 'Input Width', type: 'text', value: '', group: 'Layout', placeholder: 'e.g. 200' },
                                  { id: 'inputHeight', label: 'Input Height', type: 'text', value: '', group: 'Layout', placeholder: 'e.g. 38' },
                                  { id: 'compWidth', label: 'Comp Width', type: 'text', value: '', group: 'Layout', placeholder: 'e.g. 300 or auto' },
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
                                  { id: 'logOnKeyPress', label: 'Log onKeyPress', type: 'checkbox', value: false, group: 'Events', checkboxLabel: 'Log onKeyPress events' },
                                  { id: 'logOnItemClick', label: 'Log onItemClick', type: 'checkbox', value: false, group: 'Events', checkboxLabel: 'Log onItemClick events' },
                                ]);
                                setPlaygroundValue(new Date().toISOString());
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
              id="datepicker-events-table"
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
              id="datepicker-methods-table"
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

export default AvakioDatePickerExample;




















