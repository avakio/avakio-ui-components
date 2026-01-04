import React, { useState, useEffect, useRef } from "react";
import { AvakioGage } from "../../components/avakio/ui-widgets/avakio-gage/avakio-gage";
import "./avakio-gage.css";
import { AvakioViewHeader } from "../../components/avakio/ui-widgets/avakio-view-header/avakio-view-header";
import { AvakioTabBar } from "../../components/avakio/ui-controls/avakio-tabbar/avakio-tabbar";
import { AvakioTemplate } from "../../components/avakio/views/avakio-template/avakio-template";
import { AvakioLayout } from "../../components/avakio/layouts/avakio-layout/avakio-layout";
import { AvakioButton } from "../../components/avakio/ui-controls/avakio-button/avakio-button";
import { Gauge, Target, Palette, Settings, FileText, Activity, Maximize2, Minimize2 } from "lucide-react";

// Tab options for navigation
const TAB_OPTIONS = [
  { id: 'basic', label: 'Basic Usage', icon: <Gauge size={14} /> },
  { id: 'sizes', label: 'Sizes', icon: <Maximize2 size={14} /> },
  { id: 'targets', label: 'Target Markers', icon: <Target size={14} /> },
  { id: 'custom', label: 'Custom Colors', icon: <Palette size={14} /> },
  { id: 'animated', label: 'Animated', icon: <Activity size={14} /> },
  { id: 'docs', label: 'Documentation', icon: <FileText size={14} /> },
];

