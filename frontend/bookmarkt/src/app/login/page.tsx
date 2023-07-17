import Modal, { ModalInput } from '@/components/modals/Modal';
import { getServerSession } from 'next-auth';
import { redirect, useRouter } from 'next/navigation';
import React from 'react';

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
