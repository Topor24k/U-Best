// ============================================
// DASHBOARD JAVASCRIPT
// ============================================

// Check if user is logged in
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    initializeDashboard();
    initSidebarToggle();
    initHeaderSearch();
    updateCartBadges();
    initHeroRotation();
    initCartPanel();
    initFeaturedProducts();
    initOrdersSystem();
    loadDeliveredOrders();
    initStarRating();
    initFavoritesPanel();
    initNotificationsPanel();
    addSampleMessageNotification();
    loadWishlistSection();
    initAdvancedSearch();
});

// Authentication Check
function checkAuth() {
    const currentUser = localStorage.getItem('currentUser');
    
    if (!currentUser) {
        // Redirect to main page if not logged in
        window.location.href = 'index.html';
        return;
    }
    
    try {
        const user = JSON.parse(currentUser);
        updateUserInfo(user);
    } catch (error) {
        console.error('Error loading user data:', error);
        window.location.href = 'index.html';
    }
}

// Update User Information
function updateUserInfo(user) {
    const userName = user.name || 'Guest User';
    const userEmail = user.email || 'guest@example.com';
    
    // Update header
    const headerUserName = document.getElementById('headerUserName');
    if (headerUserName) headerUserName.textContent = userName;
    
    // Update profile section
    const profileUserName = document.getElementById('profileUserName');
    const profileUserEmail = document.getElementById('profileUserEmail');
    const profileNameInput = document.getElementById('profileName');
    const profileEmailInput = document.getElementById('profileEmail');
    const profilePhoneInput = document.getElementById('profilePhone');
    
    if (profileUserName) profileUserName.textContent = userName;
    if (profileUserEmail) profileUserEmail.textContent = userEmail;
    if (profileNameInput) profileNameInput.value = userName;
    if (profileEmailInput) profileEmailInput.value = userEmail;
    if (profilePhoneInput) profilePhoneInput.value = user.phone || '';
}

// Initialize Dashboard
function initializeDashboard() {
    // Navigation
    initNavigation();
    
    // User menu dropdown
    initUserMenu();
    
    // Filter buttons
    initFilterButtons();
    
    // Remove wishlist items
    initWishlistRemove();
    
    // Profile form
    initProfileForm();
    
    // Sign out
    initSignOut();
    
    // Show notification functions
    initNotifications();
}

// Sidebar Toggle
function initSidebarToggle() {
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('dashboardSidebar');
    
    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('collapsed');
            
            // Save preference to localStorage
            const isCollapsed = sidebar.classList.contains('collapsed');
            localStorage.setItem('sidebarCollapsed', isCollapsed);
        });
        
        // Restore sidebar state from localStorage
        const savedState = localStorage.getItem('sidebarCollapsed');
        if (savedState === 'true') {
            sidebar.classList.add('collapsed');
        }
    }
    
    // Profile submenu toggle
    const profileToggle = document.getElementById('profileToggle');
    const profileSubmenu = document.getElementById('profileSubmenu');
    
    if (profileToggle && profileSubmenu) {
        profileToggle.addEventListener('click', (e) => {
            // Check if clicking on the arrow or the parent item
            const isArrowClick = e.target.classList.contains('submenu-arrow') || 
                                 e.target.closest('.submenu-arrow');
            
            if (isArrowClick) {
                e.preventDefault();
                e.stopPropagation();
                
                profileToggle.classList.toggle('open');
                profileSubmenu.classList.toggle('open');
                
                // Save submenu state
                const isOpen = profileSubmenu.classList.contains('open');
                localStorage.setItem('profileSubmenuOpen', isOpen);
            }
            // If not clicking arrow, allow normal navigation to profile
        });
        
        // Restore submenu state
        const submenuState = localStorage.getItem('profileSubmenuOpen');
        if (submenuState === 'true') {
            profileToggle.classList.add('open');
            profileSubmenu.classList.add('open');
        }
    }
}

// Navigation between sections
function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item[data-section]');
    const sections = document.querySelectorAll('.content-section');
    
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = item.getAttribute('data-section');
            
            // Remove active class from all nav items and sections
            navItems.forEach(nav => nav.classList.remove('active'));
            sections.forEach(section => section.classList.remove('active'));
            
            // Add active class to clicked nav item and corresponding section
            item.classList.add('active');
            const targetSection = document.getElementById(`${sectionId}-section`);
            if (targetSection) {
                targetSection.classList.add('active');
                window.scrollTo({ top: 0, behavior: 'smooth' });
                
                // Load section-specific content
                if (sectionId === 'wishlist') {
                    loadWishlistSection();
                }
            }
        });
    });
    
    // Handle hash navigation
    const hash = window.location.hash.replace('#', '');
    if (hash) {
        const targetNav = document.querySelector(`.nav-item[data-section="${hash}"]`);
        if (targetNav) {
            targetNav.click();
        }
    }
}

// User menu dropdown
function initUserMenu() {
    const userMenuBtn = document.getElementById('userMenuBtn');
    const userDropdown = document.getElementById('userDropdown');
    
    if (userMenuBtn && userDropdown) {
        userMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            userDropdown.classList.toggle('active');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!userDropdown.contains(e.target) && !userMenuBtn.contains(e.target)) {
                userDropdown.classList.remove('active');
            }
        });
    }
}

// Filter buttons
function initFilterButtons() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            showNotification(`Filtering orders by: ${this.textContent}`, 'info');
        });
    });
}

// Wishlist remove functionality
function initWishlistRemove() {
    const removeButtons = document.querySelectorAll('.remove-wishlist');
    
    removeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const item = this.closest('.wishlist-item');
            const productName = item.querySelector('h3').textContent;
            
            if (confirm(`Remove "${productName}" from wishlist?`)) {
                item.style.animation = 'fadeOut 0.3s ease';
                setTimeout(() => {
                    item.remove();
                    showNotification(`${productName} removed from wishlist`, 'success');
                    updateWishlistBadge();
                }, 300);
            }
        });
    });
}

// Update wishlist badge count
function updateWishlistBadge() {
    const wishlistItems = document.querySelectorAll('.wishlist-item');
    const badges = document.querySelectorAll('.nav-item[data-section="wishlist"] .nav-badge');
    const count = wishlistItems.length;
    
    badges.forEach(badge => {
        badge.textContent = count;
    });
}

// Profile form
function initProfileForm() {
    const profileForm = document.getElementById('profileForm');
    
    if (profileForm) {
        profileForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('profileName').value;
            const email = document.getElementById('profileEmail').value;
            const phone = document.getElementById('profilePhone').value;
            const currentPassword = document.getElementById('currentPassword').value;
            const newPassword = document.getElementById('newPassword').value;
            const confirmNewPassword = document.getElementById('confirmNewPassword').value;
            
            // Validate password change if fields are filled
            if (newPassword || confirmNewPassword) {
                if (!currentPassword) {
                    showNotification('Please enter your current password', 'error');
                    return;
                }
                
                if (newPassword !== confirmNewPassword) {
                    showNotification('New passwords do not match', 'error');
                    return;
                }
                
                if (newPassword.length < 6) {
                    showNotification('Password must be at least 6 characters', 'error');
                    return;
                }
            }
            
            // Update user in localStorage
            try {
                const currentUser = JSON.parse(localStorage.getItem('currentUser'));
                const users = JSON.parse(localStorage.getItem('users') || '[]');
                
                // Update current user
                currentUser.name = name;
                currentUser.email = email;
                currentUser.phone = phone;
                
                // Update in users array
                const userIndex = users.findIndex(u => u.email === currentUser.email);
                if (userIndex !== -1) {
                    users[userIndex] = { ...users[userIndex], name, email, phone };
                    if (newPassword) {
                        users[userIndex].password = newPassword;
                    }
                    localStorage.setItem('users', JSON.stringify(users));
                }
                
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
                
                // Update UI
                updateUserInfo(currentUser);
                
                // Clear password fields
                document.getElementById('currentPassword').value = '';
                document.getElementById('newPassword').value = '';
                document.getElementById('confirmNewPassword').value = '';
                
                showNotification('Profile updated successfully!', 'success');
            } catch (error) {
                console.error('Error updating profile:', error);
                showNotification('Failed to update profile', 'error');
            }
        });
    }
}

// Sign out
function initSignOut() {
    const signOutLink = document.getElementById('signOutLink');
    
    if (signOutLink) {
        signOutLink.addEventListener('click', (e) => {
            e.preventDefault();
            
            if (confirm('Are you sure you want to sign out?')) {
                localStorage.removeItem('currentUser');
                showNotification('Signed out successfully', 'success');
                
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1000);
            }
        });
    }
}

