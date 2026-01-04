import React, { useState, useEffect } from 'react';
// Card component not available
import { AvakioCheckbox } from '../../components/avakio/ui-controls/avakio-checkbox/avakio-checkbox';
import './avakio-checkbox-example.css';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function AvakioCheckboxExample() {
  const [theme, setTheme] = useState<string>('material');
  const [checkedBasic, setCheckedBasic] = useState<boolean>(true);
  const [checkedSecondary, setCheckedSecondary] = useState<boolean>(false);
  const [checkedIndeterminate, setCheckedIndeterminate] = useState<boolean>(false);
  const [checkedList, setCheckedList] = useState<Record<string, boolean>>({
    analytics: true,
    reports: false,
    alerts: true,
  });

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

  const listCheckedCount = Object.values(checkedList).filter(Boolean).length;
  const listIndeterminate = listCheckedCount > 0 && listCheckedCount < Object.keys(checkedList).length;

  return (
    <div className="avakio-checkbox-example" data-admin-theme={theme}>
      <header className="avakio-checkbox-hero">
        <div>
          <p className="avakio-checkbox-kicker">Avakio Components</p>
          <h1 className="avakio-checkbox-title">AvakioCheckbox Component</h1>
          <p className="avakio-checkbox-subtitle">
            A theme-aware checkbox  Supports indeterminate, descriptions, errors, disabled state, and keyboard navigation.
          </p>
        </div>
      </header>

      <Card className="avakio-checkbox-card">
        <CardHeader>
          <CardTitle>Basic & Disabled</CardTitle>
          <CardDescription>Checked, unchecked, disabled, and with descriptions.</CardDescription>
        </CardHeader>
        <CardContent className="avakio-checkbox-grid">
          <AvakioCheckbox
            checked={checkedBasic}
            onChange={setCheckedBasic}
            label="Marketing opt-in"
            description="Receive product updates and news."
            required
          />
          <AvakioCheckbox
            checked={checkedSecondary}
            onChange={setCheckedSecondary}
            label="Secondary preference"
            description="An optional setting."
          />
          <AvakioCheckbox
            label="Disabled option"
            description="Not available"
            disabled
            defaultChecked
          />
          <AvakioCheckbox
            label="With error"
            description="Please confirm to proceed."
            error={!checkedBasic ? 'This checkbox is required.' : undefined}
            checked={checkedBasic}
            onChange={setCheckedBasic}
          />
        </CardContent>
      </Card>

      <Card className="avakio-checkbox-card">
        <CardHeader>
          <CardTitle>Indeterminate</CardTitle>
          <CardDescription>Parent checkbox shows indeterminate when children partially selected.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="avakio-checkbox-stack">
            <AvakioCheckbox
              label="Enable notifications"
              indeterminate={listIndeterminate}
              checked={listCheckedCount === Object.keys(checkedList).length}
              onChange={(all) => {
                const next: Record<string, boolean> = {};
                Object.keys(checkedList).forEach((k) => { next[k] = all; });
                setCheckedList(next);
              }}
            />
            <div className="avakio-checkbox-nested">
              {Object.entries(checkedList).map(([key, val]) => (
                <AvakioCheckbox
                  key={key}
                  label={key}
                  size="sm"
                  checked={val}
                  onChange={(v) => setCheckedList((prev) => ({ ...prev, [key]: v }))}
                />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}




















