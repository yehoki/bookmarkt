import { getBooksFromSearch } from '@/actions/getBooksFromSearch';
import getCurrentUser from '@/actions/getCurrentUser';
import getCurrentUserBooks from '@/actions/getCurrentUserBooks';
import getUserBooks from '@/actions/getUserBooks';
import SearchBookDisplay from '@/components/Books/SearchBooks/SearchBookDisplay';
import { Book } from '@prisma/client';

interface PageProps {
  params: { search: string };
  searchParams?: {
    [key: string]: string | string[] | undefined;
  };
}

const Page: React.FC<PageProps> = async ({ params, searchParams }) => {
  const currentUser = await getCurrentUser();
  // 1. Take userId
  // 2. Find all books user currently has
  // let userBooks: Book[];
  let finalBooks;
  if (currentUser) {
    const userBooks = await getUserBooks(currentUser?.id);
    const userGoogleBooks = userBooks.map((book) => book.googleId);
    const booksFromSearch = await getBooksFromSearch('testQuery');
    if (booksFromSearch) {
      const returnBooks = booksFromSearch.items.map((book) => ({
        ...book,
        isOwned: userGoogleBooks.includes(book.id),
      }));
      finalBooks = {
        items: returnBooks,
        totalItems: booksFromSearch.totalItems,
      };
    }
  }
  // 3. Filter them using the current search results

  // 4. Return a new object with the books, and showing whether the user has it or not to turn on button

  // const booksFromSearch = await getBooksFromSearch('test');
  // console.log('BOOKS', books, booksFromSearch);

  // const currentUser = await getCurrentUser();
  // console.log('Current User', currentUser);
  // let searchResults;
  // if (searchParams && searchParams.q && typeof searchParams.q === 'string') {
  //   searchResults = await getBooksFromSearch(searchParams.q);
  //   console.log('Search', searchResults?.items);
  // }
  return (
    <div className="pt-32 navOne:pt-24 mx-auto max-w-[970px] text-left">
      <div className="font-semibold text-lg text-goodreads-brown">Search</div>
      <div>
        <div>
          <SearchBookDisplay
            resultSize={finalBooks?.totalItems ? finalBooks?.totalItems : 0}
            books={finalBooks?.items ? finalBooks?.items : []}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
