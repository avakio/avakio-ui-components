import React, { useState, useRef } from 'react';
import { AvakioRadio, AvakioRadioOption, AvakioRadioRef } from '../../components/avakio/ui-controls/avakio-radio/avakio-radio';
import { CircleDot, Layers, AlignLeft, AlignVerticalJustifyCenter, EyeOff, Paintbrush, Settings, Home, User, Bell, Shield, Globe } from 'lucide-react';
import { AvakioViewHeader } from '../../components/avakio/ui-widgets/avakio-view-header/avakio-view-header';
import { AvakioTemplate } from '../../components/avakio/views/avakio-template/avakio-template';
import { AvakioLayout } from '../../components/avakio/layouts/avakio-layout/avakio-layout';
import { AvakioTabBar } from '../../components/avakio/ui-controls/avakio-tabbar/avakio-tabbar';

// Tab options for navigation
const TAB_OPTIONS = [
  { id: 'basic', label: 'Basic Usage', icon: <CircleDot size={14} /> },
  { id: 'vertical', label: 'Vertical Layout', icon: <AlignVerticalJustifyCenter size={14} /> },
  { id: 'icons', label: 'With Icons', icon: <Layers size={14} /> },
  { id: 'states', label: 'States', icon: <EyeOff size={14} /> },
  { id: 'sizes', label: 'Sizes', icon: <AlignLeft size={14} /> },
  { id: 'imperative', label: 'Imperative API', icon: <Paintbrush size={14} /> },
];

