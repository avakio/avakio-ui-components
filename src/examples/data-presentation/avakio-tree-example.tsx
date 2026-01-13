import React, { useState, useEffect, useRef } from 'react';
import { AvakioTree, AvakioTreeNode, AvakioTreeRef } from '../../components/avakio/data-presentation/avakio-tree/avakio-tree';
import './avakio-tree-example.css';
import { FolderTree, CheckSquare, MousePointer, Keyboard, Settings, Code, Database, Server, Globe, FileCode, FileJson, FileText as FileTextIcon, Image, Music, Video, Archive, Lock, Cloud } from 'lucide-react';
import { AvakioViewHeader } from '../../components/avakio/ui-widgets/avakio-view-header/avakio-view-header';
import { AvakioTemplate } from '../../components/avakio/views/avakio-template/avakio-template';
import { AvakioLayout } from '../../components/avakio/layouts/avakio-layout/avakio-layout';
import { AvakioTabBar } from '../../components/avakio/ui-controls/avakio-tabbar/avakio-tabbar';
import { AvakioButton } from '../../components/avakio/ui-controls/avakio-button/avakio-button';

// Tab options for navigation
const TAB_OPTIONS = [
  { id: 'basic', label: 'Basic Tree', icon: <FolderTree size={14} /> },
  { id: 'checkboxes', label: 'Checkboxes', icon: <CheckSquare size={14} /> },
  { id: 'selection', label: 'Selection', icon: <MousePointer size={14} /> },
  { id: 'customization', label: 'Customization', icon: <Settings size={14} /> },
  { id: 'api', label: 'API Reference', icon: <Code size={14} /> },
];

// Sample data: File system structure
const fileSystemData: AvakioTreeNode[] = [
  {
    id: 'root',
    value: 'My Project',
    open: true,
    data: [
      {
        id: 'src',
        value: 'src',
        open: true,
        data: [
          {
            id: 'components',
            value: 'components',
            data: [
              { id: 'Header.tsx', value: 'Header.tsx', icon: <FileCode size={16} /> },
              { id: 'Footer.tsx', value: 'Footer.tsx', icon: <FileCode size={16} /> },
              { id: 'Sidebar.tsx', value: 'Sidebar.tsx', icon: <FileCode size={16} /> },
            ],
          },
          {
            id: 'pages',
            value: 'pages',
            data: [
              { id: 'index.tsx', value: 'index.tsx', icon: <FileCode size={16} /> },
              { id: 'about.tsx', value: 'about.tsx', icon: <FileCode size={16} /> },
              { id: 'contact.tsx', value: 'contact.tsx', icon: <FileCode size={16} /> },
            ],
          },
          { id: 'App.tsx', value: 'App.tsx', icon: <FileCode size={16} /> },
          { id: 'main.tsx', value: 'main.tsx', icon: <FileCode size={16} /> },
        ],
      },
      {
        id: 'public',
        value: 'public',
        data: [
          { id: 'favicon.ico', value: 'favicon.ico', icon: <Image size={16} /> },
          { id: 'logo.svg', value: 'logo.svg', icon: <Image size={16} /> },
        ],
      },
      { id: 'package.json', value: 'package.json', icon: <FileJson size={16} /> },
      { id: 'tsconfig.json', value: 'tsconfig.json', icon: <FileJson size={16} /> },
      { id: 'README.md', value: 'README.md', icon: <FileTextIcon size={16} /> },
    ],
  },
];

