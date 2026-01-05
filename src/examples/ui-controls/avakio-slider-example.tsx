import React, { useState, useRef } from "react";
import { AvakioSlider, AvakioSliderValue } from "../../components/avakio/ui-controls/avakio-slider/avakio-slider";
import { AvakioViewHeader } from "../../components/avakio/ui-widgets/avakio-view-header/avakio-view-header";
import { AvakioTabBar } from "../../components/avakio/ui-controls/avakio-tabbar/avakio-tabbar";
import { AvakioTemplate } from "../../components/avakio/views/avakio-template/avakio-template";
import { AvakioLayout } from "../../components/avakio/layouts/avakio-layout/avakio-layout";
import { Sliders, Hash, AlertCircle, Ban, Ruler, GitBranch } from "lucide-react";

// Tab options for navigation
const TAB_OPTIONS = [
  { id: 'basic', label: 'Basic Slider', icon: <Sliders size={14} /> },
  { id: 'range', label: 'Range Slider', icon: <GitBranch size={14} /> },
  { id: 'steps', label: 'Steps & Marks', icon: <Hash size={14} /> },
  { id: 'validation', label: 'Validation', icon: <AlertCircle size={14} /> },
  { id: 'disabled', label: 'Disabled & Sizes', icon: <Ban size={14} /> },
  { id: 'custom', label: 'Custom Range', icon: <Ruler size={14} /> },
];

