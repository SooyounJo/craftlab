import Link from 'next/link';
import styles from '@/styles/Layout.module.css';

export default function Layout({ children }) {
  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <Link href="/" className={styles.logo}>
          Craft1030
        </Link>
        <nav className={styles.nav}>
          <Link href="/">Home</Link>
        </nav>
      </header>
      <div className={styles.content}>{children}</div>
      <footer className={styles.footer}>
        <small>© {new Date().getFullYear()} Craft1030</small>
      </footer>
    </div>
  );
}