export function AvakioRadioExample({ theme = 'material' }: { theme?: string }) {
  const [activeSection, setActiveSection] = useState<string | number | null>('basic');

  // Demo state values
  const [basicValue, setBasicValue] = useState<string | number>('master');
  const [verticalValue, setVerticalValue] = useState<string | number>('daily');
  const [iconValue, setIconValue] = useState<string | number>('home');
  const [statesValue, setStatesValue] = useState<string | number>('enabled');
  const [sizeSmValue, setSizeSmValue] = useState<string | number>('opt1');
  const [sizeMdValue, setSizeMdValue] = useState<string | number>('opt1');
  const [sizeLgValue, setSizeLgValue] = useState<string | number>('opt1');
  const [imperativeValue, setImperativeValue] = useState<string | number>('option1');

  // Ref for imperative demo
  const radioRef = useRef<AvakioRadioRef>(null);

  // Section refs for scroll navigation
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

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

  // Basic options
  const branchOptions: AvakioRadioOption[] = [
    { id: 'master', value: 'Master' },
    { id: 'develop', value: 'Develop' },
    { id: 'feature', value: 'Feature' },
  ];

  // Simple string array options
  const simpleOptions = ['Option A', 'Option B', 'Option C'];

  // Vertical options
  const frequencyOptions: AvakioRadioOption[] = [
    { id: 'daily', value: 'Daily' },
    { id: 'weekly', value: 'Weekly' },
    { id: 'monthly', value: 'Monthly' },
    { id: 'yearly', value: 'Yearly' },
  ];

  // Options with icons
  const navigationOptions: AvakioRadioOption[] = [
    { id: 'home', value: 'Home', icon: <Home size={16} /> },
    { id: 'profile', value: 'Profile', icon: <User size={16} /> },
    { id: 'notifications', value: 'Notifications', icon: <Bell size={16} /> },
    { id: 'settings', value: 'Settings', icon: <Settings size={16} /> },
  ];

  // Options with disabled/hidden states
  const stateOptions: AvakioRadioOption[] = [
    { id: 'enabled', value: 'Enabled Option' },
    { id: 'disabled', value: 'Disabled Option', disabled: true },
    { id: 'hidden', value: 'Hidden Option', hidden: true },
    { id: 'another', value: 'Another Enabled' },
  ];

  // Size demo options
  const sizeOptions: AvakioRadioOption[] = [
    { id: 'opt1', value: 'Option 1' },
    { id: 'opt2', value: 'Option 2' },
    { id: 'opt3', value: 'Option 3' },
  ];

  // Imperative demo options
  const imperativeOptions: AvakioRadioOption[] = [
    { id: 'option1', value: 'Option 1' },
    { id: 'option2', value: 'Option 2' },
    { id: 'option3', value: 'Option 3' },
    { id: 'option4', value: 'Option 4' },
  ];

  return (
    <div className="avakio-radio-demo-container">
      {/* Sticky Header + Tab Navigation */}
      <div className="avakio-example-sticky-header">
        {/* Header */}
        <AvakioViewHeader
          label="UI Controls"
          title="Radio Component"
          subTitle="A radio button group for selecting one option from a set. Supports horizontal/vertical layout, icons, disabled states, and keyboard navigation."
          isSticky={false}
        />

        {/* Tab Navigation */}
        <div className="avakio-example-tabbar-container">
          <AvakioTabBar
            id="radio-demo-tabs"
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
        className="avakio-radio-demo-section"
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
          content="Simple radio button group with horizontal layout. Use arrow keys to navigate between options."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioRadio
              key="basic-radio"
              value={basicValue}
              options={branchOptions}
              onChange={({ value }) => setBasicValue(value)}
              label="Branch"
              labelWidth={80}
              required
            />,
            <div key="basic-result" className="avakio-radio-result">
              Selected: <strong>{basicValue}</strong>
            </div>,
          ]}
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="You can also pass a simple string array for options:"
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioRadio
              key="simple-radio"
              options={simpleOptions}
              defaultValue="Option A"
              label="Choice"
              labelWidth={80}
            />,
          ]}
        />
      </section>

      {/* Vertical Layout Section */}
      <section
        ref={(el) => { sectionRefs.current['vertical'] = el; }}
        className="avakio-radio-demo-section"
      >
        <AvakioTemplate
          type="section"
          borderType="clean"
          content="Vertical Layout"
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="Set vertical={true} to stack radio options vertically. Also showing labelPosition='top'."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioRadio
              key="vertical-radio"
              value={verticalValue}
              options={frequencyOptions}
              onChange={({ value }) => setVerticalValue(value)}
              label="Frequency"
              labelPosition="top"
              vertical
              bottomLabel="Select how often you want to receive updates"
            />,
            <div key="vertical-result" className="avakio-radio-result">
              Selected frequency: <strong>{verticalValue}</strong>
            </div>,
          ]}
        />
      </section>

      {/* With Icons Section */}
      <section
        ref={(el) => { sectionRefs.current['icons'] = el; }}
        className="avakio-radio-demo-section"
      >
        <AvakioTemplate
          type="section"
          borderType="clean"
          content="With Icons"
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="Options can include icons for better visual distinction."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioRadio
              key="icon-radio"
              value={iconValue}
              options={navigationOptions}
              onChange={({ value }) => setIconValue(value)}
              label="Navigate to"
              labelWidth={100}
            />,
            <div key="icon-result" className="avakio-radio-result">
              Go to: <strong>{iconValue}</strong>
            </div>,
          ]}
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="Vertical layout with icons:"
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioRadio
              key="icon-vertical-radio"
              options={[
                { id: 'public', value: 'Public Access', icon: <Globe size={16} /> },
                { id: 'private', value: 'Private Access', icon: <Shield size={16} /> },
                { id: 'restricted', value: 'Restricted Access', icon: <User size={16} /> },
              ]}
              defaultValue="private"
              label="Visibility"
              labelPosition="top"
              vertical
            />,
          ]}
        />
      </section>

      {/* States Section */}
      <section
        ref={(el) => { sectionRefs.current['states'] = el; }}
        className="avakio-radio-demo-section"
      >
        <AvakioTemplate
          type="section"
          borderType="clean"
          content="Disabled & Hidden States"
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="Options can be individually disabled or hidden. The entire group can also be disabled."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioRadio
              key="states-radio"
              value={statesValue}
              options={stateOptions}
              onChange={({ value }) => setStatesValue(value)}
              label="States Demo"
              labelWidth={110}
            />,
            <div key="states-result" className="avakio-radio-result">
              Selected: <strong>{statesValue}</strong>
              <span style={{ marginLeft: 12, color: '#888' }}>(Note: "Hidden Option" is not visible)</span>
            </div>,
          ]}
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="Entire group disabled:"
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioRadio
              key="disabled-group"
              options={branchOptions}
              defaultValue="master"
              label="Disabled"
              labelWidth={110}
              disabled
            />,
          ]}
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="Invalid state with error message:"
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioRadio
              key="invalid-radio"
              options={branchOptions}
              label="Required"
              labelWidth={110}
              required
              invalid
              invalidMessage="Please select a branch"
            />,
          ]}
        />
      </section>

      {/* Sizes Section */}
      <section
        ref={(el) => { sectionRefs.current['sizes'] = el; }}
        className="avakio-radio-demo-section"
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
          content="Radio buttons come in three sizes: small (sm), medium (md), and large (lg)."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <div key="size-sm" style={{ marginBottom: 16 }}>
              <AvakioRadio
                value={sizeSmValue}
                options={sizeOptions}
                onChange={({ value }) => setSizeSmValue(value)}
                label="Small"
                labelWidth={80}
                size="sm"
              />
            </div>,
            <div key="size-md" style={{ marginBottom: 16 }}>
              <AvakioRadio
                value={sizeMdValue}
                options={sizeOptions}
                onChange={({ value }) => setSizeMdValue(value)}
                label="Medium"
                labelWidth={80}
                size="md"
              />
            </div>,
            <div key="size-lg">
              <AvakioRadio
                value={sizeLgValue}
                options={sizeOptions}
                onChange={({ value }) => setSizeLgValue(value)}
                label="Large"
                labelWidth={80}
                size="lg"
              />
            </div>,
          ]}
        />
      </section>

      {/* Imperative API Section */}
      <section
        ref={(el) => { sectionRefs.current['imperative'] = el; }}
        className="avakio-radio-demo-section"
      >
        <AvakioTemplate
          type="section"
          borderType="clean"
          content="Imperative API"
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="Use the ref to programmatically control the radio group: getValue, setValue, enable/disableOption, show/hideOption."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioRadio
              key="imperative-radio"
              ref={radioRef}
              value={imperativeValue}
              options={imperativeOptions}
              onChange={({ value }) => setImperativeValue(value)}
              label="Controlled"
              labelWidth={100}
            />,
            <div key="imperative-actions" className="avakio-radio-actions">
              <button
                type="button"
                className="avakio-radio-action-btn"
                onClick={() => radioRef.current?.setValue('option3')}
              >
                Set to Option 3
              </button>
              <button
                type="button"
                className="avakio-radio-action-btn"
                onClick={() => radioRef.current?.disableOption('option2')}
              >
                Disable Option 2
              </button>
              <button
                type="button"
                className="avakio-radio-action-btn"
                onClick={() => radioRef.current?.enableOption('option2')}
              >
                Enable Option 2
              </button>
              <button
                type="button"
                className="avakio-radio-action-btn"
                onClick={() => radioRef.current?.hideOption('option4')}
              >
                Hide Option 4
              </button>
              <button
                type="button"
                className="avakio-radio-action-btn"
                onClick={() => radioRef.current?.showOption('option4')}
              >
                Show Option 4
              </button>
              <button
                type="button"
                className="avakio-radio-action-btn"
                onClick={() => {
                  const val = radioRef.current?.getValue();
                  alert(`Current value: ${val}`);
                }}
              >
                Get Value
              </button>
            </div>,
            <div key="imperative-result" className="avakio-radio-result">
              Current value: <strong>{imperativeValue}</strong>
            </div>,
          ]}
        />
      </section>
    </div>
  );
}

export default AvakioRadioExample;




















