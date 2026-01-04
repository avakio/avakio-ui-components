import React, { useState, useRef } from 'react';
import { AvakioMultitext, AvakioMultitextRef } from '../../components/avakio/ui-controls/avakio-multitext/avakio-multitext';
import { AvakioButton } from '../../components/avakio/ui-controls/avakio-button/avakio-button';
import { AvakioTemplate } from '../../components/avakio/views/avakio-template/avakio-template';
import { AvakioLayout } from '../../components/avakio/layouts/avakio-layout/avakio-layout';
import { AvakioTabBar } from '../../components/avakio/ui-controls/avakio-tabbar/avakio-tabbar';
import { AvakioViewHeader } from '../../components/avakio/ui-widgets/avakio-view-header/avakio-view-header';
import {
  Box, Layers, Maximize2, ToggleLeft, Wand2, Settings, BookOpen,
  Plus, Trash2, RefreshCw, Eye, EyeOff, Mail, Phone, Tag
} from 'lucide-react';

// Tab options for navigation
const TAB_OPTIONS = [
  { id: 'basic', label: 'Basic Usage', icon: <Box size={14} /> },
  { id: 'labels', label: 'Labels & Positions', icon: <Layers size={14} /> },
  { id: 'states', label: 'States', icon: <ToggleLeft size={14} /> },
  { id: 'validation', label: 'Validation', icon: <Settings size={14} /> },
  { id: 'methods', label: 'Imperative Methods', icon: <Wand2 size={14} /> },
  { id: 'advanced', label: 'Advanced', icon: <Maximize2 size={14} /> },
  { id: 'docs', label: 'Documentation', icon: <BookOpen size={14} /> },
];

