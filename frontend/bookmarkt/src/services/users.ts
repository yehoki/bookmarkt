import { UserType } from '@/models/user';

// const BASEURL = process.env.SITE_URL;
export async function userLogin(credentials: Partial<UserType>) {
  const res = await fetch(`/api/login/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
  const data = await res.json();
  return data;
}

export async function registerUser(user: Partial<UserType>) {
  const res = await fetch('/api/users/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  const data = await res.json();
  return data;
}
