import { useEffect, useRef, useState } from 'react';
import styles from '@/styles/Cursor.module.css';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!fine) return undefined;

    setEnabled(true);
    document.body.dataset.cursor = 'on';

    const dot = dotRef.current;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let tx = x;
    let ty = y;
    let hover = false;
    let frame;

    const move = (event) => {
      tx = event.clientX;
      ty = event.clientY;
      const interactive = event.target.closest('a, button, input, textarea, [data-interactive]');
      hover = Boolean(interactive);
    };

    const tick = () => {
      x += (tx - x) * 0.22;
      y += (ty - y) * 0.22;
      if (dot) {
        dot.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${hover ? 2.1 : 1})`;
        dot.style.opacity = hover ? '0.45' : '0.85';
      }
      frame = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', move);
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('mousemove', move);
      delete document.body.dataset.cursor;
    };
  }, []);

  if (!enabled) return null;

  return <div ref={dotRef} className={styles.dot} aria-hidden="true" />;
}
