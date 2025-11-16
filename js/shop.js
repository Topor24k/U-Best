// ============================================
// SHOP & PRODUCT DATA
// ============================================

// Use products from products-data.js or fallback
const products = typeof allProducts !== 'undefined' ? allProducts : [];

// Current active station
let currentStation = 'all';

// ============================================
// CART MANAGEMENT
// ============================================

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function getCart() {
    return cart;
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartBadge();
    updateCartDisplay();
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    saveCart();
    showNotification(`${product.name} added to cart!`, 'success');
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    showNotification('Item removed from cart', 'success');
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;
    
    item.quantity += change;
    
    if (item.quantity <= 0) {
        removeFromCart(productId);
    } else {
        saveCart();
    }
}

function clearCart() {
    cart = [];
    saveCart();
}

function updateCartBadge() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const badges = document.querySelectorAll('.cart-badge');
    badges.forEach(badge => {
        badge.textContent = totalItems;
        badge.style.display = totalItems > 0 ? 'inline-block' : 'none';
    });
}

function getCartTotal() {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

// ============================================
// PRODUCT DISPLAY
// ============================================

function renderProducts(filter = 'all', sort = 'featured', searchTerm = '') {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;
    
    let filteredProducts = [...products];
    
    // Filter by station
    if (currentStation !== 'all') {
        filteredProducts = filteredProducts.filter(p => p.station === currentStation || p.station === 'all');
    }
    
    // Filter by category
    if (filter !== 'all') {
        filteredProducts = filteredProducts.filter(p => p.category === filter);
    }
    
    // Filter by search term
    if (searchTerm) {
        filteredProducts = filteredProducts.filter(p => 
            p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }
    
    // Sort products
    switch (sort) {
        case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'name':
            filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'featured':
        default:
            // Sort by rating for featured
            filteredProducts.sort((a, b) => b.rating - a.rating);
            break;
    }
    
    if (filteredProducts.length === 0) {
        productsGrid.innerHTML = `
            <div class="cart-empty" style="grid-column: 1 / -1;">
                <i class="fas fa-box-open"></i>
                <h3>No Products Found</h3>
                <p>Try adjusting your filters or search term</p>
            </div>
        `;
        return;
    }
    
    productsGrid.innerHTML = filteredProducts.map(product => `
        <div class="product-card" data-product-id="${product.id}">
            ${product.oldPrice ? `<div class="product-badge sale">SALE</div>` : ''}
            <button class="btn-add-wishlist ${isInWishlist(product.id) ? 'active' : ''}" onclick="toggleWishlist(${product.id}, event)">
                <i class="${isInWishlist(product.id) ? 'fas' : 'far'} fa-heart"></i>
            </button>
            <div class="product-image" onclick="openProductQuickView(${product.id})">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3 onclick="openProductQuickView(${product.id})" style="cursor: pointer;">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-rating">
                    ${getStarRating(product.rating)}
                    <span>(${product.rating})</span>
                </div>
                <div class="product-price">
                    <span class="price">₱${product.price.toLocaleString()}</span>
                    ${product.oldPrice ? `<span class="old-price">₱${product.oldPrice.toLocaleString()}</span>` : ''}
                </div>
                <button class="btn-add-cart" onclick="addToCart(${product.id})">
                    <i class="fas fa-shopping-cart"></i> Add to Cart
                </button>
            </div>
        </div>
    `).join('');
}

function getStarRating(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

// ============================================
// CART DISPLAY
// ============================================

function updateCartDisplay() {
    const cartItems = document.getElementById('cartItems');
    if (!cartItems) return;
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="cart-empty">
                <i class="fas fa-shopping-cart"></i>
                <h3>Your Cart is Empty</h3>
                <p>Start adding some products to your cart!</p>
                <button class="btn-checkout" onclick="document.querySelector('[data-section=shop]').click()">
                    <i class="fas fa-store"></i> Browse Products
                </button>
            </div>
        `;
        updateCartSummary();
        return;
    }
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item" data-cart-id="${item.id}">
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-details">
                <h3>${item.name}</h3>
                <p class="cart-item-price">₱${item.price.toLocaleString()}</p>
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">
                        <i class="fas fa-minus"></i>
                    </button>
                    <span class="quantity-value">${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
            </div>
            <div class="cart-item-actions">
                <p style="font-size: 1.2rem; font-weight: 700; color: #FF6B35;">
                    ₱${(item.price * item.quantity).toLocaleString()}
                </p>
                <button class="btn-remove-cart" onclick="removeFromCart(${item.id})">
                    <i class="fas fa-trash"></i> Remove
                </button>
            </div>
        </div>
    `).join('');
    
    updateCartSummary();
}

function updateCartSummary() {
    const subtotal = getCartTotal();
    const tax = subtotal * 0.12;
    const shipping = subtotal >= 50000 ? 0 : (subtotal > 0 ? 500 : 0);
    const total = subtotal + tax + shipping;
    
    const subtotalEl = document.getElementById('cartSubtotal');
    const taxEl = document.getElementById('cartTax');
    const shippingEl = document.getElementById('cartShipping');
    const totalEl = document.getElementById('cartTotal');
    
    if (subtotalEl) subtotalEl.textContent = `₱${subtotal.toLocaleString()}`;
    if (taxEl) taxEl.textContent = `₱${tax.toLocaleString()}`;
    if (shippingEl) shippingEl.textContent = shipping === 0 ? 'Free' : `₱${shipping.toLocaleString()}`;
    if (totalEl) totalEl.textContent = `₱${total.toLocaleString()}`;
}

// ============================================
// WISHLIST
// ============================================

let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

function isInWishlist(productId) {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    return wishlist.some(item => item.id === productId);
}

function toggleWishlist(productId, event) {
    if (event) {
        event.stopPropagation();
    }
    
    if (isInWishlist(productId)) {
        // Remove from wishlist
        let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
        const product = wishlist.find(item => item.id === productId);
        wishlist = wishlist.filter(item => item.id !== productId);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        
        if (product) {
            showNotification(`${product.name} removed from wishlist`, 'info');
        }
    } else {
        // Add to wishlist
        addToWishlist(productId);
    }
    
    // Re-render products to update heart icon
    const categoryFilter = document.getElementById('categoryFilter');
    const sortFilter = document.getElementById('sortFilter');
    const searchInput = document.getElementById('productSearch');
    
    renderProducts(
        categoryFilter ? categoryFilter.value : 'all',
        sortFilter ? sortFilter.value : 'featured',
        searchInput ? searchInput.value : ''
    );
    
    // Update favorites panel if it exists
    if (typeof updateFavoritesPanel === 'function') {
        updateFavoritesPanel();
    }
    if (typeof updateFavoritesBadge === 'function') {
        updateFavoritesBadge();
    }
    if (typeof loadWishlistSection === 'function') {
        loadWishlistSection();
    }
    
    // Update wishlist badge in sidebar
    const wishlistBadge = document.querySelector('.nav-item[data-section="wishlist"] .nav-badge');
    if (wishlistBadge) {
        const updatedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
        wishlistBadge.textContent = updatedWishlist.length;
    }
}

function addToWishlist(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    if (wishlist.find(item => item.id === productId)) {
        showNotification('Item already in wishlist', 'info');
        return;
    }
    
    wishlist.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        description: product.description || 'Premium bakery equipment'
    });
    
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    showNotification(`${product.name} added to wishlist!`, 'success');
    
    // Update wishlist badge
    const badges = document.querySelectorAll('.nav-item[data-section="wishlist"] .nav-badge');
    badges.forEach(badge => {
        badge.textContent = wishlist.length;
    });
}

