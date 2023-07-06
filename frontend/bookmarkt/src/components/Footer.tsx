import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import githubLogo from '../github-mark.svg';
import styles from '../page.module.css';
import Container from './Container';
type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className="w-full bg-goodreads-beige mx-auto">
      <Container>
        <div className="navOne:w-[1200px] flex flex-row mx-auto py-8">
          Copyright © 2023 yehoki
          <Link href="https://github.com/yehoki/">
            {/* <Image
            src={githubLogo}
            alt="Github logo"
          /> */}
          </Link>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
