'use client';

import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

interface MyBooksPaginationControlsProps {}

const MyBooksPaginationControls: React.FC<
  MyBooksPaginationControlsProps
> = ({}) => {
  const [perPage, setPerPage] = useState(20);
  const searchParams = useSearchParams();
  const router = useRouter();

  return (
    <div className="mt-4 text-sm text-neutral-400">
      <span className="mr-2">per page</span>
      <select
        name="per-page"
        id="per-page"
        className="pl-1 pr-16 border rounded-sm
    border-black text-black"
        value={perPage}
        onChange={(e) => setPerPage(parseInt(e.currentTarget.value))}
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
