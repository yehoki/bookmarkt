import prisma from '@/lib/prismadb';
export default async function getReviewByReviewId(reviewId: string) {
  try {
    const review = await prisma.review.findFirst({
      where: {
        id: reviewId,
      },
      include: {
        user: true,
      },
    });
    if (!review) {
      return null;
    }
    return review;
  } catch (err: any) {
    console.log(err);
  }
}
