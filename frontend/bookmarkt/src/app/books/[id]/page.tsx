import { getSingleBook } from '@/actions/getSingleBook';
import getBookReview from '@/actions/getBookReview';
import { getSingleBookFromDb } from '@/actions/getSingleBookFromDB';
import EmptyBookState from '@/components/Books/EmptyBookState';
import SingleBookReviews from '@/components/Books/SingleBook/SingleBookReviews';
import Image from 'next/image';
import AddBookButton from '@/components/Books/SearchBooks/AddBookButton';
import { getImageSize } from '@/utils/helper';
import getCurrentUserBookshelves from '@/actions/getCurrentUserBookshelves';
import BookDisplayButton from '@/components/Books/SingleBook/BookDisplayButton';
import SingleBookDisplayModal from '@/components/modals/SingleBookDisplayModal';
import { useMemo } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SingleBookRatingDisplay from '@/components/Books/SingleBook/SingleBookRatingDisplay';
import CommunityReviews from '@/components/Books/SingleBook/CommunityReviews';
import getAllReviewsForBookId from '@/actions/getAllReviewsForBookId';

interface PageProps {
  params: { id: string };
  searchParams?: {
    [key: string]: string | string[] | undefined;
  };
}

const SingleBookPage: React.FC<PageProps> = async ({
  params,
  searchParams,
}) => {
  const bookId = params.id;
  const bookInfo = await getSingleBook(bookId);
  const bookInDbInfo = await getSingleBookFromDb(bookId);
  const userReviewInfo = await getBookReview(bookId);

  const allBookReviews = await getAllReviewsForBookId(bookId);

  const reviewCount = allBookReviews?.filter(
    (review) => review.description !== null
  ).length;

  const ratingClassification = () => {
    const classification = {
      total: 0,
      one: 0,
      two: 0,
      three: 0,
      four: 0,
      five: 0,
    };
    if (!allBookReviews) {
      return classification;
    }
    allBookReviews.forEach((review) => {
      switch (review.rating) {
        case 1:
          classification.total++;
          classification.one++;
          break;
        case 2:
          classification.total++;
          classification.two++;
          break;
        case 3:
          classification.total++;
          classification.three++;
          break;
        case 4:
          classification.total++;
          classification.four++;
          break;
        case 5:
          classification.total++;
          classification.five++;
          break;
        default:
          break;
      }
    });
    return classification;
  };

  const chooseRatingClassification = () => {
    if (ratingClassification().total !== 0) {
      return ratingClassification();
    }

    const one = Math.floor(Math.random() * 100);
    const two = Math.floor(Math.random() * 100);
    const three = Math.floor(Math.random() * 100);
    const four = Math.floor(Math.random() * 100);
    const five = Math.floor(Math.random() * 100);
    const total = one + two + three + four + five;
    return {
      one: one,
      two: two,
      three: three,
      four: four,
      five: five,
      total: total,
    };
  };

  const reviewData =
    bookInDbInfo && bookInDbInfo?.reviewData
      ? bookInDbInfo.reviewData
      : { totalReviews: 0, averageReview: 0 };

  // Add Empty book state
  if (!bookInfo) {
    return <EmptyBookState id={params.id} />;
  }

  const currentUserBookshelves = await getCurrentUserBookshelves();
  const findBookshelf = currentUserBookshelves
    ? currentUserBookshelves.find((bookshelf) =>
        bookshelf.googleBooks.find(
          (googleBook) => googleBook.googleBookId === bookId
        )
      )
    : '';

  return (
    <>
      <ToastContainer
        position="bottom-left"
        theme="dark"
        autoClose={5000}
        closeOnClick
        pauseOnHover
      />
      <main className="min-w-[320px] grid grid-cols-6 lg:grid-cols-12 max-w-[1260px] mx-auto">
        <div
          className="px-6 pt-4 col-span-6 md:col-span-2 lg:col-span-3
        "
        >
          <div className="md:sticky md:top-[100px]">
            <div
              className="
      relative w-[35%] max-w-[33%] 
     md:w-full md:max-w-[210px] aspect-[2/3] shadow-lg rounded-tr-md rounded-br-md
     mx-auto md:mb-4
      
      "
            >
              <Image
                src={getImageSize(bookInfo)}
                fill
                sizes="(max-width: 768px) 40vw, 220px"
                className="rounded-tr-lg rounded-br-lg"
                alt={`${bookInfo.volumeInfo.title} cover`}
                placeholder="blur"
                blurDataURL="/images/empty-book.png"
              />
            </div>
            <div
              className="text-center font-semibold text-2xl text-neutral-900 pt-2
          md:hidden
          "
            >
              {bookInfo.volumeInfo.title}
              {bookInfo.volumeInfo.subtitle
                ? `: ${bookInfo.volumeInfo.subtitle}`
                : ''}
            </div>
            <div className="pt-2 text-center text-neutral-500 italic mb-4 md:hidden">
              {bookInfo.volumeInfo.authors
                ? bookInfo.volumeInfo.authors[0]
                : ''}
            </div>
            <div className="md:hidden">
              <SingleBookRatingDisplay
                reviewCount={reviewCount ? reviewCount : 0}
                ratingCount={reviewData.totalReviews}
                averageRating={reviewData.averageReview}
              />
            </div>
            <div className="mx-auto max-w-[260px] mb-4">
              <BookDisplayButton
                label={findBookshelf ? findBookshelf.name : 'Want to read'}
                leftAction="AddToBookshelf"
                background="bg-[#377458] text-white"
                bookId={bookId}
                bookshelves={
                  currentUserBookshelves ? currentUserBookshelves : []
                }
                currentBookshelf={findBookshelf ? findBookshelf.name : ''}
              />
              <BookDisplayButton
                label="Buy on Amazon UK"
                leftAction="Amazon"
                ISBN={
                  bookInfo.volumeInfo.industryIdentifiers &&
                  bookInfo.volumeInfo.industryIdentifiers[1]
                    ? bookInfo.volumeInfo.industryIdentifiers[1].identifier
                    : '/'
                }
                websites={[
                  { url: 'https://www.amazon.co.uk/s?k=', name: 'Amazon UK' },
                  {
                    url: 'https://www.waterstones.com/books/search/term/',
                    name: 'Waterstones',
                  },
                ]}
              />
              {/* <button
            className="rounded-[3rem] border-[0.15rem] border-[#409970] px-6 py-2
          text-[#271c14] text-opacity-90 font-semibold 
          "
          >
            <a
              href={`
              }`}
              target="_blank"
            >
              Buy on Amazon UK
            </a>
          </button> */}
            </div>
            <div className="flex items-center justify-start mb-2">
              <SingleBookReviews
                bookId={bookInfo.id}
                reviewRating={
                  userReviewInfo && userReviewInfo[0]
                    ? userReviewInfo[0].rating
                    : 0
                }
              />
              {/* <div className="text-xl font-semibold">
              {reviewData.averageReview}
            </div> */}
            </div>
            <div className="mx-auto w-fit text-[#1e1915] mb-8">
              Rate this book
            </div>

            <div className="md:hidden">
              {bookInfo.volumeInfo.description ? (
                <div
                  dangerouslySetInnerHTML={{
                    __html: bookInfo.volumeInfo.description,
                  }}
                  className="max-w-[95%]"
                ></div>
              ) : (
                ''
              )}
            </div>
            <section id="community-reviews" className="my-4 md:hidden">
              <h3 className="text-lg font-semibold mb-2 px-2">
                Community reviews
              </h3>
              <SingleBookRatingDisplay
                reviewCount={reviewCount ? reviewCount : 0}
                ratingCount={reviewData.totalReviews}
                averageRating={reviewData.averageReview}
                margin
              />
              {ratingClassification().total === 0 && (
                <>
                  Since this book does not have any reviews yet we have
                  generated some random reviews to make this look nicer
                </>
              )}
              <CommunityReviews reviewInfo={chooseRatingClassification()} />
            </section>
          </div>
        </div>
        <div
          className="hidden md:block md:col-span-4 lg:col-span-9
        overflow-y-hidden relative
        "
        >
          <div className="font-semibold text-4xl text-neutral-900 pt-4">
            {bookInfo.volumeInfo.title}
            {bookInfo.volumeInfo.subtitle
              ? `: ${bookInfo.volumeInfo.subtitle}`
              : ''}
          </div>
          <div className="text-neutral-500 my-4 text-xl">
            {bookInfo.volumeInfo.authors ? bookInfo.volumeInfo.authors[0] : ''}
          </div>
          <SingleBookRatingDisplay
            reviewCount={reviewCount ? reviewCount : 0}
            ratingCount={reviewData.totalReviews}
            averageRating={reviewData.averageReview}
            margin
            hrefLg
          />
          <div className="">
            {bookInfo.volumeInfo.description ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: bookInfo.volumeInfo.description,
                }}
                className="max-w-[95%]"
              ></div>
            ) : (
              ''
            )}
          </div>
          <section id="communityReviews" className="my-4">
            <h3 className="text-lg font-semibold mb-2 px-2">
              Community reviews
            </h3>
            <SingleBookRatingDisplay
              reviewCount={reviewCount ? reviewCount : 0}
              ratingCount={reviewData.totalReviews}
              averageRating={reviewData.averageReview}
              margin
            />
            {ratingClassification().total === 0 && (
              <>
                Since this book does not have any reviews yet we have generated
                some random reviews to make this look nicer
              </>
            )}
            <CommunityReviews reviewInfo={chooseRatingClassification()} />
          </section>
        </div>
      </main>
    </>
  );
};

export default SingleBookPage;
