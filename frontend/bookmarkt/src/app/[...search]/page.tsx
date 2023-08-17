import getCurrentUser from '@/actions/getCurrentUser';

import { getUserBookData } from '@/actions/getUserBookData';
import getCurrentUserBookshelves from '@/actions/getCurrentUserBookshelves';
import SearchBookDisplay from '@/components/Books/SearchBooks/SearchBookDisplay';
import SearchBox from '@/components/Books/SearchBooks/SearchBox';
import { getBooksFromSearch } from '@/actions/getBooksFromSearch';
import Footer from '@/components/Footer';
import EmptyBookState from '@/components/Books/EmptyBookState';

interface PageProps {
  params: { search: string };
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

const Page: React.FC<PageProps> = async ({ params, searchParams }) => {
  const currentUser = await getCurrentUser();

  const page = searchParams['page'] ?? '1';

  const query =
    searchParams && searchParams.q && typeof searchParams.q === 'string'
      ? searchParams.q
      : '';
  const userId = currentUser ? currentUser.id : '';

  if (query === '') {
    return (
      <main
        className="pt-[100px] navOne:pt-[50px] mx-auto max-w-[970px] text-left px-2
      pb-[100px]"
      >
        <EmptyBookState id="" />
      </main>
    );
  }

  if (!currentUser) {
    const booksFromSearch = await getBooksFromSearch(
      query,
      10,
      Number(page) - 1
    );
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
      <>
        <div
          className="pt-[100px] navOne:pt-[50px] mx-auto max-w-[970px] text-left px-2
        pb-[100px]
        "
        >
          <div className="flex flex-row mt-[15px]">
            <div className="w-[625px]">
              <h1 className="font-bold text-xl text-goodreads-brown mb-4">
                Search
              </h1>
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
        <Footer />
      </>
    );
  }

  const finalBooks = await getUserBookData(query, userId, Number(page) - 1);
  const userBookshelves = await getCurrentUserBookshelves();
  return (
    <>
      <div
        className="pt-[100px] navOne:pt-[50px] mx-auto max-w-[970px] text-left px-2
      pb-[100px]
      "
      >
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
                    finalBooks?.totalItems ? finalBooks?.totalItems : 0
                  }
                  books={finalBooks?.items ? finalBooks?.items : []}
                  bookshelves={userBookshelves ? userBookshelves : []}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Page;
