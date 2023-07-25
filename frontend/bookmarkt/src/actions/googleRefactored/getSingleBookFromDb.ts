import prisma from '@/lib/prismadb';

export async function getSingleBookFromDb(googleId: string) {
  try {
    const book = await prisma.bookData.findFirst({
      where: {
        googleId: googleId,
      },
    });
    return book;
  } catch (err: any) {
    throw new Error(err);
  }
}
