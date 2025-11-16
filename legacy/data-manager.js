// ============================================
// DATA MANAGER - Centralized LocalStorage Management
// Shared between User Dashboard and Admin Panel
// ============================================

const DataManager = {
    // ============================================
    // USERS
    // ============================================
    getUsers: function() {
        try {
            return JSON.parse(localStorage.getItem('users') || '[]');
        } catch (error) {
            console.error('Error loading users:', error);
            return [];
        }
    },

    saveUsers: function(users) {
        try {
            localStorage.setItem('users', JSON.stringify(users));
            return true;
        } catch (error) {
            console.error('Error saving users:', error);
            return false;
        }
    },

    addUser: function(user) {
        const users = this.getUsers();
        users.push(user);
        return this.saveUsers(users);
    },

    updateUser: function(userId, updates) {
        const users = this.getUsers();
        const index = users.findIndex(u => u.id === userId || u.email === userId);
        if (index !== -1) {
            users[index] = { ...users[index], ...updates };
            return this.saveUsers(users);
        }
        return false;
    },

    deleteUser: function(userId) {
        const users = this.getUsers();
        const filtered = users.filter(u => u.id !== userId && u.email !== userId);
        return this.saveUsers(filtered);
    },

    getUserByEmail: function(email) {
        const users = this.getUsers();
        return users.find(u => u.email.toLowerCase() === email.toLowerCase());
    },

    getCurrentUser: function() {
        try {
            return JSON.parse(localStorage.getItem('currentUser'));
        } catch (error) {
            console.error('Error loading current user:', error);
            return null;
        }
    },

    setCurrentUser: function(user) {
        try {
            localStorage.setItem('currentUser', JSON.stringify(user));
            return true;
        } catch (error) {
            console.error('Error saving current user:', error);
            return false;
        }
    },

    // ============================================
    // PRODUCTS
    // ============================================
    getProducts: function() {
        try {
            // Products will be loaded from database via API
            const stored = localStorage.getItem('products');
            return stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.error('Error loading products:', error);
            return [];
        }
    },

    saveProducts: function(products) {
        try {
            localStorage.setItem('products', JSON.stringify(products));
            return true;
        } catch (error) {
            console.error('Error saving products:', error);
            return false;
        }
    },

    addProduct: function(product) {
        const products = this.getProducts();
        product.id = Date.now(); // Generate unique ID
        products.push(product);
        return this.saveProducts(products);
    },

    updateProduct: function(productId, updates) {
        const products = this.getProducts();
        const index = products.findIndex(p => p.id === productId);
        if (index !== -1) {
            products[index] = { ...products[index], ...updates };
            return this.saveProducts(products);
        }
        return false;
    },

    deleteProduct: function(productId) {
        const products = this.getProducts();
        const filtered = products.filter(p => p.id !== productId);
        return this.saveProducts(filtered);
    },

    getProductById: function(productId) {
        const products = this.getProducts();
        return products.find(p => p.id === productId);
    },

    // ============================================
    // ORDERS
    // ============================================
    getOrders: function() {
        try {
            // Orders will be loaded from database via API
            const stored = localStorage.getItem('orders');
            return stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.error('Error loading orders:', error);
            return [];
        }
    },

    saveOrders: function(orders) {
        try {
            localStorage.setItem('orders', JSON.stringify(orders));
            return true;
        } catch (error) {
            console.error('Error saving orders:', error);
            return false;
        }
    },

    addOrder: function(order) {
        const orders = this.getOrders();
        orders.unshift(order); // Add to beginning
        return this.saveOrders(orders);
    },

    updateOrder: function(orderId, updates) {
        const orders = this.getOrders();
        const index = orders.findIndex(o => o.id === orderId);
        if (index !== -1) {
            orders[index] = { ...orders[index], ...updates };
            return this.saveOrders(orders);
        }
        return false;
    },

    updateOrderStatus: function(orderId, status) {
        return this.updateOrder(orderId, { status });
    },

    deleteOrder: function(orderId) {
        const orders = this.getOrders();
        const filtered = orders.filter(o => o.id !== orderId);
        return this.saveOrders(filtered);
    },

    getUserOrders: function(userEmail) {
        const orders = this.getOrders();
        return orders.filter(o => o.userEmail === userEmail || o.deliveryAddress?.email === userEmail);
    },

    // ============================================
    // CART
    // ============================================
    getCart: function() {
        try {
            return JSON.parse(localStorage.getItem('cart') || '[]');
        } catch (error) {
            console.error('Error loading cart:', error);
            return [];
        }
    },

    saveCart: function(cart) {
        try {
            localStorage.setItem('cart', JSON.stringify(cart));
            return true;
        } catch (error) {
            console.error('Error saving cart:', error);
            return false;
        }
    },

    addToCart: function(item) {
        const cart = this.getCart();
        const existingIndex = cart.findIndex(i => i.id === item.id);
        
        if (existingIndex !== -1) {
            cart[existingIndex].quantity = (cart[existingIndex].quantity || 1) + (item.quantity || 1);
        } else {
            cart.push({ ...item, quantity: item.quantity || 1 });
        }
        
        return this.saveCart(cart);
    },

    removeFromCart: function(itemId) {
        const cart = this.getCart();
        const filtered = cart.filter(i => i.id !== itemId);
        return this.saveCart(filtered);
    },

    updateCartQuantity: function(itemId, quantity) {
        const cart = this.getCart();
        const index = cart.findIndex(i => i.id === itemId);
        if (index !== -1) {
            if (quantity <= 0) {
                return this.removeFromCart(itemId);
            }
            cart[index].quantity = quantity;
            return this.saveCart(cart);
        }
        return false;
    },

    clearCart: function() {
        return this.saveCart([]);
    },

    // ============================================
    // WISHLIST
    // ============================================
    getWishlist: function() {
        try {
            return JSON.parse(localStorage.getItem('wishlist') || '[]');
        } catch (error) {
            console.error('Error loading wishlist:', error);
            return [];
        }
    },

    saveWishlist: function(wishlist) {
        try {
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
            return true;
        } catch (error) {
            console.error('Error saving wishlist:', error);
            return false;
        }
    },

    addToWishlist: function(item) {
        const wishlist = this.getWishlist();
        const exists = wishlist.find(i => i.id === item.id);
        if (!exists) {
            wishlist.push(item);
            return this.saveWishlist(wishlist);
        }
        return false;
    },

    removeFromWishlist: function(itemId) {
        const wishlist = this.getWishlist();
        const filtered = wishlist.filter(i => i.id !== itemId);
        return this.saveWishlist(filtered);
    },

    isInWishlist: function(itemId) {
        const wishlist = this.getWishlist();
        return wishlist.some(i => i.id === itemId);
    },

    // ============================================
    // ADDRESSES
    // ============================================
    getAddresses: function() {
        try {
            const stored = localStorage.getItem('addresses');
            if (stored) {
                return JSON.parse(stored);
            }
            // Default addresses
            const defaultAddresses = [
                {
                    id: Date.now(),
                    label: 'Home',
                    recipientName: 'Juan Dela Cruz',
                    street: '123 Bakery Street, Poblacion District',
                    city: 'Davao City, 8000',
                    phone: '+63 912 345 6789',
                    isDefault: true
                }
            ];
            this.saveAddresses(defaultAddresses);
            return defaultAddresses;
        } catch (error) {
            console.error('Error loading addresses:', error);
            return [];
        }
    },

    saveAddresses: function(addresses) {
        try {
            localStorage.setItem('addresses', JSON.stringify(addresses));
            return true;
        } catch (error) {
            console.error('Error saving addresses:', error);
            return false;
        }
    },

    addAddress: function(address) {
        const addresses = this.getAddresses();
        address.id = Date.now();
        addresses.push(address);
        return this.saveAddresses(addresses);
    },

    updateAddress: function(addressId, updates) {
        const addresses = this.getAddresses();
        const index = addresses.findIndex(a => a.id === addressId);
        if (index !== -1) {
            addresses[index] = { ...addresses[index], ...updates };
            return this.saveAddresses(addresses);
        }
        return false;
    },

    deleteAddress: function(addressId) {
        const addresses = this.getAddresses();
        const filtered = addresses.filter(a => a.id !== addressId);
        return this.saveAddresses(filtered);
    },

    setDefaultAddress: function(addressId) {
        const addresses = this.getAddresses();
        addresses.forEach(addr => {
            addr.isDefault = (addr.id === addressId);
        });
        return this.saveAddresses(addresses);
    },

    getDefaultAddress: function() {
        const addresses = this.getAddresses();
        return addresses.find(a => a.isDefault) || addresses[0] || null;
    },

    // ============================================
    // PAYMENT METHODS
    // ============================================
    getPaymentMethods: function() {
        try {
            const stored = localStorage.getItem('paymentMethods');
            if (stored) {
                return JSON.parse(stored);
            }
            // Default payment methods
            const defaultMethods = [
                {
                    id: Date.now(),
                    type: 'credit_card',
                    label: 'Visa ending in 4242',
                    cardNumber: '•••• •••• •••• 4242',
                    cardHolderName: 'Juan Dela Cruz',
                    expiryDate: '12/2026',
                    isDefault: true
                }
            ];
            this.savePaymentMethods(defaultMethods);
            return defaultMethods;
        } catch (error) {
            console.error('Error loading payment methods:', error);
            return [];
        }
    },

    savePaymentMethods: function(methods) {
        try {
            localStorage.setItem('paymentMethods', JSON.stringify(methods));
            return true;
        } catch (error) {
            console.error('Error saving payment methods:', error);
            return false;
        }
    },

    addPaymentMethod: function(method) {
        const methods = this.getPaymentMethods();
        method.id = Date.now();
        methods.push(method);
        return this.savePaymentMethods(methods);
    },

    updatePaymentMethod: function(methodId, updates) {
        const methods = this.getPaymentMethods();
        const index = methods.findIndex(m => m.id === methodId);
        if (index !== -1) {
            methods[index] = { ...methods[index], ...updates };
            return this.savePaymentMethods(methods);
        }
        return false;
    },

    deletePaymentMethod: function(methodId) {
        const methods = this.getPaymentMethods();
        const filtered = methods.filter(m => m.id !== methodId);
        return this.savePaymentMethods(filtered);
    },

    setDefaultPaymentMethod: function(methodId) {
        const methods = this.getPaymentMethods();
        methods.forEach(method => {
            method.isDefault = (method.id === methodId);
        });
        return this.savePaymentMethods(methods);
    },

    getDefaultPaymentMethod: function() {
        const methods = this.getPaymentMethods();
        return methods.find(m => m.isDefault) || methods[0] || null;
    },

    // ============================================
    // REVIEWS
    // ============================================
    getReviews: function() {
        try {
            return JSON.parse(localStorage.getItem('reviews') || '[]');
        } catch (error) {
            console.error('Error loading reviews:', error);
            return [];
        }
    },

    saveReviews: function(reviews) {
        try {
            localStorage.setItem('reviews', JSON.stringify(reviews));
            return true;
        } catch (error) {
            console.error('Error saving reviews:', error);
            return false;
        }
    },

    addReview: function(review) {
        const reviews = this.getReviews();
        review.id = Date.now();
        review.createdAt = new Date().toISOString();
        reviews.unshift(review); // Add to beginning
        
        // Update product rating
        const productId = review.productId;
        const productReviews = reviews.filter(r => r.productId === productId);
        const avgRating = productReviews.reduce((sum, r) => sum + r.rating, 0) / productReviews.length;
        this.updateProduct(productId, { rating: parseFloat(avgRating.toFixed(1)) });
        
        return this.saveReviews(reviews);
    },

    getProductReviews: function(productId) {
        const reviews = this.getReviews();
        return reviews.filter(r => r.productId === productId);
    },

    // ============================================
    // SUPPORT TICKETS
    // ============================================
    getTickets: function() {
        try {
            return JSON.parse(localStorage.getItem('tickets') || '[]');
        } catch (error) {
            console.error('Error loading tickets:', error);
            return [];
        }
    },

    saveTickets: function(tickets) {
        try {
            localStorage.setItem('tickets', JSON.stringify(tickets));
            return true;
        } catch (error) {
            console.error('Error saving tickets:', error);
            return false;
        }
    },

    addTicket: function(ticket) {
        const tickets = this.getTickets();
        const ticketCount = tickets.length + 1;
        ticket.id = `TKT-${new Date().getFullYear()}-${String(ticketCount).padStart(3, '0')}`;
        ticket.createdAt = new Date().toISOString();
        ticket.status = 'open';
        ticket.messages = [];
        tickets.unshift(ticket); // Add to beginning
        return this.saveTickets(tickets);
    },

    updateTicket: function(ticketId, updates) {
        const tickets = this.getTickets();
        const index = tickets.findIndex(t => t.id === ticketId);
        if (index !== -1) {
            tickets[index] = { ...tickets[index], ...updates };
            return this.saveTickets(tickets);
        }
        return false;
    },

    addTicketMessage: function(ticketId, message) {
        const tickets = this.getTickets();
        const index = tickets.findIndex(t => t.id === ticketId);
        if (index !== -1) {
            if (!tickets[index].messages) {
                tickets[index].messages = [];
            }
            message.id = Date.now();
            message.timestamp = new Date().toISOString();
            tickets[index].messages.push(message);
            return this.saveTickets(tickets);
        }
        return false;
    },

    getUserTickets: function(userEmail) {
        const tickets = this.getTickets();
        return tickets.filter(t => t.userEmail === userEmail);
    },

    // ============================================
    // NOTIFICATIONS
    // ============================================
    getNotifications: function() {
        try {
            return JSON.parse(localStorage.getItem('notifications') || '[]');
        } catch (error) {
            console.error('Error loading notifications:', error);
            return [];
        }
    },

    saveNotifications: function(notifications) {
        try {
            localStorage.setItem('notifications', JSON.stringify(notifications));
            return true;
        } catch (error) {
            console.error('Error saving notifications:', error);
            return false;
        }
    },

    addNotification: function(notification) {
        const notifications = this.getNotifications();
        notification.id = Date.now();
        notification.createdAt = new Date().toISOString();
        notification.isRead = false;
        notifications.unshift(notification); // Add to beginning
        return this.saveNotifications(notifications);
    },

    markNotificationAsRead: function(notificationId) {
        const notifications = this.getNotifications();
        const index = notifications.findIndex(n => n.id === notificationId);
        if (index !== -1) {
            notifications[index].isRead = true;
            return this.saveNotifications(notifications);
        }
        return false;
    },

    markAllNotificationsAsRead: function() {
        const notifications = this.getNotifications();
        notifications.forEach(n => n.isRead = true);
        return this.saveNotifications(notifications);
    },

    deleteNotification: function(notificationId) {
        const notifications = this.getNotifications();
        const filtered = notifications.filter(n => n.id !== notificationId);
        return this.saveNotifications(filtered);
    },

    getUnreadNotificationCount: function() {
        const notifications = this.getNotifications();
        return notifications.filter(n => !n.isRead).length;
    },

    // ============================================
    // STATISTICS (for Admin Dashboard)
    // ============================================
    getStatistics: function() {
        const orders = this.getOrders();
        const users = this.getUsers();
        const products = this.getProducts();
        
        const totalRevenue = orders
            .filter(o => o.status !== 'cancelled')
            .reduce((sum, o) => sum + (o.total || 0), 0);
        
        const totalOrders = orders.length;
        const pendingOrders = orders.filter(o => o.status === 'pending' || o.status === 'processing').length;
        const totalCustomers = users.filter(u => u.role !== 'admin').length;
        const lowStockProducts = products.filter(p => (p.stock || 0) < 10).length;
        
        return {
            totalRevenue,
            totalOrders,
            pendingOrders,
            totalCustomers,
            lowStockProducts
        };
    },

    // ============================================
    // UTILITY
    // ============================================
    clearAllData: function() {
        if (confirm('⚠️ WARNING: This will delete ALL data. This cannot be undone. Are you sure?')) {
            localStorage.clear();
            window.location.reload();
        }
    },

    exportData: function() {
        const data = {
            users: this.getUsers(),
            products: this.getProducts(),
            orders: this.getOrders(),
            reviews: this.getReviews(),
            tickets: this.getTickets(),
            addresses: this.getAddresses(),
            paymentMethods: this.getPaymentMethods(),
            notifications: this.getNotifications(),
            exportedAt: new Date().toISOString()
        };
        return JSON.stringify(data, null, 2);
    },

    importData: function(jsonData) {
        try {
            const data = JSON.parse(jsonData);
            if (data.users) this.saveUsers(data.users);
            if (data.products) this.saveProducts(data.products);
            if (data.orders) this.saveOrders(data.orders);
            if (data.reviews) this.saveReviews(data.reviews);
            if (data.tickets) this.saveTickets(data.tickets);
            if (data.addresses) this.saveAddresses(data.addresses);
            if (data.paymentMethods) this.savePaymentMethods(data.paymentMethods);
            if (data.notifications) this.saveNotifications(data.notifications);
            return true;
        } catch (error) {
            console.error('Error importing data:', error);
            return false;
        }
    }
};

// Make DataManager globally available
window.DataManager = DataManager;

console.log('%c✅ Data Manager Loaded', 'color: #4ECDC4; font-weight: bold; font-size: 14px;');
console.log('%cAvailable methods:', 'color: #666;');
console.log('- DataManager.getUsers() / saveUsers()');
console.log('- DataManager.getProducts() / saveProducts()');
console.log('- DataManager.getOrders() / saveOrders()');
console.log('- DataManager.getCart() / saveCart()');
console.log('- DataManager.getWishlist() / saveWishlist()');
console.log('- DataManager.getAddresses() / saveAddresses()');
console.log('- DataManager.getPaymentMethods() / savePaymentMethods()');
console.log('- DataManager.getReviews() / saveReviews()');
console.log('- DataManager.getTickets() / saveTickets()');
console.log('- DataManager.getNotifications() / saveNotifications()');
console.log('- DataManager.getStatistics()');
console.log('- DataManager.exportData() / importData()');
