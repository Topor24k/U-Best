// ============================================
// DASHBOARD JAVASCRIPT
// ============================================

// Check if user is logged in
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    initializeDashboard();
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

// Console welcome message
console.log('%c🎯 Dashboard Loaded Successfully!', 'color: #FF6B35; font-size: 16px; font-weight: bold;');
console.log('%cWelcome to your U-BEST Dashboard', 'color: #4ECDC4; font-size: 12px;');
