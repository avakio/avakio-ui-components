import { useState } from "react";
import { AvakioCombo } from "../../components/avakio/ui-controls/avakio-combo/avakio-combo";
import type { AvakioComboOption } from "../../components/avakio/ui-controls/avakio-combo/avakio-combo";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const themeBackgrounds = {
  material: "bg-gray-50",
  flat: "bg-slate-100",
  compact: "bg-neutral-50",
  dark: "bg-gray-900",
  ocean: "bg-blue-50",
  sunset: "bg-orange-50",
};

// Sample data
const countries: AvakioComboOption[] = [
  { id: 1, value: "United States" },
  { id: 2, value: "United Kingdom" },
  { id: 3, value: "Canada" },
  { id: 4, value: "Australia" },
  { id: 5, value: "Germany" },
  { id: 6, value: "France" },
  { id: 7, value: "Italy" },
  { id: 8, value: "Spain" },
  { id: 9, value: "Japan" },
  { id: 10, value: "China" },
  { id: 11, value: "India" },
  { id: 12, value: "Brazil" },
  { id: 13, value: "Mexico" },
  { id: 14, value: "Russia" },
  { id: 15, value: "South Korea" },
];

const cities = ["New York", "London", "Paris", "Tokyo", "Berlin", "Sydney", "Toronto", "Rome"];

const userOptions: AvakioComboOption[] = [
  { id: "u1", value: "John Doe", email: "john@example.com", role: "Admin" },
  { id: "u2", value: "Jane Smith", email: "jane@example.com", role: "User" },
  { id: "u3", value: "Bob Johnson", email: "bob@example.com", role: "Manager" },
  { id: "u4", value: "Alice Williams", email: "alice@example.com", role: "User" },
  { id: "u5", value: "Charlie Brown", email: "charlie@example.com", role: "Admin" },
];

