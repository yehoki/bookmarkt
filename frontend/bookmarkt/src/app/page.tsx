import getCurrentUser from '@/actions/getCurrentUser';
import { getSingleBook } from '@/actions/getSingleBook';
import { GoogleBookItemInterface } from '@/actions/getBooksFromSearch';
import getBooksReadThisYear from '@/actions/getBooksReadThisYear';
import getCurrentUserBooks from '@/actions/getCurrentUserBooks';
import getCurrentUserBookshelves from '@/actions/getCurrentUserBookshelves';
import { getGoogleBooksFromList } from '@/actions/getGoogleBooksFromList';
import getMostRecentReviews from '@/actions/getMostRecentReviews';
import { getUserBooksByBookshelf } from '@/actions/getUserBooksByBookshelf';
import HomeBox from '@/components/HomeBox';
import LoginModal from '@/components/Login/LoginModal';
import Navbar from '@/components/Navbar/Navbar';
import HomeBook from '@/components/home/HomeBook';
import HomeUpdateItem from '@/components/home/HomeUpdateItem';
import HomeUpdateItemMobile from '@/components/home/HomeUpdateItemMobile';
import SwitchWithFooter from '@/components/home/SwitchWithFooter';
import Image from 'next/image';
import Link from 'next/link';
import FooterGithubLink from '@/components/FooterGithubLink';
import getUserById from '@/actions/getUserById';
import HomeReadingChallenge from '@/components/home/HomeReadingChallenge';

