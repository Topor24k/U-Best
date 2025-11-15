// ============================================
// DOM Elements
// ============================================
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');
const authBtn = document.getElementById('authBtn');
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const scrollTopBtn = document.getElementById('scrollTopBtn');
const contactForm = document.getElementById('contactForm');
const navLinks = document.querySelectorAll('.nav-menu a');
const addToCartBtns = document.querySelectorAll('.btn-add-cart');

// Auth Modal Elements
const authModal = document.getElementById('authModal');
const closeAuthModal = document.getElementById('closeAuthModal');
const authTabs = document.querySelectorAll('.auth-tab');
const signinForm = document.getElementById('signinForm');
const signupForm = document.getElementById('signupForm');

// ============================================
// Navigation
// ============================================

// Mobile Menu Toggle
if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = mobileMenuToggle.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });
}

// About Us Dropdown - Click to stick, hover to show
const aboutUsToggle = document.getElementById('aboutUsToggle');
const aboutDropdown = document.querySelector('.about-dropdown');
let isAboutDropdownSticky = false;

if (aboutUsToggle && aboutDropdown) {
    // Click handler - makes it sticky
    aboutUsToggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        isAboutDropdownSticky = !isAboutDropdownSticky;
        
        if (isAboutDropdownSticky) {
            aboutDropdown.classList.add('active');
        } else {
            aboutDropdown.classList.remove('active');
        }
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!aboutDropdown.contains(e.target) && !aboutUsToggle.contains(e.target)) {
            isAboutDropdownSticky = false;
            aboutDropdown.classList.remove('active');
        }
    });
    
    // Prevent dropdown from closing when clicking inside it
    aboutDropdown.addEventListener('click', (e) => {
        e.stopPropagation();
    });
}

// Smooth Scrolling for Navigation Links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        
        if (href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Close mobile menu if open
                navMenu.classList.remove('active');
                if (mobileMenuToggle) {
                    const icon = mobileMenuToggle.querySelector('i');
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
                
                // Smooth scroll to section
                const headerOffset = 140; // Height of sticky headers
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Update active link
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        }
    });
});

// Update active nav link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ============================================
// Search Functionality
// ============================================
if (searchBtn && searchInput) {
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
}

function performSearch() {
    const query = searchInput.value.trim();
    if (query) {
        alert(`Searching for: "${query}"\n\nThis is a demo. In a real application, this would search through products and display results.`);
        // In a real application, this would trigger a search API call
    } else {
        alert('Please enter a search term');
    }
}

// ============================================
// Authentication System with Local Storage
// ============================================
let isSignedIn = false;
let currentUser = null;

// Initialize authentication on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeAuth();
});

function initializeAuth() {
    // Check if user is already signed in
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        try {
            currentUser = JSON.parse(savedUser);
            isSignedIn = true;
            updateAuthUI();
        } catch (error) {
            console.error('Error loading user data:', error);
            localStorage.removeItem('currentUser');
        }
    }
}

function updateAuthUI() {
    const authText = authBtn.querySelector('.auth-text');
    if (isSignedIn && currentUser) {
        const firstName = currentUser.name.split(' ')[0];
        authText.innerHTML = `<span class="auth-greeting">Hello, ${firstName}!</span><span class="auth-action">My Account</span>`;
    } else {
        authText.innerHTML = '<span class="auth-greeting">Hello Guest!</span><span class="auth-action">Sign in / Sign up</span>';
    }
}

// Get all users from localStorage
function getAllUsers() {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
}

// Save users to localStorage
function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

// Validation Functions
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    // At least 6 characters
    if (password.length < 6) {
        return { valid: false, message: 'Password must be at least 6 characters long' };
    }
    return { valid: true };
}

function validatePhone(phone) {
    // Remove spaces and special characters
    const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
    // Check if it's a valid Philippine number (starts with +63 or 0, followed by 10 digits)
    const phoneRegex = /^(\+63|0)\d{10}$/;
    if (!phoneRegex.test(cleanPhone)) {
        return { valid: false, message: 'Please enter a valid Philippine phone number' };
    }
    return { valid: true };
}

function validateName(name) {
    if (name.trim().length < 2) {
        return { valid: false, message: 'Name must be at least 2 characters long' };
    }
    if (!/^[a-zA-Z\s]+$/.test(name)) {
        return { valid: false, message: 'Name can only contain letters and spaces' };
    }
    return { valid: true };
}

