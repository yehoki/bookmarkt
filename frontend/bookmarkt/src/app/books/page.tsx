import getCurrentUser from '@/actions/getCurrentUser';
import getCurrentUserBooks from '@/actions/getCurrentUserBooks';
import getCurrentUserBookshelves from '@/actions/getCurrentUserBookshelves';
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
  const currentUserBooks = await getCurrentUserBooks();
  const currentUserBookshelves = await getCurrentUserBookshelves();
  const currentBookshelfBooks = async () => {
    const queryShelf = searchParams.shelf;
    const books = await getUserBooksByBookshelf(queryShelf);

    if (books) {
      return books;
    }
    return [];
  };

  const bookshelfBooks = await currentBookshelfBooks();
  // console.log(searchParams);
  // const query =
  //   searchParams && searchParams.q && typeof searchParams.q === 'string'
  //     ? searchParams.q
  //     : '';

  const currentUserBookObject = () => {
    if (
      !searchParams ||
      !searchParams.shelf ||
      searchParams.shelf === '' ||
      searchParams.shelf === 'All'
    ) {
      return currentUserBooks.books.map((book) => {
        const findUserReview = currentUserBooks.reviews.find(
          (review) => review.bookId === book.id
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
          googleId: book.googleId,
          title: book.title,
          authors: book.author,
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
          description: book.description ? book.description : '',
          thumbnail:
            book.imageLinks && book.imageLinks.thumbnail
              ? book.imageLinks.thumbnail
              : '',
          publishedDate: book.publishedDate,
        };
      });
    }
    return bookshelfBooks.map((book) => {
      const findUserReview = currentUserBooks.reviews.find(
        (review) => review.bookId === book.id
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
        googleId: book.googleId,
        title: book.title,
        authors: book.author,
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
        description: book.description ? book.description : '',
        thumbnail:
          book.imageLinks && book.imageLinks.thumbnail
            ? book.imageLinks.thumbnail
            : '',
        publishedDate: book.publishedDate,
      };
    });
  };
  return (
    <>
      <BookReviewModal />
      <div className="pt-6 px-1 mx-auto max-w-[1000px] pb-[25px]">
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
                  {currentUserBookObject().map((book) => (
                    <MyBook
                      key={book.id}
                      bookshelves={book.bookshelves}
                      title={book.title}
                      authors={book.authors}
                      id={book.id}
                      googleId={book.googleId}
                      thumbnailUrl={book.thumbnail}
                      reviewData={book.reviewData}
                      userReview={book.userBookReview}
                      publishedDate={book.publishedDate}
                      description={
                        book.description === '' || !book.description
                          ? 'This book does not have any description yet...'
                          : book.description
                      }
                    />
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
