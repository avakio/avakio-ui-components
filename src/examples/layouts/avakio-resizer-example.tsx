import React, { useState } from 'react';
import { AvakioResizer } from '../../components/avakio/layouts/avakio-resizer';
import { AvakioTemplate } from '../../components/avakio/views/avakio-template/avakio-template';

export function AvakioResizerExample() {
  const [leftWidth, setLeftWidth] = useState(250);
  const [topHeight, setTopHeight] = useState(150);

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ marginBottom: '16px', fontSize: '24px', fontWeight: 'bold' }}>AvakioResizer Examples</h2>
      <p style={{ marginBottom: '24px', color: '#666' }}>
        Drag the resizer handles to adjust panel sizes. Demonstrates both horizontal and vertical resizers with min/max constraints.
      </p>
      
      <div style={{ marginBottom: '32px' }}>
        <h3 style={{ marginBottom: '12px', fontSize: '18px', fontWeight: '600' }}>Vertical Resizer (Columns)</h3>
        <div style={{ display: 'flex', flexDirection: 'row', height: '300px', border: '1px solid #e0e0e0' }}>
          <AvakioTemplate
            id="resizer-left-panel"
            testId="resizer-left-panel"
            theme="material"
            borderType="clean"
            width={leftWidth}
            minWidth={150}
            maxWidth={400}
            height="100%"
            css={{ 
              background: '#f5f5f5',
              overflow: 'auto',
              flexShrink: 0
            }}
            padding={20}
            content={
              <>
                <h4>Left Panel</h4>
                <p>Width: {leftWidth}px</p>
                <p>Min: 150px, Max: 400px</p>
              </>
            }
          />
          <AvakioResizer
            id="resizer-vertical"
            testId="resizer-vertical"
            direction="vertical"
            theme="material"
            onResize={(delta) => {
              setLeftWidth(prev => Math.max(150, Math.min(400, prev + delta)));
            }}
          />
          <AvakioTemplate
            id="resizer-right-panel"
            testId="resizer-right-panel"
            theme="material"
            borderType="clean"
            css={{ 
              background: '#f5f5f5',
              overflow: 'auto',
              flex: '1 1 0',
              minWidth: 0
            }}
            padding={20}
            content={
              <>
                <h4>Right Panel</h4>
                <p>This panel automatically fills remaining space.</p>
              </>
            }
          />
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: '12px', fontSize: '18px', fontWeight: '600' }}>Horizontal Resizer (Rows)</h3>
        <div style={{ display: 'flex', flexDirection: 'column', height: '400px', border: '1px solid #e0e0e0' }}>
          <AvakioTemplate
            id="resizer-top-panel"
            testId="resizer-top-panel"
            theme="material"
            borderType="clean"
            height={topHeight}
            minHeight={100}
            maxHeight={300}
            css={{ 
              background: '#f5f5f5',
              overflow: 'auto',
              flexShrink: 0
            }}
            padding={20}
            content={
              <>
                <h4>Top Panel</h4>
                <p>Height: {topHeight}px</p>
                <p>Min: 100px, Max: 300px</p>
              </>
            }
          />
          <AvakioResizer
            id="resizer-horizontal"
            testId="resizer-horizontal"
            direction="horizontal"
            theme="material"
            onResize={(delta) => {
              setTopHeight(prev => Math.max(100, Math.min(300, prev + delta)));
            }}
          />
          <AvakioTemplate
            id="resizer-bottom-panel"
            testId="resizer-bottom-panel"
            theme="material"
            borderType="clean"
            css={{ 
              background: '#f5f5f5',
              overflow: 'auto',
              flex: '1 1 0',
              minHeight: 0
            }}
            padding={20}
            content={
              <>
                <h4>Bottom Panel</h4>
                <p>This panel automatically fills remaining vertical space.</p>
              </>
            }
          />
        </div>
      </div>
    </div>
  );
}












