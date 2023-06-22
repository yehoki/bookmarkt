'use client';
import React from 'react';
import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';
import NavbarLoggedIn from './Navbar/NavbarLoggedIn';
import NavbarLoggedOut from './Navbar/NavbarLoggedOut';
import NavLayout from './Navbar/NavLayout';
type Props = {};

const Navbar = () => {
  // const { data: session } = useSession();

  // const rightNav = () => {
  //   if (session?.user) {
  //     return <NavbarLoggedIn />;
  //   }
  //   return <NavbarLoggedOut />;
  // };
  // return <>{rightNav()}</>;
  return (
    <>
      <NavLayout isLoggedIn={true}>1</NavLayout>
    </>
  );
};

export default Navbar;
