'use client';
import { useRouter } from 'next/navigation';
import { PiCaretDownBold } from 'react-icons/pi';
interface BookDisplayButtonProps {
  label: string;
}

const BookDisplayButton: React.FC<BookDisplayButtonProps> = ({ label }) => {
  const router = useRouter();
  return (
    <div className="flex items-center bg-[#3f8363] text-white rounded-[3rem]">
      <button
        className="border-[#377458] px-4 h-9
        w-full
        hover:bg-[#409970] transition
        flex-1
      leading-none
      font-semibold
      rounded-[3rem]
      rounded-r-none border-r-[0.1rem]"
      >
        {label}
      </button>
      <button
        className="w-9 border-l-0 rounded-l-none border-[0.15rem] rounded-[3rem]
      border-[#409970] h-9 flex items-center justify-center
      hover:bg-[#409970] transition
      "
      >
        <PiCaretDownBold size={14} />
      </button>
    </div>
  );
};

export default BookDisplayButton;
