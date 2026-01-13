import React, { useState, useRef } from 'react';
import { AvakioText, AvakioTextRef } from '../../components/avakio/ui-controls/avakio-text/avakio-text';
import { AvakioTemplate } from '../../components/avakio/views/avakio-template/avakio-template';
import { Button } from '@/components/ui/button';
import { Mail, User, Lock, Search, Phone, DollarSign, Calendar, Link as LinkIcon, Type, Shield, Settings, CheckCircle, PenTool, Palette } from 'lucide-react';
import '../../components/avakio/ui-controls/avakio-text/avakio-text.css';

export function AvakioTextExample() {
  // Interactive Props Playground State
  const [playgroundTheme, setPlaygroundTheme] = useState<string>('material');
  const [playgroundLabel, setPlaygroundLabel] = useState<string>('Input Label');
  const [playgroundPlaceholder, setPlaygroundPlaceholder] = useState<string>('Enter text...');
  const [playgroundType, setPlaygroundType] = useState<string>('text');
  const [playgroundWidth, setPlaygroundWidth] = useState<string>('100%');
  const [playgroundLabelPosition, setPlaygroundLabelPosition] = useState<string>('top');
  const [playgroundInputAlign, setPlaygroundInputAlign] = useState<string>('left');
  const [playgroundDisabled, setPlaygroundDisabled] = useState(false);
  const [playgroundReadonly, setPlaygroundReadonly] = useState(false);
  const [playgroundRequired, setPlaygroundRequired] = useState(false);
  const [playgroundClear, setPlaygroundClear] = useState(false);
  const [playgroundEnableValueCopyButton, setPlaygroundEnableValueCopyButton] = useState(false);
  const [playgroundEnablePlaceHolderCopyButton, setPlaygroundEnablePlaceHolderCopyButton] = useState(false);
  const [playgroundBottomLabel, setPlaygroundBottomLabel] = useState<string>('');
  
  // Applied Props State
  const [appliedProps, setAppliedProps] = useState({
    theme: 'material',
    label: 'Input Label',
    placeholder: 'Enter text...',
    type: 'text',
    width: '100%',
    labelPosition: 'top',
    inputAlign: 'left',
    disabled: false,
    readonly: false,
    required: false,
    clear: false,
    enableValueCopyButton: false,
    enablePlaceHolderCopyButton: false,
    bottomLabel: '',
  });
  
  const handleApplyProps = () => {
    setAppliedProps({
      theme: playgroundTheme,
      label: playgroundLabel,
      placeholder: playgroundPlaceholder,
      type: playgroundType,
      width: playgroundWidth,
      labelPosition: playgroundLabelPosition,
      inputAlign: playgroundInputAlign,
      disabled: playgroundDisabled,
      readonly: playgroundReadonly,
      required: playgroundRequired,
      clear: playgroundClear,
      enableValueCopyButton: playgroundEnableValueCopyButton,
      enablePlaceHolderCopyButton: playgroundEnablePlaceHolderCopyButton,
      bottomLabel: playgroundBottomLabel,
    });
  };
  
  // Basic inputs state
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john@example.com');
  const [password, setPassword] = useState('');
  
  // Validation example state
  const [username, setUsername] = useState('');
  const [age, setAge] = useState('');
  const [website, setWebsite] = useState('');
  
  // Interactive example state
  const [searchTerm, setSearchTerm] = useState('');
  const textRef = useRef<AvakioTextRef>(null);
  const [refValue, setRefValue] = useState('');
  
  // Form example state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    emailAddress: '',
    phoneNumber: '',
    address: '',
    city: '',
    zipCode: '',
  });
  
  

  const handleGetValue = () => {
    const value = textRef.current?.getValue();
    setRefValue(value || '');
    alert(`Current value: ${value}`);
  };

  const handleSetValue = () => {
    textRef.current?.setValue('Value set via ref!');
  };

  const handleFocus = () => {
    textRef.current?.focus();
  };

  const handleClear = () => {
    textRef.current?.clear();
  };

  const handleValidate = () => {
    const isValid = textRef.current?.validate();
    alert(isValid ? 'Valid!' : 'Invalid!');
  };

  const handleFormSubmit = () => {
    console.log('Form submitted:', formData);
    alert('Form data logged to console');
  };

  const handleFormReset = () => {
    setFormData({
      firstName: '',
      lastName: '',
      emailAddress: '',
      phoneNumber: '',
      address: '',
      city: '',
      zipCode: '',
    });
  };

  return (
    <div className="avakio-template-demo-container">
      <AvakioTemplate
        id="text-example-header"
        type="header"
        borderType="clean"
        content={
    <div>
      <p style={{ margin: 0, fontSize: '14px', fontWeight: 500, letterSpacing: '0.5px', 
        textTransform: 'uppercase', opacity: 0.9 }}>UI Controls</p>
      <p style={{ 
        margin: 0, 
        fontWeight: 600,
        fontSize: '24px',        
        lineHeight: '2x',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu, "Helvetica Neue", sans-serif'
      }}>Edit onboarding workflow</p>

      <p style={{ 
        margin: 0, 
        fontSize: '14px', 
        fontWeight: 400,        
        letterSpacing: '0.01em',
        lineHeight: '1.5',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        WebkitFontSmoothing: 'antialiased'
      }}>
        General Onboarding [US].
      </p>
    </div>
        }
      />

         

      {/* Basic Inputs Section */}
      <section className="avakio-template-demo-section">
        <AvakioTemplate
          type="section"
          borderType="clean"
          content={
            <div>
              <h3 style={{ margin: '0 0 4px 0' }}>
                <Type size={20} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                Basic Text Inputs
              </h3>
              <p style={{ margin: 0, fontSize: '14px', opacity: 0.7 }}>Standard text inputs with labels, placeholders, and icons.</p>
            </div>
          }
        />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
          <Button onClick={() => console.log('Inputs:', { name, email, password })} size="sm">
            Log Values
          </Button>
          <Button variant="outline" onClick={() => { setName(''); setEmail(''); setPassword(''); }} size="sm">
            Clear All
          </Button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          <AvakioText
            label="Name"
            placeholder="Enter your name"
            value={name}
            onChange={({ value }) => setName(value)}
            icon={<User size={16} />}
            iconPosition="left"
          />
          <AvakioText
            label="Email"
            placeholder="Enter your email"
            type="email"
            value={email}
            onChange={({ value }) => setEmail(value)}
            icon={<Mail size={16} />}
            iconPosition="left"
          />
          <AvakioText
            label="Password"
            placeholder="Enter password"
            type="password"
            value={password}
            onChange={({ value }) => setPassword(value)}
          />
        </div>
      </section>

      {/* Input Types Section */}
      <section className="avakio-template-demo-section">
        <AvakioTemplate
          type="section"
          borderType="clean"
          content={
            <div>
              <h3 style={{ margin: '0 0 4px 0' }}>
                <Settings size={20} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                Input Types
              </h3>
              <p style={{ margin: 0, fontSize: '14px', opacity: 0.7 }}>Different input types with HTML5 validation.</p>
            </div>
          }
        />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          <AvakioText
            label="Search"
            type="search"
            placeholder="Search..."
            clear={true}
            value={searchTerm}
            onChange={({ value }) => setSearchTerm(value)}
            icon={<Search size={16} />}
          />
          <AvakioText
            label="Phone"
            type="tel"
            placeholder="+1 (555) 123-4567"
            icon={<Phone size={16} />}
          />
          <AvakioText
            label="Number"
            type="number"
            placeholder="Enter amount"
            min={0}
            max={1000}
            step={10}
            icon={<DollarSign size={16} />}
          />
          <AvakioText
            label="URL"
            type="url"
            placeholder="https://example.com"
            icon={<LinkIcon size={16} />}
          />
        </div>
      </section>

      {/* Validation Section */}
      <section className="avakio-template-demo-section">
        <AvakioTemplate
          type="section"
          borderType="clean"
          content={
            <div>
              <h3 style={{ margin: '0 0 4px 0' }}>
                <Shield size={20} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                Validation
              </h3>
              <p style={{ margin: 0, fontSize: '14px', opacity: 0.7 }}>Custom validation rules with real-time feedback.</p>
            </div>
          }
        />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          <AvakioText
            label="Username"
            placeholder="Enter username"
            value={username}
            onChange={({ value }) => setUsername(value)}
            validate={(value) => {
              if (!value) return 'Username is required';
              if (value.length < 3) return 'Username must be at least 3 characters';
              if (!/^[a-zA-Z0-9_]+$/.test(value)) return 'Only letters, numbers, and underscores allowed';
              return true;
            }}
            validateEvent="change"
            bottomLabel="Min 3 characters, alphanumeric only"
          />
          <AvakioText
            label="Age"
            type="number"
            placeholder="Enter your age"
            value={age}
            onChange={({ value }) => setAge(value)}
            min={18}
            max={120}
            validate={(value) => {
              const num = parseInt(value);
              if (isNaN(num)) return 'Please enter a valid number';
              if (num < 18) return 'You must be at least 18 years old';
              if (num > 120) return 'Please enter a valid age';
              return true;
            }}
            validateEvent="blur"
            bottomLabel="Must be between 18 and 120"
          />
          <AvakioText
            label="Website"
            type="url"
            placeholder="https://yoursite.com"
            value={website}
            onChange={({ value }) => setWebsite(value)}
            required
            bottomLabel="Required field"
          />
        </div>
      </section>

      {/* Interactive/Ref Methods Section */}
      <section className="avakio-template-demo-section">
        <AvakioTemplate
          type="section"
          borderType="clean"
          content={
            <div>
              <h3 style={{ margin: '0 0 4px 0' }}>
                <Settings size={20} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                Ref Methods (Programmatic Control)
              </h3>
              <p style={{ margin: 0, fontSize: '14px', opacity: 0.7 }}>Control the input programmatically using ref methods.</p>
            </div>
          }
        />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
          <Button onClick={handleGetValue} size="sm">
            Get Value
          </Button>
          <Button onClick={handleSetValue} size="sm">
            Set Value
          </Button>
          <Button onClick={handleFocus} size="sm">
            Focus
          </Button>
          <Button onClick={handleClear} size="sm">
            Clear
          </Button>
          <Button onClick={handleValidate} size="sm">
            Validate
          </Button>
          <Button variant="outline" onClick={() => textRef.current?.disable()} size="sm">
            Disable
          </Button>
          <Button variant="outline" onClick={() => textRef.current?.enable()} size="sm">
            Enable
          </Button>
        </div>

        <AvakioText
          ref={textRef}
          label="Controlled Input"
          placeholder="Use buttons above to control this input"
          validate={(value) => value.length >= 5 || 'Must be at least 5 characters'}
          bottomLabel="Try the buttons above to interact with this input"
        />
        {refValue && (
          <div style={{ marginTop: '10px', padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '4px' }}>
            Last retrieved value: <strong>{refValue}</strong>
          </div>
        )}
      </section>

      {/* Label Positions Section */}
      <section className="avakio-template-demo-section">
        <AvakioTemplate
          type="section"
          borderType="clean"
          content={
            <div>
              <h3 style={{ margin: '0 0 4px 0' }}>
                <PenTool size={20} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                Label Positions & Alignment
              </h3>
              <p style={{ margin: 0, fontSize: '14px', opacity: 0.7 }}>Configure label position and text alignment.</p>
            </div>
          }
        />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          <AvakioText
            label="Left Label"
            labelPosition="left"
            placeholder="Label on the left"
          />
          <AvakioText
            label="Top Label"
            labelPosition="top"
            placeholder="Label on top"
          />
          <AvakioText
            label="Right Aligned"
            labelAlign="right"
            inputAlign="right"
            placeholder="Right aligned"
          />
          <AvakioText
            label="Center Input"
            inputAlign="center"
            placeholder="Centered text"
          />
        </div>
      </section>

      {/* Form Example Section */}
      <section className="avakio-template-demo-section">
        <AvakioTemplate
          type="section"
          borderType="clean"
          content={
            <div>
              <h3 style={{ margin: '0 0 4px 0' }}>
                <Mail size={20} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                Complete Form Example
              </h3>
              <p style={{ margin: 0, fontSize: '14px', opacity: 0.7 }}>A complete form with multiple input fields.</p>
            </div>
          }
        />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
          <Button onClick={handleFormSubmit} size="sm">
            Submit Form
          </Button>
          <Button variant="outline" onClick={handleFormReset} size="sm">
            Reset Form
          </Button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          <AvakioText
            label="First Name"
            placeholder="Enter first name"
            value={formData.firstName}
            onChange={({ value }) => setFormData({ ...formData, firstName: value })}
            required
          />
          <AvakioText
            label="Last Name"
            placeholder="Enter last name"
            value={formData.lastName}
            onChange={({ value }) => setFormData({ ...formData, lastName: value })}
            required
          />
          <AvakioText
            label="Email"
            type="email"
            placeholder="email@example.com"
            value={formData.emailAddress}
            onChange={({ value }) => setFormData({ ...formData, emailAddress: value })}
            required
            icon={<Mail size={16} />}
          />
          <AvakioText
            label="Phone"
            type="tel"
            placeholder="+1 (555) 123-4567"
            value={formData.phoneNumber}
            onChange={({ value }) => setFormData({ ...formData, phoneNumber: value })}
            icon={<Phone size={16} />}
          />
          <AvakioText
            label="Address"
            placeholder="Street address"
            value={formData.address}
            onChange={({ value }) => setFormData({ ...formData, address: value })}
            labelPosition="top"
          />
          <AvakioText
            label="City"
            placeholder="City"
            value={formData.city}
            onChange={({ value }) => setFormData({ ...formData, city: value })}
          />
          <AvakioText
            label="ZIP Code"
            placeholder="12345"
            value={formData.zipCode}
            onChange={({ value }) => setFormData({ ...formData, zipCode: value })}
            pattern="[0-9]{5}"
            maxLength={5}
          />
        </div>
      </section>

      {/* Theme Showcase Section */}
      <section className="avakio-template-demo-section">
        <AvakioTemplate
          type="section"
          borderType="clean"
          content={
            <div>
              <h3 style={{ margin: '0 0 4px 0' }}>
                <Palette size={20} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                Theme Showcase
              </h3>
              <p style={{ margin: 0, fontSize: '14px', opacity: 0.7 }}>All available themes with the same input.</p>
            </div>
          }
        />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          <AvakioText
            label="Material"
            theme="material"
            value="Material theme"
            icon={<Calendar size={16} />}
          />
          <AvakioText
            label="Flat"
            theme="flat"
            value="Flat theme"
            icon={<Calendar size={16} />}
          />
          <AvakioText
            label="Compact"
            theme="compact"
            value="Compact theme"
            icon={<Calendar size={16} />}
          />
          <AvakioText
            label="Dark"
            theme="dark"
            value="Dark theme"
            icon={<Calendar size={16} />}
          />
          <AvakioText
            label="Ocean"
            theme="ocean"
            value="Ocean theme"
            icon={<Calendar size={16} />}
          />
          <AvakioText
            label="Sunset"
            theme="sunset"
            value="Sunset theme"
            icon={<Calendar size={16} />}
          />
        </div>
      </section>

      {/* States Section */}
      <section className="avakio-template-demo-section">
        <AvakioTemplate
          type="section"
          borderType="clean"
          content={
            <div>
              <h3 style={{ margin: '0 0 4px 0' }}>
                <CheckCircle size={20} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                Input States
              </h3>
              <p style={{ margin: 0, fontSize: '14px', opacity: 0.7 }}>Different states: normal, disabled, readonly, invalid, required.</p>
            </div>
          }
        />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          <AvakioText
            label="Normal"
            placeholder="Normal state"
          />
          <AvakioText
            label="Disabled"
            placeholder="Disabled state"
            disabled
            value="Cannot edit"
          />
          <AvakioText
            label="Readonly"
            placeholder="Readonly state"
            readonly
            value="Cannot edit but can copy"
          />
          <AvakioText
            label="Invalid"
            placeholder="Invalid state"
            invalid
            invalidMessage="This field has an error"
            value="Invalid value"
          />
          <AvakioText
            label="Required"
            placeholder="Required field"
            required
            bottomLabel="This field is required"
          />
          <AvakioText
            label="With Clear"
            placeholder="Type something"
            clear
            value="Clear me!"
          />
        </div>
      </section>

      {/* Interactive Props Playground */}
      <section className="avakio-template-demo-section">
        <AvakioTemplate
          type="section"
          borderType="clean"
          content={
            <div>
              <h3 style={{ margin: '0 0 4px 0' }}>Interactive Props Playground</h3>
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
            <h4 style={{ marginTop: 0 }}>Props Configuration</h4>
            
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
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 500 }}>Label</label>
              <input 
                type="text"
                value={playgroundLabel}
                onChange={(e) => setPlaygroundLabel(e.target.value)}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 500 }}>Placeholder</label>
              <input 
                type="text"
                value={playgroundPlaceholder}
                onChange={(e) => setPlaygroundPlaceholder(e.target.value)}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 500 }}>Type</label>
              <select 
                value={playgroundType}
                onChange={(e) => setPlaygroundType(e.target.value)}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
              >
                <option value="text">Text</option>
                <option value="password">Password</option>
                <option value="email">Email</option>
                <option value="url">URL</option>
                <option value="number">Number</option>
                <option value="tel">Tel</option>
                <option value="search">Search</option>
              </select>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 500 }}>Width</label>
              <input 
                type="text"
                value={playgroundWidth}
                onChange={(e) => setPlaygroundWidth(e.target.value)}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                placeholder="e.g., 100%, 300px"
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 500 }}>Label Position</label>
              <select 
                value={playgroundLabelPosition}
                onChange={(e) => setPlaygroundLabelPosition(e.target.value)}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
              >
                <option value="top">Top</option>
                <option value="left">Left</option>
              </select>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 500 }}>Input Align</label>
              <select 
                value={playgroundInputAlign}
                onChange={(e) => setPlaygroundInputAlign(e.target.value)}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
              >
                <option value="left">Left</option>
                <option value="center">Center</option>
                <option value="right">Right</option>
              </select>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 500 }}>Bottom Label</label>
              <input 
                type="text"
                value={playgroundBottomLabel}
                onChange={(e) => setPlaygroundBottomLabel(e.target.value)}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                placeholder="Help text..."
              />
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
                  checked={playgroundReadonly}
                  onChange={(e) => setPlaygroundReadonly(e.target.checked)}
                />
                <span style={{ fontWeight: 500 }}>Readonly</span>
              </label>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input 
                  type="checkbox"
                  checked={playgroundRequired}
                  onChange={(e) => setPlaygroundRequired(e.target.checked)}
                />
                <span style={{ fontWeight: 500 }}>Required</span>
              </label>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input 
                  type="checkbox"
                  checked={playgroundClear}
                  onChange={(e) => setPlaygroundClear(e.target.checked)}
                />
                <span style={{ fontWeight: 500 }}>Clear Button</span>
              </label>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input 
                  type="checkbox"
                  checked={playgroundEnableValueCopyButton}
                  onChange={(e) => setPlaygroundEnableValueCopyButton(e.target.checked)}
                />
                <span style={{ fontWeight: 500 }}>Copy Button</span>
              </label>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input 
                  type="checkbox"
                  checked={playgroundEnablePlaceHolderCopyButton}
                  onChange={(e) => setPlaygroundEnablePlaceHolderCopyButton(e.target.checked)}
                />
                <span style={{ fontWeight: 500 }}>Placeholder Copy Button</span>
              </label>
            </div>

            <Button onClick={handleApplyProps} style={{ width: '100%' }}>
              Apply Props
            </Button>
          </div>

          {/* Preview Column */}
          <div>
            <h4 style={{ marginTop: 0 }}>Live Preview</h4>
            <div style={{ 
              backgroundColor: 'white', 
              padding: '20px', 
              borderRadius: '8px', 
              border: '1px solid #e0e0e0',
              minHeight: '200px'
            }}>
              <AvakioText
                theme={appliedProps.theme}
                label={appliedProps.label}
                placeholder={appliedProps.placeholder}
                type={appliedProps.type as any}
                width={appliedProps.width}
                labelPosition={appliedProps.labelPosition as any}
                inputAlign={appliedProps.inputAlign as any}
                disabled={appliedProps.disabled}
                readonly={appliedProps.readonly}
                required={appliedProps.required}
                clear={appliedProps.clear}
                enableValueCopyButton={appliedProps.enableValueCopyButton}
                enablePlaceHolderCopyButton={appliedProps.enablePlaceHolderCopyButton}
                bottomLabel={appliedProps.bottomLabel}
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
{`<AvakioText
  theme="${appliedProps.theme}"
  label="${appliedProps.label}"
  placeholder="${appliedProps.placeholder}"
  type="${appliedProps.type}"
  width="${appliedProps.width}"
  labelPosition="${appliedProps.labelPosition}"
  inputAlign="${appliedProps.inputAlign}"${appliedProps.disabled ? '\n  disabled' : ''}${appliedProps.readonly ? '\n  readonly' : ''}${appliedProps.required ? '\n  required' : ''}${appliedProps.clear ? '\n  clear' : ''}${appliedProps.enableValueCopyButton ? '\n  enableValueCopyButton' : ''}${appliedProps.enablePlaceHolderCopyButton ? '\n  enablePlaceHolderCopyButton' : ''}${appliedProps.bottomLabel ? `\n  bottomLabel="${appliedProps.bottomLabel}"` : ''}
/>`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* API Reference Section */}
      <section className="avakio-template-demo-section">
        <AvakioTemplate
          type="section"
          borderType="clean"
          content={
            <div>
              <h3 style={{ margin: '0 0 4px 0' }}>API Reference</h3>
              <p style={{ margin: 0, fontSize: '14px', opacity: 0.7 }}>Key features and documentation links.</p>
            </div>
          }
        />
        <div style={{ 
          backgroundColor: '#f8f9fa', 
          padding: '20px', 
          borderRadius: '8px'
        }}>
          <h3 style={{ marginTop: 0 }}>Key Features</h3>
          <ul style={{ lineHeight: '1.8' }}>
            <li><strong>Multiple Input Types:</strong> text, password, email, url, number, tel, search</li>
            <li><strong>Label Configuration:</strong> Position (left/top), alignment, width</li>
            <li><strong>Validation:</strong> HTML5 validation + custom validation functions</li>
            <li><strong>Icons:</strong> Left or right positioned icons with lucide-react</li>
            <li><strong>Clear Button:</strong> Optional clear button for easy value removal</li>
            <li><strong>Copy Button:</strong> Optional copy button to copy input value to clipboard</li>
            <li><strong>Placeholder Copy Button:</strong> Optional copy button to copy placeholder text to clipboard</li>
            <li><strong>Password Toggle:</strong> Eye icon to show/hide password</li>
            <li><strong>Themes:</strong> material, flat, compact, dark, ocean, sunset</li>
            <li><strong>States:</strong> Normal, disabled, readonly, invalid, focused</li>
            <li><strong>Bottom Label:</strong> Additional help text below input</li>
            <li><strong>Ref Methods:</strong> getValue, setValue, focus, blur, validate, clear, disable, enable</li>
          </ul>
          
        </div>
      </section>
    </div>
  );
}






















