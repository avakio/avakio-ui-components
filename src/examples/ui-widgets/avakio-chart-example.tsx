import React, { useState, useEffect, useRef } from 'react';
import { AvakioChart, AvakioChartSeries, AvakioChartRef } from '../../components/avakio/ui-widgets/avakio-chart';
import './avakio-chart-example.css';
import { 
  BarChart3, 
  LineChart, 
  PieChart, 
  ScatterChart as ScatterChartIcon, 
  Activity, 
  Code, 
  Palette,
  TrendingUp,
  Target,
  Layers
} from 'lucide-react';
import { AvakioViewHeader } from '../../components/avakio/ui-widgets/avakio-view-header/avakio-view-header';
import { AvakioTemplate } from '../../components/avakio/views/avakio-template/avakio-template';
import { AvakioLayout } from '../../components/avakio/layouts/avakio-layout/avakio-layout';
import { AvakioTabBar } from '../../components/avakio/ui-controls/avakio-tabbar/avakio-tabbar';
import { AvakioButton } from '../../components/avakio/ui-controls/avakio-button/avakio-button';

// Tab options for navigation
const TAB_OPTIONS = [
  { id: 'line', label: 'Line Charts', icon: <LineChart size={14} /> },
  { id: 'bar', label: 'Bar Charts', icon: <BarChart3 size={14} /> },
  { id: 'pie', label: 'Pie & Donut', icon: <PieChart size={14} /> },
  { id: 'area', label: 'Area Charts', icon: <Activity size={14} /> },
  { id: 'other', label: 'Other Types', icon: <Target size={14} /> },
  { id: 'api', label: 'API Reference', icon: <Code size={14} /> },
];

// Sample data: Monthly sales
const monthlySalesData: AvakioChartSeries[] = [
  {
    name: 'Sales 2024',
    data: [
      { x: 'Jan', y: 120 },
      { x: 'Feb', y: 150 },
      { x: 'Mar', y: 180 },
      { x: 'Apr', y: 220 },
      { x: 'May', y: 190 },
      { x: 'Jun', y: 250 },
      { x: 'Jul', y: 280 },
      { x: 'Aug', y: 310 },
      { x: 'Sep', y: 290 },
      { x: 'Oct', y: 340 },
      { x: 'Nov', y: 380 },
      { x: 'Dec', y: 420 },
    ],
    color: '#4285F4',
  },
];

// Sample data: Multiple series comparison
const comparisonData: AvakioChartSeries[] = [
  {
    name: '2023',
    data: [
      { x: 'Q1', y: 100 },
      { x: 'Q2', y: 150 },
      { x: 'Q3', y: 200 },
      { x: 'Q4', y: 180 },
    ],
    color: '#EA4335',
  },
  {
    name: '2024',
    data: [
      { x: 'Q1', y: 130 },
      { x: 'Q2', y: 190 },
      { x: 'Q3', y: 240 },
      { x: 'Q4', y: 280 },
    ],
    color: '#34A853',
  },
  {
    name: '2025 (projected)',
    data: [
      { x: 'Q1', y: 160 },
      { x: 'Q2', y: 220 },
      { x: 'Q3', y: 290 },
      { x: 'Q4', y: 350 },
    ],
    color: '#4285F4',
  },
];

// Sample data: Bar chart
const departmentData: AvakioChartSeries[] = [
  {
    name: 'Revenue',
    data: [
      { x: 'Engineering', y: 450 },
      { x: 'Sales', y: 380 },
      { x: 'Marketing', y: 280 },
      { x: 'HR', y: 120 },
      { x: 'Finance', y: 200 },
    ],
    color: '#4285F4',
  },
];

// Sample data: Stacked bar
const stackedBarData: AvakioChartSeries[] = [
  {
    name: 'Desktop',
    data: [
      { x: 'Jan', y: 40 },
      { x: 'Feb', y: 45 },
      { x: 'Mar', y: 50 },
      { x: 'Apr', y: 48 },
      { x: 'May', y: 55 },
      { x: 'Jun', y: 60 },
    ],
    color: '#4285F4',
  },
  {
    name: 'Mobile',
    data: [
      { x: 'Jan', y: 30 },
      { x: 'Feb', y: 35 },
      { x: 'Mar', y: 42 },
      { x: 'Apr', y: 50 },
      { x: 'May', y: 55 },
      { x: 'Jun', y: 62 },
    ],
    color: '#34A853',
  },
  {
    name: 'Tablet',
    data: [
      { x: 'Jan', y: 15 },
      { x: 'Feb', y: 18 },
      { x: 'Mar', y: 20 },
      { x: 'Apr', y: 22 },
      { x: 'May', y: 25 },
      { x: 'Jun', y: 28 },
    ],
    color: '#FBBC05',
  },
];

