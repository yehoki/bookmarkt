import {
  GoogleBookInterface,
  GoogleBookItemsInterface,
} from './getBooksFromSearch';
import getCurrentUser from './getCurrentUser';

export async function getGoogleBooksFromUser(inputBooks: GoogleBookInterface) {
  // const currentUser = await getCurrentUser();
  // if (!currentUser) {
  //   return null;
  // }

  // const userBooks = await prisma.user.findFirst({
  //   where: {
  //     id: currentUser.id,
  //   },
  //   include: {
  //     books: true,
  //   },
  // });

  // if (!userBooks) {
  //   return [];
  // }
  // // const userBookData = userBooks[0].books.map((book) => ({
  // //   ...book,
  // // }));

  // const userGoogleBooks = userBooks.books.map((book) => book.googleId);

  // // // Check for all books that are not already in our database

  // const returnBooks = inputBooks.items.map((book) => ({
  //   ...book,
  //   userOwns: userGoogleBooks.includes(book.id),
  // }));

  // return { items: returnBooks, totalItems: inputBooks.totalItems };
  return { totalItems: 0, items: [] };
}
