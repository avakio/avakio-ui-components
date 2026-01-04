import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { AvakioMultiview, AvakioMultiviewRef, AvakioMultiviewAnimationType, AvakioMultiviewSlideDirection, AvakioMultiviewFlipDirection } from '../../components/avakio/views/avakio-multiview/avakio-multiview';
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
import { 
  ChevronLeft, 
  Home, 
  User, 
  Settings, 
  FileText,
  Plus,
  Trash2,
  History,
  Layers,
  Zap,
  Play,
  Book,
  Box,
  Eye,
  Palette,
  Wand2,
  ArrowLeftRight,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import '../../components/avakio/views/avakio-multiview/avakio-multiview.css';
import './avakio-multiview-example.css';

// Tab options for navigation
const TAB_OPTIONS = [
  { id: 'basic', label: 'Basic Usage', icon: <Box size={14} /> },
  { id: 'animations', label: 'Animations', icon: <Zap size={14} /> },
  { id: 'keepviews', label: 'Keep Views', icon: <Eye size={14} /> },
  { id: 'dynamic', label: 'Dynamic Views', icon: <Plus size={14} /> },
  { id: 'navigation', label: 'Navigation History', icon: <History size={14} /> },
  { id: 'themes', label: 'Themes', icon: <Palette size={14} /> },
  { id: 'playground', label: 'Interactive Playground', icon: <Play size={14} /> },
  { id: 'docs', label: 'Documentation', icon: <Book size={14} /> },
];

export function AvakioMultiviewExample() {
  
  const [activeSection, setActiveSection] = useState<string | number | null>('basic');
  
  // Interactive demo states
  const [animationType, setAnimationType] = useState<AvakioMultiviewAnimationType>('slide');
  const [slideDirection, setSlideDirection] = useState<AvakioMultiviewSlideDirection>('left');
  const [flipDirection, setFlipDirection] = useState<AvakioMultiviewFlipDirection>('horizontal');
  const [currentView, setCurrentView] = useState<string>('home');
  const [history, setHistory] = useState<string[]>(['home']);
  const [viewList, setViewList] = useState<string[]>(['home', 'profile', 'settings', 'documents']);
  const [dynamicViewCount, setDynamicViewCount] = useState(0);
  
  const multiviewRef = useRef<AvakioMultiviewRef>(null);
  const dynamicMultiviewRef = useRef<AvakioMultiviewRef>(null);

  const animationConfig = useMemo(() => ({
    type: animationType,
    duration: 350, // Using a slightly different duration to confirm changes
    direction: slideDirection,
    flipDirection: flipDirection,
  }), [animationType, slideDirection, flipDirection]);

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
  

  const handleViewChange = (newId: string, oldId: string) => {
    setCurrentView(newId);
    setHistory(multiviewRef.current?.getHistory() || []);
  };

  const goToView = useCallback((viewId: string) => {
    multiviewRef.current?.setValue(viewId);
  }, [multiviewRef]);

  const goBack = useCallback(() => {
    multiviewRef.current?.back();
  }, [multiviewRef]);

  const addDynamicView = () => {
    const newCount = dynamicViewCount + 1;
    const newId = `dynamic-${newCount}`;
    dynamicMultiviewRef.current?.addView({
      id: newId,
      content: (
        <div style={{ padding: '24px' }}>
          <h2 style={{ margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Plus size={24} /> Dynamic View {newCount}
          </h2>
          <p style={{ marginBottom: '16px', color: '#666' }}>
            This view was added dynamically using the <code>addView()</code> method.
          </p>
          <AvakioButton 
            onClick={() => dynamicMultiviewRef.current?.back()} 
            size="sm" 
            variant="outline"
            icon={<ChevronLeft size={16} />}
            label="Go Back"
          />
        </div>
      ),
    });
    setDynamicViewCount(newCount);
    setViewList((prev) => [...prev, newId]);
    setTimeout(() => {
      dynamicMultiviewRef.current?.setValue(newId);
    }, 50);
  };

  const removeDynamicView = () => {
    const views = dynamicMultiviewRef.current?.getViews() || [];
    const dynamicViews = views.filter((v) => v.startsWith('dynamic-'));
    if (dynamicViews.length > 0) {
      const lastDynamicView = dynamicViews[dynamicViews.length - 1];
      const isOnLastDynamic = dynamicMultiviewRef.current?.getValue() === lastDynamicView;
      
      if (isOnLastDynamic) {
        dynamicMultiviewRef.current?.back();
      }
      
      setTimeout(() => {
        const removed = dynamicMultiviewRef.current?.removeView(lastDynamicView);
        if (removed) {
          setViewList((prev) => prev.filter((v) => v !== lastDynamicView));
        }
      }, isOnLastDynamic ? 350 : 50);
    }
  };

  // Sample cells for main demo
  const mainCells = useMemo(() => [
    {
      id: 'home',
      content: (
        <div style={{ padding: '24px' }}>
          <h2 style={{ margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Home size={24} /> Home View
          </h2>
          <p style={{ marginBottom: '16px' }}>
            Welcome to the AvakioMultiview demo! Navigate between views with smooth animations.
          </p>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <AvakioButton onClick={() => goToView('profile')} size="sm" icon={<User size={16} />} label="Go to Profile" />
            <AvakioButton onClick={() => goToView('settings')} size="sm" variant="outline" icon={<Settings size={16} />} label="Go to Settings" />
            <AvakioButton onClick={() => goToView('documents')} size="sm" variant="outline" icon={<FileText size={16} />} label="Go to Documents" />
          </div>
        </div>
      ),
    },
    {
      id: 'profile',
      content: (
        <div style={{ padding: '24px' }}>
          <h2 style={{ margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <User size={24} /> Profile View
          </h2>
          <div style={{ 
            padding: '16px', 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '8px',
            color: 'white',
            marginBottom: '16px'
          }}>
            <h3 style={{ margin: '0 0 8px 0' }}>John Doe</h3>
            <p style={{ margin: '4px 0' }}>Email: john.doe@example.com</p>
            <p style={{ margin: '4px 0' }}>Role: Administrator</p>
          </div>
          <AvakioButton onClick={goBack} size="sm" variant="outline" icon={<ChevronLeft size={16} />} label="Go Back" />
        </div>
      ),
    },
    {
      id: 'settings',
      content: (
        <div style={{ padding: '24px' }}>
          <h2 style={{ margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Settings size={24} /> Settings View
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input type="checkbox" defaultChecked /> Enable notifications
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input type="checkbox" /> Dark mode
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input type="checkbox" defaultChecked /> Auto-save
            </label>
          </div>
          <AvakioButton onClick={goBack} size="sm" variant="outline" icon={<ChevronLeft size={16} />} label="Go Back" />
        </div>
      ),
    },
    {
      id: 'documents',
      content: (
        <div style={{ padding: '24px' }}>
          <h2 style={{ margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileText size={24} /> Documents View
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
            {['Report_2024.pdf', 'Invoice_001.xlsx', 'Presentation.pptx', 'Notes.txt'].map((doc) => (
              <div 
                key={doc}
                style={{ 
                  padding: '12px', 
                  background: 'rgba(0,0,0,0.05)', 
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <FileText size={16} />
                {doc}
              </div>
            ))}
          </div>
          <AvakioButton onClick={goBack} size="sm" variant="outline" icon={<ChevronLeft size={16} />} label="Go Back" />
        </div>
      ),
    },
  ], [goToView, goBack]);

  // Dynamic demo cells
  const dynamicCells = useMemo(() => [
    {
      id: 'main',
      content: (
        <div style={{ padding: '24px' }}>
          <h3 style={{ margin: '0 0 12px 0' }}>Main View</h3>
          <p>Click "Add View" to dynamically add new views to this multiview.</p>
        </div>
      ),
    },
  ], []);

  return (
    <div className="avakio-multiview-demo-container">
      {/* Sticky Header + Tab Navigation */}
      <div className="avakio-multiview-sticky-header">
        {/* Header */}
        <AvakioViewHeader
          label="Views"
          title="Multiview Component"
          subTitle="A container that displays one view at a time with smooth animations and navigation history."
          isSticky={false}
        />

        {/* Tab Navigation */}
        <div className="avakio-multiview-tabbar-container">
          <AvakioTabBar
            id="multiview-demo-tabs"
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
        className="avakio-multiview-demo-section"
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
          content="Navigate between views using buttons. The multiview displays one view at a time with animated transitions."
        />
        <AvakioLayout
          id="layout-basic-usage"
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioTemplate
              key="nav-buttons"
              type="clean"
              borderType="clean"
              content={
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                  <AvakioButton onClick={goBack} size="sm" variant="outline" icon={<ChevronLeft size={16} />} label="Back" disabled={history.length <= 1} />
                  {['home', 'profile', 'settings', 'documents'].map((id) => (
                    <AvakioButton
                      key={id}
                      onClick={() => goToView(id)}
                      size="sm"
                      variant={currentView === id ? 'primary' : 'outline'}
                      label={id.charAt(0).toUpperCase() + id.slice(1)}
                    />
                  ))}
                </div>
              }
            />,
            <div key="multiview-container" style={{ border: '1px solid var(--avakio-border-primary)', borderRadius: '8px', overflow: 'hidden', height: '280px', marginTop: '12px' }}>
              <AvakioMultiview
                ref={multiviewRef}
                id="main-multiview"
                testId="main-multiview"
                cells={mainCells}
                activeView="home"
                height="280px"
                animate={animationConfig}
                onViewChange={handleViewChange}
              />
            </div>,
          ]}
        />
      </section>

      {/* Animations Section */}
      <section
        ref={(el) => { sectionRefs.current['animations'] = el; }}
        className="avakio-multiview-demo-section"
      >
        <AvakioTemplate
          type="section"
          borderType="clean"
          content="Animation Types"
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="Choose different animation styles for view transitions: slide, fade, flip, or none. For slide animation, you can also choose the direction."
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[14, 0, 0, 14]}
          content={
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', fontWeight: 500, minWidth: '50px' }}>Type:</span>
                {(['slide', 'flip', 'none'] as const).map((type) => (
                  <AvakioButton
                    key={type}
                    onClick={() => setAnimationType(type)}
                    label={type.charAt(0).toUpperCase() + type.slice(1)}
                    variant={animationType === type ? 'primary' : 'outline'}
                    size="sm"
                    icon={<Zap size={14} />}
                  />
                ))}
              </div>
              {animationType === 'slide' && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
                  <span style={{ fontSize: '13px', fontWeight: 500, minWidth: '50px' }}>Direction:</span>
                  {(['left', 'right', 'top', 'bottom'] as const).map((dir) => (
                    <AvakioButton
                      key={dir}
                      onClick={() => setSlideDirection(dir)}
                      label={dir.charAt(0).toUpperCase() + dir.slice(1)}
                      variant={slideDirection === dir ? 'primary' : 'outline'}
                      size="sm"
                      icon={dir === 'left' || dir === 'right' ? <ArrowLeftRight size={14} /> : (dir === 'top' ? <ArrowUp size={14} /> : <ArrowDown size={14} />)}
                    />
                  ))}
                </div>
              )}
              {animationType === 'flip' && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
                  <span style={{ fontSize: '13px', fontWeight: 500, minWidth: '50px' }}>Direction:</span>
                  {(['horizontal', 'vertical'] as const).map((dir) => (
                    <AvakioButton
                      key={dir}
                      onClick={() => setFlipDirection(dir)}
                      label={dir.charAt(0).toUpperCase() + dir.slice(1)}
                      variant={flipDirection === dir ? 'primary' : 'outline'}
                      size="sm"
                      icon={dir === 'horizontal' ? <ArrowLeftRight size={14} /> : <ArrowUp size={14} />}
                    />
                  ))}
                </div>
              )}
            </div>
          }
        />
        <AvakioLayout
          id="layout-animations"
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioTemplate
              key="animation-info"
              type="clean"
              borderType="clean"
              content={
                <p style={{ fontSize: '14px', color: 'var(--avakio-text-secondary)' }}>
                  Current animation: <strong>{animationType}</strong>{animationType === 'slide' ? ` (direction: ${slideDirection})` : ''}{animationType === 'flip' ? ` (direction: ${flipDirection})` : ''} — Use the navigation buttons in "Basic Usage" section to see the animation in action.
                </p>
              }
            />,
          ]}
        />
      </section>

      {/* Keep Views Section */}
      <section
        ref={(el) => { sectionRefs.current['keepviews'] = el; }}
        className="avakio-multiview-demo-section"
      >
        <AvakioTemplate
          type="section"
          borderType="clean"
          content="Keep Views Mode"
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="With keepViews=true, inactive views stay in the DOM. Useful for iframes, editors, or components that need to maintain state."
        />
        <AvakioLayout
          id="layout-keepviews"
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <div key="keepviews-demo" style={{ border: '1px solid var(--avakio-border-primary)', borderRadius: '8px', overflow: 'hidden', height: '150px' }}>
              <AvakioMultiview
                id="keepviews-multiview"
                testId="keepviews-multiview"
                keepViews={true}
                cells={[
                  { id: 'kept-1', content: <div style={{ padding: '24px' }}><h4>View 1</h4><p>This view is kept in DOM when hidden</p></div> },
                  { id: 'kept-2', content: <div style={{ padding: '24px' }}><h4>View 2</h4><p>This view is also kept in DOM when hidden</p></div> },
                ]}
                activeView="kept-1"
                animate={{ type: 'slide', duration: 300 }}
              />
            </div>,
            <AvakioTemplate
              key="keepviews-note"
              type="clean"
              borderType="clean"
              padding={[12, 0, 0, 0]}
              content={
                <p style={{ fontSize: '13px', color: 'var(--avakio-text-secondary)' }}>
                  Note: Without <code>keepViews</code>, only the active view is rendered in the DOM, which improves performance for many views.
                </p>
              }
            />,
          ]}
        />
      </section>

      {/* Dynamic Views Section */}
      <section
        ref={(el) => { sectionRefs.current['dynamic'] = el; }}
        className="avakio-multiview-demo-section"
      >
        <AvakioTemplate
          type="section"
          borderType="clean"
          content="Dynamic Views"
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="Add and remove views dynamically using addView() and removeView() methods."
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[14, 0, 0, 14]}
          content={
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              <AvakioButton onClick={addDynamicView} size="sm" icon={<Plus size={14} />} label="Add View" />
              {viewList.some((v) => v.startsWith('dynamic-')) && (
                <AvakioButton onClick={removeDynamicView} size="sm" variant="outline" icon={<Trash2 size={14} />} label="Remove Last" />
              )}
            </div>
          }
        />
        <AvakioLayout
          id="layout-dynamic"
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <div key="dynamic-demo" style={{ border: '1px solid var(--avakio-border-primary)', borderRadius: '8px', overflow: 'hidden', height: '200px' }}>
              <AvakioMultiview
                ref={dynamicMultiviewRef}
                id="dynamic-multiview"
                testId="dynamic-multiview"
                cells={dynamicCells}
                activeView="main"
                animate={{ type: 'slide', duration: 300 }}
              />
            </div>,
            <AvakioTemplate
              key="dynamic-views-list"
              type="clean"
              borderType="clean"
              padding={[12, 0, 0, 0]}
              content={
                <p style={{ fontSize: '13px', color: 'var(--avakio-text-secondary)' }}>
                  Current views: <strong>{viewList.filter(v => v.startsWith('dynamic-') || v === 'main').join(', ') || 'main'}</strong>
                </p>
              }
            />,
          ]}
        />
      </section>

      {/* Navigation History Section */}
      <section
        ref={(el) => { sectionRefs.current['navigation'] = el; }}
        className="avakio-multiview-demo-section"
      >
        <AvakioTemplate
          type="section"
          borderType="clean"
          content="Navigation History"
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="AvakioMultiview maintains a navigation history. Use back() to return to previous views and getHistory() to inspect the stack."
        />
        <AvakioLayout
          id="layout-navigation"
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioTemplate
              key="history-display"
              type="clean"
              borderType="material"
              padding={16}
              content={
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                  <History size={20} />
                  <span style={{ fontWeight: 600 }}>Navigation History:</span>
                  <span style={{ color: 'var(--avakio-text-secondary)' }}>{history.join(' → ')}</span>
                </div>
              }
            />,
            <AvakioTemplate
              key="history-note"
              type="clean"
              borderType="clean"
              padding={[12, 0, 0, 0]}
              content={
                <p style={{ fontSize: '13px', color: 'var(--avakio-text-secondary)' }}>
                  Navigate in the "Basic Usage" section above to see the history update. Use <code>clearHistory()</code> to reset.
                </p>
              }
            />,
          ]}
        />
      </section>

      {/* Themes Section */}
      <section
        ref={(el) => { sectionRefs.current['themes'] = el; }}
        className="avakio-multiview-demo-section"
      >
        <AvakioTemplate
          type="section"
          borderType="clean"
          content="All Themes"
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="AvakioMultiview supports all 6 Avakio themes."
        />
        <AvakioLayout
          id="layout-themes"
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          responsive={true}
          cols={(['material', 'flat', 'compact', 'dark', 'ocean', 'sunset'] as const).map((themeItem) => (
            <div key={themeItem} style={{ border: '1px solid var(--avakio-border-primary)', borderRadius: '8px', overflow: 'hidden', height: '120px' }}>
              <AvakioMultiview
                id={`theme-${themeItem}`}
                testId={`theme-${themeItem}`}
                theme={themeItem}
                cells={[
                  {
                    id: 'theme-view',
                    content: (
                      <div style={{ padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', flexDirection: 'column', gap: '8px' }}>
                        <Layers size={24} />
                        <strong>{themeItem}</strong>
                      </div>
                    ),
                  },
                ]}
                activeView="theme-view"
                animate={false}
              />
            </div>
          ))}
        />
      </section>

      {/* Interactive Playground Section */}
      <section
        ref={(el) => { sectionRefs.current['playground'] = el; }}
        className="avakio-multiview-demo-section avakio-hide-on-mobile"
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
        className="avakio-multiview-demo-section avakio-hide-on-mobile"
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
  const playgroundRef = useRef<AvakioMultiviewRef>(null);
  const [animationType, setAnimationType] = useState<string>('slide');
  const [animationDirection, setAnimationDirection] = useState<string>('left');
  const [flipDirection, setFlipDirection] = useState<string>('horizontal');
  const [animationDuration, setAnimationDuration] = useState<number>(300);
  const [keepViews, setKeepViews] = useState(false);
  const [width, setWidth] = useState<string>('100%');
  const [height, setHeight] = useState<string>('200');
  const [activeView, setActiveView] = useState<string>('view1');

  const playgroundCells = useMemo(() => [
    { id: 'view1', content: <div style={{ padding: '24px', textAlign: 'center' }}><Home size={32} /><h4>View 1</h4><p>This is the first view</p></div> },
    { id: 'view2', content: <div style={{ padding: '24px', textAlign: 'center' }}><User size={32} /><h4>View 2</h4><p>This is the second view</p></div> },
    { id: 'view3', content: <div style={{ padding: '24px', textAlign: 'center' }}><Settings size={32} /><h4>View 3</h4><p>This is the third view</p></div> },
  ], []);

  return (
    <AvakioLayout
      id="playground-layout"
      type="clean"
      borderless={false}
      margin={12}
      rows={[
        // Headers
        <AvakioLayout
          key="headers"
          id="playground-headers"
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
        // Content
        <AvakioLayout
          key="content"
          id="playground-content"
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
                  <AvakioRichSelect
                    label="Animation Type"
                    labelAlign="left"
                    value={animationType}
                    width="100%"
                    padding={[0, 0, 10, 0]}
                    options={[
                      { id: 'slide', value: 'Slide' },
                      { id: 'flip', value: 'Flip' },
                      { id: 'none', value: 'None' },
                    ]}
                    onChange={(value) => setAnimationType(value as string)}
                  />
                  {animationType === 'slide' && (
                    <AvakioRichSelect
                      label="Direction"
                      labelAlign="left"
                      value={animationDirection}
                      width="100%"
                      padding={[0, 0, 10, 0]}
                      options={[
                        { id: 'left', value: 'Left' },
                        { id: 'right', value: 'Right' },
                        { id: 'top', value: 'Top' },
                        { id: 'bottom', value: 'Bottom' },
                      ]}
                      onChange={(value) => setAnimationDirection(value as string)}
                    />
                  )}
                  {animationType === 'flip' && (
                    <AvakioRichSelect
                      label="Flip Direction"
                      labelAlign="left"
                      value={flipDirection}
                      width="100%"
                      padding={[0, 0, 10, 0]}
                      options={[
                        { id: 'horizontal', value: 'Horizontal' },
                        { id: 'vertical', value: 'Vertical' },
                      ]}
                      onChange={(value) => setFlipDirection(value as string)}
                    />
                  )}
                  <AvakioCounter
                    labelPosition="left"
                    label="Duration (ms)"
                    value={animationDuration}
                    padding={[0, 0, 10, 0]}
                    min={100}
                    max={1000}
                    step={50}
                    onChange={(value) => setAnimationDuration(value)}
                    allowInput={true}
                  />
                  <AvakioText
                    label="Width"
                    labelPosition="left"
                    value={width}
                    width="100%"
                    padding={[0, 0, 10, 0]}
                    onChange={(value) => setWidth(value)}
                    placeholder="e.g., 100%, 400px"
                  />
                  <AvakioText
                    label="Height"
                    labelPosition="left"
                    value={height}
                    width="100%"
                    padding={[0, 0, 10, 0]}
                    onChange={(value) => setHeight(value)}
                    placeholder="e.g., 200, auto"
                  />
                  <AvakioCheckbox
                    label="Keep Views"
                    checked={keepViews}
                    onChange={(checked) => setKeepViews(checked)}
                  />
                  <div style={{ marginTop: '16px' }}>
                    <p style={{ fontSize: '13px', marginBottom: '8px' }}>Navigate to view:</p>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {['view1', 'view2', 'view3'].map((v) => (
                        <AvakioButton
                          key={v}
                          onClick={() => {
                            playgroundRef.current?.setValue(v);
                            setActiveView(v);
                          }}
                          size="sm"
                          variant={activeView === v ? 'primary' : 'outline'}
                          label={v}
                        />
                      ))}
                    </div>
                  </div>
                </>
              }
            />,
            <AvakioLayout
              key="preview"
              id="playground-preview"
              margin={0}
              padding={0}
              type="clean"
              borderless={false}
              rows={[
                <div key="preview-area" style={{ border: '1px solid var(--avakio-border-primary)', borderRadius: '8px', overflow: 'hidden', margin: '12px' }}>
                  <AvakioMultiview
                    ref={playgroundRef}
                    id="playground-multiview"
                    cells={playgroundCells}
                    activeView="view1"
                    animate={{ type: animationType as any, duration: animationDuration, direction: animationDirection as any, flipDirection: flipDirection as any }}
                    keepViews={keepViews}
                    width={width}
                    height={height ? (isNaN(Number(height)) ? height : Number(height)) : undefined}
                    onViewChange={(newId) => setActiveView(newId)}
                  />
                </div>,
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
                      {`<AvakioMultiview
  theme="${theme}"
  cells={[...]}
  activeView="${activeView}"
  animate={{ type: "${animationType}", duration: ${animationDuration}${animationType === 'slide' ? `, direction: "${animationDirection}"` : ''}${animationType === 'flip' ? `, flipDirection: "${flipDirection}"` : ''} }}
  ${keepViews ? 'keepViews={true}' : ''}
  width="${width}"
  height={${height}}
/>`}
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
  { id: 1, name: 'cells', type: 'AvakioMultiviewCell[]', defaultValue: '[]', description: 'Array of view cells to display', rules: 'Each cell must have a unique id and content' },
  { id: 2, name: 'activeView', type: 'string', defaultValue: 'First cell id', description: 'Initially active view ID', rules: 'Must match a cell id' },
  { id: 3, name: 'animate', type: "boolean | { type, duration, direction, flipDirection }", defaultValue: 'true', description: 'Animation configuration', rules: "type: 'slide' | 'flip' | 'none'. direction: 'left' | 'right' | 'top' | 'bottom' (for slide). flipDirection: 'horizontal' | 'vertical' (for flip). duration in ms" },
  { id: 4, name: 'keepViews', type: 'boolean', defaultValue: 'false', description: 'Keep inactive views in DOM', rules: 'Useful for iframes/editors that need to maintain state' },
  { id: 5, name: 'fitBiggest', type: 'boolean', defaultValue: 'false', description: 'Size container to biggest cell', rules: 'Prevents layout shifts when switching views' },
  { id: 6, name: 'theme', type: "'material' | 'flat' | 'compact' | 'dark' | 'ocean' | 'sunset'", defaultValue: "'material'", description: 'Visual theme to apply', rules: 'Affects colors and styling' },
  { id: 7, name: 'width', type: 'number | string', defaultValue: 'undefined', description: 'Width of the multiview', rules: 'Accepts px, %, or number (treated as px)' },
  { id: 8, name: 'height', type: 'number | string', defaultValue: 'undefined', description: 'Height of the multiview', rules: 'Accepts px, %, or number (treated as px)' },
  { id: 9, name: 'className', type: 'string', defaultValue: 'undefined', description: 'Additional CSS class names', rules: 'Appended to default classes' },
  { id: 10, name: 'css', type: 'React.CSSProperties', defaultValue: 'undefined', description: 'Inline CSS styles', rules: 'Merged with computed styles' },
  { id: 11, name: 'id', type: 'string', defaultValue: 'undefined', description: 'HTML id attribute', rules: 'For DOM selection' },
  { id: 12, name: 'testId', type: 'string', defaultValue: 'undefined', description: 'Test identifier', rules: 'Sets data-testid attribute' },
];

const eventPropsData: PropDoc[] = [
  { id: 1, name: 'onViewChange', type: '(newId: string, oldId: string) => void', defaultValue: 'undefined', description: 'Fired when view changes', rules: 'Called after animation starts' },
  { id: 2, name: 'onViewShow', type: '(viewId: string) => void', defaultValue: 'undefined', description: 'Fired when a view is shown', rules: 'Called after view becomes active' },
  { id: 3, name: 'onBeforeBack', type: '(currentViewId: string) => boolean | void', defaultValue: 'undefined', description: 'Called before going back', rules: 'Return false to cancel the back navigation' },
];

interface RefMethodDoc {
  id: number;
  name: string;
  description: string;
  rules: string;
}

const refMethodsData: RefMethodDoc[] = [
  { id: 1, name: 'getValue() / getActiveId()', description: 'Get the ID of currently active view', rules: 'Returns string' },
  { id: 2, name: 'setValue(viewId)', description: 'Switch to a specific view', rules: 'Triggers animation and callbacks' },
  { id: 3, name: 'back()', description: 'Go back to previous view', rules: 'Returns false if no history' },
  { id: 4, name: 'addView(cell, index?)', description: 'Add a new view dynamically', rules: 'Cell must have unique id' },
  { id: 5, name: 'removeView(viewId)', description: 'Remove a view by ID', rules: 'Cannot remove active view' },
  { id: 6, name: 'getViews()', description: 'Get all view IDs', rules: 'Returns string[]' },
  { id: 7, name: 'hasView(viewId)', description: 'Check if view exists', rules: 'Returns boolean' },
  { id: 8, name: 'getHistory()', description: 'Get navigation history', rules: 'Returns string[]' },
  { id: 9, name: 'clearHistory()', description: 'Clear navigation history', rules: 'Keeps only current view' },
  { id: 10, name: 'show() / hide()', description: 'Control visibility', rules: 'Sets hidden state' },
  { id: 11, name: 'isVisible()', description: 'Check visibility', rules: 'Returns boolean' },
];

const propsColumns: AvakioColumn<PropDoc>[] = [
  { id: 'name', header: 'Prop Name', width: 150, sort: true },
  { id: 'type', header: 'Type', width: 200 },
  { id: 'defaultValue', header: 'Default', width: 100 },
  { id: 'description', header: 'Description', width: 250 },
  { id: 'rules', header: 'Rules / Notes', width: 280 },
];

const refColumns: AvakioColumn<RefMethodDoc>[] = [
  { id: 'name', header: 'Method', width: 180, sort: true },
  { id: 'description', header: 'Description', width: 280 },
  { id: 'rules', header: 'Notes', width: 320 },
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
              content="Ref Methods (useRef)"
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
















