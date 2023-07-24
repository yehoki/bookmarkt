'use client';

import Image from 'next/image';
import Link from 'next/link';

interface HomeUpdateBookDisplayProps {
  title: string;
  googleBookId: string;
  authors?: string[];
  bookDescription?: string;
  imageUrl?: string;
  borderOff?: boolean;
}

const HomeUpdateBookDisplay: React.FC<HomeUpdateBookDisplayProps> = ({
  title,
  googleBookId,
  authors,
  bookDescription,
  imageUrl,
  borderOff,
}) => {
  return (
    <div
      className={`p-2 border-neutral-300 ${
        borderOff ? 'border-none pl-0' : 'border-[1px]'
      } flex gap-1`}
    >
      <Link href={`/books/${googleBookId}`}>
        <div className="relative h-[180px] min-w-[110px]">
          <Image
            src={imageUrl ? imageUrl : '/images/empty-book.png'}
            alt={`${title} cover`}
            fill
            sizes="100vw"
          />
        </div>
      </Link>
      <div className="flex flex-col gap-1">
        <div className="text-lg font-bold">
          <Link href={`/books/${googleBookId}`} className="hover:underline">
            {title}
          </Link>
        </div>
        <div className="text-[#333333]">
          By {authors && authors[0] ? authors[0] : ''}
        </div>
        <div>
          {bookDescription}{' '}
          <Link
            className="text-goodreads-mybooks-green hover:underline"
            href={`/books/${googleBookId}`}
          >
            Continue reading
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeUpdateBookDisplay;
