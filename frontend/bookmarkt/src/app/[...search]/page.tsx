'use client';

import useResultsStore from '@/hooks/useResultsStore';
import { useSearchParams } from 'next/navigation';

interface PageProps {
  params: { search: string };
}

const Page: React.FC<PageProps> = ({ params }) => {
  const searchParams = useSearchParams();
  const searchResultsStore = useResultsStore();
  console.log(searchResultsStore.searchResults);
  console.log(searchParams?.get('q'));
  console.log(params);
  return <div>page</div>;
};

export default Page;
