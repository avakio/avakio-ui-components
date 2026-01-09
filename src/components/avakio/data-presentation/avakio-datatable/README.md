# Avakio-Style DataTable Component

A high-performance, feature-rich DataTable component inspired by Avakio DataTable, built with React and TypeScript.

## Features

- **High Performance**: Optimized rendering for large datasets
- **Sorting**: Click column headers to sort ascending/descending
- **Filtering**: Built-in column filters with search functionality
- **Pagination**: Server-side and client-side pagination support
- **Column Resizing**: Drag column edges to resize
- **Frozen Columns**: Pin columns to left or right side while scrolling horizontally
- **Row Selection**: Single and multi-row selection modes
- **Custom Rendering**: Template functions for custom cell rendering
- **Responsive Design**: Mobile-friendly with adaptive layouts
- **Theme Support**: Integrates with existing admin themes (Material, Flat, Compact, Dark, Ocean, Sunset)
- **Keyboard Navigation**: Arrow keys for navigation
- **Loading States**: Built-in loading and empty state displays
- **Flexible Scrolling**: Horizontal, vertical, or both

## Installation

The component is already available in your project at:
```
client/src/components/Avakio-datatable/
```

## Basic Usage

```tsx
import { AvakioDataTable, AvakioColumn } from '@/components/Avakio-datatable';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: boolean;
}

function UsersTable() {
  const columns: AvakioColumn<User>[] = [
    {
      id: 'name',
      header: 'Name',
      width: 200,
      sort: true,
      filterable: true,
    },
    {
      id: 'email',
      header: 'Email',
      width: 250,
      filterable: true,
    },
    {
      id: 'role',
      header: 'Role',
      width: 150,
      template: (row) => (
        <Badge variant="outline">{row.role}</Badge>
      ),
    },
    {
      id: 'status',
      header: 'Status',
      width: 100,
      template: (row) => (
        <Badge variant={row.status ? 'default' : 'secondary'}>
          {row.status ? 'Active' : 'Inactive'}
        </Badge>
      ),
    },
  ];

  const data: User[] = [
    { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin', status: true },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: true },
    // ... more data
  ];

  return (
    <AvakioDataTable
      data={data}
      columns={columns}
      height={600}
      sortable
      filterable
      paging
      pageSize={20}
      select="row"
      hover
      resizable
      onRowClick={(row, index) => console.log('Row clicked:', row)}
    />
  );
}
```

## Advanced Usage

### With Server-Side Pagination

```tsx
function ServerPaginatedTable() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData(page);
  }, [page]);

  const fetchData = async (pageNum: number) => {
    setLoading(true);
    const response = await fetch(`/api/users?page=${pageNum}&limit=20`);
    const result = await response.json();
    setData(result.users);
    setTotalCount(result.total);
    setLoading(false);
  };

  return (
    <AvakioDataTable
      data={data}
      columns={columns}
      paging
      pageSize={20}
      totalCount={totalCount}
      currentPage={page}
      onPageChange={setPage}
      loading={loading}
    />
  );
}
```

### With Custom Cell Templates

```tsx
const columns: AvakioColumn<User>[] = [
  {
    id: 'avatar',
    header: 'Avatar',
    width: 80,
    align: 'center',
    template: (row) => (
      <Avatar className="h-8 w-8">
        <AvatarImage src={row.avatarUrl} />
        <AvatarFallback>{row.name[0]}</AvatarFallback>
      </Avatar>
    ),
  },
  {
    id: 'actions',
    header: 'Actions',
    width: 150,
    align: 'center',
    filterable: false,
    template: (row) => (
      <div className="flex gap-2">
        <Button size="sm" variant="ghost" onClick={() => handleEdit(row)}>
          <Pencil className="h-4 w-4" />
        </Button>
        <Button size="sm" variant="ghost" onClick={() => handleDelete(row)}>
          <Trash className="h-4 w-4" />
        </Button>
      </div>
    ),
  },
];
```

### With Row Selection

```tsx
function SelectableTable() {
  const [selectedRows, setSelectedRows] = useState([]);

  return (
    <AvakioDataTable
      data={data}
      columns={columns}
      select="row"
      multiselect
      onSelectChange={(selected) => {
        setSelectedRows(selected);
        console.log('Selected rows:', selected);
      }}
    />
  );
}
```

## Props Reference

### AvakioDataTableProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `T[]` | Required | Array of data objects to display |
| `columns` | `AvakioColumn<T>[]` | Required | Column configuration array |
| `height` | `number \| string` | `'auto'` | Table height (px or CSS value) |
| `width` | `number \| string` | `'100%'` | Table width (px or CSS value) |
| `select` | `boolean \| 'row' \| 'cell' \| 'column'` | `false` | Enable row/cell/column selection |
| `multiselect` | `boolean` | `false` | Allow multiple row selection (Ctrl+Click) |
| `rowHeight` | `number` | `40` | Height of each row in pixels |
| `headerHeight` | `number` | `44` | Height of header row in pixels |
| `hover` | `boolean` | `true` | Highlight rows on hover |
| `resizable` | `boolean` | `true` | Allow column resizing |
| `sortable` | `boolean` | `true` | Enable column sorting |
| `filterable` | `boolean` | `true` | Show filter row below headers |
| `paging` | `boolean` | `false` | Enable pagination |
| `pageSize` | `number` | `20` | Records per page |
| `scroll` | `boolean \| 'x' \| 'y' \| 'xy'` | `'xy'` | Scroll direction |
| `loading` | `boolean` | `false` | Show loading state |
| `emptyText` | `string` | `'No data available'` | Text shown when no data |
| `totalCount` | `number` | - | Total records (for server pagination) |
| `currentPage` | `number` | `1` | Current page number |
| `onRowClick` | `(row: T, index: number) => void` | - | Row click handler |
| `onRowDoubleClick` | `(row: T, index: number) => void` | - | Row double-click handler |
| `onSelectChange` | `(selected: T[]) => void` | - | Selection change handler |
| `onSort` | `(columnId: string, direction: 'asc' \| 'desc') => void` | - | Sort change handler |
| `onFilter` | `(filters: Record<string, string>) => void` | - | Filter change handler |
| `onPageChange` | `(page: number) => void` | - | Page change handler |

### AvakioColumn

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` | Required | Column identifier (matches data key) |
| `header` | `string` | Required | Column header text |
| `width` | `number \| string` | `'auto'` | Column width |
| `minWidth` | `number` | - | Minimum column width (px) |
| `maxWidth` | `number` | - | Maximum column width (px) |
| `sort` | `'asc' \| 'desc' \| boolean` | - | Initial sort direction |
| `filterable` | `boolean` | `true` | Show filter for this column |
| `hidden` | `boolean` | `false` | Hide this column |
| `resizable` | `boolean` | `true` | Allow resizing this column |
| `frozen` | `'left' \| 'right' \| false` | `false` | Pin column to left or right side |
| `template` | `(row: T) => React.ReactNode` | - | Custom cell renderer |
| `format` | `(value: any) => string` | - | Format cell value |
| `cssClass` | `string` | - | CSS class for cells |
| `headerCssClass` | `string` | - | CSS class for header cell |
| `align` | `'left' \| 'center' \| 'right'` | `'left'` | Text alignment |

## Frozen Columns

Freeze columns to keep them visible while scrolling horizontally. This is useful for tables with many columns where you want key columns (like ID or actions) always visible.

### Basic Usage

```tsx
const columns: AvakioColumn<User>[] = [
  {
    id: 'id',
    header: 'ID',
    width: 80,
    frozen: 'left',  // Pin to left side
  },
  {
    id: 'name',
    header: 'Name',
    width: 150,
    frozen: 'left',  // Also pinned to left
  },
  // ... scrollable columns in the middle
  {
    id: 'email',
    header: 'Email',
    width: 200,
  },
  {
    id: 'department',
    header: 'Department',
    width: 150,
  },
  {
    id: 'status',
    header: 'Status',
    width: 100,
    frozen: 'right',  // Pin to right side
  },
];
```

### Features

- **Three-panel layout**: Left frozen, scrollable middle, right frozen
- **Synchronized scrolling**: Vertical scroll syncs across all panels
- **Single vertical scrollbar**: Located on the rightmost panel
- **Horizontal scrollbar**: Only appears when content overflows horizontally
- **Shadow effects**: Visual indicators appear when scrolled away from frozen panels
- **Theme compatible**: Works with all admin themes

### Notes

- Frozen columns must have explicit widths for proper layout
- The vertical scrollbar appears only on the right panel
- All frozen left columns appear before scrollable columns
- All frozen right columns appear after scrollable columns

## Styling

The component automatically adapts to the active admin theme. You can also add custom CSS classes:

```tsx
<AvakioDataTable
  css="custom-table-class"
  columns={columns.map(col => ({
    ...col,
    cssClass: 'custom-cell-class',
    headerCssClass: 'custom-header-class',
  }))}
  data={data}
/>
```

## Performance Tips

1. **Use pagination** for large datasets (> 100 rows)
2. **Enable virtualization** for very large tables (future feature)
3. **Memoize column definitions** to prevent re-renders
4. **Use server-side sorting/filtering** for datasets > 1000 rows
5. **Implement debouncing** for filter inputs

## Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile browsers: iOS Safari 12+, Chrome Mobile

## License

Part of the Resume-Scribe project.

