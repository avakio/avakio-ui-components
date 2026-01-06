import React, { useState, useRef } from 'react';
import { AvakioProperty, AvakioPropertyItem, AvakioPropertyRef } from '../../components/avakio/data-presentation/avakio-property/avakio-property';
import { AvakioTemplate } from '../../components/avakio/views/avakio-template/avakio-template';
import { AvakioLayout } from '../../components/avakio/layouts/avakio-layout/avakio-layout';
import { AvakioCheckbox } from '../../components/avakio/ui-controls/avakio-checkbox/avakio-checkbox';
import { AvakioButton } from '../../components/avakio/ui-controls/avakio-button/avakio-button';
import { AvakioDataTable } from '../../components/avakio/data-presentation/avakio-datatable/AvakioDataTable';
import type { AvakioColumn } from '../../components/avakio/data-presentation/avakio-datatable/AvakioDataTable';
import { AvakioTabBar } from '../../components/avakio/ui-controls/avakio-tabbar/avakio-tabbar';
import { AvakioViewHeader } from '../../components/avakio/ui-widgets/avakio-view-header/avakio-view-header';
import { addEventLog } from '../../services/event-log-service';
import { 
  Settings,
  Settings2,
  Wand2,
  Book,
  Play,
} from 'lucide-react';
import './avakio-property-example.css';

// Tab options for navigation
const TAB_OPTIONS = [
  { id: 'basic', label: 'Basic Usage', icon: <Settings size={14} /> },
  { id: 'options', label: 'Options', icon: <Settings2 size={14} /> },
  { id: 'methods', label: 'Ref Methods', icon: <Wand2 size={14} /> },
  { id: 'playground', label: 'Interactive Playground', icon: <Play size={14} /> },
  { id: 'docs', label: 'Documentation', icon: <Book size={14} /> },
];

// Sample property items for basic demo
const basicPropertyItems: AvakioPropertyItem[] = [
  {
    id: 'title',
    label: 'Title',
    type: 'text',
    value: 'My Dashboard',
    placeholder: 'Enter title',
    group: 'General',
  },
  {
    id: 'columns',
    label: 'Columns',
    type: 'number',
    value: 3,
    description: 'Number of columns to display',
    group: 'General',
  },
  {
    id: 'layout',
    label: 'Layout',
    type: 'select',
    value: 'grid',
    selectOptions: [
      { id: 'grid', value: 'Grid layout' },
      { id: 'list', value: 'List layout' },
      { id: 'cards', value: 'Cards layout' },
    ],
    group: 'General',
  },
  {
    id: 'compact',
    label: 'Compact mode',
    type: 'checkbox',
    value: true,
    checkboxLabel: 'Enable compact spacing',
    group: 'Appearance',
  },
  {
    id: 'accent',
    label: 'Accent color',
    type: 'colorpicker',
    value: '#1ca1c1',
    colorPresets: [
      { label: 'Sky', value: '#38bdf8' },
      { label: 'Coral', value: '#fb923c' },
      { label: 'Mint', value: '#34d399' },
    ],
    group: 'Appearance',
  },
];

