import React, { useState, useEffect, useRef } from 'react';
import { AvakioForm, AvakioFormRef, AvakioFormTheme, FormRules } from '../../components/avakio/ui-widgets/avakio-form';
import { AvakioTemplate } from '../../components/avakio/views/avakio-template/avakio-template';
import { AvakioLayout } from '../../components/avakio/layouts/avakio-layout/avakio-layout';
import { AvakioRichSelect } from '../../components/avakio/ui-controls/avakio-richselect/avakio-richselect';
import { AvakioText } from '../../components/avakio/ui-controls/avakio-text/avakio-text';
import { AvakioCheckbox } from '../../components/avakio/ui-controls/avakio-checkbox/avakio-checkbox';
import { AvakioButton } from '../../components/avakio/ui-controls/avakio-button/avakio-button';
import { AvakioDataTable } from '../../components/avakio/data-presentation/avakio-datatable/AvakioDataTable';
import type { AvakioColumn } from '../../components/avakio/data-presentation/avakio-datatable/AvakioDataTable';
import { AvakioTabBar } from '../../components/avakio/ui-controls/avakio-tabbar/avakio-tabbar';
import { AvakioViewHeader } from '../../components/avakio/ui-widgets/avakio-view-header/avakio-view-header';
import { AvakioFieldset } from '../../components/avakio/ui-controls/avakio-fieldset/avakio-fieldset';
import {
  FileText,
  Palette,
  Settings2,
  Wand2,
  Book,
  Play,
  Shield,
  Layers,
} from 'lucide-react';
import '../../components/avakio/ui-widgets/avakio-form/avakio-form.css';
import './avakio-form-example.css';

// Tab options for navigation
const TAB_OPTIONS = [
  { id: 'basic', label: 'Basic Usage', icon: <FileText size={14} /> },
  { id: 'themes', label: 'Themes', icon: <Palette size={14} /> },
  { id: 'layouts', label: 'Layouts', icon: <Layers size={14} /> },
  { id: 'validation', label: 'Validation', icon: <Shield size={14} /> },
  { id: 'methods', label: 'Ref Methods', icon: <Wand2 size={14} /> },
  { id: 'playground', label: 'Interactive Playground', icon: <Play size={14} /> },
  { id: 'docs', label: 'Documentation', icon: <Book size={14} /> },
];

