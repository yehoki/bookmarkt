'use client';

import { getGoogleBooksByQuery } from '@/services/googleBooks';
import Image from 'next/image';
import React, { useCallback, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import SearchDropdownTile from './SearchDropdownTile';
import { getBooksFromSearch } from '@/actions/getBooksFromSearch';

const Search = () => {
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchFocused, setSearchFocused] = useState(false);

  const handleSearchSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const books = await getBooksFromSearch(searchValue);
    if (books.items && Array.isArray(books.items)) {
      setSearchResults(books.items);
    }
  };

  const displayBookObjects = () => {
    return searchResults.map((book: any) => {
      if (book?.volumeInfo?.title) {
        return (
          <SearchDropdownTile key={book.id} label={book.volumeInfo.title} />
        );
      }
    });
  };

  const displayBooks = (books: any) => {
    return books.map((book: any) => {
      return (
        <li key={book.id}>
          {book.volumeInfo.title}{' '}
          {book.volumeInfo.authors ? `by ${book.volumeInfo.authors[0]}` : ''}{' '}
          {book.volumeInfo.imageLinks ? (
            <Image
              src={book.volumeInfo.imageLinks.thumbnail}
              alt={book.volumeInfo.description}
              width={100}
              height={100}
            />
          ) : null}
        </li>
      );
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
       ${searchFocused ? 'shadow-md' : 'shadow-none'}`}
        >
          <input
            className="w-full outline-none py-1 pr-[26px] pl-2 rounded-[4px]"
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.currentTarget.value)}
            placeholder="Search books"
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
          <button type="submit">
            <BiSearch size={18} />
          </button>
        </form>
        <div
          className={`
        ${searchValue === '' || !searchFocused ? 'hidden' : 'block'}
        absolute top-10 bg-white w-full`}
        >
          <div className="flex flex-col w-full">
            {searchResults.length === 0 ? (
              <>
                <SearchDropdownTile label={searchValue} />
                <SearchDropdownTile label="2" />
                <SearchDropdownTile label="2" />
                <SearchDropdownTile label="2" />
                <SearchDropdownTile label="2" />
              </>
            ) : (
              <>{displayBookObjects()}</>
            )}
            <SearchDropdownTile
              label={`See all results for '${searchValue}'`}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
