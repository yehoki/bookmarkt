'use client';
import React from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import NavbarLoggedIn from './Navbar/NavbarLoggedIn';
import NavbarLoggedOut from './Navbar/NavbarLoggedOut';

type Props = {};

const Navbar = () => {
  const { data: session } = useSession();
  const rightNav = () => {
    if (session?.user) {
      return <NavbarLoggedIn />;
    }
    return <NavbarLoggedOut />;
  };
  return <>{rightNav()}</>;
};

export default Navbar;
