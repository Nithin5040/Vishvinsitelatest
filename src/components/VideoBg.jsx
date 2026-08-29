import { useEffect, useRef } from 'react';

/**
 * VideoBg — Full-coverage video background with dark gradient overlay.
 * Uses Pexels direct video streams (no auth needed).
 * Falls back to a dark gradient if video fails to load.
 */
export default function VideoBg({ src, poster, overlayOpacity = 0.72, style = {} }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.play().catch(() => {}); // ignore autoplay policy errors silently
  }, []);

  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      overflow: 'hidden',
      zIndex: 0,
      ...style,
    }}>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
        }}
      />
      {/* Dark overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `rgba(1, 2, 8, ${overlayOpacity})`,
        zIndex: 1,
      }} />
      {/* Gradient fade to page BG at bottom */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '40%',
        background: 'linear-gradient(to bottom, transparent, #03040d)',
        zIndex: 2,
      }} />
    </div>
  );
}
