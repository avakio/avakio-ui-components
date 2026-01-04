import { useState, useRef, useEffect, useCallback } from "react";
import { AvakioDataTable } from "./AvakioDataTable";
import type { AvakioColumn, AvakioSpan } from "./AvakioDataTable";
import { AvakioDatePicker } from "../ui-controls/avakio-datepicker/avakio-datepicker";
import { AvakioMultiCombo } from "../ui-controls/avakio-multicombo/avakio-multicombo";
import { AvakioCombo } from "../ui-controls/avakio-combo/avakio-combo";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Calendar } from "lucide-react";

// Sample data
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  joinDate: string;
}

interface UserAudit {
  id: string;
  rowId?: number;
  userId: string;
  action: string;
  entityType: string | null;
  entityId: string | null;
  changes: Record<string, any> | null;
  ipAddress: string | null;
  userAgent: string | null;
  metadata: Record<string, any> | null;
  createdAt: string;
}

const sampleUsers: User[] = [
  { id: 1, name: "John Doe", email: "john.doe@example.com", role: "Admin", status: "Active", joinDate: "2025-01-15" },
  { id: 2, name: "Jane Smith", email: "jane.smith@example.com", role: "User", status: "Active", joinDate: "2025-02-20" },
  { id: 3, name: "Bob Johnson", email: "bob.johnson@example.com", role: "Manager", status: "Inactive", joinDate: "2025-12-10" },
  { id: 4, name: "Alice Williams", email: "alice.williams@example.com", role: "User", status: "Active", joinDate: "2025-11-05" },
  { id: 5, name: "Charlie Brown", email: "charlie.brown@example.com", role: "Admin", status: "Active", joinDate: "2025-10-12" },
  { id: 6, name: "Diana Prince", email: "diana.prince@example.com", role: "Manager", status: "Active", joinDate: "2025-06-18" },
  { id: 7, name: "Eve Davis", email: "eve.davis@example.com", role: "User", status: "Inactive", joinDate: "2025-07-22" },
  { id: 8, name: "Frank Miller", email: "frank.miller@example.com", role: "User", status: "Active", joinDate: "2025-08-30" },
];

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  rating: number;
}

const sampleProducts: Product[] = [
  { id: 1, name: "Laptop Pro", category: "Electronics", price: 1299.99, stock: 45, rating: 4.5 },
  { id: 2, name: "Wireless Mouse", category: "Accessories", price: 29.99, stock: 120, rating: 4.2 },
  { id: 3, name: "Mechanical Keyboard", category: "Accessories", price: 89.99, stock: 67, rating: 4.7 },
  { id: 4, name: "USB-C Hub", category: "Accessories", price: 49.99, stock: 89, rating: 4.3 },
  { id: 5, name: "Monitor 27\"", category: "Electronics", price: 349.99, stock: 34, rating: 4.6 },
  { id: 6, name: "Webcam HD", category: "Electronics", price: 79.99, stock: 56, rating: 4.1 },
];

// Sample data for spanning cells example
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
  { id: 6, country: "UK", region: "South", city: "London", population: 9002488, gdp: "$3.1T" },
];

