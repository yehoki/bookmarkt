import {
  GoogleBookReturnInterface,
  getBooksFromSearch,
} from '@/actions/getBooksFromSearch';
import getCurrentUser from '@/actions/getCurrentUser';
import getCurrentUserBooks from '@/actions/getCurrentUserBooks';
import getUserBooks from '@/actions/getUserBooks';
import SearchBookDisplay from '@/components/Books/SearchBooks/SearchBookDisplay';
import SearchBox from '@/components/Books/SearchBooks/SearchBox';
import { Book } from '@prisma/client';

interface PageProps {
  params: { search: string };
  searchParams?: {
    [key: string]: string | string[] | undefined;
  };
}

const getUserBookData = async (query: string, userId: string) => {
  const userBooks = await getUserBooks(userId);
  const userGoogleBooks = userBooks.map((book) => book.googleId);
  const booksFromSearch = await getBooksFromSearch(query);
  if (booksFromSearch && userId !== '') {
    const returnBooks = booksFromSearch.items.map((book) => ({
      ...book,
      isOwned: userGoogleBooks.includes(book.id),
    }));
    const finalBooks: GoogleBookReturnInterface = {
      items: returnBooks,
      totalItems: booksFromSearch.totalItems,
    };
    return finalBooks;
  } else if (booksFromSearch && userId === '') {
    return booksFromSearch;
  }
  return {
    items: [],
    totalItems: 0,
  };
};

const Page: React.FC<PageProps> = async ({ params, searchParams }) => {
  const currentUser = await getCurrentUser();
  const query =
    searchParams && searchParams.q && typeof searchParams.q === 'string'
      ? searchParams.q
      : '';
  const userId = currentUser ? currentUser.id : '';

  const finalBooks = await getUserBookData(query, userId);
  // FIRST - Move all code to a function
  // 1. UseEffect -> Rerender everytime the searchparams change
  // 2. USe query from searchparams
  // 3. Enables add book button if the book is not owned

  return (
    <div className="pt-32 navOne:pt-24 mx-auto max-w-[970px] text-left px-2">
      <div className="flex flex-row">
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
              />
            </div>
          </div>
        </div>
        <div className="w-[300px]">Suggestions</div>
      </div>
    </div>
  );
};

export default Page;
