'use client';

import { useRouter } from 'next/navigation';
import { FormEvent, useCallback, useState } from 'react';

interface SearchBoxProps {
  query: string;
}

const SearchBox: React.FC<SearchBoxProps> = ({ query }) => {
  const [searchQuery, setSearchQuery] = useState(query);
  const router = useRouter();

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      return router.push(`/search?q=${searchQuery}`);
    },
    [router, searchQuery]
  );

  return (
    <div className="w-full  bg-[#eeeeee] rounded-sm px-3 py-2">
      <div className="w-full ">
        <form onSubmit={handleSubmit}>
          <div className="flex gap-1 pr-8 text-sm">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.currentTarget.value)}
              className="w-full rounded-[3px] border-[1px] border-[#333333] 
              outline-none focus:shadow-md px-1 font-light
            "
              placeholder="Search by Book Title, Author or ISBN"
            />
            <button
              className="bg-goodreads-beige hover:bg-goodreads-brown/10 rounded-[3px] py-1 px-2
            border-[1px] border-[#D6D0C4] text-[#333333] 
            "
            >
              Search
            </button>
          </div>
        </form>
      </div>
      {/* <div>Select</div> */}
    </div>
  );
};

export default SearchBox;
