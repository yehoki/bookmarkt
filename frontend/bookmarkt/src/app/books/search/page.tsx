'use client';
import { getGoogleBooksByQuery } from '@/services/googleBooks';
import Image from 'next/image';
import React, { ChangeEventHandler, FormEvent, useState } from 'react';

type Props = {};

const Page = (props: Props) => {
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const booksFromQuery = await getGoogleBooksByQuery(searchValue);
    console.log(booksFromQuery);
    setSearchResults(booksFromQuery.items);
  };

  function displayBooks(books: any) {
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
  }

  // Some ideas:
  // 1. Expand search to be interchangeable between title or author
  // 2. Utilise more of the Google API

  // If a user is typing and stops for a second, render out the results as a drop down menu
  // Have a submit button/more results button to see 20 results and can then go through based on how many results there are
  return (
    <div className="py-20">
      <form
        className=""
        onSubmit={handleSearchSubmit}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: 16,
        }}
      >
        <input
          className="border outline-black pl-0.5"
          type="search"
          onChange={(e) => setSearchValue(e.currentTarget.value)}
        />
      </form>
      <div>
        <ul>
          {searchResults.length === 0 ? null : displayBooks(searchResults)}
        </ul>

        {/* Component for displaying books - dropdown top 5 results post render */}
      </div>
    </div>
  );
};

export default Page;
