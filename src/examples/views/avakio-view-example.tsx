import React, { useState, useEffect, useRef } from 'react';
import { AvakioView } from '../../components/avakio/views/avakio-view';
import { AvakioTemplate } from '../../components/avakio/views/avakio-template/avakio-template';
import { AvakioButton } from '../../components/avakio/ui-controls/avakio-button/avakio-button';
import { AvakioRichSelect } from '../../components/avakio/ui-controls/avakio-richselect/avakio-richselect';
import { AvakioText } from '../../components/avakio/ui-controls/avakio-text/avakio-text';
import { AvakioCounter } from '../../components/avakio/ui-controls/avakio-counter/avakio-counter';
import { AvakioCheckbox } from '../../components/avakio/ui-controls/avakio-checkbox/avakio-checkbox';
import { AvakioDataTable } from '../../components/avakio/data-presentation/avakio-datatable/AvakioDataTable';
import type { AvakioColumn } from '../../components/avakio/data-presentation/avakio-datatable/AvakioDataTable';
import { AvakioTabBar } from '../../components/avakio/ui-controls/avakio-tabbar/avakio-tabbar';
import { AvakioLayout } from '../../components/avakio/layouts/avakio-layout/avakio-layout';
import { AvakioViewHeader } from '../../components/avakio/ui-widgets/avakio-view-header/avakio-view-header';
import { Box, Square, Layers, Eye, EyeOff, Maximize2, Move, Zap, Play, Book, Layout, MousePointer } from 'lucide-react';
import './avakio-view-example.css';

// Tab options for navigation
const TAB_OPTIONS = [
  { id: 'basic', label: 'Basic Views', icon: <Box size={14} /> },
  { id: 'types', label: 'View Types', icon: <Layout size={14} /> },
  { id: 'animations', label: 'Animations', icon: <Zap size={14} /> },
  { id: 'sizing', label: 'Sizing & Constraints', icon: <Maximize2 size={14} /> },
  { id: 'nested', label: 'Nested Views', icon: <Layers size={14} /> },
  { id: 'events', label: 'Event Handlers', icon: <MousePointer size={14} /> },
  { id: 'visibility', label: 'Visibility & State', icon: <Eye size={14} /> },
  { id: 'playground', label: 'Interactive Playground', icon: <Play size={14} /> },
  { id: 'docs', label: 'Documentation', icon: <Book size={14} /> },
];

