import React, { useState, useRef } from "react";
import { AvakioMultiCombo, AvakioMultiComboOption } from "../../components/avakio/ui-controls/avakio-multicombo/avakio-multicombo";
import { AvakioViewHeader } from "../../components/avakio/ui-widgets/avakio-view-header/avakio-view-header";
import { AvakioTabBar } from "../../components/avakio/ui-controls/avakio-tabbar/avakio-tabbar";
import { AvakioTemplate } from "../../components/avakio/views/avakio-template/avakio-template";
import { AvakioLayout } from "../../components/avakio/layouts/avakio-layout/avakio-layout";
import { List, Hash, Ban, Settings, FileText } from "lucide-react";

// Sample options for demos
const FRUIT_OPTIONS: AvakioMultiComboOption[] = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "cherry", label: "Cherry" },
  { value: "date", label: "Date" },
  { value: "elderberry", label: "Elderberry" },
  { value: "fig", label: "Fig" },
  { value: "grape", label: "Grape" },
  { value: "honeydew", label: "Honeydew" },
];

const SKILL_OPTIONS: AvakioMultiComboOption[] = [
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "react", label: "React" },
  { value: "nodejs", label: "Node.js" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "csharp", label: "C#" },
  { value: "go", label: "Go" },
  { value: "rust", label: "Rust" },
  { value: "swift", label: "Swift" },
];

const COUNTRY_OPTIONS: AvakioMultiComboOption[] = [
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "ca", label: "Canada" },
  { value: "de", label: "Germany" },
  { value: "fr", label: "France" },
  { value: "jp", label: "Japan" },
  { value: "au", label: "Australia" },
  { value: "br", label: "Brazil" },
];

// Tab options for navigation
const TAB_OPTIONS = [
  { id: 'basic', label: 'Basic Usage', icon: <List size={14} /> },
  { id: 'count', label: 'Count Display', icon: <Hash size={14} /> },
  { id: 'disabled', label: 'Disabled State', icon: <Ban size={14} /> },
  { id: 'features', label: 'Features', icon: <Settings size={14} /> },
  { id: 'docs', label: 'Documentation', icon: <FileText size={14} /> },
];

