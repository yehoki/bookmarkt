import React from 'react';
import { User } from '@prisma/client';
import Container from '../Container';
import MobileSearch from './Search/MobileSearch';
import Logo from './Logo';
import Links from './LinkTabs/Links';
import Search from './Search/Search';
import UserMenu from './UserMenu/UserMenu';
import MobileUserMenu from './UserMenu/MobileUserMenu';
import MobileDropdown from './MobileDropdown';

interface NavbarProps {
  currentUser?: User | null;
}

const Navbar: React.FC<NavbarProps> = async ({ currentUser }) => {
  return (
    <>
      <div
        id="top-navbar"
        className={`
    fixed w-[100dvw] z-10
   bg-goodreads-beige drop-shadow-md font-Lato
   `}
      >
        <Container>
          <div
            className=" flex
        flex-row
        h-[50px]
        navOne:w-[1200px]
        justify-between
        md:justify-normal
        mx-auto
        gap-3 md:gap-0 text-[14px] font-[450]"
          >
            <MobileSearch />
            <Logo />
            <Links currentUserId={currentUser ? currentUser.id : ''} />
            <Search />
            <UserMenu currentUser={currentUser} />
            <MobileUserMenu
              currentUserImage={
                currentUser && currentUser.image ? currentUser.image : ''
              }
            />
          </div>
        </Container>
        <div className="navOne:hidden max-h-[50px]">
          <hr className="border-[1px]" />
          <div className="">
            <Container>
              <div className="">
                <MobileDropdown
                  currentUserId={currentUser ? currentUser.id : ''}
                />
              </div>
            </Container>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
