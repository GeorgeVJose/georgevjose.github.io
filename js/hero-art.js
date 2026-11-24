/**
 * Hero "flow field": dotted wave lines that drift left to right and slowly undulate.
 * Drawn on a <canvas>; colours come from the theme's CSS variables.
 * Pauses when off-screen or when the tab is hidden, and draws a single still
 * frame for visitors who prefer reduced motion.
 */
class FlowFieldArt {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.t = 0;
        this.last = null;
        this.raf = null;
        this.visible = true;
        this.motion = window.matchMedia('(prefers-reduced-motion: reduce)');
        this.colors = this.readColors();

        this.loop = this.loop.bind(this);
        this.onResize = () => { this.resize(); this.drawIfStill(); };
        this.onVisibility = () => this.update();
        this.onMotionChange = () => this.update();

        this.resize();
        window.addEventListener('resize', this.onResize);
        document.addEventListener('visibilitychange', this.onVisibility);
        this.motion.addEventListener?.('change', this.onMotionChange);

        // Re-read colours when the theme changes.
        this.themeObserver = new MutationObserver(() => {
            this.colors = this.readColors();
            this.drawIfStill();
        });
        this.themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

        // Only animate while the hero is on screen.
        this.io = new IntersectionObserver(([entry]) => {
            this.visible = entry.isIntersecting;
            this.update();
        });
        this.io.observe(canvas);

        this.update();
    }

    readColors() {
        const css = getComputedStyle(document.documentElement);
        return {
            main: css.getPropertyValue('--art-main').trim() || '#60a5fa',
            accent: css.getPropertyValue('--art-accent').trim() || '#bfdbfe'
        };
    }

    resize() {
        const rect = this.canvas.getBoundingClientRect();
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        this.w = rect.width;
        this.h = rect.height;
        this.canvas.width = Math.round(rect.width * dpr);
        this.canvas.height = Math.round(rect.height * dpr);
        this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    get animating() {
        return !this.motion.matches && this.visible && !document.hidden;
    }

    update() {
        if (this.animating) {
            if (this.raf === null) {
                this.last = null;
                this.raf = requestAnimationFrame(this.loop);
            }
        } else {
            if (this.raf !== null) cancelAnimationFrame(this.raf);
            this.raf = null;
            this.draw();
        }
    }

    drawIfStill() {
        if (this.raf === null) this.draw();
    }

    loop(now) {
        if (this.last !== null) this.t += Math.min(0.05, (now - this.last) / 1000);
        this.last = now;
        this.draw();
        this.raf = requestAnimationFrame(this.loop);
    }

    draw() {
        const { ctx, w: W, h: H, t } = this;
        if (!W || !H) return;
        ctx.clearRect(0, 0, W, H);

        // The pattern is designed in a 400 x 440 space and scaled to the canvas.
        const sx = W / 400;
        const sy = H / 440;
        const lines = 11;
        const gap = 9;

        for (let i = 0; i < lines; i++) {
            const base = 50 + i * 34;
            const spread = 0.55 + 0.45 * Math.cos(((i - 5) / 5) * (Math.PI / 2));
            const drift = (t * (20 + (i % 3) * 4)) % gap;
            ctx.fillStyle = i % 3 === 1 ? this.colors.accent : this.colors.main;

            for (let x = drift; x <= 400; x += gap) {
                const u = x / 400;
                const y = base
                    + spread * (34 * Math.sin(x / 70 + i * 0.5 - t * 0.45) + 16 * Math.sin(x / 33 + i * 1.1 + t * 0.7))
                    - (base - 220) * 0.45 * Math.sin(Math.PI * u);
                const fade = Math.sin(Math.PI * u);
                ctx.globalAlpha = 0.12 + 0.78 * fade;
                ctx.beginPath();
                ctx.arc(x * sx, y * sy, 1 + 1.2 * fade, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        ctx.globalAlpha = 1;
    }

    destroy() {
        if (this.raf !== null) cancelAnimationFrame(this.raf);
        this.raf = null;
        window.removeEventListener('resize', this.onResize);
        document.removeEventListener('visibilitychange', this.onVisibility);
        this.motion.removeEventListener?.('change', this.onMotionChange);
        this.themeObserver.disconnect();
        this.io.disconnect();
    }
}

window.FlowFieldArt = FlowFieldArt;
