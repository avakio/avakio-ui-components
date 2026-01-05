import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Sample customer data
const customers = [
  { id: 1, name: "John Doe", email: "john.doe@example.com", phone: "+1-555-0101", company: "Tech Corp", status: "active", joinDate: "2023-01-15", revenue: 125000 },
  { id: 2, name: "Jane Smith", email: "jane.smith@example.com", phone: "+1-555-0102", company: "Design Studio", status: "active", joinDate: "2023-02-20", revenue: 89000 },
  { id: 3, name: "Bob Johnson", email: "bob.johnson@example.com", phone: "+1-555-0103", company: "Marketing Inc", status: "inactive", joinDate: "2022-12-10", revenue: 156000 },
  { id: 4, name: "Alice Williams", email: "alice.williams@example.com", phone: "+1-555-0104", company: "Finance Group", status: "active", joinDate: "2023-11-05", revenue: 234000 },
  { id: 5, name: "Charlie Brown", email: "charlie.brown@example.com", phone: "+1-555-0105", company: "Software Solutions", status: "active", joinDate: "2023-10-12", revenue: 78000 },
  { id: 6, name: "Diana Prince", email: "diana.prince@example.com", phone: "+1-555-0106", company: "Consulting LLC", status: "active", joinDate: "2023-06-18", revenue: 198000 },
  { id: 7, name: "Eve Davis", email: "eve.davis@example.com", phone: "+1-555-0107", company: "Retail Plus", status: "inactive", joinDate: "2023-07-22", revenue: 45000 },
  { id: 8, name: "Frank Miller", email: "frank.miller@example.com", phone: "+1-555-0108", company: "Healthcare Co", status: "active", joinDate: "2023-08-30", revenue: 312000 },
  { id: 9, name: "Grace Lee", email: "grace.lee@example.com", phone: "+1-555-0109", company: "Education First", status: "active", joinDate: "2023-03-12", revenue: 67000 },
  { id: 10, name: "Henry Wilson", email: "henry.wilson@example.com", phone: "+1-555-0110", company: "Manufacturing Ltd", status: "active", joinDate: "2023-04-18", revenue: 445000 },
  { id: 11, name: "Iris Chen", email: "iris.chen@example.com", phone: "+1-555-0111", company: "Logistics Express", status: "active", joinDate: "2023-05-25", revenue: 289000 },
  { id: 12, name: "Jack Turner", email: "jack.turner@example.com", phone: "+1-555-0112", company: "Media Group", status: "inactive", joinDate: "2023-06-30", revenue: 134000 },
  { id: 13, name: "Kate Moore", email: "kate.moore@example.com", phone: "+1-555-0113", company: "Legal Associates", status: "active", joinDate: "2023-07-14", revenue: 256000 },
  { id: 14, name: "Liam Anderson", email: "liam.anderson@example.com", phone: "+1-555-0114", company: "Real Estate Pro", status: "active", joinDate: "2023-08-21", revenue: 523000 },
  { id: 15, name: "Mia Thompson", email: "mia.thompson@example.com", phone: "+1-555-0115", company: "Insurance Plus", status: "active", joinDate: "2023-09-05", revenue: 178000 },
  { id: 16, name: "Noah Garcia", email: "noah.garcia@example.com", phone: "+1-555-0116", company: "Energy Corp", status: "active", joinDate: "2023-10-10", revenue: 634000 },
  { id: 17, name: "Olivia Martinez", email: "olivia.martinez@example.com", phone: "+1-555-0117", company: "Travel Agency", status: "inactive", joinDate: "2023-11-15", revenue: 89000 },
  { id: 18, name: "Peter Robinson", email: "peter.robinson@example.com", phone: "+1-555-0118", company: "Food Services", status: "active", joinDate: "2023-12-01", revenue: 167000 },
  { id: 19, name: "Quinn Harris", email: "quinn.harris@example.com", phone: "+1-555-0119", company: "Tech Startup", status: "active", joinDate: "2024-01-10", revenue: 45000 },
  { id: 20, name: "Rachel Clark", email: "rachel.clark@example.com", phone: "+1-555-0120", company: "Creative Agency", status: "active", joinDate: "2024-02-15", revenue: 234000 },
  { id: 21, name: "Sam Taylor", email: "sam.taylor@example.com", phone: "+1-555-0121", company: "Sports Inc", status: "inactive", joinDate: "2024-03-20", revenue: 112000 },
  { id: 22, name: "Tina White", email: "tina.white@example.com", phone: "+1-555-0122", company: "Fashion House", status: "active", joinDate: "2024-04-25", revenue: 378000 },
  { id: 23, name: "Uma Patel", email: "uma.patel@example.com", phone: "+1-555-0123", company: "IT Services", status: "active", joinDate: "2024-05-30", revenue: 289000 },
  { id: 24, name: "Victor Young", email: "victor.young@example.com", phone: "+1-555-0124", company: "Construction Co", status: "active", joinDate: "2024-06-05", revenue: 567000 },
  { id: 25, name: "Wendy King", email: "wendy.king@example.com", phone: "+1-555-0125", company: "Pharma Plus", status: "active", joinDate: "2024-07-10", revenue: 445000 },
];

