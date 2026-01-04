import React, { useState, useRef } from "react";
import { AvakioDoubleList, AvakioDoubleListItem } from "../../components/avakio/ui-controls/avakio-doublelist/avakio-doublelist";
import { AvakioViewHeader } from "../../components/avakio/ui-widgets/avakio-view-header/avakio-view-header";
import { AvakioTabBar } from "../../components/avakio/ui-controls/avakio-tabbar/avakio-tabbar";
import { AvakioTemplate } from "../../components/avakio/views/avakio-template/avakio-template";
import { AvakioLayout } from "../../components/avakio/layouts/avakio-layout/avakio-layout";
import { List, Settings, Ban, Move, FileText } from "lucide-react";

// Sample data for demos
const SCREEN_OPTIONS: AvakioDoubleListItem[] = [
  { id: "contacts", value: "Contacts" },
  { id: "products", value: "Products" },
  { id: "reports", value: "Reports" },
  { id: "customers", value: "Customers" },
  { id: "deals", value: "Deals" },
  { id: "dashboard", value: "Dashboard" },
  { id: "analytics", value: "Analytics" },
  { id: "settings", value: "Settings" },
];

const PERMISSION_OPTIONS: AvakioDoubleListItem[] = [
  { id: "read", value: "Read Access" },
  { id: "write", value: "Write Access" },
  { id: "delete", value: "Delete Access" },
  { id: "admin", value: "Admin Access" },
  { id: "export", value: "Export Data" },
  { id: "import", value: "Import Data" },
  { id: "share", value: "Share Content" },
  { id: "audit", value: "View Audit Logs", disabled: true },
];

const SKILL_OPTIONS: AvakioDoubleListItem[] = [
  { id: "javascript", value: "JavaScript" },
  { id: "typescript", value: "TypeScript" },
  { id: "react", value: "React" },
  { id: "nodejs", value: "Node.js" },
  { id: "python", value: "Python" },
  { id: "java", value: "Java" },
  { id: "csharp", value: "C#" },
  { id: "go", value: "Go" },
  { id: "rust", value: "Rust" },
  { id: "swift", value: "Swift" },
  { id: "kotlin", value: "Kotlin" },
  { id: "ruby", value: "Ruby" },
];

const USER_OPTIONS: AvakioDoubleListItem[] = [
  { id: "user1", value: "John Smith" },
  { id: "user2", value: "Jane Doe" },
  { id: "user3", value: "Bob Johnson" },
  { id: "user4", value: "Alice Williams" },
  { id: "user5", value: "Charlie Brown" },
  { id: "user6", value: "Diana Ross" },
  { id: "user7", value: "Edward Norton", disabled: true },
  { id: "user8", value: "Fiona Apple" },
];

// Tab options for navigation
const TAB_OPTIONS = [
  { id: 'basic', label: 'Basic Usage', icon: <List size={14} /> },
  { id: 'features', label: 'Features', icon: <Settings size={14} /> },
  { id: 'dragdrop', label: 'Drag & Drop', icon: <Move size={14} /> },
  { id: 'disabled', label: 'Disabled State', icon: <Ban size={14} /> },
  { id: 'docs', label: 'Documentation', icon: <FileText size={14} /> },
];