// Notification System
function initNotifications() {
    // Add notification styles if not already added
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .dashboard-notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background: white;
                padding: 15px 20px;
                border-radius: 10px;
                box-shadow: 0 10px 25px rgba(0,0,0,0.2);
                display: flex;
                align-items: center;
                gap: 12px;
                z-index: 10000;
                transform: translateX(400px);
                transition: transform 0.3s ease;
                max-width: 350px;
            }
            
            .dashboard-notification.show {
                transform: translateX(0);
            }
            
            .dashboard-notification i:first-child {
                font-size: 1.5rem;
            }
            
            .dashboard-notification.notification-success {
                border-left: 4px solid #4CAF50;
            }
            
            .dashboard-notification.notification-success i:first-child {
                color: #4CAF50;
            }
            
            .dashboard-notification.notification-error {
                border-left: 4px solid #F44336;
            }
            
            .dashboard-notification.notification-error i:first-child {
                color: #F44336;
            }
            
            .dashboard-notification.notification-info {
                border-left: 4px solid #2196F3;
            }
            
            .dashboard-notification.notification-info i:first-child {
                color: #2196F3;
            }
            
            .dashboard-notification span {
                flex: 1;
                color: #333;
                font-weight: 500;
            }
            
            .notification-close {
                background: transparent;
                border: none;
                color: #999;
                cursor: pointer;
                font-size: 1.2rem;
                padding: 0;
                transition: color 0.3s ease;
            }
            
            .notification-close:hover {
                color: #333;
            }
            
            @keyframes fadeOut {
                from { opacity: 1; transform: scale(1); }
                to { opacity: 0; transform: scale(0.8); }
            }
        `;
        document.head.appendChild(style);
    }
}

function showNotification(message, type = 'info') {
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
                 'fa-info-circle';
    
    notification.innerHTML = `
        <i class="fas ${icon}"></i>
        <span>${message}</span>
        <button class="notification-close"><i class="fas fa-times"></i></button>
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Close button
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        hideNotification(notification);
    });
    
    // Auto hide after 5 seconds
    setTimeout(() => {
        hideNotification(notification);
    }, 5000);
}

function hideNotification(notification) {
    notification.classList.remove('show');
    setTimeout(() => {
        notification.remove();
    }, 300);
}

// Handle all "Add to Cart" buttons
document.querySelectorAll('.btn-primary').forEach(btn => {
    if (btn.innerHTML.includes('Add to Cart')) {
        btn.addEventListener('click', () => {
            showNotification('Item added to cart successfully!', 'success');
        });
    }
});

// Handle "View Details" and "Track Order" buttons
document.querySelectorAll('.order-actions button').forEach(btn => {
    btn.addEventListener('click', () => {
        const action = btn.textContent.trim();
        showNotification(`${action} feature coming soon!`, 'info');
    });
});

// Orders Management System
let currentOrderFilter = 'all';
let currentOrderSearch = '';
let currentOrderSort = 'date-new';

function initOrdersSystem() {
    renderOrders();
    initOrderFilters();
    initOrderSearch();
    initOrderSort();
}

function initOrderFilters() {
    const filterButtons = document.querySelectorAll('.orders-filter-btn');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Get filter value and render
            currentOrderFilter = btn.getAttribute('data-filter');
            renderOrders();
        });
    });
}

function initOrderSearch() {
    const searchInput = document.getElementById('orderSearch');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            currentOrderSearch = e.target.value.toLowerCase();
            renderOrders();
        });
    }
}

function initOrderSort() {
    const sortSelect = document.getElementById('orderSortFilter');
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            currentOrderSort = e.target.value;
            renderOrders();
        });
    }
}

