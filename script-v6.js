document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================================
    // 1. Hero Section: Living Product Story Animation (V10 Final)
    // ==========================================================================
    const promptTextEl = document.getElementById('hero-prompt-text');
    const storyRows = document.querySelectorAll('.story-row');
    
    let storyTimelineTimeout = null;

    const startHeroStoryLoop = () => {
        // Clear previous state
        if (promptTextEl) {
            promptTextEl.textContent = '';
            promptTextEl.style.maxWidth = '0';
        }
        storyRows.forEach(row => row.classList.remove('active'));

        const promptInputText = "I am opening a boutique resort";
        let charIdx = 0;

        // Step 1: Type the prompt input
        const typePrompt = () => {
            if (charIdx < promptInputText.length) {
                if (promptTextEl) {
                    promptTextEl.style.maxWidth = '100%';
                    promptTextEl.textContent += promptInputText.charAt(charIdx);
                }
                charIdx++;
                storyTimelineTimeout = setTimeout(typePrompt, 50);
            } else {
                if (promptTextEl) promptTextEl.style.borderRightColor = 'transparent';
                storyTimelineTimeout = setTimeout(showStrategy, 600);
            }
        };

        // Step 2: Show Brand Strategy
        const showStrategy = () => {
            const row = document.getElementById('sr-strategy');
            if (row) row.classList.add('active');
            storyTimelineTimeout = setTimeout(showLogo, 1000);
        };

        // Step 3: Show Logo
        const showLogo = () => {
            const row = document.getElementById('sr-logo');
            if (row) row.classList.add('active');
            storyTimelineTimeout = setTimeout(showIdentity, 1000);
        };

        // Step 4: Show Visual Identity
        const showIdentity = () => {
            const row = document.getElementById('sr-identity');
            if (row) row.classList.add('active');
            storyTimelineTimeout = setTimeout(showPhotography, 1000);
        };

        // Step 5: Show Photography
        const showPhotography = () => {
            const row = document.getElementById('sr-photography');
            if (row) row.classList.add('active');
            storyTimelineTimeout = setTimeout(showWebsite, 1000);
        };

        // Step 6: Show Website
        const showWebsite = () => {
            const row = document.getElementById('sr-website');
            if (row) row.classList.add('active');
            storyTimelineTimeout = setTimeout(showOutcome, 1100);
        };

        // Step 7: Show Launch Ready Outcome Success Box
        const showOutcome = () => {
            const row = document.getElementById('sr-outcome');
            if (row) row.classList.add('active');

            // Wait 6 seconds before repeating the loop
            storyTimelineTimeout = setTimeout(startHeroStoryLoop, 6000);
        };

        typePrompt();
    };

    if (storyRows.length > 0) {
        startHeroStoryLoop();
    }

    // ==========================================================================
    // 2. Section 3: Scope Builder Selector (V10 Final)
    // ==========================================================================
    const journeyCards = document.querySelectorAll('.journey-card-v7');
    const linearRoadmapContainer = document.getElementById('journey-linear-container');

    const journeysRoadmapDetails = {
        resort: [
            { title: "Brand Strategy", desc: "Audits boutique resort trends and plans eco-wellness positioning approved by experts." },
            { title: "Identity Design", desc: "Crafts clean typographies, resort mark, and custom signage criteria guidelines." },
            { title: "Photography", desc: "Coordinated local photo shoots of villas, plates, and pool environments." },
            { title: "Brand Film", desc: "Produces a 60-second aesthetic lifestyle film matching target demographics." },
            { title: "Website", desc: "Codes custom reservation frontend pages optimized for booking conversions." },
            { title: "Launch Assets", desc: "Final designs for guest menus, room cards, key tags, and Instagram posts." },
            { title: "Ready to Welcome Guests", desc: "Outcome completed: online direct booking pipeline fully functional. ✅" }
        ],
        brand: [
            { title: "Brand Strategy", desc: "Defines values, competitive gaps, packaging compliance, and product positioning." },
            { title: "Packaging Design", desc: "Creates container labels, box layouts, and print-ready vector proofs." },
            { title: "Photography", desc: "Studio product packshots and textures captured under strict lighting guidelines." },
            { title: "Copywriting", desc: "Engaging, high-converting checkout copy and ingredient benefits text." },
            { title: "Web Storefront", desc: "Custom-developed storefront backend optimized for fast cart checkout paths." },
            { title: "Product Renders", desc: "High-resolution 3D renders of containers for social campaigns." },
            { title: "Ready for Commerce", desc: "Outcome completed: direct-to-consumer store ready to receive first customers. ✅" }
        ],
        product: [
            { title: "Product Strategy", desc: "Audits target consumer needs, materials selection, and packaging size constraints." },
            { title: "Industrial Design", desc: "Translates parameters to clean industrial sketches and structural renders." },
            { title: "Box Vector Files", desc: "Outlines print-ready box vectors and commercial paper specifications." },
            { title: "Photography", desc: "Captures product use-case details and environmental studio shots." },
            { title: "Web Pre-Order Page", desc: "Builds a landing page configured to collect customer emails and orders." },
            { title: "Product Film", desc: "Creates a 45-second motion graphics design explainer video." },
            { title: "Ready for Launch", desc: "Outcome completed: product vectors, photos, and pre-orders online. ✅" }
        ],
        cafe: [
            { title: "Brand Concept", desc: "Determines typography style guides, color tones, and local neighborhood demographics." },
            { title: "Typography Menu", desc: "Designs clean layout grids for menus, coffee tags, and sandwich boards." },
            { title: "Interior Signs", desc: "Prepares signage vector templates for storefront doors and indoor lights." },
            { title: "Food Photography", desc: "Captures plating styles, close-ups, and barista pouring scenes." },
            { title: "Cafe Landing Page", desc: "Launches local search portal displaying locations, hours, and menus." },
            { title: "Social Templates", desc: "Delivers post assets and brand frameworks for local announcement feeds." },
            { title: "Ready to Serve", desc: "Outcome completed: local maps registered, reservation tables active. ✅" }
        ],
        ecommerce: [
            { title: "Ecommerce Plan", desc: "Audits competitor activewear segments, loading speed benchmarks, and user checkouts." },
            { title: "UI Catalog Grids", desc: "Designs mobile-first catalog layouts, filters list, and cart checkout boxes." },
            { title: "Apparel Shoot", desc: "Lifestyle shoots on location and clean catalog product packshots." },
            { title: "Copywriting", desc: "Product descriptions, returns policy page, and transactional email copy." },
            { title: "Store Frontend Coded", desc: "Fully custom coded frontend with page loading speeds under 1.2 seconds." },
            { title: "Local SEO Setup", desc: "Structures local activewear keywords inside site indexing databases." },
            { title: "Ready for Orders", desc: "Outcome completed: storefront live, payment checkout connections active. ✅" }
        ],
        funding: [
            { title: "Deck Structure Strategy", desc: "Outlines LP slide logic, revenue hooks, and target investor requirements." },
            { title: "Slide Deck Design", desc: "Designs presentation slides matching high-end vector branding guidelines." },
            { title: "Financial Sheets", desc: "Builds interactive spreadsheets with detailed round modeling graphs." },
            { title: "Investor Portal Page", desc: "Codes secure portal workspace page to display deck links and details." },
            { title: "Motion Graphic Film", desc: "Produces 45-second explaining film detailing core proprietary technology." },
            { title: "Pitch Ready", desc: "Outcome completed: investor presentations, modeling files, and secure portal active. ✅" }
        ]
    };

    const renderLinearRoadmap = (key) => {
        if (!linearRoadmapContainer || !journeysRoadmapDetails[key]) return;

        linearRoadmapContainer.innerHTML = '';
        const steps = journeysRoadmapDetails[key];

        steps.forEach((step, idx) => {
            const row = document.createElement('div');
            row.className = 'linear-step-row';
            
            row.classList.add(idx === steps.length - 1 ? 'active' : 'completed');

            row.innerHTML = `
                <div class="linear-step-indicator">${idx + 1}</div>
                <div class="linear-step-details">
                    <h4>${step.title}</h4>
                    <p>${step.desc}</p>
                </div>
            `;
            linearRoadmapContainer.appendChild(row);
        });

        // Trigger cascade animation in
        const stepRows = linearRoadmapContainer.querySelectorAll('.linear-step-row');
        stepRows.forEach((row, idx) => {
            setTimeout(() => {
                row.classList.add('animate-in');
            }, idx * 70);
        });
    };

    if (journeyCards.length > 0) {
        // Initial setup
        const activeCard = document.querySelector('.journey-card-v7.active');
        if (activeCard) {
            const key = activeCard.getAttribute('data-journey');
            renderLinearRoadmap(key);
        }

        journeyCards.forEach(card => {
            card.addEventListener('click', () => {
                journeyCards.forEach(c => c.classList.remove('active'));
                card.classList.add('active');

                const key = card.getAttribute('data-journey');
                renderLinearRoadmap(key);
            });
        });
    }

    // ==========================================================================
    // 3. Section 4: How It Works horizontal timeline loop highlights (4 Steps)
    // ==========================================================================
    const timelineItems = document.querySelectorAll('.timeline-flow-item');
    let activeTimelineIdx = 0;

    const runTimelineStepper = () => {
        if (timelineItems.length === 0) return;
        timelineItems.forEach((item, idx) => {
            item.classList.toggle('active', idx === activeTimelineIdx);
        });
        activeTimelineIdx = (activeTimelineIdx + 1) % timelineItems.length;
    };

    if (timelineItems.length > 0) {
        runTimelineStepper();
        setInterval(runTimelineStepper, 2500);
    }

    // ==========================================================================
    // 4. Scroll Reveal & Navbar shrink
    // ==========================================================================
    const revealElements = document.querySelectorAll('.scroll-reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.05 });

    revealElements.forEach(el => revealObserver.observe(el));

    const navbar = document.getElementById('navbar');
    if (navbar) {
        const updateNavbar = () => {
            if (window.scrollY > 40) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        };
        window.addEventListener('scroll', updateNavbar);
        updateNavbar();
    }

    // ==========================================================================
    // 5. Mobile Navigation Toggle Drawer
    // ==========================================================================
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('nav-menu');
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        document.querySelectorAll('.nav-link, .nav-links button').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // ==========================================================================
    // 6. Waitlist Modal handlers
    // ==========================================================================
    const modal = document.getElementById('waitlist-modal');
    const modalOverlay = modal ? modal.querySelector('.modal-overlay') : null;
    const modalClose = modal ? modal.querySelector('.modal-close') : null;
    const waitlistTriggers = document.querySelectorAll('.trigger-waitlist-modal');
    const waitlistForm = document.getElementById('waitlist-form');

    const openModal = () => { if (modal) modal.classList.add('active'); };
    const closeModal = () => { if (modal) modal.classList.remove('active'); };

    waitlistTriggers.forEach(trigger => { trigger.addEventListener('click', openModal); });
    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modalOverlay) modalOverlay.addEventListener('click', closeModal);
    window.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

    if (waitlistForm) {
        waitlistForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('waitlist-name').value;
            const email = document.getElementById('waitlist-email').value;

            const contentContainer = modal.querySelector('.modal-content');
            contentContainer.innerHTML = `
                <button class="modal-close" aria-label="Close modal">&times;</button>
                <div style="text-align: center; padding: 2rem 0;">
                    <h3 class="modal-title" style="margin-bottom: 1rem;">Welcome Aboard, ${name}!</h3>
                    <p style="color: var(--text-secondary); margin-bottom: 2rem;">You've successfully secured early access for ADDUS using <strong>${email}</strong>.</p>
                    <button class="btn btn-secondary trigger-close-feedback" style="width: 100%;">Close</button>
                </div>
            `;
            const closeFeedbackBtn = contentContainer.querySelector('.trigger-close-feedback');
            if (closeFeedbackBtn) closeFeedbackBtn.addEventListener('click', closeModal);
            const modalCloseNew = contentContainer.querySelector('.modal-close');
            if (modalCloseNew) modalCloseNew.addEventListener('click', closeModal);
        });
    }

});
