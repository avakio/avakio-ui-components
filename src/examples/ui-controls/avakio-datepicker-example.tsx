import React, { useState, useRef } from 'react';
import { AvakioDatePicker } from '../../components/avakio/ui-controls/avakio-datepicker';
import { AvakioBaseRef } from '../../components/avakio/base/avakio-base-props';
import { AvakioTemplate } from '../../components/avakio/views/avakio-template/avakio-template';
import { AvakioLayout } from '../../components/avakio/layouts/avakio-layout/avakio-layout';
import { AvakioRichSelect } from '../../components/avakio/ui-controls/avakio-richselect/avakio-richselect';
import { AvakioCheckbox } from '../../components/avakio/ui-controls/avakio-checkbox/avakio-checkbox';
import { AvakioButton } from '../../components/avakio/ui-controls/avakio-button/avakio-button';
import { AvakioDataTable } from '../../components/avakio/data-presentation/avakio-datatable/AvakioDataTable';
import type { AvakioColumn } from '../../components/avakio/data-presentation/avakio-datatable/AvakioDataTable';
import { AvakioTabBar } from '../../components/avakio/ui-controls/avakio-tabbar/avakio-tabbar';
import { AvakioViewHeader } from '../../components/avakio/ui-widgets/avakio-view-header/avakio-view-header';
import { 
  Calendar,
  Settings2,
  Wand2,
  Book,
  Play,
} from 'lucide-react';
import './avakio-datepicker-example.css';

// Tab options for navigation
const TAB_OPTIONS = [
  { id: 'basic', label: 'Basic Usage', icon: <Calendar size={14} /> },
  { id: 'options', label: 'Options', icon: <Settings2 size={14} /> },
  { id: 'methods', label: 'Ref Methods', icon: <Wand2 size={14} /> },
  { id: 'playground', label: 'Interactive Playground', icon: <Play size={14} /> },
  { id: 'docs', label: 'Documentation', icon: <Book size={14} /> },
];

