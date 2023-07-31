'use client';
import React from 'react';
import Link from 'next/link';
import Container from './Container';
import { AiFillGithub } from 'react-icons/ai';
type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className="w-[100dvw] bottom-0 fixed bg-goodreads-beige">
      <Container>
        <div className="px-2 navOne:px-0 flex flex-row items-center gap-1 py-8 navOne:w-[1200px] mx-auto">
          yehoki 2023
          <Link
            href="https://github.com/yehoki/"
            className="hover:-translate-y-1 text-goodreads-brown/70
          hover:text-goodreads-brown transition duration-300"
          >
            <AiFillGithub size={24} />
          </Link>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
