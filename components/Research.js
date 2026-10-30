import { useState } from 'react';
import useInView from '@/hooks/useInView';
import styles from '@/styles/Research.module.css';

export default function Research({ t }) {
  const [open, setOpen] = useState('fabrication');
  const [ref, visible] = useInView();

  return (
    <section className={`${styles.section} ${visible ? styles.in : ''}`} id="research" ref={ref}>
      <div className={styles.intro}>
        <h2>
          {t.axesTitle[0]}
          <br />
          <span>{t.axesTitle[1]}</span>
        </h2>
        <p>
          {t.axesNote[0]}
          <br />
          {t.axesNote[1]}
        </p>
      </div>

      <p className={styles.hint}>{t.axesHint}</p>
      <div className={styles.rule} />

      <div className={styles.list}>
        {t.axes.map((axis) => {
          const active = open === axis.id;
          return (
            <article key={axis.id} className={`${styles.axis} ${active ? styles.open : ''}`}>
              <button
                type="button"
                className={styles.trigger}
                onClick={() => setOpen(axis.id)}
                aria-expanded={active}
                data-interactive
              >
                <span className={styles.badge}>{axis.no}</span>
                <span className={styles.meta}>
                  <span className={styles.code}>{axis.code}</span>
                  <span className={styles.name}>{axis.title}</span>
                  {!active ? (
                    <>
                      <span className={styles.body}>{axis.body}</span>
                      <span className={styles.tags}>{axis.tags}</span>
                    </>
                  ) : null}
                </span>
              </button>

              <div className={styles.panel} hidden={!active}>
                <div className={styles.card}>
                  <div className={styles.cardCopy}>
                    <span className={styles.badge}>{axis.no}</span>
                    <div>
                      <p className={styles.cardCode}>{axis.code}</p>
                      <h3>{axis.title}</h3>
                    </div>
                    <div className={styles.cardText}>
                      <p>{axis.body}</p>
                      <p className={styles.tags}>{axis.tags}</p>
                    </div>
                  </div>
                  <div className={styles.photo}>
                    <img src={axis.image} alt={axis.imageAlt} />
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