export function AvakioDatePickerExample() {
  const [activeSection, setActiveSection] = useState<string | number | null>('basic');
  
  // Section refs for scroll navigation
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  
  // Demo state values
  const [basicDate, setBasicDate] = useState<string>('');
  const [inlineDate, setInlineDate] = useState<string>('');
  const [timeDate, setTimeDate] = useState<string>('');
  const [compactDate, setCompactDate] = useState<string>('');
  
  // Playground state
  const [playgroundValue, setPlaygroundValue] = useState<string>(new Date().toISOString());
  const [playgroundShowTime, setPlaygroundShowTime] = useState(false);
  const [playgroundInline, setPlaygroundInline] = useState(false);
  const [playgroundClearable, setPlaygroundClearable] = useState(true);
  const [playgroundBorderless, setPlaygroundBorderless] = useState(false);
  const [playgroundDisabled, setPlaygroundDisabled] = useState(false);
  const [playgroundHidden, setPlaygroundHidden] = useState(false);
  const [playgroundRequired, setPlaygroundRequired] = useState(false);
  const [playgroundInvalid, setPlaygroundInvalid] = useState(false);
  const [playgroundCopyBtn, setPlaygroundCopyBtn] = useState(false);
  const [playgroundSize, setPlaygroundSize] = useState<string>('default');
  const [playgroundLabelPosition, setPlaygroundLabelPosition] = useState<string>('left');

  // Ref example
  const datePickerRef = useRef<AvakioBaseRef<string>>(null);
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

  // Add to event log
  const addLog = (message: string) => {
    setEventLog(prev => [...prev.slice(-4), `${new Date().toLocaleTimeString()} - ${message}`]);
  };

  // Format date for display
  const formatDate = (isoString: string, includeTime = false) => {
    if (!isoString) return 'No date selected';
    const date = new Date(isoString);
    if (Number.isNaN(date.getTime())) return isoString;
    if (includeTime) {
      return date.toLocaleString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
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
    { id: 3, name: 'value', type: 'string', defaultValue: "''", description: 'ISO string of selected date/time' },
    { id: 4, name: 'onChange', type: '(newValue: string, oldValue?: string) => void', defaultValue: 'required', description: 'Callback when date/time changes, receives new and old value' },
    { id: 5, name: 'label', type: 'string', defaultValue: 'undefined', description: 'Label text displayed next to the input' },
    { id: 6, name: 'placeholder', type: 'string', defaultValue: "''", description: 'Placeholder text when no date is selected' },
    { id: 7, name: 'showTime', type: 'boolean', defaultValue: 'false', description: 'Enable time selection (returns full ISO datetime)' },
    { id: 8, name: 'inline', type: 'boolean', defaultValue: 'false', description: 'Display calendar inline without dropdown' },
    { id: 9, name: 'size', type: "'default' | 'compact'", defaultValue: "'default'", description: 'Size variant - compact for filters/tables' },
    { id: 10, name: 'clearable', type: 'boolean', defaultValue: 'false', description: 'Show clear button when value exists' },
    { id: 11, name: 'enableValueCopyButton', type: 'boolean', defaultValue: 'false', description: 'Show copy button to copy value to clipboard' },
    { id: 12, name: 'borderless', type: 'boolean', defaultValue: 'false', description: 'Remove border from component' },
    { id: 13, name: 'disabled', type: 'boolean', defaultValue: 'false', description: 'Disable the component' },
    { id: 14, name: 'readonly', type: 'boolean', defaultValue: 'false', description: 'Make the input read-only' },
    { id: 15, name: 'hidden', type: 'boolean', defaultValue: 'false', description: 'Hide the component' },
    { id: 16, name: 'required', type: 'boolean', defaultValue: 'false', description: 'Mark field as required (shows asterisk)' },
    { id: 17, name: 'invalid', type: 'boolean', defaultValue: 'false', description: 'Show invalid/error state' },
    { id: 18, name: 'invalidMessage', type: 'string', defaultValue: 'undefined', description: 'Error message to display when invalid' },
    { id: 19, name: 'labelPosition', type: "'left' | 'top'", defaultValue: "'left'", description: 'Position of the label relative to input' },
    { id: 20, name: 'labelAlign', type: "'left' | 'right' | 'center'", defaultValue: "'left'", description: 'Alignment of label text' },
    { id: 21, name: 'labelWidth', type: 'number | string', defaultValue: '80', description: 'Width of the label area' },
    { id: 22, name: 'width', type: 'number | string', defaultValue: 'undefined', description: 'Width of the component' },
    { id: 23, name: 'height', type: 'number | string', defaultValue: '38', description: 'Height of the component' },
    { id: 24, name: 'minWidth', type: 'number | string', defaultValue: 'undefined', description: 'Minimum width' },
    { id: 25, name: 'minHeight', type: 'number | string', defaultValue: 'undefined', description: 'Minimum height' },
    { id: 26, name: 'maxWidth', type: 'number | string', defaultValue: 'undefined', description: 'Maximum width' },
    { id: 27, name: 'maxHeight', type: 'number | string', defaultValue: 'undefined', description: 'Maximum height' },
    { id: 28, name: 'bottomLabel', type: 'string', defaultValue: 'undefined', description: 'Helper text below the input' },
    { id: 29, name: 'tooltip', type: 'string', defaultValue: 'undefined', description: 'Tooltip text on hover' },
    { id: 30, name: 'className', type: 'string', defaultValue: 'undefined', description: 'Additional CSS class name' },
    { id: 31, name: 'style', type: 'React.CSSProperties', defaultValue: 'undefined', description: 'Custom inline styles' },
    { id: 32, name: 'onBlur', type: '(event: FocusEvent) => void', defaultValue: 'undefined', description: 'Callback when focus leaves the input' },
    { id: 33, name: 'onFocus', type: '(event: FocusEvent) => void', defaultValue: 'undefined', description: 'Callback when input receives focus' },
    { id: 34, name: 'onKeyPress', type: '(event: KeyboardEvent) => void', defaultValue: 'undefined', description: 'Callback on keyboard key press' },
  ];

  const refMethodsData: PropDoc[] = [
    { id: 1, name: 'blur()', type: '() => void', defaultValue: '-', description: 'Remove focus from the control' },
    { id: 2, name: 'focus()', type: '() => void', defaultValue: '-', description: 'Set focus to the control' },
    { id: 3, name: 'getValue()', type: '() => string | undefined', defaultValue: '-', description: 'Get the current value' },
    { id: 4, name: 'setValue(value)', type: '(value: string) => void', defaultValue: '-', description: 'Set a new value' },
    { id: 5, name: 'getText()', type: '() => string', defaultValue: '-', description: 'Get the display text value' },
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
    <div className="avakio-datepicker-demo-container">
      {/* Sticky Header + Tab Navigation */}
      <div className="avakio-example-sticky-header">
        {/* Header */}
        <AvakioViewHeader
          label="UI Controls"
          title="DatePicker"
          subTitle="A date and time picker component with dropdown and inline modes, time selection, and full theme support."
          isSticky={false}
        />

        {/* Tab Navigation */}
        <div className="avakio-example-tabbar-container">
          <AvakioTabBar
            id="datepicker-demo-tabs"
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
        className="avakio-datepicker-demo-section"
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
          content="The DatePicker displays a trigger button that opens a calendar popover. Click to select a date."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <div key="basic" style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
              <AvakioDatePicker
                value={basicDate}
                labelWidth={100}
                onChange={(newVal) => {
                  setBasicDate(newVal);
                  addLog(`Date changed to: ${newVal}`);
                }}
                label="Select Date"
                showTime={false}
                clearable
              />
              <div className="avakio-datepicker-result">
                Selected: <strong>{formatDate(basicDate)}</strong>
              </div>
            </div>,
          ]}
        />

        {/* Inline Mode */}
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[16, 0, 0, 16]}
          content={<strong>Inline Mode</strong>}
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="Set inline={true} to display the calendar directly without a dropdown."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <div key="inline" style={{ display: 'flex', justifyContent: 'center' }}>
              <AvakioDatePicker
                value={inlineDate}
                onChange={setInlineDate}
                showTime={false}
                inline
              />
            </div>,
            <div key="inline-result" className="avakio-datepicker-result" style={{ textAlign: 'center' }}>
              Selected: <strong>{formatDate(inlineDate)}</strong>
            </div>,
          ]}
        />

        {/* With Time */}
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[16, 0, 0, 16]}
          content={<strong>With Time Selection</strong>}
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="Enable time selection with showTime={true}. The picker includes hour and minute inputs with OK/Cancel buttons."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <div key="time" style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
              <AvakioDatePicker
                value={timeDate}
                onChange={setTimeDate}
                label="Date & Time"
                showTime={true}
                clearable
              />
              <div className="avakio-datepicker-result">
                Selected: <strong>{formatDate(timeDate, true)}</strong>
              </div>
            </div>,
          ]}
        />
      </section>

      {/* Options Section */}
      <section 
        ref={(el) => { sectionRefs.current['options'] = el; }}
        className="avakio-datepicker-demo-section"
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
          content="Customize the DatePicker with various options like size variants, label positions, and validation states."
        />

        {/* Compact Size */}
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioTemplate
              key="compact-title"
              type="clean"
              borderType="clean"
              content={<strong>Compact Size</strong>}
            />,
            <AvakioTemplate
              key="compact-desc"
              type="clean"
              borderType="clean"
              padding={[8, 0, 0, 0]}
              content="Use size='compact' for filters, table cells, or tight spaces."
            />,
            <div key="compact" style={{ display: 'flex', gap: '16px', marginTop: '12px', alignItems: 'center' }}>
              <span>Filter by date:</span>
              <AvakioDatePicker
                value={compactDate}
                onChange={setCompactDate}
                showTime={false}
                size="compact"
                clearable
                placeholder="Select..."
              />
            </div>,
          ]}
        />

        {/* Label Positions */}
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioTemplate
              key="label-title"
              type="clean"
              borderType="clean"
              content={<strong>Label Positions</strong>}
            />,
            <div key="labels" style={{ display: 'flex', gap: '32px', marginTop: '12px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontSize: '12px', color: '#666' }}>labelPosition="left" (default)</span>
                <AvakioDatePicker
                  value=""
                  onChange={() => {}}
                  label="Date"
                  labelPosition="left"
                  showTime={false}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontSize: '12px', color: '#666' }}>labelPosition="top"</span>
                <AvakioDatePicker
                  value=""
                  onChange={() => {}}
                  label="Date"
                  labelPosition="top"
                  showTime={false}
                />
              </div>
            </div>,
          ]}
        />

        {/* Validation States */}
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioTemplate
              key="validation-title"
              type="clean"
              borderType="clean"
              content={<strong>Validation States</strong>}
            />,
            <div key="validation" style={{ display: 'flex', gap: '32px', marginTop: '12px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontSize: '12px', color: '#666' }}>required=true</span>
                <AvakioDatePicker
                  value=""
                  onChange={() => {}}
                  label="Birth Date"
                  required
                  showTime={false}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontSize: '12px', color: '#666' }}>invalid=true</span>
                <AvakioDatePicker
                  value=""
                  onChange={() => {}}
                  label="Due Date"
                  invalid
                  invalidMessage="Please select a valid date"
                  showTime={false}
                />
              </div>
            </div>,
          ]}
        />

        {/* Other Options */}
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioTemplate
              key="other-title"
              type="clean"
              borderType="clean"
              content={<strong>Other Options</strong>}
            />,
            <div key="other" style={{ display: 'flex', gap: '32px', marginTop: '12px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontSize: '12px', color: '#666' }}>disabled=true</span>
                <AvakioDatePicker
                  value={new Date().toISOString()}
                  onChange={() => {}}
                  label="Date"
                  disabled
                  showTime={false}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontSize: '12px', color: '#666' }}>borderless=true</span>
                <AvakioDatePicker
                  value=""
                  onChange={() => {}}
                  label="Date"
                  borderless
                  showTime={false}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontSize: '12px', color: '#666' }}>enableValueCopyButton=true</span>
                <AvakioDatePicker
                  value={new Date().toISOString()}
                  onChange={() => {}}
                  label="Date"
                  enableValueCopyButton
                  clearable
                  showTime={false}
                />
              </div>
            </div>,
          ]}
        />
      </section>

      {/* Ref Methods Section */}
      <section 
        ref={(el) => { sectionRefs.current['methods'] = el; }}
        className="avakio-datepicker-demo-section"
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
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
                <AvakioDatePicker
                  ref={datePickerRef}
                  value={basicDate}
                  onChange={(newVal, oldVal) => {
                    setBasicDate(newVal);
                    addLog(`Changed: ${oldVal || 'empty'} → ${newVal || 'empty'}`);
                  }}
                  label="Date"
                  showTime={false}
                  clearable
                />
                <div className="avakio-datepicker-result">
                  Value: <strong>{basicDate || '(empty)'}</strong>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', minWidth: 180 }}>
                <AvakioButton onClick={() => {
                  datePickerRef.current?.focus();
                  addLog('focus() called');
                }}>
                  focus()
                </AvakioButton>
                <AvakioButton onClick={() => {
                  datePickerRef.current?.blur();
                  addLog('blur() called');
                }}>
                  blur()
                </AvakioButton>
                <AvakioButton onClick={() => {
                  const val = datePickerRef.current?.getValue();
                  addLog(`getValue() = ${val || '(empty)'}`);
                }}>
                  getValue()
                </AvakioButton>
                <AvakioButton onClick={() => {
                  datePickerRef.current?.setValue(new Date().toISOString().split('T')[0]);
                  addLog('setValue(today)');
                }}>
                  setValue(today)
                </AvakioButton>
                <AvakioButton onClick={() => {
                  datePickerRef.current?.enable();
                  addLog('enable() called');
                }}>
                  enable()
                </AvakioButton>
                <AvakioButton onClick={() => {
                  datePickerRef.current?.disable();
                  addLog('disable() called');
                }}>
                  disable()
                </AvakioButton>
                <AvakioButton onClick={() => {
                  const enabled = datePickerRef.current?.isEnabled();
                  addLog(`isEnabled() = ${enabled}`);
                }}>
                  isEnabled()
                </AvakioButton>
                <AvakioButton onClick={() => {
                  datePickerRef.current?.show();
                  addLog('show() called');
                }}>
                  show()
                </AvakioButton>
                <AvakioButton onClick={() => {
                  datePickerRef.current?.hide();
                  addLog('hide() called');
                }}>
                  hide()
                </AvakioButton>
              </div>
            </div>,
            <div key="event-log" style={{ marginTop: '16px', padding: '12px', background: '#f5f5f5', borderRadius: '6px', fontSize: '12px' }}>
              <strong>Event Log:</strong>
              <div style={{ marginTop: '8px', maxHeight: '100px', overflow: 'auto' }}>
                {eventLog.length === 0 ? (<div style={{ color: '#888' }}>No events yet...</div>) : (
                  eventLog.map((log, i) => (
                    <div key={i} style={{ padding: '2px 0', color: '#666' }}>{log}</div>
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
        className="avakio-datepicker-demo-section"
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
          content="Experiment with different DatePicker configurations in real-time."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <div key="playground" style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
              {/* Preview */}
              <div style={{ flex: 1, minWidth: 300, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <AvakioTemplate
                  type="clean"
                  borderType="clean"
                  content={<strong>Preview</strong>}
                />
                <div style={{ 
                  padding: '24px', 
                  borderRadius: '8px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '16px',
                  background: '#fafafa',
                }}>
                  <AvakioDatePicker
                    value={playgroundValue}
                    onChange={setPlaygroundValue}
                    label="Event Date"
                    showTime={playgroundShowTime}
                    inline={playgroundInline}
                    clearable={playgroundClearable}
                    borderless={playgroundBorderless}
                    disabled={playgroundDisabled}
                    hidden={playgroundHidden}
                    required={playgroundRequired}
                    invalid={playgroundInvalid}
                    invalidMessage={playgroundInvalid ? 'This field is required' : undefined}
                    enableValueCopyButton={playgroundCopyBtn}
                    size={playgroundSize as 'default' | 'compact'}
                    labelPosition={playgroundLabelPosition as 'left' | 'top'}
                  />
                  <div className="avakio-datepicker-result">
                    Value: <strong>{formatDate(playgroundValue, playgroundShowTime)}</strong>
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div style={{ width: '280px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <AvakioTemplate
                  type="clean"
                  borderType="clean"
                  content={<strong>Configuration</strong>}
                />
                <AvakioRichSelect
                  label="Size"
                  value={playgroundSize}
                  options={[
                    { id: 'default', value: 'Default' },
                    { id: 'compact', value: 'Compact' },
                  ]}
                  onChange={(val) => setPlaygroundSize(String(val))}
                />
                <AvakioRichSelect
                  label="Label Position"
                  value={playgroundLabelPosition}
                  options={[
                    { id: 'left', value: 'Left' },
                    { id: 'top', value: 'Top' },
                  ]}
                  onChange={(val) => setPlaygroundLabelPosition(String(val))}
                />
                <AvakioCheckbox
                  label="Show Time"
                  checked={playgroundShowTime}
                  onChange={setPlaygroundShowTime}
                />
                <AvakioCheckbox
                  label="Inline Mode"
                  checked={playgroundInline}
                  onChange={setPlaygroundInline}
                />
                <AvakioCheckbox
                  label="Clearable"
                  checked={playgroundClearable}
                  onChange={setPlaygroundClearable}
                />
                <AvakioCheckbox
                  label="Copy Button"
                  checked={playgroundCopyBtn}
                  onChange={setPlaygroundCopyBtn}
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
              </div>
            </div>,
          ]}
        />
      </section>

      {/* Documentation Section */}
      <section 
        ref={(el) => { sectionRefs.current['docs'] = el; }}
        className="avakio-datepicker-demo-section"
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
              id="datepicker-props-table"
              data={propsData}
              columns={propsColumns}
              select={false}
              height={700}
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
              id="datepicker-methods-table"
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

export default AvakioDatePickerExample;




















