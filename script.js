// Complete rewrite of mobile button functionality
// Mobile-first approach with simplified event handling

// Utility functions
function isMobileDevice() {
    return window.innerWidth <= 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function scrollToElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        return true;
    }
    return false;
}

function scrollToContact() {
    return scrollToElement('contact');
}

function scrollToServices() {
    return scrollToElement('services');
}

function selectService(serviceName) {
    const serviceSelect = document.getElementById('service');
    if (serviceSelect) {
        serviceSelect.value = serviceName;
    }
    scrollToContact();
}

// Mobile menu functionality
function initializeMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const nav = document.querySelector('.nav');

    if (!mobileMenuBtn || !nav) return;

    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        nav.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });

    // Close menu when clicking nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            nav.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!nav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            nav.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        }
    });
}

// Button click handlers
function initializeButtons() {
    // Hero Book Now button
    const heroBookBtn = document.querySelector('.hero .cta-btn.primary');
    if (heroBookBtn) {
        heroBookBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Hero Book Now clicked');
            scrollToContact();
        });
    }

    // View Services button
    const viewServicesBtn = document.querySelector('.hero .cta-btn.secondary');
    if (viewServicesBtn) {
        viewServicesBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('View Services clicked');
            scrollToServices();
        });
    }

    // Header Contact button
    const headerContactBtn = document.querySelector('.nav .contact-btn');
    if (headerContactBtn) {
        headerContactBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Header Contact clicked');
            scrollToContact();
        });
    }

    // Service card buttons
    document.querySelectorAll('.service-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const serviceCard = btn.closest('.service-card');
            let serviceName = 'Service';
            
            if (serviceCard) {
                const serviceTitle = serviceCard.querySelector('h3');
                if (serviceTitle) {
                    serviceName = serviceTitle.textContent.trim();
                }
            }
            
            console.log('Service button clicked:', serviceName);
            selectService(serviceName);
        });
    });

    // Maintenance button
    const maintenanceBtn = document.querySelector('.maintenance-btn');
    if (maintenanceBtn) {
        maintenanceBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Maintenance button clicked');
            selectService('Maintenance Service');
        });
    }
}

// Scroll indicator functionality
function initializeScrollIndicator() {
    const scrollIndicator = document.getElementById('scrollIndicator');
    
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            scrollToServices();
        });
        
        // Hide scroll indicator when user scrolls
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset;
            
            if (scrollTop > 100) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.pointerEvents = 'none';
            } else {
                scrollIndicator.style.opacity = '1';
                scrollIndicator.style.pointerEvents = 'auto';
            }
        });
    }
}

// Smooth scrolling for navigation links
function initializeNavigation() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToElement(targetId);
        });
    });
}

// Header background on scroll
function initializeHeaderScroll() {
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
}

// Contact form submission
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const service = formData.get('service');
        const preferredDate = formData.get('preferred-date');
        const preferredTime = formData.get('preferred-time');
        const message = formData.get('message');
        
        // Validate required fields
        if (!name || !email || !phone || !service || !preferredDate || !preferredTime) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Format the date for better readability
        const dateObj = new Date(preferredDate);
        const formattedDate = dateObj.toLocaleDateString('en-GB', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        // Create email body
        const emailSubject = `New Booking Request - ${service}`;
        const emailBody = `New booking request from TCG CarCare website:%0A%0A` +
            `Name: ${name}%0A` +
            `Email: ${email}%0A` +
            `Phone: ${phone}%0A` +
            `Service: ${service}%0A` +
            `Preferred Date: ${formattedDate}%0A` +
            `Preferred Time: ${preferredTime}%0A` +
            `Message: ${message || 'No additional message'}%0A%0A` +
            `Please respond to confirm the booking.`;
        
        // Create mailto links
        const email1 = `mailto:info@tcgcarcare.co.uk?subject=${emailSubject}&body=${emailBody}`;
        const email2 = `mailto:hola@remedio.studio?subject=${emailSubject}&body=${emailBody}`;
        
        // Create WhatsApp message
        const whatsappMessage = `Hi! I'd like to book a service.%0A%0AName: ${name}%0AEmail: ${email}%0APhone: ${phone}%0AService: ${service}%0APreferred Date: ${formattedDate}%0APreferred Time: ${preferredTime}%0AMessage: ${message || 'No additional message'}`;
        
        // Handle mobile vs desktop
        if (isMobileDevice()) {
            // On mobile, prioritize WhatsApp
            window.open(`https://wa.me/447398251847?text=${whatsappMessage}`, '_blank');
            
            // Show option to also send email
            setTimeout(() => {
                if (confirm('Would you also like to send an email?')) {
                    window.open(email1, '_blank');
                }
            }, 1000);
        } else {
            // On desktop, open email clients and WhatsApp
            window.open(email1, '_blank');
            setTimeout(() => {
                window.open(email2, '_blank');
            }, 500);
            setTimeout(() => {
                window.open(`https://wa.me/447398251847?text=${whatsappMessage}`, '_blank');
            }, 1000);
        }
        
        // Reset form
        this.reset();
        
        // Show success message
        const successMessage = isMobileDevice() ? 
            'Thank you! WhatsApp will open to send your booking request.' :
            'Thank you! Email clients will open to send your booking request, and WhatsApp will also open for immediate contact.';
        
        alert(successMessage);
    });
}

