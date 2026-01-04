import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AvakioColorPicker, AvakioColorPickerPreset } from '../../components/avakio/ui-controls/avakio-colorpicker/avakio-colorpicker';
import './avakio-colorpicker-example.css';

export function AvakioColorPickerExample() {
  const [theme, setTheme] = useState<string>('material');
  const [colorPrimary, setColorPrimary] = useState<string>('#1ca1c1');
  const [colorAccent, setColorAccent] = useState<string>('#f57c00');
  const [colorDisabled, setColorDisabled] = useState<string>('#9ca3af');

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

  const presets: AvakioColorPickerPreset[] = [
    { label: 'Sky', value: '#38bdf8' },
    { label: 'Purple', value: '#8b5cf6' },
    { label: 'Teal', value: '#14b8a6' },
    { label: 'Lime', value: '#84cc16' },
    { label: 'Rose', value: '#fb7185' },
    { label: 'Slate', value: '#475569' },
    { label: 'Gold', value: '#fbbf24' },
    { label: 'Coral', value: '#fb923c' },
    { label: 'Deep', value: '#0f172a' },
    { label: 'Ivory', value: '#f8fafc' },
  ];

  return (
    <div className="avakio-colorpicker-example" data-admin-theme={theme}>
      <header className="avakio-colorpicker-hero">
        <div>
          <p className="avakio-colorpicker-kicker">Avakio Components</p>
          <h1 className="avakio-colorpicker-title">AvakioColorPicker Component</h1>
          <p className="avakio-colorpicker-subtitle">
            A theme-aware color picker  Supports presets, hex input, native picker, preview, and disabled/error states.
          </p>
        </div>
      </header>

      <Card className="avakio-colorpicker-card">
        <CardHeader>
          <CardTitle>Basic</CardTitle>
          <CardDescription>Native picker, preview, and hex input.</CardDescription>
        </CardHeader>
        <CardContent>
          <AvakioColorPicker
            label="Primary color"
            description="Used for accent surfaces."
            value={colorPrimary}
            onChange={setColorPrimary}
            presets={presets}
            showPreview={false}
            required
          />
        </CardContent>
      </Card>

      <Card className="avakio-colorpicker-card">
        <CardHeader>
          <CardTitle>Custom Presets & Validation</CardTitle>
          <CardDescription>Shows error state when value is dark.</CardDescription>
        </CardHeader>
        <CardContent>
          <AvakioColorPicker
            label="Accent color"
            description="Pick a bright accent."
            value={colorAccent}
            onChange={setColorAccent}
            presets={presets}
            error={colorAccent.toLowerCase() === '#0f172a' ? 'Too dark for accent' : undefined}
          />
        </CardContent>
      </Card>

      <Card className="avakio-colorpicker-card">
        <CardHeader>
          <CardTitle>Disabled</CardTitle>
          <CardDescription>Read-only usage without interaction.</CardDescription>
        </CardHeader>
        <CardContent>
          <AvakioColorPicker
            label="Disabled color"
            value={colorDisabled}
            onChange={setColorDisabled}
            presets={presets}
            disabled
            description="This field is disabled for illustration."
          />
        </CardContent>
      </Card>
    </div>
  );
}



















