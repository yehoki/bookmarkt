'use client';

import Image from 'next/image';
import Link from 'next/link';

interface MyBookProps {
  title: string;
  id: string;
  googleId: string;

  authors: string[];
  thumbnailUrl?: string;
}

const MyBook: React.FC<MyBookProps> = ({
  title,
  id,
  googleId,
  authors,
  thumbnailUrl,
}) => {
  return (
    <Link
      href={`/books/${googleId}`}
      className="w-[100px]
    h-[150px]
    border-[1px]
    border-neutral-300
    relative "
    >
      <Image
        fill
        src={thumbnailUrl ? thumbnailUrl : '/images/empty-book.png'}
        alt={`${title} cover`}
      />
    </Link>
  );
};

export default MyBook;
