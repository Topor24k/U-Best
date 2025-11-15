# 🎯 U-BEST E-COMMERCE STRUCTURE

## Overview
The website is now restructured with proper separation between public preview and authenticated user shopping experience.

---

## 📄 PAGE STRUCTURE

### **index.html** - Landing/Preview Page (Public)
**Purpose**: Business information and preview only - NO shopping functionality

**Content**:
- Hero section with business video
- About the business
- Product categories showcase (visual only)
- Sample products display (NO cart buttons - just preview)
- Customer reviews
- Location with Google Maps
- Contact form
- Authentication modal (Sign In / Sign Up)

**What Users Can Do**:
- ✅ Learn about U-BEST business
- ✅ View what types of products are available
- ✅ See location and contact info
- ✅ Create account or sign in
- ❌ NO shopping cart
- ❌ NO add to cart
- ❌ NO checkout

**When**: Users see this when they first visit OR when not logged in

---

### **dashboard.html** - User Shopping Portal (Authenticated Only)
**Purpose**: Complete e-commerce experience for logged-in users

**Navigation Sections**:

#### **🛒 SHOPPING SECTIONS** (Main Features)
1. **Shop** - Browse all products
   - Search products
   - Filter by category
   - Sort by price/name
   - Add to cart
   - Add to wishlist

2. **Categories** - Browse by product type
   - Waffle Makers
   - Deep Fryers
   - Steamers
   - Griddles
   - Mixers
   - Ovens

3. **Cart** - Shopping cart & checkout
   - View cart items
   - Update quantities
   - Remove items
   - See order summary (subtotal, tax, shipping)
   - Proceed to checkout

4. **My Orders** - Order history
   - View past orders
   - Track order status
   - Reorder items

5. **Wishlist** - Saved products
   - View saved items
   - Move to cart
   - Remove from wishlist

---

#### **👤 ACCOUNT SECTIONS**
6. **Dashboard** - Account overview
   - Statistics (total orders, pending, wishlist, total spent)
   - Recent orders
   - Quick actions

7. **Profile** - Account settings
   - Update name, email, phone
   - Change password
   - Profile picture

8. **Addresses** - Manage addresses
   - Default address
   - Billing addresses
   - Add new addresses

9. **Payment Methods** - Manage payments
   - Saved cards
   - GCash
   - Add new payment methods

10. **Support Tickets** - Customer support
    - View tickets
    - Create new tickets
    - Track support status

**When**: Users see this ONLY after signing in/signing up

---

## 🔐 AUTHENTICATION FLOW

```
User visits website
       ↓
   index.html (Preview)
       ↓
   Clicks "Sign In"
       ↓
   Auth Modal Opens
       ↓
   ┌─────────────┬────────────┐
   │   Sign In   │  Sign Up   │
   └─────────────┴────────────┘
           ↓
   Account Created/Authenticated
           ↓
   Redirect to dashboard.html
           ↓
   SHOP SECTION (default view)
   - User can now browse and shop
   - All e-commerce features available
```

---

## 🛍️ SHOPPING FLOW

```
User logged in → dashboard.html
       ↓
Browse Shop (filters, search)
       ↓
Add products to Cart
       ↓
View Cart
       ↓
Update quantities/Remove items
       ↓
Proceed to Checkout
       ↓
Order Created
       ↓
Cart Cleared
       ↓
View in "My Orders" section
```

---

## 📊 DATA STORAGE (localStorage)

### User Authentication
```javascript
currentUser: {
  name, email, phone, createdAt
}

users: [{
  id, name, email, phone, password,
  createdAt, orders[], wishlist[]
}]
```

### Shopping Cart
```javascript
cart: [{
  id, name, price, image, quantity
}]
```

### Wishlist
```javascript
wishlist: [{
  id, name, price, image
}]
```

---

## 🎨 FILES STRUCTURE

