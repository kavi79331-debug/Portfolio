import React, { useRef, useEffect } from 'react';

export default function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationFrameId;
    let width = 0;
    let height = 0;

    const particles = [];
    const burstParticles = [];
    const mouse = { x: null, y: null, radius: 140 };

    const colors = ['#6366f1', '#818cf8', '#06b6d4', '#38bdf8', '#a855f7', '#c084fc', '#34d399'];
    const lineColor = '99, 102, 241';

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);

      // Re-populate particles proportionally to viewport size
      const targetCount = Math.min(Math.floor((width * height) / 12000) + 35, 110);
      particles.length = 0;

      for (let i = 0; i < targetCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.75,
          vy: (Math.random() - 0.5) * 0.75,
          baseRadius: Math.random() * 2 + 1.2,
          radius: Math.random() * 2 + 1.2,
          color: colors[Math.floor(Math.random() * colors.length)],
          pulseAngle: Math.random() * Math.PI * 2,
          pulseSpeed: Math.random() * 0.02 + 0.01
        });
      }
    };

    resize();
    window.addEventListener('resize', resize);

    // Global Mouse & Touch Handlers
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    const handleWindowClick = (e) => {
      const clickX = e.clientX;
      const clickY = e.clientY;
      const burstCount = 20;

      for (let i = 0; i < burstCount; i++) {
        const angle = (Math.PI * 2 * i) / burstCount + (Math.random() - 0.5);
        const speed = Math.random() * 3.5 + 1.8;
        burstParticles.push({
          x: clickX,
          y: clickY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius: Math.random() * 2.5 + 1.5,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 1,
          decay: Math.random() * 0.025 + 0.015
        });
      }
    };

    const handleTouchMove = (e) => {
      if (e.touches[0]) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('click', handleWindowClick, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleMouseLeave);

    // Animation Render Loop
    let lastTime = performance.now();

    const render = (time) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      // 1. Constellation Mesh Lines between particles
      const maxDistance = 110;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * 0.22;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(${lineColor}, ${alpha})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      // 2. Cursor Connections & Interactive Gravitational Pull
      if (mouse.x !== null && mouse.y !== null) {
        for (let i = 0; i < particles.length; i++) {
          const dx = mouse.x - particles[i].x;
          const dy = mouse.y - particles[i].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius) {
            const alpha = (1 - dist / mouse.radius) * 0.55;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(${lineColor}, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();

            // Gentle magnetic attraction
            const force = (1 - dist / mouse.radius) * 0.3;
            particles[i].vx += (dx / dist) * force * 0.1;
            particles[i].vy += (dy / dist) * force * 0.1;
          }
        }

        // Subtle glowing cursor ring
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 6, 0, Math.PI * 2);
        ctx.fillStyle = '#38bdf8';
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // 3. Regular Particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.pulseAngle += p.pulseSpeed;
        p.radius = p.baseRadius + Math.sin(p.pulseAngle) * 0.5;

        p.vx *= 0.99;
        p.vy *= 0.99;

        if (Math.abs(p.vx) < 0.15) p.vx += (Math.random() - 0.5) * 0.08;
        if (Math.abs(p.vy) < 0.15) p.vy += (Math.random() - 0.5) * 0.08;

        p.x += p.vx * (dt * 60);
        p.y += p.vy * (dt * 60);

        if (p.x < 0) { p.x = 0; p.vx = -p.vx; }
        if (p.x > width) { p.x = width; p.vx = -p.vx; }
        if (p.y < 0) { p.y = 0; p.vy = -p.vy; }
        if (p.y > height) { p.y = height; p.vy = -p.vy; }

        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.5, p.radius), 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // 4. Click / Tap Burst Particles
      for (let i = burstParticles.length - 1; i >= 0; i--) {
        const b = burstParticles[i];
        b.x += b.vx * (dt * 60);
        b.y += b.vy * (dt * 60);
        b.vx *= 0.95;
        b.vy *= 0.95;
        b.alpha -= b.decay;

        if (b.alpha <= 0) {
          burstParticles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, b.alpha);
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fillStyle = b.color;
        ctx.shadowColor = b.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('click', handleWindowClick);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseLeave);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="global-particle-canvas" aria-hidden="true" />;
}
