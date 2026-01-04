import React, { useState, useEffect } from 'react';
import { AvakioViewHeader } from '../../components/avakio/ui-widgets/avakio-view-header/avakio-view-header';
import { AvakioTemplate } from '../../components/avakio/views/avakio-template/avakio-template';
import { AvakioRichSelect } from '../../components/avakio/ui-controls/avakio-richselect/avakio-richselect';
import { AvakioLabel } from '../../components/avakio/ui-controls/avakio-label/avakio-label';
import '../../components/avakio/ui-widgets/avakio-view-header/avakio-view-header.css';

export function AvakioViewHeaderExample() {
  
  
  // Interactive Props Playground State
  const [playgroundTheme, setPlaygroundTheme] = useState<string>('material');
  const [playgroundShowLabel, setPlaygroundShowLabel] = useState(true);
  const [playgroundShowTitle, setPlaygroundShowTitle] = useState(true);
  const [playgroundShowSubTitle, setPlaygroundShowSubTitle] = useState(true);
  const [playgroundLabel, setPlaygroundLabel] = useState('AVAKIO COMPONENTS');
  const [playgroundTitle, setPlaygroundTitle] = useState('AvakioText Component');
  const [playgroundSubTitle, setPlaygroundSubTitle] = useState('A versatile text input component with labels, validation, icons, and multiple input types. ');
  
  // Applied Props State
  const [appliedProps, setAppliedProps] = useState({
    theme: 'material',
    showLabel: true,
    showTitle: true,
    showSubTitle: true,
    label: 'AVAKIO COMPONENTS',
    title: 'AvakioText Component',
    subTitle: 'A versatile text input component with labels, validation, icons, and multiple input types. ',
  });
  
  const handleApplyProps = () => {
    setAppliedProps({
      theme: playgroundTheme,
      showLabel: playgroundShowLabel,
      showTitle: playgroundShowTitle,
      showSubTitle: playgroundShowSubTitle,
      label: playgroundLabel,
      title: playgroundTitle,
      subTitle: playgroundSubTitle,
    });
  };

  

  const themes = ['material', 'flat', 'compact', 'dark', 'ocean', 'sunset'];

  const generatedCode = `<AvakioViewHeader
  ${appliedProps.showLabel !== true ? `showLabel={${appliedProps.showLabel}}` : ''}
  ${appliedProps.showTitle !== true ? `showTitle={${appliedProps.showTitle}}` : ''}
  ${appliedProps.showSubTitle !== true ? `showSubTitle={${appliedProps.showSubTitle}}` : ''}
  ${appliedProps.label ? `label="${appliedProps.label}"` : ''}
  ${appliedProps.title ? `title="${appliedProps.title}"` : ''}
  ${appliedProps.subTitle ? `subTitle="${appliedProps.subTitle}"` : ''}
  ${appliedProps.theme !== 'material' ? `theme="${appliedProps.theme}"` : ''}
/>`.replace(/\n\s*\n/g, '\n');

  return (
    <>
      {/* Header */}
      <AvakioViewHeader
        label="UI Widgets"
        title="View Header Component"
        subTitle="A themed header component for displaying labels, titles, and subtitles with support for all Avakio themes."
      />

      {/* Interactive Props Playground */}
      <section className="avakio-template-demo-section">
        <AvakioTemplate
          type="section"
          borderless={false}
          content={
            <div>
              <AvakioLabel
                label="Interactive Props Playground"
                fontSize={24}
                fontWeight="600"
              />

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginBottom: '24px' }}>
                {/* Controls Column */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>Controls</h3>

                  {/* Theme Selector */}
                  <div>
                    <AvakioRichSelect
                      value={playgroundTheme}
                      options={themes}
                      onChange={(value) => {
                        setPlaygroundTheme(value as string);
                        setAppliedProps(prev => ({ ...prev, theme: value as string }));
                      }}
                      label="Theme"
                      labelWidth={120}
                    />
                  </div>

                  {/* Show/Hide Controls */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <input
                        type="checkbox"
                        checked={playgroundShowLabel}
                        onChange={(e) => setPlaygroundShowLabel(e.target.checked)}
                      />
                      Show Label
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <input
                        type="checkbox"
                        checked={playgroundShowTitle}
                        onChange={(e) => setPlaygroundShowTitle(e.target.checked)}
                      />
                      Show Title
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <input
                        type="checkbox"
                        checked={playgroundShowSubTitle}
                        onChange={(e) => setPlaygroundShowSubTitle(e.target.checked)}
                      />
                      Show SubTitle
                    </label>
                  </div>

                  {/* Text Inputs */}
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Label Text</label>
                    <input
                      type="text"
                      value={playgroundLabel}
                      onChange={(e) => setPlaygroundLabel(e.target.value)}
                      style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e0' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Title Text</label>
                    <input
                      type="text"
                      value={playgroundTitle}
                      onChange={(e) => setPlaygroundTitle(e.target.value)}
                      style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e0' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>SubTitle Text</label>
                    <textarea
                      value={playgroundSubTitle}
                      onChange={(e) => setPlaygroundSubTitle(e.target.value)}
                      rows={3}
                      style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e0' }}
                    />
                  </div>

                  <button
                    onClick={handleApplyProps}
                    style={{
                      padding: '10px 20px',
                      backgroundColor: '#1ca1c1',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontWeight: 600,
                    }}
                  >
                    Apply Props
                  </button>
                </div>

                {/* Preview Column */}
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px' }}>Live Preview</h3>
                  <AvakioViewHeader
                    isSticky={false}
                    theme={appliedProps.theme}
                    showLabel={appliedProps.showLabel}
                    showTitle={appliedProps.showTitle}
                    showSubTitle={appliedProps.showSubTitle}
                    label={appliedProps.label}
                    title={appliedProps.title}
                    subTitle={appliedProps.subTitle}
                  />

                  <div style={{ marginTop: '24px' }}>
                    <h4 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '12px' }}>Generated Code</h4>
                    <pre style={{
                      backgroundColor: '#f7fafc',
                      padding: '16px',
                      borderRadius: '4px',
                      overflow: 'auto',
                      fontSize: '13px',
                      border: '1px solid #e2e8f0'
                    }}>
                      {generatedCode}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          }
        />
      </section>

      {/* Theme Variations */}
      <section className="avakio-template-demo-section">
        <AvakioTemplate
          type="clean"
          borderless={false}
          content={
            <div>
              <h2 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '24px' }}>
                Theme Variations
              </h2>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
                {themes.map((themeVariant) => (
                  <div key={themeVariant}>
                    <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '12px', textTransform: 'capitalize' }}>
                      {themeVariant} Theme
                    </h3>
                    <AvakioViewHeader
                      isSticky={false}
                      theme={themeVariant}
                      label="AVAKIO COMPONENTS"
                      title="Component Header"
                      subTitle="This is how the header looks in the selected theme with all elements visible."
                    />
                  </div>
                ))}
              </div>
            </div>
          }
        />
      </section>

      {/* Usage Examples */}
      <section className="avakio-template-demo-section">
        <AvakioTemplate
          type="section"
          borderless={false}
          content={
            <div>
              <h2 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '24px' }}>
                Usage Examples
              </h2>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '32px' }}>
                {/* Full Header */}
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '12px' }}>
                    Full Header with All Elements
                  </h3>
                  <AvakioViewHeader
                  isSticky={false}
                    label="DOCUMENTATION"
                    title="Getting Started"
                    subTitle="Learn how to integrate and use Avakio components in your React applications."
                  />
                </div>

                {/* Title Only */}
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '12px' }}>
                    Title Only
                  </h3>
                  <AvakioViewHeader
                  isSticky={false}
                    showLabel={false}
                    showSubTitle={false}
                    title="Simple Page Header"
                  />
                </div>

                {/* Title and Subtitle */}
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '12px' }}>
                    Title and Subtitle
                  </h3>
                  <AvakioViewHeader
                  isSticky={false}
                    showLabel={false}
                    title="Dashboard Overview"
                    subTitle="Monitor your key metrics and performance indicators."
                  />
                </div>

                {/* Label and Title */}
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '12px' }}>
                    Label and Title
                  </h3>
                  <AvakioViewHeader
                  isSticky={false}
                    showSubTitle={false}
                    label="SETTINGS"
                    title="User Preferences"
                  />
                </div>
              </div>
            </div>
          }
        />
      </section>
    </>
  );
}

export default AvakioViewHeaderExample;




















