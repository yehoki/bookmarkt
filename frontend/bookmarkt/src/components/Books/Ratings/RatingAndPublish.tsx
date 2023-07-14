'use client';

import SingleBookReviews from '../SingleBook/SingleBookReviews';

interface RatingAndPublishProps {
  bookId: string;
  reviewRating?: number;
  totalRatings: number;
  averageRating: number;
  publishedYear: string;
}

const RatingAndPublish: React.FC<RatingAndPublishProps> = ({
  totalRatings,
  averageRating,
  publishedYear,
  bookId,
  reviewRating,
}) => {
  return (
    <div className="flex items-center gap-1">
      <div>
        <SingleBookReviews
          bookId={bookId}
          reviewRating={reviewRating ? reviewRating : 0}
        />
      </div>
      <div className="text-xs text-neutral-500">
        {averageRating} avg rating - {totalRatings} ratings - published{' '}
        {publishedYear}
      </div>
    </div>
  );
};

export default RatingAndPublish;
