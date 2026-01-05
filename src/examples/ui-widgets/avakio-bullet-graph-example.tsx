import React, { useState, useEffect, useRef } from "react";
import "./avakio-bullet-graph-example.css";
import { AvakioBulletGraph, AvakioBulletGraphBand } from "../../components/avakio/ui-widgets/avakio-bullet-graph/avakio-bullet-graph";
import { AvakioViewHeader } from "../../components/avakio/ui-widgets/avakio-view-header/avakio-view-header";
import { AvakioTabBar } from "../../components/avakio/ui-controls/avakio-tabbar/avakio-tabbar";
import { AvakioTemplate } from "../../components/avakio/views/avakio-template/avakio-template";
import { AvakioLayout } from "../../components/avakio/layouts/avakio-layout/avakio-layout";
import { BarChart3, Target, Palette, Settings, FileText, Activity } from "lucide-react";

// Default performance bands
const DEFAULT_BANDS: AvakioBulletGraphBand[] = [
  { value: 100, color: '#b4e5fb' },
  { value: 80, color: '#55c2f3' },
  { value: 60, color: '#1997dc' },
];

// Custom bands for different scenarios
const SALES_BANDS: AvakioBulletGraphBand[] = [
  { value: 120, color: '#dcfce7' },
  { value: 100, color: '#86efac' },
  { value: 80, color: '#22c55e' },
];

const PERFORMANCE_BANDS: AvakioBulletGraphBand[] = [
  { value: 100, color: '#fee2e2' },
  { value: 75, color: '#fef08a' },
  { value: 50, color: '#bbf7d0' },
];

// Tab options for navigation
const TAB_OPTIONS = [
  { id: 'basic', label: 'Basic Usage', icon: <BarChart3 size={14} /> },
  { id: 'markers', label: 'Target Markers', icon: <Target size={14} /> },
  { id: 'bands', label: 'Custom Bands', icon: <Palette size={14} /> },
  { id: 'dynamic', label: 'Dynamic Color', icon: <Activity size={14} /> },
  { id: 'features', label: 'Features', icon: <Settings size={14} /> },
  { id: 'docs', label: 'Documentation', icon: <FileText size={14} /> },
];

