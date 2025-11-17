// ============================================
// SHOP & PRODUCT DATA
// ============================================

// Load products from localStorage if available (to persist stock changes), otherwise use default data
function loadProducts() {
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
        try {
            return JSON.parse(savedProducts);
        } catch (e) {
            console.error('Error loading saved products:', e);
        }
    }
    // First time load - filter products with badges only, then save to localStorage
    if (typeof allProducts !== 'undefined') {
        const productsWithBadges = allProducts.filter(p => p.badge !== null && p.badge !== undefined);
        localStorage.setItem('products', JSON.stringify(productsWithBadges));
        console.log(`Saved ${productsWithBadges.length} products with badges to localStorage`);
        return productsWithBadges;
    }
    return [];
}

const products = loadProducts();

// Current active station
let currentStation = 'all';

// ============================================
// CART MANAGEMENT
// ============================================

function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartBadge();
    updateCartDisplay();
}

function addToCart(productId) {
    console.log('addToCart called with ID:', productId);
    
    // Reload products from localStorage to get updated stock
    const products = loadProducts();
    const product = products.find(p => p.id === productId);
    
    console.log('Product found:', product);
    
    if (!product) {
        console.error('Product not found!');
        return;
    }
    
    // Check stock availability
    if (!product.available || product.stock === 0) {
        console.log('Out of stock');
        showNotification('This product is out of stock', 'error');
        return;
    }
    
    // Get fresh cart from localStorage
    let cart = getCart();
    const existingItem = cart.find(item => item.id === productId);
    
    // Check if adding would exceed stock
    const currentQuantity = existingItem ? existingItem.quantity : 0;
    if (currentQuantity + 1 > product.stock) {
        console.log('Stock limit reached');
        showNotification(`Only ${product.stock} items available in stock`, 'warning');
        return;
    }
    
    if (existingItem) {
        existingItem.quantity += 1;
        saveCart(cart);
        console.log('Cart updated:', product.name);
        showNotification(`${product.name} quantity updated in cart!`, 'success');
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
        saveCart(cart);
        console.log('Added to cart:', product.name);
        showNotification(`${product.name} added to cart!`, 'success');
    }
    
    // Update cart badges and panel if available
    if (typeof updateCartBadges === 'function') {
        updateCartBadges();
    }
    if (typeof updateCartPanel === 'function') {
        updateCartPanel();
    }
}

function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId);
    saveCart(cart);
    showNotification('Item removed from cart', 'success');
}

function updateQuantity(productId, change) {
    let cart = getCart();
    const item = cart.find(item => item.id === productId);
    if (!item) return;
    
    item.quantity += change;
    
    if (item.quantity <= 0) {
        cart = cart.filter(i => i.id !== productId);
        showNotification('Item removed from cart', 'success');
    }
    
    saveCart(cart);
}

function clearCart() {
    saveCart([]);
}

function updateCartBadge() {
    const cart = getCart();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const badges = document.querySelectorAll('.cart-badge');
    badges.forEach(badge => {
        badge.textContent = totalItems;
        badge.style.display = totalItems > 0 ? 'inline-block' : 'none';
    });
}

