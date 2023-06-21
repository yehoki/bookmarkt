'use client';

import { getGoogleBooksByQuery } from '@/services/googleBooks';
import Image from 'next/image';
import React, { useState } from 'react';
import { BiSearch } from 'react-icons/bi';

const Search = () => {
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);

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
      className="mx-2
  border-[1px] border-[#999999] 
  w-full md:w-[70%] lg:w-[25%] px-2 py-1 rounded-[4px] 
  bg-[#FFFFFF] shadow-sm hover:shadow-md 
  transition cursor-pointer"
    >
      <div className="flex flex-row items-center justify-between gap-3">
        <div>Search books</div>
        <div className="px-1 rounded-full">
          <BiSearch size={18} />
        </div>
      </div>
    </div>
  );
};

export default Search;
