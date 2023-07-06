'use client';

import { getSingleBook } from '@/actions/getSingleBook';
import { Book } from '@prisma/client';

interface SingleBookReviewsProps {
  bookId: string;
}

const SingleBookReviews: React.FC<SingleBookReviewsProps> = ({ bookId }) => {
  const handleAddRating = async () => {
    const getBooks = await fetch('http://localhost:3000/api/users/books');
    if (!getBooks.ok) {
      return null;
    }
    const data: Book[] = await getBooks.json();
    if (!data.map((book) => book.googleId).includes(bookId)) {
      const bookInfo = await getSingleBook(bookId);
      const addBook = await fetch('http://localhost:3000/api/users/books', {
        method: 'POST',
        body: JSON.stringify({
          id: bookInfo.id,
          title: bookInfo.volumeInfo.title,
          author: bookInfo.volumeInfo.authors
            ? bookInfo.volumeInfo.authors
            : [],
          subtitle: bookInfo.volumeInfo.subtitle
            ? bookInfo.volumeInfo.subtitle
            : '',
          description: bookInfo.volumeInfo.description
            ? bookInfo.volumeInfo.description
            : '',
          imageLinks: bookInfo.volumeInfo.imageLinks
            ? bookInfo.volumeInfo.imageLinks
            : {},
          publishedDate: bookInfo.volumeInfo.publishedDate
            ? bookInfo.volumeInfo.publishedDate
            : '',
        }),
      });
      console.log('Book has been added');
    }
    const res = await fetch('http://localhost:3000/api/review', {
      method: 'POST',
      body: JSON.stringify({
        rating: 4,
        title: 'New Review',
        description: 'New Review Description',
        bookId: bookId,
      }),
    });
    if (!res.ok) {
      return null;
    }
    const reviewData = await res.json();
    console.log(reviewData, 'Review made');
  };

  return (
    <div
      className="h-[300px] w-full bg-purple-200 text-green-900"
      onClick={handleAddRating}
    >
      Ratings Div
    </div>
  );
};

export default SingleBookReviews;
