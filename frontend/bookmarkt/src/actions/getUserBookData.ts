import getCurrentUserBookshelves from './getCurrentUserBookshelves';
import { getBooksFromSearch } from './googleRefactored/getBooksFromSearch';
import getUserBooks from './googleRefactored/getUserBooks';

export const getUserBookData = async (query: string, userId: string) => {
  const userBooks = await getUserBooks(userId);
  const userGoogleBooks = userBooks.map((book) => book.googleId);
  const booksFromSearch = await getBooksFromSearch(query);
  const ownedBooks = booksFromSearch?.items.map((book) => {
    return userGoogleBooks.includes(book.id);
  });
  const userBookshelves = await getCurrentUserBookshelves();

  // const whichBookshelf = () => {
  //   if (userBookshelves && booksFromSearch && userId !== '') {
  //     const returnBooks = booksFromSearch.items.map((bookFromSearch) => {
  //       const foundBook = userBooks.find(
  //         (userBook) => userBook.googleId === bookFromSearch.id
  //       );
  //       if (foundBook) {
  //         // If the user already has the book in their store
  //         const returnBookshelf = userBookshelves.find((bookshelf) =>
  //           bookshelf.books.find((bookItem) => bookItem.bookId === foundBook.id)
  //         );
  //         if (returnBookshelf) {
  //           return {
  //             ...bookFromSearch,
  //             bookshelf: returnBookshelf.name,
  //           };
  //         }
  //       } else {
  //         return {
  //           ...bookFromSearch,
  //           bookshelf: '',
  //         };
  //       }
  //     });
  //     return returnBooks;
  //   }
  // };

  if (booksFromSearch && userId !== '' && userBookshelves) {
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
          };
        }
      }
      return {
        ...googleBook,
        bookshelf: '',
      };
    });

    const finalBooks = {
      items: returnBooks,
      totalItems: booksFromSearch.totalItems,
    };
    return finalBooks;
  } else if (booksFromSearch && userId === '') {
    return booksFromSearch;
  }
  return {
    items: [],
    totalItems: 0,
  };
};
