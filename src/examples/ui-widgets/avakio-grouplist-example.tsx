import React, { useState, useEffect, useRef } from "react";
import { AvakioGroupList, GroupListItem, GroupListOpenState } from "../../components/avakio/ui-widgets/avakio-grouplist/avakio-grouplist";
import { AvakioViewHeader } from "../../components/avakio/ui-widgets/avakio-view-header/avakio-view-header";
import { AvakioTabBar } from "../../components/avakio/ui-controls/avakio-tabbar/avakio-tabbar";
import { AvakioTemplate } from "../../components/avakio/views/avakio-template/avakio-template";
import { AvakioLayout } from "../../components/avakio/layouts/avakio-layout/avakio-layout";
import { AvakioButton } from "../../components/avakio/ui-controls/avakio-button/avakio-button";
import { 
  List, 
  Folder, 
  FileText, 
  Settings, 
  Palette, 
  Film, 
  Music, 
  Image, 
  Users,
  Building2,
  MapPin,
  Globe,
  Code,
  Zap,
  Star
} from "lucide-react";

// Tab options for navigation
const TAB_OPTIONS = [
  { id: 'basic', label: 'Basic Usage', icon: <List size={14} /> },
  { id: 'hierarchical', label: 'Hierarchical Data', icon: <Folder size={14} /> },
  { id: 'templates', label: 'Custom Templates', icon: <Palette size={14} /> },
  { id: 'selection', label: 'Selection', icon: <Star size={14} /> },
  { id: 'styling', label: 'Styling', icon: <Settings size={14} /> },
  { id: 'docs', label: 'Documentation', icon: <FileText size={14} /> },
];

// Sample data - Films by year
const filmsData: GroupListItem[] = [
  {
    id: 'films',
    value: 'Films Database',
    icon: <Film size={16} />,
    data: [
      {
        id: '2024',
        value: '2024 Films',
        data: [
          { id: 'f1', value: 'Dune: Part Two' },
          { id: 'f2', value: 'Deadpool & Wolverine' },
          { id: 'f3', value: 'Inside Out 2' },
        ],
      },
      {
        id: '2023',
        value: '2023 Films',
        data: [
          { id: 'f4', value: 'Oppenheimer' },
          { id: 'f5', value: 'Barbie' },
          { id: 'f6', value: 'Killers of the Flower Moon' },
        ],
      },
      {
        id: '2022',
        value: '2022 Films',
        data: [
          { id: 'f7', value: 'Top Gun: Maverick' },
          { id: 'f8', value: 'Avatar: The Way of Water' },
          { id: 'f9', value: 'Everything Everywhere All at Once' },
        ],
      },
    ],
  },
];

// Sample data - Music genres
const musicData: GroupListItem[] = [
  {
    id: 'rock',
    value: 'Rock',
    icon: <Music size={16} />,
    data: [
      {
        id: 'classic-rock',
        value: 'Classic Rock',
        data: [
          { id: 'led-zeppelin', value: 'Led Zeppelin' },
          { id: 'pink-floyd', value: 'Pink Floyd' },
          { id: 'the-who', value: 'The Who' },
        ],
      },
      {
        id: 'alternative',
        value: 'Alternative Rock',
        data: [
          { id: 'radiohead', value: 'Radiohead' },
          { id: 'nirvana', value: 'Nirvana' },
          { id: 'foo-fighters', value: 'Foo Fighters' },
        ],
      },
    ],
  },
  {
    id: 'jazz',
    value: 'Jazz',
    icon: <Music size={16} />,
    data: [
      { id: 'miles-davis', value: 'Miles Davis' },
      { id: 'john-coltrane', value: 'John Coltrane' },
      { id: 'bill-evans', value: 'Bill Evans' },
    ],
  },
  {
    id: 'electronic',
    value: 'Electronic',
    icon: <Zap size={16} />,
    data: [
      { id: 'daft-punk', value: 'Daft Punk' },
      { id: 'kraftwerk', value: 'Kraftwerk' },
      { id: 'aphex-twin', value: 'Aphex Twin' },
    ],
  },
];

