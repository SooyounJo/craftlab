import { useEffect, useRef } from 'react';
import useInView from '@/hooks/useInView';
import styles from '@/styles/Hero.module.css';

export default function Hero({ t }) {
  const visualRef = useRef(null);
  const [aboutRef, aboutVisible] = useInView();

  useEffect(() => {
    const visual = visualRef.current;
    if (!visual) return undefined;
    const layers = visual.querySelectorAll('[data-hero-layer]');

    const onScroll = () => {
      const scale = Number(document.documentElement.style.getPropertyValue('--page-scale')) || 1;
      const y = window.scrollY / scale;
      const p = Math.min(y / 700, 1);
      visual.style.transform = `translate3d(0, ${y * 0.14}px, 0) scale(${1 + y * 0.00006})`;
      layers.forEach((layer, index) => {
        const peak = index / Math.max(layers.length - 1, 1);
        const dist = Math.abs(p - peak);
        layer.style.opacity = String(Math.max(0, 1 - dist * 1.65));
      });
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section className={styles.hero} id="top">
      <div className={styles.stage}>
        <div className={styles.visual} ref={visualRef}>
          <img className={styles.layer} src="/images/hero-bg-1.png" alt="" data-hero-layer />
          <img className={styles.layer} src="/images/hero-bg-2.png" alt="" data-hero-layer />
          <img className={`${styles.layer} ${styles.glitch}`} src="/images/hero-bg-3.png" alt="" data-hero-layer />
          <img className={`${styles.layer} ${styles.glitch}`} src="/images/hero-bg-4.png" alt="" data-hero-layer />
          <img className={`${styles.layer} ${styles.bottomGlow}`} src="/images/hero-bg-5.png" alt="" data-hero-layer />
          <div className={styles.wash} />
          <div className={styles.dim} />
        </div>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>
            {t.heroEyebrow[0]}
            <br />
            {t.heroEyebrow[1]}
          </p>
          <h1 className={styles.title}>{t.heroTitle}</h1>
        </div>
      </div>

      <div
        className={`${styles.about} ${aboutVisible ? styles.in : ''}`}
        id="about"
        ref={aboutRef}
      >
        <div className={styles.rule} />
        <div className={styles.aboutRow}>
          <div className={styles.statement}>
            <p>{t.aboutLead}</p>
            <p className={styles.muted}>{t.aboutBody}</p>
          </div>
          <p className={styles.label}>{t.aboutLabel}</p>
        </div>
      </div>
    </section>
  );
}
