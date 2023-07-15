'use client';

import useBookReviewModal from '@/hooks/useBookReviewModal';
import Image from 'next/image';
import { RxCross1 } from 'react-icons/rx';
import SingleBookReviews from '../Books/SingleBook/SingleBookReviews';
import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const BookReviewModal = () => {
  const bookReviewModal = useBookReviewModal();
  const router = useRouter();
  useEffect(() => {
    if (bookReviewModal.isOpen) {
      bookReviewModal.onClose();
    }
  }, [router]);

  const handleModalClose = () => {
    bookReviewModal.onClose();
    bookReviewModal.clearBookDetails();
  };
  const {
    googleBookId,
    bookId,
    authors,
    bookTitle,
    thumbnailUrl,
    userRating,
    userReview,
  } = bookReviewModal.bookDetails;

  if (!bookReviewModal.isOpen) {
    return null;
  }
  return (
    <div
      className="
      w-full h-full bg-[#181818]/70 z-[1000] fixed flex items-center justify-center
    "
    >
      <div
        className="
    w-[900px] min-h-[500px] rounded-sm
    py-[10px] px-[25px] bg-white z-[1001]
    relative text-sm"
      >
        <RxCross1
          size={12}
          className="absolute right-[5px] top-[5px] fill-neutral-400 cursor-pointer"
          onClick={handleModalClose}
        />
        <div className="relative flex flex-col">
          <div className="flex items-center border-b-[1px] border-neutral-200">
            <Link
              href={`/books/${googleBookId}`}
              // onClick={() => {
              //   bookReviewModal.onClose();
              // }}
            >
              <div className="relative w-[50px] h-[75px] mr-[10px]">
                <Image
                  src={`${
                    thumbnailUrl ? thumbnailUrl : '/images/empty-book.png'
                  }`}
                  fill
                  alt={`${bookTitle} book cover`}
                />
              </div>
            </Link>

            <div>
              <div className="text-lg font-semibold">{bookTitle}</div>
              <div className="text-sm">By {authors[0]}</div>
            </div>
          </div>
          <div className="border-b-[1px] border-neutral-200">
            <div>My rating {userRating} (SingleBookReviews stars)</div>
            <div>Bookshelves</div>
          </div>
          <div className="border-b-[1px] border-neutral-200">
            <div>What do you think?</div>
            <textarea
              className="resize-y w-full h-auto border-[1px] border-neutral-300 rounded-sm px-[2px] py-[1px] min-h-[10%]
              focus:border-neutral-400 focus:shadow-sm outline-none"
              placeholder="Enter your review"
            >
              {userReview}
            </textarea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookReviewModal;