// Sample data - Organization structure
const orgData: GroupListItem[] = [
  {
    id: 'engineering',
    value: 'Engineering',
    icon: <Code size={16} />,
    data: [
      {
        id: 'frontend',
        value: 'Frontend Team',
        data: [
          { id: 'john', value: 'John Smith', icon: <Users size={14} /> },
          { id: 'jane', value: 'Jane Doe', icon: <Users size={14} /> },
          { id: 'bob', value: 'Bob Johnson', icon: <Users size={14} /> },
        ],
      },
      {
        id: 'backend',
        value: 'Backend Team',
        data: [
          { id: 'alice', value: 'Alice Williams', icon: <Users size={14} /> },
          { id: 'charlie', value: 'Charlie Brown', icon: <Users size={14} /> },
        ],
      },
    ],
  },
  {
    id: 'marketing',
    value: 'Marketing',
    icon: <Star size={16} />,
    data: [
      { id: 'sarah', value: 'Sarah Connor', icon: <Users size={14} /> },
      { id: 'mike', value: 'Mike Ross', icon: <Users size={14} /> },
    ],
  },
  {
    id: 'hr',
    value: 'Human Resources',
    icon: <Users size={16} />,
    data: [
      { id: 'lisa', value: 'Lisa Simpson', icon: <Users size={14} /> },
    ],
  },
];

// Sample data - Locations
const locationsData: GroupListItem[] = [
  {
    id: 'americas',
    value: 'Americas',
    icon: <Globe size={16} />,
    data: [
      {
        id: 'north-america',
        value: 'North America',
        icon: <MapPin size={16} />,
        data: [
          { id: 'usa', value: 'United States' },
          { id: 'canada', value: 'Canada' },
          { id: 'mexico', value: 'Mexico' },
        ],
      },
      {
        id: 'south-america',
        value: 'South America',
        icon: <MapPin size={16} />,
        data: [
          { id: 'brazil', value: 'Brazil' },
          { id: 'argentina', value: 'Argentina' },
          { id: 'chile', value: 'Chile' },
        ],
      },
    ],
  },
  {
    id: 'europe',
    value: 'Europe',
    icon: <Globe size={16} />,
    data: [
      { id: 'uk', value: 'United Kingdom' },
      { id: 'germany', value: 'Germany' },
      { id: 'france', value: 'France' },
      { id: 'spain', value: 'Spain' },
    ],
  },
  {
    id: 'asia',
    value: 'Asia',
    icon: <Globe size={16} />,
    data: [
      { id: 'japan', value: 'Japan' },
      { id: 'china', value: 'China' },
      { id: 'india', value: 'India' },
      { id: 'korea', value: 'South Korea' },
    ],
  },
];

