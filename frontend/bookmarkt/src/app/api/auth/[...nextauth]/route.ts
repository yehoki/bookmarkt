import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        username: {
          label: 'Username',
          type: 'text',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      async authorize(credentials, req) {
        const res = await fetch('http://localhost:3000/api/login', {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const user = await res.json();
        const testUser = {
          id: '1',
          name: '1',
          username: 'test',
        };
        if (res.ok && testUser) {
          console.log('user', testUser);
          return testUser;
        }
        return null;
      },
    }),
  ],
  secret: 'secretString',
  session: {
    strategy: 'jwt',
  },
  //   GoogleProvider({
  //     clientId: process.env.GOOGLE_CLIENT_ID ?? '',
  //     clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ''
  //   })
  // ],
  // pages: [
  // ]
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
