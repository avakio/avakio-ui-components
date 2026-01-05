import React, { useState, useEffect, useRef, useMemo } from "react";
import { AvakioGoogleMap, AvakioTheme, avakioThemes } from "../../components/avakio/ui-widgets/avakio-googlemap/avakio-googlemap";
import { AvakioViewHeader } from "../../components/avakio/ui-widgets/avakio-view-header/avakio-view-header";
import { AvakioTabBar } from "../../components/avakio/ui-controls/avakio-tabbar/avakio-tabbar";
import { AvakioTemplate } from "../../components/avakio/views/avakio-template/avakio-template";
import { AvakioLayout } from "../../components/avakio/layouts/avakio-layout/avakio-layout";
import { AvakioButton } from "../../components/avakio/ui-controls/avakio-button/avakio-button";
import { AvakioRichSelect } from "../../components/avakio/ui-controls/avakio-richselect/avakio-richselect";
import { Map, MapPin, Settings, FileText, Layers, ZoomIn } from "lucide-react";

type MarkerOption = {
  id: string;
  label: string;
  position: { lat: number; lng: number };
};

const defaultMarkers: MarkerOption[] = [
  { id: "sf", label: "San Francisco", position: { lat: 37.7749, lng: -122.4194 } },
  { id: "nyc", label: "New York", position: { lat: 40.7128, lng: -74.006 } },
  { id: "berlin", label: "Berlin", position: { lat: 52.52, lng: 13.405 } },
  { id: "tokyo", label: "Tokyo", position: { lat: 35.6762, lng: 139.6503 } },
  { id: "london", label: "London", position: { lat: 51.5074, lng: -0.1278 } },
];

const mapTypeOptions = [
  { id: "roadmap", label: "Roadmap" },
  { id: "satellite", label: "Satellite" },
  { id: "hybrid", label: "Hybrid" },
  { id: "terrain", label: "Terrain" },
];

// Tab options for navigation
const TAB_OPTIONS = [
  { id: 'basic', label: 'Basic Usage', icon: <Map size={14} /> },
  { id: 'markers', label: 'Markers', icon: <MapPin size={14} /> },
  { id: 'maptypes', label: 'Map Types', icon: <Layers size={14} /> },
  { id: 'zoom', label: 'Zoom Control', icon: <ZoomIn size={14} /> },
  { id: 'docs', label: 'Documentation', icon: <FileText size={14} /> },
];

