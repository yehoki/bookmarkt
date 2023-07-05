'use client';

import ConditionalNav from '@/components/ConditionalNav';
import Modal, { ModalInput } from '@/components/modals/Modal';
import UserModal from '@/components/modals/UserModal';
import { signIn } from 'next-auth/react';
import { FormEvent } from 'react';

const Page = () => {
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

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div>
      <ConditionalNav navOn={false} />
      <UserModal title="Sign in to Goodreads" mode="signIn" />
    </div>
  );
};

export default Page;
