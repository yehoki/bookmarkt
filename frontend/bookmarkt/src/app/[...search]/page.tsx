'use client';

import SearchBookDisplay from '@/components/Books/SearchBooks/SearchBookDisplay';
import useResultsStore from '@/hooks/useResultsStore';
import { useSearchParams } from 'next/navigation';

interface PageProps {
  params: { search: string };
}

const Page: React.FC<PageProps> = ({ params }) => {
  const searchParams = useSearchParams();
  const searchResultsStore = useResultsStore();
  console.log(searchResultsStore.searchResults);
  console.log(searchResultsStore.resultSize);
  console.log(searchParams?.get('q'));
  console.log(params);
  return (
    <div className="pt-40 md:pt-16 mx-auto max-w-[970px] text-left">
      <div className="font-semibold text-lg text-goodreads-brown">Search</div>
      <div>
        <div>
          <div></div>
          <SearchBookDisplay
            resultSize={searchResultsStore.resultSize}
            books={searchResultsStore.searchResults}
          />
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Page;
