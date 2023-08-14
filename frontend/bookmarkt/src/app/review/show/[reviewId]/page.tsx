import getBookReview from '@/actions/getBookReview';
import getCurrentUser from '@/actions/getCurrentUser';
import getReviewByReviewId from '@/actions/getReviewByReviewId';
import { getSingleBook } from '@/actions/getSingleBook';
import DisplayStars from '@/components/Books/Ratings/DisplayStars';
import AddBookButton from '@/components/Books/SearchBooks/AddBookButton';
import Image from 'next/image';
import Link from 'next/link';

interface SingleReviewPageProps {
  params: { reviewId: string };
}

const SingleReviewPage: React.FC<SingleReviewPageProps> = async ({
  params,
}) => {
  const reviewId = params.reviewId;
  const review = await getReviewByReviewId(reviewId);
  if (!review) {
    return <div>Empty review state - does not exist</div>;
  }
  const bookInfo = await getSingleBook(review.googleBookId);
  const currentUser = await getCurrentUser();
  const findCurrentBookshelf = () => {
    if (currentUser) {
      const userBookshelves = currentUser.bookshelves.map((bookshelf) => ({
        books: bookshelf.googleBooks,
        name: bookshelf.name,
      }));
      const findBook = userBookshelves.find((bookshelf) =>
        bookshelf.books.find(
          (book) => book.googleBookId === review.googleBookId
        )
      );
      if (findBook) {
        return findBook.name;
      }
    }
    return '';
  };
  return (
    <>
      <main className="hidden md:block w-[970px] mx-auto mt-4 ">
        <h1 className="text-2xl my-2">{bookInfo?.volumeInfo.title}</h1>
        <section className="flex gap-8 px-2 w-[625px] text-sm">
          <div>
            <div className="relative w-[140px] aspect-[2/3] mb-2">
              <Image
                src={`${
                  bookInfo &&
                  bookInfo.volumeInfo.imageLinks &&
                  bookInfo.volumeInfo.imageLinks.thumbnail
                    ? bookInfo.volumeInfo.imageLinks.thumbnail
                    : '/images/empty-book.png'
                }`}
                alt="Book cover"
                fill
                className="border"
              />
            </div>
            <AddBookButton
              bookId={review.googleBookId}
              bookshelves={currentUser ? currentUser.bookshelves : []}
              currentBookshelf={findCurrentBookshelf()}
            />
          </div>
          <div className="relative">
            <h3 className="text-base font-semibold">
              {bookInfo?.volumeInfo.title}
            </h3>
            <h4 className="text-xs mb-1">
              By{' '}
              {bookInfo?.volumeInfo.authors
                ? bookInfo?.volumeInfo.authors[0]
                : ''}
            </h4>
            <div className="flex gap-2 mb-2">
              <div className="relative w-[50px] aspect-[3/4]">
                <Image
                  src={`${
                    review.user.image
                      ? review.user.image
                      : '/images/empty-user.png'
                  }`}
                  alt="User image"
                  fill
                />
              </div>
              <div>
                <div className="text-xs">
                  <Link
                    className="hover:underline"
                    href={`/user/show/${review.user.id}`}
                  >
                    {review.user.name}
                  </Link>
                  &apos;s review
                </div>
                <DisplayStars averageRating={review.rating} size={14} />
              </div>
            </div>
            <div className="text-base">{review.description}</div>
          </div>
        </section>
        <section>Reading progress</section>
        <section>Comments</section>
      </main>
      <main className="md:hidden">
        <section className="flex py-3 px-3 gap-3">
          <div className="relative w-[30px] h-[30px]">
            <Image
              src={`${
                review.user.image ? review.user.image : '/images/empty-user.png'
              }`}
              alt="User image"
              fill
              className="rounded-full border-[#D8D8D8] border"
            />
          </div>
          <div className="flex-1 text-sm">
            <div>
              <h2 className="flex items-center gap-1">
                <Link
                  href={`/user/show/${review.user.id}`}
                  className="hover:underline 
                  text-goodreads-mybooks-green font-semibold"
                >
                  {review.user.name ? review.user.name : 'User'}
                </Link>
                rated a book{' '}
                <DisplayStars averageRating={review.rating} size={12} />{' '}
              </h2>
              <h3 className="text-xs text-neutral-400">
                {review.createdAt.toUTCString()}
              </h3>
            </div>
            <div className="flex gap-3 my-2">
              <div className="relative w-[55px] h-[85px] aspect-[3/2]">
                <Image
                  src={`${
                    bookInfo &&
                    bookInfo.volumeInfo.imageLinks &&
                    bookInfo.volumeInfo.imageLinks.thumbnail
                      ? bookInfo.volumeInfo.imageLinks.thumbnail
                      : '/images/empty-book.png'
                  }`}
                  alt="Book cover"
                  fill
                  className="border"
                />
              </div>
              <div>
                <h4>
                  <Link
                    className="hover:underline"
                    href={`/book/${bookInfo ? bookInfo.id : ''}`}
                  >
                    {bookInfo?.volumeInfo.title}
                  </Link>
                </h4>
                <h5 className="text-neutral-400">
                  by{' '}
                  {bookInfo && bookInfo.volumeInfo.authors
                    ? bookInfo?.volumeInfo.authors[0]
                    : ''}
                </h5>
                <div>
                  {/* <AddBookButton
                  
                  /> */}
                  Add book button
                </div>
              </div>
            </div>
            {/* <div className="text-neutral-400">Read in ####</div> */}
            <div className="my-3">{review.description}</div>
          </div>
        </section>
        <section>
          <div className="px-3">Comments</div>
        </section>
        <section>
          <div className="px-3">Write a comment</div>
        </section>
      </main>
    </>
  );
};

export default SingleReviewPage;