function getCartTotal() {
    const cart = getCart();
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

// ============================================
// PRODUCT DISPLAY
// ============================================

function renderProducts(filter = 'all', sort = 'featured', searchTerm = '') {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;
    
    // Reload products from localStorage to get updated stock
    const products = loadProducts();
    let filteredProducts = [...products];
    
    // Filter by station with specific badge requirements
    if (currentStation === 'new-arrivals') {
        // New Arrivals: Only products with 'new' badge
        filteredProducts = filteredProducts.filter(p => p.badge === 'new');
    } else if (currentStation === 'best-deals') {
        // Best Deals: Only products with 'sale' badge
        filteredProducts = filteredProducts.filter(p => p.badge === 'sale');
    } else if (currentStation === 'popular') {
        // Popular: Only products with 'hot' badge
        filteredProducts = filteredProducts.filter(p => p.badge === 'hot');
    } else if (currentStation === 'pautang-deals') {
        // Pautang Deals: Only bundle products
        filteredProducts = filteredProducts.filter(p => p.badge === 'bundle' || p.station === 'pautang-deals');
    } else if (currentStation === 'all') {
        // All Products: Show all products with badges (already filtered in localStorage)
        // No additional filtering needed
    } else {
        // Other stations use station field
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
    
    productsGrid.innerHTML = filteredProducts.map(product => {
        // Determine badge type
        let badgeHTML = '';
        if (product.badge === 'new') {
            badgeHTML = '<div class="product-badge new">NEW</div>';
        } else if (product.badge === 'hot') {
            badgeHTML = '<div class="product-badge hot">HOT</div>';
        } else if (product.badge === 'sale') {
            badgeHTML = '<div class="product-badge sale">SALE</div>';
        } else if (product.badge === 'bundle') {
            badgeHTML = '<div class="product-badge bundle">BUNDLE</div>';
        }
        
        // Stock status
        const stockClass = product.stock === 0 ? 'out' : (product.stock <= 5 ? 'low' : '');
        const stockText = product.stock === 0 ? 'Out of Stock' : product.stock;
        
        // Availability badge
        const availabilityHTML = product.available 
            ? '<div class="product-availability in-stock"><i class="fas fa-check-circle"></i> Available</div>'
            : '<div class="product-availability out-of-stock"><i class="fas fa-times-circle"></i> Not Available</div>';
        
        return `
            <div class="product-card" data-product-id="${product.id}">
                ${badgeHTML}
                <button class="btn-add-wishlist ${isInWishlist(product.id) ? 'active' : ''}" onclick="toggleWishlist(${product.id}, event)">
                    <i class="${isInWishlist(product.id) ? 'fas' : 'far'} fa-heart"></i>
                </button>
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                    ${availabilityHTML}
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <div class="product-rating" onclick="openReviewsModal(${product.id})" style="cursor: pointer;" title="Click to see all reviews">
                        ${getStarRating(product.rating)}
                        <span>(${product.rating})</span>
                    </div>
                    <div class="product-stock">
                        <span class="stock-label">Stock:</span>
                        <span class="stock-value ${stockClass}">${stockText}</span>
                    </div>
                    <div class="product-price">
                        <span class="price">₱${product.price.toLocaleString()}</span>
                        ${product.oldPrice ? `<span class="old-price">₱${product.oldPrice.toLocaleString()}</span>` : ''}
                    </div>
                    <div class="product-actions">
                        <button class="btn-add-cart" onclick="addToCart(${product.id})" ${!product.available || product.stock === 0 ? 'disabled' : ''}>
                            <i class="fas fa-shopping-cart"></i> ${product.available && product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                        </button>
                        <button class="btn-view-reviews" onclick="openReviewsModal(${product.id})">
                            <i class="fas fa-comments"></i> View ${product.reviews ? product.reviews.length : 0} Reviews
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
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
    
    // Get cart from localStorage
    const cart = getCart();
    
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
    
    // Always get fresh wishlist from localStorage
    let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    
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
        initReviewsModal();
    }, 100);
});

// ============================================
// CUSTOMER REVIEWS MODAL
// ============================================

function openReviewsModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const modal = document.getElementById('reviewsModal');
    if (!modal) return;
    
    // Populate product summary
    document.getElementById('modalProductName').textContent = product.name;
    document.getElementById('modalProductDesc').textContent = product.description;
    document.getElementById('modalProductImage').src = product.image;
    document.getElementById('modalProductImage').alt = product.name;
    
    // Calculate average rating
    const avgRating = product.rating;
    const reviewCount = product.reviews ? product.reviews.length : 0;
    
    document.getElementById('modalRatingStars').innerHTML = getStarRating(avgRating);
    document.getElementById('modalRatingValue').textContent = avgRating.toFixed(1);
    document.getElementById('modalReviewCount').textContent = `(${reviewCount} ${reviewCount === 1 ? 'review' : 'reviews'})`;
    
    // Populate reviews list
    const reviewsList = document.getElementById('reviewsList');
    
    if (!product.reviews || product.reviews.length === 0) {
        reviewsList.innerHTML = `
            <div class="no-reviews">
                <i class="fas fa-comment-slash"></i>
                <h3>No Reviews Yet</h3>
                <p>Be the first to review this product!</p>
            </div>
        `;
    } else {
        reviewsList.innerHTML = product.reviews.map(review => `
            <div class="review-item">
                <div class="review-item-header">
                    <div class="review-user-info">
                        <div class="review-avatar">
                            <i class="fas fa-user"></i>
                        </div>
                        <div class="review-user-details">
                            <h4>
                                ${review.user}
                                ${review.verified ? '<span class="verified-badge"><i class="fas fa-check-circle"></i> Verified</span>' : ''}
                            </h4>
                            <p class="review-user-location">
                                <i class="fas fa-map-marker-alt"></i> ${review.location}
                            </p>
                        </div>
                    </div>
                    <span class="review-date">${formatReviewDate(review.date)}</span>
                </div>
                <div class="review-rating">
                    ${getStarRating(review.rating)}
                </div>
                <p class="review-comment">${review.comment}</p>
            </div>
        `).join('');
    }
    
    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeReviewsModal() {
    const modal = document.getElementById('reviewsModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function formatReviewDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
        return 'Today';
    } else if (diffDays === 1) {
        return 'Yesterday';
    } else if (diffDays < 7) {
        return `${diffDays} days ago`;
    } else if (diffDays < 30) {
        const weeks = Math.floor(diffDays / 7);
        return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
    } else {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }
}

function initReviewsModal() {
    const modal = document.getElementById('reviewsModal');
    if (!modal) return;
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeReviewsModal();
        }
    });
    
    // Close modal with close button
    const closeBtn = document.getElementById('closeReviewsModal');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeReviewsModal);
    }
    
    // Close modal with ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeReviewsModal();
        }
    });
}

// Make functions globally accessible
window.openReviewsModal = openReviewsModal;
window.closeReviewsModal = closeReviewsModal;

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

// ============================================
// NOTIFICATION SYSTEM (Fallback if dashboard.js not loaded)
// ============================================

if (typeof showNotification === 'undefined') {
    window.showNotification = function(message, type = 'info') {
        console.log('showNotification called:', message, type);
        
        // Remove existing notifications
        const existingNotification = document.querySelector('.dashboard-notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `dashboard-notification notification-${type}`;
        
        const icon = type === 'success' ? 'fa-check-circle' : 
                     type === 'error' ? 'fa-exclamation-circle' :
                     type === 'warning' ? 'fa-exclamation-triangle' :
                     'fa-info-circle';
        
        notification.innerHTML = `
            <i class="fas ${icon}"></i>
            <span>${message}</span>
            <button class="notification-close"><i class="fas fa-times"></i></button>
        `;
        
        console.log('Appending notification to body');
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => {
            console.log('Adding show class');
            notification.classList.add('show');
        }, 100);
        
        // Close button
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        });
        
        // Auto hide after 5 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 5000);
    };
}
