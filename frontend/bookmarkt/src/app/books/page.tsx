import BookForm from '@/components/BookForm';
import Link from 'next/link';
import { getBooks } from '@/services/books';
// export const dynamic = 'force-dynamic';

const Page = async () => {
  const books = await getBooks();
  return (
    <div>
      <BookForm />
      <ul>
        {books?.map((book: any) => {
          return <li key={book._id}>{book.title}</li>;
        })}
      </ul>
    </div>
  );
};

export default Page;
