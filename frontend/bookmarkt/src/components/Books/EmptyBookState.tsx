'use client';

import { GrFormNext } from 'react-icons/gr';
import Image from 'next/image';

interface EmptyBookStateProps {
  id: string;
}

const EmptyBookState: React.FC<EmptyBookStateProps> = ({ id }) => {
  return (
    <div className="flex justify-center my-6 min-h-[15rem]">
      <div className="flex flex-col md:flex-row gap-4 md:gap-24 md:justify-between items-center">
        <div
          className="relative w-[45%]
          md:h-[70%] md:w-[55%] md:max-w-[350px] aspect-[2/3]"
        >
          <Image src="/images/empty-book.png" alt="Book placeholder" fill />
        </div>

        <div className=" flex flex-col gap-4 items-start px-4">
          <div className="text-3xl font-bold">
            Apologies, it seems like the page you were looking for does not
            exist.
          </div>
          <div>
            We could not find the page you were looking for, please try a
            different one.
          </div>
          <button
            className="cursor-pointer hover:underline text-lg font-semibold decoration-[3px] underline-offset-2 group"
            onClick={() => window.history.go(-1)}
          >
            <div className="flex gap-2 items-center">
              <div>Go back</div>
              <GrFormNext size={18} className="hidden group-hover:block" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmptyBookState;
