import getCurrentUser from '@/actions/getCurrentUser';
import {
  GoogleBookType,
  getGoogleBooksFromList,
} from '@/actions/getGoogleBooksFromList';
import getReviewsByUserId from '@/actions/getReviewsByUserId';
import getUserBooks from '@/actions/getUserBooks';
import { getUserBookselvesByUserId } from '@/actions/getUserBookshelvesByUserId';
import { getUsersBooksFromBookshelf } from '@/actions/getUsersBooksFromBookshelf';
import DisplayBookshelves from '@/components/Books/MyBookSection/DisplayBookshelves';
import MobileMyBook from '@/components/Books/MyBookSection/Mobile/MobileMyBook';
import MobileMyBookDisplay from '@/components/Books/MyBookSection/Mobile/MobileMyBookDisplay';
import MyBook from '@/components/Books/MyBookSection/MyBook';
import DisplayStars from '@/components/Books/Ratings/DisplayStars';
import BookReviewModal from '@/components/modals/BookReviewModal';
import { UserBookData } from '@prisma/client';
import Image from 'next/image';
import { Suspense } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { MdOutlineClear } from 'react-icons/md';

interface UserBooksPageProps {
  params: {
    userId: string;
  };
  searchParams: {
    shelf: string;
    perPage: number;
    page: number;
  };
}

const UserBooksPage: React.FC<UserBooksPageProps> = async ({
  params,
  searchParams,
}) => {
  const userId = params.userId;
  if (!userId || userId === '') {
    return <div>Error: incorrect userID</div>;
  }
  const currentUser = await getCurrentUser();
  const currentUserReviews = await getReviewsByUserId(
    currentUser ? currentUser.id : ''
  );
  const userBooks = await getUserBooks(userId);
  const currentUserBookshelves = await getUserBookselvesByUserId(userId);
  const loggedInUserBookshelves = await getUserBookselvesByUserId(
    currentUser ? currentUser.id : ''
  );
  const currentBookshelfBooks = async () => {
    const queryShelf = searchParams.shelf;
    const books = await getUsersBooksFromBookshelf(queryShelf, userId);
    return books;
  };

  // Combines bookIds with the relevant review data
  // for the current user
  const combineBookIdsAndReviewData = (bookIds: string[]) => {
    return bookIds.map((googleId) => {
      const bookReviewData = userBooks?.bookData.find(
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

  const googleBookIds: GoogleBookType[] = userBooks
    ? userBooks.bookData.map((bookDataItem) => ({
        googleId: bookDataItem.googleId,
        reviewData: bookDataItem.reviewData,
      }))
    : [];
  const currentUserGoogleBooks = await getGoogleBooksFromList(googleBookIds);

  const currentBookshelfGoogleBooks = await getGoogleBooksFromList(
    currentBookshelfBooksWithReviewData
  );

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
          let userReview;
          if (currentUserReviews) {
            const findUserReview = currentUserReviews.find(
              (review) => review.googleBookId === book.id
            );
            if (findUserReview) {
              userReview = {
                rating: findUserReview.rating,
                review: findUserReview.description,
              };
            }
          }
          let currentUserProgress: UserBookData | undefined;
          if (currentUser) {
            const findCurrentUserProgress = currentUser.bookProgress.find(
              (bookProgress) => bookProgress.googleBookId === book.id
            );
            if (findCurrentUserProgress) {
              currentUserProgress = findCurrentUserProgress;
            }
          }
          return {
            bookshelves: currentUserBookshelves ? currentUserBookshelves : [],
            id: book.id,
            googleId: book.id,
            title: book.volumeInfo.title,
            authors: book.volumeInfo.authors ? book.volumeInfo.authors : [],
            reviewData: book.reviewData,
            pageCount: book.volumeInfo.pageCount,
            currentUserBookProgress: currentUserProgress,
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
          let userReview;
          if (currentUserReviews) {
            const findUserReview = currentUserReviews.find(
              (review) => review.googleBookId === bookshelfBook.id
            );
            if (findUserReview) {
              userReview = {
                rating: findUserReview.rating,
                review: findUserReview.description,
              };
            }
          }
          let currentUserProgress: UserBookData | undefined;
          if (currentUser) {
            const findCurrentUserProgress = currentUser.bookProgress.find(
              (bookProgress) => bookProgress.googleBookId === bookshelfBook.id
            );
            if (findCurrentUserProgress) {
              currentUserProgress = findCurrentUserProgress;
            }
          }

          return {
            bookshelves: currentUserBookshelves ? currentUserBookshelves : [],
            googleId: bookshelfBook.id,
            title: bookshelfBook.volumeInfo.title,
            authors: bookshelfBook.volumeInfo.authors
              ? bookshelfBook.volumeInfo.authors
              : [],
            reviewData: bookshelfBook.reviewData,
            pageCount: bookshelfBook.volumeInfo.pageCount,
            currentUserBookProgress: currentUserProgress,
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
    }
  };

  return (
    <>
      <BookReviewModal />
      {/* Mobile mode: < medium breakpoint */}
      <main className="md:hidden pb-[100px]">
        <MobileMyBookDisplay
          myBooks={myBooksObject()}
          isCurrentUser={currentUser ? userId === currentUser.id : false}
        />
      </main>
      <main className="hidden md:block pt-6 px-1 mx-auto max-w-[1000px] pb-[100px]">
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
            <div className="max-w-[200px] mr-5">
              <div className="border-b border-b-slate-300">
                <h3 className="font-semibold">Bookshelves</h3>
                <DisplayBookshelves
                  currentUserId={userId}
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
            <div className="flex-1 max-w-[700px] mx-auto">
              <div
                className="grid md:grid-cols-3 navOne:grid-cols-4 2xl:grid-cols-6 flex-[1_1_100%] 
                gap-[2px] sm:gap-1 lg:gap-4 pt-2"
              >
                <Suspense>
                  {myBooksObject().map((book) => (
                    <>
                      {book && (
                        <MyBook
                          key={book.googleId}
                          bookshelves={
                            loggedInUserBookshelves
                              ? loggedInUserBookshelves
                              : []
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
                          isCurrentUser={
                            currentUser && currentUser.id === userId
                              ? true
                              : false
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
      </main>
    </>
  );
};

export default UserBooksPage;