function renderOrders() {
    const ordersContainer = document.getElementById('ordersContainer');
    if (!ordersContainer) return;
    
    // Check if ordersData exists
    if (typeof ordersData === 'undefined' || !ordersData.length) {
        ordersContainer.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px;">
                <i class="fas fa-inbox" style="font-size: 4rem; color: var(--text-light); margin-bottom: 20px;"></i>
                <h3 style="color: var(--text-light);">No orders found</h3>
                <p style="color: var(--text-light);">Start shopping to see your orders here!</p>
            </div>
        `;
        return;
    }
    
    // Filter orders by status
    let filteredOrders = currentOrderFilter === 'all' 
        ? [...ordersData]
        : ordersData.filter(order => order.status === currentOrderFilter);
    
    // Filter by search term
    if (currentOrderSearch) {
        filteredOrders = filteredOrders.filter(order => {
            const searchLower = currentOrderSearch.toLowerCase();
            return order.id.toLowerCase().includes(searchLower) ||
                   order.items.some(item => item.name.toLowerCase().includes(searchLower));
        });
    }
    
    // Sort orders
    filteredOrders.sort((a, b) => {
        switch (currentOrderSort) {
            case 'date-new':
                return new Date(b.date) - new Date(a.date);
            case 'date-old':
                return new Date(a.date) - new Date(b.date);
            case 'price-high':
                return b.total - a.total;
            case 'price-low':
                return a.total - b.total;
            default:
                return 0;
        }
    });
    
    if (filteredOrders.length === 0) {
        ordersContainer.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px;">
                <i class="fas fa-search" style="font-size: 4rem; color: var(--text-light); margin-bottom: 20px;"></i>
                <h3 style="color: var(--text-light);">No orders found</h3>
                <p style="color: var(--text-light);">Try adjusting your filters or search terms.</p>
            </div>
        `;
        return;
    }
    
    // Render orders
    ordersContainer.innerHTML = filteredOrders.map(order => {
        const statusClass = `status-${order.status}`;
        const statusText = order.status.charAt(0).toUpperCase() + order.status.slice(1);
        const displayItems = order.items.slice(0, 2);
        const moreItems = order.items.length - 2;
        
        // Calculate progress percentage
        let progressPercent = 0;
        let progressText = '';
        if (order.status === 'pending') {
            progressPercent = 25;
            progressText = 'Order Placed';
        } else if (order.status === 'processing') {
            progressPercent = 50;
            progressText = 'Processing';
        } else if (order.status === 'shipping') {
            progressPercent = 75;
            progressText = 'Out for Delivery';
        } else if (order.status === 'delivered') {
            progressPercent = 100;
            progressText = 'Delivered';
        } else if (order.status === 'cancelled') {
            progressPercent = 0;
            progressText = 'Cancelled';
        }
        
        return `
            <div class="order-card" data-order-status="${order.status}">
                <div class="order-card-header">
                    <div class="order-header-left">
                        <h3>${order.id}</h3>
                        <span class="order-date"><i class="fas fa-calendar"></i> ${order.date}</span>
                    </div>
                    <span class="status-badge ${statusClass}">${statusText}</span>
                </div>
                <div class="order-card-body">
                    <div class="order-products-list">
                        ${displayItems.map(item => `
                            <div class="order-product">
                                <img src="${item.image}" alt="${item.name}" onerror="this.src='https://via.placeholder.com/80x80'">
                                <div class="order-product-details">
                                    <h4>${item.name}</h4>
                                    <p>Quantity: ${item.quantity}</p>
                                </div>
                                <div class="order-product-price">₱${item.price.toLocaleString()}</div>
                            </div>
                        `).join('')}
                        ${moreItems > 0 ? `
                            <div class="order-more-items">
                                <i class="fas fa-plus-circle"></i> ${moreItems} more item${moreItems > 1 ? 's' : ''} in this order
                            </div>
                        ` : ''}
                    </div>
                    ${order.status !== 'cancelled' ? `
                        <div class="order-progress-tracker">
                            <div class="progress-step ${order.status === 'processing' || order.status === 'shipping' || order.status === 'delivered' ? 'completed' : ''} ${order.status === 'pending' ? 'active' : ''}">
                                <div class="step-icon"><i class="fas fa-shopping-cart"></i></div>
                                <span class="step-label">Pending</span>
                            </div>
                            <div class="progress-line ${order.status === 'processing' || order.status === 'shipping' || order.status === 'delivered' ? 'completed' : ''}"></div>
                            <div class="progress-step ${order.status === 'processing' || order.status === 'shipping' || order.status === 'delivered' ? 'completed' : ''}">
                                <div class="step-icon"><i class="fas fa-cog"></i></div>
                                <span class="step-label">Processing</span>
                            </div>
                            <div class="progress-line ${order.status === 'shipping' || order.status === 'delivered' ? 'completed' : ''}"></div>
                            <div class="progress-step ${order.status === 'shipping' || order.status === 'delivered' ? 'completed' : ''} ${order.status === 'processing' ? 'active' : ''}">
                                <div class="step-icon"><i class="fas fa-truck"></i></div>
                                <span class="step-label">Shipping</span>
                            </div>
                            <div class="progress-line ${order.status === 'delivered' ? 'completed' : ''}"></div>
                            <div class="progress-step ${order.status === 'delivered' ? 'completed' : ''} ${order.status === 'shipping' ? 'active' : ''}">
                                <div class="step-icon"><i class="fas fa-check-circle"></i></div>
                                <span class="step-label">Delivered</span>
                            </div>
                        </div>
                    ` : ''}
                </div>
                <div class="order-card-footer">
                    <div class="order-total">
                        <span>Total Amount:</span>
                        <strong>₱${order.total.toLocaleString()}</strong>
                    </div>
                    <div class="order-actions">
                        ${order.status !== 'cancelled' ? `
                            <button class="btn-outline btn-sm" onclick="openOrderTracking('${order.id}')">
                                <i class="fas fa-map-marker-alt"></i> Track Order
                            </button>
                        ` : ''}
                        <button class="btn-primary btn-sm" onclick="openOrderDetails('${order.id}')">
                            <i class="fas fa-eye"></i> View Details
                        </button>
                        ${order.status === 'delivered' ? `
                            <button class="btn-outline btn-sm" onclick="buyAgain('${order.id}')">
                                <i class="fas fa-redo"></i> Buy Again
                            </button>
                        ` : ''}
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Open Order Tracking Modal
window.openOrderTracking = function(orderId) {
    const order = ordersData.find(o => o.id === orderId);
    if (!order) return;
    
    const modal = document.getElementById('orderTrackingModal');
    const trackingOrderInfo = document.getElementById('trackingOrderInfo');
    const trackingTimeline = document.getElementById('trackingTimeline');
    const trackingLocation = document.getElementById('trackingLocation');
    
    // Populate order info
    trackingOrderInfo.innerHTML = `
        <h3>${order.id}</h3>
        <div class="tracking-info-grid">
            <div class="tracking-info-item">
                <span class="tracking-info-label">Order Date</span>
                <span class="tracking-info-value">${order.date}</span>
            </div>
            <div class="tracking-info-item">
                <span class="tracking-info-label">Status</span>
                <span class="tracking-info-value">${order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span>
            </div>
            <div class="tracking-info-item">
                <span class="tracking-info-label">Items</span>
                <span class="tracking-info-value">${order.items.length} Product${order.items.length > 1 ? 's' : ''}</span>
            </div>
            <div class="tracking-info-item">
                <span class="tracking-info-label">Total Amount</span>
                <span class="tracking-info-value">₱${order.total.toLocaleString()}</span>
            </div>
        </div>
    `;
    
    // Populate tracking timeline
    const steps = [
        {
            key: 'orderPlaced',
            icon: 'fa-shopping-cart',
            title: 'Order Placed',
            ...order.tracking.orderPlaced
        },
        {
            key: 'processing',
            icon: 'fa-cog',
            title: 'Processing',
            ...order.tracking.processing
        },
        {
            key: 'shipping',
            icon: 'fa-truck',
            title: 'Shipping',
            ...order.tracking.shipping
        },
        {
            key: 'delivered',
            icon: 'fa-box-open',
            title: 'Delivered',
            ...order.tracking.delivered
        }
    ];
    
    trackingTimeline.innerHTML = steps.map(step => {
        const stepClass = step.completed ? 'completed' : (step.active ? 'active' : '');
        return `
            <div class="tracking-step ${stepClass}">
                <div class="tracking-step-icon">
                    <i class="fas ${step.icon}"></i>
                </div>
                <div class="tracking-step-content">
                    <h4 class="tracking-step-title">${step.title}</h4>
                    <p class="tracking-step-desc">${step.location}</p>
                    ${step.date ? `<div class="tracking-step-time"><i class="fas fa-clock"></i> ${step.date}</div>` : ''}
                </div>
            </div>
        `;
    }).join('');
    
    // Update current location
    const activeStep = steps.find(s => s.active);
    if (activeStep) {
        trackingLocation.textContent = activeStep.location;
    } else if (order.status === 'delivered') {
        trackingLocation.textContent = order.tracking.delivered.location;
    }
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
};

window.closeOrderTrackingModal = function() {
    const modal = document.getElementById('orderTrackingModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
};

// Open Order Details Modal
window.openOrderDetails = function(orderId) {
    const order = ordersData.find(o => o.id === orderId);
    if (!order) return;
    
    const modal = document.getElementById('orderDetailsModal');
    const content = document.getElementById('orderDetailsContent');
    
    content.innerHTML = `
        <div class="order-details-section">
            <h3><i class="fas fa-info-circle"></i> Order Information</h3>
            <div class="tracking-info-grid">
                <div class="tracking-info-item">
                    <span class="tracking-info-label">Order ID</span>
                    <span class="tracking-info-value">${order.id}</span>
                </div>
                <div class="tracking-info-item">
                    <span class="tracking-info-label">Order Date</span>
                    <span class="tracking-info-value">${order.date}</span>
                </div>
                <div class="tracking-info-item">
                    <span class="tracking-info-label">Status</span>
                    <span class="tracking-info-value status-badge status-${order.status}">${order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span>
                </div>
            </div>
        </div>
        
        <div class="order-details-section">
            <h3><i class="fas fa-box"></i> Products</h3>
            <div class="order-details-products">
                ${order.items.map(item => `
                    <div class="order-product">
                        <img src="${item.image}" alt="${item.name}" onerror="this.src='https://via.placeholder.com/80x80'">
                        <div class="order-product-details">
                            <h4>${item.name}</h4>
                            <p>Quantity: ${item.quantity}</p>
                        </div>
                        <div class="order-product-price">₱${item.price.toLocaleString()}</div>
                    </div>
                `).join('')}
            </div>
        </div>
        
        <div class="order-details-section">
            <h3><i class="fas fa-map-marker-alt"></i> Delivery Address</h3>
            <div style="padding: 15px; background: var(--light-bg); border-radius: 10px;">
                <p style="margin: 5px 0; font-weight: 600;">${order.deliveryAddress.name}</p>
                <p style="margin: 5px 0; color: var(--text-light);">${order.deliveryAddress.street}</p>
                <p style="margin: 5px 0; color: var(--text-light);">${order.deliveryAddress.city}</p>
                <p style="margin: 5px 0; color: var(--text-light);"><i class="fas fa-phone"></i> ${order.deliveryAddress.phone}</p>
            </div>
        </div>
        
        <div class="order-details-section">
            <h3><i class="fas fa-receipt"></i> Payment Summary</h3>
            <div class="order-details-summary">
                <div class="summary-row">
                    <span class="summary-label">Subtotal</span>
                    <span class="summary-value">₱${order.subtotal.toLocaleString()}</span>
                </div>
                <div class="summary-row">
                    <span class="summary-label">Delivery Fee</span>
                    <span class="summary-value">₱${order.delivery.toLocaleString()}</span>
                </div>
                <div class="summary-row">
                    <span class="summary-label">Total Amount</span>
                    <span class="summary-value">₱${order.total.toLocaleString()}</span>
                </div>
            </div>
        </div>
    `;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
};

window.closeOrderDetailsModal = function() {
    const modal = document.getElementById('orderDetailsModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
};

// Buy Again functionality
window.buyAgain = function(orderId) {
    const order = ordersData.find(o => o.id === orderId);
    if (!order) return;
    
    // Add all items from the order to cart
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    order.items.forEach(item => {
        const existingItem = cart.find(cartItem => cartItem.name === item.name);
        if (existingItem) {
            existingItem.quantity += item.quantity;
        } else {
            cart.push({
                id: Date.now() + Math.random(),
                name: item.name,
                price: item.price,
                image: item.image,
                quantity: item.quantity
            });
        }
    });
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartBadges();
    updateCartPanel();
    showNotification(`${order.items.length} item(s) added to cart!`, 'success');
};

// Close modals when clicking overlay
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay')) {
        closeOrderTrackingModal();
        closeOrderDetailsModal();
    }
});

// Handle address and payment actions
document.querySelectorAll('.address-footer .btn-text, .payment-footer .btn-text').forEach(btn => {
    btn.addEventListener('click', () => {
        const action = btn.textContent.trim();
        if (action.includes('Delete') || action.includes('Remove')) {
            if (confirm(`Are you sure you want to ${action.toLowerCase()}?`)) {
                const card = btn.closest('.address-card, .payment-card');
                card.style.animation = 'fadeOut 0.3s ease';
                setTimeout(() => {
                    card.remove();
                    showNotification(`${action} completed successfully`, 'success');
                }, 300);
            }
        } else {
            showNotification(`${action} feature coming soon!`, 'info');
        }
    });
});

// Handle add new buttons
document.querySelectorAll('.add-address-card, .add-payment-card').forEach(btn => {
    btn.addEventListener('click', () => {
        const type = btn.classList.contains('add-address-card') ? 'address' : 'payment method';
        showNotification(`Add new ${type} feature coming soon!`, 'info');
    });
});

// Handle ticket actions
document.querySelectorAll('.ticket-footer button').forEach(btn => {
    btn.addEventListener('click', () => {
        const action = btn.textContent.trim();
        showNotification(`${action} feature coming soon!`, 'info');
    });
});

// Header Search Functionality
function initHeaderSearch() {
    const headerSearch = document.getElementById('headerSearch');
    
    if (headerSearch) {
        headerSearch.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase().trim();
            
            // If search is active and we're not on the shop section, switch to it
            if (searchTerm && document.querySelector('.nav-item[data-section="shop"]')) {
                document.querySelector('.nav-item[data-section="shop"]').click();
            }
            
            // Trigger the shop search if shop.js is loaded
            if (typeof window.handleSearch === 'function') {
                window.handleSearch(searchTerm);
            }
        });
        
        // Clear search when switching sections
        document.querySelectorAll('.nav-item[data-section]').forEach(item => {
            item.addEventListener('click', () => {
                const section = item.getAttribute('data-section');
                if (section !== 'shop') {
                    headerSearch.value = '';
                }
            });
        });
    }
}

// Update Cart and Wishlist Badges
function updateCartBadges() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    
    // Update all cart badges
    const cartBadges = document.querySelectorAll('.cart-badge');
    cartBadges.forEach(badge => {
        badge.textContent = cart.length;
    });
    
    // Update all wishlist badges
    const wishlistBadges = document.querySelectorAll('.wishlist-badge');
    wishlistBadges.forEach(badge => {
        badge.textContent = wishlist.length;
    });
}

// Hero Banner Message Rotation
function initHeroRotation() {
    const messages = [
        {
            title: "U-BEST is the best choice for you!",
            subtitle: "We provide high-quality and reliable bakery equipment"
        },
        {
            title: "We Have New Arrivals BEST For You!",
            subtitle: "Check out our latest products and equipment"
        },
        {
            title: "Your Success is Our Mission!",
            subtitle: "Reliable products, flexible payment options, and excellent service"
        }
    ];
    
    let currentIndex = 0;
    const heroTitle = document.getElementById('heroTitle');
    const heroSubtitle = document.getElementById('heroSubtitle');
    
    if (!heroTitle || !heroSubtitle) return;
    
    function rotateMessage() {
        // Fade out
        heroTitle.style.opacity = '0';
        heroSubtitle.style.opacity = '0';
        
        setTimeout(() => {
            // Change content
            currentIndex = (currentIndex + 1) % messages.length;
            heroTitle.textContent = messages[currentIndex].title;
            heroSubtitle.textContent = messages[currentIndex].subtitle;
            
            // Fade in
            heroTitle.style.opacity = '1';
            heroSubtitle.style.opacity = '1';
        }, 500);
    }
    
    // Add smooth transition
    heroTitle.style.transition = 'opacity 0.5s ease';
    heroSubtitle.style.transition = 'opacity 0.5s ease';
    
    // Rotate every 5 seconds
    setInterval(rotateMessage, 5000);
}

// Cart Panel Functionality
function initCartPanel() {
    const cartPanel = document.getElementById('cartPanel');
    const cartPanelOverlay = document.getElementById('cartPanelOverlay');
    const cartCloseBtn = document.getElementById('cartCloseBtn');
    const headerCartBtn = document.getElementById('headerCartBtn');
    const cartCheckoutBtn = document.getElementById('cartCheckoutBtn');
    
    // Open cart panel
    if (headerCartBtn) {
        headerCartBtn.addEventListener('click', () => {
            openCartPanel();
        });
    }
    
    // Close cart panel
    if (cartCloseBtn) {
        cartCloseBtn.addEventListener('click', () => {
            closeCartPanel();
        });
    }
    
    if (cartPanelOverlay) {
        cartPanelOverlay.addEventListener('click', () => {
            closeCartPanel();
        });
    }
    
    // Checkout button
    if (cartCheckoutBtn) {
        cartCheckoutBtn.addEventListener('click', () => {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            if (cart.length === 0) {
                showNotification('Your cart is empty!', 'warning');
                return;
            }
            closeCartPanel();
            // Navigate to checkout or cart section
            document.querySelector('[data-section="cart"]')?.click();
        });
    }
    
    // Initial load
    updateCartPanel();
}

function openCartPanel() {
    const cartPanel = document.getElementById('cartPanel');
    if (cartPanel) {
        cartPanel.classList.add('active');
        document.body.style.overflow = 'hidden';
        updateCartPanel();
    }
}

function closeCartPanel() {
    const cartPanel = document.getElementById('cartPanel');
    if (cartPanel) {
        cartPanel.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function updateCartPanel() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsList = document.getElementById('cartItemsList');
    const emptyCartMessage = document.getElementById('emptyCartMessage');
    const cartSubtotal = document.getElementById('cartSubtotal');
    const cartDeliveryFee = document.getElementById('cartDeliveryFee');
    const cartTotal = document.getElementById('cartTotal');
    const cartCheckoutBtn = document.getElementById('cartCheckoutBtn');
    
    if (!cartItemsList) return;
    
    // Update delivery address
    updateCartAddress();
    
    // Clear current items (except empty message)
    const existingItems = cartItemsList.querySelectorAll('.cart-item');
    existingItems.forEach(item => item.remove());
    
    if (cart.length === 0) {
        if (emptyCartMessage) emptyCartMessage.style.display = 'block';
        if (cartCheckoutBtn) cartCheckoutBtn.disabled = true;
        if (cartSubtotal) cartSubtotal.textContent = '₱0.00';
        if (cartDeliveryFee) cartDeliveryFee.textContent = '₱0.00';
        if (cartTotal) cartTotal.textContent = '₱0.00';
        return;
    }
    
    if (emptyCartMessage) emptyCartMessage.style.display = 'none';
    if (cartCheckoutBtn) cartCheckoutBtn.disabled = false;
    
    // Calculate totals
    let subtotal = 0;
    
    // Render cart items
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        
        const cartItemHTML = `
            <div class="cart-item">
                <img src="${item.image || 'Photo/Belgian Double Waffle Maker.jpg'}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <h4 class="cart-item-name">${item.name}</h4>
                    <p class="cart-item-price">₱${item.price.toLocaleString()}</p>
                    <div class="cart-item-quantity">
                        <button class="qty-btn" onclick="updateCartItemQuantity(${index}, -1)">
                            <i class="fas fa-minus"></i>
                        </button>
                        <span class="qty-value">${item.quantity}</span>
                        <button class="qty-btn" onclick="updateCartItemQuantity(${index}, 1)">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                </div>
                <button class="cart-item-remove" onclick="removeCartItem(${index})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        
        if (emptyCartMessage) {
            emptyCartMessage.insertAdjacentHTML('beforebegin', cartItemHTML);
        } else {
            cartItemsList.insertAdjacentHTML('beforeend', cartItemHTML);
        }
    });
    
    // Update summary
    const deliveryFee = subtotal > 0 ? 100 : 0;
    const total = subtotal + deliveryFee;
    
    if (cartSubtotal) cartSubtotal.textContent = `₱${subtotal.toLocaleString()}`;
    if (cartDeliveryFee) cartDeliveryFee.textContent = `₱${deliveryFee.toLocaleString()}`;
    if (cartTotal) cartTotal.textContent = `₱${total.toLocaleString()}`;
}

// Cart item management functions
window.updateCartItemQuantity = function(index, change) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart[index]) {
        cart[index].quantity += change;
        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartPanel();
        updateCartBadges();
        
        // Update main cart display if it exists
        if (typeof updateCartDisplay === 'function') {
            updateCartDisplay();
        }
    }
};

