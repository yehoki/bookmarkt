import prisma from '@/lib/prismadb';
import getCurrentUser from './getCurrentUser';
import { NextResponse } from 'next/server';

// NOTE: Takes in the book GoogleId for query: have to find the book itself first
export async function getCurrentUserCurrentBookReview(bookId: string) {
  // First: Get the current user from which we need the review

  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return [];
    }

    // Next: Get the book from the GoogleBookId
    const currentBook = await prisma.book.findFirst({
      where: {
        googleId: bookId,
      },
      select: {
        reviews: true,
      },
    });

    if (!currentBook) {
      return [];
    }

    // Next: Filter the book reviews to find the ones which the user currently has
    const currentUserReview = currentBook?.reviews.filter(
      (review) => review.userId === currentUser.id
    );
    return currentUserReview ? currentUserReview : [];
  } catch (err: any) {
    throw new Error(err);
  }
}