export function AvakioViewExample() {
  
  const [activeSection, setActiveSection] = useState<string | number | null>('basic');
  
  // Interactive states for demos
  const [showView1, setShowView1] = useState(true);
  const [showView2, setShowView2] = useState(true);
  const [showView3, setShowView3] = useState(true);
  const [disabledView, setDisabledView] = useState(false);
  const [animationType, setAnimationType] = useState<'fade' | 'slide' | 'flip'>('fade');
  const [showAnimatedView, setShowAnimatedView] = useState(true);

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
    <div className="avakio-view-demo-container">
      {/* Sticky Header + Tab Navigation */}
      <div className="avakio-view-sticky-header">
        {/* Header */}
        <AvakioViewHeader
          label="Views"
          title="View Component"
          subTitle="A versatile container component with theming, animations, and flexible layouts."
          isSticky={false}
        />

        {/* Tab Navigation */}
        <div className="avakio-view-tabbar-container">
          <AvakioTabBar
            id="view-demo-tabs"
            value={activeSection}
            options={TAB_OPTIONS}
            onChange={handleTabChange}
            align="left"
            size="sm"
            scrollable
          />
        </div>
      </div>

      {/* Basic Views Section */}
      <section
        ref={(el) => { sectionRefs.current['basic'] = el; }}
        className="avakio-view-demo-section"
      >
        <AvakioTemplate
          type="section"
          borderType="clean"
          content="Basic Views"
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="AvakioView is a flexible container component that supports theming, animations, and various layout options."
        />
        <AvakioLayout
          id="layout-basic-views"
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          responsive={true}
          cols={[
            <AvakioView
              key="basic-1"
              width="100%"
              height={180}
              padding={20}
            >
              <div className="avakio-view-content">
                <Box size={32} />
                <h4>Simple View</h4>
                <p>A basic view with default settings.</p>
              </div>
            </AvakioView>,
            <AvakioView
              key="basic-2"
              width="100%"
              height={180}
              padding={20}
              borderless
            >
              <div className="avakio-view-content">
                <Square size={32} />
                <h4>Borderless View</h4>
                <p>A view without borders.</p>
              </div>
            </AvakioView>,
            <AvakioView
              key="basic-3"
              width="100%"
              height={180}
              padding={20}
              animate="fade"
            >
              <div className="avakio-view-content">
                <Zap size={32} />
                <h4>Animated View</h4>
                <p>A view with fade animation.</p>
              </div>
            </AvakioView>,
          ]}
        />
      </section>

      {/* View Types Section */}
      <section
        ref={(el) => { sectionRefs.current['types'] = el; }}
        className="avakio-view-demo-section"
      >
        <AvakioTemplate
          type="section"
          borderType="clean"
          content="View Types"
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="AvakioView supports different types: header (accent background), section (divider style), and clean (default)."
        />
        <AvakioLayout
          id="layout-view-types"
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioTemplate
              key="type-label-1"
              type="clean"
              borderType="clean"
              content="1. type=header"
            />,
            <AvakioView
              key="type-header"
              type="header"
              width="100%"
              padding={16}
            >
              <h4 style={{ margin: 0, color: 'white' }}>Header Type View</h4>
              <p style={{ margin: '8px 0 0', color: 'rgba(255,255,255,0.8)' }}>Uses accent background color</p>
            </AvakioView>,
            <AvakioTemplate
              key="type-label-2"
              type="clean"
              borderType="clean"
              content="2. type=section"
              padding={[16, 0, 0, 0]}
            />,
            <AvakioView
              key="type-section"
              type="section"
              width="100%"
              padding={16}
            >
              <h4 style={{ margin: 0 }}>Section Type View</h4>
              <p style={{ margin: '8px 0 0' }}>Uses secondary background with divider styling</p>
            </AvakioView>,
            <AvakioTemplate
              key="type-label-3"
              type="clean"
              borderType="clean"
              content="3. type=clean (default)"
              padding={[16, 0, 0, 0]}
            />,
            <AvakioView
              key="type-clean"
              type="clean"
              width="100%"
              padding={16}
            >
              <h4 style={{ margin: 0 }}>Clean Type View</h4>
              <p style={{ margin: '8px 0 0' }}>No special background styling</p>
            </AvakioView>,
          ]}
        />
      </section>

      {/* Animations Section */}
      <section
        ref={(el) => { sectionRefs.current['animations'] = el; }}
        className="avakio-view-demo-section"
      >
        <AvakioTemplate
          type="section"
          borderType="clean"
          content="Animations"
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="AvakioView supports three animation types: fade, slide, and flip. Toggle visibility to see the animations."
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[14, 0, 0, 14]}
          content={
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              <AvakioButton
                onClick={() => setShowAnimatedView(!showAnimatedView)}
                label={showAnimatedView ? 'Hide View' : 'Show View'}
                icon={showAnimatedView ? <EyeOff size={14} /> : <Eye size={14} />}
                size="sm"
              />
              <AvakioButton
                onClick={() => setAnimationType('fade')}
                label="Fade"
                variant={animationType === 'fade' ? 'primary' : 'outline'}
                size="sm"
              />
              <AvakioButton
                onClick={() => setAnimationType('slide')}
                label="Slide"
                variant={animationType === 'slide' ? 'primary' : 'outline'}
                size="sm"
              />
              <AvakioButton
                onClick={() => setAnimationType('flip')}
                label="Flip"
                variant={animationType === 'flip' ? 'primary' : 'outline'}
                size="sm"
              />
            </div>
          }
        />
        <AvakioLayout
          id="layout-animations"
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          minHeight={250}
          rows={[
            <AvakioView
              key="animated-view"
              width="100%"
              minHeight={200}
              padding={30}
              hidden={!showAnimatedView}
              animate={animationType}
              onShow={() => console.log(`View shown with ${animationType} animation`)}
              onHide={() => console.log('View hidden')}
            >
              <div className="avakio-view-content-center">
                <Zap size={48} />
                <h3>Animation Demo</h3>
                <p style={{ marginTop: '12px', fontSize: '16px' }}>
                  Current animation: <strong>{animationType}</strong>
                </p>
                <p style={{ fontSize: '14px', opacity: 0.7 }}>
                  Click the buttons above to toggle visibility and change animations.
                </p>
              </div>
            </AvakioView>,
          ]}
        />
      </section>

      {/* Sizing & Constraints Section */}
      <section
        ref={(el) => { sectionRefs.current['sizing'] = el; }}
        className="avakio-view-demo-section"
      >
        <AvakioTemplate
          type="section"
          borderType="clean"
          content="Sizing & Constraints"
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="Control view dimensions with width, height, minWidth, maxWidth, minHeight, maxHeight, and gravity (flex grow)."
        />
        <AvakioLayout
          id="layout-sizing"
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioTemplate
              key="sizing-label"
              type="clean"
              borderType="clean"
              content="Fixed and Flexible Sizing"
            />,
            <div key="sizing-flex" style={{ display: 'flex', gap: '16px', marginTop: '12px' }}>
              <AvakioView
                width={200}
                height={120}
                padding={15}
              >
                <div className="avakio-view-content-center">
                  <p style={{ margin: 0, fontWeight: 600 }}>Fixed Size</p>
                  <small>200×120px</small>
                </div>
              </AvakioView>
              <AvakioView
                gravity={1}
                height={120}
                padding={15}
              >
                <div className="avakio-view-content-center">
                  <p style={{ margin: 0, fontWeight: 600 }}>Flexible</p>
                  <small>gravity: 1</small>
                </div>
              </AvakioView>
              <AvakioView
                gravity={2}
                height={120}
                padding={15}
              >
                <div className="avakio-view-content-center">
                  <p style={{ margin: 0, fontWeight: 600 }}>More Flexible</p>
                  <small>gravity: 2</small>
                </div>
              </AvakioView>
            </div>,
            <AvakioTemplate
              key="constraints-label"
              type="clean"
              borderType="clean"
              content="Min/Max Constraints"
              padding={[24, 0, 0, 0]}
            />,
            <AvakioLayout
              key="constraints-views"
              type="clean"
              responsive={true}
              cols={[
                <AvakioView
                  key="constraint-height"
                  width="100%"
                  minHeight={80}
                  maxHeight={150}
                  padding={16}
                >
                  <div className="avakio-view-content">
                    <h4 style={{ margin: 0 }}>Min/Max Height</h4>
                    <p style={{ margin: '8px 0 0' }}>minHeight: 80px, maxHeight: 150px</p>
                  </div>
                </AvakioView>,
                <AvakioView
                  key="constraint-width"
                  width="100%"
                  minWidth={200}
                  maxWidth={400}
                  padding={16}
                >
                  <div className="avakio-view-content">
                    <h4 style={{ margin: 0 }}>Min/Max Width</h4>
                    <p style={{ margin: '8px 0 0' }}>minWidth: 200px, maxWidth: 400px</p>
                  </div>
                </AvakioView>,
              ]}
            />,
          ]}
        />
      </section>

      {/* Nested Views Section */}
      <section
        ref={(el) => { sectionRefs.current['nested'] = el; }}
        className="avakio-view-demo-section"
      >
        <AvakioTemplate
          type="section"
          borderType="clean"
          content="Nested Views"
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="AvakioView components can be nested to create complex layouts."
        />
        <AvakioLayout
          id="layout-nested"
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioView
              key="nested-parent"
              width="100%"
              padding={20}
            >
              <h4 style={{ marginTop: 0 }}>Parent View</h4>
              <p>This view contains child views:</p>
              <div style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
                <AvakioView
                  gravity={1}
                  padding={15}
                  borderless
                >
                  <div className="avakio-view-content-center">
                    <p style={{ margin: 0 }}>Child 1</p>
                  </div>
                </AvakioView>
                <AvakioView
                  gravity={1}
                  padding={15}
                  borderless
                >
                  <div className="avakio-view-content-center">
                    <p style={{ margin: 0 }}>Child 2</p>
                  </div>
                </AvakioView>
                <AvakioView
                  gravity={1}
                  padding={15}
                  borderless
                >
                  <div className="avakio-view-content-center">
                    <p style={{ margin: 0 }}>Child 3</p>
                  </div>
                </AvakioView>
              </div>
            </AvakioView>,
          ]}
        />
      </section>

      {/* Event Handlers Section */}
      <section
        ref={(el) => { sectionRefs.current['events'] = el; }}
        className="avakio-view-demo-section"
      >
        <AvakioTemplate
          type="section"
          borderType="clean"
          content="Event Handlers"
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="AvakioView supports various event handlers: onClick, onFocus, onBlur, onShow, onHide, onResize, and onKeyPress."
        />
        <AvakioLayout
          id="layout-events"
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          responsive={true}
          cols={[
            <AvakioView
              key="event-click"
              width="100%"
              padding={20}
              onClick={() => alert('View clicked!')}
            >
              <div className="avakio-view-content">
                <MousePointer size={32} />
                <h4>Clickable View</h4>
                <p>Click this view to trigger an alert.</p>
              </div>
            </AvakioView>,
            <AvakioView
              key="event-focus"
              width="100%"
              padding={20}
              onFocus={() => console.log('View focused')}
              onBlur={() => console.log('View blurred')}
            >
              <div className="avakio-view-content">
                <Eye size={32} />
                <h4>Focus Events</h4>
                <p>Tab to focus, check console for events.</p>
              </div>
            </AvakioView>,
            <AvakioView
              key="event-resize"
              width="100%"
              padding={20}
              onResize={(w, h) => console.log(`Resized: ${w}×${h}`)}
            >
              <div className="avakio-view-content">
                <Move size={32} />
                <h4>Resize Observer</h4>
                <p>Resize window to see events in console.</p>
              </div>
            </AvakioView>,
          ]}
        />
      </section>

      {/* Visibility & State Section */}
      <section
        ref={(el) => { sectionRefs.current['visibility'] = el; }}
        className="avakio-view-demo-section"
      >
        <AvakioTemplate
          type="section"
          borderType="clean"
          content="Visibility & State"
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="Control view visibility with hidden prop and interactivity with disabled prop."
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[14, 0, 0, 14]}
          content={
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              <AvakioButton
                onClick={() => setShowView1(!showView1)}
                label={showView1 ? 'Hide View 1' : 'Show View 1'}
                size="sm"
              />
              <AvakioButton
                onClick={() => setShowView2(!showView2)}
                label={showView2 ? 'Hide View 2' : 'Show View 2'}
                size="sm"
              />
              <AvakioButton
                onClick={() => setShowView3(!showView3)}
                label={showView3 ? 'Hide View 3' : 'Show View 3'}
                size="sm"
              />
              <AvakioButton
                onClick={() => setDisabledView(!disabledView)}
                label={disabledView ? 'Enable View 4' : 'Disable View 4'}
                variant="outline"
                size="sm"
              />
            </div>
          }
        />
        <AvakioLayout
          id="layout-visibility"
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          minHeight={200}
          responsive={true}
          cols={[
            <AvakioView
              key="vis-1"
              width="100%"
              minHeight={150}
              padding={20}
              hidden={!showView1}
              animate="fade"
            >
              <div className="avakio-view-content">
                <Box size={32} />
                <h4>View 1</h4>
                <p>Toggleable with fade animation.</p>
              </div>
            </AvakioView>,
            <AvakioView
              key="vis-2"
              width="100%"
              minHeight={150}
              padding={20}
              hidden={!showView2}
              animate="slide"
            >
              <div className="avakio-view-content">
                <Square size={32} />
                <h4>View 2</h4>
                <p>Toggleable with slide animation.</p>
              </div>
            </AvakioView>,
            <AvakioView
              key="vis-3"
              width="100%"
              minHeight={150}
              padding={20}
              hidden={!showView3}
              animate="flip"
            >
              <div className="avakio-view-content">
                <Layers size={32} />
                <h4>View 3</h4>
                <p>Toggleable with flip animation.</p>
              </div>
            </AvakioView>,
            <AvakioView
              key="vis-4"
              width="100%"
              minHeight={150}
              padding={20}
              disabled={disabledView}
              onClick={() => alert('View clicked!')}
            >
              <div className="avakio-view-content">
                <Eye size={32} />
                <h4>View 4</h4>
                <p>{disabledView ? 'Currently disabled' : 'Click me!'}</p>
              </div>
            </AvakioView>,
          ]}
        />
      </section>

      {/* Interactive Playground Section */}
      <section
        ref={(el) => { sectionRefs.current['playground'] = el; }}
        className="avakio-view-demo-section avakio-hide-on-mobile"
      >
        <AvakioTemplate
          type="section"
          borderType="clean"
          content="Interactive Props Playground"
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="Experiment with all available props and see changes in real-time."
        />
        <PlaygroundSection />
      </section>

      {/* Documentation Section */}
      <section
        ref={(el) => { sectionRefs.current['docs'] = el; }}
        className="avakio-view-demo-section avakio-hide-on-mobile"
      >
        <AvakioTemplate
          type="section"
          borderType="clean"
          content="Documentation"
        />
        <PropsDocumentation />
      </section>
    </div>
  );
}

