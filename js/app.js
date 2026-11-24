const SECTION_IDS = ['about', 'experience', 'projects', 'education', 'publications', 'skills'];
const DEFAULT_TITLE = document.title;
const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

class Router {
    constructor() {
        this.typewriterRun = 0;

        this.initTheme();
        this.initScrollObserver();
        this.initNavigation();
        this.renderDockLinks();
        this.renderFooter();

        window.addEventListener('hashchange', () => this.handleRoute());
        this.handleRoute();
    }

    /* ---------- Theme ---------- */
    initTheme() {
        // The inline script in <head> has already applied the saved/system theme.
        const theme = document.documentElement.getAttribute('data-theme') || 'light';
        this.updateThemeToggle(theme);

        const toggleBtn = document.getElementById('theme-toggle');
        if (!toggleBtn) return;
        toggleBtn.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme');
            const next = current === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', next);
            localStorage.setItem('theme', next);
            this.updateThemeToggle(next);
        });
    }

    updateThemeToggle(theme) {
        const toggleBtn = document.getElementById('theme-toggle');
        if (!toggleBtn) return;
        const isDark = theme === 'dark';
        toggleBtn.querySelector('i').className = isDark ? 'fas fa-sun' : 'fas fa-moon';
        toggleBtn.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
    }

    /* ---------- Scroll reveal ---------- */
    initScrollObserver() {
        if (prefersReducedMotion() || !('IntersectionObserver' in window)) return;
        document.documentElement.classList.add('has-reveal');
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    this.observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    }

    observeElements() {
        if (!this.observer) return;
        document.querySelectorAll('.reveal:not(.active)').forEach(el => this.observer.observe(el));
    }

    /* ---------- Routing ---------- */
    handleRoute() {
        const hash = window.location.hash.slice(1);

        if (hash.startsWith('project/')) {
            this.renderProjectDetail(hash.split('/')[1]);
        } else {
            const isSection = SECTION_IDS.includes(hash);
            if (!document.getElementById('hero')) {
                this.renderHome();
                if (!isSection) window.scrollTo(0, 0);
            }
            document.title = DEFAULT_TITLE;
            if (isSection) {
                requestAnimationFrame(() => {
                    const section = document.getElementById(hash);
                    if (section) section.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
                });
            }
        }

        this.observeElements();
    }

    /* ---------- Navigation ---------- */
    initNavigation() {
        const toggle = document.querySelector('.mobile-toggle');
        const nav = document.querySelector('.nav-links');
        if (!toggle || !nav) return;

        const setOpen = (open) => {
            nav.classList.toggle('active', open);
            toggle.setAttribute('aria-expanded', String(open));
            toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
            toggle.querySelector('i').className = open ? 'fas fa-xmark' : 'fas fa-bars';
        };

        toggle.addEventListener('click', () => setOpen(!nav.classList.contains('active')));
        nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setOpen(false)));
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && nav.classList.contains('active')) {
                setOpen(false);
                toggle.focus();
            }
        });
    }

    renderDockLinks() {
        const dock = document.getElementById('dock-social-links');
        if (!dock) return;
        const { linkedin, github, medium, email } = window.portfolioData.hero.social;
        const ext = 'target="_blank" rel="noopener noreferrer"';
        dock.innerHTML = `
            <a href="${linkedin}" ${ext} class="dock-link" aria-label="LinkedIn"><i class="fab fa-linkedin" aria-hidden="true"></i></a>
            <a href="${github}" ${ext} class="dock-link" aria-label="GitHub"><i class="fab fa-github" aria-hidden="true"></i></a>
            <a href="${medium}" ${ext} class="dock-link" aria-label="Medium"><i class="fab fa-medium" aria-hidden="true"></i></a>
            <a href="${email}" class="dock-link" aria-label="Email"><i class="fas fa-envelope" aria-hidden="true"></i></a>
        `;
    }

    renderFooter() {
        const yearSpan = document.getElementById('year');
        if (yearSpan) yearSpan.textContent = new Date().getFullYear();
    }

    /* ---------- Home ---------- */
    renderHome() {
        const app = document.getElementById('app');
        app.innerHTML = `
            <section id="hero" class="hero-section">
                <div class="container hero-content"></div>
            </section>

            <section id="about" class="section-padding">
                <div class="container">
                    <h2 class="section-title reveal">About</h2>
                    <div class="about-content reveal"></div>
                </div>
            </section>

            <section id="experience" class="section-padding">
                <div class="container">
                    <h2 class="section-title reveal">Experience</h2>
                    <div class="experience-grid"></div>
                </div>
            </section>

            <section id="projects" class="section-padding">
                <div class="container">
                    <h2 class="section-title reveal">Projects</h2>
                    <div class="projects-list"></div>
                </div>
            </section>

            <section id="education" class="section-padding bg-light">
                <div class="container">
                    <h2 class="section-title reveal">Education</h2>
                    <div class="education-grid"></div>
                </div>
            </section>

            <section id="publications" class="section-padding">
                <div class="container">
                    <h2 class="section-title reveal">Publications</h2>
                    <div class="publications-list"></div>
                </div>
            </section>

            <section id="skills" class="section-padding bg-light">
                <div class="container">
                    <h2 class="section-title reveal">Skills</h2>
                    <div class="skills-container"></div>
                </div>
            </section>
        `;

        this.renderHero();
        this.renderAbout();
        this.renderExperience();
        this.renderProjectsList();
        this.renderEducation();
        this.renderPublications();
        this.renderSkills();
    }

    renderHero() {
        const container = document.querySelector('.hero-content');
        if (!container) return;
        const { name, title, tagline, resumeUrl } = window.portfolioData.hero;

        container.innerHTML = `
            <div class="hero-text">
                <p class="greeting hero-animate hero-delay-1">Hey <span aria-hidden="true">👋</span> I am</p>
                <h1 class="hero-animate hero-delay-2">${name}</h1>
                <p class="subtitle hero-animate hero-delay-3">${title}</p>
                <p class="tagline hero-animate hero-delay-4">${tagline}</p>
                <p class="connect-line hero-animate hero-delay-5">Let's connect
                    <span class="typewriter-wrapper" aria-hidden="true"><span id="typewriter-text"></span><span class="typewriter-cursor">|</span></span>
                </p>
                <div class="cta-buttons hero-animate hero-delay-5">
                    <a href="#projects" class="btn btn-primary">View projects</a>
                    <a href="${resumeUrl}" class="btn btn-outline" target="_blank" rel="noopener">Resume <span class="visually-hidden">(PDF)</span></a>
                </div>
            </div>
            <canvas class="hero-art hero-animate hero-delay-3" aria-hidden="true"></canvas>
        `;

        this.startTypewriter();
        this.mountHeroArt(container.querySelector('.hero-art'));
    }

    mountHeroArt(canvas) {
        this.destroyHeroArt();
        if (canvas && window.FlowFieldArt) this.heroArt = new window.FlowFieldArt(canvas);
    }

    destroyHeroArt() {
        if (this.heroArt) this.heroArt.destroy();
        this.heroArt = null;
    }

    startTypewriter() {
        const phrases = ["via LinkedIn", "over a coffee?", "on a walk!", "about Home Servers", "about F1"];
        const el = document.getElementById('typewriter-text');
        if (!el) return;

        if (prefersReducedMotion()) {
            el.textContent = phrases[0];
            el.parentElement.querySelector('.typewriter-cursor')?.remove();
            return;
        }

        // Cancel any loop left over from a previous render.
        const run = ++this.typewriterRun;
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        const tick = () => {
            if (run !== this.typewriterRun || !el.isConnected) return;
            const current = phrases[phraseIndex];
            charIndex += isDeleting ? -1 : 1;
            el.textContent = current.slice(0, charIndex);

            if (!isDeleting && charIndex === current.length) {
                isDeleting = true;
                setTimeout(tick, 1800);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                setTimeout(tick, 400);
            } else {
                setTimeout(tick, isDeleting ? 45 : 80);
            }
        };
        tick();
    }

    renderAbout() {
        const container = document.querySelector('.about-content');
        if (!container) return;
        container.innerHTML = `<p>${window.portfolioData.hero.description}</p>`;
    }

    renderExperience() {
        const container = document.querySelector('.experience-grid');
        if (!container) return;
        container.innerHTML = window.portfolioData.experience.map(exp => `
            <article class="experience-item reveal">
                <header class="exp-main-header">
                    <h3>${exp.role}</h3>
                    <span class="exp-company">${exp.company}</span>
                    <span class="exp-period">${exp.period}</span>
                </header>
                <p class="exp-desc">${exp.description}</p>
                <ul class="exp-highlights">
                    ${exp.highlights.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </article>
        `).join('');
    }

    renderProjectsList() {
        const container = document.querySelector('.projects-list');
        if (!container) return;
        container.innerHTML = window.portfolioData.projects.map(project => {
            const media = project.media;
            let thumb = '';
            if (media?.type === 'video') {
                thumb = `<video class="card-video" src="${media.src}" poster="${media.poster || ''}" muted loop playsinline preload="none" aria-hidden="true"></video>`;
            } else if (media) {
                thumb = `<img src="${media.src}" alt="" loading="lazy" decoding="async">`;
            }
            return `
            <a href="#project/${project.id}" class="project-list-item reveal">
                <div class="project-list-content">
                    <h3>${project.title}</h3>
                    <span class="project-subtitle">${project.subtitle}</span>
                    <p>${project.summary}</p>
                    <div class="tech-stack-mini">
                        ${project.technologies.slice(0, 3).map(t => `<span>${t}</span>`).join('')}
                        ${project.technologies.length > 3 ? `<span>+${project.technologies.length - 3}</span>` : ''}
                    </div>
                </div>
                ${thumb ? `<div class="project-list-image">${thumb}</div>` : ''}
            </a>`;
        }).join('');

        this.initCardVideos(container);
    }

    // Card videos play (muted, looping) only while on screen; reduced-motion visitors see the poster.
    initCardVideos(container) {
        const videos = container.querySelectorAll('.card-video');
        if (!videos.length || prefersReducedMotion() || !('IntersectionObserver' in window)) return;

        if (!this.videoObserver) {
            this.videoObserver = new IntersectionObserver(entries => {
                entries.forEach(({ target, isIntersecting }) => {
                    if (isIntersecting) {
                        target.play().catch(() => { /* autoplay blocked: poster stays */ });
                    } else {
                        target.pause();
                    }
                });
            }, { threshold: 0.25 });
        }
        this.videoObserver.disconnect(); // drop videos from a previous render
        videos.forEach(video => {
            video.muted = true;
            this.videoObserver.observe(video);
        });
    }

    renderEducation() {
        const container = document.querySelector('.education-grid');
        if (!container) return;
        container.innerHTML = window.portfolioData.education.map(edu => `
            <div class="edu-card reveal">
                <div class="edu-info">
                    <h3>${edu.degree}</h3>
                    <div class="edu-school">${edu.school}, ${edu.location}</div>
                </div>
                <div class="edu-gpa">GPA ${edu.gpa}</div>
            </div>
        `).join('');
    }

    renderPublications() {
        const container = document.querySelector('.publications-list');
        if (!container) return;
        container.innerHTML = window.portfolioData.publications.map(pub => `
            <article class="pub-card reveal">
                <h3>${pub.title}</h3>
                <div class="pub-meta">
                    <span class="pub-journal">${pub.journal}</span>
                    <span class="pub-status status-${pub.status.toLowerCase().replace(/ /g, '-')}">${pub.status}</span>
                    ${pub.doi ? `<a class="pub-doi" href="${pub.doi}" target="_blank" rel="noopener noreferrer">Read paper <i class="fas fa-arrow-up-right-from-square" aria-hidden="true"></i></a>` : ''}
                </div>
            </article>
        `).join('');
    }

    renderSkills() {
        const container = document.querySelector('.skills-container');
        if (!container) return;
        const groups = [
            ['Languages', 'languages'],
            ['Frameworks & libraries', 'frameworks'],
            ['Tools & platforms', 'tools'],
            ['Specializations', 'specializations']
        ];
        const skills = window.portfolioData.skills;
        container.innerHTML = groups
            .filter(([, key]) => skills[key]?.length)
            .map(([label, key]) => `
                <div class="skill-group reveal">
                    <h3>${label}</h3>
                    <ul class="skill-list">
                        ${skills[key].map(s => `<li>${s.name}</li>`).join('')}
                    </ul>
                </div>
            `).join('');
    }

    /* ---------- Project detail ---------- */
    renderMedia(media, { showcase }) {
        if (!media) return '';
        if (media.type === 'video') {
            const motion = prefersReducedMotion() ? 'controls' : 'autoplay loop muted playsinline';
            return `<video src="${media.src}" poster="${media.poster || ''}" ${motion} preload="metadata" aria-label="${media.alt}"></video>`;
        }
        return `<img src="${media.src}" alt="${media.alt}" ${showcase ? '' : 'loading="lazy"'} decoding="async">`;
    }

    renderProjectDetail(id) {
        const project = window.portfolioData.projects.find(p => p.id === id);
        if (!project) {
            window.location.hash = '';
            return;
        }

        this.destroyHeroArt();
        document.title = `${project.title} | George V Jose`;
        const app = document.getElementById('app');
        app.innerHTML = `
            <article class="project-detail-view">
                <div class="container">
                    <a href="#projects" class="back-link"><i class="fas fa-arrow-left" aria-hidden="true"></i> All projects</a>

                    <header class="project-header">
                        <h1 class="project-title-large">${project.title}</h1>
                        <p class="project-subtitle-large">${project.subtitle}</p>
                        <ul class="project-meta" aria-label="Technologies">
                            ${project.technologies.map(tech => `<li class="tech-tag">${tech}</li>`).join('')}
                        </ul>
                    </header>

                    ${project.media ? `<figure class="project-showcase-image">${this.renderMedia(project.media, { showcase: true })}</figure>` : ''}

                    <div class="project-body">
                        <div class="project-content">${project.description}</div>

                        ${(project.metrics?.length || project.links?.length) ? `
                        <aside class="project-sidebar">
                            ${project.metrics?.length ? `
                                <div class="metrics-box">
                                    <h2>Key metrics</h2>
                                    <dl>
                                        ${project.metrics.map(m => `
                                            <div class="metric">
                                                <dt class="metric-label">${m.label}</dt>
                                                <dd class="metric-value">${m.value}</dd>
                                            </div>
                                        `).join('')}
                                    </dl>
                                </div>
                            ` : ''}

                            ${project.links?.length ? `
                                <div class="links-box">
                                    <h2>Links</h2>
                                    ${project.links.map(link => `
                                        <a href="${link.url}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-block">${link.label} <i class="fas fa-arrow-up-right-from-square" aria-hidden="true"></i></a>
                                    `).join('')}
                                </div>
                            ` : ''}
                        </aside>` : ''}
                    </div>
                </div>
            </article>
        `;

        window.scrollTo(0, 0);
        app.focus({ preventScroll: true });
    }
}

new Router();
