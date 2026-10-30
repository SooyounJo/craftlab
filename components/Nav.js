import { useEffect, useRef } from 'react';
import Logo from '@/components/Logo';
import styles from '@/styles/Nav.module.css';

export default function Nav({ t, lang, onLang, scrolled }) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const pin = () => {
      if (!document.documentElement.classList.contains('is-scale')) {
        node.style.transform = '';
        return;
      }
      const scale = Number(document.documentElement.style.getPropertyValue('--page-scale')) || 1;
      node.style.transform = `translate3d(0, ${window.scrollY / scale}px, 0)`;
    };

    pin();
    window.addEventListener('scroll', pin, { passive: true });
    window.addEventListener('resize', pin);
    return () => {
      window.removeEventListener('scroll', pin);
      window.removeEventListener('resize', pin);
    };
  }, []);

  return (
    <header ref={ref} className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.links}>
        <a className={styles.link} href="#research" data-interactive>
          <span>{t.navArts[0]}</span>
          <span>{t.navArts[1]}</span>
        </a>
        <a className={styles.link} href="#works" data-interactive>
          <span>{t.navTech[0]}</span>
          <span>{t.navTech[1]}</span>
        </a>
      </div>
      <a className={styles.brand} href="#top" aria-label="CRAFT Lab home" data-interactive>
        <Logo />
      </a>
      <div className={styles.langs}>
        <button
          type="button"
          className={lang === 'kr' ? styles.active : ''}
          onClick={() => onLang('kr')}
          data-interactive
        >
          KR
        </button>
        <button
          type="button"
          className={lang === 'en' ? styles.active : ''}
          onClick={() => onLang('en')}
          data-interactive
        >
          EN
        </button>
      </div>
    </header>
  );
}