function PlaygroundSection({ theme }: { theme: string }) {
  // State for all props
  const [viewType, setViewType] = useState<'header' | 'section' | 'clean'>('clean');
  const [borderless, setBorderless] = useState(false);
  const [animate, setAnimate] = useState<string>('false');
  const [width, setWidth] = useState<string>('100%');
  const [height, setHeight] = useState<string>('200');
  const [minHeight, setMinHeight] = useState<string>('');
  const [maxHeight, setMaxHeight] = useState<string>('');
  const [padding, setPadding] = useState<number>(20);
  const [gravity, setGravity] = useState<string>('');
  const [hidden, setHidden] = useState(false);
  const [disabled, setDisabled] = useState(false);

  return (
    <AvakioLayout
      id="playground-layout"
      type="clean"
      borderless={false}
      margin={12}
      rows={[
        // Headers for Controls and Live Preview
        <AvakioLayout
          key="headers"
          id="playground-layout-headers"
          type="clean"
          borderless={true}
          cols={[
            <AvakioTemplate
              key="controls-header"
              type="header"
              width={300}
              borderType="clean"
              content={<h4 style={{ margin: 0 }}>Controls</h4>}
            />,
            <AvakioTemplate
              key="preview-header"
              css={{ flex: 1 }}
              type="header"
              borderType="clean"
              content={<h4 style={{ margin: 0 }}>Live Preview</h4>}
            />,
          ]}
        />,
        // Controls and Live Preview
        <AvakioLayout
          key="content"
          id="playground-layout-content"
          type="clean"
          borderless={true}
          cols={[
            <AvakioTemplate
              key="controls"
              type="clean"
              borderType="clean"
              width={300}
              padding={12}
              content={
                <>
                  {/* View Type */}
                  <AvakioRichSelect
                    label="Type"
                    labelAlign="left"
                    value={viewType}
                    width="100%"
                    padding={[0, 0, 10, 0]}
                    options={[
                      { id: 'header', value: 'Header' },
                      { id: 'section', value: 'Section' },
                      { id: 'clean', value: 'Clean' },
                    ]}
                    onChange={(value) => setViewType(value as 'header' | 'section' | 'clean')}
                  />
                  {/* Animation */}
                  <AvakioRichSelect
                    label="Animation"
                    labelAlign="left"
                    width="100%"
                    padding={[0, 0, 10, 0]}
                    value={animate}
                    options={[
                      { id: 'false', value: 'None' },
                      { id: 'true', value: 'Default (Fade)' },
                      { id: 'fade', value: 'Fade' },
                      { id: 'slide', value: 'Slide' },
                      { id: 'flip', value: 'Flip' },
                    ]}
                    onChange={(value) => setAnimate(value as string)}
                  />
                  {/* Width */}
                  <AvakioText
                    label="Width"
                    labelPosition="left"
                    labelWidth={100}
                    value={width}
                    width="100%"
                    padding={[0, 0, 10, 0]}
                    onChange={(value) => setWidth(value)}
                    placeholder="e.g., 100%, 300px"
                  />
                  {/* Height */}
                  <AvakioText
                    label="Height"
                    labelPosition="left"
                    value={height}
                    padding={[0, 0, 10, 0]}
                    width="100%"
                    onChange={(value) => setHeight(value)}
                    placeholder="e.g., auto, 200px"
                  />
                  {/* Min Height */}
                  <AvakioText
                    label="Min Height"
                    labelPosition="left"
                    value={minHeight}
                    padding={[0, 0, 10, 0]}
                    width="100%"
                    onChange={(value) => setMinHeight(value)}
                    placeholder="e.g., 100px"
                  />
                  {/* Max Height */}
                  <AvakioText
                    label="Max Height"
                    labelPosition="left"
                    value={maxHeight}
                    padding={[0, 0, 10, 0]}
                    width="100%"
                    onChange={(value) => setMaxHeight(value)}
                    placeholder="e.g., 400px"
                  />
                  {/* Padding */}
                  <AvakioCounter
                    labelPosition="left"
                    label="Padding"
                    value={padding}
                    padding={[0, 0, 10, 0]}
                    min={0}
                    max={50}
                    step={1}
                    onChange={(value) => setPadding(value)}
                    allowInput={true}
                  />
                  {/* Gravity */}
                  <AvakioText
                    label="Gravity"
                    labelPosition="left"
                    value={gravity}
                    padding={[0, 0, 10, 0]}
                    width="100%"
                    onChange={(value) => setGravity(value)}
                    placeholder="e.g., 1, 2"
                  />
                  {/* Boolean Props */}
                  <AvakioCheckbox
                    label="Borderless"
                    checked={borderless}
                    onChange={(checked) => setBorderless(checked)}
                  />
                  <AvakioCheckbox
                    label="Hidden"
                    checked={hidden}
                    onChange={(checked) => setHidden(checked)}
                  />
                  <AvakioCheckbox
                    label="Disabled"
                    checked={disabled}
                    onChange={(checked) => setDisabled(checked)}
                  />
                </>
              }
            />,
            // Live Preview Column
            <AvakioLayout
              key="preview"
              id="layout-playground-preview"
              margin={0}
              padding={0}
              type="clean"
              borderless={false}
              rows={[
                <AvakioTemplate
                  key="preview-area"
                  type="clean"
                  borderType="material"
                  borderless={true}
                  margin={0}
                  padding={40}
                  content={
                    <AvakioView
                      type={viewType}
                      borderless={borderless}
                      animate={
                        animate === 'false' ? false :
                        animate === 'true' ? true :
                        animate as 'fade' | 'slide' | 'flip'
                      }
                      width={width || undefined}
                      height={height ? (isNaN(Number(height)) ? height : Number(height)) : undefined}
                      minHeight={minHeight ? (isNaN(Number(minHeight)) ? minHeight : Number(minHeight)) : undefined}
                      maxHeight={maxHeight ? (isNaN(Number(maxHeight)) ? maxHeight : Number(maxHeight)) : undefined}
                      padding={padding}
                      gravity={gravity ? Number(gravity) : undefined}
                      hidden={hidden}
                      disabled={disabled}
                    >
                      <div className="avakio-view-content-center" style={{ minHeight: '100px' }}>
                        <Box size={48} style={{ marginBottom: '12px' }} />
                        <h4 style={{ margin: '0 0 8px 0' }}>Configured View</h4>
                        <p style={{ margin: 0, opacity: 0.7, textAlign: 'center' }}>
                          This view reflects your configuration
                        </p>
                      </div>
                    </AvakioView>
                  }
                />,
                /* Props Display */
                <AvakioTemplate
                  key="props-header"
                  type="header"
                  borderType="clean"
                  margin={0}
                  content={<h4 style={{ margin: 0 }}>Current Props:</h4>}
                />,
                <AvakioTemplate
                  key="props-code"
                  type="clean"
                  borderType="clean"
                  content={
                    <pre style={{
                      background: 'var(--avakio-code-bg)',
                      color: 'var(--avakio-code-text)',
                      borderRadius: '4px',
                      overflow: 'auto',
                      lineHeight: '1.5',
                      padding: '12px',
                    }}>
                      {`<AvakioView
  theme="${theme}"
  type="${viewType}"
  ${borderless ? 'borderless={true}' : ''}
  ${animate !== 'false' ? `animate="${animate === 'true' ? 'true' : animate}"` : ''}
  width="${width}"
  ${height ? `height={${height}}` : ''}
  ${minHeight ? `minHeight={${minHeight}}` : ''}
  ${maxHeight ? `maxHeight={${maxHeight}}` : ''}
  padding={${padding}}
  ${gravity ? `gravity={${gravity}}` : ''}
  ${hidden ? 'hidden={true}' : ''}
  ${disabled ? 'disabled={true}' : ''}
>
  {/* Your content here */}
</AvakioView>`}
                    </pre>
                  }
                />,
              ]}
            />,
          ]}
        />,
      ]}
    />
  );
}

