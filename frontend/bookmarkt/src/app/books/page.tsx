import BookForm from '@/components/BookForm';
import Link from 'next/link';
import { getBooks } from '@/services/books';
import { BookType } from '@/models/book';
import { Suspense, useEffect } from 'react';
import DisplayBooks from '@/components/Books/DisplayBooks';
import MyBook from '@/components/Books/MyBookSection.tsx/MyBook';
import DisplayMyBooks from '@/components/Books/MyBookSection.tsx/DisplayMyBooks';
import useUserStore from '@/hooks/useUserStore';
import getCurrentUserBooks from '@/actions/getCurrentUserBooks';

const Page = async () => {
  const currentUserBooks = await getCurrentUserBooks();
  return (
    <div className=" pt-20 w-[1000px] mx-auto">
      <div className="pb-2 border-b border-b-slate-300 flex items-center justify-between">
        <h2
          className="
        font-bold
        text-xl
        text-goodreads-mybooks-green
        "
        >
          My Books
        </h2>
        <div>
          Search
          {JSON.stringify(currentUserBooks)}
        </div>
      </div>
      {/* below header */}
      <div>
        <div className="flex flex-row justify-between">
          {/* Left col */}
          <div className="w-[200px]">
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
            <div>
              <h3>Add books</h3>
            </div>
            <div>
              <h3>Tools</h3>
            </div>
          </div>
          {/* Right col */}
          <div className="w-[750px]">
            <div className="grid grid-cols-6 flex-[1_1_75%] gap-2">
              <Suspense fallback={<p>Loading books...</p>}>
                <DisplayMyBooks />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
      <BookForm />
    </div>
  );
};

export default Page;
