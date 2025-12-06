import styles from './Header.module.css';

export function Header() {
  return (
    <h1>
      <a href="/" className={styles.logo}>
        <span className={styles.aoc}>Advent of Code</span>{' '}
        <span className={styles.y23}>2025</span>
      </a>
    </h1>
  );
}
