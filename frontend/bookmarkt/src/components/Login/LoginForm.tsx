'use client';
import { UserType } from '@/models/user';
import { useRouter } from 'next/navigation';
import React, { FormEvent, useState } from 'react';
import { userLogin } from '@/services/users';
type Props = {};

const LoginForm = (props: Props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLoginSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const login = await userLogin({ username: username, password: password });
      console.log(login);
      setUsername('');
      setPassword('');
      router.push('/');
    } catch (exc) {
      console.log('error', exc);
    }
  };

  return (
    <form onSubmit={handleLoginSubmit}>
      <div>
        <label htmlFor="username">Username</label>
        <input
          value={username}
          onChange={(e) => setUsername(e.currentTarget.value)}
          type="text"
          id="username"
        />
      </div>
      <div>
        <label htmlFor="pass">Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
          type="password"
          id="password"
        />
      </div>
      <button>Login</button>
    </form>
  );
};

export default LoginForm;
