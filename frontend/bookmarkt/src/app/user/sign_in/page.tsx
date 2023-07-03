'use client';

import ConditionalNav from '@/components/ConditionalNav';
import Modal, { ModalInput } from '@/components/modals/Modal';
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
      <Modal
        mainLabel="Sign in"
        modalInputs={loginModalInputs}
        submitLabel="Sign in"
        mode="signIn"
        onFormSubmit={handleLogin}
      />
    </div>
  );
};

export default Page;
