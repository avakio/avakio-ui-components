import React, { useRef, useState } from 'react';
import { AvakioLabel, AvakioLabelRef } from '../../components/avakio/ui-controls/avakio-label';
import { AvakioTemplate } from '../../components/avakio/views/avakio-template/avakio-template';
import { Button } from '@/components/ui/button';
import { 
  Type, 
  Settings, 
  AlignLeft, 
  Palette, 
  Code, 
  CheckCircle, 
  Info 
} from 'lucide-react';

export function AvakioLabelExample() {
  const [theme] = useState<'material' | 'flat' | 'compact' | 'dark' | 'ocean' | 'sunset'>('material');
  const labelRef = useRef<AvakioLabelRef>(null);
  const [refValue, setRefValue] = useState('');

  // Interactive Props Playground State
  const [playgroundTheme, setPlaygroundTheme] = useState<string>('material');
  const [playgroundLabel, setPlaygroundLabel] = useState<string>('Sample Label Text');
  const [playgroundAlign, setPlaygroundAlign] = useState<string>('left');
  const [playgroundWidth, setPlaygroundWidth] = useState<string>('');
  const [playgroundFontSize, setPlaygroundFontSize] = useState<string>('14');
  const [playgroundFontWeight, setPlaygroundFontWeight] = useState<string>('normal');
  const [playgroundColor, setPlaygroundColor] = useState<string>('');
  const [playgroundBackgroundColor, setPlaygroundBackgroundColor] = useState<string>('');
  const [playgroundPadding, setPlaygroundPadding] = useState<string>('');
  const [playgroundDisabled, setPlaygroundDisabled] = useState(false);
  const [playgroundHidden, setPlaygroundHidden] = useState(false);
  const [playgroundAutowidth, setPlaygroundAutowidth] = useState(false);
  
  // Applied Props State
  const [appliedProps, setAppliedProps] = useState({
    theme: 'material',
    label: 'Sample Label Text',
    align: 'left',
    width: '',
    fontSize: '14',
    fontWeight: 'normal',
    color: '',
    backgroundColor: '',
    padding: '',
    disabled: false,
    hidden: false,
    autowidth: false,
  });
  
  const handleApplyProps = () => {
    setAppliedProps({
      theme: playgroundTheme,
      label: playgroundLabel,
      align: playgroundAlign,
      width: playgroundWidth,
      fontSize: playgroundFontSize,
      fontWeight: playgroundFontWeight,
      color: playgroundColor,
      backgroundColor: playgroundBackgroundColor,
      padding: playgroundPadding,
      disabled: playgroundDisabled,
      hidden: playgroundHidden,
      autowidth: playgroundAutowidth,
    });
  };

  // Ref methods handlers
  const handleGetValue = () => {
    const value = labelRef.current?.getValue();
    setRefValue(value || '');
    alert(`Current value: ${value}`);
  };

  const handleSetValue = () => {
    labelRef.current?.setValue('Updated via setValue()');
  };

  const handleSetHTML = () => {
    labelRef.current?.setHTML('<strong style="color: #f57c00;">HTML</strong> content <em>styled</em>');
  };

  const handleHide = () => {
    labelRef.current?.hide();
  };

  const handleShow = () => {
    labelRef.current?.show();
  };

  const handleDisable = () => {
    labelRef.current?.disable();
  };

  const handleEnable = () => {
    labelRef.current?.enable();
  };

  return (
    <div className="avakio-template-demo-container" data-admin-theme={theme}>
      {/* Header */}
      <AvakioTemplate
        type="header"
        content={
          <div>
            <div style={{ fontSize: '12px', color: '#888', marginBottom: '4px' }}>
              Avakio Components / UI Controls
            </div>
            <h1 style={{ fontSize: '28px', fontWeight: 'bold', margin: '0 0 8px 0' }}>
              AvakioLabel
            </h1>
            <p style={{ margin: 0, color: '#666' }}>
              A versatile label component for displaying static text with theming and HTML support
            </p>
          </div>
        }
      />

      {/* Section 1: Basic Labels */}
      <div className="avakio-template-demo-section">
        <AvakioTemplate
          type="section"
          borderType="clean"
          content={
            <div>
              <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <Type size={20} style={{ color: '#1976d2' }} />
                Basic Labels
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <AvakioLabel label="Simple label text" theme="material" />
                <AvakioLabel label="Label with custom width" width={300} theme="material" />
                <AvakioLabel label="Auto-width label" autowidth theme="material" />
                <AvakioLabel 
                  label="Label with tooltip" 
                  tooltip="This is a helpful tooltip" 
                  theme="material" 
                />
              </div>
            </div>
          }
        />
      </div>

      {/* Section 2: HTML Content */}
      <div className="avakio-template-demo-section">
        <AvakioTemplate
          type="section"
          borderType="clean"
          content={
            <div>
              <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <Code size={20} style={{ color: '#1976d2' }} />
                HTML Content
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <AvakioLabel 
                  html="<strong>Bold</strong> and <em>italic</em> text" 
                  theme="material" 
                />
                <AvakioLabel 
                  html="<span style='color: #f44336;'>●</span> Red bullet point" 
                  theme="material" 
                />
                <AvakioLabel 
                  html="<span style='font-size: 20px;'>📌</span> Label with emoji" 
                  theme="material" 
                />
                <AvakioLabel 
                  html="<span class='avakio-icon'>⚙</span> Label with icon" 
                  theme="material" 
                />
              </div>
            </div>
          }
        />
      </div>

      {/* Section 3: Alignment */}
      <div className="avakio-template-demo-section">
        <AvakioTemplate
          type="section"
          borderType="clean"
          content={
            <div>
              <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <AlignLeft size={20} style={{ color: '#1976d2' }} />
                Text Alignment
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <AvakioLabel 
                  label="Left aligned (default)" 
                  align="left" 
                  width={400}
                  theme="flat" 
                />
                <AvakioLabel 
                  label="Center aligned" 
                  align="center" 
                  width={400}
                  theme="flat" 
                />
                <AvakioLabel 
                  label="Right aligned" 
                  align="right" 
                  width={400}
                  theme="flat" 
                />
              </div>
            </div>
          }
        />
      </div>

      {/* Section 4: Custom Styling */}
      <div className="avakio-template-demo-section">
        <AvakioTemplate
          type="section"
          borderType="clean"
          content={
            <div>
              <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <Settings size={20} style={{ color: '#1976d2' }} />
                Custom Styling
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <AvakioLabel 
                  label="Large font size" 
                  fontSize={20}
                  theme="material" 
                />
                <AvakioLabel 
                  label="Bold font weight" 
                  fontWeight="bold"
                  theme="material" 
                />
                <AvakioLabel 
                  label="Custom colors" 
                  color="#ff5722"
                  backgroundColor="#fff3e0"
                  padding="12px 24px"
                  theme="material" 
                />
                <AvakioLabel 
                  label="Custom border and radius" 
                  border="2px solid #9c27b0"
                  borderRadius={16}
                  padding="10px 20px"
                  theme="material" 
                />
              </div>
            </div>
          }
        />
      </div>

      {/* Section 5: Ref Methods */}
      <div className="avakio-template-demo-section">
        <AvakioTemplate
          type="section"
          borderType="clean"
          content={
            <div>
              <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <Settings size={20} style={{ color: '#1976d2' }} />
                Ref Methods Demo
              </h2>
              <div style={{ marginBottom: '16px' }}>
                <AvakioLabel 
                  ref={labelRef}
                  label="Control this label via ref methods"
                  theme="ocean"
                  width={400}
                />
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                <Button onClick={handleGetValue} size="sm">Get Value</Button>
                <Button onClick={handleSetValue} size="sm">Set Value</Button>
                <Button onClick={handleSetHTML} size="sm">Set HTML</Button>
                <Button onClick={handleHide} size="sm">Hide</Button>
                <Button onClick={handleShow} size="sm">Show</Button>
                <Button onClick={handleDisable} size="sm">Disable</Button>
                <Button onClick={handleEnable} size="sm">Enable</Button>
              </div>
              {refValue && (
                <div style={{ marginTop: '12px', padding: '8px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
                  Current value: <strong>{refValue}</strong>
                </div>
              )}
            </div>
          }
        />
      </div>

      {/* Section 6: Theme Showcase */}
      <div className="avakio-template-demo-section">
        <AvakioTemplate
          type="section"
          borderType="clean"
          content={
            <div>
              <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <Palette size={20} style={{ color: '#1976d2' }} />
                Theme Showcase
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <AvakioLabel label="Material Theme" theme="material" width={300} />
                <AvakioLabel label="Flat Theme" theme="flat" width={300} />
                <AvakioLabel label="Compact Theme" theme="compact" width={300} />
                <AvakioLabel label="Dark Theme" theme="dark" width={300} />
                <AvakioLabel label="Ocean Theme" theme="ocean" width={300} />
                <AvakioLabel label="Sunset Theme" theme="sunset" width={300} />
              </div>
            </div>
          }
        />
      </div>

      {/* Section 7: States */}
      <div className="avakio-template-demo-section">
        <AvakioTemplate
          type="section"
          borderType="clean"
          content={
            <div>
              <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <CheckCircle size={20} style={{ color: '#1976d2' }} />
                Label States
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                  <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>Normal:</div>
                  <AvakioLabel label="Normal state label" theme="material" />
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>Disabled:</div>
                  <AvakioLabel label="Disabled state label" theme="material" disabled />
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>Hidden (display: none):</div>
                  <AvakioLabel label="This is hidden" theme="material" hidden />
                  <span style={{ color: '#888', fontSize: '12px' }}>(Label is hidden)</span>
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>Clickable:</div>
                  <AvakioLabel 
                    label="Click me!" 
                    theme="ocean"
                    onClick={() => alert('Label clicked!')}
                    css={{ cursor: 'pointer' }}
                  />
                </div>
              </div>
            </div>
          }
        />
      </div>

      {/* Interactive Props Playground */}
      <div className="avakio-template-demo-section">
        <AvakioTemplate
          type="section"
          borderType="clean"
          content={
            <div>
              <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <Settings size={20} style={{ color: '#1976d2' }} />
                Interactive Props Playground
              </h2>
              <p style={{ margin: 0, fontSize: '14px', opacity: 0.7 }}>Experiment with different props in real-time</p>
            </div>
          }
        />
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: '20px',
          marginBottom: '20px'
        }}>
          {/* Controls Column */}
          <div style={{ 
            backgroundColor: '#f8f9fa', 
            padding: '20px', 
            borderRadius: '8px'
          }}>
            <h3 style={{ marginTop: 0 }}>Props Configuration</h3>
            
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 500 }}>Theme</label>
              <select 
                value={playgroundTheme}
                onChange={(e) => setPlaygroundTheme(e.target.value)}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
              >
                <option value="material">Material</option>
                <option value="flat">Flat</option>
                <option value="compact">Compact</option>
                <option value="dark">Dark</option>
                <option value="ocean">Ocean</option>
                <option value="sunset">Sunset</option>
              </select>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 500 }}>Label Text</label>
              <input 
                type="text"
                value={playgroundLabel}
                onChange={(e) => setPlaygroundLabel(e.target.value)}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 500 }}>Align</label>
              <select 
                value={playgroundAlign}
                onChange={(e) => setPlaygroundAlign(e.target.value)}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
              >
                <option value="left">Left</option>
                <option value="center">Center</option>
                <option value="right">Right</option>
              </select>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 500 }}>Width</label>
              <input 
                type="text"
                value={playgroundWidth}
                onChange={(e) => setPlaygroundWidth(e.target.value)}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                placeholder="e.g., 200px, 50%, auto"
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 500 }}>Font Size (px)</label>
              <input 
                type="number"
                value={playgroundFontSize}
                onChange={(e) => setPlaygroundFontSize(e.target.value)}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 500 }}>Font Weight</label>
              <select 
                value={playgroundFontWeight}
                onChange={(e) => setPlaygroundFontWeight(e.target.value)}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
              >
                <option value="normal">Normal</option>
                <option value="bold">Bold</option>
                <option value="300">300</option>
                <option value="400">400</option>
                <option value="500">500</option>
                <option value="600">600</option>
                <option value="700">700</option>
              </select>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 500 }}>Color</label>
              <input 
                type="text"
                value={playgroundColor}
                onChange={(e) => setPlaygroundColor(e.target.value)}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                placeholder="e.g., #1976d2, red"
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 500 }}>Background Color</label>
              <input 
                type="text"
                value={playgroundBackgroundColor}
                onChange={(e) => setPlaygroundBackgroundColor(e.target.value)}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                placeholder="e.g., #f0f0f0, transparent"
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 500 }}>Padding</label>
              <input 
                type="text"
                value={playgroundPadding}
                onChange={(e) => setPlaygroundPadding(e.target.value)}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                placeholder="e.g., 10px, 10px 20px"
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input 
                  type="checkbox"
                  checked={playgroundAutowidth}
                  onChange={(e) => setPlaygroundAutowidth(e.target.checked)}
                />
                <span style={{ fontWeight: 500 }}>Auto Width</span>
              </label>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input 
                  type="checkbox"
                  checked={playgroundDisabled}
                  onChange={(e) => setPlaygroundDisabled(e.target.checked)}
                />
                <span style={{ fontWeight: 500 }}>Disabled</span>
              </label>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input 
                  type="checkbox"
                  checked={playgroundHidden}
                  onChange={(e) => setPlaygroundHidden(e.target.checked)}
                />
                <span style={{ fontWeight: 500 }}>Hidden</span>
              </label>
            </div>

            <Button onClick={handleApplyProps} style={{ width: '100%' }}>
              Apply Props
            </Button>
          </div>

          {/* Preview Column */}
          <div>
            <h3 style={{ marginTop: 0 }}>Live Preview</h3>
            <div style={{ 
              backgroundColor: 'white', 
              padding: '20px', 
              borderRadius: '8px', 
              border: '1px solid #e0e0e0',
              minHeight: '200px'
            }}>
              <AvakioLabel
                theme={appliedProps.theme as any}
                label={appliedProps.label}
                align={appliedProps.align as any}
                width={appliedProps.width || undefined}
                fontSize={appliedProps.fontSize ? Number(appliedProps.fontSize) : undefined}
                fontWeight={appliedProps.fontWeight as any}
                color={appliedProps.color || undefined}
                backgroundColor={appliedProps.backgroundColor || undefined}
                padding={appliedProps.padding || undefined}
                autowidth={appliedProps.autowidth}
                disabled={appliedProps.disabled}
                hidden={appliedProps.hidden}
              />
            </div>

            <div style={{ 
              marginTop: '20px', 
              backgroundColor: '#f8f9fa', 
              padding: '15px', 
              borderRadius: '8px',
              fontFamily: 'monospace',
              fontSize: '12px',
              overflowX: 'auto'
            }}>
              <div style={{ fontWeight: 'bold', marginBottom: '10px' }}>Generated Code:</div>
              <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
{`<AvakioLabel
  theme="${appliedProps.theme}"
  label="${appliedProps.label}"
  align="${appliedProps.align}"${appliedProps.width ? `\n  width="${appliedProps.width}"` : ''}${appliedProps.fontSize ? `\n  fontSize={${appliedProps.fontSize}}` : ''}${appliedProps.fontWeight !== 'normal' ? `\n  fontWeight="${appliedProps.fontWeight}"` : ''}${appliedProps.color ? `\n  color="${appliedProps.color}"` : ''}${appliedProps.backgroundColor ? `\n  backgroundColor="${appliedProps.backgroundColor}"` : ''}${appliedProps.padding ? `\n  padding="${appliedProps.padding}"` : ''}${appliedProps.autowidth ? '\n  autowidth' : ''}${appliedProps.disabled ? '\n  disabled' : ''}${appliedProps.hidden ? '\n  hidden' : ''}
/>`}
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Section 8: API Reference */}
      <div className="avakio-template-demo-section">
        <AvakioTemplate
          type="section"
          borderType="clean"
          content={
            <div>
              <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <Info size={20} style={{ color: '#1976d2' }} />
                API Reference
              </h2>
              <div style={{ fontSize: '14px', lineHeight: '1.6' }}>
                <p style={{ marginBottom: '12px' }}>
                  <strong>Key Features:</strong>
                </p>
                <ul style={{ marginLeft: '20px', marginBottom: '16px' }}>
                  <li>Plain text or HTML content display</li>
                  <li>6 built-in themes with hover effects</li>
                  <li>Flexible alignment (left, center, right)</li>
                  <li>Auto-width or fixed width support</li>
                  <li>Custom styling via props (fontSize, color, padding, etc.)</li>
                  <li>State management (disabled, hidden)</li>
                  <li>Ref API for programmatic control</li>
                  <li>Click event handling</li>
                  <li>Tooltip support</li>
                </ul>
              </div>
            </div>
          }
        />
      </div>
    </div>
  );
}




















