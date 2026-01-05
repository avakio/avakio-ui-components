import React, { useState, useRef } from 'react';
import { AvakioToggleButton, AvakioToggleButtonRef } from '../../components/avakio/ui-controls/avakio-toggle-button';
import { AvakioTemplate } from '../../components/avakio/views/avakio-template/avakio-template';
import { AvakioLayout } from '../../components/avakio/layouts/avakio-layout/avakio-layout';
import { AvakioRichSelect } from '../../components/avakio/ui-controls/avakio-richselect/avakio-richselect';
import { AvakioText } from '../../components/avakio/ui-controls/avakio-text/avakio-text';
import { AvakioCheckbox } from '../../components/avakio/ui-controls/avakio-checkbox/avakio-checkbox';
import { AvakioButton } from '../../components/avakio/ui-controls/avakio-button/avakio-button';
import { AvakioDataTable } from '../../components/avakio/data-presentation/avakio-datatable/AvakioDataTable';
import type { AvakioColumn } from '../../components/avakio/data-presentation/avakio-datatable/AvakioDataTable';
import { AvakioTabBar } from '../../components/avakio/ui-controls/avakio-tabbar/avakio-tabbar';
import { AvakioViewHeader } from '../../components/avakio/ui-widgets/avakio-view-header/avakio-view-header';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX,
  Wifi,
  WifiOff,
  Sun,
  Moon,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Bell,
  BellOff,
  Heart,
  Star,
  ThumbsUp,
  Bookmark,
  Settings,
  Power,
  ToggleLeft,
  ToggleRight,
  Check,
  X,
  Zap,
  Shield,
  RefreshCw,
  ToggleRight as ToggleIcon,
  Layers,
  Maximize2,
  Wand2,
  Book,
} from 'lucide-react';
import '../../components/avakio/ui-controls/avakio-toggle-button/avakio-toggle-button.css';

// Tab options for navigation
const TAB_OPTIONS = [
  { id: 'basic', label: 'Basic Usage', icon: <ToggleIcon size={14} /> },
  { id: 'icons', label: 'With Icons', icon: <Heart size={14} /> },
  { id: 'types', label: 'Button Types', icon: <Layers size={14} /> },
  { id: 'sizes', label: 'Sizes', icon: <Maximize2 size={14} /> },
  { id: 'methods', label: 'Ref Methods', icon: <Wand2 size={14} /> },
  { id: 'playground', label: 'Interactive Playground', icon: <Play size={14} /> },
  { id: 'docs', label: 'Documentation', icon: <Book size={14} /> },
];

