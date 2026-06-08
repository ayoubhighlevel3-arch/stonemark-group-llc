document.addEventListener('DOMContentLoaded', () => {
    // ── Mobile Navigation Toggle ──
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('open');
            navLinks.classList.toggle('open');
            
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', !isExpanded);
        });
    }

    // ── Sticky Header Shadow ──
    const header = document.querySelector('.site-header');
    
    if (header) {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial check
    }

    // ── FAQ Accordions ──
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close others (optional)
                faqItems.forEach(faq => {
                    faq.classList.remove('active');
                    faq.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
                });

                if (!isActive) {
                    item.classList.add('active');
                    question.setAttribute('aria-expanded', 'true');
                }
            });
        }
    });

    // ── Smooth Scroll for anchor links ──
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (navLinks && navLinks.classList.contains('open')) {
                    navToggle.classList.remove('open');
                    navLinks.classList.remove('open');
                    navToggle.setAttribute('aria-expanded', 'false');
                }
            }
        });
    });

    // ── Cookie Consent Banner ──
    const COOKIE_KEY = 'stonemark_cookie_consent';
    if (!localStorage.getItem(COOKIE_KEY)) {
        const banner = document.createElement('div');
        banner.className = 'cookie-banner';
        banner.setAttribute('role', 'region');
        banner.setAttribute('aria-label', 'Cookie consent');
        banner.innerHTML = `
            <p class="cookie-banner-text">
                We use cookies to understand how visitors use our site. By clicking "Accept," you consent to our use of analytics cookies. Declining will not affect your access to any of our services.
                <a href="cookie-policy.html">Cookie Policy</a> &nbsp;&middot;&nbsp; <a href="privacy-policy.html">Privacy Policy</a>
            </p>
            <div class="cookie-banner-actions">
                <button class="cookie-btn-decline" id="cookie-decline">Decline</button>
                <button class="cookie-btn-accept" id="cookie-accept">Accept</button>
            </div>
        `;
        document.body.appendChild(banner);
        requestAnimationFrame(() => requestAnimationFrame(() => banner.classList.add('visible')));

        banner.addEventListener('click', function(e) {
            if (e.target.id === 'cookie-accept' || e.target.id === 'cookie-decline') {
                localStorage.setItem(COOKIE_KEY, e.target.id === 'cookie-accept' ? 'accepted' : 'declined');
                banner.classList.remove('visible');
                setTimeout(() => banner.remove(), 400);
            }
        });
    }
});
