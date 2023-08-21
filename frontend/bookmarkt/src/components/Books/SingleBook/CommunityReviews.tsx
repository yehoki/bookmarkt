'use client';

import SingleReviewChart from './SingleReviewChart';

interface CommunityReviewsProps {
  reviewInfo: {
    one: number;
    two: number;
    three: number;
    four: number;
    five: number;
    total: number;
  };
}

const CommunityReviews: React.FC<CommunityReviewsProps> = ({ reviewInfo }) => {
  return (
    <div>
      <SingleReviewChart
        percentage={((100 * reviewInfo.five) / reviewInfo.total).toFixed(0)}
        star={5}
        count={reviewInfo.five}
      />
      <SingleReviewChart
        percentage={((100 * reviewInfo.four) / reviewInfo.total).toFixed(0)}
        star={4}
        count={reviewInfo.four}
      />

      <SingleReviewChart
        percentage={((100 * reviewInfo.three) / reviewInfo.total).toFixed(0)}
        star={3}
        count={reviewInfo.three}
      />
      <SingleReviewChart
        percentage={((100 * reviewInfo.two) / reviewInfo.total).toFixed(0)}
        star={2}
        count={reviewInfo.two}
      />
      <SingleReviewChart
        percentage={((100 * reviewInfo.one) / reviewInfo.total).toFixed(0)}
        star={1}
        count={reviewInfo.one}
      />
    </div>
  );
};

export default CommunityReviews;
