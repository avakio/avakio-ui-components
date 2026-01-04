import React, { useEffect, useMemo, useRef, useState } from 'react';
import './avakio-dashboard-example.css';
import {
  Code,
  LayoutDashboard,
  Maximize2,
  Move,
  Plus,
  RotateCcw,
  Save,
  Unlock,
  Lock,
  GripVertical,
} from 'lucide-react';
import { AvakioViewHeader } from '../../components/avakio/ui-widgets/avakio-view-header/avakio-view-header';
import { AvakioTabBar } from '../../components/avakio/ui-controls/avakio-tabbar/avakio-tabbar';
import { AvakioTemplate } from '../../components/avakio/views/avakio-template/avakio-template';
import { AvakioLayout } from '../../components/avakio/layouts/avakio-layout/avakio-layout';
import { AvakioButton } from '../../components/avakio/ui-controls/avakio-button/avakio-button';
import { AvakioDashboard, AvakioDashboardRef, AvakioDashboardWidget } from '../../components/avakio/ui-widgets/avakio-dashboard';

const TAB_OPTIONS = [
  { id: 'overview', label: 'Overview', icon: <LayoutDashboard size={14} /> },
  { id: 'editing', label: 'Drag & Edit', icon: <Move size={14} /> },
  { id: 'resizing', label: 'Resize', icon: <Maximize2 size={14} /> },
  { id: 'api', label: 'API Reference', icon: <Code size={14} /> },
];

function makeWidget(id: string, x: number, y: number, dx: number, dy: number, title: string): AvakioDashboardWidget {
  return {
    id,
    x,
    y,
    dx,
    dy,
    header: (
      <div className="avakio-dashboard-example-widget-header">
        <span className="avakio-dashboard-example-widget-title">{title}</span>
        <span className="avakio-dashboard-example-widget-handle" aria-hidden>
          <GripVertical size={14} />
        </span>
      </div>
    ),
    body: (
      <div className="avakio-dashboard-example-widget-body">
        <div className="avakio-dashboard-example-widget-metric">{Math.floor(Math.random() * 90) + 10}%</div>
        <div className="avakio-dashboard-example-widget-caption">Sample content</div>
      </div>
    ),
    draggable: true,
    resizable: true,
    minDx: 1,
    minDy: 1,
  };
}

