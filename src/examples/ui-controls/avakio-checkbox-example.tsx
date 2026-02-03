import React, { useState, useRef } from 'react';
import { AvakioCheckbox, AvakioCheckboxRef } from '../../components/avakio/ui-controls/avakio-checkbox/avakio-checkbox';
import { AvakioTemplate } from '../../components/avakio/views/avakio-template/avakio-template';
import { AvakioLayout } from '../../components/avakio/layouts/avakio-layout/avakio-layout';
import { AvakioButton } from '../../components/avakio/ui-controls/avakio-button/avakio-button';
import { AvakioDataTable } from '../../components/avakio/data-presentation/avakio-datatable/AvakioDataTable';
import type { AvakioColumn } from '../../components/avakio/data-presentation/avakio-datatable/AvakioDataTable';
import { AvakioTabBar } from '../../components/avakio/ui-controls/avakio-tabbar/avakio-tabbar';
import { AvakioViewHeader } from '../../components/avakio/ui-widgets/avakio-view-header/avakio-view-header';
import { AvakioProperty, AvakioPropertyItem, AvakioPropertyRef } from '../../components/avakio/data-presentation/avakio-property/avakio-property';
import { addEventLog } from '../../services/event-log-service';
import { formatSizingValue } from '../../lib/utils';
import { 
  CheckSquare,
  Settings2,
  Book,
  Play,
} from 'lucide-react';
import './avakio-checkbox-example.css';

// Tab options for navigation
const TAB_OPTIONS = [
  { id: 'basic', label: 'Basic Usage', icon: <CheckSquare size={14} /> },
  { id: 'options', label: 'Options', icon: <Settings2 size={14} /> },
  { id: 'playground', label: 'Interactive Playground', icon: <Play size={14} /> },
  { id: 'docs', label: 'Documentation', icon: <Book size={14} /> },
];

