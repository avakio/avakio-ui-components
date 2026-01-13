import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AvakioGridSuggest, AvakioGridSuggestOption } from '../../components/avakio/ui-controls/avakio-gridsuggest/avakio-gridsuggest';

export function AvakioGridSuggestExample({ theme = 'material' }: { theme?: string }) {
  const [selectedValue1, setSelectedValue1] = useState<string | number>('');
  const [selectedValue2, setSelectedValue2] = useState<string | number>(2);
  const [selectedValue3, setSelectedValue3] = useState<string | number>('');
  const [selectedValue4, setSelectedValue4] = useState<string | number>('');
  const [selectedValue5, setSelectedValue5] = useState<string | number>('');
  const [selectedValue6, setSelectedValue6] = useState<string | number>('');

  // Product data with multiple columns
  const productData: AvakioGridSuggestOption[] = [
    { id: 1, name: 'Laptop Pro', category: 'Electronics', price: 1299, stock: 15 },
    { id: 2, name: 'Wireless Mouse', category: 'Accessories', price: 29, stock: 50 },
    { id: 3, name: 'USB-C Cable', category: 'Accessories', price: 15, stock: 100 },
    { id: 4, name: 'Monitor 27"', category: 'Electronics', price: 349, stock: 8 },
    { id: 5, name: 'Keyboard Mechanical', category: 'Accessories', price: 89, stock: 25 },
    { id: 6, name: 'Webcam HD', category: 'Electronics', price: 79, stock: 30 },
    { id: 7, name: 'Headphones', category: 'Audio', price: 199, stock: 12 },
    { id: 8, name: 'Speakers Bluetooth', category: 'Audio', price: 149, stock: 20 },
  ];

  // Employee data
  const employeeData: AvakioGridSuggestOption[] = [
    { id: 1, name: 'John Doe', department: 'Engineering', position: 'Senior Developer', email: 'john@company.com' },
    { id: 2, name: 'Jane Smith', department: 'Marketing', position: 'Marketing Manager', email: 'jane@company.com' },
    { id: 3, name: 'Bob Johnson', department: 'Engineering', position: 'DevOps Engineer', email: 'bob@company.com' },
    { id: 4, name: 'Alice Williams', department: 'Design', position: 'UI/UX Designer', email: 'alice@company.com' },
    { id: 5, name: 'Charlie Brown', department: 'Sales', position: 'Sales Representative', email: 'charlie@company.com' },
  ];

  // Country data with codes
  const countryData: AvakioGridSuggestOption[] = [
    { id: 1, code: 'US', name: 'United States', capital: 'Washington, D.C.', population: '331M' },
    { id: 2, code: 'UK', name: 'United Kingdom', capital: 'London', population: '67M' },
    { id: 3, code: 'CA', name: 'Canada', capital: 'Ottawa', population: '38M' },
    { id: 4, code: 'AU', name: 'Australia', capital: 'Canberra', population: '26M' },
    { id: 5, code: 'DE', name: 'Germany', capital: 'Berlin', population: '83M' },
    { id: 6, code: 'FR', name: 'France', capital: 'Paris', population: '67M' },
    { id: 7, code: 'JP', name: 'Japan', capital: 'Tokyo', population: '125M' },
    { id: 8, code: 'CN', name: 'China', capital: 'Beijing', population: '1.4B' },
  ];

  // Invoice data
  const invoiceData: AvakioGridSuggestOption[] = [
    { id: 1, invoiceNo: 'INV-001', customer: 'Acme Corp', amount: 5420, date: '2025-01-15', status: 'Paid' },
    { id: 2, invoiceNo: 'INV-002', customer: 'Tech Solutions', amount: 3200, date: '2025-01-18', status: 'Pending' },
    { id: 3, invoiceNo: 'INV-003', customer: 'Global Inc', amount: 8750, date: '2025-01-20', status: 'Paid' },
    { id: 4, invoiceNo: 'INV-004', customer: 'StartUp LLC', amount: 1890, date: '2025-01-22', status: 'Overdue' },
    { id: 5, invoiceNo: 'INV-005', customer: 'Enterprise Co', amount: 12340, date: '2025-01-25', status: 'Pending' },
  ];

  const themes = [
    { id: 'material', name: 'Material', color: '#1CA1C1' },
    { id: 'flat', name: 'Flat', color: '#5E81AC' },
    { id: 'compact', name: 'Compact', color: '#00796B' },
    { id: 'dark', name: 'Dark', color: '#3b82f6' },
    { id: 'ocean', name: 'Ocean', color: '#0277BD' },
    { id: 'sunset', name: 'Sunset', color: '#f57c00' },
  ];

  const handleThemeChange = (value: string | number) => {
    setTheme(value as string);
    document.documentElement.setAttribute('data-admin-theme', value as string);
  };

  return (
    <div className="avakio-gridsuggest-example-container">
      <div className="avakio-gridsuggest-example-header">
        <h1 className="avakio-gridsuggest-example-title">AvakioGridSuggest Component</h1>
        <p className="avakio-gridsuggest-example-description">
          A dropdown component that displays data in a table format, 
        </p>
      </div>

      <Card className="avakio-gridsuggest-example-card">
        <CardHeader>
          <CardTitle className="avakio-gridsuggest-example-card-title">Theme Selector</CardTitle>
          <CardDescription className="avakio-gridsuggest-example-card-description">
            Choose a theme to see the component in different styles
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AvakioGridSuggest
            value={theme}
            data={themes}
            onChange={handleThemeChange}
            label="Select Theme"
            labelWidth={120}
            textValue="#name#"
            body={{
              columns: [
                { 
                  id: 'color', 
                  header: 'Color', 
                  width: '15%',
                  template: (val) => (
                    <div style={{ 
                      width: '20px', 
                      height: '20px', 
                      backgroundColor: val, 
                      borderRadius: '4px',
                      border: '1px solid #e5e7eb'
                    }} />
                  )
                },
                { id: 'name', header: 'Theme Name', width: '85%' },
              ],
            }}
          />
        </CardContent>
      </Card>

      <Card className="avakio-gridsuggest-example-card">
        <CardHeader>
          <CardTitle className="avakio-gridsuggest-example-card-title">Example 1: Auto Config</CardTitle>
          <CardDescription className="avakio-gridsuggest-example-card-description">
            Automatic column generation from data keys (excluding 'id')
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AvakioGridSuggest
            value={selectedValue1}
            data={productData}
            onChange={({ value, option }) => {
              setSelectedValue1(value);
              console.log('Selected product:', option);
            }}
            label="Product"
            labelWidth={120}
            placeholder="Search products..."
            body={{
              autoConfig: true,
            }}
          />
          {selectedValue1 && (
            <div className="avakio-gridsuggest-example-selected">
              Selected Product ID: <strong>{selectedValue1}</strong>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="avakio-gridsuggest-example-card">
        <CardHeader>
          <CardTitle className="avakio-gridsuggest-example-card-title">Example 2: Custom Columns</CardTitle>
          <CardDescription className="avakio-gridsuggest-example-card-description">
            Predefined columns with custom widths
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AvakioGridSuggest
            value={selectedValue2}
            data={productData}
            onChange={({ value }) => setSelectedValue2(value)}
            label="Product"
            labelWidth={120}
            placeholder="Search products..."
            textValue="#name# - $#price#"
            body={{
              columns: [
                { id: 'name', header: 'Product Name', width: '40%' },
                { id: 'category', header: 'Category', width: '30%' },
                { id: 'price', header: 'Price', width: '15%', template: (val) => `$${val}` },
                { id: 'stock', header: 'Stock', width: '15%' },
              ],
            }}
          />
          {selectedValue2 && (
            <div className="avakio-gridsuggest-example-selected">
              Selected: <strong>{productData.find(p => p.id === selectedValue2)?.name}</strong>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="avakio-gridsuggest-example-card">
        <CardHeader>
          <CardTitle className="avakio-gridsuggest-example-card-title">Example 3: No Headers, No Borders</CardTitle>
          <CardDescription className="avakio-gridsuggest-example-card-description">
            Minimal table display without headers and borders
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AvakioGridSuggest
            value={selectedValue3}
            data={employeeData}
            onChange={({ value }) => setSelectedValue3(value)}
            label="Employee"
            labelWidth={120}
            placeholder="Search employees..."
            textValue="#name# - #position#"
            body={{
              columns: [
                { id: 'name', header: 'Name' },
                { id: 'department', header: 'Department' },
                { id: 'position', header: 'Position' },
              ],
              header: false,
              borderless: true,
            }}
          />
          {selectedValue3 && (
            <div className="avakio-gridsuggest-example-selected">
              Selected: <strong>{employeeData.find(e => e.id === selectedValue3)?.name}</strong>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="avakio-gridsuggest-example-card">
        <CardHeader>
          <CardTitle className="avakio-gridsuggest-example-card-title">Example 4: With Scrolling (yCount)</CardTitle>
          <CardDescription className="avakio-gridsuggest-example-card-description">
            Limited visible rows with scroll - shows only 4 rows at a time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AvakioGridSuggest
            value={selectedValue4}
            data={countryData}
            onChange={({ value }) => setSelectedValue4(value)}
            label="Country"
            labelWidth={120}
            placeholder="Search countries..."
            textValue="#name# (#code#)"
            body={{
              columns: [
                { id: 'code', header: 'Code', width: '15%' },
                { id: 'name', header: 'Country', width: '35%' },
                { id: 'capital', header: 'Capital', width: '30%' },
                { id: 'population', header: 'Population', width: '20%' },
              ],
              scroll: true,
              yCount: 4,
            }}
          />
          {selectedValue4 && (
            <div className="avakio-gridsuggest-example-selected">
              Selected: <strong>{countryData.find(c => c.id === selectedValue4)?.name}</strong>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="avakio-gridsuggest-example-card">
        <CardHeader>
          <CardTitle className="avakio-gridsuggest-example-card-title">Example 5: Custom Cell Templates</CardTitle>
          <CardDescription className="avakio-gridsuggest-example-card-description">
            Custom rendering for specific columns with status indicators
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AvakioGridSuggest
            value={selectedValue5}
            data={invoiceData}
            onChange={({ value }) => setSelectedValue5(value)}
            label="Invoice"
            labelWidth={120}
            placeholder="Search invoices..."
            textValue="#invoiceNo# - #customer#"
            body={{
              columns: [
                { id: 'invoiceNo', header: 'Invoice #', width: '20%' },
                { id: 'customer', header: 'Customer', width: '30%' },
                { 
                  id: 'amount', 
                  header: 'Amount', 
                  width: '20%',
                  template: (val) => <span style={{ fontWeight: 600 }}>${val.toLocaleString()}</span>
                },
                { id: 'date', header: 'Date', width: '15%' },
                { 
                  id: 'status', 
                  header: 'Status', 
                  width: '15%',
                  template: (val) => {
                    const colors: Record<string, string> = {
                      'Paid': '#10b981',
                      'Pending': '#f59e0b',
                      'Overdue': '#ef4444',
                    };
                    return (
                      <span style={{ 
                        color: colors[val], 
                        fontWeight: 600,
                        fontSize: '12px'
                      }}>
                        {val}
                      </span>
                    );
                  }
                },
              ],
              yCount: 5,
            }}
          />
          {selectedValue5 && (
            <div className="avakio-gridsuggest-example-selected">
              Selected: <strong>{invoiceData.find(i => i.id === selectedValue5)?.invoiceNo}</strong> - 
              Customer: <strong>{invoiceData.find(i => i.id === selectedValue5)?.customer}</strong>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="avakio-gridsuggest-example-card">
        <CardHeader>
          <CardTitle className="avakio-gridsuggest-example-card-title">Example 6: Non-editable Mode</CardTitle>
          <CardDescription className="avakio-gridsuggest-example-card-description">
            Grid suggest without text input filtering (like RichSelect with grid)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AvakioGridSuggest
            value={selectedValue6}
            data={employeeData}
            onChange={({ value }) => setSelectedValue6(value)}
            label="Employee"
            labelWidth={120}
            placeholder="Select employee..."
            textValue="#name# - #department#"
            editable={false}
            body={{
              columns: [
                { id: 'name', header: 'Name', width: '35%' },
                { id: 'department', header: 'Department', width: '30%' },
                { id: 'position', header: 'Position', width: '35%' },
              ],
            }}
          />
          {selectedValue6 && (
            <div className="avakio-gridsuggest-example-selected">
              Selected: <strong>{employeeData.find(e => e.id === selectedValue6)?.name}</strong>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="avakio-gridsuggest-example-card">
        <CardHeader>
          <CardTitle className="avakio-gridsuggest-example-card-title">Example 7: States & Variations</CardTitle>
          <CardDescription className="avakio-gridsuggest-example-card-description">
            Different states and configurations
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <AvakioGridSuggest
            value=""
            data={productData}
            onChange={() => {}}
            label="Disabled"
            labelWidth={120}
            disabled
            body={{ autoConfig: true }}
          />
          <AvakioGridSuggest
            value=""
            data={productData}
            onChange={() => {}}
            label="Read-only"
            labelWidth={120}
            readonly
            body={{ autoConfig: true }}
          />
          <AvakioGridSuggest
            value=""
            data={productData}
            onChange={() => {}}
            label="Required"
            labelWidth={120}
            required
            body={{ autoConfig: true }}
          />
          <AvakioGridSuggest
            value=""
            data={productData}
            onChange={() => {}}
            label="With Error"
            labelWidth={120}
            error="This field is required"
            body={{ autoConfig: true }}
          />
        </CardContent>
      </Card>

      <Card className="avakio-gridsuggest-example-card">
        <CardHeader>
          <CardTitle className="avakio-gridsuggest-example-card-title">Key Features</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="avakio-gridsuggest-example-features">
            <li>✓ Datatable display in dropdown</li>
            <li>✓ Auto-generated columns or custom configuration</li>
            <li>✓ Custom column templates with React components</li>
            <li>✓ Searchable/filterable across all columns</li>
            <li>✓ Keyboard navigation (Arrow keys, Enter, Escape)</li>
            <li>✓ Optional headers and borders</li>
            <li>✓ Scrolling with yCount limitation</li>
            <li>✓ Editable or non-editable modes</li>
            <li>✓ Text value templates (#field# syntax)</li>
            <li>✓ Custom column widths</li>
            <li>✓ Full theme support (6 themes)</li>
            <li>✓ Disabled, readonly, and error states</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="avakio-gridsuggest-example-card">
        <CardHeader>
          <CardTitle className="avakio-gridsuggest-example-card-title">Props API</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="avakio-gridsuggest-example-table-container">
            <table className="avakio-gridsuggest-example-table">
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
                  <td>Selected value (ID)</td>
                </tr>
                <tr>
                  <td><code>data</code></td>
                  <td>Array</td>
                  <td>[]</td>
                  <td>Data array for the grid</td>
                </tr>
                <tr>
                  <td><code>onChange</code></td>
                  <td>function</td>
                  <td>-</td>
                  <td>Callback when value changes</td>
                </tr>
                <tr>
                  <td><code>textValue</code></td>
                  <td>string</td>
                  <td>-</td>
                  <td>Template for display value (e.g., "#name# (#code#)")</td>
                </tr>
                <tr>
                  <td><code>template</code></td>
                  <td>function</td>
                  <td>-</td>
                  <td>Custom input value renderer</td>
                </tr>
                <tr>
                  <td><code>body</code></td>
                  <td>object</td>
                  <td>{`{autoConfig: true}`}</td>
                  <td>Grid configuration object</td>
                </tr>
                <tr>
                  <td><code>body.columns</code></td>
                  <td>Array</td>
                  <td>-</td>
                  <td>Column definitions</td>
                </tr>
                <tr>
                  <td><code>body.autoConfig</code></td>
                  <td>boolean</td>
                  <td>true</td>
                  <td>Auto-generate columns from data</td>
                </tr>
                <tr>
                  <td><code>body.header</code></td>
                  <td>boolean</td>
                  <td>true</td>
                  <td>Show table headers</td>
                </tr>
                <tr>
                  <td><code>body.borderless</code></td>
                  <td>boolean</td>
                  <td>false</td>
                  <td>Remove table borders</td>
                </tr>
                <tr>
                  <td><code>body.scroll</code></td>
                  <td>boolean</td>
                  <td>false</td>
                  <td>Enable scrolling</td>
                </tr>
                <tr>
                  <td><code>body.yCount</code></td>
                  <td>number</td>
                  <td>-</td>
                  <td>Number of visible rows</td>
                </tr>
                <tr>
                  <td><code>editable</code></td>
                  <td>boolean</td>
                  <td>true</td>
                  <td>Allow text input/filtering</td>
                </tr>
                <tr>
                  <td><code>filterMode</code></td>
                  <td>'startsWith' | 'contains'</td>
                  <td>'contains'</td>
                  <td>Filter matching mode</td>
                </tr>
                <tr>
                  <td><code>label</code></td>
                  <td>string</td>
                  <td>-</td>
                  <td>Label text</td>
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
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}












