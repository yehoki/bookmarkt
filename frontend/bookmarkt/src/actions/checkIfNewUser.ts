import prisma from '@/lib/prismadb';

export default async function checkIfNewUser(
  userEmail: string,
  name: string,
  provider: string,
  providerAccountId: string,
  access_token?: string,
  token_type?: string,
  scope?: string,
  image?: string
) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: userEmail,
      },
    });
    if (user) {
      return user;
    }
    const newUser = await prisma.user.create({
      data: {
        name: name,
        email: userEmail,
        image: image,
      },
    });
    const newAccount = await prisma.account.create({
      data: {
        userId: newUser.id,
        type: 'oauth',
        provider: provider,
        providerAccountId: providerAccountId,
        access_token: access_token,
        token_type: token_type,
        scope: scope,
      },
    });
    const defaultBookshelves = await prisma.bookshelf.createMany({
      data: [
        {
          name: 'Read',
          googleBooks: [],
          isDefault: true,
          userId: newUser.id,
        },
        {
          name: 'Currently reading',
          googleBooks: [],
          isDefault: true,
          userId: newUser.id,
        },
        {
          name: 'Want to read',
          googleBooks: [],
          isDefault: true,
          userId: newUser.id,
        },
      ],
    });

    const userBookshelves = await prisma.bookshelf.findMany({
      where: {
        userId: newUser.id,
      },
      select: {
        id: true,
      },
    });

    const userBookshelfIds = userBookshelves.map((bookshelf) => bookshelf.id);

    const updateUserBookshelfIds = await prisma.user.update({
      where: {
        id: newUser.id,
      },
      data: {
        bookshelfIds: [...userBookshelfIds] || [],
      },
    });

    return { newUser, newAccount };
  } catch (err) {}
}
