import React, { useState, useRef } from 'react';
import { AvakioColorPicker, AvakioColorPickerPreset } from '../../components/avakio/ui-controls/avakio-colorpicker/avakio-colorpicker';
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
  Palette,
  Settings2,
  Book,
  Play,
} from 'lucide-react';
import './avakio-colorpicker-example.css';

// Tab options for navigation
const TAB_OPTIONS = [
  { id: 'basic', label: 'Basic Usage', icon: <Palette size={14} /> },
  { id: 'options', label: 'Options', icon: <Settings2 size={14} /> },
  { id: 'playground', label: 'Interactive Playground', icon: <Play size={14} /> },
  { id: 'docs', label: 'Documentation', icon: <Book size={14} /> },
];

// Default presets
const DEFAULT_PRESETS: AvakioColorPickerPreset[] = [
  { label: 'Cyan', value: '#1ca1c1' },
  { label: 'Blue', value: '#3b82f6' },
  { label: 'Indigo', value: '#6366f1' },
  { label: 'Violet', value: '#8b5cf6' },
  { label: 'Emerald', value: '#10b981' },
  { label: 'Amber', value: '#f59e0b' },
  { label: 'Orange', value: '#f57c00' },
  { label: 'Red', value: '#ef4444' },
  { label: 'Gray', value: '#9ca3af' },
  { label: 'Dark', value: '#111827' },
];

// Custom presets for demo
const CUSTOM_PRESETS: AvakioColorPickerPreset[] = [
  { label: 'Sky', value: '#38bdf8' },
  { label: 'Purple', value: '#8b5cf6' },
  { label: 'Teal', value: '#14b8a6' },
  { label: 'Lime', value: '#84cc16' },
  { label: 'Rose', value: '#fb7185' },
  { label: 'Slate', value: '#475569' },
  { label: 'Gold', value: '#fbbf24' },
  { label: 'Coral', value: '#fb923c' },
  { label: 'Deep', value: '#0f172a' },
  { label: 'Ivory', value: '#f8fafc' },
];

