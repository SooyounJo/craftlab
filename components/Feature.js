import { useRef } from 'react';
import useInView from '@/hooks/useInView';
import styles from '@/styles/Feature.module.css';

export default function Feature({ t }) {
  const [ref, visible] = useInView();
  const frameRef = useRef(null);

  const onMove = (event) => {
    const node = frameRef.current;
    if (!node) return;
    const box = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width - 0.5;
    const y = (event.clientY - box.top) / box.height - 0.5;
    node.style.transform = `translate3d(${x * -18}px, ${y * -12}px, 0)`;
  };

  const onLeave = () => {
    if (frameRef.current) frameRef.current.style.transform = 'translate3d(0, 0, 0)';
  };

  return (
    <section
      className={`${styles.wrap} ${visible ? styles.in : ''}`}
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <div className={styles.panel}>
        <img className={styles.bg} src="/images/feature-robot.png" alt="" />
        <div className={styles.shade} />
        <div className={styles.intro}>
          <h2>
            {t.featureTitle[0]}
            <br />
            {t.featureTitle[1]}
          </h2>
          <p>{t.featureBody}</p>
        </div>
        <div className={styles.frame} ref={frameRef} data-interactive>
          <img src="/images/feature-dancer.png" alt="" />
        </div>
      </div>
    </section>
  );
}
