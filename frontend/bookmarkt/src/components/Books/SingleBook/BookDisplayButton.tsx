'use client';
import Button from '@/components/Button';
import useSingleBookDisplayModal from '@/hooks/useSingleBookDisplayModal';
import { Bookshelf } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { PiCaretDownBold } from 'react-icons/pi';
interface BookDisplayButtonProps {
  label: string;
  leftAction: 'Amazon' | 'AddToBookshelf';
  ISBN?: string;
  background?: string;
  bookId?: string;
  bookshelves?: Bookshelf[];
  currentBookshelf?: string;
}

const BookDisplayButton: React.FC<BookDisplayButtonProps> = ({
  label,
  ISBN,
  leftAction,
  background = '',
}) => {
  const singleBookModal = useSingleBookDisplayModal();

  const handleOpenBookModal = useCallback(() => {
    singleBookModal.onEnable();
    setTimeout(() => {
      singleBookModal.enableAnimate();
    }, 50);
  }, [singleBookModal]);
  const openAmazon = useCallback(() => {
    return window.open(`https://www.amazon.co.uk/s?k=${ISBN} `, '_blank');
  }, [ISBN]);

  return (
    <Button background={background}>
      <button
        onClick={leftAction === 'Amazon' ? openAmazon : handleOpenBookModal}
        className={`border-[#377458] px-4 h-9
        w-full
        ${
          background !== ''
            ? 'hover:bg-[#409970]'
            : 'border-[#409970] rounded-[3rem] border-[0.15rem] hover:bg-[#f4f4f4]'
        }
        flex-1 transition
      leading-none
      font-semibold
      rounded-[3rem]
      rounded-r-none border-r-[0.1rem]`}
      >
        {label}
      </button>
      <button
        className={`w-9 border-l-0 rounded-l-none border-[0.15rem] rounded-[3rem]
      border-[#409970] h-9 flex items-center justify-center transition
      ${
        background !== ''
          ? 'hover:bg-[#409970] border-none '
          : 'hover:bg-[#f4f4f4]'
      }
      `}
      >
        <PiCaretDownBold size={14} />
      </button>
    </Button>
  );
};

export default BookDisplayButton;
