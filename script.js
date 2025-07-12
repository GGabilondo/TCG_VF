// Mobile menu functionality
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const nav = document.querySelector('.nav');

if (mobileMenuBtn && nav) {
    mobileMenuBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        nav.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });

    // Close mobile menu when clicking on nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            nav.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            nav.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        }
    });
}

// Scroll to contact function - FIXED
function scrollToContact() {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        contactSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Select service function - FIXED
function selectService(serviceName) {
    // Pre-fill the service dropdown in the contact form
    const serviceSelect = document.getElementById('service');
    if (serviceSelect) {
        serviceSelect.value = serviceName;
    }
    
    // Scroll to contact form
    scrollToContact();
}

// Enhanced button functionality - COMPLETELY REWRITTEN
document.addEventListener('DOMContentLoaded', () => {
    // Make scrollToContact and selectService globally available
    window.scrollToContact = scrollToContact;
    window.selectService = selectService;
    
    // Hero Book Now button - FIXED
    const heroBookBtn = document.querySelector('.cta-btn.primary');
    if (heroBookBtn) {
        // Remove any existing onclick
        heroBookBtn.removeAttribute('onclick');
        
        heroBookBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Hero book button clicked'); // Debug
            scrollToContact();
        });
        
        // Touch events for mobile
        heroBookBtn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            heroBookBtn.style.transform = 'scale(0.98)';
        });
        
        heroBookBtn.addEventListener('touchend', (e) => {
            e.preventDefault();
            setTimeout(() => {
                heroBookBtn.style.transform = '';
                scrollToContact();
            }, 150);
        });
    }
    
    // Service card buttons - FIXED
    document.querySelectorAll('.service-btn').forEach(btn => {
        // Remove any existing onclick
        btn.removeAttribute('onclick');
        
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const serviceCard = btn.closest('.service-card');
            let serviceName = 'Service';
            
            if (serviceCard) {
                const serviceTitle = serviceCard.querySelector('h3');
                if (serviceTitle) {
                    serviceName = serviceTitle.textContent.trim();
                }
            }
            
            console.log('Service button clicked:', serviceName); // Debug
            selectService(serviceName);
        });
        
        // Touch events for mobile
        btn.addEventListener('touchstart', (e) => {
            btn.style.transform = 'scale(0.98)';
        });
        
        btn.addEventListener('touchend', (e) => {
            setTimeout(() => {
                btn.style.transform = '';
            }, 150);
        });
    });
    
    // Maintenance button - FIXED
    const maintenanceBtn = document.querySelector('.maintenance-btn');
    if (maintenanceBtn) {
        // Remove any existing onclick
        maintenanceBtn.removeAttribute('onclick');
        
        maintenanceBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Maintenance button clicked'); // Debug
            selectService('Maintenance Service');
        });
        
        // Touch events for mobile
        maintenanceBtn.addEventListener('touchstart', (e) => {
            maintenanceBtn.style.transform = 'scale(0.98)';
        });
        
        maintenanceBtn.addEventListener('touchend', (e) => {
            setTimeout(() => {
                maintenanceBtn.style.transform = '';
            }, 150);
        });
    }
    
    // Contact button in header - FIXED
    const headerContactBtn = document.querySelector('.nav .contact-btn');
    if (headerContactBtn) {
        // Remove any existing onclick
        headerContactBtn.removeAttribute('onclick');
        
        headerContactBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Header contact button clicked'); // Debug
            scrollToContact();
        });
    }
    
    // View Services button - FIXED
    const viewServicesBtn = document.querySelector('.cta-btn.secondary');
    if (viewServicesBtn) {
        // Remove any existing onclick
        viewServicesBtn.removeAttribute('onclick');
        
        viewServicesBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const servicesSection = document.getElementById('services');
            if (servicesSection) {
                servicesSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
    
    // Add touch feedback to all interactive elements
    const interactiveElements = document.querySelectorAll('.cta-btn, .contact-method, .submit-btn, .service-btn, .maintenance-btn');
    interactiveElements.forEach(element => {
        element.addEventListener('touchstart', (e) => {
            element.style.transform = 'scale(0.98)';
        });
        
        element.addEventListener('touchend', (e) => {
            setTimeout(() => {
                element.style.transform = '';
            }, 150);
        });
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header background on scroll
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (header) {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(15, 15, 15, 0.98)';
        } else {
            header.style.background = 'rgba(15, 15, 15, 0.95)';
        }
    }
});

// Mobile-optimized scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Add scroll-visible class for mobile animations
            if (window.innerWidth <= 768) {
                if (entry.target.classList.contains('service-card') ||
                    entry.target.classList.contains('benefit-item') ||
                    entry.target.classList.contains('testimonial-card')) {
                    
                    // Delay the animation slightly for better effect
                    setTimeout(() => {
                        entry.target.classList.add('scroll-visible');
                    }, 100);
                }
            }
        }
    });
}, observerOptions);

