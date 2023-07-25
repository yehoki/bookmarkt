import getCurrentUser from '@/actions/getCurrentUser';
import Modal, { ModalInput } from '@/components/modals/Modal';
import { getServerSession } from 'next-auth';
import { redirect, useRouter } from 'next/navigation';
import React from 'react';

type Props = {};

export default async function Login({}: Props) {
  const currentUser = await getCurrentUser();
  if (currentUser) {
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
