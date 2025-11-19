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
    updateCategoryItemCounts();
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
                } else if (sectionId === 'orders') {
                    renderOrders();
                } else if (sectionId === 'categories') {
                    updateCategoryCounts();
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
    
    // Load orders from localStorage
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    
    // Check if orders exist
    if (!orders || orders.length === 0) {
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
        ? [...orders]
        : orders.filter(order => order.status === currentOrderFilter);
    
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
        
        // Define status messages based on current order status
        let statusMessage = '';
        if (order.status === 'pending') {
            statusMessage = 'Waiting for the order to be accepted.';
        } else if (order.status === 'processing') {
            statusMessage = 'Your product is now being processed.';
        } else if (order.status === 'preparing') {
            statusMessage = 'Preparing your order for shipment.';
        } else if (order.status === 'shipped') {
            statusMessage = 'Package picked up. Please wait for delivery.';
        } else if (order.status === 'delivered') {
            statusMessage = 'Package has been delivered.';
        } else if (order.status === 'cancelled') {
            statusMessage = 'Order has been cancelled.';
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
                ${order.status !== 'cancelled' ? `
                    <div class="order-status-message">
                        <i class="fas fa-info-circle"></i> ${statusMessage}
                    </div>
                ` : ''}
                <div class="order-card-body">
                    <div class="order-products-compact">
                        ${displayItems.map(item => `
                            <div class="order-product-compact">
                                <img src="${item.image}" alt="${item.name}" onerror="this.src='https://via.placeholder.com/60x60'">
                                <div class="order-product-info">
                                    <h4>${item.name}</h4>
                                    <p>Qty: ${item.quantity} × ₱${item.price.toLocaleString()}</p>
                                </div>
                            </div>
                        `).join('')}
                        ${moreItems > 0 ? `
                            <div class="order-more-items-compact">
                                +${moreItems} more item${moreItems > 1 ? 's' : ''}
                            </div>
                        ` : ''}
                    </div>
                    ${order.status !== 'cancelled' ? `
                        <div class="order-progress-tracker">
                            <div class="progress-step ${order.status === 'pending' ? 'active' : ''} ${order.status !== 'pending' ? 'completed' : ''}">
                                <div class="step-icon"><i class="fas fa-shopping-cart"></i></div>
                                <span class="step-label">Pending</span>
                            </div>
                            <div class="progress-line ${order.status !== 'pending' ? 'completed' : ''}"></div>
                            <div class="progress-step ${order.status === 'processing' ? 'active' : ''} ${order.status === 'preparing' || order.status === 'shipped' || order.status === 'delivered' ? 'completed' : ''}">
                                <div class="step-icon"><i class="fas fa-cog"></i></div>
                                <span class="step-label">Processing</span>
                            </div>
                            <div class="progress-line ${order.status === 'preparing' || order.status === 'shipped' || order.status === 'delivered' ? 'completed' : ''}"></div>
                            <div class="progress-step ${order.status === 'preparing' ? 'active' : ''} ${order.status === 'shipped' || order.status === 'delivered' ? 'completed' : ''}">
                                <div class="step-icon"><i class="fas fa-box"></i></div>
                                <span class="step-label">Preparing</span>
                            </div>
                            <div class="progress-line ${order.status === 'shipped' || order.status === 'delivered' ? 'completed' : ''}"></div>
                            <div class="progress-step ${order.status === 'shipped' ? 'active' : ''} ${order.status === 'delivered' ? 'completed' : ''}">
                                <div class="step-icon"><i class="fas fa-truck"></i></div>
                                <span class="step-label">Shipping</span>
                            </div>
                            <div class="progress-line ${order.status === 'delivered' ? 'completed' : ''}"></div>
                            <div class="progress-step ${order.status === 'delivered' ? 'completed' : ''}">
                                <div class="step-icon"><i class="fas fa-check-circle"></i></div>
                                <span class="step-label">Delivered</span>
                            </div>
                        </div>
                    ` : ''}
                </div>
                <div class="order-card-footer">
                    <div class="order-total">
                        <span>Total:</span>
                        <strong>₱${order.total.toLocaleString()}</strong>
                    </div>
                    <div class="order-actions">
                        ${order.status === 'pending' ? `
                            <button class="btn-danger btn-sm" onclick="cancelOrder('${order.id}')" title="Cancel this order">
                                <i class="fas fa-times-circle"></i> Cancel
                            </button>
                        ` : ''}
                        <button class="btn-outline btn-sm" onclick="openOrderTracking('${order.id}')">
                            <i class="fas fa-map-marker-alt"></i> Track
                        </button>
                        <button class="btn-primary btn-sm" onclick="openOrderDetails('${order.id}')">
                            <i class="fas fa-eye"></i> Details
                        </button>
                        ${order.status === 'delivered' ? `
                            <button class="btn-outline btn-sm" onclick="buyAgain('${order.id}')">
                                <i class="fas fa-redo"></i> Buy Again
                            </button>
                            <button class="btn-secondary btn-sm" onclick="deleteOrder('${order.id}')" title="Delete this order">
                                <i class="fas fa-trash"></i>
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
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const order = orders.find(o => o.id === orderId);
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
                <span class="tracking-info-value status-badge status-${order.status}">${order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span>
            </div>
            <div class="tracking-info-item">
                <span class="tracking-info-label">Items</span>
                <span class="tracking-info-value">${order.items.length} Product${order.items.length > 1 ? 's' : ''}</span>
            </div>
            <div class="tracking-info-item">
                <span class="tracking-info-label">Total Amount</span>
                <span class="tracking-info-value">₱${order.total.toLocaleString()}</span>
            </div>
            ${order.driverName ? `
                <div class="tracking-info-item">
                    <span class="tracking-info-label">Driver</span>
                    <span class="tracking-info-value">${order.driverName}</span>
                </div>
                <div class="tracking-info-item">
                    <span class="tracking-info-label">Driver Contact</span>
                    <span class="tracking-info-value">${order.driverPhone}</span>
                </div>
            ` : ''}
        </div>
    `;
    
    // Populate tracking timeline
    const statusOrder = ['pending', 'processing', 'preparing', 'shipped', 'delivered'];
    const currentStatusIndex = statusOrder.indexOf(order.status);
    
    const steps = [
        {
            key: 'orderPlaced',
            statusIndex: 0,
            icon: 'fa-shopping-cart',
            title: 'Order Placed',
            ...order.tracking.orderPlaced
        },
        {
            key: 'processing',
            statusIndex: 1,
            icon: 'fa-cog',
            title: 'Processing',
            ...order.tracking.processing
        },
        {
            key: 'preparing',
            statusIndex: 2,
            icon: 'fa-box',
            title: 'Preparing',
            location: 'Preparing your order for shipment'
        },
        {
            key: 'shipping',
            statusIndex: 3,
            icon: 'fa-truck',
            title: 'Shipping',
            ...order.tracking.shipping
        },
        {
            key: 'delivered',
            statusIndex: 4,
            icon: 'fa-box-open',
            title: 'Delivered',
            ...order.tracking.delivered
        }
    ];
    
    trackingTimeline.innerHTML = steps.map(step => {
        let stepClass = '';
        const trackingData = order.tracking[step.key === 'orderPlaced' ? 'orderPlaced' : step.key] || {};
        
        if (step.statusIndex < currentStatusIndex) {
            stepClass = 'completed'; // Past steps - green
        } else if (step.statusIndex === currentStatusIndex) {
            // If delivered, show as completed (green), not active (pulsing)
            if (order.status === 'delivered') {
                stepClass = 'completed';
            } else {
                stepClass = 'active'; // Current step - pulsing
            }
        } else if (order.status === 'shipped' && step.key === 'delivered') {
            // When shipped, the next step (delivered) should be pulsing
            stepClass = 'active';
        }
        // Future steps have no class - will be gray by default
        
        return `
            <div class="tracking-step ${stepClass}">
                <div class="tracking-step-icon">
                    <i class="fas ${step.icon}"></i>
                </div>
                <div class="tracking-step-content">
                    <h4 class="tracking-step-title">${step.title}</h4>
                    <p class="tracking-step-desc">${trackingData.location || step.location || 'Awaiting update'}</p>
                    ${trackingData.date ? `<div class="tracking-step-time"><i class="fas fa-clock"></i> ${trackingData.date}</div>` : ''}
                </div>
            </div>
        `;
    }).join('');
    
    // Update current location
    const currentStep = steps.find(s => s.statusIndex === currentStatusIndex);
    const currentTracking = order.tracking[currentStep?.key === 'orderPlaced' ? 'orderPlaced' : currentStep?.key] || {};
    if (currentTracking.location) {
        trackingLocation.textContent = currentTracking.location;
    } else if (currentStep && currentStep.location) {
        trackingLocation.textContent = currentStep.location;
    } else {
        trackingLocation.textContent = 'Awaiting update';
    }
    
    // Add live map for shipped orders
    const trackingMapContainer = document.getElementById('trackingMapContainer');
    if (order.status === 'shipped' && order.driverLocation) {
        trackingMapContainer.innerHTML = `
            <div class="live-tracking-map">
                <div class="map-header">
                    <i class="fas fa-map-marked-alt"></i>
                    <span>Live Driver Tracking</span>
                </div>
                <div class="map-canvas">
                    <div class="delivery-route">
                        <div class="route-start">
                            <i class="fas fa-store"></i>
                            <span>Warehouse</span>
                        </div>
                        <div class="route-line"></div>
                        <div class="driver-marker" style="left: ${order.driverLocation.progress}%;">
                            <i class="fas fa-shipping-fast"></i>
                            <div class="driver-info">
                                <strong>${order.driverName}</strong>
                                <span>${Math.round(order.driverLocation.progress)}% complete</span>
                            </div>
                        </div>
                        <div class="route-end">
                            <i class="fas fa-home"></i>
                            <span>Your Location</span>
                        </div>
                    </div>
                </div>
                <div class="map-footer">
                    <span class="tracking-location"><i class="fas fa-map-pin"></i> ${currentTracking.location || 'En route to destination'}</span>
                </div>
            </div>
        `;
    } else {
        trackingMapContainer.innerHTML = `
            <div class="map-placeholder">
                <i class="fas fa-map-marked-alt"></i>
                <p>${order.status === 'delivered' ? 'Delivery completed' : 'Live tracking will appear when order is shipped'}</p>
                <span class="tracking-location" id="trackingLocation">${currentTracking.location || 'Awaiting update'}</span>
            </div>
        `;
    }
    
    // Add action buttons to modal
    const modalFooter = modal.querySelector('.modal-footer');
    if (modalFooter) {
        let footerButtons = '';
        
        // Show Cancel button only for pending orders
        if (order.status === 'pending') {
            footerButtons += `
                <button class="btn-danger" onclick="cancelOrder('${orderId}')" style="margin-right: 10px;">
                    <i class="fas fa-times-circle"></i> Cancel Order
                </button>
            `;
        }
        
        // Always show Delete button
        footerButtons += `
            <button class="btn-secondary" onclick="deleteOrder('${orderId}')">
                <i class="fas fa-trash"></i> Delete Order
            </button>
        `;
        
        modalFooter.innerHTML = footerButtons;
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
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const order = orders.find(o => o.id === orderId);
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
                <div class="tracking-info-item">
                    <span class="tracking-info-label">Payment Method</span>
                    <span class="tracking-info-value">${order.paymentMethod}</span>
                </div>
            </div>
        </div>
        
        <div class="order-details-section">
            <h3><i class="fas fa-user"></i> Customer Information</h3>
            <div style="padding: 15px; background: var(--light-bg); border-radius: 10px;">
                <p style="margin: 5px 0; font-weight: 600;"><i class="fas fa-user-circle"></i> ${order.customerName || order.deliveryAddress?.name || 'N/A'}</p>
                <p style="margin: 5px 0; color: var(--text-light);"><i class="fas fa-phone"></i> ${order.deliveryAddress?.phone || 'N/A'}</p>
            </div>
        </div>
        
        <div class="order-details-section">
            <h3><i class="fas fa-box"></i> Products (${order.items.length} ${order.items.length > 1 ? 'items' : 'item'})</h3>
            <div class="order-details-products">
                ${order.items.map(item => `
                    <div class="order-product">
                        <img src="${item.image}" alt="${item.name}" onerror="this.src='https://via.placeholder.com/80x80'">
                        <div class="order-product-details">
                            <h4>${item.name}</h4>
                            <p>Quantity: ${item.quantity}</p>
                        </div>
                        <div class="order-product-price">₱${(item.price * item.quantity).toLocaleString()}</div>
                    </div>
                `).join('')}
            </div>
        </div>
        
        <div class="order-details-section">
            <h3><i class="fas fa-map-marker-alt"></i> Delivery Address</h3>
            <div style="padding: 15px; background: var(--light-bg); border-radius: 10px;">
                <p style="margin: 5px 0; font-weight: 600;">${order.deliveryAddress?.name || 'N/A'}</p>
                <p style="margin: 5px 0; color: var(--text-light);">${order.deliveryAddress?.street || 'N/A'}</p>
                <p style="margin: 5px 0; color: var(--text-light);">${order.deliveryAddress?.city || 'N/A'}</p>
                <p style="margin: 5px 0; color: var(--text-light);"><i class="fas fa-phone"></i> ${order.deliveryAddress?.phone || 'N/A'}</p>
            </div>
        </div>
        
        <div class="order-details-section">
            <h3><i class="fas fa-receipt"></i> Payment Summary</h3>
            <div class="order-details-summary">
                <div class="summary-row">
                    <span class="summary-label">Subtotal (${order.items.length} ${order.items.length > 1 ? 'items' : 'item'})</span>
                    <span class="summary-value">₱${order.subtotal.toLocaleString()}</span>
                </div>
                <div class="summary-row">
                    <span class="summary-label">Delivery Fee</span>
                    <span class="summary-value">₱${order.delivery.toLocaleString()}</span>
                </div>
                <div class="summary-row summary-total">
                    <span class="summary-label"><strong>Total Amount</strong></span>
                    <span class="summary-value"><strong>₱${order.total.toLocaleString()}</strong></span>
                </div>
                <div class="summary-row">
                    <span class="summary-label">Payment Method</span>
                    <span class="summary-value">
                        <span class="payment-badge">${order.paymentMethod}</span>
                    </span>
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
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const order = orders.find(o => o.id === orderId);
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
            // Open checkout modal
            openCheckoutModal();
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
    
    // Completely clear the cart items list
    cartItemsList.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsList.innerHTML = `
            <div class="empty-cart-message" id="emptyCartMessage">
                <i class="fas fa-shopping-cart"></i>
                <p>Your cart is empty</p>
            </div>
        `;
        if (cartCheckoutBtn) cartCheckoutBtn.disabled = true;
        if (cartSubtotal) cartSubtotal.textContent = '₱0.00';
        if (cartDeliveryFee) cartDeliveryFee.textContent = '₱0.00';
        if (cartTotal) cartTotal.textContent = '₱0.00';
        return;
    }
    
    if (cartCheckoutBtn) cartCheckoutBtn.disabled = false;
    
    // Calculate totals
    let subtotal = 0;
    
    // Build cart items HTML
    const cartItemsHTML = cart.map((item, index) => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        
        return `
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
    }).join('');
    
    // Set the HTML
    cartItemsList.innerHTML = cartItemsHTML;
    
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
let displayFeaturedProducts; // Global reference for refreshing
let currentStationIndex = 0; // Make station index global

function initFeaturedProducts() {
    const stations = ['new-arrivals', 'best-deals', 'popular', 'pautang-deals'];
    const stationTitles = {
        'new-arrivals': '<i class="fas fa-star"></i> New Arrivals',
        'best-deals': '<i class="fas fa-fire"></i> Best Deals',
        'popular': '<i class="fas fa-trophy"></i> Popular',
        'pautang-deals': '<i class="fas fa-hand-holding-usd"></i> Pautang Deals'
    };
    
    displayFeaturedProducts = function() {
        const featuredProductsGrid = document.getElementById('featuredProductsGrid');
        const featuredProductsTitle = document.getElementById('featuredProductsTitle');
        
        if (!featuredProductsGrid || !featuredProductsTitle) return;
        
        // Get products from the current station
        const currentStation = stations[currentStationIndex];
        
        // Load products from localStorage
        const products = JSON.parse(localStorage.getItem('products')) || [];
        
        // Check if products are available
        if (!products.length) {
            featuredProductsGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-light);">No products available</p>';
            return;
        }
        
        // Filter products by station using badge-based filtering
        let stationProducts;
        if (currentStation === 'new-arrivals') {
            stationProducts = products.filter(p => p.badge === 'new');
        } else if (currentStation === 'best-deals') {
            stationProducts = products.filter(p => p.badge === 'sale');
        } else if (currentStation === 'popular') {
            stationProducts = products.filter(p => p.badge === 'hot');
        } else if (currentStation === 'pautang-deals') {
            stationProducts = products.filter(p => p.badge === 'bundle' || p.station === 'pautang-deals');
        } else {
            stationProducts = products;
        }
        
        // Shuffle and get 4 random products
        stationProducts = stationProducts.sort(() => 0.5 - Math.random()).slice(0, 4);
        
        // Update title
        featuredProductsTitle.innerHTML = stationTitles[currentStation];
        
        // Render products with fade effect
        featuredProductsGrid.style.opacity = '0';
        
        setTimeout(() => {
            featuredProductsGrid.innerHTML = stationProducts.map(product => {
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
                        <button class="btn-add-wishlist ${isInWishlistDashboard(product.id) ? 'active' : ''}" onclick="toggleWishlistDashboard(${product.id}, event)">
                            <i class="${isInWishlistDashboard(product.id) ? 'fas' : 'far'} fa-heart"></i>
                        </button>
                        <div class="product-image">
                            <img src="${product.image}" alt="${product.name}">
                            ${availabilityHTML}
                        </div>
                        <div class="product-info">
                            <h3>${product.name}</h3>
                            <p class="product-description">${product.description}</p>
                            <div class="product-rating" style="cursor: pointer;" title="Click to see all reviews">
                                ${getStarsHTML(product.rating)}
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
                                <button class="btn-add-cart" onclick="addProductToCart(${product.id})" ${!product.available || product.stock === 0 ? 'disabled' : ''}>
                                    <i class="fas fa-shopping-cart"></i> ${product.available && product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                                </button>
                                <button class="btn-view-reviews" onclick="viewProduct(${product.id})">
                                    <i class="fas fa-eye"></i> View Details
                                </button>
                            </div>
                        </div>
                    </div>
                `;
            }).join('');
            
            featuredProductsGrid.style.opacity = '1';
        }, 300);
        
        // Move to next station
        currentStationIndex = (currentStationIndex + 1) % stations.length;
    };
    
    // Create a refresh function that updates current station without advancing
    window.refreshFeaturedProducts = function() {
        // Temporarily move back one station
        currentStationIndex = (currentStationIndex - 1 + stations.length) % stations.length;
        // Then call display which will advance and show current
        displayFeaturedProducts();
    };
    
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

