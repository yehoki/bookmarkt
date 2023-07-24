'use client';

import { BookType } from '@/models/book';
import { getBooks } from '@/services/books';
import { useSession } from 'next-auth/react';
import MyBook from './MyBook';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const DisplayMyBooks = async () => {
  // const { data: session, status } = useSession();
  // const router = useRouter();
  // // const books = await getBooks();
  // useEffect(() => {
  //   if (status === 'unauthenticated') {
  //     console.log('No JWT');
  //     router.push('/');
  //   } else if (status === 'loading') {
  //     console.log('loading auth');
  //   } else {
  //     console.log('AUthenticated');
  //   }
  // }, [status]);
  // if (!books) return null;

  // const displayBooks = books.map((book: BookType) => {
  //   return (
  //     <MyBook
  //       key={book.id}
  //       id={book.id}
  //       author={book.author}
  //       title={book.title}
  //     />
  //   );
  // });

  return <>{/* {displayBooks} */}</>;
};

export default DisplayMyBooks;
