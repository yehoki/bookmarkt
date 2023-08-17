'use client';

import {
  GoogleBookItemInterface,
  getBooksFromSearch,
} from '@/actions/getBooksFromSearch';
import useMobileSearch from '@/hooks/useMobileSearch';
import useResultsStore from '@/hooks/useResultsStore';
import { debounce } from 'lodash';
import Link from 'next/link';
import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { BiLoaderAlt } from 'react-icons/bi';
import SearchDropdownTile from './SearchDropdownTile';
import { getBookByISBN } from '@/actions/getBookByISBN';
import { useRouter } from 'next/navigation';

const MobileSearchInput = () => {
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<GoogleBookItemInterface[]>(
    []
  );
  const mobileSearch = useMobileSearch();
  const searchResultsStore = useResultsStore();
  const router = useRouter();

  const displayResults = useCallback(async () => {
    setIsLoading(true);
    let books = await getBooksFromSearch(searchValue, 5);
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

  const handleSearchSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchValue.length === 13) {
      const bookFromISBN = await getBookByISBN(searchValue);
      if (bookFromISBN) {
        return router.push(`/books/${bookFromISBN.id}`);
      }
    }
    await displayResults();
    router.push(`/search?q=${searchValue}`);
    mobileSearch.onClose();
    setSearchValue('');
    searchResultsStore.setResults(searchResults);
    return;
  };

  return (
    <div className="navOne:hidden flex w-full px-2 py-1 items-center gap-1 relative">
      <form className="w-full relative" onSubmit={handleSearchSubmit}>
        <input
          type="text"
          className="w-full px-2 py-[5px] 
        rounded-[4px] border-[1px] border-neutral-300
        outline-none
        focus:border-neutral-700 focus:shadow-sm
        "
          placeholder="Search books"
          value={searchValue}
          onChange={handleSearchChange}
        />
        {isLoading ? (
          <BiLoaderAlt
            className="absolute right-2 top-2 animate-spin"
            size={18}
          />
        ) : (
          ''
        )}
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
                return (
                  <SearchDropdownTile
                    key={book.id}
                    id={book.id}
                    title={book.volumeInfo.title}
                    author={
                      book.volumeInfo.authors ? book.volumeInfo.authors[0] : ''
                    }
                    imageLink={
                      book.volumeInfo.imageLinks &&
                      book.volumeInfo.imageLinks.thumbnail
                        ? book.volumeInfo.imageLinks.thumbnail
                        : ''
                    }
                  />
                );
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