// Extended user data for pagination example
const extendedUsers: User[] = [
  { id: 1, name: "John Doe", email: "john.doe@example.com", role: "Admin", status: "Active", joinDate: "2025-01-15" },
  { id: 2, name: "Jane Smith", email: "jane.smith@example.com", role: "User", status: "Active", joinDate: "2025-02-20" },
  { id: 3, name: "Bob Johnson", email: "bob.johnson@example.com", role: "Manager", status: "Inactive", joinDate: "2025-12-10" },
  { id: 4, name: "Alice Williams", email: "alice.williams@example.com", role: "User", status: "Active", joinDate: "2025-11-05" },
  { id: 5, name: "Charlie Brown", email: "charlie.brown@example.com", role: "Admin", status: "Active", joinDate: "2025-10-12" },
  { id: 6, name: "Diana Prince", email: "diana.prince@example.com", role: "Manager", status: "Active", joinDate: "2025-06-18" },
  { id: 7, name: "Eve Davis", email: "eve.davis@example.com", role: "User", status: "Inactive", joinDate: "2025-07-22" },
  { id: 8, name: "Frank Miller", email: "frank.miller@example.com", role: "User", status: "Active", joinDate: "2025-08-30" },
  { id: 9, name: "Grace Lee", email: "grace.lee@example.com", role: "User", status: "Active", joinDate: "2025-03-12" },
  { id: 10, name: "Henry Wilson", email: "henry.wilson@example.com", role: "Manager", status: "Active", joinDate: "2025-04-18" },
  { id: 11, name: "Iris Chen", email: "iris.chen@example.com", role: "Admin", status: "Active", joinDate: "2025-05-25" },
  { id: 12, name: "Jack Turner", email: "jack.turner@example.com", role: "User", status: "Inactive", joinDate: "2025-06-30" },
  { id: 13, name: "Kate Moore", email: "kate.moore@example.com", role: "User", status: "Active", joinDate: "2025-07-14" },
  { id: 14, name: "Liam Anderson", email: "liam.anderson@example.com", role: "Manager", status: "Active", joinDate: "2025-08-21" },
  { id: 15, name: "Mia Thompson", email: "mia.thompson@example.com", role: "User", status: "Active", joinDate: "2025-09-05" },
  { id: 16, name: "Noah Garcia", email: "noah.garcia@example.com", role: "Admin", status: "Active", joinDate: "2025-10-10" },
  { id: 17, name: "Olivia Martinez", email: "olivia.martinez@example.com", role: "User", status: "Inactive", joinDate: "2025-11-15" },
  { id: 18, name: "Peter Robinson", email: "peter.robinson@example.com", role: "Manager", status: "Active", joinDate: "2025-12-01" },
];

const themeBackgrounds = {
  material: "bg-gray-50",
  flat: "bg-slate-100",
  compact: "bg-neutral-50",
  dark: "bg-gray-900",
  ocean: "bg-blue-50",
  sunset: "bg-orange-50",
};

