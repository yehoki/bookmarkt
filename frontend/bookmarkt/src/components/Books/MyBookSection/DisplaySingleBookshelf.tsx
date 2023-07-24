'use client';

import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import qs from 'query-string';

interface DisplaySingleBookshelfProps {
  label: string;
  bookshelfName: string;
  bookshelfLength: number;
}

const DisplaySingleBookshelf: React.FC<DisplaySingleBookshelfProps> = ({
  label,
  bookshelfName,
  bookshelfLength,
}) => {
  const params = useSearchParams();
  const router = useRouter();

  const handleBookshelfClick = useCallback(() => {
    let currentQuery = {};
    if (params) {
      currentQuery = qs.parse(params.toString());
    }
    const updatedQuery: any = {
      // We want to put the shelf currently into here
      ...currentQuery,
      shelf: label,
    };
    const url = qs.stringifyUrl({
      url: '/books',
      query: updatedQuery,
    });
    router.push(url);
  }, [params, router, label]);

  return (
    <li
      onClick={handleBookshelfClick}
      className="text-goodreads-mybooks-green cursor-pointer hover:underline"
    >
      {bookshelfName} ({bookshelfLength})
    </li>
  );
};

export default DisplaySingleBookshelf;
