import React, { useState, useRef } from 'react';
import { AvakioDatePicker } from '../../components/avakio/ui-controls/avakio-datepicker';
import { Calendar, Clock, Layout, Settings, Code } from 'lucide-react';
import { AvakioViewHeader } from '../../components/avakio/ui-widgets/avakio-view-header/avakio-view-header';
import { AvakioTemplate } from '../../components/avakio/views/avakio-template/avakio-template';
import { AvakioLayout } from '../../components/avakio/layouts/avakio-layout/avakio-layout';
import { AvakioTabBar } from '../../components/avakio/ui-controls/avakio-tabbar/avakio-tabbar';

// Tab options for navigation
const TAB_OPTIONS = [
  { id: 'dropdown', label: 'Dropdown Mode', icon: <Calendar size={14} /> },
  { id: 'inline', label: 'Inline Mode', icon: <Layout size={14} /> },
  { id: 'time', label: 'With Time', icon: <Clock size={14} /> },
  { id: 'customization', label: 'Customization', icon: <Settings size={14} /> },
  { id: 'api', label: 'API Reference', icon: <Code size={14} /> },
];

export function AvakioDatePickerExample({ theme = 'material' }: { theme?: string }) {
  const [activeSection, setActiveSection] = useState<string | number | null>('dropdown');

  // Demo state values
  const [basicDate, setBasicDate] = useState<string>('');
  const [inlineDate, setInlineDate] = useState<string>('');
  const [timeDate, setTimeDate] = useState<string>('');
  const [labeledDate, setLabeledDate] = useState<string>('');
  const [prefilledDate, setPrefilledDate] = useState<string>(new Date().toISOString());

  // Section refs for scroll navigation
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const formatDate = (isoString: string, includeTime = true) => {
    if (!isoString) return 'No date selected';
    const date = new Date(isoString);
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

  return (
    <div className="avakio-datepicker-demo-container">
      {/* Sticky Header + Tab Navigation */}
      <div className="avakio-example-sticky-header">
        {/* Header */}
        <AvakioViewHeader
          label="UI Controls"
          title="DatePicker Component"
          subTitle="A beautiful date and time picker with dropdown and inline modes. Supports themes, time selection, and custom labels."
          isSticky={false}
        />

        {/* Tab Navigation */}
        <div className="avakio-example-tabbar-container">
          <AvakioTabBar
            id="datepicker-demo-tabs"
            value={activeSection}
            options={TAB_OPTIONS}
            onChange={(val) => setActiveSection(val)}
            align="left"
            padding={[6, 16, 16, 16]}
            size="sm"
            scrollable
          />
        </div>
      </div>

      {/* Dropdown Mode Section */}
      <section
        ref={(el) => { sectionRefs.current['dropdown'] = el; }}
        className="avakio-datepicker-demo-section"
      >
        <AvakioTemplate
          type="section"
          borderType="clean"
          content="Dropdown Mode (Default)"
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="The default mode displays a trigger button that opens a popover with the calendar. Click the button to select a date."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioDatePicker
              key="basic-dropdown"
              value={basicDate}
              onChange={setBasicDate}
              label="Select Date"
              showTime={false}
            />,
            <div key="basic-result" className="avakio-datepicker-result">
              Selected: <strong>{formatDate(basicDate, false)}</strong>
            </div>,
          ]}
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="Custom label and placeholder:"
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioDatePicker
              key="labeled-dropdown"
              value={labeledDate}
              onChange={setLabeledDate}
              label="Event Date"
              placeholder="Choose an event date"
              showTime={false}
            />,
            <div key="labeled-result" className="avakio-datepicker-result">
              Event scheduled for: <strong>{formatDate(labeledDate, false)}</strong>
            </div>,
          ]}
        />
      </section>

      {/* Inline Mode Section */}
      <section
        ref={(el) => { sectionRefs.current['inline'] = el; }}
        className="avakio-datepicker-demo-section"
      >
        <AvakioTemplate
          type="section"
          borderType="clean"
          content="Inline Mode"
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="Set inline={true} to display the calendar directly without a dropdown. Useful for dedicated date selection views."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <div key="inline-container" style={{ display: 'flex', justifyContent: 'center' }}>
              <AvakioDatePicker
                value={inlineDate}
                onChange={setInlineDate}
                showTime={false}
                inline
              />
            </div>,
            <div key="inline-result" className="avakio-datepicker-result">
              Selected date: <strong>{formatDate(inlineDate, false)}</strong>
            </div>,
          ]}
        />
      </section>

      {/* With Time Section */}
      <section
        ref={(el) => { sectionRefs.current['time'] = el; }}
        className="avakio-datepicker-demo-section"
      >
        <AvakioTemplate
          type="section"
          borderType="clean"
          content="With Time Selection"
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="Enable time selection with showTime={true}. The picker will include hour and minute inputs."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioDatePicker
              key="time-picker"
              value={timeDate}
              onChange={setTimeDate}
              label="Date & Time"
              showTime={true}
            />,
            <div key="time-result" className="avakio-datepicker-result">
              Selected: <strong>{formatDate(timeDate, true)}</strong>
            </div>,
          ]}
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="Inline mode with time selection:"
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <div key="inline-time-container" style={{ display: 'flex', justifyContent: 'center' }}>
              <AvakioDatePicker
                value={prefilledDate}
                onChange={setPrefilledDate}
                showTime={true}
                inline
              />
            </div>,
            <div key="inline-time-result" className="avakio-datepicker-result">
              Meeting time: <strong>{formatDate(prefilledDate, true)}</strong>
            </div>,
          ]}
        />
      </section>

      {/* Customization Section */}
      <section
        ref={(el) => { sectionRefs.current['customization'] = el; }}
        className="avakio-datepicker-demo-section"
      >
        <AvakioTemplate
          type="section"
          borderType="clean"
          content="Customization Options"
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="The DatePicker supports various customization options including custom labels, placeholders, and styling."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <div key="custom-demos" className="avakio-datepicker-custom-grid">
              <div className="avakio-datepicker-custom-item">
                <span className="avakio-datepicker-custom-label">Default Label</span>
                <AvakioDatePicker
                  value=""
                  onChange={() => {}}
                  showTime={false}
                />
              </div>
              <div className="avakio-datepicker-custom-item">
                <span className="avakio-datepicker-custom-label">Custom Label</span>
                <AvakioDatePicker
                  value=""
                  onChange={() => {}}
                  label="Birthday"
                  placeholder="When is your birthday?"
                  showTime={false}
                />
              </div>
              <div className="avakio-datepicker-custom-item">
                <span className="avakio-datepicker-custom-label">With Time</span>
                <AvakioDatePicker
                  value=""
                  onChange={() => {}}
                  label="Appointment"
                  placeholder="Schedule appointment"
                  showTime={true}
                />
              </div>
            </div>,
          ]}
        />
      </section>

      {/* API Reference Section */}
      <section
        ref={(el) => { sectionRefs.current['api'] = el; }}
        className="avakio-datepicker-demo-section"
      >
        <AvakioTemplate
          type="section"
          borderType="clean"
          content="API Reference"
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="Component properties and usage examples."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <div key="api-table" className="avakio-datepicker-api-table">
              <table>
                <thead>
                  <tr>
                    <th>Prop</th>
                    <th>Type</th>
                    <th>Default</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>value</code></td>
                    <td><code>string</code></td>
                    <td><code>""</code></td>
                    <td>ISO string of selected date/time</td>
                  </tr>
                  <tr>
                    <td><code>onChange</code></td>
                    <td><code>(value: string) =&gt; void</code></td>
                    <td>required</td>
                    <td>Callback when date/time changes</td>
                  </tr>
                  <tr>
                    <td><code>label</code></td>
                    <td><code>string</code></td>
                    <td><code>"Date"</code></td>
                    <td>Label displayed in trigger button</td>
                  </tr>
                  <tr>
                    <td><code>placeholder</code></td>
                    <td><code>string</code></td>
                    <td><code>"Select date"</code></td>
                    <td>Placeholder when no date selected</td>
                  </tr>
                  <tr>
                    <td><code>showTime</code></td>
                    <td><code>boolean</code></td>
                    <td><code>true</code></td>
                    <td>Enable time selection</td>
                  </tr>
                  <tr>
                    <td><code>inline</code></td>
                    <td><code>boolean</code></td>
                    <td><code>false</code></td>
                    <td>Display calendar inline (no dropdown)</td>
                  </tr>
                  <tr>
                    <td><code>className</code></td>
                    <td><code>string</code></td>
                    <td><code>""</code></td>
                    <td>Additional CSS classes</td>
                  </tr>
                  <tr>
                    <td><code>id</code></td>
                    <td><code>string</code></td>
                    <td>-</td>
                    <td>Component ID</td>
                  </tr>
                  <tr>
                    <td><code>testId</code></td>
                    <td><code>string</code></td>
                    <td>-</td>
                    <td>Test ID for testing</td>
                  </tr>
                </tbody>
              </table>
            </div>,
            <div key="usage-code" className="avakio-datepicker-code">
              <pre>{`import { AvakioDatePicker } from '../../components/avakio/ui-controls/avakio-datepicker';

function MyComponent() {
  const [date, setDate] = useState<string>('');

  return (
    <AvakioDatePicker
      value={date}
      onChange={setDate}
      label="Select Date"
      showTime={false}
    />
  );
}`}</pre>
            </div>,
          ]}
        />
      </section>
    </div>
  );
}

export default AvakioDatePickerExample;




















