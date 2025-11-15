# U-BEST - Ulas Bakery Equipment And Supplies

## 🏪 About
Professional e-commerce website for Ulas Bakery Equipment And Supplies with complete authentication and shopping system. **All shopping features are available only to logged-in users** - the main page serves as a business preview/landing page.

## 📂 Project Structure
```
Ulas Bakery Equipment And Supplies/
├── index.html          # Landing/Preview page (public)
├── dashboard.html      # Shopping portal (authenticated users only)
├── styles.css          # Main website styles
├── dashboard.css       # Dashboard layout styles
├── shop.css            # Shop/products/cart styles
├── script.js           # Main website & authentication
├── dashboard.js        # Dashboard navigation & features
├── shop.js             # Products, cart, checkout logic
├── Photo/              # Product images
├── Video/              # Hero video (U-Best.mp4)
├── README.md           # This file
└── STRUCTURE.md        # Detailed architecture guide
```

## ✨ Features

### Landing Page (index.html) - Public Access
- **Hero Section** with background video
- **About the Business** information
- **Product Categories** preview (visual only, no shopping)
- **Sample Products** showcase
- **Customer Reviews** carousel
- **Location** with Google Maps integration
- **Contact Form** with validation
- **Authentication Modal** - Sign In / Sign Up

⚠️ **Note**: The landing page is for preview only. Users cannot shop or add items to cart without logging in.

### Shopping Portal (dashboard.html) - Authenticated Users Only
After signing in, users get access to the complete e-commerce platform:

#### 🛒 Shopping Features
- **Shop** - Browse all products with search, filters, and sorting
  - Real-time product search
  - Category filtering (Waffle Makers, Fryers, Steamers, etc.)
  - Sort by price or name
  - Add to cart / wishlist
  
- **Categories** - Browse products by category
  - 6 main categories with item counts
  - Click to filter shop view
  
- **Shopping Cart** - Full cart management
  - Add/remove items
  - Update quantities
  - Real-time price calculations
  - Tax calculation (12%)
  - Free shipping over ₱50,000
  - Secure checkout
  
- **My Orders** - Order history and tracking
  - View past orders
  - Track order status
  - Reorder functionality
  
- **Wishlist** - Save products for later
  - Add products to wishlist
  - Move to cart
  - Remove items

#### 👤 Account Management
- **Dashboard Overview** - Statistics and quick actions
- **Profile** - Update account information and password
- **Addresses** - Manage shipping/billing addresses
- **Payment Methods** - Manage payment cards and GCash
- **Support Tickets** - Customer support system

## 🚀 How to Use

### First Time User
1. Open `index.html` in a web browser
2. Browse the landing page to learn about U-BEST
3. Click the **"Sign In"** button in the header
4. Switch to the **"Sign Up"** tab
5. Fill in your information:
   - Full Name (at least 2 words)
   - Email address
   - Phone (Philippine format: 09XX XXX XXXX)
   - Password (at least 6 characters)
   - Confirm Password
6. Check "I agree to Terms & Conditions"
7. Click **"Create Account"**
8. You'll be automatically redirected to your dashboard
9. Start shopping! Browse products, add to cart, and checkout

### Returning User
1. Open `index.html`
2. Click **"Sign In"**
3. Enter your email and password
4. Click **"Sign In"**
5. You'll be redirected to the dashboard where you can continue shopping

### Shopping in the Dashboard
- **Browse Products**: Click "Shop" in the sidebar
  - Use search box to find specific items
  - Filter by category
  - Sort by price or name
  - Click "Add to Cart" on any product

- **View Cart**: Click "Cart" in the sidebar
  - Adjust quantities with +/- buttons
  - Remove unwanted items
  - Review order summary (subtotal, tax, shipping)
  - Click "Proceed to Checkout" to complete purchase

- **Track Orders**: Click "My Orders" to see your purchase history

- **Manage Wishlist**: Click "Wishlist" to see saved items

- **Account Settings**: Use Profile, Addresses, Payment sections

- **Sign Out**: Click user menu (top right) → Sign Out

## 🛠 Technical Details

### Technologies Used
- **HTML5** - Semantic markup
- **CSS3** - Grid, Flexbox, animations, custom scrollbar
- **JavaScript ES6** - LocalStorage API, form validation
- **Font Awesome 6.4.0** - Icons
- **Google Fonts** - Poppins (300-700)

### Data Storage
All user data is stored in browser's localStorage:
- `users` - Array of all registered users
- `currentUser` - Currently logged in user session

### User Data Structure
```javascript
{
  id: 1234567890,
  name: "John Doe",
  email: "john@example.com",
  phone: "0949 703 9472",
  password: "password123", // In production, this should be hashed
  createdAt: "2024-01-01T00:00:00.000Z",
  orders: [],
  wishlist: []
}
```

## 📱 Contact Information
- **Phone**: 0949 703 9472
- **Email**: ubeas2013@gmail.com
- **Facebook**: [Visit our page](https://www.facebook.com/profile.php?id=100057351553663)
- **Location**: 1034 P. Sanchez, Santa Cruz, Manila

## 🎨 Design Features
- Custom orange gradient scrollbar
- Smooth animations and transitions
- Responsive design (mobile-friendly)
- Password strength indicator
- Real-time form validation
- Loading states for async operations
- Notification system for user feedback

## 🔐 Security Notes
⚠️ **Important**: This is a demo project. In production:
- Passwords should be hashed (bcrypt, argon2)
- Use HTTPS for all communications
- Implement server-side validation
- Use secure session management
- Add CSRF protection
- Implement rate limiting

## 📝 Console Helper Functions
Open browser console and use these commands:

```javascript
showAllUsers()      // View all registered users
clearAllUsers()     // Delete all users (reset)
```

## 🎯 Next Steps for Production
1. Backend API integration
2. Real database (MongoDB, PostgreSQL)
3. Password hashing
4. Email verification
5. Two-factor authentication
6. Payment gateway integration
7. Order processing system
8. Admin dashboard
9. Product management system
10. Analytics integration

---

**Developed for U-BEST - Ulas Bakery Equipment And Supplies** 🍞