export function AvakioToggleButtonExample({ theme = 'material' }: { theme?: string }) {
  const [activeSection, setActiveSection] = useState<string | number | null>('basic');
  
  // Section refs for scroll navigation
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  
  // Toggle states
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isWifiOn, setIsWifiOn] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isLocked, setIsLocked] = useState(false);
  const [notificationsOn, setNotificationsOn] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isStarred, setIsStarred] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isPowerOn, setIsPowerOn] = useState(true);

  // Playground state
  const [playgroundValue, setPlaygroundValue] = useState(false);
  const [playgroundLabel, setPlaygroundLabel] = useState('Toggle');
  const [playgroundOnLabel, setPlaygroundOnLabel] = useState('On');
  const [playgroundOffLabel, setPlaygroundOffLabel] = useState('Off');
  const [playgroundSize, setPlaygroundSize] = useState<string>('md');
  const [playgroundType, setPlaygroundType] = useState<string>('default');
  const [playgroundDisabled, setPlaygroundDisabled] = useState(false);
  const [playgroundBlock, setPlaygroundBlock] = useState(false);
  const [playgroundAutowidth, setPlaygroundAutowidth] = useState(false);
  const [playgroundUseStateLabels, setPlaygroundUseStateLabels] = useState(false);

  // Ref example
  const toggleRef = useRef<AvakioToggleButtonRef>(null);
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
    const value = toggleRef.current?.getValue();
    setRefValue(value ?? false);
    alert(`Current value: ${value}`);
  };

  const handleSetValue = (val: boolean) => {
    toggleRef.current?.setValue(val);
    setRefValue(val);
  };

  const handleToggle = () => {
    toggleRef.current?.toggle();
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
    { id: 1, name: 'value', type: 'boolean', defaultValue: 'undefined', description: 'Current pressed state (controlled)' },
    { id: 2, name: 'defaultValue', type: 'boolean', defaultValue: 'false', description: 'Default pressed state (uncontrolled)' },
    { id: 3, name: 'label', type: 'string', defaultValue: 'undefined', description: 'Label text (same for both states)' },
    { id: 4, name: 'onLabel', type: 'string', defaultValue: 'undefined', description: 'Label when pressed/on' },
    { id: 5, name: 'offLabel', type: 'string', defaultValue: 'undefined', description: 'Label when unpressed/off' },
    { id: 6, name: 'icon', type: 'ReactNode', defaultValue: 'undefined', description: 'Icon (same for both states)' },
    { id: 7, name: 'onIcon', type: 'ReactNode', defaultValue: 'undefined', description: 'Icon when pressed/on' },
    { id: 8, name: 'offIcon', type: 'ReactNode', defaultValue: 'undefined', description: 'Icon when unpressed/off' },
    { id: 9, name: 'type', type: "'default' | 'icon' | 'iconTop' | 'image' | 'imageTop'", defaultValue: "'default'", description: 'Button type/layout' },
    { id: 10, name: 'size', type: "'sm' | 'md' | 'lg'", defaultValue: "'md'", description: 'Button size' },
    { id: 11, name: 'theme', type: "'material' | 'flat' | 'compact' | 'dark' | 'ocean' | 'sunset'", defaultValue: 'undefined', description: 'Theme variant' },
    { id: 12, name: 'disabled', type: 'boolean', defaultValue: 'false', description: 'Disabled state' },
    { id: 13, name: 'autowidth', type: 'boolean', defaultValue: 'false', description: 'Auto-adjust width to content' },
    { id: 14, name: 'block', type: 'boolean', defaultValue: 'false', description: 'Full width button' },
    { id: 15, name: 'tooltip', type: 'string', defaultValue: 'undefined', description: 'Tooltip text' },
    { id: 16, name: 'hotkey', type: 'string', defaultValue: 'undefined', description: "Keyboard hotkey (e.g., 'ctrl+t')" },
    { id: 17, name: 'onChange', type: '(value: boolean) => void', defaultValue: 'undefined', description: 'Callback when value changes' },
  ];

  const refMethodsData: PropDoc[] = [
    { id: 1, name: 'getValue()', type: '() => boolean', defaultValue: '-', description: 'Get the current pressed state' },
    { id: 2, name: 'setValue(value)', type: '(value: boolean) => void', defaultValue: '-', description: 'Set the pressed state' },
    { id: 3, name: 'toggle()', type: '() => void', defaultValue: '-', description: 'Toggle the state' },
    { id: 4, name: 'focus()', type: '() => void', defaultValue: '-', description: 'Focus the button' },
    { id: 5, name: 'blur()', type: '() => void', defaultValue: '-', description: 'Blur the button' },
    { id: 6, name: 'enable()', type: '() => void', defaultValue: '-', description: 'Enable the button' },
    { id: 7, name: 'disable()', type: '() => void', defaultValue: '-', description: 'Disable the button' },
    { id: 8, name: 'isEnabled()', type: '() => boolean', defaultValue: '-', description: 'Check if enabled' },
    { id: 9, name: 'getNode()', type: '() => HTMLButtonElement | null', defaultValue: '-', description: 'Get the HTML element' },
  ];

  const propsColumns: AvakioColumn<PropDoc>[] = [
    { id: 'name', header: 'Property', width: 150 },
    { id: 'type', header: 'Type', width: 250 },
    { id: 'defaultValue', header: 'Default', width: 100 },
    { id: 'description', header: 'Description', width: 400 },
  ];

  return (
    <div className="avakio-toggle-button-demo-container">
      {/* Sticky Header + Tab Navigation */}
      <div className="avakio-toggle-button-sticky-header">
        {/* Header */}
        <AvakioViewHeader
          label="UI Controls"
          title="Toggle Button"                                
          subTitle="A two-state button that can be pressed and unpressed. "
          isSticky={false}
        />

        {/* Tab Navigation */}
        <div className="avakio-toggle-button-tabbar-container">
          <AvakioTabBar
            id="toggle-button-demo-tabs"
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
        className="avakio-toggle-button-demo-section"
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
          content="Toggle buttons can have a single label or separate on/off labels. They support controlled and uncontrolled modes."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <div key="basic" style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
              <AvakioToggleButton
                label="Toggle"
                value={isPlaying}
                onChange={setIsPlaying}
              />
              <AvakioToggleButton
                onLabel="On"
                offLabel="Off"
                value={isPowerOn}
                onChange={setIsPowerOn}
              />
              <AvakioToggleButton
                label="Disabled Off"
                disabled
              />
              <AvakioToggleButton
                label="Disabled On"
                value={true}
                disabled
              />
            </div>,
          ]}
        />
      </section>

      {/* With Icons Section */}
      <section 
        ref={(el) => { sectionRefs.current['icons'] = el; }}
        className="avakio-toggle-button-demo-section"
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
          content="Icons can change based on state using onIcon/offIcon props, or use the same icon for both states."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <div key="icons" style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
              <AvakioToggleButton
                onLabel="Playing"
                offLabel="Paused"
                onIcon={<Pause size={16} />}
                offIcon={<Play size={16} />}
                value={isPlaying}
                onChange={setIsPlaying}
              />
              <AvakioToggleButton
                onLabel="Muted"
                offLabel="Sound On"
                onIcon={<VolumeX size={16} />}
                offIcon={<Volume2 size={16} />}
                value={isMuted}
                onChange={setIsMuted}
              />
              <AvakioToggleButton
                onLabel="WiFi On"
                offLabel="WiFi Off"
                onIcon={<Wifi size={16} />}
                offIcon={<WifiOff size={16} />}
                value={isWifiOn}
                onChange={setIsWifiOn}
              />
              <AvakioToggleButton
                onLabel="Dark Mode"
                offLabel="Light Mode"
                onIcon={<Moon size={16} />}
                offIcon={<Sun size={16} />}
                value={isDarkMode}
                onChange={setIsDarkMode}
              />
            </div>,
          ]}
        />
      </section>

      {/* Button Types Section */}
      <section 
        ref={(el) => { sectionRefs.current['types'] = el; }}
        className="avakio-toggle-button-demo-section"
      >
        <AvakioTemplate
          type="section"
          borderType="clean"
          content="Button Types"
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="Different button types: default (icon + label), icon (icon only), and iconTop (icon above label)."
        />
        
        {/* Icon Only Type */}
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioTemplate
              key="icon-only-title"
              type="clean"
              borderType="clean"
              content={<strong>Icon Only (type="icon")</strong>}
            />,
            <div key="icon-only" style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center', marginTop: '12px' }}>
              <AvakioToggleButton
                type="icon"
                onIcon={<Eye size={16} />}
                offIcon={<EyeOff size={16} />}
                value={isVisible}
                onChange={setIsVisible}
                tooltip={isVisible ? 'Hide' : 'Show'}
              />
              <AvakioToggleButton
                type="icon"
                onIcon={<Unlock size={16} />}
                offIcon={<Lock size={16} />}
                value={isLocked}
                onChange={setIsLocked}
                tooltip={isLocked ? 'Unlock' : 'Lock'}
              />
              <AvakioToggleButton
                type="icon"
                onIcon={<Bell size={16} />}
                offIcon={<BellOff size={16} />}
                value={notificationsOn}
                onChange={setNotificationsOn}
                tooltip={notificationsOn ? 'Mute notifications' : 'Enable notifications'}
              />
              <AvakioToggleButton
                type="icon"
                icon={<Heart size={16} />}
                value={isFavorite}
                onChange={setIsFavorite}
                tooltip="Favorite"
              />
              <AvakioToggleButton
                type="icon"
                icon={<Star size={16} />}
                value={isStarred}
                onChange={setIsStarred}
                tooltip="Star"
              />
              <AvakioToggleButton
                type="icon"
                icon={<ThumbsUp size={16} />}
                value={isLiked}
                onChange={setIsLiked}
                tooltip="Like"
              />
              <AvakioToggleButton
                type="icon"
                icon={<Bookmark size={16} />}
                value={isBookmarked}
                onChange={setIsBookmarked}
                tooltip="Bookmark"
              />
            </div>,
          ]}
        />

        {/* Icon Top Type */}
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioTemplate
              key="icon-top-title"
              type="clean"
              borderType="clean"
              content={<strong>Icon Top (type="iconTop")</strong>}
            />,
            <div key="icon-top" style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'flex-start', marginTop: '12px' }}>
              <AvakioToggleButton
                type="iconTop"
                onLabel="Power On"
                offLabel="Power Off"
                onIcon={<Power size={24} />}
                offIcon={<Power size={24} />}
                value={isPowerOn}
                onChange={setIsPowerOn}
              />
              <AvakioToggleButton
                type="iconTop"
                onLabel="Protected"
                offLabel="Unprotected"
                onIcon={<Shield size={24} />}
                offIcon={<Shield size={24} />}
                value={isLocked}
                onChange={setIsLocked}
              />
              <AvakioToggleButton
                type="iconTop"
                onLabel="Settings"
                offLabel="Settings"
                icon={<Settings size={24} />}
                value={false}
              />
            </div>,
          ]}
        />

        {/* Block Style */}
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioTemplate
              key="block-title"
              type="clean"
              borderType="clean"
              content={<strong>Block Style (Full Width)</strong>}
            />,
            <div key="block" style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '400px', marginTop: '12px' }}>
              <AvakioToggleButton
                block
                onLabel="Enabled"
                offLabel="Disabled"
                onIcon={<Check size={16} />}
                offIcon={<X size={16} />}
                value={isPowerOn}
                onChange={setIsPowerOn}
              />
              <AvakioToggleButton
                block
                onLabel="Active"
                offLabel="Inactive"
                icon={<ToggleRight size={16} />}
              />
            </div>,
          ]}
        />
      </section>

      {/* Sizes Section */}
      <section 
        ref={(el) => { sectionRefs.current['sizes'] = el; }}
        className="avakio-toggle-button-demo-section"
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
          content="Toggle buttons come in three sizes: small (sm), medium (md), and large (lg)."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioTemplate
              key="sizes-default-title"
              type="clean"
              borderType="clean"
              content={<strong>Default Type Sizes</strong>}
            />,
            <div key="sizes" style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center', marginTop: '12px' }}>
              <AvakioToggleButton
                size="sm"
                label="Small"
                icon={<Zap size={14} />}
              />
              <AvakioToggleButton
                size="md"
                label="Medium"
                icon={<Zap size={16} />}
              />
              <AvakioToggleButton
                size="lg"
                label="Large"
                icon={<Zap size={20} />}
              />
            </div>,
            <AvakioTemplate
              key="sizes-icon-title"
              type="clean"
              borderType="clean"
              padding={[16, 0, 0, 0]}
              content={<strong>Icon Only Sizes</strong>}
            />,
            <div key="sizes-icon" style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center', marginTop: '12px' }}>
              <AvakioToggleButton
                type="icon"
                size="sm"
                icon={<Power size={14} />}
              />
              <AvakioToggleButton
                type="icon"
                size="md"
                icon={<Power size={16} />}
              />
              <AvakioToggleButton
                type="icon"
                size="lg"
                icon={<Power size={20} />}
              />
            </div>,
          ]}
        />
      </section>

      {/* Ref Methods Section */}
      <section 
        ref={(el) => { sectionRefs.current['methods'] = el; }}
        className="avakio-toggle-button-demo-section"
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
          content="Use imperative methods through a ref to programmatically control the toggle button."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <div key="ref-demo" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <AvakioToggleButton
                  ref={toggleRef}
                  onLabel="Active"
                  offLabel="Inactive"
                  onIcon={<Check size={16} />}
                  offIcon={<X size={16} />}
                  value={refValue}
                  onChange={setRefValue}
                />
                <span style={{ fontSize: '14px', color: 'var(--avakio-text-secondary)' }}>
                  Current value: <strong>{refValue ? 'true' : 'false'}</strong>
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
                  onClick={() => toggleRef.current?.focus()}
                />
              </div>
            </div>,
          ]}
        />
      </section>

      {/* Interactive Playground Section */}
      <section 
        ref={(el) => { sectionRefs.current['playground'] = el; }}
        className="avakio-toggle-button-demo-section avakio-hide-on-mobile"
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
          content="Experiment with different props to see how they affect the toggle button appearance and behavior."
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
                  width={300}
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
                      <AvakioCheckbox
                        label="Use separate on/off labels"
                        checked={playgroundUseStateLabels}
                        onChange={setPlaygroundUseStateLabels}
                      />
                      {playgroundUseStateLabels && (
                        <>
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
                        </>
                      )}
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
                      <AvakioRichSelect
                        label="Type"
                        labelAlign="left"
                        value={playgroundType}
                        width="100%"
                        options={[
                          { id: 'default', value: 'Default' },
                          { id: 'icon', value: 'Icon Only' },
                          { id: 'iconTop', value: 'Icon Top' },
                        ]}
                        onChange={(val) => setPlaygroundType(val as string)}
                      />
                      <AvakioCheckbox
                        label="Disabled"
                        checked={playgroundDisabled}
                        onChange={setPlaygroundDisabled}
                      />
                      <AvakioCheckbox
                        label="Block (Full Width)"
                        checked={playgroundBlock}
                        onChange={setPlaygroundBlock}
                      />
                      <AvakioCheckbox
                        label="Autowidth"
                        checked={playgroundAutowidth}
                        onChange={setPlaygroundAutowidth}
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
                    <div key="preview-content" style={{ padding: '24px', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100px', background: 'var(--avakio-bg-secondary)', borderRadius: '8px' }}>
                      <AvakioToggleButton
                        label={playgroundUseStateLabels ? undefined : playgroundLabel}
                        onLabel={playgroundUseStateLabels ? playgroundOnLabel : undefined}
                        offLabel={playgroundUseStateLabels ? playgroundOffLabel : undefined}
                        size={playgroundSize as any}
                        type={playgroundType as any}
                        disabled={playgroundDisabled}
                        block={playgroundBlock}
                        autowidth={playgroundAutowidth}
                        icon={playgroundType !== 'default' ? <Power size={16} /> : undefined}
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
{`<AvakioToggleButton
  theme="${theme}"${playgroundUseStateLabels ? `
  onLabel="${playgroundOnLabel}"
  offLabel="${playgroundOffLabel}"` : `
  label="${playgroundLabel}"`}
  size="${playgroundSize}"
  type="${playgroundType}"${playgroundDisabled ? `
  disabled` : ''}${playgroundBlock ? `
  block` : ''}${playgroundAutowidth ? `
  autowidth` : ''}${playgroundType !== 'default' ? `
  icon={<Power size={16} />}` : ''}
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
        className="avakio-toggle-button-demo-section"
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
          height={350}
          resizable
          rowHeight={40}
        />
      </section>
    </div>
  );
}




















