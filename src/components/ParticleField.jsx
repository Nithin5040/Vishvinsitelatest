import { useEffect, useRef } from 'react';

/**
 * ParticleField — Canvas-based animated particle network.
 * Renders floating dots connected by lines when close — creates a "neural network" effect.
 */
export default function ParticleField({
  count = 80,
  color = '0, 242, 255',
  speed = 0.35,
  lineDistance = 130,
  style = {},
}) {
  // Disabled — blue particle dots removed per user request
  return null;
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let W, H;
    let particles = [];
    let isVisible = true; // Optimization: only animate when in viewport

    const resize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };

    const init = () => {
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
        r: Math.random() * 1.8 + 0.8,
        opacity: Math.random() * 0.5 + 0.2,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      // Update + draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${p.opacity})`;
        ctx.fill();
      }

      // Draw connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < lineDistance) {
            const alpha = (1 - dist / lineDistance) * 0.25;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(${color}, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      if (isVisible) {
        animId = requestAnimationFrame(draw);
      }
    };

    const io = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible) {
        // Restart animation if it comes back into view
        cancelAnimationFrame(animId);
        animId = requestAnimationFrame(draw);
      }
    }, { threshold: 0 });
    io.observe(canvas);

    const ro = new ResizeObserver(() => {
      resize();
      init();
    });
    ro.observe(canvas);

    resize();
    init();
    draw();

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      io.disconnect();
    };
  }, [count, color, speed, lineDistance]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
        ...style,
      }}
    />
  );
}
