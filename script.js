/**
 * Main JavaScript file for Real Estate website
 */

document.addEventListener('DOMContentLoaded', function () {
    // Initialize all functions
    initHeaderScroll();
    initGradientEffect();
    initAnimations();
    initAccordion();

    // Make sure navigation links work correctly
});



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