// Observe elements for animations
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .service-card, .benefit-item, .testimonial-card');
    animatedElements.forEach(el => observer.observe(el));
});

// Handle window resize to manage mobile/desktop animations
window.addEventListener('resize', () => {
    const isMobile = window.innerWidth <= 768;
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

// Touch device detection and optimization
if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
    document.body.classList.add('touch-device');
    
    // Prevent zoom on double tap for buttons
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function (event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
    
    // Improve button responsiveness on touch devices
    const buttons = document.querySelectorAll('button, .btn, .cta-btn, .service-btn, .maintenance-btn, .submit-btn, .contact-method');
    buttons.forEach(btn => {
        // Remove hover states on touch devices
        btn.addEventListener('touchstart', function(e) {
            this.classList.add('touch-active');
        });
        
        btn.addEventListener('touchend', function(e) {
            setTimeout(() => {
                this.classList.remove('touch-active');
            }, 150);
        });
        
        // Ensure buttons are properly clickable
        btn.style.cursor = 'pointer';
        btn.style.touchAction = 'manipulation';
        btn.style.webkitTapHighlightColor = 'transparent';
    });
}

// Enhanced contact form submission with better mobile support
document.getElementById('contactForm').addEventListener('submit', function(e) {
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
    
    // Create email body for both recipients
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
    
    // Create mailto links for both email addresses
    const email1 = `mailto:info@tcgcarcare.co.uk?subject=${emailSubject}&body=${emailBody}`;
    const email2 = `mailto:hola@remedio.studio?subject=${emailSubject}&body=${emailBody}`;
    
    // Create WhatsApp message
    const whatsappMessage = `Hi! I'd like to book a service.%0A%0AName: ${name}%0AEmail: ${email}%0APhone: ${phone}%0AService: ${service}%0APreferred Date: ${formattedDate}%0APreferred Time: ${preferredTime}%0AMessage: ${message || 'No additional message'}`;
    
    // For mobile devices, open WhatsApp first as it's more commonly used
    const isMobile = window.innerWidth <= 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
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
    const successMessage = isMobile ? 
        'Thank you! WhatsApp will open to send your booking request.' :
        'Thank you! Email clients will open to send your booking request, and WhatsApp will also open for immediate contact.';
    
    alert(successMessage);
});

// Prevent form zoom on iOS
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            if (window.innerWidth <= 768) {
                // Prevent zoom on focus for mobile
                input.style.fontSize = '16px';
            }
        });
    });
    
    // Add custom placeholder for date input
    const dateInput = document.getElementById('preferred-date');
    if (dateInput) {
        // Set a custom attribute to show placeholder text
        dateInput.setAttribute('data-placeholder', 'Select Preferred Date');
        
        // Show placeholder when empty
        if (!dateInput.value) {
            dateInput.style.color = '#a0a0a0';
        }
        
        dateInput.addEventListener('focus', function() {
            this.style.color = '#fff';
        });
        
        dateInput.addEventListener('blur', function() {
            if (!this.value) {
                this.style.color = '#a0a0a0';
            }
        });
    }
});

// Optimize scroll performance on mobile
let ticking = false;

function updateScrollAnimations() {
    const scrollTop = window.pageYOffset;
    const windowHeight = window.innerHeight;
    
    // Only run animations if on mobile
    if (window.innerWidth <= 768) {
        const animatedElements = document.querySelectorAll('.service-card, .benefit-item, .testimonial-card');
        
        animatedElements.forEach(element => {
            const elementTop = element.offsetTop;
            const elementHeight = element.offsetHeight;
            
            // Check if element is in viewport
            if (scrollTop + windowHeight > elementTop + 100 && scrollTop < elementTop + elementHeight) {
                if (!element.classList.contains('scroll-visible')) {
                    element.classList.add('scroll-visible');
                }
            }
        });
    }
    
    ticking = false;
}

function requestScrollUpdate() {
    if (!ticking) {
        requestAnimationFrame(updateScrollAnimations);
        ticking = true;
    }
}

// Throttled scroll listener for better performance
window.addEventListener('scroll', requestScrollUpdate, { passive: true });