export function AvakioFormExample() {
  
  const [activeSection, setActiveSection] = useState<string | number | null>('basic');

  // Section refs for scroll navigation
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  // Playground state
  const [playgroundBorderless, setPlaygroundBorderless] = useState(false);
  const [playgroundDisabled, setPlaygroundDisabled] = useState(false);
  const [playgroundScroll, setPlaygroundScroll] = useState(false);
  const [playgroundType, setPlaygroundType] = useState<string>('form');
  const [playgroundWidth, setPlaygroundWidth] = useState<string>('100%');
  const [playgroundHeight, setPlaygroundHeight] = useState<string>('auto');

  // Ref example
  const formRef = useRef<AvakioFormRef>(null);
  const validationFormRef = useRef<AvakioFormRef>(null);
  const [eventLog, setEventLog] = useState<string[]>([]);
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });
  const [validationValues, setValidationValues] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    age: '',
  });
  const [validationErrors, setValidationErrors] = useState<Record<string, string | undefined>>({});

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

  // Sync with global theme
  

  // Add to event log
  const addLog = (message: string) => {
    setEventLog((prev) => [...prev.slice(-4), `${new Date().toLocaleTimeString()} - ${message}`]);
  };

  // Validation rules
  const validationRules = {
    email: [FormRules.isRequired, FormRules.isEmail],
    password: [FormRules.isRequired, FormRules.minLength(8)],
    confirmPassword: [
      FormRules.isRequired,
      (value: string, _name: string, values: Record<string, any>) => {
        if (value !== values.password) {
          return 'Passwords do not match';
        }
        return true;
      },
    ],
    age: [FormRules.isNumber, FormRules.minValue(18), FormRules.maxValue(120)],
  };

  // Props documentation data
  interface PropDoc {
    id: number;
    name: string;
    type: string;
    defaultValue: string;
    description: string;
  }

  const propsData: PropDoc[] = [
    { id: 1, name: 'children', type: 'ReactNode', defaultValue: '-', description: 'Child elements (form controls)' },
    { id: 2, name: 'elements', type: 'FormElement[]', defaultValue: '-', description: 'Form elements configuration (alternative to children)' },
    { id: 3, name: 'values', type: 'FormValues', defaultValue: '{}', description: 'Initial form values' },
    { id: 4, name: 'defaultValues', type: 'FormValues', defaultValue: '-', description: 'Default values for dirty checking' },
    { id: 5, name: 'rules', type: 'FormValidationRules', defaultValue: '{}', description: 'Validation rules for fields' },
    { id: 6, name: 'complexData', type: 'boolean', defaultValue: 'false', description: 'Enable dot notation for nested data' },
    { id: 7, name: 'autoHeight', type: 'boolean', defaultValue: 'false', description: 'Auto height based on content' },
    { id: 8, name: 'borderless', type: 'boolean', defaultValue: 'false', description: 'Remove form border' },
    { id: 9, name: 'disabled', type: 'boolean', defaultValue: 'false', description: 'Disable the form' },
    { id: 10, name: 'width', type: 'number | string', defaultValue: '-', description: 'Form width' },
    { id: 11, name: 'height', type: 'number | string', defaultValue: '-', description: 'Form height' },
    { id: 12, name: 'padding', type: 'number | string', defaultValue: '-', description: 'Internal padding' },
    { id: 13, name: 'margin', type: 'number | string', defaultValue: '-', description: 'Gap between elements' },
    { id: 14, name: 'scroll', type: "boolean | 'x' | 'y' | 'xy'", defaultValue: 'false', description: 'Enable scrolling' },
    { id: 15, name: 'type', type: "'clean' | 'line' | 'wide' | 'space' | 'form'", defaultValue: "'form'", description: 'Layout type' },
    { id: 16, name: 'theme', type: "'material' | 'flat' | 'compact' | 'dark' | 'ocean' | 'sunset'", defaultValue: '-', description: 'Theme variant' },
    { id: 17, name: 'onChange', type: '(name, value, values) => void', defaultValue: '-', description: 'Callback when a field value changes' },
    { id: 18, name: 'onValidation', type: '(isValid, errors) => void', defaultValue: '-', description: 'Callback after validation' },
    { id: 19, name: 'onSubmit', type: '(values) => void', defaultValue: '-', description: 'Callback when form is submitted' },
    { id: 20, name: 'onValues', type: '(values) => void', defaultValue: '-', description: 'Callback when values are set' },
  ];

  const refMethodsData: PropDoc[] = [
    { id: 1, name: 'getNode()', type: '() => HTMLFormElement | null', defaultValue: '-', description: 'Get the form DOM element' },
    { id: 2, name: 'getValues()', type: '() => FormValues', defaultValue: '-', description: 'Get all form values' },
    { id: 3, name: 'setValues(values, updateDirty?)', type: '(values, boolean?) => void', defaultValue: '-', description: 'Set form values' },
    { id: 4, name: 'getCleanValues()', type: '() => FormValues', defaultValue: '-', description: 'Get unchanged values' },
    { id: 5, name: 'getDirtyValues()', type: '() => FormValues', defaultValue: '-', description: 'Get changed values' },
    { id: 6, name: 'isDirty()', type: '() => boolean', defaultValue: '-', description: 'Check if form has changes' },
    { id: 7, name: 'setDirty(dirty)', type: '(boolean) => void', defaultValue: '-', description: 'Set dirty state' },
    { id: 8, name: 'validate()', type: '() => boolean', defaultValue: '-', description: 'Validate all fields' },
    { id: 9, name: 'clearValidation()', type: '() => void', defaultValue: '-', description: 'Clear validation errors' },
    { id: 10, name: 'markInvalid(name, message?)', type: '(string, string?) => void', defaultValue: '-', description: 'Mark a field as invalid' },
    { id: 11, name: 'clear()', type: '() => void', defaultValue: '-', description: 'Clear all form values' },
    { id: 12, name: 'focus(name?)', type: '(string?) => void', defaultValue: '-', description: 'Focus a field or first field' },
    { id: 13, name: 'isEnabled()', type: '() => boolean', defaultValue: '-', description: 'Check if form is enabled' },
    { id: 14, name: 'enable()', type: '() => void', defaultValue: '-', description: 'Enable the form' },
    { id: 15, name: 'disable()', type: '() => void', defaultValue: '-', description: 'Disable the form' },
    { id: 16, name: 'showBatch(name)', type: '(string) => void', defaultValue: '-', description: 'Show elements with batch name' },
    { id: 17, name: 'getErrors()', type: '() => FormErrors', defaultValue: '-', description: 'Get current validation errors' },
  ];

  const validationRulesData: PropDoc[] = [
    { id: 1, name: 'FormRules.isRequired', type: 'ValidationRule', defaultValue: '-', description: 'Field must not be empty' },
    { id: 2, name: 'FormRules.isEmail', type: 'ValidationRule', defaultValue: '-', description: 'Must be valid email format' },
    { id: 3, name: 'FormRules.isNumber', type: 'ValidationRule', defaultValue: '-', description: 'Must be a valid number' },
    { id: 4, name: 'FormRules.isPositive', type: 'ValidationRule', defaultValue: '-', description: 'Must be a positive number' },
    { id: 5, name: 'FormRules.isInteger', type: 'ValidationRule', defaultValue: '-', description: 'Must be an integer' },
    { id: 6, name: 'FormRules.pattern(regex)', type: '(RegExp) => ValidationRule', defaultValue: '-', description: 'Must match regex pattern' },
    { id: 7, name: 'FormRules.minLength(n)', type: '(number) => ValidationRule', defaultValue: '-', description: 'Minimum string length' },
    { id: 8, name: 'FormRules.maxLength(n)', type: '(number) => ValidationRule', defaultValue: '-', description: 'Maximum string length' },
    { id: 9, name: 'FormRules.minValue(n)', type: '(number) => ValidationRule', defaultValue: '-', description: 'Minimum numeric value' },
    { id: 10, name: 'FormRules.maxValue(n)', type: '(number) => ValidationRule', defaultValue: '-', description: 'Maximum numeric value' },
    { id: 11, name: 'FormRules.custom(fn)', type: '(Function) => ValidationRule', defaultValue: '-', description: 'Custom validation function' },
  ];

  const propsColumns: AvakioColumn<PropDoc>[] = [
    { id: 'name', header: 'Property', width: 200 },
    { id: 'type', header: 'Type', width: 280 },
    { id: 'defaultValue', header: 'Default', width: 100 },
    { id: 'description', header: 'Description', width: 350 },
  ];

  const themes: AvakioFormTheme[] = ['material', 'flat', 'compact', 'dark', 'ocean', 'sunset'];

  return (
    <div className="avakio-form-demo-container">
      {/* Sticky Header + Tab Navigation */}
      <div className="avakio-example-sticky-header">
        {/* Header */}
        <AvakioViewHeader
          label="UI Widgets"
          title="Form"
          subTitle="A theme-aware form component with validation, layouts, and dirty checking."
          isSticky={false}
        />

        {/* Tab Navigation */}
        <div className="avakio-example-tabbar-container">
          <AvakioTabBar
            id="form-demo-tabs"
            value={activeSection}
            options={TAB_OPTIONS}
            onChange={handleTabChange}
            align="left"
            padding={[6, 16, 16, 16]}
            size="sm"
            scrollable
          />
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="avakio-form-demo-content">
        {/* Basic Usage Section */}
        <section
          ref={(el) => {
            sectionRefs.current['basic'] = el;
          }}
          className="avakio-form-demo-section"
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
            content="A simple login form with text inputs and buttons."
          />
          <AvakioLayout
            type="clean"
            borderless={false}
            margin={12}
            padding={16}
            rows={[
              <div key="basic" className="avakio-form-demo-box">
                <AvakioForm
                  width={400}
                  padding={20}
                  margin={12}
                  onChange={(name, value, values) => {
                    setFormValues(values as typeof formValues);
                    addLog(`Field "${name}" changed to: ${value}`);
                  }}
                  onSubmit={(values) => {
                    addLog(`Form submitted: ${JSON.stringify(values)}`);
                  }}
                >
                  <AvakioText
                    label="Email"
                    placeholder="Enter your email"
                    value={formValues.email}
                    onChange={(val) => setFormValues((prev) => ({ ...prev, email: String(val) }))}
                  />
                  <AvakioText
                    label="Password"
                    type="password"
                    placeholder="Enter your password"
                    value={formValues.password}
                    onChange={(val) => setFormValues((prev) => ({ ...prev, password: String(val) }))}
                  />
                  <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                    <AvakioButton
                      value="Login"
                      variant="primary"
                      onClick={() => addLog('Login clicked')}
                    />
                    <AvakioButton
                      value="Cancel"
                      onClick={() => {
                        setFormValues({ email: '', password: '', firstName: '', lastName: '' });
                        addLog('Form cancelled');
                      }}
                    />
                  </div>
                </AvakioForm>

                {/* Event Log */}
                <div className="avakio-form-event-log">
                  <strong>Event Log:</strong>
                  {eventLog.length === 0 ? (
                    <div className="avakio-form-log-empty">Interact with the form to see events...</div>
                  ) : (
                    eventLog.map((log, i) => (
                      <div key={i} className="avakio-form-log-entry">
                        {log}
                      </div>
                    ))
                  )}
                </div>
              </div>,
            ]}
          />
        </section>

        {/* Themes Section */}
        <section
          ref={(el) => {
            sectionRefs.current['themes'] = el;
          }}
          className="avakio-form-demo-section"
        >
          <AvakioTemplate
            type="section"
            borderType="clean"
            content="Themes"
          />
          <AvakioTemplate
            type="clean"
            borderType="clean"
            padding={[0, 0, 0, 16]}
            content="AvakioForm supports 6 theme variants that integrate with the global theme system."
          />
          <AvakioLayout
            type="clean"
            borderless={false}
            margin={12}
            padding={16}
            rows={[
              <div key="themes" className="avakio-form-themes-grid">
                {themes.map((t) => (
                  <div key={t} className="avakio-form-theme-card" data-admin-theme={t}>
                    <div className="avakio-form-theme-label">{t}</div>
                    <AvakioForm theme={t} width={280} padding={16} margin={10}>
                      <AvakioText label="Name" placeholder="Enter name" />
                      <AvakioText label="Email" placeholder="Enter email" />
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <AvakioButton label="Submit" variant="primary" />
                        <AvakioButton label="Reset" />
                      </div>
                    </AvakioForm>
                  </div>
                ))}
              </div>,
            ]}
          />
        </section>

        {/* Layouts Section */}
        <section
          ref={(el) => {
            sectionRefs.current['layouts'] = el;
          }}
          className="avakio-form-demo-section"
        >
          <AvakioTemplate
            type="section"
            borderType="clean"
            content="Layout Options"
          />
          <AvakioTemplate
            type="clean"
            borderType="clean"
            padding={[0, 0, 0, 16]}
            content="Forms can be organized with columns, rows, sections, and fieldsets."
          />
          <AvakioLayout
            type="clean"
            borderless={false}
            margin={12}
            padding={16}
            rows={[
              <div key="layouts" className="avakio-form-layouts-grid">
                {/* Columns Layout */}
                <div className="avakio-form-layout-example">
                  <h4>Columns Layout</h4>
                  <AvakioForm width="100%" padding={16} margin={12}>
                    <div className="avakio-form__cols">
                      <AvakioText label="First Name" placeholder="First" />
                      <AvakioText label="Last Name" placeholder="Last" />
                    </div>
                    <div className="avakio-form__cols">
                      <AvakioText label="City" placeholder="City" />
                      <AvakioText label="State" placeholder="State" />
                      <AvakioText label="ZIP" placeholder="ZIP" />
                    </div>
                  </AvakioForm>
                </div>

                {/* With Fieldset */}
                <div className="avakio-form-layout-example">
                  <h4>With Fieldset</h4>
                  <AvakioForm width="100%" padding={16} margin={12}>
                    <AvakioFieldset label="Personal Info">
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <AvakioText label="Full Name" placeholder="Enter name" />
                        <AvakioText label="Email" placeholder="Enter email" />
                      </div>
                    </AvakioFieldset>
                    <AvakioFieldset label="Address">
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <AvakioText label="Street" placeholder="Street address" />
                        <div className="avakio-form__cols">
                          <AvakioText label="City" placeholder="City" />
                          <AvakioText label="ZIP" placeholder="ZIP" />
                        </div>
                      </div>
                    </AvakioFieldset>
                  </AvakioForm>
                </div>

                {/* Type Variants */}
                <div className="avakio-form-layout-example">
                  <h4>Type: Clean (No Border)</h4>
                  <AvakioForm type="clean" width="100%" margin={10}>
                    <AvakioText label="Username" placeholder="Enter username" />
                    <AvakioText label="Password" type="password" placeholder="Enter password" />
                  </AvakioForm>
                </div>

                <div className="avakio-form-layout-example">
                  <h4>Type: Wide (More Padding)</h4>
                  <AvakioForm type="wide" width="100%">
                    <AvakioText label="Username" placeholder="Enter username" />
                    <AvakioText label="Password" type="password" placeholder="Enter password" />
                  </AvakioForm>
                </div>
              </div>,
            ]}
          />
        </section>

        {/* Validation Section */}
        <section
          ref={(el) => {
            sectionRefs.current['validation'] = el;
          }}
          className="avakio-form-demo-section"
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
            content="Built-in validation rules with custom error messages."
          />
          <AvakioLayout
            type="clean"
            borderless={false}
            margin={12}
            padding={16}
            rows={[
              <div key="validation" className="avakio-form-demo-box">
                <AvakioForm
                  ref={validationFormRef}
                  width={450}
                  padding={20}
                  margin={12}
                  rules={validationRules}
                  onValidation={(isValid, errors) => {
                    setValidationErrors(errors);
                    addLog(`Validation ${isValid ? 'passed' : 'failed'}`);
                  }}
                  onChange={(name, value) => {
                    setValidationValues((prev) => ({ ...prev, [name]: value }));
                  }}
                  onSubmit={(values) => {
                    addLog(`Registration submitted: ${JSON.stringify(values)}`);
                  }}
                >
                  <AvakioText
                    label="Email *"
                    placeholder="Enter email"
                    value={validationValues.email}
                    onChange={(val) =>
                      setValidationValues((prev) => ({ ...prev, email: String(val) }))
                    }
                    invalid={!!validationErrors.email}
                    invalidMessage={validationErrors.email}
                  />
                  <AvakioText
                    label="Password * (min 8 characters)"
                    type="password"
                    placeholder="Enter password"
                    value={validationValues.password}
                    onChange={(val) =>
                      setValidationValues((prev) => ({ ...prev, password: String(val) }))
                    }
                    invalid={!!validationErrors.password}
                    invalidMessage={validationErrors.password}
                  />
                  <AvakioText
                    label="Confirm Password *"
                    type="password"
                    placeholder="Confirm password"
                    value={validationValues.confirmPassword}
                    onChange={(val) =>
                      setValidationValues((prev) => ({ ...prev, confirmPassword: String(val) }))
                    }
                    invalid={!!validationErrors.confirmPassword}
                    invalidMessage={validationErrors.confirmPassword}
                  />
                  <AvakioText
                    label="Age (18-120)"
                    placeholder="Enter age"
                    value={validationValues.age}
                    onChange={(val) =>
                      setValidationValues((prev) => ({ ...prev, age: String(val) }))
                    }
                    invalid={!!validationErrors.age}
                    invalidMessage={validationErrors.age}
                  />
                  <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                    <AvakioButton
                      value="Register"
                      variant="primary"
                      onClick={() => validationFormRef.current?.validate()}
                    />
                    <AvakioButton
                      value="Clear Validation"
                      onClick={() => {
                        validationFormRef.current?.clearValidation();
                        setValidationErrors({});
                      }}
                    />
                  </div>
                </AvakioForm>

                {/* Validation Rules Table */}
                <div className="avakio-form-validation-rules">
                  <h4>Available Validation Rules</h4>
                  <AvakioDataTable
                    data={validationRulesData}
                    columns={propsColumns}
                    rowHeight={36}
                    headerHeight={40}
                    height={440}
                  />
                </div>
              </div>,
            ]}
          />
        </section>

        {/* Ref Methods Section */}
        <section
          ref={(el) => {
            sectionRefs.current['methods'] = el;
          }}
          className="avakio-form-demo-section"
        >
          <AvakioTemplate
            type="section"
            borderType="clean"
            content="Ref Methods"
          />
          <AvakioTemplate
            type="clean"
            borderType="clean"
            padding={[0, 0, 0, 16]}
            content="Access form methods via ref for programmatic control."
          />
          <AvakioLayout
            type="clean"
            borderless={false}
            margin={12}
            padding={16}
            rows={[
              <div key="methods" className="avakio-form-demo-box">
                <AvakioForm
                  ref={formRef}
                  width={400}
                  padding={20}
                  margin={12}
                  values={formValues}
                  onChange={(name, value, values) => {
                    setFormValues(values as typeof formValues);
                  }}
                >
                  <AvakioText
                    label="First Name"
                    value={formValues.firstName}
                    onChange={(val) =>
                      setFormValues((prev) => ({ ...prev, firstName: String(val) }))
                    }
                  />
                  <AvakioText
                    label="Last Name"
                    value={formValues.lastName}
                    onChange={(val) =>
                      setFormValues((prev) => ({ ...prev, lastName: String(val) }))
                    }
                  />
                  <AvakioText
                    label="Email"
                    value={formValues.email}
                    onChange={(val) => setFormValues((prev) => ({ ...prev, email: String(val) }))}
                  />
                </AvakioForm>

                {/* Method Buttons */}
                <div className="avakio-form-methods-container">
                  <div className="avakio-form-methods-buttons">
                    <AvakioButton
                      value="Get Values"
                      onClick={() => {
                        const values = formRef.current?.getValues();
                        addLog(`getValues(): ${JSON.stringify(values)}`);
                      }}
                    />
                    <AvakioButton
                      value="Set Values"
                      onClick={() => {
                        formRef.current?.setValues({
                          firstName: 'John',
                          lastName: 'Doe',
                          email: 'john@example.com',
                        });
                        setFormValues({
                          firstName: 'John',
                          lastName: 'Doe',
                          email: 'john@example.com',
                          password: '',
                        });
                        addLog('setValues() called');
                      }}
                    />
                    <AvakioButton
                      value="Clear"
                      onClick={() => {
                        formRef.current?.clear();
                        setFormValues({ email: '', password: '', firstName: '', lastName: '' });
                        addLog('clear() called');
                      }}
                    />
                    <AvakioButton
                      value="Is Dirty?"
                      onClick={() => {
                        const dirty = formRef.current?.isDirty();
                        addLog(`isDirty(): ${dirty}`);
                      }}
                    />
                    <AvakioButton
                      value="Disable"
                      onClick={() => {
                        formRef.current?.disable();
                        addLog('disable() called');
                      }}
                    />
                    <AvakioButton
                      value="Enable"
                      onClick={() => {
                        formRef.current?.enable();
                        addLog('enable() called');
                      }}
                    />
                    <AvakioButton
                      value="Focus First"
                      onClick={() => {
                        formRef.current?.focus();
                        addLog('focus() called');
                      }}
                    />
                  </div>

                  {/* Event Log */}
                  <div className="avakio-form-event-log">
                    <strong>Method Results:</strong>
                    {eventLog.length === 0 ? (
                      <div className="avakio-form-log-empty">Click buttons to see method results...</div>
                    ) : (
                      eventLog.map((log, i) => (
                        <div key={i} className="avakio-form-log-entry">
                          {log}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>,
            ]}
          />
        </section>

        {/* Playground Section */}
        <section
          ref={(el) => {
            sectionRefs.current['playground'] = el;
          }}
          className="avakio-form-demo-section"
        >
          <AvakioTemplate
            type="section"
            borderType="clean"
            content="Interactive Playground"
          />
          <AvakioTemplate
            type="clean"
            borderType="clean"
            padding={[0, 0, 0, 16]}
            content="Experiment with different form configurations."
          />
          <AvakioLayout
            type="clean"
            borderless={false}
            margin={12}
            padding={16}
            rows={[
              <div key="playground" className="avakio-form-playground">
                {/* Preview */}
                <div className="avakio-form-playground-preview">
                  <h4>Preview</h4>
                  <AvakioForm
                    theme="material"
                    type={playgroundType as any}
                    borderless={playgroundBorderless}
                    disabled={playgroundDisabled}
                    scroll={playgroundScroll}
                    width={playgroundWidth}
                    height={playgroundHeight !== 'auto' ? playgroundHeight : undefined}
                    autoHeight={playgroundHeight === 'auto'}
                    padding={16}
                    margin={12}
                  >
                    <AvakioText label="Name" placeholder="Enter your name" />
                    <AvakioText label="Email" placeholder="Enter your email" />
                    <div className="avakio-form__cols">
                      <AvakioText label="City" placeholder="City" />
                      <AvakioText label="ZIP" placeholder="ZIP" />
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <AvakioButton label="Submit" variant="primary" />
                      <AvakioButton label="Cancel" />
                    </div>
                  </AvakioForm>
                </div>

                {/* Configuration */}
                <div className="avakio-form-playground-config">
                  <strong>Configuration</strong>
                  <AvakioRichSelect
                    label="Type"
                    value={playgroundType}
                    options={[
                      { id: 'form', value: 'Form (default)' },
                      { id: 'clean', value: 'Clean (no border)' },
                      { id: 'line', value: 'Line (minimal)' },
                      { id: 'wide', value: 'Wide (more padding)' },
                      { id: 'space', value: 'Space (extra spacing)' },
                    ]}
                    onChange={(val) => setPlaygroundType(String(val))}
                  />
                  <AvakioText
                    label="Width"
                    value={playgroundWidth}
                    onChange={(val) => setPlaygroundWidth(String(val))}
                  />
                  <AvakioText
                    label="Height"
                    value={playgroundHeight}
                    onChange={(val) => setPlaygroundHeight(String(val))}
                  />
                  <AvakioCheckbox
                    label="Borderless"
                    checked={playgroundBorderless}
                    onChange={setPlaygroundBorderless}
                  />
                  <AvakioCheckbox
                    label="Disabled"
                    checked={playgroundDisabled}
                    onChange={setPlaygroundDisabled}
                  />
                  <AvakioCheckbox label="Scroll" checked={playgroundScroll} onChange={setPlaygroundScroll} />
                </div>
              </div>,
            ]}
          />
        </section>

        {/* Documentation Section */}
        <section
          ref={(el) => {
            sectionRefs.current['docs'] = el;
          }}
          className="avakio-form-demo-section"
          data-section="docs"
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
            content="Complete API reference for AvakioForm."
          />
          <AvakioLayout
            type="clean"
            borderless={false}
            margin={12}
            padding={16}
            rows={[
              <div key="props-docs" className="avakio-form-docs-section">
                <h3>Props</h3>
                <AvakioDataTable
                  data={propsData}
                  columns={propsColumns}
                  rowHeight={36}
                  headerHeight={40}
                  height={700}
                />
              </div>,
              <div key="methods-docs" className="avakio-form-docs-section">
                <h3>Ref Methods</h3>
                <AvakioDataTable
                  data={refMethodsData}
                  columns={propsColumns}
                  rowHeight={36}
                  headerHeight={40}
                  height={600}
                />
              </div>,
              <div key="usage-docs" className="avakio-form-docs-section">
                <h3>Usage Example</h3>
                <pre className="avakio-form-code-block">
                  {`import { AvakioForm, FormRules } from '../../components/avakio/ui-controls/avakio-form';

// Basic form with validation
<AvakioForm
  width={400}
  padding={20}
  rules={{
    email: [FormRules.isRequired, FormRules.isEmail],
    password: [FormRules.isRequired, FormRules.minLength(8)],
  }}
  onValidation={(isValid, errors) => {
    if (isValid) {
      console.log('Form is valid!');
    }
  }}
  onSubmit={(values) => {
    console.log('Submitted:', values);
  }}
>
  <AvakioText name="email" label="Email" />
  <AvakioText name="password" label="Password" type="password" />
  <AvakioButton label="Submit" variant="primary" />
</AvakioForm>`}
                </pre>
              </div>,
            ]}
          />
        </section>
      </div>
    </div>
  );
}

export default AvakioFormExample;






















