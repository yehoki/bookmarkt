import getCurrentUser from '@/actions/getCurrentUser';
import prisma from '@/lib/prismadb';
import { handleDeleteReview } from '@/utils/helper';
import { NextResponse } from 'next/server';

interface IParams {
  bookId: string;
}

// Handles deleting a book from a users collection

// 3. Remove any reviews and review data associated with the book

export async function DELETE(req: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();
  const bookId = params.bookId;

  if (!currentUser) {
    console.log('No current user');
    return NextResponse.error();
  }

  if (!bookId || typeof bookId !== 'string') {
    console.log('BookId incorrect');
    NextResponse.error();
  }

  // 1. Remove the book from the user's book list
  const updateUserBooks = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      googleBookIds:
        currentUser.googleBookIds.filter(
          (googleBookId) => googleBookId !== bookId
        ) || [],
    },
  });

  // 2. Remove the book from the current bookshelf
  const findBookshelfWithBook = currentUser.bookshelves.find((bookshelf) => {
    return bookshelf.googleBooks.find(
      (googleBook) => googleBook.googleBookId === bookId
    );
  });
  if (!findBookshelfWithBook) {
    console.log('Could not find bookshelf associated to this book');
    return NextResponse.error();
  }
  const updateBookshelf = await prisma.bookshelf.update({
    where: {
      id: findBookshelfWithBook.id,
    },
    data: {
      googleBooks: findBookshelfWithBook.googleBooks.filter(
        (googleBook) => googleBook.googleBookId !== bookId
      ),
    },
  });

  // 3.
  const findUserReview = await prisma.review.findFirst({
    where: {
      userId: currentUser.id,
      googleBookId: bookId,
    },
  });

  if (findUserReview) {
    const deleteReview = await prisma.review.delete({
      where: {
        id: findUserReview.id,
      },
    });
    const findBookData = await prisma.bookData.findFirst({
      where: {
        googleId: bookId,
      },
    });
    if (!findBookData) {
      return NextResponse.error();
    }
    const updateBookData = await prisma.bookData.update({
      where: {
        googleId: bookId,
      },
      data: {
        reviewIds: findBookData.reviewIds.filter(
          (reviewId) => reviewId !== findUserReview.id
        ),
        reviewData: {
          averageReview: handleDeleteReview(
            findBookData.reviewData.totalReviews,
            findBookData.reviewData.averageReview,
            findUserReview.rating
          ),
          totalReviews: findBookData.reviewData.totalReviews - 1,
        },
      },
    });
  }
  return NextResponse.json({
    message: 'Book removed successfully',
  });
}