window.removeCartItem = function(index) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartPanel();
    updateCartBadges();
    
    // Update main cart display if it exists
    if (typeof updateCartDisplay === 'function') {
        updateCartDisplay();
    }
    
    showNotification('Item removed from cart', 'success');
};

// Update cart delivery address
function updateCartAddress() {
    const cartCurrentAddress = document.getElementById('cartCurrentAddress');
    if (!cartCurrentAddress) return;
    
    // Get saved addresses from localStorage or use default
    const addresses = JSON.parse(localStorage.getItem('addresses')) || [
        {
            id: 1,
            label: 'Home',
            name: 'Juan Dela Cruz',
            street: '123 Bakery Street, Poblacion District',
            city: 'Davao City, 8000',
            phone: '+63 912 345 6789',
            isDefault: true
        }
    ];
    
    // Find default address
    const defaultAddress = addresses.find(addr => addr.isDefault) || addresses[0];
    
    if (defaultAddress) {
        cartCurrentAddress.innerHTML = `
            <p class="address-name"><i class="fas fa-${defaultAddress.label.toLowerCase() === 'home' ? 'home' : defaultAddress.label.toLowerCase() === 'business' ? 'briefcase' : 'map-marker-alt'}"></i> ${defaultAddress.label}</p>
            <p class="address-details">${defaultAddress.name}</p>
            <p class="address-details">${defaultAddress.street}</p>
            <p class="address-details">${defaultAddress.city}</p>
            <p class="address-details"><i class="fas fa-phone"></i> ${defaultAddress.phone}</p>
        `;
    } else {
        cartCurrentAddress.innerHTML = `
            <p class="address-name">No address selected</p>
            <p class="address-details">Please add a delivery address</p>
        `;
    }
}

