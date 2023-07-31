import prisma from '@/lib/prismadb';

export default async function createNewUserBookshelves(userEmail: string){
  try {
    const user = await prisma.user.findFirst({
      where:{
        email: userEmail
      }
    })
    console.log('user', user, user?.bookshelfIds)
    if (!user) {
      return false;
    }
    if (user.bookshelfIds.length >= 3) {
      return true
    }
    const defaultBookshelves = await prisma.bookshelf.createMany({
      data: [
        {
          name: 'Read',
          googleBooks: [],
          isDefault: true,
          userId: user.id,
        },
        {
          name: 'Currently reading',
          googleBooks: [],
          isDefault: true,
          userId: user.id,
        },
        {
          name: 'Want to read',
          googleBooks: [],
          isDefault: true,
          userId: user.id,
        },
      ],
    });
  
    const userBookshelves = await prisma.bookshelf.findMany({
      where: {
        userId: user.id,
      },
      select: {
        id: true,
      },
    });
  
    const userBookshelfIds = userBookshelves.map((bookshelf) => bookshelf.id);
  
    const updateUserBookshelfIds = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        bookshelfIds: [...userBookshelfIds] || [],
      },
    });
    return false;
  } catch(err){
    console.log(err);
  }
}