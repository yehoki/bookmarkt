import prisma from '@/lib/prismadb';

export async function getUserBookselvesByUserId(userId: string) {
  try {
    const userBookshelves = await prisma.bookshelf.findMany({
      where: {
        userId: userId,
      },
    });
    if (!userBookshelves){
      return null;
    }
    return userBookshelves
  } catch (err: any) {
    console.log(err);
    return null;
  }
}
