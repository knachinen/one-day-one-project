'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';

export default function Header() {
  const pathname = usePathname();

  return (
    <div className={styles.headerContainer}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <Link href="/">KCS.</Link>
        </div>
        <nav className={styles.nav}>
          <ul>
            <li>
              <Link href="#work" className={pathname === '/work' ? styles.active : ''}>
                Work
              </Link>
            </li>
            <li>
              <Link href="#about" className={pathname === '/' ? styles.active : ''}>
                About
              </Link>
            </li>
            <li>
              <Link href="#contact" className={pathname === '/contact' ? styles.active : ''}>
                Contact
              </Link>
            </li>
          </ul>
        </nav>
        <Link href="/resume.pdf" className={styles.resumeBtn}>
          Resume
        </Link>
      </header>
    </div>
  );
}