import React from 'react';
import styles from '../app/page.module.css';
import Link from 'next/link';

type Props = {};

const Navbar = (props: Props) => {
  return (
    <>
      <h1 className={styles['nav-title']}>Bookmarkt</h1>
      <nav className={styles.nav}>
        <Link href={'/'}>
          <button>Home</button>
        </Link>
        <Link href={'/books'}>
          <button>Books</button>
        </Link>
        <Link href={'/login'}>
          <button>Login</button>
        </Link>
      </nav>
    </>
  );
};

export default Navbar;
