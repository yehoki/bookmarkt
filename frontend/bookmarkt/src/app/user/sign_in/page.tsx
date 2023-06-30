'use client';

import ConditionalNav from '@/components/ConditionalNav';
import Modal, { ModalInput } from '@/components/modals/Modal';

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

  return (
    <div>
      <ConditionalNav navOn={false} />
      <Modal
        mainLabel="Sign in"
        modalInputs={loginModalInputs}
        submitLabel="Sign in"
        mode="signIn"
      />
    </div>
  );
};

export default Page;