// Sample data: Pie chart
const marketShareData: AvakioChartSeries[] = [
  {
    name: 'Market Share',
    data: [
      { label: 'Chrome', y: 65 },
      { label: 'Firefox', y: 12 },
      { label: 'Safari', y: 15 },
      { label: 'Edge', y: 5 },
      { label: 'Other', y: 3 },
    ],
  },
];

// Sample data: Donut chart
const budgetData: AvakioChartSeries[] = [
  {
    name: 'Budget Allocation',
    data: [
      { label: 'Development', y: 35 },
      { label: 'Marketing', y: 25 },
      { label: 'Operations', y: 20 },
      { label: 'Research', y: 12 },
      { label: 'Admin', y: 8 },
    ],
  },
];

// Sample data: Area chart
const visitorData: AvakioChartSeries[] = [
  {
    name: 'Visitors',
    data: [
      { x: 'Mon', y: 1200 },
      { x: 'Tue', y: 1400 },
      { x: 'Wed', y: 1800 },
      { x: 'Thu', y: 1600 },
      { x: 'Fri', y: 2200 },
      { x: 'Sat', y: 2800 },
      { x: 'Sun', y: 2400 },
    ],
    color: '#8E24AA',
    fillOpacity: 0.3,
  },
];

// Sample data: Scatter chart
const scatterData: AvakioChartSeries[] = [
  {
    name: 'Group A',
    data: [
      { x: 10, y: 30 },
      { x: 20, y: 45 },
      { x: 30, y: 55 },
      { x: 40, y: 70 },
      { x: 50, y: 85 },
      { x: 60, y: 78 },
      { x: 70, y: 95 },
    ],
    color: '#4285F4',
    markerSize: 8,
  },
  {
    name: 'Group B',
    data: [
      { x: 15, y: 25 },
      { x: 25, y: 40 },
      { x: 35, y: 35 },
      { x: 45, y: 60 },
      { x: 55, y: 55 },
      { x: 65, y: 80 },
      { x: 75, y: 70 },
    ],
    color: '#EA4335',
    markerSize: 8,
  },
];

// Sample data: Radar chart
const skillsData: AvakioChartSeries[] = [
  {
    name: 'Developer A',
    data: [
      { label: 'JavaScript', y: 90 },
      { label: 'TypeScript', y: 85 },
      { label: 'React', y: 88 },
      { label: 'Node.js', y: 75 },
      { label: 'CSS', y: 70 },
      { label: 'Testing', y: 65 },
    ],
    color: '#4285F4',
  },
  {
    name: 'Developer B',
    data: [
      { label: 'JavaScript', y: 75 },
      { label: 'TypeScript', y: 90 },
      { label: 'React', y: 70 },
      { label: 'Node.js', y: 85 },
      { label: 'CSS', y: 80 },
      { label: 'Testing', y: 88 },
    ],
    color: '#34A853',
  },
];

