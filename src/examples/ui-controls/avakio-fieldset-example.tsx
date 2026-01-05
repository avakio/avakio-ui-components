import React, { useState, useRef } from 'react';
import { AvakioFieldset, AvakioFieldsetRef, AvakioFieldsetTheme } from '../../components/avakio/ui-controls/avakio-fieldset/avakio-fieldset';
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
  PanelTop,
  Palette,
  Settings2,
  Wand2,
  Book,
  Play,
  User,
  Lock,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  ChevronDown,
  ChevronUp,
  Layers,
  SquareDashedBottom,
} from 'lucide-react';
import '../../components/avakio/ui-controls/avakio-fieldset/avakio-fieldset.css';

// Tab options for navigation
const TAB_OPTIONS = [
  { id: 'basic', label: 'Basic Usage', icon: <PanelTop size={14} /> },
  { id: 'themes', label: 'Themes', icon: <Palette size={14} /> },
  { id: 'options', label: 'Options', icon: <Settings2 size={14} /> },
  { id: 'collapsible', label: 'Collapsible', icon: <Layers size={14} /> },
  { id: 'methods', label: 'Ref Methods', icon: <Wand2 size={14} /> },
  { id: 'playground', label: 'Interactive Playground', icon: <Play size={14} /> },
  { id: 'docs', label: 'Documentation', icon: <Book size={14} /> },
];

