import Logo from '@/components/Logo';
import styles from '@/styles/Footer.module.css';

export default function Footer({ t }) {
  return (
    <footer className={styles.footer}>
      <div className={styles.brand}>
        <a href="#top" data-interactive>
          <Logo variant="footer" />
        </a>
      </div>
      <div className={styles.col}>
        <p className={styles.head}>{t.footerExplore}</p>
        {t.footerLinks.map((item) => (
          <a key={item.label} href={item.href} data-interactive>
            {item.label}
          </a>
        ))}
        <p className={styles.head}>{t.footerLab}</p>
        {t.footerLabLinks.map((item) => (
          <a key={item.label} href={item.href} data-interactive>
            {item.label}
          </a>
        ))}
        <p className={styles.head}>{t.footerConnect}</p>
        <a href="mailto:hello@craftlab.kr" data-interactive>
          {t.email}
        </a>
        <span>{t.place}</span>
        <p className={styles.legal}>{t.legal}</p>
      </div>
      <div className={styles.wordmark}>
        <p>
          {t.footerLine[0]}
          <br />
          {t.footerLine[1]}
        </p>
      </div>
    </footer>
  );
}