// Props documentation data
interface PropDoc {
  id: number;
  name: string;
  type: string;
  defaultValue: string;
  description: string;
  rules: string;
}

const propsData: PropDoc[] = [
  { id: 1, name: 'children', type: 'ReactNode', defaultValue: 'undefined', description: 'Content to display inside the view', rules: 'Any valid React children' },
  { id: 2, name: 'theme', type: "'material' | 'flat' | 'compact' | 'dark' | 'ocean' | 'sunset'", defaultValue: "'material'", description: 'Visual theme to apply', rules: 'Affects colors, borders, and overall styling' },
  { id: 3, name: 'type', type: "'header' | 'section' | 'clean'", defaultValue: "'clean'", description: 'View layout type', rules: 'header: accent background. section: divider style. clean: default' },
  { id: 4, name: 'width', type: 'number | string', defaultValue: 'undefined', description: 'Width of the view', rules: 'Accepts px, %, em, rem, or number (treated as px)' },
  { id: 5, name: 'height', type: 'number | string', defaultValue: 'undefined', description: 'Height of the view', rules: 'Accepts px, %, em, rem, or number (treated as px)' },
  { id: 6, name: 'minWidth', type: 'number | string', defaultValue: 'undefined', description: 'Minimum width constraint', rules: 'Same format as width' },
  { id: 7, name: 'minHeight', type: 'number | string', defaultValue: 'undefined', description: 'Minimum height constraint', rules: 'Same format as height' },
  { id: 8, name: 'maxWidth', type: 'number | string', defaultValue: 'undefined', description: 'Maximum width constraint', rules: 'Same format as width' },
  { id: 9, name: 'maxHeight', type: 'number | string', defaultValue: 'undefined', description: 'Maximum height constraint', rules: 'Same format as height' },
  { id: 10, name: 'padding', type: 'number | string | [t, r, b, l]', defaultValue: 'undefined', description: 'Inner spacing around content', rules: 'Number: all sides. Array: [top, right, bottom, left]' },
  { id: 11, name: 'borderless', type: 'boolean', defaultValue: 'false', description: 'Remove all borders', rules: 'When true, removes border and box-shadow' },
  { id: 12, name: 'hidden', type: 'boolean', defaultValue: 'false', description: 'Hide the view', rules: 'When true, view is not rendered. Triggers onHide callback' },
  { id: 13, name: 'disabled', type: 'boolean', defaultValue: 'false', description: 'Disable interactions', rules: 'Adds opacity and pointer-events: none' },
  { id: 14, name: 'gravity', type: 'number', defaultValue: 'undefined', description: 'Flex grow factor', rules: 'Used in flex layouts to control space distribution' },
  { id: 15, name: 'animate', type: "boolean | 'fade' | 'slide' | 'flip'", defaultValue: 'false', description: 'Animation on show/hide', rules: "true: fade. 'fade': fade in/out. 'slide': slide. 'flip': flip" },
  { id: 16, name: 'className', type: 'string', defaultValue: "''", description: 'Additional CSS class names', rules: 'Appended to default classes' },
  { id: 17, name: 'css', type: 'React.CSSProperties', defaultValue: 'undefined', description: 'Inline CSS styles', rules: 'Merged with computed styles' },
  { id: 18, name: 'id', type: 'string', defaultValue: 'undefined', description: 'HTML id attribute', rules: 'For DOM selection and accessibility' },
  { id: 19, name: 'testId', type: 'string', defaultValue: 'undefined', description: 'Test identifier', rules: 'Sets data-testid attribute for testing' },
  { id: 20, name: 'container', type: 'string | HTMLElement', defaultValue: 'undefined', description: 'Container element or selector', rules: 'For portal rendering' },
];

