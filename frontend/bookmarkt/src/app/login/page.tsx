import LoginForm from '@/components/Login/LoginForm';
import Modal, { ModalInput } from '@/components/modals/Modal';
import { signIn } from 'next-auth/react';
import React, { FormEvent } from 'react';

type Props = {};

export default function Login({}: Props) {
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
