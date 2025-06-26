// D&G Webworks Lead Generation Website - Interactive Script
(function() {
    'use strict';

    // Wait for DOM to be fully loaded
    document.addEventListener('DOMContentLoaded', function() {
        initializeWebsite();
    });

    function initializeWebsite() {
        // Remove loading state
        removeLoadingState();
        
        // Initialize scroll animations
        initScrollAnimations();
        
        // Initialize navigation
        initNavigation();
        
        // Initialize button interactions
        initButtonInteractions();
        
        // Initialize smooth scrolling
        initSmoothScrolling();
        
        // Initialize form handling
        initFormHandling();
        
        // Initialize header scroll effects
        initHeaderScrollEffects();
    }

    // Remove loading state and show content
    function removeLoadingState() {
        setTimeout(() => {
            const loadingScreen = document.getElementById('loading-screen');
            if (loadingScreen) {
                loadingScreen.classList.add('hidden');
                setTimeout(() => {
                    loadingScreen.remove();
                }, 500);
            }
        }, 1000);
    }

    // Initialize scroll-triggered animations
    function initScrollAnimations() {
        if (!('IntersectionObserver' in window)) return;

        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe service cards, pricing cards, and benefit items
        const animatedElements = document.querySelectorAll('.service-card, .pricing-card, .benefit, .contact-item');
        animatedElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = `opacity 0.8s ease-out ${index * 0.1}s, transform 0.8s ease-out ${index * 0.1}s`;
            observer.observe(element);
        });
    }

    // Initialize navigation
    function initNavigation() {
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        const hamburger = mobileMenuBtn.querySelector('.hamburger');

        mobileMenuBtn.addEventListener('click', function() {
            const isOpen = mobileMenu.classList.contains('active');
            
            if (isOpen) {
                mobileMenu.classList.remove('active');
                hamburger.style.transform = 'rotate(0deg)';
                hamburger.style.background = 'var(--text-primary)';
            } else {
                mobileMenu.classList.add('active');
                mobileMenu.style.display = 'flex';
                hamburger.style.transform = 'rotate(90deg)';
                hamburger.style.background = 'var(--primary-600)';
            }
        });

        // Close mobile menu when clicking on a link
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                hamburger.style.transform = 'rotate(0deg)';
                hamburger.style.background = 'var(--text-primary)';
            });
        });

        // Close mobile menu on window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                mobileMenu.classList.remove('active');
                hamburger.style.transform = 'rotate(0deg)';
                hamburger.style.background = 'var(--text-primary)';
            }
        });
    }

    // Initialize button interactions and hover effects
    function initButtonInteractions() {
        const buttons = document.querySelectorAll('.btn');

        buttons.forEach(button => {
            // Add ripple effect on click
            button.addEventListener('click', function(e) {
                createRippleEffect(e, this);
            });

            // Add focus management
            button.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });
        });

        // Add hover effects to cards
        const cards = document.querySelectorAll('.service-card, .pricing-card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px)';
            });

            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(-4px)';
            });
        });
    }

    // Create ripple effect for buttons
    function createRippleEffect(event, element) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
            z-index: 1;
        `;

        // Add ripple keyframes if not already added
        if (!document.querySelector('#ripple-styles')) {
            const style = document.createElement('style');
            style.id = 'ripple-styles';
            style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(2);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }

        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);

        // Remove ripple after animation
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 600);
    }

    // Initialize smooth scrolling for anchor links
    function initSmoothScrolling() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;
                
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    scrollToSection(href.substring(1));
                }
            });
        });
    }

    // Global scroll to section function
    window.scrollToSection = function(sectionId) {
        const element = document.getElementById(sectionId);
        if (element) {
            const headerOffset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            const mobileMenu = document.getElementById('mobile-menu');
            const hamburger = document.querySelector('.hamburger');
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                if (hamburger) {
                    hamburger.style.transform = 'rotate(0deg)';
                    hamburger.style.background = 'var(--text-primary)';
                }
            }
        }
    };

    // Initialize EmailJS
    function initEmailJS() {
        // Check if emailjs is loaded
        if (typeof emailjs === 'undefined') {
            console.error('EmailJS library not loaded. Please check your internet connection.');
            return false;
        }
        
        // Check if config is loaded
        if (typeof window.EMAILJS_CONFIG === 'undefined') {
            console.error('EmailJS config not loaded. Please check emailjs-config.js file.');
            return false;
        }
        
        // Initialize EmailJS with your public key
        try {
            emailjs.init(window.EMAILJS_CONFIG.publicKey);
            console.log('EmailJS initialized successfully');
            return true;
        } catch (error) {
            console.error('Failed to initialize EmailJS:', error);
            return false;
        }
    }

    // Initialize form handling with EmailJS
    function initFormHandling() {
        // Initialize EmailJS
        const emailJSReady = initEmailJS();
        
        const contactForm = document.getElementById('contact-form');
        
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Check if EmailJS is ready
                if (!emailJSReady) {
                    showNotification('Setup Required', 'EmailJS is not properly configured. Please check your keys in script.js', 'error');
                    return;
                }
                
                // Show loading state
                const submitButton = this.querySelector('button[type="submit"]');
                const originalText = submitButton.textContent;
                submitButton.textContent = 'Sending...';
                submitButton.disabled = true;
                
                // Get form data
                const formData = new FormData(this);
                const templateParams = {
                    from_name: formData.get('name'),
                    from_email: formData.get('email'), 
                    company: formData.get('company') || 'Not provided',
                    service: formData.get('service') || 'Not specified',
                    message: formData.get('message') || 'No additional requirements'
                };
                
                console.log('Sending email with params:', templateParams);
                
                // Get configuration
                const config = window.EMAILJS_CONFIG;
                
                // Check for placeholder values
                if (config.serviceId === 'YOUR_SERVICE_ID' || config.templateId === 'YOUR_TEMPLATE_ID' || config.publicKey === 'YOUR_PUBLIC_KEY') {
                    console.error('EmailJS keys not updated! Please update emailjs-config.js with your actual keys.');
                    showNotification('Setup Required', 'Please update your EmailJS keys in emailjs-config.js file', 'error');
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                    return;
                }
                
                // Send email using EmailJS
                emailjs.send(config.serviceId, config.templateId, templateParams)
                    .then(function(response) {
                        console.log('Email sent successfully!', response.status, response.text);
                        
                        // Show success message
                        showNotification('Message Sent!', 'Thank you for your interest! We will contact you within 2 hours.', 'success');
                        
                        // Reset form
                        contactForm.reset();
                        
                    }, function(error) {
                        console.error('Failed to send email:', error);
                        
                        let errorMessage = 'There was an error sending your message. ';
                        
                        if (error.status === 400) {
                            errorMessage += 'Please check your EmailJS template parameters.';
                        } else if (error.status === 401) {
                            errorMessage += 'Please check your EmailJS public key.';
                        } else if (error.status === 404) {
                            errorMessage += 'Please check your service ID and template ID.';
                        } else {
                            errorMessage += 'Please try again or contact us directly.';
                        }
                        
                        showNotification('Send Failed', errorMessage, 'error');
                    })
                    .finally(function() {
                        // Reset button state
                        submitButton.textContent = originalText;
                        submitButton.disabled = false;
                    });
            });

            // Add real-time validation
            const inputs = contactForm.querySelectorAll('input, select, textarea');
            inputs.forEach(input => {
                input.addEventListener('blur', function() {
                    validateField(this);
                });

                input.addEventListener('input', function() {
                    clearFieldError(this);
                });
            });
        }
    }

    // Field validation
    function validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let message = '';

        // Clear previous errors
        clearFieldError(field);

        // Required field validation
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            message = 'This field is required';
        }

        // Email validation
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                message = 'Please enter a valid email address';
            }
        }

        if (!isValid) {
            showFieldError(field, message);
        }

        return isValid;
    }

    function showFieldError(field, message) {
        const formGroup = field.closest('.form-group');
        if (formGroup) {
            field.style.borderColor = '#ef4444';
            
            let errorElement = formGroup.querySelector('.field-error');
            if (!errorElement) {
                errorElement = document.createElement('span');
                errorElement.className = 'field-error';
                errorElement.style.cssText = 'color: #ef4444; font-size: 14px; margin-top: 4px; display: block;';
                formGroup.appendChild(errorElement);
            }
            errorElement.textContent = message;
        }
    }

    function clearFieldError(field) {
        const formGroup = field.closest('.form-group');
        if (formGroup) {
            field.style.borderColor = '';
            const errorElement = formGroup.querySelector('.field-error');
            if (errorElement) {
                errorElement.remove();
            }
        }
    }

    // Initialize header scroll effects
    function initHeaderScrollEffects() {
        const header = document.getElementById('header');
        let lastScrollY = window.pageYOffset;

        function updateHeader() {
            const currentScrollY = window.pageYOffset;
            
            if (currentScrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            lastScrollY = currentScrollY;
        }

        window.addEventListener('scroll', debounce(updateHeader, 10), { passive: true });
    }

    // Notification system
    function showNotification(title, message, type = 'info') {
        // Remove existing notification
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: white;
            border: 1px solid var(--border-color);
            border-radius: var(--border-radius);
            padding: 16px 20px;
            box-shadow: var(--shadow-lg);
            z-index: 10000;
            max-width: 400px;
            transform: translateX(100%);
            transition: transform 0.3s ease-out;
        `;

        if (type === 'success') {
            notification.style.borderLeftColor = 'var(--primary-500)';
            notification.style.borderLeftWidth = '4px';
        } else if (type === 'error') {
            notification.style.borderLeftColor = '#ef4444';
            notification.style.borderLeftWidth = '4px';
        }

        notification.innerHTML = `
            <div style="display: flex; align-items: flex-start; gap: 12px;">
                <div style="flex: 1;">
                    <h4 style="margin: 0 0 4px 0; font-weight: 600; color: var(--text-primary);">${title}</h4>
                    <p style="margin: 0; color: var(--text-secondary); font-size: 14px;">${message}</p>
                </div>
                <button onclick="this.parentElement.parentElement.remove()" style="background: none; border: none; color: var(--text-muted); cursor: pointer; font-size: 18px; line-height: 1;">×</button>
            </div>
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 10);

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => {
                    if (notification.parentElement) {
                        notification.remove();
                    }
                }, 300);
            }
        }, 5000);
    }

    // Utility function: Debounce
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func.apply(this, args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // Add keyboard shortcuts
        if (e.ctrlKey || e.metaKey) {
            switch (e.key) {
                case 'k':
                    e.preventDefault();
                    // Focus on first contact button
                    const contactButton = document.querySelector('.btn-primary');
                    if (contactButton) contactButton.focus();
                    break;
            }
        }

        // Escape key to close mobile menu
        if (e.key === 'Escape') {
            const mobileMenu = document.getElementById('mobile-menu');
            const hamburger = document.querySelector('.hamburger');
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                if (hamburger) {
                    hamburger.style.transform = 'rotate(0deg)';
                    hamburger.style.background = 'var(--text-primary)';
                }
            }
        }
    });

    // Performance optimizations
    function initPerformanceOptimizations() {
        // Lazy load images if any are added dynamically
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                            imageObserver.unobserve(img);
                        }
                    }
                });
            });

            // Observe images with data-src attribute
            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    // Initialize performance optimizations
    initPerformanceOptimizations();

    // Add error handling
    window.addEventListener('error', function(e) {
        console.error('JavaScript error:', e.error);
        // Gracefully handle errors without breaking the user experience
    });

    // Add resize handler for responsive adjustments
    window.addEventListener('resize', debounce(function() {
        // Handle any responsive adjustments here
        const mobileMenu = document.getElementById('mobile-menu');
        if (window.innerWidth > 768 && mobileMenu) {
            mobileMenu.classList.remove('active');
        }
    }, 250));

    // Accessibility improvements
    function improveAccessibility() {
        // Add focus visible styles
        const style = document.createElement('style');
        style.textContent = `
            .btn:focus-visible,
            input:focus-visible,
            select:focus-visible,
            textarea:focus-visible {
                outline: 2px solid var(--primary-500);
                outline-offset: 2px;
            }
            
            .nav-link:focus-visible {
                outline: 2px solid var(--primary-500);
                outline-offset: 4px;
                border-radius: 4px;
            }
        `;
        document.head.appendChild(style);

        // Add skip to content functionality
        const skipLink = document.createElement('a');
        skipLink.href = '#main';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'sr-only';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: var(--primary-600);
            color: white;
            padding: 8px;
            text-decoration: none;
            border-radius: 4px;
            z-index: 10000;
            transition: top 0.3s;
        `;
        
        skipLink.addEventListener('focus', function() {
            this.style.top = '6px';
        });
        
        skipLink.addEventListener('blur', function() {
            this.style.top = '-40px';
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);
    }

    // Initialize accessibility improvements
    improveAccessibility();

})();
