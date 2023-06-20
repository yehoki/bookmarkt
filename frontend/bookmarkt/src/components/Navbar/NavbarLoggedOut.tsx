'use client';
import React from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import NavLayout from './NavLayout';

type Props = {};

const NavbarLoggedOut = () => {
  return (
    <NavLayout isLoggedIn={false}>
      <div className="flex justify-between mx-8">
        <button
          onClick={() => signIn(undefined, { callbackUrl: '/' })}
          className="nav-btn"
        >
          Login
        </button>
        <Link className="nav-btn" href={'/register'}>
          Join
        </Link>
      </div>
    </NavLayout>
  );
};

export default NavbarLoggedOut;