export function AvakioMultitextExample({ theme = 'material' }: { theme?: string }) {
  const [activeSection, setActiveSection] = useState<string | number | null>('basic');

  // Section refs for scroll navigation
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  // State for examples
  const [basicValue, setBasicValue] = useState<string[]>(['john@email.com']);
  const [controlledValue, setControlledValue] = useState<string[]>(['Tag 1', 'Tag 2', 'Tag 3']);
  const [dynamicValue, setDynamicValue] = useState<string[]>(['+1 555-0100']);
  
  // Methods demo
  const methodsRef = useRef<AvakioMultitextRef>(null);
  const [methodsStatus, setMethodsStatus] = useState<string>('Ready');
  const [methodsLog, setMethodsLog] = useState<string[]>([]);

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

  const logMethod = (msg: string) => {
    setMethodsLog(prev => [msg, ...prev.slice(0, 4)]);
    setMethodsStatus(msg);
  };

  return (
    <div className="avakio-multitext-demo-container">
      {/* Sticky Header + Tab Navigation */}
      <div className="avakio-multitext-sticky-header">
        {/* Header */}
        <AvakioViewHeader
          label="UI Controls"
          title="Multitext Component"
          subTitle="A dynamic multi-field text input that allows adding and removing fields on the fly. Ideal for collecting multiple emails, phone numbers, tags, or any repeated text values."
          isSticky={false}
        />

        {/* Tab Navigation */}
        <div className="avakio-multitext-tabbar-container">
          <AvakioTabBar
            id="multitext-demo-tabs"
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
        className="avakio-multitext-demo-section"
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
          content="Simple multitext input with add/remove functionality. Click the + button to add fields, × to remove."
        />

        <AvakioLayout
          id="layout-basic"
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioTemplate
              type="clean"
              borderType="clean"
              content="1. Basic Multitext"
            />,
            <AvakioMultitext
              label="Emails"
              labelWidth={100}
              placeholder="Enter email address"
              value={basicValue}
              onChange={(values) => setBasicValue(values)}
            />,
            <AvakioTemplate
              type="clean"
              borderType="clean"
              padding={[16, 0, 0, 0]}
              content={<p><strong>Values:</strong> {basicValue.join(', ') || '(empty)'}</p>}
            />,
          ]}
        />

        <AvakioLayout
          id="layout-default-value"
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioTemplate
              type="clean"
              borderType="clean"
              content="2. With Default Values"
            />,
            <AvakioTemplate
              type="clean"
              borderType="clean"
              padding={[0, 0, 8, 0]}
              content="Initialize with comma-separated values or an array. Each value gets its own field."
            />,
            <AvakioMultitext
              label="Tags"
              labelWidth={100}
              placeholder="Enter tag"
              defaultValue="React, TypeScript, Node.js"
              icon={<Tag size={16} />}
            />,
          ]}
        />

        <AvakioLayout
          id="layout-phone"
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioTemplate
              type="clean"
              borderType="clean"
              content="3. Phone Numbers"
            />,
            <AvakioMultitext
              label="Phone"
              labelWidth={100}
              placeholder="+1 (555) 000-0000"
              value={dynamicValue}
              onChange={(values) => setDynamicValue(values)}
              icon={<Phone size={16} />}
            />,
          ]}
        />
      </section>

      {/* Labels & Positions Section */}
      <section
        ref={(el) => { sectionRefs.current['labels'] = el; }}
        className="avakio-multitext-demo-section"
      >
        <AvakioTemplate
          type="section"
          borderType="clean"
          content="Labels & Positions"
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="Control label placement, alignment, and field numbering."
        />

        <AvakioLayout
          id="layout-label-left"
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioTemplate
              type="clean"
              borderType="clean"
              content="1. Label Position: Left (default)"
            />,
            <AvakioMultitext
              label="Recipients"
              labelWidth={100}
              labelPosition="left"
              placeholder="Enter recipient"
              defaultValue="alice@example.com, bob@example.com"
            />,
          ]}
        />

        <AvakioLayout
          id="layout-label-top"
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioTemplate
              type="clean"
              borderType="clean"
              content="2. Label Position: Top"
            />,
            <AvakioMultitext
              label="Alternate Contacts"
              labelPosition="top"
              placeholder="Enter contact"
              defaultValue="support@company.com"
            />,
          ]}
        />

        <AvakioLayout
          id="layout-label-align"
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioTemplate
              type="clean"
              borderType="clean"
              content="3. Label Alignment"
            />,
            <AvakioLayout
              type="clean"
              gap={16}
              cols={[
                <div style={{ flex: 1 }}>
                  <p style={{ margin: '0 0 8px', fontWeight: 600 }}>Left aligned</p>
                  <AvakioMultitext
                    label="Field"
                    labelWidth={80}
                    labelAlign="left"
                    placeholder="Value"
                  />
                </div>,
                <div style={{ flex: 1 }}>
                  <p style={{ margin: '0 0 8px', fontWeight: 600 }}>Right aligned</p>
                  <AvakioMultitext
                    label="Field"
                    labelWidth={80}
                    labelAlign="right"
                    placeholder="Value"
                  />
                </div>,
              ]}
            />,
          ]}
        />

        <AvakioLayout
          id="layout-numbered"
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioTemplate
              type="clean"
              borderType="clean"
              content="4. With Line Numbers"
            />,
            <AvakioTemplate
              type="clean"
              borderType="clean"
              padding={[0, 0, 8, 0]}
              content="Show numbered indices for each field."
            />,
            <AvakioMultitext
              label="Steps"
              labelWidth={100}
              placeholder="Enter step"
              defaultValue="Open app, Click button, Submit form"
              showNumbers
            />,
          ]}
        />

        <AvakioLayout
          id="layout-bottom-label"
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioTemplate
              type="clean"
              borderType="clean"
              content="5. With Bottom Label"
            />,
            <AvakioMultitext
              label="CC"
              labelWidth={100}
              placeholder="Add CC recipient"
              bottomLabel="Additional recipients will receive a copy of this message"
            />,
          ]}
        />
      </section>

      {/* States Section */}
      <section
        ref={(el) => { sectionRefs.current['states'] = el; }}
        className="avakio-multitext-demo-section"
      >
        <AvakioTemplate
          type="section"
          borderType="clean"
          content="States"
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="Different component states: disabled, readonly, required, and max fields limit."
        />

        <AvakioLayout
          id="layout-disabled"
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioTemplate
              type="clean"
              borderType="clean"
              content="1. Disabled State"
            />,
            <AvakioMultitext
              label="Disabled"
              labelWidth={100}
              placeholder="Cannot edit"
              defaultValue="Locked value 1, Locked value 2"
              disabled
            />,
          ]}
        />

        <AvakioLayout
          id="layout-readonly"
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioTemplate
              type="clean"
              borderType="clean"
              content="2. Readonly State"
            />,
            <AvakioTemplate
              type="clean"
              borderType="clean"
              padding={[0, 0, 8, 0]}
              content="Values can be viewed but not edited. Add/remove buttons are hidden."
            />,
            <AvakioMultitext
              label="Readonly"
              labelWidth={100}
              defaultValue="Read only value 1, Read only value 2"
              readonly
            />,
          ]}
        />

        <AvakioLayout
          id="layout-required"
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioTemplate
              type="clean"
              borderType="clean"
              content="3. Required Field"
            />,
            <AvakioMultitext
              label="Required"
              labelWidth={100}
              placeholder="This field is required"
              required
            />,
          ]}
        />

        <AvakioLayout
          id="layout-max-fields"
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioTemplate
              type="clean"
              borderType="clean"
              content="4. Maximum Fields Limit"
            />,
            <AvakioTemplate
              type="clean"
              borderType="clean"
              padding={[0, 0, 8, 0]}
              content="Limit the number of fields that can be added (max 3 in this example)."
            />,
            <AvakioMultitext
              label="Max 3"
              labelWidth={100}
              placeholder="Up to 3 values"
              maxFields={3}
              defaultValue="Value 1"
            />,
          ]}
        />
      </section>

      {/* Validation Section */}
      <section
        ref={(el) => { sectionRefs.current['validation'] = el; }}
        className="avakio-multitext-demo-section"
      >
        <AvakioTemplate
          type="section"
          borderType="clean"
          content="Validation"
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="Error states and custom validation."
        />

        <AvakioLayout
          id="layout-error"
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioTemplate
              type="clean"
              borderType="clean"
              content="1. Error State"
            />,
            <AvakioMultitext
              label="Email"
              labelWidth={100}
              placeholder="Enter valid email"
              defaultValue="invalid-email"
              error="Please enter a valid email address"
            />,
          ]}
        />

        <AvakioLayout
          id="layout-custom-validation"
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioTemplate
              type="clean"
              borderType="clean"
              content="2. Custom Validation"
            />,
            <AvakioTemplate
              type="clean"
              borderType="clean"
              padding={[0, 0, 8, 0]}
              content="Validates that all fields contain email addresses (blur to validate)."
            />,
            <AvakioMultitext
              label="Emails"
              labelWidth={100}
              placeholder="Enter email"
              validateEvent="blur"
              validate={(values) => {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                const invalidEmails = values.filter(v => v && !emailRegex.test(v));
                if (invalidEmails.length > 0) {
                  return `Invalid email(s): ${invalidEmails.join(', ')}`;
                }
                return true;
              }}
              invalidMessage="Please enter valid email addresses"
            />,
          ]}
        />

        <AvakioLayout
          id="layout-max-length"
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioTemplate
              type="clean"
              borderType="clean"
              content="3. Max Length per Field"
            />,
            <AvakioMultitext
              label="Tags"
              labelWidth={100}
              placeholder="Max 20 chars"
              maxLength={20}
            />,
          ]}
        />
      </section>

      {/* Imperative Methods Section */}
      <section
        ref={(el) => { sectionRefs.current['methods'] = el; }}
        className="avakio-multitext-demo-section"
      >
        <AvakioTemplate
          type="section"
          borderType="clean"
          content="Imperative Methods"
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="Control the component programmatically using ref methods."
        />

        <AvakioLayout
          id="layout-methods"
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioMultitext
              ref={methodsRef}
              label="Demo"
              labelWidth={80}
              placeholder="Enter value"
              defaultValue="Initial value"
              onChange={(values) => logMethod(`onChange: [${values.join(', ')}]`)}
              onSectionAdd={(id, idx) => logMethod(`onSectionAdd: ${id} at index ${idx}`)}
              onSectionRemove={(id, val) => logMethod(`onSectionRemove: ${id} (${val})`)}
            />,
            <AvakioTemplate
              type="clean"
              borderType="clean"
              padding={[16, 0, 0, 0]}
              content={
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  <AvakioButton
                    label="getValue()"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const val = methodsRef.current?.getValue();
                      logMethod(`getValue(): "${val}"`);
                    }}
                  />
                  <AvakioButton
                    label="getValues()"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const vals = methodsRef.current?.getValues();
                      logMethod(`getValues(): [${vals?.join(', ')}]`);
                    }}
                  />
                  <AvakioButton
                    label="setValue('A, B, C')"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      methodsRef.current?.setValue('A, B, C');
                      logMethod('setValue("A, B, C")');
                    }}
                  />
                  <AvakioButton
                    label="addSection()"
                    variant="outline"
                    size="sm"
                    icon={<Plus size={14} />}
                    onClick={() => {
                      const id = methodsRef.current?.addSection('New field');
                      logMethod(`addSection(): ${id}`);
                    }}
                  />
                  <AvakioButton
                    label="removeSection()"
                    variant="outline"
                    size="sm"
                    icon={<Trash2 size={14} />}
                    onClick={() => {
                      methodsRef.current?.removeSection();
                      logMethod('removeSection()');
                    }}
                  />
                  <AvakioButton
                    label="getFieldCount()"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const count = methodsRef.current?.getFieldCount();
                      logMethod(`getFieldCount(): ${count}`);
                    }}
                  />
                  <AvakioButton
                    label="clearAdditional()"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      methodsRef.current?.clearAdditional();
                      logMethod('clearAdditional()');
                    }}
                  />
                  <AvakioButton
                    label="clear()"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      methodsRef.current?.clear();
                      logMethod('clear()');
                    }}
                  />
                  <AvakioButton
                    label="focus()"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      methodsRef.current?.focus();
                      logMethod('focus()');
                    }}
                  />
                  <AvakioButton
                    label="validate()"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const valid = methodsRef.current?.validate();
                      logMethod(`validate(): ${valid}`);
                    }}
                  />
                </div>
              }
            />,
            <AvakioTemplate
              type="clean"
              borderType="material"
              margin={[16, 0, 0, 0]}
              padding={12}
              css={{ background: 'var(--avakio-bg-secondary)' }}
              content={
                <div>
                  <p style={{ margin: '0 0 8px', fontWeight: 600 }}>Method Log:</p>
                  {methodsLog.length > 0 ? (
                    <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '13px' }}>
                      {methodsLog.map((log, i) => (
                        <li key={i} style={{ opacity: 1 - i * 0.15 }}>{log}</li>
                      ))}
                    </ul>
                  ) : (
                    <p style={{ margin: 0, color: 'var(--avakio-text-muted)', fontSize: '13px' }}>
                      Click a method button to see the result
                    </p>
                  )}
                </div>
              }
            />,
          ]}
        />
      </section>

      {/* Advanced Section */}
      <section
        ref={(el) => { sectionRefs.current['advanced'] = el; }}
        className="avakio-multitext-demo-section"
      >
        <AvakioTemplate
          type="section"
          borderType="clean"
          content="Advanced"
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="Custom separators, sub-configuration, and event callbacks."
        />

        <AvakioLayout
          id="layout-separator"
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioTemplate
              type="clean"
              borderType="clean"
              content="1. Custom Separator"
            />,
            <AvakioTemplate
              type="clean"
              borderType="clean"
              padding={[0, 0, 8, 0]}
              content="Use a custom separator (semicolon) for the combined value."
            />,
            <AvakioMultitext
              label="Paths"
              labelWidth={100}
              placeholder="Enter path"
              defaultValue="C:/Users;D:/Projects;E:/Backup"
              separator="; "
            />,
          ]}
        />

        <AvakioLayout
          id="layout-subconfig"
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioTemplate
              type="clean"
              borderType="clean"
              content="2. Sub-Configuration for Additional Fields"
            />,
            <AvakioTemplate
              type="clean"
              borderType="clean"
              padding={[0, 0, 8, 0]}
              content="Primary field and additional fields can have different configurations."
            />,
            <AvakioMultitext
              label="Primary"
              labelWidth={100}
              placeholder="Primary field (no limit)"
              subConfig={{
                placeholder: 'Additional field (max 50 chars)',
                maxLength: 50,
              }}
            />,
          ]}
        />

        <AvakioLayout
          id="layout-controlled"
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioTemplate
              type="clean"
              borderType="clean"
              content="3. Controlled Component"
            />,
            <AvakioTemplate
              type="clean"
              borderType="clean"
              padding={[0, 0, 8, 0]}
              content="Fully controlled with external state management."
            />,
            <AvakioMultitext
              label="Tags"
              labelWidth={100}
              placeholder="Enter tag"
              value={controlledValue}
              onChange={(values) => setControlledValue(values)}
            />,
            <AvakioTemplate
              type="clean"
              borderType="clean"
              padding={[12, 0, 0, 0]}
              content={
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <AvakioButton
                    label="Add 'New Tag'"
                    variant="outline"
                    size="sm"
                    onClick={() => setControlledValue(prev => [...prev, `New Tag ${prev.length + 1}`])}
                  />
                  <AvakioButton
                    label="Clear All"
                    variant="outline"
                    size="sm"
                    onClick={() => setControlledValue([''])}
                  />
                  <AvakioButton
                    label="Reset"
                    variant="outline"
                    size="sm"
                    onClick={() => setControlledValue(['Tag 1', 'Tag 2', 'Tag 3'])}
                  />
                </div>
              }
            />,
            <AvakioTemplate
              type="clean"
              borderType="clean"
              padding={[8, 0, 0, 0]}
              content={<p><strong>State:</strong> [{controlledValue.map(v => `"${v}"`).join(', ')}]</p>}
            />,
          ]}
        />

        <AvakioLayout
          id="layout-custom-icon"
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioTemplate
              type="clean"
              borderType="clean"
              content="4. Custom Add Button"
            />,
            <AvakioMultitext
              label="Custom"
              labelWidth={100}
              placeholder="Enter value"
              addButtonLabel="Add"
              addButtonTooltip="Click to add a new field"
            />,
          ]}
        />
      </section>

      {/* Documentation Section */}
      <section
        ref={(el) => { sectionRefs.current['docs'] = el; }}
        className="avakio-multitext-demo-section"
      >
        <AvakioTemplate
          type="section"
          borderType="clean"
          content="Documentation"
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="Quick reference for using the AvakioMultitext component."
        />

        <AvakioLayout
          id="layout-docs"
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioTemplate
              type="clean"
              borderType="clean"
              content={
                <div>
                  <h4 style={{ margin: '0 0 12px' }}>Key Props</h4>
                  <ul style={{ margin: 0, paddingLeft: '20px', lineHeight: 1.8 }}>
                    <li><code>value</code> / <code>defaultValue</code> - String (comma-separated) or array of strings</li>
                    <li><code>label</code> / <code>labelPosition</code> / <code>labelWidth</code> - Label configuration</li>
                    <li><code>placeholder</code> - Placeholder text for fields</li>
                    <li><code>disabled</code> / <code>readonly</code> - State control</li>
                    <li><code>required</code> - Mark as required field</li>
                    <li><code>maxFields</code> - Limit number of fields</li>
                    <li><code>separator</code> - Delimiter for combined value (default: ", ")</li>
                    <li><code>subConfig</code> - Config for additional (non-primary) fields</li>
                    <li><code>showNumbers</code> - Show line numbers</li>
                    <li><code>theme</code> - material | flat | compact | dark | ocean | sunset</li>
                  </ul>
                </div>
              }
            />,
            <AvakioTemplate
              type="clean"
              borderType="clean"
              padding={[16, 0, 0, 0]}
              content={
                <div>
                  <h4 style={{ margin: '0 0 12px' }}>Ref Methods</h4>
                  <ul style={{ margin: 0, paddingLeft: '20px', lineHeight: 1.8 }}>
                    <li><code>getValue()</code> - Get combined comma-separated string</li>
                    <li><code>getValues()</code> - Get array of all values</li>
                    <li><code>setValue(value)</code> - Set value (string or array)</li>
                    <li><code>getValueHere()</code> / <code>setValueHere(value)</code> - Primary field only</li>
                    <li><code>addSection(value?)</code> - Add new field, returns field ID</li>
                    <li><code>removeSection(fieldId?)</code> - Remove field (last if no ID)</li>
                    <li><code>getFieldCount()</code> - Get number of fields</li>
                    <li><code>clearAdditional()</code> - Remove all except primary</li>
                    <li><code>clear()</code> - Clear all values</li>
                    <li><code>focus()</code> / <code>focusField(id)</code> - Focus management</li>
                    <li><code>validate()</code> - Trigger validation</li>
                  </ul>
                </div>
              }
            />,
            <AvakioTemplate
              type="clean"
              borderType="clean"
              padding={[16, 0, 0, 0]}
              content={
                <div>
                  <h4 style={{ margin: '0 0 12px' }}>Events</h4>
                  <ul style={{ margin: 0, paddingLeft: '20px', lineHeight: 1.8 }}>
                    <li><code>onChange(values, combinedValue)</code> - Fired when any value changes</li>
                    <li><code>onSectionAdd(fieldId, index)</code> - Fired when field is added</li>
                    <li><code>onSectionRemove(fieldId, value)</code> - Fired when field is removed</li>
                    <li><code>onFocus(fieldId, event)</code> - Fired when a field gains focus</li>
                    <li><code>onBlur(fieldId, event)</code> - Fired when a field loses focus</li>
                    <li><code>onEnter(fieldId, value)</code> - Fired on Enter key press</li>
                  </ul>
                </div>
              }
            />,
          ]}
        />
      </section>
    </div>
  );
}

export default AvakioMultitextExample;



















