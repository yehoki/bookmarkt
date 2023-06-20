'use client';
import React from 'react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import NavLayout from './NavLayout';

type Props = {};

const NavbarLoggedIn = () => {
  return (
    <NavLayout isLoggedIn={true}>
      <div>
        <button className="nav-btn" onClick={() => signOut()}>
          Sign Out
        </button>
      </div>
    </NavLayout>
  );
};

export default NavbarLoggedIn;
