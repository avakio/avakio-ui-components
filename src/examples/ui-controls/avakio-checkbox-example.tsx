import React, { useState } from 'react';
import { AvakioCheckbox } from '../../components/avakio/ui-controls/avakio-checkbox/avakio-checkbox';
import { AvakioTemplate } from '../../components/avakio/views/avakio-template/avakio-template';
import { AvakioLayout } from '../../components/avakio/layouts/avakio-layout/avakio-layout';

export function AvakioCheckboxExample() {
  const [checkedBasic, setCheckedBasic] = useState<boolean>(true);
  const [checkedSecondary, setCheckedSecondary] = useState<boolean>(false);
  const [checkedIndeterminate, setCheckedIndeterminate] = useState<boolean>(false);
  const [checkedList, setCheckedList] = useState<Record<string, boolean>>({
    analytics: true,
    reports: false,
    alerts: true,
  });

  const listCheckedCount = Object.values(checkedList).filter(Boolean).length;
  const listIndeterminate = listCheckedCount > 0 && listCheckedCount < Object.keys(checkedList).length;

  return (
    <div className="avakio-checkbox-example">
      <header className="avakio-checkbox-hero">
        <div>
          <p className="avakio-checkbox-kicker">Avakio Components</p>
          <h1 className="avakio-checkbox-title">AvakioCheckbox Component</h1>
          <p className="avakio-checkbox-subtitle">
            A theme-aware checkbox. Supports indeterminate, descriptions, errors, disabled state, and keyboard navigation.
          </p>
        </div>
      </header>

      <AvakioTemplate
        type="section"
        borderType="clean"
        content="Basic & Disabled"
      />
      <AvakioTemplate
        type="clean"
        borderType="clean"
        padding={[0, 0, 0, 16]}
        content="Checked, unchecked, disabled, and with descriptions."
      />
      <AvakioLayout
        type="clean"
        borderless={false}
        margin={12}
        padding={16}
        rows={[
          <div key="basic-grid" className="avakio-checkbox-grid">
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
          </div>,
        ]}
      />

      <AvakioTemplate
        type="section"
        borderType="clean"
        content="Indeterminate"
      />
      <AvakioTemplate
        type="clean"
        borderType="clean"
        padding={[0, 0, 0, 16]}
        content="Parent checkbox shows indeterminate when children partially selected."
      />
      <AvakioLayout
        type="clean"
        borderless={false}
        margin={12}
        padding={16}
        rows={[
          <div key="indeterminate" className="avakio-checkbox-stack">
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
          </div>,
        ]}
      />
    </div>
  );
}




















