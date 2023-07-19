import {
  GoogleBookReturnInterface,
  getBooksFromSearch,
} from './getBooksFromSearch';
import getUserBooks from './getUserBooks';

export const getUserBookData = async (query: string, userId: string) => {
  const userBooks = await getUserBooks(userId);
  const userGoogleBooks = userBooks.map((book) => book.googleId);

  const booksFromSearch = await getBooksFromSearch(query);

  if (booksFromSearch && userId !== '') {
    const returnBooks = booksFromSearch.items.map((book) => ({
      ...book,
      isOwned: userGoogleBooks.includes(book.id),
    }));
    const finalBooks: GoogleBookReturnInterface = {
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
