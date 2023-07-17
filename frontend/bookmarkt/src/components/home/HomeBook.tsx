'use client';

import Image from 'next/image';
import Link from 'next/link';

interface HomeBookProps {
  title: string;
  googleBookId: string;
  authors?: string[];
  imgsrc?: string;
}

const HomeBook: React.FC<HomeBookProps> = ({
  title,
  authors,
  imgsrc,
  googleBookId,
}) => {
  return (
    <div className="flex flex-row">
      <Link href={`/books/${googleBookId}`}>
        <div className="relative w-[100px] h-[140px] shadow-md mr-2">
          <Image
            alt={`${title} book`}
            src={imgsrc ? imgsrc : 'images/empty-book.png'}
            fill
          />
        </div>
      </Link>
      <div className="flex flex-col">
        <div>
          <Link
            href={`/books/${googleBookId}`}
            className="font-bold hover:underline"
          >
            {title.slice(0, 40)}...
          </Link>
        </div>
        <div className="text-sm">{authors ? `by ${authors[0]}` : ''}</div>
        {/* <div>update progress button</div> */}
      </div>
    </div>
  );
};

export default HomeBook;
