import React, { useState, useRef } from 'react';
import { AvakioToggleButton, AvakioToggleButtonRef } from '../../components/avakio/ui-controls/avakio-toggle-button';
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
  ToggleRight,
  Check,
  X,
  Zap,
  Shield,
  RefreshCw,
  ToggleRight as ToggleIcon,
  Settings2,
  Book,
} from 'lucide-react';
import './avakio-toggle-button-example.css';

// Tab options for navigation
const TAB_OPTIONS = [
  { id: 'basic', label: 'Basic Usage', icon: <ToggleIcon size={14} /> },
  { id: 'options', label: 'Options', icon: <Settings2 size={14} /> },
  { id: 'playground', label: 'Interactive Playground', icon: <Play size={14} /> },
  { id: 'docs', label: 'Documentation', icon: <Book size={14} /> },
];

export function AvakioToggleButtonExample() {
  const [activeSection, setActiveSection] = useState<string | number | null>('basic');
  
  // Section refs for scroll navigation
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  
  // Demo state values - Basic Usage
  const [basicToggle, setBasicToggle] = useState(false);
  const [powerToggle, setPowerToggle] = useState(true);
  
  // With Icons section state
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isWifiOn, setIsWifiOn] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Icon Only section state
  const [isVisible, setIsVisible] = useState(true);
  const [isLocked, setIsLocked] = useState(false);
  const [notificationsOn, setNotificationsOn] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isStarred, setIsStarred] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  
  // Playground state
  const [playgroundValue, setPlaygroundValue] = useState<boolean>(false);
  
  // Playground property items for AvakioProperty
  const [playgroundProps, setPlaygroundProps] = useState<AvakioPropertyItem[]>([
    // Identity Group
    { id: 'componentId', label: 'ID', type: 'text', value: 'playground-toggle-button', group: 'Identity', placeholder: 'Component ID' },
    { id: 'testId', label: 'Test ID', type: 'text', value: '', group: 'Identity', placeholder: 'Test ID for testing' },
    { id: 'className', label: 'Class Name', type: 'text', value: '', group: 'Identity', placeholder: 'Additional CSS class' },
    
    // Labels Group
    { id: 'label', label: 'Label', type: 'text', value: 'Toggle', group: 'Labels', placeholder: 'Button label text' },
    { id: 'onLabel', label: 'On Label', type: 'text', value: '', group: 'Labels', placeholder: 'Label when pressed' },
    { id: 'offLabel', label: 'Off Label', type: 'text', value: '', group: 'Labels', placeholder: 'Label when unpressed' },
    { id: 'tooltip', label: 'Tooltip', type: 'text', value: '', group: 'Labels', placeholder: 'Tooltip text' },
    
    // Appearance Group
    {
      id: 'type',
      label: 'Type',
      type: 'select',
      value: 'default',
      group: 'Appearance',
      selectOptions: [
        { id: 'default', value: 'Default' },
        { id: 'icon', value: 'Icon Only' },
        { id: 'iconTop', value: 'Icon Top' },
      ],
    },
    {
      id: 'size',
      label: 'Size',
      type: 'select',
      value: 'md',
      group: 'Appearance',
      selectOptions: [
        { id: 'sm', value: 'Small' },
        { id: 'md', value: 'Medium' },
        { id: 'lg', value: 'Large' },
      ],
    },
    {
      id: 'theme',
      label: 'Theme',
      type: 'select',
      value: '',
      group: 'Appearance',
      selectOptions: [
        { id: '', value: 'Default' },
        { id: 'material', value: 'Material' },
        { id: 'flat', value: 'Flat' },
        { id: 'compact', value: 'Compact' },
        { id: 'dark', value: 'Dark' },
        { id: 'ocean', value: 'Ocean' },
        { id: 'sunset', value: 'Sunset' },
      ],
    },
    { id: 'showIcon', label: 'Show Icon', type: 'checkbox', value: true, group: 'Appearance', checkboxLabel: 'Display icon in button' },
    
    // Layout Group
    { id: 'block', label: 'Block', type: 'checkbox', value: false, group: 'Layout', checkboxLabel: 'Full width button' },
    { id: 'autowidth', label: 'Auto Width', type: 'checkbox', value: false, group: 'Layout', checkboxLabel: 'Auto-adjust width to content' },
    
    // Sizing Group
    { id: 'width', label: 'Width', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 200 or 100%' },
    { id: 'height', label: 'Height', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 40' },
    { id: 'minWidth', label: 'Min Width', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 100' },
    { id: 'maxWidth', label: 'Max Width', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 300' },
    { id: 'minHeight', label: 'Min Height', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 30' },
    { id: 'maxHeight', label: 'Max Height', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 50' },
    { id: 'margin', label: 'Margin', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 8 or 8,16,8,16' },
    { id: 'padding', label: 'Padding', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 8 or 8,16,8,16' },
    
    // State Group
    { id: 'disabled', label: 'Disabled', type: 'checkbox', value: false, group: 'State', checkboxLabel: 'Disable the component' },
    { id: 'hidden', label: 'Hidden', type: 'checkbox', value: false, group: 'State', checkboxLabel: 'Hide the component' },
    { id: 'borderless', label: 'Borderless', type: 'checkbox', value: false, group: 'State', checkboxLabel: 'Remove border' },
    
    // Hotkey Group
    { id: 'hotkey', label: 'Hotkey', type: 'text', value: '', group: 'Hotkey', placeholder: "e.g. 'ctrl+t'" },
    
    // Events Group (toggles to enable event logging)
    { id: 'logOnChange', label: 'Log onChange', type: 'checkbox', value: true, group: 'Events', checkboxLabel: 'Log onChange events' },
    { id: 'logOnFocus', label: 'Log onFocus', type: 'checkbox', value: true, group: 'Events', checkboxLabel: 'Log onFocus events' },
    { id: 'logOnBlur', label: 'Log onBlur', type: 'checkbox', value: true, group: 'Events', checkboxLabel: 'Log onBlur events' },
    { id: 'logOnClick', label: 'Log onClick', type: 'checkbox', value: false, group: 'Events', checkboxLabel: 'Log onClick events' },
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
  const toggleButtonRef = useRef<AvakioToggleButtonRef>(null);
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
    addEventLog('ToggleButton', action, details);
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
    // Component-Specific Props
    { id: 1, name: 'value', type: 'boolean', defaultValue: 'undefined', description: 'Current pressed state (controlled)' },
    { id: 2, name: 'defaultValue', type: 'boolean', defaultValue: 'false', description: 'Default pressed state (uncontrolled)' },
    { id: 3, name: 'label', type: 'string', defaultValue: 'undefined', description: 'Label text (same for both states)' },
    { id: 4, name: 'onLabel', type: 'string', defaultValue: 'undefined', description: 'Label when pressed/on' },
    { id: 5, name: 'offLabel', type: 'string', defaultValue: 'undefined', description: 'Label when unpressed/off' },
    { id: 6, name: 'icon', type: 'ReactNode', defaultValue: 'undefined', description: 'Icon (same for both states)' },
    { id: 7, name: 'onIcon', type: 'ReactNode', defaultValue: 'undefined', description: 'Icon when pressed/on' },
    { id: 8, name: 'offIcon', type: 'ReactNode', defaultValue: 'undefined', description: 'Icon when unpressed/off' },
    { id: 9, name: 'image', type: 'string', defaultValue: 'undefined', description: 'Image URL (same for both states)' },
    { id: 10, name: 'onImage', type: 'string', defaultValue: 'undefined', description: 'Image URL when pressed/on' },
    { id: 11, name: 'offImage', type: 'string', defaultValue: 'undefined', description: 'Image URL when unpressed/off' },
    { id: 12, name: 'type', type: "'default' | 'icon' | 'iconTop' | 'image' | 'imageTop'", defaultValue: "'default'", description: 'Button type/layout' },
    { id: 13, name: 'size', type: "'sm' | 'md' | 'lg'", defaultValue: "'md'", description: 'Button size' },
    { id: 14, name: 'theme', type: "'material' | 'flat' | 'compact' | 'dark' | 'ocean' | 'sunset'", defaultValue: 'undefined', description: 'Theme variant' },
    { id: 15, name: 'disabled', type: 'boolean', defaultValue: 'false', description: 'Disabled state' },
    { id: 16, name: 'autowidth', type: 'boolean', defaultValue: 'false', description: 'Auto-adjust width to content' },
    { id: 17, name: 'block', type: 'boolean', defaultValue: 'false', description: 'Full width button' },
    { id: 18, name: 'tooltip', type: 'string', defaultValue: 'undefined', description: 'Tooltip text' },
    { id: 19, name: 'hotkey', type: 'string', defaultValue: 'undefined', description: "Keyboard hotkey (e.g., 'ctrl+t')" },
    
    // Identity Props
    { id: 20, name: 'id', type: 'string', defaultValue: 'undefined', description: 'Unique identifier' },
    { id: 21, name: 'testId', type: 'string', defaultValue: 'undefined', description: 'Test ID for testing purposes' },
    { id: 22, name: 'name', type: 'string', defaultValue: 'undefined', description: 'Name for form submission' },
    { id: 23, name: 'className', type: 'string', defaultValue: 'undefined', description: 'Additional CSS class name' },
    
    // Sizing Props
    { id: 24, name: 'width', type: 'number | string', defaultValue: 'undefined', description: 'Button width' },
    { id: 25, name: 'height', type: 'number | string', defaultValue: 'undefined', description: 'Button height' },
    { id: 26, name: 'minWidth', type: 'number | string', defaultValue: 'undefined', description: 'Minimum width' },
    { id: 27, name: 'minHeight', type: 'number | string', defaultValue: 'undefined', description: 'Minimum height' },
    { id: 28, name: 'maxWidth', type: 'number | string', defaultValue: 'undefined', description: 'Maximum width' },
    { id: 29, name: 'maxHeight', type: 'number | string', defaultValue: 'undefined', description: 'Maximum height' },
    { id: 30, name: 'padding', type: 'string | number | [number, number, number, number]', defaultValue: 'undefined', description: 'Button padding' },
    { id: 31, name: 'margin', type: 'string | number | [number, number, number, number]', defaultValue: 'undefined', description: 'Button margin' },
    
    // State Props
    { id: 32, name: 'hidden', type: 'boolean', defaultValue: 'false', description: 'Whether the component is hidden' },
    { id: 33, name: 'borderless', type: 'boolean', defaultValue: 'false', description: 'Whether the component is borderless' },
    { id: 34, name: 'css', type: 'React.CSSProperties', defaultValue: 'undefined', description: 'Inline styles' },
    { id: 35, name: 'style', type: 'React.CSSProperties', defaultValue: 'undefined', description: 'Custom inline styles for the root element' },
  ];

  const eventsData: PropDoc[] = [
    { id: 1, name: 'onChange', type: '(value: boolean) => void', defaultValue: 'undefined', description: 'Callback when value changes' },
    { id: 2, name: 'onClick', type: '(e: React.MouseEvent<HTMLButtonElement>) => void', defaultValue: 'undefined', description: 'Callback when clicked' },
    { id: 3, name: 'onFocus', type: '(e: React.FocusEvent<HTMLButtonElement>) => void', defaultValue: 'undefined', description: 'Callback when focused' },
    { id: 4, name: 'onBlur', type: '(e: React.FocusEvent<HTMLButtonElement>) => void', defaultValue: 'undefined', description: 'Callback when blurred' },
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
    { id: 'name', header: 'Property', width: 180 },
    { id: 'type', header: 'Type', width: 300 },
    { id: 'defaultValue', header: 'Default', width: 100 },
    { id: 'description', header: 'Description', width: 350 },
  ];

  return (
    <div className="avakio-toggle-button-demo-container">
      {/* Sticky Header + Tab Navigation */}
      <div className="avakio-example-sticky-header">
        {/* Header */}
        <AvakioViewHeader
          label="UI Controls"
          title="Toggle Button"
          subTitle="A two-state button that can be pressed and unpressed with support for icons, multiple sizes, and themes."
          isSticky={false}
        />

        {/* Tab Navigation */}
        <div className="avakio-example-tabbar-container">
          <AvakioTabBar
            id="toggle-button-demo-tabs"
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
                value={basicToggle}
                onChange={(val) => {
                  setBasicToggle(val);
                  addLog('onChange', `value: ${val}`);
                }}
              />
              <AvakioToggleButton
                onLabel="On"
                offLabel="Off"
                value={powerToggle}
                onChange={(val) => {
                  setPowerToggle(val);
                  addLog('onChange', `value: ${val}`);
                }}
              />
            </div>,
            <AvakioTemplate
              key="result"
              type="clean"
              borderType="clean"
              padding={[10,0,10,0]}
              content={<>Basic toggle: <strong>{basicToggle ? 'On' : 'Off'}</strong> | Power toggle: <strong>{powerToggle ? 'On' : 'Off'}</strong></>}
            />,             
          ]}
        />

        {/* With Icons */}
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[16, 0, 0, 16]}
          content={<strong>With Icons</strong>}
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

        {/* Sizes */}
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[16, 0, 0, 16]}
          content={<strong>Sizes</strong>}
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
            <div key="sizes" style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
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
          ]}
        />
      </section>

      {/* Options Section */}
      <section 
        ref={(el) => { sectionRefs.current['options'] = el; }}
        className="avakio-toggle-button-demo-section"
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
          content="Customize the ToggleButton with various options like button types, states, and layout modes."
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
            <AvakioTemplate
              key="icon-only-desc"
              type="clean"
              borderType="clean"
              padding={[8, 0, 0, 0]}
              content="Use type='icon' for compact icon-only toggle buttons, perfect for toolbars."
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
            <AvakioTemplate
              key="icon-top-desc"
              type="clean"
              borderType="clean"
              padding={[8, 0, 0, 0]}
              content="Use type='iconTop' to display the icon above the label."
            />,
            <div key="icon-top" style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'flex-start', marginTop: '12px' }}>
              <AvakioToggleButton
                type="iconTop"
                onLabel="Power On"
                offLabel="Power Off"
                onIcon={<Power size={24} />}
                offIcon={<Power size={24} />}
                value={powerToggle}
                onChange={setPowerToggle}
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
                label="Settings"
                icon={<Settings size={24} />}
              />
            </div>,
          ]}
        />

        {/* Disabled States */}
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
              content={<strong>Disabled States</strong>}
            />,
            <AvakioTemplate
              key="disabled-desc"
              type="clean"
              borderType="clean"
              margin={[8, 0, 8, 0]}
              style={{ fontSize: '12px'}}
              content='disabled=true'
            />,
            <div key="disabled" style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
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
            <AvakioTemplate
              key="block-desc"
              type="clean"
              borderType="clean"
              margin={[8, 0, 8, 0]}
              style={{ fontSize: '12px'}}
              content='block=true'
            />,
            <div key="block" style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '400px' }}>
              <AvakioToggleButton
                block
                onLabel="Enabled"
                offLabel="Disabled"
                onIcon={<Check size={16} />}
                offIcon={<X size={16} />}
                value={powerToggle}
                onChange={setPowerToggle}
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

      {/* Interactive Playground Section */}
      <section 
        ref={(el) => { sectionRefs.current['playground'] = el; }}
        className="avakio-toggle-button-demo-section"
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
          content="Experiment with different ToggleButton configurations in real-time. Change any property below to see the effect on the preview."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          height={750}            
          rows={[ <AvakioLayout
              type="clean"
              borderless={true}
              responsive
              autoResize
              gap={16}
              height='100%'
              cols={[
                //Column 1 - Preview
                <AvakioLayout
                  type="clean"
                  borderless={true}                  
                  height='100%'
                  rows={[
                    <AvakioTemplate
                      type="clean"
                      borderType="clean"
                      padding={[0,0,10,0]}
                      content={<span><strong>Preview</strong></span>}
                    />,
                    <div key="preview-content" style={{ padding: '24px', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100px', background: 'var(--avakio-bg-secondary)', borderRadius: '8px' }}>
                      <AvakioToggleButton
                        id={getPropValue('componentId', 'playground-toggle-button')}
                        testId={getPropValue('testId', '') || undefined}
                        className={getPropValue('className', '') || undefined}
                        ref={toggleButtonRef}                    
                        value={playgroundValue}
                        onChange={(newVal) => {
                          setPlaygroundValue(newVal);
                          if (getPropValue('logOnChange', true)) addLog('onChange', `value: ${newVal}`);
                        }}
                        // Labels props
                        label={getPropValue('onLabel', '') || getPropValue('offLabel', '') ? undefined : getPropValue('label', 'Toggle')}
                        onLabel={getPropValue('onLabel', '') || undefined}
                        offLabel={getPropValue('offLabel', '') || undefined}
                        tooltip={getPropValue('tooltip', '') || undefined}
                        // Appearance props
                        type={getPropValue('type', 'default') as 'default' | 'icon' | 'iconTop'}
                        size={getPropValue('size', 'md') as 'sm' | 'md' | 'lg'}
                        theme={getPropValue('theme', '') as any || undefined}
                        icon={getPropValue('showIcon', true) ? <Power size={16} /> : undefined}
                        // Layout props
                        block={getPropValue('block', false)}
                        autowidth={getPropValue('autowidth', false)}
                        // Sizing props
                        width={formatSizingValue(getPropValue('width', ''))}
                        height={formatSizingValue(getPropValue('height', ''))}
                        minWidth={formatSizingValue(getPropValue('minWidth', ''))}
                        maxWidth={formatSizingValue(getPropValue('maxWidth', ''))}
                        minHeight={formatSizingValue(getPropValue('minHeight', ''))}
                        maxHeight={formatSizingValue(getPropValue('maxHeight', ''))}
                        // State props
                        disabled={getPropValue('disabled', false)}
                        hidden={getPropValue('hidden', false)}
                        borderless={getPropValue('borderless', false)}
                        // Hotkey
                        hotkey={getPropValue('hotkey', '') || undefined}
                        // Margin & Padding
                        margin={getPropValue('margin', '') ? getPropValue('margin', '').includes(',') ? getPropValue('margin', '').split(',').map(Number) as [number, number, number, number] : Number(getPropValue('margin', '')) : undefined}
                        padding={getPropValue('padding', '') ? getPropValue('padding', '').includes(',') ? getPropValue('padding', '').split(',').map(Number) as [number, number, number, number] : Number(getPropValue('padding', '')) : undefined}
                        // Event handlers
                        onFocus={(e) => {
                          if (getPropValue('logOnFocus', true)) addLog('onFocus', 'component received focus');
                        }}
                        onBlur={(e) => {
                          if (getPropValue('logOnBlur', true)) addLog('onBlur', 'component lost focus');
                        }}
                        onClick={(e) => {
                          if (getPropValue('logOnClick', false)) addLog('onClick', 'button clicked');
                        }}
                      />
                    </div>,
                    <AvakioTemplate
                      type="clean"
                      borderType="clean"
                      padding={[10,0,10,0]}
                      content={<span>Value: <strong>{playgroundValue ? 'true (pressed)' : 'false (unpressed)'}</strong></span>}
                    />,                  
                    <AvakioTemplate
                      type="clean"
                      padding={[10,0,10,0]}
                      borderType="clean"                      
                      content={<strong>Ref Methods</strong>}
                    />,
                    // Ref Methods
                    <AvakioTemplate
                      type="clean"
                      padding={[10,0,10,0]}
                      borderType="clean"                      
                      scroll="xy"  
                      flexWrap={true}
                      content={<>
                        <AvakioButton 
                          size="sm"                                                    
                          label='getValue()'
                          margin={[0,10,10,0]}                          
                          labelAlign='center'
                          width='200px'
                          buttonWidth='150px'
                          onClick={() => {
                            const val = toggleButtonRef.current?.getValue();
                            addLog('getValue()', `returned: ${val}`);
                          }}
                        />
                        <AvakioButton        
                          labelAlign='center'
                          width='200px'
                          buttonWidth='150px'
                          size="sm"
                          label='setValue(true)'
                          margin={[0,10,10,0]}
                          onClick={() => {
                            toggleButtonRef.current?.setValue(true);
                            setPlaygroundValue(true);
                            addLog('setValue()', 'set to true');
                          }}
                        />
                        <AvakioButton        
                          labelAlign='center'
                          width='200px'
                          buttonWidth='150px'
                          size="sm"
                          label='setValue(false)'
                          margin={[0,10,10,0]}
                          onClick={() => {
                            toggleButtonRef.current?.setValue(false);
                            setPlaygroundValue(false);
                            addLog('setValue()', 'set to false');
                          }}
                        />
                        <AvakioButton 
                          size="sm"
                          labelAlign='center'
                          width='200px'
                          buttonWidth='150px'
                          label='toggle()'
                          margin={[0,10,10,0]}
                          icon={<RefreshCw size={14} />}
                          onClick={() => {
                            toggleButtonRef.current?.toggle();
                            setPlaygroundValue(prev => !prev);
                            addLog('toggle()', 'toggled state');
                          }}
                        />                                      
                        <AvakioButton 
                          size="sm"
                          label='focus()' 
                          labelAlign='center'
                          width='200px'
                          buttonWidth='150px'
                          margin={[0,10,10,0]}
                          onClick={() => {
                            toggleButtonRef.current?.focus();
                            addLog('focus()', 'called via ref');
                          }}
                        />
                        <AvakioButton 
                          size="sm"
                          labelAlign='center'
                          width='200px'
                          buttonWidth='150px'
                          label='blur()'
                          margin={[0,10,10,0]}
                          onClick={() => {
                            toggleButtonRef.current?.blur();
                            addLog('blur()', 'called via ref');
                          }}
                        />                                      
                        <AvakioButton 
                          size="sm"
                          labelAlign='center'
                          width='200px'
                          buttonWidth='150px'
                          label='enable()'
                          margin={[0,10,10,0]}  
                          onClick={() => {
                            toggleButtonRef.current?.enable();
                            addLog('enable()', 'called via ref');
                          }}
                        />                                                      
                        <AvakioButton 
                          size="sm"
                          labelAlign='center'
                          width='200px'
                          buttonWidth='150px'
                          label='disable()'
                          margin={[0,10,10,0]}  
                          onClick={() => {
                            toggleButtonRef.current?.disable();
                            addLog('disable()', 'called via ref');
                          }}
                        />                                                      
                        <AvakioButton 
                          size="sm"
                          labelAlign='center'
                          width='200px'
                          buttonWidth='150px'
                          label='isEnabled()'
                          margin={[0,10,10,0]}
                          onClick={() => {
                            const enabled = toggleButtonRef.current?.isEnabled();
                            addLog('isEnabled()', `returned: ${enabled}`);
                          }}
                        />                                                      
                        <AvakioButton 
                          size="sm"
                          labelAlign='center'
                          width='200px'
                          buttonWidth='150px'
                          label='getNode()'
                          margin={[0,10,10,0]}
                          onClick={() => {
                            const el = toggleButtonRef.current?.getNode();
                            addLog('getNode()', `returned: ${el ? el.tagName : 'null'}`);
                          }}
                        />                                                      
                      </>
                      }
                    />                    
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
                                  { id: 'componentId', label: 'ID', type: 'text', value: 'playground-toggle-button', group: 'Identity', placeholder: 'Component ID' },
                                  { id: 'testId', label: 'Test ID', type: 'text', value: '', group: 'Identity', placeholder: 'Test ID for testing' },
                                  { id: 'className', label: 'Class Name', type: 'text', value: '', group: 'Identity', placeholder: 'Additional CSS class' },
                                  // Labels Group
                                  { id: 'label', label: 'Label', type: 'text', value: 'Toggle', group: 'Labels', placeholder: 'Button label text' },
                                  { id: 'onLabel', label: 'On Label', type: 'text', value: '', group: 'Labels', placeholder: 'Label when pressed' },
                                  { id: 'offLabel', label: 'Off Label', type: 'text', value: '', group: 'Labels', placeholder: 'Label when unpressed' },
                                  { id: 'tooltip', label: 'Tooltip', type: 'text', value: '', group: 'Labels', placeholder: 'Tooltip text' },
                                  // Appearance Group
                                  { id: 'type', label: 'Type', type: 'select', value: 'default', group: 'Appearance', selectOptions: [{ id: 'default', value: 'Default' }, { id: 'icon', value: 'Icon Only' }, { id: 'iconTop', value: 'Icon Top' }] },
                                  { id: 'size', label: 'Size', type: 'select', value: 'md', group: 'Appearance', selectOptions: [{ id: 'sm', value: 'Small' }, { id: 'md', value: 'Medium' }, { id: 'lg', value: 'Large' }] },
                                  { id: 'theme', label: 'Theme', type: 'select', value: '', group: 'Appearance', selectOptions: [{ id: '', value: 'Default' }, { id: 'material', value: 'Material' }, { id: 'flat', value: 'Flat' }, { id: 'compact', value: 'Compact' }, { id: 'dark', value: 'Dark' }, { id: 'ocean', value: 'Ocean' }, { id: 'sunset', value: 'Sunset' }] },
                                  { id: 'showIcon', label: 'Show Icon', type: 'checkbox', value: true, group: 'Appearance', checkboxLabel: 'Display icon in button' },
                                  // Layout Group
                                  { id: 'block', label: 'Block', type: 'checkbox', value: false, group: 'Layout', checkboxLabel: 'Full width button' },
                                  { id: 'autowidth', label: 'Auto Width', type: 'checkbox', value: false, group: 'Layout', checkboxLabel: 'Auto-adjust width to content' },
                                  // Sizing Group
                                  { id: 'width', label: 'Width', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 200 or 100%' },
                                  { id: 'height', label: 'Height', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 40' },
                                  { id: 'minWidth', label: 'Min Width', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 100' },
                                  { id: 'maxWidth', label: 'Max Width', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 300' },
                                  { id: 'minHeight', label: 'Min Height', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 30' },
                                  { id: 'maxHeight', label: 'Max Height', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 50' },
                                  { id: 'margin', label: 'Margin', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 8 or 8,16,8,16' },
                                  { id: 'padding', label: 'Padding', type: 'text', value: '', group: 'Sizing', placeholder: 'e.g. 8 or 8,16,8,16' },
                                  // State Group
                                  { id: 'disabled', label: 'Disabled', type: 'checkbox', value: false, group: 'State', checkboxLabel: 'Disable the component' },
                                  { id: 'hidden', label: 'Hidden', type: 'checkbox', value: false, group: 'State', checkboxLabel: 'Hide the component' },
                                  { id: 'borderless', label: 'Borderless', type: 'checkbox', value: false, group: 'State', checkboxLabel: 'Remove border' },
                                  // Hotkey Group
                                  { id: 'hotkey', label: 'Hotkey', type: 'text', value: '', group: 'Hotkey', placeholder: "e.g. 'ctrl+t'" },
                                  // Events Group
                                  { id: 'logOnChange', label: 'Log onChange', type: 'checkbox', value: true, group: 'Events', checkboxLabel: 'Log onChange events' },
                                  { id: 'logOnFocus', label: 'Log onFocus', type: 'checkbox', value: true, group: 'Events', checkboxLabel: 'Log onFocus events' },
                                  { id: 'logOnBlur', label: 'Log onBlur', type: 'checkbox', value: true, group: 'Events', checkboxLabel: 'Log onBlur events' },
                                  { id: 'logOnClick', label: 'Log onClick', type: 'checkbox', value: false, group: 'Events', checkboxLabel: 'Log onClick events' },
                                ]);
                                setPlaygroundValue(false);
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
        className="avakio-toggle-button-demo-section"
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
              id="toggle-button-props-table"
              data={propsData}
              columns={propsColumns}
              select={false}
              height={700}
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
              id="toggle-button-events-table"
              data={eventsData}
              columns={propsColumns}
              select={false}
              height={200}
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
              id="toggle-button-methods-table"
              data={refMethodsData}
              columns={propsColumns}
              select={false}
              height={350}
            />,
          ]}
        />
      </section>
    </div>
  );
}

export default AvakioToggleButtonExample;