export function AvakioCheckboxExample() {
  const [activeSection, setActiveSection] = useState<string | number | null>('basic');
  
  // Section refs for scroll navigation
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  
  // Demo state values - Basic Usage
  const [basicChecked, setBasicChecked] = useState<boolean>(true);
  const [uncheckedDemo, setUncheckedDemo] = useState<boolean>(false);
  const [withDescription, setWithDescription] = useState<boolean>(false);
  
  // Indeterminate section state
  const [parentChecked, setParentChecked] = useState<boolean>(false);
  const [childOptions, setChildOptions] = useState<Record<string, boolean>>({
    analytics: true,
    reports: false,
    alerts: true,
  });
  
  // Options section state
  const [smallSizeChecked, setSmallSizeChecked] = useState<boolean>(true);
  const [mediumSizeChecked, setMediumSizeChecked] = useState<boolean>(true);
  const [requiredChecked, setRequiredChecked] = useState<boolean>(false);
  const [errorChecked, setErrorChecked] = useState<boolean>(false);
  const [disabledChecked, setDisabledChecked] = useState<boolean>(true);
  
  // Calculate indeterminate state
  const childCheckedCount = Object.values(childOptions).filter(Boolean).length;
  const isIndeterminate = childCheckedCount > 0 && childCheckedCount < Object.keys(childOptions).length;
  const allChildrenChecked = childCheckedCount === Object.keys(childOptions).length;
  
  // Playground state
  const [playgroundChecked, setPlaygroundChecked] = useState<boolean>(true);
  const [isComponentMounted, setIsComponentMounted] = useState<boolean>(true);
  
  // Ref for the playground checkbox
  const checkboxRef = useRef<AvakioCheckboxRef>(null);
  
  // Playground property items for AvakioProperty
  const [playgroundProps, setPlaygroundProps] = useState<AvakioPropertyItem[]>([
    // Identity Group
    { id: 'componentId', label: 'ID', type: 'text', value: 'playground-checkbox', group: 'Identity', placeholder: 'Component ID' },
    { id: 'testId', label: 'Test ID', type: 'text', value: '', group: 'Identity', placeholder: 'Test ID for testing' },
    { id: 'className', label: 'Class Name', type: 'text', value: '', group: 'Identity', placeholder: 'Additional CSS class' },
    
    // Content Group
    { id: 'label', label: 'Label', type: 'text', value: 'Accept Terms', group: 'Content', placeholder: 'Enter label text' },
    { id: 'description', label: 'Description', type: 'text', value: 'I agree to the terms and conditions', group: 'Content', placeholder: 'Enter description text' },
    
    // Appearance Group
    {
      id: 'size',
      label: 'Size',
      type: 'select',
      value: 'md',
      group: 'Appearance',
      selectOptions: [
        { id: 'sm', value: 'Small' },
        { id: 'md', value: 'Medium' },
      ],
    },
    { id: 'showBorders', label: 'Show Borders', type: 'checkbox', value: false, group: 'Appearance', checkboxLabel: 'Show container border' },
    
    // Layout Group
    { id: 'minWidth', label: 'Min Width', type: 'text', value: '', group: 'Layout', placeholder: 'e.g. 100px' },
    { id: 'minHeight', label: 'Min Height', type: 'text', value: '', group: 'Layout', placeholder: 'e.g. 38px' },
    { id: 'maxWidth', label: 'Max Width', type: 'text', value: '', group: 'Layout', placeholder: 'e.g. 500px' },
    { id: 'maxHeight', label: 'Max Height', type: 'text', value: '', group: 'Layout', placeholder: 'e.g. 100px' },
    { id: 'margin', label: 'Margin', type: 'text', value: '', group: 'Layout', placeholder: 'e.g. 10 or 10,20,10,20' },
    { id: 'padding', label: 'Padding', type: 'text', value: '', group: 'Layout', placeholder: 'e.g. 8 or 8,16,8,16' },
    { id: 'style', label: 'Custom Style', type: 'text', value: '', group: 'Layout', placeholder: 'CSS object as JSON' },
    
    // Form Group
    { id: 'name', label: 'Name', type: 'text', value: '', group: 'Form', placeholder: 'Form field name' },
    { id: 'value', label: 'Value', type: 'text', value: '', group: 'Form', placeholder: 'Form field value' },
    { id: 'defaultChecked', label: 'Default Checked', type: 'checkbox', value: false, group: 'Form', checkboxLabel: 'Initial checked state (uncontrolled)' },
    
    // State Group
    { id: 'disabled', label: 'Disabled', type: 'checkbox', value: false, group: 'State', checkboxLabel: 'Disable the component' },
    { id: 'readonly', label: 'Readonly', type: 'checkbox', value: false, group: 'State', checkboxLabel: 'Make the component read-only' },
    { id: 'indeterminate', label: 'Indeterminate', type: 'checkbox', value: false, group: 'State', checkboxLabel: 'Show indeterminate state' },
    { id: 'hidden', label: 'Hidden', type: 'checkbox', value: false, group: 'State', checkboxLabel: 'Hide the component' },
    
    // Validation Group
    { id: 'required', label: 'Required', type: 'checkbox', value: false, group: 'Validation', checkboxLabel: 'Mark as required field' },
    { id: 'invalid', label: 'Invalid', type: 'checkbox', value: false, group: 'Validation', checkboxLabel: 'Mark as invalid' },
    { id: 'error', label: 'Error Message', type: 'text', value: '', group: 'Validation', placeholder: 'Error message to display' },
    { id: 'invalidMessage', label: 'Invalid Message', type: 'text', value: '', group: 'Validation', placeholder: 'Message when invalid' },
    
    // Misc Group
    { id: 'tooltip', label: 'Tooltip', type: 'text', value: '', group: 'Misc', placeholder: 'Tooltip text on hover' },
    
    // Events Group (toggles to enable event logging)
    { id: 'logOnChange', label: 'Log onChange', type: 'checkbox', value: true, group: 'Events', checkboxLabel: 'Log onChange events' },
    { id: 'logOnClick', label: 'Log onClick', type: 'checkbox', value: true, group: 'Events', checkboxLabel: 'Log onClick events' },
    { id: 'logOnFocus', label: 'Log onFocus', type: 'checkbox', value: true, group: 'Events', checkboxLabel: 'Log onFocus events' },
    { id: 'logOnBlur', label: 'Log onBlur', type: 'checkbox', value: true, group: 'Events', checkboxLabel: 'Log onBlur events' },
    { id: 'logOnMouseEnter', label: 'Log onMouseEnter', type: 'checkbox', value: false, group: 'Events', checkboxLabel: 'Log onMouseEnter events' },
    { id: 'logOnMouseLeave', label: 'Log onMouseLeave', type: 'checkbox', value: false, group: 'Events', checkboxLabel: 'Log onMouseLeave events' },
    { id: 'logOnKeyDown', label: 'Log onKeyDown', type: 'checkbox', value: false, group: 'Events', checkboxLabel: 'Log onKeyDown events' },
    { id: 'logOnKeyUp', label: 'Log onKeyUp', type: 'checkbox', value: false, group: 'Events', checkboxLabel: 'Log onKeyUp events' },
    { id: 'logOnAfterRender', label: 'Log onAfterRender', type: 'checkbox', value: false, group: 'Events', checkboxLabel: 'Log onAfterRender events' },
    { id: 'logOnBeforeRender', label: 'Log onBeforeRender', type: 'checkbox', value: false, group: 'Events', checkboxLabel: 'Log onBeforeRender events' },
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
    // When indeterminate is toggled on, uncheck the checkbox so indeterminate state is visible
    if (changed.id === 'indeterminate' && changed.value === true) {
      setPlaygroundChecked(false);
    }
  };

  // Event log
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
    addEventLog('Checkbox', action, details);
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
    { id: 1, name: 'checked', type: 'boolean', defaultValue: 'undefined', description: 'Controlled checked state of the checkbox', from: 'Checkbox' },
    { id: 2, name: 'defaultChecked', type: 'boolean', defaultValue: 'false', description: 'Initial checked state for uncontrolled mode', from: 'Checkbox' },
    { id: 3, name: 'indeterminate', type: 'boolean', defaultValue: 'false', description: 'Shows indeterminate state (partially checked), useful for "select all" scenarios', from: 'Checkbox' },
    { id: 4, name: 'label', type: 'string', defaultValue: 'undefined', description: 'Label text displayed next to the checkbox', from: 'Checkbox' },
    { id: 5, name: 'description', type: 'string', defaultValue: 'undefined', description: 'Additional descriptive text displayed below the label for extra context', from: 'Checkbox' },
    { id: 6, name: 'size', type: "'sm' | 'md'", defaultValue: "'md'", description: 'Size variant of the checkbox (sm: 18px, md: 22px)', from: 'Checkbox' },
    { id: 7, name: 'error', type: 'string', defaultValue: 'undefined', description: 'Error message to display below the checkbox', from: 'Checkbox' },
    { id: 8, name: 'required', type: 'boolean', defaultValue: 'false', description: 'Marks the checkbox as required (shows asterisk next to label)', from: 'Checkbox' },
    
    // Base Props
    { id: 9, name: 'borderless', type: 'boolean', defaultValue: 'true', description: 'When true (default), hides the container border. Set to false to show a bordered container.', from: 'Base' },
    { id: 10, name: 'tooltip', type: 'string', defaultValue: 'undefined', description: 'Tooltip text shown on hover', from: 'Base' },
    { id: 11, name: 'readonly', type: 'boolean', defaultValue: 'false', description: 'Whether the checkbox is read-only (shows value but cannot be changed)', from: 'Base' },
    { id: 12, name: 'hidden', type: 'boolean', defaultValue: 'false', description: 'Whether the component is hidden', from: 'Base' },
    { id: 13, name: 'testId', type: 'string', defaultValue: 'undefined', description: 'Test ID for testing purposes', from: 'Base' },
    { id: 14, name: 'style', type: 'React.CSSProperties', defaultValue: 'undefined', description: 'Custom inline styles', from: 'Base' },
    { id: 15, name: 'minWidth', type: 'string | number', defaultValue: 'undefined', description: 'Minimum width of the component', from: 'Base' },
    { id: 16, name: 'maxWidth', type: 'string | number', defaultValue: 'undefined', description: 'Maximum width of the component', from: 'Base' },
    { id: 17, name: 'minHeight', type: 'string | number', defaultValue: 'undefined', description: 'Minimum height of the component', from: 'Base' },
    { id: 18, name: 'maxHeight', type: 'string | number', defaultValue: 'undefined', description: 'Maximum height of the component', from: 'Base' },
    { id: 19, name: 'margin', type: 'string | number | [number, number, number, number]', defaultValue: 'undefined', description: 'Margin around the component', from: 'Base' },
    { id: 20, name: 'padding', type: 'string | number | [number, number, number, number]', defaultValue: 'undefined', description: 'Padding inside the component', from: 'Base' },
    
    // ControlLabel Props
    { id: 21, name: 'invalid', type: 'boolean', defaultValue: 'false', description: 'Whether the checkbox is in an invalid state', from: 'ControlLabel' },
    { id: 22, name: 'invalidMessage', type: 'string', defaultValue: 'undefined', description: 'Message to display when invalid (rendered by ControlLabel)', from: 'ControlLabel' },
    
    // Form Props (from InputHTMLAttributes)
    { id: 23, name: 'name', type: 'string', defaultValue: 'undefined', description: 'Name attribute for form submission', from: 'HTML' },
    { id: 24, name: 'value', type: 'string | number | readonly string[]', defaultValue: 'undefined', description: 'Value attribute for form submission', from: 'HTML' },
    { id: 25, name: 'disabled', type: 'boolean', defaultValue: 'false', description: 'Whether the checkbox is disabled (prevents interaction)', from: 'HTML' },
    { id: 26, name: 'id', type: 'string', defaultValue: 'undefined', description: 'Component ID (applied to the checkbox input element)', from: 'HTML' },
    { id: 27, name: 'className', type: 'string', defaultValue: "''", description: 'Additional CSS class name', from: 'HTML' },
  ];

  const eventsData: PropDoc[] = [
    { id: 1, name: 'onChange', type: '(event: AvakioChangeEvent<boolean>) => void', defaultValue: 'undefined', description: 'Fires when the checked state changes (user interaction or programmatic)', from: 'Checkbox' },
    { id: 2, name: 'onClick', type: '(event: MouseEvent) => void', defaultValue: 'undefined', description: 'Fires when the checkbox is clicked', from: 'Checkbox' },
    { id: 3, name: 'onFocus', type: '(event: FocusEvent) => void', defaultValue: 'undefined', description: 'Fires when the checkbox receives focus', from: 'Checkbox' },
    { id: 4, name: 'onBlur', type: '(event: FocusEvent) => void', defaultValue: 'undefined', description: 'Fires when the checkbox loses focus', from: 'Checkbox' },
    { id: 5, name: 'onMouseEnter', type: '(event: MouseEvent) => void', defaultValue: 'undefined', description: 'Fires when mouse enters the checkbox area', from: 'Checkbox' },
    { id: 6, name: 'onMouseLeave', type: '(event: MouseEvent) => void', defaultValue: 'undefined', description: 'Fires when mouse leaves the checkbox area', from: 'Checkbox' },
    { id: 7, name: 'onKeyDown', type: '(event: KeyboardEvent) => void', defaultValue: 'undefined', description: 'Fires when a key is pressed while checkbox is focused', from: 'Checkbox' },
    { id: 8, name: 'onKeyUp', type: '(event: KeyboardEvent) => void', defaultValue: 'undefined', description: 'Fires when a key is released while checkbox is focused', from: 'Checkbox' },
    { id: 9, name: 'onAfterRender', type: '() => void', defaultValue: 'undefined', description: 'Fires after the component has rendered', from: 'Base' },
    { id: 10, name: 'onBeforeRender', type: '() => void', defaultValue: 'undefined', description: 'Fires before the component renders', from: 'Base' },
  ];

  const refMethodsData: PropDoc[] = [
    // Checkbox-specific methods
    { id: 1, name: 'toggle()', type: '() => void', defaultValue: '-', description: 'Toggles the checkbox state', from: 'Checkbox' },
    { id: 2, name: 'check()', type: '() => void', defaultValue: '-', description: 'Sets the checkbox to checked state', from: 'Checkbox' },
    { id: 3, name: 'uncheck()', type: '() => void', defaultValue: '-', description: 'Sets the checkbox to unchecked state', from: 'Checkbox' },
    { id: 4, name: 'isChecked()', type: '() => boolean', defaultValue: '-', description: 'Returns whether the checkbox is checked', from: 'Checkbox' },
    { id: 5, name: 'isIndeterminate()', type: '() => boolean', defaultValue: '-', description: 'Returns whether the checkbox is in indeterminate state', from: 'Checkbox' },
    { id: 6, name: 'setReadonly(value)', type: '(value: boolean) => void', defaultValue: '-', description: 'Sets the readonly state programmatically', from: 'Checkbox' },
    { id: 7, name: 'isReadonly()', type: '() => boolean', defaultValue: '-', description: 'Returns whether the checkbox is readonly', from: 'Checkbox' },
    { id: 8, name: 'setInvalid(value)', type: '(value: boolean) => void', defaultValue: '-', description: 'Sets the invalid state programmatically', from: 'Checkbox' },
    { id: 9, name: 'isInvalid()', type: '() => boolean', defaultValue: '-', description: 'Returns whether the checkbox is in invalid state', from: 'Checkbox' },
    // Base methods
    { id: 10, name: 'focus()', type: '() => void', defaultValue: '-', description: 'Sets focus to the checkbox element', from: 'Base' },
    { id: 11, name: 'blur()', type: '() => void', defaultValue: '-', description: 'Removes focus from the checkbox element', from: 'Base' },
    { id: 12, name: 'getElement()', type: '() => HTMLElement | null', defaultValue: '-', description: 'Returns the root DOM element of the component', from: 'Base' },
    { id: 13, name: 'enable()', type: '() => void', defaultValue: '-', description: 'Enables the checkbox (makes it interactive)', from: 'Base' },
    { id: 14, name: 'disable()', type: '() => void', defaultValue: '-', description: 'Disables the checkbox (makes it non-interactive)', from: 'Base' },
    { id: 15, name: 'show()', type: '() => void', defaultValue: '-', description: 'Makes the component visible', from: 'Base' },
    { id: 16, name: 'hide()', type: '() => void', defaultValue: '-', description: 'Hides the component', from: 'Base' },
    { id: 17, name: 'isEnabled()', type: '() => boolean', defaultValue: '-', description: 'Checks whether the checkbox is enabled', from: 'Base' },
    { id: 18, name: 'isVisible()', type: '() => boolean', defaultValue: '-', description: 'Checks whether the checkbox is visible', from: 'Base' },
    { id: 19, name: 'getText()', type: '() => string', defaultValue: '-', description: 'Gets the label text of the checkbox', from: 'Base' },
    { id: 20, name: 'getValue()', type: '() => boolean', defaultValue: '-', description: 'Returns the current checked state', from: 'Base' },
    { id: 21, name: 'setValue(value)', type: '(value: boolean) => void', defaultValue: '-', description: 'Sets the checked state programmatically', from: 'Base' },
    { id: 22, name: 'validate()', type: '() => boolean | string', defaultValue: '-', description: 'Validates the checkbox (checks required and invalid state)', from: 'Base' },
    { id: 23, name: 'getParentView()', type: '() => string | null', defaultValue: '-', description: 'Returns the parent view/container ID or class', from: 'Base' },
    { id: 24, name: 'define(config, value?)', type: '(config: Partial<Props> | string, value?: any) => void', defaultValue: '-', description: 'Redefines component configuration properties (disabled, hidden, indeterminate, readonly, invalid)', from: 'Base' },
  ];

  const propsColumns: AvakioColumn<PropDoc>[] = [
    { id: 'name', header: 'Property', width: 180 },
    { id: 'type', header: 'Type', width: 300 },
    { id: 'defaultValue', header: 'Default', width: 100 },
    { id: 'description', header: 'Description', width: 350 },
    { id: 'from', header: 'From', width: 120, filterType: 'combo' },
  ];

  return (
    <div className="avakio-checkbox-demo-container">
      {/* Sticky Header + Tab Navigation */}
      <div className="avakio-example-sticky-header">
        {/* Header */}
        <AvakioViewHeader
          label="UI Controls"
          title="Checkbox"
          subTitle="A theme-aware checkbox component with support for indeterminate state, descriptions, error messages, and keyboard navigation."
          isSticky={false}
        />

        {/* Tab Navigation */}
        <div className="avakio-example-tabbar-container">
          <AvakioTabBar
            id="checkbox-demo-tabs"
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
        className="avakio-checkbox-demo-section"
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
          content="The Checkbox component provides a simple way to toggle boolean values. Click to toggle the checked state."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <div key="basic-checkboxes" className="avakio-checkbox-demo-grid">
              <AvakioCheckbox
                checked={basicChecked}
                onChange={({ value }) => {
                  setBasicChecked(value);
                  addLog('onChange', `checked: ${value}`);
                }}
                label="Checked checkbox"
              />
              <AvakioCheckbox
                checked={uncheckedDemo}
                onChange={({ value }) => {
                  setUncheckedDemo(value);
                  addLog('onChange', `checked: ${value}`);
                }}
                label="Unchecked checkbox"
              />
            </div>,
            <AvakioTemplate
              type="clean"
              borderType="clean"
              padding={[10, 0, 10, 0]}
              content={<>Basic Checked: <strong>{basicChecked ? 'true' : 'false'}</strong></>}
            />,
          ]}
        />

        {/* With Description */}
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[16, 0, 0, 16]}
          content={<strong>With Description</strong>}
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="Add a description prop to provide additional context below the label."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioCheckbox
              checked={withDescription}
              onChange={({ value }) => {
                setWithDescription(value);
                addLog('onChange (with description)', `checked: ${value}`);
              }}
              label="Marketing opt-in"
              description="Receive product updates, news, and promotional emails."
            />,
          ]}
        />

        {/* Indeterminate State */}
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[16, 0, 0, 16]}
          content={<strong>Indeterminate State</strong>}
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="Use indeterminate={true} to show a partially selected state. Commonly used for parent checkboxes when children are partially selected."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <div key="indeterminate-demo" className="avakio-checkbox-demo-stack">
              <AvakioCheckbox
                checked={allChildrenChecked}
                indeterminate={isIndeterminate}
                onChange={({ value }) => {
                  const newState: Record<string, boolean> = {};
                  Object.keys(childOptions).forEach(key => {
                    newState[key] = value;
                  });
                  setChildOptions(newState);
                  addLog('onChange (parent)', `set all to: ${value}`);
                }}
                label="Enable all notifications"
              />
              <div className="avakio-checkbox-demo-nested">
                {Object.entries(childOptions).map(([key, value]) => (
                  <AvakioCheckbox
                    key={key}
                    checked={value}
                    size="sm"
                    onChange={({ value }) => {
                      setChildOptions(prev => ({ ...prev, [key]: value }));
                      addLog(`onChange (${key})`, `checked: ${value}`);
                    }}
                    label={key.charAt(0).toUpperCase() + key.slice(1)}
                  />
                ))}
              </div>
            </div>,
          ]}
        />
      </section>

      {/* Options Section */}
      <section 
        ref={(el) => { sectionRefs.current['options'] = el; }}
        className="avakio-checkbox-demo-section"
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
          content="Customize the Checkbox with various options like size variants, required state, and error messages."
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
              key="size-desc"
              type="clean"
              borderType="clean"
              padding={[8, 0, 0, 0]}
              content="Use size='sm' for compact layouts or size='md' (default) for standard size."
            />,
            <div key="size-demos" className="avakio-checkbox-demo-grid" style={{ marginTop: 12 }}>
              <AvakioCheckbox
                checked={smallSizeChecked}
                onChange={({ value }) => setSmallSizeChecked(value)}
                size="sm"
                label="Small size (sm)"
              />
              <AvakioCheckbox
                checked={mediumSizeChecked}
                onChange={({ value }) => setMediumSizeChecked(value)}
                size="md"
                label="Medium size (md)"
              />
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
            <AvakioTemplate
              key="validation-desc"
              type="clean"
              borderType="clean"
              margin={[8, 0, 8, 0]}
              style={{ fontSize: '12px' }}
              content='required={true}'
            />,
            <AvakioCheckbox
              checked={requiredChecked}
              onChange={({ value }) => {
                setRequiredChecked(value);
                addLog('onChange (required)', `checked: ${value}`);
              }}
              label="I accept the terms"
              required
            />,
            <AvakioTemplate
              key="error-desc"
              type="clean"
              borderType="clean"
              margin={[16, 0, 8, 0]}
              style={{ fontSize: '12px' }}
              content='error="Error message"'
            />,
            <AvakioCheckbox
              checked={errorChecked}
              onChange={({ value }) => {
                setErrorChecked(value);
                addLog('onChange (error)', `checked: ${value}`);
              }}
              label="Terms and conditions"
              description="Please read and accept the terms."
              error={!errorChecked ? 'You must accept the terms to continue.' : undefined}
            />,
          ]}
        />

        {/* Disabled State */}
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioTemplate
              key="disabled-title"
              type="clean"
              borderType="clean"
              content={<strong>Other Options</strong>}
            />,
            <AvakioTemplate
              key="disabled-desc"
              type="clean"
              borderType="clean"
              margin={[8, 0, 8, 0]}
              style={{ fontSize: '12px' }}
              content='disabled={true}'
            />,
            <div key="disabled-demos" className="avakio-checkbox-demo-grid">
              <AvakioCheckbox
                checked={disabledChecked}
                label="Disabled checked"
                disabled
              />
              <AvakioCheckbox
                checked={false}
                label="Disabled unchecked"
                disabled
              />
            </div>,
          ]}
        />
      </section>

      {/* Interactive Playground Section */}
      <section 
        ref={(el) => { sectionRefs.current['playground'] = el; }}
        className="avakio-checkbox-demo-section"
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
          content="Experiment with different Checkbox configurations in real-time. Change any property below to see the effect on the preview."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          height={650}
          rows={[
            <AvakioLayout
              id='pg-mainLayout-row1'
              type="clean"
              borderless={true}
              height='50px'
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
                      style={{ overflowY: 'auto' }}
                      rows={[
                        isComponentMounted ? (
                        <AvakioCheckbox
                          ref={checkboxRef}
                          id={getPropValue('componentId', 'playground-checkbox')}
                          testId={getPropValue('testId', '') || undefined}
                          className={getPropValue('className', '') || undefined}
                          checked={playgroundChecked}
                          onChange={({ value }) => {
                            setPlaygroundChecked(value);
                            if (getPropValue('logOnChange', true)) addLog('onChange', `checked: ${value}`);
                          }}
                          // Content props
                          label={getPropValue('label', '')}
                          description={getPropValue('description', '')}
                          // Appearance props
                          size={getPropValue('size', 'md') as 'sm' | 'md'}
                          borderless={!getPropValue('showBorders', false)}
                          // Form props
                          name={getPropValue('name', '') || undefined}
                          value={getPropValue('value', '') || undefined}
                          // State props
                          disabled={getPropValue('disabled', false)}
                          readonly={getPropValue('readonly', false)}
                          indeterminate={getPropValue('indeterminate', false)}
                          hidden={getPropValue('hidden', false)}
                          // Validation props
                          required={getPropValue('required', false)}
                          invalid={getPropValue('invalid', false)}
                          error={getPropValue('error', '') || undefined}
                          invalidMessage={getPropValue('invalidMessage', '') || undefined}
                          // Misc props
                          tooltip={getPropValue('tooltip', '') || undefined}
                          // Layout props
                          minWidth={formatSizingValue(getPropValue('minWidth', ''))}
                          minHeight={formatSizingValue(getPropValue('minHeight', ''))}
                          maxWidth={formatSizingValue(getPropValue('maxWidth', ''))}
                          maxHeight={formatSizingValue(getPropValue('maxHeight', ''))}
                          margin={getPropValue('margin', '') ? getPropValue('margin', '').includes(',') ? getPropValue('margin', '').split(',').map(Number) as [number, number, number, number] : Number(getPropValue('margin', '')) : undefined}
                          padding={getPropValue('padding', '') ? getPropValue('padding', '').includes(',') ? getPropValue('padding', '').split(',').map(Number) as [number, number, number, number] : Number(getPropValue('padding', '')) : undefined}
                          style={(() => {
                            try {
                              const styleStr = getPropValue('style', '');
                              return styleStr ? JSON.parse(styleStr) : undefined;
                            } catch {
                              return undefined;
                            }
                          })()}
                          // Event handlers
                          onClick={() => {
                            if (getPropValue('logOnClick', true)) addLog('onClick', 'checkbox clicked');
                          }}
                          onFocus={() => {
                            if (getPropValue('logOnFocus', true)) addLog('onFocus', 'checkbox received focus');
                          }}
                          onBlur={() => {
                            if (getPropValue('logOnBlur', true)) addLog('onBlur', 'checkbox lost focus');
                          }}
                          onMouseEnter={() => {
                            if (getPropValue('logOnMouseEnter', false)) addLog('onMouseEnter', 'mouse entered checkbox');
                          }}
                          onMouseLeave={() => {
                            if (getPropValue('logOnMouseLeave', false)) addLog('onMouseLeave', 'mouse left checkbox');
                          }}
                          onKeyDown={(e) => {
                            if (getPropValue('logOnKeyDown', false)) addLog('onKeyDown', `key pressed: ${e.key}`);
                          }}
                          onKeyUp={(e) => {
                            if (getPropValue('logOnKeyUp', false)) addLog('onKeyUp', `key released: ${e.key}`);
                          }}
                          onAfterRender={() => {
                            if (getPropValue('logOnAfterRender', false)) addLog('onAfterRender', 'component rendered');
                          }}
                          onBeforeRender={() => {
                            if (getPropValue('logOnBeforeRender', false)) addLog('onBeforeRender', 'component rendering');
                          }}
                        />
                        ) : (
                          <div style={{ padding: '20px', textAlign: 'center', color: '#999' }}>
                            Component destroyed. Click "Recreate Component" to restore it.
                          </div>
                        )
                      ]}
                    />,
                    <AvakioTemplate
                      type="clean"
                      borderType="clean"
                      padding={[10, 0, 10, 0]}
                      content={<span>Value: <strong>{playgroundChecked ? 'true' : 'false'}</strong></span>}
                    />,
                    <AvakioTemplate
                      type="clean"
                      padding={[10, 0, 10, 0]}
                      borderType="clean"
                      content={<strong>Ref Methods</strong>}
                    />,
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
                                label='focus()'
                                margin={[0, 10, 10, 0]}
                                width='150px'
                                buttonWidth='120px'
                                onClick={() => {
                                  checkboxRef.current?.focus();
                                  addLog('focus()', 'called via ref');
                                }}
                              />
                              <AvakioButton
                                size="sm"
                                label='blur()'
                                margin={[0, 10, 10, 0]}
                                width='150px'
                                buttonWidth='120px'
                                onClick={() => {
                                  checkboxRef.current?.blur();
                                  addLog('blur()', 'called via ref');
                                }}
                              />
                              <AvakioButton
                                size="sm"
                                label='toggle()'
                                margin={[0, 10, 10, 0]}
                                width='150px'
                                buttonWidth='120px'
                                onClick={() => {
                                  checkboxRef.current?.toggle();
                                  addLog('toggle()', 'checkbox toggled via ref');
                                }}
                              />
                              <AvakioButton
                                size="sm"
                                label='check()'
                                margin={[0, 10, 10, 0]}
                                width='150px'
                                buttonWidth='120px'
                                onClick={() => {
                                  checkboxRef.current?.check();
                                  addLog('check()', 'checkbox checked via ref');
                                }}
                              />
                              <AvakioButton
                                size="sm"
                                label='uncheck()'
                                margin={[0, 10, 10, 0]}
                                width='150px'
                                buttonWidth='120px'
                                onClick={() => {
                                  checkboxRef.current?.uncheck();
                                  addLog('uncheck()', 'checkbox unchecked via ref');
                                }}
                              />
                              <AvakioButton
                                size="sm"
                                label='enable()'
                                margin={[0, 10, 10, 0]}
                                width='150px'
                                buttonWidth='120px'
                                onClick={() => {
                                  checkboxRef.current?.enable();
                                  addLog('enable()', 'checkbox enabled via ref');
                                }}
                              />
                              <AvakioButton
                                size="sm"
                                label='disable()'
                                margin={[0, 10, 10, 0]}
                                width='150px'
                                buttonWidth='120px'
                                onClick={() => {
                                  checkboxRef.current?.disable();
                                  addLog('disable()', 'checkbox disabled via ref');
                                }}
                              />
                              <AvakioButton
                                size="sm"
                                label='show()'
                                margin={[0, 10, 10, 0]}
                                width='150px'
                                buttonWidth='120px'
                                onClick={() => {
                                  checkboxRef.current?.show();
                                  addLog('show()', 'checkbox shown via ref');
                                }}
                              />
                              <AvakioButton
                                size="sm"
                                label='hide()'
                                margin={[0, 10, 10, 0]}
                                width='150px'
                                buttonWidth='120px'
                                onClick={() => {
                                  checkboxRef.current?.hide();
                                  addLog('hide()', 'checkbox hidden via ref');
                                }}
                              />
                              <AvakioButton
                                size="sm"
                                label='isEnabled()'
                                margin={[0, 10, 10, 0]}
                                width='150px'
                                buttonWidth='120px'
                                onClick={() => {
                                  const enabled = checkboxRef.current?.isEnabled();
                                  addLog('isEnabled()', `result: ${enabled}`);
                                }}
                              />
                              <AvakioButton
                                size="sm"
                                label='isVisible()'
                                margin={[0, 10, 10, 0]}
                                width='150px'
                                buttonWidth='120px'
                                onClick={() => {
                                  const visible = checkboxRef.current?.isVisible();
                                  addLog('isVisible()', `result: ${visible}`);
                                }}
                              />
                              <AvakioButton
                                size="sm"
                                label='isChecked()'
                                margin={[0, 10, 10, 0]}
                                width='150px'
                                buttonWidth='120px'
                                onClick={() => {
                                  const checked = checkboxRef.current?.isChecked();
                                  addLog('isChecked()', `result: ${checked}`);
                                }}
                              />
                              <AvakioButton
                                size="sm"
                                label='getValue()'
                                margin={[0, 10, 10, 0]}
                                width='150px'
                                buttonWidth='120px'
                                onClick={() => {
                                  const value = checkboxRef.current?.getValue();
                                  addLog('getValue()', `result: ${value}`);
                                }}
                              />
                              <AvakioButton
                                size="sm"
                                label='getText()'
                                margin={[0, 10, 10, 0]}
                                width='150px'
                                buttonWidth='120px'
                                onClick={() => {
                                  const text = checkboxRef.current?.getText();
                                  addLog('getText()', `result: "${text}"`);
                                }}
                              />
                              <AvakioButton
                                size="sm"
                                label='getElement()'
                                margin={[0, 10, 10, 0]}
                                width='150px'
                                buttonWidth='120px'
                                onClick={() => {
                                  const el = checkboxRef.current?.getElement();
                                  addLog('getElement()', `element: ${el?.tagName}`);
                                }}
                              />
                              <AvakioButton
                                size="sm"
                                label='validate()'
                                margin={[0, 10, 10, 0]}
                                width='150px'
                                buttonWidth='120px'
                                onClick={() => {
                                  const result = checkboxRef.current?.validate();
                                  addLog('validate()', `result: ${result}`);
                                }}
                              />
                              <AvakioButton
                                size="sm"
                                label='define()'
                                margin={[0, 10, 10, 0]}
                                width='150px'
                                buttonWidth='120px'
                                onClick={() => {
                                  checkboxRef.current?.define('disabled', true);
                                  addLog('define()', 'set disabled to true');
                                }}
                              />
                              <AvakioButton
                                size="sm"
                                label='setReadonly(true)'
                                margin={[0, 10, 10, 0]}
                                width='180px'
                                buttonWidth='150px'
                                onClick={() => {
                                  checkboxRef.current?.setReadonly(true);
                                  addLog('setReadonly()', 'set readonly to true');
                                }}
                              />
                              <AvakioButton
                                size="sm"
                                label='setReadonly(false)'
                                margin={[0, 10, 10, 0]}
                                width='180px'
                                buttonWidth='150px'
                                onClick={() => {
                                  checkboxRef.current?.setReadonly(false);
                                  addLog('setReadonly()', 'set readonly to false');
                                }}
                              />
                              <AvakioButton
                                size="sm"
                                label='isReadonly()'
                                margin={[0, 10, 10, 0]}
                                width='150px'
                                buttonWidth='120px'
                                onClick={() => {
                                  const readonly = checkboxRef.current?.isReadonly();
                                  addLog('isReadonly()', `readonly: ${readonly}`);
                                }}
                              />
                              <AvakioButton
                                size="sm"
                                label='setInvalid(true)'
                                margin={[0, 10, 10, 0]}
                                width='180px'
                                buttonWidth='150px'
                                onClick={() => {
                                  checkboxRef.current?.setInvalid(true);
                                  addLog('setInvalid()', 'set invalid to true');
                                }}
                              />
                              <AvakioButton
                                size="sm"
                                label='setInvalid(false)'
                                margin={[0, 10, 10, 0]}
                                width='180px'
                                buttonWidth='150px'
                                onClick={() => {
                                  checkboxRef.current?.setInvalid(false);
                                  addLog('setInvalid()', 'set invalid to false');
                                }}
                              />
                              <AvakioButton
                                size="sm"
                                label='isInvalid()'
                                margin={[0, 10, 10, 0]}
                                width='150px'
                                buttonWidth='120px'
                                onClick={() => {
                                  const invalid = checkboxRef.current?.isInvalid();
                                  addLog('isInvalid()', `invalid: ${invalid}`);
                                }}
                              />
                              <AvakioButton
                                size="sm"
                                label={isComponentMounted ? 'Destroy Component' : 'Recreate Component'}
                                margin={[0, 10, 10, 0]}
                                width='200px'
                                buttonWidth='170px'
                                onClick={() => {
                                  setIsComponentMounted(!isComponentMounted);
                                  addLog(isComponentMounted ? 'Destroy' : 'Recreate', isComponentMounted ? 'component unmounted' : 'component mounted');
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
                              { id: 'componentId', label: 'ID', type: 'text', value: 'playground-checkbox', group: 'Identity', placeholder: 'Component ID' },
                              { id: 'testId', label: 'Test ID', type: 'text', value: '', group: 'Identity', placeholder: 'Test ID for testing' },
                              { id: 'className', label: 'Class Name', type: 'text', value: '', group: 'Identity', placeholder: 'Additional CSS class' },
                              // Content Group
                              { id: 'label', label: 'Label', type: 'text', value: 'Accept Terms', group: 'Content', placeholder: 'Enter label text' },
                              { id: 'description', label: 'Description', type: 'text', value: 'I agree to the terms and conditions', group: 'Content', placeholder: 'Enter description text' },
                              // Appearance Group
                              { id: 'size', label: 'Size', type: 'select', value: 'md', group: 'Appearance', selectOptions: [{ id: 'sm', value: 'Small' }, { id: 'md', value: 'Medium' }] },
                              { id: 'showBorders', label: 'Show Borders', type: 'checkbox', value: false, group: 'Appearance', checkboxLabel: 'Show container border' },
                              // Layout Group
                              { id: 'minWidth', label: 'Min Width', type: 'text', value: '', group: 'Layout', placeholder: 'e.g. 100px' },
                              { id: 'minHeight', label: 'Min Height', type: 'text', value: '', group: 'Layout', placeholder: 'e.g. 38px' },
                              { id: 'maxWidth', label: 'Max Width', type: 'text', value: '', group: 'Layout', placeholder: 'e.g. 500px' },
                              { id: 'maxHeight', label: 'Max Height', type: 'text', value: '', group: 'Layout', placeholder: 'e.g. 100px' },
                              { id: 'margin', label: 'Margin', type: 'text', value: '', group: 'Layout', placeholder: 'e.g. 10 or 10,20,10,20' },
                              { id: 'padding', label: 'Padding', type: 'text', value: '', group: 'Layout', placeholder: 'e.g. 8 or 8,16,8,16' },
                              { id: 'style', label: 'Custom Style', type: 'text', value: '', group: 'Layout', placeholder: 'CSS object as JSON' },
                              // Form Group
                              { id: 'name', label: 'Name', type: 'text', value: '', group: 'Form', placeholder: 'Form field name' },
                              { id: 'value', label: 'Value', type: 'text', value: '', group: 'Form', placeholder: 'Form field value' },
                              { id: 'defaultChecked', label: 'Default Checked', type: 'checkbox', value: false, group: 'Form', checkboxLabel: 'Initial checked state (uncontrolled)' },
                              // State Group
                              { id: 'disabled', label: 'Disabled', type: 'checkbox', value: false, group: 'State', checkboxLabel: 'Disable the component' },
                              { id: 'indeterminate', label: 'Indeterminate', type: 'checkbox', value: false, group: 'State', checkboxLabel: 'Show indeterminate state' },
                              { id: 'hidden', label: 'Hidden', type: 'checkbox', value: false, group: 'State', checkboxLabel: 'Hide the component' },
                              // Validation Group
                              { id: 'required', label: 'Required', type: 'checkbox', value: false, group: 'Validation', checkboxLabel: 'Mark as required field' },
                              { id: 'error', label: 'Error Message', type: 'text', value: '', group: 'Validation', placeholder: 'Error message to display' },
                              // Events Group
                              { id: 'logOnChange', label: 'Log onChange', type: 'checkbox', value: true, group: 'Events', checkboxLabel: 'Log onChange events' },
                              { id: 'logOnClick', label: 'Log onClick', type: 'checkbox', value: true, group: 'Events', checkboxLabel: 'Log onClick events' },
                              { id: 'logOnFocus', label: 'Log onFocus', type: 'checkbox', value: true, group: 'Events', checkboxLabel: 'Log onFocus events' },
                              { id: 'logOnBlur', label: 'Log onBlur', type: 'checkbox', value: true, group: 'Events', checkboxLabel: 'Log onBlur events' },
                              { id: 'logOnMouseEnter', label: 'Log onMouseEnter', type: 'checkbox', value: false, group: 'Events', checkboxLabel: 'Log onMouseEnter events' },
                              { id: 'logOnMouseLeave', label: 'Log onMouseLeave', type: 'checkbox', value: false, group: 'Events', checkboxLabel: 'Log onMouseLeave events' },
                              { id: 'logOnKeyDown', label: 'Log onKeyDown', type: 'checkbox', value: false, group: 'Events', checkboxLabel: 'Log onKeyDown events' },
                              { id: 'logOnKeyUp', label: 'Log onKeyUp', type: 'checkbox', value: false, group: 'Events', checkboxLabel: 'Log onKeyUp events' },
                            ]);
                            setPlaygroundChecked(true);
                            setIsComponentMounted(true);
                            addLog('Reset', 'playground configuration reset to defaults');
                          }}
                        />
                      </>
                      }
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
        className="avakio-checkbox-demo-section"
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
              id="checkbox-props-table"
              data={propsData}
              filterable
              sortable
              columns={propsColumns}
              select={false}
              showRowNum={true}
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
              id="checkbox-events-table"
              data={eventsData}
              filterable
              sortable
              columns={propsColumns}
              select={false}
              showRowNum={true}
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
              key="ref-methods-table"
              id="checkbox-ref-methods-table"
              data={refMethodsData}
              filterable
              sortable
              columns={propsColumns}
              select={false}
              showRowNum={true}
            />,
          ]}
        />
      </section>
    </div>
  );
}

export default AvakioCheckboxExample;




















