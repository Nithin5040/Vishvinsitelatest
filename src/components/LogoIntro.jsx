import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

// Import 4K Ultra-Sharp Authentic Slices
import pieceTopImg from '../assets/logo-slices/piece-top-4k.png';
import pieceRightImg from '../assets/logo-slices/piece-right-4k.png';
import pieceBottomImg from '../assets/logo-slices/piece-bottom-4k.png';
import pieceLeftImg from '../assets/logo-slices/piece-left-4k.png';
import textWhiteImg from '../assets/logo-slices/text-white-4k.png';

export default function LogoIntro({ onComplete }) {
  const containerRef = useRef(null);
  const brandLockupRef = useRef(null);
  const emblemContainerRef = useRef(null);

  const topPieceRef = useRef(null);
  const rightPieceRef = useRef(null);
  const bottomPieceRef = useRef(null);
  const leftPieceRef = useRef(null);

  const shockwaveRef = useRef(null);
  const flashRef = useRef(null);
  const textWrapRef = useRef(null);
  const textImgRef = useRef(null);
  const shineRef = useRef(null);
  const canvasRef = useRef(null);

  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Starfield / Ambient Particle Canvas ──
      const canvas = canvasRef.current;
      let animFrameId;
      if (canvas) {
        const cCtx = canvas.getContext('2d');
        let w = (canvas.width = window.innerWidth);
        let h = (canvas.height = window.innerHeight);

        const onResize = () => {
          if (!canvas) return;
          w = canvas.width = window.innerWidth;
          h = canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', onResize);

        const particles = Array.from({ length: 45 }, () => ({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 1.6 + 0.6,
          alpha: Math.random() * 0.4 + 0.15,
        }));

        const drawParticles = () => {
          cCtx.clearRect(0, 0, w, h);
          particles.forEach((p) => {
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0) p.x = w;
            if (p.x > w) p.x = 0;
            if (p.y < 0) p.y = h;
            if (p.y > h) p.y = 0;

            cCtx.fillStyle = `rgba(147, 197, 253, ${p.alpha})`;
            cCtx.beginPath();
            cCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            cCtx.fill();
          });
          animFrameId = requestAnimationFrame(drawParticles);
        };
        drawParticles();
      }

      // ── Initial State for 4 Authentic Pieces (Hardware-accelerated transforms) ──
      gsap.set(topPieceRef.current, { y: -280, x: -35, rotation: -25, opacity: 0, scale: 1.35, force3D: true });
      gsap.set(bottomPieceRef.current, { y: 280, x: 35, rotation: 25, opacity: 0, scale: 1.35, force3D: true });
      gsap.set(leftPieceRef.current, { x: -280, y: 35, rotation: 25, opacity: 0, scale: 1.35, force3D: true });
      gsap.set(rightPieceRef.current, { x: 280, y: -35, rotation: -25, opacity: 0, scale: 1.35, force3D: true });

      gsap.set(shockwaveRef.current, { scale: 0.1, opacity: 0, force3D: true });
      gsap.set(flashRef.current, { scale: 0.2, opacity: 0, force3D: true });
      // Keep text 100% crisp without CSS blur filter
      gsap.set(textWrapRef.current, { opacity: 0, x: 35, force3D: true });
      gsap.set(shineRef.current, { x: '-160%', opacity: 0, force3D: true });

      // ── Master Animation Timeline ──
      const tl = gsap.timeline({
        onComplete: () => {
          handleFinish();
        }
      });

      // 1. Exact 4 Pieces Fly In and Assemble with Snap
      tl.to([topPieceRef.current, bottomPieceRef.current, leftPieceRef.current, rightPieceRef.current], {
        x: 0,
        y: 0,
        rotation: 0,
        scale: 1,
        opacity: 1,
        duration: 0.95,
        stagger: 0.03,
        ease: 'power4.out',
      }, 0.2);

      // 2. Fusion Flash & Shockwave at Center of Emblem
      tl.to(flashRef.current, {
        scale: 2.2,
        opacity: 0.95,
        duration: 0.16,
        ease: 'power2.out',
      }, 1.05)
      .to(flashRef.current, {
        scale: 3.5,
        opacity: 0,
        duration: 0.4,
        ease: 'power2.in',
      }, 1.21);

      tl.to(shockwaveRef.current, {
        scale: 2.8,
        opacity: 0.85,
        duration: 0.2,
        ease: 'power2.out',
      }, 1.08)
      .to(shockwaveRef.current, {
        scale: 5.2,
        opacity: 0,
        duration: 0.55,
        ease: 'power3.out',
      }, 1.28);

      // 3. Emblem magnetic lock spring recoil
      tl.to(emblemContainerRef.current, {
        scale: 1.08,
        duration: 0.12,
        ease: 'power1.out',
      }, 1.1)
      .to(emblemContainerRef.current, {
        scale: 1.0,
        duration: 0.4,
        ease: 'elastic.out(1.2, 0.45)',
      }, 1.22);

      // 4. Exact Authentic Wordmark & Tagline Reveal (Crisp & High-Res)
      tl.to(textWrapRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.65,
        ease: 'power3.out',
      }, 1.3);

      // 5. Specular Light Sweeps across Full Brand
      tl.to(shineRef.current, {
        opacity: 0.9,
        duration: 0.1,
      }, 1.75)
      .to(shineRef.current, {
        x: '350%',
        duration: 0.8,
        ease: 'power2.inOut',
      }, 1.75)
      .to(shineRef.current, {
        opacity: 0,
        duration: 0.2,
      }, 2.45);

      // 6. Cinematic Presentation Hold
      tl.to({}, { duration: 0.6 });
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  const handleFinish = () => {
    if (isFinished) return;
    setIsFinished(true);

    if (containerRef.current) {
      gsap.to(containerRef.current, {
        opacity: 0,
        scale: 1.03,
        duration: 0.7,
        ease: 'power2.inOut',
        onComplete: () => {
          if (onComplete) onComplete();
        },
      });
    } else {
      if (onComplete) onComplete();
    }
  };

  const handleContainerClick = () => {
    handleFinish();
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['Escape', ' ', 'Enter'].includes(e.key)) {
        handleFinish();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div
      ref={containerRef}
      onClick={handleContainerClick}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        background: 'radial-gradient(ellipse at center, #090e21 0%, #030712 70%, #01040a 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        overflow: 'hidden',
        userSelect: 'none',
        WebkitFontSmoothing: 'antialiased',
        imageRendering: '-webkit-optimize-contrast',
      }}
      title="Click or press Escape to skip"
    >
      {/* Background Starfield / Particle Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          opacity: 0.6,
          pointerEvents: 'none',
        }}
      />

      {/* Cyber Radial Ambient Core Glow */}
      <div
        style={{
          position: 'absolute',
          width: '650px',
          height: '650px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(59, 56, 255, 0.22) 0%, rgba(99, 102, 241, 0.08) 45%, transparent 70%)',
          filter: 'blur(45px)',
          pointerEvents: 'none',
        }}
      />

      {/* Main Authentic Brand Lockup */}
      <div
        ref={brandLockupRef}
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'clamp(16px, 3vw, 36px)',
          flexDirection: 'row',
          flexWrap: 'nowrap',
          maxWidth: '92vw',
          padding: '24px',
          zIndex: 2,
        }}
      >
        {/* Emblem Layer Container (150x136 proportional box) */}
        <div
          ref={emblemContainerRef}
          style={{
            position: 'relative',
            width: 'clamp(115px, 16vw, 175px)',
            aspectRatio: '150 / 136',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Shockwave expanding ring */}
          <div
            ref={shockwaveRef}
            style={{
              position: 'absolute',
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              border: '2px solid #60a5fa',
              boxShadow: '0 0 20px #38bdf8',
              pointerEvents: 'none',
            }}
          />

          {/* Center impact flare */}
          <div
            ref={flashRef}
            style={{
              position: 'absolute',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, #ffffff 20%, #3b38ff 70%, transparent 100%)',
              filter: 'blur(4px) drop-shadow(0 0 25px #ffffff)',
              pointerEvents: 'none',
            }}
          />

          {/* 1. Top Authentic Piece (4K Ultra-Sharp) */}
          <img
            ref={topPieceRef}
            src={pieceTopImg}
            alt="Vishvin Emblem Top Shard"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              pointerEvents: 'none',
              imageRendering: 'crisp-edges',
            }}
          />

          {/* 2. Right Authentic Piece (4K Ultra-Sharp) */}
          <img
            ref={rightPieceRef}
            src={pieceRightImg}
            alt="Vishvin Emblem Right Shard"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              pointerEvents: 'none',
              imageRendering: 'crisp-edges',
            }}
          />

          {/* 3. Bottom Authentic Piece (4K Ultra-Sharp) */}
          <img
            ref={bottomPieceRef}
            src={pieceBottomImg}
            alt="Vishvin Emblem Bottom Shard"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              pointerEvents: 'none',
              imageRendering: 'crisp-edges',
            }}
          />

          {/* 4. Left Authentic Piece (4K Ultra-Sharp) */}
          <img
            ref={leftPieceRef}
            src={pieceLeftImg}
            alt="Vishvin Emblem Left Shard"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              pointerEvents: 'none',
              imageRendering: 'crisp-edges',
            }}
          />
        </div>

        {/* Authentic Wordmark & Tagline Image Layer (4K Ultra-Sharp) */}
        <div
          ref={textWrapRef}
          style={{
            position: 'relative',
            width: 'clamp(185px, 28vw, 320px)',
            aspectRatio: '229 / 136',
            display: 'flex',
            alignItems: 'center',
            overflow: 'hidden',
          }}
        >
          <img
            ref={textImgRef}
            src={textWhiteImg}
            alt="vishvin - Your Digital Bridge To Success"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              imageRendering: '-webkit-optimize-contrast',
            }}
          />

          {/* Specular Light Sweep Streak */}
          <div
            ref={shineRef}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '90px',
              height: '100%',
              background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.85) 50%, transparent 100%)',
              transform: 'skewX(-25deg)',
              pointerEvents: 'none',
            }}
          />
        </div>
      </div>

      {/* Skip Button (Top Right) */}
      <div
        style={{
          position: 'absolute',
          top: '24px',
          right: '28px',
          padding: '8px 18px',
          borderRadius: '999px',
          background: 'rgba(255, 255, 255, 0.08)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(10px)',
          color: 'rgba(255, 255, 255, 0.85)',
          fontSize: '12px',
          fontWeight: 600,
          letterSpacing: '1px',
          textTransform: 'uppercase',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          transition: 'all 0.25s ease',
          zIndex: 10,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
          e.currentTarget.style.color = '#fff';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
          e.currentTarget.style.color = 'rgba(255, 255, 255, 0.85)';
        }}
      >
        <span>Skip</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="5 4 15 12 5 20 5 4"></polygon>
          <line x1="19" y1="5" x2="19" y2="19"></line>
        </svg>
      </div>
    </div>
  );
}