export function AvakioGageExample() {
  const [theme, setTheme] = useState<string>("material");
  const [activeSection, setActiveSection] = useState<string | number | null>('basic');
  
  // Basic usage values
  const [cpuValue, setCpuValue] = useState(72);
  const [memoryValue, setMemoryValue] = useState(58);
  
  // Animated value for demo
  const [animatedValue, setAnimatedValue] = useState(45);

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

  // Animate value periodically for demo
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedValue(prev => {
        const newVal = prev + (Math.random() * 20 - 10);
        return Math.max(0, Math.min(100, newVal));
      });
    }, 1500);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="avakio-gage-demo-container" data-admin-theme={theme}>
      {/* Sticky Header + Tab Navigation */}
      <div className="avakio-gage-sticky-header">
        {/* Header */}
        <AvakioViewHeader
          theme={theme as any}
          label="UI Widgets"
          title="Gage Component"
          subTitle="A circular gauge component for displaying percentage values with optional target markers. Supports multiple sizes, custom colors, and animated values."
          isSticky={false}
        />

        {/* Tab Navigation */}
        <div className="avakio-gage-tabbar-container">
          <AvakioTabBar
            id="gage-demo-tabs"
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
        className="avakio-gage-demo-section"
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
          content="A circular gauge showing a value as a percentage. Use labels and sublabels to provide context for what the gauge represents."
        />
        <AvakioLayout
          theme={theme as any}
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <div key="basic-demo" style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'center' }}>
              <div style={{ maxWidth: 200 }}>
                <AvakioGage
                  label="CPU Load"
                  subLabel="Live"
                  value={cpuValue}
                  suffix="%"
                  size="lg"
                />
              </div>
              <div style={{ maxWidth: 200 }}>
                <AvakioGage
                  label="Memory"
                  subLabel="Used"
                  value={memoryValue}
                  suffix="%"
                  size="lg"
                />
              </div>
            </div>,
            <div key="basic-actions" style={{ display: 'flex', gap: 8, marginTop: 16 }}>
              <AvakioButton
                label="+5 CPU"
                size="sm"
                variant="secondary"
                onClick={() => setCpuValue(v => Math.min(100, v + 5))}
              />
              <AvakioButton
                label="-5 CPU"
                size="sm"
                variant="secondary"
                onClick={() => setCpuValue(v => Math.max(0, v - 5))}
              />
              <AvakioButton
                label="+5 Memory"
                size="sm"
                variant="secondary"
                onClick={() => setMemoryValue(v => Math.min(100, v + 5))}
              />
              <AvakioButton
                label="-5 Memory"
                size="sm"
                variant="secondary"
                onClick={() => setMemoryValue(v => Math.max(0, v - 5))}
              />
            </div>,
          ]}
        />
      </section>

      {/* Sizes Section */}
      <section 
        ref={(el) => { sectionRefs.current['sizes'] = el; }}
        className="avakio-gage-demo-section"
      >
        <AvakioTemplate
          theme={theme as any}
          type="section"
          borderType="clean"
          content="Sizes"
        />
        <AvakioTemplate
          theme={theme as any}
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="The gauge component supports three sizes: small (sm), medium (md), and large (lg). Choose the size that fits your layout needs."
        />
        <AvakioLayout
          theme={theme as any}
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <div key="sizes-demo" style={{ display: 'flex', gap: 32, flexWrap: 'wrap', alignItems: 'flex-end' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ maxWidth: 120 }}>
                  <AvakioGage
                    label="Small"
                    value={65}
                    suffix="%"
                    size="sm"
                  />
                </div>
                <code style={{ fontSize: 12, color: '#666' }}>size="sm"</code>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ maxWidth: 160 }}>
                  <AvakioGage
                    label="Medium"
                    value={65}
                    suffix="%"
                    size="md"
                  />
                </div>
                <code style={{ fontSize: 12, color: '#666' }}>size="md"</code>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ maxWidth: 200 }}>
                  <AvakioGage
                    label="Large"
                    value={65}
                    suffix="%"
                    size="lg"
                  />
                </div>
                <code style={{ fontSize: 12, color: '#666' }}>size="lg"</code>
              </div>
            </div>,
          ]}
        />
      </section>

      {/* Target Markers Section */}
      <section 
        ref={(el) => { sectionRefs.current['targets'] = el; }}
        className="avakio-gage-demo-section"
      >
        <AvakioTemplate
          theme={theme as any}
          type="section"
          borderType="clean"
          content="Target Markers"
        />
        <AvakioTemplate
          theme={theme as any}
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="Add target markers to show threshold values. Useful for displaying KPI targets or warning limits."
        />
        <AvakioLayout
          theme={theme as any}
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <div key="targets-demo" style={{ display: 'flex', gap: 32, flexWrap: 'wrap', alignItems: 'center' }}>
              <div style={{ maxWidth: 200 }}>
                <AvakioGage
                  label="CPU Load"
                  subLabel="Target: 85%"
                  value={cpuValue}
                  suffix="%"
                  target={85}
                  size="lg"
                />
              </div>
              <div style={{ maxWidth: 200 }}>
                <AvakioGage
                  label="Disk Usage"
                  subLabel="Target: 70%"
                  value={62}
                  suffix="%"
                  target={70}
                  size="lg"
                />
              </div>
              <div style={{ maxWidth: 200 }}>
                <AvakioGage
                  label="Network"
                  subLabel="Target: 90%"
                  value={78}
                  suffix="%"
                  target={90}
                  size="lg"
                />
              </div>
            </div>,
          ]}
        />
      </section>

      {/* Custom Colors Section */}
      <section 
        ref={(el) => { sectionRefs.current['custom'] = el; }}
        className="avakio-gage-demo-section"
      >
        <AvakioTemplate
          theme={theme as any}
          type="section"
          borderType="clean"
          content="Custom Colors"
        />
        <AvakioTemplate
          theme={theme as any}
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="Customize the gauge colors using the color and trackColor props to match your application's design."
        />
        <AvakioLayout
          theme={theme as any}
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <div key="custom-demo" style={{ display: 'flex', gap: 32, flexWrap: 'wrap', alignItems: 'center' }}>
              <div style={{ maxWidth: 180 }}>
                <AvakioGage
                  label="Success"
                  value={92}
                  suffix="%"
                  color="#22c55e"
                  trackColor="#dcfce7"
                  size="md"
                />
              </div>
              <div style={{ maxWidth: 180 }}>
                <AvakioGage
                  label="Warning"
                  value={68}
                  suffix="%"
                  color="#f59e0b"
                  trackColor="#fef3c7"
                  size="md"
                />
              </div>
              <div style={{ maxWidth: 180 }}>
                <AvakioGage
                  label="Error"
                  value={35}
                  suffix="%"
                  color="#ef4444"
                  trackColor="#fee2e2"
                  size="md"
                />
              </div>
              <div style={{ maxWidth: 180 }}>
                <AvakioGage
                  label="Info"
                  value={75}
                  suffix="%"
                  color="#3b82f6"
                  trackColor="#dbeafe"
                  size="md"
                />
              </div>
            </div>,
          ]}
        />
      </section>

      {/* Animated Section */}
      <section 
        ref={(el) => { sectionRefs.current['animated'] = el; }}
        className="avakio-gage-demo-section"
      >
        <AvakioTemplate
          theme={theme as any}
          type="section"
          borderType="clean"
          content="Animated Values"
        />
        <AvakioTemplate
          theme={theme as any}
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="The gauge automatically animates when values change, providing smooth visual feedback."
        />
        <AvakioLayout
          theme={theme as any}
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <div key="animated-demo" style={{ display: 'flex', gap: 32, flexWrap: 'wrap', alignItems: 'center' }}>
              <div style={{ maxWidth: 200 }}>
                <AvakioGage
                  label="Live Data"
                  subLabel="Auto-updating"
                  value={Math.round(animatedValue)}
                  suffix="%"
                  size="lg"
                  color={animatedValue < 30 ? '#ef4444' : animatedValue < 60 ? '#f59e0b' : '#22c55e'}
                />
              </div>
              <div style={{ padding: 16, background: 'var(--avakio-bg-secondary, #f8fafc)', borderRadius: 8, fontSize: 14 }}>
                <p><strong>Current Value:</strong> {Math.round(animatedValue)}%</p>
                <p style={{ margin: '8px 0 0 0', color: '#666' }}>
                  This gauge updates every 1.5 seconds with random values.<br />
                  The color changes dynamically based on the value range.
                </p>
              </div>
            </div>,
          ]}
        />
      </section>

      {/* Documentation Section */}
      <section 
        ref={(el) => { sectionRefs.current['docs'] = el; }}
        className="avakio-gage-demo-section"
      >
        <AvakioTemplate
          theme={theme as any}
          type="section"
          borderType="clean"
          content="Documentation"
        />
        <AvakioLayout
          theme={theme as any}
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <div key="docs-content" style={{ fontSize: 14 }}>
              <h4 style={{ marginTop: 0 }}>Props</h4>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: 'var(--avakio-bg-secondary, #f8fafc)' }}>
                    <th style={{ padding: 8, textAlign: 'left', borderBottom: '1px solid #e2e8f0' }}>Prop</th>
                    <th style={{ padding: 8, textAlign: 'left', borderBottom: '1px solid #e2e8f0' }}>Type</th>
                    <th style={{ padding: 8, textAlign: 'left', borderBottom: '1px solid #e2e8f0' }}>Default</th>
                    <th style={{ padding: 8, textAlign: 'left', borderBottom: '1px solid #e2e8f0' }}>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td style={{ padding: 8, borderBottom: '1px solid #e2e8f0' }}>value</td><td style={{ padding: 8, borderBottom: '1px solid #e2e8f0' }}>number</td><td style={{ padding: 8, borderBottom: '1px solid #e2e8f0' }}>-</td><td style={{ padding: 8, borderBottom: '1px solid #e2e8f0' }}>Current value of the gauge</td></tr>
                  <tr><td style={{ padding: 8, borderBottom: '1px solid #e2e8f0' }}>min</td><td style={{ padding: 8, borderBottom: '1px solid #e2e8f0' }}>number</td><td style={{ padding: 8, borderBottom: '1px solid #e2e8f0' }}>0</td><td style={{ padding: 8, borderBottom: '1px solid #e2e8f0' }}>Minimum value</td></tr>
                  <tr><td style={{ padding: 8, borderBottom: '1px solid #e2e8f0' }}>max</td><td style={{ padding: 8, borderBottom: '1px solid #e2e8f0' }}>number</td><td style={{ padding: 8, borderBottom: '1px solid #e2e8f0' }}>100</td><td style={{ padding: 8, borderBottom: '1px solid #e2e8f0' }}>Maximum value</td></tr>
                  <tr><td style={{ padding: 8, borderBottom: '1px solid #e2e8f0' }}>label</td><td style={{ padding: 8, borderBottom: '1px solid #e2e8f0' }}>string</td><td style={{ padding: 8, borderBottom: '1px solid #e2e8f0' }}>-</td><td style={{ padding: 8, borderBottom: '1px solid #e2e8f0' }}>Label text displayed above the gauge</td></tr>
                  <tr><td style={{ padding: 8, borderBottom: '1px solid #e2e8f0' }}>subLabel</td><td style={{ padding: 8, borderBottom: '1px solid #e2e8f0' }}>string</td><td style={{ padding: 8, borderBottom: '1px solid #e2e8f0' }}>-</td><td style={{ padding: 8, borderBottom: '1px solid #e2e8f0' }}>Sub-label text displayed in the center</td></tr>
                  <tr><td style={{ padding: 8, borderBottom: '1px solid #e2e8f0' }}>size</td><td style={{ padding: 8, borderBottom: '1px solid #e2e8f0' }}>'sm' | 'md' | 'lg'</td><td style={{ padding: 8, borderBottom: '1px solid #e2e8f0' }}>'md'</td><td style={{ padding: 8, borderBottom: '1px solid #e2e8f0' }}>Size of the gauge</td></tr>
                  <tr><td style={{ padding: 8, borderBottom: '1px solid #e2e8f0' }}>target</td><td style={{ padding: 8, borderBottom: '1px solid #e2e8f0' }}>number</td><td style={{ padding: 8, borderBottom: '1px solid #e2e8f0' }}>-</td><td style={{ padding: 8, borderBottom: '1px solid #e2e8f0' }}>Target value to display as a marker</td></tr>
                  <tr><td style={{ padding: 8, borderBottom: '1px solid #e2e8f0' }}>color</td><td style={{ padding: 8, borderBottom: '1px solid #e2e8f0' }}>string</td><td style={{ padding: 8, borderBottom: '1px solid #e2e8f0' }}>-</td><td style={{ padding: 8, borderBottom: '1px solid #e2e8f0' }}>Custom color for the filled arc</td></tr>
                  <tr><td style={{ padding: 8, borderBottom: '1px solid #e2e8f0' }}>trackColor</td><td style={{ padding: 8, borderBottom: '1px solid #e2e8f0' }}>string</td><td style={{ padding: 8, borderBottom: '1px solid #e2e8f0' }}>-</td><td style={{ padding: 8, borderBottom: '1px solid #e2e8f0' }}>Custom color for the track</td></tr>
                  <tr><td style={{ padding: 8 }}>prefix/suffix</td><td style={{ padding: 8 }}>string</td><td style={{ padding: 8 }}>-</td><td style={{ padding: 8 }}>Text to display before/after the value</td></tr>
                </tbody>
              </table>
            </div>,
          ]}
        />
      </section>
    </div>
  );
}


















