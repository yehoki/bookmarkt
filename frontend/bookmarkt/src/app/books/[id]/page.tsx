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
    <main>
      {/* Right Col */}
      <div className="px-6 pt-4">
        <div
          className="
      relative w-[35%] max-w-[33%] md:max-w-[210px] aspect-[2/3] shadow-lg rounded-tr-md rounded-br-md
      mx-auto"
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
        <div className="text-center font-bold text-xl text-neutral-900 pt-2">
          {bookInfo.volumeInfo.title}
          {bookInfo.volumeInfo.subtitle
            ? `: ${bookInfo.volumeInfo.subtitle}`
            : ''}
        </div>
        <div className="pt-2 text-center text-neutral-500 italic mb-4">
          {bookInfo.volumeInfo.authors ? bookInfo.volumeInfo.authors[0] : ''}
        </div>
        <div className="mx-auto max-w-[260px]">
          <BookDisplayButton label="Bookshelf" />
          <AddBookButton
            bookId={bookId}
            bookshelves={currentUserBookshelves ? currentUserBookshelves : []}
            currentBookshelf={findBookshelf ? findBookshelf.name : ''}
          />
          <BookDisplayButton label="Buy on Amazon UK" />
          <button
            className="rounded-[3rem] border-[0.15rem] border-[#409970] px-6 py-2
          text-[#271c14] text-opacity-90 font-semibold 
          "
          >
            <a
              href={`https://www.amazon.co.uk/s?k=${
                bookInfo.volumeInfo.industryIdentifiers
                  ? bookInfo.volumeInfo.industryIdentifiers[1].identifier
                  : '/'
              }`}
              target="_blank"
            >
              Buy on Amazon UK
            </a>
          </button>
        </div>
        <div className="flex gap-4 items-center">
          <SingleBookReviews
            bookId={bookInfo.id}
            reviewRating={
              userReviewInfo && userReviewInfo[0] ? userReviewInfo[0].rating : 0
            }
          />
          <div className="text-xl font-semibold">
            {reviewData.averageReview}
          </div>
        </div>
        <div>Rate this book</div>

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
