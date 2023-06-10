import React from 'react'
import styles from '../page.module.css'
import Link from 'next/link'

type Props = {}

const Navbar = (props: Props) => {
  return (
    <nav className={styles.nav}>
        <Link href="/">
            <button>
                Home
            </button>
        </Link>
        <h1 className={styles["nav-title"]}>
            Bookmarkt
        </h1>
        <button>
            Login
        </button>
    </nav>
  )
}

export default Navbar