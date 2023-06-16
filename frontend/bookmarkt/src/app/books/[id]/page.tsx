import { useParams } from 'next/navigation';

async function getBook(id: string) {
  const res = await fetch(`http://localhost:3000/api/books/${id}`);
  const data = await res.json();
  return data;
}

export default async function BookPage({ params }: { params: { id: string } }) {
  const id = params.id;
  const book = await getBook(id);
  return (
    <div>
      {book.title} by {book.author}
    </div>
  );
}
