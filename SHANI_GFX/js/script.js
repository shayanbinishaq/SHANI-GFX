/*
   SHANI GFX - Main JavaScript
*/

document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations for elements
    initAnimations();
    
    // Initialize theme switcher
    initThemeSwitcher();
    
    // Initialize custom cursor
    initCustomCursor();
    
    // Initialize pricing toggle
    initPricingToggle();
    
    // Initialize portfolio functionality
    initPortfolio();
    
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (nav && nav.classList.contains('active') && !event.target.closest('nav') && !event.target.closest('.menu-toggle')) {
            nav.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });
    
    // Portfolio Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (filterButtons.length > 0 && portfolioItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                // Show/hide portfolio items based on filter
                portfolioItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, 10);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
    
    // Project Modal
    const viewProjectButtons = document.querySelectorAll('.view-project');
    const projectModal = document.querySelector('.project-modal');
    
    if (viewProjectButtons.length > 0 && projectModal) {
        const modalContent = document.querySelector('.modal-content');
        const modalBody = document.querySelector('.modal-body');
        const closeModal = document.querySelector('.close-modal');
        
        viewProjectButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Get project details
                const portfolioItem = this.closest('.portfolio-item');
                const projectCategory = portfolioItem.querySelector('.project-category').textContent;
                const projectTitle = portfolioItem.querySelector('h3').textContent;
                const projectDescription = portfolioItem.querySelector('p').textContent;
                const projectImage = portfolioItem.querySelector('img').getAttribute('src');
                
                // Custom content for anime character design
                let modalHTML = '';
                
                // Default modal content for all projects
                modalHTML = `
                <div class="project-details">
                    <div class="project-header">
                        <span class="project-category">${projectCategory}</span>
                        <h2>${projectTitle}</h2>
                    </div>
                    <div class="project-gallery">
                        <div class="main-image">
                            <img src="${projectImage}" alt="${projectTitle}">
                        </div>
                        <div class="gallery-thumbs">
                            <img src="${projectImage}" alt="${projectTitle}" class="active">
                            <img src="${projectImage.replace('text=', 'text=Detail+')}" alt="${projectTitle} Detail">
                            <img src="${projectImage.replace('text=', 'text=Close+')}" alt="${projectTitle} Close-up">
                        </div>
                    </div>
                    <div class="project-info">
                        <div class="project-description">
                            <h3>Project Overview</h3>
                            <p>${projectDescription}</p>
                            <p>This project was completed with attention to detail and client requirements. The process involved multiple revisions to ensure the final product met all expectations.</p>
                            
                            <h3>Project Process</h3>
                            <ol>
                                <li><strong>Research & Discovery:</strong> Understanding client needs and market analysis</li>
                                <li><strong>Concept Development:</strong> Creating initial design concepts</li>
                                <li><strong>Refinement:</strong> Iterating based on feedback</li>
                                <li><strong>Final Delivery:</strong> Providing all deliverables in required formats</li>
                            </ol>
                        </div>
                        <div class="project-meta-details">
                            <h3>Project Details</h3>
                            <ul>
                                <li><strong>Client:</strong> ${portfolioItem.querySelector('.project-meta span:nth-child(2)').textContent}</li>
                                <li><strong>Date:</strong> ${portfolioItem.querySelector('.project-meta span:nth-child(1)').textContent}</li>
                                <li><strong>Category:</strong> ${projectCategory}</li>
                                <li><strong>Tools:</strong> Adobe Photoshop, Illustrator, After Effects</li>
                            </ul>
                            
                            <h3>Project Results</h3>
                            <p>The client was extremely satisfied with the final result, which helped them achieve their business goals and improve their brand recognition in the market.</p>
                            
                            <div class="project-cta">
                                <a href="#" class="btn">Start Your Project</a>
                            </div>
                        </div>
                    </div>
                    <div class="project-navigation">
                        <a href="#" class="prev-project"><i class="fas fa-arrow-left"></i> Previous Project</a>
                        <a href="#" class="next-project">Next Project <i class="fas fa-arrow-right"></i></a>
                    </div>
                </div>
                `;
                
                // Set modal content
                modalBody.innerHTML = modalHTML;
                
                // Add thumbnail click functionality
                const galleryThumbs = modalBody.querySelectorAll('.gallery-thumbs img');
                const mainImage = modalBody.querySelector('.main-image img');
                
                galleryThumbs.forEach(thumb => {
                    thumb.addEventListener('click', function() {
                        // Update main image
                        mainImage.src = this.src;
                        mainImage.alt = this.alt;
                        
                        // Update active thumbnail
                        galleryThumbs.forEach(t => t.classList.remove('active'));
                        this.classList.add('active');
                    });
                });
                
                // Show modal
                projectModal.classList.add('active');
                setTimeout(() => {
                    modalContent.style.opacity = '1';
                    modalContent.style.transform = 'translateY(0)';
                }, 10);
                
                // Prevent scrolling on body
                document.body.style.overflow = 'hidden';
            });
        });
        
        // Close modal
        if (closeModal) {
            closeModal.addEventListener('click', function() {
                modalContent.style.opacity = '0';
                modalContent.style.transform = 'translateY(50px)';
                
                setTimeout(() => {
                    projectModal.classList.remove('active');
                    document.body.style.overflow = '';
                }, 300);
            });
        }
        
        // Close modal when clicking outside
        projectModal.addEventListener('click', function(e) {
            if (e.target === projectModal) {
                modalContent.style.opacity = '0';
                modalContent.style.transform = 'translateY(50px)';
                
                setTimeout(() => {
                    projectModal.classList.remove('active');
                    document.body.style.overflow = '';
                }, 300);
            }
        });
    }
    
    // Load More Projects
    const loadMoreBtn = document.querySelector('.load-more-btn');
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // In a real application, you would load more projects via AJAX
            // For this demo, we'll just show a message
            this.innerHTML = 'All Projects Loaded';
            this.disabled = true;
            this.style.opacity = '0.5';
            
            // Add animation to button
            this.classList.add('animate-pulse');
            
            // Show message
            setTimeout(() => {
                const message = document.createElement('p');
                message.textContent = 'No more projects to load.';
                message.style.marginTop = '10px';
                message.style.color = 'var(--text-gray)';
                this.parentNode.appendChild(message);
            }, 500);
        });
    }
    
    // Add GSAP animations for portfolio items if GSAP is available
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        
        // Animate portfolio items on scroll
        gsap.utils.toArray('.portfolio-item').forEach((item, i) => {
            gsap.from(item, {
                y: 100,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: item,
                    start: "top bottom-=100",
                    toggleActions: "play none none none"
                },
                delay: i * 0.1
            });
        });
        
        // Animate portfolio heading
        gsap.from('.portfolio h2', {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: '.portfolio h2',
                start: "top bottom-=100",
                toggleActions: "play none none none"
            }
        });
        
        // Animate filter buttons
        gsap.from('.filter-btn', {
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: '.portfolio-filter',
                start: "top bottom-=100",
                toggleActions: "play none none none"
            }
        });
    }
    
    // Add CSS for project modal details
    const modalStyles = `
    .project-details {
        color: var(--text-light);
    }

    .project-header {
        margin-bottom: 30px;
        text-align: center;
    }

    .project-header h2 {
        font-size: 2.5rem;
        margin: 10px 0 0;
    }

    .project-gallery {
        margin-bottom: 30px;
    }

    .main-image {
        width: 100%;
        height: 400px;
        overflow: hidden;
        border-radius: var(--border-radius);
        margin-bottom: 15px;
    }

    .main-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .gallery-thumbs {
        display: flex;
        gap: 15px;
    }

    .gallery-thumbs img {
        width: calc(33.333% - 10px);
        height: 100px;
        object-fit: cover;
        border-radius: var(--border-radius);
        cursor: pointer;
        transition: var(--transition);
    }

    .gallery-thumbs img:hover {
        transform: translateY(-5px);
    }

    .project-info {
        display: grid;
        grid-template-columns: 2fr 1fr;
        gap: 30px;
        margin-bottom: 30px;
    }

    .project-description h3,
    .project-meta-details h3 {
        margin-bottom: 15px;
        color: var(--primary-color);
    }

    .project-meta-details ul {
        list-style: none;
    }

    .project-meta-details ul li {
        margin-bottom: 10px;
        display: flex;
        align-items: center;
    }

    .project-meta-details ul li strong {
        min-width: 80px;
        color: var(--primary-light);
    }

    .project-navigation {
        display: flex;
        justify-content: space-between;
        padding-top: 20px;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
    }

    .project-navigation a {
        color: var(--text-light);
        transition: var(--transition);
    }

    .project-navigation a:hover {
        color: var(--primary-color);
    }

    @media screen and (max-width: 768px) {
        .project-info {
            grid-template-columns: 1fr;
        }
        
        .main-image {
            height: 300px;
        }
        
        .gallery-thumbs img {
            height: 80px;
        }
    }
    `;

    // Add the styles to the document
    const styleElement = document.createElement('style');
    styleElement.textContent = modalStyles;
    document.head.appendChild(styleElement);
    
    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (nav && nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    menuToggle.classList.remove('active');
                }
            }
        });
    });
    
    // Contact Form Validation
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            
            // Reset previous error messages
            document.querySelectorAll('.error-message').forEach(el => el.remove());
            
            // Validate Name
            if (!nameInput.value.trim()) {
                showError(nameInput, 'Please enter your name');
                isValid = false;
            }
            
            // Validate Email
            if (!emailInput.value.trim()) {
                showError(emailInput, 'Please enter your email');
                isValid = false;
            } else if (!isValidEmail(emailInput.value)) {
                showError(emailInput, 'Please enter a valid email address');
                isValid = false;
            }
            
            // Validate Message
            if (!messageInput.value.trim()) {
                showError(messageInput, 'Please enter your message');
                isValid = false;
            }
            
            if (isValid) {
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.textContent = 'Thank you for your message! We will get back to you soon.';
                contactForm.appendChild(successMessage);
                
                // Reset form
                contactForm.reset();
                
                // Remove success message after 5 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
                
                // In a real application, you would send the form data to a server here
                console.log('Form submitted successfully');
            }
        });
    }
    
    // Helper function to show error messages
    function showError(input, message) {
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.textContent = message;
        errorMessage.style.color = 'var(--error-color)';
        errorMessage.style.fontSize = '0.8rem';
        errorMessage.style.marginTop = '5px';
        
        input.parentNode.appendChild(errorMessage);
        input.style.borderColor = 'var(--error-color)';
        
        // Remove error on input focus
        input.addEventListener('focus', function() {
            errorMessage.remove();
            input.style.borderColor = 'var(--primary-color)';
        });
    }
    
    // Helper function to validate email format
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Add animation to service cards on scroll
    function initAnimations() {
        // Animate elements when they come into view
        const animateOnScroll = function() {
            const elements = document.querySelectorAll('.service-card, .testimonial, .portfolio-item, .payment-method, .faq-item, .policy-item');
            const windowHeight = window.innerHeight;
            
            elements.forEach((element, index) => {
                const elementPosition = element.getBoundingClientRect().top;
                const elementVisible = 150;
                
                if (elementPosition < windowHeight - elementVisible) {
                    // Add staggered delay based on index
                    setTimeout(() => {
                        element.classList.add('animate-fade-in');
                        element.style.animationDelay = `${index * 0.1}s`;
                    }, 100);
                }
            });
            
            // Animate headings
            const headings = document.querySelectorAll('section h2');
            headings.forEach(heading => {
                const headingPosition = heading.getBoundingClientRect().top;
                if (headingPosition < windowHeight - 150) {
                    heading.classList.add('animate-fade-in');
                }
            });
        };
        
        // Run once on load
        animateOnScroll();
        
        // Run on scroll
        window.addEventListener('scroll', animateOnScroll);
        
        // Add floating animation to specific elements
        document.querySelectorAll('.service-card i').forEach(icon => {
            icon.classList.add('animate-float');
        });
    }
    
    // Theme Switcher Functionality
    function initThemeSwitcher() {
        // Create floating theme switcher element
        const themeSwitcher = document.createElement('div');
        themeSwitcher.className = 'theme-switcher';
        themeSwitcher.innerHTML = '<i class="fas fa-moon"></i>';
        document.body.appendChild(themeSwitcher);
        
        // Check for saved theme preference
        const currentTheme = localStorage.getItem('theme') || 'dark';
        if (currentTheme === 'light') {
            document.documentElement.setAttribute('data-theme', 'light');
            themeSwitcher.innerHTML = '<i class="fas fa-sun"></i>';
            updateThemeButtons('light');
        } else {
            updateThemeButtons('dark');
        }
        
        // Toggle theme on floating button click
        themeSwitcher.addEventListener('click', function() {
            let theme = 'dark';
            
            if (document.documentElement.getAttribute('data-theme') !== 'light') {
                document.documentElement.setAttribute('data-theme', 'light');
                themeSwitcher.innerHTML = '<i class="fas fa-sun"></i>';
                theme = 'light';
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                themeSwitcher.innerHTML = '<i class="fas fa-moon"></i>';
            }
            
            // Save theme preference
            localStorage.setItem('theme', theme);
            
            // Update theme section buttons
            updateThemeButtons(theme);
            
            // Add animation to theme switch
            themeSwitcher.classList.add('animate-rotate');
            setTimeout(() => {
                themeSwitcher.classList.remove('animate-rotate');
            }, 1000);
        });
        
        // Theme option buttons in the dedicated section
        const themeOptions = document.querySelectorAll('.theme-option');
        const themeButtons = document.querySelectorAll('.theme-select-btn');
        
        if (themeOptions.length > 0) {
            themeOptions.forEach(option => {
                option.addEventListener('click', function() {
                    const theme = this.querySelector('.theme-select-btn').getAttribute('data-theme');
                    setTheme(theme);
                });
            });
        }
        
        if (themeButtons.length > 0) {
            themeButtons.forEach(button => {
                button.addEventListener('click', function(e) {
                    e.stopPropagation(); // Prevent triggering the parent click event
                    const theme = this.getAttribute('data-theme');
                    setTheme(theme);
                });
            });
        }
        
        // Function to set theme
        function setTheme(theme) {
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
            
            // Update floating theme switcher icon
            if (theme === 'light') {
                themeSwitcher.innerHTML = '<i class="fas fa-sun"></i>';
            } else {
                themeSwitcher.innerHTML = '<i class="fas fa-moon"></i>';
            }
            
            // Update theme section buttons
            updateThemeButtons(theme);
            
            // Add animation to theme switch
            themeSwitcher.classList.add('animate-rotate');
            setTimeout(() => {
                themeSwitcher.classList.remove('animate-rotate');
            }, 1000);
        }
        
        // Function to update theme buttons in the theme section
        function updateThemeButtons(activeTheme) {
            const darkButton = document.querySelector('.theme-select-btn[data-theme="dark"]');
            const lightButton = document.querySelector('.theme-select-btn[data-theme="light"]');
            
            if (darkButton && lightButton) {
                if (activeTheme === 'dark') {
                    darkButton.classList.add('active');
                    darkButton.innerHTML = '<i class="fas fa-check-circle"></i> Selected';
                    lightButton.classList.remove('active');
                    lightButton.innerHTML = 'Select Theme';
                } else {
                    lightButton.classList.add('active');
                    lightButton.innerHTML = '<i class="fas fa-check-circle"></i> Selected';
                    darkButton.classList.remove('active');
                    darkButton.innerHTML = 'Select Theme';
                }
            }
        }
    }
    
    // Pricing Toggle Functionality
    function initPricingToggle() {
        const billingToggle = document.getElementById('billing-toggle');
        const monthlyLabel = document.querySelector('.monthly-label');
        const annualLabel = document.querySelector('.annual-label');
        
        if (billingToggle) {
            // Check for saved billing preference
            const savedBilling = localStorage.getItem('billing') || 'monthly';
            if (savedBilling === 'annual') {
                billingToggle.checked = true;
                document.body.classList.add('annual-billing');
                updateLabels('annual');
            } else {
                updateLabels('monthly');
            }
            
            // Toggle between monthly and annual billing
            billingToggle.addEventListener('change', function() {
                if (this.checked) {
                    document.body.classList.add('annual-billing');
                    localStorage.setItem('billing', 'annual');
                    updateLabels('annual');
                    
                    // Add animation to price elements
                    animatePriceChange();
                } else {
                    document.body.classList.remove('annual-billing');
                    localStorage.setItem('billing', 'monthly');
                    updateLabels('monthly');
                    
                    // Add animation to price elements
                    animatePriceChange();
                }
            });
            
            // Function to update label styling
            function updateLabels(activeBilling) {
                if (activeBilling === 'annual') {
                    monthlyLabel.classList.remove('active');
                    annualLabel.classList.add('active');
                } else {
                    monthlyLabel.classList.add('active');
                    annualLabel.classList.remove('active');
                }
            }
            
            // Function to animate price change
            function animatePriceChange() {
                const priceContainers = document.querySelectorAll('.price-container');
                
                priceContainers.forEach(container => {
                    container.style.transform = 'scale(1.1)';
                    
                    setTimeout(() => {
                        container.style.transform = 'scale(1)';
                    }, 300);
                });
            }
        }
    }
    
    // Custom Cursor Functionality
    function initCustomCursor() {
        const cursor = document.createElement('div');
        cursor.className = 'cursor';
        
        const follower = document.createElement('div');
        follower.className = 'cursor-follower';
        
        document.body.appendChild(cursor);
        document.body.appendChild(follower);
        
        let posX = 0, posY = 0;
        let mouseX = 0, mouseY = 0;
        
        // Update cursor position
        function updateCursor() {
            // Smooth follower movement
            posX += (mouseX - posX) * 0.1;
            posY += (mouseY - posY) * 0.1;
            
            // Apply positions
            follower.style.left = posX + 'px';
            follower.style.top = posY + 'px';
            
            cursor.style.left = mouseX + 'px';
            cursor.style.top = mouseY + 'px';
            
            // Continue animation loop
            requestAnimationFrame(updateCursor);
        }
        
        // Start animation loop
        updateCursor();
        
        // Track mouse position
        document.addEventListener('mousemove', function(e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        // Cursor effects on interactive elements
        const links = document.querySelectorAll('a, button, .btn, .service-card, .portfolio-item, .testimonial, .payment-method, .theme-switcher, .pricing-plan, .faq-item');
        
        links.forEach(link => {
            link.addEventListener('mouseenter', function() {
                cursor.classList.add('link-grow');
                follower.classList.add('hidden');
            });
            
            link.addEventListener('mouseleave', function() {
                cursor.classList.remove('link-grow');
                follower.classList.remove('hidden');
            });
        });
        
        // Hide cursor when leaving window
        document.addEventListener('mouseout', function(e) {
            if (e.relatedTarget === null) {
                cursor.style.display = 'none';
                follower.style.display = 'none';
            }
        });
        
        document.addEventListener('mouseover', function() {
            cursor.style.display = 'block';
            follower.style.display = 'block';
        });
    }
    
    // FAQ Accordion (if present)
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('h3');
            const answer = question.nextElementSibling;
            
            // Set initial state
            answer.style.maxHeight = '0';
            answer.style.overflow = 'hidden';
            answer.style.transition = 'max-height 0.3s ease';
            
            question.addEventListener('click', function() {
                // Toggle active class
                item.classList.toggle('active');
                
                // Toggle answer visibility
                if (item.classList.contains('active')) {
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                    
                    // Change icon
                    const icon = question.querySelector('i');
                    if (icon) {
                        icon.classList.remove('fa-plus');
                        icon.classList.add('fa-minus');
                    }
                } else {
                    answer.style.maxHeight = '0';
                    
                    // Change icon back
                    const icon = question.querySelector('i');
                    if (icon) {
                        icon.classList.remove('fa-minus');
                        icon.classList.add('fa-plus');
                    }
                }
            });
        });
    }
    
    // Add parallax effect to hero and page header sections
    window.addEventListener('scroll', function() {
        const hero = document.querySelector('.hero');
        const pageHeader = document.querySelector('.page-header');
        const scrollPosition = window.scrollY;
        
        if (hero) {
            hero.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
        }
        
        if (pageHeader) {
            pageHeader.style.backgroundPositionY = scrollPosition * 0.2 + 'px';
        }
    });
});

