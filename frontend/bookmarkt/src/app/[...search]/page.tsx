import getCurrentUser from '@/actions/getCurrentUser';

import { getUserBookData } from '@/actions/getUserBookData';
import getCurrentUserBookshelves from '@/actions/getCurrentUserBookshelves';
import SearchBookDisplay from '@/components/Books/SearchBooks/SearchBookDisplay';
import SearchBox from '@/components/Books/SearchBooks/SearchBox';
import { getBooksFromSearch } from '@/actions/getBooksFromSearch';

interface PageProps {
  params: { search: string };
  searchParams?: {
    [key: string]: string | string[] | undefined;
  };
}

const Page: React.FC<PageProps> = async ({ params, searchParams }) => {
  const currentUser = await getCurrentUser();

  const query =
    searchParams && searchParams.q && typeof searchParams.q === 'string'
      ? searchParams.q
      : '';
  const userId = currentUser ? currentUser.id : '';

  if (!currentUser) {
    const booksFromSearch = await getBooksFromSearch(query);
    const returnBooks = booksFromSearch?.items.map((book) => ({
      ...book,
      reviewData: {
        averageReview: 0,
        totalReviews: 0,
      },
      userRating: 0,
      bookshelf: '',
    }));
    return (
      <div className="pt-[100px] navOne:pt-[50px] mx-auto max-w-[970px] text-left px-2">
        <div className="flex flex-row mt-[15px]">
          <div className="w-[625px]">
            <div className="font-bold text-xl text-goodreads-brown mb-4">
              Search
            </div>
            <div>
              <SearchBox query={query} />
              <div>
                <SearchBookDisplay
                  resultSize={
                    booksFromSearch?.totalItems
                      ? booksFromSearch?.totalItems
                      : 0
                  }
                  books={returnBooks ? returnBooks : []}
                  bookshelves={[]}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const finalBooks = await getUserBookData(query, userId);
  const userBookshelves = await getCurrentUserBookshelves();
  return (
    <div className="pt-[100px] navOne:pt-[50px] mx-auto max-w-[970px] text-left px-2">
      <div className="flex flex-row mt-[15px]">
        <div className="w-[625px]">
          <div className="font-bold text-xl text-goodreads-brown mb-4">
            Search
          </div>
          <div>
            <SearchBox query={query} />
            <div>
              <SearchBookDisplay
                resultSize={finalBooks?.totalItems ? finalBooks?.totalItems : 0}
                books={finalBooks?.items ? finalBooks?.items : []}
                bookshelves={userBookshelves ? userBookshelves : []}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
