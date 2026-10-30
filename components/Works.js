import { useRef, useState } from 'react';
import useInView from '@/hooks/useInView';
import styles from '@/styles/Works.module.css';

export default function Works({ t }) {
  const [ref, visible] = useInView();
  const scrollerRef = useRef(null);
  const drag = useRef({ on: false, startX: 0, scroll: 0 });
  const [active, setActive] = useState(0);

  const onDown = (event) => {
    const node = scrollerRef.current;
    drag.current = { on: true, startX: event.pageX, scroll: node.scrollLeft };
    node.classList.add(styles.grabbing);
  };

  const onMove = (event) => {
    if (!drag.current.on) return;
    event.preventDefault();
    const scale = Number(document.documentElement.style.getPropertyValue('--page-scale')) || 1;
    scrollerRef.current.scrollLeft =
      drag.current.scroll - (event.pageX - drag.current.startX) / scale;
  };

  const stop = () => {
    drag.current.on = false;
    scrollerRef.current?.classList.remove(styles.grabbing);
  };

  return (
    <section className={`${styles.section} ${visible ? styles.in : ''}`} id="works" ref={ref}>
      <div className={styles.intro}>
        <h2>
          {t.worksTitle[0]}
          <br />
          {t.worksTitle[1]}
        </h2>
        <p>{t.worksBody}</p>
        <span className={styles.hint}>{t.worksHint}</span>
      </div>

      <div
        className={styles.scroller}
        ref={scrollerRef}
        onMouseDown={onDown}
        onMouseMove={onMove}
        onMouseUp={stop}
        onMouseLeave={stop}
      >
        {t.works.map((work, index) => (
          <button
            type="button"
            key={work.title}
            className={`${styles.tile} ${active === index ? styles.active : ''}`}
            style={{ marginTop: work.offset }}
            onClick={() => setActive(index)}
            data-interactive
          >
            <img src={work.image} alt="" draggable="false" />
            <span className={styles.caption}>
              <strong>{work.title}</strong>
              <em>{work.desc}</em>
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