// Sample data: Categories with checkboxes
const categoriesData: AvakioTreeNode[] = [
  {
    id: 'media',
    value: 'Media Files',
    open: true,
    data: [
      {
        id: 'images',
        value: 'Images',
        icon: <Image size={16} />,
        data: [
          { id: 'jpg', value: 'JPEG Files', checked: true },
          { id: 'png', value: 'PNG Files', checked: true },
          { id: 'gif', value: 'GIF Files' },
          { id: 'svg', value: 'SVG Files' },
        ],
      },
      {
        id: 'audio',
        value: 'Audio',
        icon: <Music size={16} />,
        data: [
          { id: 'mp3', value: 'MP3 Files' },
          { id: 'wav', value: 'WAV Files' },
          { id: 'flac', value: 'FLAC Files' },
        ],
      },
      {
        id: 'video',
        value: 'Video',
        icon: <Video size={16} />,
        data: [
          { id: 'mp4', value: 'MP4 Files' },
          { id: 'mkv', value: 'MKV Files' },
          { id: 'avi', value: 'AVI Files' },
        ],
      },
    ],
  },
  {
    id: 'documents',
    value: 'Documents',
    open: true,
    data: [
      { id: 'pdf', value: 'PDF Documents' },
      { id: 'word', value: 'Word Documents' },
      { id: 'excel', value: 'Excel Spreadsheets' },
    ],
  },
  {
    id: 'archives',
    value: 'Archives',
    icon: <Archive size={16} />,
    data: [
      { id: 'zip', value: 'ZIP Files' },
      { id: 'rar', value: 'RAR Files' },
      { id: 'tar', value: 'TAR Files' },
    ],
  },
];

// Sample data: Server structure
const serverData: AvakioTreeNode[] = [
  {
    id: 'infrastructure',
    value: 'Infrastructure',
    icon: <Cloud size={16} />,
    openIcon: <Cloud size={16} />,
    open: true,
    data: [
      {
        id: 'production',
        value: 'Production',
        icon: <Server size={16} />,
        data: [
          { id: 'web-1', value: 'web-server-1', icon: <Globe size={16} /> },
          { id: 'web-2', value: 'web-server-2', icon: <Globe size={16} /> },
          { id: 'db-1', value: 'database-primary', icon: <Database size={16} /> },
          { id: 'db-2', value: 'database-replica', icon: <Database size={16} /> },
        ],
      },
      {
        id: 'staging',
        value: 'Staging',
        icon: <Server size={16} />,
        data: [
          { id: 'staging-web', value: 'staging-web', icon: <Globe size={16} /> },
          { id: 'staging-db', value: 'staging-db', icon: <Database size={16} /> },
        ],
      },
      {
        id: 'development',
        value: 'Development',
        icon: <Server size={16} />,
        data: [
          { id: 'dev-local', value: 'local-dev', icon: <Globe size={16} /> },
        ],
      },
    ],
  },
  {
    id: 'security',
    value: 'Security',
    icon: <Lock size={16} />,
    data: [
      { id: 'firewall', value: 'Firewall Rules' },
      { id: 'ssl', value: 'SSL Certificates' },
      { id: 'keys', value: 'API Keys' },
    ],
  },
];