// Change address button handler
document.addEventListener('click', (e) => {
    if (e.target.id === 'changeAddressBtn' || e.target.closest('#changeAddressBtn')) {
        // Close cart panel and navigate to addresses section
        closeCartPanel();
        setTimeout(() => {
            document.querySelector('[data-section="addresses"]')?.click();
        }, 300);
    }
});

// Featured Products Rotation
function initFeaturedProducts() {
    const stations = ['new-arrivals', 'best-deals', 'pautang-deals'];
    const stationTitles = {
        'new-arrivals': '<i class="fas fa-star"></i> New Arrivals',
        'best-deals': '<i class="fas fa-fire"></i> Best Deals',
        'pautang-deals': '<i class="fas fa-hand-holding-usd"></i> Pautang Deals'
    };
    
    let currentStationIndex = 0;
    
    function displayFeaturedProducts() {
        const featuredProductsGrid = document.getElementById('featuredProductsGrid');
        const featuredProductsTitle = document.getElementById('featuredProductsTitle');
        
        if (!featuredProductsGrid || !featuredProductsTitle) return;
        
        // Get products from the current station
        const currentStation = stations[currentStationIndex];
        
        // Check if products are available
        if (typeof allProducts === 'undefined' || !allProducts.length) {
            featuredProductsGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-light);">No products available</p>';
            return;
        }
        
        // Filter products by station
        let stationProducts = allProducts.filter(p => p.station === currentStation || p.station === 'all');
        
        // Shuffle and get 4 random products
        stationProducts = stationProducts.sort(() => 0.5 - Math.random()).slice(0, 4);
        
        // Update title
        featuredProductsTitle.innerHTML = stationTitles[currentStation];
        
        // Render products with fade effect
        featuredProductsGrid.style.opacity = '0';
        
        setTimeout(() => {
            featuredProductsGrid.innerHTML = stationProducts.map(product => `
                <div class="featured-product-item" onclick="viewProduct(${product.id})">
                    <div class="featured-product-image">
                        <img src="${product.image}" alt="${product.name}">
                        ${product.oldPrice ? '<div class="featured-product-badge">Sale</div>' : ''}
                    </div>
                    <div class="featured-product-info">
                        <h3 class="featured-product-name">${product.name}</h3>
                        <div class="featured-product-price">
                            ₱${product.price.toLocaleString()}
                            ${product.oldPrice ? `<span class="featured-product-old-price">₱${product.oldPrice.toLocaleString()}</span>` : ''}
                        </div>
                        <div class="featured-product-rating">
                            ${getStarsHTML(product.rating)}
                            <span>(${product.rating})</span>
                        </div>
                        <button class="featured-add-to-cart" onclick="event.stopPropagation(); addProductToCart(${product.id})">
                            <i class="fas fa-shopping-cart"></i>
                            Add to Cart
                        </button>
                    </div>
                </div>
            `).join('');
            
            featuredProductsGrid.style.opacity = '1';
        }, 300);
        
        // Move to next station
        currentStationIndex = (currentStationIndex + 1) % stations.length;
    }
    
    // Helper function to generate star rating HTML
    function getStarsHTML(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        let starsHTML = '';
        
        for (let i = 0; i < fullStars; i++) {
            starsHTML += '<i class="fas fa-star"></i>';
        }
        
        if (hasHalfStar) {
            starsHTML += '<i class="fas fa-star-half-alt"></i>';
        }
        
        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            starsHTML += '<i class="far fa-star"></i>';
        }
        
        return starsHTML;
    }
    
    // Initial display
    displayFeaturedProducts();
    
    // Rotate every 10 seconds
    setInterval(displayFeaturedProducts, 10000);
}

// View product details (navigate to shop section)
window.viewProduct = function(productId) {
    // Navigate to shop section
    document.querySelector('[data-section="shop"]')?.click();
    
    // Scroll to product after a brief delay
    setTimeout(() => {
        const productCard = document.querySelector(`[data-product-id="${productId}"]`);
        if (productCard) {
            productCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
            productCard.style.animation = 'highlight 2s ease';
        }
    }, 300);
};

// Add product to cart from featured section
window.addProductToCart = function(productId) {
    const product = allProducts.find(p => p.id === productId);
    if (!product) return;
    
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
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
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartBadges();
    updateCartPanel();
    showNotification('Product added to cart!', 'success');
};

