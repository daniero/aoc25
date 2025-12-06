import styles from './Header.module.css';
import { Link } from '@tanstack/react-router';

export function Header() {
  return (
    <h1>
      <Link to="/" className={styles.logo}>
        <span className={styles.aoc}>Advent of Code</span>{' '}
        <span className={styles.y23}>2025</span>
      </Link>
    </h1>
  );
}
