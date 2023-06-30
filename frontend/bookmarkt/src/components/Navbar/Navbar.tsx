'use client';
import React, { useEffect } from 'react';
import { User } from '@prisma/client';
import Container from '../Container';
import MobileSearch from './Search/MobileSearch';
import Logo from './Logo';
import Links from './LinkTabs/Links';
import Search from './Search/Search';
import UserMenu from './UserMenu/UserMenu';
import MobileUserMenu from './UserMenu/MobileUserMenu';
import useUserStore from '@/hooks/useUserStore';

interface NavbarProps {
  currentUser?: User | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  const userStore = useUserStore();
  useEffect(() => {
    if (currentUser?.email) {
      userStore.setUser(currentUser.email);
    }
  }, []);
  // if (currentUser?.email) {
  //   userStore.setUser(currentUser.email);
  // }
  return (
    <div
      className={`
    fixed w-full z-10
   bg-goodreads-beige drop-shadow-md font-Lato
   `}
    >
      <Container>
        <div
          className=" flex
        flex-row
        navOne:w-[1200px]
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