if (authBtn) {
    authBtn.addEventListener('click', () => {
        if (!isSignedIn) {
            // Open auth modal
            authModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        } else {
            // Show user menu or profile (for now, sign out)
            const confirmSignOut = confirm('Are you sure you want to sign out?');
            if (confirmSignOut) {
                signOut();
            }
        }
    });
}

function signOut() {
    isSignedIn = false;
    currentUser = null;
    localStorage.removeItem('currentUser');
    updateAuthUI();
    showNotification('Successfully signed out!', 'success');
}

// Close Auth Modal
if (closeAuthModal) {
    closeAuthModal.addEventListener('click', () => {
        authModal.classList.remove('active');
        document.body.style.overflow = '';
    });
}

// Close modal when clicking overlay
if (authModal) {
    authModal.addEventListener('click', (e) => {
        if (e.target.classList.contains('auth-modal-overlay')) {
            authModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Auth Tab Switching
authTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const targetTab = tab.getAttribute('data-tab');
        
        // Remove active class from all tabs and forms
        authTabs.forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.auth-form-container').forEach(f => f.classList.remove('active'));
        
        // Add active class to clicked tab and corresponding form
        tab.classList.add('active');
        document.getElementById(targetTab).classList.add('active');
    });
});

// Sign In Form
if (signinForm) {
    signinForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = document.getElementById('signin-email').value.trim();
        const password = document.getElementById('signin-password').value;
        const submitBtn = signinForm.querySelector('button[type="submit"]');
        
        // Clear previous error states
        clearFormErrors(signinForm);
        
        // Validate inputs
        if (!email || !password) {
            showNotification('Please fill in all fields', 'error');
            highlightEmptyFields(signinForm);
            return;
        }
        
        if (!validateEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            setFieldError(document.getElementById('signin-email'), 'Invalid email format');
            return;
        }
        
        // Disable submit button
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing in...';
        
        // Simulate API delay
        setTimeout(() => {
            const users = getAllUsers();
            const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
            
            if (!user) {
                showNotification('Account not found. Please sign up first.', 'error');
                setFieldError(document.getElementById('signin-email'), 'No account found with this email');
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Sign In';
                return;
            }
            
            if (user.password !== password) {
                showNotification('Incorrect password. Please try again.', 'error');
                setFieldError(document.getElementById('signin-password'), 'Incorrect password');
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Sign In';
                return;
            }
            
            // Successful sign in
            isSignedIn = true;
            currentUser = {
                name: user.name,
                email: user.email,
                phone: user.phone,
                createdAt: user.createdAt
            };
            
            // Save to localStorage
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            
            updateAuthUI();
            
            showNotification(`Welcome back, ${currentUser.name.split(' ')[0]}!`, 'success');
            
            // Redirect to dashboard
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1000);
        }, 800);
    });
}

// Sign Up Form
if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('signup-name').value.trim();
        const email = document.getElementById('signup-email').value.trim();
        const phone = document.getElementById('signup-phone').value.trim();
        const password = document.getElementById('signup-password').value;
        const confirmPassword = document.getElementById('signup-confirm-password').value;
        const termsCheckbox = signupForm.querySelector('input[name="terms"]');
        const submitBtn = signupForm.querySelector('button[type="submit"]');
        
        // Clear previous error states
        clearFormErrors(signupForm);
        
        // Validate all fields are filled
        if (!name || !email || !phone || !password || !confirmPassword) {
            showNotification('Please fill in all required fields', 'error');
            highlightEmptyFields(signupForm);
            return;
        }
        
        // Validate name
        const nameValidation = validateName(name);
        if (!nameValidation.valid) {
            showNotification(nameValidation.message, 'error');
            setFieldError(document.getElementById('signup-name'), nameValidation.message);
            return;
        }
        
        // Validate email
        if (!validateEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            setFieldError(document.getElementById('signup-email'), 'Invalid email format (e.g., name@example.com)');
            return;
        }
        
        // Validate phone
        const phoneValidation = validatePhone(phone);
        if (!phoneValidation.valid) {
            showNotification(phoneValidation.message, 'error');
            setFieldError(document.getElementById('signup-phone'), phoneValidation.message);
            return;
        }
        
        // Validate password
        const passwordValidation = validatePassword(password);
        if (!passwordValidation.valid) {
            showNotification(passwordValidation.message, 'error');
            setFieldError(document.getElementById('signup-password'), passwordValidation.message);
            return;
        }
        
        // Check if passwords match
        if (password !== confirmPassword) {
            showNotification('Passwords do not match', 'error');
            setFieldError(document.getElementById('signup-confirm-password'), 'Passwords must match');
            return;
        }
        
        // Check terms agreement
        if (!termsCheckbox.checked) {
            showNotification('Please agree to the Terms & Conditions', 'error');
            termsCheckbox.focus();
            return;
        }
        
        // Disable submit button
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating Account...';
        
        // Simulate API delay
        setTimeout(() => {
            const users = getAllUsers();
            
            // Check if email already exists
            const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
            if (existingUser) {
                showNotification('An account with this email already exists. Please sign in instead.', 'error');
                setFieldError(document.getElementById('signup-email'), 'This email is already registered');
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fas fa-user-plus"></i> Create Account';
                return;
            }
            
            // Create new user
            const newUser = {
                id: Date.now(),
                name: name,
                email: email,
                phone: phone,
                password: password, // In production, this should be hashed
                createdAt: new Date().toISOString(),
                orders: [],
                wishlist: []
            };
            
            // Add to users array
            users.push(newUser);
            saveUsers(users);
            
            // Sign in the new user
            isSignedIn = true;
            currentUser = {
                name: newUser.name,
                email: newUser.email,
                phone: newUser.phone,
                createdAt: newUser.createdAt
            };
            
            // Save to localStorage
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            
            updateAuthUI();
            
            showNotification(`Welcome to U-BEST, ${currentUser.name.split(' ')[0]}! Your account has been created successfully.`, 'success');
            
            // Log success
            console.log('New account created:', { email: newUser.email, name: newUser.name });
            
            // Redirect to dashboard
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1500);
        }, 1000);
    });
}

