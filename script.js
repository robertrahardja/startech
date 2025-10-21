// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    // Check if shimmer has already been shown
    const hasSeenShimmer = localStorage.getItem('hasSeenNavShimmer');

    if (hasSeenShimmer) {
        // Disable shimmer animation if already seen
        document.body.classList.add('no-shimmer');
    } else {
        // Mark as seen after first view
        localStorage.setItem('hasSeenNavShimmer', 'true');
    }

    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    // Toggle mobile menu
    mobileMenuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');

        // Animate hamburger menu
        const spans = this.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translateY(8px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
        } else {
            spans[0].style.transform = '';
            spans[1].style.opacity = '1';
            spans[2].style.transform = '';
        }
    });

    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const spans = mobileMenuToggle.querySelectorAll('span');
            spans[0].style.transform = '';
            spans[1].style.opacity = '1';
            spans[2].style.transform = '';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileMenuToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            const spans = mobileMenuToggle.querySelectorAll('span');
            spans[0].style.transform = '';
            spans[1].style.opacity = '1';
            spans[2].style.transform = '';
        }
    });

    // Handle contact form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);

            // Get submit button and disable it
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';

            try {
                // Send to API endpoint
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                const result = await response.json();

                if (result.success) {
                    // Show success message
                    showNotification('success', 'Message Sent Successfully!', 'Thank you for reaching out. We\'ll get back to you within 24 hours.');
                    // Reset form
                    contactForm.reset();
                } else {
                    // Show error message
                    showNotification('error', 'Failed to Send', result.error || 'Please try again or contact us directly at rr.startech.innovation@gmail.com');
                }
            } catch (error) {
                console.error('Form submission error:', error);
                showNotification('error', 'Connection Error', 'Please check your connection and try again, or contact us directly at rr.startech.innovation@gmail.com');
            } finally {
                // Re-enable submit button
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
            }
        });
    }

    // Smooth scroll behavior for navigation links
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add scroll effect to navbar
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.style.background = '#000000';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.background = '#000000';
            navbar.style.backdropFilter = 'blur(10px)';
        }

        lastScroll = currentScroll;
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .contact-card, .about-content');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Notification function for form feedback
function showNotification(type, title, message) {
    // Remove existing notification if any
    const existing = document.querySelector('.notification-modal');
    if (existing) {
        existing.remove();
    }

    // Create notification modal
    const modal = document.createElement('div');
    modal.className = `notification-modal ${type}`;

    const icon = type === 'success'
        ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>'
        : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>';

    modal.innerHTML = `
        <div class="notification-overlay"></div>
        <div class="notification-content">
            <div class="notification-icon ${type}">
                ${icon}
            </div>
            <h3 class="notification-title">${title}</h3>
            <p class="notification-message">${message}</p>
            <button class="notification-close">Got it</button>
        </div>
    `;

    document.body.appendChild(modal);

    // Trigger animation
    setTimeout(() => modal.classList.add('show'), 10);

    // Close on button click
    const closeBtn = modal.querySelector('.notification-close');
    const overlay = modal.querySelector('.notification-overlay');

    const closeModal = () => {
        modal.classList.remove('show');
        setTimeout(() => modal.remove(), 300);
    };

    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);

    // Auto close after 5 seconds
    setTimeout(closeModal, 5000);
}