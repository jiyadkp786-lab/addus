document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Custom Cursor ---
    const cursor = document.getElementById('cursor');
    if (cursor) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
        });

        // Hover expansions
        const hoverTargets = document.querySelectorAll('a, button, .workflow-step-btn, .glass-card, .creative-tag');
        hoverTargets.forEach(target => {
            target.addEventListener('mouseenter', () => {
                cursor.style.width = '30px';
                cursor.style.height = '30px';
                cursor.style.background = 'rgba(214, 255, 1, 0.3)';
                cursor.style.borderColor = 'var(--primary)';
            });
            target.addEventListener('mouseleave', () => {
                cursor.style.width = '10px';
                cursor.style.height = '10px';
                cursor.style.background = '#fff';
                cursor.style.borderColor = 'transparent';
            });
        });
    }

    // --- 2. Canvas Particle Background ---
    const canvas = document.getElementById('particle-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        const maxParticles = 60;
        const connectionDist = 120;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.4;
                this.vy = (Math.random() - 0.5) * 0.4;
                this.radius = Math.random() * 2 + 1;
            }
            update() {
                this.x += this.vx;
                this.y += this.vy;

                // Bounce walls
                if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
                if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(168, 85, 247, 0.4)';
                ctx.fill();
            }
        }

        // Init
        for (let i = 0; i < maxParticles; i++) {
            particles.push(new Particle());
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Update & Draw particles
            particles.forEach(p => {
                p.update();
                p.draw();
            });

            // Draw connecting lines
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < connectionDist) {
                        const alpha = (1 - dist / connectionDist) * 0.15;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(6, 182, 212, ${alpha})`;
                        ctx.lineWidth = 0.8;
                        ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(animate);
        };
        animate();
    }

    // --- 3. Typing effect in Hero ---
    const typingText = document.getElementById('typing-text');
    if (typingText) {
        const phrases = [
            "Creative Reality Out.",
            "AI Orchestration for Creativity.",
            "From Goals to Outcomes.",
            "Creativity, Powered by Intelligence."
        ];
        let phraseIndex = 0;
        let charIndex = phrases[0].length;
        let isDeleting = false;
        let typeSpeed = 80;

        const typeEffect = () => {
            const currentPhrase = phrases[phraseIndex];
            
            if (isDeleting) {
                charIndex--;
                typeSpeed = 40;
            } else {
                charIndex++;
                typeSpeed = 80;
            }

            typingText.innerHTML = currentPhrase.substring(0, charIndex);

            if (!isDeleting && charIndex === currentPhrase.length) {
                // Pause at completion
                isDeleting = true;
                typeSpeed = 2000; // wait 2s
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typeSpeed = 500; // pause before typing next
            }

            setTimeout(typeEffect, typeSpeed);
        };
        
        // Start typing loop after hero animations finish
        setTimeout(typeEffect, 1000);
    }

    // --- 4. Interactive Step-by-Step Workflow ---
    const stepButtons = document.querySelectorAll('.workflow-step-btn');
    const displayContents = document.querySelectorAll('.display-card-content');
    
    if (stepButtons && displayContents) {
        stepButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetStep = btn.getAttribute('data-step');
                
                // Toggle active button
                stepButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Toggle active content
                displayContents.forEach(content => {
                    content.classList.remove('active');
                    if (content.getAttribute('data-step-content') === targetStep) {
                        content.classList.add('active');
                    }
                });
            });
        });
    }

    // --- 5. Scroll Reveal ---
    const revealElements = document.querySelectorAll('.scroll-reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // If it's a market card, trigger progress bar animation
                if (entry.target.classList.contains('market-card')) {
                    entry.target.classList.add('active');
                }
            }
        });
    }, { threshold: 0.15 });

    revealElements.forEach(el => revealObserver.observe(el));

    // --- 6. Sticky Navbar Scroll Effect ---
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

    // --- 7. Mobile Navigation Toggle ---
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('nav-menu');
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu on clicking links
        document.querySelectorAll('.nav-link, .nav-links button').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // --- 8. Waitlist Modal Trigger Logic ---
    const modal = document.getElementById('waitlist-modal');
    const modalOverlay = modal ? modal.querySelector('.modal-overlay') : null;
    const modalClose = modal ? modal.querySelector('.modal-close') : null;
    const waitlistTriggers = document.querySelectorAll('.trigger-waitlist-modal');
    const waitlistForm = document.getElementById('waitlist-form');

    const openModal = () => {
        if (modal) modal.classList.add('active');
    };

    const closeModal = () => {
        if (modal) modal.classList.remove('active');
    };

    waitlistTriggers.forEach(trigger => {
        trigger.addEventListener('click', openModal);
    });

    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modalOverlay) modalOverlay.addEventListener('click', closeModal);

    // Escape closes modal
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });

    // Form Submission Handling
    if (waitlistForm) {
        waitlistForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('waitlist-name').value;
            const email = document.getElementById('waitlist-email').value;
            const role = document.getElementById('waitlist-role').value;

            // Form feedback UI change
            const contentContainer = modal.querySelector('.modal-content');
            contentContainer.innerHTML = `
                <button class="modal-close" aria-label="Close modal">&times;</button>
                <div style="text-align: center; padding: 2rem 0;">
                    <i data-lucide="check-circle" style="width: 64px; height: 64px; color: var(--accent-blue); margin-bottom: 1.5rem;"></i>
                    <h3 class="modal-title" style="margin-bottom: 1rem;">Welcome Aboard, ${name}!</h3>
                    <p style="color: var(--text-secondary); margin-bottom: 2rem;">You've successfully secured early access for <strong>ADDUS OS</strong> using <strong>${email}</strong>.</p>
                    <button class="btn btn-secondary trigger-close-feedback" style="width: 100%;">Close</button>
                </div>
            `;
            
            // Reinitialize Lucide icons in modal
            lucide.createIcons();
            
            // Add close handler to new button
            const closeFeedbackBtn = contentContainer.querySelector('.trigger-close-feedback');
            if (closeFeedbackBtn) {
                closeFeedbackBtn.addEventListener('click', closeModal);
            }
            const modalCloseNew = contentContainer.querySelector('.modal-close');
            if (modalCloseNew) {
                modalCloseNew.addEventListener('click', closeModal);
            }
        });
    }

    // --- 9. Pitch Deck Mock Download Trigger ---
    const pitchDeckTriggers = document.querySelectorAll('.trigger-pitchdeck');
    pitchDeckTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            alert("Pitch Deck request received! Sending investor overview package (PDF) to your download tray.");
        });
    });

    // --- 10. AI Orchestration Flow Loop (Pure-SVG version) ---
    const orchNodes   = document.querySelectorAll('.orch-node[data-step-node]');
    const orchLines   = document.querySelectorAll('.orch-line');
    const orchDescs   = document.querySelectorAll('.orch-desc');

    let activeOrchStep = 0;
    let orchInterval   = null;

    // Map each step to: which node ID to highlight, which line ID to activate, which desc key to show
    const stepsMap = [
        { node: 'node-goal',      line: 'fl-goal-os',     desc: 'goal'      },
        { node: 'node-os',        line: 'fl-os-ai',       desc: 'os'        },
        { node: 'node-ai',        line: 'fl-ai-exec',     desc: 'ai'        },
        { node: 'node-execution', line: 'fl-exec-cre',    desc: 'execution' },
        { node: 'node-creators',  line: 'fl-cre-growth',  desc: 'creators'  },
        { node: 'node-growth',    line: 'fl-growth-goal', desc: 'growth'    },
    ];

    function setOrchStep(index) {
        activeOrchStep = index;
        const current = stepsMap[index];

        // Clear all
        orchNodes.forEach(n => n.classList.remove('active'));
        orchLines.forEach(l => l.classList.remove('active-line'));
        orchDescs.forEach(d => d.classList.remove('active'));

        // Activate node
        const activeNode = document.getElementById(current.node);
        if (activeNode) activeNode.classList.add('active');

        // Activate line
        const activeLine = document.getElementById(current.line);
        if (activeLine) activeLine.classList.add('active-line');

        // Activate description
        const activeDesc = document.querySelector(`.orch-desc[data-desc-for="${current.desc}"]`);
        if (activeDesc) activeDesc.classList.add('active');
    }

    function startOrchCycle() {
        if (orchInterval) clearInterval(orchInterval);
        orchInterval = setInterval(() => {
            setOrchStep((activeOrchStep + 1) % stepsMap.length);
        }, 3000);
    }

    function pauseOrchCycle() {
        if (orchInterval) clearInterval(orchInterval);
    }

    // Hover interaction
    orchNodes.forEach(node => {
        node.addEventListener('mouseenter', () => {
            pauseOrchCycle();
            const stepKey = node.getAttribute('data-step-node');
            const idx = stepsMap.findIndex(s => s.desc === stepKey);
            if (idx !== -1) setOrchStep(idx);
        });
        node.addEventListener('mouseleave', startOrchCycle);
    });

    // Kick off
    if (orchNodes.length > 0) {
        setOrchStep(0);
        startOrchCycle();
    }
});