const eventPropsData: PropDoc[] = [
  { id: 1, name: 'onShow', type: '() => void', defaultValue: 'undefined', description: 'Called when view becomes visible', rules: 'Fires after animation completes' },
  { id: 2, name: 'onHide', type: '() => void', defaultValue: 'undefined', description: 'Called when view is hidden', rules: 'Fires when hidden prop becomes true' },
  { id: 3, name: 'onResize', type: '(width: number, height: number) => void', defaultValue: 'undefined', description: 'Called when view is resized', rules: 'Uses ResizeObserver internally' },
  { id: 4, name: 'onClick', type: '(e: MouseEvent) => void', defaultValue: 'undefined', description: 'Click event handler', rules: 'Disabled when disabled=true' },
  { id: 5, name: 'onFocus', type: '() => void', defaultValue: 'undefined', description: 'Focus event handler', rules: 'View is focusable via tabIndex' },
  { id: 6, name: 'onBlur', type: '() => void', defaultValue: 'undefined', description: 'Blur event handler', rules: 'Fires when view loses focus' },
  { id: 7, name: 'onKeyPress', type: '(e: KeyboardEvent) => void', defaultValue: 'undefined', description: 'Keyboard event handler', rules: 'Fires on keyDown events' },
];

interface RefMethodDoc {
  id: number;
  name: string;
  description: string;
  rules: string;
}