// Helper Functions for Error Handling
function clearFormErrors(form) {
    const inputs = form.querySelectorAll('input');
    inputs.forEach(input => {
        input.classList.remove('input-error');
        const errorMsg = input.parentElement.querySelector('.error-message');
        if (errorMsg) {
            errorMsg.remove();
        }
    });
}

function highlightEmptyFields(form) {
    const inputs = form.querySelectorAll('input[required]');
    inputs.forEach(input => {
        if (!input.value.trim() && input.type !== 'checkbox') {
            input.classList.add('input-error');
        }
    });
}

function setFieldError(input, message) {
    input.classList.add('input-error');
    
    // Remove existing error message if any
    const existingError = input.parentElement.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Add new error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
    input.parentElement.appendChild(errorDiv);
    
    // Focus on the error field
    input.focus();
}

// Social Auth Buttons
document.querySelectorAll('.social-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const platform = btn.classList.contains('facebook-btn') ? 'Facebook' : 'Google';
        showNotification(`${platform} authentication is not yet implemented. This is a demo.`, 'info');
    });
});

// Forgot Password
const forgotPasswordLink = document.querySelector('.forgot-password');
if (forgotPasswordLink) {
    forgotPasswordLink.addEventListener('click', (e) => {
        e.preventDefault();
        
        const email = prompt('Please enter your email address to reset your password:');
        
        if (!email) {
            return;
        }
        
        if (!validateEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        const users = getAllUsers();
        const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
        
        if (!user) {
            // For security, don't reveal if email exists or not
            showNotification('If an account exists with this email, a password reset link has been sent.', 'info');
            console.log('Password reset requested for non-existent email:', email);
        } else {
            showNotification('Password reset link has been sent to your email address.', 'success');
            console.log('Password reset link sent to:', email);
            // In production, this would send an actual email
        }
    });
}

// Show User Info in Console (for demo purposes)
window.showAllUsers = function() {
    const users = getAllUsers();
    console.log('=== All Registered Users ===');
    users.forEach(user => {
        console.log(`Name: ${user.name}, Email: ${user.email}, Created: ${new Date(user.createdAt).toLocaleDateString()}`);
    });
    console.log('Total Users:', users.length);
};

window.clearAllUsers = function() {
    if (confirm('Are you sure you want to delete all user accounts? This cannot be undone.')) {
        localStorage.removeItem('users');
        localStorage.removeItem('currentUser');
        isSignedIn = false;
        currentUser = null;
        updateAuthUI();
        console.log('All user accounts have been cleared.');
        showNotification('All accounts cleared', 'success');
    }
};

// Log helper functions to console
console.log('%c💡 Helper Functions Available:', 'color: #4ECDC4; font-weight: bold;');
console.log('%cshowAllUsers() - View all registered accounts', 'color: #666;');
console.log('%cclearAllUsers() - Clear all accounts (use with caution)', 'color: #666;');

// ============================================
// Shopping Cart
// ============================================
let cartCount = 0;

addToCartBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        const productCard = this.closest('.product-card');
        const productName = productCard.querySelector('h3').textContent;
        
        cartCount++;
        updateCartCount();
        
        // Button animation
        this.innerHTML = '<i class="fas fa-check"></i> Added!';
        this.style.background = 'var(--success)';
        
        setTimeout(() => {
            this.innerHTML = 'Add to Cart';
            this.style.background = '';
        }, 2000);
        
        showNotification(`${productName} added to cart!`, 'success');
    });
});

