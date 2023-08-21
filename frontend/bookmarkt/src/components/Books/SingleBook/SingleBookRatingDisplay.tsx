'use client';

import ReviewStar from '@/components/ReviewStar';
import DisplayStars from '../Ratings/DisplayStars';

interface SingleBookRatingDisplayProps {
  margin?: boolean;
  averageRating: number;
  reviewCount: number;
  ratingCount: number;
  hrefLg?: boolean;
}

const SingleBookRatingDisplay: React.FC<SingleBookRatingDisplayProps> = ({
  margin,
  averageRating,
  ratingCount,
  reviewCount,
  hrefLg,
}) => {
  return (
    <div
      className={`flex justify-center mb-4 
      rounded-md hover:bg-[#f4f4f4] transition
    w-fit 
    ${!margin ? 'mx-auto px-4 py-4' : 'px-2 py-2'}
    `}
    >
      <a
        href={`${hrefLg ? '#communityReviews' : '#community-reviews'}`}
        className="flex flex-col"
      >
        <div className="flex items-center gap-4">
          <DisplayStars averageRating={averageRating} size={32} lightOrange />
          <span className="text-3xl">{averageRating}</span>
        </div>
        <div className="text-sm text-neutral-400 pl-2">
          {ratingCount} ratings · {reviewCount} reviews
        </div>
      </a>
    </div>
  );
};

export default SingleBookRatingDisplay;
