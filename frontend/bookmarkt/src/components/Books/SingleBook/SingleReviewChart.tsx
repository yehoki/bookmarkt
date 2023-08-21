'use client';

interface SingleReviewChartProps {
  percentage: string;
  star: number;
  count: number;
}

const SingleReviewChart: React.FC<SingleReviewChartProps> = ({
  percentage,
  star,
  count,
}) => {
  return (
    <div
      className="grid grid-cols-[50px_auto_100px] items-center gap-4 text-sm my-3
    group cursor-pointer  
    "
    >
      <div
        className=" underline 
font-semibold underline-offset-4 decoration-2"
      >
        {star} stars
      </div>
      <div className="p-3 group-hover:bg-[#ebebeb] transition rounded-2xl duration-300 ">
        <div className="h-3 bg-[#f4f4f4] rounded-xl">
          <div
            style={{ width: `${percentage}%` }}
            className="h-3 bg-[#e87400] rounded-xl"
          ></div>
        </div>
      </div>
      <div className="text-neutral-400 group-hover:underline underline-offset-4 transition duration-300">
        {count} ({percentage})%
      </div>
    </div>
  );
};

export default SingleReviewChart;
