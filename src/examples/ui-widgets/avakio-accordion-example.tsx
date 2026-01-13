import React, { useState, useRef, useEffect } from 'react';
import { AvakioAccordion, AvakioAccordionItem, AvakioAccordionRef, AvakioAccordionTheme } from '../../components/avakio/ui-widgets/avakio-accordion';
import './avakio-accordion-example.css';
import { 
  PanelTopClose, 
  Settings, 
  Code, 
  Layers, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  CreditCard, 
  Shield, 
  Bell,
  Palette,
  Database,
  FileText,
  Image,
  Music,
  Video,
  ChevronUp,
  ChevronLeft
} from 'lucide-react';
import { AvakioViewHeader } from '../../components/avakio/ui-widgets/avakio-view-header/avakio-view-header';
import { AvakioTemplate } from '../../components/avakio/views/avakio-template/avakio-template';
import { AvakioLayout } from '../../components/avakio/layouts/avakio-layout/avakio-layout';
import { AvakioTabBar } from '../../components/avakio/ui-controls/avakio-tabbar/avakio-tabbar';
import { AvakioButton } from '../../components/avakio/ui-controls/avakio-button/avakio-button';

// Tab options for navigation
const TAB_OPTIONS = [
  { id: 'basic', label: 'Basic Accordion', icon: <PanelTopClose size={14} /> },
  { id: 'multi', label: 'Multi Mode', icon: <Layers size={14} /> },
  { id: 'customization', label: 'Customization', icon: <Settings size={14} /> },
  { id: 'horizontal', label: 'Horizontal', icon: <Palette size={14} /> },
  { id: 'api', label: 'API Reference', icon: <Code size={14} /> },
];

