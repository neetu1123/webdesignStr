/**
 * Main JavaScript file for Real Estate website
 */

document.addEventListener('DOMContentLoaded', function () {
    // Initialize all functions
    initHeaderScroll();
    initGradientEffect();
    initAnimations();
    initAccordion();
    initMobileMenu();

    // Make sure navigation links work correctly
    enableNavigation();
});

/**
 * Make sure navigation links are working properly
 */
function enableNavigation() {
    // Fix any issues with navigation links
    const navLinks = document.querySelectorAll('a[href="about.html"], a[href="contact.html"]');
    console.log('Found nav links:', navLinks.length);

    navLinks.forEach(link => {
        // Make sure the href attribute is properly set
        console.log('Link href:', link.getAttribute('href'));

        // Add click handler to force navigation
        link.addEventListener('click', function (e) {
            console.log('Link clicked, navigating to:', this.getAttribute('href'));
            window.location.href = this.getAttribute('href');
        });
    });
}

/**
 * Handle header scroll behavior
 */
function initHeaderScroll() {
    const topBar = document.getElementById('top-bar');
    const header = document.getElementById('main-header');
    const headerSpacer = document.getElementById('header-spacer');

    // Set initial height for the header spacer only if all elements exist
    function setHeaderSpacerHeight() {
        if (topBar && header && headerSpacer) {
            const topBarHeight = topBar.offsetHeight;
            const headerHeight = header.offsetHeight;
            headerSpacer.style.height = (topBarHeight + headerHeight) + 'px';
        }
    }

    // Only call if elements exist
    if (topBar && header && headerSpacer) {
        setHeaderSpacerHeight();
    }

    // Handle scroll events
    window.addEventListener('scroll', function () {
        // Only process scroll events if all required elements exist
        if (topBar && header) {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollThreshold = topBar.offsetHeight + 10;

            // Apply classes based on scroll position
            if (scrollTop > scrollThreshold) {
                header.classList.add('header-scrolled');
                header.style.backgroundColor = '#02050A';
            } else {
                header.classList.remove('header-scrolled');
                header.style.background = 'linear-gradient(to right top, #02050A, #333)';
            }
        }
    });

    // Update header spacer on window resize
    window.addEventListener('resize', function () {
        // Only call if all required elements exist
        if (topBar && header && headerSpacer) {
            setHeaderSpacerHeight();
        }
    });
}

/**
 * Initialize gradient effect for buttons and other elements
 */
function initGradientEffect() {
    const triggers = document.querySelectorAll('.gradient-trigger');

    triggers.forEach(trigger => {
        trigger.addEventListener('mouseenter', function () {
            this.style.background = 'linear-gradient(to right, #004369, #1B7895)';
            this.style.borderColor = 'transparent';
        });

        trigger.addEventListener('mouseleave', function () {
            // Reset to original styles
            if (this.classList.contains('btn-primary')) {
                this.style.background = '';
                this.style.borderColor = '';
            } else if (this.classList.contains('btn-outline-dark')) {
                this.style.background = 'transparent';
                this.style.borderColor = '';
            } else {
                this.style.background = '';
                this.style.borderColor = '';
            }
        });
    });
}

/**
 * Initialize animations for page elements
 */
function initAnimations() {
    // Add fade-in animation to sections as they come into view
    const sections = document.querySelectorAll('section');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fadeInUp');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    sections.forEach(section => {
        observer.observe(section);
    });
}

/**
 * Initialize accordion functionality
 */
function initAccordion() {
    const accordionItems = document.querySelectorAll('.accordion-item');

    accordionItems.forEach(item => {
        const button = item.querySelector('.accordion-button');
        const content = item.querySelector('.accordion-collapse');

        button.addEventListener('click', () => {
            const isExpanded = button.getAttribute('aria-expanded') === 'true';
            button.setAttribute('aria-expanded', !isExpanded);

            if (isExpanded) {
                content.classList.remove('show');
            } else {
                content.classList.add('show');
            }
        });
    });
}

/**
 * Initialize mobile menu functionality
 */
function initMobileMenu() {
    const toggleButton = document.getElementById('mobile-menu-toggle');
    const closeButton = document.getElementById('mobile-menu-close');
    const mobileMenu = document.getElementById('mobile-menu');

    if (toggleButton && closeButton && mobileMenu) {
        toggleButton.addEventListener('click', () => {
            // Show the menu
            mobileMenu.style.display = 'flex';
            // Allow animation to work by delaying opacity change
            setTimeout(() => {
                mobileMenu.style.opacity = '1';
                document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
            }, 10);
        });

        closeButton.addEventListener('click', () => {
            // Hide the menu with animation
            mobileMenu.style.opacity = '0';
            setTimeout(() => {
                mobileMenu.style.display = 'none';
                document.body.style.overflow = ''; // Restore scrolling
            }, 300);
        });

        // Close menu when clicking menu items but still allow navigation
        const menuLinks = mobileMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                // Just close the mobile menu without preventing navigation
                closeButton.click();
            });
        });
    }
}