const refMethodsData: RefMethodDoc[] = [
  { id: 1, name: 'show()', description: 'Make the view visible', rules: 'Sets hidden to false internally' },
  { id: 2, name: 'hide()', description: 'Hide the view', rules: 'Sets hidden to true internally' },
  { id: 3, name: 'enable()', description: 'Enable interactions', rules: 'Sets disabled to false' },
  { id: 4, name: 'disable()', description: 'Disable interactions', rules: 'Sets disabled to true' },
  { id: 5, name: 'resize(width?, height?)', description: 'Programmatically resize the view', rules: 'Accepts numbers or strings' },
  { id: 6, name: 'getNode()', description: 'Get DOM element reference', rules: 'Returns HTMLDivElement or null' },
  { id: 7, name: 'isVisible()', description: 'Check visibility state', rules: 'Returns boolean' },
  { id: 8, name: 'isEnabled()', description: 'Check enabled state', rules: 'Returns boolean' },
];

// Props columns for the DataTable
const propsColumns: AvakioColumn<PropDoc>[] = [
  { id: 'name', header: 'Prop Name', width: 120, sort: true },
  { id: 'type', header: 'Type', width: 220 },
  { id: 'defaultValue', header: 'Default', width: 100 },
  { id: 'description', header: 'Description', width: 250 },
  { id: 'rules', header: 'Rules / Notes', width: 300 },
];

