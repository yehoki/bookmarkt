'use client';

// 1. Make Each result clickable to its actual book page
// 2. Render out 20 results at first try -> slice to show the first 5 results
// 3. Pass in props the result and pass in each individual one to see the page
import Image from 'next/image';
import React, { useCallback, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import SearchDropdownTile from './SearchDropdownTile';
import { getBooksFromSearch } from '@/actions/getBooksFromSearch';

const Search = () => {
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState(false);

  const toggleSearchDropdown = useCallback(() => {
    setIsSearchDropdownOpen((value) => !value);
  }, []);

  const handleSearchSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const books = await getBooksFromSearch(searchValue);
    console.log(books);
    if (books.items && Array.isArray(books.items)) {
      setSearchResults(books.items);
    }
  };

  const displayBookObjects = () => {
    return searchResults.map((book: any) => {
      if (book?.volumeInfo?.title) {
        return (
          <SearchDropdownTile
            key={book.id}
            id={book.id}
            title={book.volumeInfo.title}
            subtitle={
              book.volumeInfo.subtitle ? book.volumeInfo.subtitle : null
            }
            author={book.volumeInfo.authors ? book.volumeInfo.authors[0] : null}
            imageLink={
              book.volumeInfo.imageLinks
                ? book.volumeInfo.imageLinks.thumbnail
                : null
            }
          />
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
            {searchResults.length === 0 ? (
              <>
                <SearchDropdownTile title={searchValue} />
                <SearchDropdownTile title="2" />
                <SearchDropdownTile title="2" />
                <SearchDropdownTile title="2" />
                <SearchDropdownTile title="2" />
              </>
            ) : (
              <>{displayBookObjects()}</>
            )}
            <SearchDropdownTile
              title={`See all results for '${searchValue}'`}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
