import prisma from '@/lib/prismadb';

export async function getSingleBookFromDB(googleId: string) {
  try {
    const book = await prisma.book.findFirst({
      where: {
        googleId: googleId,
      },
    });
    return book;
  } catch (err: any) {
    throw new Error(err);
  }
}
