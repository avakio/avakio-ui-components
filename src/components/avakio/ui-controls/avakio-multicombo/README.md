# Avakio MultiCombo Component

A powerful multi-select dropdown component with search, chips display, and count mode, built with React and TypeScript.

## Features

- **🔍 Searchable**: Filter options with instant search
- **☑️ Checkbox Selection**: Visual checkboxes for each option
- **🏷️ Chips Display**: Selected items shown as removable chips
- **🔢 Count Mode**: Option to show selection count instead of chips
- **✅ Select All/None**: Bulk selection actions
- **🧹 Clear All**: Quick way to deselect everything
- **📊 Max Display**: Limit visible chips with "+N more" indicator
- **🎨 Theme Support**: Integrates with 6 admin themes (Material, Flat, Compact, Dark, Ocean, Sunset)
- **🚫 Disabled State**: Full support for disabled mode
- **⌨️ Keyboard Accessible**: Full keyboard navigation
- **📱 Responsive**: Mobile-friendly design
- **🎯 Click Outside**: Closes dropdown when clicking outside

## Installation

The component is located at:
```
client/src/components/avakio/avakio-multicombo/
```

## Basic Usage

```tsx
import { AvakioMultiCombo, AvakioMultiComboOption } from '@/components/avakio/avakio-multicombo/avakio-multicombo';
import { useState } from 'react';

function MyComponent() {
  const [selected, setSelected] = useState<string[]>([]);

  const options: AvakioMultiComboOption[] = [
    { value: 'js', label: 'JavaScript' },
    { value: 'ts', label: 'TypeScript' },
    { value: 'react', label: 'React' },
  ];

  return (
    <AvakioMultiCombo
      options={options}
      value={selected}
      onChange={setSelected}
      placeholder="Select items..."
    />
  );
}
```

## Advanced Usage

### With Chips Display (Default)

```tsx
<AvakioMultiCombo
  options={options}
  value={selected}
  onChange={setSelected}
  placeholder="Select your skills..."
  maxDisplayItems={3}  // Show max 3 chips, then "+N more"
/>
```

### With Count Display

```tsx
<AvakioMultiCombo
  options={options}
  value={selected}
  onChange={setSelected}
  placeholder="Select departments..."
  showCount={true}  // Shows "N items selected" instead of chips
/>
```

### Disabled State

```tsx
<AvakioMultiCombo
  options={options}
  value={['js', 'react']}
  onChange={() => {}}
  placeholder="Cannot change..."
  disabled={true}
/>
```

### Pre-selected Values

```tsx
function MyComponent() {
  const [selected, setSelected] = useState<string[]>(['js', 'ts', 'react']);

  return (
    <AvakioMultiCombo
      options={options}
      value={selected}
      onChange={setSelected}
    />
  );
}
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `options` | `AvakioMultiComboOption[]` | Yes | - | Array of available options |
| `value` | `string[]` | Yes | - | Array of selected option values |
| `onChange` | `(values: string[]) => void` | Yes | - | Callback when selection changes |
| `placeholder` | `string` | No | `"Select items..."` | Placeholder text when empty |
| `className` | `string` | No | `undefined` | Additional CSS classes |
| `showCount` | `boolean` | No | `false` | Show count instead of chips |
| `maxDisplayItems` | `number` | No | `3` | Max chips before "+N more" |
| `disabled` | `boolean` | No | `false` | Disable the component |

## Types

### AvakioMultiComboOption

```tsx
interface AvakioMultiComboOption {
  value: string;  // Unique identifier
  label: string;  // Display text
}
```

## Display Modes

### Chips Mode (Default)

Shows selected items as individual chips:
```tsx
<AvakioMultiCombo
  options={options}
  value={['js', 'ts', 'react']}
  onChange={setSelected}
/>
// Displays: [JavaScript] [TypeScript] [React]
```

With `maxDisplayItems`:
```tsx
<AvakioMultiCombo
  options={options}
  value={['js', 'ts', 'react', 'vue', 'node']}
  onChange={setSelected}
  maxDisplayItems={2}
/>
// Displays: [JavaScript] [TypeScript] [+3 more]
```

### Count Mode

Shows only the selection count:
```tsx
<AvakioMultiCombo
  options={options}
  value={['js', 'ts', 'react']}
  onChange={setSelected}
  showCount={true}