// Sample data: Basic accordion items
const basicAccordionItems: AvakioAccordionItem[] = [
  {
    id: 'personal',
    header: 'Personal Information',
    icon: <User size={18} />,
    body: (
      <div className="accordion-demo-content">
        <div className="demo-field">
          <label>Full Name</label>
          <p>John Doe</p>
        </div>
        <div className="demo-field">
          <label>Date of Birth</label>
          <p>January 15, 1990</p>
        </div>
        <div className="demo-field">
          <label>Occupation</label>
          <p>Software Engineer</p>
        </div>
      </div>
    ),
  },
  {
    id: 'contact',
    header: 'Contact Details',
    icon: <Mail size={18} />,
    collapsed: true,
    body: (
      <div className="accordion-demo-content">
        <div className="demo-field">
          <label><Mail size={14} /> Email</label>
          <p>john.doe@example.com</p>
        </div>
        <div className="demo-field">
          <label><Phone size={14} /> Phone</label>
          <p>+1 (555) 123-4567</p>
        </div>
        <div className="demo-field">
          <label><MapPin size={14} /> Address</label>
          <p>123 Main Street, New York, NY 10001</p>
        </div>
      </div>
    ),
  },
  {
    id: 'payment',
    header: 'Payment Methods',
    icon: <CreditCard size={18} />,
    collapsed: true,
    body: (
      <div className="accordion-demo-content">
        <div className="demo-card">
          <CreditCard size={24} />
          <div>
            <strong>Visa ending in 4242</strong>
            <p>Expires 12/2026</p>
          </div>
        </div>
        <div className="demo-card">
          <CreditCard size={24} />
          <div>
            <strong>MasterCard ending in 8888</strong>
            <p>Expires 06/2025</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'security',
    header: 'Security Settings',
    icon: <Shield size={18} />,
    collapsed: true,
    body: (
      <div className="accordion-demo-content">
        <div className="demo-setting">
          <div>
            <strong>Two-Factor Authentication</strong>
            <p>Add an extra layer of security</p>
          </div>
          <span className="badge enabled">Enabled</span>
        </div>
        <div className="demo-setting">
          <div>
            <strong>Login Notifications</strong>
            <p>Get notified of new sign-ins</p>
          </div>
          <span className="badge enabled">Enabled</span>
        </div>
        <div className="demo-setting">
          <div>
            <strong>Password Last Changed</strong>
            <p>30 days ago</p>
          </div>
          <button className="demo-link">Change Password</button>
        </div>
      </div>
    ),
  },
];

// Sample data: Settings accordion
const settingsAccordionItems: AvakioAccordionItem[] = [
  {
    id: 'notifications',
    header: 'Notification Preferences',
    icon: <Bell size={18} />,
    body: (
      <div className="accordion-demo-content">
        <p>Configure how you receive notifications from the application.</p>
        <div className="demo-checkboxes">
          <label><input type="checkbox" defaultChecked /> Email notifications</label>
          <label><input type="checkbox" defaultChecked /> Push notifications</label>
          <label><input type="checkbox" /> SMS notifications</label>
        </div>
      </div>
    ),
  },
  {
    id: 'appearance',
    header: 'Appearance Settings',
    icon: <Palette size={18} />,
    body: (
      <div className="accordion-demo-content">
        <p>Customize the look and feel of your interface.</p>
        <div className="demo-options">
          <label>Theme: <select><option>Light</option><option>Dark</option><option>System</option></select></label>
          <label>Font Size: <select><option>Small</option><option>Medium</option><option>Large</option></select></label>
        </div>
      </div>
    ),
  },
  {
    id: 'data',
    header: 'Data & Storage',
    icon: <Database size={18} />,
    collapsed: true,
    body: (
      <div className="accordion-demo-content">
        <p>Manage your data and storage preferences.</p>
        <div className="demo-stats">
          <div className="stat">
            <span className="stat-value">2.4 GB</span>
            <span className="stat-label">Used Storage</span>
          </div>
          <div className="stat">
            <span className="stat-value">7.6 GB</span>
            <span className="stat-label">Available</span>
          </div>
        </div>
      </div>
    ),
  },
];

// Sample data: FAQ accordion
const faqAccordionItems: AvakioAccordionItem[] = [
  {
    id: 'faq-1',
    header: 'What is an Accordion component?',
    body: (
      <div className="accordion-demo-content">
        <p>
          An Accordion is a UI component that displays a vertically stacked list of items. 
          Each item can be "expanded" or "collapsed" to reveal or hide content associated with that item. 
          Accordions are useful for showing and hiding content in a limited space.
        </p>
      </div>
    ),
  },
  {
    id: 'faq-2',
    header: 'How do I use the multi mode?',
    collapsed: true,
    body: (
      <div className="accordion-demo-content">
        <p>
          The multi mode allows you to expand multiple panels at once. Set the <code>multi</code> prop to:
        </p>
        <ul>
          <li><code>true</code> - All panels can be expanded/collapsed independently</li>
          <li><code>false</code> - Only one panel can be expanded at a time (default)</li>
          <li><code>"mixed"</code> - Multiple panels can be open, but at least one must remain visible</li>
        </ul>
      </div>
    ),
  },
  {
    id: 'faq-3',
    header: 'Can I customize the icons?',
    collapsed: true,
    body: (
      <div className="accordion-demo-content">
        <p>
          Yes! You can customize the expand/collapse icons using the <code>expandIcon</code> and 
          <code>collapseIcon</code> props. You can also add custom icons to each accordion item 
          using the <code>icon</code> property in the item configuration.
        </p>
      </div>
    ),
  },
  {
    id: 'faq-4',
    header: 'Is keyboard navigation supported?',
    collapsed: true,
    body: (
      <div className="accordion-demo-content">
        <p>
          Yes, full keyboard navigation is supported:
        </p>
        <ul>
          <li><kbd>Enter</kbd> or <kbd>Space</kbd> - Toggle the focused panel</li>
          <li><kbd>↑</kbd> / <kbd>↓</kbd> - Navigate between panels</li>
          <li><kbd>Home</kbd> - Go to first panel</li>
          <li><kbd>End</kbd> - Go to last panel</li>
        </ul>
      </div>
    ),
  },
];

// Sample data: Horizontal accordion items
const horizontalAccordionItems: AvakioAccordionItem[] = [
  {
    id: 'documents',
    header: 'Documents',
    icon: <FileText size={18} />,
    body: (
      <div className="accordion-demo-content horizontal-content">
        <h4>Recent Documents</h4>
        <ul>
          <li>Project Proposal.pdf</li>
          <li>Meeting Notes.docx</li>
          <li>Budget Report.xlsx</li>
          <li>Presentation.pptx</li>
        </ul>
      </div>
    ),
  },
  {
    id: 'images',
    header: 'Images',
    icon: <Image size={18} />,
    collapsed: true,
    body: (
      <div className="accordion-demo-content horizontal-content">
        <h4>Photo Library</h4>
        <div className="demo-image-grid">
          <div className="demo-image-placeholder">Photo 1</div>
          <div className="demo-image-placeholder">Photo 2</div>
          <div className="demo-image-placeholder">Photo 3</div>
          <div className="demo-image-placeholder">Photo 4</div>
        </div>
      </div>
    ),
  },
  {
    id: 'media',
    header: 'Media',
    icon: <Music size={18} />,
    collapsed: true,
    body: (
      <div className="accordion-demo-content horizontal-content">
        <h4>Media Files</h4>
        <ul>
          <li><Music size={14} /> Summer Mix.mp3</li>
          <li><Video size={14} /> Tutorial.mp4</li>
          <li><Music size={14} /> Podcast Episode.mp3</li>
        </ul>
      </div>
    ),
  },
];

// Theme options
const THEME_OPTIONS: { value: AvakioAccordionTheme; label: string }[] = [
  { value: 'material', label: 'Material' },
  { value: 'dark', label: 'Dark' },
  { value: 'ocean', label: 'Ocean' },
  { value: 'sunset', label: 'Sunset' },
  { value: 'flat', label: 'Flat' },
  { value: 'compact', label: 'Compact' },
];

export const AvakioAccordionExample: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string | number | null>('basic');
  
  const accordionRef = useRef<AvakioAccordionRef>(null);

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
    <div className="avakio-accordion-demo-container">
      {/* Sticky Header + Tab Navigation */}
      <div className="avakio-example-sticky-header">
        <AvakioViewHeader
          label="UI Widgets"
          title="Accordion Component"
          subTitle="A collapsible accordion component for organizing content into expandable panels. Supports multi-expand modes, horizontal layout, and custom icons."
          isSticky={false}
        />

        <div className="avakio-example-tabbar-container">
          <AvakioTabBar
            id="accordion-demo-tabs"
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

      {/* Basic Accordion Section */}
      <section
        ref={(el) => { sectionRefs.current['basic'] = el; }}
        className="avakio-accordion-demo-section"
      >
        <AvakioTemplate
          type="section"
          borderType="clean"
          content="Basic Accordion"
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="Single-expand mode (default). Only one panel can be open at a time."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <div key="basic-demo" className="avakio-accordion-demo-wrapper">
              <AvakioAccordion
                ref={accordionRef}
                items={basicAccordionItems}
                theme="material"
                multi={false}
                onExpand={(id) => console.log('Expanded:', id)}
                onCollapse={(id) => console.log('Collapsed:', id)}
              />
            </div>,
            <div key="basic-actions" className="avakio-accordion-actions">
              <AvakioButton
                label="Expand Contact"
                size="sm"
                variant="secondary"
                onClick={() => accordionRef.current?.expand('contact')}
              />
              <AvakioButton
                label="Collapse Personal"
                size="sm"
                variant="secondary"
                onClick={() => accordionRef.current?.collapse('personal')}
              />
            </div>,
          ]}
        />
      </section>

      {/* Multi Mode Section */}
      <section
        ref={(el) => { sectionRefs.current['multi'] = el; }}
        className="avakio-accordion-demo-section"
      >
        <AvakioTemplate
          type="section"
          borderType="clean"
          content="Multi-Expand Modes"
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="Control how multiple panels can be expanded simultaneously."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <div key="multi-grid" className="avakio-accordion-multi-grid">
              <div className="avakio-accordion-multi-item">
                <span className="avakio-accordion-multi-label">multi: true</span>
                <span className="avakio-accordion-multi-desc">All panels can expand/collapse independently</span>
                <AvakioAccordion
                  items={settingsAccordionItems}
                  theme="material"
                  multi={true}
                />
              </div>
              <div className="avakio-accordion-multi-item">
                <span className="avakio-accordion-multi-label">multi: "mixed"</span>
                <span className="avakio-accordion-multi-desc">Multiple can open, but one must stay visible</span>
                <AvakioAccordion
                  items={faqAccordionItems}
                  theme="material"
                  multi="mixed"
                />
              </div>
            </div>,
          ]}
        />
      </section>

      {/* Customization Section */}
      <section
        ref={(el) => { sectionRefs.current['customization'] = el; }}
        className="avakio-accordion-demo-section"
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
          content="Customize icons, animations, and disabled states."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <div key="custom-grid" className="avakio-accordion-custom-grid">
              <div className="avakio-accordion-custom-item">
                <span className="avakio-accordion-custom-label">Custom Icons</span>
                <AvakioAccordion
                  items={[
                    { id: '1', header: 'First Panel', body: <p>Content for the first panel.</p> },
                    { id: '2', header: 'Second Panel', body: <p>Content for the second panel.</p>, collapsed: true },
                    { id: '3', header: 'Third Panel', body: <p>Content for the third panel.</p>, collapsed: true },
                  ]}
                  theme="material"
                  multi={true}
                  expandIcon={<ChevronUp size={18} />}
                  collapseIcon={<ChevronLeft size={18} />}
                />
              </div>
              <div className="avakio-accordion-custom-item">
                <span className="avakio-accordion-custom-label">Disabled Items</span>
                <AvakioAccordion
                  items={[
                    { id: '1', header: 'Active Panel', body: <p>This panel is active.</p> },
                    { id: '2', header: 'Disabled Panel', body: <p>Disabled content.</p>, collapsed: true, disabled: true },
                    { id: '3', header: 'Another Active', body: <p>Also active.</p>, collapsed: true },
                  ]}
                  theme="material"
                  multi={true}
                />
              </div>
              <div className="avakio-accordion-custom-item">
                <span className="avakio-accordion-custom-label">No Toggle Icons</span>
                <AvakioAccordion
                  items={[
                    { id: '1', header: 'Clean Header 1', body: <p>Content without toggle icon.</p> },
                    { id: '2', header: 'Clean Header 2', body: <p>More content.</p>, collapsed: true },
                  ]}
                  theme="material"
                  showIcons={false}
                />
              </div>
            </div>,
          ]}
        />
      </section>

      {/* Horizontal Section */}
      <section
        ref={(el) => { sectionRefs.current['horizontal'] = el; }}
        className="avakio-accordion-demo-section"
      >
        <AvakioTemplate
          type="section"
          borderType="clean"
          content="Horizontal Layout"
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="Accordion with horizontal (columns) layout."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <div key="horizontal-demo" className="avakio-accordion-horizontal-wrapper">
              <AvakioAccordion
                items={horizontalAccordionItems}
                theme="material"
                type="cols"
                height={300}
              />
            </div>,
          ]}
        />
      </section>

      {/* API Reference Section */}
      <section
        ref={(el) => { sectionRefs.current['api'] = el; }}
        className="avakio-accordion-demo-section"
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
            <div key="props-table" className="avakio-accordion-api-table">
              <h4>Props</h4>
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
                    <td><code>items</code></td>
                    <td><code>AvakioAccordionItem[]</code></td>
                    <td><em>required</em></td>
                    <td>Array of accordion items</td>
                  </tr>
                  <tr>
                    <td><code>multi</code></td>
                    <td><code>boolean | "mixed"</code></td>
                    <td><code>false</code></td>
                    <td>Multi-expand mode</td>
                  </tr>
                  <tr>
                    <td><code>type</code></td>
                    <td><code>"rows" | "cols"</code></td>
                    <td><code>"rows"</code></td>
                    <td>Layout orientation</td>
                  </tr>
                  <tr>
                    <td><code>theme</code></td>
                    <td><code>AvakioAccordionTheme</code></td>
                    <td><code>"material"</code></td>
                    <td>Visual theme</td>
                  </tr>
                  <tr>
                    <td><code>showIcons</code></td>
                    <td><code>boolean</code></td>
                    <td><code>true</code></td>
                    <td>Show toggle icons</td>
                  </tr>
                  <tr>
                    <td><code>animate</code></td>
                    <td><code>boolean</code></td>
                    <td><code>true</code></td>
                    <td>Enable animations</td>
                  </tr>
                </tbody>
              </table>
            </div>,
            <div key="item-table" className="avakio-accordion-api-table">
              <h4 style={{ marginTop: 16, marginBottom: 8 }}>Accordion Item Properties</h4>
              <table>
                <thead>
                  <tr>
                    <th>Property</th>
                    <th>Type</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>id</code></td>
                    <td><code>string | number</code></td>
                    <td>Unique identifier</td>
                  </tr>
                  <tr>
                    <td><code>header</code></td>
                    <td><code>ReactNode</code></td>
                    <td>Header content</td>
                  </tr>
                  <tr>
                    <td><code>body</code></td>
                    <td><code>ReactNode</code></td>
                    <td>Body content</td>
                  </tr>
                  <tr>
                    <td><code>collapsed</code></td>
                    <td><code>boolean</code></td>
                    <td>Initially collapsed</td>
                  </tr>
                  <tr>
                    <td><code>disabled</code></td>
                    <td><code>boolean</code></td>
                    <td>Disable the item</td>
                  </tr>
                  <tr>
                    <td><code>icon</code></td>
                    <td><code>ReactNode</code></td>
                    <td>Custom header icon</td>
                  </tr>
                </tbody>
              </table>
            </div>,
            <div key="methods-table" className="avakio-accordion-api-table">
              <h4 style={{ marginTop: 16, marginBottom: 8 }}>Imperative Methods (via ref)</h4>
              <table>
                <thead>
                  <tr>
                    <th>Method</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>expand(id)</code></td>
                    <td>Expand an item by ID</td>
                  </tr>
                  <tr>
                    <td><code>collapse(id)</code></td>
                    <td>Collapse an item by ID</td>
                  </tr>
                  <tr>
                    <td><code>toggle(id)</code></td>
                    <td>Toggle an item by ID</td>
                  </tr>
                  <tr>
                    <td><code>expandAll() / collapseAll()</code></td>
                    <td>Expand or collapse all items</td>
                  </tr>
                  <tr>
                    <td><code>getExpandedIds()</code></td>
                    <td>Get array of expanded IDs</td>
                  </tr>
                  <tr>
                    <td><code>isExpanded(id) / isDisabled(id)</code></td>
                    <td>Check item state</td>
                  </tr>
                  <tr>
                    <td><code>enable(id) / disable(id)</code></td>
                    <td>Enable or disable an item</td>
                  </tr>
                </tbody>
              </table>
            </div>,
            <div key="usage-code" className="avakio-accordion-code">
              <pre>{`import { AvakioAccordion, AvakioAccordionItem, AvakioAccordionRef } from '../../components/avakio/ui-controls/avakio-accordion';

const items: AvakioAccordionItem[] = [
  { id: 'item1', header: 'Section 1', body: <Content /> },
  { id: 'item2', header: 'Section 2', body: <Content />, collapsed: true },
];

function MyComponent() {
  const accordionRef = useRef<AvakioAccordionRef>(null);

  return (
    <AvakioAccordion
      ref={accordionRef}
      items={items}
      multi={true}
      theme="material"
      onExpand={(id) => console.log('Expanded:', id)}
      onCollapse={(id) => console.log('Collapsed:', id)}
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

export default AvakioAccordionExample;





