```
Project/
├── index.html          # Landing page (public)
├── dashboard.html      # Shopping portal (authenticated)
├── styles.css          # Main website styles
├── dashboard.css       # Dashboard layout styles
├── shop.css            # Shop/products/cart styles
├── script.js           # Main website + auth logic
├── dashboard.js        # Dashboard navigation + features
├── shop.js             # Products, cart, checkout logic
├── Photo/              # Product images
│   ├── Belgian Waffle Maker.jpg
│   ├── 3 in 1 Burger-Fryer-Steamer.jpg
│   ├── Burger Griddle.jpg
│   ├── 2 x 16 Siomai Steamer.jpg
│   ├── 3 x 16 Siomai Steamer.jpg
│   └── Deep Fryer.jpg
└── Video/
    └── U-Best.mp4
```

---

## 🔄 KEY DIFFERENCES

### Before (Old Structure)
- ❌ Shopping on index.html (public)
- ❌ Anyone could add to cart without login
- ❌ Dashboard was just account info

### After (New Structure)
- ✅ index.html is ONLY preview/landing
- ✅ Shopping requires login
- ✅ Dashboard IS the store
- ✅ All transactions user-specific
- ✅ Orders tied to user accounts

---

## 🚀 HOW TO USE

### For New Users:
1. Visit `index.html`
2. Browse business info (no shopping yet)
3. Click "Sign In" button
4. Create account (Sign Up tab)
5. Automatically redirected to dashboard
6. Start shopping in Shop section

### For Returning Users:
1. Visit `index.html`
2. Click "Sign In"
3. Enter credentials
4. Redirected to dashboard
5. Continue shopping

### Navigation in Dashboard:
- **Want to shop?** → Click "Shop" or "Categories"
- **Check cart?** → Click "Cart"
- **View orders?** → Click "My Orders"
- **Account settings?** → Click "Profile", "Addresses", etc.
- **Sign out?** → User menu (top right) → Sign Out

---

## 💡 FEATURES

### Shop Section
- ✅ Real-time product search
- ✅ Category filtering
- ✅ Price sorting
- ✅ Add to cart with one click
- ✅ Add to wishlist
- ✅ Product ratings display
- ✅ Sale/New/Hot badges

### Cart Section
- ✅ Quantity controls (+/-)
- ✅ Remove items
- ✅ Automatic calculations
- ✅ Tax calculation (12%)
- ✅ Free shipping over ₱50,000
- ✅ Order summary
- ✅ Proceed to checkout

### Checkout
- ✅ Creates order
- ✅ Saves to user's order history
- ✅ Clears cart
- ✅ Shows success notification
- ✅ Auto-navigates to Orders section

---

## 📱 RESPONSIVE DESIGN
- ✅ Mobile-friendly
- ✅ Tablet optimized
- ✅ Desktop layouts
- ✅ Touch-friendly buttons
- ✅ Collapsible navigation on mobile

---

## 🎯 BUSINESS LOGIC

### Price Display
- All prices in Philippine Peso (₱)
- Show original price if on sale
- Automatic number formatting with commas

### Cart Badge
- Shows total item count
- Updates in real-time
- Hidden when cart is empty

### Order Creation
- Unique order ID: `ORD-{timestamp}`
- Includes all cart items
- Calculates taxes and shipping
- Stores in user's account
- Preserves order history

---

## 🔒 SECURITY NOTES
⚠️ **Current Implementation** (Demo/Development):
- Passwords stored in plain text
- Data in localStorage (client-side)

🔐 **For Production** (Required):
- Hash passwords (bcrypt)
- Backend API required
- Database storage
- JWT authentication
- HTTPS only
- Server-side validation

---

## ✨ USER EXPERIENCE

### First Visit
```
Landing Page → "Wow, nice products!" 
→ "Want to buy? Sign up!" 
→ Create account 
→ Instant access to shop
→ Browse & purchase
```

### Return Visit
```
Landing Page → Sign In 
→ Dashboard (Shop section) 
→ Cart shows previous items (if any)
→ Continue shopping
```

---

**This structure ensures**:
- ✅ Better security (shopping requires authentication)
- ✅ Personalized experience
- ✅ Order history per user
- ✅ Professional workflow
- ✅ Clear separation: Preview vs. Shopping