/>
// Displays: "3 items selected"
```

## Features in Detail

### Search/Filter

Type to filter options in real-time:
- Case-insensitive search
- Searches both value and label
- Instant results
- "No matches found" message when no results

### Checkbox Selection

Each option has a checkbox:
- Click anywhere on the row to toggle
- Checked state persists during search
- Visual feedback with checkmark icon

### Select All / Deselect All

Located at the top of the dropdown:
- **Select All**: Selects all filtered options
- **Deselect All**: Removes all filtered options
- Button text changes based on selection state
- Works with search filter

### Chip Management

Individual chip removal:
```tsx
// Each chip has an X button to remove it
[JavaScript] ✕  [TypeScript] ✕  [React] ✕
```

Chips are:
- Removable (X button)
- Ellipsized if too long (max-width: 150px)
- Color-coded (muted background)
- "+N more" chip is non-removable

### Clear All

X button in the input field:
- Visible only when items are selected
- Clears entire selection
- Stops event propagation

### Footer

Shows selection count at bottom of dropdown:
```
2 items selected
```

## Examples

### Skills Selector

```tsx
function SkillsSelector() {
  const [skills, setSkills] = useState<string[]>([]);

  const skillOptions: AvakioMultiComboOption[] = [
    { value: 'js', label: 'JavaScript' },
    { value: 'ts', label: 'TypeScript' },
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue.js' },
    { value: 'angular', label: 'Angular' },
    { value: 'node', label: 'Node.js' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'csharp', label: 'C#' },
    { value: 'go', label: 'Go' },
  ];

  return (
    <div>
      <label>Select Your Skills</label>
      <AvakioMultiCombo
        options={skillOptions}
        value={skills}
        onChange={setSkills}
        placeholder="Choose skills..."
        maxDisplayItems={4}
      />
      <p>You selected {skills.length} skills</p>
    </div>
  );
}
```

### Department Filter

```tsx
function DepartmentFilter() {
  const [departments, setDepartments] = useState<string[]>([]);

  const departmentOptions: AvakioMultiComboOption[] = [
    { value: 'eng', label: 'Engineering' },
    { value: 'design', label: 'Design' },
    { value: 'product', label: 'Product' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'sales', label: 'Sales' },
    { value: 'hr', label: 'HR' },
  ];

  return (
    <AvakioMultiCombo
      options={departmentOptions}
      value={departments}
      onChange={setDepartments}
      placeholder="Filter by department..."
      showCount={true}
    />
  );
}
```

### Form Integration

```tsx
function UserForm() {
  const [formData, setFormData] = useState({
    name: '',
    roles: [] as string[],
  });

  const roleOptions: AvakioMultiComboOption[] = [
    { value: 'admin', label: 'Administrator' },
    { value: 'editor', label: 'Editor' },
    { value: 'viewer', label: 'Viewer' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form data:', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>
      <div>
        <label>Roles</label>
        <AvakioMultiCombo
          options={roleOptions}
          value={formData.roles}
          onChange={(roles) => setFormData({ ...formData, roles })}
          placeholder="Assign roles..."
        />
      </div>
      <button type="submit">Save User</button>
    </form>
  );
}
```

## Theme Support

The component automatically adapts to the active admin theme:

### Material Theme
- Subtle box shadow
- Rounded corners
- Elevation effects

### Flat Theme
- No border radius (square corners)
- Flat design aesthetic
- No shadows

### Compact Theme
- Reduced padding
- Smaller height (36px)
- Tighter spacing
- Smaller fonts (13px)

### Dark Theme
- Dark navy background
- Light text
- Dark borders
- High contrast

### Ocean Theme
- Blue accent color (#0094ff)
- Blue checkboxes and chips

### Sunset Theme
- Orange accent color (#ff5722)
- Warm color palette

### Applying Themes

```tsx
<div data-admin-theme="ocean">
  <AvakioMultiCombo
    options={options}
    value={selected}
    onChange={setSelected}
  />
</div>
```

## Styling

### Default Styles
The component comes with complete styling in `avakio-multicombo.css`.

### Custom Styling

```css
/* Custom dropdown height */
.avakio-mc-dropdown {
  max-height: 400px;
}

/* Custom chip styling */
.avakio-mc-chip {
  background: #your-color;
}

/* Custom checkbox color */
[data-admin-theme="custom"] .avakio-mc-checkbox-checked {
  background: #your-primary-color;
}
```

### CSS Classes

| Class | Purpose |
|-------|---------|
| `.avakio-multicombo` | Main container |
| `.avakio-mc-disabled` | Disabled state |
| `.avakio-mc-input-wrapper` | Input area wrapper |
| `.avakio-mc-input-wrapper-open` | Open state |
| `.avakio-mc-placeholder` | Placeholder text |
| `.avakio-mc-count` | Count display |
| `.avakio-mc-chips` | Chips container |
| `.avakio-mc-chip` | Individual chip |
| `.avakio-mc-chip-remove` | Chip remove button |
| `.avakio-mc-chip-more` | "+N more" indicator |
| `.avakio-mc-search-input` | Search input field |
| `.avakio-mc-dropdown` | Dropdown container |
| `.avakio-mc-options` | Options list |
| `.avakio-mc-option` | Individual option |
| `.avakio-mc-checkbox` | Checkbox element |
| `.avakio-mc-checkbox-checked` | Checked state |
| `.avakio-mc-footer` | Footer with count |

## Accessibility

- **Keyboard Navigation**: All elements keyboard accessible
- **ARIA Labels**: Proper labeling for screen readers
- **Focus Management**: Automatic focus on search input
- **Button Types**: Proper `button` types prevent form submission
- **Visual Feedback**: Clear hover and selected states
- **Click Outside**: Closes dropdown automatically

## Performance

- **Memoized Filtering**: Efficient search with `useMemo`
- **Event Handling**: Optimized with `useCallback`
- **Click Outside**: Cleanup on unmount
- **Minimal Re-renders**: Only updates when necessary

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Dependencies

- React 18+
- TypeScript 4.5+
- Lucide React (icons)
- Tailwind CSS (utility classes)

## Related Components

- **AvakioDatePicker**: Date and time picker component
- **AvakioDataTable**: High-performance data table

## Demo

View the live demo at:
```
http://localhost:5000/avakio-multicombo-demo
```

## License

Part of the Resume-Scribe project.

