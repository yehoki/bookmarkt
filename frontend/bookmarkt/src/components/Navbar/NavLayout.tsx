'use client';
import Link from 'next/link';
import Container from '../Container';
import Logo from './Logo';
import { BiConversation, BiSearch } from 'react-icons/bi';
import { BsFillBellFill, BsFillPeopleFill } from 'react-icons/bs';
import { TfiEmail } from 'react-icons/tfi';
import { IoIosMail } from 'react-icons/io';
import { HiUser } from 'react-icons/hi';
import Links from './Links';
import Search from './Search';
import NavIcon from './NavIcon';
import UserMenu from './UserMenu';

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
        lg:w-[1024px]
        mx-auto
        gap-3 md:gap-0 text-[14px] font-[450]"
        >
          <Logo />
          <Links />
          <Search />
          {/* Rightside Icons && Conditional when logged out */}
          <UserMenu />
          {/* <div>{children}</div> */}
        </div>
      </Container>
    </div>
  );
}