// Sample product data
const products = [
  { id: 1, name: "Laptop Pro 15", sku: "LP-001", category: "Electronics", price: 1299.99, stock: 45, rating: 4.5, status: "in-stock" },
  { id: 2, name: "Wireless Mouse", sku: "WM-002", category: "Accessories", price: 29.99, stock: 120, rating: 4.2, status: "in-stock" },
  { id: 3, name: "Mechanical Keyboard", sku: "MK-003", category: "Accessories", price: 89.99, stock: 67, rating: 4.7, status: "in-stock" },
  { id: 4, name: "USB-C Hub", sku: "UH-004", category: "Accessories", price: 49.99, stock: 89, rating: 4.3, status: "in-stock" },
  { id: 5, name: "Monitor 27\"", sku: "MN-005", category: "Electronics", price: 349.99, stock: 34, rating: 4.6, status: "in-stock" },
  { id: 6, name: "Webcam HD", sku: "WC-006", category: "Electronics", price: 79.99, stock: 0, rating: 4.1, status: "out-of-stock" },
  { id: 7, name: "Headphones Pro", sku: "HP-007", category: "Audio", price: 199.99, stock: 28, rating: 4.8, status: "in-stock" },
  { id: 8, name: "External SSD 1TB", sku: "ES-008", category: "Storage", price: 129.99, stock: 56, rating: 4.4, status: "in-stock" },
  { id: 9, name: "Graphics Tablet", sku: "GT-009", category: "Electronics", price: 249.99, stock: 15, rating: 4.3, status: "low-stock" },
  { id: 10, name: "Desk Lamp LED", sku: "DL-010", category: "Office", price: 39.99, stock: 78, rating: 4.0, status: "in-stock" },
  { id: 11, name: "Ergonomic Chair", sku: "EC-011", category: "Furniture", price: 449.99, stock: 12, rating: 4.6, status: "low-stock" },
  { id: 12, name: "Standing Desk", sku: "SD-012", category: "Furniture", price: 599.99, stock: 8, rating: 4.5, status: "low-stock" },
  { id: 13, name: "Bluetooth Speaker", sku: "BS-013", category: "Audio", price: 69.99, stock: 95, rating: 4.2, status: "in-stock" },
  { id: 14, name: "Phone Stand", sku: "PS-014", category: "Accessories", price: 19.99, stock: 200, rating: 4.1, status: "in-stock" },
  { id: 15, name: "Laptop Stand", sku: "LS-015", category: "Accessories", price: 59.99, stock: 45, rating: 4.4, status: "in-stock" },
];

