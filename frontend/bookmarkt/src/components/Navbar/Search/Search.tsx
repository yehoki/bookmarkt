'use client';

import React, { useCallback, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import SearchDropdownTile from './SearchDropdownTile';
import useResultsStore from '@/hooks/useResultsStore';
import { getBookByISBN } from '@/actions/getBookByISBN';
import { useRouter } from 'next/navigation';
import {
  GoogleBookItemInterface,
  getBooksFromSearch,
} from '@/actions/getBooksFromSearch';

const Search = () => {
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState<GoogleBookItemInterface[]>(
    []
  );
  const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState(false);
  const searchResultsStore = useResultsStore();
  const router = useRouter();
  const toggleSearchDropdown = useCallback(() => {
    setIsSearchDropdownOpen((value) => !value);
  }, []);

  const handleSearchSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchValue.length === 13) {
      const bookFromISBN = await getBookByISBN(searchValue);
      if (bookFromISBN) {
        return router.push(`/books/${bookFromISBN.id}`);
      }
    }
    let books = await getBooksFromSearch(searchValue);
    if (books) {
      searchResultsStore.setResultSize(books.totalItems);
      setSearchResults(books.items);
    }
  };

  const handleSeeMoreResults = async () => {
    setIsSearchDropdownOpen(false);
    if (searchResults.length === 0) {
      let books = await getBooksFromSearch(searchValue);
      if (books) {
        searchResultsStore.setResultSize(books.totalItems);
      }
    }
    searchResultsStore.setResults(searchResults);
    setSearchValue('');
  };

  const displayBookObjects = () => {
    return searchResults.slice(0, 5).map((book) => {
      if (book) {
        return (
          <SearchDropdownTile
            key={book.id}
            id={book.id}
            title={book.volumeInfo.title}
            subtitle={
              book.volumeInfo.subtitle ? book.volumeInfo.subtitle : undefined
            }
            author={
              book.volumeInfo.authors ? book.volumeInfo.authors[0] : undefined
            }
            imageLink={
              book.volumeInfo.imageLinks
                ? book.volumeInfo.imageLinks.thumbnail
                : undefined
            }
          />
        );
      }
    });
  };

  return (
    <>
      <div className="hidden w-full bg-transparent md:flex flex-row relative mr-2 text-sm items-center">
        <form
          onSubmit={handleSearchSubmit}
          className={`w-full flex flex-row border-[1px]
        border-[#999999]
        bg-[#FFFFFF]
      rounded-[4px]
       transition
       ${isSearchDropdownOpen ? 'shadow-md' : 'shadow-none'}`}
        >
          <input
            className="w-full outline-none py-1 pr-[26px] pl-2 rounded-[4px]"
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.currentTarget.value)}
            placeholder="Search books"
            onFocus={toggleSearchDropdown}
          />
          <button type="submit">
            <BiSearch size={18} />
          </button>
        </form>
        <div
          className={`
        ${searchValue === '' || !isSearchDropdownOpen ? 'hidden' : 'block'}
        absolute top-10 bg-white w-full`}
        >
          <div className="flex flex-col w-full">
            {searchResults.length === 0 ? <></> : <>{displayBookObjects()}</>}
            <SearchDropdownTile
              title={`See all results for '${searchValue}'`}
              onClick={handleSeeMoreResults}
              searchValue={searchValue}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