// Wishlist helper functions for featured products
function isInWishlistDashboard(productId) {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    return wishlist.some(item => item.id === productId);
}

window.toggleWishlistDashboard = function(productId, event) {
    if (event) {
        event.stopPropagation();
    }
    
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const existingIndex = wishlist.findIndex(item => item.id === productId);
    
    if (existingIndex !== -1) {
        // Remove from wishlist
        wishlist.splice(existingIndex, 1);
        showNotification(`${product.name} removed from wishlist`, 'info');
    } else {
        // Add to wishlist
        wishlist.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            description: product.description || 'Premium bakery equipment'
        });
        showNotification(`${product.name} added to wishlist!`, 'success');
    }
    
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    
    // Update wishlist badge
    if (typeof updateFavoritesBadge === 'function') {
        updateFavoritesBadge();
    }
    
    // Update wishlist section
    if (typeof loadWishlistSection === 'function') {
        loadWishlistSection();
    }
    
    // Update sidebar badge
    const wishlistBadge = document.querySelector('.nav-item[data-section="wishlist"] .nav-badge');
    if (wishlistBadge) {
        wishlistBadge.textContent = wishlist.length;
    }
    
    // Re-render featured products to update heart icon
    const currentGrid = document.getElementById('featuredProductsGrid');
    if (currentGrid) {
        const buttons = currentGrid.querySelectorAll('.btn-add-wishlist');
        buttons.forEach(btn => {
            const btnProductId = parseInt(btn.getAttribute('onclick').match(/\d+/)[0]);
            if (btnProductId === productId) {
                const icon = btn.querySelector('i');
                if (existingIndex !== -1) {
                    btn.classList.remove('active');
                    icon.classList.remove('fas');
                    icon.classList.add('far');
                } else {
                    btn.classList.add('active');
                    icon.classList.remove('far');
                    icon.classList.add('fas');
                }
            }
        });
    }
};

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
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    // Check stock availability
    if (!product.available || product.stock === 0) {
        showNotification('Product is out of stock!', 'error');
        return;
    }
    
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.id === productId);
    
    // Check if adding would exceed stock
    const currentQuantity = existingItem ? existingItem.quantity : 0;
    if (currentQuantity + 1 > product.stock) {
        showNotification(`Only ${product.stock} items available in stock!`, 'warning');
        return;
    }
    
    if (existingItem) {
        existingItem.quantity += 1;
        showNotification(`${product.name} quantity updated in cart!`, 'success');
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
        showNotification(`${product.name} added to cart!`, 'success');
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartBadges();
    updateCartPanel();
};

