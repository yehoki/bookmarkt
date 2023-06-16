import type { BookType } from '@/models/book';
import Link from 'next/link';
import { ScriptProps } from 'next/script';
async function getBooks() {
  const res = await fetch('http://localhost:3000/api/books');
  const data = await res.json();
  return data;
}

export default async function BooksPage() {
  const books = await getBooks();
  const dispBooks = books?.map((book: BookType) => {
    return <Book key={book.title} book={book} />;
  });
  return (
    <div>
      <h1>Books</h1>
      <div>{dispBooks}</div>
    </div>
  );
}

const Book = ({ book }: any) => {
  return (
    <Link href={`/books/${book._id}`}>
      <div>
        <h2>{book.title}</h2>
        <h3>{book.author}</h3>
      </div>
    </Link>
  );
};
