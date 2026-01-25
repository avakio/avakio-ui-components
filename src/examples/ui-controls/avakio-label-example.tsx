import React, { useState, useRef } from 'react';
import { AvakioLabel, AvakioLabelRef } from '../../components/avakio/ui-controls/avakio-label/avakio-label';
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
  Type,
  Settings2,
  Play,
  Book,
} from 'lucide-react';
import './avakio-label-example.css';

// Tab options for navigation
const TAB_OPTIONS = [
  { id: 'basic', label: 'Basic Usage', icon: <Type size={14} /> },
  { id: 'options', label: 'Options', icon: <Settings2 size={14} /> },
  { id: 'playground', label: 'Interactive Playground', icon: <Play size={14} /> },
  { id: 'docs', label: 'Documentation', icon: <Book size={14} /> },
];

export function AvakioLabelExample() {
  const [activeSection, setActiveSection] = useState<string | number | null>('basic');
  
  // Section refs for scroll navigation
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  
  // Playground state
  const [playgroundValue, setPlaygroundValue] = useState<string>('Sample Label Text');
  const [isComponentMounted, setIsComponentMounted] = useState<boolean>(true);
  
  // Playground property items for AvakioProperty
  const [playgroundProps, setPlaygroundProps] = useState<AvakioPropertyItem[]>([
    // Identity Group
    { id: 'componentId', label: 'ID', type: 'text', value: 'playground-label', group: 'Identity', placeholder: 'Component ID' },
    { id: 'testId', label: 'Test ID', type: 'text', value: '', group: 'Identity', placeholder: 'Test ID for testing' },
    { id: 'className', label: 'Class Name', type: 'text', value: '', group: 'Identity', placeholder: 'Additional CSS class' },
    
    // Content Group
    { id: 'text', label: 'Text', type: 'text', value: 'Sample Label Text', group: 'Content', placeholder: 'Label text content' },
    { id: 'html', label: 'HTML Content', type: 'text', value: '', group: 'Content', placeholder: 'e.g. <strong>Bold</strong> text' },
    { id: 'tooltip', label: 'Tooltip', type: 'text', value: '', group: 'Content', placeholder: 'Tooltip text' },
    
    // ControlLabel Props
    { id: 'label', label: 'Label', type: 'text', value: '', group: 'ControlLabel', placeholder: 'Styled label text' },
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
    
    // Appearance Group
    { id: 'align', label: 'Align', type: 'select', value: 'left', group: 'Appearance', selectOptions: [
      { id: 'left', value: 'Left' },
      { id: 'center', value: 'Center' },
      { id: 'right', value: 'Right' },
    ]},
    { id: 'style', label: 'Style (JSON)', type: 'text', value: '', group: 'Appearance', placeholder: 'e.g. {"color":"red"}' },
    
    // Sizing Group
    { id: 'width', label: 'Width', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 300 or 100%' },
    { id: 'height', label: 'Height', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 38' },
    { id: 'minWidth', label: 'Min Width', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 200' },
    { id: 'maxWidth', label: 'Max Width', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 500' },
    { id: 'minHeight', label: 'Min Height', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 30' },
    { id: 'maxHeight', label: 'Max Height', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 100' },
    { id: 'margin', label: 'Margin', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 8 or 8,16,8,16' },
    { id: 'padding', label: 'Padding', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 8 or 8,16,8,16' },
    { id: 'bottomPadding', label: 'Bottom Padding', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 10' },
    
    // State Group
    { id: 'hidden', label: 'Hidden', type: 'checkbox', value: false, group: 'State', checkboxLabel: 'Hide the component' },
    { id: 'disabled', label: 'Disabled', type: 'checkbox', value: false, group: 'State', checkboxLabel: 'Disable the component' },
    { id: 'borderless', label: 'Borderless', type: 'checkbox', value: true, group: 'State', checkboxLabel: 'Hide component borders' },

    // Events Group (toggles to enable event logging)
    { id: 'logOnBeforeRender', label: 'Log onBeforeRender', type: 'checkbox', value: false, group: 'Events', checkboxLabel: 'Log onBeforeRender events' },
    { id: 'logOnAfterRender', label: 'Log onAfterRender', type: 'checkbox', value: false, group: 'Events', checkboxLabel: 'Log onAfterRender events' },
    { id: 'logOnViewShow', label: 'Log onViewShow', type: 'checkbox', value: false, group: 'Events', checkboxLabel: 'Log onViewShow events' },
    { id: 'logOnItemClick', label: 'Log onItemClick', type: 'checkbox', value: false, group: 'Events', checkboxLabel: 'Log onItemClick events' },
    { id: 'logOnViewResize', label: 'Log onViewResize', type: 'checkbox', value: false, group: 'Events', checkboxLabel: 'Log onViewResize events' },
    { id: 'logOnAfterScroll', label: 'Log onAfterScroll', type: 'checkbox', value: false, group: 'Events', checkboxLabel: 'Log onAfterScroll events' },
  ]);

  // Helper to get prop value from playground props
  const getPropValue = React.useCallback(<T,>(propId: string, defaultValue: T): T => {
    const prop = playgroundProps.find(p => p.id === propId);
    if (prop?.value === undefined || prop?.value === null || prop?.value === '') return defaultValue;
    return prop.value as T;
  }, [playgroundProps]);

  // Add to local event log and global event log (must be above all usages)
  const addLog = React.useCallback((action: string, details: string = '') => {
    setEventLog(prev => [...prev.slice(-4), `${new Date().toLocaleTimeString()} - ${action}${details ? ': ' + details : ''}`]);
    addEventLog('Label', action, details);
  }, []);

  // Handle property changes (update state only, no logging)
  const handlePlaygroundPropsChange = (items: AvakioPropertyItem[], changed: AvakioPropertyItem) => {
    setPlaygroundProps(items);
  };

  // Ref example
  const labelRef = useRef<AvakioLabelRef>(null);
  const propertyRef = useRef<AvakioPropertyRef>(null);
  const [eventLog, setEventLog] = useState<string[]>([]);



  // Event handlers for AvakioLabel events
  const handleBeforeRender = React.useCallback(() => {
    if (getPropValue('logOnBeforeRender', false)) addLog('onBeforeRender');
  }, [getPropValue, addLog]);
  const handleAfterRender = React.useCallback(() => {
    if (getPropValue('logOnAfterRender', false)) addLog('onAfterRender');
  }, [getPropValue, addLog]);

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


  // Add textOnBlur handlers to text fields after addLog is defined
  React.useEffect(() => {
    setPlaygroundProps(prev => prev.map(item => {
      if (item.type === 'text' && ['componentId', 'testId', 'className', 'text', 'html', 'tooltip', 'label', 'labelForm', 'labelWidth', 'bottomLabel', 'invalidMessage', 'style', 'width', 'height', 'minWidth', 'maxWidth', 'minHeight', 'maxHeight', 'margin', 'padding', 'bottomPadding'].includes(item.id)) {
        return {
          ...item,
          textOnBlur: (value: string, itm: AvakioPropertyItem) => addLog('Playground prop changed', `${itm.label}: ${value}`)
        };
      }
      return item;
    }));
  }, [addLog]);

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
    { id: 1, name: 'text', type: 'string', defaultValue: "''", description: 'The text content of the label', from: 'Label' },
    { id: 2, name: 'html', type: 'string', defaultValue: 'undefined', description: 'Custom HTML content (overrides text if provided)', from: 'Label' },
    
    // ControlLabel Props
    { id: 3, name: 'labelForm', type: 'string', defaultValue: 'undefined', description: 'Plain text form label displayed above the component', from: 'ControlLabel' },
    { id: 4, name: 'bottomLabel', type: 'string', defaultValue: 'undefined', description: 'Help text displayed below the component', from: 'ControlLabel' },
    { id: 5, name: 'label', type: 'string', defaultValue: 'undefined', description: 'Styled label text (with background color)', from: 'ControlLabel' },
    { id: 6, name: 'labelPosition', type: "'left' | 'top' | 'right' | 'bottom'", defaultValue: "'left'", description: 'Position of the styled label', from: 'ControlLabel' },
    { id: 7, name: 'labelAlign', type: "'left' | 'center' | 'right'", defaultValue: "'left'", description: 'Alignment of the label text', from: 'ControlLabel' },
    { id: 8, name: 'labelWidth', type: 'number | string', defaultValue: '100', description: 'Width of the label', from: 'ControlLabel' },
    { id: 9, name: 'required', type: 'boolean', defaultValue: 'false', description: 'Marks the field as required (shows asterisk)', from: 'ControlLabel' },
    { id: 10, name: 'invalid', type: 'boolean', defaultValue: 'false', description: 'Marks the component as invalid', from: 'ControlLabel' },
    { id: 11, name: 'invalidMessage', type: 'string', defaultValue: 'undefined', description: 'Sets the text of a validation message', from: 'ControlLabel' },
    { id: 12, name: 'bottomPadding', type: 'number | string', defaultValue: 'undefined', description: 'Padding at the bottom of the component', from: 'Base' },
    
    // Base Props - Appearance
    { id: 13, name: 'align', type: "'left' | 'center' | 'right'", defaultValue: "'left'", description: 'Alignment of the label content', from: 'Base' },
    { id: 14, name: 'tooltip', type: 'string', defaultValue: 'undefined', description: 'Tooltip text shown on hover', from: 'Base' },
    
    // Base Props - Sizing
    { id: 15, name: 'width', type: 'number | string', defaultValue: 'undefined', description: 'Width of the component', from: 'Base' },
    { id: 16, name: 'height', type: 'number | string', defaultValue: 'undefined', description: 'Height of the component', from: 'Base' },
    { id: 17, name: 'minWidth', type: 'number | string', defaultValue: 'undefined', description: 'Minimum width of the component', from: 'Base' },
    { id: 18, name: 'maxWidth', type: 'number | string', defaultValue: 'undefined', description: 'Maximum width of the component', from: 'Base' },
    { id: 19, name: 'minHeight', type: 'number | string', defaultValue: 'undefined', description: 'Minimum height of the component', from: 'Base' },
    { id: 20, name: 'maxHeight', type: 'number | string', defaultValue: 'undefined', description: 'Maximum height of the component', from: 'Base' },
    { id: 21, name: 'margin', type: 'number | string | [number, number, number, number]', defaultValue: 'undefined', description: 'Margin around the component', from: 'Base' },
    { id: 22, name: 'padding', type: 'number | string | [number, number, number, number]', defaultValue: 'undefined', description: 'Padding inside the component', from: 'Base' },
    
    // Base Props - State
    { id: 23, name: 'hidden', type: 'boolean', defaultValue: 'false', description: 'Whether the component is hidden', from: 'Base' },
    { id: 24, name: 'disabled', type: 'boolean', defaultValue: 'false', description: 'Disables the component (reduces opacity and changes text to muted color)', from: 'Base' },
    { id: 25, name: 'borderless', type: 'boolean', defaultValue: 'true', description: 'Hides the component border and padding', from: 'Base' },
    
    // Base Props - Identity
    { id: 26, name: 'id', type: 'string', defaultValue: 'undefined', description: 'Component ID', from: 'Base' },
    { id: 27, name: 'testId', type: 'string', defaultValue: 'undefined', description: 'Test ID for testing purposes', from: 'Base' },
    { id: 28, name: 'className', type: 'string', defaultValue: 'undefined', description: 'Additional CSS class name', from: 'Base' },
    { id: 29, name: 'style', type: 'React.CSSProperties', defaultValue: 'undefined', description: 'Custom inline styles for the root element', from: 'Base' },
  ];

  const eventsData: PropDoc[] = [
    { id: 1, name: 'onBeforeRender', type: '() => void', defaultValue: 'undefined', description: 'Occurs immediately before the component has been rendered', from: 'Base' },
    { id: 2, name: 'onAfterRender', type: '() => void', defaultValue: 'undefined', description: 'Occurs immediately after the component has been rendered', from: 'Base' },
    { id: 3, name: 'onViewShow', type: '() => void', defaultValue: 'undefined', description: 'Fires when the view becomes visible (hidden → visible transition)', from: 'Base' },
    { id: 4, name: 'onItemClick', type: '(event: React.MouseEvent) => void', defaultValue: 'undefined', description: 'Fires after the control has been clicked', from: 'Base' },
    { id: 5, name: 'onViewResize', type: '(width: number, height: number) => void', defaultValue: 'undefined', description: 'Fires when the component is resized', from: 'Base' },
    { id: 6, name: 'onAfterScroll', type: '(scrollTop: number, scrollLeft: number) => void', defaultValue: 'undefined', description: 'Occurs when the view has been scrolled', from: 'Base' },
  ];

  const refMethodsData: PropDoc[] = [
    { id: 1, name: 'getValue()', type: '() => string | undefined', defaultValue: '-', description: 'Returns the current text value', from: 'Base' },
    { id: 2, name: 'setValue(value)', type: '(value: string) => void', defaultValue: '-', description: 'Sets a new text value', from: 'Base' },
    { id: 3, name: 'getText()', type: '() => string', defaultValue: '-', description: 'Gets actual text value from the control', from: 'Base' },
    { id: 4, name: 'setText(text)', type: '(text: string) => void', defaultValue: '-', description: 'Sets the label text content (clears HTML)', from: 'Label' },
    { id: 5, name: 'setHTML(html)', type: '(html: string) => void', defaultValue: '-', description: 'Sets HTML content for the label', from: 'Label' },
    { id: 6, name: 'focus()', type: '() => void', defaultValue: '-', description: 'Sets focus to the control', from: 'Base' },
    { id: 7, name: 'blur()', type: '() => void', defaultValue: '-', description: 'Removes focus from the control', from: 'Base' },
    { id: 8, name: 'validate()', type: '() => boolean | string', defaultValue: '-', description: 'Validates the component (always returns true for labels)', from: 'Base' },
    { id: 9, name: 'isEnabled()', type: '() => boolean', defaultValue: '-', description: 'Checks whether the component is enabled', from: 'Base' },
    { id: 10, name: 'enable()', type: '() => void', defaultValue: '-', description: 'Enables the component that was disabled', from: 'Base' },
    { id: 11, name: 'disable()', type: '() => void', defaultValue: '-', description: 'Disables the component (makes it dimmed)', from: 'Base' },
    { id: 12, name: 'isVisible()', type: '() => boolean', defaultValue: '-', description: 'Checks whether the component is visible', from: 'Base' },
    { id: 13, name: 'show()', type: '() => void', defaultValue: '-', description: 'Makes the component visible', from: 'Base' },
    { id: 14, name: 'hide()', type: '() => void', defaultValue: '-', description: 'Hides the component', from: 'Base' },
    { id: 15, name: 'getElement()', type: '() => HTMLElement | null', defaultValue: '-', description: 'Returns the root DOM element of the component', from: 'Base' },
    { id: 16, name: 'getParentView()', type: '() => string | null', defaultValue: '-', description: 'Returns the ID of the parent Avakio container, or its classname if no ID is set', from: 'Base' },
    { id: 17, name: 'define(config, value?)', type: '(config: Partial<Props> | string, value?: unknown) => void', defaultValue: '-', description: 'Redefines a single configuration property or multiple properties', from: 'Base' },
  ];

  const propsColumns: AvakioColumn<PropDoc>[] = [
    { id: 'name', header: 'Property', width: 180 },
    { id: 'type', header: 'Type', width: 320 },
    { id: 'defaultValue', header: 'Default', width: 100 },
    { id: 'from', header: 'From', width: 100, filterType: 'combo' },
    { id: 'description', header: 'Description', width: 320 },
  ];

  return (
    <div className="avakio-label-demo-container">
      {/* Sticky Header + Tab Navigation */}
      <div className="avakio-example-sticky-header">
        {/* Header */}
        <AvakioViewHeader
          label="UI Controls"
          title="Label"
          subTitle="A purely presentational component for displaying static text and HTML content with full Base component features (sizing, alignment, state management) but no interactive events."
          isSticky={false}
        />

        {/* Tab Navigation */}
        <div className="avakio-example-tabbar-container">
          <AvakioTabBar
            id="label-demo-tabs"
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
        className="avakio-label-demo-section"
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
          content="The Label component is a lightweight presentational component for displaying static text or HTML content. It inherits Base component functionality including sizing, alignment, and state management, but does not support interactive events."
        />
        
        {/* Simple Labels */}
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[16, 0, 0, 16]}
          content={<strong>Simple Labels</strong>}
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioLabel              
              labelForm="Simple label text"
            />,
            <AvakioLabel
              padding={'20px'}
              label="Label with custom width"
              labelWidth="auto"
            />,
            <AvakioLabel
              text="Auto-width label"
              margin={[8, 0, 0, 0]}
            />,
            <AvakioLabel
              label="Label with tooltip"
              tooltip="This is a helpful tooltip"
              labelWidth="auto"
              margin={[8, 0, 0, 0]}
            />,
          ]}
        />

        {/* HTML Content */}
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[16, 0, 0, 16]}
          content={<strong>HTML Content</strong>}
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="Use the html prop to render HTML content with inline styles for advanced formatting."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioLabel
              html="<strong>Bold</strong> and <em>italic</em> text"
            />,
            <AvakioLabel
              html="<span style='color: #f44336;'>●</span> Red bullet point"
              margin={[8, 0, 0, 0]}
            />,
            <AvakioLabel
              html="<span style='font-size: 20px;'>📌</span> Label with emoji"
              margin={[8, 0, 0, 0]}
            />,
            <AvakioLabel
              html="Status: <span style='color: #4caf50; font-weight: bold;'>Active</span>"
              margin={[8, 0, 0, 0]}
            />,
          ]}
        />
      </section>

      {/* Options Section */}
      <section 
        ref={(el) => { sectionRefs.current['options'] = el; }}
        className="avakio-label-demo-section"
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
          content="Customize the Label using Base component properties like alignment, sizing, spacing, and state. Use the style prop for custom styling."
        />

        {/* Text Alignment */}
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioTemplate
              key="align-title"
              type="clean"
              borderType="clean"
              content={<strong>Text Alignment</strong>}
            />,
            <AvakioLabel
              labelForm="Left aligned (default)"
              labelAlign="left"
              labelWidth ={250}  

              margin={[8, 0, 0, 0]}
            />,
            <AvakioLabel
              labelForm="Center aligned"
              labelAlign="center"
              labelWidth ={250}  
              margin={[8, 0, 0, 0]}
            />,
            <AvakioLabel
              labelForm="Right aligned"
              labelAlign="right"
              labelWidth={250}
              margin={[8, 0, 0, 0]}
            />,
          ]}
        />

        {/* Theme Variants section removed - theme prop is deprecated */}

        {/* Custom Styling section removed - fontSize, fontWeight, color, backgroundColor, border, borderRadius props are deprecated */}

        {/* Custom Styling with style prop */}
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioTemplate
              key="styling-title"
              type="clean"
              borderType="clean"
              content={<strong>Custom Styling</strong>}
            />,
            <AvakioTemplate
              key="styling-desc"
              type="clean"
              borderType="clean"
              margin={[0, 0, 8, 0]}
              content="Use the style prop to apply custom CSS styling."
            />,
            <AvakioLabel
              text="Custom font size"
              style={{ fontSize: '20px' }}
              margin={[8, 0, 0, 0]}
            />,
            <AvakioLabel
              text="Bold text"
              style={{ fontWeight: 'bold' }}
              margin={[8, 0, 0, 0]}
            />,
            <AvakioLabel
              text="Custom color"
              style={{ color: '#1976d2' }}
              margin={[8, 0, 0, 0]}
            />,
            <AvakioLabel
              text="With background"
              style={{ backgroundColor: '#e3f2fd', padding: '12px', borderRadius: '8px' }}
              margin={[8, 0, 0, 0]}
            />,
            <AvakioLabel
              text="With border"
              style={{ border: '1px solid #1976d2', padding: '6px' }}
              margin={[8, 0, 0, 0]}
            />,
          ]}
        />
      </section>

      {/* Interactive Playground Section */}
      <section 
        ref={(el) => { sectionRefs.current['playground'] = el; }}
        className="avakio-label-demo-section"
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
          content="Experiment with different Label configurations in real-time. Change any property below to see the effect on the preview."
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
                        style={{ overflow: 'auto' }}
                        rows={[
                          isComponentMounted ? (
                          <AvakioLabel
                            id={getPropValue('componentId', 'playground-label')}
                            testId={getPropValue('testId', '') || undefined}
                            className={getPropValue('className', '') || undefined}
                            ref={labelRef}
                            text={getPropValue('html', '') ? undefined : getPropValue('text', 'Sample Label Text')}
                            html={getPropValue('html', '') || undefined}
                            tooltip={getPropValue('tooltip', '') || undefined}
                            // ControlLabel props
                            label={getPropValue('label', '') || undefined}
                            labelForm={getPropValue('labelForm', '') || undefined}
                            labelPosition={getPropValue('labelPosition', 'left') as 'left' | 'top' | 'right' | 'bottom'}
                            labelAlign={getPropValue('labelAlign', 'left') as 'left' | 'center' | 'right'}
                            labelWidth={formatSizingValue(getPropValue('labelWidth', '100'))}
                            bottomLabel={getPropValue('bottomLabel', '') || undefined}
                            required={getPropValue('required', false)}
                            invalid={getPropValue('invalid', false)}
                            invalidMessage={getPropValue('invalidMessage', '') || undefined}
                            // Appearance
                            align={getPropValue('align', 'left') as 'left' | 'center' | 'right'}
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
                            minWidth={formatSizingValue(getPropValue('minWidth', ''))}
                            maxWidth={formatSizingValue(getPropValue('maxWidth', ''))}
                            minHeight={formatSizingValue(getPropValue('minHeight', ''))}
                            maxHeight={formatSizingValue(getPropValue('maxHeight', ''))}
                            margin={getPropValue('margin', '') ? getPropValue('margin', '').includes(',') ? getPropValue('margin', '').split(',').map(Number) as [number, number, number, number] : Number(getPropValue('margin', '')) : undefined}
                            padding={getPropValue('padding', '') ? getPropValue('padding', '').includes(',') ? getPropValue('padding', '').split(',').map(Number) as [number, number, number, number] : Number(getPropValue('padding', '')) : undefined}
                            bottomPadding={getPropValue('bottomPadding', '') ? Number(getPropValue('bottomPadding', '')) : undefined}
                            // State
                            hidden={getPropValue('hidden', false)}
                            disabled={getPropValue('disabled', false)}
                            borderless={getPropValue('borderless', false)}
                            // Events
                            onBeforeRender={() => {
                              if (getPropValue('logOnBeforeRender', false)) addLog('onBeforeRender', 'about to render');
                            }}
                            onAfterRender={() => {
                              if (getPropValue('logOnAfterRender', false)) addLog('onAfterRender', 'component rendered');
                            }}
                            onViewShow={() => {
                              if (getPropValue('logOnViewShow', false)) addLog('onViewShow', 'view shown');
                            }}
                            onItemClick={(e) => {
                              if (getPropValue('logOnItemClick', false)) addLog('onItemClick', 'item clicked');
                            }}
                            onViewResize={(width, height) => {
                              if (getPropValue('logOnViewResize', false)) addLog('onViewResize', `width: ${width}, height: ${height}`);
                            }}
                            onAfterScroll={(scrollTop, scrollLeft) => {
                              if (getPropValue('logOnAfterScroll', false)) addLog('onAfterScroll', `scrollTop: ${scrollTop}, scrollLeft: ${scrollLeft}`);
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
                                    const val = labelRef.current?.getValue();
                                    addLog('getValue()', `returned: ${val || '(empty)'}`);
                                  }}
                                />
                                <AvakioButton
                                  size="sm"
                                  label='setValue()'
                                  margin={[0, 10, 10, 0]}
                                  width='200px'
                                  buttonWidth='150px'
                                  onClick={() => {
                                    labelRef.current?.setValue('Updated via setValue()');
                                    addLog('setValue()', 'set to "Updated via setValue()"');
                                  }}
                                />
                                <AvakioButton
                                  size="sm"
                                  label='getText()'
                                  margin={[0, 10, 10, 0]}
                                  width='200px'
                                  buttonWidth='150px'
                                  onClick={() => {
                                    const text = labelRef.current?.getText();
                                    addLog('getText()', `returned: ${text || '(empty)'}`);
                                  }}
                                />
                                <AvakioButton
                                  size="sm"
                                  label='setText()'
                                  margin={[0, 10, 10, 0]}
                                  width='200px'
                                  buttonWidth='150px'
                                  onClick={() => {
                                    labelRef.current?.setText('Updated via setText()');
                                    addLog('setText()', 'set to "Updated via setText()"');
                                  }}
                                />
                                <AvakioButton
                                  size="sm"
                                  label='setHTML()'
                                  margin={[0, 10, 10, 0]}
                                  width='200px'
                                  buttonWidth='150px'
                                  onClick={() => {
                                    labelRef.current?.setHTML('<strong style="color: #f57c00;">HTML</strong> content <em>styled</em>');
                                    addLog('setHTML()', 'set HTML content');
                                  }}
                                />
                                <AvakioButton
                                  size="sm"
                                  label='validate()'
                                  margin={[0, 10, 10, 0]}
                                  width='200px'
                                  buttonWidth='150px'
                                  onClick={() => {
                                    const result = labelRef.current?.validate();
                                    addLog('validate()', `returned: ${result}`);
                                  }}
                                />
                                <AvakioButton
                                  size="sm"
                                  label='getParentView()'
                                  margin={[0, 10, 10, 0]}
                                  width='200px'
                                  buttonWidth='150px'
                                  onClick={() => {
                                    const parent = labelRef.current?.getParentView();
                                    addLog('getParentView()', `returned: ${parent || 'null'}`);
                                  }}
                                />
                                <AvakioButton
                                  size="sm"
                                  label='getElement()'
                                  margin={[0, 10, 10, 0]}
                                  width='200px'
                                  buttonWidth='150px'
                                  onClick={() => {
                                    const node = labelRef.current?.getElement();
                                    addLog('getElement()', `returned: ${node ? node.tagName : 'null'}`);
                                  }}
                                />
                                <AvakioButton
                                  size="sm"
                                  label='focus()'
                                  margin={[0, 10, 10, 0]}
                                  width='200px'
                                  buttonWidth='150px'
                                  onClick={() => {
                                    labelRef.current?.focus();
                                    addLog('focus()', 'called via ref');
                                  }}
                                />
                                <AvakioButton
                                  size="sm"
                                  label='blur()'
                                  margin={[0, 10, 10, 0]}
                                  width='200px'
                                  buttonWidth='150px'
                                  onClick={() => {
                                    labelRef.current?.blur();
                                    addLog('blur()', 'called via ref');
                                  }}
                                />
                                <AvakioButton
                                  size="sm"
                                  label='show()'
                                  margin={[0, 10, 10, 0]}
                                  width='200px'
                                  buttonWidth='150px'
                                  onClick={() => {
                                    labelRef.current?.show();
                                    addLog('show()', 'called via ref');
                                  }}
                                />
                                <AvakioButton
                                  size="sm"
                                  label='hide()'
                                  margin={[0, 10, 10, 0]}
                                  width='200px'
                                  buttonWidth='150px'
                                  onClick={() => {
                                    labelRef.current?.hide();
                                    addLog('hide()', 'called via ref');
                                  }}
                                />
                                <AvakioButton
                                  size="sm"
                                  label='isVisible()'
                                  margin={[0, 10, 10, 0]}
                                  width='200px'
                                  buttonWidth='150px'
                                  onClick={() => {
                                    const visible = labelRef.current?.isVisible();
                                    addLog('isVisible()', `returned: ${visible}`);
                                  }}
                                />
                                <AvakioButton
                                  size="sm"
                                  label='enable()'
                                  margin={[0, 10, 10, 0]}
                                  width='200px'
                                  buttonWidth='150px'
                                  onClick={() => {
                                    labelRef.current?.enable();
                                    addLog('enable()', 'called via ref');
                                  }}
                                />
                                <AvakioButton
                                  size="sm"
                                  label='disable()'
                                  margin={[0, 10, 10, 0]}
                                  width='200px'
                                  buttonWidth='150px'
                                  onClick={() => {
                                    labelRef.current?.disable();
                                    addLog('disable()', 'called via ref');
                                  }}
                                />
                                <AvakioButton
                                  size="sm"
                                  label='isEnabled()'
                                  margin={[0, 10, 10, 0]}
                                  width='200px'
                                  buttonWidth='150px'
                                  onClick={() => {
                                    const enabled = labelRef.current?.isEnabled();
                                    addLog('isEnabled()', `returned: ${enabled}`);
                                  }}
                                />
                                <AvakioButton
                                  size="sm"
                                  label='define()'
                                  margin={[0, 10, 10, 0]}
                                  width='200px'
                                  buttonWidth='150px'
                                  onClick={() => {
                                    labelRef.current?.define('text', 'Updated via define()');
                                    addLog('define()', 'set text to "Updated via define()"');
                                  }}
                                />
                                <AvakioButton
                                  size="sm"
                                  label={isComponentMounted ? 'Destroy Component' : 'Recreate Component'}
                                  margin={[0, 10, 10, 0]}
                                  width='200px'
                                  buttonWidth='150px'
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
                                  { id: 'componentId', label: 'ID', type: 'text', value: 'playground-label', group: 'Identity', placeholder: 'Component ID' },
                                  { id: 'testId', label: 'Test ID', type: 'text', value: '', group: 'Identity', placeholder: 'Test ID for testing' },
                                  { id: 'className', label: 'Class Name', type: 'text', value: '', group: 'Identity', placeholder: 'Additional CSS class' },
                                  // Content Group
                                  { id: 'text', label: 'Text', type: 'text', value: 'Sample Label Text', group: 'Content', placeholder: 'Label text content' },
                                  { id: 'html', label: 'HTML Content', type: 'text', value: '', group: 'Content', placeholder: 'e.g. <strong>Bold</strong> text' },
                                  { id: 'tooltip', label: 'Tooltip', type: 'text', value: '', group: 'Content', placeholder: 'Tooltip text' },
                                  // ControlLabel Props
                                  { id: 'label', label: 'Label', type: 'text', value: '', group: 'ControlLabel', placeholder: 'Styled label text' },
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
                                  // Appearance Group
                                  { id: 'align', label: 'Align', type: 'select', value: 'left', group: 'Appearance', selectOptions: [
                                    { id: 'left', value: 'Left' },
                                    { id: 'center', value: 'Center' },
                                    { id: 'right', value: 'Right' },
                                  ]},
                                  { id: 'style', label: 'Style (JSON)', type: 'text', value: '', group: 'Appearance', placeholder: 'e.g. {"color":"red"}' },
                                  // Sizing Group
                                  { id: 'width', label: 'Width', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 300 or 100%' },
                                  { id: 'height', label: 'Height', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 38' },
                                  { id: 'minWidth', label: 'Min Width', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 200' },
                                  { id: 'maxWidth', label: 'Max Width', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 500' },
                                  { id: 'minHeight', label: 'Min Height', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 30' },
                                  { id: 'maxHeight', label: 'Max Height', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 100' },
                                  { id: 'margin', label: 'Margin', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 8 or 8,16,8,16' },
                                  { id: 'padding', label: 'Padding', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 8 or 8,16,8,16' },
                                  { id: 'bottomPadding', label: 'Bottom Padding', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 10' },
                                  // State Group
                                  { id: 'hidden', label: 'Hidden', type: 'checkbox', value: false, group: 'State', checkboxLabel: 'Hide the component' },
                                  { id: 'disabled', label: 'Disabled', type: 'checkbox', value: false, group: 'State', checkboxLabel: 'Disable the component' },
                                  { id: 'borderless', label: 'Borderless', type: 'checkbox', value: true, group: 'State', checkboxLabel: 'Hide component borders' },
                                ]);
                                setPlaygroundValue('Sample Label Text');
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
        className="avakio-label-demo-section"
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
              id="label-props-table"
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
              id="label-events-table"
              data={eventsData}
              filterable
              sortable
              columns={propsColumns}
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
              id="label-methods-table"
              data={refMethodsData}
              filterable
              sortable
              columns={propsColumns}
              select={false}
              showRowNum
            />,
          ]}
        />
      </section>
    </div>
  );
}

export default AvakioLabelExample;