export function AvakioTreeExample() {
  
  const [activeSection, setActiveSection] = useState<string | number | null>('basic');

  // Refs for tree instances
  const basicTreeRef = useRef<AvakioTreeRef>(null);
  const checkboxTreeRef = useRef<AvakioTreeRef>(null);
  const selectionTreeRef = useRef<AvakioTreeRef>(null);

  // Demo state
  const [selectedItem, setSelectedItem] = useState<string>('');
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

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
    <div className="avakio-tree-demo-container">
      {/* Sticky Header + Tab Navigation */}
      <div className="avakio-example-sticky-header">
        <AvakioViewHeader
          label="UI Widgets"
          title="Tree Component"
          subTitle="A hierarchical tree component for displaying nested data structures. Supports selection, checkboxes with three-state, expand/collapse, keyboard navigation, and custom icons."
          isSticky={false}
        />

        <div className="avakio-example-tabbar-container">
          <AvakioTabBar
            id="tree-demo-tabs"
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

      {/* Basic Tree Section */}
      <section
        ref={(el) => { sectionRefs.current['basic'] = el; }}
        className="avakio-tree-demo-section"
      >
        <AvakioTemplate
          type="section"
          borderType="clean"
          content="Basic Tree"
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="A simple tree displaying a file system structure. Click on branch nodes to expand/collapse. Use arrow keys to navigate."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <div key="basic-tree" className="avakio-tree-demo-wrapper">
              <AvakioTree
                ref={basicTreeRef}
                data={fileSystemData}
                select
                showIcons
                showToggle
                height={320}
                onSelect={(id, node) => setSelectedItem(String(node.value))}
              />
            </div>,
            <div key="basic-result" className="avakio-tree-result">
              Selected: <strong>{selectedItem || 'None'}</strong>
            </div>,
            <div key="basic-actions" className="avakio-tree-actions">
              <AvakioButton
                label="Expand All"
                size="sm"
                variant="primary"
                onClick={() => basicTreeRef.current?.openAll()}
              />
              <AvakioButton
                label="Collapse All"
                size="sm"
                variant="secondary"
                onClick={() => basicTreeRef.current?.closeAll()}
              />
            </div>,
          ]}
        />
      </section>

      {/* Checkboxes Section */}
      <section
        ref={(el) => { sectionRefs.current['checkboxes'] = el; }}
        className="avakio-tree-demo-section"
      >
        <AvakioTemplate
          type="section"
          borderType="clean"
          content="Checkboxes with Three-State"
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="Enable checkboxes with threeState={true} to show indeterminate state on parent nodes when only some children are checked."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <div key="checkbox-tree" className="avakio-tree-demo-wrapper">
              <AvakioTree
                ref={checkboxTreeRef}
                data={categoriesData}
                checkbox
                threeState
                select={false}
                showIcons
                height={400}
                onCheck={(id) => {
                  setTimeout(() => {
                    const checked = checkboxTreeRef.current?.getChecked() || [];
                    setCheckedItems(checked.map(String));
                  }, 0);
                }}
              />
            </div>,
            <div key="checkbox-result" className="avakio-tree-result">
              Checked items: <strong>{checkedItems.length > 0 ? checkedItems.join(', ') : 'None'}</strong>
            </div>,
            <div key="checkbox-actions" className="avakio-tree-actions">
              <AvakioButton
                label="Check All"
                size="sm"
                variant="primary"
                onClick={() => {
                  checkboxTreeRef.current?.checkAll();
                  setTimeout(() => {
                    const checked = checkboxTreeRef.current?.getChecked() || [];
                    setCheckedItems(checked.map(String));
                  }, 0);
                }}
              />
              <AvakioButton
                label="Uncheck All"
                size="sm"
                variant="secondary"
                onClick={() => {
                  checkboxTreeRef.current?.uncheckAll();
                  setCheckedItems([]);
                }}
              />
            </div>,
          ]}
        />
      </section>

      {/* Selection Section */}
      <section
        ref={(el) => { sectionRefs.current['selection'] = el; }}
        className="avakio-tree-demo-section"
      >
        <AvakioTemplate
          type="section"
          borderType="clean"
          content="Selection Modes"
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="Single selection (default) or multi-selection with Ctrl+Click. The tree also supports keyboard navigation with arrow keys."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <div key="selection-grid" className="avakio-tree-selection-grid">
              <div className="avakio-tree-selection-item">
                <span className="avakio-tree-selection-label">Single Selection</span>
                <AvakioTree
                  data={serverData}
                  select
                  showIcons
                  height={280}
                />
              </div>
              <div className="avakio-tree-selection-item">
                <span className="avakio-tree-selection-label">Multi Selection (Ctrl+Click)</span>
                <AvakioTree
                  ref={selectionTreeRef}
                  data={serverData}
                  select="multi"
                  showIcons
                  height={280}
                />
              </div>
            </div>,
          ]}
        />
      </section>

      {/* Customization Section */}
      <section
        ref={(el) => { sectionRefs.current['customization'] = el; }}
        className="avakio-tree-demo-section"
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
          content="Customize appearance with showLines, showIcons, showToggle, and custom icons per node."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <div key="custom-grid" className="avakio-tree-custom-grid">
              <div className="avakio-tree-custom-item">
                <span className="avakio-tree-custom-label">With Lines</span>
                <AvakioTree
                  data={fileSystemData}
                  showLines
                  showIcons
                  height={200}
                />
              </div>
              <div className="avakio-tree-custom-item">
                <span className="avakio-tree-custom-label">Without Icons</span>
                <AvakioTree
                  data={fileSystemData}
                  showIcons={false}
                  height={200}
                />
              </div>
              <div className="avakio-tree-custom-item">
                <span className="avakio-tree-custom-label">Custom Icons</span>
                <AvakioTree
                  data={serverData}
                  showIcons
                  height={200}
                />
              </div>
            </div>,
          ]}
        />
      </section>

      {/* API Reference Section */}
      <section
        ref={(el) => { sectionRefs.current['api'] = el; }}
        className="avakio-tree-demo-section"
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
          content="Component properties and imperative methods."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <div key="api-table" className="avakio-tree-api-table">
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
                    <td><code>data</code></td>
                    <td><code>AvakioTreeNode[]</code></td>
                    <td>required</td>
                    <td>Tree data structure</td>
                  </tr>
                  <tr>
                    <td><code>select</code></td>
                    <td><code>boolean | 'multi'</code></td>
                    <td><code>true</code></td>
                    <td>Enable selection mode</td>
                  </tr>
                  <tr>
                    <td><code>checkbox</code></td>
                    <td><code>boolean</code></td>
                    <td><code>false</code></td>
                    <td>Show checkboxes</td>
                  </tr>
                  <tr>
                    <td><code>threeState</code></td>
                    <td><code>boolean</code></td>
                    <td><code>false</code></td>
                    <td>Enable three-state checkboxes</td>
                  </tr>
                  <tr>
                    <td><code>showIcons</code></td>
                    <td><code>boolean</code></td>
                    <td><code>true</code></td>
                    <td>Show node icons</td>
                  </tr>
                  <tr>
                    <td><code>showToggle</code></td>
                    <td><code>boolean</code></td>
                    <td><code>true</code></td>
                    <td>Show expand/collapse toggles</td>
                  </tr>
                  <tr>
                    <td><code>showLines</code></td>
                    <td><code>boolean</code></td>
                    <td><code>false</code></td>
                    <td>Show connecting lines</td>
                  </tr>
                  <tr>
                    <td><code>navigation</code></td>
                    <td><code>boolean</code></td>
                    <td><code>true</code></td>
                    <td>Enable keyboard navigation</td>
                  </tr>
                  <tr>
                    <td><code>editable</code></td>
                    <td><code>boolean</code></td>
                    <td><code>false</code></td>
                    <td>Enable inline editing on double-click</td>
                  </tr>
                  <tr>
                    <td><code>itemHeight</code></td>
                    <td><code>number</code></td>
                    <td><code>32</code></td>
                    <td>Height of each tree item</td>
                  </tr>
                </tbody>
              </table>
            </div>,
            <div key="methods-table" className="avakio-tree-api-table">
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
                    <td><code>select(id)</code></td>
                    <td>Select a node by ID</td>
                  </tr>
                  <tr>
                    <td><code>open(id) / close(id)</code></td>
                    <td>Expand or collapse a branch</td>
                  </tr>
                  <tr>
                    <td><code>openAll() / closeAll()</code></td>
                    <td>Expand or collapse all branches</td>
                  </tr>
                  <tr>
                    <td><code>checkItem(id) / uncheckItem(id)</code></td>
                    <td>Check or uncheck a node</td>
                  </tr>
                  <tr>
                    <td><code>getChecked()</code></td>
                    <td>Get array of checked node IDs</td>
                  </tr>
                  <tr>
                    <td><code>filter(fn) / clearFilter()</code></td>
                    <td>Filter tree nodes</td>
                  </tr>
                  <tr>
                    <td><code>showItem(id)</code></td>
                    <td>Scroll to make item visible</td>
                  </tr>
                </tbody>
              </table>
            </div>,
            <div key="usage-code" className="avakio-tree-code">
              <pre>{`import { AvakioTree, AvakioTreeNode, AvakioTreeRef } from '../../components/avakio/ui-controls/avakio-tree';

const treeData: AvakioTreeNode[] = [
  {
    id: 'root',
    value: 'Root',
    open: true,
    data: [
      { id: 'child1', value: 'Child 1' },
      { id: 'child2', value: 'Child 2', data: [...] },
    ],
  },
];

function MyComponent() {
  const treeRef = useRef<AvakioTreeRef>(null);

  return (
    <AvakioTree
      ref={treeRef}
      data={treeData}
      select
      checkbox
      threeState
      showIcons
      onSelect={(id, node) => console.log('Selected:', node.value)}
      onCheck={(id, checked) => console.log('Checked:', id, checked)}
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

export default AvakioTreeExample;





