// Animation observer for scroll effects
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Add scroll-visible class for mobile animations
                if (isMobileDevice()) {
                    if (entry.target.classList.contains('service-card') ||
                        entry.target.classList.contains('benefit-item') ||
                        entry.target.classList.contains('testimonial-card')) {
                        
                        setTimeout(() => {
                            entry.target.classList.add('scroll-visible');
                        }, 100);
                    }
                }
            }
        });
    }, observerOptions);

    // Observe elements for animations
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .service-card, .benefit-item, .testimonial-card');
    animatedElements.forEach(el => observer.observe(el));
}

// Handle window resize
function initializeResizeHandler() {
    window.addEventListener('resize', function() {
        const isMobile = isMobileDevice();
        const animatedElements = document.querySelectorAll('.service-card, .benefit-item, .testimonial-card');
        
        animatedElements.forEach(el => {
            if (!isMobile) {
                el.classList.remove('scroll-visible');
            } else {
                // Re-trigger animations for mobile if element is in view
                const rect = el.getBoundingClientRect();
                const isInView = rect.top < window.innerHeight && rect.bottom > 0;
                if (isInView) {
                    el.classList.add('scroll-visible');
                }
            }
        });
    });
}

// Mobile touch optimization
function initializeMobileTouchOptimization() {
    if (!isMobileDevice()) return;

    // Add touch device class
    document.body.classList.add('touch-device');
    
    // Prevent zoom on double tap for buttons
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
    
    // Improve button responsiveness on touch devices
    const buttons = document.querySelectorAll('button, .btn, .cta-btn, .service-btn, .maintenance-btn, .submit-btn, .contact-method');
    buttons.forEach(btn => {
        // Configure for touch
        btn.style.cursor = 'pointer';
        btn.style.touchAction = 'manipulation';
        btn.style.webkitTapHighlightColor = 'transparent';
        btn.style.userSelect = 'none';
        
        // Add touch feedback
        btn.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
            this.style.transition = 'transform 0.1s ease';
        }, { passive: true });
        
        btn.addEventListener('touchend', function() {
            setTimeout(() => {
                this.style.transform = '';
                this.style.transition = 'transform 0.3s ease';
            }, 100);
        }, { passive: true });
        
        btn.addEventListener('touchcancel', function() {
            this.style.transform = '';
            this.style.transition = 'transform 0.3s ease';
        }, { passive: true });
    });
}

// Prevent form zoom on iOS
function initializeFormOptimization() {
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            if (isMobileDevice()) {
                // Prevent zoom on focus for mobile
                input.style.fontSize = '16px';
            }
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing mobile-optimized functionality...');
    
    // Initialize all functionality
    initializeMobileMenu();
    initializeButtons();
    initializeScrollIndicator();
    initializeNavigation();
    initializeHeaderScroll();
    initializeContactForm();
    initializeScrollAnimations();
    initializeResizeHandler();
    initializeMobileTouchOptimization();
    initializeFormOptimization();
    
    console.log('Mobile functionality initialized successfully');
});

// Make functions globally available for debugging
window.scrollToContact = scrollToContact;
window.selectService = selectService;
window.scrollToServices = scrollToServices;