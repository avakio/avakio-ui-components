# AvakioGridSuggest

A dropdown component that displays data in a datatable format,  Perfect for selecting from data with multiple columns.

## Overview

AvakioGridSuggest extends the traditional dropdown concept by displaying data in a **table/grid format** instead of a simple list. This is particularly useful when you need to show multiple attributes of each option to help users make informed selections.

## Features

- ✓ **Datatable in dropdown** - Display multiple columns of data
- ✓ **Auto-generated columns** - Automatically creates columns from data keys
- ✓ **Custom column configuration** - Define specific columns with widths and templates
- ✓ **Searchable/filterable** - Filter across all columns when editable
- ✓ **Custom cell templates** - Render cells with React components
- ✓ **Text value templates** - Use `#field#` syntax for display values
- ✓ **Keyboard navigation** - Arrow keys, Enter, and Escape support
- ✓ **Optional headers and borders** - Flexible table styling
- ✓ **Scrolling with yCount** - Limit visible rows
- ✓ **Editable or non-editable** - Can work like Combo or RichSelect
- ✓ **Full theme support** - Works with all 6 Avakio themes
- ✓ **Multiple states** - Disabled, readonly, error states

## Installation

```tsx
import { AvakioGridSuggest } from '@/components/avakio/avakio-gridsuggest/avakio-gridsuggest';
import '@/components/avakio/avakio-gridsuggest/avakio-gridsuggest.css';
```

## Basic Usage

### Auto Config (Automatic Column Generation)

```tsx
const [value, setValue] = useState('');
const data = [
  { id: 1, name: 'Laptop Pro', category: 'Electronics', price: 1299 },
  { id: 2, name: 'Wireless Mouse', category: 'Accessories', price: 29 },
  { id: 3, name: 'USB-C Cable', category: 'Accessories', price: 15 },
];

<AvakioGridSuggest
  id="product-suggest"
  value={value}
  data={data}
  onChange={({ value: v, option }) => setValue(v)}
  label="Product"
  placeholder="Search products..."
  body={{
    autoConfig: true, // Auto-generates columns from data keys (excluding 'id')
  }}
/>
```

### Custom Columns

```tsx
<AvakioGridSuggest
  id="custom-product-suggest"
  value={value}
  data={data}
  onChange={({ value: v }) => setValue(v)}
  label="Product"
  textValue="#name# - $#price#"
  body={{
    columns: [
      { id: 'name', header: 'Product Name', width: '40%' },
      { id: 'category', header: 'Category', width: '30%' },
      { 
        id: 'price', 
        header: 'Price', 
        width: '30%',
        template: (val) => `$${val}` 
      },
    ],
  }}
/>
```

## Advanced Examples

### No Headers, No Borders

```tsx
<AvakioGridSuggest
  id="employee-suggest"
  value={selectedEmployee}
  data={employeeData}
  onChange={({ value }) => setSelectedEmployee(value)}
  label="Employee"
  textValue="#name# - #position#"
  body={{
    columns: [
      { id: 'name', header: 'Name' },
      { id: 'department', header: 'Department' },
      { id: 'position', header: 'Position' },
    ],
    header: false,      // Hide headers
    borderless: true,   // Remove borders
  }}
/>
```

### With Scrolling (Limited Visible Rows)

```tsx
<AvakioGridSuggest
  id="country-suggest"
  value={selectedCountry}
  data={countryData}
  onChange={({ value }) => setSelectedCountry(value)}
  label="Country"
  textValue="#name# (#code#)"
  body={{
    columns: [
      { id: 'code', header: 'Code', width: '15%' },
      { id: 'name', header: 'Country', width: '35%' },
      { id: 'capital', header: 'Capital', width: '30%' },
      { id: 'population', header: 'Population', width: '20%' },
    ],
    scroll: true,
    yCount: 4,  // Show only 4 rows at a time
  }}
/>
```

### Custom Cell Templates with Status Indicators

