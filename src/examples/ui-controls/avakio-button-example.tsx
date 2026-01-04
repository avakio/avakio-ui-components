import React, { useState, useEffect } from 'react';
import { AvakioButton } from '../../components/avakio/ui-controls/avakio-button/avakio-button';
import './avakio-button-example.css';
import { Check, Loader2, Plus, Trash2, ArrowRight, Download, Bell, Settings, Heart, Star, Mail, Home } from 'lucide-react';

export function AvakioButtonExample() {
  const [theme, setTheme] = useState<string>('material');
  const [clickCount, setClickCount] = useState(0);

  // Sync with global theme
  useEffect(() => {
    const currentTheme = document.documentElement.getAttribute('data-admin-theme');
    if (currentTheme) {
      setTheme(currentTheme);
    }
    
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-admin-theme') {
          const newTheme = document.documentElement.getAttribute('data-admin-theme');
          if (newTheme) {
            setTheme(newTheme);
          }
        }
      });
    });
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-admin-theme'],
    });
    
    return () => observer.disconnect();
  }, []);

  return (
    <div className="avakio-button-example" data-admin-theme={theme}>
      <div className="avakio-button-demo-container">
        <header className="avakio-button-hero">
          <div>
            <p className="avakio-button-kicker">Avakio Components</p>
            <h1 className="avakio-button-title">AvakioButton Component</h1>
            <p className="avakio-button-subtitle">
              A comprehensive button component. Supports variants, icons, badges, loading state, sizes, types, alignment, tooltips, hotkeys, and block layout.
            </p>
          </div>
        </header>

        {/* Variants & States */}
        <section className="avakio-button-section">
          <h3 className="avakio-button-section-title">Variants & States</h3>
          <p className="avakio-button-section-description">Primary, secondary, outline, ghost, danger, and loading.</p>
          <div className="avakio-button-grid">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <AvakioButton id="btn-primary" testId="button-primary" variant="primary" icon={<Check size={16} />}>Primary</AvakioButton>
            <small style={{ fontSize: '11px', opacity: 0.6 }}>id: btn-primary</small>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <AvakioButton id="btn-secondary" testId="button-secondary" variant="secondary" iconRight={<ArrowRight size={16} />}>Secondary</AvakioButton>
            <small style={{ fontSize: '11px', opacity: 0.6 }}>id: btn-secondary</small>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <AvakioButton id="btn-outline" testId="button-outline" variant="outline">Outline</AvakioButton>
            <small style={{ fontSize: '11px', opacity: 0.6 }}>id: btn-outline</small>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <AvakioButton id="btn-ghost" testId="button-ghost" variant="ghost">Ghost</AvakioButton>
            <small style={{ fontSize: '11px', opacity: 0.6 }}>id: btn-ghost</small>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <AvakioButton id="btn-danger" testId="button-danger" variant="danger" icon={<Trash2 size={16} />}>Danger</AvakioButton>
            <small style={{ fontSize: '11px', opacity: 0.6 }}>id: btn-danger</small>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <AvakioButton id="btn-loading" testId="button-loading" variant="primary" loading icon={<Loader2 size={16} />}>Loading</AvakioButton>
            <small style={{ fontSize: '11px', opacity: 0.6 }}>id: btn-loading</small>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <AvakioButton id="btn-disabled" testId="button-disabled" variant="primary" disabled>Disabled</AvakioButton>
            <small style={{ fontSize: '11px', opacity: 0.6 }}>id: btn-disabled</small>
          </div>
        </div>
      </section>

      {/* Sizes & Block */}
      <section className="avakio-button-section">
        <h3 className="avakio-button-section-title">Sizes & Block</h3>
        <p className="avakio-button-section-description">Small, medium, large, and full-width buttons.</p>
        <div className="avakio-button-grid">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <AvakioButton id="btn-small" testId="button-small" size="sm" icon={<Plus size={14} />}>Small</AvakioButton>
            <small style={{ fontSize: '11px', opacity: 0.6 }}>id: btn-small</small>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <AvakioButton id="btn-medium" testId="button-medium" size="md" icon={<Plus size={16} />}>Medium</AvakioButton>
            <small style={{ fontSize: '11px', opacity: 0.6 }}>id: btn-medium</small>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <AvakioButton id="btn-large" testId="button-large" size="lg" icon={<Plus size={18} />}>Large</AvakioButton>
            <small style={{ fontSize: '11px', opacity: 0.6 }}>id: btn-large</small>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <AvakioButton id="btn-block" testId="button-block" block icon={<Download size={16} />}>Block button</AvakioButton>
            <small style={{ fontSize: '11px', opacity: 0.6 }}>id: btn-block</small>
          </div>
        </div>
      </section>

      {/* Button Types */}
      <section className="avakio-button-section">
        <h3 className="avakio-button-section-title">Button Types</h3>
        <p className="avakio-button-section-description">Default, icon-only, and icon-top layouts.</p>
        <div className="avakio-button-grid">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <AvakioButton id="btn-type-default" testId="button-type-default" buttonType="default" icon={<Settings size={16} />}>Default</AvakioButton>
            <small style={{ fontSize: '11px', opacity: 0.6 }}>id: btn-type-default</small>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'center' }}>
            <AvakioButton id="btn-type-icon" testId="button-type-icon" buttonType="icon" icon={<Heart size={20} />} tooltip="Like" />
            <small style={{ fontSize: '11px', opacity: 0.6 }}>id: btn-type-icon</small>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'center' }}>
            <AvakioButton id="btn-type-icon-btn" testId="button-type-icon-btn" buttonType="iconButton" icon={<Star size={20} />} tooltip="Favorite" />
            <small style={{ fontSize: '11px', opacity: 0.6 }}>id: btn-type-icon-btn</small>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <AvakioButton id="btn-type-icon-top" testId="button-type-icon-top" buttonType="iconTop" icon={<Mail size={24} />}>Messages</AvakioButton>
            <small style={{ fontSize: '11px', opacity: 0.6 }}>id: btn-type-icon-top</small>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <AvakioButton id="btn-icon-top-home" testId="button-icon-top-home" buttonType="iconTop" icon={<Home size={24} />} variant="secondary">Home</AvakioButton>
            <small style={{ fontSize: '11px', opacity: 0.6 }}>id: btn-icon-top-home</small>
          </div>
        </div>
      </section>

      {/* Alignment & Auto-width */}
      <section className="avakio-button-section">
        <h3 className="avakio-button-section-title">Alignment & Auto-width</h3>
        <p className="avakio-button-section-description">Text alignment and auto-sizing buttons.</p>
        <div className="avakio-button-grid">
          <AvakioButton align="left" block icon={<ArrowRight size={16} />}>Left Aligned</AvakioButton>
          <AvakioButton align="center" block>Center Aligned</AvakioButton>
          <AvakioButton align="right" block iconRight={<ArrowRight size={16} />}>Right Aligned</AvakioButton>
          <AvakioButton autowidth>Auto Width</AvakioButton>
          <AvakioButton autowidth icon={<Plus size={16} />}>Fits Content</AvakioButton>
        </div>
      </section>

      {/* Tooltips & Hotkeys */}
      <section className="avakio-button-section">
        <h3 className="avakio-button-section-title">Tooltips & Hotkeys</h3>
        <p className="avakio-button-section-description">Hover tooltips and keyboard shortcuts.</p>
        <div className="avakio-button-grid">
          <AvakioButton tooltip="Save your work" icon={<Download size={16} />}>Save</AvakioButton>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <AvakioButton
              id="btn-save-hotkey"
              testId="button-save-hotkey"
              tooltip="Quick save with Ctrl+S"
              hotkey="ctrl+s"
              variant="primary"
              icon={<Download size={16} />}
              onClick={() => {
                setClickCount(c => c + 1);
                alert('Save clicked! (Try Ctrl+S)');
              }}
            >
              Save (Ctrl+S)
            </AvakioButton>
            <small style={{ fontSize: '11px', opacity: 0.6 }}>id: btn-save-hotkey</small>
          </div>
          <AvakioButton tooltip="Delete item" hotkey="delete" variant="danger" icon={<Trash2 size={16} />}>Delete</AvakioButton>
          <p style={{ gridColumn: '1/-1', margin: 0, fontSize: '14px', opacity: 0.7 }}>Hotkey clicks: {clickCount}</p>
        </div>
      </section>

      {/* Badges & Icon Positions */}
      <section className="avakio-button-section">
        <h3 className="avakio-button-section-title">Badges & Icon Positions</h3>
        <p className="avakio-button-section-description">Mix badges with left/right icons.</p>
        <div className="avakio-button-grid">
          <AvakioButton variant="primary" badge={3} icon={<Bell size={16} />}>Inbox</AvakioButton>
          <AvakioButton variant="secondary" badge="New" iconRight={<ArrowRight size={16} />}>Updates</AvakioButton>
          <AvakioButton variant="outline" badge={12}>Notifications</AvakioButton>
          <AvakioButton variant="ghost" iconRight={<ArrowRight size={16} />}>Next</AvakioButton>
          <AvakioButton badge="99+" buttonType="icon" icon={<Bell size={20} />} tooltip="Many notifications" />
        </div>
      </section>

      {/* Image Buttons */}
      <section className="avakio-button-section">
        <h3 className="avakio-button-section-title">Image Buttons</h3>
        <p className="avakio-button-section-description">Buttons with images instead of icons.</p>
        <div className="avakio-button-grid">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <AvakioButton 
              id="btn-image-avatar"
              testId="button-image-avatar"
              image="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Ccircle cx='12' cy='12' r='12' fill='%231CA1C1'/%3E%3Ctext x='12' y='16' text-anchor='middle' fill='white' font-size='14' font-weight='bold'%3EA%3C/text%3E%3C/svg%3E"
              variant="secondary"
            >
              Avatar Button
            </AvakioButton>
            <small style={{ fontSize: '11px', opacity: 0.6 }}>id: btn-image-avatar</small>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'center' }}>
            <AvakioButton 
              id="btn-image-icon"
              testId="button-image-icon"
              image="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Ccircle cx='12' cy='12' r='12' fill='%235E81AC'/%3E%3Ctext x='12' y='16' text-anchor='middle' fill='white' font-size='14' font-weight='bold'%3EU%3C/text%3E%3C/svg%3E"
              buttonType="icon"
              tooltip="User profile"
            />
            <small style={{ fontSize: '11px', opacity: 0.6 }}>id: btn-image-icon</small>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <AvakioButton 
              id="btn-image-badge"
              testId="button-image-badge"
              image="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Ccircle cx='12' cy='12' r='12' fill='%23f57c00'/%3E%3Ctext x='12' y='16' text-anchor='middle' fill='white' font-size='14' font-weight='bold'%3E!%3C/text%3E%3C/svg%3E"
              badge={5}
              variant="outline"
            >
              With Badge
            </AvakioButton>
            <small style={{ fontSize: '11px', opacity: 0.6 }}>id: btn-image-badge</small>
          </div>
        </div>
      </section>

      {/* Form Integration */}
      <section className="avakio-button-section">
        <h3 className="avakio-button-section-title">Form Integration</h3>
        <p className="avakio-button-section-description">Buttons with name and value attributes for form submission.</p>
        <form 
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              alert(`Submitted: ${formData.get('action')}`);
            }}
            style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}
          >
            <AvakioButton id="form-save" testId="form-button-save" name="action" value="save" variant="primary">Save</AvakioButton>
            <AvakioButton id="form-draft" testId="form-button-draft" name="action" value="draft" variant="secondary">Save as Draft</AvakioButton>
            <AvakioButton id="form-publish" testId="form-button-publish" name="action" value="publish" variant="outline">Publish</AvakioButton>
            <AvakioButton id="form-cancel" testId="form-button-cancel" variant="ghost">Cancel</AvakioButton>
          </form>
        </section>
      </div>
    </div>
  );
}


