// Sample order data
const orders = [
  { id: 1, orderNumber: "ORD-001", customerId: 1, customerName: "John Doe", total: 1329.98, status: "completed", createdAt: "2024-01-15T10:30:00Z", items: 2 },
  { id: 2, orderNumber: "ORD-002", customerId: 2, customerName: "Jane Smith", total: 89.99, status: "completed", createdAt: "2024-01-16T14:20:00Z", items: 1 },
  { id: 3, orderNumber: "ORD-003", customerId: 3, customerName: "Bob Johnson", total: 449.97, status: "pending", createdAt: "2024-01-17T09:15:00Z", items: 3 },
  { id: 4, orderNumber: "ORD-004", customerId: 4, customerName: "Alice Williams", total: 199.99, status: "shipped", createdAt: "2024-01-18T11:45:00Z", items: 1 },
  { id: 5, orderNumber: "ORD-005", customerId: 5, customerName: "Charlie Brown", total: 659.97, status: "completed", createdAt: "2024-01-19T16:00:00Z", items: 3 },
  { id: 6, orderNumber: "ORD-006", customerId: 6, customerName: "Diana Prince", total: 129.99, status: "processing", createdAt: "2024-01-20T08:30:00Z", items: 1 },
  { id: 7, orderNumber: "ORD-007", customerId: 7, customerName: "Eve Davis", total: 1549.97, status: "pending", createdAt: "2024-01-21T13:10:00Z", items: 2 },
  { id: 8, orderNumber: "ORD-008", customerId: 8, customerName: "Frank Miller", total: 79.99, status: "completed", createdAt: "2024-01-22T10:05:00Z", items: 1 },
  { id: 9, orderNumber: "ORD-009", customerId: 9, customerName: "Grace Lee", total: 349.99, status: "shipped", createdAt: "2024-01-23T15:40:00Z", items: 1 },
  { id: 10, orderNumber: "ORD-010", customerId: 10, customerName: "Henry Wilson", total: 899.97, status: "completed", createdAt: "2024-01-24T09:20:00Z", items: 3 },
  { id: 11, orderNumber: "ORD-011", customerId: 11, customerName: "Iris Chen", total: 249.99, status: "cancelled", createdAt: "2024-01-25T11:55:00Z", items: 1 },
  { id: 12, orderNumber: "ORD-012", customerId: 12, customerName: "Jack Turner", total: 519.98, status: "processing", createdAt: "2024-01-26T14:30:00Z", items: 2 },
];

// Helper function to apply filters
function applyFilters(data, filters) {
  let result = [...data];
  
  Object.entries(filters).forEach(([key, value]) => {
    if (value && value.trim()) {
      // Handle array values (from multicombo)
      if (Array.isArray(value)) {
        if (value.length > 0) {
          result = result.filter(item => {
            const itemValue = String(item[key] || '').toLowerCase();
            return value.some(v => itemValue.includes(String(v).toLowerCase()));
          });
        }
      } else {
        result = result.filter(item => {
          const itemValue = String(item[key] || '').toLowerCase();
          return itemValue.includes(value.toLowerCase());
        });
      }
    }
  });
  
  return result;
}

// Helper function to apply sorting
function applySorting(data, sortBy, sortOrder) {
  if (!sortBy) return data;
  
  return [...data].sort((a, b) => {
    const aVal = a[sortBy];
    const bVal = b[sortBy];
    
    if (aVal === null || aVal === undefined) return 1;
    if (bVal === null || bVal === undefined) return -1;
    
    let comparison = 0;
    if (typeof aVal === 'number' && typeof bVal === 'number') {
      comparison = aVal - bVal;
    } else {
      comparison = String(aVal).localeCompare(String(bVal));
    }
    
    return sortOrder === 'asc' ? comparison : -comparison;
  });
}

// Helper function to apply pagination
function applyPagination(data, page, limit) {
  const startIndex = (page - 1) * limit;
  return data.slice(startIndex, startIndex + limit);
}

