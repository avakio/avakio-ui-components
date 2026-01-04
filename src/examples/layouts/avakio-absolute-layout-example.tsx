import React, { useState, useEffect, useRef } from 'react';
import '../../components/avakio/layouts/avakio-absolute-layout/avakio-absolute-layout.css';
import './avakio-absolute-layout-example.css';
import { AvakioAbsoluteLayout, AvakioAbsoluteLayoutCell, AvakioAbsoluteLayoutRef } from '../../components/avakio/layouts/avakio-absolute-layout';
import { AvakioViewHeader } from '../../components/avakio/ui-widgets/avakio-view-header/avakio-view-header';
import { AvakioTabBar } from '../../components/avakio/ui-controls/avakio-tabbar/avakio-tabbar';
import { AvakioTemplate } from '../../components/avakio/views/avakio-template/avakio-template';
import { AvakioLayout } from '../../components/avakio/layouts/avakio-layout/avakio-layout';
import { AvakioButton } from '../../components/avakio/ui-controls/avakio-button/avakio-button';
import { Move, Layers, Box, Settings, FileText, Plus, Minus } from 'lucide-react';

// Tab options for navigation
const TAB_OPTIONS = [
  { id: 'basic', label: 'Basic Usage', icon: <Move size={14} /> },
  { id: 'relative', label: 'Relative Cells', icon: <Layers size={14} /> },
  { id: 'dynamic', label: 'Dynamic Cells', icon: <Plus size={14} /> },
  { id: 'features', label: 'Features', icon: <Settings size={14} /> },
  { id: 'docs', label: 'Documentation', icon: <FileText size={14} /> },
];

// Basic demo cells
const BASIC_CELLS: AvakioAbsoluteLayoutCell[] = [
  {
    id: 'header',
    content: (
      <div className="demo-cell demo-header">
        Header (top: 0, left: 0)
      </div>
    ),
    top: 0,
    left: 0,
    width: '100%',
    height: 50,
    zIndex: 1,
  },
  {
    id: 'sidebar',
    content: (
      <div className="demo-cell demo-sidebar">
        Sidebar
        <br />
        (top: 50, left: 0)
      </div>
    ),
    top: 50,
    left: 0,
    width: 150,
    bottom: 0,
  },
  {
    id: 'main',
    content: (
      <div className="demo-cell demo-main">
        Main Content Area
        <br />
        (top: 50, left: 150, right: 0, bottom: 50)
      </div>
    ),
    top: 50,
    left: 150,
    right: 0,
    bottom: 50,
  },
  {
    id: 'footer',
    content: (
      <div className="demo-cell demo-footer">
        Footer (bottom: 0, left: 0)
      </div>
    ),
    bottom: 0,
    left: 0,
    width: '100%',
    height: 50,
  },
];

// Form demo cells
const FORM_CELLS: AvakioAbsoluteLayoutCell[] = [
  {
    id: 'name-label',
    content: <label className="demo-label">Name:</label>,
    top: 20,
    left: 20,
    width: 80,
    height: 32,
  },
  {
    id: 'name-input',
    content: <input type="text" className="demo-input" placeholder="Enter name" />,
    top: 20,
    left: 100,
    width: 200,
    height: 32,
  },
  {
    id: 'email-label',
    content: <label className="demo-label">Email:</label>,
    top: 60,
    left: 20,
    width: 80,
    height: 32,
  },
  {
    id: 'email-input',
    content: <input type="email" className="demo-input" placeholder="Enter email" />,
    top: 60,
    left: 100,
    width: 200,
    height: 32,
  },
  {
    id: 'submit-btn',
    content: <button className="demo-button">Submit</button>,
    top: 110,
    left: 100,
    width: 100,
    height: 36,
  },
];

