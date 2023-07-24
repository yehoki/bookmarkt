import prisma from '@/lib/prismadb';

export default async function getMostRecentReviews() {
  try {
    const mostRecentReviews = await prisma.review.findMany({
      include: {
        user: true,
        book: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
    });

    if (!mostRecentReviews) {
      return [];
    }
    return mostRecentReviews;
  } catch (err: any) {
    throw new Error(err);
  }
}
