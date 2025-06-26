// D&G Webworks Lead Generation Website - Enhanced Interactive Script
(function() {
    'use strict';

    // Rate limiting for form submissions
    let lastSubmissionTime = 0;
    const SUBMISSION_COOLDOWN = 30000; // 30 seconds between submissions

    // Form validation patterns
    const validationPatterns = {
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        name: /^[a-zA-Z\s]{2,100}$/,
        company: /^[a-zA-Z0-9\s\-.,&']{0,100}$/
    };

    // Wait for DOM to be fully loaded
    document.addEventListener('DOMContentLoaded', function() {
        initializeWebsite();
    });

    function initializeWebsite() {
        console.log('🚀 D&G Webworks - Initializing website...');
        
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

        console.log('✅ D&G Webworks - Website initialized successfully');
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
        if (!('IntersectionObserver' in window)) {
            console.warn('IntersectionObserver not supported');
            return;
        }

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

    // Initialize header scroll effects
    function initHeaderScrollEffects() {
        const header = document.getElementById('header');
        let lastScrollY = window.scrollY;

        function handleScroll() {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 10) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            lastScrollY = currentScrollY;
        }

        window.addEventListener('scroll', handleScroll, { passive: true });
    }

    // Initialize EmailJS
    function initEmailJS() {
        console.log('🔧 Initializing EmailJS...');
        
        // Check if emailjs is loaded
        if (typeof emailjs === 'undefined') {
            console.error('❌ EmailJS library not loaded. Please check your internet connection.');
            return false;
        }
        
        // Check if config is loaded
        if (typeof window.EMAILJS_CONFIG === 'undefined') {
            console.error('❌ EmailJS config not loaded. Please check emailjs-config.js file.');
            return false;
        }
        
        // Validate configuration
        const config = window.EMAILJS_CONFIG;
        if (!config.publicKey || !config.serviceId || !config.templateId) {
            console.error('❌ EmailJS configuration incomplete. Missing required keys.');
            return false;
        }

        if (config.publicKey === 'YOUR_PUBLIC_KEY' || 
            config.serviceId === 'YOUR_SERVICE_ID' || 
            config.templateId === 'YOUR_TEMPLATE_ID') {
            console.error('❌ EmailJS configuration contains placeholder values. Please update with actual keys.');
            return false;
        }
        
        // Initialize EmailJS with your public key
        try {
            emailjs.init(config.publicKey);
            console.log('✅ EmailJS initialized successfully');
            console.log('📧 Service ID:', config.serviceId);
            console.log('📄 Template ID:', config.templateId);
            return true;
        } catch (error) {
            console.error('❌ Failed to initialize EmailJS:', error);
            return false;
        }
    }

    // Form validation functions
    function validateField(field, value, type) {
        const errors = [];

        // Required field validation
        if (field.hasAttribute('required') && (!value || value.trim() === '')) {
            errors.push(`${getFieldLabel(field)} is required`);
            return errors;
        }

        // Skip other validations if field is empty and not required
        if (!value || value.trim() === '') {
            return errors;
        }

        // Type-specific validation
        switch (type) {
            case 'email':
                if (!validationPatterns.email.test(value)) {
                    errors.push('Please enter a valid email address');
                }
                break;
            case 'name':
                if (!validationPatterns.name.test(value)) {
                    errors.push('Name should only contain letters and spaces (2-100 characters)');
                }
                break;
            case 'company':
                if (value && !validationPatterns.company.test(value)) {
                    errors.push('Company name contains invalid characters');
                }
                break;
            case 'message':
                if (value.length > 1000) {
                    errors.push('Message should not exceed 1000 characters');
                }
                break;
        }

        return errors;
    }

    function getFieldLabel(field) {
        const label = field.closest('.form-group').querySelector('label');
        return label ? label.textContent.replace(' *', '') : field.name;
    }

    function showFieldError(field, errors) {
        const errorElement = document.getElementById(`${field.name}-error`);
        if (errorElement) {
            if (errors.length > 0) {
                errorElement.textContent = errors[0];
                errorElement.classList.add('show');
                field.classList.add('error');
                return false;
            } else {
                errorElement.textContent = '';
                errorElement.classList.remove('show');
                field.classList.remove('error');
                return true;
            }
        }
        return errors.length === 0;
    }

    function validateForm(form) {
        const formData = new FormData(form);
        let isValid = true;
        const errors = [];

        // Validate each field
        const validations = [
            { name: 'name', type: 'name' },
            { name: 'email', type: 'email' },
            { name: 'company', type: 'company' },
            { name: 'message', type: 'message' }
        ];

        validations.forEach(({ name, type }) => {
            const field = form.querySelector(`[name="${name}"]`);
            if (field) {
                const value = formData.get(name);
                const fieldErrors = validateField(field, value, type);
                const fieldValid = showFieldError(field, fieldErrors);
                
                if (!fieldValid) {
                    isValid = false;
                    errors.push(...fieldErrors);
                }
            }
        });

        return { isValid, errors };
    }

    // Check rate limiting
    function checkRateLimit() {
        const now = Date.now();
        if (now - lastSubmissionTime < SUBMISSION_COOLDOWN) {
            const remainingTime = Math.ceil((SUBMISSION_COOLDOWN - (now - lastSubmissionTime)) / 1000);
            return {
                allowed: false,
                remainingTime
            };
        }
        return { allowed: true };
    }

    // Show notification to user
    function showNotification(title, message, type = 'success') {
        console.log(`📢 Notification [${type.toUpperCase()}]: ${title} - ${message}`);
        
        const notification = document.getElementById('form-notification');
        if (!notification) {
            console.warn('⚠️ Notification element not found');
            return;
        }

        // Update content
        const titleElement = notification.querySelector('.notification-title');
        const messageElement = notification.querySelector('.notification-message');
        
        if (titleElement) titleElement.textContent = title;
        if (messageElement) messageElement.textContent = message;

        // Set type class
        notification.className = `form-notification ${type}`;
        
        // Show notification
        notification.style.display = 'block';
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);

        // Auto-hide success notifications after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                hideNotification();
            }, 5000);
        }
    }

    // Hide notification
    window.hideNotification = function() {
        const notification = document.getElementById('form-notification');
        if (notification) {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.style.display = 'none';
            }, 300);
        }
    };

    // Initialize form handling with EmailJS
    function initFormHandling() {
        console.log('📋 Initializing form handling...');
        
        // Initialize EmailJS
        const emailJSReady = initEmailJS();
        
        const contactForm = document.getElementById('contact-form');
        
        if (!contactForm) {
            console.error('❌ Contact form not found');
            return;
        }

        // Character counter for message field
        const messageField = contactForm.querySelector('#message');
        const messageCounter = document.getElementById('message-count');
        
        if (messageField && messageCounter) {
            messageField.addEventListener('input', function() {
                const count = this.value.length;
                messageCounter.textContent = count;
                
                // Update color based on character count
                if (count > 900) {
                    messageCounter.style.color = 'var(--error)';
                } else if (count > 800) {
                    messageCounter.style.color = 'var(--warning)';
                } else {
                    messageCounter.style.color = 'var(--text-muted)';
                }
            });
        }

        // Real-time field validation
        const formFields = contactForm.querySelectorAll('input, select, textarea');
        formFields.forEach(field => {
            field.addEventListener('blur', function() {
                const fieldType = this.name === 'email' ? 'email' : 
                                this.name === 'name' ? 'name' : 
                                this.name === 'company' ? 'company' :
                                this.name === 'message' ? 'message' : 'text';
                
                const errors = validateField(this, this.value, fieldType);
                showFieldError(this, errors);
            });

            // Clear error on input
            field.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    const errors = validateField(this, this.value, this.name);
                    if (errors.length === 0) {
                        showFieldError(this, []);
                    }
                }
            });
        });

        // Form submission handler
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('📤 Form submission started...');
            
            // Hide any existing notifications
            hideNotification();

            // Validate form
            const validation = validateForm(this);
            if (!validation.isValid) {
                console.error('❌ Form validation failed:', validation.errors);
                showNotification(
                    'Validation Error', 
                    'Please correct the errors in the form and try again.', 
                    'error'
                );
                
                // Focus on first error field
                const firstErrorField = this.querySelector('.error');
                if (firstErrorField) {
                    firstErrorField.focus();
                }
                return;
            }

            // Check rate limiting
            const rateCheck = checkRateLimit();
            if (!rateCheck.allowed) {
                console.warn(`⏰ Rate limit exceeded. ${rateCheck.remainingTime}s remaining`);
                showNotification(
                    'Please Wait', 
                    `You can submit another message in ${rateCheck.remainingTime} seconds.`, 
                    'warning'
                );
                return;
            }

            // Check if EmailJS is ready
            if (!emailJSReady) {
                console.error('❌ EmailJS not ready');
                showNotification(
                    'Service Unavailable', 
                    'Email service is not available. Please try again later or contact us directly.', 
                    'error'
                );
                return;
            }
            
            // Show loading state
            const submitButton = this.querySelector('button[type="submit"]');
            const btnText = submitButton.querySelector('.btn-text');
            const btnLoader = submitButton.querySelector('.btn-loader');
            
            btnText.style.display = 'none';
            btnLoader.style.display = 'flex';
            submitButton.disabled = true;
            
            // Get form data
            const formData = new FormData(this);
            const templateParams = {
                from_name: formData.get('name') || '',
                from_email: formData.get('email') || '',
                company: formData.get('company') || 'Not provided',
                service: formData.get('service') || 'Not specified',
                message: formData.get('message') || 'No additional requirements',
                to_email: 'contact@dgwebworks.com' // Ensure we have a recipient
            };
            
            console.log('📧 Sending email with params:', {
                ...templateParams,
                from_email: '***@***.***' // Don't log actual email
            });
            
            // Get configuration
            const config = window.EMAILJS_CONFIG;
            
            // Send email using EmailJS
            emailjs.send(config.serviceId, config.templateId, templateParams)
                .then(function(response) {
                    console.log('✅ Email sent successfully!', response.status, response.text);
                    
                    // Update rate limiting
                    lastSubmissionTime = Date.now();
                    
                    // Show success message
                    showNotification(
                        'Message Sent Successfully!', 
                        'Thank you for your interest! We will contact you within 2 hours during business hours.', 
                        'success'
                    );
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Reset character counter
                    if (messageCounter) {
                        messageCounter.textContent = '0';
                        messageCounter.style.color = 'var(--text-muted)';
                    }
                    
                    // Clear any existing errors
                    const errorElements = contactForm.querySelectorAll('.form-error.show');
                    const errorFields = contactForm.querySelectorAll('.error');
                    
                    errorElements.forEach(el => el.classList.remove('show'));
                    errorFields.forEach(field => field.classList.remove('error'));
                    
                }, function(error) {
                    console.error('❌ Failed to send email:', error);
                    
                    let errorMessage = 'There was an error sending your message. ';
                    let errorTitle = 'Sending Failed';
                    
                    // Handle specific error types
                    if (error.status === 400) {
                        errorMessage += 'Please check your information and try again.';
                    } else if (error.status === 401) {
                        errorMessage += 'Service authentication failed. Please contact us directly.';
                        errorTitle = 'Service Error';
                    } else if (error.status === 403) {
                        errorMessage += 'Service access denied. Please contact us directly.';
                        errorTitle = 'Service Error';
                    } else if (error.status === 404) {
                        errorMessage += 'Email service not found. Please contact us directly.';
                        errorTitle = 'Service Error';
                    } else if (error.status >= 500) {
                        errorMessage += 'Server error. Please try again in a few minutes.';
                        errorTitle = 'Server Error';
                    } else if (error.message && error.message.includes('network')) {
                        errorMessage += 'Please check your internet connection and try again.';
                        errorTitle = 'Connection Error';
                    } else {
                        errorMessage += 'Please try again or contact us directly at contact@dgwebworks.com';
                    }
                    
                    showNotification(errorTitle, errorMessage, 'error');
                })
                .finally(function() {
                    // Reset button state
                    btnText.style.display = 'block';
                    btnLoader.style.display = 'none';
                    submitButton.disabled = false;
                    
                    console.log('📋 Form submission completed');
                });
        });

        console.log('✅ Form handling initialized successfully');
    }

})();
