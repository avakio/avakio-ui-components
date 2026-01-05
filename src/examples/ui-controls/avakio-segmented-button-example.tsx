import React, { useState, useEffect, useRef } from 'react';
import { AvakioSegmentedButton, AvakioSegmentedButtonRef, AvakioSegmentedOption } from '../../components/avakio/ui-controls/avakio-segmented-button/avakio-segmented-button';
import { AvakioButton } from '../../components/avakio/ui-controls/avakio-button/avakio-button';
import { AvakioTemplate } from '../../components/avakio/views/avakio-template/avakio-template';
import { AvakioLayout } from '../../components/avakio/layouts/avakio-layout/avakio-layout';
import { AvakioTabBar } from '../../components/avakio/ui-controls/avakio-tabbar/avakio-tabbar';
import { AvakioViewHeader } from '../../components/avakio/ui-widgets/avakio-view-header/avakio-view-header';
import './avakio-segmented-button-example.css';
import { 
  Home, List, Calendar, Settings, 
  AlignLeft, AlignCenter, AlignRight, AlignJustify,
  Grid, LayoutList, Table,
  Eye, EyeOff, Plus, Trash2, RefreshCw,
  Sun, Moon, Monitor,
  Play, Pause, Square,
  ChevronLeft, ChevronRight,
  Box, Layers, Maximize2, Wand2, ToggleLeft, BookOpen
} from 'lucide-react';

// Tab options for navigation
const TAB_OPTIONS = [
  { id: 'basic', label: 'Basic Usage', icon: <Box size={14} /> },
  { id: 'icons', label: 'Icons & Badges', icon: <Layers size={14} /> },
  { id: 'sizes', label: 'Size Variants', icon: <Maximize2 size={14} /> },
  { id: 'states', label: 'States', icon: <ToggleLeft size={14} /> },
  { id: 'methods', label: 'Imperative Methods', icon: <Wand2 size={14} /> },
  { id: 'advanced', label: 'Advanced', icon: <Settings size={14} /> },
  { id: 'docs', label: 'Documentation', icon: <BookOpen size={14} /> },
];

