'use client';

import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { BiLoaderAlt, BiSearch } from 'react-icons/bi';
import SearchDropdownTile from './SearchDropdownTile';
import useResultsStore from '@/hooks/useResultsStore';
import { getBookByISBN } from '@/actions/getBookByISBN';
import { useRouter } from 'next/navigation';
import {
  GoogleBookItemInterface,
  getBooksFromSearch,
} from '@/actions/getBooksFromSearch';
import { debounce } from 'lodash';

const Search = () => {
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState<GoogleBookItemInterface[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState(false);
  const searchResultsStore = useResultsStore();
  const router = useRouter();
  const toggleSearchDropdown = useCallback(() => {
    setIsSearchDropdownOpen((value) => !value);
  }, []);

  const displayResults = useCallback(async () => {
    setIsLoading(true);
    let books = await getBooksFromSearch(searchValue);
    if (books) {
      searchResultsStore.setResultSize(books.totalItems);
      setSearchResults(books.items);
    }
    setIsLoading(false);
  }, [searchValue, searchResultsStore]);

  const ref = useRef(displayResults);

  useEffect(() => {
    ref.current = displayResults;
  }, [searchValue, displayResults]);

  const debouncedRequest = useMemo(() => {
    const func = () => {
      ref.current?.();
    };
    return debounce(func, 1000);
  }, []);

  const handleSearchChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const currentValue = e.currentTarget.value;
      setSearchValue(currentValue);
      debouncedRequest();
    },
    [debouncedRequest]
  );

  const handleSearchSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchValue.length === 13) {
      const bookFromISBN = await getBookByISBN(searchValue);
      if (bookFromISBN) {
        return router.push(`/books/${bookFromISBN.id}`);
      }
    }
    await displayResults();
    router.push(`/search?q=${searchValue}`);
    setIsSearchDropdownOpen(false);
    setSearchValue('');
    searchResultsStore.setResults(searchResults);
    return;
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
            onChange={handleSearchChange}
            placeholder="Search books"
            onFocus={toggleSearchDropdown}
          />
          <button type="submit" className=" flex items-center pr-1">
            {isLoading ? (
              <BiLoaderAlt size={18} className="animate-spin w-fit h-fit" />
            ) : (
              <BiSearch size={18} />
            )}
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
