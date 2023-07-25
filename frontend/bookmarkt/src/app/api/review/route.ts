import getCurrentUser from '@/actions/getCurrentUser';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prismadb';
import { getSingleBook } from '@/actions/getSingleBook';
import { Book } from '@prisma/client';
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
  const findBook = await prisma.book.findFirst({
    where: {
      googleId: bookId,
    },
    select: {
      id: true,
      reviewIds: true,
      reviewData: true,
    },
  });

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
  console.log('Find', findBookData);

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
        // Change bookId/remove it completely once refactored
        bookId: currentUser.id,
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
  }

  // When the book does not exist
  // 1. Fetch it from the Google Books API
  // 2. Add it to our Database
  // 3. Add the reviewId to the user's reviewIds

  if (!findBook) {
    const googleBook = await getSingleBook(bookId);
    if (!googleBook) {
      return NextResponse.error();
    }
    const newBook = await fetch(
      `http://localhost:3000/api/books/${googleBook.id}`,
      {
        method: 'POST',
        body: JSON.stringify({
          googleId: googleBook.id,
          title: googleBook.volumeInfo.title,
          subtitle: googleBook.volumeInfo.subtitle
            ? googleBook.volumeInfo.subtitle
            : '',
          authors: googleBook.volumeInfo.authors
            ? googleBook.volumeInfo.subtitle
            : [],
          description: googleBook.volumeInfo.description
            ? googleBook.volumeInfo.subtitle
            : '',
          publishedDate: googleBook.volumeInfo.publishedDate
            ? googleBook.volumeInfo.publishedDate
            : '',
          imageLinks: googleBook.volumeInfo.imageLinks
            ? googleBook.volumeInfo.imageLinks
            : {},
        }),
      }
    );
    if (!newBook.ok) {
      return NextResponse.error();
    }
    const newBookData: Book = await newBook.json();

    // Create the new review
    const review = await prisma.review.create({
      data: {
        bookId: newBookData.id,
        description: description,
        rating: rating,
        userId: currentUser.id,
        googleBookId: newBookData.googleId,
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
    const currentBookReviewIds = [...(newBookData.reviewIds || [])];
    currentBookReviewIds.push(review.id);
    const alterBook = await prisma.book.update({
      where: {
        id: newBookData.id,
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
    (review) => review.bookId === findBook.id
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

    const alterBook = await prisma.book.update({
      where: {
        id: findBook.id,
      },
      data: {
        reviewData: {
          averageReview: handleChangeReview(
            findBook.reviewData.totalReviews,
            findBook.reviewData.averageReview,
            checkForUserReview.rating,
            rating
          ),
          totalReviews: findBook.reviewData.totalReviews,
        },
      },
    });
    return NextResponse.json(updateCurrentReview);
  }

  const review = await prisma.review.create({
    data: {
      bookId: findBook.id,
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
  const currentBookReviewIds = [...(findBook.reviewIds || [])];
  currentBookReviewIds.push(review.id);
  const alterBook = await prisma.book.update({
    where: {
      id: findBook.id,
    },
    data: {
      reviewIds: currentBookReviewIds,
      reviewData: {
        averageReview: handleNewReview(
          findBook.reviewData.totalReviews,
          findBook.reviewData.averageReview,
          rating
        ),
        totalReviews: findBook.reviewData.totalReviews + 1,
      },
    },
  });
  return NextResponse.json(review);
}
