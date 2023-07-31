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
        className="flex flex-col justify-center items-center text-goodreads-mybooks-green hover:underline cursor-pointer"
      >
        <div>
          {ratedTotal} books rated · {averageRating.toFixed(2)} average rating
        </div>
        <div>{reviewsTotal} revies written</div>
      </Link>
    </div>
  );
};

export default UserReviews;