// GET /api/customers - Get customers with pagination, sorting, and filtering
app.get('/api/customers', (req, res) => {
  const { page = 1, limit = 10, sortBy, sortOrder = 'asc', ...queryFilters } = req.query;
  
  // Extract filter parameters (those starting with filter_)
  const filters = {};
  Object.entries(queryFilters).forEach(([key, value]) => {
    if (key.startsWith('filter_')) {
      filters[key.replace('filter_', '')] = value;
    }
  });
  
  // Apply filters
  let result = applyFilters(customers, filters);
  
  // Get total count after filtering
  const total = result.length;
  
  // Apply sorting
  result = applySorting(result, sortBy, sortOrder);
  
  // Apply pagination
  result = applyPagination(result, parseInt(page), parseInt(limit));
  
  // Simulate network delay
  setTimeout(() => {
    res.json({
      customers: result,
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(total / parseInt(limit))
    });
  }, 300);
});

// GET /api/customers/:id - Get single customer
app.get('/api/customers/:id', (req, res) => {
  const customer = customers.find(c => c.id === parseInt(req.params.id));
  
  if (!customer) {
    return res.status(404).json({ error: 'Customer not found' });
  }
  
  res.json(customer);
});

// GET /api/products - Get products with pagination, sorting, and filtering
app.get('/api/products', (req, res) => {
  const { page = 1, limit = 10, sortBy, sortOrder = 'asc', ...queryFilters } = req.query;
  
  const filters = {};
  Object.entries(queryFilters).forEach(([key, value]) => {
    if (key.startsWith('filter_')) {
      filters[key.replace('filter_', '')] = value;
    }
  });
  
  let result = applyFilters(products, filters);
  const total = result.length;
  result = applySorting(result, sortBy, sortOrder);
  result = applyPagination(result, parseInt(page), parseInt(limit));
  
  setTimeout(() => {
    res.json({
      products: result,
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(total / parseInt(limit))
    });
  }, 300);
});

// GET /api/orders - Get orders with pagination, sorting, and filtering
app.get('/api/orders', (req, res) => {
  const { page = 1, limit = 10, sortBy, sortOrder = 'asc', ...queryFilters } = req.query;
  
  const filters = {};
  Object.entries(queryFilters).forEach(([key, value]) => {
    if (key.startsWith('filter_')) {
      filters[key.replace('filter_', '')] = value;
    }
  });
  
  let result = applyFilters(orders, filters);
  const total = result.length;
  result = applySorting(result, sortBy, sortOrder);
  result = applyPagination(result, parseInt(page), parseInt(limit));
  
  setTimeout(() => {
    res.json({
      orders: result,
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(total / parseInt(limit))
    });
  }, 300);
});

// GET /api/customer-statuses - Get unique customer statuses for filter dropdown
app.get('/api/customer-statuses', (req, res) => {
  const statuses = [...new Set(customers.map(c => c.status))];
  res.json({
    statuses: statuses.map(s => ({ value: s, label: s.charAt(0).toUpperCase() + s.slice(1) }))
  });
});

// GET /api/product-categories - Get unique product categories
app.get('/api/product-categories', (req, res) => {
  const categories = [...new Set(products.map(p => p.category))];
  res.json({
    categories: categories.map(c => ({ id: c, value: c }))
  });
});

// GET /api/order-statuses - Get unique order statuses
app.get('/api/order-statuses', (req, res) => {
  const statuses = [...new Set(orders.map(o => o.status))];
  res.json({
    statuses: statuses.map(s => ({ value: s, label: s.charAt(0).toUpperCase() + s.slice(1) }))
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🚀 API Server running on http://localhost:${PORT}`);
  console.log(`
Available endpoints:
  GET /api/customers      - List customers (with pagination, sorting, filtering)
  GET /api/customers/:id  - Get single customer
  GET /api/products       - List products
  GET /api/orders         - List orders
  GET /api/customer-statuses   - Get customer status options
  GET /api/product-categories  - Get product category options
  GET /api/order-statuses      - Get order status options
  GET /api/health         - Health check
  `);
});
