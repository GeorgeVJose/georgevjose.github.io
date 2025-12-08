// import { portfolioData } from './data.js';

class Router {
    constructor() {
        this.routes = {
            'home': () => this.renderHome(),
            'project': (id) => this.renderProjectDetail(id)
        };
        
        // Initialize Theme
        this.initTheme();

        // Initialize Scroll Observer
        this.initScrollObserver();
        
        window.addEventListener('hashchange', () => this.handleRoute());
        window.addEventListener('load', () => this.handleRoute());
    }

    // ... (keep initTheme, updateThemeIcon, initSpotlight, initScrollObserver, observeElements as is) ...
    initTheme() {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        document.documentElement.setAttribute('data-theme', savedTheme);
        this.updateThemeIcon(savedTheme);

        const toggleBtn = document.getElementById('theme-toggle');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => {
                const currentTheme = document.documentElement.getAttribute('data-theme');
                const newTheme = currentTheme === 'light' ? 'dark' : 'light';
                
                document.documentElement.setAttribute('data-theme', newTheme);
                localStorage.setItem('theme', newTheme);
                this.updateThemeIcon(newTheme);
            });
        }
    }

    updateThemeIcon(theme) {
        const toggleBtn = document.getElementById('theme-toggle');
        if (!toggleBtn) return;
        const icon = toggleBtn.querySelector('i');
        if (theme === 'dark') {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    }

    initSpotlight() {
        const spotlight = document.querySelector('.background-spotlight');
        if (!spotlight) return;

        document.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth) * 100;
            const y = (e.clientY / window.innerHeight) * 100;
            
            spotlight.style.setProperty('--mouse-x', `${x}%`);
            spotlight.style.setProperty('--mouse-y', `${y}%`);
        });
    }

    initScrollObserver() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, {
            root: null,
            threshold: 0.1, 
            rootMargin: '0px 0px -50px 0px'
        });
    }

    observeElements() {
        if (!this.observer) return;
        const elements = document.querySelectorAll('.reveal');
        elements.forEach(el => this.observer.observe(el));
    }

    handleRoute() {
        const hash = window.location.hash.slice(1);
        
        // If hash is empty or one of the section IDs, render home and scroll
        if (!hash || ['about', 'experience', 'projects', 'skills', 'education', 'publications'].includes(hash)) {
            // Only re-render if we are not already on the home view (to prevent scroll jumping if just navigating sections)
            // But since we have a simple app structure, we can check if #hero exists.
            if (!document.getElementById('hero')) {
                this.renderHome();
            }
            
            // Scroll to section if hash exists
            if (hash) {
                setTimeout(() => {
                    const section = document.getElementById(hash);
                    if (section) {
                        section.scrollIntoView({ behavior: 'smooth' });
                    }
                }, 100);
            }
        } else if (hash.startsWith('project/')) {
            const [_, id] = hash.split('/');
            this.renderProjectDetail(id);
            window.scrollTo(0, 0);
        } else {
            // Default to home for unknown routes
            this.renderHome();
            window.scrollTo(0, 0);
        }
        
        this.updateActiveNavLink();
        
        // Re-inject social links into dock
        this.renderDockLinks();

        // Trigger observations
        setTimeout(() => this.observeElements(), 100);
    }

    updateActiveNavLink() {
        // Optional: Add active class to nav links based on scroll position or hash
    }

    renderDockLinks() {
        const dockContainer = document.getElementById('dock-social-links');
        if (dockContainer && dockContainer.children.length === 0) {
             const { linkedin, github, medium, email } = window.portfolioData.hero.social;
             dockContainer.innerHTML = `
                <a href="${linkedin}" target="_blank" class="dock-link" aria-label="LinkedIn"><i class="fab fa-linkedin"></i></a>
                <a href="${github}" target="_blank" class="dock-link" aria-label="GitHub"><i class="fab fa-github"></i></a>
                <a href="${medium}" target="_blank" class="dock-link" aria-label="Medium"><i class="fab fa-medium"></i></a>
                <a href="${email}" class="dock-link" aria-label="Email"><i class="fas fa-envelope"></i></a>
             `;
        }
    }

    renderHome() {
        const app = document.getElementById('app');
        app.innerHTML = `
            <section id="hero" class="hero-section">
                <div class="container hero-content"></div>
            </section>

            <section id="about" class="section-padding">
                <div class="container">
                    <h2 class="section-title reveal">About Me</h2>
                    <div class="about-content reveal delay-100"></div>
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
                    <p class="text-center mb-4 reveal delay-100" style="color: var(--text-light)">Hover over a skill for current proficiency</p>
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
        this.renderFooter(); // Updates year
        this.initNavigation();
        this.renderDockLinks();
    }

    renderProjectDetail(id) {
        const project = window.portfolioData.projects.find(p => p.id === id);
        if (!project) {
            window.location.hash = ''; // Go home
            return;
        }

        const app = document.getElementById('app');
        app.innerHTML = `
            <article class="project-detail-view">
                <div class="container">
                    <a href="#" class="back-link hover-underline"><i class="fas fa-arrow-left"></i> Back to Home</a>
                    
                    <header class="project-header reveal">
                        <h1 class="project-title-large">${project.title}</h1>
                        <p class="project-subtitle-large">${project.subtitle}</p>
                        <div class="project-meta">
                            ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                        </div>
                    </header>

                    ${project.media ? `
                        <div class="project-showcase-image reveal delay-200">
                            <img src="${project.media.src}" alt="${project.media.alt}">
                        </div>
                    ` : ''}

                    <div class="project-body">
                        <div class="project-content reveal delay-300">
                            ${project.description}
                        </div>
                        
                        <aside class="project-sidebar reveal delay-400">
                            ${project.metrics && project.metrics.length > 0 ? `
                                <div class="metrics-box">
                                    <h3>Key Metrics</h3>
                                    <ul>
                                        ${project.metrics.map(m => `
                                            <li>
                                                <span class="metric-value">${m.value}</span>
                                                <span class="metric-label">${m.label}</span>
                                            </li>
                                        `).join('')}
                                    </ul>
                                </div>
                            ` : ''}
                            
                            ${project.links && project.links.length > 0 ? `
                                <div class="links-box">
                                    <h3>Links</h3>
                                    ${project.links.map(link => `
                                        <a href="${link.url}" target="_blank" class="btn btn-outline w-100 mb-2">${link.label} <i class="fas fa-external-link-alt"></i></a>
                                    `).join('')}
                                </div>
                            ` : ''}
                        </aside>
                    </div>
                </div>
            </article>
        `;
        
        this.renderFooter();
        this.renderDockLinks();
    }

    // --- Renderers (keep as is) ---
    renderHero() {
        const container = document.querySelector('.hero-content');
        if (!container) return;
        const { name, title, tagline, description, resumeUrl, image } = window.portfolioData.hero;

        container.innerHTML = `
            <div class="hero-text">
                <span class="greeting hero-animate hero-delay-1">Hey 👋 I am</span>
                <h1 class="hero-animate hero-delay-2">${name}</h1>
                <div class="subtitle hero-animate hero-delay-3">${title}</div>
                <p class="tagline hero-animate hero-delay-4">${tagline}</p>
                <p class="description hero-animate hero-delay-5">${description}</p>
                <div class="cta-buttons hero-animate hero-delay-5">
                    <a href="#projects" class="btn btn-primary">View Projects</a>
                    <a href="${resumeUrl}" class="btn btn-outline" target="_blank">Resume</a>
                </div>
            </div>
            <div class="hero-image-container hero-animate hero-delay-2">
                <img src="${image}" alt="${name}" class="profile-img">
            </div>
        `;
    }

    renderAbout() {
        const container = document.querySelector('.about-content');
        if (!container) return;
        container.innerHTML = `<p>${window.portfolioData.hero.description}</p>`;
    }

    renderExperience() {
        const container = document.querySelector('.experience-grid');
        if (!container) return;
        container.innerHTML = window.portfolioData.experience.map((exp, index) => `
            <div class="experience-item reveal delay-${Math.min((index + 1) * 100, 500)}">
                <div class="exp-main-header">
                    <h3>${exp.role}</h3>
                    <span class="exp-company">${exp.company}</span>
                    <span class="exp-period">${exp.period}</span>
                </div>
                <p class="exp-desc">${exp.description}</p>
                <ul class="exp-highlights">
                    ${exp.highlights.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>
        `).join('');
    }

    renderSkills() {
        const container = document.querySelector('.skills-container');
        if (!container) return;
        const allSkills = [
            ...window.portfolioData.skills.languages,
            ...window.portfolioData.skills.frameworks,
            ...window.portfolioData.skills.tools,
            ...window.portfolioData.skills.specializations
        ];
        container.innerHTML = allSkills.map((skill, index) => `
            <div class="skill-card reveal delay-${Math.min((index % 5) * 100, 500)}" data-proficiency="${skill.proficiency}%">
                <div class="skill-name">${skill.name}</div>
                <div class="skill-overlay" style="height: ${skill.proficiency}%">
                    <span>${skill.proficiency}%</span>
                </div>
            </div>
        `).join('');
    }

    renderProjectsList() {
        const container = document.querySelector('.projects-list');
        if (!container) return;
        container.innerHTML = window.portfolioData.projects.map((project, index) => `
            <a href="#project/${project.id}" class="project-list-item reveal delay-${Math.min((index + 1) * 100, 500)}">
                <div class="project-list-content">
                    <h3>${project.title}</h3>
                    <span class="project-subtitle">${project.subtitle}</span>
                    <p>${project.summary}</p>
                    <div class="tech-stack-mini">
                        ${project.technologies.slice(0, 3).map(t => `<span>${t}</span>`).join('')}
                        ${project.technologies.length > 3 ? `<span>+${project.technologies.length - 3}</span>` : ''}
                    </div>
                </div>
                ${project.media ? `
                    <div class="project-list-image">
                        <img src="${project.media.src}" alt="${project.title}">
                    </div>
                ` : '<div class="project-list-placeholder"></div>'}
            </a>
        `).join('');
    }

    renderEducation() {
        const container = document.querySelector('.education-grid');
        if (!container) return;
        container.innerHTML = window.portfolioData.education.map((edu, index) => `
            <div class="edu-card reveal delay-${Math.min((index + 1) * 100, 500)}">
                <div class="edu-info">
                    <h3>${edu.degree}</h3>
                    <div class="edu-school">${edu.school}, ${edu.location}</div>
                </div>
                <div class="edu-gpa">GPA: ${edu.gpa}</div>
            </div>
        `).join('');
    }

    renderPublications() {
        const container = document.querySelector('.publications-list');
        if (!container) return;
        container.innerHTML = window.portfolioData.publications.map((pub, index) => `
            <div class="pub-card reveal delay-${Math.min((index + 1) * 100, 500)}">
                <h4>${pub.title}</h4>
                <div class="pub-meta">
                    <span class="pub-journal">${pub.journal}</span>
                    <span class="pub-status status-${pub.status.toLowerCase().replace(/ /g, '-')}">${pub.status}</span>
                </div>
            </div>
        `).join('');
    }

    renderFooter() {
        const yearSpan = document.getElementById('year');
        if(yearSpan) yearSpan.textContent = new Date().getFullYear();
    }

    initNavigation() {
        const toggle = document.querySelector('.mobile-toggle');
        const nav = document.querySelector('.nav-links');
        
        if (toggle && nav) {
            toggle.addEventListener('click', () => {
                nav.classList.toggle('active');
            });
        }
        
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                if(nav) nav.classList.remove('active');
            });
        });
    }
}

new Router();