export function AvakioSliderExample({ theme = 'material' }: { theme?: string }) {
  const [activeSection, setActiveSection] = useState<string | number | null>('basic');
  const [volume, setVolume] = useState<number>(45);
  const [brightness, setBrightness] = useState<number>(70);
  const [threshold, setThreshold] = useState<number>(30);
  const [temperature, setTemperature] = useState<number>(22);
  const [speed, setSpeed] = useState<number>(5);

  // Helper to handle AvakioSliderValue -> number
  const handleSliderChange = (setter: React.Dispatch<React.SetStateAction<number>>) => (value: AvakioSliderValue) => {
    if (typeof value === 'number') setter(value);
  };
 // Range slider states
  const [priceRange, setPriceRange] = useState<[number, number]>([200, 800]);
  const [ageRange, setAgeRange] = useState<[number, number]>([25, 45]);
  const [dateRange, setDateRange] = useState<[number, number]>([2020, 2024]);

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

  return (
    <div className="avakio-slider-demo-container">
      {/* Sticky Header + Tab Navigation */}
      <div className="avakio-example-sticky-header">
        {/* Header */}
        <AvakioViewHeader
          label="UI Controls"
          title="Slider Component"
          subTitle="A theme-aware slider component. Supports marks, steps, sizes, value display, required state, and error messages."
          isSticky={false}
        />

        {/* Tab Navigation */}
        <div className="avakio-example-tabbar-container">
          <AvakioTabBar
            id="slider-demo-tabs"
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

      {/* Basic Slider Section */}
      <section 
        ref={(el) => { sectionRefs.current['basic'] = el; }}
        className="avakio-slider-demo-section"
      >
        <AvakioTemplate
          type="section"
          borderType="clean"
          content="Basic Slider"
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="Controlled slider with live value display. Drag or click the track to change the value."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioSlider
              key="volume-slider"
              label="Volume"
              description="Drag or click the track"
              min={0}
              max={100}
              step={1}
              value={volume}
              onChange={handleSliderChange(setVolume)}
              marks={[0, 25, 50, 75, 100]}
            />,
            <div key="volume-value" className="avakio-slider-value-chip">
              Current Value: <strong>{volume}</strong>
            </div>,
          ]}
        />
      </section>

      {/* Range Slider Section */}
      <section 
        ref={(el) => { sectionRefs.current['range'] = el; }}
        className="avakio-slider-demo-section"
      >
        <AvakioTemplate
          type="section"
          borderType="clean"
          content="Range Slider"
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="Dual-handle slider for selecting a range of values. Use the 'range' prop to enable this mode."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioSlider
              key="price-range-slider"
              label="Price Range"
              description="Select a price range ($0 - $1000)"
              range
              min={0}
              max={1000}
              step={10}
              value={priceRange}
              onChange={(val) => setPriceRange(val as [number, number])}
              marks={[0, 250, 500, 750, 1000]}
              formatValue={(v) => `$${v}`}
            />,
            <div key="price-value" className="avakio-slider-value-chip">
              Price Range: <strong>${priceRange[0]} - ${priceRange[1]}</strong>
            </div>,
          ]}
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioSlider
              key="age-range-slider"
              label="Age Range"
              description="Select target age group"
              range
              min={18}
              max={65}
              step={1}
              value={ageRange}
              onChange={(val) => setAgeRange(val as [number, number])}
              marks={[18, 30, 45, 65]}
            />,
            <div key="age-value" className="avakio-slider-value-chip">
              Age Range: <strong>{ageRange[0]} - {ageRange[1]} years</strong>
            </div>,
          ]}
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioSlider
              key="year-range-slider"
              label="Year Range"
              description="Filter by year"
              range
              min={2010}
              max={2025}
              step={1}
              value={dateRange}
              onChange={(val) => setDateRange(val as [number, number])}
              marks={[2010, 2015, 2020, 2025]}
            />,
            <div key="year-value" className="avakio-slider-value-chip">
              Years: <strong>{dateRange[0]} - {dateRange[1]}</strong>
            </div>,
          ]}
        />
      </section>

      {/* Steps & Marks Section */}
      <section 
        ref={(el) => { sectionRefs.current['steps'] = el; }}
        className="avakio-slider-demo-section"
      >
        <AvakioTemplate
          type="section"
          borderType="clean"
          content="Steps & Marks"
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="Configure step increments and display marks at specific values."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioSlider
              key="brightness-slider"
              label="Brightness"
              description="Step = 10"
              min={0}
              max={100}
              step={10}
              value={brightness}
              onChange={handleSliderChange(setBrightness)}
              marks={[0, 50, 100]}
            />,
            <div key="brightness-value" className="avakio-slider-value-chip">
              Brightness: <strong>{brightness}%</strong>
            </div>,
          ]}
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioSlider
              key="speed-slider"
              label="Speed"
              description="Step = 1, marks at each step"
              min={1}
              max={10}
              step={1}
              value={speed}
              onChange={handleSliderChange(setSpeed)}
              marks={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
            />,
            <div key="speed-value" className="avakio-slider-value-chip">
              Speed Level: <strong>{speed}</strong>
            </div>,
          ]}
        />
      </section>

      {/* Validation Section */}
      <section 
        ref={(el) => { sectionRefs.current['validation'] = el; }}
        className="avakio-slider-demo-section"
      >
        <AvakioTemplate
          type="section"
          borderType="clean"
          content="Validation"
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="Show error states and required indicators for form validation."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioSlider
              key="threshold-slider"
              label="Threshold"
              description="Must be at least 40"
              min={0}
              max={100}
              step={5}
              value={threshold}
              onChange={handleSliderChange(setThreshold)}
              required
              error={threshold < 40 ? "Value must be >= 40" : ""}
              marks={[0, 20, 40, 60, 80, 100]}
            />,
            <div key="threshold-value" className="avakio-slider-value-chip">
              Threshold: <strong>{threshold}</strong>
              {threshold < 40 && <span className="avakio-slider-error-hint"> (Too low!)</span>}
            </div>,
          ]}
        />
      </section>

      {/* Disabled & Sizes Section */}
      <section 
        ref={(el) => { sectionRefs.current['disabled'] = el; }}
        className="avakio-slider-demo-section"
      >
        <AvakioTemplate
          type="section"
          borderType="clean"
          content="Disabled & Sizes"
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="Sliders can be disabled and come in three sizes: small, medium, and large."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioTemplate
              key="size-label-sm"
              type="clean"
              borderType="clean"
              content="Small Size (sm)"
            />,
            <AvakioSlider key="slider-sm" label="Small" size="sm" min={0} max={10} defaultValue={3} disabled />,
            <AvakioTemplate
              key="size-label-md"
              type="clean"
              borderType="clean"
              content="Medium Size (md) - Default"
            />,
            <AvakioSlider key="slider-md" label="Default" size="md" min={0} max={10} defaultValue={6} disabled />,
            <AvakioTemplate
              key="size-label-lg"
              type="clean"
              borderType="clean"
              content="Large Size (lg)"
            />,
            <AvakioSlider key="slider-lg" label="Large" size="lg" min={0} max={10} defaultValue={8} disabled />,
          ]}
        />
      </section>

      {/* Custom Range Section */}
      <section 
        ref={(el) => { sectionRefs.current['custom'] = el; }}
        className="avakio-slider-demo-section"
      >
        <AvakioTemplate
          type="section"
          borderType="clean"
          content="Custom Range Values"
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="Sliders can use different min/max ranges for various use cases."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioSlider
              key="temperature-slider"
              label="Temperature (°C)"
              description="Range: 15-30"
              min={15}
              max={30}
              step={0.5}
              value={temperature}
              onChange={handleSliderChange(setTemperature)}
              marks={[15, 20, 25, 30]}
            />,
            <div key="temperature-value" className="avakio-slider-value-chip">
              Temperature: <strong>{temperature}°C</strong>
            </div>,
          ]}
        />
      </section>
    </div>
  );
}

export default AvakioSliderExample;






















