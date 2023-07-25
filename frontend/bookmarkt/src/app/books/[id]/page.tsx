import { getSingleBook } from '@/actions/getSingleBook';
import getBookReview from '@/actions/googleRefactored/getBookReview';
import { getSingleBookFromDb } from '@/actions/googleRefactored/getSingleBookFromDb';
import EmptyBookState from '@/components/Books/EmptyBookState';
import SingleBookReviews from '@/components/Books/SingleBook/SingleBookReviews';
import Image from 'next/image';

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
  // console.log(bookInfo?.volumeInfo.industryIdentifiers);
  const bookInDbInfo = await getSingleBookFromDb(bookId);
  const userReviewInfo = await getBookReview(bookId);

  const reviewData =
    bookInDbInfo && bookInDbInfo?.reviewData
      ? bookInDbInfo.reviewData
      : { totalReviews: 0, averageReview: 0 };

  // Add Empty book state
  if (!bookInfo) {
    return <EmptyBookState id={params.id} />;
  }

  const getImageSize = () => {
    if (
      !bookInfo.volumeInfo.imageLinks ||
      !bookInfo.volumeInfo ||
      !bookInfo.volumeInfo.imageLinks.thumbnail
    ) {
      return '/images/empty-book.png';
    }
    if (bookInfo.volumeInfo.imageLinks.extraLarge) {
      return bookInfo.volumeInfo.imageLinks.extraLarge;
    }
    if (bookInfo.volumeInfo.imageLinks.large) {
      return bookInfo.volumeInfo.imageLinks.large;
    }
    if (bookInfo.volumeInfo.imageLinks.medium) {
      return bookInfo.volumeInfo.imageLinks.medium;
    }
    return bookInfo.volumeInfo.imageLinks.thumbnail;
  };

  return (
    <main>
      {/* Right Col */}
      <div className="flex flex-col items-center mx-auto px-6 pt-4">
        <div
          className="
      relative w-[35%] max-w-[33%] md:max-w-[210px] aspect-[2/3] shadow-lg rounded-tr-md rounded-br-md"
        >
          <Image
            src={getImageSize()}
            fill
            sizes="(max-width: 768px) 40vw, 220px"
            className="rounded-tr-lg rounded-br-lg"
            alt={`${bookInfo.volumeInfo.title} cover`}
            placeholder="blur"
            blurDataURL="/images/empty-book.png"
          />
        </div>
        <div className="text-center font-bold text-xl text-neutral-900 pt-2">
          {bookInfo.volumeInfo.title}
          {bookInfo.volumeInfo.subtitle
            ? `: ${bookInfo.volumeInfo.subtitle}`
            : ''}
        </div>
        <div className="pt-2 text-center text-neutral-500 italic">
          {bookInfo.volumeInfo.authors ? bookInfo.volumeInfo.authors[0] : ''}
        </div>
        <div className="flex gap-4 items-center">
          <SingleBookReviews
            bookId={bookInfo.id}
            reviewRating={userReviewInfo[0] ? userReviewInfo[0].rating : 0}
          />
          <div className="text-xl font-semibold">
            {reviewData.averageReview}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div></div>
          <div>
            <a
              href={`https://www.amazon.co.uk/s?k=${
                bookInfo.volumeInfo.industryIdentifiers
                  ? bookInfo.volumeInfo.industryIdentifiers[1].identifier
                  : '/'
              }`}
              target="_blank"
            >
              Buy on Amazon
            </a>
          </div>
        </div>
        <div>
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
      </div>
    </main>
  );
};

export default SingleBookPage;
