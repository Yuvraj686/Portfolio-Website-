document.addEventListener('DOMContentLoaded', function () {

    // ─── Smooth Scroll Navigation ───────────────────────────────────────────
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (!href.startsWith('#')) return;
            e.preventDefault();
            const targetId = href.substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                const headerOffset = 60;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            }
        });
    });

    // ─── Contact Form ────────────────────────────────────────────────────────
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            alert('Thank you for your message! This is a demo form.');
            contactForm.reset();
        });
    }

    // ─── Project Detail Modal ─────────────────────────────────────────────────
    const modal        = document.getElementById('project-modal');
    const modalClose   = document.getElementById('modal-close');
    const modalTitle   = document.getElementById('modal-title');
    const modalDesc    = document.getElementById('modal-description');
    const modalStruct  = document.getElementById('modal-structure');
    const modalTech    = document.getElementById('modal-tech');
    const modalLink    = document.getElementById('modal-link');

    /** Open the modal and populate it with a project card's data. */
    function openModal(card) {
        const name        = card.dataset.name        || '';
        const description = card.dataset.description || '';
        const structure   = card.dataset.structure   || '';
        const techRaw     = card.dataset.tech        || '';
        const link        = card.dataset.link        || '#';

        // Populate fields
        modalTitle.textContent  = name;
        modalDesc.textContent   = description;
        modalStruct.textContent = structure;
        modalLink.href          = link;

        // Build tech badges
        modalTech.innerHTML = '';
        techRaw.split(',').forEach(function (tech) {
            tech = tech.trim();
            if (!tech) return;
            const span = document.createElement('span');
            span.className   = 'tech-badge';
            span.textContent = tech;
            modalTech.appendChild(span);
        });

        // Show overlay
        modal.removeAttribute('hidden');
        document.body.style.overflow = 'hidden'; // prevent background scroll
        modalClose.focus();
    }

    /** Close the modal with a fade-out animation. */
    function closeModal() {
        modal.classList.add('modal-closing');
        setTimeout(function () {
            modal.setAttribute('hidden', '');
            modal.classList.remove('modal-closing');
            document.body.style.overflow = '';
        }, 200);
    }

    // Click on any project card → open modal
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(function (card) {
        card.addEventListener('click', function () {
            openModal(card);
        });

        // Keyboard accessibility: Enter or Space opens the modal
        card.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openModal(card);
            }
        });
    });

    // Close button
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    // Click outside the modal box → close
    modal.addEventListener('click', function (e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Escape key → close
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && !modal.hasAttribute('hidden')) {
            closeModal();
        }
    });
});
