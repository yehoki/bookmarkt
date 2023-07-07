import getCurrentUser from '@/actions/getCurrentUser';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prismadb';

// GET retrieves ALL reviews


// POST creates a review
export async function POST(req: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.error();
  }
  try {
    const body = await req.json();
    const { bookId, title, description, rating } = body;
    if (!bookId || !rating) {
      return NextResponse.error();
    }

    const findBook = await prisma.book.findFirst({
      where: {
        googleId: bookId,
      },
      select: {
        id: true,
        reviewIds: true,
      },
    });

    // If that book already exists in OUR DB
    // 1. Create a new review object
    // 2. Add the reviewId to the user's reviewIds
    // 3. Add the reviewId to the book's reviewIds

    if (findBook && findBook.id && findBook.reviewIds) {
      const newReview = await prisma.review.create({
        data: {
          rating: rating,
          title: title ? title : '',
          description: description ? description : '',
          bookId: findBook?.id,
          userId: currentUser.id,
        },
      });
      const currentUserReviews = [...(currentUser.reviewIds || [])];
      const currentBookReviews = [...(findBook.reviewIds || [])];
      currentUserReviews.push(newReview.id);
      currentBookReviews.push(newReview.id);
      await prisma.user.update({
        where: {
          id: currentUser.id,
        },
        data: {
          reviewIds: currentUserReviews,
        },
      });
      await prisma.book.update({
        where: {
          id: findBook.id,
        },
        data: {
          reviewIds: currentBookReviews,
        },
      });
      return NextResponse.json(newReview);
    } else {
      console.log('Not in the DB');
      return NextResponse.json({ message: 'NotInDb' });
      // When the book does not already exist
      // 1. Add it to the current user's books
      // We return an object which has message field: 'Add book first'
      // 2. Generate the review
      // 3. Add review to both books and users list
    }
  } catch (err: any) {
    console.log('ERROR:', err);
    NextResponse.error();
  }
}
