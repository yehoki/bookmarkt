import getCurrentUser from '@/actions/getCurrentUser';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prismadb';
import { getSingleBook } from '@/actions/getSingleBook';
import { BookData } from '@prisma/client';
import { handleChangeReview, handleNewReview } from '@/utils/helper';

// GET retrieves ALL reviews
export async function GET(req: Request) {
  const allReviews = prisma.review.findMany({});
  if (!allReviews) {
    return NextResponse.error();
  }
  return NextResponse.json(allReviews);
}

// POST creates a review
export async function POST(req: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.error();
  }
  const body = await req.json();
  const { bookId, description, rating } = body;

  if (!bookId || !rating) {
    return NextResponse.error();
  }
  // Check if the book exists

  const findBookData = await prisma.bookData.findFirst({
    where: {
      googleId: bookId,
    },
    select: {
      googleId: true,
      reviewIds: true,
      reviewData: true,
    },
  });

  if (!findBookData) {
    const newBookData = await prisma.bookData.create({
      data: {
        googleId: bookId,
        reviewData: {
          averageReview: 0,
          totalReviews: 0,
        },
      },
    });
    if (!newBookData) {
      return NextResponse.error();
    }
    const review = await prisma.review.create({
      data: {
        description: description,
        rating: rating,
        userId: currentUser.id,
        googleBookId: newBookData.googleId,
      },
    });
    if (!review) {
      return NextResponse.error();
    }
    // Add the review to the user's list
    const currentUserReviewIds = [...(currentUser.reviewIds || [])];
    currentUserReviewIds.push(review.id);
    const alterUser = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        reviewIds: currentUserReviewIds,
      },
    });
    // add the review and review data to the book's list
    const currentBookReviewIds = [...(newBookData.reviewIds || [])];
    currentBookReviewIds.push(review.id);
    const alterBook = await prisma.bookData.update({
      where: {
        googleId: newBookData.googleId,
      },
      data: {
        reviewIds: currentBookReviewIds,
        reviewData: {
          averageReview: handleNewReview(
            newBookData.reviewData.totalReviews,
            newBookData.reviewData.averageReview,
            rating
          ),
          totalReviews: newBookData.reviewData.totalReviews + 1,
        },
      },
    });
    return NextResponse.json(review);
  }

  // When the book does not exist
  // 1. Fetch it from the Google Books API
  // 2. Add it to our Database
  // 3. Add the reviewId to the user's reviewIds

  // Check if a user's review already exists for this book:
  const currentUserReviews = await prisma.user.findFirst({
    where: {
      id: currentUser.id,
    },
    select: {
      reviews: true,
    },
  });
  if (!currentUserReviews) {
    return NextResponse.error();
  }

  const checkForUserReview = currentUserReviews.reviews.find(
    (review) => review.googleBookId === findBookData.googleId
  );
  // In the case that the review exists, and we sent a new review:
  // Send a PUT request/ alter the current review with the new information
  if (checkForUserReview) {
    const updateCurrentReview = await prisma.review.update({
      where: {
        id: checkForUserReview.id,
      },
      data: {
        rating: rating,
        description: description,
      },
    });

    const alterBook = await prisma.bookData.update({
      where: {
        googleId: findBookData.googleId,
      },
      data: {
        reviewData: {
          averageReview: handleChangeReview(
            findBookData.reviewData.totalReviews,
            findBookData.reviewData.averageReview,
            checkForUserReview.rating,
            rating
          ),
          totalReviews: findBookData.reviewData.totalReviews,
        },
      },
    });
    return NextResponse.json(updateCurrentReview);
  }

  const review = await prisma.review.create({
    data: {
      description: description,
      rating: rating,
      userId: currentUser.id,
      googleBookId: bookId,
    },
  });
  // Add the review to the user's list
  const currentUserReviewIds = [...(currentUser.reviewIds || [])];
  currentUserReviewIds.push(review.id);
  const alterUser = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      reviewIds: currentUserReviewIds,
    },
  });
  // add the review and review data to the book's list
  const currentBookReviewIds = [...(findBookData.reviewIds || [])];
  currentBookReviewIds.push(review.id);
  const alterBook = await prisma.bookData.update({
    where: {
      googleId: findBookData.googleId,
    },
    data: {
      reviewIds: currentBookReviewIds,
      reviewData: {
        averageReview: handleNewReview(
          findBookData.reviewData.totalReviews,
          findBookData.reviewData.averageReview,
          rating
        ),
        totalReviews: findBookData.reviewData.totalReviews + 1,
      },
    },
  });
  return NextResponse.json(review);
}
