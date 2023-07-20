import getCurrentUser from '@/actions/getCurrentUser';
import { getUserBookData } from '@/actions/getUserBookData';
import SearchBookDisplay from '@/components/Books/SearchBooks/SearchBookDisplay';
import SearchBox from '@/components/Books/SearchBooks/SearchBox';

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

  // await getUserBookData(query, userId);

  const finalBooks = await getUserBookData(query, userId);
  // FIRST - Move all code to a function
  // 1. UseEffect -> Rerender everytime the searchparams change
  // 2. USe query from searchparams
  // 3. Enables add book button if the book is not owned

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
              />
            </div>
          </div>
        </div>
        {/* <div className="w-[300px]">Suggestions</div> */}
      </div>
    </div>
  );
};

export default Page;
