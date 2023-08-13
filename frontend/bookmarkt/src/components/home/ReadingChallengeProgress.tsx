'use client';

interface ReadingChallengeProgressProps {
  percentage: number;
}

const ReadingChallengeProgress: React.FC<ReadingChallengeProgressProps> = ({
  percentage,
}) => {
  const percentageToString = percentage + '%';
  return (
    <div className="h-3 w-[70px] bg-[#DCD0C4]">
      <div
        style={{ width: percentageToString }}
        className="bg-[#927F64] h-3 max-w-[70px]"
      ></div>
    </div>
  );
};

export default ReadingChallengeProgress;
