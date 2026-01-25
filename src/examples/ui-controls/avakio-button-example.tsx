import React, { useState, useRef } from 'react';
import { AvakioButton } from '../../components/avakio/ui-controls/avakio-button/avakio-button';
import { AvakioBaseRef } from '../../components/avakio/base/avakio-base-props';
import { AvakioTemplate } from '../../components/avakio/views/avakio-template/avakio-template';
import { AvakioLayout } from '../../components/avakio/layouts/avakio-layout/avakio-layout';
import { AvakioDataTable } from '../../components/avakio/data-presentation/avakio-datatable/AvakioDataTable';
import type { AvakioColumn } from '../../components/avakio/data-presentation/avakio-datatable/AvakioDataTable';
import { AvakioTabBar } from '../../components/avakio/ui-controls/avakio-tabbar/avakio-tabbar';
import { AvakioViewHeader } from '../../components/avakio/ui-widgets/avakio-view-header/avakio-view-header';
import { AvakioProperty, AvakioPropertyItem, AvakioPropertyRef } from '../../components/avakio/data-presentation/avakio-property/avakio-property';
import { addEventLog } from '../../services/event-log-service';
import { formatSizingValue } from '../../lib/utils';
import { 
  Check,
  Loader2,
  Plus,
  Trash2,
  ArrowRight,
  Download,
  Bell,
  Settings,
  Heart,
  Star,
  Mail,
  Home,
  Play,
  Package,
  Book,
} from 'lucide-react';
import './avakio-button-example.css';

// Tab options for navigation
const TAB_OPTIONS = [
  { id: 'basic', label: 'Basic Usage', icon: <Package size={14} /> },
  { id: 'options', label: 'Options', icon: <Settings size={14} /> },
  { id: 'playground', label: 'Interactive Playground', icon: <Play size={14} /> },
  { id: 'docs', label: 'Documentation', icon: <Book size={14} /> },
];