export function AvakioMultiComboExample({ theme = 'material' }: { theme?: string }) {
  const [activeSection, setActiveSection] = useState<string | number | null>('basic');
  
  // Basic usage states
  const [selectedFruits, setSelectedFruits] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>(["javascript", "typescript"]);
  
  // Count display states
  const [selectedCountries, setSelectedCountries] = useState<string[]>(["us", "uk", "ca"]);
  const [selectedSkillsCount, setSelectedSkillsCount] = useState<string[]>(["react", "nodejs", "python", "java"]);
  
  // Max display states
  const [selectedMaxDisplay, setSelectedMaxDisplay] = useState<string[]>(["apple", "banana", "cherry", "date", "elderberry"]);
  
  // Disabled state
  const [disabledSelection, setDisabledSelection] = useState<string[]>(["javascript", "react"]);

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
    <div className="avakio-multicombo-demo-container">
      {/* Sticky Header + Tab Navigation */}
      <div className="avakio-multicombo-sticky-header">
        {/* Header */}
        <AvakioViewHeader
          label="UI Controls"
          title="MultiCombo Component"
          subTitle="A multi-select dropdown with search, chips, and bulk actions. Supports count display mode, max display items, and disabled state."
          isSticky={false}
        />

        {/* Tab Navigation */}
        <div className="avakio-multicombo-tabbar-container">
          <AvakioTabBar
            id="multicombo-demo-tabs"
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
        className="avakio-multicombo-demo-section"
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
          content="Default multi-select with search and removable chips. Click the dropdown to select items, use the search to filter, and click the X to remove items."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioMultiCombo
              key="fruits-combo"
              id="fruits-multicombo"
              options={FRUIT_OPTIONS}
              value={selectedFruits}
              onChange={setSelectedFruits}
              placeholder="Select fruits..."
            />,
            <div key="fruits-value" className="avakio-multicombo-value-display">
              Selected: <strong>{selectedFruits.length > 0 ? selectedFruits.join(", ") : "None"}</strong>
            </div>,
          ]}
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioMultiCombo
              key="skills-combo"
              id="skills-multicombo"
              options={SKILL_OPTIONS}
              value={selectedSkills}
              onChange={setSelectedSkills}
              placeholder="Select skills..."
            />,
            <div key="skills-value" className="avakio-multicombo-value-display">
              Selected Skills: <strong>{selectedSkills.length > 0 ? selectedSkills.join(", ") : "None"}</strong>
            </div>,
          ]}
        />
      </section>

      {/* Count Display Section */}
      <section 
        ref={(el) => { sectionRefs.current['count'] = el; }}
        className="avakio-multicombo-demo-section"
      >
        <AvakioTemplate
          type="section"
          borderType="clean"
          content="Count Display Mode"
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="Use the showCount prop to display the number of selected items instead of chips. This is useful when many items can be selected."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioMultiCombo
              key="countries-count"
              id="countries-count-multicombo"
              options={COUNTRY_OPTIONS}
              value={selectedCountries}
              onChange={setSelectedCountries}
              placeholder="Select countries..."
              showCount
            />,
            <div key="countries-value" className="avakio-multicombo-value-display">
              Selected Countries: <strong>{selectedCountries.length}</strong>
            </div>,
          ]}
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioMultiCombo
              key="skills-count"
              id="skills-count-multicombo"
              options={SKILL_OPTIONS}
              value={selectedSkillsCount}
              onChange={setSelectedSkillsCount}
              placeholder="Select technologies..."
              showCount
            />,
            <div key="skills-count-value" className="avakio-multicombo-value-display">
              Selected Technologies: <strong>{selectedSkillsCount.length}</strong>
            </div>,
          ]}
        />
      </section>

      {/* Disabled State Section */}
      <section 
        ref={(el) => { sectionRefs.current['disabled'] = el; }}
        className="avakio-multicombo-demo-section"
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
          content="When disabled, the component shows selected items but prevents interaction. The dropdown cannot be opened and chips cannot be removed."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioMultiCombo
              key="disabled-combo"
              id="disabled-multicombo"
              options={SKILL_OPTIONS}
              value={disabledSelection}
              onChange={setDisabledSelection}
              placeholder="Select skills..."
              disabled
            />,
            <div key="disabled-value" className="avakio-multicombo-value-display">
              Disabled State: <strong>Cannot interact</strong>
            </div>,
          ]}
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioMultiCombo
              key="disabled-count"
              id="disabled-count-multicombo"
              options={COUNTRY_OPTIONS}
              value={["us", "uk"]}
              onChange={() => {}}
              placeholder="Select countries..."
              showCount
              disabled
            />,
            <div key="disabled-count-value" className="avakio-multicombo-value-display">
              Disabled with Count Display: <strong>2 items selected</strong>
            </div>,
          ]}
        />
      </section>

      {/* Features Section */}
      <section 
        ref={(el) => { sectionRefs.current['features'] = el; }}
        className="avakio-multicombo-demo-section"
      >
        <AvakioTemplate
          type="section"
          borderType="clean"
          content="Max Display Items"
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="Use maxDisplayItems to limit how many chips are shown. Additional selections are shown as '+N more'. This prevents the component from growing too large."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioMultiCombo
              key="max-display-combo"
              id="max-display-multicombo"
              options={FRUIT_OPTIONS}
              value={selectedMaxDisplay}
              onChange={setSelectedMaxDisplay}
              placeholder="Select fruits..."
              maxDisplayItems={3}
            />,
            <div key="max-display-value" className="avakio-multicombo-value-display">
              Total Selected: <strong>{selectedMaxDisplay.length}</strong> (showing max 3 chips)
            </div>,
          ]}
        />
        <AvakioTemplate
          type="section"
          borderType="clean"
          content="Select All / Deselect All"
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="The dropdown includes Select All and Deselect All buttons for bulk actions. These actions work with the filtered list when searching."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioMultiCombo
              key="bulk-actions-combo"
              id="bulk-actions-multicombo"
              options={SKILL_OPTIONS}
              value={selectedSkills}
              onChange={setSelectedSkills}
              placeholder="Try Select All / Deselect All..."
            />,
            <div key="bulk-value" className="avakio-multicombo-value-display">
              Try using the bulk action buttons in the dropdown!
            </div>,
          ]}
        />
      </section>

      {/* Documentation Section */}
      <section 
        ref={(el) => { sectionRefs.current['docs'] = el; }}
        className="avakio-multicombo-demo-section"
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
            <div key="props-table" className="avakio-multicombo-props-table">
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
                    <td><code>options</code></td>
                    <td><code>AvakioMultiComboOption[]</code></td>
                    <td><code>[]</code></td>
                    <td>Array of options with value and label</td>
                  </tr>
                  <tr>
                    <td><code>value</code></td>
                    <td><code>string[]</code></td>
                    <td><code>[]</code></td>
                    <td>Array of selected values</td>
                  </tr>
                  <tr>
                    <td><code>onChange</code></td>
                    <td><code>(values: string[]) =&gt; void</code></td>
                    <td>-</td>
                    <td>Callback when selection changes</td>
                  </tr>
                  <tr>
                    <td><code>placeholder</code></td>
                    <td><code>string</code></td>
                    <td><code>"Select items..."</code></td>
                    <td>Placeholder text when empty</td>
                  </tr>
                  <tr>
                    <td><code>showCount</code></td>
                    <td><code>boolean</code></td>
                    <td><code>false</code></td>
                    <td>Show count instead of chips</td>
                  </tr>
                  <tr>
                    <td><code>maxDisplayItems</code></td>
                    <td><code>number</code></td>
                    <td><code>undefined</code></td>
                    <td>Max chips to display before "+N more"</td>
                  </tr>
                  <tr>
                    <td><code>disabled</code></td>
                    <td><code>boolean</code></td>
                    <td><code>false</code></td>
                    <td>Disable the component</td>
                  </tr>
                  <tr>
                    <td><code>id</code></td>
                    <td><code>string</code></td>
                    <td><code>undefined</code></td>
                    <td>Unique identifier for the component</td>
                  </tr>
                  <tr>
                    <td><code>testId</code></td>
                    <td><code>string</code></td>
                    <td><code>undefined</code></td>
                    <td>Test ID for testing purposes</td>
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
            <div key="code-example" className="avakio-multicombo-code-example">
              <pre>
{`import { AvakioMultiCombo } from "../../components/avakio/ui-controls/avakio-multicombo/avakio-multicombo";

const options = [
  { value: "1", label: "Option 1" },
  { value: "2", label: "Option 2" },
  { value: "3", label: "Option 3" },
];

function MyComponent() {
  const [selected, setSelected] = useState<string[]>([]);

  return (
    <AvakioMultiCombo
      options={options}
      value={selected}
      onChange={setSelected}
      placeholder="Select items..."
      showCount={false}
      maxDisplayItems={5}
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

export default AvakioMultiComboExample;




















