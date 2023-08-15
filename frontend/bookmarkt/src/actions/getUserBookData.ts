import { getBooksFromSearch } from './getBooksFromSearch';
import getCurrentUserBookshelves from './getCurrentUserBookshelves';
import getReviewsByUserId from './getReviewsByUserId';
import getUserBooks from './getUserBooks';

export const getUserBookData = async (query: string, userId: string, page: number) => {
  const userBooks = await getUserBooks(userId);
  const userBookData = userBooks?.bookData;
  const userGoogleBooks = userBookData?.map((book) => book.googleId);
  const booksFromSearch = await getBooksFromSearch(query, 10, page);
  const ownedBooks = booksFromSearch?.items.map((book) => {
    return userGoogleBooks?.includes(book.id);
  });
  const userBookshelves = await getCurrentUserBookshelves();

  const userReviews = await getReviewsByUserId(userId);

  if (booksFromSearch && userBookshelves) {
    const returnBooks = booksFromSearch.items.map((googleBook) => {
      const foundBook = userBookData?.find(
        (userBook) => userBook.googleId === googleBook.id
      );
      const findReview = userReviews?.find(
        (review) => review.googleBookId === googleBook.id
      )?.rating;
      const userRating = findReview ? findReview : 0;
      if (foundBook) {
        // If the user already has the book in their store
        const returnBookshelf = userBookshelves.find((bookshelf) =>
          bookshelf.googleBooks.find(
            (bookItem) => bookItem.googleBookId === foundBook.googleId
          )
        );

        if (returnBookshelf) {
          return {
            ...googleBook,
            bookshelf: returnBookshelf.name,
            reviewData: foundBook.reviewData,
            userRating: userRating,
          };
        }
      }
      return {
        ...googleBook,
        bookshelf: '',
        reviewData: {
          averageReview: 0,
          totalReviews: 0,
        },
        userRating: userRating,
      };
    });

    const finalBooks = {
      items: returnBooks,
      totalItems: booksFromSearch.totalItems,
    };
    return finalBooks;
  }
  return {
    items: [],
    totalItems: 0,
  };
};