function updateCartCount() {
    const cartCountElement = document.querySelector('.cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = cartCount;
        cartCountElement.style.transform = 'scale(1.3)';
        setTimeout(() => {
            cartCountElement.style.transform = 'scale(1)';
        }, 200);
    }
}

// ============================================
// Contact Form
// ============================================
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Validate form
        if (!name || !email || !phone || !subject || !message) {
            showNotification('Please fill in all required fields', 'error');
            return;
        }
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate form submission
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            showNotification('Message sent successfully! We will contact you soon.', 'success');
            contactForm.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// ============================================
// Scroll to Top Button
// ============================================
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============================================
// Notification System
// ============================================
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const icon = type === 'success' ? 'fa-check-circle' : 
                 type === 'error' ? 'fa-exclamation-circle' : 
                 'fa-info-circle';
    
    notification.innerHTML = `
        <i class="fas ${icon}"></i>
        <span>${message}</span>
        <button class="notification-close"><i class="fas fa-times"></i></button>
    `;
    
    document.body.appendChild(notification);
    
    // Add styles
    addNotificationStyles();
    
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

function addNotificationStyles() {
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
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
            
            .notification.show {
                transform: translateX(0);
            }
            
            .notification i:first-child {
                font-size: 1.5rem;
            }
            
            .notification-success {
                border-left: 4px solid #4CAF50;
            }
            
            .notification-success i:first-child {
                color: #4CAF50;
            }
            
            .notification-error {
                border-left: 4px solid #F44336;
            }
            
            .notification-error i:first-child {
                color: #F44336;
            }
            
            .notification-info {
                border-left: 4px solid #2196F3;
            }
            
            .notification-info i:first-child {
                color: #2196F3;
            }
            
            .notification span {
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
            
            @media (max-width: 480px) {
                .notification {
                    right: 10px;
                    left: 10px;
                    max-width: none;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// ============================================
// Intersection Observer for Animations
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe category cards
document.querySelectorAll('.category-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Observe product cards
document.querySelectorAll('.product-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// Observe review cards
document.querySelectorAll('.review-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// ============================================
// Newsletter Form
// ============================================
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const email = emailInput.value;
        
        if (email) {
            showNotification('Successfully subscribed to our newsletter!', 'success');
            emailInput.value = '';
        }
    });
}

// ============================================
// Hero CTA Buttons
// ============================================
const heroCTAButtons = document.querySelectorAll('.hero-cta .btn');
heroCTAButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        if (btn.classList.contains('btn-primary')) {
            // Shop Now button - scroll to products
            e.preventDefault();
            const productsSection = document.getElementById('new-arrivals');
            if (productsSection) {
                const headerOffset = 140;
                const elementPosition = productsSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        } else if (btn.classList.contains('btn-secondary')) {
            // Contact Us button - scroll to contact
            e.preventDefault();
            const contactSection = document.getElementById('help');
            if (contactSection) {
                const headerOffset = 140;
                const elementPosition = contactSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ============================================
// Category Links
// ============================================
const categoryLinks = document.querySelectorAll('.category-link');
categoryLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const categoryName = link.closest('.category-card').querySelector('h3').textContent;
        showNotification(`Browsing ${categoryName}. This is a demo - in a real application, this would show category products.`, 'info');
    });
});

// ============================================
// View All Products Button
// ============================================
const viewAllBtn = document.querySelector('.view-all-btn .btn');
if (viewAllBtn) {
    viewAllBtn.addEventListener('click', () => {
        showNotification('Loading all products... This is a demo version.', 'info');
    });
}

// ============================================
// Console Welcome Message
// ============================================
console.log('%c🍞 Welcome to Ulas Bakery Equipment & Supplies! 🍞', 
    'color: #FF6B35; font-size: 20px; font-weight: bold;');
console.log('%cBuilt with HTML5, CSS3, and JavaScript', 
    'color: #4ECDC4; font-size: 14px;');
console.log('%c10 Years of Quality Service in Mindanao', 
    'color: #666; font-size: 12px;');

// ============================================
// Initialize on Page Load
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Add fade-in animation to hero section
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        setTimeout(() => {
            heroSection.style.opacity = '1';
        }, 100);
    }
    
    // Initialize authentication
    initializeAuth();
    
    // Add real-time validation to form inputs
    addRealtimeValidation();
    
    // Log page load
    console.log('✅ Page loaded successfully');
});

