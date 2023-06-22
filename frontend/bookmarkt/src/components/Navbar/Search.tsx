'use client';

import { getGoogleBooksByQuery } from '@/services/googleBooks';
import Image from 'next/image';
import React, { useCallback, useState } from 'react';
import { BiSearch } from 'react-icons/bi';

const Search = () => {
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchFocused, setSearchFocused] = useState(false);

  const handleSearchSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const booksFromQuery = await getGoogleBooksByQuery(searchValue);
    console.log(booksFromQuery);
    setSearchResults(booksFromQuery.items);
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
    <div
      className="bg-transparent
  hidden w-full md:flex flex-row items-center mr-2 text-sm"
    >
      <form
        onSubmit={(e) => e.preventDefault()}
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
          placeholder="Search books"
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
        />
        <button type="submit">
          <BiSearch size={18} />
        </button>
      </form>
    </div>
  );
};

export default Search;
