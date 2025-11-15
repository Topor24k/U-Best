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
// Authentication
// ============================================
let isSignedIn = false;

if (authBtn) {
    authBtn.addEventListener('click', () => {
        isSignedIn = !isSignedIn;
        
        if (isSignedIn) {
            authBtn.innerHTML = '<i class="fas fa-user-check"></i><span>Sign Out</span>';
            showNotification('Successfully signed in!', 'success');
        } else {
            authBtn.innerHTML = '<i class="fas fa-user"></i><span>Sign In</span>';
            showNotification('Successfully signed out!', 'success');
        }
    });
}

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
    
    // Log page load
    console.log('✅ Page loaded successfully');
});

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
