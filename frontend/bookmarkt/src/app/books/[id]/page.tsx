import getBookReview from '@/actions/getBookReview';
import { GoogleBookItemsInterface } from '@/actions/getBooksFromSearch';
import { getSingleBook } from '@/actions/getSingleBook';
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
  const userReviewInfo = await getBookReview(bookId);

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
    <div
      className="flex flex-col items-center mx-auto px-6 pt-4
    "
    >
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
      <SingleBookReviews
        bookId={bookInfo.id}
        reviewRating={userReviewInfo[0] ? userReviewInfo[0].rating : 0}
      />
      <div>Add to Reading and buy buttons</div>
      <div>
        {bookInfo.volumeInfo.description ? bookInfo.volumeInfo.description : ''}
      </div>
    </div>
  );
};

export default SingleBookPage;
