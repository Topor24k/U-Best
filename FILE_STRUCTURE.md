# File Structure

## 📁 Project Organization

```
Ulas Bakery Equipment And Supplies/
│
├── 📄 index.html              # Landing page
├── 📄 dashboard.html          # Customer dashboard
├── 📄 admin.html              # Admin panel
│
├── 📁 css/                    # Stylesheets
│   ├── styles.css             # Main styles
│   ├── dashboard.css          # Dashboard styles
│   ├── shop.css               # Shop styles
│   └── admin.css              # Admin panel styles
│
├── 📁 js/                     # JavaScript files
│   ├── script.js              # Landing page functionality
│   ├── dashboard.js           # Customer dashboard logic
│   ├── shop.js                # Product browsing & cart
│   ├── admin.js               # Admin panel functionality
│   └── features.js            # Shared features
│
├── 📁 docs/                   # Documentation
│   ├── README.md              # Main documentation
│   └── STRUCTURE.md           # Code structure
│
├── 📁 legacy/                 # Old files (for reference)
│   ├── data-manager.js        # Old data management
│   ├── products-data.js       # Sample product data
│   └── orders-data.js         # Sample order data
│
└── 📁 Video/                  # Project videos/assets

```

## 🎯 File Purposes

### HTML Pages
- **index.html** - Main landing page with authentication
- **dashboard.html** - Customer dashboard with orders, wishlist, and shopping
- **admin.html** - Administrative panel for managing products and orders

### CSS Folder
All stylesheet files organized by purpose:
- Common styles, component-specific styles, page-specific styles

### JS Folder
All JavaScript functionality:
- Page-specific logic
- Shared features and utilities
- Uses localStorage for data persistence

### Docs Folder
- Project documentation
- Code structure guides

### Legacy Folder
- Deprecated files kept for reference
- Old data management system
- Sample data files

## 🚀 Loading Order

### index.html
```html
<link rel="stylesheet" href="css/styles.css">
<script src="js/script.js"></script>
```

### dashboard.html
```html
<link rel="stylesheet" href="css/styles.css">
<link rel="stylesheet" href="css/dashboard.css">
<link rel="stylesheet" href="css/shop.css">

<script src="legacy/products-data.js"></script>  <!-- Sample data -->
<script src="legacy/orders-data.js"></script>    <!-- Sample data -->
<script src="legacy/data-manager.js"></script>   <!-- Old data manager -->
<script src="js/dashboard.js"></script>
<script src="js/shop.js"></script>
<script src="js/features.js"></script>
```

### admin.html
```html
<link rel="stylesheet" href="css/styles.css">
<link rel="stylesheet" href="css/admin.css">

<script src="legacy/products-data.js"></script>  <!-- Sample data -->
<script src="legacy/orders-data.js"></script>    <!-- Sample data -->
<script src="legacy/data-manager.js"></script>   <!-- Old data manager -->
<script src="js/admin.js"></script>
```

## 📝 Notes

- **Legacy files** contain sample data for development/testing
- **localStorage** is used for data persistence
- All paths are relative to the project root
- Project is ready for local development and testing
