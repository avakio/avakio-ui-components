import React, { useRef, useState, useEffect } from 'react';
import { AvakioHint, AvakioHintRef, AvakioHintStep, AvakioHintTheme } from './avakio-hint';
import { AvakioTemplate } from '../../views/avakio-template/avakio-template';
import { AvakioLayout } from '../../layouts/avakio-layout/avakio-layout';
import { AvakioGrid, AvakioGridCell } from '../../layouts/avakio-grid/avakio-grid';
import { AvakioSidebar, SidebarItem } from '../../avakio-sidebar/avakio-sidebar';
import { AvakioButton } from '../../ui-controls/avakio-button/avakio-button';
import { Play, RotateCcw, Lightbulb, Settings, User, Bell, Home, Search, Mail, Palette, MousePointer, MapPin, List } from 'lucide-react';
import './avakio-hint.css';

export function AvakioHintExample() {
  const [theme, setTheme] = useState<string>('material');
  const hintRef = useRef<AvakioHintRef>(null);
  const clickHintRef = useRef<AvakioHintRef>(null);
  const enterHintRef = useRef<AvakioHintRef>(null);
  const manualHintRef = useRef<AvakioHintRef>(null);
  const positionHintRef = useRef<AvakioHintRef>(null);
  const [eventLog, setEventLog] = useState<string[]>([]);
  const [selectedTheme, setSelectedTheme] = useState<AvakioHintTheme>('material');

  useEffect(() => {
    const currentTheme = document.documentElement.getAttribute('data-admin-theme');
    if (currentTheme) {
      setTheme(currentTheme);
    }

    const observer = new MutationObserver(() => {
      const globalTheme = document.documentElement.getAttribute('data-admin-theme');
      if (globalTheme && globalTheme !== theme) {
        setTheme(globalTheme);
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-admin-theme'],
    });

    return () => observer.disconnect();
  }, [theme]);

  const addLog = (message: string) => {
    setEventLog(prev => [...prev.slice(-9), `${new Date().toLocaleTimeString()} - ${message}`]);
  };

  // Basic tour steps
  const basicSteps: AvakioHintStep[] = [
    {
      el: '#demo-header',
      title: 'Welcome!',
      text: 'This is your dashboard header. It contains navigation and quick actions.',
      position: 'bottom',
    },
    {
      el: '#demo-sidebar',
      title: 'Navigation Menu',
      text: 'Use the sidebar to navigate between different sections of the application.',
      position: 'right',
    },
    {
      el: '#demo-content',
      title: 'Main Content',
      text: 'Your main workspace where you can view and edit your content.',
      position: 'left',
    },
    {
      el: '#demo-footer',
      title: 'Footer Area',
      text: 'Quick links and additional information can be found here.',
      position: 'top',
    },
  ];

  // Click event steps
  const clickSteps: AvakioHintStep[] = [
    {
      el: '#click-cell-1',
      title: 'Click Event Demo',
      text: 'Click this card to proceed to the next step. The tour will only advance when you click the highlighted element.',
      event: 'click',
      position: 'bottom',
    },
    {
      el: '#click-cell-2',
      title: 'Click Again',
      text: 'Great! Now click this card to continue.',
      event: 'click',
      position: 'bottom',
    },
    {
      el: '#click-cell-3',
      title: 'Final Click',
      text: 'One more click to complete the tour!',
      event: 'click',
      position: 'bottom',
    },
  ];

  // Enter event steps
  const enterSteps: AvakioHintStep[] = [
    {
      el: '#enter-input-1',
      title: 'Enter Event Demo',
      text: 'Focus on this input field and press Enter to proceed.',
      event: 'enter',
      position: 'bottom',
    },
    {
      el: '#enter-input-2',
      title: 'Press Enter Again',
      text: 'Type something if you want, then press Enter to continue.',
      event: 'enter',
      position: 'bottom',
    },
    {
      el: '#enter-input-3',
      title: 'Final Enter',
      text: 'Press Enter one more time to complete!',
      event: 'enter',
      position: 'bottom',
    },
  ];

  // Manual navigation steps (none event)
  const manualSteps: AvakioHintStep[] = [
    {
      el: '#manual-card-1',
      title: 'Manual Navigation Demo',
      text: 'This step uses manual navigation. Use the Next/Previous buttons to navigate through the tour.',
      event: 'none',
      position: 'bottom',
    },
    {
      el: '#manual-card-2',
      title: 'Step 2 of 3',
      text: 'You can go back using the Previous button or continue with Next.',
      event: 'none',
      position: 'bottom',
    },
    {
      el: '#manual-card-3',
      title: 'Final Step',
      text: 'Click Finish to complete the tour, or go back to review.',
      event: 'none',
      position: 'bottom',
    },
  ];

  // Custom position steps
  const positionSteps: AvakioHintStep[] = [
    {
      el: '#pos-center',
      title: 'Auto Position',
      text: 'The popup automatically positions itself for best visibility.',
      position: 'auto',
    },
    {
      el: '#pos-top',
      title: 'Top Position',
      text: 'This popup appears above the target element.',
      position: 'top',
    },
    {
      el: '#pos-bottom',
      title: 'Bottom Position',
      text: 'This popup appears below the target element.',
      position: 'bottom',
    },
    {
      el: '#pos-left',
      title: 'Left Position',
      text: 'This popup appears to the left of the target element.',
      position: 'left',
    },
    {
      el: '#pos-right',
      title: 'Right Position',
      text: 'This popup appears to the right of the target element.',
      position: 'right',
    },
  ];

  const startBasicTour = () => {
    hintRef.current?.start();
    addLog('Started basic tour');
  };

  const startClickTour = () => {
    clickHintRef.current?.start();
    addLog('Started click event tour');
  };

  const startEnterTour = () => {
    enterHintRef.current?.start();
    addLog('Started enter event tour');
  };

  const startManualTour = () => {
    manualHintRef.current?.start();
    addLog('Started manual navigation tour');
  };

  const startPositionTour = () => {
    positionHintRef.current?.start();
    addLog('Started position demo tour');
  };

  return (
    <div className="avakio-template-demo-container" data-admin-theme={theme}>
      <AvakioTemplate
        id="hint-example-header"
        theme={theme as any}
        type="header"
        borderType="clean"
        content={
          <div>
            <p style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: 500, letterSpacing: '0.5px', textTransform: 'uppercase', opacity: 0.9 }}>Avakio Components</p>
            <h1 style={{ margin: '0 0 12px 0', fontSize: '32px', fontWeight: 600 }}>AvakioHint Component</h1>
            <p style={{ margin: 0, fontSize: '16px', opacity: 0.95 }}>
              A step-by-step hint/tour component for guided user onboarding and feature discovery. 
            </p>
          </div>
        }
      />

      {/* Basic Usage Section */}
      <section className="avakio-template-demo-section">
        <AvakioTemplate theme={theme as any} type="section" borderType="clean"
          content={
            <div>
              <h3 style={{ margin: '0 0 4px 0' }}>
                <Play size={20} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                Basic Usage
              </h3>
              <p style={{ margin: 0, fontSize: '14px', opacity: 0.7 }}>Start a guided tour with multiple steps. Users can navigate using Previous/Next buttons or close at any time.</p>
            </div>
          }
        />
        <div style={{ padding: '16px' }}>
          <div style={{ marginBottom: '16px' }}>
            <AvakioButton onClick={startBasicTour} size="sm" icon={<Play size={16} />}>
              Start Tour
            </AvakioButton>
          </div>

          {/* Demo UI using AvakioLayout */}
          <AvakioLayout
            theme={theme as any}
            type="clean"
            borderless
            rows={[
              // Header
              <AvakioTemplate
                key="demo-header"
                id="demo-header"
                theme={theme as any}
                borderType="line"
                padding={16}
                css={{ background: '#fff' }}
                content={
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <Home size={20} style={{ color: '#3b82f6' }} />
                      <span style={{ fontWeight: 600 }}>My Dashboard</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <Search size={20} style={{ color: '#9ca3af' }} />
                      <Bell size={20} style={{ color: '#9ca3af' }} />
                      <User size={20} style={{ color: '#9ca3af' }} />
                    </div>
                  </div>
                }
              />,
              // Main content area with sidebar and content
              <AvakioLayout
                key="demo-main"
                theme={theme as any}
                type="clean"
                borderless
                cols={[
                  // Sidebar
                  <div key="demo-sidebar" id="demo-sidebar" style={{ width: '192px' }}>
                    <AvakioSidebar
                      data={[
                        {
                          id: 'dashboard',
                          value: 'Dashboard',
                          icon: <Home size={16} />,
                        },
                        {
                          id: 'messages',
                          value: 'Messages',
                          icon: <Mail size={16} />,
                        },
                        {
                          id: 'settings',
                          value: 'Settings',
                          icon: <Settings size={16} />,
                        },
                      ]}
                      collapsed={false}
                      width={192}
                      onSelect={(item) => console.log('Selected:', item.value)}
                    />
                  </div>,
                  // Main Content
                  <AvakioTemplate
                    key="demo-content"
                    id="demo-content"
                    theme={theme as any}
                    borderType="clean"
                    padding={24}
                    css={{ flex: 1, minHeight: '200px' }}
                    content={
                      <div>
                        <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px' }}>Welcome Back!</h3>
                        <p style={{ color: '#6b7280', fontSize: '14px' }}>
                          This is your main workspace. Click "Start Tour" to learn about
                          the different sections of this interface.
                        </p>
                      </div>
                    }
                  />,
                ]}
              />,
              // Footer
              <AvakioTemplate
                key="demo-footer"
                id="demo-footer"
                theme={theme as any}
                borderType="line"
                padding={12}
                css={{ background: '#fff', textAlign: 'center', fontSize: '14px', color: '#9ca3af' }}
                content={
                  <span>© 2024 Avakio Components • Privacy • Terms</span>
                }
              />,
            ]}
            css={{ border: '1px solid #e0e0e0', borderRadius: '8px', overflow: 'hidden', background: '#f9fafb' }}
          />
        </div>

        <AvakioHint
          ref={hintRef}
          steps={basicSteps}
          theme={selectedTheme}
          onStepChange={(step) => addLog(`Step changed to: ${step + 1}`)}
          onEnd={() => addLog('Tour ended')}
        />
      </section>

      {/* Click Event Section */}
      <section className="avakio-template-demo-section">
        <AvakioTemplate
          theme={theme as any}
          type="section"
          borderType="clean"
          content={
            <div>
              <h3 style={{ margin: '0 0 4px 0' }}>
                <MousePointer size={20} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                Click Event Navigation
              </h3>
              <p style={{ margin: 0, fontSize: '14px', opacity: 0.7 }}>Tour advances when user clicks the highlighted target element.</p>
            </div>
          }
        />
        <div style={{ padding: '16px' }}>
          <div style={{ marginBottom: '16px' }}>
            <AvakioButton onClick={startClickTour} size="sm" icon={<Play size={16} />}>
              Start Click Tour
            </AvakioButton>
          </div>

          <div style={{ marginBottom: '16px', fontSize: '14px', color: '#6b7280' }}>
            <p>With <code style={{ background: '#f3f4f6', padding: '2px 6px', borderRadius: '4px', fontSize: '12px' }}>event: 'click'</code>, 
            the user must click the target element to proceed. The Next button is disabled.</p>
          </div>

          <AvakioGrid
          id='avakioGrid'
            gridColumns={3}
            gridRows={1}
            height={145}
            theme={theme as any}
            cellHeight={120}
            cellMargin={16}
            cells={[
              {
                id: 'click-cell-1',                
                x: 0,
                y: 0,
                dx: 1,
                dy: 1,
                content: (
                  <div style={{ background: '#fef3c7', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: '2px solid #f59e0b', borderRadius: '8px', transition: 'transform 0.2s' }}>
                    <div style={{ fontSize: '24px', marginBottom: '8px' }}>👆</div>
                    <div style={{ fontWeight: 600, color: '#92400e' }}>Click Me First</div>
                    <div style={{ fontSize: '12px', color: '#b45309', marginTop: '4px' }}>Step 1</div>
                  </div>
                ),
              },
              {
                id: 'click-cell-2',
                x: 1,
                y: 0,
                dx: 1,
                dy: 1,
                content: (
                  <div style={{ background: '#d1fae5', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: '2px solid #10b981', borderRadius: '8px', transition: 'transform 0.2s' }}>
                    <div style={{ fontSize: '24px', marginBottom: '8px' }}>👆</div>
                    <div style={{ fontWeight: 600, color: '#065f46' }}>Then Click Me</div>
                    <div style={{ fontSize: '12px', color: '#047857', marginTop: '4px' }}>Step 2</div>
                  </div>
                ),
              },
              {
                id: 'click-cell-3',
                x: 2,
                y: 0,
                dx: 1,
                dy: 1,
                content: (
                  <div style={{ background: '#dbeafe', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: '2px solid #3b82f6', borderRadius: '8px', transition: 'transform 0.2s' }}>
                    <div style={{ fontSize: '24px', marginBottom: '8px' }}>👆</div>
                    <div style={{ fontWeight: 600, color: '#1e40af' }}>Finally Click Me</div>
                    <div style={{ fontSize: '12px', color: '#1d4ed8', marginTop: '4px' }}>Step 3</div>
                  </div>
                ),
              },
            ]}
          />
        </div>

        <AvakioHint
          ref={clickHintRef}
          steps={clickSteps}
          theme={selectedTheme}
          onStepChange={(step) => addLog(`Click tour step: ${step + 1}`)}
          onEnd={() => addLog('Click tour ended')}
        />
      </section>

      {/* Enter Event Section */}
      <section className="avakio-template-demo-section">
        <AvakioTemplate
          theme={theme as any}
          type="section"
          borderType="clean"
          content={
            <div>
              <h3 style={{ margin: '0 0 4px 0' }}>
                <Search size={20} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                Enter Key Navigation
              </h3>
              <p style={{ margin: 0, fontSize: '14px', opacity: 0.7 }}>Tour advances when user focuses the element and presses Enter key.</p>
            </div>
          }
        />
        <div style={{ padding: '16px' }}>
          <div style={{ marginBottom: '16px' }}>
            <AvakioButton onClick={startEnterTour} size="sm" icon={<Play size={16} />}>
              Start Enter Tour
            </AvakioButton>
          </div>

          <div style={{ marginBottom: '16px', fontSize: '14px', color: '#6b7280' }}>
            <p>With <code style={{ background: '#f3f4f6', padding: '2px 6px', borderRadius: '4px', fontSize: '12px' }}>event: 'enter'</code>, 
            the user must focus the input and press Enter to proceed. Great for form tutorials.</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, marginBottom: '6px', color: '#374151' }}>Username</label>
              <input
                id="enter-input-1"
                type="text"
                placeholder="Type and press Enter..."
                style={{ width: '100%', padding: '10px 14px', border: '2px solid #e5e7eb', borderRadius: '6px', fontSize: '14px', outline: 'none' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, marginBottom: '6px', color: '#374151' }}>Email</label>
              <input
                id="enter-input-2"
                type="email"
                placeholder="Enter your email and press Enter..."
                style={{ width: '100%', padding: '10px 14px', border: '2px solid #e5e7eb', borderRadius: '6px', fontSize: '14px', outline: 'none' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, marginBottom: '6px', color: '#374151' }}>Password</label>
              <input
                id="enter-input-3"
                type="password"
                placeholder="Enter password and press Enter..."
                style={{ width: '100%', padding: '10px 14px', border: '2px solid #e5e7eb', borderRadius: '6px', fontSize: '14px', outline: 'none' }}
              />
            </div>
          </div>
        </div>

        <AvakioHint
          ref={enterHintRef}
          steps={enterSteps}
          theme={selectedTheme}
          onStepChange={(step) => addLog(`Enter tour step: ${step + 1}`)}
          onEnd={() => addLog('Enter tour ended')}
        />
      </section>

      {/* Manual Navigation Section */}
      <section className="avakio-template-demo-section">
        <AvakioTemplate
          theme={theme as any}
          type="section"
          borderType="clean"
          content={
            <div>
              <h3 style={{ margin: '0 0 4px 0' }}>
                <List size={20} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                Manual Button Navigation
              </h3>
              <p style={{ margin: 0, fontSize: '14px', opacity: 0.7 }}>Tour is navigated using Previous/Next buttons only. No interaction with target elements required.</p>
            </div>
          }
        />
        <div style={{ padding: '16px' }}>
          <div style={{ marginBottom: '16px' }}>
            <AvakioButton onClick={startManualTour} size="sm" icon={<Play size={16} />}>
              Start Manual Tour
            </AvakioButton>
          </div>

          <div style={{ marginBottom: '16px', fontSize: '14px', color: '#6b7280' }}>
            <p>With <code style={{ background: '#f3f4f6', padding: '2px 6px', borderRadius: '4px', fontSize: '12px' }}>event: 'none'</code> (default), 
            users navigate using the Previous and Next buttons. This is the standard tour behavior.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            <div
              id="manual-card-1"
              style={{ background: '#f3e8ff', padding: '24px', borderRadius: '8px', textAlign: 'center', border: '2px solid #a855f7' }}
            >
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>📋</div>
              <div style={{ fontWeight: 600, color: '#6b21a8' }}>Overview</div>
              <div style={{ fontSize: '12px', color: '#7c3aed', marginTop: '4px' }}>Read-only content</div>
            </div>
            <div
              id="manual-card-2"
              style={{ background: '#fce7f3', padding: '24px', borderRadius: '8px', textAlign: 'center', border: '2px solid #ec4899' }}
            >
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>📊</div>
              <div style={{ fontWeight: 600, color: '#9d174d' }}>Statistics</div>
              <div style={{ fontSize: '12px', color: '#be185d', marginTop: '4px' }}>View metrics here</div>
            </div>
            <div
              id="manual-card-3"
              style={{ background: '#e0f2fe', padding: '24px', borderRadius: '8px', textAlign: 'center', border: '2px solid #0ea5e9' }}
            >
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>⚙️</div>
              <div style={{ fontWeight: 600, color: '#0369a1' }}>Settings</div>
              <div style={{ fontSize: '12px', color: '#0284c7', marginTop: '4px' }}>Configure options</div>
            </div>
          </div>
        </div>

        <AvakioHint
          ref={manualHintRef}
          steps={manualSteps}
          theme={selectedTheme}
          onStepChange={(step) => addLog(`Manual tour step: ${step + 1}`)}
          onEnd={() => addLog('Manual tour ended')}
        />
      </section>

      {/* Position Demo Section */}
      <section className="avakio-template-demo-section">
        <AvakioTemplate
          theme={theme as any}
          type="section"
          borderType="clean"
          content={
            <div>
              <h3 style={{ margin: '0 0 4px 0' }}>
                <MapPin size={20} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                Popup Positions
              </h3>
              <p style={{ margin: 0, fontSize: '14px', opacity: 0.7 }}>Control where the hint popup appears relative to the target element.</p>
            </div>
          }
        />
        <div style={{ padding: '16px' }}>
          <div style={{ marginBottom: '16px' }}>
            <AvakioButton onClick={startPositionTour} size="sm" icon={<Play size={16} />}>
              Start Position Demo
            </AvakioButton>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', padding: '32px' }}>
            <div></div>
            <div
              id="pos-top"
              style={{ background: '#dbeafe', padding: '16px', borderRadius: '8px', textAlign: 'center', fontWeight: 500 }}
            >
              Top
            </div>
            <div></div>

            <div
              id="pos-left"
              style={{ background: '#dcfce7', padding: '16px', borderRadius: '8px', textAlign: 'center', fontWeight: 500 }}
            >
              Left
            </div>
            <div
              id="pos-center"
              style={{ background: '#f3e8ff', padding: '16px', borderRadius: '8px', textAlign: 'center', fontWeight: 500 }}
            >
              Auto
            </div>
            <div
              id="pos-right"
              style={{ background: '#ffedd5', padding: '16px', borderRadius: '8px', textAlign: 'center', fontWeight: 500 }}
            >
              Right
            </div>

            <div></div>
            <div
              id="pos-bottom"
              style={{ background: '#fee2e2', padding: '16px', borderRadius: '8px', textAlign: 'center', fontWeight: 500 }}
            >
              Bottom
            </div>
            <div></div>
          </div>
        </div>

        <AvakioHint
          ref={positionHintRef}
          steps={positionSteps}
          theme={selectedTheme}
          onStepChange={(step) => addLog(`Position step: ${step + 1}`)}
          onEnd={() => addLog('Position tour ended')}
        />
      </section>

      {/* Themes Section */}
      <section className="avakio-template-demo-section">
        <AvakioTemplate
          theme={theme as any}
          type="section"
          borderType="clean"
          content={
            <div>
              <h3 style={{ margin: '0 0 4px 0' }}>
                <Palette size={20} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                Themes
              </h3>
              <p style={{ margin: 0, fontSize: '14px', opacity: 0.7 }}>Choose from multiple built-in themes to match your application's design.</p>
            </div>
          }
        />
        <div style={{ padding: '16px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
            {(['material', 'flat', 'compact', 'dark', 'ocean', 'sunset'] as AvakioHintTheme[]).map(
              (themeOption) => (
                <AvakioButton
                  key={themeOption}
                  variant={selectedTheme === themeOption ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedTheme(themeOption)}
                  style={{ textTransform: 'capitalize' }}
                >
                  {themeOption}
                </AvakioButton>
              )
            )}
          </div>
          <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '16px' }}>
            Selected theme: <strong style={{ textTransform: 'capitalize' }}>{selectedTheme}</strong>
          </p>
          <AvakioButton onClick={startBasicTour} variant="outline" size="sm" icon={<Lightbulb size={16} />}>
            Preview Theme
          </AvakioButton>
        </div>
      </section>

      {/* Event Log Section */}
      <section className="avakio-template-demo-section">
        <AvakioTemplate
          theme={theme as any}
          type="section"
          borderType="clean"
          content={
            <div>
              <h3 style={{ margin: '0 0 4px 0' }}>
                <List size={20} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                Event Log
              </h3>
              <p style={{ margin: 0, fontSize: '14px', opacity: 0.7 }}>Real-time log of hint events for debugging and monitoring.</p>
            </div>
          }
        />
        <div style={{ padding: '16px' }}>
          <div style={{ background: '#111827', color: '#4ade80', fontFamily: 'monospace', fontSize: '14px', padding: '16px', borderRadius: '8px', height: '192px', overflowY: 'auto', marginBottom: '16px' }}>
            {eventLog.length === 0 ? (
              <span style={{ color: '#6b7280' }}>No events yet. Start a tour to see events.</span>
            ) : (
              eventLog.map((log, idx) => (
                <div key={idx} style={{ padding: '4px 0' }}>
                  {log}
                </div>
              ))
            )}
          </div>
          <AvakioButton variant="outline" size="sm" onClick={() => setEventLog([])} icon={<RotateCcw size={16} />}>
            Clear Log
          </AvakioButton>
        </div>
      </section>

      {/* API Reference Section */}
      <section className="avakio-template-demo-section">
        <AvakioTemplate
          theme={theme as any}
          type="section"
          borderType="clean"
          content={
            <div>
              <h3 style={{ margin: '0 0 4px 0' }}>API Reference</h3>
              <p style={{ margin: 0, fontSize: '14px', opacity: 0.7 }}>Complete API documentation for the AvakioHint component.</p>
            </div>
          }
        />
        <div style={{ padding: '16px' }}>
          {/* Props Table */}
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ fontWeight: 600, marginBottom: '12px' }}>Props</h4>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', fontSize: '14px', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
                    <th style={{ textAlign: 'left', padding: '8px 16px 8px 0' }}>Prop</th>
                    <th style={{ textAlign: 'left', padding: '8px 16px 8px 0' }}>Type</th>
                    <th style={{ textAlign: 'left', padding: '8px 16px 8px 0' }}>Default</th>
                    <th style={{ textAlign: 'left', padding: '8px 0' }}>Description</th>
                  </tr>
                </thead>
                <tbody style={{ color: '#6b7280' }}>
                  <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
                    <td style={{ padding: '8px 16px 8px 0', fontFamily: 'monospace', fontSize: '12px' }}>steps</td>
                    <td style={{ padding: '8px 16px 8px 0', fontFamily: 'monospace', fontSize: '12px' }}>AvakioHintStep[]</td>
                    <td style={{ padding: '8px 16px 8px 0' }}>[]</td>
                    <td style={{ padding: '8px 0' }}>Array of step configurations</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
                    <td style={{ padding: '8px 16px 8px 0', fontFamily: 'monospace', fontSize: '12px' }}>theme</td>
                    <td style={{ padding: '8px 16px 8px 0', fontFamily: 'monospace', fontSize: '12px' }}>AvakioHintTheme</td>
                    <td style={{ padding: '8px 16px 8px 0' }}>'material'</td>
                    <td style={{ padding: '8px 0' }}>Visual theme</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
                    <td style={{ padding: '8px 16px 8px 0', fontFamily: 'monospace', fontSize: '12px' }}>prevButton</td>
                    <td style={{ padding: '8px 16px 8px 0', fontFamily: 'monospace', fontSize: '12px' }}>string | false</td>
                    <td style={{ padding: '8px 16px 8px 0' }}>'Previous'</td>
                    <td style={{ padding: '8px 0' }}>Previous button text or false to hide</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
                    <td style={{ padding: '8px 16px 8px 0', fontFamily: 'monospace', fontSize: '12px' }}>nextButton</td>
                    <td style={{ padding: '8px 16px 8px 0', fontFamily: 'monospace', fontSize: '12px' }}>string</td>
                    <td style={{ padding: '8px 16px 8px 0' }}>'Next'</td>
                    <td style={{ padding: '8px 0' }}>Next button text</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
                    <td style={{ padding: '8px 16px 8px 0', fontFamily: 'monospace', fontSize: '12px' }}>finishButton</td>
                    <td style={{ padding: '8px 16px 8px 0', fontFamily: 'monospace', fontSize: '12px' }}>string</td>
                    <td style={{ padding: '8px 16px 8px 0' }}>'Finish'</td>
                    <td style={{ padding: '8px 0' }}>Finish button text (last step)</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
                    <td style={{ padding: '8px 16px 8px 0', fontFamily: 'monospace', fontSize: '12px' }}>padding</td>
                    <td style={{ padding: '8px 16px 8px 0', fontFamily: 'monospace', fontSize: '12px' }}>number</td>
                    <td style={{ padding: '8px 16px 8px 0' }}>8</td>
                    <td style={{ padding: '8px 0' }}>Padding around highlighted element</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
                    <td style={{ padding: '8px 16px 8px 0', fontFamily: 'monospace', fontSize: '12px' }}>onStepChange</td>
                    <td style={{ padding: '8px 16px 8px 0', fontFamily: 'monospace', fontSize: '12px' }}>(step: number) =&gt; void</td>
                    <td style={{ padding: '8px 16px 8px 0' }}>-</td>
                    <td style={{ padding: '8px 0' }}>Called when step changes</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
                    <td style={{ padding: '8px 16px 8px 0', fontFamily: 'monospace', fontSize: '12px' }}>onEnd</td>
                    <td style={{ padding: '8px 16px 8px 0', fontFamily: 'monospace', fontSize: '12px' }}>() =&gt; void</td>
                    <td style={{ padding: '8px 16px 8px 0' }}>-</td>
                    <td style={{ padding: '8px 0' }}>Called when tour ends</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Step Configuration */}
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ fontWeight: 600, marginBottom: '12px' }}>AvakioHintStep</h4>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', fontSize: '14px', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
                    <th style={{ textAlign: 'left', padding: '8px 16px 8px 0' }}>Property</th>
                    <th style={{ textAlign: 'left', padding: '8px 16px 8px 0' }}>Type</th>
                    <th style={{ textAlign: 'left', padding: '8px 16px 8px 0' }}>Required</th>
                    <th style={{ textAlign: 'left', padding: '8px 0' }}>Description</th>
                  </tr>
                </thead>
                <tbody style={{ color: '#6b7280' }}>
                  <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
                    <td style={{ padding: '8px 16px 8px 0', fontFamily: 'monospace', fontSize: '12px' }}>el</td>
                    <td style={{ padding: '8px 16px 8px 0', fontFamily: 'monospace', fontSize: '12px' }}>string</td>
                    <td style={{ padding: '8px 16px 8px 0' }}>Yes</td>
                    <td style={{ padding: '8px 0' }}>CSS selector for target element</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
                    <td style={{ padding: '8px 16px 8px 0', fontFamily: 'monospace', fontSize: '12px' }}>title</td>
                    <td style={{ padding: '8px 16px 8px 0', fontFamily: 'monospace', fontSize: '12px' }}>string</td>
                    <td style={{ padding: '8px 16px 8px 0' }}>No</td>
                    <td style={{ padding: '8px 0' }}>Step title</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
                    <td style={{ padding: '8px 16px 8px 0', fontFamily: 'monospace', fontSize: '12px' }}>text</td>
                    <td style={{ padding: '8px 16px 8px 0', fontFamily: 'monospace', fontSize: '12px' }}>string | ReactNode</td>
                    <td style={{ padding: '8px 16px 8px 0' }}>No</td>
                    <td style={{ padding: '8px 0' }}>Step description content</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
                    <td style={{ padding: '8px 16px 8px 0', fontFamily: 'monospace', fontSize: '12px' }}>event</td>
                    <td style={{ padding: '8px 16px 8px 0', fontFamily: 'monospace', fontSize: '12px' }}>'click' | 'enter' | 'none'</td>
                    <td style={{ padding: '8px 16px 8px 0' }}>No</td>
                    <td style={{ padding: '8px 0' }}>Event to trigger next step</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
                    <td style={{ padding: '8px 16px 8px 0', fontFamily: 'monospace', fontSize: '12px' }}>position</td>
                    <td style={{ padding: '8px 16px 8px 0', fontFamily: 'monospace', fontSize: '12px' }}>'top' | 'bottom' | 'left' | 'right' | 'auto'</td>
                    <td style={{ padding: '8px 16px 8px 0' }}>No</td>
                    <td style={{ padding: '8px 0' }}>Popup position relative to target</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
                    <td style={{ padding: '8px 16px 8px 0', fontFamily: 'monospace', fontSize: '12px' }}>padding</td>
                    <td style={{ padding: '8px 16px 8px 0', fontFamily: 'monospace', fontSize: '12px' }}>number</td>
                    <td style={{ padding: '8px 16px 8px 0' }}>No</td>
                    <td style={{ padding: '8px 0' }}>Override default padding for this step</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Ref Methods */}
          <div>
            <h4 style={{ fontWeight: 600, marginBottom: '12px' }}>Ref Methods</h4>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', fontSize: '14px', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
                    <th style={{ textAlign: 'left', padding: '8px 16px 8px 0' }}>Method</th>
                    <th style={{ textAlign: 'left', padding: '8px 16px 8px 0' }}>Return Type</th>
                    <th style={{ textAlign: 'left', padding: '8px 0' }}>Description</th>
                  </tr>
                </thead>
                <tbody style={{ color: '#6b7280' }}>
                  <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
                    <td style={{ padding: '8px 16px 8px 0', fontFamily: 'monospace', fontSize: '12px' }}>start(stepIndex?)</td>
                    <td style={{ padding: '8px 16px 8px 0', fontFamily: 'monospace', fontSize: '12px' }}>void</td>
                    <td style={{ padding: '8px 0' }}>Start tour at optional step index</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
                    <td style={{ padding: '8px 16px 8px 0', fontFamily: 'monospace', fontSize: '12px' }}>end()</td>
                    <td style={{ padding: '8px 16px 8px 0', fontFamily: 'monospace', fontSize: '12px' }}>void</td>
                    <td style={{ padding: '8px 0' }}>End the tour</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
                    <td style={{ padding: '8px 16px 8px 0', fontFamily: 'monospace', fontSize: '12px' }}>next()</td>
                    <td style={{ padding: '8px 16px 8px 0', fontFamily: 'monospace', fontSize: '12px' }}>void</td>
                    <td style={{ padding: '8px 0' }}>Go to next step</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
                    <td style={{ padding: '8px 16px 8px 0', fontFamily: 'monospace', fontSize: '12px' }}>prev()</td>
                    <td style={{ padding: '8px 16px 8px 0', fontFamily: 'monospace', fontSize: '12px' }}>void</td>
                    <td style={{ padding: '8px 0' }}>Go to previous step</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
                    <td style={{ padding: '8px 16px 8px 0', fontFamily: 'monospace', fontSize: '12px' }}>goTo(stepIndex)</td>
                    <td style={{ padding: '8px 16px 8px 0', fontFamily: 'monospace', fontSize: '12px' }}>void</td>
                    <td style={{ padding: '8px 0' }}>Go to specific step</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
                    <td style={{ padding: '8px 16px 8px 0', fontFamily: 'monospace', fontSize: '12px' }}>getCurrentStep()</td>
                    <td style={{ padding: '8px 16px 8px 0', fontFamily: 'monospace', fontSize: '12px' }}>number</td>
                    <td style={{ padding: '8px 0' }}>Get current step index</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
                    <td style={{ padding: '8px 16px 8px 0', fontFamily: 'monospace', fontSize: '12px' }}>isVisible()</td>
                    <td style={{ padding: '8px 16px 8px 0', fontFamily: 'monospace', fontSize: '12px' }}>boolean</td>
                    <td style={{ padding: '8px 0' }}>Check if tour is visible</td>
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














