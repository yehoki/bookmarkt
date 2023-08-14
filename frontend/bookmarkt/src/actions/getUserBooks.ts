import prisma from '@/lib/prismadb';

export default async function getUserBooks(userId: string) {
  try {
    const currentUserBooks = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        bookData: true,
        bookProgress:true, 
        reviews: true,
      },
    });
    if (!currentUserBooks) {
      return null;
    }
    return currentUserBooks;
  } catch (err: any) {
    throw new Error(err);
  }
}
