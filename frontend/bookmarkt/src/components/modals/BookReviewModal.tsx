'use client';

import useBookReviewModal from '@/hooks/useBookReviewModal';
import { RxCross1 } from 'react-icons/rx';

const BookReviewModal = () => {
  const bookReviewModal = useBookReviewModal();

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
    relative"
      >
        <RxCross1
          size={12}
          className="absolute right-[5px] top-[5px] fill-neutral-400 cursor-pointer"
          onClick={() => bookReviewModal.onClose()}
        />
        <div className="relative flex flex-col">
          <div>
            <div>Book cover</div>
            <div>
              <div>Title</div>
              <div>By author</div>
            </div>
          </div>
          <div>
            <div>My rating (stars)</div>
            <div>Bookshelves</div>
          </div>
          <div>
            <div>What do you think?</div>
            <textarea
              className="resize-y w-full h-auto"
              placeholder="Enter your review"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookReviewModal;
