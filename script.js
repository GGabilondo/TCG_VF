// Mobile menu functionality
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const nav = document.querySelector('.nav');

mobileMenuBtn.addEventListener('click', () => {
    nav.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
});

// Close mobile menu when clicking on nav links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
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

// Scroll to contact function
function scrollToContact() {
    document.getElementById('contact').scrollIntoView({
        behavior: 'smooth'
    });
}

// Select service function
function selectService(serviceName) {
    // Pre-fill the service dropdown in the contact form
    const serviceSelect = document.getElementById('service');
    if (serviceSelect) {
        serviceSelect.value = serviceName;
    }
    
    // Scroll to contact form
    scrollToContact();
}

// Make all "Book Now" buttons scroll to footer contact form
document.addEventListener('DOMContentLoaded', () => {
    // Hero Book Now button
    const heroBookBtn = document.querySelector('.cta-btn.primary');
    if (heroBookBtn) {
        heroBookBtn.addEventListener('click', scrollToContact);
    }
    
    // Service card buttons
    document.querySelectorAll('.service-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const serviceName = btn.closest('.service-card').querySelector('h3').textContent;
            selectService(serviceName);
        });
    });
    
    // Maintenance button
    const maintenanceBtn = document.querySelector('.maintenance-btn');
    if (maintenanceBtn) {
        maintenanceBtn.addEventListener('click', (e) => {
            e.preventDefault();
            selectService('Maintenance Service');
        });
    }
    
    // Contact button in header
    const headerContactBtn = document.querySelector('.nav .contact-btn');
    if (headerContactBtn) {
        headerContactBtn.addEventListener('click', (e) => {
            e.preventDefault();
            scrollToContact();
        });
    }
});

// Header background on scroll
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(15, 15, 15, 0.95)';
    } else {
        header.style.background = 'rgba(15, 15, 15, 0.95)';
    }
});

// Scroll-based animations (replacing hover effects on mobile)
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
                    entry.target.classList.add('scroll-visible');
                }
            }
        }
    });
}, observerOptions);

// Observe elements for fade in animation
document.addEventListener('DOMContentLoaded', () => {
    const fadeElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .service-card, .benefit-item, .testimonial-card');
    fadeElements.forEach(el => observer.observe(el));
});

// Handle window resize to manage mobile/desktop animations
window.addEventListener('resize', () => {
    const isMobile = window.innerWidth <= 768;
    const animatedElements = document.querySelectorAll('.service-card, .benefit-item, .testimonial-card');
    
    animatedElements.forEach(el => {
        if (!isMobile) {
            el.classList.remove('scroll-visible');
        }
    });
});

// Improve touch interactions on mobile
if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');
    
    // Add touch feedback for buttons
    document.querySelectorAll('button, .btn, .cta-btn, .service-btn, .maintenance-btn, .submit-btn').forEach(btn => {
        btn.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        btn.addEventListener('touchend', function() {
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}

// Contact form submission
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
    
    // Open email clients and WhatsApp
    window.open(email1, '_blank');
    setTimeout(() => {
        window.open(email2, '_blank');
    }, 500);
    setTimeout(() => {
        window.open(`https://wa.me/447398251847?text=${whatsappMessage}`, '_blank');
    }, 1000);
    
    // Reset form
    this.reset();
    
    // Show success message
    alert('Thank you! Email clients will open to send your booking request to both addresses, and WhatsApp will also open for immediate contact.');
});
