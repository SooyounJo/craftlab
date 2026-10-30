import { useEffect, useRef } from 'react';
import styles from '@/styles/ScaleFrame.module.css';

const DESIGN = 1440;
const MOBILE = 768;

function pageStops(canvas) {
  const scale = Number(document.documentElement.style.getPropertyValue('--page-scale')) || 1;
  const vh = window.innerHeight;
  const total = canvas.offsetHeight * scale;
  const max = Math.max(0, total - vh);
  const raw = [0];

  canvas.querySelectorAll('[data-snap]').forEach((node) => {
    const top = node.offsetTop * scale;
    const bottom = top + node.offsetHeight * scale;
    raw.push(top);
    const endAligned = bottom - vh;
    if (endAligned > top + 48 && endAligned < max) raw.push(endAligned);
  });
  raw.push(max);

  const stops = [];
  raw
    .map((y) => Math.min(max, Math.max(0, y)))
    .sort((a, b) => a - b)
    .forEach((y) => {
      if (!stops.length || y - stops[stops.length - 1] > 24) stops.push(y);
    });
  return { stops, total };
}

export default function ScaleFrame({ children }) {
  const shellRef = useRef(null);
  const canvasRef = useRef(null);
  const snapsRef = useRef(null);

  useEffect(() => {
    const shell = shellRef.current;
    const canvas = canvasRef.current;
    const snaps = snapsRef.current;
    if (!shell || !canvas || !snaps) return undefined;

    const html = document.documentElement;

    const apply = () => {
      const vw = document.documentElement.clientWidth;
      const mobile = vw < MOBILE;
      html.classList.toggle('is-mobile', mobile);
      html.classList.toggle('is-scale', !mobile);
      snaps.replaceChildren();

      if (mobile) {
        html.style.setProperty('--page-scale', '1');
        canvas.style.cssText = '';
        shell.style.height = '';
        return;
      }

      const scale = vw / DESIGN;
      html.style.setProperty('--page-scale', String(scale));
      canvas.style.width = `${DESIGN}px`;
      canvas.style.zoom = '';
      canvas.style.transform = `scale(${scale})`;
      canvas.style.transformOrigin = 'top left';
      canvas.style.position = 'absolute';
      canvas.style.top = '0';
      canvas.style.left = '0';
      shell.style.height = '';

      const { stops, total } = pageStops(canvas);
      if (total < 1) return;

      const marks = [...stops];
      if (total - marks[marks.length - 1] > 1) marks.push(total);

      let prev = 0;
      marks.slice(1).forEach((mark) => {
        const page = document.createElement('div');
        page.className = styles.snap;
        page.style.height = `${mark - prev}px`;
        snaps.appendChild(page);
        prev = mark;
      });
    };

    apply();
    const observer = new ResizeObserver(apply);
    observer.observe(canvas);
    window.addEventListener('resize', apply);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', apply);
      html.classList.remove('is-mobile', 'is-scale');
      html.style.removeProperty('--page-scale');
    };
  }, []);

  return (
    <div className={styles.shell} ref={shellRef}>
      <div className={styles.canvas} ref={canvasRef}>
        {children}
      </div>
      <div className={styles.snaps} ref={snapsRef} />
    </div>
  );
}