// Load Delivered Orders in Dashboard
function loadDeliveredOrders() {
    const deliveredOrdersList = document.getElementById('deliveredOrdersList');
    if (!deliveredOrdersList) return;
    
    // Load orders from localStorage
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    if (!orders || orders.length === 0) {
        deliveredOrdersList.innerHTML = `
            <div style="text-align: center; padding: 40px 20px;">
                <i class="fas fa-box-open" style="font-size: 3rem; color: var(--text-light); margin-bottom: 15px;"></i>
                <p style="color: var(--text-light);">No delivered orders yet</p>
            </div>
        `;
        return;
    }
    
    // Filter only delivered orders
    const deliveredOrders = orders.filter(order => order.status === 'delivered').slice(0, 3);
    
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
    
    // Dropdown toggle
    document.addEventListener('click', (e) => {
        const filterBtn = document.getElementById('favoritesFilterBtn');
        const filterMenu = document.getElementById('favoritesFilterMenu');
        
        if (e.target.closest('#favoritesFilterBtn')) {
            e.stopPropagation();
            filterBtn?.classList.toggle('active');
            filterMenu?.classList.toggle('active');
        } else if (!e.target.closest('.favorites-filter-menu')) {
            filterBtn?.classList.remove('active');
            filterMenu?.classList.remove('active');
        }
        
        // Handle filter option click
        if (e.target.closest('.filter-option')) {
            e.stopPropagation();
            const option = e.target.closest('.filter-option');
            const category = option.getAttribute('data-category');
            
            // Update button text
            const currentFilterText = document.getElementById('currentFilterText');
            if (currentFilterText) {
                const categoryNames = {
                    'all': 'All',
                    'new': 'New Arrivals',
                    'sale': 'Best Deals',
                    'hot': 'Popular',
                    'bundle': 'Pautang Deals'
                };
                currentFilterText.textContent = categoryNames[category] || 'All';
            }
            
            // Close dropdown
            filterBtn?.classList.remove('active');
            filterMenu?.classList.remove('active');
            
            // Update panel with filter
            updateFavoritesPanel(category);
        }
    });
    
    // Update badge on load
    updateFavoritesBadge();
}

