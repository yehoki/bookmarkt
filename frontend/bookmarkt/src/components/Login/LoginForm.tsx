'use client';
import { UserType } from '@/models/user';
import { useRouter } from 'next/navigation';
import React, { FormEvent, useState } from 'react';
type Props = {};

async function userLogin(credentials: Partial<UserType>) {
  const res = await fetch('http://localhost:3000/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
  const data = await res.json();
  return data;
}

const LoginForm = (props: Props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLoginSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const login = await userLogin({ username: username, password: password });
    console.log(login);
    setUsername('');
    setPassword('');
    router.push('/');
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
