// Clean, simple JavaScript for all devices
console.log('🚀 TCG CarCare - Starting clean script...');

// Utility functions
function isMobile() {
    return window.innerWidth <= 768;
}

function log(message) {
    console.log(`📱 ${message}`);
}

function scrollToElement(elementId) {
    log(`Scrolling to: ${elementId}`);
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
        log(`✅ Scrolled to: ${elementId}`);
        return true;
    }
    log(`❌ Element not found: ${elementId}`);
    return false;
}

// Mobile menu functionality
function setupMobileMenu() {
    const menuBtn = document.getElementById('mobileMenuBtn');
    const nav = document.querySelector('.nav');
    
    if (!menuBtn || !nav) {
        log('❌ Mobile menu elements missing');
        return;
    }
    
    log('Setting up mobile menu');
    
    // Toggle menu
    menuBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        log('🍔 Menu button clicked');
        
        const isActive = nav.classList.contains('active');
        if (isActive) {
            nav.classList.remove('active');
            menuBtn.classList.remove('active');
            log('❌ Menu closed');
        } else {
            nav.classList.add('active');
            menuBtn.classList.add('active');
            log('✅ Menu opened');
        }
    });
    
    // Close menu on nav link click
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            log('🔗 Nav link clicked');
            nav.classList.remove('active');
            menuBtn.classList.remove('active');
            
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                scrollToElement(targetId);
            }
        });
    });
    
    // Close menu on outside click
    document.addEventListener('click', function(e) {
        if (!nav.contains(e.target) && !menuBtn.contains(e.target)) {
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                menuBtn.classList.remove('active');
                log('❌ Menu closed (outside click)');
            }
        }
    });
    
    log('✅ Mobile menu setup complete');
}

// Button functionality
function setupButtons() {
    log('Setting up buttons');
    
    // Hero Book Now
    const heroBookBtn = document.querySelector('.hero .cta-btn.primary');
    if (heroBookBtn) {
        heroBookBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            log('🎯 Hero Book Now clicked');
            scrollToElement('contact');
        });
        log('✅ Hero Book Now setup');
    }
    
    // View Services
    const viewServicesBtn = document.querySelector('.hero .cta-btn.secondary');
    if (viewServicesBtn) {
        viewServicesBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            log('👀 View Services clicked');
            scrollToElement('services');
        });
        log('✅ View Services setup');
    }
    
    // Header Contact
    const headerContactBtn = document.querySelector('.nav .contact-btn');
    if (headerContactBtn) {
        headerContactBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            log('📞 Header Contact clicked');
            scrollToElement('contact');
        });
        log('✅ Header Contact setup');
    }
    
    // Service buttons
    const serviceButtons = document.querySelectorAll('.service-btn');
    log(`Found ${serviceButtons.length} service buttons`);
    
    serviceButtons.forEach((btn, index) => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const serviceCard = this.closest('.service-card');
            let serviceName = 'Service';
            
            if (serviceCard) {
                const titleElement = serviceCard.querySelector('h3');
                if (titleElement) {
                    serviceName = titleElement.textContent.trim();
                }
            }
            
            log(`🔧 Service button ${index + 1} clicked: ${serviceName}`);
            
            // Pre-fill service dropdown
            const serviceSelect = document.getElementById('service');
            if (serviceSelect) {
                serviceSelect.value = serviceName;
                log(`✅ Service pre-filled: ${serviceName}`);
            }
            
            scrollToElement('contact');
        });
        log(`✅ Service button ${index + 1} setup`);
    });
    
    // Maintenance button
    const maintenanceBtn = document.querySelector('.maintenance-btn');
    if (maintenanceBtn) {
        maintenanceBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            log('🛠️ Maintenance button clicked');
            
            const serviceSelect = document.getElementById('service');
            if (serviceSelect) {
                serviceSelect.value = 'Maintenance Service';
                log('✅ Maintenance service pre-filled');
            }
            
            scrollToElement('contact');
        });
        log('✅ Maintenance button setup');
    }
    
    log('✅ All buttons setup complete');
}

