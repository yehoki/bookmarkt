'use client';

import ConditionalNav from '@/components/ConditionalNav';
import Modal, { ModalInput } from '@/components/modals/Modal';
import Link from 'next/link';

const Page = () => {
  const loginModalInputs: ModalInput[] = [
    {
      label: 'Your name',
      type: 'text',
      placeholder: 'First and last name',
    },
    {
      label: 'Email',
      type: 'email',
    },
    {
      label: 'Password',
      type: 'password',
      placeholder: 'At least 6 characters',
    },
    {
      label: 'Re-enter password',
      type: 'password',
    },
  ];
  return (
    <div>
      <ConditionalNav navOn={false} />
      <Modal
        mainLabel="Create Account"
        modalInputs={loginModalInputs}
        submitLabel="Create Account"
        mode="signUp"
      />
    </div>
  );
};

export default Page;
