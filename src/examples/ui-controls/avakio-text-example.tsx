import React, { useState, useRef } from 'react';
import { AvakioText, AvakioTextRef } from '../../components/avakio/ui-controls/avakio-text/avakio-text';
import { AvakioTemplate } from '../../components/avakio/views/avakio-template/avakio-template';
import { AvakioLayout } from '../../components/avakio/layouts/avakio-layout/avakio-layout';
import { AvakioTabBar } from '../../components/avakio/ui-controls/avakio-tabbar/avakio-tabbar';
import { AvakioViewHeader } from '../../components/avakio/ui-widgets/avakio-view-header/avakio-view-header';
import { AvakioProperty, AvakioPropertyItem, AvakioPropertyRef } from '../../components/avakio/data-presentation/avakio-property/avakio-property';
import { AvakioDataTable, AvakioColumn } from '../../components/avakio/data-presentation/avakio-datatable/AvakioDataTable';
import { AvakioButton } from '../../components/avakio/ui-controls/avakio-button/avakio-button';
import { addEventLog } from '../../services/event-log-service';
import { formatSizingValue } from '../../lib/utils';
import { Type, Settings2, Play, Book, Mail, User, Lock, Search } from 'lucide-react';

// Tab options for navigation
const TAB_OPTIONS = [
  { id: 'basic', label: 'Basic Usage', icon: <Type size={14} /> },
  { id: 'options', label: 'Options', icon: <Settings2 size={14} /> },
  { id: 'playground', label: 'Interactive Playground', icon: <Play size={14} /> },
  { id: 'docs', label: 'Documentation', icon: <Book size={14} /> },
];