export default function AvakioComboExample({ theme: currentTheme = 'material' }: { theme?: string }) {
  const [selectedCountry, setSelectedCountry] = useState<string | number>("");
  const [selectedCity, setSelectedCity] = useState<string | number>("");
  const [selectedUser, setSelectedUser] = useState<string | number>("");
  const [disabledValue, setDisabledValue] = useState<string | number>(1);
  const [readonlyValue, setReadonlyValue] = useState<string | number>(2);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${themeBackgrounds[currentTheme as keyof typeof themeBackgrounds]}`}>
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 avakio-combo-example-heading">AvakioCombo Component</h1>
          <p className="avakio-combo-example-text">
            Editable combo box with dropdown selection and filtering - 
          </p>
        </div>

        <div className="space-y-8">
          {/* Example 1: Basic Combo */}
          <Card className="avakio-combo-example-card">
            <CardHeader>
              <CardTitle className="avakio-combo-example-card-title">Example 1: Basic Combo with Object Options</CardTitle>
              <CardDescription className="avakio-combo-example-card-description">
                Combo with full options format (id/value pairs)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <AvakioCombo
                label="Country"
                placeholder="Select or type a country..."
                options={countries}
                value={selectedCountry}
                onChange={({ value, option }) => {
                  setSelectedCountry(value);
                  console.log("Selected:", value, option);
                }}
                width="100%"
              />
              {selectedCountry && (
                <div className="p-4 rounded-md avakio-combo-example-selected">
                  <strong>Selected:</strong> <span>{countries.find(c => c.id === selectedCountry)?.value || selectedCountry}</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Example 2: Simple String Options */}
          <Card className="avakio-combo-example-card">
            <CardHeader>
              <CardTitle className="avakio-combo-example-card-title">Example 2: Simple String Options</CardTitle>
              <CardDescription className="!text-gray-600 dark:!text-gray-300">
                Combo with simple string array (short form)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <AvakioCombo
                label="City"
                labelAlign="right"
                labelWidth={80}
                placeholder="Select or type a city..."
                options={cities}
                value={selectedCity}
                onChange={({ value }) => {
                  setSelectedCity(value);
                  console.log("Selected city:", value);
                }}
                width="100%"
              />
              {selectedCity && (
                <div className="p-4 rounded-md avakio-combo-example-selected">
                  <strong>Selected:</strong> <span>{selectedCity}</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Example 3: Custom Template */}
          <Card className="avakio-combo-example-card">
            <CardHeader>
              <CardTitle className="avakio-combo-example-card-title">Example 3: Custom Template</CardTitle>
              <CardDescription className="!text-gray-600 dark:!text-gray-300">
                Combo with custom option rendering
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <AvakioCombo
                label="User"
                placeholder="Select a user..."
                options={userOptions}
                value={selectedUser}
                onChange={({ value }) => setSelectedUser(value)}
                template={(option) => (
                  <div className="flex flex-col">
                    <span className="font-medium">{option.value}</span>
                    <span className="text-xs text-muted-foreground">{option.email} - {option.role}</span>
                  </div>
                )}
                width="100%"
              />
              {selectedUser && (
                <div className="p-4 rounded-md avakio-combo-example-selected">
                  <strong>Selected User:</strong> <span>{userOptions.find(u => u.id === selectedUser)?.value || selectedUser}</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Example 4: Filter Modes */}
          <Card className="avakio-combo-example-card">
            <CardHeader>
              <CardTitle className="avakio-combo-example-card-title">Example 4: Filter Modes</CardTitle>
              <CardDescription className="!text-gray-600 dark:!text-gray-300">
                Different filtering strategies
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-medium mb-2 avakio-combo-example-heading">Starts With Filter</h4>
                <AvakioCombo
                  placeholder="Type to filter (starts with)..."
                  options={countries}
                  filterMode="startsWith"
                  width="100%"
                />
              </div>
              <div>
                <h4 className="font-medium mb-2 avakio-combo-example-heading">Contains Filter (default)</h4>
                <AvakioCombo
                  placeholder="Type to filter (contains)..."
                  options={countries}
                  filterMode="contains"
                  width="100%"
                />
              </div>
            </CardContent>
          </Card>

          {/* Example 5: States */}
          <Card className="avakio-combo-example-card">
            <CardHeader>
              <CardTitle className="avakio-combo-example-card-title">Example 5: Component States</CardTitle>
              <CardDescription className="!text-gray-600 dark:!text-gray-300">
                Disabled, readonly, required, and error states
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <AvakioCombo
                label="Disabled"
                placeholder="Cannot interact..."
                options={countries}
                value={disabledValue}
                disabled={true}
                width="100%"
              />
              <AvakioCombo
                label="Readonly"
                placeholder="Cannot open dropdown..."
                options={countries}
                value={readonlyValue}
                readonly={true}
                width="100%"
              />
              <AvakioCombo
                label="Required"
                placeholder="This field is required..."
                options={countries}
                required={true}
                width="100%"
              />
              <AvakioCombo
                label="Error State"
                placeholder="Select a country..."
                options={countries}
                error="Please select a valid country"
                width="100%"
              />
            </CardContent>
          </Card>

          {/* Features */}
          <Card className="avakio-combo-example-card">
            <CardHeader>
              <CardTitle className="avakio-combo-example-card-title">Key Features</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm avakio-combo-example-text">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span><strong>Editable Input:</strong> Type to filter options or enter custom text</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span><strong>Keyboard Navigation:</strong> Arrow keys, Enter, Escape support</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span><strong>Flexible Options:</strong> Simple strings or complex objects with custom templates</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span><strong>Filter Modes:</strong> startsWith, contains, or custom filter function</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span><strong>Clear Button:</strong> Quick way to reset selection</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span><strong>Theme Support:</strong> Six built-in themes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span><strong>States:</strong> Disabled, readonly, required, error states</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span><strong>Labels:</strong> Optional labels with customizable alignment and width</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* API Documentation */}
          <Card className="avakio-combo-example-card">
            <CardHeader>
              <CardTitle className="avakio-combo-example-card-title">Props API</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm avakio-combo-example-table">
                  <thead>
                    <tr>
                      <th className="text-left p-2 font-semibold">Prop</th>
                      <th className="text-left p-2 font-semibold">Type</th>
                      <th className="text-left p-2 font-semibold">Default</th>
                      <th className="text-left p-2 font-semibold">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-2 font-mono">value</td>
                      <td className="p-2 font-mono">string | number</td>
                      <td className="p-2">-</td>
                      <td className="p-2">Selected option ID or value</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-mono">options</td>
                      <td className="p-2 font-mono">string[] | AvakioComboOption[]</td>
                      <td className="p-2">[]</td>
                      <td className="p-2">Array of options (strings or objects)</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-mono">onChange</td>
                      <td className="p-2 font-mono">(value, option?) =&gt; void</td>
                      <td className="p-2">-</td>
                      <td className="p-2">Callback when selection changes</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-mono">placeholder</td>
                      <td className="p-2 font-mono">string</td>
                      <td className="p-2">"Select or type..."</td>
                      <td className="p-2">Input placeholder text</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-mono">label</td>
                      <td className="p-2 font-mono">string</td>
                      <td className="p-2">-</td>
                      <td className="p-2">Label text</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-mono">filterMode</td>
                      <td className="p-2 font-mono">'startsWith' | 'contains' | 'custom'</td>
                      <td className="p-2">'contains'</td>
                      <td className="p-2">Filtering strategy</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-mono">template</td>
                      <td className="p-2 font-mono">(option) =&gt; ReactNode</td>
                      <td className="p-2">-</td>
                      <td className="p-2">Custom option renderer</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-mono">disabled</td>
                      <td className="p-2 font-mono">boolean</td>
                      <td className="p-2">false</td>
                      <td className="p-2">Disable the combo</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-mono">readonly</td>
                      <td className="p-2 font-mono">boolean</td>
                      <td className="p-2">false</td>
                      <td className="p-2">Make input readonly</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-mono">required</td>
                      <td className="p-2 font-mono">boolean</td>
                      <td className="p-2">false</td>
                      <td className="p-2">Mark as required</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-mono">error</td>
                      <td className="p-2 font-mono">string</td>
                      <td className="p-2">-</td>
                      <td className="p-2">Error message to display</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}



















