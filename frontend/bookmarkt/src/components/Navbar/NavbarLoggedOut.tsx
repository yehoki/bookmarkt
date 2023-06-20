import React from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import NavLayout from './NavLayout';

type Props = {};

const NavbarLoggedOut = (props: Props) => {
  return <NavLayout>LoggedOut</NavLayout>;
};

export default NavbarLoggedOut;
