import getCurrentUserBooks from '@/actions/getCurrentUserBooks';
import getCurrentUserBookshelves from '@/actions/getCurrentUserBookshelves';
import {
  GoogleBookType,
  getGoogleBooksFromList,
} from '@/actions/getGoogleBooksFromList';
import { getUserBooksByBookshelf } from '@/actions/getUserBooksByBookshelf';
import DisplayBookshelves from '@/components/Books/MyBookSection/DisplayBookshelves';
import MyBook from '@/components/Books/MyBookSection/MyBook';
import BookReviewModal from '@/components/modals/BookReviewModal';
import { Suspense } from 'react';

interface BookPageProps {
  searchParams: {
    shelf: string;
    perPage: string;
  };
}

const Page: React.FC<BookPageProps> = async ({ searchParams }) => {
  const combineBookIdsAndReviewData = (bookIds: string[]) => {
    return bookIds.map((googleId) => {
      const bookReviewData = currentUserBooks.bookData.find(
        (bookData) => bookData.googleId === googleId
      );
      return {
        googleId: googleId,
        reviewData: bookReviewData
          ? bookReviewData.reviewData
          : { averageReview: 0, totalReviews: 0 },
      };
    });
  };

  const currentUserBooks = await getCurrentUserBooks();
  const currentUserBookshelves = await getCurrentUserBookshelves();
  const currentBookshelfBooks = async () => {
    const queryShelf = searchParams.shelf;
    const books = await getUserBooksByBookshelf(queryShelf);
    return books;
  };
  const bookshelfBooks = await currentBookshelfBooks();
  const currentBookshelfGoogleIds = bookshelfBooks
    ? bookshelfBooks.googleBooks.map(
        (bookshelfBook) => bookshelfBook.googleBookId
      )
    : [];
  const currentBookshelfBooksWithReviewData = combineBookIdsAndReviewData(
    currentBookshelfGoogleIds
  );
  // const googleBooks = await getGoogleBooksFromList(bookshelfBooks ? bookshelfBooks.googleBooks. : ['']);

  const googleBookIds: GoogleBookType[] = currentUserBooks.bookData.map(
    (bookDataItem) => ({
      googleId: bookDataItem.googleId,
      reviewData: bookDataItem.reviewData,
    })
  );
  const currentUserGoogleBooks = await getGoogleBooksFromList(googleBookIds);

  const currentBookshelfGoogleBooks = await getGoogleBooksFromList(
    currentBookshelfBooksWithReviewData
  );

  const test = currentUserGoogleBooks.map((book) => {
    if (book) {
      const findUserReview = currentUserBooks.reviews.find(
        (review) => review.googleBookId === book.id
      );
      let userReview;
      if (findUserReview) {
        userReview = {
          rating: findUserReview.rating,
          review: findUserReview.description,
        };
      }
      return {
        bookshelves: currentUserBookshelves ? currentUserBookshelves : [],
        id: book.id,
        googleId: book.id,
        title: book.volumeInfo.title,
        authors: book.volumeInfo.authors,
        reviewData: book.reviewData,
        userBookReview: userReview
          ? {
              rating: userReview.rating,
              review: userReview.review ? userReview.review : undefined,
            }
          : {
              rating: 0,
              review: undefined,
            },
        description: book.volumeInfo.description
          ? book.volumeInfo.description
          : '',
        thumbnail:
          book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail
            ? book.volumeInfo.imageLinks.thumbnail
            : '',
        publishedDate: book.volumeInfo.publishedDate,
      };
    }
    return null;
  });

  const myBooksObject = () => {
    if (
      !searchParams ||
      !searchParams.shelf ||
      searchParams.shelf === '' ||
      searchParams.shelf === 'All' ||
      !bookshelfBooks
    ) {
      return currentUserGoogleBooks.map((book) => {
        if (book) {
          const findUserReview = currentUserBooks.reviews.find(
            (review) => review.googleBookId === book.id
          );
          let userReview;
          if (findUserReview) {
            userReview = {
              rating: findUserReview.rating,
              review: findUserReview.description,
            };
          }
          return {
            bookshelves: currentUserBookshelves ? currentUserBookshelves : [],
            id: book.id,
            googleId: book.id,
            title: book.volumeInfo.title,
            authors: book.volumeInfo.authors,
            reviewData: book.reviewData,
            userBookReview: userReview
              ? {
                  rating: userReview.rating,
                  review: userReview.review ? userReview.review : undefined,
                }
              : {
                  rating: 0,
                  review: undefined,
                },
            description: book.volumeInfo.description
              ? book.volumeInfo.description
              : '',
            thumbnail:
              book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail
                ? book.volumeInfo.imageLinks.thumbnail
                : '',
            publishedDate: book.volumeInfo.publishedDate,
          };
        }
        return null;
      });
    } else {
      return currentBookshelfGoogleBooks.map((bookshelfBook) => {
        if (bookshelfBook) {
          const findUserReview = currentUserBooks.reviews.find(
            (review) => review.googleBookId === bookshelfBook.id
          );
          let userReview;
          if (findUserReview) {
            userReview = {
              rating: findUserReview.rating,
              review: findUserReview.description,
            };
          }
          return {
            bookshelves: currentUserBookshelves ? currentUserBookshelves : [],
            googleId: bookshelfBook.id,
            title: bookshelfBook.volumeInfo.title,
            authors: bookshelfBook.volumeInfo.authors
              ? bookshelfBook.volumeInfo.authors
              : [],
            reviewData: bookshelfBook.reviewData,
            userBookReview: userReview
              ? {
                  rating: userReview.rating,
                  review: userReview.review ? userReview.review : undefined,
                }
              : {
                  rating: 0,
                  review: undefined,
                },
            description: bookshelfBook.volumeInfo.description
              ? bookshelfBook.volumeInfo.description
              : '',
            thumbnail:
              bookshelfBook.volumeInfo.imageLinks &&
              bookshelfBook.volumeInfo.imageLinks.thumbnail
                ? bookshelfBook.volumeInfo.imageLinks.thumbnail
                : '',
            publishedDate: bookshelfBook.volumeInfo.publishedDate
              ? bookshelfBook.volumeInfo.publishedDate
              : '',
          };
        }
        return null;
      });

      //   return bookshelfBooks.map((book) => {
      //     const findUserReview = currentUserBooks.reviews.find(
      //       (review) => review.bookId === book.id
      //     );
      //     let userReview;
      //     if (findUserReview) {
      //       userReview = {
      //         rating: findUserReview.rating,
      //         review: findUserReview.description,
      //       };
      //     }
      //     return {
      //       bookshelves: currentUserBookshelves ? currentUserBookshelves : [],
      //       id: book.id,
      //       googleId: book.googleId,
      //       title: book.title,
      //       authors: book.author,
      //       reviewData: book.reviewData,
      //       userBookReview: userReview
      //         ? {
      //             rating: userReview.rating,
      //             review: userReview.review ? userReview.review : undefined,
      //           }
      //         : {
      //             rating: 0,
      //             review: undefined,
      //           },
      //       description: book.description ? book.description : '',
      //       thumbnail:
      //         book.imageLinks && book.imageLinks.thumbnail
      //           ? book.imageLinks.thumbnail
      //           : '',
      //       publishedDate: book.publishedDate,
      //     };
      //   });
      // };
    }
  };

  // const currentUserBookObject = () => {

  //   // If there is no current filter applied from the URL
  // if (
  //   !searchParams ||
  //   !searchParams.shelf ||
  //   searchParams.shelf === '' ||
  //   searchParams.shelf === 'All'
  // ) {
  //     return currentUserBooks.books.map((book) => {
  //       const findUserReview = currentUserBooks.reviews.find(
  //         (review) => review.bookId === book.id
  //       );
  //       let userReview;
  //       if (findUserReview) {
  //         userReview = {
  //           rating: findUserReview.rating,
  //           review: findUserReview.description,
  //         };
  //       }
  //       return {
  //         bookshelves: currentUserBookshelves ? currentUserBookshelves : [],
  //         id: book.id,
  //         googleId: book.googleId,
  //         title: book.title,
  //         authors: book.author,
  //         reviewData: book.reviewData,
  //         userBookReview: userReview
  //           ? {
  //               rating: userReview.rating,
  //               review: userReview.review ? userReview.review : undefined,
  //             }
  //           : {
  //               rating: 0,
  //               review: undefined,
  //             },
  //         description: book.description ? book.description : '',
  //         thumbnail:
  //           book.imageLinks && book.imageLinks.thumbnail
  //             ? book.imageLinks.thumbnail
  //             : '',
  //         publishedDate: book.publishedDate,
  //       };
  //     });
  //   }
  //   return bookshelfBooks.map((book) => {
  //     const findUserReview = currentUserBooks.reviews.find(
  //       (review) => review.bookId === book.id
  //     );
  //     let userReview;
  //     if (findUserReview) {
  //       userReview = {
  //         rating: findUserReview.rating,
  //         review: findUserReview.description,
  //       };
  //     }
  //     return {
  //       bookshelves: currentUserBookshelves ? currentUserBookshelves : [],
  //       id: book.id,
  //       googleId: book.googleId,
  //       title: book.title,
  //       authors: book.author,
  //       reviewData: book.reviewData,
  //       userBookReview: userReview
  //         ? {
  //             rating: userReview.rating,
  //             review: userReview.review ? userReview.review : undefined,
  //           }
  //         : {
  //             rating: 0,
  //             review: undefined,
  //           },
  //       description: book.description ? book.description : '',
  //       thumbnail:
  //         book.imageLinks && book.imageLinks.thumbnail
  //           ? book.imageLinks.thumbnail
  //           : '',
  //       publishedDate: book.publishedDate,
  //     };
  //   });
  // };
  return (
    <>
      <BookReviewModal />
      <div className="pt-6 px-1 mx-auto max-w-[1000px] pb-[100px]">
        <div className="pb-2 border-b border-b-slate-300 flex items-center justify-between">
          <h2
            className="
        font-bold
        text-xl
        text-goodreads-mybooks-green
        "
          >
            My Books
          </h2>
          <div>Search</div>
        </div>
        {/* below header */}
        <div>
          <div className="flex flex-row">
            {/* Left col */}
            <div className="max-w-[200px]">
              <div className="border-b border-b-slate-300">
                <h3 className="font-semibold">Bookshelves</h3>
                <DisplayBookshelves
                  bookshelves={
                    currentUserBookshelves ? currentUserBookshelves : []
                  }
                />
              </div>
              <div>
                <h3>Your reading activity</h3>
              </div>
              <div>
                <h3>Add books</h3>
              </div>
              <div>
                <h3>Tools</h3>
              </div>
            </div>
            {/* Right col */}
            <div className="flex-1 max-w-[700px]">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 flex-[1_1_100%] gap-[2px] sm:gap-1 lg:gap-2 pt-2">
                <Suspense>
                  {myBooksObject().map((book) => (
                    <>
                      {book && (
                        <MyBook
                          key={book.googleId}
                          bookshelves={
                            currentUserBookshelves ? currentUserBookshelves : []
                          }
                          title={book.title}
                          authors={book.authors ? book.authors : []}
                          id={book.googleId}
                          googleId={book.googleId}
                          thumbnailUrl={book.thumbnail}
                          reviewData={book.reviewData}
                          userReview={book.userBookReview}
                          publishedDate={
                            book.publishedDate ? book.publishedDate : ''
                          }
                          description={
                            book.description === '' || !book.description
                              ? 'This book does not have any description yet...'
                              : book.description
                          }
                        />
                      )}
                    </>
                  ))}
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Page;