export function AvakioTextExample() {
  const [activeSection, setActiveSection] = useState<string | number | null>('basic');
  
  // Section refs for scroll navigation
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  
  // Demo state values
  const [basicName, setBasicName] = useState<string>('');
  const [basicEmail, setBasicEmail] = useState<string>('');
  const [basicPassword, setBasicPassword] = useState<string>('');
  const [searchValue, setSearchValue] = useState<string>('');
  
  // Options section state
  const [labelLeftValue, setLabelLeftValue] = useState<string>('');
  const [labelTopValue, setLabelTopValue] = useState<string>('');
  const [labelRightValue, setLabelRightValue] = useState<string>('');
  const [labelBottomValue, setLabelBottomValue] = useState<string>('');
  const [requiredValue, setRequiredValue] = useState<string>('');
  const [invalidValue, setInvalidValue] = useState<string>('');
  const [disabledValue, setDisabledValue] = useState<string>('Disabled text');
  const [readonlyValue, setReadonlyValue] = useState<string>('Readonly text');
  const [multilineValue, setMultilineValue] = useState<string>('');
  
  // Playground state
  const [playgroundValue, setPlaygroundValue] = useState<string>('Sample text');
  const textRef = useRef<AvakioTextRef>(null);
  const propertyRef = useRef<AvakioPropertyRef>(null);
  
  // Event log
  const [eventLog, setEventLog] = useState<string[]>([]);

  // Playground property items
  const [playgroundProps, setPlaygroundProps] = useState<AvakioPropertyItem[]>([
    // Identity Group
    { id: 'componentId', label: 'ID', type: 'text', value: 'playground-text', group: 'Identity', placeholder: 'Component ID' },
    { id: 'testId', label: 'Test ID', type: 'text', value: '', group: 'Identity', placeholder: 'Test ID for testing' },
    { id: 'className', label: 'Class Name', type: 'text', value: '', group: 'Identity', placeholder: 'Additional CSS class' },
    
    // Content Group
    { id: 'placeholder', label: 'Placeholder', type: 'text', value: 'Enter text...', group: 'Content', placeholder: 'Enter placeholder' },
    { id: 'tooltip', label: 'Tooltip', type: 'text', value: '', group: 'Content', placeholder: 'Tooltip text' },
    
    // ControlLabel Props
    { id: 'label', label: 'Label', type: 'text', value: 'Text Input', group: 'ControlLabel', placeholder: 'Styled label text' },
    { id: 'labelForm', label: 'Label Form', type: 'text', value: '', group: 'ControlLabel', placeholder: 'Form label above component' },
    { id: 'labelPosition', label: 'Label Position', type: 'select', value: 'left', group: 'ControlLabel', selectOptions: [
      { id: 'left', value: 'Left' },
      { id: 'top', value: 'Top' },
      { id: 'right', value: 'Right' },
      { id: 'bottom', value: 'Bottom' },
    ]},
    { id: 'labelAlign', label: 'Label Align', type: 'select', value: 'left', group: 'ControlLabel', selectOptions: [
      { id: 'left', value: 'Left' },
      { id: 'center', value: 'Center' },
      { id: 'right', value: 'Right' },
    ]},
    { id: 'labelWidth', label: 'Label Width', type: 'text', value: '100', group: 'ControlLabel', placeholder: 'e.g. 100 or 100px' },
    { id: 'bottomLabel', label: 'Bottom Label', type: 'text', value: '', group: 'ControlLabel', placeholder: 'Help text below component' },
    { id: 'required', label: 'Required', type: 'checkbox', value: false, group: 'ControlLabel', checkboxLabel: 'Show required asterisk' },
    { id: 'invalid', label: 'Invalid', type: 'checkbox', value: false, group: 'ControlLabel', checkboxLabel: 'Mark as invalid' },
    { id: 'invalidMessage', label: 'Invalid Message', type: 'text', value: '', group: 'ControlLabel', placeholder: 'Validation error message' },
    
    // Input Properties
    { id: 'type', label: 'Input Type', type: 'select', value: 'text', group: 'Input', selectOptions: [
      { id: 'text', value: 'Text' },
      { id: 'password', value: 'Password' },
      { id: 'email', value: 'Email' },
      { id: 'url', value: 'URL' },
      { id: 'number', value: 'Number' },
      { id: 'tel', value: 'Tel' },
      { id: 'search', value: 'Search' },
    ]},
    { id: 'inputAlign', label: 'Input Align', type: 'select', value: 'left', group: 'Input', selectOptions: [
      { id: 'left', value: 'Left' },
      { id: 'center', value: 'Center' },
      { id: 'right', value: 'Right' },
    ]},
    { id: 'maxLength', label: 'Max Length', type: 'text', value: '', group: 'Input', placeholder: 'Maximum characters' },
    { id: 'multiline', label: 'Multiline (Textarea)', type: 'checkbox', value: false, group: 'Input', checkboxLabel: 'Use textarea instead of input' },
    { id: 'rows', label: 'Rows (multiline)', type: 'text', value: '4', group: 'Input', placeholder: 'Rows for textarea' },
    
    // Features Group
    { id: 'clear', label: 'Clear Button', type: 'checkbox', value: false, group: 'Features', checkboxLabel: 'Show clear button' },
    { id: 'enableValueCopyButton', label: 'Value Copy Button', type: 'checkbox', value: false, group: 'Features', checkboxLabel: 'Show copy value button' },
    { id: 'enablePlaceHolderCopyButton', label: 'Placeholder Copy', type: 'checkbox', value: false, group: 'Features', checkboxLabel: 'Show copy placeholder button' },
    
    // Appearance Group
    { id: 'style', label: 'Style (JSON)', type: 'text', value: '', group: 'Appearance', placeholder: 'e.g. {"color":"red"}' },
    
    // Sizing Group
    { id: 'width', label: 'Width', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 300 or 100%' },
    { id: 'height', label: 'Height', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 38' },
    { id: 'textWidth', label: 'Text Width', type: 'text', value: '', group: 'Sizing', placeholder: 'Width of input field' },
    { id: 'minWidth', label: 'Min Width', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 200' },
    { id: 'maxWidth', label: 'Max Width', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 500' },
    { id: 'minHeight', label: 'Min Height', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 30' },
    { id: 'maxHeight', label: 'Max Height', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 100' },
    { id: 'margin', label: 'Margin', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 8 or 8,16,8,16' },
    { id: 'padding', label: 'Padding', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 8 or 8,16,8,16' },
    { id: 'bottomPadding', label: 'Bottom Padding', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 10' },
    
    // State Group
    { id: 'disabled', label: 'Disabled', type: 'checkbox', value: false, group: 'State', checkboxLabel: 'Disable the component' },
    { id: 'readonly', label: 'Readonly', type: 'checkbox', value: false, group: 'State', checkboxLabel: 'Make readonly' },
    { id: 'hidden', label: 'Hidden', type: 'checkbox', value: false, group: 'State', checkboxLabel: 'Hide the component' },
    { id: 'borderless', label: 'Borderless', type: 'checkbox', value: false, group: 'State', checkboxLabel: 'Remove border' },
    
    // Events Group (toggles to enable event logging)
    { id: 'logOnChange', label: 'Log onChange', type: 'checkbox', value: true, group: 'Events', checkboxLabel: 'Log onChange events' },
    { id: 'logOnBlur', label: 'Log onBlur', type: 'checkbox', value: false, group: 'Events', checkboxLabel: 'Log onBlur events' },
    { id: 'logOnFocus', label: 'Log onFocus', type: 'checkbox', value: false, group: 'Events', checkboxLabel: 'Log onFocus events' },
    { id: 'logOnKeyPress', label: 'Log onKeyPress', type: 'checkbox', value: false, group: 'Events', checkboxLabel: 'Log onKeyPress events' },
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

  // Handle tab change
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
    addEventLog('Text', action, details);
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
    { id: 1, name: 'value', type: 'string', defaultValue: "''", description: 'Current value of the text input', from: 'Base' },
    { id: 2, name: 'placeholder', type: 'string', defaultValue: 'undefined', description: 'Placeholder text', from: 'Base' },
    { id: 3, name: 'type', type: "'text' | 'password' | 'email' | 'url' | 'number' | 'tel' | 'search'", defaultValue: "'text'", description: 'Input type', from: 'Text' },
    { id: 4, name: 'name', type: 'string', defaultValue: 'undefined', description: 'Name attribute for form submission', from: 'Text' },
    { id: 5, name: 'clear', type: 'boolean', defaultValue: 'false', description: 'Shows clear button when input has value', from: 'Text' },
    { id: 6, name: 'enableValueCopyButton', type: 'boolean', defaultValue: 'false', description: 'Enables copy button to copy value to clipboard', from: 'Text' },
    { id: 7, name: 'enablePlaceHolderCopyButton', type: 'boolean', defaultValue: 'false', description: 'Enables copy button to copy placeholder to clipboard', from: 'Text' },
    { id: 8, name: 'icon', type: 'React.ReactNode', defaultValue: 'undefined', description: 'Icon to show in the input', from: 'Text' },
    { id: 9, name: 'iconPosition', type: "'left' | 'right'", defaultValue: "'left'", description: 'Position of the icon', from: 'Text' },
    { id: 10, name: 'multiline', type: 'boolean', defaultValue: 'false', description: 'Enable multiline mode (renders textarea)', from: 'Text' },
    { id: 11, name: 'rows', type: 'number', defaultValue: '4', description: 'Number of visible rows (multiline only)', from: 'Text' },
    { id: 12, name: 'textWidth', type: 'string | number', defaultValue: 'undefined', description: 'Width of the text input/textarea', from: 'Text' },
    { id: 13, name: 'inputAlign', type: "'left' | 'center' | 'right'", defaultValue: "'left'", description: 'Text alignment inside the input', from: 'Base' },
    
    // Label Props
    { id: 14, name: 'label', type: 'string', defaultValue: 'undefined', description: 'Label text displayed beside the input', from: 'ControlLabel' },
    { id: 15, name: 'labelForm', type: 'string', defaultValue: 'undefined', description: 'Plain text form label displayed above the component', from: 'ControlLabel' },
    { id: 16, name: 'labelPosition', type: "'left' | 'top'", defaultValue: "'left'", description: 'Position of the label', from: 'ControlLabel' },
    { id: 17, name: 'labelAlign', type: "'left' | 'right' | 'center'", defaultValue: "'left'", description: 'Alignment of the label text', from: 'ControlLabel' },
    { id: 18, name: 'labelWidth', type: 'number | string', defaultValue: '100', description: 'Width of the label', from: 'ControlLabel' },
    { id: 19, name: 'bottomLabel', type: 'string', defaultValue: 'undefined', description: 'Help text displayed below the component', from: 'ControlLabel' },
    { id: 20, name: 'bottomPadding', type: 'number | string', defaultValue: 'undefined', description: 'Padding at the bottom of the component', from: 'Base' },
    
    // State Props
    { id: 21, name: 'disabled', type: 'boolean', defaultValue: 'false', description: 'Whether the component is disabled', from: 'Base' },
    { id: 22, name: 'readonly', type: 'boolean', defaultValue: 'false', description: 'Whether the component is read-only', from: 'Base' },
    { id: 23, name: 'hidden', type: 'boolean', defaultValue: 'false', description: 'Whether the component is hidden', from: 'Base' },
    { id: 24, name: 'borderless', type: 'boolean', defaultValue: 'false', description: 'Removes the border from the component', from: 'Base' },
    
    // Validation Props
    { id: 25, name: 'required', type: 'boolean', defaultValue: 'false', description: 'Marks the field as required (shows asterisk)', from: 'ControlLabel' },
    { id: 26, name: 'invalid', type: 'boolean', defaultValue: 'false', description: 'Marks the component as invalid', from: 'ControlLabel' },
    { id: 27, name: 'invalidMessage', type: 'string', defaultValue: 'undefined', description: 'Sets the text of a validation message', from: 'ControlLabel' },
    { id: 28, name: 'validate', type: '(value: string) => boolean | string', defaultValue: 'undefined', description: 'Custom validation function', from: 'Base' },
    { id: 29, name: 'maxLength', type: 'number', defaultValue: 'undefined', description: 'Maximum character length', from: 'Text' },
    { id: 30, name: 'pattern', type: 'string', defaultValue: 'undefined', description: 'Pattern for HTML5 validation', from: 'Text' },
    { id: 31, name: 'min', type: 'number', defaultValue: 'undefined', description: 'Minimum value (for number type)', from: 'Text' },
    { id: 32, name: 'max', type: 'number', defaultValue: 'undefined', description: 'Maximum value (for number type)', from: 'Text' },
    { id: 33, name: 'step', type: 'number', defaultValue: 'undefined', description: 'Step value (for number type)', from: 'Text' },
    { id: 34, name: 'autoComplete', type: 'string', defaultValue: 'undefined', description: 'Autocomplete attribute', from: 'Text' },
    
    // Sizing Props
    { id: 35, name: 'width', type: 'string | number', defaultValue: 'undefined', description: 'Width of the component', from: 'Base' },
    { id: 36, name: 'height', type: 'string | number', defaultValue: 'undefined', description: 'Height of the component', from: 'Base' },
    { id: 37, name: 'minWidth', type: 'string | number', defaultValue: 'undefined', description: 'Minimum width of the component', from: 'Base' },
    { id: 38, name: 'maxWidth', type: 'string | number', defaultValue: 'undefined', description: 'Maximum width of the component', from: 'Base' },
    { id: 39, name: 'minHeight', type: 'string | number', defaultValue: 'undefined', description: 'Minimum height of the component', from: 'Base' },
    { id: 40, name: 'maxHeight', type: 'string | number', defaultValue: 'undefined', description: 'Maximum height of the component', from: 'Base' },
    { id: 41, name: 'margin', type: 'string | number | [number, number, number, number]', defaultValue: 'undefined', description: 'Margin around the component', from: 'Base' },
    { id: 42, name: 'padding', type: 'string | number | [number, number, number, number]', defaultValue: 'undefined', description: 'Padding inside the component', from: 'Base' },
    
    // Identity Props
    { id: 43, name: 'id', type: 'string', defaultValue: 'undefined', description: 'Component ID', from: 'Base' },
    { id: 44, name: 'testId', type: 'string', defaultValue: 'undefined', description: 'Test ID for testing purposes', from: 'Base' },
    { id: 45, name: 'className', type: 'string', defaultValue: "''", description: 'Additional CSS class name', from: 'Base' },
    { id: 46, name: 'style', type: 'React.CSSProperties', defaultValue: 'undefined', description: 'Custom inline styles', from: 'Base' },
    { id: 47, name: 'theme', type: 'string', defaultValue: "'material'", description: 'Theme variant (material, flat, compact, dark, ocean, sunset)', from: 'Text' },
  ];

  const eventsData: PropDoc[] = [
    { id: 1, name: 'onChange', type: '(event: AvakioChangeEvent<string> & { event: ChangeEvent }) => void', defaultValue: 'undefined', description: 'Fires when the value changes', from: 'Base' },
    { id: 2, name: 'onBlur', type: '(event: FocusEvent) => void', defaultValue: 'undefined', description: 'Fires when the input loses focus', from: 'Base' },
    { id: 3, name: 'onFocus', type: '(event: FocusEvent) => void', defaultValue: 'undefined', description: 'Fires when the input receives focus', from: 'Base' },
    { id: 4, name: 'onEnter', type: '(value: string) => void', defaultValue: 'undefined', description: 'Fires when Enter key is pressed (not in multiline)', from: 'Text' },
    { id: 5, name: 'onKeyPress', type: '(event: KeyboardEvent) => void', defaultValue: 'undefined', description: 'Fires when a key is pressed', from: 'Base' },
    { id: 6, name: 'onKeyDown', type: '(event: KeyboardEvent) => void', defaultValue: 'undefined', description: 'Fires when a key is pressed down', from: 'Text' },
    { id: 7, name: 'onClick', type: '() => void', defaultValue: 'undefined', description: 'Fires when the component is clicked', from: 'Text' },
    { id: 8, name: 'onItemClick', type: '(event: MouseEvent) => void', defaultValue: 'undefined', description: 'Fires after the control has been clicked', from: 'Base' },
    { id: 9, name: 'onAfterRender', type: '() => void', defaultValue: 'undefined', description: 'Occurs immediately after the component has been rendered', from: 'Base' },
    { id: 10, name: 'onBeforeRender', type: '() => void', defaultValue: 'undefined', description: 'Occurs immediately before the component has been rendered', from: 'Base' },
    { id: 11, name: 'onViewShow', type: '() => void', defaultValue: 'undefined', description: 'Fires when any hidden view is shown', from: 'Base' },
  ];

  const refMethodsData: PropDoc[] = [
    { id: 1, name: 'getValue()', type: '() => string | undefined', defaultValue: '-', description: 'Returns the current value', from: 'Base' },
    { id: 2, name: 'setValue(value)', type: '(value: string) => void', defaultValue: '-', description: 'Sets a new value', from: 'Base' },
    { id: 3, name: 'getText()', type: '() => string', defaultValue: '-', description: 'Gets actual text value from the control input', from: 'Base' },
    { id: 4, name: 'focus()', type: '() => void', defaultValue: '-', description: 'Sets focus to the control', from: 'Base' },
    { id: 5, name: 'blur()', type: '() => void', defaultValue: '-', description: 'Removes focus from the control', from: 'Base' },
    { id: 6, name: 'validate()', type: '() => boolean | string', defaultValue: '-', description: 'Validates the input. Returns true if valid, false or error message if invalid', from: 'Base' },
    { id: 7, name: 'isEnabled()', type: '() => boolean', defaultValue: '-', description: 'Checks whether the component is enabled', from: 'Base' },
    { id: 8, name: 'enable()', type: '() => void', defaultValue: '-', description: 'Enables the component that was disabled', from: 'Base' },
    { id: 9, name: 'disable()', type: '() => void', defaultValue: '-', description: 'Disables the component (makes it dimmed and unclickable)', from: 'Base' },
    { id: 10, name: 'isVisible()', type: '() => boolean', defaultValue: '-', description: 'Checks whether the component is visible', from: 'Base' },
    { id: 11, name: 'show()', type: '() => void', defaultValue: '-', description: 'Makes the component visible', from: 'Base' },
    { id: 12, name: 'hide()', type: '() => void', defaultValue: '-', description: 'Hides the component', from: 'Base' },
    { id: 13, name: 'getElement()', type: '() => HTMLElement | null', defaultValue: '-', description: 'Returns the root DOM element of the component', from: 'Base' },
    { id: 14, name: 'getParentView()', type: '() => string | null', defaultValue: '-', description: 'Returns the ID of the parent Avakio container, or its classname if no ID is set', from: 'Base' },
    { id: 15, name: 'define(config, value?)', type: '(config: Partial<Props> | string, value?: unknown) => void', defaultValue: '-', description: 'Redefines a single configuration property or multiple properties', from: 'Base' },
    { id: 16, name: 'getInputNode()', type: '() => HTMLInputElement | HTMLTextAreaElement | null', defaultValue: '-', description: 'Returns the input DOM node', from: 'Text' },
    { id: 17, name: 'clear()', type: '() => void', defaultValue: '-', description: 'Clears the input value', from: 'Text' },
  ];

  const propsColumns: AvakioColumn<PropDoc>[] = [
    { id: 'name', header: 'Property', width: 180 },
    { id: 'type', header: 'Type', width: 320 },
    { id: 'defaultValue', header: 'Default', width: 100 },
    { id: 'from', header: 'From', width: 100, filterType: 'combo' },
    { id: 'description', header: 'Description', width: 320 },
  ];

  return (
    <div className="avakio-text-demo-container">
      {/* Sticky Header + Tab Navigation */}
      <div className="avakio-example-sticky-header">
        {/* Header */}
        <AvakioViewHeader
          label="UI Controls"
          title="Text Input"
          subTitle="A versatile text input component with support for different input types, validation, icons, and various states."
          isSticky={false}
        />

        {/* Tab Navigation */}
        <div className="avakio-example-tabbar-container">
          <AvakioTabBar
            id="text-demo-tabs"
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
        className="avakio-text-demo-section"
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
          content="Basic text inputs with labels, placeholders, and icons."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioText
              key="basic-name"
              value={basicName}
              onChange={({ value }) => {
                setBasicName(value);
                addLog('onChange (name)', `value: ${value || '(empty)'}`);
              }}
              label="Name"
              labelWidth={120}
              placeholder="Enter your name"
              icon={<User size={16} />}
              iconPosition="left"
            />,
            <AvakioTemplate
              key="basic-name-display"
              type="clean"
              borderType="clean"
              padding={[10,0,10,0]}
              content={<>Value: <strong>{basicName || 'None'}</strong></>}
            />,
          ]}
        />

        {/* Email Input */}
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[16, 0, 0, 16]}
          content={<strong>Email Input with Validation</strong>}
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="Set type='email' for built-in email validation."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioText
              key="basic-email"
              value={basicEmail}
              onChange={({ value }) => {
                setBasicEmail(value);
                addLog('onChange (email)', `value: ${value || '(empty)'}`);
              }}
              type="email"
              label="Email"
              labelWidth={120}
              placeholder="your.email@example.com"
              icon={<Mail size={16} />}
              iconPosition="left"
            />,
            <AvakioTemplate
              key="basic-email-display"
              type="clean"
              borderType="clean"
              padding={[10,0,10,0]}
              content={<>Value: <strong>{basicEmail || 'None'}</strong></>}
            />,
          ]}
        />

        {/* Password Input */}
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[16, 0, 0, 16]}
          content={<strong>Password Input with Toggle</strong>}
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="Set type='password' to enable password input with show/hide toggle."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioText
              key="basic-password"
              value={basicPassword}
              onChange={({ value }) => {
                setBasicPassword(value);
                addLog('onChange (password)', `value: ${value ? '********' : '(empty)'}`);
              }}
              type="password"
              label="Password"
              labelWidth={120}
              placeholder="Enter password"
              icon={<Lock size={16} />}
              iconPosition="left"
            />,
            <AvakioTemplate
              key="basic-password-display"
              type="clean"
              borderType="clean"
              padding={[10,0,10,0]}
              content={<>Length: <strong>{basicPassword.length} characters</strong></>}
            />,
          ]}
        />

        {/* Search Input */}
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[16, 0, 0, 16]}
          content={<strong>Search Input with Clear Button</strong>}
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="Use the clear prop to show a clear button when input has value."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioText
              key="basic-search"
              value={searchValue}
              onChange={({ value }) => {
                setSearchValue(value);
                addLog('onChange (search)', `value: ${value || '(empty)'}`);
              }}
              type="search"
              label="Search"
              labelWidth={120}
              placeholder="Type to search..."
              icon={<Search size={16} />}
              iconPosition="left"
              clear
            />,
            <AvakioTemplate
              key="basic-search-display"
              type="clean"
              borderType="clean"
              padding={[10,0,10,0]}
              content={<>Search term: <strong>{searchValue || 'None'}</strong></>}
            />,
          ]}
        />
      </section>

      {/* Options Section */}
      <section 
        ref={(el) => { sectionRefs.current['options'] = el; }}
        className="avakio-text-demo-section"
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
          content="Customize the Text component with various options like label positions, validation states, and multiline mode."
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
            <AvakioText
              key="label-left"
              value={labelLeftValue}
              onChange={({ value }) => setLabelLeftValue(value)}
              label="Left Label"
              labelPosition="left"
              labelWidth={120}
              placeholder="Enter text..."
            />,
            <AvakioTemplate
              key="label-pos-top"
              type="clean"
              borderType="clean"
              padding={[16, 0, 8, 0]}
              content='labelPosition="top"'
            />,
            <AvakioText
              key="label-top"
              value={labelTopValue}
              onChange={({ value }) => setLabelTopValue(value)}
              label="Top Label"
              labelPosition="top"
              labelWidth={120}
              placeholder="Enter text..."
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
            <AvakioText
              key="required-input"
              value={requiredValue}
              onChange={({ value }) => setRequiredValue(value)}
              label="Required Field"
              labelWidth={120}
              required
              placeholder="This field is required"
            />,
            <AvakioTemplate
              key="error-label"
              type="clean"
              borderType="clean"
              margin={[16, 0, 8, 0]}
              style={{ fontSize: '12px'}}
              content='invalid=true invalidMessage="Error message"'
            />,
            <AvakioText
              key="invalid-input"
              value={invalidValue}
              onChange={({ value }) => setInvalidValue(value)}
              label="With Error"
              labelWidth={120}
              invalid
              invalidMessage="This field has an error"
              placeholder="Enter text..."
            />,
          ]}
        />

        {/* Other States */}
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
              content={<strong>Other States</strong>}
            />,
            <AvakioTemplate
              key="disabled-label"
              type="clean"
              borderType="clean"
              margin={[8, 0, 8, 0]}
              style={{ fontSize: '12px'}}
              content='disabled=true'
            />,
            <AvakioText
              key="disabled-input"
              value={disabledValue}
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
            <AvakioText
              key="readonly-input"
              value={readonlyValue}
              onChange={({ value }) => setReadonlyValue(value)}
              label="Read Only"
              labelWidth={120}
              readonly
            />,
          ]}
        />

        {/* Multiline */}
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioTemplate
              key="multiline-title"
              type="clean"
              borderType="clean"
              content={<strong>Multiline (Textarea)</strong>}
            />,
            <AvakioTemplate
              key="multiline-desc"
              type="clean"
              borderType="clean"
              padding={[8, 0, 8, 0]}
              content='Set multiline=true to render a textarea. Use rows to control height.'
            />,
            <AvakioText
              key="multiline-input"
              value={multilineValue}
              onChange={({ value }) => setMultilineValue(value)}
              label="Description"
              labelWidth={120}
              labelPosition="top"
              placeholder="Enter a description..."
              multiline
              rows={4}
            />,
          ]}
        />
      </section>

      {/* Interactive Playground Section */}
      <section 
        ref={(el) => { sectionRefs.current['playground'] = el; }}
        className="avakio-text-demo-section"
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
          content="Experiment with different Text configurations in real-time. Change any property below to see the effect on the preview."
        />
        <AvakioLayout
          id='pg-mainLayout'
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          height={650}            
          rows={[
            // Row 1: Headers
            <AvakioLayout
              id='pg-mainLayout-row1'
              type="clean"
              borderless={true}
              height='30px'
              width='100%'
              cols={[
                //Row 1, Col 1: Preview Header
                <AvakioLayout
                  id='pg-mainLayout-row1-col1'
                  type="clean"
                  borderless={true}                  
                  rows={[
                    <AvakioTemplate                      
                      type="clean"
                      borderType="clean"
                      width='50%'
                      padding={[0, 0, 10, 0]}
                      content={<span><strong>Preview</strong></span>}
                    />
                  ]}
                />,                
                //Row 1, Col 2: Configuration Header
                <AvakioLayout
                  id='pg-mainLayout-row1-col2'
                  type="clean"
                  borderless={true}                   
                  flexWrap={true}                                        
                  rows={[
                    <AvakioLayout                                        
                      type="clean"
                      borderless={true}
                      cols={[
                        <AvakioTemplate
                          id='pg-mainLayout-row1-col2-1'
                          type="clean"
                          width='100%'
                          borderType="clean"
                          content={<strong>Configuration</strong>}
                        />,                                         
                      ]}
                    />,                  
                  ]}
                />,
                ]}
            />,
            //Row2
            <AvakioLayout
                type="clean"
                borderless={true}
                responsive
                autoResize
                gap={16}
                height='100%'
                cols={[
                  <AvakioLayout
                    type="clean"
                    borderless={true}                  
                    height='100%'
                    rows={[
                      
                      <AvakioLayout
                        type="clean"
                        padding={10}
                        borderless={false}                        
                        height='100%'
                        rows={[
                          <AvakioText
                            id={getPropValue('componentId', 'playground-text')}
                            testId={getPropValue('testId', '') || undefined}
                            className={getPropValue('className', '') || undefined}
                            ref={textRef}
                            value={playgroundValue}
                            onChange={({ value }) => {
                              setPlaygroundValue(value);
                              if (getPropValue('logOnChange', true)) addLog('onChange', `value: ${value || '(empty)'}`);
                            }}
                            // Content props
                            placeholder={getPropValue('placeholder', '')}
                            tooltip={getPropValue('tooltip', '') || undefined}
                            // ControlLabel props
                            label={getPropValue('label', '')}
                            labelForm={getPropValue('labelForm', '') || undefined}
                            labelPosition={getPropValue('labelPosition', 'left') as 'left' | 'top'}
                            labelAlign={getPropValue('labelAlign', 'left') as 'left' | 'right'}
                            labelWidth={Number(getPropValue('labelWidth', '100'))}
                            bottomLabel={getPropValue('bottomLabel', '') || undefined}
                            required={getPropValue('required', false)}
                            invalid={getPropValue('invalid', false)}
                            invalidMessage={getPropValue('invalidMessage', '') || undefined}
                            // Input Properties
                            type={getPropValue('type', 'text') as any}
                            inputAlign={getPropValue('inputAlign', 'left') as 'left' | 'center' | 'right'}
                            maxLength={getPropValue('maxLength', '') ? Number(getPropValue('maxLength', '')) : undefined}
                            multiline={getPropValue('multiline', false)}
                            rows={Number(getPropValue('rows', 4))}
                            // Features
                            clear={getPropValue('clear', false)}
                            enableValueCopyButton={getPropValue('enableValueCopyButton', false)}
                            enablePlaceHolderCopyButton={getPropValue('enablePlaceHolderCopyButton', false)}
                            // Appearance
                            style={getPropValue('style', '') ? (() => {
                              try {
                                return JSON.parse(getPropValue('style', ''));
                              } catch {
                                return undefined;
                              }
                            })() : undefined}
                            // Sizing
                            width={formatSizingValue(getPropValue('width', ''))}
                            height={formatSizingValue(getPropValue('height', ''))}
                            textWidth={formatSizingValue(getPropValue('textWidth', ''))}
                            minWidth={formatSizingValue(getPropValue('minWidth', ''))}
                            maxWidth={formatSizingValue(getPropValue('maxWidth', ''))}
                            minHeight={formatSizingValue(getPropValue('minHeight', ''))}
                            maxHeight={formatSizingValue(getPropValue('maxHeight', ''))}
                            margin={getPropValue('margin', '') ? getPropValue('margin', '').includes(',') ? getPropValue('margin', '').split(',').map(Number) as [number, number, number, number] : Number(getPropValue('margin', '')) : undefined}
                            padding={getPropValue('padding', '') ? getPropValue('padding', '').includes(',') ? getPropValue('padding', '').split(',').map(Number) as [number, number, number, number] : Number(getPropValue('padding', '')) : undefined}
                            bottomPadding={getPropValue('bottomPadding', '') ? Number(getPropValue('bottomPadding', '')) : undefined}
                            // State
                            disabled={getPropValue('disabled', false)}
                            readonly={getPropValue('readonly', false)}
                            hidden={getPropValue('hidden', false)}
                            borderless={getPropValue('borderless', false)}
                            // Events
                            onBlur={(e) => {
                              if (getPropValue('logOnBlur', false)) addLog('onBlur', 'focus lost');
                            }}
                            onFocus={(e) => {
                              if (getPropValue('logOnFocus', false)) addLog('onFocus', 'focus gained');
                            }}
                            onKeyPress={(e) => {
                              if (getPropValue('logOnKeyPress', false)) addLog('onKeyPress', `key: ${e.key}`);
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
                                  const val = textRef.current?.getValue();
                                    addLog('getValue()', `returned: ${val || '(empty)'}`);
                                  }}
                                />
                                <AvakioButton
                                  size="sm"
                                  label='setValue("Test")'
                                  margin={[0,10,10,0]}
                                  width='200px'
                                  buttonWidth='150px'
                                  onClick={() => {
                                    textRef.current?.setValue('Test value');
                                    setPlaygroundValue('Test value');
                                    addLog('setValue()', 'set to "Test value"');
                                  }}
                                />
                                <AvakioButton
                                  size="sm"
                                  label='focus()'
                                  margin={[0,10,10,0]}
                                  width='200px'
                                  buttonWidth='150px'
                                  onClick={() => {
                                    textRef.current?.focus();
                                    addLog('focus()', 'called via ref');
                                  }}
                                />
                                <AvakioButton
                                  size="sm"
                                  label='blur()'
                                  margin={[0,10,10,0]}
                                  width='200px'
                                  buttonWidth='150px'
                                  onClick={() => {
                                    textRef.current?.blur();
                                    addLog('blur()', 'called via ref');
                                  }}
                                />
                                <AvakioButton
                                  size="sm"
                                  label='clear()'
                                  margin={[0,10,10,0]}
                                  width='200px'
                                  buttonWidth='150px'
                                  onClick={() => {
                                    textRef.current?.clear();
                                    setPlaygroundValue('');
                                    addLog('clear()', 'cleared input');
                                  }}
                                />
                                <AvakioButton
                                  size="sm"
                                  label='validate()'
                                  margin={[0,10,10,0]}
                                  width='200px'
                                  buttonWidth='150px'
                                  onClick={() => {
                                    const isValid = textRef.current?.validate();
                                    addLog('validate()', `returned: ${isValid}`);
                                  }}
                                />
                                <AvakioButton
                                  size="sm"
                                  label='isEnabled()'
                                  margin={[0,10,10,0]}
                                  width='200px'
                                  buttonWidth='150px'
                                  onClick={() => {
                                    const enabled = textRef.current?.isEnabled();
                                    addLog('isEnabled()', `returned: ${enabled}`);
                                  }}
                                />
                                <AvakioButton
                                  size="sm"
                                  label='enable()'
                                  margin={[0,10,10,0]}
                                  width='200px'
                                  buttonWidth='150px'
                                  onClick={() => {
                                    textRef.current?.enable();
                                    addLog('enable()', 'called via ref');
                                  }}
                                />
                                <AvakioButton
                                  size="sm"
                                  label='disable()'
                                  margin={[0,10,10,0]}
                                  width='200px'
                                  buttonWidth='150px'
                                  onClick={() => {
                                    textRef.current?.disable();
                                    addLog('disable()', 'called via ref');
                                  }}
                                />                                
                                <AvakioButton
                                  size="sm"
                                  label='getText()'
                                  margin={[0,10,10,0]}
                                  width='200px'
                                  buttonWidth='150px'
                                  onClick={() => {
                                    const text = textRef.current?.getText();
                                    addLog('getText()', `returned: ${text || '(empty)'}`);
                                  }}
                                />
                                <AvakioButton
                                  size="sm"
                                  label='isVisible()'
                                  margin={[0,10,10,0]}
                                  width='200px'
                                  buttonWidth='150px'
                                  onClick={() => {
                                    const visible = textRef.current?.isVisible();
                                    addLog('isVisible()', `returned: ${visible}`);
                                  }}
                                />
                                <AvakioButton
                                  size="sm"
                                  label='show()'
                                  margin={[0,10,10,0]}
                                  width='200px'
                                  buttonWidth='150px'
                                  onClick={() => {
                                    textRef.current?.show();
                                    addLog('show()', 'called via ref');
                                  }}
                                />
                                <AvakioButton
                                  size="sm"
                                  label='hide()'
                                  margin={[0,10,10,0]}
                                  width='200px'
                                  buttonWidth='150px'
                                  onClick={() => {
                                    textRef.current?.hide();
                                    addLog('hide()', 'called via ref');
                                  }}
                                />
                                <AvakioButton
                                  size="sm"
                                  label='getElement()'
                                  margin={[0,10,10,0]}
                                  width='200px'
                                  buttonWidth='150px'
                                  onClick={() => {
                                    const el = textRef.current?.getElement();
                                    addLog('getElement()', `returned: ${el ? el.className : 'null'}`);
                                  }}
                                />
                                <AvakioButton
                                  size="sm"
                                  label='getParentView()'
                                  margin={[0,10,10,0]}
                                  width='200px'
                                  buttonWidth='150px'
                                  onClick={() => {
                                    const parent = textRef.current?.getParentView();
                                    addLog('getParentView()', `returned: ${parent || 'null'}`);
                                  }}
                                />
                              </>
                            }
                          />
                        ]}
                      />,
                    ]}
                  />,                      
                  <AvakioLayout
                    id='Layout-row-Column2'
                    type="clean"
                    borderless={true}
                    height='100%'
                    rows={[                    
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
                      <AvakioTemplate
                        type="clean"
                        borderType="clean"
                        padding={[10, 0, 0, 0]}
                        align="right"  
                        flexWrap={true}                      
                        content={
                          <>
                            <AvakioButton
                              size="sm"
                              label="Get Item Count"
                              margin={[10, 10, 0, 0]}
                              onClick={() => {
                                const count = propertyRef.current?.getItemCount();
                                addLog('PropertyItem Count', `Num of Items: ${count}`);
                              }}
                            />
                            <AvakioButton
                              id='Button-reset-playground'
                              size="sm"
                              label="Reset"
                              margin={[10, 0, 0, 0]}
                              onClick={() => {
                                // Reset to initial values
                                setPlaygroundProps([
                                  // Identity Group
                                  { id: 'componentId', label: 'ID', type: 'text', value: 'playground-text', group: 'Identity', placeholder: 'Component ID' },
                                  { id: 'testId', label: 'Test ID', type: 'text', value: '', group: 'Identity', placeholder: 'Test ID for testing' },
                                  { id: 'className', label: 'Class Name', type: 'text', value: '', group: 'Identity', placeholder: 'Additional CSS class' },
                                  // Content Group
                                  { id: 'placeholder', label: 'Placeholder', type: 'text', value: 'Enter text...', group: 'Content', placeholder: 'Enter placeholder' },
                                  { id: 'tooltip', label: 'Tooltip', type: 'text', value: '', group: 'Content', placeholder: 'Tooltip text' },
                                  // ControlLabel Props
                                  { id: 'label', label: 'Label', type: 'text', value: 'Text Input', group: 'ControlLabel', placeholder: 'Styled label text' },
                                  { id: 'labelForm', label: 'Label Form', type: 'text', value: '', group: 'ControlLabel', placeholder: 'Form label above component' },
                                  { id: 'labelPosition', label: 'Label Position', type: 'select', value: 'left', group: 'ControlLabel', selectOptions: [
                                    { id: 'left', value: 'Left' },
                                    { id: 'top', value: 'Top' },
                                    { id: 'right', value: 'Right' },
                                    { id: 'bottom', value: 'Bottom' },
                                  ]},
                                  { id: 'labelAlign', label: 'Label Align', type: 'select', value: 'left', group: 'ControlLabel', selectOptions: [
                                    { id: 'left', value: 'Left' },
                                    { id: 'center', value: 'Center' },
                                    { id: 'right', value: 'Right' },
                                  ]},
                                  { id: 'labelWidth', label: 'Label Width', type: 'text', value: '100', group: 'ControlLabel', placeholder: 'e.g. 100 or 100px' },
                                  { id: 'bottomLabel', label: 'Bottom Label', type: 'text', value: '', group: 'ControlLabel', placeholder: 'Help text below component' },
                                  { id: 'required', label: 'Required', type: 'checkbox', value: false, group: 'ControlLabel', checkboxLabel: 'Show required asterisk' },
                                  { id: 'invalid', label: 'Invalid', type: 'checkbox', value: false, group: 'ControlLabel', checkboxLabel: 'Mark as invalid' },
                                  { id: 'invalidMessage', label: 'Invalid Message', type: 'text', value: '', group: 'ControlLabel', placeholder: 'Validation error message' },
                                  // Input Properties
                                  { id: 'type', label: 'Input Type', type: 'select', value: 'text', group: 'Input', selectOptions: [
                                    { id: 'text', value: 'Text' },
                                    { id: 'password', value: 'Password' },
                                    { id: 'email', value: 'Email' },
                                    { id: 'url', value: 'URL' },
                                    { id: 'number', value: 'Number' },
                                    { id: 'tel', value: 'Tel' },
                                    { id: 'search', value: 'Search' },
                                  ]},
                                  { id: 'inputAlign', label: 'Input Align', type: 'select', value: 'left', group: 'Input', selectOptions: [
                                    { id: 'left', value: 'Left' },
                                    { id: 'center', value: 'Center' },
                                    { id: 'right', value: 'Right' },
                                  ]},
                                  { id: 'maxLength', label: 'Max Length', type: 'text', value: '', group: 'Input', placeholder: 'Maximum characters' },
                                  { id: 'multiline', label: 'Multiline (Textarea)', type: 'checkbox', value: false, group: 'Input', checkboxLabel: 'Use textarea instead of input' },
                                  { id: 'rows', label: 'Rows (multiline)', type: 'text', value: '4', group: 'Input', placeholder: 'Rows for textarea' },
                                  // Features Group
                                  { id: 'clear', label: 'Clear Button', type: 'checkbox', value: false, group: 'Features', checkboxLabel: 'Show clear button' },
                                  { id: 'enableValueCopyButton', label: 'Value Copy Button', type: 'checkbox', value: false, group: 'Features', checkboxLabel: 'Show copy value button' },
                                  { id: 'enablePlaceHolderCopyButton', label: 'Placeholder Copy', type: 'checkbox', value: false, group: 'Features', checkboxLabel: 'Show copy placeholder button' },
                                  // Appearance Group
                                  { id: 'style', label: 'Style (JSON)', type: 'text', value: '', group: 'Appearance', placeholder: 'e.g. {\"color\":\"red\"}' },
                                  // Sizing Group
                                  { id: 'width', label: 'Width', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 300 or 100%' },
                                  { id: 'height', label: 'Height', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 38' },
                                  { id: 'textWidth', label: 'Text Width', type: 'text', value: '', group: 'Sizing', placeholder: 'Width of input field' },
                                  { id: 'minWidth', label: 'Min Width', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 200' },
                                  { id: 'maxWidth', label: 'Max Width', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 500' },
                                  { id: 'minHeight', label: 'Min Height', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 30' },
                                  { id: 'maxHeight', label: 'Max Height', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 100' },
                                  { id: 'margin', label: 'Margin', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 8 or 8,16,8,16' },
                                  { id: 'padding', label: 'Padding', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 8 or 8,16,8,16' },
                                  { id: 'bottomPadding', label: 'Bottom Padding', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 10' },
                                  // State Group
                                  { id: 'disabled', label: 'Disabled', type: 'checkbox', value: false, group: 'State', checkboxLabel: 'Disable the component' },
                                  { id: 'readonly', label: 'Readonly', type: 'checkbox', value: false, group: 'State', checkboxLabel: 'Make readonly' },
                                  { id: 'hidden', label: 'Hidden', type: 'checkbox', value: false, group: 'State', checkboxLabel: 'Hide the component' },
                                  { id: 'borderless', label: 'Borderless', type: 'checkbox', value: false, group: 'State', checkboxLabel: 'Remove border' },
                                  // Events Group
                                  { id: 'logOnChange', label: 'Log onChange', type: 'checkbox', value: true, group: 'Events', checkboxLabel: 'Log onChange events' },
                                  { id: 'logOnBlur', label: 'Log onBlur', type: 'checkbox', value: false, group: 'Events', checkboxLabel: 'Log onBlur events' },
                                  { id: 'logOnFocus', label: 'Log onFocus', type: 'checkbox', value: false, group: 'Events', checkboxLabel: 'Log onFocus events' },
                                  { id: 'logOnKeyPress', label: 'Log onKeyPress', type: 'checkbox', value: false, group: 'Events', checkboxLabel: 'Log onKeyPress events' },
                                ]);
                                setPlaygroundValue('Sample text');
                                addLog('Reset', 'playground configuration reset to defaults');
                              }}
                            />
                          </>
                            }
                          /> 
                        ]}
                      />
                ]}
            />
          ]}
        />          
      </section>

      {/* Documentation Section */}
      <section 
        ref={(el) => { sectionRefs.current['docs'] = el; }}
        className="avakio-text-demo-section"
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
              id="text-props-table"
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
              id="text-events-table"
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
              id="text-methods-table"
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

export default AvakioTextExample;






