export function AvakioGroupListExample() {
  
  const [activeSection, setActiveSection] = useState<string | number | null>('basic');
  
  // State for demos
  const [selectedFilm, setSelectedFilm] = useState<string | number | null>(null);
  const [selectedOrg, setSelectedOrg] = useState<string | number | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | number | null>(null);
  const [navState, setNavState] = useState<GroupListOpenState | null>(null);

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
    <div className="avakio-grouplist-demo-container">
      {/* Sticky Header + Tab Navigation */}
      <div className="avakio-example-sticky-header">
        {/* Header */}
        <AvakioViewHeader
          label="UI Widgets"
          title="GroupList Component"
          subTitle="A hierarchical list component for presenting data in groups with drill-down navigation. Supports templates, selection, and animated transitions."
          isSticky={false}
        />

        {/* Tab Navigation */}
        <div className="avakio-example-tabbar-container">
          <AvakioTabBar
            id="grouplist-demo-tabs"
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
        className="avakio-grouplist-demo-section"
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
          content="A GroupList displays hierarchical data with drill-down navigation. Click on a group to expand it and see its children. Click the back header to return to the parent level."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <div key="basic-demo" style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-start' }}>
              <div style={{ width: 280 }}>
                <h4 style={{ margin: '0 0 12px 0', fontSize: 14, color: 'var(--gl-text-muted)' }}>Films Database</h4>
                <AvakioGroupList
                  data={filmsData}
                  height={300}
                  onSelect={(item) => setSelectedFilm(item.id)}
                  value={selectedFilm}
                />
              </div>
              <div style={{ padding: 16, background: 'var(--avakio-bg-secondary, #f8fafc)', borderRadius: 8, fontSize: 14 }}>
                <p><strong>Selected Film:</strong> {selectedFilm || 'None'}</p>
                <p style={{ margin: '8px 0 0 0', color: '#666' }}>
                  Click on year groups to drill down.<br />
                  Select a film to see the selection.
                </p>
              </div>
            </div>,
          ]}
        />
      </section>

      {/* Hierarchical Data Section */}
      <section 
        ref={(el) => { sectionRefs.current['hierarchical'] = el; }}
        className="avakio-grouplist-demo-section"
      >
        <AvakioTemplate
          type="section"
          borderType="clean"
          content="Hierarchical Data"
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="GroupList supports deeply nested hierarchical data. Each level can have its own icon and as many children as needed."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <div key="hierarchical-demo" style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-start' }}>
              <div style={{ width: 280 }}>
                <h4 style={{ margin: '0 0 12px 0', fontSize: 14, color: 'var(--gl-text-muted)' }}>Music Genres</h4>
                <AvakioGroupList
                  data={musicData}
                  height={280}
                />
              </div>
              <div style={{ width: 280 }}>
                <h4 style={{ margin: '0 0 12px 0', fontSize: 14, color: 'var(--gl-text-muted)' }}>Locations</h4>
                <AvakioGroupList
                  data={locationsData}
                  height={280}
                  value={selectedLocation}
                  onSelect={(item) => setSelectedLocation(item.id)}
                />
              </div>
            </div>,
          ]}
        />
      </section>

      {/* Custom Templates Section */}
      <section 
        ref={(el) => { sectionRefs.current['templates'] = el; }}
        className="avakio-grouplist-demo-section"
      >
        <AvakioTemplate
          type="section"
          borderType="clean"
          content="Custom Templates"
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="Customize item rendering using templateItem, templateGroup, and templateBack props."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <div key="templates-demo" style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-start' }}>
              <div style={{ width: 300 }}>
                <h4 style={{ margin: '0 0 12px 0', fontSize: 14, color: 'var(--gl-text-muted)' }}>Custom Group Template</h4>
                <AvakioGroupList
                  data={orgData}
                  height={320}
                  value={selectedOrg}
                  onSelect={(item) => setSelectedOrg(item.id)}
                  templateGroup={(item, count) => (
                    <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <strong>{item.value}</strong>
                      <span style={{ 
                        background: 'var(--gl-accent)', 
                        color: 'white', 
                        padding: '2px 8px', 
                        borderRadius: 12, 
                        fontSize: 11 
                      }}>
                        {count} {count === 1 ? 'member' : 'members'}
                      </span>
                    </span>
                  )}
                  templateItem={(item) => (
                    <span style={{ fontStyle: 'italic' }}>{item.value}</span>
                  )}
                  templateBack={(item, count) => (
                    <span>← Back to <strong>{item.value}</strong></span>
                  )}
                />
              </div>
              <div style={{ padding: 16, background: 'var(--avakio-bg-secondary, #f8fafc)', borderRadius: 8, fontSize: 13, maxWidth: 300 }}>
                <p><strong>Selected:</strong> {selectedOrg || 'None'}</p>
                <p style={{ margin: '8px 0 0 0' }}>Templates allow you to:</p>
                <ul style={{ margin: '8px 0 0 0', paddingLeft: 20 }}>
                  <li><code>templateGroup</code> - Style group headers</li>
                  <li><code>templateItem</code> - Style leaf items</li>
                  <li><code>templateBack</code> - Style back button</li>
                </ul>
              </div>
            </div>,
          ]}
        />
      </section>

      {/* Selection Section */}
      <section 
        ref={(el) => { sectionRefs.current['selection'] = el; }}
        className="avakio-grouplist-demo-section"
      >
        <AvakioTemplate
          type="section"
          borderType="clean"
          content="Selection & Navigation"
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="Track selection state and navigation events. The onNavigate callback provides the current navigation state."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <div key="selection-demo" style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-start' }}>
              <div style={{ width: 280 }}>
                <h4 style={{ margin: '0 0 12px 0', fontSize: 14, color: 'var(--gl-text-muted)' }}>Navigation State Tracking</h4>
                <AvakioGroupList
                  data={locationsData}
                  height={280}
                  onNavigate={setNavState}
                  onSelect={(item) => console.log('Selected:', item)}
                />
              </div>
              <div style={{ padding: 16, background: 'var(--avakio-bg-secondary, #f8fafc)', borderRadius: 8, fontSize: 13, flex: 1, minWidth: 250 }}>
                <p><strong>Navigation State:</strong></p>
                <pre style={{ 
                  background: 'var(--gl-bg, white)', 
                  padding: 12, 
                  borderRadius: 4, 
                  overflow: 'auto',
                  fontSize: 12,
                  maxHeight: 200
                }}>
                  {navState ? JSON.stringify({
                    parents: navState.parents,
                    branchItems: navState.branch.map(b => b.value)
                  }, null, 2) : 'Navigate to see state'}
                </pre>
              </div>
            </div>,
          ]}
        />
      </section>

      {/* Styling Section */}
      <section 
        ref={(el) => { sectionRefs.current['styling'] = el; }}
        className="avakio-grouplist-demo-section"
      >
        <AvakioTemplate
          type="section"
          borderType="clean"
          content="Styling Options"
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="Control dimensions, animations, and disable selection mode."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <div key="styling-demo" style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-start' }}>
              <div>
                <h4 style={{ margin: '0 0 12px 0', fontSize: 14, color: 'var(--gl-text-muted)' }}>Custom Dimensions</h4>
                <AvakioGroupList
                  data={musicData}
                  width={240}
                  height={200}
                />
              </div>
              <div>
                <h4 style={{ margin: '0 0 12px 0', fontSize: 14, color: 'var(--gl-text-muted)' }}>No Animation</h4>
                <AvakioGroupList
                  data={musicData}
                  width={240}
                  height={200}
                  animate={false}
                />
              </div>
              <div>
                <h4 style={{ margin: '0 0 12px 0', fontSize: 14, color: 'var(--gl-text-muted)' }}>Selection Disabled</h4>
                <AvakioGroupList
                  data={musicData}
                  width={240}
                  height={200}
                  select={false}
                />
              </div>
            </div>,
          ]}
        />
      </section>

      {/* Documentation Section */}
      <section 
        ref={(el) => { sectionRefs.current['docs'] = el; }}
        className="avakio-grouplist-demo-section"
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
                  <tr><td style={{ padding: 8, borderBottom: '1px solid #e2e8f0' }}>data</td><td style={{ padding: 8, borderBottom: '1px solid #e2e8f0' }}>GroupListItem[]</td><td style={{ padding: 8, borderBottom: '1px solid #e2e8f0' }}>required</td><td style={{ padding: 8, borderBottom: '1px solid #e2e8f0' }}>Hierarchical data source</td></tr>
                  <tr><td style={{ padding: 8, borderBottom: '1px solid #e2e8f0' }}>value</td><td style={{ padding: 8, borderBottom: '1px solid #e2e8f0' }}>string | number</td><td style={{ padding: 8, borderBottom: '1px solid #e2e8f0' }}>-</td><td style={{ padding: 8, borderBottom: '1px solid #e2e8f0' }}>Controlled selected value</td></tr>
                  <tr><td style={{ padding: 8, borderBottom: '1px solid #e2e8f0' }}>onSelect</td><td style={{ padding: 8, borderBottom: '1px solid #e2e8f0' }}>(item) =&gt; void</td><td style={{ padding: 8, borderBottom: '1px solid #e2e8f0' }}>-</td><td style={{ padding: 8, borderBottom: '1px solid #e2e8f0' }}>Called when a leaf item is selected</td></tr>
                  <tr><td style={{ padding: 8, borderBottom: '1px solid #e2e8f0' }}>onNavigate</td><td style={{ padding: 8, borderBottom: '1px solid #e2e8f0' }}>(state) =&gt; void</td><td style={{ padding: 8, borderBottom: '1px solid #e2e8f0' }}>-</td><td style={{ padding: 8, borderBottom: '1px solid #e2e8f0' }}>Called when navigation state changes</td></tr>
                  <tr><td style={{ padding: 8, borderBottom: '1px solid #e2e8f0' }}>templateItem</td><td style={{ padding: 8, borderBottom: '1px solid #e2e8f0' }}>(item) =&gt; ReactNode</td><td style={{ padding: 8, borderBottom: '1px solid #e2e8f0' }}>-</td><td style={{ padding: 8, borderBottom: '1px solid #e2e8f0' }}>Custom renderer for leaf items</td></tr>
                  <tr><td style={{ padding: 8, borderBottom: '1px solid #e2e8f0' }}>templateGroup</td><td style={{ padding: 8, borderBottom: '1px solid #e2e8f0' }}>(item, count) =&gt; ReactNode</td><td style={{ padding: 8, borderBottom: '1px solid #e2e8f0' }}>-</td><td style={{ padding: 8, borderBottom: '1px solid #e2e8f0' }}>Custom renderer for group headers</td></tr>
                  <tr><td style={{ padding: 8, borderBottom: '1px solid #e2e8f0' }}>templateBack</td><td style={{ padding: 8, borderBottom: '1px solid #e2e8f0' }}>(item, count) =&gt; ReactNode</td><td style={{ padding: 8, borderBottom: '1px solid #e2e8f0' }}>-</td><td style={{ padding: 8, borderBottom: '1px solid #e2e8f0' }}>Custom renderer for back header</td></tr>
                  <tr><td style={{ padding: 8, borderBottom: '1px solid #e2e8f0' }}>animate</td><td style={{ padding: 8, borderBottom: '1px solid #e2e8f0' }}>boolean</td><td style={{ padding: 8, borderBottom: '1px solid #e2e8f0' }}>true</td><td style={{ padding: 8, borderBottom: '1px solid #e2e8f0' }}>Enable slide animations</td></tr>
                  <tr><td style={{ padding: 8, borderBottom: '1px solid #e2e8f0' }}>select</td><td style={{ padding: 8, borderBottom: '1px solid #e2e8f0' }}>boolean</td><td style={{ padding: 8, borderBottom: '1px solid #e2e8f0' }}>true</td><td style={{ padding: 8, borderBottom: '1px solid #e2e8f0' }}>Enable item selection</td></tr>
                  <tr><td style={{ padding: 8 }}>width/height</td><td style={{ padding: 8 }}>number | string</td><td style={{ padding: 8 }}>-</td><td style={{ padding: 8 }}>Component dimensions</td></tr>
                </tbody>
              </table>

              <h4 style={{ marginTop: 24 }}>GroupListItem Interface</h4>
              <pre style={{ background: 'var(--avakio-bg-secondary, #f8fafc)', padding: 12, borderRadius: 4, overflow: 'auto' }}>
{`interface GroupListItem {
  id: string | number;      // Unique identifier
  value: string;            // Display text
  icon?: ReactNode;         // Optional icon
  data?: GroupListItem[];   // Child items (makes this a group)
  disabled?: boolean;       // Disable item
}`}
              </pre>
            </div>,
          ]}
        />
      </section>
    </div>
  );
}




