export default function AvakioDataTableExample() {
  const [currentTheme, setCurrentTheme] = useState("material");

  // Sync with global theme from components-showcase
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const globalTheme = document.documentElement.getAttribute('data-admin-theme');
      if (globalTheme && globalTheme !== currentTheme) {
        setCurrentTheme(globalTheme);
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-admin-theme'],
    });

    // Set initial theme if it exists
    const initialTheme = document.documentElement.getAttribute('data-admin-theme');
    if (initialTheme && initialTheme !== currentTheme) {
      setCurrentTheme(initialTheme);
    }

    return () => observer.disconnect();
  }, [currentTheme]);

  // Server-side state management
  const [serverData, setServerData] = useState<User[]>([]);
  const [serverLoading, setServerLoading] = useState(false);
  const [serverPage, setServerPage] = useState(1);
  const [serverPageSize, setServerPageSize] = useState(5);
  const [serverTotalCount, setServerTotalCount] = useState(0);
  const [serverSortColumn, setServerSortColumn] = useState<string | null>(null);
  const [serverSortDirection, setServerSortDirection] = useState<'asc' | 'desc'>('asc');
  const [serverFilters, setServerFilters] = useState<Record<string, string>>({});

  // Audit data state (Example 3)
  const [auditData, setAuditData] = useState<UserAudit[]>([]);
  const [auditLoading, setAuditLoading] = useState(false);
  const [auditPage, setAuditPage] = useState(1);
  const [auditPageSize, setAuditPageSize] = useState(5);
  const [auditTotalCount, setAuditTotalCount] = useState(0);
  const [auditSortColumn, setAuditSortColumn] = useState<string | null>(null);
  const [auditSortDirection, setAuditSortDirection] = useState<'asc' | 'desc'>('asc');
  const [auditFilters, setAuditFilters] = useState<Record<string, string>>({});
  const [auditActionOptions, setAuditActionOptions] = useState<Array<{ value: string; label: string }>>([]);
  const [entityTypeOptions, setEntityTypeOptions] = useState<Array<{ id: string; value: string }>>([]);

  // Fetch audit action options from backend
  const fetchAuditActions = useCallback(async () => {
    try {
      const res = await fetch('/api/test/audit-actions');
      if (!res.ok) {
        console.error('Failed to fetch audit actions:', res.status);
        return;
      }
      const data = await res.json();
      setAuditActionOptions(data.actions || []);
    } catch (error) {
      console.error('Error fetching audit actions:', error);
      setAuditActionOptions([]);
    }
  }, []);

  // Fetch entity type options from backend
  const fetchEntityTypes = useCallback(async () => {
    try {
      const res = await fetch('/api/test/audit-entity-types');
      if (!res.ok) {
        console.error('Failed to fetch entity types:', res.status);
        return;
      }
      const data = await res.json();
      setEntityTypeOptions(data.entityTypes || []);
    } catch (error) {
      console.error('Error fetching entity types:', error);
      setEntityTypeOptions([]);
    }
  }, []);

  // Fetch audit data from backend
  const fetchAuditData = useCallback(async (
    page: number,
    pageSize: number,
    sortColumn: string | null = null,
    sortDirection: 'asc' | 'desc' = 'asc',
    filters: Record<string, string> = {}
  ) => {
    setAuditLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: pageSize.toString(),
      });

      if (sortColumn) {
        params.append('sortBy', sortColumn);
        params.append('sortOrder', sortDirection);
      }

      Object.entries(filters).forEach(([key, value]) => {
        if (value) {
          params.append(`filter_${key}`, value);
        }
      });

      const res = await fetch(`/api/test/audits?${params.toString()}`);
      
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ message: res.statusText }));
        console.error("Failed to fetch audits:", res.status, errorData);
        throw new Error(errorData.message || `Failed to fetch audits: ${res.status}`);
      }
      
      const data = await res.json();
      setAuditData(data.audits || []);
      setAuditTotalCount(data.total || 0);
    } catch (error) {
      console.error("Error fetching audit data:", error);
      // Set empty data but don't throw - show empty table instead
      setAuditData([]);
      setAuditTotalCount(0);
    } finally {
      setAuditLoading(false);
    }
  }, []);

  // Load audit data and actions on mount
  useEffect(() => {
    fetchAuditActions();
    fetchEntityTypes();
    fetchAuditData(auditPage, auditPageSize, auditSortColumn, auditSortDirection, auditFilters);
  }, [auditPage, auditPageSize, auditSortColumn, auditSortDirection, auditFilters, fetchAuditData, fetchAuditActions, fetchEntityTypes]);

  // Handle audit page change
  const handleAuditPageChange = (newPage: number) => {
    setAuditPage(newPage);
    fetchAuditData(newPage, auditPageSize, auditSortColumn, auditSortDirection, auditFilters);
  };

  const handleAuditPageSizeChange = (newPageSize: number) => {
    setAuditPageSize(newPageSize);
    setAuditPage(1);
    fetchAuditData(1, newPageSize, auditSortColumn, auditSortDirection, auditFilters);
  };

  const handleAuditSort = (columnId: string, direction: 'asc' | 'desc') => {
    setAuditSortColumn(columnId);
    setAuditSortDirection(direction);
    setAuditPage(1);
    fetchAuditData(1, auditPageSize, columnId, direction, auditFilters);
  };

  const handleAuditFilter = (filters: Record<string, string>) => {
    setAuditFilters(filters);
    setAuditPage(1);
    fetchAuditData(1, auditPageSize, auditSortColumn, auditSortDirection, filters);
  };

  // Simulate backend API call
  const fetchServerData = useCallback(async (
    page: number,
    pageSize: number,
    sortColumn: string | null,
    sortDirection: 'asc' | 'desc',
    filters: Record<string, string>
  ) => {
    setServerLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Start with all data
    let result = [...extendedUsers];
    
    // Apply filters
    Object.entries(filters).forEach(([columnId, filterValue]) => {
      if (filterValue.trim()) {
        result = result.filter((row) => {
          const value = String(row[columnId as keyof User] || '').toLowerCase();
          return value.includes(filterValue.toLowerCase());
        });
      }
    });
    
    // Apply sorting
    if (sortColumn) {
      result.sort((a, b) => {
        const aVal = a[sortColumn as keyof User];
        const bVal = b[sortColumn as keyof User];
        
        if (aVal === null || aVal === undefined) return 1;
        if (bVal === null || bVal === undefined) return -1;
        
        let comparison = 0;
        if (typeof aVal === 'number' && typeof bVal === 'number') {
          comparison = aVal - bVal;
        } else {
          comparison = String(aVal).localeCompare(String(bVal));
        }
        
        return sortDirection === 'asc' ? comparison : -comparison;
      });
    }
    
    // Get total count after filtering
    const totalCount = result.length;
    
    // Apply pagination
    const startIndex = (page - 1) * pageSize;
    const paginatedResult = result.slice(startIndex, startIndex + pageSize);
    
    setServerData(paginatedResult);
    setServerTotalCount(totalCount);
    setServerLoading(false);
  }, []);

  // Initial load
  useEffect(() => {
    fetchServerData(serverPage, serverPageSize, serverSortColumn, serverSortDirection, serverFilters);
  }, []);

  // Handle server-side page change
  const handleServerPageChange = (newPage: number) => {
    setServerPage(newPage);
    fetchServerData(newPage, serverPageSize, serverSortColumn, serverSortDirection, serverFilters);
  };

  // Handle server-side sort
  const handleServerSort = (columnId: string, direction: 'asc' | 'desc') => {
    setServerSortColumn(columnId);
    setServerSortDirection(direction);
    setServerPage(1); // Reset to first page
    fetchServerData(1, serverPageSize, columnId, direction, serverFilters);
  };

  // Handle server-side filter
  const handleServerFilter = (filters: Record<string, string>) => {
    setServerFilters(filters);
    setServerPage(1); // Reset to first page
    fetchServerData(1, serverPageSize, serverSortColumn, serverSortDirection, filters);
  };

  // DatePicker Filter Component
  const DatePickerFilter = ({ value, onChange }: { value: any; onChange: (value: any) => void }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [tempValue, setTempValue] = useState(value);
    const containerRef = useRef<HTMLDivElement>(null);

    // Format the display value
    const displayValue = value ? (() => {
      const date = new Date(value);
      if (isNaN(date.getTime())) return value;
      return date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
    })() : "";

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };

      if (isOpen) {
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
      }
    }, [isOpen]);

    return (
      <div ref={containerRef} className="relative">
        <div 
          className="avakio-datatable-filter-input-wrapper cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Calendar className="h-3 w-3 text-muted-foreground" />
          <input
            type="text"
            className="avakio-datatable-filter-input cursor-pointer"
            placeholder="Select date..."
            value={displayValue}
            readOnly
          />
          {value && (
            <button
              className="avakio-datatable-filter-clear"
              onClick={(e) => {
                e.stopPropagation();
                onChange("");
              }}
            >
              ✕
            </button>
          )}
        </div>
        {isOpen && (
          <div className="avakio-datatable-datepicker-dropdown">
            <AvakioDatePicker
              value={tempValue || value || ""}
              showTime={true}
              onChange={(newValue) => {
                // Update temp value without closing
                setTempValue(newValue);
                
                // Handle clearing
                if (!newValue) {
                  onChange("");
                  setTempValue("");
                  return;
                }
                
                // Update the filter value but keep picker open
                const date = new Date(newValue);
                if (!isNaN(date.getTime())) {
                  onChange(newValue);
                }
              }}
            />
            <div className="avakio-datepicker-filter-actions">
              <button
                className="avakio-datepicker-filter-apply"
                onClick={() => {
                  const date = new Date(tempValue || value);
                  if (!isNaN(date.getTime())) {
                    onChange(date.toISOString());
                  }
                  setIsOpen(false);
                }}
              >
                Apply
              </button>
              <button
                className="avakio-datepicker-filter-cancel"
                onClick={() => {
                  setTempValue("");
                  setIsOpen(false);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  const userColumns: AvakioColumn<User>[] = [
    {
      id: "id",
      header: "ID",
      width: 80,
      sort: true,
      filterable: true,
      template: (row) => row.id,
    },
    {
      id: "name",
      header: "Name",
      width: 150,
      sort: true,
      filterable: true,
      template: (row) => row.name,
    },
    {
      id: "email",
      header: "Email",
      width: 220,
      sort: true,
      filterable: true,
      template: (row) => row.email,
    },
    {
      id: "role",
      header: "Role",
      width: 120,
      sort: true,
      filterable: true,
      template: (row) => row.role,
    },
    {
      id: "status",
      header: "Status",
      width: 100,
      sort: true,
      filterable: true,
      template: (row) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            row.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
          }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      id: "joinDate",
      header: "Join Date",
      width: 180,
      sort: true,
      filterable: true,
      filterType: 'date',
      template: (row) => row.joinDate,
      filterComponent: (value, onChange) => (
        <DatePickerFilter value={value} onChange={onChange} />
      ),
    },
  ];

  const productColumns: AvakioColumn<Product>[] = [
    {
      id: "id",
      header: "ID",
      width: 70,
      sort: true,
      template: (row) => row.id,
    },
    {
      id: "name",
      header: "Product Name",
      width: 180,
      sort: true,
      filterable: true,
      template: (row) => row.name,
    },
    {
      id: "category",
      header: "Category",
      width: 130,
      sort: true,
      filterable: true,
      template: (row) => row.category,
    },
    {
      id: "price",
      header: "Price",
      width: 100,
      sort: true,
      template: (row) => `$${row.price.toFixed(2)}`,
    },
    {
      id: "stock",
      header: "Stock",
      width: 90,
      sort: true,
      template: (row) => (
        <span className={row.stock < 50 ? "text-red-600 font-medium" : "text-green-600 font-medium"}>
          {row.stock}
        </span>
      ),
    },
    {
      id: "rating",
      header: "Rating",
      width: 100,
      sort: true,
      template: (row) => (
        <span className="flex items-center gap-1">
          <span className="text-yellow-500">★</span>
          <span>{row.rating.toFixed(1)}</span>
        </span>
      ),
    },
  ];

  // Audit columns for Example 3
  const auditColumns: AvakioColumn<UserAudit>[] = [
    {
      id: "rowId",
      header: "Row ID",
      width: 80,
      minWidth: 60,
      maxWidth: 100,
      resizable: true,
      sort: false,
      filterable: false,
      template: (row) => row.rowId || row.id,
    },
    {
      id: "action",
      header: "Action",
      width: 200,
      minWidth: 150,
      maxWidth: 250,
      resizable: true,
      sort: true,
      filterable: true,
      filterType: 'multicombo' as const,
      filterComponent: (value, onChange) => (
        <AvakioMultiCombo
          options={auditActionOptions}
          value={value || []}
          onChange={onChange}
          placeholder="Filter actions..."
        />
      ),
      template: (row) => {
        const actionColors: Record<string, string> = {
          login: "bg-blue-100 text-blue-800",
          logout: "bg-gray-100 text-gray-800",
          create: "bg-green-100 text-green-800",
          update: "bg-yellow-100 text-yellow-800",
          delete: "bg-red-100 text-red-800",
        };
        const colorClass = actionColors[row.action] || "bg-gray-100 text-gray-800";
        return (
          <span className={`px-2 py-1 rounded text-xs font-medium ${colorClass}`}>
            {row.action}
          </span>
        );
      },
    },
    {
      id: "entityType",
      header: "Entity Type",
      width: 200,
      minWidth: 150,
      maxWidth: 250,
      resizable: true,
      sort: true,
      filterable: true,
      filterType: 'combo' as const,
      filterComponent: (value, onChange) => (
        <AvakioCombo
          options={entityTypeOptions}
          value={value || ''}
          onChange={onChange}
          placeholder="Filter entity type..."
        />
      ),
      template: (row) => row.entityType || "N/A",
    },
    {
      id: "entityId",
      header: "Entity ID",
      width: 200,
      sort: false,
      filterable: false,
      template: (row) => row.entityId ? (
        <span className="font-mono text-xs truncate" title={row.entityId}>
          {row.entityId.substring(0, 16)}...
        </span>
      ) : "N/A",
    },
    {
      id: "ipAddress",
      header: "IP Address",
      width: 130,
      sort: false,
      filterable: true,
      template: (row) => row.ipAddress || "N/A",
    },
    {
      id: "createdAt",
      header: "Timestamp",
      width: 180,
      sort: true,
      filterable: true,
      filterType: 'date' as const,
      filterComponent: (value, onChange) => (
        <DatePickerFilter value={value} onChange={onChange} />
      ),
      template: (row) => {
        const date = new Date(row.createdAt);
        return new Intl.DateTimeFormat(undefined, {
          month: "short",
          day: "numeric",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }).format(date);
      },
    },
    {
      id: "changes",
      header: "Has Changes",
      width: 110,
      sort: false,
      filterable: false,
      template: (row) => row.changes ? (
        <span className="text-green-600 font-medium">Yes</span>
      ) : (
        <span className="text-gray-400">No</span>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      width: 100,
      sort: false,
      filterable: false,
      template: (row) => (
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            console.log("View audit record:", row);
            alert(`Viewing audit record:\n\nID: ${row.id}\nAction: ${row.action}\nEntity Type: ${row.entityType || 'N/A'}\nEntity ID: ${row.entityId || 'N/A'}\nIP Address: ${row.ipAddress || 'N/A'}\nTimestamp: ${new Date(row.createdAt).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" })}`);
          }}
        >
          View
        </Button>
      ),
    },
  ];

  // Region data columns (for spanning example)
  const regionColumns: AvakioColumn<RegionData>[] = [
    {
      id: "country",
      header: "Country",
      width: 120,
      sort: true,
      filterable: true,
      template: (row) => row.country,
    },
    {
      id: "region",
      header: "Region",
      width: 120,
      sort: true,
      filterable: true,
      template: (row) => row.region,
    },
    {
      id: "city",
      header: "City",
      width: 150,
      sort: true,
      filterable: true,
      template: (row) => row.city,
    },
    {
      id: "population",
      header: "Population",
      width: 130,
      sort: true,
      filterable: false,
      template: (row) => row.population.toLocaleString(),
    },
    {
      id: "gdp",
      header: "GDP",
      width: 100,
      sort: false,
      filterable: false,
      template: (row) => row.gdp,
    },
    {
      id: "actions",
      header: "Actions",
      width: 120,
      sort: false,
      filterable: false,
      template: (row) => (
        <Button
          variant="outline"
          size="sm"
          onClick={() => alert(`View details for ${row.city}`)}
        >
          View
        </Button>
      ),
    },
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${themeBackgrounds[currentTheme as keyof typeof themeBackgrounds]}`}>
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Avakio DataTable</h1>
          <p className="text-muted-foreground mb-6">
            A high-performance data table component with sorting, filtering, pagination, and column resizing.
          </p>
        </div>

        <div className="grid gap-8" style={{ overflow: 'visible', position: 'relative', zIndex: 1 }}>
          {/* Example 3: User Audit Logs with Backend Data */}
          <Card className="w-full overflow-visible" style={{ overflow: 'visible', position: 'relative', zIndex: 100 }}>
            <CardHeader>
              <CardTitle>Example 3: User Audit Logs with Backend Data</CardTitle>
              <CardDescription>
                Real audit data from the backend with server-side pagination
              </CardDescription>
            </CardHeader>
            <CardContent className="overflow-visible">
              <AvakioDataTable
                columns={auditColumns}
                data={auditData}
                serverSide={true}
                paging={true}
                pageSize={auditPageSize}
                currentPage={auditPage}
                totalCount={auditTotalCount}
                loading={auditLoading}
                resizable={true}
                filterable={true}
                sortable={true}
                onPageChange={handleAuditPageChange}
                onPageSizeChange={handleAuditPageSizeChange}
                onSort={handleAuditSort}
                onFilter={handleAuditFilter}
              />
            </CardContent>
          </Card>

          {/* Example 4: Server-Side Sorting and Pagination */}
          <Card className="w-full overflow-visible" style={{ overflow: 'visible', position: 'relative', zIndex: 50 }}>
            <CardHeader>
              <CardTitle>Example 4: Server-Side Sorting and Pagination</CardTitle>
              <CardDescription>
                Demonstrates backend-controlled sorting, filtering, and pagination with simulated API calls
              </CardDescription>
            </CardHeader>
            <CardContent className="overflow-visible">
              <AvakioDataTable
                columns={userColumns}
                data={serverData}
                serverSide={true}
                paging={true}
                pageSize={serverPageSize}
                currentPage={serverPage}
                totalCount={serverTotalCount}
                loading={serverLoading}
                select="row"
                resizable={true}
                filterable={true}
                sortable={true}
                onPageChange={handleServerPageChange}
                onSort={handleServerSort}
                onFilter={handleServerFilter}
              />
            </CardContent>
          </Card>

          {/* Example 1: User Management Table */}
          <Card className="w-full overflow-visible" style={{ overflow: 'visible', position: 'relative', zIndex: 40 }}>
            <CardHeader>
              <CardTitle>Example 1: User Management Table</CardTitle>
              <CardDescription>
                Sortable, filterable table with custom status badges and row selection
              </CardDescription>
            </CardHeader>
            <CardContent className="overflow-visible">
              <AvakioDataTable
                columns={userColumns}
                data={sampleUsers}
                pageSize={5}
                select="row"
                resizable={true}
                filterable={true}
                sortable={true}
              />
            </CardContent>
          </Card>

          {/* Example 2: Product Inventory Table */}
          <Card className="w-full overflow-visible" style={{ overflow: 'visible', position: 'relative', zIndex: 30 }}>
            <CardHeader>
              <CardTitle>Example 2: Product Inventory Table</CardTitle>
              <CardDescription>
                Custom cell templates for pricing, stock levels, and ratings
              </CardDescription>
            </CardHeader>
            <CardContent className="overflow-visible" style={{ overflow: 'visible' }}>
              <AvakioDataTable
                columns={productColumns}
                data={sampleProducts}
                pageSize={5}
                resizable={true}
                filterable={true}
                sortable={true}
              />
            </CardContent>
          </Card>

          {/* Example 3: Rowspan/Colspan Table */}
          <Card className="w-full overflow-visible" style={{ overflow: 'visible', position: 'relative', zIndex: 25 }}>
            <CardHeader>
              <CardTitle>Example 3: Rowspan/Colspan - Regional Data</CardTitle>
              <CardDescription>
                Demonstrates merged cells using rowspan and colspan functionality
              </CardDescription>
            </CardHeader>
            <CardContent className="overflow-visible" style={{ overflow: 'visible' }}>
              <AvakioDataTable
                columns={regionColumns}
                data={regionData}
                spans={[
                  [1, "country", 1, 3, "USA", "font-bold bg-blue-50"],  // USA spans 3 rows
                  [1, "gdp", 1, 3, "$1.0T", "font-bold bg-blue-50"],     // GDP spans 3 rows
                  [4, "country", 1, 2, "Canada", "font-bold bg-green-50"], // Canada spans 2 rows
                  [4, "gdp", 1, 2, "$2.2T", "font-bold bg-green-50"],     // GDP spans 2 rows
                  [6, "region", 3, 1, "UK - All Regions", "font-bold bg-purple-50 text-center"], // UK Actions spans 3 columns
                ]}
                pageSize={10}
                resizable={true}
                filterable={false}
                sortable={false}
                paging={false}
              />
              <div className="mt-4 text-sm text-muted-foreground">
                <p><strong>Note:</strong> In this example, cells are merged to show grouped data:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li><strong>Rowspan:</strong> USA country and GDP values span 3 rows (West coast cities)</li>
                  <li><strong>Rowspan:</strong> Canada country and GDP values span 2 rows (major cities)</li>
                  <li><strong>Colspan:</strong> UK row's region field spans 3 columns (region + city + population)</li>
                  <li>Merged cells have custom background colors for visual clarity</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Features Section */}
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Key Features</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span><strong>Sorting:</strong> Click column headers to sort ascending/descending</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span><strong>Filtering:</strong> Type in filter inputs to search within columns</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span><strong>Pagination:</strong> Navigate through pages with page size control</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span><strong>Column Resizing:</strong> Drag column borders to resize</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span><strong>Row Selection:</strong> Checkbox selection with select all option</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span><strong>Custom Templates:</strong> Render custom cell content with template function</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span><strong>Theme Support:</strong> Six built-in themes (Material, Flat, Compact, Dark, Ocean, Sunset)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span><strong>Server-Side Mode:</strong> Backend-controlled sorting, filtering, and pagination</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span><strong>Rowspan &amp; Colspan:</strong> Merge cells to create complex layouts with grouped data</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span><strong>Responsive:</strong> Adapts to different screen sizes</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Usage Section */}
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                <code>{`import { AvakioDataTable } from "../../../avakio-datatable/AvakioDataTable";
import type { AvakioColumn } from "../../../avakio-datatable/AvakioDataTable";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const columns: AvakioColumn<User>[] = [
  {
    id: "id",
    header: "ID",
    accessor: "id",
    width: 80,
    sortable: true,
  },
  {
    id: "name",
    header: "Name",
    accessor: "name",
    width: 150,
    sortable: true,
    filterable: true,
  },
  {
    id: "email",
    header: "Email",
    accessor: "email",
    width: 220,
    sortable: true,
    filterable: true,
  },
  {
    id: "role",
    header: "Role",
    accessor: "role",
    width: 120,
    sortable: true,
    filterable: true,
  },
];

const data: User[] = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
];

<AvakioDataTable
  columns={columns}
  data={data}
  pageSize={10}
  selectable={true}
  resizable={true}
  onSelectionChange={(selected) => console.log(selected)}
/>

// With rowspan/colspan:
<AvakioDataTable
  columns={regionColumns}
  data={regionData}
  spans={[
    [1, "country", 1, 3, "USA", "font-bold bg-blue-50"],  // USA spans 3 rows
    [1, "gdp", 1, 3, "$1.0T", "font-bold bg-blue-50"],    // GDP spans 3 rows
  ]}
  pageSize={10}
/>`}</code>
              </pre>
            </CardContent>
          </Card>

          {/* Props Table */}
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Props</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2 font-semibold">Prop</th>
                      <th className="text-left p-2 font-semibold">Type</th>
                      <th className="text-left p-2 font-semibold">Default</th>
                      <th className="text-left p-2 font-semibold">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-2 font-mono">columns</td>
                      <td className="p-2 font-mono">AvakioColumn[]</td>
                      <td className="p-2">-</td>
                      <td className="p-2">Column definitions</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono">data</td>
                      <td className="p-2 font-mono">T[]</td>
                      <td className="p-2">-</td>
                      <td className="p-2">Array of data objects</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono">spans</td>
                      <td className="p-2 font-mono">AvakioSpan[]</td>
                      <td className="p-2">-</td>
                      <td className="p-2">Array of span configurations [rowId, columnId, colspan, rowspan, value?, cssClass?]</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono">pageSize</td>
                      <td className="p-2 font-mono">number</td>
                      <td className="p-2">10</td>
                      <td className="p-2">Number of rows per page</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono">selectable</td>
                      <td className="p-2 font-mono">boolean</td>
                      <td className="p-2">false</td>
                      <td className="p-2">Enable row selection checkboxes</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono">resizable</td>
                      <td className="p-2 font-mono">boolean</td>
                      <td className="p-2">true</td>
                      <td className="p-2">Enable column resizing</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono">loading</td>
                      <td className="p-2 font-mono">boolean</td>
                      <td className="p-2">false</td>
                      <td className="p-2">Show loading state</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono">emptyMessage</td>
                      <td className="p-2 font-mono">string</td>
                      <td className="p-2">"No data"</td>
                      <td className="p-2">Message when no data available</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono">serverSide</td>
                      <td className="p-2 font-mono">boolean</td>
                      <td className="p-2">false</td>
                      <td className="p-2">Enable server-side sorting, filtering, and pagination</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono">totalCount</td>
                      <td className="p-2 font-mono">number</td>
                      <td className="p-2">-</td>
                      <td className="p-2">Total record count (for server-side pagination)</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono">currentPage</td>
                      <td className="p-2 font-mono">number</td>
                      <td className="p-2">1</td>
                      <td className="p-2">Current page number (for server-side pagination)</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono">onPageChange</td>
                      <td className="p-2 font-mono">(page: number) =&gt; void</td>
                      <td className="p-2">-</td>
                      <td className="p-2">Callback when page changes (server-side)</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono">onSort</td>
                      <td className="p-2 font-mono">(col: string, dir: 'asc'|'desc') =&gt; void</td>
                      <td className="p-2">-</td>
                      <td className="p-2">Callback when sort changes (server-side)</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono">onFilter</td>
                      <td className="p-2 font-mono">(filters: Record&lt;string, string&gt;) =&gt; void</td>
                      <td className="p-2">-</td>
                      <td className="p-2">Callback when filters change (server-side)</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono">onSelectionChange</td>
                      <td className="p-2 font-mono">(rows: T[]) =&gt; void</td>
                      <td className="p-2">-</td>
                      <td className="p-2">Callback when selection changes</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Column Configuration */}
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Column Configuration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2 font-semibold">Property</th>
                      <th className="text-left p-2 font-semibold">Type</th>
                      <th className="text-left p-2 font-semibold">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-2 font-mono">id</td>
                      <td className="p-2 font-mono">string</td>
                      <td className="p-2">Unique column identifier</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono">header</td>
                      <td className="p-2 font-mono">string</td>
                      <td className="p-2">Column header text</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono">accessor</td>
                      <td className="p-2 font-mono">keyof T</td>
                      <td className="p-2">Property key to access data</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono">width</td>
                      <td className="p-2 font-mono">number</td>
                      <td className="p-2">Column width in pixels</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono">sortable</td>
                      <td className="p-2 font-mono">boolean</td>
                      <td className="p-2">Enable sorting for this column</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono">filterable</td>
                      <td className="p-2 font-mono">boolean</td>
                      <td className="p-2">Enable filtering for this column</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono">template</td>
                      <td className="p-2 font-mono">(value: any) =&gt; ReactNode</td>
                      <td className="p-2">Custom cell renderer function</td>
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