// Load Delivered Orders in Dashboard
function loadDeliveredOrders() {
    const deliveredOrdersList = document.getElementById('deliveredOrdersList');
    if (!deliveredOrdersList) return;
    
    // Check if ordersData exists
    if (typeof ordersData === 'undefined' || !ordersData.length) {
        deliveredOrdersList.innerHTML = `
            <div style="text-align: center; padding: 40px 20px;">
                <i class="fas fa-box-open" style="font-size: 3rem; color: var(--text-light); margin-bottom: 15px;"></i>
                <p style="color: var(--text-light);">No delivered orders yet</p>
            </div>
        `;
        return;
    }
    
    // Filter only delivered orders
    const deliveredOrders = ordersData.filter(order => order.status === 'delivered').slice(0, 3);
    
    if (deliveredOrders.length === 0) {
        deliveredOrdersList.innerHTML = `
            <div style="text-align: center; padding: 40px 20px;">
                <i class="fas fa-box-open" style="font-size: 3rem; color: var(--text-light); margin-bottom: 15px;"></i>
                <p style="color: var(--text-light);">No delivered orders yet</p>
            </div>
        `;
        return;
    }
    
    // Render delivered orders with review button
    deliveredOrdersList.innerHTML = deliveredOrders.map(order => {
        const firstItem = order.items[0];
        const itemCount = order.items.length;
        
        return `
            <div class="order-item">
                <div class="order-icon">
                    <i class="fas fa-check-circle"></i>
                </div>
                <div class="order-info">
                    <h4>${order.id}</h4>
                    <p>${firstItem.name}${itemCount > 1 ? ` +${itemCount - 1} more` : ''}</p>
                    <span class="order-date"><i class="fas fa-calendar"></i> ${order.date}</span>
                    <p class="order-price">₱${order.total.toLocaleString()}</p>
                </div>
                <div class="order-actions-btns">
                    <button class="btn-review" onclick="openReviewModal('${order.id}', '${firstItem.name}', '${firstItem.image}')">
                        <i class="fas fa-star"></i> Write Review
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

// Review System
let currentReviewOrder = null;
let currentReviewProduct = null;
let selectedRating = 0;

function initStarRating() {
    const stars = document.querySelectorAll('#starRating i');
    
    stars.forEach(star => {
        star.addEventListener('click', () => {
            selectedRating = parseInt(star.getAttribute('data-rating'));
            document.getElementById('ratingValue').value = selectedRating;
            
            // Update star display
            stars.forEach((s, index) => {
                if (index < selectedRating) {
                    s.classList.remove('far');
                    s.classList.add('fas', 'active');
                } else {
                    s.classList.remove('fas', 'active');
                    s.classList.add('far');
                }
            });
        });
        
        star.addEventListener('mouseenter', () => {
            const rating = parseInt(star.getAttribute('data-rating'));
            stars.forEach((s, index) => {
                if (index < rating) {
                    s.classList.add('active');
                } else {
                    s.classList.remove('active');
                }
            });
        });
    });
    
    const starRating = document.getElementById('starRating');
    if (starRating) {
        starRating.addEventListener('mouseleave', () => {
            stars.forEach((s, index) => {
                if (index < selectedRating) {
                    s.classList.add('active');
                } else {
                    s.classList.remove('active');
                }
            });
        });
    }
}

window.openReviewModal = function(orderId, productName, productImage) {
    currentReviewOrder = orderId;
    currentReviewProduct = productName;
    
    const modal = document.getElementById('reviewModal');
    const productInfo = document.getElementById('reviewProductInfo');
    
    productInfo.innerHTML = `
        <img src="${productImage}" alt="${productName}" onerror="this.src='https://via.placeholder.com/80x80'">
        <div class="review-product-details">
            <h4>${productName}</h4>
            <p>Order: ${orderId}</p>
        </div>
    `;
    
    // Reset form
    document.getElementById('reviewForm').reset();
    selectedRating = 0;
    document.querySelectorAll('#starRating i').forEach(s => {
        s.classList.remove('fas', 'active');
        s.classList.add('far');
    });
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
};

window.closeReviewModal = function() {
    const modal = document.getElementById('reviewModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
};

window.submitReview = function(event) {
    event.preventDefault();
    
    const rating = selectedRating;
    const title = document.getElementById('reviewTitle').value;
    const reviewText = document.getElementById('reviewText').value;
    
    if (rating === 0) {
        showNotification('Please select a rating', 'error');
        return;
    }
    
    // Get existing reviews or create new array
    const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    
    // Add new review
    reviews.push({
        orderId: currentReviewOrder,
        productName: currentReviewProduct,
        rating: rating,
        title: title,
        review: reviewText,
        date: new Date().toLocaleDateString(),
        userName: JSON.parse(localStorage.getItem('currentUser')).name || 'Customer'
    });
    
    // Save to localStorage
    localStorage.setItem('reviews', JSON.stringify(reviews));
    
    showNotification('Thank you for your review!', 'success');
    closeReviewModal();
};

// Close modals when clicking overlay
document.addEventListener('click', (e) => {
    if (e.target.id === 'reviewModal') {
        closeReviewModal();
    }
    if (e.target.id === 'messageReplyModal') {
        closeMessageReplyModal();
    }
});

// ========================================
// FAVORITES PANEL FUNCTIONALITY
// ========================================

// Global function to close favorites panel
function closeFavoritesPanel() {
    const favoritesPanel = document.getElementById('favoritesPanel');
    if (favoritesPanel) {
        favoritesPanel.classList.remove('active');
    }
}

function initFavoritesPanel() {
    const favoritesBtn = document.getElementById('headerFavoritesBtn');
    const favoritesPanel = document.getElementById('favoritesPanel');
    const favoritesPanelOverlay = document.querySelector('.favorites-panel-overlay');
    const closeFavoritesBtn = document.getElementById('closeFavoritesPanel');
    
    if (!favoritesBtn || !favoritesPanel) return;
    
    // Open favorites panel
    favoritesBtn.addEventListener('click', () => {
        // Close other panels first
        closeNotificationsPanel();
        closeCartPanel();
        favoritesPanel.classList.add('active');
        updateFavoritesPanel();
    });
    
    // Close favorites panel
    closeFavoritesBtn?.addEventListener('click', () => {
        closeFavoritesPanel();
    });
    
    favoritesPanelOverlay?.addEventListener('click', () => {
        closeFavoritesPanel();
    });
    
    // Update badge on load
    updateFavoritesBadge();
}

function updateFavoritesPanel() {
    const favoritesItemsList = document.getElementById('favoritesItemsList');
    if (!favoritesItemsList) return;
    
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    
    if (wishlist.length === 0) {
        favoritesItemsList.innerHTML = `
            <div style="text-align: center; padding: 60px 20px;">
                <i class="fas fa-heart" style="font-size: 4rem; color: var(--text-light); margin-bottom: 15px;"></i>
                <p style="color: var(--text-light); font-size: 1.1rem;">No favorites yet</p>
                <p style="color: var(--text-light); font-size: 0.9rem;">Heart products from the shop to see them here!</p>
            </div>
        `;
        return;
    }
    
    favoritesItemsList.innerHTML = wishlist.map(item => `
        <div class="favorite-item" data-product-id="${item.id}">
            <div class="favorite-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="favorite-item-details">
                <h4 class="favorite-item-name">${item.name}</h4>
                <div class="favorite-item-price">₱${parseFloat(item.price).toLocaleString('en-US', {minimumFractionDigits: 2})}</div>
            </div>
            <div class="favorite-item-actions">
                <button class="favorite-add-to-cart-btn" onclick="addFavoriteToCart(${item.id})">
                    <i class="fas fa-shopping-cart"></i> Add
                </button>
                <button class="favorite-remove-btn" onclick="removeFavorite(${item.id})">
                    <i class="fas fa-trash"></i> Remove
                </button>
            </div>
        </div>
    `).join('');
}

function updateFavoritesBadge() {
    const badge = document.querySelector('#headerFavoritesBtn .badge');
    if (!badge) return;
    
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    badge.textContent = wishlist.length;
}

function removeFavorite(productId) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    wishlist = wishlist.filter(item => item.id !== productId);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    
    updateFavoritesPanel();
    updateFavoritesBadge();
    showNotification('Removed from favorites', 'success');
}

function addFavoriteToCart(productId) {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const product = wishlist.find(item => item.id === productId);
    
    if (!product) return;
    
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 1) + 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartBadge();
    updateCartPanel();
    showNotification('Added to cart!', 'success');
}

// ========================================
// NOTIFICATIONS PANEL FUNCTIONALITY
// ========================================

// Global function to close notifications panel
function closeNotificationsPanel() {
    const notificationsPanel = document.getElementById('notificationsPanel');
    if (notificationsPanel) {
        notificationsPanel.classList.remove('active');
    }
}

function initNotificationsPanel() {
    const notificationsBtn = document.getElementById('headerNotificationsBtn');
    const notificationsPanel = document.getElementById('notificationsPanel');
    const notificationsPanelOverlay = document.querySelector('.notifications-panel-overlay');
    const closeNotificationsBtn = document.getElementById('closeNotificationsPanel');
    const markAllReadBtn = document.getElementById('markAllReadBtn');
    
    if (!notificationsBtn || !notificationsPanel) return;
    
    // Open notifications panel
    notificationsBtn.addEventListener('click', () => {
        // Close other panels first
        closeFavoritesPanel();
        closeCartPanel();
        notificationsPanel.classList.add('active');
        loadNotifications('all');
    });
    
    // Close notifications panel
    closeNotificationsBtn?.addEventListener('click', () => {
        closeNotificationsPanel();
    });
    
    notificationsPanelOverlay?.addEventListener('click', () => {
        closeNotificationsPanel();
    });
    
    // Mark all as read
    markAllReadBtn?.addEventListener('click', () => {
        markAllAsRead();
    });
    
    // Tab switching
    const tabs = document.querySelectorAll('.notification-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const category = tab.dataset.tab;
            loadNotifications(category);
        });
    });
    
    // Initialize notifications from orders
    generateOrderNotifications();
    
    // Update badge on load
    updateNotificationsBadge();
}

function generateOrderNotifications() {
    if (typeof ordersData === 'undefined') return;
    
    let notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    
    // Only generate notifications for recent orders (avoid duplicates)
    ordersData.forEach(order => {
        const existingNotif = notifications.find(n => n.orderId === order.id && n.status === order.status);
        if (existingNotif) return; // Already notified
        
        let message = '';
        let icon = 'order';
        
        switch(order.status) {
            case 'processing':
                message = `Your order #${order.id} is now being processed`;
                break;
            case 'shipping':
                message = `Your order #${order.id} has been shipped and is on the way!`;
                break;
            case 'delivered':
                message = `Your order #${order.id} has been delivered. How was your experience?`;
                break;
            default:
                return;
        }
        
        const notification = {
            id: Date.now() + Math.random(),
            orderId: order.id,
            type: 'order',
            status: order.status,
            icon: icon,
            title: `Order ${order.status.charAt(0).toUpperCase() + order.status.slice(1)}`,
            message: message,
            time: new Date().toISOString(),
            read: false
        };
        
        notifications.unshift(notification);
    });
    
    localStorage.setItem('notifications', JSON.stringify(notifications));
}