// Navigation
function setupNavigation() {
    log('Setting up navigation');
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                log(`🔗 Navigation to: ${targetId}`);
                scrollToElement(targetId);
            }
        });
    });
    
    log('✅ Navigation setup complete');
}

// Contact form
function setupContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) {
        log('❌ Contact form not found');
        return;
    }
    
    log('Setting up contact form');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        log('📧 Form submitted');
        
        const formData = new FormData(this);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            service: formData.get('service'),
            date: formData.get('preferred-date'),
            time: formData.get('preferred-time'),
            message: formData.get('message') || 'No additional message'
        };
        
        // Validate
        if (!data.name || !data.email || !data.phone || !data.service || !data.date || !data.time) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Format date
        const dateObj = new Date(data.date);
        const formattedDate = dateObj.toLocaleDateString('en-GB', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        // Create messages
        const emailSubject = `New Booking Request - ${data.service}`;
        const emailBody = `New booking request:%0A%0A` +
            `Name: ${data.name}%0A` +
            `Email: ${data.email}%0A` +
            `Phone: ${data.phone}%0A` +
            `Service: ${data.service}%0A` +
            `Date: ${formattedDate}%0A` +
            `Time: ${data.time}%0A` +
            `Message: ${data.message}`;
        
        const whatsappMessage = `Hi! Booking request:%0A%0A` +
            `Name: ${data.name}%0A` +
            `Email: ${data.email}%0A` +
            `Phone: ${data.phone}%0A` +
            `Service: ${data.service}%0A` +
            `Date: ${formattedDate}%0A` +
            `Time: ${data.time}%0A` +
            `Message: ${data.message}`;
        
        // Open communication channels
        if (isMobile()) {
            window.open(`https://wa.me/447398251847?text=${whatsappMessage}`, '_blank');
            setTimeout(() => {
                if (confirm('Also send email?')) {
                    window.open(`mailto:info@tcgcarcare.co.uk?subject=${emailSubject}&body=${emailBody}`, '_blank');
                }
            }, 1000);
        } else {
            window.open(`mailto:info@tcgcarcare.co.uk?subject=${emailSubject}&body=${emailBody}`, '_blank');
            setTimeout(() => {
                window.open(`https://wa.me/447398251847?text=${whatsappMessage}`, '_blank');
            }, 500);
        }
        
        // Reset and notify
        this.reset();
        alert('Thank you! Your booking request will be sent.');
        log('✅ Form processed successfully');
    });
    
    log('✅ Contact form setup complete');
}

// Scroll indicator
function setupScrollIndicator() {
    const indicator = document.getElementById('scrollIndicator');
    if (indicator) {
        indicator.addEventListener('click', function(e) {
            e.preventDefault();
            log('⬇️ Scroll indicator clicked');
            scrollToElement('services');
        });
        
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 100) {
                indicator.style.opacity = '0';
            } else {
                indicator.style.opacity = '1';
            }
        });
        
        log('✅ Scroll indicator setup');
    }
}

// Header scroll effect
function setupHeaderScroll() {
    window.addEventListener('scroll', function() {
        const header = document.getElementById('header');
        if (header) {
            if (window.scrollY > 100) {
                header.style.background = 'rgba(15, 15, 15, 0.98)';
            } else {
                header.style.background = 'rgba(15, 15, 15, 0.95)';
            }
        }
    });
    
    log('✅ Header scroll setup');
}

// Initialize everything
document.addEventListener('DOMContentLoaded', function() {
    log('🚀 DOM loaded - initializing...');
    log(`📱 Mobile device: ${isMobile()}`);
    log(`📏 Screen width: ${window.innerWidth}px`);
    
    setupMobileMenu();
    setupButtons();
    setupNavigation();
    setupContactForm();
    setupScrollIndicator();
    setupHeaderScroll();
    
    log('✅ All functionality initialized successfully');
});

// Debug helpers
window.scrollToElement = scrollToElement;
window.isMobile = isMobile;

log('✅ Script loaded successfully');