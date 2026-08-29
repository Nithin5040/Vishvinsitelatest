import { useEffect, useRef, useState } from 'react';

export default function Counter({ target, suffix = '', fallback = '0' }) {
  const [value, setValue] = useState(fallback);
  const elementRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;

          // Handle non-numeric targets like ∞
          if (typeof target === 'string' && isNaN(Number(target))) {
            setValue(target + suffix);
            return;
          }

          const parsedTarget = typeof target === 'number' ? target : parseInt(target, 10);
          const duration = 1400;
          let startTime = null;

          const tick = (now) => {
            if (!startTime) startTime = now;
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // cubic easing out
            setValue(Math.round(eased * parsedTarget) + suffix);

            if (progress < 1) {
              requestAnimationFrame(tick);
            }
          };

          requestAnimationFrame(tick);
          observer.unobserve(el);
        }
      },
      { threshold: 0.02 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [target, suffix]);

  return (
    <div ref={elementRef} className="num">
      {value}
    </div>
  );
}
