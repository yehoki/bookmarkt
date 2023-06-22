import getCurrentUser from './getCurrentUser';

export default async function getCurrentUserBooks() {
  const session = await getCurrentUser();
  try {
    const currentUserBooks = await prisma?.user.findMany({
      where: {
        id: session?.id,
      },
      select: {
        books: true,
      },
    });
    if (!currentUserBooks) {
      return null;
    }
    return currentUserBooks;
  } catch (err) {
    console.log(err);
    return null;
  }
}
