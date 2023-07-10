'use client';

import Image from 'next/image';

interface HomeBookProps {
  title: string;
  authors?: string[];
  imgsrc?: string;
}

const HomeBook: React.FC<HomeBookProps> = ({ title, authors, imgsrc }) => {
  return (
    <div className="flex flex-row">
      <div className="relative w-[100px] h-[150px] shadow-md mr-2">
        <Image
          alt={`${title} book`}
          src={imgsrc ? imgsrc : 'images/empty-book.png'}
          fill
        />
      </div>
      <div className="flex flex-col">
        <div className="font-bold text-lg hover:underline cursor-pointer">
          {title}
        </div>
        <div>{authors ? `by ${authors[0]}` : ''}</div>
        <div>update progress button</div>
      </div>
    </div>
  );
};

export default HomeBook;