export function AvakioDashboardExample() {
  
  const [activeSection, setActiveSection] = useState<string | number | null>('overview');

  const dashboardRef = useRef<AvakioDashboardRef>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const [editable, setEditable] = useState(true);
  const [dragHandle, setDragHandle] = useState<'any' | 'header'>('header');

  const initialWidgets = useMemo<AvakioDashboardWidget[]>(
    () => [
      makeWidget('w1', 0, 0, 2, 1, 'Revenue'),
      makeWidget('w2', 2, 0, 2, 1, 'Users'),
      makeWidget('w3', 0, 1, 2, 2, 'Pipeline'),
      makeWidget('w4', 2, 1, 2, 1, 'Conversions'),
      makeWidget('w5', 2, 2, 2, 1, 'Alerts'),
    ],
    []
  );

  const [widgets, setWidgets] = useState<AvakioDashboardWidget[]>(initialWidgets);
  const savedLayoutRef = useRef<{ layout: ReturnType<AvakioDashboardRef['serialize']> } | null>(null);

  const handleTabChange = (value: string | number | null) => {
    setActiveSection(value);
    if (value && sectionRefs.current[value as string]) {
      sectionRefs.current[value as string]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  

  const addWidget = () => {
    const nextId = `w${Math.floor(Math.random() * 100000)}`;
    dashboardRef.current?.addWidget(
      {
        ...makeWidget(nextId, 0, 0, 1, 1, `Widget ${nextId}`),
        draggable: true,
        resizable: true,
      },
      0
    );
  };

  const saveLayout = () => {
    const layout = dashboardRef.current?.serialize() ?? [];
    savedLayoutRef.current = { layout };
  };

  const restoreLayout = () => {
    if (!savedLayoutRef.current) return;
    dashboardRef.current?.restore(savedLayoutRef.current.layout);
  };

  const reset = () => {
    setWidgets(initialWidgets);
  };

  return (
    <div className="avakio-dashboard-example-container">
      <div className="avakio-dashboard-example-sticky-header">
        <AvakioViewHeader
          label="UI Widgets"
          title="Dashboard Component"
          subTitle="A Webix-like dashboard for draggable/resizable panels in a grid."
          isSticky={false}
        />

        <div className="avakio-dashboard-example-tabbar-container">
          <AvakioTabBar
            id="dashboard-demo-tabs"
            value={activeSection}
            options={TAB_OPTIONS}
            onChange={handleTabChange}
            align="left"
            size="sm"
            scrollable
          />
        </div>
      </div>

      <section
        ref={(el) => {
          sectionRefs.current['overview'] = el;
        }}
        className="avakio-dashboard-example-section"
      >
        <AvakioTemplate type="section" borderType="clean" content="Overview" />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="Widgets are placed using x/y/dx/dy. Set editable=false to render a fixed dashboard."
        />

        <div className="avakio-dashboard-example-card">
          <AvakioDashboard
            id="dashboard-overview"
            gridColumns={4}
            gridRows={3}
            cellMargin={10}
            height={420}
            widgets={widgets}
            editable={false}
            dragHandle="header"
          />
        </div>
      </section>

      <section
        ref={(el) => {
          sectionRefs.current['editing'] = el;
        }}
        className="avakio-dashboard-example-section"
      >
        <AvakioTemplate type="section" borderType="clean" content="Drag & Edit" />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="Enable editable to allow dragging (and optionally resizing). Use dragHandle to restrict dragging to the header."
        />

        <AvakioLayout
          id="dashboard-editing-controls"
          type="clean"
          borderless={false}
          margin={0}
          padding={0}
          rows={[
            <div className="avakio-dashboard-example-controls" key="controls">
              <AvakioButton
                id="dashboard-toggle-edit"
                size="sm"
                label={editable ? 'Editable: On' : 'Editable: Off'}
                icon={editable ? <Unlock size={14} /> : <Lock size={14} />}
                onClick={() => setEditable((v) => !v)}
              />
              <AvakioButton
                id="dashboard-toggle-handle"
                size="sm"
                label={dragHandle === 'header' ? 'Drag Handle: Header' : 'Drag Handle: Any'}
                icon={<Move size={14} />}
                onClick={() => setDragHandle((v) => (v === 'header' ? 'any' : 'header'))}
              />
              <AvakioButton
                id="dashboard-add"
                size="sm"
                label="Add Widget"
                icon={<Plus size={14} />}
                onClick={addWidget}
              />
              <AvakioButton
                id="dashboard-save"
                size="sm"
                label="Save Layout"
                icon={<Save size={14} />}
                onClick={saveLayout}
              />
              <AvakioButton
                id="dashboard-restore"
                size="sm"
                label="Restore"
                icon={<RotateCcw size={14} />}
                onClick={restoreLayout}
              />
              <AvakioButton
                id="dashboard-reset"
                size="sm"
                label="Reset"
                icon={<RotateCcw size={14} />}
                onClick={reset}
              />
            </div>,
            <div className="avakio-dashboard-example-card" key="dashboard">
              <AvakioDashboard
                ref={dashboardRef}
                id="dashboard-editing"
                gridColumns={4}
                gridRows={3}
                cellMargin={10}
                height={520}
                widgets={widgets}
                editable={editable}
                dragHandle={dragHandle}
                onChange={setWidgets}
              />
            </div>,
          ]}
        />
      </section>

      <section
        ref={(el) => {
          sectionRefs.current['resizing'] = el;
        }}
        className="avakio-dashboard-example-section"
      >
        <AvakioTemplate type="section" borderType="clean" content="Resize" />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="Widgets with resizable=true show a bottom-right resize handle when editable=true."
        />

        <div className="avakio-dashboard-example-card">
          <AvakioDashboard
            id="dashboard-resize"
            gridColumns={4}
            gridRows={3}
            cellMargin={10}
            height={420}
            widgets={widgets.map((w) => ({ ...w, resizable: true }))}
            editable={true}
            dragHandle="header"
            onChange={setWidgets}
          />
        </div>
      </section>

      <section
        ref={(el) => {
          sectionRefs.current['api'] = el;
        }}
        className="avakio-dashboard-example-section"
      >
        <AvakioTemplate type="section" borderType="clean" content="API Reference" />

        <div className="avakio-dashboard-example-card">
          <div className="avakio-dashboard-example-api">
            <div className="api-section">
              <h4>Key Props</h4>
              <table className="api-table">
                <thead>
                  <tr>
                    <th>Prop</th>
                    <th>Type</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>widgets</code></td>
                    <td><code>AvakioDashboardWidget[]</code></td>
                    <td>Widget layout and content</td>
                  </tr>
                  <tr>
                    <td><code>gridColumns</code> / <code>gridRows</code></td>
                    <td><code>number</code></td>
                    <td>Grid dimensions</td>
                  </tr>
                  <tr>
                    <td><code>editable</code></td>
                    <td><code>boolean</code></td>
                    <td>Enables drag/resize</td>
                  </tr>
                  <tr>
                    <td><code>dragHandle</code></td>
                    <td><code>'any' | 'header'</code></td>
                    <td>Restrict dragging to the header area</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="api-section">
              <h4>Imperative Methods</h4>
              <table className="api-table">
                <thead>
                  <tr>
                    <th>Method</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>addWidget()</code></td>
                    <td>Add a widget programmatically</td>
                  </tr>
                  <tr>
                    <td><code>removeWidget()</code></td>
                    <td>Remove by id</td>
                  </tr>
                  <tr>
                    <td><code>moveWidget()</code></td>
                    <td>Update x/y/dx/dy</td>
                  </tr>
                  <tr>
                    <td><code>serialize()</code> / <code>restore()</code></td>
                    <td>Save/restore layout</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}




















