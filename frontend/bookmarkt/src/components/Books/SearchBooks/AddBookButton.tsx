'use client';
import { Bookshelf } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { Suspense, useCallback, useEffect, useState } from 'react';
import { AiFillCaretDown } from 'react-icons/ai';
import { FaCheck } from 'react-icons/fa';
import BookshelfButton from './BookshelfButton';
import { SITE_URL } from '@/utils/config';
import useAddBookButton from '@/hooks/useAddBookButton';

interface AddBookButtonProps {
  bookId: string;
  bookshelves: Bookshelf[];
  currentBookshelf: string;
}

const AddBookButton: React.FC<AddBookButtonProps> = ({
  bookId,
  bookshelves,
  currentBookshelf,
}) => {
  const [isBookshelfDropdown, setIsBookshelfDropdown] = useState(false);
  const [displayBookshelf, setDisplayBookshelf] = useState(currentBookshelf);
  const [bookshelvesWithoutCurrent, setBookshelvesWithoutCurrent] =
    useState(bookshelves);
  const [isLoading, setIsLoading] = useState(false);
  // fetch if book is read
  const router = useRouter();
  const addBookButton = useAddBookButton();

  const handleChangeBookshelf = async (newBookshelfName: string) => {
    if (!addBookButton.isEnabled) {
      return;
    }
    addBookButton.onDisable();
    setIsLoading(true);
    if (displayBookshelf !== '') {
      // When a current bookshelf exist, send it via a PUT request to update
      const res = await fetch(`${SITE_URL}/api/users/bookshelves`, {
        method: 'PUT',
        body: JSON.stringify({
          currentBookshelf: displayBookshelf,
          nextBookshelf: newBookshelfName,
          bookId: bookId,
        }),
      });
      const checkReroute = await res.json();
      if (
        checkReroute &&
        checkReroute.message &&
        checkReroute.message === 'Need to login'
      ) {
        setIsLoading(false);
        return router.push('/user/sign_up');
      }
    } else {
      const res = await fetch(`${SITE_URL}/api/users/bookshelves`, {
        method: 'POST',
        body: JSON.stringify({
          googleId: bookId,
          newBookshelf: newBookshelfName,
        }),
      });
      const checkReroute = await res.json();
      if (
        checkReroute &&
        checkReroute.message &&
        checkReroute.message === 'Need to login'
      ) {
        setIsLoading(false);
        return router.push('/user/sign_up');
      }
    }
    setDisplayBookshelf(newBookshelfName);
    router.refresh();
    setIsLoading(false);
    addBookButton.onEnable();
  };

  useEffect(() => {
    const filteredBookshelves = bookshelves.filter(
      (bookshelf) => bookshelf.name !== displayBookshelf
    );
    setBookshelvesWithoutCurrent(filteredBookshelves);
  }, [displayBookshelf, bookshelves]);

  const bookshelfNames = bookshelvesWithoutCurrent.map((bookshelf) => (
    <li
      className="hover:bg-neutral-300 pl-[15px] text-xs py-[1px]
      cursor-pointer"
      key={bookshelf.id}
      onClick={(e) => {
        handleChangeBookshelf(e.currentTarget.innerText);
      }}
    >
      {bookshelf.name}
    </li>
  ));

  return (
    <div className="bg-[#409D69]/90 text-[13px] text-white rounded-sm max-w-[150px]">
      <div className="flex items-center justify-between">
        {isLoading ? (
          <div className="px-2 py-[5px]">Saving...</div>
        ) : (
          <>
            <Suspense fallback="...">
              <div
                className={`min-w-[105px] pr-1 pl-2 py-[5px] border-r-[1px] 
        font-lato text-left overflow-hidden text-ellipsis whitespace-nowrap
        flex-1
        ${
          currentBookshelf === ''
            ? 'hover:bg-[#409D69] border-neutral-600'
            : 'bg-[#F2F2F2] text-black border-none'
        } rounded-bl-sm rounded-tl-sm`}
              >
                {displayBookshelf !== '' ? (
                  <BookshelfButton displayBookshelfName={displayBookshelf} />
                ) : (
                  <div
                    className="cursor-pointer"
                    onClick={() => handleChangeBookshelf('Want to read')}
                  >
                    Want to read
                  </div>
                )}
              </div>
            </Suspense>
            <div
              className="px-2 py-2 hover:bg-[#409D69] rounded-tr-sm rounded-br-sm relative group
          cursor-pointer"
              onClick={(e) => {
                setIsBookshelfDropdown(!isBookshelfDropdown);
              }}
            >
              <AiFillCaretDown size={10} className="fill-white" />
              <div
                className={`absolute right-0 top-[26px]
            cursor-auto w-[180px] z-10
          bg-white text-black
            border-[1px] border-neutral-300 rounded-sm
            ${
              isBookshelfDropdown
                ? 'scale-100 origin-top-right delay-150 duration-300 transform ease-in-out'
                : 'scale-0 origin-top-right duration-300 transform ease-in-out'
            }`}
              >
                <ul className="mt-[2px]">{bookshelfNames}</ul>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AddBookButton;
