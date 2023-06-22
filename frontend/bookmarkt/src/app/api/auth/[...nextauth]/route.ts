import { PrismaAdapter } from '@next-auth/prisma-adapter';
import NextAuth, { AuthOptions } from 'next-auth';
import prisma from '@/lib/prismadb';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials!');
        }
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });
        if (!user || !user?.hashedPassword) {
          throw new Error('Invalid Credentials!');
        }
        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isCorrectPassword) {
          throw new Error('Invalid credentials!');
        }
        return user;
      },
    }),
  ],
  pages: {
    signIn: '/',
  },
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);







// export const authOptions: NextAuthOptions = {
//   providers: [
//     CredentialsProvider({
//       credentials: {
//         username: {
//           label: 'Username',
//           type: 'text',
//         },
//         password: {
//           label: 'Password',
//           type: 'password',
//         },
//       },
//       async authorize(credentials, req) {
//         const res = await fetch('http://localhost:3000/api/login', {
//           method: 'POST',
//           body: JSON.stringify(credentials),
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         });
//         const user = await res.json();
//         console.log('user', user);
//         if (res.ok && user) {
//           console.log('returning user', user);
//           return user;
//         }
//         return null;
//       },
//     }),
//   ],
//   callbacks: {
//     async session({ session, token }) {
//       session.user = token.user;
//       return session;
//     },
//     async jwt({ token, user }) {
//       if (user) {
//         token.user = user;
//       }
//       return token;
//     },
//   },
//   secret: 'secretString',
//   session: {
//     strategy: 'jwt',
//   },
//   //   GoogleProvider({
//   //     clientId: process.env.GOOGLE_CLIENT_ID ?? '',
//   //     clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ''
//   //   })
//   // ],
//   // pages: [
//   // ]
// };
// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };
