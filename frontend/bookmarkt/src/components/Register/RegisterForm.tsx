'use client';

import { UserType } from '@/models/user';
import React, { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { registerUser } from '@/services/users';
import useRegisterMode from '@/hooks/registerMode';
type Props = {};

const RegisterForm = (props: Props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const registerMode = useRegisterMode();

  const handleRegisterUser = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),
      });
      console.log(res);
      if (res.ok) {
        return res.json();
      }
      throw new Error(
        `${res.status}: ${res.statusText}, ${res.text}, ${res.ok}`
      );
    } catch (err) {
      console.log(err);
    } finally {
      setName('');
      setEmail('');
      setPassword('');
      router.push('/');
      setTimeout(() => {
        registerMode.onClose();
      }, 500);
    }
  };

  return (
    <form onSubmit={handleRegisterUser}>
      <div>
        <label htmlFor="new-name">Name</label>
        <input
          type="text"
          id="new-name"
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
        />
      </div>
      <div>
        <label htmlFor="new-username">Email</label>
        <input
          type="email"
          id="new-username"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
      </div>
      <div>
        <label htmlFor="new-password">Password</label>
        <input
          type="password"
          id="new-password"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
      </div>
      <button>Register</button>
    </form>
  );
};

export default RegisterForm;
