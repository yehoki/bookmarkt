'use client';

import { UserType } from '@/models/user';
import React, { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { registerUser } from '@/services/users';
type Props = {};

const RegisterForm = (props: Props) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleRegisterUser = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const user: Partial<UserType> = {
      name: name,
      username: username,
      password: password,
    };
    const register = await registerUser(user);
    setName('');
    setUsername('');
    setPassword('');
    router.push('/');
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
        <label htmlFor="new-username">Username</label>
        <input
          type="text"
          id="new-username"
          value={username}
          onChange={(e) => setUsername(e.currentTarget.value)}
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
