import React, { useState, useEffect, useRef, useMemo } from 'react';
import { AvakioDateRangePicker, AvakioDateRange } from '../../components/avakio/ui-controls/avakio-daterangepicker/avakio-daterangepicker';
import './avakio-daterangepicker-example.css';
import { CalendarRange, Clock, Zap, Settings, Code } from 'lucide-react';
import { AvakioViewHeader } from '../../components/avakio/ui-widgets/avakio-view-header/avakio-view-header';
import { AvakioTemplate } from '../../components/avakio/views/avakio-template/avakio-template';
import { AvakioLayout } from '../../components/avakio/layouts/avakio-layout/avakio-layout';
import { AvakioTabBar } from '../../components/avakio/ui-controls/avakio-tabbar/avakio-tabbar';

// Tab options for navigation
const TAB_OPTIONS = [
  { id: 'basic', label: 'Basic Usage', icon: <CalendarRange size={14} /> },
  { id: 'presets', label: 'Presets', icon: <Zap size={14} /> },
  { id: 'time', label: 'With Time', icon: <Clock size={14} /> },
  { id: 'customization', label: 'Customization', icon: <Settings size={14} /> },
  { id: 'api', label: 'API Reference', icon: <Code size={14} /> },
];

function formatDisplay(range: AvakioDateRange, includeTime = false) {
  if (!range.start && !range.end) return 'No range selected';
  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return '…';
    const date = new Date(dateStr);
    if (includeTime) {
      return date.toLocaleString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    }
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };
  return `${formatDate(range.start)} → ${formatDate(range.end)}`;
}

