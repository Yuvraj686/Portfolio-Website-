document.addEventListener('DOMContentLoaded', function () {

    // ════════════════════════════════════════════════════════
    //  DARK MODE TOGGLE
    // ════════════════════════════════════════════════════════
    const htmlEl       = document.documentElement;
    const themeToggle  = document.getElementById('theme-toggle');
    const themeIcon    = document.getElementById('theme-icon');
    const statsImg     = document.getElementById('github-stats-img');

    function applyTheme(theme) {
        htmlEl.setAttribute('data-theme', theme);
        if (theme === 'dark') {
            themeIcon.className = 'fa fa-sun-o';
            if (statsImg) statsImg.src = statsImg.dataset.darkSrc;
        } else {
            themeIcon.className = 'fa fa-moon-o';
            if (statsImg) statsImg.src = statsImg.dataset.lightSrc;
        }
    }

    const savedTheme = localStorage.getItem('portfolio-theme') || 'light';
    applyTheme(savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', function () {
            const next = htmlEl.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            localStorage.setItem('portfolio-theme', next);
            applyTheme(next);
        });
    }

    // ════════════════════════════════════════════════════════
    //  SMOOTH SCROLL — NAV LINKS
    // ════════════════════════════════════════════════════════
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(function (link) {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (!href || !href.startsWith('#')) return;
            e.preventDefault();

            const target = document.getElementById(href.substring(1));
            if (target) {
                const offset = 65;
                const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top: top, behavior: 'smooth' });
            }
        });
    });

    // ════════════════════════════════════════════════════════
    //  SCROLL-REVEAL  (IntersectionObserver)
    // ════════════════════════════════════════════════════════
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
        // Immediately reveal all — accessibility
        document.querySelectorAll('.reveal').forEach(function (el) {
            el.classList.add('visible');
        });
    } else {
        const revealObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

        document.querySelectorAll('.reveal').forEach(function (el) {
            revealObserver.observe(el);
        });
    }

    // ════════════════════════════════════════════════════════
    //  CONTACT FORM  (Formspree via fetch — no page reload)
    // ════════════════════════════════════════════════════════
    const contactForm = document.getElementById('contact-form');
    const formFeedback = document.getElementById('form-feedback');
    const sendBtn = document.getElementById('send-btn');

    if (contactForm) {
        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            // Reset feedback
            formFeedback.textContent = '';
            formFeedback.className = 'form-feedback';

            // Button loading state
            sendBtn.disabled = true;
            sendBtn.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Sending…';

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: new FormData(contactForm),
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    formFeedback.textContent = '✓ Message sent! I\'ll get back to you soon.';
                    formFeedback.className = 'form-feedback success';
                    contactForm.reset();
                } else {
                    const data = await response.json().catch(() => ({}));
                    const msg = (data.errors || []).map(function (err) { return err.message; }).join(', ');
                    throw new Error(msg || 'Submission failed');
                }
            } catch (err) {
                formFeedback.textContent = '✗ Something went wrong. Please email me directly at yuvigarg6806@gmail.com';
                formFeedback.className = 'form-feedback error';
            } finally {
                sendBtn.disabled = false;
                sendBtn.innerHTML = '<i class="fa fa-paper-plane"></i> Send Message';
            }
        });
    }

    // ════════════════════════════════════════════════════════
    //  PROJECT DETAIL MODAL
    // ════════════════════════════════════════════════════════
    const modal       = document.getElementById('project-modal');
    const modalClose  = document.getElementById('modal-close');
    const modalTitle  = document.getElementById('modal-title');
    const modalDesc   = document.getElementById('modal-description');
    const modalStruct = document.getElementById('modal-structure');
    const modalTech   = document.getElementById('modal-tech');
    const modalLink   = document.getElementById('modal-link');

    function openModal(card) {
        const name        = card.dataset.name        || '';
        const description = card.dataset.description || '';
        const structure   = card.dataset.structure   || '';
        const techRaw     = card.dataset.tech        || '';
        const link        = card.dataset.link        || '#';

        modalTitle.textContent  = name;
        modalDesc.textContent   = description;
        modalStruct.textContent = structure;
        modalLink.href          = link;

        modalTech.innerHTML = '';
        techRaw.split(',').forEach(function (tech) {
            tech = tech.trim();
            if (!tech) return;
            const span = document.createElement('span');
            span.className   = 'tech-badge';
            span.textContent = tech;
            modalTech.appendChild(span);
        });

        modal.removeAttribute('hidden');
        document.body.style.overflow = 'hidden';
        modalClose.focus();
    }

    function closeModal() {
        modal.classList.add('modal-closing');
        setTimeout(function () {
            modal.setAttribute('hidden', '');
            modal.classList.remove('modal-closing');
            document.body.style.overflow = '';
        }, 210);
    }

    document.querySelectorAll('.project-card').forEach(function (card) {
        card.addEventListener('click', function () { openModal(card); });
        card.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(card); }
        });
    });

    if (modalClose) { modalClose.addEventListener('click', closeModal); }

    modal.addEventListener('click', function (e) {
        if (e.target === modal) { closeModal(); }
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && !modal.hasAttribute('hidden')) { closeModal(); }
    });
});
