import { ReviewData } from '@prisma/client';
import { getSingleBook } from '../getSingleBook';

export interface GoogleBookType {
  googleId: string;
  reviewData: ReviewData;
}

export async function getGoogleBooksFromList(
  bookInformation: GoogleBookType[]
) {
  const googleBooks = await Promise.all(
    bookInformation.map(async (book) => {
      const res = await getSingleBook(book.googleId);
      if (res) {
        return {
          ...res,
          reviewData: book.reviewData,
        };
      }
      return null;
    })
  );
  return googleBooks;
}