// Initialize Portfolio Functionality
function initPortfolio() {
    console.log('Initializing portfolio functionality');
    
    // Portfolio filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (filterButtons.length > 0 && portfolioItems.length > 0) {
        console.log('Setting up filter buttons:', filterButtons.length);
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                console.log('Filtering by:', filterValue);
                
                // Show/hide portfolio items based on filter
                portfolioItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, 10);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
    
    // Project Modal
    const viewProjectButtons = document.querySelectorAll('.view-project');
    const projectModal = document.querySelector('.project-modal');
    
    if (viewProjectButtons.length > 0 && projectModal) {
        console.log('Setting up view project buttons:', viewProjectButtons.length);
        const modalContent = document.querySelector('.modal-content');
        const modalBody = document.querySelector('.modal-body');
        const closeModal = document.querySelector('.close-modal');
        
        viewProjectButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('View project button clicked');
                
                // Get project details
                const portfolioItem = this.closest('.portfolio-item');
                const projectCategory = portfolioItem.querySelector('.project-category').textContent;
                const projectTitle = portfolioItem.querySelector('h3').textContent;
                const projectDescription = portfolioItem.querySelector('p').textContent;
                const projectImage = portfolioItem.querySelector('img').getAttribute('src');
                
                console.log('Project details:', {
                    title: projectTitle,
                    category: projectCategory,
                    image: projectImage
                });
                
                // Custom content for anime character design
                let modalHTML = '';
                if (projectTitle === 'Anime-Style Character Design') {
                    console.log('Creating anime project modal');
                    modalHTML = `
                    <div class="project-details anime-project">
                        <div class="project-header">
                            <span class="project-category">${projectCategory}</span>
                            <h2>${projectTitle}</h2>
                        </div>
                        <div class="project-gallery">
                            <div class="main-image">
                                <img src="${projectImage}" alt="${projectTitle}">
                            </div>
                            <div class="gallery-thumbs">
                                <img src="${projectImage}" alt="${projectTitle}" class="active">
                                <img src="${projectImage}" alt="${projectTitle} Detail 1">
                                <img src="${projectImage}" alt="${projectTitle} Detail 2">
                            </div>
                        </div>
                        <div class="project-info">
                            <div class="project-description">
                                <h3>Project Overview</h3>
                                <p>${projectDescription}</p>
                                <p>This character design project explores the duality of elements through contrasting colors and themes. The left side represents traditional power with fiery red tones and ancient architecture, while the right side embodies a cooler, more modern aesthetic with blue tones.</p>
                                
                                <h3>Design Concept</h3>
                                <p>The artwork represents the balance between tradition and modernity, with the left side showing a temple structure with red fiery background symbolizing passion and power, while the right side displays a character with blue hair against a cosmic background representing innovation and the future.</p>
                                
                                <h3>Design Process</h3>
                                <ol>
                                    <li><strong>Concept Development:</strong> Initial sketches exploring the contrast between traditional and modern elements</li>
                                    <li><strong>Color Theory:</strong> Implementing complementary color schemes to create visual tension between red and blue</li>
                                    <li><strong>Character Design:</strong> Refining the character's appearance to balance both worlds</li>
                                    <li><strong>Background Elements:</strong> Creating architectural elements that enhance the character's story</li>
                                </ol>
                            </div>
                            <div class="project-meta-details">
                                <h3>Project Details</h3>
                                <ul>
                                    <li><strong>Client:</strong> ${portfolioItem.querySelector('.project-meta span:nth-child(2)').textContent}</li>
                                    <li><strong>Date:</strong> ${portfolioItem.querySelector('.project-meta span:nth-child(1)').textContent}</li>
                                    <li><strong>Category:</strong> ${projectCategory}</li>
                                    <li><strong>Tools:</strong> Photoshop, Clip Studio Paint, Procreate</li>
                                </ul>
                                
                                <h3>Project Results</h3>
                                <p>The final character design was used as key art for an upcoming anime series, featured in promotional materials and merchandise. The striking visual contrast helped establish the show's unique aesthetic.</p>
                                
                                <div class="project-cta">
                                    <a href="#" class="btn">Commission Similar Art</a>
                                </div>
                            </div>
                        </div>
                        <div class="project-navigation">
                            <a href="#" class="prev-project"><i class="fas fa-arrow-left"></i> Previous Project</a>
                            <a href="#" class="next-project">Next Project <i class="fas fa-arrow-right"></i></a>
                        </div>
                    </div>
                    `;
                } else {
                    // Default modal content for other projects
                    modalHTML = `
                    <div class="project-details">
                        <div class="project-header">
                            <span class="project-category">${projectCategory}</span>
                            <h2>${projectTitle}</h2>
                        </div>
                        <div class="project-gallery">
                            <div class="main-image">
                                <img src="${projectImage}" alt="${projectTitle}">
                            </div>
                            <div class="gallery-thumbs">
                                <img src="${projectImage}" alt="${projectTitle}" class="active">
                                <img src="${projectImage.replace('text=', 'text=Detail+')}" alt="${projectTitle} Detail">
                                <img src="${projectImage.replace('text=', 'text=Close+')}" alt="${projectTitle} Close-up">
                            </div>
                        </div>
                        <div class="project-info">
                            <div class="project-description">
                                <h3>Project Overview</h3>
                                <p>${projectDescription}</p>
                                <p>This project was completed with attention to detail and client requirements. The process involved multiple revisions to ensure the final product met all expectations.</p>
                                
                                <h3>Project Process</h3>
                                <ol>
                                    <li><strong>Research & Discovery:</strong> Understanding client needs and market analysis</li>
                                    <li><strong>Concept Development:</strong> Creating initial design concepts</li>
                                    <li><strong>Refinement:</strong> Iterating based on feedback</li>
                                    <li><strong>Final Delivery:</strong> Providing all deliverables in required formats</li>
                                </ol>
                            </div>
                            <div class="project-meta-details">
                                <h3>Project Details</h3>
                                <ul>
                                    <li><strong>Client:</strong> ${portfolioItem.querySelector('.project-meta span:nth-child(2)').textContent.replace('Tech Startup', '')}</li>
                                    <li><strong>Date:</strong> ${portfolioItem.querySelector('.project-meta span:nth-child(1)').textContent.replace('2023', '')}</li>
                                    <li><strong>Category:</strong> ${projectCategory}</li>
                                    <li><strong>Tools:</strong> Adobe Photoshop, Illustrator, After Effects</li>
                                </ul>
                                
                                <h3>Project Results</h3>
                                <p>The client was extremely satisfied with the final result, which helped them achieve their business goals and improve their brand recognition in the market.</p>
                                
                                <div class="project-cta">
                                    <a href="#" class="btn">Start Your Project</a>
                                </div>
                            </div>
                        </div>
                        <div class="project-navigation">
                            <a href="#" class="prev-project"><i class="fas fa-arrow-left"></i> Previous Project</a>
                            <a href="#" class="next-project">Next Project <i class="fas fa-arrow-right"></i></a>
                        </div>
                    </div>
                `;
                }
                
                // Set modal content
                modalBody.innerHTML = modalHTML;
                console.log('Modal content set');
                
                // Add thumbnail click functionality
                const galleryThumbs = modalBody.querySelectorAll('.gallery-thumbs img');
                const mainImage = modalBody.querySelector('.main-image img');
                
                galleryThumbs.forEach(thumb => {
                    thumb.addEventListener('click', function() {
                        // Update main image
                        mainImage.src = this.src;
                        mainImage.alt = this.alt;
                        
                        // Update active thumbnail
                        galleryThumbs.forEach(t => t.classList.remove('active'));
                        this.classList.add('active');
                    });
                });
                
                // Show modal
                projectModal.classList.add('active');
                console.log('Modal activated');
                setTimeout(() => {
                    modalContent.style.opacity = '1';
                    modalContent.style.transform = 'translateY(0)';
                }, 10);
                
                // Prevent scrolling on body
                document.body.style.overflow = 'hidden';
            });
        });
        
        // Close modal
        if (closeModal) {
            closeModal.addEventListener('click', function() {
                console.log('Close modal clicked');
                modalContent.style.opacity = '0';
                modalContent.style.transform = 'translateY(50px)';
                
                setTimeout(() => {
                    projectModal.classList.remove('active');
                    document.body.style.overflow = '';
                }, 300);
            });
        }
        
        // Close modal when clicking outside
        projectModal.addEventListener('click', function(e) {
            if (e.target === projectModal) {
                console.log('Clicked outside modal');
                modalContent.style.opacity = '0';
                modalContent.style.transform = 'translateY(50px)';
                
                setTimeout(() => {
                    projectModal.classList.remove('active');
                    document.body.style.overflow = '';
                }, 300);
            }
        });
    }
    
    // Load More Projects
    const loadMoreBtn = document.querySelector('.load-more-btn');
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // In a real application, you would load more projects via AJAX
            // For this demo, we'll just show a message
            this.innerHTML = 'All Projects Loaded';
            this.disabled = true;
            this.style.opacity = '0.5';
            
            // Add animation to button
            this.classList.add('animate-pulse');
            
            // Show message
            setTimeout(() => {
                const message = document.createElement('p');
                message.textContent = 'No more projects to load.';
                message.style.marginTop = '10px';
                message.style.color = 'var(--text-gray)';
                this.parentNode.appendChild(message);
            }, 500);
        });
    }
    
    // Add GSAP animations for portfolio items
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        
        // Animate portfolio items on scroll
        gsap.utils.toArray('.portfolio-item').forEach((item, i) => {
            gsap.from(item, {
                y: 100,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: item,
                    start: "top bottom-=100",
                    toggleActions: "play none none none"
                },
                delay: i * 0.1
            });
        });
        
        // Animate portfolio heading
        gsap.from('.portfolio h2', {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: '.portfolio h2',
                start: "top bottom-=100",
                toggleActions: "play none none none"
            }
        });
        
        // Animate filter buttons
        gsap.from('.filter-btn', {
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: '.portfolio-filter',
                start: "top bottom-=100",
                toggleActions: "play none none none"
            }
        });
    }
} 