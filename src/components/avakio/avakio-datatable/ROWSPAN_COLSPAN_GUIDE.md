# AvakioDataTable: Rowspan & Colspan Guide

## Overview

The AvakioDataTable component now supports rowspan and colspan functionality, allowing you to merge cells to create complex table layouts with grouped data.

## Usage

### Basic Syntax

```tsx
import { AvakioDataTable } from "./AvakioDataTable";
import type { AvakioColumn, AvakioSpan } from "./AvakioDataTable";

<AvakioDataTable
  columns={columns}
  data={data}
  spans={[
    [rowId, columnId, colspan, rowspan, value?, cssClass?],
    // ... more spans
  ]}
/>
```

### Span Configuration Format

Each span is defined as an array with the following structure:

```typescript
export type AvakioSpan = [
  rowId: string | number,      // ID of the row where the span starts
  columnId: string,             // ID of the column where the span starts
  colspan: number,              // Number of columns to span (1 = no colspan)
  rowspan: number,              // Number of rows to span (1 = no rowspan)
  value?: any,                  // Optional: Custom value to display (overrides row data)
  cssClass?: string             // Optional: Additional CSS classes for styling
];
```

## Example

### Data Structure

```tsx
interface RegionData {
  id: number;
  country: string;
  region: string;
  city: string;
  population: number;
  gdp: string;
}

const regionData: RegionData[] = [
  { id: 1, country: "USA", region: "West", city: "Los Angeles", population: 4000000, gdp: "$1.0T" },
  { id: 2, country: "USA", region: "West", city: "San Francisco", population: 874961, gdp: "$1.0T" },
  { id: 3, country: "USA", region: "East", city: "New York", population: 8336817, gdp: "$1.0T" },
  { id: 4, country: "Canada", region: "Central", city: "Toronto", population: 2930000, gdp: "$2.2T" },
  { id: 5, country: "Canada", region: "West", city: "Vancouver", population: 675218, gdp: "$2.2T" },
];
```

### Column Configuration

```tsx
const regionColumns: AvakioColumn<RegionData>[] = [
  {
    id: "country",
    header: "Country",
    width: 120,
    template: (row) => row.country,
  },
  {
    id: "region",
    header: "Region",
    width: 120,
    template: (row) => row.region,
  },
  {
    id: "city",
    header: "City",
    width: 150,
    template: (row) => row.city,
  },
  {
    id: "population",
    header: "Population",
    width: 130,
    template: (row) => row.population.toLocaleString(),
  },
  {
    id: "gdp",
    header: "GDP",
    width: 100,
    template: (row) => row.gdp,
  },
];
```

### Span Configuration

```tsx
<AvakioDataTable
  columns={regionColumns}
  data={regionData}
  spans={[
    // USA country spans 3 rows (rows with id 1, 2, 3)
    [1, "country", 1, 3, "USA", "font-bold bg-blue-50"],
    
    // USA GDP spans 3 rows (same rows)
    [1, "gdp", 1, 3, "$1.0T", "font-bold bg-blue-50"],
    
    // Canada country spans 2 rows (rows with id 4, 5)
    [4, "country", 1, 2, "Canada", "font-bold bg-green-50"],
    
    // Canada GDP spans 2 rows (same rows)
    [4, "gdp", 1, 2, "$2.2T", "font-bold bg-green-50"],
  ]}
  pageSize={10}
  resizable={true}
/>
```

## How It Works

### Internal Implementation

1. **Span Map Creation**: When spans are provided, the component creates an internal map that tracks:
   - Which cells should be rendered with rowspan/colspan attributes
   - Which cells should be skipped (because they're covered by a span)
   - Custom values and CSS classes for spanning cells

2. **Cell Rendering**: During table rendering:
   - Cells that are the origin of a span are rendered with `data-colspan` and `data-rowspan` attributes
   - Cells covered by a span are skipped (return `null`)
   - Custom values override the row's data for that cell
   - Additional CSS classes are applied for visual styling

3. **Flex Layout**: Since the datatable uses flexbox layout:
   - Colspan is implemented using `flex-grow` CSS property
   - Cells with `data-colspan="2"` get `flex-grow: 2`, etc.
   - This makes the cell occupy the space of multiple columns

## Features

### ✓ Rowspan Support
- Merge cells vertically across multiple rows
- Automatically skips cells covered by the span

### ✓ Colspan Support
- Merge cells horizontally across multiple columns
- Uses flex-grow to properly size the merged cell

### ✓ Custom Values
- Override the default cell value with a custom value
- Useful for displaying aggregated or summary data

### ✓ Custom Styling
- Apply custom CSS classes to spanning cells
- Use Tailwind classes or custom CSS for visual distinction

### ✓ Combined Rowspan + Colspan
- Supports cells that span both rows and columns
- Automatically handles all overlapping cells

## Best Practices

1. **Use Row IDs**: Always ensure your data has unique `id` or `Id` properties
2. **Sequential Rows**: Rowspan works best with consecutive row IDs
3. **Visual Distinction**: Use background colors or borders to make merged cells clear
4. **Avoid Conflicts**: Don't create overlapping spans
5. **Disable Features**: Consider disabling sorting/filtering/pagination when using complex spans

## Limitations

- Spans are based on row IDs, not row indices
- Works best without pagination (or with `paging={false}`)
- Sorting and filtering may disrupt span layouts
- Server-side mode requires careful span configuration

## CSS Customization

You can target spanning cells with CSS:

```css
/* Style cells with colspan */
.avakio-datatable-cell[data-colspan] {
  font-weight: bold;
}

/* Style cells with specific colspan value */
.avakio-datatable-cell[data-colspan="3"] {
  background-color: #f0f0f0;
}

/* Style cells with rowspan */
.avakio-datatable-cell[data-rowspan] {
  vertical-align: top;
}
```

## Complete Example

See [avakio-datatable-example.tsx](./avakio-datatable-example.tsx) for a complete working example with regional data showing country and GDP values spanning multiple rows.

