// This file has been moved to src/examples/ui-controls/avakio-calendar-example.tsx
// Please import from: '../ui-controls/avakio-calendar-example'
export * from '../ui-controls/avakio-calendar-example';


export function AvakioCalendarExample() {
  const [theme, setTheme] = useState<string>('material');
  const [singleDate, setSingleDate] = useState<string>('');
  const [multipleDates, setMultipleDates] = useState<string[]>([]);
  const [rangeDate, setRangeDate] = useState<string[]>([]);

  // Helper to format dates in local timezone
  const formatLocalDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const now = new Date();
  const today = formatLocalDate(now);
  const tomorrow = formatLocalDate(new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1));
  const nextWeek = formatLocalDate(new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7));

  const markers: AvakioCalendarMarker[] = [
    { date: today, color: '#3b82f6', text: 'Today' },
    { date: tomorrow, color: '#10b981', text: 'Meeting' },
    { date: nextWeek, color: '#f59e0b', text: 'Deadline' },
  ];

  const disabledDates = [
    formatLocalDate(new Date(now.getFullYear(), now.getMonth(), now.getDate() + 2)),
    formatLocalDate(new Date(now.getFullYear(), now.getMonth(), now.getDate() + 3)),
  ];

  return (
    <div
      className="min-h-screen p-8"
      data-admin-theme={theme}
      style={{
        background: theme === 'dark' ? 'hsl(222, 47%, 11%)' : '#f8fafc',
        color: theme === 'dark' ? 'hsl(210, 40%, 96%)' : '#0f172a',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 28, fontWeight: 600 }}>Avakio Calendar</h2>
          <p style={{ margin: '8px 0 0 0', color: theme === 'dark' ? 'hsl(215, 20%, 65%)' : '#6b7280', fontSize: 14 }}>
            calendar with single/multiple/range selection modes
          </p>
        </div>
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          style={{
            padding: '8px 16px',
            borderRadius: 6,
            border: '1px solid #e5e7eb',
            background: 'white',
            fontSize: 14,
            cursor: 'pointer',
          }}
        >
          {['material', 'flat', 'compact', 'dark', 'ocean', 'sunset'].map((t) => (
            <option key={t} value={t}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Examples Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
        {/* Single Selection */}
        <div>
          <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 12 }}>Single Selection</h3>
          <p style={{ fontSize: 13, color: theme === 'dark' ? 'hsl(215, 20%, 65%)' : '#6b7280', marginBottom: 16 }}>
            Click a day to select it. Selected: <strong>{singleDate || 'None'}</strong>
          </p>
          <AvakioCalendar
            mode="single"
            value={singleDate}
            onChange={(val) => setSingleDate(val as string)}
            markers={markers}
          />
        </div>

        {/* Multiple Selection */}
        <div>
          <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 12 }}>Multiple Selection</h3>
          <p style={{ fontSize: 13, color: theme === 'dark' ? 'hsl(215, 20%, 65%)' : '#6b7280', marginBottom: 16 }}>
            Click days to select/deselect. Selected: <strong>{multipleDates.length} days</strong>
          </p>
          <AvakioCalendar
            mode="multiple"
            value={multipleDates}
            onChange={(val) => setMultipleDates(val as string[])}
            markers={markers}
          />
        </div>

        {/* Range Selection */}
        <div>
          <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 12 }}>Range Selection</h3>
          <p style={{ fontSize: 13, color: theme === 'dark' ? 'hsl(215, 20%, 65%)' : '#6b7280', marginBottom: 16 }}>
            Click start and end dates. Range:{' '}
            <strong>{rangeDate.length === 2 ? `${rangeDate[0]} to ${rangeDate[1]}` : 'None'}</strong>
          </p>
          <AvakioCalendar
            mode="range"
            value={rangeDate}
            onChange={(val) => setRangeDate(val as string[])}
            markers={markers}
          />
        </div>

        {/* With Disabled Dates */}
        <div>
          <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 12 }}>Disabled Dates</h3>
          <p style={{ fontSize: 13, color: theme === 'dark' ? 'hsl(215, 20%, 65%)' : '#6b7280', marginBottom: 16 }}>
            Some dates are disabled and cannot be selected
          </p>
          <AvakioCalendar
            mode="single"
            value={singleDate}
            onChange={(val) => setSingleDate(val as string)}
            disabledDates={disabledDates}
            markers={markers}
          />
        </div>

        {/* With Week Numbers */}
        <div>
          <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 12 }}>Week Numbers</h3>
          <p style={{ fontSize: 13, color: theme === 'dark' ? 'hsl(215, 20%, 65%)' : '#6b7280', marginBottom: 16 }}>
            Display ISO week numbers on the left
          </p>
          <AvakioCalendar
            mode="single"
            value={singleDate}
            onChange={(val) => setSingleDate(val as string)}
            showWeekNumbers={true}
            markers={markers}
          />
        </div>

        {/* Multiple Months */}
        <div style={{ gridColumn: '1 / -1' }}>
          <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 12 }}>Multiple Months (2 months)</h3>
          <p style={{ fontSize: 13, color: theme === 'dark' ? 'hsl(215, 20%, 65%)' : '#6b7280', marginBottom: 16 }}>
            Display multiple months side by side for easier range selection
          </p>
          <AvakioCalendar
            mode="range"
            value={rangeDate}
            onChange={(val) => setRangeDate(val as string[])}
            monthsToShow={2}
            markers={markers}
          />
        </div>
      </div>

      {/* Feature List */}
      <div
        style={{
          marginTop: 48,
          padding: 24,
          background: theme === 'dark' ? 'hsl(222, 47%, 15%)' : 'white',
          borderRadius: 8,
          border: theme === 'dark' ? '1px solid hsl(222, 47%, 25%)' : '1px solid #e5e7eb',
        }}
      >
        <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>Features</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 12 }}>
          <div>
            <h4 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Selection Modes</h4>
            <ul style={{ fontSize: 13, lineHeight: 1.8, paddingLeft: 20, margin: 0 }}>
              <li>Single date selection</li>
              <li>Multiple dates selection</li>
              <li>Date range selection</li>
            </ul>
          </div>
          <div>
            <h4 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Date Controls</h4>
            <ul style={{ fontSize: 13, lineHeight: 1.8, paddingLeft: 20, margin: 0 }}>
              <li>Min/Max date limits</li>
              <li>Disabled specific dates</li>
              <li>Today button navigation</li>
            </ul>
          </div>
          <div>
            <h4 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Display Options</h4>
            <ul style={{ fontSize: 13, lineHeight: 1.8, paddingLeft: 20, margin: 0 }}>
              <li>Week numbers (ISO)</li>
              <li>Multiple months (1-3)</li>
              <li>Event markers/indicators</li>
            </ul>
          </div>
          <div>
            <h4 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Themes</h4>
            <ul style={{ fontSize: 13, lineHeight: 1.8, paddingLeft: 20, margin: 0 }}>
              <li>Material, Flat, Compact</li>
              <li>Dark mode support</li>
              <li>Ocean & Sunset themes</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Usage Example */}
      <div
        style={{
          marginTop: 24,
          padding: 24,
          background: theme === 'dark' ? '#0f1419' : '#1e293b',
          color: '#e2e8f0',
          borderRadius: 8,
          fontSize: 13,
          fontFamily: 'monospace',
          overflow: 'auto',
        }}
      >
        <div style={{ marginBottom: 12, color: '#94a3b8' }}>// Usage Example</div>
        <pre style={{ margin: 0, lineHeight: 1.6 }}>
          {`import { AvakioCalendar } from './avakio-calendar';

const [selectedDate, setSelectedDate] = useState('');

<AvakioCalendar
  mode="single"
  value={selectedDate}
  onChange={setSelectedDate}
  markers={[
    { date: '2025-01-15', color: '#3b82f6', text: 'Meeting' }
  ]}
  showWeekNumbers={true}
  monthsToShow={1}
/>`}
        </pre>
      </div>
    </div>
  );
}

export default AvakioCalendarExample;