export function AvakioDoubleListExample() {
  
  const [activeSection, setActiveSection] = useState<string | number | null>('basic');
  
  // Basic usage states
  const [selectedScreens, setSelectedScreens] = useState<string[]>(["contacts", "reports"]);
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>(["read", "write"]);
  
  // Features states
  const [selectedSkills, setSelectedSkills] = useState<string[]>(["javascript", "typescript", "react"]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>(["user1"]);
  
  // Disabled state
  const [disabledSelection, setDisabledSelection] = useState<string[]>(["contacts", "products"]);

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
  

  return (
    <div className="avakio-doublelist-demo-container">
      {/* Sticky Header + Tab Navigation */}
      <div className="avakio-doublelist-sticky-header">
        {/* Header */}
        <AvakioViewHeader
          label="UI Controls"
          title="DoubleList Component"
          subTitle="A dual-list selection widget for moving items between available and selected lists. Supports search, drag-drop, multi-select, and keyboard navigation."
          isSticky={false}
        />

        {/* Tab Navigation */}
        <div className="avakio-doublelist-tabbar-container">
          <AvakioTabBar
            id="doublelist-demo-tabs"
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
        className="avakio-doublelist-demo-section"
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
          content="Select items by clicking, double-clicking to move, or using the arrow buttons. Use Ctrl+Click for multi-select and Shift+Click for range selection."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioDoubleList
              key="screens-list"
              id="screens-doublelist"
              data={SCREEN_OPTIONS}
              value={selectedScreens}
              onChange={setSelectedScreens}
              labelLeft="Available Screens"
              labelRight="Selected Screens"
              listHeight={250}
            />,
            <div key="screens-value" className="avakio-doublelist-value-display">
              Selected: <strong>{selectedScreens.length > 0 ? selectedScreens.join(", ") : "None"}</strong>
            </div>,
          ]}
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioDoubleList
              key="permissions-list"
              id="permissions-doublelist"
              data={PERMISSION_OPTIONS}
              value={selectedPermissions}
              onChange={setSelectedPermissions}
              labelLeft="Available Permissions"
              labelRight="Granted Permissions"
              labelBottomLeft="Disabled items cannot be moved"
              listHeight={220}
            />,
            <div key="permissions-value" className="avakio-doublelist-value-display">
              Granted: <strong>{selectedPermissions.length} permission(s)</strong>
            </div>,
          ]}
        />
      </section>

      {/* Features Section */}
      <section 
        ref={(el) => { sectionRefs.current['features'] = el; }}
        className="avakio-doublelist-demo-section"
      >
        <AvakioTemplate
          type="section"
          borderType="clean"
          content="Search & Custom Labels"
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="Use the search boxes to filter items in each list. Custom labels can be set for top and bottom of each list."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioDoubleList
              key="skills-list"
              id="skills-doublelist"
              data={SKILL_OPTIONS}
              value={selectedSkills}
              onChange={setSelectedSkills}
              labelLeft="All Skills"
              labelRight="Your Skills"
              labelBottomLeft="Double-click to add"
              labelBottomRight="Double-click to remove"
              listHeight={280}
              searchable={true}
            />,
            <div key="skills-value" className="avakio-doublelist-value-display">
              Your Skills: <strong>{selectedSkills.length}</strong>
            </div>,
          ]}
        />
        <AvakioTemplate
          type="section"
          borderType="clean"
          content="Without Buttons"
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="Hide the control buttons and rely on double-click or drag-drop to move items."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioDoubleList
              key="users-no-buttons"
              id="users-no-buttons-doublelist"
              data={USER_OPTIONS}
              value={selectedUsers}
              onChange={setSelectedUsers}
              labelLeft="All Users"
              labelRight="Team Members"
              showButtons={false}
              listHeight={200}
            />,
            <div key="users-value" className="avakio-doublelist-value-display">
              Team Members: <strong>{selectedUsers.length}</strong>
            </div>,
          ]}
        />
      </section>

      {/* Drag & Drop Section */}
      <section 
        ref={(el) => { sectionRefs.current['dragdrop'] = el; }}
        className="avakio-doublelist-demo-section"
      >
        <AvakioTemplate
          type="section"
          borderType="clean"
          content="Drag & Drop"
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="Drag items between lists using the grip handle. Drop zones highlight when dragging over them."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioDoubleList
              key="dragdrop-list"
              id="dragdrop-doublelist"
              data={SCREEN_OPTIONS}
              value={selectedScreens}
              onChange={setSelectedScreens}
              labelLeft="Available"
              labelRight="Selected"
              draggable={true}
              listHeight={250}
            />,
            <div key="dragdrop-hint" className="avakio-doublelist-value-display">
              Tip: Drag items by the grip handle or double-click to move
            </div>,
          ]}
        />
        <AvakioTemplate
          type="section"
          borderType="clean"
          content="Without Drag & Drop"
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="Disable drag and drop functionality with draggable=false."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioDoubleList
              key="no-dragdrop-list"
              id="no-dragdrop-doublelist"
              data={SKILL_OPTIONS}
              value={selectedSkills}
              onChange={setSelectedSkills}
              labelLeft="Skills"
              labelRight="Selected Skills"
              draggable={false}
              listHeight={200}
            />,
          ]}
        />
      </section>

      {/* Disabled State Section */}
      <section 
        ref={(el) => { sectionRefs.current['disabled'] = el; }}
        className="avakio-doublelist-demo-section"
      >
        <AvakioTemplate
          type="section"
          borderType="clean"
          content="Disabled State"
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="When disabled, the component shows the current selection but prevents any interaction."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioDoubleList
              key="disabled-list"
              id="disabled-doublelist"
              data={SCREEN_OPTIONS}
              value={disabledSelection}
              onChange={setDisabledSelection}
              labelLeft="Available"
              labelRight="Selected"
              disabled={true}
              listHeight={200}
            />,
            <div key="disabled-value" className="avakio-doublelist-value-display">
              Disabled State: <strong>Cannot interact</strong>
            </div>,
          ]}
        />
        <AvakioTemplate
          type="section"
          borderType="clean"
          content="Disabled Items"
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="Individual items can be disabled, preventing them from being moved between lists."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioDoubleList
              key="disabled-items-list"
              id="disabled-items-doublelist"
              data={USER_OPTIONS}
              value={selectedUsers}
              onChange={setSelectedUsers}
              labelLeft="All Users"
              labelRight="Selected Users"
              labelBottomLeft="Grayed items are disabled"
              listHeight={220}
            />,
          ]}
        />
      </section>

      {/* Documentation Section */}
      <section 
        ref={(el) => { sectionRefs.current['docs'] = el; }}
        className="avakio-doublelist-demo-section"
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
            <div key="props-table" className="avakio-doublelist-props-table">
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
                    <td><code>AvakioDoubleListItem[]</code></td>
                    <td><code>[]</code></td>
                    <td>Array of all available items</td>
                  </tr>
                  <tr>
                    <td><code>value</code></td>
                    <td><code>string[]</code></td>
                    <td><code>[]</code></td>
                    <td>Array of selected item IDs (right list)</td>
                  </tr>
                  <tr>
                    <td><code>onChange</code></td>
                    <td><code>(ids: string[]) =&gt; void</code></td>
                    <td>-</td>
                    <td>Callback when selection changes</td>
                  </tr>
                  <tr>
                    <td><code>labelLeft</code></td>
                    <td><code>string</code></td>
                    <td><code>"Available"</code></td>
                    <td>Label for the left list</td>
                  </tr>
                  <tr>
                    <td><code>labelRight</code></td>
                    <td><code>string</code></td>
                    <td><code>"Selected"</code></td>
                    <td>Label for the right list</td>
                  </tr>
                  <tr>
                    <td><code>labelBottomLeft</code></td>
                    <td><code>string</code></td>
                    <td><code>undefined</code></td>
                    <td>Bottom label for left list</td>
                  </tr>
                  <tr>
                    <td><code>labelBottomRight</code></td>
                    <td><code>string</code></td>
                    <td><code>undefined</code></td>
                    <td>Bottom label for right list</td>
                  </tr>
                  <tr>
                    <td><code>showButtons</code></td>
                    <td><code>boolean</code></td>
                    <td><code>true</code></td>
                    <td>Show/hide control buttons</td>
                  </tr>
                  <tr>
                    <td><code>searchable</code></td>
                    <td><code>boolean</code></td>
                    <td><code>true</code></td>
                    <td>Enable search filter</td>
                  </tr>
                  <tr>
                    <td><code>draggable</code></td>
                    <td><code>boolean</code></td>
                    <td><code>true</code></td>
                    <td>Enable drag and drop</td>
                  </tr>
                  <tr>
                    <td><code>disabled</code></td>
                    <td><code>boolean</code></td>
                    <td><code>false</code></td>
                    <td>Disable the component</td>
                  </tr>
                  <tr>
                    <td><code>listHeight</code></td>
                    <td><code>number | string</code></td>
                    <td><code>300</code></td>
                    <td>Height of each list</td>
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
            <div key="code-example" className="avakio-doublelist-code-example">
              <pre>
{`import { AvakioDoubleList } from "../../components/avakio/ui-controls/avakio-doublelist/avakio-doublelist";

const data = [
  { id: "1", value: "Item 1" },
  { id: "2", value: "Item 2" },
  { id: "3", value: "Item 3", disabled: true },
];

function MyComponent() {
  const [selected, setSelected] = useState<string[]>([]);

  return (
    <AvakioDoubleList
      data={data}
      value={selected}
      onChange={setSelected}
      labelLeft="Available"
      labelRight="Selected"
      searchable={true}
      draggable={true}
      listHeight={300}
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

export default AvakioDoubleListExample;





















