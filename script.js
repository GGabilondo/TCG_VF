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

// Header background on scroll
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(15, 15, 15, 0.95)';
    } else {
        header.style.background = 'rgba(15, 15, 15, 0.95)';
    }
});

// Fade in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for fade in animation
document.addEventListener('DOMContentLoaded', () => {
    const fadeElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    fadeElements.forEach(el => observer.observe(el));
});

// Contact form submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const service = formData.get('service');
    const message = formData.get('message');
    
    // Create WhatsApp message
    const whatsappMessage = `Hi! I'd like to book a service.%0A%0AName: ${name}%0AEmail: ${email}%0APhone: ${phone}%0AService: ${service}%0AMessage: ${message || 'No additional message'}`;
    
    // Open WhatsApp with pre-filled message
    window.open(`https://wa.me/447398251847?text=${whatsappMessage}`, '_blank');
    
    // Reset form
    this.reset();
    
    // Show success message
    alert('Thank you! You will be redirected to WhatsApp to complete your booking.');
});

// Smooth scroll for hero CTA buttons
document.addEventListener('DOMContentLoaded', () => {
    const ctaButtons = document.querySelectorAll('.cta-btn');
    ctaButtons.forEach(button => {
        if (button.textContent.includes('View Services')) {
            button.addEventListener('click', () => {
                document.getElementById('services').scrollIntoView({
                    behavior: 'smooth'
                });
            });
        }
    });
});