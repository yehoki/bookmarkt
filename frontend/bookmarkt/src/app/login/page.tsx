import LoginForm from '@/components/Login/LoginForm';
import React from 'react';

type Props = {};

export default function Login({}: Props) {
  return (
    <div className="pt-20">
      <LoginForm />
    </div>
  );
}