// Extended property items for various editor types
const extendedPropertyItems: AvakioPropertyItem[] = [
  {
    id: 'audience',
    label: 'Audience',
    type: 'combo',
    value: 'designers',
    comboOptions: [
      { id: 'designers', value: 'Designers' },
      { id: 'developers', value: 'Developers' },
      { id: 'managers', value: 'Managers' },
    ],
    group: 'Targeting',
  },
  {
    id: 'skills',
    label: 'Skills',
    type: 'multicombo',
    value: ['js', 'ts'],
    multicomboOptions: [
      { value: 'js', label: 'JavaScript' },
      { value: 'ts', label: 'TypeScript' },
      { value: 'react', label: 'React' },
      { value: 'node', label: 'Node.js' },
    ],
    group: 'Targeting',
  },
  {
    id: 'quota',
    label: 'User quota',
    type: 'counter',
    value: 5,
    counterMin: 1,
    counterMax: 100,
    counterStep: 1,
    group: 'Limits',
  },
  {
    id: 'importance',
    label: 'Importance',
    type: 'slider',
    value: 40,
    sliderMin: 0,
    sliderMax: 100,
    sliderStep: 5,
    sliderShowValue: true,
    sliderFormatValue: (v) => `${v}%`,
    group: 'Limits',
  },
  {
    id: 'goLive',
    label: 'Go-live date',
    type: 'date',
    value: '2024-05-10',
    group: 'Schedule',
  },
  {
    id: 'launchWindow',
    label: 'Launch window',
    type: 'datetime',
    value: new Date().toISOString(),
    dateShowTime: true,
    group: 'Schedule',
  },
  {
    id: 'notes',
    label: 'Notes',
    type: 'textarea',
    value: 'Optional description or internal notes.',
    placeholder: 'Add notes',
    group: 'Metadata',
  },
  {
    id: 'publish',
    label: 'Publish',
    type: 'button',
    buttonVariant: 'primary',
    buttonSize: 'md',
    buttonLabel: 'Launch',
    buttonIcon: '🚀',
    group: 'Actions',
  },
];