export function AvakioFieldsetExample({ theme = 'material' }: { theme?: string }) {
  const [activeSection, setActiveSection] = useState<string | number | null>('basic');
  
  // Section refs for scroll navigation
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  
  // Collapsible states
  const [userCollapsed, setUserCollapsed] = useState(false);
  const [addressCollapsed, setAddressCollapsed] = useState(true);
  const [paymentCollapsed, setPaymentCollapsed] = useState(false);

  // Playground state
  const [playgroundLabel, setPlaygroundLabel] = useState('Fieldset Label');
  const [playgroundBorderless, setPlaygroundBorderless] = useState(false);
  const [playgroundDisabled, setPlaygroundDisabled] = useState(false);
  const [playgroundCollapsible, setPlaygroundCollapsible] = useState(false);
  const [playgroundCollapsed, setPlaygroundCollapsed] = useState(false);
  const [playgroundPaddingX, setPlaygroundPaddingX] = useState(18);
  const [playgroundPaddingY, setPlaygroundPaddingY] = useState(16);
  const [playgroundWidth, setPlaygroundWidth] = useState(400);

  // Ref example
  const fieldsetRef = useRef<AvakioFieldsetRef>(null);

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
  

  // Ref method handlers
  const handleEnable = () => fieldsetRef.current?.enable();
  const handleDisable = () => fieldsetRef.current?.disable();
  const handleCollapse = () => fieldsetRef.current?.collapse();
  const handleExpand = () => fieldsetRef.current?.expand();
  const handleToggle = () => fieldsetRef.current?.toggle();
  const handleIsEnabled = () => alert(`isEnabled: ${fieldsetRef.current?.isEnabled()}`);
  const handleIsCollapsed = () => alert(`isCollapsed: ${fieldsetRef.current?.isCollapsed()}`);

  // Props documentation data
  interface PropDoc {
    id: number;
    name: string;
    type: string;
    defaultValue: string;
    description: string;
  }

  const propsData: PropDoc[] = [
    { id: 1, name: 'label', type: 'string', defaultValue: 'undefined', description: 'Legend/label text displayed at the top border of the fieldset' },
    { id: 2, name: 'children', type: 'ReactNode', defaultValue: 'undefined', description: 'Body content of the fieldset' },
    { id: 3, name: 'borderless', type: 'boolean', defaultValue: 'false', description: 'Whether to hide the border' },
    { id: 4, name: 'theme', type: "'material' | 'flat' | 'compact' | 'dark' | 'ocean' | 'sunset'", defaultValue: 'undefined', description: 'Theme variant' },
    { id: 5, name: 'disabled', type: 'boolean', defaultValue: 'false', description: 'Disabled state - dims the fieldset' },
    { id: 6, name: 'width', type: 'number | string', defaultValue: 'undefined', description: 'Width of the fieldset' },
    { id: 7, name: 'height', type: 'number | string', defaultValue: 'undefined', description: 'Height of the fieldset' },
    { id: 8, name: 'paddingX', type: 'number', defaultValue: '18', description: 'Horizontal padding (left and right) in pixels' },
    { id: 9, name: 'paddingY', type: 'number', defaultValue: '16', description: 'Vertical padding (top and bottom) in pixels' },
    { id: 10, name: 'collapsible', type: 'boolean', defaultValue: 'false', description: 'Whether the fieldset can be collapsed' },
    { id: 11, name: 'defaultCollapsed', type: 'boolean', defaultValue: 'false', description: 'Default collapsed state (uncontrolled)' },
    { id: 12, name: 'collapsed', type: 'boolean', defaultValue: 'undefined', description: 'Controlled collapsed state' },
    { id: 13, name: 'onCollapse', type: '(collapsed: boolean) => void', defaultValue: 'undefined', description: 'Callback when collapsed state changes' },
    { id: 14, name: 'icon', type: 'ReactNode', defaultValue: 'undefined', description: 'Icon to display before the label' },
    { id: 15, name: 'css', type: 'React.CSSProperties', defaultValue: 'undefined', description: 'Custom inline styles' },
    { id: 16, name: 'className', type: 'string', defaultValue: "''", description: 'Additional CSS class name' },
  ];

  const refMethodsData: PropDoc[] = [
    { id: 1, name: 'getNode()', type: '() => HTMLFieldSetElement | null', defaultValue: '-', description: 'Get the fieldset DOM node' },
    { id: 2, name: 'getBody()', type: '() => HTMLDivElement | null', defaultValue: '-', description: 'Get the body container element' },
    { id: 3, name: 'isEnabled()', type: '() => boolean', defaultValue: '-', description: 'Check if the fieldset is enabled' },
    { id: 4, name: 'enable()', type: '() => void', defaultValue: '-', description: 'Enable the fieldset' },
    { id: 5, name: 'disable()', type: '() => void', defaultValue: '-', description: 'Disable the fieldset' },
    { id: 6, name: 'collapse()', type: '() => void', defaultValue: '-', description: 'Collapse the fieldset (if collapsible)' },
    { id: 7, name: 'expand()', type: '() => void', defaultValue: '-', description: 'Expand the fieldset (if collapsible)' },
    { id: 8, name: 'isCollapsed()', type: '() => boolean', defaultValue: '-', description: 'Check if the fieldset is collapsed' },
    { id: 9, name: 'toggle()', type: '() => void', defaultValue: '-', description: 'Toggle collapsed state' },
  ];

  const propsColumns: AvakioColumn<PropDoc>[] = [
    { id: 'name', header: 'Property', width: 150 },
    { id: 'type', header: 'Type', width: 280 },
    { id: 'defaultValue', header: 'Default', width: 100 },
    { id: 'description', header: 'Description', width: 400 },
  ];

  const themes: AvakioFieldsetTheme[] = ['material', 'flat', 'compact', 'dark', 'ocean', 'sunset'];

  return (
    <div className="avakio-fieldset-demo-container">
      {/* Sticky Header + Tab Navigation */}
      <div className="avakio-example-sticky-header">
        {/* Header */}
        <AvakioViewHeader
          label="UI Controls"
          title="Fieldset"                                
          subTitle="A grouping control based on HTML fieldset, designed to group related form elements with an optional legend/label."
          isSticky={false}
        />

        {/* Tab Navigation */}
        <div className="avakio-example-tabbar-container">
          <AvakioTabBar
            id="fieldset-demo-tabs"
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
        className="avakio-fieldset-demo-section"
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
          content="A simple fieldset with a label (legend) that groups related form fields together."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <div key="basic" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <AvakioFieldset
                theme={theme as AvakioFieldsetTheme}
                label="Personal Information"
                width={400}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <AvakioText
                    label="First Name"
                    placeholder="Enter your first name"
                  />
                  <AvakioText
                    label="Last Name"
                    placeholder="Enter your last name"
                  />
                  <AvakioText
                    label="Email"
                    placeholder="Enter your email"
                  />
                </div>
              </AvakioFieldset>

              <AvakioFieldset
                theme={theme as AvakioFieldsetTheme}
                label="Preferences"
                width={400}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <AvakioCheckbox
                    label="Receive newsletter"
                  />
                  <AvakioCheckbox
                    label="Enable notifications"
                  />
                  <AvakioCheckbox
                    label="Allow marketing emails"
                  />
                </div>
              </AvakioFieldset>
            </div>,
          ]}
        />
      </section>

      {/* Themes Section */}
      <section 
        ref={(el) => { sectionRefs.current['themes'] = el; }}
        className="avakio-fieldset-demo-section"
      >
        <AvakioTemplate
          type="section"
          borderType="clean"
          content="Themes"
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="Fieldset supports multiple theme variants: material, flat, compact, dark, ocean, and sunset."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <div key="themes" style={{ display: 'flex', flexWrap: 'wrap', gap: '24px' }}>
              {themes.map((t) => (
                <AvakioFieldset
                  key={t}
                  theme={t}
                  label={`${t.charAt(0).toUpperCase() + t.slice(1)} Theme`}
                  width={280}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <AvakioText
                      theme={t as any}
                      label="Name"
                      placeholder="Enter name"
                    />
                    <AvakioCheckbox
                      label="Active"
                    />
                  </div>
                </AvakioFieldset>
              ))}
            </div>,
          ]}
        />
      </section>

      {/* Options Section */}
      <section 
        ref={(el) => { sectionRefs.current['options'] = el; }}
        className="avakio-fieldset-demo-section"
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
          content="Customize the fieldset with options like borderless, disabled, padding, and icons."
        />

        {/* Borderless */}
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioTemplate
              key="borderless-title"
              type="clean"
              borderType="clean"
              content={<strong>Borderless</strong>}
            />,
            <div key="borderless" style={{ display: 'flex', gap: '24px', marginTop: '12px' }}>
              <AvakioFieldset
                theme={theme as AvakioFieldsetTheme}
                label="With Border"
                width={250}
              >
                <p style={{ margin: 0 }}>Normal fieldset with border</p>
              </AvakioFieldset>
              <AvakioFieldset
                theme={theme as AvakioFieldsetTheme}
                label="Borderless"
                borderless
                width={250}
              >
                <p style={{ margin: 0 }}>Borderless fieldset</p>
              </AvakioFieldset>
            </div>,
          ]}
        />

        {/* With Icons */}
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioTemplate
              key="icons-title"
              type="clean"
              borderType="clean"
              content={<strong>With Icons</strong>}
            />,
            <div key="icons" style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', marginTop: '12px' }}>
              <AvakioFieldset
                theme={theme as AvakioFieldsetTheme}
                label="User Info"
                icon={<User size={14} />}
                width={250}
              >
                <p style={{ margin: 0 }}>User information section</p>
              </AvakioFieldset>
              <AvakioFieldset
                theme={theme as AvakioFieldsetTheme}
                label="Security"
                icon={<Lock size={14} />}
                width={250}
              >
                <p style={{ margin: 0 }}>Security settings</p>
              </AvakioFieldset>
              <AvakioFieldset
                theme={theme as AvakioFieldsetTheme}
                label="Contact"
                icon={<Mail size={14} />}
                width={250}
              >
                <p style={{ margin: 0 }}>Contact information</p>
              </AvakioFieldset>
            </div>,
          ]}
        />

        {/* Custom Padding */}
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioTemplate
              key="padding-title"
              type="clean"
              borderType="clean"
              content={<strong>Custom Padding</strong>}
            />,
            <div key="padding" style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', marginTop: '12px' }}>
              <AvakioFieldset
                theme={theme as AvakioFieldsetTheme}
                label="Default Padding"
                width={200}
              >
                <p style={{ margin: 0, background: '#f0f0f0', padding: '4px' }}>paddingX: 18, paddingY: 16</p>
              </AvakioFieldset>
              <AvakioFieldset
                theme={theme as AvakioFieldsetTheme}
                label="Small Padding"
                paddingX={8}
                paddingY={8}
                width={200}
              >
                <p style={{ margin: 0, background: '#f0f0f0', padding: '4px' }}>paddingX: 8, paddingY: 8</p>
              </AvakioFieldset>
              <AvakioFieldset
                theme={theme as AvakioFieldsetTheme}
                label="Large Padding"
                paddingX={32}
                paddingY={24}
                width={250}
              >
                <p style={{ margin: 0, background: '#f0f0f0', padding: '4px' }}>paddingX: 32, paddingY: 24</p>
              </AvakioFieldset>
            </div>,
          ]}
        />

        {/* Disabled */}
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
            <div key="disabled" style={{ display: 'flex', gap: '24px', marginTop: '12px' }}>
              <AvakioFieldset
                theme={theme as AvakioFieldsetTheme}
                label="Enabled Fieldset"
                width={250}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <AvakioText
                    label="Name"
                    placeholder="Enter name"
                  />
                  <AvakioButton>Submit</AvakioButton>
                </div>
              </AvakioFieldset>
              <AvakioFieldset
                theme={theme as AvakioFieldsetTheme}
                label="Disabled Fieldset"
                disabled
                width={250}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <AvakioText
                    label="Name"
                    placeholder="Enter name"
                  />
                  <AvakioButton>Submit</AvakioButton>
                </div>
              </AvakioFieldset>
            </div>,
          ]}
        />
      </section>

      {/* Collapsible Section */}
      <section 
        ref={(el) => { sectionRefs.current['collapsible'] = el; }}
        className="avakio-fieldset-demo-section"
      >
        <AvakioTemplate
          type="section"
          borderType="clean"
          content="Collapsible"
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="Fieldsets can be made collapsible to save space and organize content into expandable sections."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <div key="collapsible" style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: 450 }}>
              <AvakioFieldset
                theme={theme as AvakioFieldsetTheme}
                label="User Information"
                icon={<User size={14} />}
                collapsible
                collapsed={userCollapsed}
                onCollapse={setUserCollapsed}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <AvakioText
                    label="Full Name"
                    placeholder="Enter your name"
                  />
                  <AvakioText
                    label="Email"
                    placeholder="Enter your email"
                  />
                </div>
              </AvakioFieldset>

              <AvakioFieldset
                theme={theme as AvakioFieldsetTheme}
                label="Address"
                icon={<MapPin size={14} />}
                collapsible
                collapsed={addressCollapsed}
                onCollapse={setAddressCollapsed}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <AvakioText
                    label="Street"
                    placeholder="Street address"
                  />
                  <AvakioText
                    label="City"
                    placeholder="City"
                  />
                  <AvakioText
                    label="ZIP Code"
                    placeholder="ZIP code"
                  />
                </div>
              </AvakioFieldset>

              <AvakioFieldset
                theme={theme as AvakioFieldsetTheme}
                label="Payment Details"
                icon={<CreditCard size={14} />}
                collapsible
                collapsed={paymentCollapsed}
                onCollapse={setPaymentCollapsed}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <AvakioText
                    label="Card Number"
                    placeholder="XXXX-XXXX-XXXX-XXXX"
                  />
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <AvakioText
                      label="Expiry"
                      placeholder="MM/YY"
                    />
                    <AvakioText
                      label="CVV"
                      placeholder="XXX"
                    />
                  </div>
                </div>
              </AvakioFieldset>
            </div>,
          ]}
        />
      </section>

      {/* Ref Methods Section */}
      <section 
        ref={(el) => { sectionRefs.current['methods'] = el; }}
        className="avakio-fieldset-demo-section"
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
            <div key="methods" style={{ display: 'flex', gap: '24px' }}>
              <div style={{ flex: 1 }}>
                <AvakioFieldset
                  ref={fieldsetRef}
                  theme={theme as AvakioFieldsetTheme}
                  label="Controlled Fieldset"
                  icon={<Settings2 size={14} />}
                  collapsible
                  width={350}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <AvakioText
                      label="Field 1"
                      placeholder="Enter value"
                    />
                    <AvakioText
                      label="Field 2"
                      placeholder="Enter value"
                    />
                  </div>
                </AvakioFieldset>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', minWidth: 150 }}>
                <AvakioButton onClick={handleEnable}>enable()</AvakioButton>
                <AvakioButton onClick={handleDisable}>disable()</AvakioButton>
                <AvakioButton onClick={handleCollapse}>collapse()</AvakioButton>
                <AvakioButton onClick={handleExpand}>expand()</AvakioButton>
                <AvakioButton onClick={handleToggle}>toggle()</AvakioButton>
                <AvakioButton onClick={handleIsEnabled}>isEnabled()</AvakioButton>
                <AvakioButton onClick={handleIsCollapsed}>isCollapsed()</AvakioButton>
              </div>
            </div>,
          ]}
        />
      </section>

      {/* Interactive Playground Section */}
      <section 
        ref={(el) => { sectionRefs.current['playground'] = el; }}
        className="avakio-fieldset-demo-section"
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
          content="Experiment with different fieldset configurations in real-time."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <div key="playground" style={{ display: 'flex', gap: '32px' }}>
              {/* Preview */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <AvakioTemplate
                  type="clean"
                  borderType="clean"
                  content={<strong>Preview</strong>}
                />
                <div style={{ 
                  padding: '24px', 
                  background: '#f9f9f9', 
                  borderRadius: '8px',
                  minHeight: '200px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'center'
                }}>
                  <AvakioFieldset
                    theme={theme as AvakioFieldsetTheme}
                    label={playgroundLabel}
                    borderless={playgroundBorderless}
                    disabled={playgroundDisabled}
                    collapsible={playgroundCollapsible}
                    collapsed={playgroundCollapsible ? playgroundCollapsed : undefined}
                    onCollapse={playgroundCollapsible ? setPlaygroundCollapsed : undefined}
                    paddingX={playgroundPaddingX}
                    paddingY={playgroundPaddingY}
                    width={playgroundWidth}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <AvakioText
                        label="Sample Field"
                        placeholder="Enter value"
                      />
                      <AvakioCheckbox
                        label="Enable option"
                      />
                      <AvakioButton>Action</AvakioButton>
                    </div>
                  </AvakioFieldset>
                </div>
              </div>

              {/* Controls */}
              <div style={{ width: '300px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <AvakioTemplate
                  type="clean"
                  borderType="clean"
                  content={<strong>Configuration</strong>}
                />
                <AvakioText
                  label="Label"
                  value={playgroundLabel}
                  onChange={setPlaygroundLabel}
                />
                <AvakioCounter
                  label="Width (px)"
                  value={playgroundWidth}
                  min={200}
                  max={600}
                  step={50}
                  onChange={setPlaygroundWidth}
                />
                <AvakioCounter
                  label="Padding X (px)"
                  value={playgroundPaddingX}
                  min={0}
                  max={50}
                  step={2}
                  onChange={setPlaygroundPaddingX}
                />
                <AvakioCounter
                  label="Padding Y (px)"
                  value={playgroundPaddingY}
                  min={0}
                  max={50}
                  step={2}
                  onChange={setPlaygroundPaddingY}
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
                  label="Collapsible"
                  checked={playgroundCollapsible}
                  onChange={setPlaygroundCollapsible}
                />
                {playgroundCollapsible && (
                  <AvakioCheckbox
                    label="Collapsed"
                    checked={playgroundCollapsed}
                    onChange={setPlaygroundCollapsed}
                  />
                )}
              </div>
            </div>,
          ]}
        />
      </section>

      {/* Documentation Section */}
      <section 
        ref={(el) => { sectionRefs.current['docs'] = el; }}
        className="avakio-fieldset-demo-section"
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
              id="fieldset-props-table"
              data={propsData}
              columns={propsColumns}
              select={false}
              height={450}
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
              id="fieldset-methods-table"
              data={refMethodsData}
              columns={propsColumns}
              select={false}
              height={300}
            />,
          ]}
        />
      </section>
    </div>
  );
}

export default AvakioFieldsetExample;





