export function AvakioGoogleMapExample() {
  
  const [activeSection, setActiveSection] = useState<string | number | null>('basic');
  
  // Map state
  const [selectedMarker, setSelectedMarker] = useState<MarkerOption>(defaultMarkers[0]);
  const [zoom, setZoom] = useState(5);
  const [mapType, setMapType] = useState<"roadmap" | "satellite" | "hybrid" | "terrain">("roadmap");

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
  

  const center = useMemo(() => selectedMarker.position, [selectedMarker]);

  return (
    <div className="avakio-googlemap-demo-container">
      {/* Sticky Header + Tab Navigation */}
      <div className="avakio-googlemap-sticky-header">
        {/* Header */}
        <AvakioViewHeader
          label="UI Widgets"
          title="Google Map Component"
          subTitle="An interactive map component powered by Google Maps. Supports markers, multiple map types, zoom control, and custom styling."
          isSticky={false}
        />

        {/* Tab Navigation */}
        <div className="avakio-googlemap-tabbar-container">
          <AvakioTabBar
            id="googlemap-demo-tabs"
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
        className="avakio-googlemap-demo-section"
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
          content="Display an interactive Google Map with a center point. Without an API key, the component falls back to an embedded iframe."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <div key="basic-demo">
              <AvakioGoogleMap
                theme="material"
                center={center}
                zoom={zoom}
                height={400}
                apiKey={null}
              />
              <div style={{ fontSize: 13, color: 'var(--agm-muted, #475569)', marginTop: 8 }}>
                Interactive maps require a Google Maps API key. Provide <code>VITE_GOOGLE_MAPS_API_KEY</code> in your environment or pass <code>apiKey</code> to the component.
              </div>
            </div>,
          ]}
        />
      </section>

      {/* Markers Section */}
      <section 
        ref={(el) => { sectionRefs.current['markers'] = el; }}
        className="avakio-googlemap-demo-section"
      >
        <AvakioTemplate
          type="section"
          borderType="clean"
          content="Markers"
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="Add markers to highlight specific locations on the map. Markers support labels and custom positioning."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <div key="markers-controls" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 16, marginBottom: 16 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14 }}>
                <span>Focus city:</span>
                <select
                  value={selectedMarker.id}
                  onChange={(e) => setSelectedMarker(defaultMarkers.find((m) => m.id === e.target.value) || defaultMarkers[0])}
                  style={{ padding: '6px 12px', borderRadius: 8, border: '1px solid #cbd5e1', background: '#fff' }}
                >
                  {defaultMarkers.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.label}
                    </option>
                  ))}
                </select>
              </label>
              <span style={{ fontSize: 14, color: '#666' }}>
                Lat: {selectedMarker.position.lat.toFixed(4)}, Lng: {selectedMarker.position.lng.toFixed(4)}
              </span>
            </div>,
            <AvakioGoogleMap
              key="markers-map"
              theme="material"
              center={center}
              zoom={6}
              markers={defaultMarkers}
              height={400}
              apiKey={null}
            />,
          ]}
        />
      </section>

      {/* Map Types Section */}
      <section 
        ref={(el) => { sectionRefs.current['maptypes'] = el; }}
        className="avakio-googlemap-demo-section"
      >
        <AvakioTemplate
          type="section"
          borderType="clean"
          content="Map Types"
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="Choose between different map types: roadmap, satellite, hybrid, or terrain."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <div key="maptype-controls" style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
              {mapTypeOptions.map((type) => (
                <AvakioButton
                  key={type.id}
                  label={type.label}
                  size="sm"
                  variant={mapType === type.id ? 'primary' : 'secondary'}
                  onClick={() => setMapType(type.id as any)}
                />
              ))}
            </div>,
            <AvakioGoogleMap
              key="maptype-map"
              theme="material"
              center={{ lat: 37.7749, lng: -122.4194 }}
              zoom={12}
              mapType={mapType}
              height={400}
              apiKey={null}
            />,
          ]}
        />
      </section>

      {/* Zoom Control Section */}
      <section 
        ref={(el) => { sectionRefs.current['zoom'] = el; }}
        className="avakio-googlemap-demo-section"
      >
        <AvakioTemplate
          type="section"
          borderType="clean"
          content="Zoom Control"
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="Control the zoom level of the map. Zoom levels range from 2 (world view) to 20 (street level)."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <div key="zoom-controls" style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14 }}>
                <span>Zoom:</span>
                <input
                  type="range"
                  min={2}
                  max={16}
                  value={zoom}
                  onChange={(e) => setZoom(parseInt(e.target.value, 10))}
                  style={{ accentColor: 'var(--avakio-primary, #1ca1c1)', width: 200 }}
                />
                <span style={{ fontWeight: 700, minWidth: 40 }}>{zoom}x</span>
              </label>
              <div style={{ display: 'flex', gap: 8 }}>
                <AvakioButton
                  label="Zoom In"
                  size="sm"
                  variant="secondary"
                  onClick={() => setZoom(z => Math.min(16, z + 1))}
                />
                <AvakioButton
                  label="Zoom Out"
                  size="sm"
                  variant="secondary"
                  onClick={() => setZoom(z => Math.max(2, z - 1))}
                />
              </div>
            </div>,
            <AvakioGoogleMap
              key="zoom-map"
              theme="material"
              center={center}
              zoom={zoom}
              height={400}
              apiKey={null}
            />,
          ]}
        />
      </section>

      {/* Documentation Section */}
      <section 
        ref={(el) => { sectionRefs.current['docs'] = el; }}
        className="avakio-googlemap-demo-section"
        data-section="docs"
      >
        <AvakioTemplate
          type="section"
          borderType="clean"
          content="Documentation"
        />
        <AvakioLayout
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
                  <tr><td style={{ padding: 8, borderBottom: '1px solid #e2e8f0' }}>center</td><td style={{ padding: 8, borderBottom: '1px solid #e2e8f0' }}>{'{ lat: number, lng: number }'}</td><td style={{ padding: 8, borderBottom: '1px solid #e2e8f0' }}>-</td><td style={{ padding: 8, borderBottom: '1px solid #e2e8f0' }}>Center coordinates of the map</td></tr>
                  <tr><td style={{ padding: 8, borderBottom: '1px solid #e2e8f0' }}>zoom</td><td style={{ padding: 8, borderBottom: '1px solid #e2e8f0' }}>number</td><td style={{ padding: 8, borderBottom: '1px solid #e2e8f0' }}>12</td><td style={{ padding: 8, borderBottom: '1px solid #e2e8f0' }}>Zoom level (2-20)</td></tr>
                  <tr><td style={{ padding: 8, borderBottom: '1px solid #e2e8f0' }}>markers</td><td style={{ padding: 8, borderBottom: '1px solid #e2e8f0' }}>MapMarker[]</td><td style={{ padding: 8, borderBottom: '1px solid #e2e8f0' }}>[]</td><td style={{ padding: 8, borderBottom: '1px solid #e2e8f0' }}>Array of markers to display</td></tr>
                  <tr><td style={{ padding: 8, borderBottom: '1px solid #e2e8f0' }}>mapType</td><td style={{ padding: 8, borderBottom: '1px solid #e2e8f0' }}>'roadmap' | 'satellite' | 'hybrid' | 'terrain'</td><td style={{ padding: 8, borderBottom: '1px solid #e2e8f0' }}>'roadmap'</td><td style={{ padding: 8, borderBottom: '1px solid #e2e8f0' }}>Type of map to display</td></tr>
                  <tr><td style={{ padding: 8, borderBottom: '1px solid #e2e8f0' }}>height</td><td style={{ padding: 8, borderBottom: '1px solid #e2e8f0' }}>number | string</td><td style={{ padding: 8, borderBottom: '1px solid #e2e8f0' }}>360</td><td style={{ padding: 8, borderBottom: '1px solid #e2e8f0' }}>Height of the map container</td></tr>
                  <tr><td style={{ padding: 8, borderBottom: '1px solid #e2e8f0' }}>apiKey</td><td style={{ padding: 8, borderBottom: '1px solid #e2e8f0' }}>string | null</td><td style={{ padding: 8, borderBottom: '1px solid #e2e8f0' }}>null</td><td style={{ padding: 8, borderBottom: '1px solid #e2e8f0' }}>Google Maps API key for interactive features</td></tr>
                  <tr><td style={{ padding: 8 }}>theme</td><td style={{ padding: 8 }}>AvakioTheme</td><td style={{ padding: 8 }}>'material'</td><td style={{ padding: 8 }}>Component theme</td></tr>
                </tbody>
              </table>
              
              <h4 style={{ marginTop: 24 }}>MapMarker Type</h4>
              <pre style={{ background: 'var(--avakio-bg-secondary, #f8fafc)', padding: 16, borderRadius: 8, overflow: 'auto' }}>
{`type MapMarker = {
  id?: string;
  label?: string;
  position: { lat: number; lng: number };
}`}
              </pre>
            </div>,
          ]}
        />
      </section>
    </div>
  );
}

export default AvakioGoogleMapExample;





















