// ============================================
// ADMIN DASHBOARD JAVASCRIPT
// ============================================

// Check if admin is logged in
document.addEventListener('DOMContentLoaded', () => {
    checkAdminAuth();
    initializeAdminDashboard();
    loadAdminStats();
    loadRecentOrders();
    initAdminNavigation();
    initAdminSidebar();
    initAdminUserMenu();
});

// Authentication Check
function checkAdminAuth() {
    const currentUser = localStorage.getItem('currentUser');
    
    if (!currentUser) {
        window.location.href = 'index.html';
        return;
    }
    
    try {
        const user = JSON.parse(currentUser);
        if (user.role !== 'admin') {
            // Not an admin, redirect to customer dashboard
            window.location.href = 'dashboard.html';
            return;
        }
        updateAdminUserInfo(user);
    } catch (error) {
        console.error('Error loading admin data:', error);
        window.location.href = 'index.html';
    }
}

function updateAdminUserInfo(user) {
    const userName = document.getElementById('adminUserName');
    if (userName) {
        userName.textContent = user.name;
    }
}

// Initialize Admin Dashboard
function initializeAdminDashboard() {
    // Sign out
    const signOutLink = document.getElementById('adminSignOutLink');
    if (signOutLink) {
        signOutLink.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('currentUser');
            showNotification('Signed out successfully', 'success');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        });
    }
}

// Load Admin Stats
function loadAdminStats() {
    const stats = DataManager.getStatistics();
    
    // Update UI
    document.getElementById('totalRevenue').textContent = `₱${stats.totalRevenue.toLocaleString('en-US', {minimumFractionDigits: 2})}`;
    document.getElementById('totalOrders').textContent = stats.totalOrders;
    document.getElementById('totalCustomers').textContent = stats.totalCustomers;
    document.getElementById('pendingOrders').textContent = stats.pendingOrders;
    
    // Update quick stats
    document.getElementById('quickOrdersCount').textContent = stats.totalOrders;
    document.getElementById('quickUsersCount').textContent = stats.totalCustomers;
    
    const products = DataManager.getProducts();
    document.getElementById('quickProductsCount').textContent = products.length;
}

// Load Recent Orders
function loadRecentOrders() {
    const recentOrdersList = document.getElementById('recentOrdersList');
    if (!recentOrdersList) return;
    
    const orders = DataManager.getOrders();
    const recentOrders = orders.slice(0, 5);
    
    if (recentOrders.length === 0) {
        recentOrdersList.innerHTML = '<p style="text-align: center; color: var(--text-light); padding: 20px;">No recent orders</p>';
        return;
    }
    
    recentOrdersList.innerHTML = recentOrders.map(order => {
        const total = order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        return `
            <div class="recent-order-item" style="display: flex; justify-content: space-between; align-items: center; padding: 15px; border-bottom: 1px solid var(--border-color);">
                <div>
                    <strong>Order #${order.id}</strong>
                    <p style="margin: 5px 0 0 0; font-size: 0.9rem; color: var(--text-light);">${order.items.length} items</p>
                </div>
                <div style="text-align: right;">
                    <div class="order-status ${order.status}">${order.status}</div>
                    <p style="margin: 5px 0 0 0; font-weight: 600; color: var(--text-dark);">₱${total.toLocaleString()}</p>
                </div>
            </div>
        `;
    }).join('');
}

// Navigation
function initAdminNavigation() {
    const navItems = document.querySelectorAll('.nav-item[data-section]');
    const sections = document.querySelectorAll('.content-section');
    
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = item.getAttribute('data-section');
            
            // Remove active class
            navItems.forEach(nav => nav.classList.remove('active'));
            sections.forEach(section => section.classList.remove('active'));
            
            // Add active class
            item.classList.add('active');
            const targetSection = document.getElementById(`${sectionId}-section`);
            if (targetSection) {
                targetSection.classList.add('active');
                window.scrollTo({ top: 0, behavior: 'smooth' });
                
                // Load section-specific data
                if (sectionId === 'orders') {
                    loadAdminOrders();
                } else if (sectionId === 'products') {
                    loadAdminProducts();
                } else if (sectionId === 'customers') {
                    loadAdminCustomers();
                } else if (sectionId === 'inventory') {
                    loadAdminInventory();
                } else if (sectionId === 'reviews') {
                    loadAdminReviews();
                } else if (sectionId === 'tickets') {
                    loadAdminTickets();
                }
            }
        });
    });
}