function loadNotifications(category = 'all') {
    const notificationsList = document.getElementById('notificationsList');
    if (!notificationsList) return;
    
    let notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    
    // Filter by category
    if (category !== 'all') {
        notifications = notifications.filter(n => n.type === category);
    }
    
    if (notifications.length === 0) {
        notificationsList.innerHTML = `
            <div style="text-align: center; padding: 60px 20px;">
                <i class="fas fa-bell-slash" style="font-size: 4rem; color: var(--text-light); margin-bottom: 15px;"></i>
                <p style="color: var(--text-light); font-size: 1.1rem;">No notifications</p>
            </div>
        `;
        return;
    }
    
    notificationsList.innerHTML = notifications.map(notif => {
        const timeAgo = getTimeAgo(new Date(notif.time));
        
        if (notif.type === 'message') {
            return `
                <div class="notification-item ${!notif.read ? 'unread' : ''}" data-id="${notif.id}">
                    <div class="notification-content">
                        <div class="notification-icon message">
                            <i class="fas fa-envelope"></i>
                        </div>
                        <div class="notification-text">
                            <div class="notification-header">
                                <h4 class="notification-title">${notif.title}</h4>
                            </div>
                            <p class="notification-message">${notif.message}</p>
                            <div class="notification-time">${timeAgo}</div>
                            <div class="notification-actions">
                                <button class="notification-btn notification-btn-primary" onclick="openMessageReplyModal(${notif.id})">
                                    <i class="fas fa-reply"></i> Reply
                                </button>
                                <button class="notification-btn notification-btn-outline" onclick="markAsRead(${notif.id})">
                                    Mark as Read
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
        
        return `
            <div class="notification-item ${!notif.read ? 'unread' : ''}" data-id="${notif.id}" onclick="markAsRead(${notif.id})">
                <div class="notification-content">
                    <div class="notification-icon ${notif.icon}">
                        <i class="fas fa-box"></i>
                    </div>
                    <div class="notification-text">
                        <div class="notification-header">
                            <h4 class="notification-title">${notif.title}</h4>
                        </div>
                        <p class="notification-message">${notif.message}</p>
                        <div class="notification-time">${timeAgo}</div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function markAsRead(notificationId) {
    let notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    const notification = notifications.find(n => n.id === notificationId);
    if (notification) {
        notification.read = true;
    }
    localStorage.setItem('notifications', JSON.stringify(notifications));
    
    // Update UI
    const notifElement = document.querySelector(`.notification-item[data-id="${notificationId}"]`);
    if (notifElement) {
        notifElement.classList.remove('unread');
    }
    
    updateNotificationsBadge();
}

function markAllAsRead() {
    let notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    notifications.forEach(n => n.read = true);
    localStorage.setItem('notifications', JSON.stringify(notifications));
    
    // Update UI
    document.querySelectorAll('.notification-item.unread').forEach(item => {
        item.classList.remove('unread');
    });
    
    updateNotificationsBadge();
    showNotification('All notifications marked as read', 'success');
}

function updateNotificationsBadge() {
    const badge = document.querySelector('#headerNotificationsBtn .badge');
    if (!badge) return;
    
    const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    const unreadCount = notifications.filter(n => !n.read).length;
    badge.textContent = unreadCount;
}

function getTimeAgo(date) {
    const seconds = Math.floor((new Date() - date) / 1000);
    
    const intervals = {
        year: 31536000,
        month: 2592000,
        week: 604800,
        day: 86400,
        hour: 3600,
        minute: 60
    };
    
    for (const [unit, secondsInUnit] of Object.entries(intervals)) {
        const interval = Math.floor(seconds / secondsInUnit);
        if (interval >= 1) {
            return `${interval} ${unit}${interval === 1 ? '' : 's'} ago`;
        }
    }
    
    return 'Just now';
}

// ========================================
// MESSAGE/TICKET SYSTEM
// ========================================

function openMessageReplyModal(notificationId) {
    const modal = document.getElementById('messageReplyModal');
    if (!modal) return;
    
    const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    const notification = notifications.find(n => n.id === notificationId);
    
    if (!notification) return;
    
    // Get or create conversation thread
    let conversations = JSON.parse(localStorage.getItem('conversations') || '{}');
    const conversationId = notification.conversationId || notificationId;
    
    if (!conversations[conversationId]) {
        conversations[conversationId] = {
            id: conversationId,
            subject: notification.title,
            messages: [
                {
                    sender: 'Support',
                    text: notification.message,
                    time: notification.time,
                    type: 'received'
                }
            ]
        };
    }
    
    const conversation = conversations[conversationId];
    
    // Update modal title
    document.getElementById('messageSubject').textContent = conversation.subject;
    
    // Render message thread
    const messageThread = document.getElementById('messageThread');
    messageThread.innerHTML = conversation.messages.map(msg => `
        <div class="message-bubble ${msg.type}">
            <div class="message-sender">${msg.sender}</div>
            <div class="message-text">${msg.text}</div>
            <div class="message-time">${getTimeAgo(new Date(msg.time))}</div>
        </div>
    `).join('');
    
    // Scroll to bottom
    messageThread.scrollTop = messageThread.scrollHeight;
    
    // Store conversation ID for sending reply
    modal.dataset.conversationId = conversationId;
    modal.dataset.notificationId = notificationId;
    
    modal.style.display = 'flex';
}

function closeMessageReplyModal() {
    const modal = document.getElementById('messageReplyModal');
    if (modal) {
        modal.style.display = 'none';
        document.getElementById('replyMessageText').value = '';
    }
}

function sendReply(event) {
    event.preventDefault();
    
    const modal = document.getElementById('messageReplyModal');
    const conversationId = modal.dataset.conversationId;
    const notificationId = modal.dataset.notificationId;
    const replyText = document.getElementById('replyMessageText').value.trim();
    
    if (!replyText) {
        showNotification('Please enter a message', 'error');
        return;
    }
    
    // Get conversations
    let conversations = JSON.parse(localStorage.getItem('conversations') || '{}');
    const conversation = conversations[conversationId];
    
    if (!conversation) return;
    
    // Add reply to conversation
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{"name": "You"}');
    conversation.messages.push({
        sender: currentUser.name || 'You',
        text: replyText,
        time: new Date().toISOString(),
        type: 'sent'
    });
    
    // Save conversation
    conversations[conversationId] = conversation;
    localStorage.setItem('conversations', JSON.stringify(conversations));
    
    // Mark notification as read
    markAsRead(parseInt(notificationId));
    
    // Re-render thread
    openMessageReplyModal(parseInt(notificationId));
    
    // Clear form
    document.getElementById('replyMessageText').value = '';
    
    showNotification('Reply sent successfully', 'success');
}

// Initialize message reply form
document.getElementById('replyMessageForm')?.addEventListener('submit', sendReply);

// ========================================
// GLOBAL KEYBOARD SHORTCUTS & CLOSE HANDLERS
// ========================================

// ESC key to close all panels and modals
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' || e.key === 'Esc') {
        // Close all panels
        closeFavoritesPanel();
        closeNotificationsPanel();
        closeCartPanel();
        
        // Close all modals
        closeReviewModal();
        closeMessageReplyModal();
        
        const orderTrackingModal = document.getElementById('orderTrackingModal');
        const orderDetailsModal = document.getElementById('orderDetailsModal');
        
        if (orderTrackingModal && orderTrackingModal.style.display === 'flex') {
            orderTrackingModal.style.display = 'none';
        }
        if (orderDetailsModal && orderDetailsModal.style.display === 'flex') {
            orderDetailsModal.style.display = 'none';
        }
    }
});

// Enhanced close all panels function
function closeAllPanels() {
    closeFavoritesPanel();
    closeNotificationsPanel();
    closeCartPanel();
}

// Add sample message notification (for demonstration)
function addSampleMessageNotification() {
    let notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    
    // Check if sample already exists
    if (notifications.some(n => n.type === 'message')) return;
    
    const sampleMessage = {
        id: Date.now(),
        conversationId: Date.now(),
        type: 'message',
        icon: 'message',
        title: 'Support Response',
        message: 'Thank you for contacting us! How can we help you with your order?',
        time: new Date().toISOString(),
        read: false
    };
    
    notifications.unshift(sampleMessage);
    localStorage.setItem('notifications', JSON.stringify(notifications));
    updateNotificationsBadge();
}

// ========================================
// WISHLIST SECTION MANAGEMENT
// ========================================

function loadWishlistSection() {
    const wishlistGrid = document.getElementById('wishlistGrid');
    if (!wishlistGrid) return;
    
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    
    if (wishlist.length === 0) {
        wishlistGrid.innerHTML = `
            <div class="empty-state" style="grid-column: 1 / -1; text-align: center; padding: 60px 20px;">
                <i class="fas fa-heart-broken" style="font-size: 5rem; color: var(--text-light); margin-bottom: 20px; opacity: 0.3;"></i>
                <h3 style="color: var(--text-dark); margin-bottom: 10px;">Your wishlist is empty</h3>
                <p style="color: var(--text-light); margin-bottom: 20px;">Start adding products you love!</p>
                <button class="btn-primary" onclick="document.querySelector('[data-section=shop]').click()">
                    <i class="fas fa-store"></i> Browse Products
                </button>
            </div>
        `;
        return;
    }
    
    wishlistGrid.innerHTML = wishlist.map(item => `
        <div class="wishlist-item" data-product-id="${item.id}">
            <button class="remove-wishlist" onclick="removeFromWishlistSection(${item.id})">
                <i class="fas fa-times"></i>
            </button>
            <div class="wishlist-image">
                <img src="${item.image}" alt="${item.name}" onclick="openProductQuickView(${item.id})">
            </div>
            <div class="wishlist-content">
                <h3>${item.name}</h3>
                <p>${item.description || 'Premium bakery equipment'}</p>
                <div class="wishlist-price">
                    <span class="price">₱${parseFloat(item.price).toLocaleString('en-US', {minimumFractionDigits: 2})}</span>
                    <span class="availability in-stock">
                        <i class="fas fa-check-circle"></i> In Stock
                    </span>
                </div>
                <button class="btn-primary btn-sm" onclick="addToCartFromWishlist(${item.id})">
                    <i class="fas fa-shopping-cart"></i> Add to Cart
                </button>
            </div>
        </div>
    `).join('');
}

function removeFromWishlistSection(productId) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const product = wishlist.find(item => item.id === productId);
    
    wishlist = wishlist.filter(item => item.id !== productId);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    
    loadWishlistSection();
    updateFavoritesBadge();
    
    if (product) {
        showNotification(`${product.name} removed from wishlist`, 'success');
    }
    
    // Update wishlist badge in sidebar
    const wishlistBadge = document.querySelector('.nav-item[data-section="wishlist"] .nav-badge');
    if (wishlistBadge) {
        wishlistBadge.textContent = wishlist.length;
    }
}

