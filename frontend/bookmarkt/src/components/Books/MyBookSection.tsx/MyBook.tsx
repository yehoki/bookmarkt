'use client';

import Link from 'next/link';

interface MyBookProps {
  title: string;
  id: string;
  author: string;
}

const MyBook: React.FC<MyBookProps> = ({ title, id, author }) => {
  console.log(id);
  return (
    <Link
      href={`/books/${id}`}
      className="w-[100px]
    h-[150px]
    border-[2px]
    border-black"
    >
      {title}
    </Link>
  );
};

export default MyBook;
