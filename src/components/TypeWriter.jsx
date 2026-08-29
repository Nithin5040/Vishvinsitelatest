import { useEffect, useRef, useState } from 'react';

/**
 * TypeWriter — Animates text character by character, then loops.
 */
export default function TypeWriter({ texts = [], speed = 80, pauseDuration = 2400, className = '' }) {
  const [display, setDisplay] = useState('');
  const [textIdx, setTextIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const current = texts[textIdx] ?? '';

    if (!deleting && charIdx <= current.length) {
      timeoutRef.current = setTimeout(() => {
        setDisplay(current.slice(0, charIdx));
        setCharIdx(c => c + 1);
        if (charIdx === current.length) {
          // Pause before deleting
          setTimeout(() => setDeleting(true), pauseDuration);
        }
      }, speed);
    } else if (deleting && charIdx >= 0) {
      timeoutRef.current = setTimeout(() => {
        setDisplay(current.slice(0, charIdx));
        setCharIdx(c => c - 1);
        if (charIdx === 0) {
          setDeleting(false);
          setTextIdx(i => (i + 1) % texts.length);
        }
      }, speed / 2);
    }

    return () => clearTimeout(timeoutRef.current);
  }, [charIdx, deleting, textIdx, texts, speed, pauseDuration]);

  return (
    <span className={className}>
      {display}
      <span style={{
        display: 'inline-block',
        width: '2px',
        height: '1em',
        background: '#00f2ff',
        marginLeft: '2px',
        verticalAlign: 'text-bottom',
        animation: 'blink-dot 0.85s ease infinite',
        borderRadius: '1px',
      }} />
    </span>
  );
}
