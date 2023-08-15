'use client';

import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import qs from 'query-string';
import { ChangeEvent, useCallback, useState } from 'react';

interface MyBooksPaginationControlsProps {
  userId: string;
}

const MyBooksPaginationControls: React.FC<MyBooksPaginationControlsProps> = ({
  userId,
}) => {
  const [perPage, setPerPage] = useState(20);
  const searchParams = useSearchParams();
  const router = useRouter();

  const handlePerPageChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      setPerPage(parseInt(e.currentTarget.value));
      let currentQuery = {};
      if (searchParams) {
        currentQuery = qs.parse(searchParams.toString());
      }
      const updatedQuery: any = {
        ...currentQuery,
        perPage: e.currentTarget.value,
      };
      const url = qs.stringifyUrl({
        url: `/books/user/${userId}`,
        query: updatedQuery,
      });
      router.push(url);
      return router.refresh();
    },
    [searchParams, router, userId]
  );

  return (
    <div className="mt-4 text-sm text-neutral-400">
      <span className="mr-2">per page</span>
      <select
        name="per-page"
        id="per-page"
        className="pl-1 pr-16 border rounded-sm
    border-black text-black"
        value={perPage}
        onChange={handlePerPageChange}
      >
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={30}>30</option>
        <option value={40}>40</option>
        <option value={50}>50</option>
      </select>
    </div>
  );
};

export default MyBooksPaginationControls;