```tsx
const invoiceData = [
  { id: 1, invoiceNo: 'INV-001', customer: 'Acme Corp', amount: 5420, status: 'Paid' },
  { id: 2, invoiceNo: 'INV-002', customer: 'Tech Inc', amount: 3200, status: 'Pending' },
];

<AvakioGridSuggest
  id="invoice-suggest"
  value={selectedInvoice}
  data={invoiceData}
  onChange={({ value }) => setSelectedInvoice(value)}
  label="Invoice"
  textValue="#invoiceNo# - #customer#"
  body={{
    columns: [
      { id: 'invoiceNo', header: 'Invoice #', width: '20%' },
      { id: 'customer', header: 'Customer', width: '30%' },
      { 
        id: 'amount', 
        header: 'Amount', 
        width: '25%',
        template: (val) => <span style={{ fontWeight: 600 }}>${val.toLocaleString()}</span>
      },
      { 
        id: 'status', 
        header: 'Status', 
        width: '25%',
        template: (val) => (
          <span style={{ 
            color: val === 'Paid' ? '#10b981' : '#f59e0b',
            fontWeight: 600 
          }}>
            {val}
          </span>
        )
      },
    ],
  }}
/>
```

### Non-editable Mode (Like RichSelect with Grid)

```tsx
<AvakioGridSuggest
  id="noneditable-suggest"
  value={value}
  data={data}
  onChange={({ value: v }) => setValue(v)}
  label="Employee"
  textValue="#name# - #department#"
  editable={false}  // Disable text input/filtering
  body={{
    columns: [
      { id: 'name', header: 'Name', width: '35%' },
      { id: 'department', header: 'Department', width: '30%' },
      { id: 'position', header: 'Position', width: '35%' },
    ],
  }}
/>
```

## Props API

### Main Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string \| number` | - | Selected value (ID) |
| `data` | `Array` | `[]` | Data array for the grid |
| `onChange` | `({ id, value, option? }) => void` | - | Callback when value changes. Receives `{ id, value, option }` object |
| `textValue` | `string` | - | Template for display value (e.g., `"#name# (#code#)"`) |
| `template` | `(item) => ReactNode` | - | Custom input value renderer |
| `body` | `object` | `{autoConfig: true}` | Grid configuration object |
| `editable` | `boolean` | `true` | Allow text input/filtering |
| `filterMode` | `'startsWith' \| 'contains'` | `'contains'` | Filter matching mode |
| `label` | `string` | - | Label text (rendered via AvakioControlLabel) |
| `labelAlign` | `'left' \| 'right'` | `'left'` | Label alignment (rendered via AvakioControlLabel) |
| `labelWidth` | `number` | `100` | Label width in pixels (rendered via AvakioControlLabel) |
| `placeholder` | `string` | `'Select...'` | Placeholder text |
| `disabled` | `boolean` | `false` | Disable the component |
| `readonly` | `boolean` | `false` | Make component read-only |
| `required` | `boolean` | `false` | Show required indicator (*) |
| `error` | `string` | - | Error message to display |
| `width` | `number \| string` | - | Component width |
| `className` | `string` | `''` | Additional CSS classes |
| `id` | `string` | - | HTML ID attribute |

### Body Configuration (body prop)

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `columns` | `Array<Column>` | - | Column definitions (overrides autoConfig) |
| `autoConfig` | `boolean` | `true` | Auto-generate columns from data keys |
| `header` | `boolean` | `true` | Show table headers |
| `borderless` | `boolean` | `false` | Remove table borders |
| `scroll` | `boolean` | `false` | Enable scrolling |
| `yCount` | `number` | - | Number of visible rows (requires scroll: true or sets maxHeight) |
| `data` | `Array` | - | Alternative way to pass data (use main data prop instead) |

### Column Definition

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `id` | `string` | - | Data field key |
| `header` | `string` | - | Column header text |
| `width` | `number \| string` | - | Column width (e.g., '25%', 150) |
| `template` | `(value, item) => ReactNode` | - | Custom cell renderer |