// Real-time Form Validation
function addRealtimeValidation() {
    // Email validation on blur
    const emailInputs = document.querySelectorAll('input[type="email"]');
    emailInputs.forEach(input => {
        input.addEventListener('blur', function() {
            const value = this.value.trim();
            if (value && !validateEmail(value)) {
                this.classList.add('input-error');
                setFieldError(this, 'Please enter a valid email address');
            } else {
                this.classList.remove('input-error');
                const errorMsg = this.parentElement.querySelector('.error-message');
                if (errorMsg) errorMsg.remove();
            }
        });
        
        // Clear error on input
        input.addEventListener('input', function() {
            this.classList.remove('input-error');
            const errorMsg = this.parentElement.querySelector('.error-message');
            if (errorMsg) errorMsg.remove();
        });
    });
    
    // Password confirmation validation
    const confirmPasswordInput = document.getElementById('signup-confirm-password');
    const passwordInput = document.getElementById('signup-password');
    
    if (confirmPasswordInput && passwordInput) {
        confirmPasswordInput.addEventListener('input', function() {
            if (this.value && this.value !== passwordInput.value) {
                this.classList.add('input-error');
                setFieldError(this, 'Passwords do not match');
            } else {
                this.classList.remove('input-error');
                const errorMsg = this.parentElement.querySelector('.error-message');
                if (errorMsg) errorMsg.remove();
            }
        });
        
        passwordInput.addEventListener('input', function() {
            if (confirmPasswordInput.value && confirmPasswordInput.value !== this.value) {
                confirmPasswordInput.classList.add('input-error');
            } else {
                confirmPasswordInput.classList.remove('input-error');
                const errorMsg = confirmPasswordInput.parentElement.querySelector('.error-message');
                if (errorMsg) errorMsg.remove();
            }
        });
    }
    
    // Phone validation
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('blur', function() {
            const value = this.value.trim();
            if (value) {
                const validation = validatePhone(value);
                if (!validation.valid) {
                    this.classList.add('input-error');
                    setFieldError(this, validation.message);
                } else {
                    this.classList.remove('input-error');
                    const errorMsg = this.parentElement.querySelector('.error-message');
                    if (errorMsg) errorMsg.remove();
                }
            }
        });
        
        input.addEventListener('input', function() {
            this.classList.remove('input-error');
            const errorMsg = this.parentElement.querySelector('.error-message');
            if (errorMsg) errorMsg.remove();
        });
    });
    
    // Password strength indicator
    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            updatePasswordStrength(this.value);
        });
    }
}

// Password Strength Checker
function updatePasswordStrength(password) {
    const strengthIndicator = document.getElementById('passwordStrength');
    
    if (!password || password.length === 0) {
        strengthIndicator.style.display = 'none';
        return;
    }
    
    strengthIndicator.style.display = 'block';
    
    let strength = 0;
    
    // Length check
    if (password.length >= 6) strength += 1;
    if (password.length >= 8) strength += 1;
    if (password.length >= 12) strength += 1;
    
    // Character variety checks
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 1;
    if (/\d/.test(password)) strength += 1;
    if (/[^a-zA-Z0-9]/.test(password)) strength += 1;
    
    // Remove all strength classes
    strengthIndicator.classList.remove('weak', 'medium', 'strong');
    
    // Apply appropriate class
    if (strength <= 2) {
        strengthIndicator.classList.add('weak');
        strengthIndicator.querySelector('.strength-text').textContent = 'Weak';
    } else if (strength <= 4) {
        strengthIndicator.classList.add('medium');
        strengthIndicator.querySelector('.strength-text').textContent = 'Medium';
    } else {
        strengthIndicator.classList.add('strong');
        strengthIndicator.querySelector('.strength-text').textContent = 'Strong';
    }
}

// ============================================
// Handle Cart Button Click
// ============================================
const cartBtn = document.querySelector('.cart-btn');
if (cartBtn) {
    cartBtn.addEventListener('click', () => {
        if (cartCount === 0) {
            showNotification('Your cart is empty. Add some products!', 'info');
        } else {
            showNotification(`You have ${cartCount} item(s) in your cart. This is a demo version.`, 'info');
        }
    });
}

// ============================================
// Prevent form resubmission on page refresh
// ============================================
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}
