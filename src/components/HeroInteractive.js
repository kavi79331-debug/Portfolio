import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Sparkles, RefreshCw, Palette, Zap, Cpu, Atom } from 'lucide-react';
import { personalData } from '../data/portfolioData';

// Color themes for the constellation
const COLOR_THEMES = {
  cyber: {
    name: 'Cyber Indigo',
    bgGradient: 'radial-gradient(circle at center, rgba(99, 102, 241, 0.15) 0%, rgba(6, 182, 212, 0.08) 50%, transparent 75%)',
    particleColors: ['#6366f1', '#818cf8', '#06b6d4', '#38bdf8', '#c084fc', '#a855f7'],
    lineColor: '99, 102, 241',
    cursorColor: '#38bdf8',
    glowColor: 'rgba(99, 102, 241, 0.4)'
  },
  aurora: {
    name: 'Purple Aurora',
    bgGradient: 'radial-gradient(circle at center, rgba(168, 85, 247, 0.18) 0%, rgba(236, 72, 153, 0.1) 50%, transparent 75%)',
    particleColors: ['#a855f7', '#c084fc', '#ec4899', '#f43f5e', '#818cf8'],
    lineColor: '168, 85, 247',
    cursorColor: '#ec4899',
    glowColor: 'rgba(236, 72, 153, 0.4)'
  },
  emerald: {
    name: 'Emerald Matrix',
    bgGradient: 'radial-gradient(circle at center, rgba(16, 185, 129, 0.15) 0%, rgba(6, 182, 212, 0.1) 50%, transparent 75%)',
    particleColors: ['#10b981', '#34d399', '#06b6d4', '#2dd4bf', '#a7f3d0'],
    lineColor: '16, 185, 129',
    cursorColor: '#34d399',
    glowColor: 'rgba(16, 185, 129, 0.4)'
  }
};

// Interactive Tech Nodes pinned in the constellation
const TECH_NODES = [
  { id: 'react', name: 'React', icon: '⚛️', role: 'Frontend Architecture', color: '#61dafb' },
  { id: 'js', name: 'JavaScript', icon: '🟨', role: 'ES6+ & Async Core', color: '#f7df1e' },
  { id: 'node', name: 'Node.js', icon: '🟢', role: 'Backend & APIs', color: '#68a063' },
  { id: 'python', name: 'Python', icon: '🐍', role: 'AI & Data Scripts', color: '#4b8bbe' },
  { id: 'sql', name: 'SQL', icon: '🗄️', role: 'Database Design', color: '#00758f' },
  { id: 'vite', name: 'Vite', icon: '⚡', role: 'Fast Modern Tooling', color: '#bd34fe' }
];

