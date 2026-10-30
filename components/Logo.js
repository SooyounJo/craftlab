import styles from '@/styles/Logo.module.css';

export default function Logo({ variant = 'nav' }) {
  const prefix = variant === 'footer' ? 'logo-footer' : 'logo';

  return (
    <span className={`${styles.logo} ${variant === 'footer' ? styles.footer : ''}`} aria-label="CRAFT Lab">
      <img className={styles.cr} src={`/images/${prefix}-1.svg`} alt="" />
      <img className={styles.a} src={`/images/${prefix}-2.svg`} alt="" />
      <img className={styles.f} src={`/images/${prefix}-3.svg`} alt="" />
      <img className={styles.t} src={`/images/${prefix}-4.svg`} alt="" />
      <img className={styles.lab} src={`/images/${prefix}-5.svg`} alt="" />
    </span>
  );
}
