'use client';

import useResultsStore from '@/hooks/useResultsStore';
import { useRouter, useSearchParams } from 'next/navigation';
import qs from 'query-string';
import { MouseEvent, useCallback, useEffect, useState } from 'react';

interface SearchPaginationControlsProps {
  resultSize: number;
}

const SearchPaginationControls: React.FC<SearchPaginationControlsProps> = ({
  resultSize,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchResults = useResultsStore();
  const maxPages = Math.floor(resultSize / 10);
  const page = searchParams?.get('page') ?? '1';
  const hasNext = Number(page) < maxPages;
  const hasPrev = Number(page) > 1;

  const [isSelected, setIsSelected] = useState(Number(page));

  useEffect(() => {
    const currentPage = searchParams?.get('page') ?? '1';
    setIsSelected(Number(currentPage));
  }, [searchParams]);

  const createPages = () => {
    if (Number(page) < 6) {
      const pageArray = [];
      for (let i = 0; i < 9; i++) {
        pageArray.push(i + 1);
      }
      return pageArray.map((numb) => (
        <li key={numb}>
          <button
            onClick={handleGoToPage}
            value={numb}
            disabled={isSelected === numb}
            className={`${
              isSelected !== numb
                ? 'text-goodreads-mybooks-green hover:underline'
                : ''
            }
        `}
          >
            {numb}
          </button>
        </li>
      ));
    } else if (Number(page) >= 6 && Number(page) < maxPages) {
      const pageArray = [];
      for (let i = Number(page) - 3; i < Number(page) + 3; i++) {
        pageArray.push(i);
      }
      return pageArray.map((numb) => (
        <li key={numb}>
          <button
            onClick={handleGoToPage}
            value={numb}
            disabled={isSelected === numb}
            className={`${
              isSelected !== numb
                ? 'text-goodreads-mybooks-green hover:underline'
                : ''
            }
        `}
          >
            {numb}
          </button>
        </li>
      ));
    }
  };

  const handlePreviousClick = useCallback(() => {
    let currentQuery = {};
    if (searchParams) {
      currentQuery = qs.parse(searchParams.toString());
    }
    const updatedQuery: any = {
      ...currentQuery,
      page: Number(page) - 1,
    };
    const url = qs.stringifyUrl({
      url: `/search`,
      query: updatedQuery,
    });
    router.push(url);
    return router.refresh();
  }, [searchParams, router, page]);

  const handleGoToPage = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      let currentQuery = {};
      if (searchParams) {
        currentQuery = qs.parse(searchParams.toString());
      }
      const updatedQuery: any = {
        ...currentQuery,
        page: e.currentTarget.value,
      };
      const url = qs.stringifyUrl({
        url: `/search`,
        query: updatedQuery,
      });
      router.push(url);
      return router.refresh();
    },
    [searchParams, router]
  );

  const handleNextClick = useCallback(() => {
    let currentQuery = {};
    if (searchParams) {
      currentQuery = qs.parse(searchParams.toString());
    }
    const updatedQuery: any = {
      ...currentQuery,
      page: Number(page) + 1,
    };
    const url = qs.stringifyUrl({
      url: `/search`,
      query: updatedQuery,
    });
    router.push(url);
    return router.refresh();
  }, [searchParams, router, page]);

  return (
    <div className="float-right flex gap-1 items-center text-xs py-8">
      <span>
        <button
          className={`${
            hasPrev ? 'text-goodreads-mybooks-green hover:underline' : ''
          }
`}
          onClick={handlePreviousClick}
          disabled={!hasPrev}
        >
          « previous
        </button>
      </span>
      <ul className="flex gap-[2px]">
        {isSelected > 5 && (
          <>
            <li>
              <button
                onClick={handleGoToPage}
                value={1}
                disabled={isSelected === 1}
                className={`${
                  isSelected !== 1
                    ? 'text-goodreads-mybooks-green hover:underline'
                    : ''
                }
        `}
              >
                1
              </button>
            </li>
            <li>
              <button
                onClick={handleGoToPage}
                value={2}
                disabled={isSelected === 2}
                className={`${
                  isSelected !== 2
                    ? 'text-goodreads-mybooks-green hover:underline'
                    : ''
                }
        `}
              >
                2
              </button>
            </li>
            <span>...</span>
          </>
        )}
        {createPages()}
      </ul>
      <span>...</span>
      <span>
        <button
          onClick={handleNextClick}
          disabled={!hasNext}
          className={`${
            hasNext ? 'text-goodreads-mybooks-green hover:underline' : ''
          }
          `}
        >
          next »
        </button>
      </span>
    </div>
  );
};

export default SearchPaginationControls;
