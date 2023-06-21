'use client';

interface MyBookProps {
  title: string;
}

const MyBook: React.FC<MyBookProps> = ({ title }) => {
  return (
    <div
      className="
    w-[110px]
    h-[150px]
    border-[2px]
    border-black"
    >
      {title}
    </div>
  );
};

export default MyBook;
