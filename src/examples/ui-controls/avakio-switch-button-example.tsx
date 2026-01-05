import React, { useState, useEffect, useRef } from 'react';
import { AvakioSwitchButton, AvakioSwitchButtonRef } from '../../components/avakio/ui-controls/avakio-switch-button';
import { AvakioTemplate } from '../../components/avakio/views/avakio-template/avakio-template';
import { AvakioLayout } from '../../components/avakio/layouts/avakio-layout/avakio-layout';
import { AvakioRichSelect } from '../../components/avakio/ui-controls/avakio-richselect/avakio-richselect';
import { AvakioText } from '../../components/avakio/ui-controls/avakio-text/avakio-text';
import { AvakioCheckbox } from '../../components/avakio/ui-controls/avakio-checkbox/avakio-checkbox';
import { AvakioCounter } from '../../components/avakio/ui-controls/avakio-counter/avakio-counter';
import { AvakioButton } from '../../components/avakio/ui-controls/avakio-button/avakio-button';
import { AvakioDataTable } from '../../components/avakio/data-presentation/avakio-datatable/AvakioDataTable';
import type { AvakioColumn } from '../../components/avakio/data-presentation/avakio-datatable/AvakioDataTable';
import { AvakioTabBar } from '../../components/avakio/ui-controls/avakio-tabbar/avakio-tabbar';
import { AvakioViewHeader } from '../../components/avakio/ui-widgets/avakio-view-header/avakio-view-header';
import { 
  ToggleRight,
  Maximize2,
  Wand2,
  Book,
  Play,
  RefreshCw,
  Tag,
  Layers,
  Volume2,
  Wifi,
  Bell,
  Moon,
  Sun,
  Settings,
  Power,
  Shield,
  Eye,
  EyeOff,
  Zap,
} from 'lucide-react';
import '../../components/avakio/ui-controls/avakio-switch-button/avakio-switch-button.css';
import './avakio-switch-button-example.css';

// Tab options for navigation
const TAB_OPTIONS = [
  { id: 'basic', label: 'Basic Usage', icon: <ToggleRight size={14} /> },
  { id: 'labels', label: 'Label Options', icon: <Tag size={14} /> },
  { id: 'sizes', label: 'Sizes', icon: <Maximize2 size={14} /> },
  { id: 'states', label: 'States', icon: <Layers size={14} /> },
  { id: 'methods', label: 'Ref Methods', icon: <Wand2 size={14} /> },
  { id: 'playground', label: 'Interactive Playground', icon: <Play size={14} /> },
  { id: 'docs', label: 'Documentation', icon: <Book size={14} /> },
];