export function AvakioSegmentedButtonExample() {
  
  const [activeSection, setActiveSection] = useState<string | number | null>('basic');
  
  // Section refs for scroll navigation
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  // State for examples
  const [basicValue, setBasicValue] = useState<string | number | null>('section-a');
  const [iconValue, setIconValue] = useState<string | number | null>('list');
  const [alignValue, setAlignValue] = useState<string | number | null>('left');
  const [themeValue, setThemeValue] = useState<string | number | null>('system');
  const [playerValue, setPlayerValue] = useState<string | number | null>('pause');
  const [dynamicValue, setDynamicValue] = useState<string | number | null>('opt-1');
  
  const methodsRef = useRef<AvakioSegmentedButtonRef>(null);

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

  // Sync with global theme
  

  // Basic options
  const basicOptions: AvakioSegmentedOption[] = [
    { id: 'section-a', value: 'Section A' },
    { id: 'section-b', value: 'Section B' },
    { id: 'section-c', value: 'Section C' },
  ];

  // Options with icons
  const iconOptions: AvakioSegmentedOption[] = [
    { id: 'home', value: 'Home', icon: <Home size={16} /> },
    { id: 'list', value: 'List', icon: <List size={16} /> },
    { id: 'calendar', value: 'Calendar', icon: <Calendar size={16} /> },
    { id: 'settings', value: 'Settings', icon: <Settings size={16} /> },
  ];

  // Alignment options
  const alignOptions: AvakioSegmentedOption[] = [
    { id: 'left', value: 'Left', icon: <AlignLeft size={16} /> },
    { id: 'center', value: 'Center', icon: <AlignCenter size={16} /> },
    { id: 'right', value: 'Right', icon: <AlignRight size={16} /> },
    { id: 'justify', value: 'Justify', icon: <AlignJustify size={16} /> },
  ];

  // View mode options
  const viewOptions: AvakioSegmentedOption[] = [
    { id: 'grid', value: 'Grid', icon: <Grid size={16} /> },
    { id: 'list', value: 'List', icon: <LayoutList size={16} /> },
    { id: 'table', value: 'Table', icon: <Table size={16} /> },
  ];

  // Theme options
  const themeOptions: AvakioSegmentedOption[] = [
    { id: 'light', value: 'Light', icon: <Sun size={16} /> },
    { id: 'dark', value: 'Dark', icon: <Moon size={16} /> },
    { id: 'system', value: 'System', icon: <Monitor size={16} /> },
  ];

  // Player options
  const playerOptions: AvakioSegmentedOption[] = [
    { id: 'prev', value: '', icon: <ChevronLeft size={16} /> },
    { id: 'play', value: '', icon: <Play size={16} /> },
    { id: 'pause', value: '', icon: <Pause size={16} /> },
    { id: 'stop', value: '', icon: <Square size={16} /> },
    { id: 'next', value: '', icon: <ChevronRight size={16} /> },
  ];

  // Size options
  const sizeOptions = ['Small', 'Medium', 'Large'];

  // Options with badges
  const badgeOptions: AvakioSegmentedOption[] = [
    { id: 'inbox', value: 'Inbox', badge: 12 },
    { id: 'sent', value: 'Sent' },
    { id: 'drafts', value: 'Drafts', badge: 3 },
    { id: 'spam', value: 'Spam', badge: 'New' },
  ];

  // Options with disabled items
  const disabledOptions: AvakioSegmentedOption[] = [
    { id: 'available', value: 'Available' },
    { id: 'premium', value: 'Premium', disabled: true },
    { id: 'beta', value: 'Beta' },
    { id: 'coming-soon', value: 'Coming Soon', disabled: true },
  ];

  // Dynamic options state
  const [dynamicOptions, setDynamicOptions] = useState<AvakioSegmentedOption[]>([
    { id: 'opt-1', value: 'Option 1' },
    { id: 'opt-2', value: 'Option 2' },
    { id: 'opt-3', value: 'Option 3' },
  ]);
  const [optionCounter, setOptionCounter] = useState(4);

  const handleAddOption = () => {
    const newOption: AvakioSegmentedOption = {
      id: `opt-${optionCounter}`,
      value: `Option ${optionCounter}`,
    };
    setDynamicOptions(prev => [...prev, newOption]);
    setOptionCounter(c => c + 1);
  };

  const handleRemoveOption = () => {
    if (dynamicOptions.length > 1) {
      const lastOption = dynamicOptions[dynamicOptions.length - 1];
      setDynamicOptions(prev => prev.slice(0, -1));
      if (dynamicValue === lastOption.id) {
        setDynamicValue(dynamicOptions[dynamicOptions.length - 2]?.id ?? null);
      }
    }
  };

  // Methods demo state
  const [methodsStatus, setMethodsStatus] = useState<string>('Ready');

  return (
    <div className="avakio-segmented-demo-container">
      {/* Sticky Header + Tab Navigation */}
      <div className="avakio-segmented-sticky-header">
        {/* Header */}
        <AvakioViewHeader
          label="UI Controls"
          title="Segmented Button Component"
          subTitle="A holistic panel that contains multiple buttons (segments). Ideal for switching between views or options."
          isSticky={false}
        />

        {/* Tab Navigation */}
        <div className="avakio-segmented-tabbar-container">
          <AvakioTabBar
            id="segmented-demo-tabs"
            value={activeSection}
            options={TAB_OPTIONS}
            onChange={handleTabChange}
            align="left"
            size="sm"
            scrollable
          />
        </div>
      </div>

      {/* Basic Usage Section */}
      <section
        ref={(el) => { sectionRefs.current['basic'] = el; }}
        className="avakio-segmented-demo-section"
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
          content="Simple segmented button with text labels. Click to switch between sections."
        />

        <AvakioLayout
          id="layout-basic"
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioTemplate
              type="clean"
              borderType="clean"
              content="1. Basic Segmented Button"
            />,
            <AvakioSegmentedButton
              value={basicValue}
              options={basicOptions}
              onChange={(val) => setBasicValue(val)}
              label="Section"
              labelWidth={80}
            />,
            <AvakioTemplate
              type="clean"
              borderType="clean"
              padding={[16, 0, 0, 0]}
              content={<p><strong>Selected:</strong> {basicValue}</p>}
            />,
          ]}
        />

        <AvakioLayout
          id="layout-string-options"
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioTemplate
              type="clean"
              borderType="clean"
              content="2. Simple String Options"
            />,
            <AvakioTemplate
              type="clean"
              borderType="clean"
              padding={[0, 0, 8, 0]}
              content="Options can be provided as a simple array of strings."
            />,
            <AvakioSegmentedButton
              options={sizeOptions}
              defaultValue="Medium"
              label="Size"
              labelWidth={80}
            />,
          ]}
        />
      </section>

      {/* Icons & Badges Section */}
      <section
        ref={(el) => { sectionRefs.current['icons'] = el; }}
        className="avakio-segmented-demo-section"
      >
        <AvakioTemplate
          type="section"
          borderType="clean"
          content="Icons & Badges"
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="Segments can include icons and badge indicators for better visual context."
        />

        <AvakioLayout
          id="layout-icons"
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioTemplate
              type="clean"
              borderType="clean"
              content="1. With Icons"
            />,
            <AvakioSegmentedButton
              value={iconValue}
              options={iconOptions}
              onChange={(val) => setIconValue(val)}
            />,
            <AvakioTemplate
              type="clean"
              borderType="clean"
              padding={[16, 0, 0, 0]}
              content={<p><strong>Current view:</strong> {iconValue}</p>}
            />,
          ]}
        />

        <AvakioLayout
          id="layout-badges"
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioTemplate
              type="clean"
              borderType="clean"
              content="2. With Badges"
            />,
            <AvakioTemplate
              type="clean"
              borderType="clean"
              padding={[0, 0, 8, 0]}
              content="Segments can display badges to show counts or status."
            />,
            <AvakioSegmentedButton
              options={badgeOptions}
              defaultValue="inbox"
              label="Mailbox"
              labelWidth={80}
            />,
          ]}
        />

        <AvakioLayout
          id="layout-icon-only"
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioTemplate
              type="clean"
              borderType="clean"
              content="3. Icon Only (Compact)"
            />,
            <AvakioTemplate
              type="clean"
              borderType="clean"
              padding={[0, 0, 8, 0]}
              content="Compact design with icons only (no text labels)."
            />,
            <AvakioSegmentedButton
              options={playerOptions}
              value={playerValue}
              onChange={(val) => setPlayerValue(val)}
              optionWidth={44}
            />,
          ]}
        />
      </section>

      {/* Size Variants Section */}
      <section
        ref={(el) => { sectionRefs.current['sizes'] = el; }}
        className="avakio-segmented-demo-section"
      >
        <AvakioTemplate
          type="section"
          borderType="clean"
          content="Size Variants"
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="Small, medium (default), and large sizes available."
        />

        <AvakioLayout
          id="layout-sizes"
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          gap={24}
          rows={[
            <AvakioTemplate
              type="clean"
              borderType="clean"
              content="1. Small (size='sm')"
            />,
            <AvakioSegmentedButton
              options={viewOptions}
              defaultValue="grid"
              size="sm"
            />,
            <AvakioTemplate
              type="clean"
              borderType="clean"
              padding={[16, 0, 0, 0]}
              content="2. Medium (size='md') - Default"
            />,
            <AvakioSegmentedButton
              options={viewOptions}
              defaultValue="list"
              size="md"
            />,
            <AvakioTemplate
              type="clean"
              borderType="clean"
              padding={[16, 0, 0, 0]}
              content="3. Large (size='lg')"
            />,
            <AvakioSegmentedButton
              options={viewOptions}
              defaultValue="table"
              size="lg"
            />,
          ]}
        />

        <AvakioLayout
          id="layout-fill"
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioTemplate
              type="clean"
              borderType="clean"
              content="4. Fill Mode"
            />,
            <AvakioTemplate
              type="clean"
              borderType="clean"
              padding={[0, 0, 8, 0]}
              content="Segments stretch to fill the available width."
            />,
            <AvakioSegmentedButton
              options={themeOptions}
              value={themeValue}
              onChange={(val) => setThemeValue(val)}
              fill
            />,
          ]}
        />

        <AvakioLayout
          id="layout-alignment"
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioTemplate
              type="clean"
              borderType="clean"
              content="5. Alignment Options"
            />,
            <AvakioTemplate
              type="clean"
              borderType="clean"
              padding={[0, 0, 8, 0]}
              content="Control the alignment of the segmented button within its container."
            />,
            <AvakioSegmentedButton
              value={alignValue}
              options={alignOptions}
              onChange={(val) => setAlignValue(val)}
              label="Alignment"
              labelWidth={80}
            />,
            <AvakioTemplate
              type="clean"
              borderType="material"
              margin={[16, 0, 0, 0]}
              padding={16}
              content={
                <AvakioSegmentedButton
                  options={['A', 'B', 'C']}
                  defaultValue="A"
                  align={alignValue as 'left' | 'center' | 'right'}
                />
              }
            />,
          ]}
        />
      </section>

      {/* States Section */}
      <section
        ref={(el) => { sectionRefs.current['states'] = el; }}
        className="avakio-segmented-demo-section"
      >
        <AvakioTemplate
          type="section"
          borderType="clean"
          content="States"
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="Different component states: disabled options, fully disabled, validation, and label positions."
        />

        <AvakioLayout
          id="layout-disabled-options"
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioTemplate
              type="clean"
              borderType="clean"
              content="1. Disabled Options"
            />,
            <AvakioTemplate
              type="clean"
              borderType="clean"
              padding={[0, 0, 8, 0]}
              content="Individual segments can be disabled while others remain interactive."
            />,
            <AvakioSegmentedButton
              options={disabledOptions}
              defaultValue="available"
              label="Plan"
              labelWidth={80}
            />,
          ]}
        />

        <AvakioLayout
          id="layout-fully-disabled"
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioTemplate
              type="clean"
              borderType="clean"
              content="2. Fully Disabled"
            />,
            <AvakioTemplate
              type="clean"
              borderType="clean"
              padding={[0, 0, 8, 0]}
              content="The entire component can be disabled."
            />,
            <AvakioSegmentedButton
              options={basicOptions}
              defaultValue="section-a"
              disabled
              label="Status"
              labelWidth={80}
            />,
          ]}
        />

        <AvakioLayout
          id="layout-validation"
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioTemplate
              type="clean"
              borderType="clean"
              content="3. With Validation"
            />,
            <AvakioTemplate
              type="clean"
              borderType="clean"
              padding={[0, 0, 8, 0]}
              content="Error state with validation message."
            />,
            <AvakioSegmentedButton
              options={basicOptions}
              value={null}
              label="Required Field"
              labelWidth={120}
              required
              error="Please select an option"
            />,
          ]}
        />

        <AvakioLayout
          id="layout-label-positions"
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioTemplate
              type="clean"
              borderType="clean"
              content="4. Label Positions"
            />,
            <AvakioTemplate
              type="clean"
              borderType="clean"
              padding={[0, 0, 8, 0]}
              content="Label can be positioned to the left or on top."
            />,
            <AvakioLayout
              type="clean"
              cols={[
                <AvakioTemplate
                  type="clean"
                  borderType="clean"
                  css={{ flex: 1 }}
                  content={
                    <>
                      <p style={{ margin: '0 0 8px', fontWeight: 600 }}>Left (default)</p>
                      <AvakioSegmentedButton
                        options={viewOptions}
                        defaultValue="grid"
                        label="View Mode"
                        labelWidth={100}
                        labelPosition="left"
                      />
                    </>
                  }
                />,
                <AvakioTemplate
                  type="clean"
                  borderType="clean"
                  css={{ flex: 1 }}
                  content={
                    <>
                      <p style={{ margin: '0 0 8px', fontWeight: 600 }}>Top</p>
                      <AvakioSegmentedButton
                        options={viewOptions}
                        defaultValue="grid"
                        label="View Mode"
                        labelPosition="top"
                      />
                    </>
                  }
                />,
              ]}
            />,
          ]}
        />

        <AvakioLayout
          id="layout-borderless"
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioTemplate
              type="clean"
              borderType="clean"
              content="5. Borderless Style"
            />,
            <AvakioTemplate
              type="clean"
              borderType="clean"
              padding={[0, 0, 8, 0]}
              content="Clean, borderless appearance for minimal UI."
            />,
            <AvakioSegmentedButton
              options={viewOptions}
              defaultValue="grid"
              borderless
            />,
          ]}
        />
      </section>

      {/* Imperative Methods Section */}
      <section
        ref={(el) => { sectionRefs.current['methods'] = el; }}
        className="avakio-segmented-demo-section"
      >
        <AvakioTemplate
          type="section"
          borderType="clean"
          content="Imperative Methods"
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="Control the component programmatically using ref methods."
        />

        <AvakioLayout
          id="layout-methods"
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioSegmentedButton
              ref={methodsRef}
              options={[
                { id: 'opt-a', value: 'Option A' },
                { id: 'opt-b', value: 'Option B' },
                { id: 'opt-c', value: 'Option C' },
                { id: 'opt-d', value: 'Option D' },
              ]}
              defaultValue="opt-a"
              label="Demo"
              labelWidth={80}
              onChange={(val) => setMethodsStatus(`Selected: ${val}`)}
            />,
            <AvakioTemplate
              type="clean"
              borderType="clean"
              padding={[16, 0, 0, 0]}
              content={
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  <AvakioButton
                    label="getValue()"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const val = methodsRef.current?.getValue();
                      setMethodsStatus(`Current value: ${val}`);
                    }}
                  />
                  <AvakioButton
                    label="setValue('opt-b')"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      methodsRef.current?.setValue('opt-b');
                      setMethodsStatus('Set value to opt-b');
                    }}
                  />
                  <AvakioButton
                    label="hideOption('opt-c')"
                    variant="outline"
                    size="sm"
                    icon={<EyeOff size={14} />}
                    onClick={() => {
                      methodsRef.current?.hideOption('opt-c');
                      setMethodsStatus('Hidden option C');
                    }}
                  />
                  <AvakioButton
                    label="showOption('opt-c')"
                    variant="outline"
                    size="sm"
                    icon={<Eye size={14} />}
                    onClick={() => {
                      methodsRef.current?.showOption('opt-c');
                      setMethodsStatus('Shown option C');
                    }}
                  />
                  <AvakioButton
                    label="disableOption('opt-d')"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      methodsRef.current?.disableOption('opt-d');
                      setMethodsStatus('Disabled option D');
                    }}
                  />
                  <AvakioButton
                    label="enableOption('opt-d')"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      methodsRef.current?.enableOption('opt-d');
                      setMethodsStatus('Enabled option D');
                    }}
                  />
                  <AvakioButton
                    label="refresh()"
                    variant="outline"
                    size="sm"
                    icon={<RefreshCw size={14} />}
                    onClick={() => {
                      methodsRef.current?.refresh();
                      setMethodsStatus('Component refreshed');
                    }}
                  />
                  <AvakioButton
                    label="focus()"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      methodsRef.current?.focus();
                      setMethodsStatus('Component focused');
                    }}
                  />
                </div>
              }
            />,
            <AvakioTemplate
              type="clean"
              borderType="material"
              margin={[16, 0, 0, 0]}
              padding={12}
              css={{ background: 'var(--avakio-bg-secondary)' }}
              content={<p style={{ margin: 0 }}><strong>Status:</strong> {methodsStatus}</p>}
            />,
          ]}
        />
      </section>

      {/* Advanced Section */}
      <section
        ref={(el) => { sectionRefs.current['advanced'] = el; }}
        className="avakio-segmented-demo-section"
      >
        <AvakioTemplate
          type="section"
          borderType="clean"
          content="Advanced"
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="Dynamic options, event callbacks, and custom widths."
        />

        <AvakioLayout
          id="layout-dynamic"
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioTemplate
              type="clean"
              borderType="clean"
              content="1. Dynamic Options"
            />,
            <AvakioTemplate
              type="clean"
              borderType="clean"
              padding={[0, 0, 8, 0]}
              content="Add or remove options dynamically at runtime."
            />,
            <AvakioSegmentedButton
              value={dynamicValue}
              options={dynamicOptions}
              onChange={(val) => setDynamicValue(val)}
            />,
            <AvakioTemplate
              type="clean"
              borderType="clean"
              padding={[16, 0, 0, 0]}
              content={
                <div style={{ display: 'flex', gap: '8px' }}>
                  <AvakioButton
                    icon={<Plus size={16} />}
                    label="Add Option"
                    variant="primary"
                    size="sm"
                    onClick={handleAddOption}
                  />
                  <AvakioButton
                    icon={<Trash2 size={16} />}
                    label="Remove Last"
                    variant="outline"
                    size="sm"
                    onClick={handleRemoveOption}
                    disabled={dynamicOptions.length <= 1}
                  />
                </div>
              }
            />,
          ]}
        />

        <AvakioLayout
          id="layout-events"
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioTemplate
              type="clean"
              borderType="clean"
              content="2. Event Callbacks"
            />,
            <AvakioTemplate
              type="clean"
              borderType="clean"
              padding={[0, 0, 8, 0]}
              content="Listen to events like onChange, onBeforeTabClick, and onAfterTabClick."
            />,
            <AvakioSegmentedButton
              options={[
                { id: 'tab-1', value: 'Tab 1' },
                { id: 'tab-2', value: 'Tab 2' },
                { id: 'tab-3', value: 'Tab 3 (blocked)' },
              ]}
              defaultValue="tab-1"
              onBeforeTabClick={(id) => {
                if (id === 'tab-3') {
                  alert('Tab 3 is blocked via onBeforeTabClick returning false');
                  return false;
                }
              }}
              onAfterTabClick={(id) => {
                console.log(`Tab clicked: ${id}`);
              }}
              onChange={(val, opt) => {
                console.log(`Value changed to: ${val}`, opt);
              }}
            />,
            <AvakioTemplate
              type="clean"
              borderType="clean"
              padding={[8, 0, 0, 0]}
              css={{ fontStyle: 'italic', color: 'var(--avakio-text-muted)' }}
              content="Try clicking 'Tab 3' - it will be blocked. Check console for other event logs."
            />,
          ]}
        />

        <AvakioLayout
          id="layout-custom-width"
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioTemplate
              type="clean"
              borderType="clean"
              content="3. Custom Option Width"
            />,
            <AvakioTemplate
              type="clean"
              borderType="clean"
              padding={[0, 0, 8, 0]}
              content="Set a fixed width for each segment."
            />,
            <AvakioSegmentedButton
              options={basicOptions}
              defaultValue="section-a"
              optionWidth={120}
            />,
          ]}
        />
      </section>

      {/* Documentation Section */}
      <section
        ref={(el) => { sectionRefs.current['docs'] = el; }}
        className="avakio-segmented-demo-section"
        data-section="docs"
      >
        <AvakioTemplate
          type="section"
          borderType="clean"
          content="Documentation"
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="Quick reference for using the AvakioSegmentedButton component."
        />

        <AvakioLayout
          id="layout-docs"
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioTemplate
              type="clean"
              borderType="clean"
              content={
                <div>
                  <h4 style={{ margin: '0 0 12px' }}>Key Props</h4>
                  <ul style={{ margin: 0, paddingLeft: '20px', lineHeight: 1.8 }}>
                    <li><code>options</code> - Array of options (objects or strings)</li>
                    <li><code>value</code> / <code>defaultValue</code> - Selected value (controlled/uncontrolled)</li>
                    <li><code>size</code> - 'sm' | 'md' | 'lg'</li>
                    <li><code>fill</code> - Stretch to fill width</li>
                    <li><code>align</code> - 'left' | 'center' | 'right'</li>
                    <li><code>label</code> / <code>labelPosition</code> - Label text and position</li>
                    <li><code>disabled</code> - Disable the control</li>
                    <li><code>borderless</code> - Remove borders</li>
                    <li><code>theme</code> - Theme variant</li>
                  </ul>
                </div>
              }
            />,
            <AvakioTemplate
              type="clean"
              borderType="clean"
              padding={[16, 0, 0, 0]}
              content={
                <div>
                  <h4 style={{ margin: '0 0 12px' }}>Ref Methods</h4>
                  <ul style={{ margin: 0, paddingLeft: '20px', lineHeight: 1.8 }}>
                    <li><code>getValue()</code> / <code>setValue(value)</code> - Get/set selected value</li>
                    <li><code>getOption(id)</code> / <code>getOptions()</code> - Get option(s)</li>
                    <li><code>addOption(option, index?)</code> / <code>removeOption(id)</code> - Add/remove options</li>
                    <li><code>hideOption(id)</code> / <code>showOption(id)</code> - Hide/show options</li>
                    <li><code>disableOption(id)</code> / <code>enableOption(id)</code> - Disable/enable options</li>
                    <li><code>focus()</code> / <code>blur()</code> - Focus management</li>
                    <li><code>refresh()</code> - Force re-render</li>
                  </ul>
                </div>
              }
            />,
            <AvakioTemplate
              type="clean"
              borderType="clean"
              padding={[16, 0, 0, 0]}
              content={
                <div>
                  <h4 style={{ margin: '0 0 12px' }}>Keyboard Navigation</h4>
                  <ul style={{ margin: 0, paddingLeft: '20px', lineHeight: 1.8 }}>
                    <li><code>Arrow Left/Up</code> - Previous segment</li>
                    <li><code>Arrow Right/Down</code> - Next segment</li>
                    <li><code>Home</code> - First segment</li>
                    <li><code>End</code> - Last segment</li>
                    <li><code>Enter/Space</code> - Select focused segment</li>
                  </ul>
                </div>
              }
            />,
          ]}
        />
      </section>
    </div>
  );
}

export default AvakioSegmentedButtonExample;





















