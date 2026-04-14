// ===================================================
// SleepSense Privacy Policy — Interactive Scripts
// Stars, scroll animations, navbar, TOC tracking
// ===================================================

document.addEventListener('DOMContentLoaded', () => {
    createStars();
    setupScrollAnimations();
    setupNavbar();
    setupTOC();
});

// --- Navbar glassy transition ---
function setupNavbar() {
    const navbar = document.querySelector('.nav-bar');
    if (!navbar) return;

    const handleScroll = () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
}

// --- Generate twinkling star particles ---
function createStars() {
    const container = document.getElementById('stars-container');
    if (!container) return;

    const starCount = 80;

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');

        // Random position
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';

        // Random size (1–2.5px)
        const size = 1 + Math.random() * 1.5;
        star.style.width = size + 'px';
        star.style.height = size + 'px';

        // Random animation delay & duration
        star.style.animationDelay = (Math.random() * 6) + 's';
        star.style.animationDuration = (2 + Math.random() * 5) + 's';

        // Random initial opacity
        star.style.opacity = 0.08 + Math.random() * 0.3;

        container.appendChild(star);
    }
}

// --- Intersection Observer for section fade-in ---
function setupScrollAnimations() {
    const sections = document.querySelectorAll('.policy-section');

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // We don't unobserve here so we can use the same observer logic for TOC if we wanted, 
                    // but keeping it simple for now as per fade-in requirements.
                }
            });
        },
        {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px',
        }
    );

    sections.forEach((section) => observer.observe(section));
}

// --- Table of Contents active state tracking ---
function setupTOC() {
    const tocLinks = document.querySelectorAll('.toc-link');
    const sections = document.querySelectorAll('.policy-section');

    if (!tocLinks.length || !sections.length) return;

    // Use IntersectionObserver for accurate TOC tracking
    const observerOptions = {
        root: null,
        rootMargin: '-15% 0px -75% 0px', // Triggers when section is in the top-ish area
        threshold: 0
    };

    const tocObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const activeId = entry.target.getAttribute('id');
                
                tocLinks.forEach(link => {
                    const isActive = link.getAttribute('data-section') === activeId;
                    link.classList.toggle('active', isActive);
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => tocObserver.observe(section));

    // Smooth scroll for TOC links
    tocLinks.forEach((link) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-section');
            const target = document.getElementById(targetId);
            if (target) {
                const offset = 90;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });
}
