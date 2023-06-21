'use client';
import Link from 'next/link';
import Container from '../Container';
import Logo from './Logo';
import { BiSearch } from 'react-icons/bi';
import { BsFillBellFill } from 'react-icons/bs';
import Links from './Links';
import Search from './Search';

export default function NavLayout({
  children,
  isLoggedIn,
}: {
  children: React.ReactNode;
  isLoggedIn: boolean;
}) {
  return (
    <div
      className="
    fixed w-full z-10
   bg-goodreads-beige drop-shadow-md font-Lato"
    >
      <Container>
        <div
          className="
        flex
        flex-row
        lg:w-[1220px]
        mx-auto
        items-center gap-3 md:gap-0"
        >
          <Logo />
          <Links />
          <Search />
          <div className="mx-2 p-[7px] rounded-full text-goodreads-beige bg-goodreads-brown/30">
            <BsFillBellFill size={18} />
          </div>
          <div>{children}</div>
        </div>
      </Container>
    </div>
  );
}