export function AvakioBulletGraphExample() {
  
  const [activeSection, setActiveSection] = useState<string | number | null>('basic');
  
  // Basic usage values
  const [salesValue, setSalesValue] = useState(85);
  const [progressValue, setProgressValue] = useState(65);
  
  // Animated value for demo
  const [animatedValue, setAnimatedValue] = useState(40);

  // Section refs for scroll navigation
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

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
  

  // Animate value periodically for demo
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedValue(prev => {
        const newVal = prev + (Math.random() * 20 - 10);
        return Math.max(0, Math.min(100, newVal));
      });
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);

  // Dynamic color function
  const getDynamicColor = (value: number) => {
    if (value < 30) return '#ef4444';
    if (value < 60) return '#f59e0b';
    return '#22c55e';
  };

  return (
    <div className="avakio-bullet-graph-demo-container">
      {/* Sticky Header + Tab Navigation */}
      <div className="avakio-bullet-graph-sticky-header">
        {/* Header */}
        <AvakioViewHeader
          label="UI Widgets"
          title="Bullet Graph Component"
          subTitle="A compact data visualization widget for comparing values against targets and qualitative ranges. Supports animation, custom bands, and dynamic colors."
          isSticky={false}
        />

        {/* Tab Navigation */}
        <div className="avakio-bullet-graph-tabbar-container">
          <AvakioTabBar
            id="bullet-graph-demo-tabs"
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
        className="avakio-bullet-graph-demo-section"
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
          content="A horizontal bullet graph showing a value against performance bands. The colored background represents qualitative ranges (poor, satisfactory, good)."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioBulletGraph
              key="basic-1"
              value={75}
              minRange={0}
              maxRange={100}
              bands={DEFAULT_BANDS}
              label="Q1 Revenue"
              placeholder="75% of target"
              scale={{ step: 20, template: "#value#%" }}
            />,
            <div key="spacer-1" style={{ height: 24 }} />,
            <AvakioBulletGraph
              key="basic-2"
              value={92}
              minRange={0}
              maxRange={100}
              bands={DEFAULT_BANDS}
              label="Q2 Revenue"
              placeholder="92% of target"
              scale={{ step: 20, template: "#value#%" }}
            />,
            <div key="spacer-2" style={{ height: 24 }} />,
            <AvakioBulletGraph
              key="basic-3"
              value={58}
              minRange={0}
              maxRange={100}
              bands={DEFAULT_BANDS}
              label="Q3 Revenue"
              placeholder="58% of target"
              scale={{ step: 20, template: "#value#%" }}
            />,
          ]}
        />
      </section>

      {/* Target Markers Section */}
      <section 
        ref={(el) => { sectionRefs.current['markers'] = el; }}
        className="avakio-bullet-graph-demo-section"
      >
        <AvakioTemplate
          type="section"
          borderType="clean"
          content="Target Markers"
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="Add a vertical marker line to indicate a target value. The marker helps compare the current value against the expected goal."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioBulletGraph
              key="marker-1"
              value={salesValue}
              minRange={0}
              maxRange={120}
              marker={100}
              bands={SALES_BANDS}
              label="Sales YTD"
              placeholder={`${salesValue}% (Target: 100%)`}
              scale={{ step: 20, template: "#value#%" }}
            />,
            <div key="spacer-1" style={{ height: 24 }} />,
            <AvakioBulletGraph
              key="marker-2"
              value={70}
              minRange={0}
              maxRange={100}
              marker={85}
              markerColor="#dc2626"
              bands={PERFORMANCE_BANDS}
              label="Task Completion"
              placeholder="70% done (Goal: 85%)"
              scale={{ step: 25, template: "#value#%" }}
            />,
            <div key="controls" className="avakio-bullet-graph-value-controls">
              <label>Adjust Sales Value: </label>
              <input
                type="range"
                min={0}
                max={120}
                value={salesValue}
                onChange={(e) => setSalesValue(Number(e.target.value))}
              />
              <span>{salesValue}%</span>
            </div>,
          ]}
        />
      </section>

      {/* Custom Bands Section */}
      <section 
        ref={(el) => { sectionRefs.current['bands'] = el; }}
        className="avakio-bullet-graph-demo-section"
      >
        <AvakioTemplate
          type="section"
          borderType="clean"
          content="Custom Bands"
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="Define custom performance bands with different colors and value thresholds to match your data visualization needs."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioBulletGraph
              key="bands-1"
              value={45}
              minRange={0}
              maxRange={100}
              marker={60}
              bands={[
                { value: 100, color: '#fecaca' },
                { value: 70, color: '#fde68a' },
                { value: 40, color: '#bbf7d0' },
              ]}
              label="Risk Level"
              placeholder="Low Risk Zone"
              scale={{ step: 20 }}
            />,
            <div key="spacer-1" style={{ height: 24 }} />,
            <AvakioBulletGraph
              key="bands-2"
              value={85}
              minRange={0}
              maxRange={100}
              marker={75}
              bands={[
                { value: 100, color: '#dbeafe' },
                { value: 80, color: '#93c5fd' },
                { value: 60, color: '#3b82f6' },
              ]}
              label="Customer Satisfaction"
              placeholder="Excellent"
              scale={{ step: 25 }}
            />,
            <div key="spacer-2" style={{ height: 24 }} />,
            <AvakioBulletGraph
              key="bands-3"
              value={35}
              minRange={0}
              maxRange={100}
              bands={[
                { value: 100, color: '#e9d5ff' },
                { value: 66, color: '#c084fc' },
                { value: 33, color: '#a855f7' },
              ]}
              label="Storage Used"
              placeholder="35% used"
              scale={{ step: 25 }}
            />,
          ]}
        />
      </section>

      {/* Dynamic Color Section */}
      <section 
        ref={(el) => { sectionRefs.current['dynamic'] = el; }}
        className="avakio-bullet-graph-demo-section"
      >
        <AvakioTemplate
          type="section"
          borderType="clean"
          content="Dynamic Color"
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="The bar color can change dynamically based on the current value. Pass a function to the color prop to implement custom logic."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioBulletGraph
              key="dynamic-1"
              value={animatedValue}
              minRange={0}
              maxRange={100}
              color={getDynamicColor}
              bands={[
                { value: 100, color: '#f3f4f6' },
                { value: 60, color: '#e5e7eb' },
                { value: 30, color: '#d1d5db' },
              ]}
              label="System Health"
              placeholder={`${Math.round(animatedValue)}% (Live)`}
              scale={{ step: 20 }}
              stroke={12}
              flowTime={500}
            />,
            <div key="spacer-1" style={{ height: 24 }} />,
            <AvakioBulletGraph
              key="dynamic-2"
              value={progressValue}
              minRange={0}
              maxRange={100}
              color={(v) => v >= 70 ? '#22c55e' : v >= 40 ? '#f59e0b' : '#ef4444'}
              bands={[
                { value: 100, color: '#f0fdf4' },
                { value: 70, color: '#fefce8' },
                { value: 40, color: '#fef2f2' },
              ]}
              label="Project Progress"
              placeholder={`${progressValue}%`}
              marker={80}
              scale={{ step: 20 }}
            />,
            <div key="controls" className="avakio-bullet-graph-value-controls">
              <label>Adjust Progress: </label>
              <input
                type="range"
                min={0}
                max={100}
                value={progressValue}
                onChange={(e) => setProgressValue(Number(e.target.value))}
              />
              <span>{progressValue}%</span>
            </div>,
          ]}
        />
      </section>

      {/* Features Section */}
      <section 
        ref={(el) => { sectionRefs.current['features'] = el; }}
        className="avakio-bullet-graph-demo-section"
      >
        <AvakioTemplate
          type="section"
          borderType="clean"
          content="Bar Width & Scale"
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="Customize the bar width (stroke) and scale appearance. The scale can have custom step intervals and label templates."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioBulletGraph
              key="stroke-1"
              value={72}
              minRange={0}
              maxRange={100}
              stroke={4}
              bands={DEFAULT_BANDS}
              label="Thin Bar (4px)"
              scale={{ step: 25 }}
            />,
            <div key="spacer-1" style={{ height: 24 }} />,
            <AvakioBulletGraph
              key="stroke-2"
              value={72}
              minRange={0}
              maxRange={100}
              stroke={16}
              bands={DEFAULT_BANDS}
              label="Thick Bar (16px)"
              scale={{ step: 25 }}
            />,
            <div key="spacer-2" style={{ height: 24 }} />,
            <AvakioBulletGraph
              key="scale-1"
              value={450}
              minRange={0}
              maxRange={1000}
              marker={750}
              bands={[
                { value: 1000, color: '#dcfce7' },
                { value: 750, color: '#86efac' },
                { value: 500, color: '#22c55e' },
              ]}
              label="Revenue ($)"
              placeholder="$450K"
              scale={{ step: 200, template: "$#value#K" }}
              tickSize={6}
            />,
          ]}
        />
        <AvakioTemplate
          type="section"
          borderType="clean"
          content="Without Label or Scale"
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioBulletGraph
              key="no-label"
              value={65}
              minRange={0}
              maxRange={100}
              bands={DEFAULT_BANDS}
              showLabel={false}
              scale={{ step: 25 }}
            />,
            <div key="spacer-1" style={{ height: 24 }} />,
            <AvakioBulletGraph
              key="no-scale"
              value={80}
              minRange={0}
              maxRange={100}
              bands={DEFAULT_BANDS}
              label="No Scale"
              showScale={false}
            />,
            <div key="spacer-2" style={{ height: 24 }} />,
            <AvakioBulletGraph
              key="minimal"
              value={55}
              minRange={0}
              maxRange={100}
              bands={DEFAULT_BANDS}
              showLabel={false}
              showScale={false}
              marker={70}
            />,
          ]}
        />
      </section>

      {/* Documentation Section */}
      <section 
        ref={(el) => { sectionRefs.current['docs'] = el; }}
        className="avakio-bullet-graph-demo-section"
        data-section="docs"
      >
        <AvakioTemplate
          type="section"
          borderType="clean"
          content="Props Reference"
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <div key="props-table" className="avakio-bullet-graph-props-table">
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
                    <td><code>number</code></td>
                    <td>-</td>
                    <td>Current value to display</td>
                  </tr>
                  <tr>
                    <td><code>minRange</code></td>
                    <td><code>number</code></td>
                    <td><code>0</code></td>
                    <td>Minimum range value</td>
                  </tr>
                  <tr>
                    <td><code>maxRange</code></td>
                    <td><code>number</code></td>
                    <td><code>100</code></td>
                    <td>Maximum range value</td>
                  </tr>
                  <tr>
                    <td><code>marker</code></td>
                    <td><code>number | false</code></td>
                    <td><code>false</code></td>
                    <td>Target marker position</td>
                  </tr>
                  <tr>
                    <td><code>markerColor</code></td>
                    <td><code>string</code></td>
                    <td><code>--bg-marker</code></td>
                    <td>Color of the target marker</td>
                  </tr>
                  <tr>
                    <td><code>color</code></td>
                    <td><code>string | function</code></td>
                    <td><code>--bg-primary</code></td>
                    <td>Bar color (static or dynamic)</td>
                  </tr>
                  <tr>
                    <td><code>bands</code></td>
                    <td><code>AvakioBulletGraphBand[]</code></td>
                    <td>Default bands</td>
                    <td>Performance bands/ranges</td>
                  </tr>
                  <tr>
                    <td><code>label</code></td>
                    <td><code>string</code></td>
                    <td><code>undefined</code></td>
                    <td>Label text</td>
                  </tr>
                  <tr>
                    <td><code>placeholder</code></td>
                    <td><code>string</code></td>
                    <td><code>undefined</code></td>
                    <td>Additional description</td>
                  </tr>
                  <tr>
                    <td><code>stroke</code></td>
                    <td><code>number</code></td>
                    <td><code>8</code></td>
                    <td>Bar width in pixels</td>
                  </tr>
                  <tr>
                    <td><code>scale</code></td>
                    <td><code>object</code></td>
                    <td><code>undefined</code></td>
                    <td>Scale configuration</td>
                  </tr>
                  <tr>
                    <td><code>flowTime</code></td>
                    <td><code>number</code></td>
                    <td><code>500</code></td>
                    <td>Animation duration (ms)</td>
                  </tr>
                </tbody>
              </table>
            </div>,
          ]}
        />
        <AvakioTemplate
          type="section"
          borderType="clean"
          content="Usage Example"
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <div key="code-example" className="avakio-bullet-graph-code-example">
              <pre>
{`import { AvakioBulletGraph } from "../../components/avakio/ui-widgets/avakio-bullet-graph/avakio-bullet-graph";

function MyComponent() {
  return (
    <AvakioBulletGraph
      value={75}
      minRange={0}
      maxRange={100}
      marker={80}
      bands={[
        { value: 100, color: '#dcfce7' },
        { value: 80, color: '#86efac' },
        { value: 60, color: '#22c55e' },
      ]}
      label="Sales YTD"
      placeholder="75% of target"
      scale={{ step: 20, template: "#value#%" }}
      stroke={10}
      flowTime={500}
    />
  );
}`}
              </pre>
            </div>,
          ]}
        />
      </section>
    </div>
  );
}

export default AvakioBulletGraphExample;





