// Sidebar Toggle
function initAdminSidebar() {
    const toggle = document.getElementById('adminSidebarToggle');
    const sidebar = document.getElementById('adminSidebar');
    
    if (toggle && sidebar) {
        toggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });
    }
}

// User Menu
function initAdminUserMenu() {
    const menuBtn = document.getElementById('adminUserMenuBtn');
    const dropdown = document.getElementById('adminUserDropdown');
    
    if (menuBtn && dropdown) {
        menuBtn.addEventListener('click', () => {
            dropdown.classList.toggle('active');
        });
        
        document.addEventListener('click', (e) => {
            if (!menuBtn.contains(e.target) && !dropdown.contains(e.target)) {
                dropdown.classList.remove('active');
            }
        });
    }
}

// Load Orders
function loadAdminOrders() {
    const tbody = document.getElementById('adminOrdersTableBody');
    if (!tbody) return;
    
    const orders = DataManager.getOrders();
    
    if (orders.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align: center; padding: 40px; color: var(--text-light);">No orders found</td></tr>';
        return;
    }
    
    tbody.innerHTML = orders.map(order => {
        const total = order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const customer = 'Customer ' + order.id.toString().padStart(3, '0');
        
        return `
            <tr>
                <td><strong>#${order.id}</strong></td>
                <td>${customer}</td>
                <td>${order.date}</td>
                <td>${order.items.length} items</td>
                <td><strong>₱${total.toLocaleString()}</strong></td>
                <td><span class="order-status ${order.status}">${order.status}</span></td>
                <td>
                    <div class="action-btns">
                        <button class="btn-action view" onclick="viewOrderDetails(${order.id})">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn-action edit" onclick="updateOrderStatus(${order.id})">
                            <i class="fas fa-edit"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

// Load Products
function loadAdminProducts() {
    const grid = document.getElementById('adminProductsGrid');
    if (!grid) return;
    
    const products = DataManager.getProducts();
    
    if (products.length === 0) {
        grid.innerHTML = '<p style="text-align: center; padding: 40px; color: var(--text-light);">No products found</p>';
        return;
    }
    
    grid.innerHTML = products.slice(0, 12).map(product => `
        <div class="admin-product-card">
            <img src="${product.image}" alt="${product.name}">
            <div class="admin-product-info">
                <h3>${product.name}</h3>
                <div class="admin-product-price">₱${product.price.toLocaleString()}</div>
                <div class="admin-product-actions">
                    <button class="btn-action edit" onclick="editProduct(${product.id})">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn-action delete" onclick="deleteProduct(${product.id})">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Load Customers
function loadAdminCustomers() {
    const tbody = document.getElementById('adminCustomersTableBody');
    if (!tbody) return;
    
    const users = DataManager.getUsers().filter(u => u.role !== 'admin');
    
    if (users.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align: center; padding: 40px; color: var(--text-light);">No customers found</td></tr>';
        return;
    }
    
    tbody.innerHTML = users.map(user => `
        <tr>
            <td><strong>${user.name}</strong></td>
            <td>${user.email}</td>
            <td>${user.phone || 'N/A'}</td>
            <td>0</td>
            <td>₱0.00</td>
            <td>${new Date(user.createdAt).toLocaleDateString()}</td>
            <td>
                <div class="action-btns">
                    <button class="btn-action view" onclick="viewCustomerDetails('${user.email}')">
                        <i class="fas fa-eye"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

// Load Inventory
function loadAdminInventory() {
    const tbody = document.getElementById('adminInventoryTableBody');
    if (!tbody) return;
    
    const products = DataManager.getProducts();
    
    tbody.innerHTML = products.slice(0, 10).map(product => `
        <tr>
            <td><strong>${product.name}</strong></td>
            <td>SKU-${product.id.toString().padStart(5, '0')}</td>
            <td><strong>${Math.floor(Math.random() * 50) + 10}</strong></td>
            <td><span class="order-status delivered">In Stock</span></td>
            <td>${new Date().toLocaleDateString()}</td>
            <td>
                <button class="btn-action edit" onclick="updateStock(${product.id})">
                    <i class="fas fa-edit"></i> Update
                </button>
            </td>
        </tr>
    `).join('');
}

// Load Reviews
function loadAdminReviews() {
    const reviewsList = document.getElementById('adminReviewsList');
    if (!reviewsList) return;
    
    const reviews = DataManager.getReviews();
    
    if (reviews.length === 0) {
        reviewsList.innerHTML = '<p style="text-align: center; padding: 40px; color: var(--text-light);">No reviews yet</p>';
        return;
    }
    
    reviewsList.innerHTML = reviews.map(review => `
        <div class="review-card">
            <div class="review-header">
                <div>
                    <strong>${review.userName}</strong>
                    <div class="review-rating">
                        ${'<i class="fas fa-star"></i>'.repeat(review.rating)}
                    </div>
                </div>
                <span style="color: var(--text-light); font-size: 0.9rem;">${new Date(review.date).toLocaleDateString()}</span>
            </div>
            <h4>${review.title}</h4>
            <p style="color: var(--text-light); margin: 10px 0;">${review.text}</p>
            <p style="color: var(--text-light); font-size: 0.9rem;"><strong>Product:</strong> ${review.productName}</p>
        </div>
    `).join('');
}

// Load Support Tickets
function loadAdminTickets() {
    const ticketsList = document.getElementById('adminTicketsList');
    if (!ticketsList) return;
    
    const tickets = DataManager.getTickets();
    
    if (tickets.length === 0) {
        ticketsList.innerHTML = '<p style="text-align: center; padding: 40px; color: var(--text-light);">No support tickets</p>';
        return;
    }
    
    ticketsList.innerHTML = tickets.map(ticket => `
        <div class="ticket-card">
            <div class="ticket-header">
                <div>
                    <strong>${ticket.subject}</strong>
                    <p style="margin: 5px 0; color: var(--text-light);">${ticket.messages?.length || 0} messages</p>
                </div>
                <span class="order-status ${ticket.status === 'open' ? 'processing' : ticket.status === 'resolved' ? 'delivered' : 'pending'}">${ticket.status}</span>
            </div>
            <p style="color: var(--text-light); margin: 10px 0;">${ticket.description.substring(0, 100)}...</p>
            <button class="btn-action view" onclick="viewTicket('${ticket.id}')">
                <i class="fas fa-reply"></i> View & Reply
            </button>
        </div>
    `).join('');
}

// Action Functions
function viewOrderDetails(orderId) {
    showNotification(`Viewing order #${orderId}`, 'info');
}

function updateOrderStatus(orderId) {
    const newStatus = prompt('Enter new status (pending, processing, shipping, delivered, cancelled):');
    if (newStatus && ['pending', 'processing', 'shipping', 'delivered', 'cancelled'].includes(newStatus)) {
        if (DataManager.updateOrderStatus(orderId, newStatus)) {
            showNotification(`Order #${orderId} status updated to ${newStatus}`, 'success');
            loadAdminOrders();
            loadRecentOrders();
            loadAdminStats();
        } else {
            showNotification('Failed to update order status', 'error');
        }
    }
}

function editProduct(productId) {
    showNotification(`Editing product #${productId}`, 'info');
}

function deleteProduct(productId) {
    if (confirm('Are you sure you want to delete this product?')) {
        if (DataManager.deleteProduct(productId)) {
            showNotification(`Product deleted successfully`, 'success');
            loadAdminProducts();
            loadAdminInventory();
            loadAdminStats();
        } else {
            showNotification('Failed to delete product', 'error');
        }
    }
}

function viewCustomerDetails(email) {
    showNotification(`Viewing customer: ${email}`, 'info');
}

function updateStock(productId) {
    showNotification(`Updating stock for product #${productId}`, 'info');
}

function viewTicket(ticketId) {
    showNotification(`Viewing ticket #${ticketId}`, 'info');
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 30px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span style="margin-left: 10px;">${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Console log
console.log('%c🔐 Admin Dashboard Loaded!', 'color: #2563eb; font-size: 16px; font-weight: bold;');
console.log('%cAdmin Credentials: admin@ubest.com / admin123', 'color: #10b981; font-size: 12px;');
