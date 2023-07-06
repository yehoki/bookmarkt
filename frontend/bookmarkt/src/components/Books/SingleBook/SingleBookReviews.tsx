'use client';

import { getSingleBook } from '@/actions/getSingleBook';
import ReviewStar from '@/components/ReviewStar';
import { Book } from '@prisma/client';
import { useState } from 'react';

interface SingleBookReviewsProps {
  bookId: string;
  reviewRating: number;
}

const SingleBookReviews: React.FC<SingleBookReviewsProps> = ({
  bookId,
  reviewRating,
}) => {
  const [stars, setStars] = useState(reviewRating);
  const [currentStars, setCurrentStars] = useState(reviewRating);

  const handleAddRating = async () => {
    const getBooks = await fetch('http://localhost:3000/api/users/books');
    if (!getBooks.ok) {
      return null;
    }

    const data: Book[] = await getBooks.json();

    if (!data.map((book) => book.googleId).includes(bookId)) {
      const bookInfo = await getSingleBook(bookId);
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
        }),
      });
    }

    const res = await fetch('http://localhost:3000/api/review', {
      method: 'POST',
      body: JSON.stringify({
        rating: stars,
        title: 'New Review',
        description: 'New Review Description',
        bookId: bookId,
      }),
    });

    if (!res.ok) {
      return null;
    }
    const reviewData = await res.json();
    setStars(reviewData.rating);
    setCurrentStars(reviewData.rating);
  };

  return (
    <div
      className="w-full flex justify-center"
      onMouseLeave={() => setStars(currentStars ? currentStars : reviewRating)}
      onClick={handleAddRating}
    >
      <ReviewStar setRating={setStars} rating={1} currentRating={stars} />
      <ReviewStar setRating={setStars} rating={2} currentRating={stars} />
      <ReviewStar setRating={setStars} rating={3} currentRating={stars} />
      <ReviewStar setRating={setStars} rating={4} currentRating={stars} />
      <ReviewStar setRating={setStars} rating={5} currentRating={stars} />
    </div>
  );
};

export default SingleBookReviews;
