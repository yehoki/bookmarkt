import BookForm from '@/components/BookForm';
import Link from 'next/link';
import { getBooks } from '@/services/books';
import { BookType } from '@/models/book';
import { Suspense } from 'react';
import DisplayBooks from '@/components/Books/DisplayBooks';

const Page = async () => {
  return (
    <div className="px-[20%]">
      <div className="py-4">
        <div className="pb-2 border-b border-b-slate-300 text-goodreads-mybooks-green">
          <h2 className="font-bold text-2xl">My Books</h2>
        </div>
        {/* below header */}
        <div className="flex">
          <div className="flex flex-col w-1/6">
            <div className="border-b border-b-slate-300">
              <h3>Bookshelves</h3>
              <ul>
                <li>Bookshelf 1</li>
                <li>Bookshelf 2</li>
                <li>Bookshelf 3</li>
              </ul>
            </div>
            <div>
              <h3>Your reading activity</h3>
            </div>
            <div></div>
          </div>
          <div className="grid grid-cols-5 flex-[1_1_75%]">
            <Suspense fallback={<p>Loading books...</p>}>
              <DisplayBooks />
            </Suspense>
          </div>
        </div>
      </div>
      <BookForm />
    </div>
  );
};

export default Page;
