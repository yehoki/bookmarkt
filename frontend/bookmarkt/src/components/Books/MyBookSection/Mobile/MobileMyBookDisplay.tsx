'use client';

import { Bookshelf, ReviewData, UserBookData } from '@prisma/client';
import MobileMyBook from './MobileMyBook';
import { AiOutlineSearch } from 'react-icons/ai';
import { MdOutlineClear } from 'react-icons/md';
import useMobileUpdateProgressModal from '@/hooks/useMobileUpdateProgressModal';
import {
  FormEvent,
  Suspense,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import { useRouter } from 'next/navigation';

interface MobileMyBookDisplayProps {
  myBooks: ({
    bookshelves: Bookshelf[];
    id?: string;
    googleId: string;
    title: string;
    authors: string[];
    reviewData: ReviewData;
    pageCount: number;
    currentUserBookProgress: UserBookData | undefined;
    userBookReview: {
      rating: number;
      review: string | undefined;
    };
    description: string;
    thumbnail: string;
    publishedDate: string | undefined;
  } | null)[];
  isCurrentUser: boolean;
}

const MobileMyBookDisplay: React.FC<MobileMyBookDisplayProps> = ({
  myBooks,
  isCurrentUser,
}) => {
  const [isDisabled, setIsDisabled] = useState(false);
  const mobileUpdateProgressModal = useMobileUpdateProgressModal();
  const [bookProgress, setBookProgress] = useState(0);
  const [bookProgressComment, setBookProgressComment] = useState('');

  const router = useRouter();

  useLayoutEffect(() => {
    setBookProgress(mobileUpdateProgressModal.currentProgress);
    setBookProgressComment(mobileUpdateProgressModal.currentComment);
  }, [mobileUpdateProgressModal.isOn]);

  const handleCloseModal = () => {
    mobileUpdateProgressModal.onDisable();
    mobileUpdateProgressModal.onModalClose();
    setBookProgress(0);
    setBookProgressComment('');
  };

  const handleUpdateProgress = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsDisabled(true);
    const res = await fetch('/api/users/bookProgress', {
      method: 'POST',
      body: JSON.stringify({
        googleBookId: mobileUpdateProgressModal.currentGoogleId,
        bookProgress: bookProgress,
        comment: bookProgressComment,
      }),
    });
    const updateBookProgress = await res.json();
    handleCloseModal();
    router.refresh();
    setIsDisabled(false);
  };

  return (
    <>
      <Suspense>
        {mobileUpdateProgressModal.isOn && (
          <>
            <h2 className="px-2 py-1">Update your status</h2>
            <section className="px-2">
              <form onSubmit={handleUpdateProgress}>
                <div className="text-xs text-[#D8D8D8] my-2">
                  I&apos;m on page{' '}
                  <input
                    className="w-10 text-goodreads-brown"
                    min={0}
                    max={mobileUpdateProgressModal.currentPageCount}
                    type="number"
                    value={bookProgress}
                    onChange={(e) =>
                      setBookProgress(parseInt(e.currentTarget.value))
                    }
                  />{' '}
                  of {mobileUpdateProgressModal.currentPageCount}
                </div>
                <textarea
                  value={bookProgressComment}
                  onChange={(e) =>
                    setBookProgressComment(e.currentTarget.value)
                  }
                  rows={4}
                  placeholder="What are your thoughts?"
                  maxLength={420}
                  className="w-full border rounded-sm border-[#D8D8D8] p-1 text-sm"
                />
                <div className="flex items-center justify-between gap-4">
                  <button
                    disabled={isDisabled}
                    onClick={handleCloseModal}
                    className="w-full border py-1
              border-goodreads-brown rounded-md
              hover:text-white
              hover:bg-goodreads-brown
              "
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isDisabled}
                    className="w-full border py-1 rounded-md
              bg-goodreads-brown text-white
              hover:bg-[#583720]
              "
                  >
                    Save Progress
                  </button>
                </div>
              </form>
            </section>
          </>
        )}
      </Suspense>

      {!mobileUpdateProgressModal.isOn && (
        <>
          <h1 className="text-2xl py-4 px-4">My Books</h1>
          <section className="px-4">
            <div className="relative mb-4">
              <input
                className="border rounded-sm border-[#D8D8D8]
            flex items-center
            py-1 px-8
            w-full
            placeholder-neutral-400
            "
                placeholder="Search my shelves"
              />
              <AiOutlineSearch className="absolute top-2 left-1" size={18} />
              <MdOutlineClear className="absolute top-2 right-1" size={18} />
            </div>
          </section>
          <div
            className="-mx-4 h-6 bg-[#f9f8f4] 
        border border-[#D8D8D8]"
          ></div>
          <section>
            <h2 className="uppercase font-semibold my-3 text-sm px-4">
              Currently Reading
            </h2>
            <ul>
              {myBooks.map((book) => (
                <>
                  {book && (
                    <MobileMyBook
                      title={book.title}
                      author={book.authors}
                      reviewData={book.reviewData}
                      thumbnail={book.thumbnail}
                      pageCount={book.pageCount}
                      bookProgress={book.currentUserBookProgress}
                      googleId={book.googleId}
                    />
                  )}
                </>
              ))}
            </ul>
          </section>
          <section>Bookshelves</section>
        </>
      )}
    </>
  );
};

export default MobileMyBookDisplay;
