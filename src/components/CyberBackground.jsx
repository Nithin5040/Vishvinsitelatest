import { useEffect, useRef } from 'react';

export default function CyberBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let nodes = [];
    const maxNodes = 60;
    const mouse = { x: null, y: null };

    // Update canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initNodes();
    };

    class Node {
      constructor(w, h) {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.vx = (Math.random() - 0.5) * 0.35;
        this.vy = (Math.random() - 0.5) * 0.35;
        this.radius = Math.random() * 1.8 + 1;
        
        // Ripple scanner parameters
        this.pulseRadius = 0;
        this.pulseMax = Math.random() * 40 + 35;
        this.pulseActive = Math.random() < 0.06;
        
        // Security packets logs / data strings
        const codes = [
          '[OK] SECURE', 
          '[TLS_1.3] AES_256', 
          '[PORT] 443', 
          '[IDS] RUNNING', 
          '[NOC] ONLINE', 
          'SHA-256', 
          '0110', 
          'SSL_VERIFIED', 
          'SYS_SHIELD', 
          'INTEGRITY_OK', 
          '10101', 
          'FIREWALL'
        ];
        this.text = Math.random() < 0.3 ? codes[Math.floor(Math.random() * codes.length)] : '';
        this.textOpacity = Math.random() * 0.25 + 0.08;
      }

      update(w, h) {
        this.x += this.vx;
        this.y += this.vy;

        // Soft bounce boundaries
        if (this.x < 0 || this.x > w) this.vx *= -1;
        if (this.y < 0 || this.y > h) this.vy *= -1;

        // Security ripple simulation
        if (this.pulseActive) {
          this.pulseRadius += 0.25;
          if (this.pulseRadius > this.pulseMax) {
            this.pulseRadius = 0;
            this.pulseActive = Math.random() < 0.12; 
          }
        } else if (Math.random() < 0.0008) {
          this.pulseActive = true;
          this.pulseRadius = 0;
        }
      }

      draw(ctx) {
        // Draw primary node
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(37, 99, 235, 0.3)';
        ctx.fill();

        // Draw scanner wave
        if (this.pulseActive) {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.pulseRadius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(2, 132, 199, ${(1 - this.pulseRadius / this.pulseMax) * 0.12})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }

        // Faint cybersecurity telemetry tags
        if (this.text) {
          ctx.fillStyle = `rgba(15, 23, 42, ${this.textOpacity})`;
          ctx.font = '7.5px "JetBrains Mono", monospace';
          ctx.fillText(this.text, this.x + 8, this.y + 2);
        }
      }
    }

    const initNodes = () => {
      nodes = [];
      const w = canvas.width;
      const h = canvas.height;
      for (let i = 0; i < maxNodes; i++) {
        nodes.push(new Node(w, h));
      }
    };

    // Animation Loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width;
      const h = canvas.height;

      // Draw connection mesh lines between close points
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dist = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
          if (dist < 130) {
            const alpha = (1 - dist / 130) * 0.06;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(37, 99, 235, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Draw mouse link spotlight connections
      if (mouse.x !== null && mouse.y !== null) {
        for (let i = 0; i < nodes.length; i++) {
          const dist = Math.hypot(nodes[i].x - mouse.x, nodes[i].y - mouse.y);
          if (dist < 160) {
            const alpha = (1 - dist / 160) * 0.12;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(2, 132, 199, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      // Update and draw each individual node
      nodes.forEach(node => {
        node.update(w, h);
        node.draw(ctx);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    // Track mouse coordinates
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('pointermove', handleMouseMove);
    document.body.addEventListener('pointerleave', handleMouseLeave);

    resizeCanvas();
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('pointermove', handleMouseMove);
      document.body.removeEventListener('pointerleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1
      }}
    />
  );
}
