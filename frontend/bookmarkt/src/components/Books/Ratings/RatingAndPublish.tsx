'use client';

import DisplayStars from './DisplayStars';

interface RatingAndPublishProps {
  totalRatings: number;
  averageRating: number;
  publishedYear: string;
}

const RatingAndPublish: React.FC<RatingAndPublishProps> = ({
  totalRatings,
  averageRating,
  publishedYear,
}) => {
  return (
    <div className="flex items-center gap-1">
      <DisplayStars averageRating={averageRating} />
      <div className="text-xs text-neutral-500">
        {averageRating} avg rating - {totalRatings} ratings - published{' '}
        {publishedYear}
      </div>
    </div>
  );
};

export default RatingAndPublish;
