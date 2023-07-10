import getCurrentUser from '@/actions/getCurrentUser';
import LoginForm from '@/components/Login/LoginForm';
import Modal, { ModalInput } from '@/components/modals/Modal';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import { redirect, useRouter } from 'next/navigation';
import React, { FormEvent, useEffect } from 'react';

type Props = {};

export default async function Login({}: Props) {
  const session = await getServerSession();
  if (session?.user) {
    return redirect('/');
  }

  const loginModalInputs: ModalInput[] = [
    {
      label: 'Email',
      type: 'email',
    },
    {
      label: 'Password',
      type: 'password',
    },
  ];

  return (
    <div className="">
      <Modal
        modalInputs={loginModalInputs}
        mainLabel="Sign in"
        submitLabel="Sign in"
        mode="signIn"
      />
    </div>
  );
}
