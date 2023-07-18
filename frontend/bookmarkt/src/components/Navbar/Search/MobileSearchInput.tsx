'use client';

import {
  GoogleBookItemsInterface,
  GoogleBookReturnInterface,
  getBooksFromSearch,
} from '@/actions/getBooksFromSearch';
import useMobileSearch from '@/hooks/useMobileSearch';
import Link from 'next/link';
import { FormEvent, useEffect, useState } from 'react';

const MobileSearchInput = () => {
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState<
    GoogleBookItemsInterface[]
  >([]);
  const mobileSearch = useMobileSearch();

  const handleSearchSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const googleBookSearchResults = await getBooksFromSearch(searchValue, 5);
    if (googleBookSearchResults) {
      setSearchResults(googleBookSearchResults.items);
    }
  };

  return (
    <div className="navOne:hidden flex w-full px-2 py-1 items-center gap-1 relative">
      <form className="w-full" onSubmit={handleSearchSubmit}>
        <input
          type="text"
          className="w-full px-2 py-[5px] 
        rounded-[4px] border-[1px] border-neutral-300
        outline-none
        focus:border-neutral-700 focus:shadow-sm"
          placeholder="Search books"
          value={searchValue}
          onChange={(e) => setSearchValue(e.currentTarget.value)}
          onSubmit={() => console.log('enter')}
        />
      </form>
      <div
        onClick={() => mobileSearch.onClose()}
        className="
  text-goodreads-mybooks-green text-sm hover:underline cursor-pointer"
      >
        Cancel
      </div>

      {searchValue !== '' ? (
        <div className="absolute bg-white w-full top-[45px] left-0">
          <div className="flex flex-col">
            {searchResults.length === 0 ? (
              <></>
            ) : (
              searchResults.map((book) => {
                return <div key={book.id}>{book.volumeInfo.title}</div>;
              })
            )}
            <div
              className="
            border-[1px] border-neutral-300 rounded-sm py-2 text-center"
            >
              <Link
                className="text-center text-goodreads-mybooks-green hover:underline cursor-pointer"
                href={`/search?q=${searchValue}`}
              >
                See all results for {searchValue}
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default MobileSearchInput;
