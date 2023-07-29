import { UserType } from '@/models/user';
import { SITE_URL } from '@/utils/config';
// const BASEURL = process.env.SITE_URL;
export async function userLogin(credentials: Partial<UserType>) {
  const res = await fetch(`${SITE_URL}/api/login/`, {
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
  const res = await fetch(`${SITE_URL}/api/users/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  const data = await res.json();
  return data;
}
