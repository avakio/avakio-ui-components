import React, { useState, useRef } from 'react';
import { AvakioLabel, AvakioLabelRef } from '../../components/avakio/ui-controls/avakio-label/avakio-label';
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
  
  // Playground property items for AvakioProperty
  const [playgroundProps, setPlaygroundProps] = useState<AvakioPropertyItem[]>([
    // Identity Group
    { id: 'componentId', label: 'ID', type: 'text', value: 'playground-label', group: 'Identity', placeholder: 'Component ID' },
    { id: 'testId', label: 'Test ID', type: 'text', value: '', group: 'Identity', placeholder: 'Test ID for testing' },
    { id: 'className', label: 'Class Name', type: 'text', value: '', group: 'Identity', placeholder: 'Additional CSS class' },
    
    // Content Group
    { id: 'label', label: 'Label Text', type: 'text', value: 'Sample Label Text', group: 'Content', placeholder: 'Enter label text' },
    { id: 'html', label: 'HTML Content', type: 'text', value: '', group: 'Content', placeholder: 'e.g. <strong>Bold</strong> text' },
    { id: 'tooltip', label: 'Tooltip', type: 'text', value: '', group: 'Content', placeholder: 'Tooltip text' },
    
    // Appearance Group
    {
      id: 'theme',
      label: 'Theme',
      type: 'select',
      value: 'material',
      group: 'Appearance',
      selectOptions: [
        { id: 'material', value: 'Material' },
        { id: 'flat', value: 'Flat' },
        { id: 'compact', value: 'Compact' },
        { id: 'dark', value: 'Dark' },
        { id: 'ocean', value: 'Ocean' },
        { id: 'sunset', value: 'Sunset' },
      ],
    },
    {
      id: 'align',
      label: 'Align',
      type: 'select',
      value: 'left',
      group: 'Appearance',
      selectOptions: [
        { id: 'left', value: 'Left' },
        { id: 'center', value: 'Center' },
        { id: 'right', value: 'Right' },
      ],
    },
    { id: 'fontSize', label: 'Font Size', type: 'text', value: '', group: 'Appearance', placeholder: 'e.g. 14 or 1.2em' },
    {
      id: 'fontWeight',
      label: 'Font Weight',
      type: 'select',
      value: 'normal',
      group: 'Appearance',
      selectOptions: [
        { id: 'normal', value: 'Normal' },
        { id: 'bold', value: 'Bold' },
        { id: '100', value: '100' },
        { id: '200', value: '200' },
        { id: '300', value: '300' },
        { id: '400', value: '400' },
        { id: '500', value: '500' },
        { id: '600', value: '600' },
        { id: '700', value: '700' },
        { id: '800', value: '800' },
        { id: '900', value: '900' },
      ],
    },
    { id: 'color', label: 'Text Color', type: 'text', value: '', group: 'Appearance', placeholder: 'e.g. #1976d2' },
    { id: 'backgroundColor', label: 'Background Color', type: 'text', value: '', group: 'Appearance', placeholder: 'e.g. #f5f5f5' },
    { id: 'border', label: 'Border', type: 'text', value: '', group: 'Appearance', placeholder: 'e.g. 1px solid #ccc' },
    { id: 'borderRadius', label: 'Border Radius', type: 'text', value: '', group: 'Appearance', placeholder: 'e.g. 4 or 4px' },
    
    // Sizing Group
    { id: 'width', label: 'Width', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 300 or 100%' },
    { id: 'height', label: 'Height', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 38' },
    { id: 'minWidth', label: 'Min Width', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 200' },
    { id: 'minHeight', label: 'Min Height', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 30' },
    { id: 'margin', label: 'Margin', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 8 or 8,16,8,16' },
    { id: 'padding', label: 'Padding', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 8 or 8,16,8,16' },
    
    // State Group
    { id: 'autowidth', label: 'Auto Width', type: 'checkbox', value: false, group: 'State', checkboxLabel: 'Auto-adjust width based on content' },
    { id: 'disabled', label: 'Disabled', type: 'checkbox', value: false, group: 'State', checkboxLabel: 'Disable the component' },
    { id: 'hidden', label: 'Hidden', type: 'checkbox', value: false, group: 'State', checkboxLabel: 'Hide the component' },
    
    // Events Group (toggles to enable event logging)
    { id: 'logOnClick', label: 'Log onClick', type: 'checkbox', value: true, group: 'Events', checkboxLabel: 'Log onClick events' },
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
  const labelRef = useRef<AvakioLabelRef>(null);
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
    addEventLog('Label', action, details);
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
    { id: 1, name: 'label', type: 'string', defaultValue: "''", description: 'The text content of the label', from: 'Label' },
    { id: 2, name: 'html', type: 'string', defaultValue: 'undefined', description: 'Custom HTML content (overrides label if provided)', from: 'Label' },
    { id: 3, name: 'autowidth', type: 'boolean', defaultValue: 'false', description: 'Whether to auto-adjust width based on content', from: 'Label' },
    { id: 4, name: 'theme', type: "'material' | 'flat' | 'compact' | 'dark' | 'ocean' | 'sunset'", defaultValue: "'material'", description: 'Theme variant for styling', from: 'Label' },
    
    // Identity Props
    { id: 5, name: 'id', type: 'string', defaultValue: 'undefined', description: 'Unique identifier for the label', from: 'Base' },
    { id: 6, name: 'testId', type: 'string', defaultValue: 'undefined', description: 'Test identifier for testing', from: 'Base' },
    { id: 7, name: 'className', type: 'string', defaultValue: 'undefined', description: 'Additional CSS class name', from: 'Base' },
    
    // Appearance Props
    { id: 8, name: 'align', type: "'left' | 'center' | 'right'", defaultValue: "'left'", description: 'Alignment of the label text', from: 'Label' },
    { id: 9, name: 'fontSize', type: 'number | string', defaultValue: 'undefined', description: 'Font size for the label text', from: 'Label' },
    { id: 10, name: 'fontWeight', type: "'normal' | 'bold' | '100'-'900'", defaultValue: 'undefined', description: 'Font weight for the label text', from: 'Label' },
    { id: 11, name: 'color', type: 'string', defaultValue: 'undefined', description: 'Text color of the label', from: 'Label' },
    { id: 12, name: 'backgroundColor', type: 'string', defaultValue: 'undefined', description: 'Background color of the label', from: 'Label' },
    { id: 13, name: 'border', type: 'string', defaultValue: 'undefined', description: 'Border style (e.g., "1px solid #ccc")', from: 'Label' },
    { id: 14, name: 'borderRadius', type: 'string | number', defaultValue: 'undefined', description: 'Border radius for rounded corners', from: 'Label' },
    { id: 15, name: 'tooltip', type: 'string', defaultValue: 'undefined', description: 'Tooltip text shown on hover', from: 'Base' },
    
    // Sizing Props
    { id: 16, name: 'width', type: 'number | string', defaultValue: 'undefined', description: 'Width of the label', from: 'Base' },
    { id: 17, name: 'height', type: 'number | string', defaultValue: 'undefined', description: 'Height of the label', from: 'Base' },
    { id: 18, name: 'minWidth', type: 'number | string', defaultValue: 'undefined', description: 'Minimum width of the label', from: 'Base' },
    { id: 19, name: 'minHeight', type: 'number | string', defaultValue: 'undefined', description: 'Minimum height of the label', from: 'Base' },
    { id: 20, name: 'margin', type: 'number | string | [number, number, number, number]', defaultValue: 'undefined', description: 'Margin around the label', from: 'Base' },
    { id: 21, name: 'padding', type: 'number | string | [number, number, number, number]', defaultValue: 'undefined', description: 'Padding inside the label', from: 'Base' },
    
    // State Props
    { id: 22, name: 'disabled', type: 'boolean', defaultValue: 'false', description: 'Whether the label is in disabled state', from: 'Base' },
    { id: 23, name: 'hidden', type: 'boolean', defaultValue: 'false', description: 'Whether the label is hidden', from: 'Base' },
    
    // Style Props
    { id: 24, name: 'css', type: 'CSSProperties', defaultValue: '{}', description: 'Custom CSS styles object', from: 'Base' },
    { id: 25, name: 'style', type: 'React.CSSProperties', defaultValue: 'undefined', description: 'Custom inline styles for the root element', from: 'Base' },
  ];

  const eventsData: PropDoc[] = [
    { id: 1, name: 'onClick', type: '(e: React.MouseEvent<HTMLDivElement>) => void', defaultValue: 'undefined', description: 'Fires when the label is clicked', from: 'Base' },
  ];

  const refMethodsData: PropDoc[] = [
    { id: 1, name: 'getValue()', type: '() => string', defaultValue: '-', description: 'Get the label text content', from: 'Label' },
    { id: 2, name: 'setValue(value)', type: '(value: string) => void', defaultValue: '-', description: 'Set the label text content', from: 'Label' },
    { id: 3, name: 'setHTML(html)', type: '(html: string) => void', defaultValue: '-', description: 'Set HTML content for the label', from: 'Label' },
    { id: 4, name: 'getNode()', type: '() => HTMLDivElement | null', defaultValue: '-', description: 'Get the DOM element', from: 'Base' },
    { id: 5, name: 'hide()', type: '() => void', defaultValue: '-', description: 'Hide the label', from: 'Base' },
    { id: 6, name: 'show()', type: '() => void', defaultValue: '-', description: 'Show the label', from: 'Base' },
    { id: 7, name: 'isVisible()', type: '() => boolean', defaultValue: '-', description: 'Check if label is visible', from: 'Base' },
    { id: 8, name: 'disable()', type: '() => void', defaultValue: '-', description: 'Disable the label', from: 'Base' },
    { id: 9, name: 'enable()', type: '() => void', defaultValue: '-', description: 'Enable the label', from: 'Base' },
    { id: 10, name: 'isEnabled()', type: '() => boolean', defaultValue: '-', description: 'Check if label is enabled', from: 'Base' },
  ];

  const propsColumns: AvakioColumn<PropDoc>[] = [
    { id: 'name', header: 'Property', width: 180 },
    { id: 'type', header: 'Type', width: 300 },
    { id: 'defaultValue', header: 'Default', width: 100 },
    { id: 'description', header: 'Description', width: 350 },
    { id: 'from', header: 'From', width: 100, filterType: 'combo' },
  ];

  return (
    <div className="avakio-label-demo-container">
      {/* Sticky Header + Tab Navigation */}
      <div className="avakio-example-sticky-header">
        {/* Header */}
        <AvakioViewHeader
          label="UI Controls"
          title="Label"
          subTitle="A versatile label component for displaying static text with theming, alignment, and HTML content support."
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
          content="The Label component displays static text with various styling options."
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
              label="Simple label text"
              theme="material"
            />,
            <AvakioLabel
              label="Label with custom width"
              width={300}
              theme="material"
              margin={[8, 0, 0, 0]}
            />,
            <AvakioLabel
              label="Auto-width label"
              autowidth
              theme="material"
              margin={[8, 0, 0, 0]}
            />,
            <AvakioLabel
              label="Label with tooltip"
              tooltip="This is a helpful tooltip"
              theme="material"
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
          content="Use the html prop to render HTML content inside the label."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioLabel
              html="<strong>Bold</strong> and <em>italic</em> text"
              theme="material"
            />,
            <AvakioLabel
              html="<span style='color: #f44336;'>●</span> Red bullet point"
              theme="material"
              margin={[8, 0, 0, 0]}
            />,
            <AvakioLabel
              html="<span style='font-size: 20px;'>📌</span> Label with emoji"
              theme="material"
              margin={[8, 0, 0, 0]}
            />,
            <AvakioLabel
              html="Status: <span style='color: #4caf50; font-weight: bold;'>Active</span>"
              theme="material"
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
          content="Customize the Label with various options like themes, alignment, and styling."
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
              label="Left aligned (default)"
              align="left"
              width={400}
              theme="flat"
              margin={[8, 0, 0, 0]}
              backgroundColor="#f5f5f5"
              padding={8}
            />,
            <AvakioLabel
              label="Center aligned"
              align="center"
              width={400}
              theme="flat"
              margin={[8, 0, 0, 0]}
              backgroundColor="#f5f5f5"
              padding={8}
            />,
            <AvakioLabel
              label="Right aligned"
              align="right"
              width={400}
              theme="flat"
              margin={[8, 0, 0, 0]}
              backgroundColor="#f5f5f5"
              padding={8}
            />,
          ]}
        />

        {/* Themes */}
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioTemplate
              key="theme-title"
              type="clean"
              borderType="clean"
              content={<strong>Theme Variants</strong>}
            />,
            <AvakioLabel
              label="Material Theme"
              theme="material"
              margin={[8, 0, 0, 0]}
            />,
            <AvakioLabel
              label="Flat Theme"
              theme="flat"
              margin={[8, 0, 0, 0]}
            />,
            <AvakioLabel
              label="Compact Theme"
              theme="compact"
              margin={[8, 0, 0, 0]}
            />,
            <AvakioLabel
              label="Dark Theme"
              theme="dark"
              margin={[8, 0, 0, 0]}
            />,
            <AvakioLabel
              label="Ocean Theme"
              theme="ocean"
              margin={[8, 0, 0, 0]}
            />,
            <AvakioLabel
              label="Sunset Theme"
              theme="sunset"
              margin={[8, 0, 0, 0]}
            />,
          ]}
        />

        {/* Custom Styling */}
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
            <AvakioLabel
              label="Custom font size (20px)"
              fontSize={20}
              margin={[8, 0, 0, 0]}
            />,
            <AvakioLabel
              label="Bold text"
              fontWeight="bold"
              margin={[8, 0, 0, 0]}
            />,
            <AvakioLabel
              label="Custom color"
              color="#1976d2"
              margin={[8, 0, 0, 0]}
            />,
            <AvakioLabel
              label="With background"
              backgroundColor="#e3f2fd"
              padding={12}
              borderRadius={8}
              margin={[8, 0, 0, 0]}
            />,
            <AvakioLabel
              label="With border"
              border="2px solid #1976d2"
              padding={12}
              borderRadius={4}
              margin={[8, 0, 0, 0]}
            />,
          ]}
        />

        {/* States */}
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioTemplate
              key="states-title"
              type="clean"
              borderType="clean"
              content={<strong>States</strong>}
            />,
            <AvakioTemplate
              key="disabled-desc"
              type="clean"
              borderType="clean"
              margin={[8, 0, 8, 0]}
              style={{ fontSize: '12px' }}
              content='disabled=true'
            />,
            <AvakioLabel
              label="Disabled label"
              disabled
              theme="material"
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
                    <AvakioLabel
                      id={getPropValue('componentId', 'playground-label')}
                      testId={getPropValue('testId', '') || undefined}
                      className={getPropValue('className', '') || undefined}
                      ref={labelRef}
                      label={getPropValue('html', '') ? undefined : getPropValue('label', 'Sample Label Text')}
                      html={getPropValue('html', '') || undefined}
                      tooltip={getPropValue('tooltip', '') || undefined}
                      theme={getPropValue('theme', 'material') as 'material' | 'flat' | 'compact' | 'dark' | 'ocean' | 'sunset'}
                      align={getPropValue('align', 'left') as 'left' | 'center' | 'right'}
                      fontSize={getPropValue('fontSize', '') || undefined}
                      fontWeight={getPropValue('fontWeight', 'normal') as 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900'}
                      color={getPropValue('color', '') || undefined}
                      backgroundColor={getPropValue('backgroundColor', '') || undefined}
                      border={getPropValue('border', '') || undefined}
                      borderRadius={getPropValue('borderRadius', '') || undefined}
                      width={formatSizingValue(getPropValue('width', ''))}
                      height={formatSizingValue(getPropValue('height', ''))}
                      minWidth={formatSizingValue(getPropValue('minWidth', ''))}
                      minHeight={formatSizingValue(getPropValue('minHeight', ''))}
                      margin={getPropValue('margin', '') ? getPropValue('margin', '').includes(',') ? getPropValue('margin', '').split(',').map(Number) as [number, number, number, number] : Number(getPropValue('margin', '')) : undefined}
                      padding={getPropValue('padding', '') ? getPropValue('padding', '').includes(',') ? getPropValue('padding', '').split(',').map(Number) as [number, number, number, number] : Number(getPropValue('padding', '')) : undefined}
                      autowidth={getPropValue('autowidth', false)}
                      disabled={getPropValue('disabled', false)}
                      hidden={getPropValue('hidden', false)}
                      onClick={(e) => {
                        if (getPropValue('logOnClick', true)) addLog('onClick', 'label clicked');
                      }}
                    />,
                    <AvakioTemplate
                      type="clean"
                      borderType="clean"
                      padding={[10, 0, 10, 0]}
                      content={<span>Current Value: <strong>{getPropValue('html', '') || getPropValue('label', 'Sample Label Text')}</strong></span>}
                    />,
                    <AvakioTemplate
                      type="clean"
                      padding={[10, 0, 10, 0]}
                      borderType="clean"
                      content={<strong>Ref Methods</strong>}
                    />,
                    // Ref Methods
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
                            labelAlign='center'
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
                            labelAlign='center'
                            width='200px'
                            buttonWidth='150px'
                            onClick={() => {
                              labelRef.current?.setValue('Updated via setValue()');
                              addLog('setValue()', 'set to "Updated via setValue()"');
                            }}
                          />
                          <AvakioButton
                            size="sm"
                            label='setHTML()'
                            margin={[0, 10, 10, 0]}
                            labelAlign='center'
                            width='200px'
                            buttonWidth='150px'
                            onClick={() => {
                              labelRef.current?.setHTML('<strong style="color: #f57c00;">HTML</strong> content <em>styled</em>');
                              addLog('setHTML()', 'set HTML content');
                            }}
                          />
                          <AvakioButton
                            size="sm"
                            label='getNode()'
                            margin={[0, 10, 10, 0]}
                            labelAlign='center'
                            width='200px'
                            buttonWidth='150px'
                            onClick={() => {
                              const node = labelRef.current?.getNode();
                              addLog('getNode()', `returned: ${node ? node.tagName : 'null'}`);
                            }}
                          />
                          <AvakioButton
                            size="sm"
                            label='show()'
                            margin={[0, 10, 10, 0]}
                            labelAlign='center'
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
                            labelAlign='center'
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
                            labelAlign='center'
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
                            labelAlign='center'
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
                            labelAlign='center'
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
                            labelAlign='center'
                            width='200px'
                            buttonWidth='150px'
                            onClick={() => {
                              const enabled = labelRef.current?.isEnabled();
                              addLog('isEnabled()', `returned: ${enabled}`);
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
                                  { id: 'componentId', label: 'ID', type: 'text', value: 'playground-label', group: 'Identity', placeholder: 'Component ID' },
                                  { id: 'testId', label: 'Test ID', type: 'text', value: '', group: 'Identity', placeholder: 'Test ID for testing' },
                                  { id: 'className', label: 'Class Name', type: 'text', value: '', group: 'Identity', placeholder: 'Additional CSS class' },
                                  // Content Group
                                  { id: 'label', label: 'Label Text', type: 'text', value: 'Sample Label Text', group: 'Content', placeholder: 'Enter label text' },
                                  { id: 'html', label: 'HTML Content', type: 'text', value: '', group: 'Content', placeholder: 'e.g. <strong>Bold</strong> text' },
                                  { id: 'tooltip', label: 'Tooltip', type: 'text', value: '', group: 'Content', placeholder: 'Tooltip text' },
                                  // Appearance Group
                                  { id: 'theme', label: 'Theme', type: 'select', value: 'material', group: 'Appearance', selectOptions: [{ id: 'material', value: 'Material' }, { id: 'flat', value: 'Flat' }, { id: 'compact', value: 'Compact' }, { id: 'dark', value: 'Dark' }, { id: 'ocean', value: 'Ocean' }, { id: 'sunset', value: 'Sunset' }] },
                                  { id: 'align', label: 'Align', type: 'select', value: 'left', group: 'Appearance', selectOptions: [{ id: 'left', value: 'Left' }, { id: 'center', value: 'Center' }, { id: 'right', value: 'Right' }] },
                                  { id: 'fontSize', label: 'Font Size', type: 'text', value: '', group: 'Appearance', placeholder: 'e.g. 14 or 1.2em' },
                                  { id: 'fontWeight', label: 'Font Weight', type: 'select', value: 'normal', group: 'Appearance', selectOptions: [{ id: 'normal', value: 'Normal' }, { id: 'bold', value: 'Bold' }, { id: '100', value: '100' }, { id: '200', value: '200' }, { id: '300', value: '300' }, { id: '400', value: '400' }, { id: '500', value: '500' }, { id: '600', value: '600' }, { id: '700', value: '700' }, { id: '800', value: '800' }, { id: '900', value: '900' }] },
                                  { id: 'color', label: 'Text Color', type: 'text', value: '', group: 'Appearance', placeholder: 'e.g. #1976d2' },
                                  { id: 'backgroundColor', label: 'Background Color', type: 'text', value: '', group: 'Appearance', placeholder: 'e.g. #f5f5f5' },
                                  { id: 'border', label: 'Border', type: 'text', value: '', group: 'Appearance', placeholder: 'e.g. 1px solid #ccc' },
                                  { id: 'borderRadius', label: 'Border Radius', type: 'text', value: '', group: 'Appearance', placeholder: 'e.g. 4 or 4px' },
                                  // Sizing Group
                                  { id: 'width', label: 'Width', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 300 or 100%' },
                                  { id: 'height', label: 'Height', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 38' },
                                  { id: 'minWidth', label: 'Min Width', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 200' },
                                  { id: 'minHeight', label: 'Min Height', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 30' },
                                  { id: 'margin', label: 'Margin', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 8 or 8,16,8,16' },
                                  { id: 'padding', label: 'Padding', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 8 or 8,16,8,16' },
                                  // State Group
                                  { id: 'autowidth', label: 'Auto Width', type: 'checkbox', value: false, group: 'State', checkboxLabel: 'Auto-adjust width based on content' },
                                  { id: 'disabled', label: 'Disabled', type: 'checkbox', value: false, group: 'State', checkboxLabel: 'Disable the component' },
                                  { id: 'hidden', label: 'Hidden', type: 'checkbox', value: false, group: 'State', checkboxLabel: 'Hide the component' },
                                  // Events Group
                                  { id: 'logOnClick', label: 'Log onClick', type: 'checkbox', value: true, group: 'Events', checkboxLabel: 'Log onClick events' },
                                ]);
                                setPlaygroundValue('Sample Label Text');
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
              columns={propsColumns}
              select={false}
              height={700}
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
              id="label-events-table"
              data={eventsData}
              columns={propsColumns}
              select={false}
              height={100}
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
              key="methods-table"
              id="label-methods-table"
              data={refMethodsData}
              columns={propsColumns}
              select={false}
              height={320}
              showRowNum={true}
            />,
          ]}
        />
      </section>
    </div>
  );
}

export default AvakioLabelExample;
