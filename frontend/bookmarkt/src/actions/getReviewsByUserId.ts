import prisma from '@/lib/prismadb';

export default async function getReviewsByUserId(userId: string) {
  try {
    const userReviews = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      include: {
        reviews: true,
      },
    });

    if (!userReviews) {
      return null;
    }
    return userReviews.reviews;
  } catch (err: any) {
    console.log(err);
  }
}