export function AvakioColorPickerExample() {
  const [activeSection, setActiveSection] = useState<string | number | null>('basic');
  
  // Section refs for scroll navigation
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  
  // Demo state values
  const [basicColor, setBasicColor] = useState<string>('#1ca1c1');
  const [withLabelColor, setWithLabelColor] = useState<string>('#3b82f6');
  const [withDescriptionColor, setWithDescriptionColor] = useState<string>('#10b981');
  
  // Options section state
  const [customPresetsColor, setCustomPresetsColor] = useState<string>('#f57c00');
  const [noPresetsColor, setNoPresetsColor] = useState<string>('#6366f1');
  const [noPreviewColor, setNoPreviewColor] = useState<string>('#ef4444');
  const [noInputColor, setNoInputColor] = useState<string>('#f59e0b');
  const [requiredColor, setRequiredColor] = useState<string>('#8b5cf6');
  const [errorColor, setErrorColor] = useState<string>('#0f172a');
  const [disabledColor, setDisabledColor] = useState<string>('#9ca3af');
  const [readOnlyColor, setReadOnlyColor] = useState<string>('#14b8a6');
  
  // Playground state
  const [playgroundValue, setPlaygroundValue] = useState<string>('#1ca1c1');
  
  // Playground property items for AvakioProperty
  const [playgroundProps, setPlaygroundProps] = useState<AvakioPropertyItem[]>([
    // Identity Group
    { id: 'componentId', label: 'ID', type: 'text', value: 'playground-colorpicker', group: 'Identity', placeholder: 'Component ID' },
    { id: 'testId', label: 'Test ID', type: 'text', value: '', group: 'Identity', placeholder: 'Test ID for testing' },
    { id: 'className', label: 'Class Name', type: 'text', value: '', group: 'Identity', placeholder: 'Additional CSS class' },
    
    // Appearance Group
    { id: 'label', label: 'Label', type: 'text', value: 'Primary Color', group: 'Appearance', placeholder: 'Enter label text' },
    { id: 'description', label: 'Description', type: 'text', value: 'Choose your primary color', group: 'Appearance', placeholder: 'Enter description' },
    { id: 'error', label: 'Error Message', type: 'text', value: '', group: 'Appearance', placeholder: 'Error message to display' },
    
    // Features Group
    { id: 'showPreview', label: 'Show Preview', type: 'checkbox', value: true, group: 'Features', checkboxLabel: 'Show color preview swatch' },
    { id: 'allowCustomInput', label: 'Allow Custom Input', type: 'checkbox', value: true, group: 'Features', checkboxLabel: 'Allow hex input' },
    { id: 'useCustomPresets', label: 'Use Custom Presets', type: 'checkbox', value: false, group: 'Features', checkboxLabel: 'Use custom preset colors' },
    
    // Sizing Group
    { id: 'minWidth', label: 'Min Width', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 200 or 100%' },
    { id: 'minHeight', label: 'Min Height', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 100' },
    { id: 'maxWidth', label: 'Max Width', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 400' },
    { id: 'maxHeight', label: 'Max Height', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 300' },
    
    // State Group
    { id: 'disabled', label: 'Disabled', type: 'checkbox', value: false, group: 'State', checkboxLabel: 'Disable the component' },
    { id: 'readOnly', label: 'Read Only', type: 'checkbox', value: false, group: 'State', checkboxLabel: 'Make input read-only' },
    { id: 'hidden', label: 'Hidden', type: 'checkbox', value: false, group: 'State', checkboxLabel: 'Hide the component' },
    { id: 'borderless', label: 'Borderless', type: 'checkbox', value: false, group: 'State', checkboxLabel: 'Remove border' },
    
    // Validation Group
    { id: 'required', label: 'Required', type: 'checkbox', value: false, group: 'Validation', checkboxLabel: 'Mark as required field' },
    
    // Events Group (toggles to enable event logging)
    { id: 'logOnChange', label: 'Log onChange', type: 'checkbox', value: true, group: 'Events', checkboxLabel: 'Log onChange events' },
  ]);

  // Event log state
  const [eventLog, setEventLog] = useState<string[]>([]);

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
    addEventLog('ColorPicker', action, details);
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
    { id: 1, name: 'value', type: 'string', defaultValue: 'undefined', description: 'Current color value in hex format (e.g., #1ca1c1)', from: 'ColorPicker' },
    { id: 2, name: 'defaultValue', type: 'string', defaultValue: "'#1ca1c1'", description: 'Default color value when uncontrolled', from: 'ColorPicker' },
    { id: 3, name: 'onChange', type: '(color: string) => void', defaultValue: 'undefined', description: 'Callback when color value changes', from: 'ColorPicker' },
    { id: 4, name: 'label', type: 'string', defaultValue: 'undefined', description: 'Label text displayed above the picker', from: 'ControlLabel' },
    { id: 5, name: 'description', type: 'string', defaultValue: 'undefined', description: 'Description text displayed below the label', from: 'ControlLabel' },
    { id: 6, name: 'error', type: 'string', defaultValue: 'undefined', description: 'Error message to display in error state', from: 'ColorPicker' },
    { id: 7, name: 'presets', type: 'AvakioColorPickerPreset[]', defaultValue: '[]', description: 'Array of preset color swatches to display', from: 'ColorPicker' },
    { id: 8, name: 'showPreview', type: 'boolean', defaultValue: 'true', description: 'Show color preview swatch next to input', from: 'ColorPicker' },
    { id: 9, name: 'allowCustomInput', type: 'boolean', defaultValue: 'true', description: 'Allow manual hex input', from: 'ColorPicker' },
    
    // State Props
    { id: 10, name: 'disabled', type: 'boolean', defaultValue: 'false', description: 'Whether the component is disabled', from: 'Base' },
    { id: 11, name: 'readOnly', type: 'boolean', defaultValue: 'false', description: 'Whether the component is read-only', from: 'Base' },
    { id: 12, name: 'required', type: 'boolean', defaultValue: 'false', description: 'Mark the field as required', from: 'ColorPicker' },
    { id: 13, name: 'hidden', type: 'boolean', defaultValue: 'false', description: 'Whether the component is hidden', from: 'Base' },
    { id: 14, name: 'borderless', type: 'boolean', defaultValue: 'false', description: 'Remove component borders', from: 'Base' },
    
    // Identity Props
    { id: 15, name: 'id', type: 'string', defaultValue: 'undefined', description: 'Component ID', from: 'Base' },
    { id: 16, name: 'testId', type: 'string', defaultValue: 'undefined', description: 'Test ID for testing purposes', from: 'Base' },
    { id: 17, name: 'className', type: 'string', defaultValue: 'undefined', description: 'Additional CSS class name', from: 'Base' },
    { id: 18, name: 'style', type: 'React.CSSProperties', defaultValue: 'undefined', description: 'Custom inline styles', from: 'Base' },
    
    // Sizing Props
    { id: 19, name: 'minWidth', type: 'string | number', defaultValue: 'undefined', description: 'Minimum width of the component', from: 'Base' },
    { id: 20, name: 'minHeight', type: 'string | number', defaultValue: 'undefined', description: 'Minimum height of the component', from: 'Base' },
    { id: 21, name: 'maxWidth', type: 'string | number', defaultValue: 'undefined', description: 'Maximum width of the component', from: 'Base' },
    { id: 22, name: 'maxHeight', type: 'string | number', defaultValue: 'undefined', description: 'Maximum height of the component', from: 'Base' },
  ];

  const presetPropsData: PropDoc[] = [
    { id: 1, name: 'value', type: 'string', defaultValue: 'required', description: 'Hex color value (e.g., #1ca1c1)', from: 'ColorPicker' },
    { id: 2, name: 'label', type: 'string', defaultValue: 'undefined', description: 'Optional label for the preset color', from: 'ColorPicker' },
  ];

  const propsColumns: AvakioColumn<PropDoc>[] = [
    { id: 'name', header: 'Property', width: 180 },
    { id: 'type', header: 'Type', width: 280 },
    { id: 'defaultValue', header: 'Default', width: 100 },
    { id: 'description', header: 'Description', width: 350 },
    { id: 'from', header: 'From', width: 120, filterType: 'combo' },
  ];

  return (
    <div className="avakio-colorpicker-demo-container">
      {/* Sticky Header + Tab Navigation */}
      <div className="avakio-example-sticky-header">
        {/* Header */}
        <AvakioViewHeader
          label="UI Controls"
          title="ColorPicker"
          subTitle="A color picker component with preset swatches, native picker, hex input, and preview support."
          isSticky={false}
        />

        {/* Tab Navigation */}
        <div className="avakio-example-tabbar-container">
          <AvakioTabBar
            id="colorpicker-demo-tabs"
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
        className="avakio-colorpicker-demo-section"
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
          content="The ColorPicker provides a native color picker, hex input, and optional preset swatches."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioColorPicker
              value={basicColor}
              onChange={(color) => {
                setBasicColor(color);
                addLog('onChange', `value: ${color}`);
              }}
              presets={DEFAULT_PRESETS}
            />,
            <AvakioTemplate
              type="clean"
              borderType="clean"
              padding={[10, 0, 10, 0]}
              content={
                <>
                  Selected: <span style={{ display: 'inline-block', width: 16, height: 16, backgroundColor: basicColor, borderRadius: 3, border: '1px solid #ccc', verticalAlign: 'middle', marginRight: 6 }} />
                  <strong>{basicColor}</strong>
                </>
              }
            />,
          ]}
        />

        {/* With Label */}
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[16, 0, 0, 16]}
          content={<strong>With Label</strong>}
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="Add a label to describe the purpose of the color picker."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioColorPicker
              label="Primary Color"
              value={withLabelColor}
              onChange={(color) => {
                setWithLabelColor(color);
                addLog('onChange (with label)', `value: ${color}`);
              }}
              presets={DEFAULT_PRESETS}
            />,
            <AvakioTemplate
              type="clean"
              borderType="clean"
              padding={[10, 0, 10, 0]}
              content={
                <>
                  Selected: <span style={{ display: 'inline-block', width: 16, height: 16, backgroundColor: withLabelColor, borderRadius: 3, border: '1px solid #ccc', verticalAlign: 'middle', marginRight: 6 }} />
                  <strong>{withLabelColor}</strong>
                </>
              }
            />,
          ]}
        />

        {/* With Description */}
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[16, 0, 0, 16]}
          content={<strong>With Label and Description</strong>}
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="Add a description for additional context about the color selection."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioColorPicker
              label="Accent Color"
              description="Used for buttons and interactive elements"
              value={withDescriptionColor}
              onChange={(color) => {
                setWithDescriptionColor(color);
                addLog('onChange (with description)', `value: ${color}`);
              }}
              presets={DEFAULT_PRESETS}
            />,
            <AvakioTemplate
              type="clean"
              borderType="clean"
              padding={[10, 0, 10, 0]}
              content={
                <>
                  Selected: <span style={{ display: 'inline-block', width: 16, height: 16, backgroundColor: withDescriptionColor, borderRadius: 3, border: '1px solid #ccc', verticalAlign: 'middle', marginRight: 6 }} />
                  <strong>{withDescriptionColor}</strong>
                </>
              }
            />,
          ]}
        />
      </section>

      {/* Options Section */}
      <section 
        ref={(el) => { sectionRefs.current['options'] = el; }}
        className="avakio-colorpicker-demo-section"
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
          content="Customize the ColorPicker with various options like custom presets, validation states, and display modes."
        />

        {/* Custom Presets */}
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioTemplate
              key="presets-title"
              type="clean"
              borderType="clean"
              content={<strong>Custom Presets</strong>}
            />,
            <AvakioTemplate
              key="presets-desc"
              type="clean"
              borderType="clean"
              padding={[8, 0, 0, 0]}
              content="Provide your own set of preset colors using the presets prop."
            />,
            <AvakioColorPicker
              label="Brand Colors"
              description="Select from brand-approved colors"
              value={customPresetsColor}
              onChange={(color) => {
                setCustomPresetsColor(color);
                addLog('onChange (custom presets)', `value: ${color}`);
              }}
              presets={CUSTOM_PRESETS}
            />,
          ]}
        />

        {/* No Presets */}
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioTemplate
              key="no-presets-title"
              type="clean"
              borderType="clean"
              content={<strong>No Presets</strong>}
            />,
            <AvakioTemplate
              key="no-presets-desc"
              type="clean"
              borderType="clean"
              padding={[8, 0, 0, 0]}
              content="Set presets to an empty array to hide preset swatches."
            />,
            <AvakioColorPicker
              label="Custom Color"
              value={noPresetsColor}
              onChange={(color) => {
                setNoPresetsColor(color);
                addLog('onChange (no presets)', `value: ${color}`);
              }}
              presets={[]}
            />,
          ]}
        />

        {/* No Preview */}
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioTemplate
              key="no-preview-title"
              type="clean"
              borderType="clean"
              content={<strong>No Preview Swatch</strong>}
            />,
            <AvakioTemplate
              key="no-preview-desc"
              type="clean"
              borderType="clean"
              padding={[8, 0, 0, 0]}
              content="Set showPreview={false} to hide the color preview swatch."
            />,
            <AvakioColorPicker
              label="Color (No Preview)"
              value={noPreviewColor}
              onChange={(color) => {
                setNoPreviewColor(color);
                addLog('onChange (no preview)', `value: ${color}`);
              }}
              presets={DEFAULT_PRESETS}
              showPreview={false}
            />,
          ]}
        />

        {/* No Custom Input */}
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioTemplate
              key="no-input-title"
              type="clean"
              borderType="clean"
              content={<strong>No Custom Input</strong>}
            />,
            <AvakioTemplate
              key="no-input-desc"
              type="clean"
              borderType="clean"
              padding={[8, 0, 0, 0]}
              content="Set allowCustomInput={false} to hide the hex input field."
            />,
            <AvakioColorPicker
              label="Color (Picker Only)"
              value={noInputColor}
              onChange={(color) => {
                setNoInputColor(color);
                addLog('onChange (no input)', `value: ${color}`);
              }}
              presets={DEFAULT_PRESETS}
              allowCustomInput={false}
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
              style={{ fontSize: '12px' }}
              content='required={true}'
            />,
            <AvakioColorPicker
              label="Theme Color"
              value={requiredColor}
              onChange={(color) => {
                setRequiredColor(color);
                addLog('onChange (required)', `value: ${color}`);
              }}
              presets={DEFAULT_PRESETS}
              required
            />,
            <AvakioTemplate
              key="error-label"
              type="clean"
              borderType="clean"
              margin={[16, 0, 8, 0]}
              style={{ fontSize: '12px' }}
              content='error="Too dark for accent"'
            />,
            <AvakioColorPicker
              label="Accent Color"
              description="Pick a bright accent color"
              value={errorColor}
              onChange={(color) => {
                setErrorColor(color);
                addLog('onChange (error)', `value: ${color}`);
              }}
              presets={DEFAULT_PRESETS}
              error={errorColor.toLowerCase() === '#0f172a' ? 'Too dark for accent' : undefined}
            />,
          ]}
        />

        {/* Disabled & Read-Only */}
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
              style={{ fontSize: '12px' }}
              content='disabled={true}'
            />,
            <AvakioColorPicker
              label="Disabled Color"
              description="This field is disabled for illustration"
              value={disabledColor}
              onChange={setDisabledColor}
              presets={DEFAULT_PRESETS}
              disabled
            />,
            <AvakioTemplate
              key="readonly-label"
              type="clean"
              borderType="clean"
              margin={[16, 0, 8, 0]}
              style={{ fontSize: '12px' }}
              content='readOnly={true}'
            />,
            <AvakioColorPicker
              label="Read-Only Color"
              description="This field is read-only"
              value={readOnlyColor}
              onChange={setReadOnlyColor}
              presets={DEFAULT_PRESETS}
              readOnly
            />,
          ]}
        />
      </section>

      {/* Interactive Playground Section */}
      <section 
        ref={(el) => { sectionRefs.current['playground'] = el; }}
        className="avakio-colorpicker-demo-section"
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
          content="Experiment with different ColorPicker configurations in real-time. Change any property below to see the effect on the preview."
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
                      padding={[0, 0, 10, 0]}
                      content={<span><strong>Preview</strong></span>}
                    />,
                    <AvakioColorPicker
                      id={getPropValue('componentId', 'playground-colorpicker')}
                      testId={getPropValue('testId', '') || undefined}
                      className={getPropValue('className', '') || undefined}
                      value={playgroundValue}
                      onChange={(color) => {
                        setPlaygroundValue(color);
                        if (getPropValue('logOnChange', true)) addLog('onChange', `value: ${color}`);
                      }}
                      // Appearance props
                      label={getPropValue('label', '')}
                      description={getPropValue('description', '')}
                      error={getPropValue('error', '') || undefined}
                      // Features props
                      showPreview={getPropValue('showPreview', true)}
                      allowCustomInput={getPropValue('allowCustomInput', true)}
                      presets={getPropValue('useCustomPresets', false) ? CUSTOM_PRESETS : DEFAULT_PRESETS}
                      // Sizing props
                      minWidth={formatSizingValue(getPropValue('minWidth', ''))}
                      minHeight={formatSizingValue(getPropValue('minHeight', ''))}
                      maxWidth={formatSizingValue(getPropValue('maxWidth', ''))}
                      maxHeight={formatSizingValue(getPropValue('maxHeight', ''))}
                      // State props
                      disabled={getPropValue('disabled', false)}
                      readOnly={getPropValue('readOnly', false)}
                      hidden={getPropValue('hidden', false)}
                      borderless={getPropValue('borderless', false)}
                      // Validation props
                      required={getPropValue('required', false)}
                    />,
                    <AvakioTemplate
                      type="clean"
                      borderType="clean"
                      padding={[10, 0, 10, 0]}
                      content={
                        <span>
                          Value: <span style={{ display: 'inline-block', width: 16, height: 16, backgroundColor: playgroundValue, borderRadius: 3, border: '1px solid #ccc', verticalAlign: 'middle', marginRight: 6 }} />
                          <strong>{playgroundValue}</strong>
                        </span>
                      }
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
                            label='Set Red'
                            margin={[0, 10, 10, 0]}
                            labelAlign='center'
                            width='150px'
                            buttonWidth='120px'
                            onClick={() => {
                              setPlaygroundValue('#ef4444');
                              addLog('setValue()', 'set to #ef4444 (Red)');
                            }}
                          />
                          <AvakioButton
                            size="sm"
                            label='Set Blue'
                            margin={[0, 10, 10, 0]}
                            labelAlign='center'
                            width='150px'
                            buttonWidth='120px'
                            onClick={() => {
                              setPlaygroundValue('#3b82f6');
                              addLog('setValue()', 'set to #3b82f6 (Blue)');
                            }}
                          />
                          <AvakioButton
                            size="sm"
                            label='Set Green'
                            margin={[0, 10, 10, 0]}
                            labelAlign='center'
                            width='150px'
                            buttonWidth='120px'
                            onClick={() => {
                              setPlaygroundValue('#10b981');
                              addLog('setValue()', 'set to #10b981 (Green)');
                            }}
                          />
                          <AvakioButton
                            size="sm"
                            label='Random Color'
                            margin={[0, 10, 10, 0]}
                            labelAlign='center'
                            width='150px'
                            buttonWidth='120px'
                            onClick={() => {
                              const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
                              setPlaygroundValue(randomColor);
                              addLog('setValue()', `set to ${randomColor} (Random)`);
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
                                  { id: 'componentId', label: 'ID', type: 'text', value: 'playground-colorpicker', group: 'Identity', placeholder: 'Component ID' },
                                  { id: 'testId', label: 'Test ID', type: 'text', value: '', group: 'Identity', placeholder: 'Test ID for testing' },
                                  { id: 'className', label: 'Class Name', type: 'text', value: '', group: 'Identity', placeholder: 'Additional CSS class' },
                                  // Appearance Group
                                  { id: 'label', label: 'Label', type: 'text', value: 'Primary Color', group: 'Appearance', placeholder: 'Enter label text' },
                                  { id: 'description', label: 'Description', type: 'text', value: 'Choose your primary color', group: 'Appearance', placeholder: 'Enter description' },
                                  { id: 'error', label: 'Error Message', type: 'text', value: '', group: 'Appearance', placeholder: 'Error message to display' },
                                  // Features Group
                                  { id: 'showPreview', label: 'Show Preview', type: 'checkbox', value: true, group: 'Features', checkboxLabel: 'Show color preview swatch' },
                                  { id: 'allowCustomInput', label: 'Allow Custom Input', type: 'checkbox', value: true, group: 'Features', checkboxLabel: 'Allow hex input' },
                                  { id: 'useCustomPresets', label: 'Use Custom Presets', type: 'checkbox', value: false, group: 'Features', checkboxLabel: 'Use custom preset colors' },
                                  // Sizing Group
                                  { id: 'minWidth', label: 'Min Width', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 200 or 100%' },
                                  { id: 'minHeight', label: 'Min Height', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 100' },
                                  { id: 'maxWidth', label: 'Max Width', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 400' },
                                  { id: 'maxHeight', label: 'Max Height', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 300' },
                                  // State Group
                                  { id: 'disabled', label: 'Disabled', type: 'checkbox', value: false, group: 'State', checkboxLabel: 'Disable the component' },
                                  { id: 'readOnly', label: 'Read Only', type: 'checkbox', value: false, group: 'State', checkboxLabel: 'Make input read-only' },
                                  { id: 'hidden', label: 'Hidden', type: 'checkbox', value: false, group: 'State', checkboxLabel: 'Hide the component' },
                                  { id: 'borderless', label: 'Borderless', type: 'checkbox', value: false, group: 'State', checkboxLabel: 'Remove border' },
                                  // Validation Group
                                  { id: 'required', label: 'Required', type: 'checkbox', value: false, group: 'Validation', checkboxLabel: 'Mark as required field' },
                                  // Events Group
                                  { id: 'logOnChange', label: 'Log onChange', type: 'checkbox', value: true, group: 'Events', checkboxLabel: 'Log onChange events' },
                                ]);
                                setPlaygroundValue('#1ca1c1');
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
        className="avakio-colorpicker-demo-section"
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
              id="colorpicker-props-table"
              data={propsData}
              columns={propsColumns}
              select={false}
              height={600}
              showRowNum={true}
            />,
          ]}
        />

        {/* Preset Props Table */}
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[24, 0, 0, 16]}
          content={<strong>AvakioColorPickerPreset Props</strong>}
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={0}
          rows={[
            <AvakioDataTable<PropDoc>
              key="preset-props-table"
              id="colorpicker-preset-props-table"
              data={presetPropsData}
              columns={propsColumns}
              select={false}
              height={150}
              showRowNum={true}
            />,
          ]}
        />
      </section>
    </div>
  );
}

export default AvakioColorPickerExample;



















