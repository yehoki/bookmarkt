import { PrismaAdapter } from '@next-auth/prisma-adapter';
import NextAuth, { AuthOptions } from 'next-auth';
import prisma from '@/lib/prismadb';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import createNewUserBookshelves from '@/actions/createNewUserBookshelves';
import checkIfNewUser from '@/actions/checkIfNewUser';

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
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: 'jwt',
  },
  theme: {
    logo: '/images/bookmarkt.svg',
    colorScheme: 'light',
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async signIn({ account, profile, user }) {
      if (
        (account?.provider === 'google' || account?.provider === 'github') &&
        profile &&
        profile.email &&
        profile.name
      ) {
        const checkUser = await checkIfNewUser(
          profile.email,
          profile?.name,
          account.provider,
          account.providerAccountId,
          account.access_token,
          account.token_type,
          account.scope,
          profile?.image
        );
        await createNewUserBookshelves(
          profile && profile.email ? profile.email : ''
        );
        return true;
      }

      return true;
    },
  },
};

export default NextAuth(authOptions);
