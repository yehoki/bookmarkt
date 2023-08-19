'use client';
import { useRouter } from 'next/navigation';
import { PiCaretDownBold } from 'react-icons/pi';
interface BookDisplayButtonProps {
  label: string;
  leftAction: 'Amazon' | 'AddToBookshelf';
  ISBN?: string;
  background?: boolean;
}

const BookDisplayButton: React.FC<BookDisplayButtonProps> = ({
  label,
  ISBN,
  leftAction,
  background,
}) => {
  const openAmazon = () => {
    return window.open(`https://www.amazon.co.uk/s?k=${ISBN} `, '_blank');
  };

  return (
    <div
      className={`flex items-center text-white rounded-[3rem]
     mb-2
     ${background ? 'bg-[#3f8363]' : 'text-[#271c14]'}
     `}
    >
      <button
        onClick={leftAction === 'Amazon' ? openAmazon : () => {}}
        className={`border-[#377458] px-4 h-9
        w-full
        ${
          background
            ? 'hover:bg-[#409970] '
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
        background
          ? 'hover:bg-[#409970] '
          : 'border-[#409970] rounded-[3rem] border-[0.15rem] hover:bg-[#f4f4f4]'
      }
      `}
      >
        <PiCaretDownBold size={14} />
      </button>
    </div>
  );
};

export default BookDisplayButton;