export function AvakioDateRangePickerExample() {
  const [theme, setTheme] = useState<string>('material');
  const [activeSection, setActiveSection] = useState<string | number | null>('basic');

  // Demo state values
  const [basicRange, setBasicRange] = useState<AvakioDateRange>({ start: null, end: null });
  const [presetRange, setPresetRange] = useState<AvakioDateRange>({ start: null, end: null });
  const [timeRange, setTimeRange] = useState<AvakioDateRange>({
    start: '2025-02-01T09:00:00.000Z',
    end: '2025-02-05T17:00:00.000Z',
  });

  // Section refs for scroll navigation
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  // Custom presets
  const presets = useMemo(
    () => [
      {
        label: 'Today',
        range: () => {
          const today = new Date();
          const iso = today.toISOString().slice(0, 10);
          return { start: iso, end: iso };
        },
      },
      {
        label: 'Last 7 days',
        range: () => {
          const end = new Date();
          const start = new Date();
          start.setDate(end.getDate() - 6);
          return { start: start.toISOString().slice(0, 10), end: end.toISOString().slice(0, 10) };
        },
      },
      {
        label: 'Last 14 days',
        range: () => {
          const end = new Date();
          const start = new Date();
          start.setDate(end.getDate() - 13);
          return { start: start.toISOString().slice(0, 10), end: end.toISOString().slice(0, 10) };
        },
      },
      {
        label: 'This Month',
        range: () => {
          const now = new Date();
          const start = new Date(now.getFullYear(), now.getMonth(), 1);
          const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
          return { start: start.toISOString().slice(0, 10), end: end.toISOString().slice(0, 10) };
        },
      },
      {
        label: 'Q1 2025',
        range: () => ({ start: '2025-01-01', end: '2025-03-31' }),
      },
      {
        label: 'Clear',
        range: () => ({ start: null, end: null }),
      },
    ],
    []
  );

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

  // Sync with global theme from components-showcase
  useEffect(() => {
    const currentTheme = document.documentElement.getAttribute('data-admin-theme');
    if (currentTheme) {
      setTheme(currentTheme);
    }

    const observer = new MutationObserver(() => {
      const globalTheme = document.documentElement.getAttribute('data-admin-theme');
      if (globalTheme && globalTheme !== theme) {
        setTheme(globalTheme);
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-admin-theme'],
    });

    return () => observer.disconnect();
  }, [theme]);

  return (
    <div className="avakio-drp-demo-container" data-admin-theme={theme}>
      {/* Sticky Header + Tab Navigation */}
      <div className="avakio-drp-sticky-header">
        {/* Header */}
        <AvakioViewHeader
          theme={theme as any}
          label="UI Controls"
          title="DateRangePicker Component"
          subTitle="A powerful date range picker with dual calendars, quick presets, and optional time selection. with full theme support."
          isSticky={false}
        />

        {/* Tab Navigation */}
        <div className="avakio-drp-tabbar-container">
          <AvakioTabBar
            id="drp-demo-tabs"
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
        className="avakio-drp-demo-section"
      >
        <AvakioTemplate
          theme={theme as any}
          type="section"
          borderType="clean"
          content="Basic Usage"
        />
        <AvakioTemplate
          theme={theme as any}
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="The DateRangePicker displays a dropdown with two side-by-side calendars for selecting a date range. Click the trigger to open the picker."
        />
        <AvakioLayout
          theme={theme as any}
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioDateRangePicker
              key="basic-drp"
              value={basicRange}
              onChange={setBasicRange}
              allowSingleDay
              showTime={false}
            />,
            <div key="basic-result" className="avakio-drp-result">
              Selected range: <strong>{formatDisplay(basicRange)}</strong>
            </div>,
          ]}
        />
      </section>

      {/* Presets Section */}
      <section
        ref={(el) => { sectionRefs.current['presets'] = el; }}
        className="avakio-drp-demo-section"
      >
        <AvakioTemplate
          theme={theme as any}
          type="section"
          borderType="clean"
          content="Quick Presets"
        />
        <AvakioTemplate
          theme={theme as any}
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="Add quick selection presets using the presets prop. Each preset has a label and a range function that returns start/end dates."
        />
        <AvakioLayout
          theme={theme as any}
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioDateRangePicker
              key="preset-drp"
              value={presetRange}
              onChange={setPresetRange}
              presets={presets}
              allowSingleDay
              showTime={false}
            />,
            <div key="preset-result" className="avakio-drp-result">
              Reporting period: <strong>{formatDisplay(presetRange)}</strong>
            </div>,
            <div key="preset-note" className="avakio-drp-note">
              <strong>Available presets:</strong> Today, Last 7 days, Last 14 days, This Month, Q1 2025, Clear
            </div>,
          ]}
        />
      </section>

      {/* Time Section */}
      <section
        ref={(el) => { sectionRefs.current['time'] = el; }}
        className="avakio-drp-demo-section"
      >
        <AvakioTemplate
          theme={theme as any}
          type="section"
          borderType="clean"
          content="With Time Selection"
        />
        <AvakioTemplate
          theme={theme as any}
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="Enable time selection with showTime={true}. Each calendar will include hour and minute inputs for precise datetime ranges."
        />
        <AvakioLayout
          theme={theme as any}
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioDateRangePicker
              key="time-drp"
              value={timeRange}
              onChange={setTimeRange}
              allowSingleDay
              showTime
            />,
            <div key="time-result" className="avakio-drp-result">
              Schedule: <strong>{formatDisplay(timeRange, true)}</strong>
            </div>,
          ]}
        />
      </section>

      {/* Customization Section */}
      <section
        ref={(el) => { sectionRefs.current['customization'] = el; }}
        className="avakio-drp-demo-section"
      >
        <AvakioTemplate
          theme={theme as any}
          type="section"
          borderType="clean"
          content="Customization Options"
        />
        <AvakioTemplate
          theme={theme as any}
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="The DateRangePicker supports various configurations including single-day selection, time mode, and custom presets."
        />
        <AvakioLayout
          theme={theme as any}
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <div key="custom-demos" className="avakio-drp-custom-grid">
              <div className="avakio-drp-custom-item">
                <span className="avakio-drp-custom-label">Single Day Allowed</span>
                <AvakioDateRangePicker
                  value={{ start: null, end: null }}
                  onChange={() => {}}
                  allowSingleDay={true}
                  showTime={false}
                />
              </div>
              <div className="avakio-drp-custom-item">
                <span className="avakio-drp-custom-label">Multi-day Only</span>
                <AvakioDateRangePicker
                  value={{ start: null, end: null }}
                  onChange={() => {}}
                  allowSingleDay={false}
                  showTime={false}
                />
              </div>
              <div className="avakio-drp-custom-item">
                <span className="avakio-drp-custom-label">With Time & Presets</span>
                <AvakioDateRangePicker
                  value={{ start: null, end: null }}
                  onChange={() => {}}
                  presets={presets.slice(0, 3)}
                  allowSingleDay
                  showTime
                />
              </div>
            </div>,
          ]}
        />
      </section>

      {/* API Reference Section */}
      <section
        ref={(el) => { sectionRefs.current['api'] = el; }}
        className="avakio-drp-demo-section"
      >
        <AvakioTemplate
          theme={theme as any}
          type="section"
          borderType="clean"
          content="API Reference"
        />
        <AvakioTemplate
          theme={theme as any}
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="Component properties and usage examples."
        />
        <AvakioLayout
          theme={theme as any}
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <div key="api-table" className="avakio-drp-api-table">
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
                    <td><code>AvakioDateRange</code></td>
                    <td>required</td>
                    <td>Object with start and end date strings (ISO format)</td>
                  </tr>
                  <tr>
                    <td><code>onChange</code></td>
                    <td><code>(range: AvakioDateRange) =&gt; void</code></td>
                    <td>required</td>
                    <td>Callback when date range changes</td>
                  </tr>
                  <tr>
                    <td><code>presets</code></td>
                    <td><code>DateRangePreset[]</code></td>
                    <td>-</td>
                    <td>Array of quick selection presets</td>
                  </tr>
                  <tr>
                    <td><code>allowSingleDay</code></td>
                    <td><code>boolean</code></td>
                    <td><code>true</code></td>
                    <td>Allow selecting same start and end date</td>
                  </tr>
                  <tr>
                    <td><code>showTime</code></td>
                    <td><code>boolean</code></td>
                    <td><code>true</code></td>
                    <td>Enable time selection</td>
                  </tr>
                  <tr>
                    <td><code>className</code></td>
                    <td><code>string</code></td>
                    <td>-</td>
                    <td>Additional CSS classes</td>
                  </tr>
                </tbody>
              </table>
            </div>,
            <div key="types-code" className="avakio-drp-code">
              <pre>{`// Type definitions
interface AvakioDateRange {
  start: string | null;
  end: string | null;
}

interface DateRangePreset {
  label: string;
  range: () => AvakioDateRange;
}`}</pre>
            </div>,
            <div key="usage-code" className="avakio-drp-code">
              <pre>{`import { AvakioDateRangePicker, AvakioDateRange } from '../../components/avakio/ui-controls/avakio-daterangepicker';

function MyComponent() {
  const [range, setRange] = useState<AvakioDateRange>({ 
    start: null, 
    end: null 
  });

  const presets = [
    { label: 'Today', range: () => { /* return range */ } },
    { label: 'Last 7 days', range: () => { /* return range */ } },
  ];

  return (
    <AvakioDateRangePicker
      value={range}
      onChange={setRange}
      presets={presets}
      allowSingleDay
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

export default AvakioDateRangePickerExample;


















