import BookForm from '@/components/BookForm';
import Link from 'next/link';
import { getBooks } from '@/services/books';
import { BookType } from '@/models/book';
// export const dynamic = 'force-dynamic';

const Page = async () => {
  const books = await getBooks();
  return (
    <div>
      <BookForm />
      <ul>
        {books?.map((book: Partial<BookType>) => {
          return (
            <li
              key={book.id}
              style={{ padding: 8, border: '1px solid black', margin: 4 }}
            >
              <Link key={book.id} href={`/books/${book.id}`}>
                {book.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Page;
