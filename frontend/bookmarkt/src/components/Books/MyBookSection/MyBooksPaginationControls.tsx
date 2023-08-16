'use client';

import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import qs from 'query-string';
import {
  ChangeEvent,
  MouseEvent,
  Suspense,
  useCallback,
  useEffect,
  useState,
} from 'react';

interface MyBooksPaginationControlsProps {
  userId: string;
  resultSize: number;
}

const MyBooksPaginationControls: React.FC<MyBooksPaginationControlsProps> = ({
  userId,
  resultSize,
}) => {
  const [perPage, setPerPage] = useState(20);
  const searchParams = useSearchParams();
  const router = useRouter();

  const maxPages = Math.ceil(resultSize / perPage);

  const page = searchParams?.get('page') ?? '1';
  const hasNext = Number(page) < maxPages;
  const hasPrev = Number(page) > 1;

  const [isSelected, setIsSelected] = useState(Number(page));

  useEffect(() => {
    // Sets the current page as state
    setIsSelected(Number(searchParams?.get('page') ?? '1'));
    setPerPage(Number(searchParams?.get('perPage') ?? '20'));
  }, [searchParams]);

  const createPages = () => {
    if (resultSize <= perPage) {
      return <></>;
    }
    const pageArray = [];
    if (Number(page) < 6) {
      for (let i = 0; i < Math.min(maxPages, 9); i++) {
        pageArray.push(i + 1);
      }
      return pageArray.map((numb) => (
        <li key={numb}>
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
        </li>
      ));
    } else if (Number(page) >= 6 && Number(page) < 93) {
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
    } else if (Number(page) >= 6 && Number(page) <= 100) {
      const pageArray = [];
      for (let i = Number(page) - 3; i <= 100; i++) {
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
      url: `/books/user/${userId}`,
      query: updatedQuery,
    });
    router.push(url);
    return router.refresh();
  }, [searchParams, router, page, userId]);

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
      url: `/books/user/${userId}`,
      query: updatedQuery,
    });
    router.push(url);
    return router.refresh();
  }, [searchParams, router, page, userId]);

  // Changing how many results to show per page
  const handlePerPageChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      setPerPage(parseInt(e.currentTarget.value));
      let currentQuery = {};
      if (searchParams) {
        currentQuery = qs.parse(searchParams.toString());
      }
      const updatedQuery: any = {
        ...currentQuery,
        page: undefined,
        perPage: e.currentTarget.value,
      };
      const url = qs.stringifyUrl({
        url: `/books/user/${userId}`,
        query: updatedQuery,
      });
      router.push(url);
      return router.refresh();
    },
    [searchParams, router, userId]
  );

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
        url: `/books/user/${userId}`,
        query: updatedQuery,
      });
      router.push(url);
      return router.refresh();
    },
    [searchParams, router, userId]
  );

  return (
    <div className="mt-4 text-sm text-neutral-400 flex items-center justify-between">
      <div>
        <span className="mr-2">per page</span>
        <select
          name="per-page"
          id="per-page"
          className="pl-1 pr-16 border rounded-sm
        border-black text-black"
          value={perPage}
          onChange={handlePerPageChange}
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
          <option value={40}>40</option>
          <option value={50}>50</option>
        </select>
      </div>
      <div className="flex gap-1 items-center text-xs">
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
          {maxPages < 100 && isSelected < maxPages - 5 && (
            <>
              <span>...</span>
              <li>
                <button
                  onClick={handleGoToPage}
                  value={maxPages - 1}
                  disabled={isSelected === maxPages - 1}
                  className={`${
                    isSelected !== maxPages - 1
                      ? 'text-goodreads-mybooks-green hover:underline'
                      : ''
                  }
        `}
                >
                  {maxPages - 1}
                </button>
              </li>
              <li>
                <button
                  onClick={handleGoToPage}
                  value={maxPages}
                  disabled={isSelected === maxPages}
                  className={`${
                    isSelected !== maxPages
                      ? 'text-goodreads-mybooks-green hover:underline'
                      : ''
                  }
        `}
                >
                  {maxPages}
                </button>
              </li>
            </>
          )}
          {maxPages >= 100 && isSelected < 93 && (
            <>
              <span>...</span>
              <li>
                <button
                  onClick={handleGoToPage}
                  value={99}
                  disabled={isSelected === 99}
                  className={`${
                    isSelected !== maxPages - 99
                      ? 'text-goodreads-mybooks-green hover:underline'
                      : ''
                  }
        `}
                >
                  99
                </button>
              </li>
              <li>
                <button
                  onClick={handleGoToPage}
                  value={100}
                  disabled={isSelected === 100}
                  className={`${
                    isSelected !== 100
                      ? 'text-goodreads-mybooks-green hover:underline'
                      : ''
                  }
        `}
                >
                  100
                </button>
              </li>
            </>
          )}
        </ul>
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
    </div>
  );
};

export default MyBooksPaginationControls;
