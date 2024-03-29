'use client';

import useBookReviewModal from '@/hooks/useBookReviewModal';
import Image from 'next/image';
import { RxCross1 } from 'react-icons/rx';
import SingleBookReviews from '../Books/SingleBook/SingleBookReviews';
import Link from 'next/link';
import { FormEvent, MouseEvent, useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { SITE_URL } from '@/utils/config';

const BookReviewModal = () => {
  const bookReviewModal = useBookReviewModal();
  const {
    googleBookId,
    bookId,
    authors,
    bookTitle,
    thumbnailUrl,
    userRating,
    userReview,
    userReviewId,
  } = bookReviewModal.bookDetails;
  const [textAreaValue, setTextAreaValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setTextAreaValue(userReview ? userReview : '');
  }, [bookReviewModal, userReview]);

  useEffect(() => {
    if (bookReviewModal.isOpen) {
      bookReviewModal.onClose();
    }
  }, [router]);

  const handleModalClose = () => {
    bookReviewModal.onClose();
    bookReviewModal.clearBookDetails();
  };

  const handleRemoveFromBooks = useCallback(async () => {
    setIsLoading(true);
    if (bookReviewModal.bookDetails.googleBookId !== '') {
      const res = await fetch(
        `/api/users/books/${bookReviewModal.bookDetails.googleBookId}`,
        {
          method: 'DELETE',
        }
      );
      if (!res.ok) {
        console.log('Could not remove book');
      }
      setIsLoading(false);
      bookReviewModal.onClose();
      return router.refresh();
    }
  }, [bookReviewModal, router]);

  const handleClearRating = useCallback(
    async (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setIsLoading(true);
      if (bookReviewModal.bookDetails.userRating === 0) {
        setIsLoading(false);
        return;
      }
      if (bookReviewModal.bookDetails.userReviewId !== '') {
        const res = await fetch(
          `/api/review/${bookReviewModal.bookDetails.userReviewId}/rating`,
          {
            method: 'DELETE',
          }
        );
        if (!res.ok) {
          console.log('Could not clear book rating');
        }
        setIsLoading(false);
        bookReviewModal.onClose();
        return router.refresh();
      }
    },
    [bookReviewModal, router]
  );

  if (!bookReviewModal.isOpen) {
    return null;
  }

  const handleReviewFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const form = new FormData(e.currentTarget);
    const reviewDescription = form.get('reviewText');
    try {
      const res = await fetch(`${SITE_URL}/api/review`, {
        method: 'POST',
        body: JSON.stringify({
          bookId: googleBookId,
          description: reviewDescription,
          rating: userRating,
        }),
      });
      if (!res.ok) {
        setIsLoading(false);
        return null;
      }
      const reviewData = await res.json();
      router.refresh();
      setIsLoading(false);
      bookReviewModal.clearBookDetails();
      bookReviewModal.onClose();
    } catch (err: any) {
      setIsLoading(false);
      throw new Error(err);
    }
  };

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
            <Link href={`/books/${googleBookId}`}>
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
          <form onSubmit={handleReviewFormSubmit}>
            <div className="border-b-[1px] border-neutral-200 py-1">
              <div className="flex justify-start">
                My rating:
                <div className="flex justify-start items-center pl-1 gap-2">
                  <SingleBookReviews
                    bookId={googleBookId}
                    reviewRating={userRating}
                    size={18}
                    backgroundGray
                  />
                  <button
                    className="text-xs cursor-pointer text-neutral-400"
                    onClick={handleClearRating}
                    disabled={isLoading}
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>
            <div className="border-b-[1px] border-neutral-200">
              <div className="py-1">What do you think?</div>
              <textarea
                className="resize-y w-full h-auto border-[1px] border-neutral-300 rounded-sm px-[2px] py-[1px] min-h-[150px]
              focus:border-neutral-400 focus:shadow-sm outline-none"
                placeholder="Enter your review"
                name="reviewText"
                value={textAreaValue}
                onChange={(e) => setTextAreaValue(e.currentTarget.value)}
              />
            </div>
            <div className="relative">
              <input
                disabled={isLoading}
                type="submit"
                value="Post"
                className="px-[10px] py-[6px] rounded-sm bg-goodreads-beige/70 
                hover:bg-goodreads-beige border-[1px] cursor-pointer
                disabled:cursor-not-allowed disabled:opacity-50"
              />
              <button
                className="absolute right-0 top-0
              font-semibold text-xs
              hover:underline text-neutral-400
              "
                disabled={isLoading}
                onClick={handleRemoveFromBooks}
              >
                Remove from my books
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookReviewModal;