// ============================================
// FILTER & SEARCH
// ============================================

function initShopFilters() {
    const searchInput = document.getElementById('productSearch');
    const categoryFilter = document.getElementById('categoryFilter');
    const sortFilter = document.getElementById('sortFilter');
    
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const search = e.target.value;
            const category = categoryFilter ? categoryFilter.value : 'all';
            const sort = sortFilter ? sortFilter.value : 'featured';
            renderProducts(category, sort, search);
        });
    }
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', (e) => {
            const category = e.target.value;
            const search = searchInput ? searchInput.value : '';
            const sort = sortFilter ? sortFilter.value : 'featured';
            renderProducts(category, sort, search);
        });
    }
    
    if (sortFilter) {
        sortFilter.addEventListener('change', (e) => {
            const sort = e.target.value;
            const category = categoryFilter ? categoryFilter.value : 'all';
            const search = searchInput ? searchInput.value : '';
            renderProducts(category, sort, search);
        });
    }
}

// ============================================
// CATEGORIES
// ============================================

function initCategories() {
    const categoryCards = document.querySelectorAll('.category-card');
    
    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            const category = card.getAttribute('data-category');
            
            // Switch to shop section
            document.querySelector('[data-section="shop"]').click();
            
            // Set category filter
            setTimeout(() => {
                const categoryFilter = document.getElementById('categoryFilter');
                if (categoryFilter) {
                    categoryFilter.value = category;
                    categoryFilter.dispatchEvent(new Event('change'));
                }
            }, 100);
        });
    });
}

