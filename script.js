document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Scroll Reveal
    const revealElements = document.querySelectorAll('.scroll-reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => revealObserver.observe(el));

    // 4. Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // 2. Custom Cursor Movement
    const cursor = document.getElementById('cursor');
    const cursorBlur = document.createElement('div');
    cursorBlur.id = 'cursor-blur';
    document.body.appendChild(cursorBlur);

    document.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        
        // Main cursor
        cursor.style.left = `${clientX}px`;
        cursor.style.top = `${clientY}px`;
        
        // Large blur effect (slow follow)
        cursorBlur.style.left = `${clientX}px`;
        cursorBlur.style.top = `${clientY}px`;
        cursorBlur.style.transform = `translate(-50%, -50%)`;
    });

    // 3. Navbar Theme & Scroll State
    const navbar = document.getElementById('navbar');
    const hero = document.getElementById('hero');
    
    function updateNavbar() {
        const scrollY = window.scrollY;
        
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', updateNavbar);
    updateNavbar(); // Initial check

    // CSS for background dots and interactive cursor effects
    const style = document.createElement('style');
    style.innerHTML = `
        #cursor-blur {
            position: fixed;
            width: 300px;
            height: 300px;
            background: radial-gradient(circle, var(--primary-dim) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            z-index: -1;
            transition: all 0.3s ease-out;
            opacity: 0.2;
        }

        /* Cursor Scaling on Hovers */
        .btn:hover ~ #cursor, .nav-link:hover ~ #cursor, .logo-link:hover ~ #cursor, .service-card:hover ~ #cursor, .problem-card:hover ~ #cursor {
            transform: translate(-50%, -50%) scale(2.5);
            background-color: #fff;
            mix-blend-mode: normal;
        }
    `;
    document.head.appendChild(style);

    // 4. Smooth Scrolling for all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 7. Video Modal Logic
    const videoModal = document.getElementById('videoModal');
    const modalVideo = document.getElementById('modalVideo');
    const modalSource = document.getElementById('modalSource');
    const closeModalBtn = document.getElementById('closeModal');
    const videoCards = document.querySelectorAll('.video-card');

    function openModal(videoSrc) {
        modalSource.src = videoSrc;
        modalVideo.load();
        videoModal.classList.add('active');
        modalVideo.play();
    }

    function closeModal() {
        videoModal.classList.remove('active');
        modalVideo.pause();
        modalVideo.currentTime = 0;
        modalSource.src = "";
    }

    videoCards.forEach(card => {
        card.addEventListener('click', () => {
            const videoElem = card.querySelector('video');
            const sourceElem = videoElem.querySelector('source');
            if (sourceElem) {
                openModal(sourceElem.src);
            }
        });
    });

    closeModalBtn.addEventListener('click', closeModal);
    
    // Auto-close when finished
    modalVideo.onended = () => {
        closeModal();
    };

    // Close on background click
    videoModal.addEventListener('click', (e) => {
        if (e.target === videoModal) {
            closeModal();
        }
    });

    // Handle Escape key for modal
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
});
