import BookForm from '@/components/BookForm';
import Link from 'next/link';
import { getBooks } from '@/services/books';
import { BookType } from '@/models/book';
// export const dynamic = 'force-dynamic';

const Page = async () => {
  // const books = await getBooks();
  // const books: string[] = [];
  // const displayBooks = books.map((book: any) => {
  //   return (
  //     <li key={book.id}>
  //       <Link href={`/books/${book.id}`}>{book.title}</Link>
  //     </li>
  //   );
  // });
  return (
    <div className="px-[20%]">
      {/* <BookForm /> */}
      {/* <ul>{displayBooks}</ul> */}
      <div className="py-4">
        <div className=" pb-2 border-b border-b-slate-300 text-goodreads-mybooks-green">
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
            <div className="border p-2 m-2">Book</div>
            <div className="border p-2 m-2">Book</div>
            <div className="border p-2 m-2">Book</div>
            <div className="border p-2 m-2">Book</div>
            <div className="border p-2 m-2">Book</div>
            <div className="border p-2 m-2">Book</div>
            <div className="border p-2 m-2">Book</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