export function AvakioPropertyExample() {
  const [activeSection, setActiveSection] = useState<string | number | null>('basic');
  
  // Section refs for scroll navigation
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  
  // Demo state values
  const [basicItems, setBasicItems] = useState<AvakioPropertyItem[]>(basicPropertyItems);
  const [extendedItems, setExtendedItems] = useState<AvakioPropertyItem[]>(extendedPropertyItems);
  
  // Playground state
  const [playgroundItems, setPlaygroundItems] = useState<AvakioPropertyItem[]>(basicPropertyItems);
  const [playgroundDense, setPlaygroundDense] = useState(false);
  const [playgroundShowBorders, setPlaygroundShowBorders] = useState(false);
  const [playgroundDisabled, setPlaygroundDisabled] = useState(false);
  const [playgroundHidden, setPlaygroundHidden] = useState(false);
  const [playgroundBorderless, setPlaygroundBorderless] = useState(false);

  // Ref example
  const propertyRef = useRef<AvakioPropertyRef>(null);
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
    addEventLog('Property', action, details);
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
    { id: 3, name: 'items', type: 'AvakioPropertyItem[]', defaultValue: 'required', description: 'Array of property items to display' },
    { id: 4, name: 'onChange', type: '(items, changed) => void', defaultValue: 'undefined', description: 'Callback when any property value changes' },
    { id: 5, name: 'dense', type: 'boolean', defaultValue: 'false', description: 'Enable dense/compact mode with reduced spacing' },
    { id: 6, name: 'showBorders', type: 'boolean', defaultValue: 'false', description: 'Show borders between property rows' },
    { id: 7, name: 'disabled', type: 'boolean', defaultValue: 'false', description: 'Disable the entire property editor' },
    { id: 8, name: 'hidden', type: 'boolean', defaultValue: 'false', description: 'Hide the component' },
    { id: 9, name: 'borderless', type: 'boolean', defaultValue: 'false', description: 'Remove borders from the component' },
    { id: 10, name: 'width', type: 'number | string', defaultValue: 'undefined', description: 'Width of the component' },
    { id: 11, name: 'height', type: 'number | string', defaultValue: 'undefined', description: 'Height of the component' },
    { id: 12, name: 'minWidth', type: 'number | string', defaultValue: 'undefined', description: 'Minimum width' },
    { id: 13, name: 'minHeight', type: 'number | string', defaultValue: 'undefined', description: 'Minimum height' },
    { id: 15, name: 'maxWidth', type: 'number | string', defaultValue: 'undefined', description: 'Maximum width' },
    { id: 16, name: 'maxHeight', type: 'number | string', defaultValue: 'undefined', description: 'Maximum height' },
    { id: 17, name: 'margin', type: 'number | string | [t,r,b,l]', defaultValue: 'undefined', description: 'Margin around the component' },
    { id: 18, name: 'padding', type: 'number | string | [t,r,b,l]', defaultValue: 'undefined', description: 'Padding inside the component' },
    { id: 19, name: 'tooltip', type: 'string', defaultValue: 'undefined', description: 'Tooltip text on hover' },
    { id: 20, name: 'className', type: 'string', defaultValue: 'undefined', description: 'Additional CSS class name' },
    { id: 21, name: 'style', type: 'React.CSSProperties', defaultValue: 'undefined', description: 'Custom inline styles' },
  ];

  const itemPropsData: PropDoc[] = [
    { id: 1, name: 'id', type: 'string', defaultValue: 'required', description: 'Unique identifier for the property item' },
    { id: 2, name: 'label', type: 'string', defaultValue: 'required', description: 'Display label for the property' },
    { id: 3, name: 'type', type: 'AvakioPropertyEditor', defaultValue: "'text'", description: 'Editor type: text, number, select, checkbox, combo, colorpicker, counter, multicombo, date, datetime, button, daterangepicker, gridsuggest, slider, textarea' },
    { id: 4, name: 'value', type: 'string | number | boolean | string[] | AvakioDateRange | null', defaultValue: 'undefined', description: 'Current value of the property' },
    { id: 5, name: 'placeholder', type: 'string', defaultValue: 'undefined', description: 'Placeholder text for input fields' },
    { id: 6, name: 'description', type: 'string', defaultValue: 'undefined', description: 'Description text shown below the label' },
    { id: 7, name: 'group', type: 'string', defaultValue: 'undefined', description: 'Group name for organizing properties' },
    { id: 8, name: 'disabled', type: 'boolean', defaultValue: 'false', description: 'Disable this specific property' },
    { id: 9, name: 'required', type: 'boolean', defaultValue: 'false', description: 'Mark field as required' },
  ];

  const refMethodsData: PropDoc[] = [
    { id: 1, name: 'blur()', type: '() => void', defaultValue: '-', description: 'Remove focus from the control' },
    { id: 2, name: 'focus()', type: '() => void', defaultValue: '-', description: 'Set focus to the control' },
    { id: 3, name: 'getValue()', type: '() => AvakioPropertyItem[]', defaultValue: '-', description: 'Get all property items' },
    { id: 4, name: 'setValue(items)', type: '(items: AvakioPropertyItem[]) => void', defaultValue: '-', description: 'Set all property items' },
    { id: 5, name: 'getText()', type: '() => string', defaultValue: '-', description: 'Get JSON string of all items' },
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
    <div className="avakio-property-demo-container">
      {/* Sticky Header + Tab Navigation */}
      <div className="avakio-example-sticky-header">
        {/* Header */}
        <AvakioViewHeader
          label="Data Presentation"
          title="Property Editor"
          subTitle="A versatile property panel component supporting multiple editor types including text, number, select, checkbox, color picker, date picker, slider, and more."
          isSticky={false}
        />

        {/* Tab Navigation */}
        <div className="avakio-example-tabbar-container">
          <AvakioTabBar
            id="property-demo-tabs"
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
        className="avakio-property-demo-section"
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
          content="The Property component displays a list of configurable properties with various editor types, organized by groups."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <div key="basic">
              <AvakioProperty
                items={basicItems}
                                
                
                onChange={(items, changed) => {
                  setBasicItems(items);
                  addLog('onChange', `${changed.label}: ${JSON.stringify(changed.value)}`);
                }}
              />
              <div className="avakio-property-result" style={{ marginTop: '16px' }}>
                Last changed: <strong>{basicItems.find(i => i.id === 'title')?.value as string || 'None'}</strong>
              </div>
            </div>,
          ]}
        />

        {/* Extended Editor Types */}
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[16, 0, 0, 16]}
          content={<strong>Extended Editor Types</strong>}
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="The Property component supports many editor types: combo, multicombo, counter, slider, date, datetime, textarea, and button."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <div key="extended" style={{ maxWidth: '600px' }}>
              <AvakioProperty
                items={extendedItems}
                onChange={(items, changed) => {
                  setExtendedItems(items);
                  addLog('onChange (extended)', `${changed.label}: ${JSON.stringify(changed.value)}`);
                }}
              />
            </div>,
          ]}
        />
      </section>

      {/* Options Section */}
      <section 
        ref={(el) => { sectionRefs.current['options'] = el; }}
        className="avakio-property-demo-section"
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
          content="Customize the Property component with various options like dense mode, borders, and themes."
        />

        {/* Dense Mode */}
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioTemplate
              key="dense-title"
              type="clean"
              borderType="clean"
              content={<strong>Dense Mode</strong>}
            />,
            <AvakioTemplate
              key="dense-desc"
              type="clean"
              borderType="clean"
              padding={[8, 0, 0, 0]}
              content="Use dense={true} for a more compact layout with reduced spacing."
            />,
            <div key="dense" style={{ display: 'flex', gap: '32px', marginTop: '12px', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: '280px' }}>
                <span style={{ fontSize: '12px', color: '#666', display: 'block', marginBottom: '8px' }}>dense=false (default)</span>
                <AvakioProperty
                  items={basicPropertyItems.slice(0, 3)}
                  onChange={() => {}}
                />
              </div>
              <div style={{ flex: 1, minWidth: '280px' }}>
                <span style={{ fontSize: '12px', color: '#666', display: 'block', marginBottom: '8px' }}>dense=true</span>
                <AvakioProperty
                  items={basicPropertyItems.slice(0, 3)}
                  onChange={() => {}}
                  dense
                />
              </div>
            </div>,
          ]}
        />

        {/* Show Borders */}
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioTemplate
              key="borders-title"
              type="clean"
              borderType="clean"
              content={<strong>Show Borders</strong>}
            />,
            <AvakioTemplate
              key="borders-desc"
              type="clean"
              borderType="clean"
              padding={[8, 0, 0, 0]}
              content="Use showBorders={true} to display borders between property rows."
            />,
            <div key="borders" style={{ maxWidth: '400px', marginTop: '12px' }}>
              <AvakioProperty
                items={basicPropertyItems.slice(0, 4)}
                onChange={() => {}}
                showBorders
              />
            </div>,
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
              content={<strong>Disabled State</strong>}
            />,
            <div key="disabled" style={{ maxWidth: '400px', marginTop: '12px' }}>
              <AvakioProperty
                items={basicPropertyItems.slice(0, 3)}
                onChange={() => {}}
                disabled
              />
            </div>,
          ]}
        />
      </section>

      {/* Ref Methods Section */}
      <section 
        ref={(el) => { sectionRefs.current['methods'] = el; }}
        className="avakio-property-demo-section"
      >
        <AvakioTemplate
          type="section"
          borderType="clean"
          content="Ref Methods"
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="Access component methods via ref for programmatic control."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <div key="methods" style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <div style={{ flex: 1, minWidth: '300px', maxWidth: '500px' }}>
                <AvakioProperty
                  ref={propertyRef}
                  items={basicItems}
                  onChange={(items, changed) => {
                    setBasicItems(items);
                    addLog('onChange', `${changed.label}: ${JSON.stringify(changed.value)}`);
                  }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', minWidth: 180 }}>
                <AvakioButton onClick={() => {
                  const val = propertyRef.current?.getValue();
                  addLog('getValue()', `returned ${val?.length} items`);
                }}>
                  getValue()
                </AvakioButton>
                <AvakioButton onClick={() => {
                  propertyRef.current?.setValue(basicPropertyItems);
                  addLog('setValue()', 'reset to initial items');
                }}>
                  setValue(initial)
                </AvakioButton>
                <AvakioButton onClick={() => {
                  propertyRef.current?.enable();
                  addLog('enable()', 'called via ref');
                }}>
                  enable()
                </AvakioButton>
                <AvakioButton onClick={() => {
                  propertyRef.current?.disable();
                  addLog('disable()', 'called via ref');
                }}>
                  disable()
                </AvakioButton>
                <AvakioButton onClick={() => {
                  const enabled = propertyRef.current?.isEnabled();
                  addLog('isEnabled()', `returned: ${enabled}`);
                }}>
                  isEnabled()
                </AvakioButton>
                <AvakioButton onClick={() => {
                  propertyRef.current?.show();
                  addLog('show()', 'called via ref');
                }}>
                  show()
                </AvakioButton>
                <AvakioButton onClick={() => {
                  propertyRef.current?.hide();
                  addLog('hide()', 'called via ref');
                }}>
                  hide()
                </AvakioButton>
              </div>
            </div>,
            <div key="event-log" className="avakio-property-event-log">
              <div className="avakio-property-event-log-title">Event Log:</div>
              <div className="avakio-property-event-log-content">
                {eventLog.length === 0 ? (
                  <div className="avakio-property-event-log-empty">No events yet...</div>
                ) : (
                  eventLog.map((log, i) => (
                    <div key={i} className="avakio-property-event-log-item">{log}</div>
                  ))
                )}
              </div>
            </div>,
          ]}
        />
      </section>

      {/* Interactive Playground Section */}
      <section 
        ref={(el) => { sectionRefs.current['playground'] = el; }}
        className="avakio-property-demo-section"
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
          content="Experiment with different Property configurations in real-time."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <div key="playground" style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
              {/* Preview */}
              <div style={{ flex: 1, minWidth: 350, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <AvakioTemplate
                  type="clean"
                  borderType="clean"
                  content={<strong>Preview</strong>}
                />
                <div className="avakio-property-preview">
                  <AvakioProperty
                    items={playgroundItems}
                    onChange={(items) => setPlaygroundItems(items)}
                    dense={playgroundDense}
                    showBorders={playgroundShowBorders}
                    disabled={playgroundDisabled}
                    hidden={playgroundHidden}
                    borderless={playgroundBorderless}
                  />
                </div>
              </div>

              {/* Controls */}
              <div style={{ width: '280px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <AvakioTemplate
                  type="clean"
                  borderType="clean"
                  content={<strong>Configuration</strong>}
                />
                <AvakioCheckbox
                  label="Dense Mode"
                  checked={playgroundDense}
                  onChange={setPlaygroundDense}
                />
                <AvakioCheckbox
                  label="Show Borders"
                  checked={playgroundShowBorders}
                  onChange={setPlaygroundShowBorders}
                />
                <AvakioCheckbox
                  label="Borderless"
                  checked={playgroundBorderless}
                  onChange={setPlaygroundBorderless}
                />
                <AvakioCheckbox
                  label="Disabled"
                  checked={playgroundDisabled}
                  onChange={setPlaygroundDisabled}
                />
                <AvakioCheckbox
                  label="Hidden"
                  checked={playgroundHidden}
                  onChange={setPlaygroundHidden}
                />
              </div>
            </div>,
          ]}
        />
      </section>

      {/* Documentation Section */}
      <section 
        ref={(el) => { sectionRefs.current['docs'] = el; }}
        className="avakio-property-demo-section"
        data-section="docs"
      >
        <AvakioTemplate
          type="section"
          borderType="clean"
          content="Documentation"
        />

        {/* Component Props Table */}
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[16, 0, 0, 16]}
          content={<strong>Component Props</strong>}
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={0}
          rows={[
            <AvakioDataTable<PropDoc>
              key="props-table"
              id="property-props-table"
              data={propsData}
              columns={propsColumns}
              select={false}
              height={500}
            />,
          ]}
        />

        {/* Property Item Props Table */}
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[24, 0, 0, 16]}
          content={<strong>Property Item Props</strong>}
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={0}
          rows={[
            <AvakioDataTable<PropDoc>
              key="item-props-table"
              id="property-item-props-table"
              data={itemPropsData}
              columns={propsColumns}
              select={false}
              height={350}
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
              id="property-methods-table"
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

export default AvakioPropertyExample;











