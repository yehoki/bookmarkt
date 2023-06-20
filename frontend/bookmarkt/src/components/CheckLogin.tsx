'use client';

import { useSession } from 'next-auth/react';

import React from 'react';

import { signIn, signOut } from 'next-auth/react';
type Props = {};

const CheckLogin = (props: Props) => {
  const { data: session } = useSession();
  console.log(session);
  const conditionalDisplay = () => {
    if (!session) {
      return (
        <>
          <button onClick={() => signIn()}>Sign in</button>
        </>
      );
    } else {
      return (
        <>
          <button onClick={() => signOut()}>Sign Out</button>
        </>
      );
    }
  };

  return <>{conditionalDisplay()}</>;
};

export default CheckLogin;