// Relative + Absolute demo cells
const RELATIVE_CELLS: AvakioAbsoluteLayoutCell[] = [
  {
    id: 'background-list',
    content: (
      <div className="demo-cell demo-list">
        <div className="demo-list-item">Item 1 - Full Width Background</div>
        <div className="demo-list-item">Item 2 - Takes all available space</div>
        <div className="demo-list-item">Item 3 - Using relative positioning</div>
        <div className="demo-list-item">Item 4 - Content fills container</div>
        <div className="demo-list-item">Item 5 - Scrollable if needed</div>
      </div>
    ),
    relative: true,
  },
  {
    id: 'floating-button',
    content: (
      <button className="demo-fab">
        <Plus size={20} />
      </button>
    ),
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    zIndex: 10,
  },
];

export function AvakioAbsoluteLayoutExample() {
  
  const [activeSection, setActiveSection] = useState<string | number | null>('basic');
  
  // Refs
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const dynamicLayoutRef = useRef<AvakioAbsoluteLayoutRef>(null);
  
  // Dynamic cells state
  const [dynamicCells, setDynamicCells] = useState<AvakioAbsoluteLayoutCell[]>([
    {
      id: 'cell-1',
      content: <div className="demo-cell demo-dynamic">Cell 1</div>,
      top: 20,
      left: 20,
      width: 120,
      height: 80,
    },
  ]);
  const [cellCounter, setCellCounter] = useState(2);

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
  

  // Add dynamic cell
  const addCell = () => {
    const positions = [
      { top: 20, left: 160 },
      { top: 20, left: 300 },
      { top: 120, left: 20 },
      { top: 120, left: 160 },
      { top: 120, left: 300 },
      { top: 220, left: 20 },
      { top: 220, left: 160 },
      { top: 220, left: 300 },
    ];
    
    const posIndex = (dynamicCells.length) % positions.length;
    const pos = positions[posIndex];
    
    const newCell: AvakioAbsoluteLayoutCell = {
      id: `cell-${cellCounter}`,
      content: <div className="demo-cell demo-dynamic">Cell {cellCounter}</div>,
      top: pos.top,
      left: pos.left,
      width: 120,
      height: 80,
    };
    
    setDynamicCells([...dynamicCells, newCell]);
    setCellCounter(cellCounter + 1);
  };

  // Remove last dynamic cell
  const removeCell = () => {
    if (dynamicCells.length > 0) {
      setDynamicCells(dynamicCells.slice(0, -1));
    }
  };

  return (
    <AvakioLayout type="clean" className="avakio-absolute-layout-example">
      {/* Header */}
      <AvakioViewHeader
        title="Absolute Layout"
        subTitle="A layout that allows specifying exact positions of elements using top/left/bottom/right coordinates"
      />

      {/* Tab Navigation */}
      <div className="avakio-absolute-layout-example-tabs">
        <AvakioTabBar
          options={TAB_OPTIONS}
          value={activeSection}
          onChange={handleTabChange}
          
        />
      </div>

      {/* Content */}
      <div className="avakio-absolute-layout-example-content">
        
        {/* Basic Usage Section */}
        <section 
          ref={(el) => { sectionRefs.current['basic'] = el; }}
          className="avakio-absolute-layout-example-section"
        >
          <h2 className="avakio-absolute-layout-example-section-title">Basic Usage</h2>
          <p className="avakio-absolute-layout-example-section-description">
            AbsoluteLayout allows you to position elements at exact coordinates within a container. 
            Use top/left/bottom/right properties to specify positions.
          </p>
          
          <div className="avakio-absolute-layout-example-demo">
            <h3 className="avakio-absolute-layout-example-demo-title">Page Layout Example</h3>
            <p className="avakio-absolute-layout-example-demo-description">
              A typical page layout with header, sidebar, main content, and footer.
            </p>
            <div className="avakio-absolute-layout-example-demo-container" style={{ height: '350px' }}>
              <AvakioAbsoluteLayout
                cells={BASIC_CELLS}
                borderless
              />
            </div>
          </div>

          <div className="avakio-absolute-layout-example-demo">
            <h3 className="avakio-absolute-layout-example-demo-title">Form Layout Example</h3>
            <p className="avakio-absolute-layout-example-demo-description">
              Precise positioning for form elements.
            </p>
            <div className="avakio-absolute-layout-example-demo-container" style={{ height: '180px' }}>
              <AvakioAbsoluteLayout
                cells={FORM_CELLS}
              />
            </div>
          </div>

          <div className="avakio-absolute-layout-example-code"><pre>
{`// Basic absolute positioning
const cells = [
  {
    id: 'header',
    content: <Header />,
    top: 0,
    left: 0,
    width: '100%',
    height: 50,
  },
  {
    id: 'sidebar',
    content: <Sidebar />,
    top: 50,
    left: 0,
    width: 150,
    bottom: 0,
  },
  {
    id: 'main',
    content: <MainContent />,
    top: 50,
    left: 150,
    right: 0,
    bottom: 50,
  },
];

<AvakioAbsoluteLayout cells={cells} />`}
            </pre></div>
        </section>

        {/* Relative Cells Section */}
        <section 
          ref={(el) => { sectionRefs.current['relative'] = el; }}
          className="avakio-absolute-layout-example-section"
        >
          <h2 className="avakio-absolute-layout-example-section-title">Relative Cells</h2>
          <p className="avakio-absolute-layout-example-section-description">
            Mix absolute and relative positioning. Relative cells take all available space 
            while absolute cells float on top.
          </p>
          
          <div className="avakio-absolute-layout-example-demo">
            <h3 className="avakio-absolute-layout-example-demo-title">List with Floating Action Button</h3>
            <p className="avakio-absolute-layout-example-demo-description">
              A relative cell fills the container while a floating button is positioned absolutely.
            </p>
            <div className="avakio-absolute-layout-example-demo-container" style={{ height: '280px' }}>
              <AvakioAbsoluteLayout
                cells={RELATIVE_CELLS}
              />
            </div>
          </div>

          <div className="avakio-absolute-layout-example-code"><pre>
{`// Mixing relative and absolute positioning
const cells = [
  {
    id: 'background-list',
    content: <ListView />,
    relative: true,  // Takes all available space
  },
  {
    id: 'fab',
    content: <FloatingButton />,
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    zIndex: 10,
  },
];`}
            </pre></div>
        </section>

        {/* Dynamic Cells Section */}
        <section 
          ref={(el) => { sectionRefs.current['dynamic'] = el; }}
          className="avakio-absolute-layout-example-section"
        >
          <h2 className="avakio-absolute-layout-example-section-title">Dynamic Cells</h2>
          <p className="avakio-absolute-layout-example-section-description">
            Add and remove cells dynamically using the ref methods or by updating the cells prop.
          </p>
          
          <div className="avakio-absolute-layout-example-demo">
            <h3 className="avakio-absolute-layout-example-demo-title">Add/Remove Cells</h3>
            <div className="avakio-absolute-layout-example-demo-actions" style={{ marginBottom: '16px' }}>
              <AvakioButton onClick={addCell}>
                <Plus size={14} /> Add Cell
              </AvakioButton>
              <AvakioButton onClick={removeCell} disabled={dynamicCells.length === 0}>
                <Minus size={14} /> Remove Cell
              </AvakioButton>
              <span className="cell-count">Cells: {dynamicCells.length}</span>
            </div>
            <div className="avakio-absolute-layout-example-demo-container" style={{ height: '320px' }}>
              <AvakioAbsoluteLayout
                ref={dynamicLayoutRef}
                cells={dynamicCells}
              />
            </div>
          </div>

          <div className="avakio-absolute-layout-example-code"><pre>
{`// Using ref methods
const layoutRef = useRef<AvakioAbsoluteLayoutRef>(null);

// Add a cell
layoutRef.current?.addView({
  id: 'new-cell',
  content: <NewComponent />,
  top: 100,
  left: 100,
  width: 200,
  height: 150,
});

// Remove a cell by id
layoutRef.current?.removeView('cell-id');

// Reconstruct with new cells
layoutRef.current?.reconstruct(newCellsArray);`}
            </pre></div>
        </section>

        {/* Features Section */}
        <section 
          ref={(el) => { sectionRefs.current['features'] = el; }}
          className="avakio-absolute-layout-example-section"
        >
          <h2 className="avakio-absolute-layout-example-section-title">Features</h2>
          
          <div className="avakio-absolute-layout-example-features-grid">
            <div className="avakio-absolute-layout-example-feature-card">
              <h4>Absolute Positioning</h4>
              <p>Place elements at exact coordinates using <code>top</code>, <code>left</code>, <code>bottom</code>, <code>right</code>.</p>
            </div>
            <div className="avakio-absolute-layout-example-feature-card">
              <h4>Relative Cells</h4>
              <p>Use <code>relative: true</code> for cells that should fill available space.</p>
            </div>
            <div className="avakio-absolute-layout-example-feature-card">
              <h4>Z-Index Stacking</h4>
              <p>Control layering order with the <code>zIndex</code> property.</p>
            </div>
            <div className="avakio-absolute-layout-example-feature-card">
              <h4>Batch Visibility</h4>
              <p>Group cells with <code>batch</code> and toggle visibility with <code>showBatch()</code>.</p>
            </div>
            <div className="avakio-absolute-layout-example-feature-card">
              <h4>Dynamic Management</h4>
              <p>Add, remove, and reconstruct cells programmatically via ref methods.</p>
            </div>
            <div className="avakio-absolute-layout-example-feature-card">
              <h4>Responsive Sizing</h4>
              <p>Use percentage values for width/height for responsive layouts.</p>
            </div>
          </div>

          <div className="avakio-absolute-layout-example-demo">
            <h3 className="avakio-absolute-layout-example-demo-title">All Themes</h3>
            <div className="avakio-absolute-layout-example-themes-grid">
              {['material', 'flat', 'compact', 'dark', 'ocean', 'sunset'].map((t) => (
                <div key={t} className="avakio-absolute-layout-example-theme-demo">
                  <h4 className="avakio-absolute-layout-example-theme-title">{t}</h4>
                  <div style={{ height: '120px' }}>
                    <AvakioAbsoluteLayout
                      theme={t as any}
                      cells={[
                        {
                          id: 'box1',
                          content: <div className="demo-cell demo-box1">Box 1</div>,
                          top: 10,
                          left: 10,
                          width: 80,
                          height: 40,
                        },
                        {
                          id: 'box2',
                          content: <div className="demo-cell demo-box2">Box 2</div>,
                          top: 60,
                          left: 50,
                          width: 80,
                          height: 40,
                        },
                        {
                          id: 'box3',
                          content: <div className="demo-cell demo-box3">Box 3</div>,
                          top: 30,
                          right: 10,
                          width: 60,
                          height: 60,
                        },
                      ]}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Documentation Section */}
        <section 
          ref={(el) => { sectionRefs.current['docs'] = el; }}
          className="avakio-absolute-layout-example-section"
        >
          <h2 className="avakio-absolute-layout-example-section-title">Documentation</h2>
          
          <div className="avakio-absolute-layout-example-docs">
            <h3>Props Reference</h3>
            <table className="avakio-absolute-layout-example-props-table">
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
                  <td><code>theme</code></td>
                  <td><code>'material' | 'flat' | 'compact' | 'dark' | 'ocean' | 'sunset'</code></td>
                  <td><code>'material'</code></td>
                  <td>Visual theme to apply</td>
                </tr>
                <tr>
                  <td><code>cells</code></td>
                  <td><code>AvakioAbsoluteLayoutCell[]</code></td>
                  <td>-</td>
                  <td>Array of cell configurations</td>
                </tr>
                <tr>
                  <td><code>width</code></td>
                  <td><code>number | string</code></td>
                  <td><code>'100%'</code></td>
                  <td>Container width</td>
                </tr>
                <tr>
                  <td><code>height</code></td>
                  <td><code>number | string</code></td>
                  <td><code>'100%'</code></td>
                  <td>Container height</td>
                </tr>
                <tr>
                  <td><code>borderless</code></td>
                  <td><code>boolean</code></td>
                  <td><code>false</code></td>
                  <td>Remove container border</td>
                </tr>
                <tr>
                  <td><code>visibleBatch</code></td>
                  <td><code>string</code></td>
                  <td>-</td>
                  <td>Initially visible batch name</td>
                </tr>
                <tr>
                  <td><code>disabled</code></td>
                  <td><code>boolean</code></td>
                  <td><code>false</code></td>
                  <td>Disable the layout</td>
                </tr>
                <tr>
                  <td><code>hidden</code></td>
                  <td><code>boolean</code></td>
                  <td><code>false</code></td>
                  <td>Hide the layout</td>
                </tr>
              </tbody>
            </table>

            <h3>Cell Configuration</h3>
            <table className="avakio-absolute-layout-example-props-table">
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
                  <td><code>string</code></td>
                  <td>Unique identifier for the cell</td>
                </tr>
                <tr>
                  <td><code>content</code></td>
                  <td><code>ReactNode</code></td>
                  <td>Content to render in the cell</td>
                </tr>
                <tr>
                  <td><code>top</code></td>
                  <td><code>number | string</code></td>
                  <td>Distance from top (px or %)</td>
                </tr>
                <tr>
                  <td><code>left</code></td>
                  <td><code>number | string</code></td>
                  <td>Distance from left (px or %)</td>
                </tr>
                <tr>
                  <td><code>bottom</code></td>
                  <td><code>number | string</code></td>
                  <td>Distance from bottom (px or %)</td>
                </tr>
                <tr>
                  <td><code>right</code></td>
                  <td><code>number | string</code></td>
                  <td>Distance from right (px or %)</td>
                </tr>
                <tr>
                  <td><code>width</code></td>
                  <td><code>number | string</code></td>
                  <td>Cell width (px or %)</td>
                </tr>
                <tr>
                  <td><code>height</code></td>
                  <td><code>number | string</code></td>
                  <td>Cell height (px or %)</td>
                </tr>
                <tr>
                  <td><code>relative</code></td>
                  <td><code>boolean</code></td>
                  <td>If true, fills available space</td>
                </tr>
                <tr>
                  <td><code>zIndex</code></td>
                  <td><code>number</code></td>
                  <td>Stacking order</td>
                </tr>
                <tr>
                  <td><code>batch</code></td>
                  <td><code>string</code></td>
                  <td>Batch name for group visibility</td>
                </tr>
              </tbody>
            </table>

            <h3>Ref Methods</h3>
            <table className="avakio-absolute-layout-example-props-table">
              <thead>
                <tr>
                  <th>Method</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>addView(cell, index?)</code></td>
                  <td>Add a new cell</td>
                </tr>
                <tr>
                  <td><code>removeView(idOrIndex)</code></td>
                  <td>Remove a cell by id or index</td>
                </tr>
                <tr>
                  <td><code>getChildViews()</code></td>
                  <td>Get all cells</td>
                </tr>
                <tr>
                  <td><code>showBatch(name)</code></td>
                  <td>Show cells by batch name</td>
                </tr>
                <tr>
                  <td><code>show() / hide()</code></td>
                  <td>Toggle layout visibility</td>
                </tr>
                <tr>
                  <td><code>enable() / disable()</code></td>
                  <td>Toggle layout enabled state</td>
                </tr>
                <tr>
                  <td><code>reconstruct(cells)</code></td>
                  <td>Replace all cells</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

      </div>
    </AvakioLayout>
  );
}

export default AvakioAbsoluteLayoutExample;















