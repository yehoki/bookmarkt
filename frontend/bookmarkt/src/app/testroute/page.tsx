import getCurrentUser from '@/actions/getCurrentUser';
import { SingleGoogleBookType, getSingleBook } from '@/actions/getSingleBook';
import getCurrentUserBooks from '@/actions/googleRefactored/getCurrentUserBooks';
import getCurrentUserBookshelves from '@/actions/googleRefactored/getCurrentUserBookshelves';
import { getGoogleBooksFromList } from '@/actions/googleRefactored/getGoogleBooksFromList';
import getMostRecentReviews from '@/actions/googleRefactored/getMostRecentReviews';
import { getUserBooksByBookshelf } from '@/actions/googleRefactored/getUserBooksByBookshelf';
import HomeBox from '@/components/HomeBox';
import LoginModal from '@/components/Login/LoginModal';
import Navbar from '@/components/Navbar/Navbar';
import HomeBook from '@/components/home/HomeBook';
import HomeUpdateItem from '@/components/home/HomeUpdateItem';
import SwitchWithFooter from '@/components/home/SwitchWithFooter';
import Image from 'next/image';
import Link from 'next/link';

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
  const userBookshelves = await getCurrentUserBookshelves();
  // fetch all the 'currently reading' books
  const currentlyReadingBookIds = await getUserBooksByBookshelf(
    'Currently reading'
  );
  let firstCurrentlyReadingBook: SingleGoogleBookType | null = null;
  if (
    currentlyReadingBookIds &&
    currentlyReadingBookIds.googleBooks.length !== 0
  ) {
    firstCurrentlyReadingBook = await getSingleBook(
      currentlyReadingBookIds.googleBooks[0].googleBookId
    );
  }

  const currentUserBooks = await getCurrentUserBooks();
  const currentUserGoogleBooks = currentUserBooks.bookData.map((book) => ({
    googleId: book.googleId,
    reviewData: book.reviewData,
  }));
  // currentUserGoogleBooks.push('s1gVAAAAYAAJ');

  const googleBooks = await getGoogleBooksFromList(currentUserGoogleBooks);

  const displayGoogleBooks = googleBooks.map((googleBook) => {
    if (googleBook) {
      return (
        <div key={googleBook.id}>
          {googleBook.volumeInfo.title}
          {googleBook.volumeInfo.authors[0]}
        </div>
      );
    }
  });

  const firstBook = currentUserBooks.bookData[0];
  const firstBookVolumeInfo = await getGoogleBooksFromList(
    firstBook
      ? [{ googleId: firstBook.googleId, reviewData: firstBook.reviewData }]
      : []
  );

  const updateDisplay = mostRecentReviews.map((review) => {
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
      <HomeUpdateItem
        key={review.id}
        bookshelves={userBookshelves ? userBookshelves : []}
        currentBookshelf={bookshelfName ? bookshelfName : ''}
        reviewMadeAt={review.createdAt}
        userName={review.user.name ? review.user.name : 'User'}
        bookTitle="test"
        imageUrl=""
        googleBookId={review.googleBookId}
        reviewRating={review.rating}
        reviewDescription={review.description ? review.description : ''}
        authors={[]}
        bookDescription=""
        userReview={
          userBookReview && userBookReview.rating ? userBookReview.rating : 0
        }
      />
    );
  });

  return (
    <div className="w-full h-full bg-[rgba(244,241,234,0.5)]">
      <Navbar currentUser={currentUser} />
      <div className="md:w-[780px] navOne:w-[1220px] mx-auto pt-[100px] navOne:pt-[50px] min-h-[100dvh] h-full">
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
          {/* <div className="flex flex-col gap-2 mx-auto">
          Review tab
          {mostRecentReviews.length === 0 ? (
            <div className="text-sm text-center">No more updates</div>
          ) : (
            mobileUpdateDisplay
          )}
        </div> */}
        </div>
        <div className="hidden md:flex flex-row justify-between mt-2 ">
          <div className="w-[300px]">
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
                  {/* <HomeBook
                  title={firstTwoBooks[1].title}
                  authors={firstTwoBooks[1].author}
                  imgsrc={
                    firstTwoBooks[1].imageLinks.thumbnail
                      ? firstTwoBooks[1].imageLinks.thumbnail
                      : undefined
                  }
                /> */}
                </div>
              </div>
              <div className="flex gap-[2px] text-xs py-2">
                <Link
                  href="/books"
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
            <HomeBox heading="2023 Reading Challenge" bottomBorder>
              <div className="flex gap-2">
                <div className="w-[110px] h-[130px] bg-[#7584e9]">
                  <div className="text-white text-4xl font-semibold text-center pb-1">
                    2023
                  </div>
                  <div className="w-[105px] h-[40px] relative mx-auto">
                    <Image
                      src="/images/2023-reading-challenge.svg"
                      alt="Reading challenge"
                      fill
                    />
                  </div>
                  <div>
                    <div className="text-white text-[22px] font-semibold uppercase text-center leading-none">
                      Reading
                    </div>
                    <div className="text-white text-md font-semibold uppercase text-center leading-none">
                      Challenge
                    </div>
                  </div>
                </div>
                <div>
                  {/* <div className="text-2xl">
                  {booksReadFromThisYear ? booksReadFromThisYear.length : 0}
                </div>
                <div className="text-lg">
                  {booksReadFromThisYear && booksReadFromThisYear.length > 1
                    ? 'books completed'
                    : 'book completed'}
                </div> */}
                </div>
              </div>
            </HomeBox>
            <HomeBox heading="Want to read" bottomBorder>
              <div>
                {/* {wantToReadBooks && wantToReadBooks.length !== 0 ? (
                <div className="grid grid-cols-3 grid-rows-2 gap-1">
                  {wantToReadBooks.slice(0, 6).map((book) => (
                    <div className="border-[1px]" key={book.id}>
                      <div className="relative w-[96px] h-[118px]">
                        <Image
                          src={
                            book.imageLinks.thumbnail
                              ? book.imageLinks.thumbnail
                              : 'images/empty-book.png'
                          }
                          fill
                          alt={`${book.title} cover`}
                        />
                      </div>
                    </div>
                  ))}
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
              )} */}
              </div>
              <div>
                <Link
                  className="hover:underline 
                text-goodreads-mybooks-green cursor-pointer"
                  href="/books"
                >
                  View all books
                </Link>
              </div>
            </HomeBox>
            <HomeBox heading="Bookshelves">
              <div className="pt-2 text-sm">
                {/* {userBookshelves?.map((bookshelf) => (
                <div key={bookshelf.id} className="flex gap-4 my-[2px]">
                  <Link
                    href={`/books?shelf=${bookshelf.name}`}
                    className="hover:underline text-goodreads-mybooks-green cursor-pointer"
                  >
                    {bookshelf.books.length}
                  </Link>

                  <Link
                    href={`/books?shelf=${bookshelf.name}`}
                    className="hover:underline text-goodreads-mybooks-green cursor-pointer"
                  >
                    {bookshelf.name}
                  </Link>
                </div>
              ))} */}
              </div>
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
                  updateDisplay
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
