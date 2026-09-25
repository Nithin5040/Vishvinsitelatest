import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

// Import the 4 authentic emblem shards
import pieceTopImg from '../assets/logo-slices/piece-top-orig.png';
import pieceRightImg from '../assets/logo-slices/piece-right-orig.png';
import pieceBottomImg from '../assets/logo-slices/piece-bottom-orig.png';
import pieceLeftImg from '../assets/logo-slices/piece-left-orig.png';

// Import the 7 individual authentic letters of 'vishvin'
import letter1Img from '../assets/logo-slices/letter-1.png'; // v
import letter2Img from '../assets/logo-slices/letter-2.png'; // ı
import letter3Img from '../assets/logo-slices/letter-3.png'; // s
import letter4Img from '../assets/logo-slices/letter-4.png'; // h
import letter5Img from '../assets/logo-slices/letter-5.png'; // v
import letter6Img from '../assets/logo-slices/letter-6.png'; // ı
import letter7Img from '../assets/logo-slices/letter-7.png'; // n

// Import authentic tagline
import taglineImg from '../assets/logo-slices/tagline.png';

export default function LogoIntro({ onComplete }) {
  const containerRef = useRef(null);
  const brandLockupRef = useRef(null);
  const emblemContainerRef = useRef(null);

  // 4 Emblem Shard Refs
  const topPieceRef = useRef(null);
  const rightPieceRef = useRef(null);
  const bottomPieceRef = useRef(null);
  const leftPieceRef = useRef(null);

  // 7 Letter Refs
  const letterRefs = [
    useRef(null), // v
    useRef(null), // ı
    useRef(null), // s
    useRef(null), // h
    useRef(null), // v
    useRef(null), // ı
    useRef(null), // n
  ];

  const taglineRef = useRef(null);
  const textContainerRef = useRef(null);
  const shineRef = useRef(null);

  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Initial State for 4 Emblem Shards (Calm, relaxed straight axes) ──
      gsap.set(topPieceRef.current, { y: -240, opacity: 0, scale: 1.15, force3D: true });
      gsap.set(bottomPieceRef.current, { y: 240, opacity: 0, scale: 1.15, force3D: true });
      gsap.set(leftPieceRef.current, { x: -240, opacity: 0, scale: 1.15, force3D: true });
      gsap.set(rightPieceRef.current, { x: 240, opacity: 0, scale: 1.15, force3D: true });

      // ── Initial State for 7 Sequential Letters ──
      letterRefs.forEach((ref) => {
        gsap.set(ref.current, {
          x: 28,
          y: 0,
          scale: 0.96,
          opacity: 0,
          force3D: true,
        });
      });

      // Initial State for Tagline & Single Continuous Specular Sheen
      gsap.set(taglineRef.current, { y: 18, opacity: 0, force3D: true });
      gsap.set(shineRef.current, { x: -160, opacity: 0, force3D: true });

      // ── Master Animation Timeline (Slowed Down, Graceful & Majestic Cadence) ──
      const tl = gsap.timeline({
        onComplete: () => {
          handleFinish();
        }
      });

      // 1. Smooth & Relaxed Convergence of Emblem Shards (Slower pace)
      tl.to([topPieceRef.current, bottomPieceRef.current, leftPieceRef.current, rightPieceRef.current], {
        x: 0,
        y: 0,
        scale: 1,
        opacity: 1,
        duration: 1.65,
        stagger: 0.08,
        ease: 'power2.out',
      }, 0.3);

      // 2. Subtle & Clean Emblem Snap / Settle
      tl.to(emblemContainerRef.current, {
        scale: 1.03,
        duration: 0.35,
        ease: 'sine.out',
      }, 1.7)
      .to(emblemContainerRef.current, {
        scale: 1.0,
        duration: 0.6,
        ease: 'power2.out',
      }, 2.05);

      // 3. Graceful Left-to-Right Sequential Letter Reveal (v -> ı -> s -> h -> v -> ı -> n)
      letterRefs.forEach((ref, idx) => {
        tl.to(ref.current, {
          x: 0,
          scale: 1,
          opacity: 1,
          duration: 0.95,
          ease: 'power2.out',
        }, 1.65 + idx * 0.12);
      });

      // 4. Smooth Tagline Glide
      tl.to(taglineRef.current, {
        y: 0,
        opacity: 1,
        duration: 1.1,
        ease: 'power2.out',
      }, 2.45);

      // 5. ONE Continuous Specular Light Shimmer Sweeping Fluidly Across Entire Brand (Emblem -> Text)
      tl.to(shineRef.current, {
        opacity: 1,
        duration: 0.18,
      }, 3.1)
      .to(shineRef.current, {
        x: 750,
        duration: 1.45,
        ease: 'power2.inOut',
      }, 3.1)
      .to(shineRef.current, {
        opacity: 0,
        duration: 0.3,
      }, 4.35);

      // 6. Presentation Hold before Seamless Dissolve
      tl.to({}, { duration: 1.2 });
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  const handleFinish = () => {
    if (isFinished) return;
    setIsFinished(true);

    if (containerRef.current) {
      // ── Seamless Merging Transition with Home Page ──
      // The assembled logo and dark backdrop smoothly melt and diffuse into the live Home page
      gsap.to(brandLockupRef.current, {
        scale: 1.04,
        opacity: 0,
        y: -18,
        filter: 'blur(8px)',
        duration: 1.5,
        ease: 'power2.inOut',
      });

      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 1.6,
        ease: 'power2.inOut',
        onComplete: () => {
          if (onComplete) onComplete();
        },
      });
    } else {
      if (onComplete) onComplete();
    }
  };


  const letterImages = [
    letter1Img, // v
    letter2Img, // ı
    letter3Img, // s
    letter4Img, // h
    letter5Img, // v
    letter6Img, // ı
    letter7Img, // n
  ];

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        background: '#040814',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        userSelect: 'none',
        WebkitFontSmoothing: 'antialiased',
        pointerEvents: isFinished ? 'none' : 'auto',
      }}
    >
      {/* Main Authentic Brand Lockup (Clean, Pure, Distraction-Free) */}
      <div
        ref={brandLockupRef}
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'clamp(14px, 2.5vw, 32px)',
          flexDirection: 'row',
          flexWrap: 'nowrap',
          maxWidth: '92vw',
          padding: '4px',
          overflow: 'hidden',
          borderRadius: '8px',
          zIndex: 2,
        }}
      >
        {/* Emblem Layer Container (346x311 proportional box) */}
        <div
          ref={emblemContainerRef}
          style={{
            position: 'relative',
            width: 'clamp(130px, 18vw, 210px)',
            aspectRatio: '346 / 311',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* 1. Top Authentic Emblem Shard */}
          <img
            ref={topPieceRef}
            src={pieceTopImg}
            alt="Vishvin Top Shard"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              pointerEvents: 'none',
            }}
          />

          {/* 2. Right Authentic Emblem Shard */}
          <img
            ref={rightPieceRef}
            src={pieceRightImg}
            alt="Vishvin Right Shard"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              pointerEvents: 'none',
            }}
          />

          {/* 3. Bottom Authentic Emblem Shard */}
          <img
            ref={bottomPieceRef}
            src={pieceBottomImg}
            alt="Vishvin Bottom Shard"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              pointerEvents: 'none',
            }}
          />

          {/* 4. Left Authentic Emblem Shard */}
          <img
            ref={leftPieceRef}
            src={pieceLeftImg}
            alt="Vishvin Left Shard"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              pointerEvents: 'none',
            }}
          />
        </div>

        {/* Text Container: Formal Left-to-Right Sequential Letters + Tagline */}
        <div
          ref={textContainerRef}
          style={{
            position: 'relative',
            width: 'clamp(200px, 32vw, 380px)',
            aspectRatio: '505 / 311',
            display: 'flex',
            alignItems: 'center',
            overflow: 'hidden',
          }}
        >
          {/* 7 Sequentially Animated Letters of 'vishvin' */}
          {letterImages.map((src, idx) => (
            <img
              key={idx}
              ref={letterRefs[idx]}
              src={src}
              alt={`Letter ${idx + 1}`}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                pointerEvents: 'none',
              }}
            />
          ))}

          {/* Tagline: Your Digital Bridge To Success */}
          <img
            ref={taglineRef}
            src={taglineImg}
            alt="Your Digital Bridge To Success"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              pointerEvents: 'none',
            }}
          />
        </div>

        {/* ONE Seamless, Continuous Specular Light Sweep Across Emblem + Text */}
        <div
          ref={shineRef}
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            width: '130px',
            height: '100%',
            background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.25) 30%, rgba(255, 255, 255, 0.95) 50%, rgba(255, 255, 255, 0.25) 70%, transparent 100%)',
            transform: 'skewX(-25deg)',
            pointerEvents: 'none',
            zIndex: 10,
            mixBlendMode: 'screen',
          }}
        />
      </div>
    </div>
  );
}