export default async function Page() {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return (
      <>
        <Navbar currentUser={currentUser} />
        <LoginModal />
      </>
    );
  }

  const mostRecentReviews = await getMostRecentReviews();
  const currentUserBooks = await getCurrentUserBooks();
  const userBookshelves = await getCurrentUserBookshelves();
  const currentlyReadingBookIds = await getUserBooksByBookshelf(
    'Currently reading'
  );
  const wantToReadBookIds = await getUserBooksByBookshelf('Want to read');
  const booksReadFromThisYear = await getBooksReadThisYear();

  let firstCurrentlyReadingBook: GoogleBookItemInterface | null = null;
  if (
    currentlyReadingBookIds &&
    currentlyReadingBookIds.googleBooks.length !== 0
  ) {
    firstCurrentlyReadingBook = await getSingleBook(
      currentlyReadingBookIds.googleBooks[0].googleBookId
    );
  }

  const wantToReadGoogleBookIds = wantToReadBookIds
    ? wantToReadBookIds.googleBooks.map((googleBook) => googleBook.googleBookId)
    : [];

  const readThisYearGoogleBookIds = booksReadFromThisYear
    ? booksReadFromThisYear.map((googleBook) => googleBook.googleBookId)
    : [];

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

  const wantToReadBooksWithReviewData = combineBookIdsAndReviewData(
    wantToReadGoogleBookIds
  );
  const readThisYearWithReviewData = combineBookIdsAndReviewData(
    readThisYearGoogleBookIds
  );

  const wantToReadGoogleBooks = await getGoogleBooksFromList(
    wantToReadBooksWithReviewData
  );

  const booksReadThisYear = await getGoogleBooksFromList(
    readThisYearWithReviewData
  );

  const frontPageUpdateMap = await Promise.all(
    mostRecentReviews.map(async (review) => {
      const googleBook = await getSingleBook(review.googleBookId);
      const userData = await getUserById(review.userId);
      const bookshelfName = currentUserBooks.bookData.find(
        (book) => book.googleId === review.bookData.googleId
      )
        ? userBookshelves?.find((bookshelf) =>
            bookshelf.googleBooks.find(
              (bookshelfBook) =>
                bookshelfBook.googleBookId === review.googleBookId
            )
          )?.name
        : '';
      const userBookReview = currentUserBooks.reviews.find(
        (userReview) => userReview.googleBookId === review.googleBookId
      );
      return (
        googleBook && {
          id: review.id,
          userId: review.userId,
          bookshelves: userBookshelves ? userBookshelves : [],
          currentBookshelf: bookshelfName ? bookshelfName : '',
          reviewMadeAt: review.createdAt,
          userName: review.user.name ? review.user.name : 'User',
          bookTitle: googleBook.volumeInfo.title,
          imageUrl:
            googleBook.volumeInfo.imageLinks &&
            googleBook.volumeInfo.imageLinks.thumbnail
              ? googleBook.volumeInfo.imageLinks.thumbnail
              : '',
          googleBookId: googleBook.id,
          reviewRating: review.rating,
          reviewDescription: review.description ? review.description : '',
          authors: googleBook.volumeInfo.authors
            ? googleBook.volumeInfo.authors
            : [],
          bookDescription: googleBook.volumeInfo.description
            ? googleBook.volumeInfo.description
            : '',
          userReview:
            userBookReview && userBookReview.rating ? userBookReview.rating : 0,
          userImage: userData && userData.image ? userData.image : '',
        }
      );
    })
  );

  const mobileDisplay = frontPageUpdateMap.map((frontPageItem) => {
    return (
      frontPageItem && (
        <HomeUpdateItemMobile
          key={frontPageItem.id}
          reviewId={frontPageItem.id}
          userId={frontPageItem.userId}
          reviewMadeAt={frontPageItem.reviewMadeAt}
          userName={frontPageItem.userName}
          bookTitle={frontPageItem.bookTitle}
          bookAuthors={frontPageItem.authors}
          googleBookId={frontPageItem.googleBookId}
          reviewRating={frontPageItem.reviewRating}
          reviewDescription={frontPageItem.reviewDescription}
          imageUrl={frontPageItem.imageUrl}
          userImage={frontPageItem.userImage}
        />
      )
    );
  });

  const desktopDisplay = frontPageUpdateMap.map((frontPageItem) => {
    return (
      frontPageItem && (
        <HomeUpdateItem
          key={frontPageItem.id}
          reviewId={frontPageItem.id}
          userId={frontPageItem.userId}
          bookshelves={frontPageItem.bookshelves}
          currentBookshelf={frontPageItem.currentBookshelf}
          reviewMadeAt={frontPageItem.reviewMadeAt}
          userName={frontPageItem.userName}
          bookTitle={frontPageItem.bookTitle}
          imageUrl={frontPageItem.imageUrl}
          googleBookId={frontPageItem.googleBookId}
          reviewRating={frontPageItem.reviewRating}
          reviewDescription={frontPageItem.reviewDescription}
          authors={frontPageItem.authors}
          bookDescription={frontPageItem.bookDescription}
          userReview={frontPageItem.userReview}
          userImage={frontPageItem.userImage}
        />
      )
    );
  });
  const mobileUpdateDisplay = await Promise.all(
    mostRecentReviews.map(async (review) => {})
  );

  return (
    <div className="w-full h-full bg-[rgba(244,241,234,0.5)]">
      <Navbar currentUser={currentUser} />
      <div className="md:w-[780px] navOne:w-[1200px] mx-auto pt-[100px] navOne:pt-[50px] min-h-[100dvh] h-full">
        <div className="md:hidden mx-auto max-w-[625px] px-2">
          <div className="border-[#eeeeee] border-[1px] my-2">
            <div className="relative w-full aspect-[14/3] ">
              <Image
                src="/images/goodreads-span.png"
                fill
                alt="Goodreads span image"
              />
            </div>
            <div className="bg-white p-2 ">
              <div className="text-lg">
                Discover the Biggest Books of Summer
              </div>
              <div className="text-base text-neutral-400">
                Check out your fellow Goodreads members` most anticipated titles
                for the season.
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 mx-auto">
            Review tab
            {mostRecentReviews.length === 0 ? (
              <div className="text-sm text-center">No more updates</div>
            ) : (
              mobileDisplay
            )}
          </div>
        </div>
        <div className="hidden md:flex flex-row justify-between mt-2 ">
          <div className="w-[300px] pl-2 mr-5">
            <HomeBox heading="Currently reading" bottomBorder>
              <div>
                <div className="flex flex-col gap-2 py-2">
                  {firstCurrentlyReadingBook !== null && (
                    <HomeBook
                      title={firstCurrentlyReadingBook.volumeInfo.title}
                      authors={firstCurrentlyReadingBook.volumeInfo.authors}
                      googleBookId={firstCurrentlyReadingBook.id}
                      imgsrc={
                        firstCurrentlyReadingBook.volumeInfo.imageLinks &&
                        firstCurrentlyReadingBook.volumeInfo.imageLinks
                          .thumbnail
                          ? firstCurrentlyReadingBook.volumeInfo.imageLinks
                              .thumbnail
                          : ''
                      }
                    />
                  )}
                </div>
              </div>
              <div className="flex gap-[2px] text-xs py-2">
                <Link
                  href={`/books/user/${currentUser.id}`}
                  className="text-goodreads-mybooks-green hover:underline"
                >
                  View all books
                </Link>
                <div className="text-goodreads-mybooks-green"> · </div>
                <div>Add a book</div>
                <div className="text-goodreads-mybooks-green"> · </div>
                <div>General update</div>
              </div>
            </HomeBox>
            <HomeBox heading="News & Interviews" onlyTwoRows bottomBorder>
              <div></div>
            </HomeBox>
            <HomeBox heading="2023 Reading Challenge" bottomBorder>
              <HomeReadingChallenge
                readingChallenge={currentUser.readingChallenge}
                booksReadThisYear={readThisYearGoogleBookIds.length}
              />
            </HomeBox>
            <HomeBox heading="Want to read" bottomBorder>
              <div>
                {wantToReadGoogleBooks && wantToReadGoogleBooks.length !== 0 ? (
                  <div className="grid grid-cols-3 grid-rows-2 gap-1">
                    {wantToReadGoogleBooks.slice(0, 6).map((book) => {
                      return (
                        book && (
                          <Link href={`/books/${book.id}`}>
                            <div className="border-[1px]" key={book.id}>
                              <div className="relative w-[96px] h-[118px]">
                                <Image
                                  src={
                                    book.volumeInfo.imageLinks &&
                                    book.volumeInfo.imageLinks.thumbnail
                                      ? book.volumeInfo.imageLinks.thumbnail
                                      : 'images/empty-book.png'
                                  }
                                  fill
                                  alt={`${book.volumeInfo.title} cover`}
                                />
                              </div>
                            </div>
                          </Link>
                        )
                      );
                    })}
                  </div>
                ) : (
                  <div className="flex items-center gap-1">
                    <div>
                      <div className="relative w-[65px] h-[75px]">
                        <Image
                          src="images/read-next.svg"
                          fill
                          alt="Read next"
                        />
                      </div>
                    </div>

                    <div className="whitespace-nowrap text-sm">
                      What do you want to read next?
                    </div>
                  </div>
                )}
              </div>
              <div>
                <Link
                  className="hover:underline 
                text-goodreads-mybooks-green cursor-pointer"
                  href={`/books/user/${currentUser.id}`}
                >
                  View all books
                </Link>
              </div>
            </HomeBox>
            <HomeBox heading="Bookshelves">
              <div className="pt-2 text-sm">
                {userBookshelves &&
                  userBookshelves.map((bookshelf) => (
                    <div key={bookshelf.id} className="flex gap-4 my-[2px]">
                      <Link
                        href={`/books/user/${currentUser.id}?shelf=${bookshelf.name}`}
                        className="hover:underline text-goodreads-mybooks-green cursor-pointer"
                      >
                        {bookshelf.googleBooks.length}
                      </Link>

                      <Link
                        href={`/books/user/${currentUser.id}?shelf=${bookshelf.name}`}
                        className="hover:underline text-goodreads-mybooks-green cursor-pointer"
                      >
                        {bookshelf.name}
                      </Link>
                    </div>
                  ))}
              </div>
            </HomeBox>
            <HomeBox heading="Recommendations" onlyTwoRows>
              <div></div>
            </HomeBox>
            <HomeBox heading="Improve Recommendations" onlyTwoRows>
              <div></div>
            </HomeBox>
            <HomeBox heading="" onlyTwoRows>
              <FooterGithubLink />
            </HomeBox>
          </div>
          <div className="w-[460px] navOne:w-[560px]">
            <div className="border-[#eeeeee] border-[1px]">
              <div className="relative w-full h-[100px] ">
                <Image
                  src="/images/goodreads-span.png"
                  fill
                  sizes="100vw"
                  alt="Goodreads span image"
                />
              </div>
              <div className="bg-white p-2 ">
                <div className="text-lg">
                  Discover the Biggest Books of Summer
                </div>
                <div className="text-base text-neutral-400">
                  Check out your fellow Goodreads members` most anticipated
                  titles for the season.
                </div>
              </div>
            </div>
            <div className="mt-2">
              <div className="uppercase font-medium">Updates</div>
              <div className="flex flex-col gap-4 pt-2">
                {mostRecentReviews.length === 0 ? (
                  <div className="text-sm text-center">No more updates</div>
                ) : (
                  desktopDisplay
                )}
              </div>
            </div>
          </div>
          <SwitchWithFooter />
        </div>
      </div>
    </div>
  );
}