export default function HeroInteractive() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  const [activeThemeKey, setActiveThemeKey] = useState('cyber');
  const [activeTech, setActiveTech] = useState(null);
  const [clickCount, setClickCount] = useState(0);
  const [particleSpeedMode, setParticleSpeedMode] = useState('normal'); // 'slow', 'normal', 'fast'
  const [showHint, setShowHint] = useState(true);

  const theme = COLOR_THEMES[activeThemeKey];

  // Particle & animation references to avoid state re-render loop
  const stateRef = useRef({
    particles: [],
    burstParticles: [],
    mouse: { x: null, y: null, radius: 120, isDown: false },
    animationFrameId: null,
    width: 0,
    height: 0,
    theme: theme,
    speedMultiplier: 1.0
  });

  // Keep stateRef synced with reactive props
  useEffect(() => {
    stateRef.current.theme = COLOR_THEMES[activeThemeKey];
  }, [activeThemeKey]);

  useEffect(() => {
    stateRef.current.speedMultiplier = particleSpeedMode === 'slow' ? 0.4 : particleSpeedMode === 'fast' ? 2.0 : 1.0;
  }, [particleSpeedMode]);

  // Burst helper
  const createBurst = useCallback((x, y, count = 18) => {
    const currentTheme = stateRef.current.theme;
    const colors = currentTheme.particleColors;
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5);
      const speed = Math.random() * 3.5 + 2;
      stateRef.current.burstParticles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: Math.random() * 3 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1,
        life: 1,
        decay: Math.random() * 0.02 + 0.015
      });
    }
  }, []);

  // Main Canvas Setup & Animation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const handleResize = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      const w = rect.width;
      const h = rect.height;

      stateRef.current.width = w;
      stateRef.current.height = h;

      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.scale(dpr, dpr);

      // Initialize regular constellation particles
      const particleCount = Math.floor((w * h) / 7500) + 24;
      const particles = [];
      const currentTheme = stateRef.current.theme;

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 1.2,
          vy: (Math.random() - 0.5) * 1.2,
          baseRadius: Math.random() * 2.2 + 1.2,
          radius: Math.random() * 2.2 + 1.2,
          color: currentTheme.particleColors[Math.floor(Math.random() * currentTheme.particleColors.length)],
          pulseAngle: Math.random() * Math.PI * 2,
          pulseSpeed: Math.random() * 0.03 + 0.015
        });
      }

      stateRef.current.particles = particles;
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let lastTime = performance.now();

    const render = (time) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      const w = stateRef.current.width;
      const h = stateRef.current.height;
      const curTheme = stateRef.current.theme;
      const speed = stateRef.current.speedMultiplier;
      const mouse = stateRef.current.mouse;
      const particles = stateRef.current.particles;
      const bursts = stateRef.current.burstParticles;

      ctx.clearRect(0, 0, w, h);

      // 1. Draw connecting constellation lines between particles
      const maxDistance = 95;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * 0.35;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(${curTheme.lineColor}, ${alpha})`;
            ctx.lineWidth = 0.85;
            ctx.stroke();
          }
        }
      }

      // 2. Connect particles to interactive mouse position
      if (mouse.x !== null && mouse.y !== null) {
        for (let i = 0; i < particles.length; i++) {
          const dx = mouse.x - particles[i].x;
          const dy = mouse.y - particles[i].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius) {
            const alpha = (1 - dist / mouse.radius) * 0.75;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(${curTheme.lineColor}, ${alpha})`;
            ctx.lineWidth = 1.2;
            ctx.stroke();

            // Subtle magnetic attraction
            const force = (1 - dist / mouse.radius) * 0.45;
            particles[i].vx += (dx / dist) * force * 0.15;
            particles[i].vy += (dy / dist) * force * 0.15;
          }
        }

        // Draw glowing mouse ring
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 8, 0, Math.PI * 2);
        ctx.fillStyle = curTheme.cursorColor;
        ctx.shadowColor = curTheme.cursorColor;
        ctx.shadowBlur = 15;
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, mouse.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${curTheme.lineColor}, 0.12)`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // 3. Update and draw regular particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Pulse size
        p.pulseAngle += p.pulseSpeed;
        p.radius = p.baseRadius + Math.sin(p.pulseAngle) * 0.6;

        // Velocity damping & movement
        p.vx *= 0.99;
        p.vy *= 0.99;

        // Base drift
        if (Math.abs(p.vx) < 0.2) p.vx += (Math.random() - 0.5) * 0.1;
        if (Math.abs(p.vy) < 0.2) p.vy += (Math.random() - 0.5) * 0.1;

        p.x += p.vx * speed * (dt * 60);
        p.y += p.vy * speed * (dt * 60);

        // Screen edge bounce with soft wrap
        if (p.x < 0) { p.x = 0; p.vx = -p.vx; }
        if (p.x > w) { p.x = w; p.vx = -p.vx; }
        if (p.y < 0) { p.y = 0; p.vy = -p.vy; }
        if (p.y > h) { p.y = h; p.vy = -p.vy; }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.5, p.radius), 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // 4. Update and draw burst/click shockwave particles
      for (let i = bursts.length - 1; i >= 0; i--) {
        const b = bursts[i];
        b.x += b.vx * (dt * 60);
        b.y += b.vy * (dt * 60);
        b.vx *= 0.96;
        b.vy *= 0.96;
        b.alpha -= b.decay;

        if (b.alpha <= 0) {
          bursts.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, b.alpha);
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fillStyle = b.color;
        ctx.shadowColor = b.color;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.restore();
      }

      stateRef.current.animationFrameId = requestAnimationFrame(render);
    };

    stateRef.current.animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (stateRef.current.animationFrameId) {
        cancelAnimationFrame(stateRef.current.animationFrameId);
      }
    };
  }, []);

  // Mouse & Touch interaction handlers
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    stateRef.current.mouse.x = e.clientX - rect.left;
    stateRef.current.mouse.y = e.clientY - rect.top;
    if (showHint) setShowHint(false);
  };

  const handleMouseLeave = () => {
    stateRef.current.mouse.x = null;
    stateRef.current.mouse.y = null;
  };

  const handleCanvasClick = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    createBurst(clickX, clickY, 22);
    setClickCount((prev) => prev + 1);
    if (showHint) setShowHint(false);
  };

  const handleTouchMove = (e) => {
    if (!containerRef.current || !e.touches[0]) return;
    const rect = containerRef.current.getBoundingClientRect();
    stateRef.current.mouse.x = e.touches[0].clientX - rect.left;
    stateRef.current.mouse.y = e.touches[0].clientY - rect.top;
    if (showHint) setShowHint(false);
  };

  const handleTouchStart = (e) => {
    if (!containerRef.current || !e.touches[0]) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const y = e.touches[0].clientY - rect.top;
    stateRef.current.mouse.x = x;
    stateRef.current.mouse.y = y;
    createBurst(x, y, 16);
    setClickCount((prev) => prev + 1);
    if (showHint) setShowHint(false);
  };

  const handleResetConstellation = () => {
    const w = stateRef.current.width;
    const h = stateRef.current.height;
    createBurst(w / 2, h / 2, 35);
    createBurst(w / 3, h / 3, 20);
    createBurst((w * 2) / 3, (h * 2) / 3, 20);
  };

  const cycleTheme = () => {
    const keys = Object.keys(COLOR_THEMES);
    const currentIndex = keys.indexOf(activeThemeKey);
    const nextKey = keys[(currentIndex + 1) % keys.length];
    setActiveThemeKey(nextKey);
  };

  const cycleSpeed = () => {
    setParticleSpeedMode((prev) => (prev === 'normal' ? 'fast' : prev === 'fast' ? 'slow' : 'normal'));
  };

  return (
    <div className="constellation-canvas-wrapper" ref={containerRef}>
      {/* Dynamic Ambient Background Glow */}
      <div 
        className="constellation-ambient-aura"
        style={{ background: theme.bgGradient }}
      ></div>

      {/* Main Interactive HTML5 Canvas */}
      <canvas
        ref={canvasRef}
        className="constellation-canvas"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleCanvasClick}
        onTouchMove={handleTouchMove}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleMouseLeave}
      />

      {/* Interactive Floating Tech Nodes Overlay */}
      <div className="constellation-tech-orbit-layer">
        {TECH_NODES.map((tech, idx) => (
          <button
            key={tech.id}
            type="button"
            className={`constellation-tech-node node-pos-${idx} ${activeTech?.id === tech.id ? 'active' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              setActiveTech(activeTech?.id === tech.id ? null : tech);
              const rect = e.currentTarget.getBoundingClientRect();
              const containerRect = containerRef.current.getBoundingClientRect();
              createBurst(
                rect.left - containerRect.left + rect.width / 2,
                rect.top - containerRect.top + rect.height / 2,
                14
              );
            }}
            title={`Explore ${tech.name}`}
          >
            <span className="node-icon">{tech.icon}</span>
            <span className="node-label">{tech.name}</span>
            <span className="node-glow-ring" style={{ borderColor: tech.color }}></span>
          </button>
        ))}
      </div>

      {/* Interactive Active Tech Card Popup */}
      {activeTech && (
        <div className="constellation-node-card">
          <div className="node-card-header">
            <span className="node-card-icon">{activeTech.icon}</span>
            <div>
              <h4 className="node-card-title">{activeTech.name}</h4>
              <span className="node-card-role">{activeTech.role}</span>
            </div>
            <button
              type="button"
              className="node-card-close"
              onClick={() => setActiveTech(null)}
              aria-label="Close"
            >
              &times;
            </button>
          </div>
          <p className="node-card-desc">
            Core building block powering responsive architectures & interactive user experiences.
          </p>
        </div>
      )}

      {/* Interactive Interactive Controls Bar */}
      <div className="constellation-toolbar">
        <div className="toolbar-left">
          <button
            type="button"
            className="constellation-tool-btn"
            onClick={cycleTheme}
            title="Switch color palette"
          >
            <Palette size={13} />
            <span>{theme.name}</span>
          </button>

          <button
            type="button"
            className="constellation-tool-btn"
            onClick={cycleSpeed}
            title="Toggle particle speed"
          >
            <Zap size={13} />
            <span>Speed: {particleSpeedMode.toUpperCase()}</span>
          </button>
        </div>

        <div className="toolbar-right">
          <button
            type="button"
            className="constellation-tool-btn burst-btn"
            onClick={handleResetConstellation}
            title="Trigger particle supernova"
          >
            <RefreshCw size={13} />
            <span>Burst</span>
          </button>
        </div>
      </div>

      {/* Interactive Instruction Pill / Helper */}
      {showHint && (
        <div className="constellation-hint-pill">
          <Sparkles size={13} className="text-accent" />
          <span>Move cursor or click anywhere to warp constellation</span>
        </div>
      )}
    </div>
  );
}
