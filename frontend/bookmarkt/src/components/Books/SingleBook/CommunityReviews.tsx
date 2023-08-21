'use client';

interface CommunityReviewsProps {}

const CommunityReviews: React.FC<CommunityReviewsProps> = ({}) => {
  return (
    <div>
      <div className="grid grid-cols-[50px_auto_100px] items-center gap-2 text-sm">
        <div
          className=" underline 
      font-semibold underline-offset-2 decoration-2"
        >
          5 stars
        </div>
        <div className="">
          <div className="h-3 bg-[#f4f4f4] rounded-xl">
            <div
              style={{ width: `${((17 * 100) / 90).toFixed(0)}%` }}
              className="h-3 bg-[#e87400] rounded-xl"
            ></div>
          </div>
        </div>
        <div className="text-neutral-400">
          17 ({((17 / 90) * 100).toFixed(0)})%
        </div>
      </div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default CommunityReviews;
