'use client';
import Link from 'next/link';
import { AiFillGithub } from 'react-icons/ai';

const FooterGithubLink = () => {
  return (
    <div className="flex items-center gap-1">
      yehoki 2023
      <Link
        href="https://github.com/yehoki"
        className="hover:-translate-y-1 text-goodreads-brown/70
          hover:text-goodreads-brown transition duration-300"
      >
        <AiFillGithub size={24} />
      </Link>
    </div>
  );
};

export default FooterGithubLink;