export function AvakioSwitchButtonExample() {
  
  const [activeSection, setActiveSection] = useState<string | number | null>('basic');
  
  // Section refs for scroll navigation
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  
  // Switch states
  const [soundOn, setSoundOn] = useState(true);
  const [wifiOn, setWifiOn] = useState(true);
  const [notificationsOn, setNotificationsOn] = useState(false);
  const [darkModeOn, setDarkModeOn] = useState(false);
  const [autoSaveOn, setAutoSaveOn] = useState(true);
  const [privacyOn, setPrivacyOn] = useState(false);
  const [visibleOn, setVisibleOn] = useState(true);
  const [turboOn, setTurboOn] = useState(false);

  // Playground state
  const [playgroundValue, setPlaygroundValue] = useState(false);
  const [playgroundLabel, setPlaygroundLabel] = useState('Setting');
  const [playgroundLabelWidth, setPlaygroundLabelWidth] = useState(80);
  const [playgroundLabelRight, setPlaygroundLabelRight] = useState('');
  const [playgroundOnLabel, setPlaygroundOnLabel] = useState('');
  const [playgroundOffLabel, setPlaygroundOffLabel] = useState('');
  const [playgroundSize, setPlaygroundSize] = useState<string>('md');
  const [playgroundDisabled, setPlaygroundDisabled] = useState(false);
  const [playgroundRequired, setPlaygroundRequired] = useState(false);
  const [playgroundInvalid, setPlaygroundInvalid] = useState(false);
  const [playgroundBottomLabel, setPlaygroundBottomLabel] = useState('');

  // Ref example
  const switchRef = useRef<AvakioSwitchButtonRef>(null);
  const [refValue, setRefValue] = useState(false);

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
  

  const handleGetValue = () => {
    const value = switchRef.current?.getValue();
    setRefValue(value ?? false);
    alert(`Current value: ${value}`);
  };

  const handleSetValue = (val: boolean) => {
    switchRef.current?.setValue(val);
    setRefValue(val);
  };

  const handleToggle = () => {
    switchRef.current?.toggle();
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
    { id: 1, name: 'value', type: 'boolean | number', defaultValue: 'undefined', description: 'Current on/off state (controlled) - true/1 for on, false/0 for off' },
    { id: 2, name: 'defaultValue', type: 'boolean | number', defaultValue: 'false', description: 'Default on/off state (uncontrolled)' },
    { id: 3, name: 'label', type: 'string', defaultValue: 'undefined', description: 'Label text displayed to the left of the switch' },
    { id: 4, name: 'labelWidth', type: 'number', defaultValue: '80', description: 'Width of the left label in pixels' },
    { id: 5, name: 'labelRight', type: 'string', defaultValue: 'undefined', description: 'Right-hand label text' },
    { id: 6, name: 'onLabel', type: 'string', defaultValue: 'undefined', description: 'Text label displayed on the switch when in the "on" state' },
    { id: 7, name: 'offLabel', type: 'string', defaultValue: 'undefined', description: 'Text label displayed on the switch when in the "off" state' },
    { id: 8, name: 'size', type: "'sm' | 'md' | 'lg'", defaultValue: "'md'", description: 'Switch size' },
    { id: 9, name: 'theme', type: "'material' | 'flat' | 'compact' | 'dark' | 'ocean' | 'sunset'", defaultValue: 'undefined', description: 'Theme variant' },
    { id: 10, name: 'disabled', type: 'boolean', defaultValue: 'false', description: 'Disabled state' },
    { id: 11, name: 'required', type: 'boolean', defaultValue: 'false', description: 'Required field indicator' },
    { id: 12, name: 'invalid', type: 'boolean', defaultValue: 'false', description: 'Invalid state' },
    { id: 13, name: 'invalidMessage', type: 'string', defaultValue: 'undefined', description: 'Validation error message' },
    { id: 14, name: 'bottomLabel', type: 'string', defaultValue: 'undefined', description: 'Bottom label/help text' },
    { id: 15, name: 'tooltip', type: 'string', defaultValue: 'undefined', description: 'Tooltip text' },
    { id: 16, name: 'onChange', type: '(value: boolean) => void', defaultValue: 'undefined', description: 'Callback when value changes' },
  ];

  const refMethodsData: PropDoc[] = [
    { id: 1, name: 'getValue()', type: '() => boolean', defaultValue: '-', description: 'Get the current on/off state' },
    { id: 2, name: 'setValue(value)', type: '(value: boolean) => void', defaultValue: '-', description: 'Set the on/off state' },
    { id: 3, name: 'toggle()', type: '() => void', defaultValue: '-', description: 'Toggle the state' },
    { id: 4, name: 'focus()', type: '() => void', defaultValue: '-', description: 'Focus the switch' },
    { id: 5, name: 'blur()', type: '() => void', defaultValue: '-', description: 'Blur the switch' },
    { id: 6, name: 'enable()', type: '() => void', defaultValue: '-', description: 'Enable the switch' },
    { id: 7, name: 'disable()', type: '() => void', defaultValue: '-', description: 'Disable the switch' },
    { id: 8, name: 'isEnabled()', type: '() => boolean', defaultValue: '-', description: 'Check if enabled' },
    { id: 9, name: 'getNode()', type: '() => HTMLButtonElement | null', defaultValue: '-', description: 'Get the HTML element' },
    { id: 10, name: 'refresh()', type: '() => void', defaultValue: '-', description: 'Refresh/repaint the component' },
  ];

  const propsColumns: AvakioColumn<PropDoc>[] = [
    { id: 'name', header: 'Property', width: 150 },
    { id: 'type', header: 'Type', width: 250 },
    { id: 'defaultValue', header: 'Default', width: 100 },
    { id: 'description', header: 'Description', width: 400 },
  ];

  return (
    <div className="avakio-switch-button-demo-container">
      {/* Sticky Header + Tab Navigation */}
      <div className="avakio-switch-button-sticky-header">
        {/* Header */}
        <AvakioViewHeader
          label="UI Controls"
          title="Switch Button"                                
          subTitle="A slider variation of the Toggle button and Checkbox for turning settings on and off."
          isSticky={false}
        />

        {/* Tab Navigation */}
        <div className="avakio-switch-button-tabbar-container">
          <AvakioTabBar
            id="switch-button-demo-tabs"
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
        className="avakio-switch-button-demo-section"
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
          content="A simple on/off switch control. Click or tap to toggle between states."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <div key="basic" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <AvakioSwitchButton
                label="Sound"
                value={soundOn}
                onChange={setSoundOn}
              />
              <AvakioSwitchButton
                label="WiFi"
                value={wifiOn}
                onChange={setWifiOn}
              />
              <AvakioSwitchButton
                label="Notifications"
                value={notificationsOn}
                onChange={setNotificationsOn}
              />
              <AvakioSwitchButton
                label="Dark Mode"
                value={darkModeOn}
                onChange={setDarkModeOn}
              />
            </div>,
          ]}
        />
      </section>

      {/* Label Options Section */}
      <section 
        ref={(el) => { sectionRefs.current['labels'] = el; }}
        className="avakio-switch-button-demo-section"
      >
        <AvakioTemplate
          type="section"
          borderType="clean"
          content="Label Options"
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="Switches support left labels, right labels, and labels directly on the switch track."
        />
        
        {/* Left Label (Default) */}
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioTemplate
              key="left-label-title"
              type="clean"
              borderType="clean"
              content={<strong>Left Label (Default)</strong>}
            />,
            <div key="left-label" style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '12px' }}>
              <AvakioSwitchButton
                label="Sound"
                labelWidth={100}
                value={soundOn}
                onChange={setSoundOn}
              />
              <AvakioSwitchButton
                label="Notifications"
                labelWidth={100}
                value={notificationsOn}
                onChange={setNotificationsOn}
              />
            </div>,
          ]}
        />

        {/* Right Label */}
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioTemplate
              key="right-label-title"
              type="clean"
              borderType="clean"
              content={<strong>Right Label</strong>}
            />,
            <div key="right-label" style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '12px' }}>
              <AvakioSwitchButton
                labelWidth={0}
                labelRight="Enable dark mode"
                value={darkModeOn}
                onChange={setDarkModeOn}
              />
              <AvakioSwitchButton
                labelWidth={0}
                labelRight="Auto-save documents"
                value={autoSaveOn}
                onChange={setAutoSaveOn}
              />
            </div>,
          ]}
        />

        {/* On/Off Labels on Track */}
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioTemplate
              key="track-labels-title"
              type="clean"
              borderType="clean"
              content={<strong>Labels on Switch Track</strong>}
            />,
            <div key="track-labels" style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '12px' }}>
              <AvakioSwitchButton
                label="Power"
                onLabel="ON"
                offLabel="OFF"
                value={soundOn}
                onChange={setSoundOn}
              />
              <AvakioSwitchButton
                label="Status"
                onLabel="Yes"
                offLabel="No"
                value={wifiOn}
                onChange={setWifiOn}
              />
              <AvakioSwitchButton
                labelWidth={0}
                labelRight="Active Mode"
                onLabel="ON"
                offLabel="OFF"
                value={turboOn}
                onChange={setTurboOn}
              />
            </div>,
          ]}
        />
      </section>

      {/* Sizes Section */}
      <section 
        ref={(el) => { sectionRefs.current['sizes'] = el; }}
        className="avakio-switch-button-demo-section"
      >
        <AvakioTemplate
          type="section"
          borderType="clean"
          content="Sizes"
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="Switch buttons come in three sizes: small (sm), medium (md), and large (lg)."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioTemplate
              key="sizes-simple-title"
              type="clean"
              borderType="clean"
              content={<strong>Simple Switches</strong>}
            />,
            <div key="sizes-simple" style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', alignItems: 'center', marginTop: '12px' }}>
              <AvakioSwitchButton
                size="sm"
                label="Small"
                value={soundOn}
                onChange={setSoundOn}
              />
              <AvakioSwitchButton
                size="md"
                label="Medium"
                value={wifiOn}
                onChange={setWifiOn}
              />
              <AvakioSwitchButton
                size="lg"
                label="Large"
                value={notificationsOn}
                onChange={setNotificationsOn}
              />
            </div>,
            <AvakioTemplate
              key="sizes-labeled-title"
              type="clean"
              borderType="clean"
              padding={[16, 0, 0, 0]}
              content={<strong>With Track Labels</strong>}
            />,
            <div key="sizes-labeled" style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', alignItems: 'center', marginTop: '12px' }}>
              <AvakioSwitchButton
                size="sm"
                label="Small"
                onLabel="ON"
                offLabel="OFF"
                value={darkModeOn}
                onChange={setDarkModeOn}
              />
              <AvakioSwitchButton
                size="md"
                label="Medium"
                onLabel="ON"
                offLabel="OFF"
                value={autoSaveOn}
                onChange={setAutoSaveOn}
              />
              <AvakioSwitchButton
                size="lg"
                label="Large"
                onLabel="ON"
                offLabel="OFF"
                value={privacyOn}
                onChange={setPrivacyOn}
              />
            </div>,
          ]}
        />
      </section>

      {/* States Section */}
      <section 
        ref={(el) => { sectionRefs.current['states'] = el; }}
        className="avakio-switch-button-demo-section"
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
          content="Switches support disabled, required, and invalid states."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <div key="states" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <AvakioSwitchButton
                label="Normal On"
                value={true}
              />
              <AvakioSwitchButton
                label="Normal Off"
                value={false}
              />
              <AvakioSwitchButton
                label="Disabled On"
                value={true}
                disabled
              />
              <AvakioSwitchButton
                label="Disabled Off"
                value={false}
                disabled
              />
              <AvakioSwitchButton
                label="Required"
                required
                value={visibleOn}
                onChange={setVisibleOn}
              />
              <AvakioSwitchButton
                label="Invalid"
                invalid
                invalidMessage="This field is required"
                value={false}
              />
              <AvakioSwitchButton
                label="With Bottom Label"
                bottomLabel="This setting affects all users"
                value={autoSaveOn}
                onChange={setAutoSaveOn}
              />
            </div>,
          ]}
        />
      </section>

      {/* Ref Methods Section */}
      <section 
        ref={(el) => { sectionRefs.current['methods'] = el; }}
        className="avakio-switch-button-demo-section"
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
          content="Use imperative methods through a ref to programmatically control the switch."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <div key="ref-demo" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <AvakioSwitchButton
                  ref={switchRef}
                  label="Controlled"
                  onLabel="ON"
                  offLabel="OFF"
                  value={refValue}
                  onChange={setRefValue}
                />
                <span style={{ fontSize: '14px', color: 'var(--avakio-text-secondary)' }}>
                  Current value: <strong>{refValue ? 'true (on)' : 'false (off)'}</strong>
                </span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                <AvakioButton
                  size="sm"
                  label="getValue()"
                  onClick={handleGetValue}
                />
                <AvakioButton
                  size="sm"
                  label="setValue(true)"
                  onClick={() => handleSetValue(true)}
                />
                <AvakioButton
                  size="sm"
                  label="setValue(false)"
                  onClick={() => handleSetValue(false)}
                />
                <AvakioButton
                  size="sm"
                  label="toggle()"
                  onClick={handleToggle}
                  icon={<RefreshCw size={14} />}
                />
                <AvakioButton
                  size="sm"
                  label="focus()"
                  onClick={() => switchRef.current?.focus()}
                />
              </div>
            </div>,
          ]}
        />
      </section>

      {/* Interactive Playground Section */}
      <section 
        ref={(el) => { sectionRefs.current['playground'] = el; }}
        className="avakio-switch-button-demo-section avakio-hide-on-mobile"
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
          content="Experiment with different props to see how they affect the switch appearance and behavior."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          rows={[
            <AvakioLayout
              key="playground"
              type="clean"
              borderless
              cols={[
                <AvakioTemplate
                  key="controls"
                  type="clean"
                  borderType="clean"
                  width={320}
                  padding={16}
                  content={
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <AvakioText
                        label="Label"
                        labelPosition="left"
                        value={playgroundLabel}
                        onChange={setPlaygroundLabel}
                        width="100%"
                      />
                      <AvakioCounter
                        label="Label Width"
                        labelPosition="left"
                        value={playgroundLabelWidth}
                        onChange={setPlaygroundLabelWidth}
                        min={0}
                        max={200}
                        step={10}
                      />
                      <AvakioText
                        label="Label Right"
                        labelPosition="left"
                        value={playgroundLabelRight}
                        onChange={setPlaygroundLabelRight}
                        width="100%"
                      />
                      <AvakioText
                        label="On Label"
                        labelPosition="left"
                        value={playgroundOnLabel}
                        onChange={setPlaygroundOnLabel}
                        width="100%"
                      />
                      <AvakioText
                        label="Off Label"
                        labelPosition="left"
                        value={playgroundOffLabel}
                        onChange={setPlaygroundOffLabel}
                        width="100%"
                      />
                      <AvakioRichSelect
                        label="Size"
                        labelAlign="left"
                        value={playgroundSize}
                        width="100%"
                        options={[
                          { id: 'sm', value: 'Small' },
                          { id: 'md', value: 'Medium' },
                          { id: 'lg', value: 'Large' },
                        ]}
                        onChange={(val) => setPlaygroundSize(val as string)}
                      />
                      <AvakioCheckbox
                        label="Disabled"
                        checked={playgroundDisabled}
                        onChange={setPlaygroundDisabled}
                      />
                      <AvakioCheckbox
                        label="Required"
                        checked={playgroundRequired}
                        onChange={setPlaygroundRequired}
                      />
                      <AvakioCheckbox
                        label="Invalid"
                        checked={playgroundInvalid}
                        onChange={setPlaygroundInvalid}
                      />
                      <AvakioText
                        label="Bottom Label"
                        labelPosition="left"
                        value={playgroundBottomLabel}
                        onChange={setPlaygroundBottomLabel}
                        width="100%"
                      />
                    </div>
                  }
                />,
                <AvakioLayout
                  key="preview"
                  type="clean"
                  borderless
                  padding={16}
                  rows={[
                    <AvakioTemplate
                      key="preview-header"
                      type="header"
                      borderType="clean"
                      content={<h4 style={{ margin: 0 }}>Preview</h4>}
                    />,
                    <div key="preview-content" style={{ padding: '24px', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '120px', background: 'var(--avakio-bg-secondary)', borderRadius: '8px' }}>
                      <AvakioSwitchButton
                        label={playgroundLabel || undefined}
                        labelWidth={playgroundLabelWidth}
                        labelRight={playgroundLabelRight || undefined}
                        onLabel={playgroundOnLabel || undefined}
                        offLabel={playgroundOffLabel || undefined}
                        size={playgroundSize as any}
                        disabled={playgroundDisabled}
                        required={playgroundRequired}
                        invalid={playgroundInvalid}
                        invalidMessage={playgroundInvalid ? 'This field is required' : undefined}
                        bottomLabel={playgroundBottomLabel || undefined}
                        value={playgroundValue}
                        onChange={setPlaygroundValue}
                      />
                    </div>,
                    <AvakioTemplate
                      key="code"
                      type="clean"
                      borderType="clean"
                      content={
                        <pre style={{
                          background: 'var(--avakio-code-bg)',
                          color: 'var(--avakio-code-text)',
                          borderRadius: '4px',
                          overflow: 'auto',
                          lineHeight: '1.5',
                          padding: '12px',
                          fontSize: '12px',
                        }}>
{`<AvakioSwitchButton
  theme="material"${playgroundLabel ? `
  label="${playgroundLabel}"` : ''}${playgroundLabelWidth !== 80 ? `
  labelWidth={${playgroundLabelWidth}}` : ''}${playgroundLabelRight ? `
  labelRight="${playgroundLabelRight}"` : ''}${playgroundOnLabel ? `
  onLabel="${playgroundOnLabel}"` : ''}${playgroundOffLabel ? `
  offLabel="${playgroundOffLabel}"` : ''}
  size="${playgroundSize}"${playgroundDisabled ? `
  disabled` : ''}${playgroundRequired ? `
  required` : ''}${playgroundInvalid ? `
  invalid
  invalidMessage="This field is required"` : ''}${playgroundBottomLabel ? `
  bottomLabel="${playgroundBottomLabel}"` : ''}
  value={${playgroundValue}}
  onChange={setValue}
/>`}
                        </pre>
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
        className="avakio-switch-button-demo-section"
        data-section="docs"
      >
        <AvakioTemplate
          type="section"
          borderType="clean"
          content="Props Documentation"
        />
        <AvakioDataTable
          columns={propsColumns}
          data={propsData}
          height={500}
          resizable
          rowHeight={40}
        />
        
        <AvakioTemplate
          type="section"
          borderType="clean"
          content="Ref Methods Documentation"
        />
        <AvakioDataTable
          columns={propsColumns}
          data={refMethodsData}
          height={380}
          resizable
          rowHeight={40}
        />
      </section>
    </div>
  );
}





















