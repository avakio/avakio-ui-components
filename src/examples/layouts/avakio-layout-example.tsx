import React, { useState, useEffect } from 'react';
import { AvakioLayout } from '../../components/avakio/layouts/avakio-layout/avakio-layout';
import { AvakioView } from '../../components/avakio/views/avakio-view/avakio-view';
import { AvakioButton } from '../../components/avakio/ui-controls/avakio-button/avakio-button';
import { AvakioResizer } from '../../components/avakio/layouts/avakio-resizer/avakio-resizer';
import { AvakioTemplate } from '../../components/avakio/views/avakio-template/avakio-template';
import { ErrorBoundary } from '../../components/avakio/ErrorBoundary';
import './avakio-layout-example.css';
import { Layout, Grid, Rows, Columns, Box, Square, Circle, Triangle, Move, ArrowLeftRight, ArrowUpDown } from 'lucide-react';

export function AvakioLayoutExample() {
  
  
  // State for resizable panels
  const [leftPanelWidth, setLeftPanelWidth] = useState(200);
  const [topPanelHeight, setTopPanelHeight] = useState(150);
  const [sidebarWidth, setSidebarWidth] = useState(250);

  // Sync with global theme
  

  return (
    <AvakioLayout
      id="avakio-layout-example-container"
      testId="avakio-layout-example-container"
      type="clean"
      css={{ minHeight: '100vh' }}
      rows={[
        <div className="avakio-layout-demo-container" key="demo-container">
          {/* Header */}
          <ErrorBoundary>
            <AvakioTemplate
              id="layout-example-header"
              testId="layout-example-header"
              type="header"
              borderType="clean"
              content={
                <div>
                  <p style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: 500, letterSpacing: '0.5px', textTransform: 'uppercase', opacity: 0.9 }}>Avakio Components</p>
                  <h1 style={{ margin: '0 0 12px 0', fontSize: '32px', fontWeight: 600 }}>AvakioLayout Component</h1>
                  <p style={{ margin: 0, fontSize: '16px', opacity: 0.95 }}>
                    A flexible layout container component for organizing views in rows and columns. Supports responsive behavior, multiple themes, and various layout types.
                  </p>
                </div>
              }
            />
          </ErrorBoundary>

        {/* Basic Rows Layout */}
        <section className="avakio-layout-section">
          <h3 className="avakio-layout-section-title">Basic Rows Layout</h3>
          <p className="avakio-layout-section-description">Vertical arrangement of views.</p>
          <AvakioLayout
            id="layout-rows-basic"
            testId="layout-rows-basic"
            rows={[
              <ErrorBoundary>
                <AvakioTemplate
                  id="row-1"
                  testId="row-1"
                  borderType="material"
                  css={{ background: '#1CA1C1', color: 'white' }}
                  padding={20}
                  content={
                    <div className="demo-box">
                      <Rows size={24} />
                      <span>Row 1</span>
                    </div>
                  }
                />
              </ErrorBoundary>,
              <ErrorBoundary>
                <AvakioTemplate
                  id="row-2"
                  testId="row-2"
                  borderType="material"
                  css={{ background: '#5E81AC', color: 'white' }}
                  padding={20}
                  content={
                    <div className="demo-box">
                      <Rows size={24} />
                      <span>Row 2</span>
                    </div>
                  }
                />
              </ErrorBoundary>,
              <ErrorBoundary>
                <AvakioTemplate
                  id="row-3"
                  testId="row-3"
                  borderType="material"
                  css={{ background: '#00796B', color: 'white' }}
                  padding={20}
                  content={
                    <div className="demo-box">
                      <Rows size={24} />
                      <span>Row 3</span>
                    </div>
                  }
                />
              </ErrorBoundary>,
            ]}
            type="space"
            padding={8}
          />
        </section>

        {/* Basic Cols Layout */}
        <section className="avakio-layout-section">
          <h3 className="avakio-layout-section-title">Basic Columns Layout</h3>
          <p className="avakio-layout-section-description">Horizontal arrangement of views.</p>
          <AvakioLayout
            id="layout-cols-basic"
            testId="layout-cols-basic"
            cols={[
              <ErrorBoundary>
                <AvakioTemplate
                  id="col-1"
                  testId="col-1"
                  borderType="material"
                  css={{ background: '#f57c00', color: 'white', flex: 1 }}
                  padding={20}
                  content={
                    <div className="demo-box">
                      <Columns size={24} />
                      <span>Col 1</span>
                    </div>
                  }
                />
              </ErrorBoundary>,
              <ErrorBoundary>
                <AvakioTemplate
                  id="col-2"
                  testId="col-2"
                  borderType="material"
                  css={{ background: '#0277BD', color: 'white', flex: 1 }}
                  padding={20}
                  content={
                    <div className="demo-box">
                      <Columns size={24} />
                      <span>Col 2</span>
                    </div>
                  }
                />
              </ErrorBoundary>,
              <ErrorBoundary>
                <AvakioTemplate
                  id="col-3"
                  testId="col-3"
                  borderType="material"
                  css={{ background: '#3b82f6', color: 'white', flex: 1 }}
                  padding={20}
                  content={
                    <div className="demo-box">
                      <Columns size={24} />
                      <span>Col 3</span>
                    </div>
                  }
                />
              </ErrorBoundary>,
            ]}
            type="space"
            padding={8}
          />
        </section>

        {/* Complex Nested Layout */}
        <section className="avakio-layout-section">
          <h3 className="avakio-layout-section-title">Complex Nested Layout</h3>
          <p className="avakio-layout-section-description">Rows containing columns and vice versa.</p>
          <AvakioLayout
            id="layout-nested"
            testId="layout-nested"
            rows={[
              <ErrorBoundary>
                <AvakioTemplate
                  id="nested-header"
                  testId="nested-header"
                  borderType="material"
                  css={{ background: '#1CA1C1', color: 'white' }}
                  padding={20}
                  content={
                    <div className="demo-box">
                      <Layout size={24} />
                      <span>Header Row</span>
                    </div>
                  }
                />
              </ErrorBoundary>,
              <AvakioLayout
                cols={[
                  <ErrorBoundary>
                    <AvakioTemplate
                      id="nested-sidebar"
                      testId="nested-sidebar"
                      borderType="material"
                      css={{ background: '#5E81AC', color: 'white', flex: 1 }}
                      padding={40}
                      content={
                        <div className="demo-box">
                          <Box size={24} />
                          <span>Sidebar</span>
                        </div>
                      }
                    />
                  </ErrorBoundary>,
                  <AvakioLayout
                    rows={[
                      <ErrorBoundary>
                        <AvakioTemplate
                          id="nested-content-1"
                          testId="nested-content-1"
                          borderType="material"
                          css={{ background: '#00796B', color: 'white' }}
                          padding={20}
                          content={
                            <div className="demo-box">
                              <Square size={24} />
                              <span>Content Area 1</span>
                            </div>
                          }
                        />
                      </ErrorBoundary>,
                      <ErrorBoundary>
                        <AvakioTemplate
                          id="nested-content-2"
                          testId="nested-content-2"
                          borderType="material"
                          css={{ background: '#f57c00', color: 'white' }}
                          padding={20}
                          content={
                            <div className="demo-box">
                              <Circle size={24} />
                              <span>Content Area 2</span>
                            </div>
                          }
                        />
                      </ErrorBoundary>,
                    ]}
                    type="line"
                  />,
                ]}
                type="clean"
              />,
              <ErrorBoundary>
                <AvakioTemplate
                  id="nested-footer"
                  testId="nested-footer"
                  borderType="material"
                  css={{ background: '#3b82f6', color: 'white' }}
                  padding={20}
                  content={
                    <div className="demo-box">
                      <Triangle size={24} />
                      <span>Footer Row</span>
                    </div>
                  }
                />
              </ErrorBoundary>,
            ]}
            type="space"
            padding={8}
          />
        </section>

        {/* Layout Types */}
        <section className="avakio-layout-section">
          <h3 className="avakio-layout-section-title">Layout Types</h3>
          <p className="avakio-layout-section-description">Different border styles: space, wide, clean, line, head, material.</p>
          <div className="layout-types-grid">
            <div>
              <h4>Space</h4>
              <AvakioLayout
                type="space"
                rows={[
                  <div className="demo-box-small">Row 1</div>,
                  <div className="demo-box-small">Row 2</div>,
                  <div className="demo-box-small">Row 3</div>,
                ]}
              />
            </div>
            <div>
              <h4>Wide</h4>
              <AvakioLayout
                type="wide"
                rows={[
                  <div className="demo-box-small">Row 1</div>,
                  <div className="demo-box-small">Row 2</div>,
                  <div className="demo-box-small">Row 3</div>,
                ]}
              />
            </div>
            <div>
              <h4>Clean</h4>
              <AvakioLayout
                type="clean"
                rows={[
                  <div className="demo-box-small">Row 1</div>,
                  <div className="demo-box-small">Row 2</div>,
                  <div className="demo-box-small">Row 3</div>,
                ]}
              />
            </div>
            <div>
              <h4>Line</h4>
              <AvakioLayout
                type="line"
                rows={[
                  <div className="demo-box-small">Row 1</div>,
                  <div className="demo-box-small">Row 2</div>,
                  <div className="demo-box-small">Row 3</div>,
                ]}
              />
            </div>
            <div>
              <h4>Head</h4>
              <AvakioLayout
                type="head"
                rows={[
                  <div className="demo-box-small">Header</div>,
                  <div className="demo-box-small">Body 1</div>,
                  <div className="demo-box-small">Body 2</div>,
                ]}
              />
            </div>
            <div>
              <h4>Material</h4>
              <AvakioLayout
                type="material"
                rows={[
                  <div className="demo-box-small">Row 1</div>,
                  <div className="demo-box-small">Row 2</div>,
                  <div className="demo-box-small">Row 3</div>,
                ]}
              />
            </div>
          </div>
        </section>

        {/* Padding & Spacing */}
        <section className="avakio-layout-section">
          <h3 className="avakio-layout-section-title">Padding & Spacing</h3>
          <p className="avakio-layout-section-description">Control spacing with padding, gap, and margin properties.</p>
          <div className="layout-types-grid">
            <div>
              <h4>With Padding (16px)</h4>
              <AvakioLayout
                type="line"
                padding={16}
                rows={[
                  <div className="demo-box-small">Row 1</div>,
                  <div className="demo-box-small">Row 2</div>,
                ]}
              />
            </div>
            <div>
              <h4>With Gap (12px)</h4>
              <AvakioLayout
                type="clean"
                gap={12}
                rows={[
                  <div className="demo-box-small">Row 1</div>,
                  <div className="demo-box-small">Row 2</div>,
                ]}
              />
            </div>
            <div>
              <h4>Padding X & Y</h4>
              <AvakioLayout
                type="line"
                paddingX={20}
                paddingY={8}
                rows={[
                  <div className="demo-box-small">Row 1</div>,
                  <div className="demo-box-small">Row 2</div>,
                ]}
              />
            </div>
          </div>
        </section>

        {/* Responsive Layout */}
        <section className="avakio-layout-section">
          <h3 className="avakio-layout-section-title">Responsive Layout</h3>
          <p className="avakio-layout-section-description">Layout adapts to screen size (resize window to see effect).</p>
          <AvakioLayout
            id="layout-responsive"
            testId="layout-responsive"
            responsive
            cols={[
              <ErrorBoundary>
                <AvakioTemplate
                  id="responsive-panel-1"
                  testId="responsive-panel-1"
                  borderType="material"
                  css={{ background: '#1CA1C1', color: 'white', flex: 1, minWidth: '200px' }}
                  padding={30}
                  content={
                    <div className="demo-box">
                      <Grid size={24} />
                      <span>Panel 1</span>
                    </div>
                  }
                />
              </ErrorBoundary>,
              <ErrorBoundary>
                <AvakioTemplate
                  id="responsive-panel-2"
                  testId="responsive-panel-2"
                  borderType="material"
                  css={{ background: '#5E81AC', color: 'white', flex: 1, minWidth: '200px' }}
                  padding={30}
                  content={
                    <div className="demo-box">
                      <Grid size={24} />
                      <span>Panel 2</span>
                    </div>
                  }
                />
              </ErrorBoundary>,
              <ErrorBoundary>
                <AvakioTemplate
                  id="responsive-panel-3"
                  testId="responsive-panel-3"
                  borderType="material"
                  css={{ background: '#00796B', color: 'white', flex: 1, minWidth: '200px' }}
                  padding={30}
                  content={
                    <div className="demo-box">
                      <Grid size={24} />
                      <span>Panel 3</span>
                    </div>
                  }
                />
              </ErrorBoundary>,
            ]}
            type="space"
            padding={8}
            gap={8}
          />
        </section>

        {/* Alignment & Justification */}
        <section className="avakio-layout-section">
          <h3 className="avakio-layout-section-title">Alignment & Justification</h3>
          <p className="avakio-layout-section-description">Control item alignment and distribution using align (left/center/right) and justify props.</p>
          <div className="layout-types-grid">
            <div>
              <h4>Align: Left</h4>
              <AvakioLayout
                type="clean"
                align="left"
                height={150}
                cols={[
                  <div className="demo-box-small" style={{ height: '60px' }}>Item 1</div>,
                  <div className="demo-box-small" style={{ height: '80px' }}>Item 2</div>,
                ]}
              />
            </div>
            <div>
              <h4>Align: Center</h4>
              <AvakioLayout
                type="clean"
                align="center"
                height={150}
                cols={[
                  <div className="demo-box-small" style={{ height: '60px' }}>Item 1</div>,
                  <div className="demo-box-small" style={{ height: '80px' }}>Item 2</div>,
                ]}
              />
            </div>
            <div>
              <h4>Align: Right</h4>
              <AvakioLayout
                type="clean"
                align="right"
                height={150}
                cols={[
                  <div className="demo-box-small" style={{ height: '60px' }}>Item 1</div>,
                  <div className="demo-box-small" style={{ height: '80px' }}>Item 2</div>,
                ]}
              />
            </div>
            <div>
              <h4>Justify: Space Between</h4>
              <AvakioLayout
                type="clean"
                justify="space-between"
                cols={[
                  <div className="demo-box-small">A</div>,
                  <div className="demo-box-small">B</div>,
                  <div className="demo-box-small">C</div>,
                ]}
              />
            </div>
            <div>
              <h4>Justify: Center</h4>
              <AvakioLayout
                type="clean"
                justify="center"
                cols={[
                  <div className="demo-box-small">X</div>,
                  <div className="demo-box-small">Y</div>,
                ]}
              />
            </div>
          </div>
        </section>

        {/* Resizer Examples */}
        <section className="avakio-layout-section">
          <h3 className="avakio-layout-section-title">
            <Move size={20} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
            Resizable Layouts
          </h3>
          <p className="avakio-layout-section-description">
            Drag the resizer handles to adjust panel sizes. Resizers can be placed between columns or rows.
          </p>
          
          {/* Horizontal Resizer Example */}
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ marginBottom: '12px' }}>
              <ArrowLeftRight size={16} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
              Horizontal Resizer (Drag to resize columns)
            </h4>
            <div style={{ display: 'flex', flexDirection: 'row', height: 'min(500px, 60vh)', minHeight: '300px', border: '1px solid #e0e0e0' }}>
              <ErrorBoundary>
                <AvakioTemplate
                  id="layout-left-panel"
                  testId="layout-left-panel"
                  borderType="clean"
                  width={leftPanelWidth}
                  minWidth={150}
                  maxWidth={400}
                  height="100%"
                  css={{ 
                    overflow: 'auto',
                    flexShrink: 0
                  }}
                  padding={20}
                  content={
                    <>
                      <h4>Left Sidebar</h4>
                      <p>Width: {leftPanelWidth}px</p>
                      <p>Min: 150px, Max: 400px</p>
                      <p>Drag the resizer handle to adjust the width of this panel.</p>
                    </>
                  }
                />
              </ErrorBoundary>
              <AvakioResizer
                id="layout-vertical-resizer"
                testId="layout-vertical-resizer"
                direction="vertical"
                onResize={(delta) => {
                  setLeftPanelWidth(prev => Math.max(150, Math.min(400, prev + delta)));
                }}
              />
              <ErrorBoundary>
                <AvakioTemplate
                  id="layout-right-panel"
                  testId="layout-right-panel"
                  borderType="clean"
                  css={{        
                    overflow: 'auto',
                    flex: '1 1 0',
                    minWidth: 0
                  }}
                  padding={20}
                  content={
                    <>
                      <h4>Main Content Area</h4>
                      <p>This panel takes up the remaining space.</p>
                      <p>It automatically adjusts when you resize the left sidebar.</p>
                      <div style={{ marginTop: '20px', padding: '12px', background: 'rgba(0,0,0,0.2)', borderRadius: '4px' }}>
                        <strong>Resizer Features:</strong>
                        <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
                          <li>Smooth dragging with visual feedback</li>
                          <li>Min/max width constraints</li>
                          <li>Theme-aware styling</li>
                          <li>Accessible with ARIA attributes</li>
                        </ul>
                      </div>
                    </>
                  }
                />
              </ErrorBoundary>
            </div>
          </div>

          {/* Vertical Resizer Example */}
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ marginBottom: '12px' }}>
              <ArrowUpDown size={16} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
              Vertical Resizer (Drag to resize rows)
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', height: 'min(400px, 50vh)', minHeight: '300px', border: '1px solid #e0e0e0' }}>
              <ErrorBoundary>
                <AvakioTemplate
                  id="layout-top-panel"
                  testId="layout-top-panel"
                  borderType="clean"
                  height={topPanelHeight}
                  minHeight={100}
                  maxHeight={250}
                  css={{ 
                    background: '#00796B',
                    color: 'white',
                    overflow: 'auto',
                    flexShrink: 0
                  }}
                  padding={20}
                  content={
                    <>
                      <h4>Top Panel</h4>
                      <p>Height: {topPanelHeight}px</p>
                      <p>Min: 100px, Max: 250px</p>
                      <p>Drag the horizontal resizer below to adjust the height.</p>
                    </>
                  }
                />
              </ErrorBoundary>
              <AvakioResizer
                id="layout-horizontal-resizer"
                testId="layout-horizontal-resizer"
                direction="horizontal"
                onResize={(delta) => {
                  setTopPanelHeight(prev => Math.max(100, Math.min(250, prev + delta)));
                }}
              />
              <ErrorBoundary>
                <AvakioTemplate
                  id="layout-bottom-panel"
                  testId="layout-bottom-panel"
                  borderType="clean"
                  css={{ 
                    background: '#f57c00',
                    color: 'white',
                    overflow: 'auto',
                    flex: '1 1 0',
                    minHeight: 0
                  }}
                  padding={20}
                  content={
                    <>
                      <h4>Bottom Panel</h4>
                      <p>This panel automatically fills the remaining vertical space.</p>
                      <div style={{ marginTop: '20px' }}>
                        <p><strong>Try it out:</strong></p>
                        <p>1. Hover over the resizer line to see the highlight</p>
                        <p>2. Click and drag to resize the panels</p>
                        <p>3. The panels respect their min/max constraints</p>
                      </div>
                    </>
                  }
                />
              </ErrorBoundary>
            </div>
          </div>

          {/* Complex Resizable Layout */}
          <div>
            <h4 style={{ marginBottom: '12px' }}>
              <Grid size={16} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
              Complex Resizable Layout (Both directions)
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', height: 'min(500px, 60vh)', minHeight: '350px', border: '1px solid #e0e0e0' }}>
              <div style={{ padding: '12px', background: '#f8f9fa', borderBottom: '1px solid #e0e0e0' }}>
                <h4 style={{ margin: 0 }}>Application Header</h4>
              </div>
              <div style={{ display: 'flex', flexDirection: 'row', flex: 1, minHeight: 0 }}>
                <ErrorBoundary>
                  <AvakioTemplate
                    id="complex-sidebar"
                    testId="complex-sidebar"
                    borderType="clean"
                    width={sidebarWidth}
                    minWidth={180}
                    maxWidth={350}
                    height="100%"
                    css={{ 
                      background: '#fafafa',
                      overflow: 'auto',
                      flexShrink: 0
                    }}
                    padding={16}
                    content={
                      <>
                        <h4>Sidebar</h4>
                        <p style={{ fontSize: '12px', opacity: 0.8 }}>Width: {sidebarWidth}px</p>
                        <ul style={{ listStyle: 'none', padding: 0, marginTop: '16px' }}>
                          <li style={{ padding: '8px', marginBottom: '4px', background: 'rgba(28, 161, 193, 0.1)', borderRadius: '4px' }}>📊 Dashboard</li>
                          <li style={{ padding: '8px', marginBottom: '4px' }}>📈 Analytics</li>
                          <li style={{ padding: '8px', marginBottom: '4px' }}>📋 Reports</li>
                          <li style={{ padding: '8px', marginBottom: '4px' }}>⚙️ Settings</li>
                          <li style={{ padding: '8px', marginBottom: '4px' }}>👤 Profile</li>
                        </ul>
                      </>
                    }
                  />
                </ErrorBoundary>
                <AvakioResizer
                  id="complex-vertical-resizer"
                  testId="complex-vertical-resizer"
                  direction="vertical"
                  onResize={(delta) => {
                    setSidebarWidth(prev => Math.max(180, Math.min(350, prev + delta)));
                  }}
                />
                <ErrorBoundary>
                  <AvakioTemplate
                    id="complex-main-content"
                    testId="complex-main-content"
                    borderType="clean"
                    css={{ 
                      overflow: 'auto',
                      flex: '1 1 0',
                      minWidth: 0
                    }}
                    padding={20}
                    content={
                      <>
                        <h3>Main Content Area</h3>
                        <p>This is a resizable dashboard layout with a sidebar that can be adjusted by dragging the vertical resizer.</p>
                        <div style={{ marginTop: '20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                          <div className="demo-box-small" style={{ padding: '20px', background: '#1CA1C1', color: 'white' }}>
                            <h4>Card 1</h4>
                            <p>Content</p>
                          </div>
                          <div className="demo-box-small" style={{ padding: '20px', background: '#5E81AC', color: 'white' }}>
                            <h4>Card 2</h4>
                            <p>Content</p>
                          </div>
                          <div className="demo-box-small" style={{ padding: '20px', background: '#00796B', color: 'white' }}>
                            <h4>Card 3</h4>
                            <p>Content</p>
                          </div>
                          <div className="demo-box-small" style={{ padding: '20px', background: '#f57c00', color: 'white' }}>
                            <h4>Card 4</h4>
                            <p>Content</p>
                          </div>
                        </div>
                        <div style={{ marginTop: '24px', padding: '16px', background: 'rgba(0,0,0,0.03)', borderRadius: '8px' }}>
                          <h4>Responsive Behavior</h4>
                          <p>Try resizing your browser window. The layout automatically adapts to smaller screens by stacking vertically.</p>
                        </div>
                      </>
                    }
                  />
                </ErrorBoundary>
              </div>
            </div>
          </div>
        </section>

        {/* Real-world Example */}
        <section className="avakio-layout-section">
          <h3 className="avakio-layout-section-title">Real-world Dashboard Example</h3>
          <p className="avakio-layout-section-description">Complete layout with header, sidebar, content, and footer.</p>
          <AvakioLayout
            id="layout-dashboard"
            testId="layout-dashboard"
            rows={[
              <div style={{ padding: '16px', background: '#f8f9fa', borderBottom: '1px solid #e0e0e0' }}>
                <h3 style={{ margin: 0 }}>Dashboard Header</h3>
              </div>,
              <AvakioLayout
                cols={[
                  <AvakioTemplate
                    id="dashboard-nav"
                    testId="dashboard-nav"
                    borderType="clean"
                    css={{ minWidth: '200px', background: '#fafafa' }}
                    padding={16}
                    content={
                      <>
                        <h4>Navigation</h4>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                          <li style={{ padding: '8px 0' }}>📊 Dashboard</li>
                          <li style={{ padding: '8px 0' }}>📈 Analytics</li>
                          <li style={{ padding: '8px 0' }}>⚙️ Settings</li>
                        </ul>
                      </>
                    }
                  />,
                  <AvakioLayout
                    rows={[
                      <div style={{ padding: '20px', flex: 1 }}>
                        <h3>Main Content</h3>
                        <p>This is where your main content goes. The layout automatically handles spacing and borders based on the selected theme.</p>
                        <AvakioLayout
                          cols={[
                            <div className="demo-box" style={{ padding: '20px', flex: 1 }}>
                              <h4>Widget 1</h4>
                              <p>Statistics</p>
                            </div>,
                            <div className="demo-box" style={{ padding: '20px', flex: 1 }}>
                              <h4>Widget 2</h4>
                              <p>Charts</p>
                            </div>,
                            <div className="demo-box" style={{ padding: '20px', flex: 1 }}>
                              <h4>Widget 3</h4>
                              <p>Reports</p>
                            </div>,
                          ]}
                          type="material"
                          gap={12}
                        />
                      </div>,
                    ]}
                    type="clean"
                  />,
                ]}
                type="clean"
                css={{ flex: 1 }}
              />,
              <div style={{ padding: '12px', textAlign: 'center', background: '#f0f0f0', borderTop: '1px solid #e0e0e0', fontSize: '14px' }}>
                © 2025 Dashboard Footer
              </div>,
            ]}
            type="clean"
            height={500}
          />
        </section>
        </div>,
      ]}
    />
  );
}

