const refColumns: AvakioColumn<RefMethodDoc>[] = [
  { id: 'name', header: 'Method', width: 180, sort: true },
  { id: 'description', header: 'Description', width: 280 },
  { id: 'rules', header: 'Notes', width: 350 },
];

function PropsDocumentation({ theme }: { theme: string }) {
  return (
    <AvakioTemplate
      borderType="material"
      type="clean"
      borderless={true}
      content={
        <AvakioLayout
          rows={[
            <AvakioTemplate
              key="props-header"
              borderType="material"
              type="header"
              content="Props Reference"
              borderless={true}
              padding={[12, 16, 12, 16]}
              margin={0}
            />,
            <AvakioTemplate
              key="props-table"
              borderType="clean"
              type="clean"
              borderless={true}
              content={
                <AvakioDataTable
                  columns={propsColumns}
                  data={propsData}
                  sortable={true}
                  filterable={true}
                  resizable={true}
                  paging={true}
                  pageSize={10}
                />
              }
            />,
            <AvakioTemplate
              key="events-header"
              borderType="material"
              type="header"
              content="Event Props"
              padding={[12, 16, 12, 16]}
              margin={0}
              borderless={true}
            />,
            <AvakioTemplate
              key="events-table"
              borderType="clean"
              type="clean"
              borderless={true}
              content={
                <AvakioDataTable
                  columns={propsColumns}
                  data={eventPropsData}
                  sortable={true}
                  resizable={true}
                  paging={false}
                />
              }
            />,
            <AvakioTemplate
              key="ref-header"
              borderType="material"
              type="header"
              content="Ref Methods (AvakioViewWithRef)"
              padding={[12, 16, 12, 16]}
              margin={0}
              borderless={true}
            />,
            <AvakioTemplate
              key="ref-table"
              borderType="clean"
              type="clean"
              borderless={true}
              content={
                <AvakioDataTable
                  columns={refColumns}
                  data={refMethodsData}
                  sortable={true}
                  resizable={true}
                  paging={false}
                />
              }
            />,
          ]}
          gap={10}
        />
      }
    />
  );
}
















