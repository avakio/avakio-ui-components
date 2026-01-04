import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { AvakioRichSelect, AvakioRichSelectOption } from '../../components/avakio/ui-controls/avakio-richselect/avakio-richselect';
import './avakio-richselect-example.css';

export function AvakioRichSelectExample() {
  const [theme, setTheme] = useState<string>('material');
  const [selectedValue1, setSelectedValue1] = useState<string | number>('');
  const [selectedValue2, setSelectedValue2] = useState<string | number>(2);
  const [selectedValue3, setSelectedValue3] = useState<string | number>('');
  const [selectedValue4, setSelectedValue4] = useState<string | number>('');
  const [selectedValue5, setSelectedValue5] = useState<string | number>('');

  // Simple string options
  const simpleOptions = ['Option One', 'Option Two', 'Option Three', 'Option Four', 'Option Five'];

  // Full object options
  const fullOptions: AvakioRichSelectOption[] = [
    { id: 1, value: 'One' },
    { id: 2, value: 'Two' },
    { id: 3, value: 'Three' },
    { id: 4, value: 'Four' },
    { id: 5, value: 'Five' },
  ];

  // Country options with flags
  const countryOptions: AvakioRichSelectOption[] = [
    { id: 'us', value: 'United States', flag: '🇺🇸' },
    { id: 'uk', value: 'United Kingdom', flag: '🇬🇧' },
    { id: 'ca', value: 'Canada', flag: '🇨🇦' },
    { id: 'au', value: 'Australia', flag: '🇦🇺' },
    { id: 'de', value: 'Germany', flag: '🇩🇪' },
    { id: 'fr', value: 'France', flag: '🇫🇷' },
    { id: 'jp', value: 'Japan', flag: '🇯🇵' },
    { id: 'cn', value: 'China', flag: '🇨🇳' },
  ];

  // Status options
  const statusOptions: AvakioRichSelectOption[] = [
    { id: 'active', value: 'Active', color: '#10b981' },
    { id: 'pending', value: 'Pending', color: '#f59e0b' },
    { id: 'inactive', value: 'Inactive', color: '#6b7280' },
    { id: 'blocked', value: 'Blocked', color: '#ef4444' },
  ];

  // Large dataset
  const largeOptions: AvakioRichSelectOption[] = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    value: `Item ${i + 1}`,
  }));

  const themes = [
    { id: 'material', value: 'Material' },
    { id: 'flat', value: 'Flat' },
    { id: 'compact', value: 'Compact' },
    { id: 'dark', value: 'Dark' },
    { id: 'ocean', value: 'Ocean' },
    { id: 'sunset', value: 'Sunset' },
  ];

  const handleThemeChange = (value: string | number) => {
    setTheme(value as string);
    document.documentElement.setAttribute('data-admin-theme', value as string);
  };

  return (
    <div className="avakio-richselect-example-container" data-admin-theme={theme}>
      <div className="avakio-richselect-example-header">
        <h1 className="avakio-richselect-example-title">AvakioRichSelect Component</h1>
        <p className="avakio-richselect-example-description">
          A non-editable select component  Perfect for dropdown selections without text input.
        </p>
      </div>

      <Card className="avakio-richselect-example-card">
        <CardHeader>
          <CardTitle className="avakio-richselect-example-card-title">Theme Selector</CardTitle>
          <CardDescription className="avakio-richselect-example-card-description">
            Choose a theme to see the component in different styles
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AvakioRichSelect
            value={theme}
            options={themes}
            onChange={handleThemeChange}
            label="Select Theme"
            labelWidth={120}
          />
        </CardContent>
      </Card>

      <Card className="avakio-richselect-example-card">
        <CardHeader>
          <CardTitle className="avakio-richselect-example-card-title">Example 1: Basic RichSelect</CardTitle>
          <CardDescription className="avakio-richselect-example-card-description">
            Simple string array options
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AvakioRichSelect
            value={selectedValue1}
            options={simpleOptions}
            onChange={(value) => setSelectedValue1(value)}
            placeholder="Select an option..."
            label="Simple Select"
            labelWidth={120}
          />
          {selectedValue1 && (
            <div className="avakio-richselect-example-selected">
              Selected: <strong>{selectedValue1}</strong>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="avakio-richselect-example-card">
        <CardHeader>
          <CardTitle className="avakio-richselect-example-card-title">Example 2: Object Options with Initial Value</CardTitle>
          <CardDescription className="avakio-richselect-example-card-description">
            Full object format with ID and value pairs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AvakioRichSelect
            value={selectedValue2}
            options={fullOptions}
            onChange={(value, option) => {
              setSelectedValue2(value);
              console.log('Selected option:', option);
            }}
            label="Rich Select"
            labelWidth={120}
            placeholder="Choose one..."
          />
          {selectedValue2 && (
            <div className="avakio-richselect-example-selected">
              Selected ID: <strong>{selectedValue2}</strong>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="avakio-richselect-example-card">
        <CardHeader>
          <CardTitle className="avakio-richselect-example-card-title">Example 3: Custom Template</CardTitle>
          <CardDescription className="avakio-richselect-example-card-description">
            Using custom template to render options with flags
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AvakioRichSelect
            value={selectedValue3}
            options={countryOptions}
            onChange={(value) => setSelectedValue3(value)}
            label="Country"
            labelWidth={120}
            placeholder="Select a country..."
            template={(option) => (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '20px' }}>{option.flag}</span>
                <span>{option.value}</span>
              </div>
            )}
          />
          {selectedValue3 && (
            <div className="avakio-richselect-example-selected">
              Selected Country: <strong>{countryOptions.find(c => c.id === selectedValue3)?.value}</strong>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="avakio-richselect-example-card">
        <CardHeader>
          <CardTitle className="avakio-richselect-example-card-title">Example 4: Status with Color Indicators</CardTitle>
          <CardDescription className="avakio-richselect-example-card-description">
            Options with custom color indicators
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AvakioRichSelect
            value={selectedValue4}
            options={statusOptions}
            onChange={(value) => setSelectedValue4(value)}
            label="Status"
            labelWidth={120}
            placeholder="Select status..."
            template={(option) => (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    backgroundColor: option.color,
                  }}
                />
                <span>{option.value}</span>
              </div>
            )}
          />
          {selectedValue4 && (
            <div className="avakio-richselect-example-selected">
              Selected Status: <strong>{statusOptions.find(s => s.id === selectedValue4)?.value}</strong>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="avakio-richselect-example-card">
        <CardHeader>
          <CardTitle className="avakio-richselect-example-card-title">Example 5: Large Dataset with yCount</CardTitle>
          <CardDescription className="avakio-richselect-example-card-description">
            100 items with limited visible rows using yCount property
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AvakioRichSelect
            value={selectedValue5}
            options={largeOptions}
            onChange={(value) => setSelectedValue5(value)}
            label="Large List"
            labelWidth={120}
            placeholder="Select from 100 items..."
            yCount={5}
          />
          {selectedValue5 && (
            <div className="avakio-richselect-example-selected">
              Selected Item: <strong>{largeOptions.find(i => i.id === selectedValue5)?.value}</strong>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="avakio-richselect-example-card">
        <CardHeader>
          <CardTitle className="avakio-richselect-example-card-title">Example 6: States & Variations</CardTitle>
          <CardDescription className="avakio-richselect-example-card-description">
            Different states and configurations
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <AvakioRichSelect
            value=""
            options={simpleOptions}
            onChange={() => {}}
            label="Disabled"
            labelWidth={120}
            disabled
          />
          <AvakioRichSelect
            value=""
            options={simpleOptions}
            onChange={() => {}}
            label="Read-only"
            labelWidth={120}
            readonly
          />
          <AvakioRichSelect
            value=""
            options={simpleOptions}
            onChange={() => {}}
            label="Required"
            labelWidth={120}
            required
          />
          <AvakioRichSelect
            value=""
            options={simpleOptions}
            onChange={() => {}}
            label="With Error"
            labelWidth={120}
            error="This field is required"
          />
          <AvakioRichSelect
            value="Option One"
            options={simpleOptions}
            onChange={() => {}}
            label="Not Clearable"
            labelWidth={120}
            clearable={false}
          />
        </CardContent>
      </Card>

      <Card className="avakio-richselect-example-card">
        <CardHeader>
          <CardTitle className="avakio-richselect-example-card-title">Key Features</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="avakio-richselect-example-features">
            <li>✓ Non-editable dropdown (select only)</li>
            <li>✓ Simple string array or full object options</li>
            <li>✓ Custom templates for option rendering</li>
            <li>✓ Keyboard navigation (Arrow keys, Enter, Escape)</li>
            <li>✓ Optional label with alignment and width control</li>
            <li>✓ Clearable selection</li>
            <li>✓ yCount property to limit visible items</li>
            <li>✓ Disabled and readonly states</li>
            <li>✓ Error state with message</li>
            <li>✓ Full theme support (6 themes)</li>
            <li>✓ Smooth animations</li>
            <li>✓ Click outside to close</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="avakio-richselect-example-card">
        <CardHeader>
          <CardTitle className="avakio-richselect-example-card-title">Props API</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="avakio-richselect-example-table-container">
            <table className="avakio-richselect-example-table">
              <thead>
                <tr>
                  <th>Prop</th>
                  <th>Type</th>
                  <th>Default</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>value</code></td>
                  <td>string | number</td>
                  <td>-</td>
                  <td>Selected value (ID or value)</td>
                </tr>
                <tr>
                  <td><code>options</code></td>
                  <td>Array</td>
                  <td>[]</td>
                  <td>Options array (string[] or object[])</td>
                </tr>
                <tr>
                  <td><code>onChange</code></td>
                  <td>function</td>
                  <td>-</td>
                  <td>Callback when value changes</td>
                </tr>
                <tr>
                  <td><code>placeholder</code></td>
                  <td>string</td>
                  <td>'Select...'</td>
                  <td>Placeholder text</td>
                </tr>
                <tr>
                  <td><code>label</code></td>
                  <td>string</td>
                  <td>-</td>
                  <td>Label text</td>
                </tr>
                <tr>
                  <td><code>labelAlign</code></td>
                  <td>'left' | 'right'</td>
                  <td>'left'</td>
                  <td>Label alignment</td>
                </tr>
                <tr>
                  <td><code>labelWidth</code></td>
                  <td>number</td>
                  <td>100</td>
                  <td>Label width in pixels</td>
                </tr>
                <tr>
                  <td><code>disabled</code></td>
                  <td>boolean</td>
                  <td>false</td>
                  <td>Disable the component</td>
                </tr>
                <tr>
                  <td><code>readonly</code></td>
                  <td>boolean</td>
                  <td>false</td>
                  <td>Make component read-only</td>
                </tr>
                <tr>
                  <td><code>template</code></td>
                  <td>function</td>
                  <td>-</td>
                  <td>Custom option renderer</td>
                </tr>
                <tr>
                  <td><code>width</code></td>
                  <td>number | string</td>
                  <td>-</td>
                  <td>Component width</td>
                </tr>
                <tr>
                  <td><code>maxHeight</code></td>
                  <td>number</td>
                  <td>300</td>
                  <td>Dropdown max height in pixels</td>
                </tr>
                <tr>
                  <td><code>yCount</code></td>
                  <td>number</td>
                  <td>-</td>
                  <td>Number of visible items in list</td>
                </tr>
                <tr>
                  <td><code>required</code></td>
                  <td>boolean</td>
                  <td>false</td>
                  <td>Show required indicator</td>
                </tr>
                <tr>
                  <td><code>error</code></td>
                  <td>string</td>
                  <td>-</td>
                  <td>Error message</td>
                </tr>
                <tr>
                  <td><code>clearable</code></td>
                  <td>boolean</td>
                  <td>true</td>
                  <td>Show clear button</td>
                </tr>
                <tr>
                  <td><code>className</code></td>
                  <td>string</td>
                  <td>''</td>
                  <td>Additional CSS classes</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}



















