'use client';

import ReviewStar from '@/components/ReviewStar';
import DisplayStars from '../Ratings/DisplayStars';

interface SingleBookRatingDisplayProps {}

const SingleBookRatingDisplay: React.FC<
  SingleBookRatingDisplayProps
> = ({}) => {
  return (
    <div
      className="flex justify-center mb-4 px-4 py-4
      rounded-md hover:bg-[#f4f4f4] transition
    w-fit mx-auto
    "
    >
      <a href="#community-reviews" className="flex flex-col items-center">
        <div className="flex items-center gap-4">
          <DisplayStars averageRating={4} size={32} lightOrange />
          <span className="text-3xl">4</span>
        </div>
        <div className="text-sm text-neutral-400">
          XXX ratings · XXX reviews
        </div>
      </a>
    </div>
  );
};

export default SingleBookRatingDisplay;
