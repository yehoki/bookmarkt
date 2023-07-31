'use client';

import Link from 'next/link';

interface UserReviewsProps {
  ratedTotal: number;
  averageRating: number;
  reviewsTotal: number;
}

const UserReviews: React.FC<UserReviewsProps> = ({
  ratedTotal,
  averageRating,
  reviewsTotal,
}) => {
  return (
    <div className="">
      <Link
        href="/"
        className="flex flex-col justify-center items-center 
        text-sm text-goodreads-mybooks-green hover:underline"
      >
        <div>
          {ratedTotal} {ratedTotal === 1 ? 'rating' : 'ratings'} (
          {averageRating.toFixed(2)} avg)
        </div>
        <div>
          {reviewsTotal} {reviewsTotal === 1 ? 'review' : 'reviews'}
        </div>
      </Link>
    </div>
  );
};

export default UserReviews;
