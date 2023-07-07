'use client';

import { Review } from '@prisma/client';

interface MyBookDescriptionModalProps {
  title: string;
  authors?: string[];
  userReview: Omit<Review, 'bookId' | 'userId' | 'createdAt'>;
  bookReviews: Omit<Review[], 'bookId' | 'userId' | 'createdAt'>;
  description?: string;
}

const MyBookDescriptionModal: React.FC<MyBookDescriptionModalProps> = ({
  title,
  authors,
  userReview,
  bookReviews,
  description,
}) => {
  return (
    <div
      className="absolute t-0 l-[108px] w-[380px]
    flex flex-col items-start gap-2"
    >
      <h2>Title</h2>
      <div>By Author</div>
      <div>Ratings information div</div>
      <div>Some description</div>
      <div>
        <div>Add book button</div>
        <div>My Rating</div>
      </div>
    </div>
  );
};

export default MyBookDescriptionModal;