// ============================================
// CHECKOUT
// ============================================

function initCheckout() {
    const checkoutBtn = document.getElementById('checkoutBtn');
    
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cart.length === 0) {
                showNotification('Your cart is empty', 'error');
                return;
            }
            
            const total = getCartTotal();
            const tax = total * 0.12;
            const shipping = total >= 50000 ? 0 : 500;
            const grandTotal = total + tax + shipping;
            
            // Create order
            const order = {
                id: `ORD-${Date.now()}`,
                items: [...cart],
                subtotal: total,
                tax: tax,
                shipping: shipping,
                total: grandTotal,
                date: new Date().toISOString(),
                status: 'processing'
            };
            
            // Save order to user's orders
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            
            if (currentUser) {
                const userIndex = users.findIndex(u => u.email === currentUser.email);
                if (userIndex !== -1) {
                    if (!users[userIndex].orders) {
                        users[userIndex].orders = [];
                    }
                    users[userIndex].orders.push(order);
                    localStorage.setItem('users', JSON.stringify(users));
                }
            }
            
            // Clear cart
            clearCart();
            
            showNotification('Order placed successfully! Thank you for your purchase.', 'success');
            
            // Switch to orders section
            setTimeout(() => {
                document.querySelector('[data-section="orders"]').click();
            }, 1500);
        });
    }
}

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Wait a bit for dashboard.js to load
    setTimeout(() => {
        renderProducts();
        updateCartBadge();
        updateCartDisplay();
        initShopFilters();
        initCategories();
        initCheckout();
        initStationTabs();
    }, 100);
});

// Expose search function globally for header search
window.handleSearch = function(searchTerm) {
    const categoryFilter = document.getElementById('categoryFilter');
    const sortFilter = document.getElementById('sortFilter');
    const category = categoryFilter ? categoryFilter.value : 'all';
    const sort = sortFilter ? sortFilter.value : 'featured';
    renderProducts(category, sort, searchTerm);
};

// Initialize station tabs
function initStationTabs() {
    const stationTabs = document.querySelectorAll('.station-tab');
    
    stationTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            stationTabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // Update current station
            currentStation = tab.getAttribute('data-station');
            
            // Re-render products with current filters
            const categoryFilter = document.getElementById('categoryFilter');
            const sortFilter = document.getElementById('sortFilter');
            const searchInput = document.getElementById('productSearch');
            
            const category = categoryFilter ? categoryFilter.value : 'all';
            const sort = sortFilter ? sortFilter.value : 'featured';
            const search = searchInput ? searchInput.value : '';
            
            renderProducts(category, sort, search);
        });
    });
}
