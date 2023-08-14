import getBookReview from '@/actions/getBookReview';
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
  return (
    <>
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