## Text Value Templates

The `textValue` prop allows you to define how the selected value should be displayed in the input field using a simple template syntax:

```tsx
// Single field
textValue="#name#"

// Multiple fields
textValue="#name# (#code#)"

// Complex template
textValue="Invoice: #invoiceNo# - Customer: #customer# - $#amount#"
```

The template uses `#fieldName#` placeholders that get replaced with actual values from the selected item.

## Data Format

Data must be an array of objects with at least an `id` field:

```tsx
const data = [
  { 
    id: 1, 
    name: 'Product Name', 
    category: 'Category', 
    price: 100,
    // ... any other fields
  },
  // ... more items
];
```

## Column Configuration

### Auto Config
When `body.autoConfig: true` (default), columns are automatically generated from data keys, excluding the `id` field.

### Custom Columns
Define specific columns with custom headers, widths, and templates:

```tsx
columns: [
  { 
    id: 'name', 
    header: 'Product Name', 
    width: '40%' 
  },
  { 
    id: 'price', 
    header: 'Price', 
    width: '20%',
    template: (value, item) => `$${value.toFixed(2)}`
  },
]
```

## Keyboard Navigation

- **Arrow Down** - Navigate to next row
- **Arrow Up** - Navigate to previous row
- **Enter** - Select highlighted row
- **Escape** - Close dropdown (reset input if no selection)
- **Type** - Filter results (when editable is true)

## Filtering

When `editable={true}` (default), users can type to filter rows. The filter searches across **all columns** based on the `filterMode`:

- **`contains`** (default) - Matches if the search term appears anywhere in the cell value
- **`startsWith`** - Matches if the cell value starts with the search term

## Use Cases

**GridSuggest is ideal for:**
- Product selection with multiple attributes (name, category, price, stock)
- Employee selection showing department, position, email
- Country selection with code, capital, population
- Invoice selection with number, customer, amount, status
- Any scenario where users need to see multiple data points to make a selection

**When to use GridSuggest vs other components:**
- Use **AvakioGridSuggest** when you need to show multiple columns
- Use **AvakioCombo** for single-column editable dropdown with filtering
- Use **AvakioRichSelect** for single-column non-editable dropdown
- Use **AvakioMultiCombo** for multi-select with tags

## Themes

AvakioGridSuggest supports all 6 Avakio themes:

1. **Material** (#1CA1C1) - Google Material Design inspired
2. **Flat** (#5E81AC) - Nordic inspired flat design
3. **Compact** (#00796B) - Compact, space-efficient design
4. **Dark** - Full dark mode with HSL colors
5. **Ocean** (#0277BD) - Deep blue ocean theme
6. **Sunset** (#f57c00) - Warm orange sunset theme

Set theme via data attribute:
```tsx
<div data-admin-theme="material">
  <AvakioGridSuggest ... />
</div>
```

## Best Practices

1. **Use autoConfig for quick prototyping** - Let columns generate automatically
2. **Define custom columns for production** - Better control over display and widths
3. **Use textValue templates** - Provide clear display values in the input
4. **Enable yCount for large datasets** - Limit visible rows to improve UX
5. **Use cell templates for formatting** - Format prices, dates, status indicators
6. **Set appropriate column widths** - Balance space based on content importance
7. **Consider editable vs non-editable** - Use editable=false for small, static lists

## Examples

See `avakio-gridsuggest-example.tsx` for comprehensive examples including:
- Auto config with all columns
- Custom columns with widths
- No headers and borderless table
- Scrolling with yCount limitation
- Custom cell templates with status indicators
- Non-editable mode
- All component states (disabled, readonly, error)
- Theme demonstrations

## Performance Considerations

- For datasets with 100+ items, consider using `yCount` to limit rendered rows
- Custom templates can impact performance with very large datasets
- Filtering is performed client-side across all columns

## License

Part of the Avakio Component Library