export function AvakioChartExample() {
  
  const [activeSection, setActiveSection] = useState<string | number | null>('line');

  // Refs for chart instances
  const lineChartRef = useRef<AvakioChartRef>(null);
  const barChartRef = useRef<AvakioChartRef>(null);

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

  // Sync with global theme
  

  return (
    <div className="avakio-chart-demo-container">
      {/* Sticky Header + Tab Navigation */}
      <div className="avakio-example-sticky-header">
        <AvakioViewHeader
          label="UI Widgets"
          title="Chart Component"
          subTitle="A comprehensive charting library for data visualization. Supports line, bar, pie, donut, area, scatter, and radar charts with themes, legends, tooltips, and animations."
          isSticky={false}
        />

        <div className="avakio-example-tabbar-container">
          <AvakioTabBar
            id="chart-demo-tabs"
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

      {/* Line Charts Section */}
      <section
        ref={(el) => { sectionRefs.current['line'] = el; }}
        className="avakio-chart-demo-section"
      >
        <AvakioTemplate
          type="section"
          borderType="clean"
          content="Line Charts"
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="Line charts are great for showing trends over time. Use spline for smooth curves."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <div key="line-chart-basic" className="avakio-chart-demo-wrapper">
              <h4 className="avakio-chart-demo-title">Basic Line Chart</h4>
              <AvakioChart
                ref={lineChartRef}
                type="line"
                series={monthlySalesData}
                title="Monthly Sales"
                subtitle="Revenue in thousands"
                xAxis={{ title: 'Month' }}
                yAxis={{ title: 'Sales ($K)', showGrid: true }}
                legend={{ show: true, position: 'bottom' }}
                tooltip={{ show: true }}
                height={320}
                animate
              />
            </div>,
            <div key="spline-chart" className="avakio-chart-demo-wrapper">
              <h4 className="avakio-chart-demo-title">Spline Chart (Multiple Series)</h4>
              <AvakioChart
                type="spline"
                series={comparisonData}
                title="Quarterly Performance Comparison"
                xAxis={{ title: 'Quarter' }}
                yAxis={{ title: 'Revenue ($K)' }}
                legend={{ show: true, position: 'bottom', toggle: true }}
                tooltip={{ 
                  show: true,
                  format: (point, series) => `${series.name}: $${point.y}K`
                }}
                height={320}
                animate
              />
            </div>,
          ]}
        />
      </section>

      {/* Bar Charts Section */}
      <section
        ref={(el) => { sectionRefs.current['bar'] = el; }}
        className="avakio-chart-demo-section"
      >
        <AvakioTemplate
          type="section"
          borderType="clean"
          content="Bar Charts"
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="Bar charts excel at comparing discrete categories. Supports grouped and stacked variants."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <div key="bar-chart-basic" className="avakio-chart-demo-wrapper">
              <h4 className="avakio-chart-demo-title">Basic Bar Chart</h4>
              <AvakioChart
                ref={barChartRef}
                type="bar"
                series={departmentData}
                title="Revenue by Department"
                xAxis={{ title: 'Department' }}
                yAxis={{ title: 'Revenue ($K)' }}
                legend={{ show: false }}
                gradient
                borderRadius={6}
                barWidth={40}
                height={320}
                animate
              />
            </div>,
            <div key="bar-chart-grouped" className="avakio-chart-demo-wrapper">
              <h4 className="avakio-chart-demo-title">Grouped Bar Chart</h4>
              <AvakioChart
                type="bar"
                series={comparisonData}
                title="Year-over-Year Comparison"
                xAxis={{ title: 'Quarter' }}
                yAxis={{ title: 'Revenue ($K)' }}
                legend={{ show: true, position: 'bottom' }}
                barWidth={20}
                borderRadius={4}
                height={320}
                animate
              />
            </div>,
            <div key="bar-chart-stacked" className="avakio-chart-demo-wrapper">
              <h4 className="avakio-chart-demo-title">Stacked Bar Chart</h4>
              <AvakioChart
                type="stackedBar"
                series={stackedBarData}
                title="Traffic by Device Type"
                xAxis={{ title: 'Month' }}
                yAxis={{ title: 'Visits (K)' }}
                legend={{ show: true, position: 'bottom' }}
                stacked
                barWidth={36}
                borderRadius={4}
                height={320}
                animate
              />
            </div>,
          ]}
        />
      </section>

      {/* Pie & Donut Section */}
      <section
        ref={(el) => { sectionRefs.current['pie'] = el; }}
        className="avakio-chart-demo-section"
      >
        <AvakioTemplate
          type="section"
          borderType="clean"
          content="Pie & Donut Charts"
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="Perfect for showing proportions and part-to-whole relationships."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <div key="pie-charts" className="avakio-chart-demo-grid">
              <div className="avakio-chart-demo-wrapper">
                <h4 className="avakio-chart-demo-title">Pie Chart</h4>
                <AvakioChart
                  type="pie"
                  series={marketShareData}
                  title="Browser Market Share"
                  legend={{ show: true, position: 'right' }}
                  pieLabels
                  gradient
                  height={300}
                  animate
                  tooltip={{
                    show: true,
                    format: (point) => `${point.label}: ${point.y}%`
                  }}
                />
              </div>
              <div className="avakio-chart-demo-wrapper">
                <h4 className="avakio-chart-demo-title">Donut Chart</h4>
                <AvakioChart
                  type="donut"
                  series={budgetData}
                  title="Budget Allocation"
                  legend={{ show: true, position: 'right' }}
                  donutInnerRadius={0.6}
                  donutInnerText="Budget"
                  pieLabels
                  height={300}
                  animate
                  tooltip={{
                    show: true,
                    format: (point) => `${point.label}: ${point.y}%`
                  }}
                />
              </div>
            </div>,
          ]}
        />
      </section>

      {/* Area Charts Section */}
      <section
        ref={(el) => { sectionRefs.current['area'] = el; }}
        className="avakio-chart-demo-section"
      >
        <AvakioTemplate
          type="section"
          borderType="clean"
          content="Area Charts"
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="Area charts emphasize the magnitude of change over time. Great for showing cumulative totals."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <div key="area-chart-basic" className="avakio-chart-demo-wrapper">
              <h4 className="avakio-chart-demo-title">Area Chart with Gradient</h4>
              <AvakioChart
                type="area"
                series={visitorData}
                title="Weekly Website Visitors"
                xAxis={{ title: 'Day' }}
                yAxis={{ title: 'Visitors' }}
                legend={{ show: false }}
                gradient
                height={300}
                animate
              />
            </div>,
            <div key="area-chart-spline" className="avakio-chart-demo-wrapper">
              <h4 className="avakio-chart-demo-title">Spline Area (Multiple Series)</h4>
              <AvakioChart
                type="splineArea"
                series={[
                  {
                    name: 'Organic',
                    data: [
                      { x: 'Mon', y: 800 },
                      { x: 'Tue', y: 950 },
                      { x: 'Wed', y: 1100 },
                      { x: 'Thu', y: 1000 },
                      { x: 'Fri', y: 1400 },
                      { x: 'Sat', y: 1800 },
                      { x: 'Sun', y: 1500 },
                    ],
                    color: '#34A853',
                    fillOpacity: 0.4,
                  },
                  {
                    name: 'Paid',
                    data: [
                      { x: 'Mon', y: 400 },
                      { x: 'Tue', y: 450 },
                      { x: 'Wed', y: 700 },
                      { x: 'Thu', y: 600 },
                      { x: 'Fri', y: 800 },
                      { x: 'Sat', y: 1000 },
                      { x: 'Sun', y: 900 },
                    ],
                    color: '#4285F4',
                    fillOpacity: 0.4,
                  },
                ]}
                title="Traffic Sources"
                xAxis={{ title: 'Day' }}
                yAxis={{ title: 'Visitors' }}
                legend={{ show: true, position: 'bottom' }}
                height={300}
                animate
              />
            </div>,
          ]}
        />
      </section>

      {/* Other Chart Types Section */}
      <section
        ref={(el) => { sectionRefs.current['other'] = el; }}
        className="avakio-chart-demo-section"
      >
        <AvakioTemplate
          type="section"
          borderType="clean"
          content="Scatter & Radar Charts"
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="Specialized chart types for correlation analysis and multi-variable comparison."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <div key="other-charts" className="avakio-chart-demo-grid">
              <div className="avakio-chart-demo-wrapper">
                <h4 className="avakio-chart-demo-title">Scatter Plot</h4>
                <AvakioChart
                  type="scatter"
                  series={scatterData}
                  title="Correlation Analysis"
                  xAxis={{ title: 'Variable X' }}
                  yAxis={{ title: 'Variable Y' }}
                  legend={{ show: true, position: 'bottom' }}
                  height={300}
                  animate
                />
              </div>
              <div className="avakio-chart-demo-wrapper">
                <h4 className="avakio-chart-demo-title">Radar Chart</h4>
                <AvakioChart
                  type="radar"
                  series={skillsData}
                  title="Skills Comparison"
                  legend={{ show: true, position: 'bottom' }}
                  height={340}
                  animate
                />
              </div>
            </div>,
          ]}
        />
      </section>

      {/* API Reference Section */}
      <section
        ref={(el) => { sectionRefs.current['api'] = el; }}
        className="avakio-chart-demo-section"
      >
        <AvakioTemplate
          type="section"
          borderType="clean"
          content="API Reference"
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <div key="api-content" className="avakio-chart-api-reference">
              <div className="api-section">
                <h4>Chart Types</h4>
                <table className="api-table">
                  <thead>
                    <tr>
                      <th>Type</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td><code>line</code></td><td>Standard line chart</td></tr>
                    <tr><td><code>spline</code></td><td>Smooth curved line chart</td></tr>
                    <tr><td><code>area</code></td><td>Line chart with filled area</td></tr>
                    <tr><td><code>splineArea</code></td><td>Smooth curved area chart</td></tr>
                    <tr><td><code>bar</code></td><td>Vertical bar chart</td></tr>
                    <tr><td><code>stackedBar</code></td><td>Stacked vertical bars</td></tr>
                    <tr><td><code>pie</code></td><td>Pie chart</td></tr>
                    <tr><td><code>donut</code></td><td>Donut chart (pie with hole)</td></tr>
                    <tr><td><code>scatter</code></td><td>Scatter plot</td></tr>
                    <tr><td><code>radar</code></td><td>Radar/Spider chart</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="api-section">
                <h4>Component Props</h4>
                <table className="api-table">
                  <thead>
                    <tr>
                      <th>Property</th>
                      <th>Type</th>
                      <th>Default</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td><code>type</code></td><td>AvakioChartType</td><td>'line'</td><td>Chart type</td></tr>
                    <tr><td><code>series</code></td><td>AvakioChartSeries[]</td><td>required</td><td>Data series array</td></tr>
                    <tr><td><code>title</code></td><td>string</td><td>-</td><td>Chart title</td></tr>
                    <tr><td><code>subtitle</code></td><td>string</td><td>-</td><td>Chart subtitle</td></tr>
                    <tr><td><code>xAxis</code></td><td>AvakioChartAxis</td><td>{'{}'}</td><td>X-axis configuration</td></tr>
                    <tr><td><code>yAxis</code></td><td>AvakioChartAxis</td><td>{'{}'}</td><td>Y-axis configuration</td></tr>
                    <tr><td><code>legend</code></td><td>AvakioChartLegend</td><td>{'{ show: true }'}</td><td>Legend configuration</td></tr>
                    <tr><td><code>tooltip</code></td><td>AvakioChartTooltip</td><td>{'{ show: true }'}</td><td>Tooltip configuration</td></tr>
                    <tr><td><code>theme</code></td><td>AvakioChartTheme</td><td>'material'</td><td>Visual theme</td></tr>
                    <tr><td><code>height</code></td><td>number | string</td><td>400</td><td>Chart height</td></tr>
                    <tr><td><code>animate</code></td><td>boolean</td><td>true</td><td>Enable animations</td></tr>
                    <tr><td><code>gradient</code></td><td>boolean</td><td>false</td><td>Enable gradient fills</td></tr>
                    <tr><td><code>colors</code></td><td>string[]</td><td>[palette]</td><td>Custom color palette</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="api-section">
                <h4>Series Properties</h4>
                <table className="api-table">
                  <thead>
                    <tr>
                      <th>Property</th>
                      <th>Type</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td><code>name</code></td><td>string</td><td>Series name (shown in legend)</td></tr>
                    <tr><td><code>data</code></td><td>AvakioChartDataPoint[]</td><td>Array of data points</td></tr>
                    <tr><td><code>color</code></td><td>string</td><td>Series color</td></tr>
                    <tr><td><code>lineWidth</code></td><td>number</td><td>Line thickness (line/area)</td></tr>
                    <tr><td><code>fillOpacity</code></td><td>number</td><td>Area fill opacity</td></tr>
                    <tr><td><code>showMarkers</code></td><td>boolean</td><td>Show data point markers</td></tr>
                    <tr><td><code>showLabels</code></td><td>boolean</td><td>Show data labels</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="api-section">
                <h4>Imperative API (via ref)</h4>
                <table className="api-table">
                  <thead>
                    <tr>
                      <th>Method</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td><code>showSeries(id)</code></td><td>Show a hidden series</td></tr>
                    <tr><td><code>hideSeries(id)</code></td><td>Hide a series</td></tr>
                    <tr><td><code>toggleSeries(id)</code></td><td>Toggle series visibility</td></tr>
                    <tr><td><code>getVisibleSeries()</code></td><td>Get array of visible series IDs</td></tr>
                    <tr><td><code>exportImage(format?)</code></td><td>Export chart as base64 image</td></tr>
                    <tr><td><code>refresh()</code></td><td>Refresh the chart</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="api-section">
                <h4>Events</h4>
                <table className="api-table">
                  <thead>
                    <tr>
                      <th>Event</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td><code>onClick</code></td><td>Fired when a data point is clicked</td></tr>
                    <tr><td><code>onHover</code></td><td>Fired when hovering over data points</td></tr>
                    <tr><td><code>onLegendClick</code></td><td>Fired when legend item is clicked</td></tr>
                  </tbody>
                </table>
              </div>
            </div>,
          ]}
        />
      </section>
    </div>
  );
}

export default AvakioChartExample;





















