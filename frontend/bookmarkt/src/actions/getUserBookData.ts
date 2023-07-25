
import { getBooksFromSearch } from './getBooksFromSearch';
import getCurrentUserBookshelves from './getCurrentUserBookshelves';
import getUserBooks from './getUserBooks';

export const getUserBookData = async (query: string, userId: string) => {
  const userBooks = await getUserBooks(userId);
  const userGoogleBooks = userBooks.map((book) => book.googleId);
  const booksFromSearch = await getBooksFromSearch(query);
  const ownedBooks = booksFromSearch?.items.map((book) => {
    return userGoogleBooks.includes(book.id);
  });
  const userBookshelves = await getCurrentUserBookshelves();

  if (booksFromSearch && userBookshelves) {
    const returnBooks = booksFromSearch.items.map((googleBook) => {
      const foundBook = userBooks.find(
        (userBook) => userBook.googleId === googleBook.id
      );
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
