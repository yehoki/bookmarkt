'use client';

import Link from 'next/link';

interface UserReviewsMobileProps {
  ratedTotal: number;
  averageRating: number;
  reviewsTotal: number;
}

const UserReviewsMobile: React.FC<UserReviewsMobileProps> = ({
  ratedTotal,
  averageRating,
  reviewsTotal,
}) => {
  return (
    <div className="">
      <Link
        href="/"
        className="flex flex-col justify-center items-center text-goodreads-mybooks-green hover:underline cursor-pointer"
      >
        <div>
          {ratedTotal} {ratedTotal === 1 ? 'books' : 'book'} rated ·{' '}
          {averageRating.toFixed(2)} average rating
        </div>
        <div>
          {reviewsTotal} {reviewsTotal === 1 ? 'review' : 'reviews'} written
        </div>
      </Link>
    </div>
  );
};

export default UserReviewsMobile;