function updateFavoritesPanel(filterCategory = 'all') {
    const favoritesItemsList = document.getElementById('favoritesItemsList');
    if (!favoritesItemsList) return;
    
    let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const products = JSON.parse(localStorage.getItem('products')) || [];
    
    // Get full product details with badge info
    let wishlistWithBadges = wishlist.map(item => {
        const fullProduct = products.find(p => p.id === item.id);
        return {
            ...item,
            badge: fullProduct ? fullProduct.badge : null
        };
    });
    
    // Filter by category
    if (filterCategory !== 'all') {
        wishlistWithBadges = wishlistWithBadges.filter(item => item.badge === filterCategory);
    }
    
    if (wishlistWithBadges.length === 0) {
        const emptyMessage = filterCategory === 'all' 
            ? 'No favorites yet' 
            : `No ${getCategoryName(filterCategory)} in favorites`;
        
        favoritesItemsList.innerHTML = `
            <div style="text-align: center; padding: 60px 20px;">
                <i class="fas fa-heart" style="font-size: 4rem; color: var(--text-light); margin-bottom: 15px;"></i>
                <p style="color: var(--text-light); font-size: 1.1rem;">${emptyMessage}</p>
                <p style="color: var(--text-light); font-size: 0.9rem;">Heart products from the shop to see them here!</p>
            </div>
        `;
        return;
    }
    
    favoritesItemsList.innerHTML = wishlistWithBadges.map(item => `
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

function getCategoryName(badge) {
    const names = {
        'new': 'New Arrivals',
        'sale': 'Best Deals',
        'hot': 'Popular',
        'bundle': 'Pautang Deals'
    };
    return names[badge] || 'products';
}

function updateFavoritesBadge() {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    
    // Update all wishlist badges
    const wishlistBadges = document.querySelectorAll('.wishlist-badge');
    wishlistBadges.forEach(badge => {
        badge.textContent = wishlist.length;
    });
}

function removeFavorite(productId) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    wishlist = wishlist.filter(item => item.id !== productId);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    
    updateFavoritesPanel();
    updateFavoritesBadge();
    showNotification('Removed from favorites', 'success');
    
    // Update sidebar badge
    const wishlistBadge = document.querySelector('.nav-item[data-section="wishlist"] .nav-badge');
    if (wishlistBadge) {
        wishlistBadge.textContent = wishlist.length;
    }
    
    // Update heart icons in Featured Products section
    const currentGrid = document.getElementById('featuredProductsGrid');
    if (currentGrid) {
        const buttons = currentGrid.querySelectorAll('.btn-add-wishlist');
        buttons.forEach(btn => {
            const btnProductId = parseInt(btn.getAttribute('onclick').match(/\d+/)[0]);
            if (btnProductId === productId) {
                const icon = btn.querySelector('i');
                btn.classList.remove('active');
                icon.classList.remove('fas');
                icon.classList.add('far');
            }
        });
    }
    
    // Update heart icons in Shop section if it exists
    const shopGrid = document.getElementById('productsGrid');
    if (shopGrid && typeof renderProducts === 'function') {
        const categoryFilter = document.getElementById('categoryFilter');
        const sortFilter = document.getElementById('sortFilter');
        const searchInput = document.getElementById('productSearch');
        
        renderProducts(
            categoryFilter ? categoryFilter.value : 'all',
            sortFilter ? sortFilter.value : 'featured',
            searchInput ? searchInput.value : ''
        );
    }
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
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    if (!orders || orders.length === 0) return;
    
    let notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    
    // Only generate notifications for recent orders (avoid duplicates)
    orders.forEach(order => {
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
    
    // Update heart icons in Featured Products section
    const currentGrid = document.getElementById('featuredProductsGrid');
    if (currentGrid) {
        const buttons = currentGrid.querySelectorAll('.btn-add-wishlist');
        buttons.forEach(btn => {
            const btnProductId = parseInt(btn.getAttribute('onclick').match(/\d+/)[0]);
            if (btnProductId === productId) {
                const icon = btn.querySelector('i');
                btn.classList.remove('active');
                icon.classList.remove('fas');
                icon.classList.add('far');
            }
        });
    }
    
    // Update heart icons in Shop section if it exists
    const shopGrid = document.getElementById('productsGrid');
    if (shopGrid && typeof renderProducts === 'function') {
        const categoryFilter = document.getElementById('categoryFilter');
        const sortFilter = document.getElementById('sortFilter');
        const searchInput = document.getElementById('productSearch');
        
        renderProducts(
            categoryFilter ? categoryFilter.value : 'all',
            sortFilter ? sortFilter.value : 'featured',
            searchInput ? searchInput.value : ''
        );
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
    // Load products from localStorage
    const products = JSON.parse(localStorage.getItem('products')) || [];
    
    // Check if products data exists
    if (!products.length) {
        showNotification('Product data not available', 'error');
        return;
    }
    
    const product = products.find(p => p.id === productId);
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
    const products = JSON.parse(localStorage.getItem('products')) || [];
    if (products.length === 0) return;
    
    const suggestions = products.filter(p => 
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

// ========================================
// CHECKOUT FUNCTIONALITY
// ========================================

function openCheckoutModal() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) return;
    
    const modal = document.getElementById('checkoutModal');
    const checkoutSummary = document.getElementById('checkoutSummary');
    
    // Calculate totals
    let subtotal = 0;
    cart.forEach(item => {
        subtotal += item.price * item.quantity;
    });
    const deliveryFee = 100;
    const total = subtotal + deliveryFee;
    
    // Render order summary
    checkoutSummary.innerHTML = `
        <h3><i class="fas fa-shopping-bag"></i> Order Summary</h3>
        <div class="checkout-items">
            ${cart.map(item => `
                <div class="checkout-item">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="checkout-item-details">
                        <h4>${item.name}</h4>
                        <p>₱${item.price.toLocaleString()} × ${item.quantity}</p>
                    </div>
                    <div class="checkout-item-total">
                        ₱${(item.price * item.quantity).toLocaleString()}
                    </div>
                </div>
            `).join('')}
        </div>
        <div class="checkout-totals">
            <div class="checkout-total-row">
                <span>Subtotal:</span>
                <span>₱${subtotal.toLocaleString()}</span>
            </div>
            <div class="checkout-total-row">
                <span>Delivery Fee:</span>
                <span>₱${deliveryFee.toLocaleString()}</span>
            </div>
            <div class="checkout-total-row final-total">
                <span>Total:</span>
                <span>₱${total.toLocaleString()}</span>
            </div>
        </div>
    `;
    
    // Update available balance display
    const balance = parseFloat(localStorage.getItem('userBalance') || '50000');
    const availableBalance = document.getElementById('availableBalance');
    if (availableBalance) {
        availableBalance.textContent = `₱${balance.toLocaleString('en-US', {minimumFractionDigits: 2})}`;
    }
    
    modal.classList.add('active');
}

function closeCheckoutModal() {
    const modal = document.getElementById('checkoutModal');
    modal.classList.remove('active');
}

function confirmCheckout() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked')?.value;
    
    if (!paymentMethod) {
        showNotification('Please select a payment method', 'warning');
        return;
    }
    
    // Calculate total
    let subtotal = 0;
    cart.forEach(item => {
        subtotal += item.price * item.quantity;
    });
    const deliveryFee = 100;
    const total = subtotal + deliveryFee;
    
    // Check balance if paying with account balance
    if (paymentMethod === 'balance') {
        const balance = parseFloat(localStorage.getItem('userBalance') || '50000');
        if (balance < total) {
            showNotification('Insufficient balance! Please use Cash on Delivery.', 'error');
            return;
        }
    }
    
    // Update product stocks
    let products = JSON.parse(localStorage.getItem('products')) || [];
    
    cart.forEach(cartItem => {
        const productIndex = products.findIndex(p => p.id === cartItem.id);
        if (productIndex !== -1) {
            products[productIndex].stock -= cartItem.quantity;
            if (products[productIndex].stock < 0) {
                products[productIndex].stock = 0;
            }
            products[productIndex].available = products[productIndex].stock > 0;
        }
    });
    
    // Update balance if paying with account balance
    if (paymentMethod === 'balance') {
        const currentBalance = parseFloat(localStorage.getItem('userBalance') || '50000');
        const newBalance = currentBalance - total;
        localStorage.setItem('userBalance', newBalance.toString());
        
        // Update balance display in cart panel
        const balanceAmount = document.getElementById('cartBalanceAmount');
        if (balanceAmount) {
            balanceAmount.textContent = `₱${newBalance.toLocaleString('en-US', {minimumFractionDigits: 2})}`;
        }
    }
    
    // Save updated products to localStorage
    localStorage.setItem('products', JSON.stringify(products));
    
    // Create order with complete tracking and customer info
    const now = new Date();
    const order = {
        id: 'ORD-' + Date.now(),
        date: now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
        dateISO: now.toISOString(),
        items: cart,
        subtotal: subtotal,
        delivery: deliveryFee,
        total: total,
        paymentMethod: paymentMethod === 'balance' ? 'Account Balance' : 'Cash on Delivery',
        status: 'pending',
        customerName: 'Juan Dela Cruz',
        deliveryAddress: {
            name: 'Juan Dela Cruz',
            street: '123 Bakery Street, Poblacion District',
            city: 'Davao City, 8000',
            phone: '+63 912 345 6789'
        },
        tracking: {
            orderPlaced: {
                completed: true,
                date: now.toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
                location: 'Order received and confirmed'
            },
            processing: { completed: false, date: null, location: null },
            preparing: { completed: false, date: null, location: null },
            shipping: { completed: false, date: null, location: null },
            delivered: { completed: false, date: null, location: null }
        },
        driverLocation: null
    };
    
    // Save order
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
    
    // Clear cart
    localStorage.setItem('cart', JSON.stringify([]));
    
    // Close modal and cart panel
    closeCheckoutModal();
    closeCartPanel();
    
    // Update UI
    updateCartBadges();
    updateCartPanel();
    
    // Refresh featured products to show updated stock (without advancing station)
    if (typeof refreshFeaturedProducts === 'function') {
        refreshFeaturedProducts();
    }
    
    // Re-render products if on shop page
    if (typeof renderProducts === 'function') {
        const categoryFilter = document.getElementById('categoryFilter');
        const sortFilter = document.getElementById('sortFilter');
        const searchInput = document.getElementById('productSearch');
        
        renderProducts(
            categoryFilter ? categoryFilter.value : 'all',
            sortFilter ? sortFilter.value : 'featured',
            searchInput ? searchInput.value : ''
        );
    }
    
    // Show success message
    const paymentText = paymentMethod === 'balance' ? 'paid with account balance' : 'will be paid on delivery';
    showNotification(`Order placed successfully! (${order.id}) - ${paymentText}`, 'success');
    
    // Start order status progression
    startOrderStatusProgression(order.id);
}

// Automatic Order Status Progression
function startOrderStatusProgression(orderId) {
    // Start with showing the initial pending message
    showNotification('Waiting for the order to be accepted.', 'info');
    
    const statusSequence = [
        { status: 'processing', message: 'Order accepted - Your product is now being processed.' },
        { status: 'preparing', message: 'Preparing your order for shipment.' },
        { status: 'shipped', message: 'Package picked up. Please wait for delivery.' },
        { status: 'delivered', message: 'Package has been delivered.' }
    ];
    let currentStatusIndex = 0;
    
    const progressInterval = setInterval(() => {
        if (currentStatusIndex >= statusSequence.length) {
            clearInterval(progressInterval);
            
            // After delivered, wait 24 hours then auto-delete the order
            setTimeout(() => {
                deleteDeliveredOrder(orderId);
            }, 86400000); // 24 hours = 86400000 milliseconds
            return;
        }
        
        const { status: newStatus, message } = statusSequence[currentStatusIndex];
        
        // Update order status in localStorage
        const orders = JSON.parse(localStorage.getItem('orders') || '[]');
        const orderIndex = orders.findIndex(o => o.id === orderId);
        
        if (orderIndex !== -1) {
            const now = new Date();
            const timestamp = now.toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
            
            orders[orderIndex].status = newStatus;
            
            // Update tracking timestamps and locations
            if (newStatus === 'processing' && currentStatusIndex === 0) {
                orders[orderIndex].tracking.processing = {
                    completed: true,
                    date: timestamp,
                    location: 'Warehouse - Processing Center'
                };
                orders[orderIndex].eta = new Date(Date.now() + 50 * 60 * 1000).toISOString();
            } else if (newStatus === 'preparing') {
                orders[orderIndex].tracking.preparing = {
                    completed: true,
                    date: timestamp,
                    location: 'Warehouse - Packing Station'
                };
            } else if (newStatus === 'shipped') {
                orders[orderIndex].tracking.shipping = {
                    completed: true,
                    date: timestamp,
                    location: 'Out for delivery - Driver assigned'
                };
                orders[orderIndex].trackingEnabled = true;
                orders[orderIndex].courierName = 'Express Delivery';
                orders[orderIndex].driverName = 'Mark Johnson';
                orders[orderIndex].driverPhone = '+63 917 123 4567';
                // Initialize driver location (simulated GPS coordinates)
                orders[orderIndex].driverLocation = {
                    lat: 7.0731,
                    lng: 125.6128,
                    progress: 0 // 0-100% of delivery route
                };
                
                // Start driver movement simulation
                simulateDriverMovement(orderId);
            } else if (newStatus === 'delivered') {
                orders[orderIndex].tracking.delivered = {
                    completed: true,
                    date: timestamp,
                    location: 'Delivered to customer'
                };
                if (orders[orderIndex].driverLocation) {
                    orders[orderIndex].driverLocation.progress = 100;
                }
            }
            
            localStorage.setItem('orders', JSON.stringify(orders));
            
            // Refresh orders display if on orders section
            const ordersSection = document.getElementById('orders-section');
            if (ordersSection && ordersSection.classList.contains('active')) {
                renderOrders();
            }
            
            // Refresh tracking modal if it's currently open for this order
            const trackingModal = document.getElementById('orderTrackingModal');
            if (trackingModal && trackingModal.classList.contains('active')) {
                openOrderTracking(orderId);
            }
            
            // Show notification with detailed message
            showNotification(message, 'success');
        }
        
        currentStatusIndex++;
    }, 25000); // 25 seconds per stage
}

// Simulate driver movement during shipping
function simulateDriverMovement(orderId) {
    const driverInterval = setInterval(() => {
        const orders = JSON.parse(localStorage.getItem('orders') || '[]');
        const orderIndex = orders.findIndex(o => o.id === orderId);
        
        if (orderIndex === -1 || orders[orderIndex].status !== 'shipped') {
            clearInterval(driverInterval);
            return;
        }
        
        // Move driver 4% every second (will reach 100% in 25 seconds)
        if (orders[orderIndex].driverLocation) {
            orders[orderIndex].driverLocation.progress += 4;
            
            if (orders[orderIndex].driverLocation.progress > 100) {
                orders[orderIndex].driverLocation.progress = 100;
                clearInterval(driverInterval);
            }
            
            localStorage.setItem('orders', JSON.stringify(orders));
            
            // Refresh tracking modal if it's open for this specific order
            const trackingModal = document.getElementById('orderTrackingModal');
            if (trackingModal && trackingModal.classList.contains('active')) {
                const trackingOrderInfo = document.getElementById('trackingOrderInfo');
                if (trackingOrderInfo && trackingOrderInfo.querySelector('h3')?.textContent === orderId) {
                    // Update driver position dynamically without full reload
                    const driverMarker = document.querySelector('.driver-marker');
                    if (driverMarker) {
                        driverMarker.style.left = orders[orderIndex].driverLocation.progress + '%';
                        const progressSpan = driverMarker.querySelector('.driver-info span');
                        if (progressSpan) {
                            progressSpan.textContent = Math.round(orders[orderIndex].driverLocation.progress) + '% complete';
                        }
                    }
                }
            }
            
            // Refresh order cards if on orders section
            const ordersSection = document.getElementById('orders-section');
            if (ordersSection && ordersSection.classList.contains('active')) {
                renderOrders();
            }
        }
    }, 1000); // Update every second
}

// Cancel Order (only for pending orders)
window.cancelOrder = function(orderId) {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const order = orders.find(o => o.id === orderId);
    
    if (!order) {
        showNotification('Order not found', 'error');
        return;
    }
    
    if (order.status !== 'pending') {
        showNotification('Cannot cancel order - already processing', 'error');
        return;
    }
    
    // Confirm cancellation
    if (!confirm(`Are you sure you want to cancel order ${orderId}?`)) {
        return;
    }
    
    // Restore stock for cancelled order
    const products = JSON.parse(localStorage.getItem('products')) || [];
    order.items.forEach(item => {
        const productIndex = products.findIndex(p => p.id === item.id);
        if (productIndex !== -1) {
            products[productIndex].stock += item.quantity;
        }
    });
    localStorage.setItem('products', JSON.stringify(products));
    
    // Remove order from localStorage
    const updatedOrders = orders.filter(o => o.id !== orderId);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
    
    // Close modal and refresh
    closeOrderTrackingModal();
    renderOrders();
    
    showNotification('Order cancelled successfully. Stock has been restored.', 'success');
};

// Delete Order (manual deletion by user)
window.deleteOrder = function(orderId) {
    if (!confirm(`Are you sure you want to delete order ${orderId}? This action cannot be undone.`)) {
        return;
    }
    
    let orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders = orders.filter(o => o.id !== orderId);
    localStorage.setItem('orders', JSON.stringify(orders));
    
    // Close modal and refresh
    closeOrderTrackingModal();
    renderOrders();
    
    showNotification('Order deleted successfully', 'info');
};

// Delete delivered order from localStorage (auto-deletion)
function deleteDeliveredOrder(orderId) {
    let orders = JSON.parse(localStorage.getItem('orders') || '[]');
    
    // Remove the delivered order
    orders = orders.filter(o => o.id !== orderId);
    localStorage.setItem('orders', JSON.stringify(orders));
    
    // Refresh orders display if on orders section
    const ordersSection = document.getElementById('orders-section');
    if (ordersSection && ordersSection.classList.contains('active')) {
        renderOrders();
        showNotification('Delivered order has been removed from your list', 'info');
    }
    
    console.log(`Order ${orderId} removed after delivery`);
}

// Reviews Modal Close Functionality
const closeReviewsModalBtn = document.getElementById('closeReviewsModal');
const reviewsModal = document.getElementById('reviewsModal');

if (closeReviewsModalBtn) {
    closeReviewsModalBtn.addEventListener('click', () => {
        if (typeof closeReviewsModal === 'function') {
            closeReviewsModal();
        }
    });
}

// Close reviews modal when clicking outside
if (reviewsModal) {
    reviewsModal.addEventListener('click', (e) => {
        if (e.target === reviewsModal) {
            if (typeof closeReviewsModal === 'function') {
                closeReviewsModal();
            }
        }
    });
}

// Update Category Counts
function updateCategoryCounts() {
    // Prioritize localStorage products (actual shop inventory) over allProducts from products-data.js
    let products = [];
    
    // Try to get from localStorage first
    try {
        const storedProducts = localStorage.getItem('products');
        if (storedProducts) {
            products = JSON.parse(storedProducts);
        }
    } catch (error) {
        console.error('Error reading from localStorage:', error);
    }
    
    // Fallback to allProducts if localStorage is empty
    if (products.length === 0 && typeof allProducts !== 'undefined') {
        products = allProducts;
    }
    
    // Count products by category
    const categoryCounts = {};
    products.forEach(product => {
        if (product.category) {
            categoryCounts[product.category] = (categoryCounts[product.category] || 0) + 1;
        }
    });
    
    // Update each category card
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        const category = card.getAttribute('data-category');
        const itemCountElement = card.querySelector('.item-count');
        
        if (category && itemCountElement) {
            const count = categoryCounts[category] || 0;
            itemCountElement.textContent = `${count} ${count === 1 ? 'item' : 'items'}`;
        }
    });
    
    console.log('Category counts updated:', categoryCounts);
}

// Alias for consistency
function updateCategoryItemCounts() {
    updateCategoryCounts();
}

// Console welcome message
console.log('%c🎯 Dashboard Loaded Successfully!', 'color: #FF6B35; font-size: 16px; font-weight: bold;');
console.log('%cWelcome to your U-BEST Dashboard', 'color: #4ECDC4; font-size: 12px;');


