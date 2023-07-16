'use client';

import { getCurrentUserCurrentBookReview } from '@/actions/getCurrentUserCurrentBookReview';
import { getSingleBook } from '@/actions/getSingleBook';
import ReviewStar from '@/components/ReviewStar';
import useBookReviewModal from '@/hooks/useBookReviewModal';
import { Book, Review } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface SingleBookReviewsProps {
  bookId: string;
  reviewRating: number;
  size?: number;
}

const SingleBookReviews: React.FC<SingleBookReviewsProps> = ({
  bookId,
  reviewRating,
  size,
}) => {
  const [stars, setStars] = useState(reviewRating);
  const [currentStars, setCurrentStars] = useState(reviewRating);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const bookReviewModal = useBookReviewModal();
  const handleAddRating = async () => {
    setIsLoading(true);
    const getBooks = await fetch('http://localhost:3000/api/users/books');
    if (!getBooks.ok) {
      setIsLoading(false);
      return null;
    }
    // const currentUserReview = await getCurrentUserCurrentBookReview(bookId);
    // Make API route to fetch from - otherwise server component
    const data: { books: Book[]; reviews: Review[] } = await getBooks.json();

    if (!data.books.map((book) => book.googleId).includes(bookId)) {
      const bookInfo = await getSingleBook(bookId);
      if (!bookInfo) {
        setIsLoading(false);
        return null;
      }
      const addBook = await fetch('http://localhost:3000/api/users/books', {
        method: 'POST',
        body: JSON.stringify({
          id: bookInfo.id,
          title: bookInfo.volumeInfo.title,
          author: bookInfo.volumeInfo.authors
            ? bookInfo.volumeInfo.authors
            : [],
          subtitle: bookInfo.volumeInfo.subtitle
            ? bookInfo.volumeInfo.subtitle
            : '',
          description: bookInfo.volumeInfo.description
            ? bookInfo.volumeInfo.description
            : '',
          imageLinks: bookInfo.volumeInfo.imageLinks
            ? bookInfo.volumeInfo.imageLinks
            : {},
          publishedDate: bookInfo.volumeInfo.publishedDate
            ? bookInfo.volumeInfo.publishedDate
            : '',
          ISBN: bookInfo.volumeInfo.industryIdentifiers.find(
            (isbn) => isbn.type === 'ISBN_13'
          )?.identifier,
        }),
      });
    }

    const res = await fetch('http://localhost:3000/api/review', {
      method: 'POST',
      body: JSON.stringify({
        rating: stars,
        bookId: bookId,
      }),
    });

    if (!res.ok) {
      setIsLoading(false);
      return null;
    }
    const reviewData = await res.json();
    setStars(reviewData.rating);
    setCurrentStars(reviewData.rating);
    bookReviewModal.setBookDetails({
      ...bookReviewModal.bookDetails,
      userRating: reviewData.rating,
    });
    setIsLoading(false);
    router.refresh();
  };

  return (
    <>
      {isLoading ? (
        <div className="text-sm text-neutral-400">saving...</div>
      ) : (
        <div
          className="w-full flex justify-center"
          onMouseLeave={() =>
            setStars(currentStars ? currentStars : reviewRating)
          }
          onClick={handleAddRating}
        >
          <ReviewStar
            size={size}
            setRating={setStars}
            rating={1}
            currentRating={stars}
          />
          <ReviewStar
            size={size}
            setRating={setStars}
            rating={2}
            currentRating={stars}
          />
          <ReviewStar
            size={size}
            setRating={setStars}
            rating={3}
            currentRating={stars}
          />
          <ReviewStar
            size={size}
            setRating={setStars}
            rating={4}
            currentRating={stars}
          />
          <ReviewStar
            size={size}
            setRating={setStars}
            rating={5}
            currentRating={stars}
          />
        </div>
      )}
    </>
  );
};

export default SingleBookReviews;