export function AvakioButtonExample() {
  const [activeSection, setActiveSection] = useState<string | number | null>('basic');
  
  // Section refs for scroll navigation
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  
  // Demo state values
  const [clickCount, setClickCount] = useState(0);
  const [hotkeyCount, setHotkeyCount] = useState(0);
  
  // Playground state
  const [playgroundClickCount, setPlaygroundClickCount] = useState(0);
  const [isComponentMounted, setIsComponentMounted] = useState<boolean>(true);
  const propertyRef = useRef<AvakioPropertyRef>(null);
  
  // Playground property items for AvakioProperty
  const [playgroundProps, setPlaygroundProps] = useState<AvakioPropertyItem[]>([
    // Identity Group
    { id: 'componentId', label: 'ID', type: 'text', value: 'playground-button', group: 'Identity', placeholder: 'Component ID' },
    { id: 'testId', label: 'Test ID', type: 'text', value: '', group: 'Identity', placeholder: 'Test ID for testing' },
    { id: 'className', label: 'Class Name', type: 'text', value: '', group: 'Identity', placeholder: 'Additional CSS class' },
    
    // Content Group
    { id: 'label', label: 'Label', type: 'text', value: 'Click Me', group: 'Content', placeholder: 'Button text' },
    { id: 'tooltip', label: 'Tooltip', type: 'text', value: '', group: 'Content', placeholder: 'Tooltip text' },
    { id: 'hotkey', label: 'Hotkey', type: 'text', value: '', group: 'Content', placeholder: 'e.g. ctrl+s' },
    { id: 'badge', label: 'Badge', type: 'text', value: '', group: 'Content', placeholder: 'e.g. 5 or New' },
    { id: 'image', label: 'Image URL', type: 'text', value: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJMMTMuMDkgOC4yNkwyMSA5TDEzLjA5IDE1Ljc0TDEyIDIyTDEwLjkxIDE1Ljc0TDMgOUwxMC45MSA4LjI2TDEyIDJaIiBmaWxsPSIjMDA3QUNDIi8+Cjwvc3ZnPgo=', group: 'Content', placeholder: 'Image URL to display' },
    { id: 'popup', label: 'Popup', type: 'text', value: '', group: 'Content', placeholder: 'Popup menu ID' },
    { id: 'bottomLabel', label: 'Bottom Label', type: 'text', value: '', group: 'Content', placeholder: 'Bottom help text' },
    
    // Appearance Group
    {
      id: 'variant',
      label: 'Variant',
      type: 'select',
      value: 'primary',
      group: 'Appearance',
      selectOptions: [
        { id: 'primary', value: 'Primary' },
        { id: 'secondary', value: 'Secondary' },
        { id: 'outline', value: 'Outline' },
        { id: 'ghost', value: 'Ghost' },
        { id: 'danger', value: 'Danger' },
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
      id: 'buttonType',
      label: 'Button Type',
      type: 'select',
      value: 'default',
      group: 'Appearance',
      selectOptions: [
        { id: 'default', value: 'Default' },
        { id: 'icon', value: 'Icon Only' },
        { id: 'iconButton', value: 'Icon Button' },
        { id: 'iconTop', value: 'Icon Top' },
        { id: 'iconBottom', value: 'Icon Bottom' },
      ],
    },
    {
      id: 'align',
      label: 'Text Align',
      type: 'select',
      value: 'center',
      group: 'Appearance',
      selectOptions: [
        { id: 'left', value: 'Left' },
        { id: 'center', value: 'Center' },
        { id: 'right', value: 'Right' },
      ],
    },
    
    // Layout Group (AvakioBaseProps)
    { id: 'block', label: 'Block', type: 'checkbox', value: false, group: 'Layout', checkboxLabel: 'Full width' },
    { id: 'autowidth', label: 'Auto Width', type: 'checkbox', value: false, group: 'Layout', checkboxLabel: 'Fit content' },
    { id: 'borderless', label: 'Borderless', type: 'checkbox', value: false, group: 'Layout', checkboxLabel: 'Remove borders' },
    { id: 'buttonWidth', label: 'Button Width', type: 'text', value: '', group: 'Layout', placeholder: 'e.g. 200 or 100%' },
    { id: 'buttonHeight', label: 'Button Height', type: 'text', value: '', group: 'Layout', placeholder: 'e.g. 40 or auto' },
    {
      id: 'textAlign',
      label: 'Button Text Align',
      type: 'select',
      value: '',
      group: 'Layout',
      selectOptions: [
        { id: '', value: 'Default' },
        { id: 'left', value: 'Left' },
        { id: 'center', value: 'Center' },
        { id: 'right', value: 'Right' },
      ],
    },
    { id: 'width', label: 'Width', type: 'text', value: '', group: 'Layout', placeholder: 'e.g. 200px or 100%' },
    { id: 'height', label: 'Height', type: 'text', value: '', group: 'Layout', placeholder: 'e.g. 50px' },
    { id: 'minWidth', label: 'Min Width', type: 'text', value: '', group: 'Layout', placeholder: 'e.g. 100px' },
    { id: 'minHeight', label: 'Min Height', type: 'text', value: '', group: 'Layout', placeholder: 'e.g. 38px' },
    { id: 'maxWidth', label: 'Max Width', type: 'text', value: '', group: 'Layout', placeholder: 'e.g. 500px' },
    { id: 'maxHeight', label: 'Max Height', type: 'text', value: '', group: 'Layout', placeholder: 'e.g. 100px' },
    { id: 'margin', label: 'Margin', type: 'text', value: '', group: 'Layout', placeholder: 'e.g. 10 or 10px' },
    { id: 'padding', label: 'Padding', type: 'text', value: '', group: 'Layout', placeholder: 'e.g. 12 or 12px' },
    { id: 'style', label: 'Custom Style', type: 'text', value: '', group: 'Layout', placeholder: 'CSS object as JSON' },
    
    // Form Integration Group
    { id: 'name', label: 'Name', type: 'text', value: '', group: 'Form', placeholder: 'Form field name' },
    { id: 'value', label: 'Value', type: 'text', value: '', group: 'Form', placeholder: 'Form field value' },
    {
      id: 'type',
      label: 'Button Type',
      type: 'select',
      value: 'button',
      group: 'Form',
      selectOptions: [
        { id: 'button', value: 'Button' },
        { id: 'submit', value: 'Submit' },
        { id: 'reset', value: 'Reset' },
      ],
    },
    
    // Icons Group
    { id: 'showIcon', label: 'Show Icon', type: 'checkbox', value: true, group: 'Icons', checkboxLabel: 'Display left icon' },
    { id: 'showIconRight', label: 'Show Icon Right', type: 'checkbox', value: false, group: 'Icons', checkboxLabel: 'Display right icon' },
    
    // State Group
    { id: 'disabled', label: 'Disabled', type: 'checkbox', value: false, group: 'State', checkboxLabel: 'Disable the button' },
    { id: 'loading', label: 'Loading', type: 'checkbox', value: false, group: 'State', checkboxLabel: 'Show loading spinner' },
    { id: 'hidden', label: 'Hidden', type: 'checkbox', value: false, group: 'State', checkboxLabel: 'Hide the button' },
    
    // Events Group
    { id: 'logOnClick', label: 'Log onClick', type: 'checkbox', value: true, group: 'Events', checkboxLabel: 'Log onClick events' },
    { id: 'logOnMouseEnter', label: 'Log onMouseEnter', type: 'checkbox', value: true, group: 'Events', checkboxLabel: 'Log onMouseEnter events' },
    { id: 'logOnMouseLeave', label: 'Log onMouseLeave', type: 'checkbox', value: true, group: 'Events', checkboxLabel: 'Log onMouseLeave events' },
    { id: 'logOnFocus', label: 'Log onFocus', type: 'checkbox', value: true, group: 'Events', checkboxLabel: 'Log onFocus events' },
    { id: 'logOnBlur', label: 'Log onBlur', type: 'checkbox', value: true, group: 'Events', checkboxLabel: 'Log onBlur events' },
    { id: 'logOnKeyDown', label: 'Log onKeyDown', type: 'checkbox', value: true, group: 'Events', checkboxLabel: 'Log onKeyDown events' },
    { id: 'logOnKeyUp', label: 'Log onKeyUp', type: 'checkbox', value: true, group: 'Events', checkboxLabel: 'Log onKeyUp events' },
    { id: 'logOnKeyPress', label: 'Log onKeyPress', type: 'checkbox', value: true, group: 'Events', checkboxLabel: 'Log onKeyPress events' },
    { id: 'logOnItemClick', label: 'Log onItemClick', type: 'checkbox', value: false, group: 'Events', checkboxLabel: 'Log onItemClick events' },
    { id: 'logOnAfterRender', label: 'Log onAfterRender', type: 'checkbox', value: false, group: 'Events', checkboxLabel: 'Log onAfterRender events' },
    { id: 'logOnBeforeRender', label: 'Log onBeforeRender', type: 'checkbox', value: false, group: 'Events', checkboxLabel: 'Log onBeforeRender events' },
    { id: 'logOnViewShow', label: 'Log onViewShow', type: 'checkbox', value: false, group: 'Events', checkboxLabel: 'Log onViewShow events' },
  ]);

  // Helper to get prop value from playground props
  const getPropValue = <T,>(propId: string, defaultValue: T): T => {
    const prop = playgroundProps.find(p => p.id === propId);
    if (prop?.value === undefined || prop?.value === null || prop?.value === '') return defaultValue;
    return prop.value as T;
  };

  // Handle property changes (update state only, no logging)
  const handlePlaygroundPropsChange = (items: AvakioPropertyItem[], changed: AvakioPropertyItem) => {
    setPlaygroundProps(items);
  };

  // Ref example
  const buttonRef = useRef<AvakioBaseRef>(null);

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

  // Add to event log
  const addLog = (action: string, details: string = '') => {
    addEventLog('Button', action, details);
  };

  // Add textOnBlur handlers to text fields after addLog is defined
  React.useEffect(() => {
    setPlaygroundProps(prev => prev.map(item => {
      if (item.type === 'text') {
        return {
          ...item,
          textOnBlur: (value: string, itm: AvakioPropertyItem) => addLog('Playground prop changed', `${itm.label}: ${value}`)
        };
      }
      return item;
    }));
  }, []);

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
    { id: 1, name: 'label', type: 'string', defaultValue: 'undefined', description: 'Button text (children override this)', from: 'Button' },
    { id: 2, name: 'icon', type: 'ReactNode', defaultValue: 'undefined', description: 'Icon displayed on the left side', from: 'Button' },
    { id: 3, name: 'iconRight', type: 'ReactNode', defaultValue: 'undefined', description: 'Icon displayed on the right side', from: 'Button' },
    { id: 4, name: 'image', type: 'string', defaultValue: 'undefined', description: 'Image URL to display (replaces icon)', from: 'Button' },
    { id: 5, name: 'variant', type: "'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'", defaultValue: "'primary'", description: 'Visual style variant', from: 'Button' },
    { id: 6, name: 'size', type: "'sm' | 'md' | 'lg'", defaultValue: "'md'", description: 'Button size', from: 'Button' },
    { id: 7, name: 'buttonType', type: "'default' | 'icon' | 'iconButton' | 'iconTop' | 'iconBottom'", defaultValue: "'default'", description: 'Layout type - icon for icon-only, iconTop for icon above label, iconBottom for icon below label', from: 'Button' },
    { id: 8, name: 'align', type: "'left' | 'center' | 'right'", defaultValue: "'center'", description: 'Horizontal alignment of the button within its container (sets text-align on wrapper)', from: 'Button' },
    { id: 9, name: 'buttonWidth', type: 'number | string', defaultValue: 'undefined', description: 'Width of the button element (e.g., 200 or "100%")', from: 'Button' },
    { id: 10, name: 'buttonHeight', type: 'number | string', defaultValue: 'undefined', description: 'Height of the button element (e.g., 40 or "auto")', from: 'Button' },
    { id: 11, name: 'textAlign', type: "'left' | 'center' | 'right'", defaultValue: 'undefined', description: 'Text alignment inside the button', from: 'Button' },
    { id: 12, name: 'block', type: 'boolean', defaultValue: 'false', description: 'Makes button full width', from: 'Button' },
    { id: 13, name: 'autowidth', type: 'boolean', defaultValue: 'false', description: 'Button width fits content instead of fixed width', from: 'Button' },
    { id: 14, name: 'loading', type: 'boolean', defaultValue: 'false', description: 'Shows loading spinner and disables button', from: 'Button' },
    { id: 15, name: 'badge', type: 'string | number', defaultValue: 'undefined', description: 'Small badge displayed beside the label', from: 'Button' },
    { id: 16, name: 'tooltip', type: 'string', defaultValue: 'undefined', description: 'Tooltip text shown on hover', from: 'Button' },
    { id: 17, name: 'hotkey', type: 'string', defaultValue: 'undefined', description: 'Keyboard shortcut (e.g., "ctrl+s", "delete")', from: 'Button' },
    { id: 18, name: 'popup', type: 'string | ReactNode', defaultValue: 'undefined', description: 'Popup menu ID or component reference', from: 'Button' },
    { id: 19, name: 'bottomLabel', type: 'string', defaultValue: 'undefined', description: 'Bottom label text displayed below the button', from: 'Button' },
    
    // Form Integration
    { id: 20, name: 'name', type: 'string', defaultValue: 'undefined', description: 'Form field name attribute', from: 'Button' },
    { id: 21, name: 'value', type: 'string', defaultValue: 'undefined', description: 'Form field value attribute', from: 'Button' },
    { id: 22, name: 'type', type: "'button' | 'submit' | 'reset'", defaultValue: "'button'", description: 'HTML button type for form behavior', from: 'Button' },
    
    // AvakioBaseProps - Identity
    { id: 23, name: 'id', type: 'string', defaultValue: 'undefined', description: 'Component HTML ID', from: 'Base' },
    { id: 24, name: 'testId', type: 'string', defaultValue: 'undefined', description: 'Test ID for testing purposes', from: 'Base' },
    { id: 25, name: 'className', type: 'string', defaultValue: "''", description: 'Additional CSS class names', from: 'Base' },
    
    // AvakioBaseProps - State
    { id: 26, name: 'disabled', type: 'boolean', defaultValue: 'false', description: 'Whether the button is disabled', from: 'Base' },
    { id: 27, name: 'hidden', type: 'boolean', defaultValue: 'false', description: 'Whether the component is hidden', from: 'Base' },
    
    // AvakioBaseProps - Layout
    { id: 28, name: 'borderless', type: 'boolean', defaultValue: 'false', description: 'Removes borders and shadows', from: 'Base' },
    { id: 29, name: 'width', type: 'number | string', defaultValue: 'undefined', description: 'Width of the container wrapper', from: 'Base' },
    { id: 30, name: 'height', type: 'number | string', defaultValue: 'undefined', description: 'Width of the container wrapper', from: 'Base' },
    { id: 31, name: 'minWidth', type: 'number | string', defaultValue: 'undefined', description: 'Minimum width constraint', from: 'Base' },
    { id: 32, name: 'minHeight', type: 'number | string', defaultValue: 'undefined', description: 'Minimum height constraint', from: 'Base' },
    { id: 33, name: 'maxWidth', type: 'number | string', defaultValue: 'undefined', description: 'Maximum width constraint', from: 'Base' },
    { id: 34, name: 'maxHeight', type: 'number | string', defaultValue: 'undefined', description: 'Maximum height constraint', from: 'Base' },
    { id: 35, name: 'margin', type: 'number | string | [number, number, number, number]', defaultValue: 'undefined', description: 'Margin around the component', from: 'Base' },
    { id: 36, name: 'padding', type: 'number | string | [number, number, number, number]', defaultValue: 'undefined', description: 'Padding inside the component', from: 'Base' },
    { id: 37, name: 'style', type: 'React.CSSProperties', defaultValue: '{}', description: 'Custom inline styles', from: 'Base' },
  ];

  const eventsData: PropDoc[] = [
    // Button-specific events
    { id: 1, name: 'onClick', type: '(event: React.MouseEvent) => void', defaultValue: 'undefined', description: 'Fires when the button is clicked', from: 'Button' },
    { id: 2, name: 'onMouseEnter', type: '(event: React.MouseEvent) => void', defaultValue: 'undefined', description: 'Fires when mouse enters the button', from: 'Button' },
    { id: 3, name: 'onMouseLeave', type: '(event: React.MouseEvent) => void', defaultValue: 'undefined', description: 'Fires when mouse leaves the button', from: 'Button' },
    { id: 4, name: 'onKeyDown', type: '(event: React.KeyboardEvent) => void', defaultValue: 'undefined', description: 'Fires when a key is pressed down', from: 'Button' },
    { id: 5, name: 'onKeyUp', type: '(event: React.KeyboardEvent) => void', defaultValue: 'undefined', description: 'Fires when a key is released', from: 'Button' },
    
    // AvakioBaseProps events
    { id: 6, name: 'onFocus', type: '(event: React.FocusEvent) => void', defaultValue: 'undefined', description: 'Fires when button receives focus', from: 'Base' },
    { id: 7, name: 'onBlur', type: '(event: React.FocusEvent) => void', defaultValue: 'undefined', description: 'Fires when button loses focus', from: 'Base' },
    { id: 8, name: 'onItemClick', type: '(event: React.MouseEvent) => void', defaultValue: 'undefined', description: 'Fires after the control has been clicked (AvakioBase)', from: 'Base' },
    { id: 9, name: 'onKeyPress', type: '(event: React.KeyboardEvent) => void', defaultValue: 'undefined', description: 'Occurs when keyboard key is pressed (AvakioBase)', from: 'Base' },
    { id: 10, name: 'onAfterRender', type: '() => void', defaultValue: 'undefined', description: 'Occurs after the component has been rendered', from: 'Base' },
    { id: 11, name: 'onBeforeRender', type: '() => void', defaultValue: 'undefined', description: 'Occurs before the component has been rendered', from: 'Base' },
    { id: 12, name: 'onViewShow', type: '() => void', defaultValue: 'undefined', description: 'Fires when any hidden view is shown', from: 'Base' },
  ];

  const refMethodsData: PropDoc[] = [
    // Core methods
    { id: 1, name: 'focus()', type: '() => void', defaultValue: '-', description: 'Sets focus to the button element', from: 'Button' },
    { id: 2, name: 'blur()', type: '() => void', defaultValue: '-', description: 'Removes focus from the button element', from: 'Button' },
    { id: 3, name: 'getElement()', type: '() => HTMLElement | null', defaultValue: '-', description: 'Returns the root DOM element of the component', from: 'Base' },
    
    // AvakioBaseRef methods
    { id: 4, name: 'enable()', type: '() => void', defaultValue: '-', description: 'Enables the button (makes it clickable)', from: 'Base' },
    { id: 5, name: 'disable()', type: '() => void', defaultValue: '-', description: 'Disables the button (makes it unclickable)', from: 'Base' },
    { id: 6, name: 'show()', type: '() => void', defaultValue: '-', description: 'Makes the component visible', from: 'Base' },
    { id: 7, name: 'hide()', type: '() => void', defaultValue: '-', description: 'Hides the component', from: 'Base' },
    { id: 8, name: 'isEnabled()', type: '() => boolean', defaultValue: '-', description: 'Checks whether the button is enabled', from: 'Base' },
    { id: 9, name: 'isVisible()', type: '() => boolean', defaultValue: '-', description: 'Checks whether the button is visible', from: 'Base' },
    { id: 10, name: 'getText()', type: '() => string', defaultValue: '-', description: 'Gets the text content of the button', from: 'Base' },
    { id: 11, name: 'getValue()', type: '() => any', defaultValue: '-', description: 'Returns the current value (not applicable for button)', from: 'Base' },
    { id: 12, name: 'setValue(value)', type: '(value: any) => void', defaultValue: '-', description: 'Sets a new value (not applicable for button)', from: 'Base' },
    { id: 13, name: 'validate()', type: '() => boolean | string', defaultValue: '-', description: 'Validates the component (always returns true for button)', from: 'Base' },
    { id: 14, name: 'getParentView()', type: '() => HTMLElement | null', defaultValue: '-', description: 'Returns the parent view/element of the component', from: 'Base' },
    { id: 15, name: 'define(config, value?)', type: '(config: Partial<Props> | string, value?: any) => void', defaultValue: '-', description: 'Redefines component configuration properties', from: 'Base' },
  ];

  const propsColumns: AvakioColumn<PropDoc>[] = [
    { id: 'name', header: 'Property', width: 200 },
    { id: 'type', header: 'Type', width: 300 },
    { id: 'defaultValue', header: 'Default', width: 120 },
    { id: 'description', header: 'Description', width: 350 },
    { id: 'from', header: 'From', width: 100, filterType: 'combo' },
  ];

  return (
    <div className="avakio-button-demo-container">
      {/* Sticky Header + Tab Navigation */}
      <div className="avakio-example-sticky-header">
        {/* Header */}
        <AvakioViewHeader
          label="UI Controls"
          title="Button"
          subTitle="A comprehensive button component with variants, icons, badges, loading states, keyboard shortcuts, and full theme support."
          isSticky={false}
        />

        {/* Tab Navigation */}
        <div className="avakio-example-tabbar-container">
          <AvakioTabBar
            id="button-demo-tabs"
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
        className="avakio-button-demo-section"
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
          content="Basic buttons with different variants, icons, and click handlers."
        />

        {/* Button Variants */}
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[16, 0, 0, 16]}
          content={<strong>Button Variants</strong>}
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="Choose from primary, secondary, outline, ghost, or danger variants."
        />
        <AvakioLayout type="clean" borderless={false} margin={12} padding={16}
          rows={[
            <AvakioLayout key="variants-row" type="clean" borderless={true} flexWrap={true}
              cols={[
                <AvakioButton variant="primary" icon={<Check size={16} />} onClick={() => {setClickCount(c => c + 1); addLog('onClick', 'Primary button clicked');}} label='Primary'  />,
                <AvakioButton variant="secondary" icon={<Settings size={16} />} onClick={() => { setClickCount(c => c + 1); addLog('onClick', 'Secondary button clicked');}} label='Secondary' />,                
                <AvakioButton variant="outline" icon={<ArrowRight size={16} />} onClick={() => {setClickCount(c => c + 1);addLog('onClick', 'Outline button clicked');}} label='Outline' />,                
                <AvakioButton variant="ghost" icon={<Home size={16} />} onClick={() => {setClickCount(c => c + 1);addLog('onClick', 'Ghost button clicked');}} label='Ghost'/>,
                <AvakioButton variant="danger" icon={<Trash2 size={16} />} onClick={() => {setClickCount(c => c + 1);addLog('onClick', 'Danger button clicked');}} label='Delete' />                
              ]}
            />,
            <AvakioTemplate key="click-counter" type="clean" borderType="clean" padding={[16, 0, 0, 0]} content={<>Total clicks: <strong>{clickCount}</strong></>} />,
          ]}
        />

        {/* Button Sizes */}
        <AvakioTemplate type="clean" borderType="clean" padding={[16, 0, 0, 16]} content={<strong>Button Sizes</strong>}/>
        <AvakioTemplate type="clean" borderType="clean" padding={[0, 0, 0, 16]} content="Available in small, medium (default), and large sizes." />
        <AvakioLayout type="clean" borderless={false} margin={12} padding={16}
          rows={[
            <AvakioLayout key="sizes-row" type="clean" borderless={true} flexWrap={true}
              cols={[
                <AvakioButton size="sm" padding={[8, 8, 8, 8]} icon={<Plus size={14} />} onClick={() => addLog('onClick', 'Small button clicked')} label='Small' />,               
                <AvakioButton size="md" padding={[8, 8, 8, 8]} icon={<Plus size={16} />} onClick={() => addLog('onClick', 'Medium button clicked')} label='Medium' />,                
                <AvakioButton size="lg" padding={[8, 8, 8, 8]} icon={<Plus size={18} />} onClick={() => addLog('onClick', 'Large button clicked')} label='Large' />                
              ]}
            />,
          ]}
        />

        {/* Icon Buttons */}
        <AvakioTemplate type="clean" borderType="clean" padding={[16, 0, 0, 16]} content={<strong>Icon Buttons</strong>} />
        <AvakioTemplate type="clean" borderType="clean" padding={[0, 0, 0, 16]} content="Create icon-only buttons or buttons with icons on left/right sides."/>
        <AvakioLayout type="clean" borderless={false} margin={12} padding={16}
          rows={[
            <AvakioLayout key="icon-buttons-row" type="clean" borderless={true} flexWrap={true}
              cols={[
                <AvakioButton buttonType="icon" padding={[8, 8, 8, 8]} icon={<Heart size={20} />} tooltip="Like this item" onClick={() => addLog('onClick', 'Like button clicked')}/>,
                <AvakioButton buttonType="iconButton" padding={[8, 8, 8, 8]} icon={<Star size={20} />} tooltip="Add to favorites" onClick={() => addLog('onClick', 'Favorite button clicked')}/>,
                <AvakioButton padding={[8, 8, 8, 8]} icon={<Download size={16} />} onClick={() => addLog('onClick', 'Download button clicked')} label='Download'/>,
                <AvakioButton iconRight={<ArrowRight size={16} />} padding={[8, 8, 8, 8]} onClick={() => addLog('onClick', 'Continue button clicked')} label="Continue"
                />,
              ]}
            />,
          ]}
        />

        {/* Button States */}
        <AvakioTemplate type="clean" borderType="clean" padding={[16, 0, 0, 16]} content={<strong>Button States</strong>} />
        <AvakioTemplate type="clean" borderType="clean" padding={[0, 0, 0, 16]} content="Buttons can be disabled or show loading states."/>
        <AvakioLayout type="clean" borderless={false} margin={12} padding={16}
          rows={[
            <AvakioLayout key="states-row" type="clean" borderless={true} flexWrap={true}
              cols={[
                <AvakioButton padding={[8, 8, 8, 8]} variant="primary" onClick={() => addLog('onClick', 'Normal button clicked')} label='Normal' />,                
                <AvakioButton padding={[8, 8, 8, 8]} variant="primary" disabled onClick={() => addLog('onClick', 'Disabled button clicked (should not fire)')} label='Disabled' />,
                <AvakioButton padding={[8, 8, 8, 8]} variant="primary" loading onClick={() => addLog('onClick', 'Loading button clicked (should not fire)')} label='Loading' />
              ]}
            />
          ]}
        />
      </section>

      {/* Options Section */}
      <section 
        ref={(el) => { sectionRefs.current['options'] = el; }}
        className="avakio-button-demo-section"
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
          content="Customize the Button with various options like button types, icons, badges, tooltips, and hotkeys."
        />

        {/* Button Types */}
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioTemplate
              key="types-title"
              type="clean"
              borderType="clean"
              content={<strong>Button Types</strong>}
            />,
            <AvakioTemplate
              key="types-desc"
              type="clean"
              borderType="clean"
              padding={[8, 0, 8, 0]}
              content="Different layout types: default with label, icon-only, and icon above label."
            />,
            <AvakioLayout
              key="types"
              type="clean"
              borderless={true}
              flexWrap={true}
              cols={[
                <AvakioButton padding={[8, 8, 8, 8]} buttonType="default" icon={<Settings size={16} />} label="Default" />,                
                <AvakioButton padding={[8, 8, 8, 8]} buttonType="icon" icon={<Heart size={20} />} tooltip="Like" bottomLabel='icon' />,                                
                <AvakioButton padding={[8, 8, 8, 8]} buttonType="iconButton" icon={<Star size={20} />} tooltip="Favorite" bottomLabel='iconButton'/>,                                  
                <AvakioButton padding={[8, 8, 8, 8]} buttonType="iconTop" icon={<Mail size={24} />} bottomLabel='iconTop' label='Emails'/>,                                                
                <AvakioButton padding={[8, 8, 8, 8]} buttonType="iconBottom" icon={<Bell size={24} />} bottomLabel='iconBottom' label='Notifications'/>,                  
              ]}
            />,
          ]}
        />

        {/* Badges */}
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioTemplate
              key="badges-title"
              type="clean"
              borderType="clean"
              content={<strong>Badges</strong>}
            />,
            <AvakioTemplate
              key="badges-desc"
              type="clean"
              borderType="clean"
              padding={[8, 0, 8, 0]}
              content="Display badges with numbers or text beside the button label."
            />,
            <AvakioLayout
              key="badges"
              type="clean"
              borderless={true}
              flexWrap={true}
              cols={[
                <AvakioButton padding={[8, 8, 8, 8]} variant="primary" badge={3} icon={<Bell size={16} />}>Inbox</AvakioButton>,
                <AvakioButton padding={[8, 8, 8, 8]} variant="secondary" badge="New" iconRight={<ArrowRight size={16} />}>Updates</AvakioButton>,
                <AvakioButton padding={[8, 8, 8, 8]} variant="outline" badge={12}>Notifications</AvakioButton>,
                <AvakioButton padding={[8, 8, 8, 8]} badge="99+" buttonType="icon" icon={<Bell size={20} />} tooltip="Many notifications" />,
              ]}
            />,
          ]}
        />

        {/* Tooltips & Hotkeys */}
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioTemplate
              key="tooltips-title"
              type="clean"
              borderType="clean"
              content={<strong>Tooltips & Hotkeys</strong>}
            />,
            <AvakioTemplate
              key="tooltips-desc"
              type="clean"
              borderType="clean"
              padding={[8, 0, 8, 0]}
              content="Add tooltips and keyboard shortcuts for better user experience."
            />,
            <AvakioLayout
              key="tooltips"
              type="clean"
              borderless={true}
              flexWrap={true}
              cols={[
                <AvakioButton padding={[8, 8, 8, 8]} tooltip="Save your work" icon={<Download size={16} />}>Save</AvakioButton>,
                <AvakioButton padding={[8, 8, 8, 8]} tooltip="Quick save with Ctrl+S" hotkey="ctrl+s" variant="primary" icon={<Download size={16} />} onClick={() => {setHotkeyCount(c => c + 1);addLog('hotkey triggered', 'Ctrl+S pressed');}} label='Save'/>,                  
                <AvakioButton padding={[8, 8, 8, 8]} tooltip="Delete item" hotkey="delete" variant="danger" icon={<Trash2 size={16} />} onClick={() => {setHotkeyCount(c => c + 1);addLog('hotkey triggered', 'Delete key pressed');}} label='Delete'/>                 
              ]}
            />,
            <AvakioTemplate
              key="hotkey-count"
              type="clean"
              borderType="clean"
              padding={[16, 0, 0, 0]}
              content={<>Hotkey activations: <strong>{hotkeyCount}</strong></>}
            />,
          ]}
        />

        {/* Layout Options */}
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          flexWrap={true}
          rows={[
            <AvakioTemplate
              key="layout-title"
              type="clean"
              borderType="clean"
              content={<strong>Layout Options</strong>}
            />,
            <AvakioTemplate
              key="layout-desc"
              type="clean"
              borderType="clean"
              padding={[8, 0, 8, 0]}
              content="Control button width and text alignment."
            />,
            <AvakioButton padding={[8, 8, 8, 8]} align="left" block icon={<ArrowRight size={16} />} label='Left Aligned'/>,
            <AvakioButton padding={[8, 8, 8, 8]} align="center" block label='Center Aligned'/>,
            <AvakioButton padding={[8, 8, 8, 8]} align="right" block iconRight={<ArrowRight size={16} />} label='Right Aligned'/>,
            <AvakioLayout
              key="auto-width"
              type="clean"
              borderless={true}
              padding={[8, 0, 0, 0]}
              cols={[
                <AvakioButton padding={[8, 8, 8, 8]} autowidth>Auto Width</AvakioButton>,
                <AvakioButton  padding={[8, 8, 8, 8]}autowidth icon={<Plus size={16} />}>Fits Content</AvakioButton>,
              ]}
            />,
          ]}
        />
      </section>

      {/* Interactive Playground Section */}
      <section 
        ref={(el) => { sectionRefs.current['playground'] = el; }}
        className="avakio-button-demo-section"
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
          content="Experiment with different Button configurations in real-time. Change any property below to see the effect on the preview."
        />
        <AvakioLayout
          id='pg-mainLayout'
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          height={650}            
          rows={[
            <AvakioLayout
              id='pg-mainLayout-row1'
              type="clean"
              borderless={true}
              height='50px'
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
                      rows={[
                        isComponentMounted ? (
                        <AvakioButton
                          id={getPropValue('componentId', 'playground-button')}
                          testId={getPropValue('testId', '') || undefined}
                          className={getPropValue('className', '') || undefined}
                          ref={buttonRef}
                          variant={getPropValue('variant', 'primary') as 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'}
                          size={getPropValue('size', 'md') as 'sm' | 'md' | 'lg'}
                          buttonType={getPropValue('buttonType', 'default') as 'default' | 'icon' | 'iconButton' | 'iconTop' | 'iconBottom'}
                          align={getPropValue('align', 'center') as 'left' | 'center' | 'right'}
                          icon={getPropValue('showIcon', true) ? <Check size={16} /> : undefined}
                          iconRight={getPropValue('showIconRight', false) ? <ArrowRight size={16} /> : undefined}
                          image={getPropValue('image', '') || undefined}
                          block={getPropValue('block', false)}
                          autowidth={getPropValue('autowidth', false)}
                          disabled={getPropValue('disabled', false)}
                          loading={getPropValue('loading', false)}
                          hidden={getPropValue('hidden', false)}
                          borderless={getPropValue('borderless', false)}
                          badge={getPropValue('badge', '') || undefined}
                          tooltip={getPropValue('tooltip', '') || undefined}
                          hotkey={getPropValue('hotkey', '') || undefined}
                          popup={getPropValue('popup', '') || undefined}
                          bottomLabel={getPropValue('bottomLabel', '') || undefined}
                          buttonWidth={formatSizingValue(getPropValue('buttonWidth', ''))}
                          buttonHeight={formatSizingValue(getPropValue('buttonHeight', ''))}
                          textAlign={getPropValue('textAlign', '') as 'left' | 'center' | 'right' | undefined}
                          name={getPropValue('name', '') || undefined}
                          value={getPropValue('value', '') || undefined}
                          type={getPropValue('type', 'button') as 'button' | 'submit' | 'reset'}
                          width={formatSizingValue(getPropValue('width', ''))}
                          height={formatSizingValue(getPropValue('height', ''))}
                          minWidth={formatSizingValue(getPropValue('minWidth', ''))}
                          minHeight={formatSizingValue(getPropValue('minHeight', ''))}
                          maxWidth={formatSizingValue(getPropValue('maxWidth', ''))}
                          maxHeight={formatSizingValue(getPropValue('maxHeight', ''))}
                          margin={getPropValue('margin', '') ? getPropValue('margin', '').includes(',') ? getPropValue('margin', '').split(',').map(Number) as [number, number, number, number] : Number(getPropValue('margin', '')) : undefined}
                          padding={getPropValue('padding', '') ? getPropValue('padding', '').includes(',') ? getPropValue('padding', '').split(',').map(Number) as [number, number, number, number] : Number(getPropValue('padding', '')) : undefined}
                          style={(() => {
                            try {
                              const styleStr = getPropValue('style', '');
                              return styleStr ? JSON.parse(styleStr) : undefined;
                            } catch {
                              return undefined;
                            }
                          })()}
                          onClick={(e) => {
                            setPlaygroundClickCount(c => c + 1);
                            if (getPropValue('logOnClick', true)) addLog('onClick', 'playground button clicked');
                            if (getPropValue('logOnItemClick', false)) addLog('onItemClick', 'item clicked (AvakioBase event)');
                          }}
                          onMouseEnter={() => {
                            if (getPropValue('logOnMouseEnter', true)) addLog('onMouseEnter', 'mouse entered button');
                          }}
                          onMouseLeave={() => {
                            if (getPropValue('logOnMouseLeave', true)) addLog('onMouseLeave', 'mouse left button');
                          }}
                          onFocus={() => {
                            if (getPropValue('logOnFocus', true)) addLog('onFocus', 'button received focus');
                          }}
                          onBlur={() => {
                            if (getPropValue('logOnBlur', true)) addLog('onBlur', 'button lost focus');
                          }}
                          onKeyDown={(e) => {
                            if (getPropValue('logOnKeyDown', true)) addLog('onKeyDown', `key pressed: ${e.key}`);
                          }}
                          onKeyUp={(e) => {
                            if (getPropValue('logOnKeyUp', true)) addLog('onKeyUp', `key released: ${e.key}`);
                          }}
                          onKeyPress={(e) => {
                            if (getPropValue('logOnKeyPress', true)) addLog('onKeyPress', `key pressed: ${e.key}`);
                          }}
                          onAfterRender={() => {
                            if (getPropValue('logOnAfterRender', false)) addLog('onAfterRender', 'component rendered');
                          }}
                          onBeforeRender={() => {
                            if (getPropValue('logOnBeforeRender', false)) addLog('onBeforeRender', 'about to render');
                          }}
                          onViewShow={() => {
                            if (getPropValue('logOnViewShow', false)) addLog('onViewShow', 'view shown');
                          }}
                        >
                          {getPropValue('label', 'Click Me')}
                        </AvakioButton>
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
                                label='focus()'
                                margin={[0, 10, 10, 0]}
                                width='200px'
                                buttonWidth='150px'
                                onClick={() => {
                                  buttonRef.current?.focus();
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
                                  buttonRef.current?.blur();
                                  addLog('blur()', 'called via ref');
                                }}
                              />
                              <AvakioButton
                                size="sm"
                                label='enable()'
                                margin={[0, 10, 10, 0]}
                                width='200px'
                                buttonWidth='150px'
                                onClick={() => {
                                  buttonRef.current?.enable();
                                  addLog('enable()', 'button enabled via ref');
                                }}
                              />
                              <AvakioButton
                                size="sm"
                                label='disable()'
                                margin={[0, 10, 10, 0]}
                                width='200px'
                                buttonWidth='150px'
                                onClick={() => {
                                  buttonRef.current?.disable();
                                  addLog('disable()', 'button disabled via ref');
                                }}
                              />
                              <AvakioButton
                                size="sm"
                                label='show()'
                                margin={[0, 10, 10, 0]}
                                width='200px'
                                buttonWidth='150px'
                                onClick={() => {
                                  buttonRef.current?.show();
                                  addLog('show()', 'button shown via ref');
                                }}
                              />
                              <AvakioButton
                                size="sm"
                                label='hide()'
                                margin={[0, 10, 10, 0]}
                                width='200px'
                                buttonWidth='150px'
                                onClick={() => {
                                  buttonRef.current?.hide();
                                  addLog('hide()', 'button hidden via ref');
                                }}
                              />
                              <AvakioButton
                                size="sm"
                                label='isEnabled()'
                                margin={[0, 10, 10, 0]}
                                width='200px'
                                buttonWidth='150px'
                                onClick={() => {
                                  const enabled = buttonRef.current?.isEnabled();
                                  addLog('isEnabled()', `result: ${enabled}`);
                                }}
                              />
                              <AvakioButton
                                size="sm"
                                label='isVisible()'
                                margin={[0, 10, 10, 0]}
                                width='200px'
                                buttonWidth='150px'
                                onClick={() => {
                                  const visible = buttonRef.current?.isVisible();
                                  addLog('isVisible()', `result: ${visible}`);
                                }}
                              />
                              <AvakioButton
                                size="sm"
                                label='getText()'
                                margin={[0, 10, 10, 0]}
                                width='200px'
                                buttonWidth='150px'
                                onClick={() => {
                                  const text = buttonRef.current?.getText();
                                  addLog('getText()', `result: "${text}"`);
                                }}
                              />
                              <AvakioButton
                                size="sm"
                                label='getElement()'
                                margin={[0, 10, 10, 0]}
                                width='200px'
                                buttonWidth='150px'
                                onClick={() => {
                                  const el = buttonRef.current?.getElement();
                                  addLog('getElement()', `element: ${el?.tagName}`);
                                }}
                              />
                              <AvakioButton
                                size="sm"
                                label='define()'
                                margin={[0, 10, 10, 0]}
                                width='200px'
                                buttonWidth='150px'
                                onClick={() => {
                                  buttonRef.current?.define('disabled', true);
                                  addLog('define()', 'set disabled to true');
                                }}
                              />
                              <AvakioButton
                                size="sm"
                                label={isComponentMounted ? 'Destroy Component' : 'Recreate Component'}
                                margin={[0,10,10,0]}
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
                              { id: 'componentId', label: 'ID', type: 'text', value: 'playground-button', group: 'Identity', placeholder: 'Component ID' },
                              { id: 'testId', label: 'Test ID', type: 'text', value: '', group: 'Identity', placeholder: 'Test ID for testing' },
                              { id: 'className', label: 'Class Name', type: 'text', value: '', group: 'Identity', placeholder: 'Additional CSS class' },
                              // Content Group
                              { id: 'label', label: 'Label', type: 'text', value: 'Click Me', group: 'Content', placeholder: 'Button text' },
                              { id: 'tooltip', label: 'Tooltip', type: 'text', value: '', group: 'Content', placeholder: 'Tooltip text' },
                              { id: 'hotkey', label: 'Hotkey', type: 'text', value: '', group: 'Content', placeholder: 'e.g. ctrl+s' },
                              { id: 'badge', label: 'Badge', type: 'text', value: '', group: 'Content', placeholder: 'e.g. 5 or New' },
                              { id: 'image', label: 'Image URL', type: 'text', value: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJMMTMuMDkgOC4yNkwyMSA5TDEzLjA5IDE1Ljc0TDEyIDIyTDEwLjkxIDE1Ljc0TDMgOUwxMC45MSA4LjI2TDEyIDJaIiBmaWxsPSIjMDA3QUNDIi8+Cjwvc3ZnPgo=', group: 'Content', placeholder: 'Image URL to display' },
                              { id: 'popup', label: 'Popup', type: 'text', value: '', group: 'Content', placeholder: 'Popup menu ID' },
                              { id: 'bottomLabel', label: 'Bottom Label', type: 'text', value: '', group: 'Content', placeholder: 'Bottom help text' },
                              // Appearance Group
                              { id: 'variant', label: 'Variant', type: 'select', value: 'primary', group: 'Appearance', selectOptions: [
                                { id: 'primary', value: 'Primary' },
                                { id: 'secondary', value: 'Secondary' },
                                { id: 'outline', value: 'Outline' },
                                { id: 'ghost', value: 'Ghost' },
                                { id: 'danger', value: 'Danger' },
                              ]},
                              { id: 'size', label: 'Size', type: 'select', value: 'md', group: 'Appearance', selectOptions: [
                                { id: 'sm', value: 'Small' },
                                { id: 'md', value: 'Medium' },
                                { id: 'lg', value: 'Large' },
                              ]},
                              { id: 'buttonType', label: 'Button Type', type: 'select', value: 'default', group: 'Appearance', selectOptions: [
                                { id: 'default', value: 'Default' },
                                { id: 'icon', value: 'Icon Only' },
                                { id: 'iconButton', value: 'Icon Button' },
                                { id: 'iconTop', value: 'Icon Top' },
                                { id: 'iconBottom', value: 'Icon Bottom' },
                              ]},
                              { id: 'align', label: 'Text Align', type: 'select', value: 'center', group: 'Appearance', selectOptions: [
                                { id: 'left', value: 'Left' },
                                { id: 'center', value: 'Center' },
                                { id: 'right', value: 'Right' },
                              ]},
                              // Layout Group
                              { id: 'block', label: 'Block', type: 'checkbox', value: false, group: 'Layout', checkboxLabel: 'Full width' },
                              { id: 'autowidth', label: 'Auto Width', type: 'checkbox', value: false, group: 'Layout', checkboxLabel: 'Fit content' },
                              { id: 'borderless', label: 'Borderless', type: 'checkbox', value: false, group: 'Layout', checkboxLabel: 'Remove borders' },
                              { id: 'buttonWidth', label: 'Button Width', type: 'text', value: '', group: 'Layout', placeholder: 'e.g. 200 or 100%' },
                              { id: 'buttonHeight', label: 'Button Height', type: 'text', value: '', group: 'Layout', placeholder: 'e.g. 40 or auto' },
                              { id: 'textAlign', label: 'Button Text Align', type: 'select', value: '', group: 'Layout', selectOptions: [
                                { id: '', value: 'Default' },
                                { id: 'left', value: 'Left' },
                                { id: 'center', value: 'Center' },
                                { id: 'right', value: 'Right' },
                              ]},
                              { id: 'width', label: 'Width', type: 'text', value: '', group: 'Layout', placeholder: 'e.g. 200px or 100%' },
                              { id: 'height', label: 'Height', type: 'text', value: '', group: 'Layout', placeholder: 'e.g. 50px' },
                              { id: 'minWidth', label: 'Min Width', type: 'text', value: '', group: 'Layout', placeholder: 'e.g. 100px' },
                              { id: 'minHeight', label: 'Min Height', type: 'text', value: '', group: 'Layout', placeholder: 'e.g. 38px' },
                              { id: 'maxWidth', label: 'Max Width', type: 'text', value: '', group: 'Layout', placeholder: 'e.g. 500px' },
                              { id: 'maxHeight', label: 'Max Height', type: 'text', value: '', group: 'Layout', placeholder: 'e.g. 100px' },
                              { id: 'margin', label: 'Margin', type: 'text', value: '', group: 'Layout', placeholder: 'e.g. 10 or 10px' },
                              { id: 'padding', label: 'Padding', type: 'text', value: '', group: 'Layout', placeholder: 'e.g. 12 or 12px' },
                              { id: 'style', label: 'Custom Style', type: 'text', value: '', group: 'Layout', placeholder: 'CSS object as JSON' },
                              // Form Integration Group
                              { id: 'name', label: 'Name', type: 'text', value: '', group: 'Form', placeholder: 'Form field name' },
                              { id: 'value', label: 'Value', type: 'text', value: '', group: 'Form', placeholder: 'Form field value' },
                              { id: 'type', label: 'Button Type', type: 'select', value: 'button', group: 'Form', selectOptions: [
                                { id: 'button', value: 'Button' },
                                { id: 'submit', value: 'Submit' },
                                { id: 'reset', value: 'Reset' },
                              ]},
                              // Icons Group
                              { id: 'showIcon', label: 'Show Icon', type: 'checkbox', value: true, group: 'Icons', checkboxLabel: 'Display left icon' },
                              { id: 'showIconRight', label: 'Show Icon Right', type: 'checkbox', value: false, group: 'Icons', checkboxLabel: 'Display right icon' },
                              // State Group
                              { id: 'disabled', label: 'Disabled', type: 'checkbox', value: false, group: 'State', checkboxLabel: 'Disable the button' },
                              { id: 'loading', label: 'Loading', type: 'checkbox', value: false, group: 'State', checkboxLabel: 'Show loading spinner' },
                              { id: 'hidden', label: 'Hidden', type: 'checkbox', value: false, group: 'State', checkboxLabel: 'Hide the button' },
                              // Events Group
                              { id: 'logOnClick', label: 'Log onClick', type: 'checkbox', value: true, group: 'Events', checkboxLabel: 'Log onClick events' },
                              { id: 'logOnMouseEnter', label: 'Log onMouseEnter', type: 'checkbox', value: true, group: 'Events', checkboxLabel: 'Log onMouseEnter events' },
                              { id: 'logOnMouseLeave', label: 'Log onMouseLeave', type: 'checkbox', value: true, group: 'Events', checkboxLabel: 'Log onMouseLeave events' },
                              { id: 'logOnFocus', label: 'Log onFocus', type: 'checkbox', value: true, group: 'Events', checkboxLabel: 'Log onFocus events' },
                              { id: 'logOnBlur', label: 'Log onBlur', type: 'checkbox', value: true, group: 'Events', checkboxLabel: 'Log onBlur events' },
                              { id: 'logOnKeyDown', label: 'Log onKeyDown', type: 'checkbox', value: true, group: 'Events', checkboxLabel: 'Log onKeyDown events' },
                              { id: 'logOnKeyUp', label: 'Log onKeyUp', type: 'checkbox', value: true, group: 'Events', checkboxLabel: 'Log onKeyUp events' },
                              { id: 'logOnKeyPress', label: 'Log onKeyPress', type: 'checkbox', value: true, group: 'Events', checkboxLabel: 'Log onKeyPress events' },
                              { id: 'logOnItemClick', label: 'Log onItemClick', type: 'checkbox', value: false, group: 'Events', checkboxLabel: 'Log onItemClick events' },
                              { id: 'logOnAfterRender', label: 'Log onAfterRender', type: 'checkbox', value: false, group: 'Events', checkboxLabel: 'Log onAfterRender events' },
                              { id: 'logOnBeforeRender', label: 'Log onBeforeRender', type: 'checkbox', value: false, group: 'Events', checkboxLabel: 'Log onBeforeRender events' },
                              { id: 'logOnViewShow', label: 'Log onViewShow', type: 'checkbox', value: false, group: 'Events', checkboxLabel: 'Log onViewShow events' },
                            ]);
                            setPlaygroundClickCount(0);
                            setIsComponentMounted(true);
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
        className="avakio-button-demo-section"
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
              id="button-props-table"
              data={propsData}
              filterable
              sortable
              columns={propsColumns}
              select={false}
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
              id="button-events-table"
              data={eventsData}
              filterable
              sortable
              columns={propsColumns}
              select={false}
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
              id="button-methods-table"
              data={refMethodsData}
              filterable
              sortable
              columns={propsColumns}
              select={false}
              showRowNum={true}
            />,
          ]}
        />
      </section>
    </div>
  );
}

export default AvakioButtonExample;
