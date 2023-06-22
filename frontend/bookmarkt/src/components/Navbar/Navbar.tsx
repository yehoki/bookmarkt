'use client';
import React from 'react';
import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';
import NavbarLoggedIn from './NavbarLoggedIn';
import NavbarLoggedOut from './NavbarLoggedOut';
import NavLayout from './NavLayout';
import { User } from '@prisma/client';
import Container from '../Container';
import MobileSearch from './MobileSearch';
import Logo from './Logo';
import Links from './Links';
import Search from './Search';
import UserMenu from './UserMenu';
import MobileUserMenu from './MobileUserMenu';
import useRegisterMode from '@/hooks/registerMode';

interface NavbarProps {
  currentUser?: User | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  const registerMode = useRegisterMode();
  return (
    <div
      className={`
      ${registerMode.isOn ? 'hidden' : 'block'}
    fixed w-full z-10
   bg-goodreads-beige drop-shadow-md font-Lato
   `}
    >
      <Container>
        <div
          className=" flex
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
          <UserMenu currentUser={currentUser} />
          <MobileUserMenu />
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
