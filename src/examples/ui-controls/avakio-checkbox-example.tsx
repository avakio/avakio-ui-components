import React, { useState, useRef } from 'react';
import { AvakioCheckbox } from '../../components/avakio/ui-controls/avakio-checkbox/avakio-checkbox';
import { AvakioTemplate } from '../../components/avakio/views/avakio-template/avakio-template';
import { AvakioLayout } from '../../components/avakio/layouts/avakio-layout/avakio-layout';
import { AvakioButton } from '../../components/avakio/ui-controls/avakio-button/avakio-button';
import { AvakioDataTable } from '../../components/avakio/data-presentation/avakio-datatable/AvakioDataTable';
import type { AvakioColumn } from '../../components/avakio/data-presentation/avakio-datatable/AvakioDataTable';
import { AvakioTabBar } from '../../components/avakio/ui-controls/avakio-tabbar/avakio-tabbar';
import { AvakioViewHeader } from '../../components/avakio/ui-widgets/avakio-view-header/avakio-view-header';
import { AvakioProperty, AvakioPropertyItem } from '../../components/avakio/data-presentation/avakio-property/avakio-property';
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
  
  // Playground property items for AvakioProperty
  const [playgroundProps, setPlaygroundProps] = useState<AvakioPropertyItem[]>([
    // Identity Group
    { id: 'componentId', label: 'ID', type: 'text', value: 'playground-checkbox', group: 'Identity', placeholder: 'Component ID' },
    { id: 'testId', label: 'Test ID', type: 'text', value: '', group: 'Identity', placeholder: 'Test ID for testing' },
    { id: 'className', label: 'Class Name', type: 'text', value: '', group: 'Identity', placeholder: 'Additional CSS class' },
    
    // Appearance Group
    { id: 'label', label: 'Label', type: 'text', value: 'Accept Terms', group: 'Appearance', placeholder: 'Enter label text' },
    { id: 'description', label: 'Description', type: 'text', value: 'I agree to the terms and conditions', group: 'Appearance', placeholder: 'Enter description text' },
    { id: 'error', label: 'Error Message', type: 'text', value: '', group: 'Appearance', placeholder: 'Error message to display' },
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
    
    // Sizing Group
    { id: 'minWidth', label: 'Min Width', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 200' },
    { id: 'minHeight', label: 'Min Height', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 30' },
    { id: 'margin', label: 'Margin', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 8 or 8,16,8,16' },
    { id: 'padding', label: 'Padding', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 8 or 8,16,8,16' },
    
    // State Group
    { id: 'disabled', label: 'Disabled', type: 'checkbox', value: false, group: 'State', checkboxLabel: 'Disable the component' },
    { id: 'indeterminate', label: 'Indeterminate', type: 'checkbox', value: false, group: 'State', checkboxLabel: 'Show indeterminate state' },
    { id: 'hidden', label: 'Hidden', type: 'checkbox', value: false, group: 'State', checkboxLabel: 'Hide the component' },
    
    // Validation Group
    { id: 'required', label: 'Required', type: 'checkbox', value: false, group: 'Validation', checkboxLabel: 'Mark as required field' },
    
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

  // Event log
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
    setEventLog(prev => [...prev.slice(-4), `${new Date().toLocaleTimeString()} - ${action}${details ? ': ' + details : ''}`]);
    addEventLog('Checkbox', action, details);
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
    { id: 1, name: 'checked', type: 'boolean', defaultValue: 'undefined', description: 'Controlled checked state of the checkbox', from: 'Checkbox' },
    { id: 2, name: 'defaultChecked', type: 'boolean', defaultValue: 'false', description: 'Initial checked state for uncontrolled mode', from: 'Checkbox' },
    { id: 3, name: 'indeterminate', type: 'boolean', defaultValue: 'false', description: 'Shows indeterminate state (partially checked)', from: 'Checkbox' },
    { id: 4, name: 'label', type: 'string', defaultValue: 'undefined', description: 'Label text displayed next to the checkbox', from: 'ControlLabel' },
    { id: 5, name: 'description', type: 'string', defaultValue: 'undefined', description: 'Additional description text below the label', from: 'Checkbox' },
    { id: 6, name: 'size', type: "'sm' | 'md'", defaultValue: "'md'", description: 'Size variant of the checkbox', from: 'Checkbox' },
    { id: 7, name: 'error', type: 'string', defaultValue: 'undefined', description: 'Error message to display below the checkbox', from: 'Checkbox' },
    { id: 8, name: 'required', type: 'boolean', defaultValue: 'false', description: 'Marks the checkbox as required (shows asterisk)', from: 'Checkbox' },
    { id: 9, name: 'onChange', type: '(checked: boolean) => void', defaultValue: 'undefined', description: 'Callback fired when checked state changes', from: 'Checkbox' },
    
    // Identity Props
    { id: 10, name: 'id', type: 'string', defaultValue: 'undefined', description: 'HTML id attribute for the input element', from: 'Base' },
    { id: 11, name: 'name', type: 'string', defaultValue: 'undefined', description: 'HTML name attribute for form submission', from: 'Checkbox' },
    { id: 12, name: 'value', type: 'string | number | readonly string[]', defaultValue: 'undefined', description: 'Value attribute for form submission', from: 'Checkbox' },
    { id: 13, name: 'testId', type: 'string', defaultValue: 'undefined', description: 'Test ID for testing purposes', from: 'Base' },
    { id: 14, name: 'className', type: 'string', defaultValue: 'undefined', description: 'Additional CSS class name', from: 'Base' },
    
    // State Props
    { id: 15, name: 'disabled', type: 'boolean', defaultValue: 'false', description: 'Whether the checkbox is disabled', from: 'Base' },
    { id: 16, name: 'hidden', type: 'boolean', defaultValue: 'false', description: 'Whether the component is hidden', from: 'Base' },
    { id: 17, name: 'borderless', type: 'boolean', defaultValue: 'false', description: 'Whether the component is borderless', from: 'Base' },
    
    // Sizing Props
    { id: 18, name: 'padding', type: 'string | number | [number, number, number, number]', defaultValue: 'undefined', description: 'Padding around the component', from: 'Base' },
    { id: 19, name: 'margin', type: 'string | number | [number, number, number, number]', defaultValue: 'undefined', description: 'Margin around the component', from: 'Base' },
    { id: 20, name: 'minWidth', type: 'string | number', defaultValue: 'undefined', description: 'Minimum width of the component', from: 'Base' },
    { id: 21, name: 'minHeight', type: 'string | number', defaultValue: 'undefined', description: 'Minimum height of the component', from: 'Base' },
    { id: 22, name: 'maxWidth', type: 'string | number', defaultValue: 'undefined', description: 'Maximum width of the component', from: 'Base' },
    { id: 23, name: 'maxHeight', type: 'string | number', defaultValue: 'undefined', description: 'Maximum height of the component', from: 'Base' },
    { id: 24, name: 'style', type: 'React.CSSProperties', defaultValue: 'undefined', description: 'Custom inline styles', from: 'Base' },
  ];

  const eventsData: PropDoc[] = [
    { id: 1, name: 'onChange', type: '(checked: boolean) => void', defaultValue: 'undefined', description: 'Fires when the checked state changes', from: 'Checkbox' },
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
                onChange={({ checked }) => {
                  setBasicChecked(checked);
                  addLog('onChange', `checked: ${checked}`);
                }}
                label="Checked checkbox"
              />
              <AvakioCheckbox
                checked={uncheckedDemo}
                onChange={({ checked }) => {
                  setUncheckedDemo(checked);
                  addLog('onChange', `checked: ${checked}`);
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
              onChange={({ checked }) => {
                setWithDescription(checked);
                addLog('onChange (with description)', `checked: ${checked}`);
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
                onChange={({ checked }) => {
                  const newState: Record<string, boolean> = {};
                  Object.keys(childOptions).forEach(key => {
                    newState[key] = checked;
                  });
                  setChildOptions(newState);
                  addLog('onChange (parent)', `set all to: ${checked}`);
                }}
                label="Enable all notifications"
              />
              <div className="avakio-checkbox-demo-nested">
                {Object.entries(childOptions).map(([key, value]) => (
                  <AvakioCheckbox
                    key={key}
                    checked={value}
                    size="sm"
                    onChange={({ checked }) => {
                      setChildOptions(prev => ({ ...prev, [key]: checked }));
                      addLog(`onChange (${key})`, `checked: ${checked}`);
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
                onChange={setSmallSizeChecked}
                size="sm"
                label="Small size (sm)"
              />
              <AvakioCheckbox
                checked={mediumSizeChecked}
                onChange={setMediumSizeChecked}
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
              onChange={({ checked }) => {
                setRequiredChecked(checked);
                addLog('onChange (required)', `checked: ${checked}`);
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
              onChange={({ checked }) => {
                setErrorChecked(checked);
                addLog('onChange (error)', `checked: ${checked}`);
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
          height={550}
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
                    <AvakioCheckbox
                      id={getPropValue('componentId', 'playground-checkbox')}
                      testId={getPropValue('testId', '') || undefined}
                      className={getPropValue('className', '') || undefined}
                      checked={playgroundChecked}
                      onChange={({ checked }) => {
                        setPlaygroundChecked(checked);
                        if (getPropValue('logOnChange', true)) addLog('onChange', `checked: ${checked}`);
                      }}
                      // Appearance props
                      label={getPropValue('label', '')}
                      description={getPropValue('description', '')}
                      error={getPropValue('error', '') || undefined}
                      size={getPropValue('size', 'md') as 'sm' | 'md'}
                      // State props
                      disabled={getPropValue('disabled', false)}
                      indeterminate={getPropValue('indeterminate', false)}
                      hidden={getPropValue('hidden', false)}
                      // Validation props
                      required={getPropValue('required', false)}
                      // Sizing props
                      minWidth={formatSizingValue(getPropValue('minWidth', ''))}
                      minHeight={formatSizingValue(getPropValue('minHeight', ''))}
                      // Margin & Padding
                      margin={getPropValue('margin', '') ? getPropValue('margin', '').includes(',') ? getPropValue('margin', '').split(',').map(Number) as [number, number, number, number] : Number(getPropValue('margin', '')) : undefined}
                      padding={getPropValue('padding', '') ? getPropValue('padding', '').includes(',') ? getPropValue('padding', '').split(',').map(Number) as [number, number, number, number] : Number(getPropValue('padding', '')) : undefined}
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
                      content={<strong>Quick Actions</strong>}
                    />,
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
                            label='Toggle'
                            margin={[0, 10, 10, 0]}
                            labelAlign='center'
                            width='150px'
                            buttonWidth='120px'
                            onClick={() => {
                              setPlaygroundChecked(prev => !prev);
                              addLog('Toggle', `checked: ${!playgroundChecked}`);
                            }}
                          />
                          <AvakioButton
                            size="sm"
                            label='Set Checked'
                            margin={[0, 10, 10, 0]}
                            labelAlign='center'
                            width='150px'
                            buttonWidth='120px'
                            onClick={() => {
                              setPlaygroundChecked(true);
                              addLog('Set Checked', 'true');
                            }}
                          />
                          <AvakioButton
                            size="sm"
                            label='Set Unchecked'
                            margin={[0, 10, 10, 0]}
                            labelAlign='center'
                            width='150px'
                            buttonWidth='120px'
                            onClick={() => {
                              setPlaygroundChecked(false);
                              addLog('Set Unchecked', 'false');
                            }}
                          />
                        </>
                      }
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
                            <AvakioButton
                              id='Button-reset-playground'
                              size="sm"
                              label="Reset"
                              align="right"
                              onClick={() => {
                                // Reset to initial values
                                setPlaygroundProps([
                                  // Identity Group
                                  { id: 'componentId', label: 'ID', type: 'text', value: 'playground-checkbox', group: 'Identity', placeholder: 'Component ID' },
                                  { id: 'testId', label: 'Test ID', type: 'text', value: '', group: 'Identity', placeholder: 'Test ID for testing' },
                                  { id: 'className', label: 'Class Name', type: 'text', value: '', group: 'Identity', placeholder: 'Additional CSS class' },
                                  // Appearance Group
                                  { id: 'label', label: 'Label', type: 'text', value: 'Accept Terms', group: 'Appearance', placeholder: 'Enter label text' },
                                  { id: 'description', label: 'Description', type: 'text', value: 'I agree to the terms and conditions', group: 'Appearance', placeholder: 'Enter description text' },
                                  { id: 'error', label: 'Error Message', type: 'text', value: '', group: 'Appearance', placeholder: 'Error message to display' },
                                  { id: 'size', label: 'Size', type: 'select', value: 'md', group: 'Appearance', selectOptions: [{ id: 'sm', value: 'Small' }, { id: 'md', value: 'Medium' }] },
                                  // Sizing Group
                                  { id: 'minWidth', label: 'Min Width', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 200' },
                                  { id: 'minHeight', label: 'Min Height', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 30' },
                                  { id: 'margin', label: 'Margin', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 8 or 8,16,8,16' },
                                  { id: 'padding', label: 'Padding', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 8 or 8,16,8,16' },
                                  // State Group
                                  { id: 'disabled', label: 'Disabled', type: 'checkbox', value: false, group: 'State', checkboxLabel: 'Disable the component' },
                                  { id: 'indeterminate', label: 'Indeterminate', type: 'checkbox', value: false, group: 'State', checkboxLabel: 'Show indeterminate state' },
                                  { id: 'hidden', label: 'Hidden', type: 'checkbox', value: false, group: 'State', checkboxLabel: 'Hide the component' },
                                  // Validation Group
                                  { id: 'required', label: 'Required', type: 'checkbox', value: false, group: 'Validation', checkboxLabel: 'Mark as required field' },
                                  // Events Group
                                  { id: 'logOnChange', label: 'Log onChange', type: 'checkbox', value: true, group: 'Events', checkboxLabel: 'Log onChange events' },
                                ]);
                                setPlaygroundChecked(true);
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
              columns={propsColumns}
              select={false}
              height={600}
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
              columns={propsColumns}
              select={false}
              height={100}
              showRowNum={true}
            />,
          ]}
        />
      </section>
    </div>
  );
}

export default AvakioCheckboxExample;




















