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
import MobileSearch from './MobileSearch';
import MobileUserMenu from './MobileUserMenu';

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
        justify-between
        md:justify-normal
        mx-auto
        gap-3 md:gap-0 text-[14px] font-[450]"
        >
          <MobileSearch />
          <Logo />
          <Links />
          <Search />
          {/* Rightside Icons && Conditional when logged out */}
          <UserMenu />
          <MobileUserMenu />
          {/* <div>{children}</div> */}
        </div>
      </Container>
    </div>
  );
}
