// MOBILE-FIRST BUTTON FUNCTIONALITY
// Complete rewrite with focus on mobile touch events

console.log('🚀 Starting mobile-optimized script...');

// Utility functions
function isMobileDevice() {
    const isMobileWidth = window.innerWidth <= 768;
    const isMobileAgent = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    return isMobileWidth || isMobileAgent;
}

function smoothScrollTo(elementId) {
    console.log(`📍 Scrolling to: ${elementId}`);
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        return true;
    }
    console.error(`❌ Element not found: ${elementId}`);
    return false;
}

function scrollToContact() {
    console.log('📞 Scrolling to contact form');
    return smoothScrollTo('contact');
}

function scrollToServices() {
    console.log('🔧 Scrolling to services');
    return smoothScrollTo('services');
}

function selectServiceAndScroll(serviceName) {
    console.log(`🎯 Selecting service: ${serviceName}`);
    
    // Pre-fill the service dropdown
    const serviceSelect = document.getElementById('service');
    if (serviceSelect) {
        serviceSelect.value = serviceName;
        console.log(`✅ Service selected: ${serviceName}`);
    } else {
        console.error('❌ Service dropdown not found');
    }
    
    // Scroll to contact form
    scrollToContact();
}

// Button click handlers
function handleHeroBookNow(event) {
    event.preventDefault();
    event.stopPropagation();
    console.log('🎯 Hero Book Now clicked');
    scrollToContact();
}

function handleViewServices(event) {
    event.preventDefault();
    event.stopPropagation();
    console.log('👀 View Services clicked');
    scrollToServices();
}

function handleHeaderContact(event) {
    event.preventDefault();
    event.stopPropagation();
    console.log('📞 Header Contact clicked');
    scrollToContact();
}

function handleServiceButton(event) {
    event.preventDefault();
    event.stopPropagation();
    
    const button = event.currentTarget;
    const serviceCard = button.closest('.service-card');
    let serviceName = 'Service';
    
    if (serviceCard) {
        const serviceTitle = serviceCard.querySelector('h3');
        if (serviceTitle) {
            serviceName = serviceTitle.textContent.trim();
        }
    }
    
    console.log(`🔧 Service button clicked: ${serviceName}`);
    selectServiceAndScroll(serviceName);
}

function handleMaintenanceButton(event) {
    event.preventDefault();
    event.stopPropagation();
    console.log('🛠️ Maintenance button clicked');
    selectServiceAndScroll('Maintenance Service');
}

// Mobile menu functionality
function initializeMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const nav = document.querySelector('.nav');

    if (!mobileMenuBtn || !nav) {
        console.error('❌ Mobile menu elements not found');
        return;
    }

    console.log('📱 Initializing mobile menu');

    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('🍔 Mobile menu toggled');
        
        nav.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });

    // Close menu when clicking nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            console.log('🔗 Nav link clicked, closing menu');
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

// Initialize all button functionality
function initializeButtons() {
    console.log('🔘 Initializing buttons...');

    // Hero Book Now button
    const heroBookBtn = document.querySelector('.hero .cta-btn.primary');
    if (heroBookBtn) {
        heroBookBtn.addEventListener('click', handleHeroBookNow);
        heroBookBtn.addEventListener('touchend', handleHeroBookNow);
        console.log('✅ Hero Book Now button initialized');
    } else {
        console.error('❌ Hero Book Now button not found');
    }

    // View Services button
    const viewServicesBtn = document.querySelector('.hero .cta-btn.secondary');
    if (viewServicesBtn) {
        viewServicesBtn.addEventListener('click', handleViewServices);
        viewServicesBtn.addEventListener('touchend', handleViewServices);
        console.log('✅ View Services button initialized');
    }

    // Header Contact button
    const headerContactBtn = document.querySelector('.nav .contact-btn');
    if (headerContactBtn) {
        headerContactBtn.addEventListener('click', handleHeaderContact);
        headerContactBtn.addEventListener('touchend', handleHeaderContact);
        console.log('✅ Header Contact button initialized');
    } else {
        console.error('❌ Header Contact button not found');
    }

    // Service card buttons
    const serviceButtons = document.querySelectorAll('.service-btn');
    console.log(`🔧 Found ${serviceButtons.length} service buttons`);
    
    serviceButtons.forEach((btn, index) => {
        btn.addEventListener('click', handleServiceButton);
        btn.addEventListener('touchend', handleServiceButton);
        console.log(`✅ Service button ${index + 1} initialized`);
    });

    // Maintenance button
    const maintenanceBtn = document.querySelector('.maintenance-btn');
    if (maintenanceBtn) {
        maintenanceBtn.addEventListener('click', handleMaintenanceButton);
        maintenanceBtn.addEventListener('touchend', handleMaintenanceButton);
        console.log('✅ Maintenance button initialized');
    } else {
        console.error('❌ Maintenance button not found');
    }
}

// Smooth scrolling for navigation links
function initializeNavigation() {
    console.log('🧭 Initializing navigation');
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            console.log(`🔗 Navigation link clicked: ${targetId}`);
            smoothScrollTo(targetId);
        });
    });
}

// Contact form submission
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) {
        console.error('❌ Contact form not found');
        return;
    }

    console.log('📝 Initializing contact form');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        console.log('📧 Contact form submitted');
        
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

// Scroll indicator functionality
function initializeScrollIndicator() {
    const scrollIndicator = document.getElementById('scrollIndicator');
    
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('⬇️ Scroll indicator clicked');
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
        
        console.log('✅ Scroll indicator initialized');
    }
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

// Mobile touch optimization
function initializeMobileTouchOptimization() {
    if (!isMobileDevice()) return;

    console.log('📱 Applying mobile touch optimizations');
    
    // Add touch device class
    document.body.classList.add('touch-device');
    
    // Improve button responsiveness on touch devices
    const buttons = document.querySelectorAll('button, .btn, .cta-btn, .service-btn, .maintenance-btn, .submit-btn, .contact-method');
    buttons.forEach(btn => {
        // Configure for touch
        btn.style.cursor = 'pointer';
        btn.style.touchAction = 'manipulation';
        btn.style.webkitTapHighlightColor = 'transparent';
        btn.style.userSelect = 'none';
        btn.style.pointerEvents = 'auto';
        
        console.log('🔘 Button optimized for touch:', btn.className);
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 DOM loaded, initializing mobile-optimized functionality...');
    console.log('📱 Is mobile device:', isMobileDevice());
    
    // Initialize all functionality
    initializeMobileMenu();
    initializeButtons();
    initializeScrollIndicator();
    initializeNavigation();
    initializeHeaderScroll();
    initializeContactForm();
    initializeMobileTouchOptimization();
    
    console.log('✅ All mobile functionality initialized successfully');
});

// Make functions globally available for debugging
window.scrollToContact = scrollToContact;
window.selectServiceAndScroll = selectServiceAndScroll;
window.scrollToServices = scrollToServices;
window.isMobileDevice = isMobileDevice;