function addToCartFromWishlist(productId) {
    if (typeof addToCart === 'function') {
        addToCart(productId);
    } else {
        showNotification('Added to cart!', 'success');
    }
}

// ========================================
// PRODUCT QUICK VIEW MODAL
// ========================================

function openProductQuickView(productId) {
    // Check if products data exists
    if (typeof allProducts === 'undefined' || !allProducts) {
        showNotification('Product data not available', 'error');
        return;
    }
    
    const product = allProducts.find(p => p.id === productId);
    if (!product) return;
    
    // Create modal if it doesn't exist
    let modal = document.getElementById('productQuickViewModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'productQuickViewModal';
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-container product-quick-view-modal">
                <div class="modal-header">
                    <h2><i class="fas fa-eye"></i> Product Details</h2>
                    <button class="modal-close" onclick="closeProductQuickView()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body" id="quickViewContent">
                    <!-- Content will be loaded here -->
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }
    
    // Populate modal content
    const content = document.getElementById('quickViewContent');
    const isInWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]').some(item => item.id === productId);
    
    content.innerHTML = `
        <div class="quick-view-grid">
            <div class="quick-view-image">
                <img src="${product.image}" alt="${product.name}">
                ${product.badge ? `<div class="product-badge ${product.badge}">${product.badge}</div>` : ''}
            </div>
            <div class="quick-view-details">
                <h2>${product.name}</h2>
                <div class="product-rating">
                    ${getStarRatingHTML(product.rating || 4.5)}
                    <span>(${product.reviews || 0} reviews)</span>
                </div>
                <div class="quick-view-price">
                    <span class="price">₱${parseFloat(product.price).toLocaleString('en-US', {minimumFractionDigits: 2})}</span>
                    ${product.oldPrice ? `<span class="old-price">₱${parseFloat(product.oldPrice).toLocaleString('en-US', {minimumFractionDigits: 2})}</span>` : ''}
                </div>
                <p class="product-description-full">${product.description || 'Premium quality bakery equipment for professional use.'}</p>
                
                <div class="product-specs">
                    <h4><i class="fas fa-info-circle"></i> Product Information</h4>
                    <ul>
                        <li><strong>Category:</strong> ${product.category || 'Bakery Equipment'}</li>
                        <li><strong>Brand:</strong> U-BEST</li>
                        <li><strong>Warranty:</strong> 1 Year</li>
                        <li><strong>Stock Status:</strong> <span class="text-success">In Stock</span></li>
                    </ul>
                </div>
                
                <div class="quick-view-actions">
                    <button class="btn-primary btn-lg" onclick="addToCart(${product.id}); closeProductQuickView();">
                        <i class="fas fa-shopping-cart"></i> Add to Cart
                    </button>
                    <button class="btn-outline btn-lg ${isInWishlist ? 'active' : ''}" onclick="toggleWishlistFromQuickView(${product.id})">
                        <i class="${isInWishlist ? 'fas' : 'far'} fa-heart"></i> ${isInWishlist ? 'In Wishlist' : 'Add to Wishlist'}
                    </button>
                </div>
            </div>
        </div>
    `;
    
    modal.style.display = 'flex';
}

function closeProductQuickView() {
    const modal = document.getElementById('productQuickViewModal');
    if (modal) modal.style.display = 'none';
}

function getStarRatingHTML(rating) {
    let starsHTML = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= Math.floor(rating)) {
            starsHTML += '<i class="fas fa-star"></i>';
        } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
            starsHTML += '<i class="fas fa-star-half-alt"></i>';
        } else {
            starsHTML += '<i class="far fa-star"></i>';
        }
    }
    return starsHTML;
}

function toggleWishlistFromQuickView(productId) {
    if (typeof addToWishlist === 'function') {
        addToWishlist(productId);
        setTimeout(() => {
            openProductQuickView(productId); // Refresh modal
        }, 100);
    }
}

// ========================================
// ADVANCED SEARCH WITH SUGGESTIONS
// ========================================

function initAdvancedSearch() {
    const searchInput = document.getElementById('headerSearch');
    if (!searchInput) return;
    
    let searchTimeout;
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        const query = this.value.trim();
        
        if (query.length < 2) {
            hideSearchSuggestions();
            return;
        }
        
        searchTimeout = setTimeout(() => {
            showSearchSuggestions(query);
        }, 300);
    });
    
    // Close suggestions when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.header-search')) {
            hideSearchSuggestions();
        }
    });
}

function showSearchSuggestions(query) {
    if (typeof allProducts === 'undefined') return;
    
    const suggestions = allProducts.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        (p.description && p.description.toLowerCase().includes(query.toLowerCase()))
    ).slice(0, 5);
    
    let suggestionsBox = document.getElementById('searchSuggestions');
    if (!suggestionsBox) {
        suggestionsBox = document.createElement('div');
        suggestionsBox.id = 'searchSuggestions';
        suggestionsBox.className = 'search-suggestions';
        document.querySelector('.header-search').appendChild(suggestionsBox);
    }
    
    if (suggestions.length === 0) {
        suggestionsBox.innerHTML = '<div class="no-suggestions">No products found</div>';
    } else {
        suggestionsBox.innerHTML = suggestions.map(p => `
            <div class="suggestion-item" onclick="openProductQuickView(${p.id}); hideSearchSuggestions();">
                <img src="${p.image}" alt="${p.name}">
                <div class="suggestion-details">
                    <div class="suggestion-name">${p.name}</div>
                    <div class="suggestion-price">₱${parseFloat(p.price).toLocaleString('en-US', {minimumFractionDigits: 2})}</div>
                </div>
            </div>
        `).join('');
    }
    
    suggestionsBox.style.display = 'block';
}

function hideSearchSuggestions() {
    const suggestionsBox = document.getElementById('searchSuggestions');
    if (suggestionsBox) {
        suggestionsBox.style.display = 'none';
    }
}

// Console welcome message
console.log('%c🎯 Dashboard Loaded Successfully!', 'color: #FF6B35; font-size: 16px; font-weight: bold;');
console.log('%cWelcome to your U-BEST Dashboard', 'color: #4ECDC4; font-size: 12px;');


