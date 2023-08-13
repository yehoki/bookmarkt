'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

interface HomeReadingChallengeProps {}

const HomeReadingChallenge: React.FC<HomeReadingChallengeProps> = ({}) => {
  const [challengeNumber, setChallengeNumber] = useState(0);
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    if (challengeNumber === 0) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [challengeNumber]);

  return (
    <>
      <div className="my-2 text-sm">
        <p>Challenge yourself to read more this year!</p>
      </div>
      <div className="flex gap-4">
        <div className="w-[110px] h-[130px] bg-[#7584e9]">
          <div className="text-white text-4xl font-semibold text-center pb-1">
            2023
          </div>
          <div className="w-[105px] h-[40px] relative mx-auto">
            <Image
              src="/images/2023-reading-challenge.svg"
              alt="Reading challenge"
              fill
            />
          </div>
          <div>
            <div className="text-white text-[22px] font-semibold uppercase text-center leading-none">
              Reading
            </div>
            <div className="text-white text-md font-semibold uppercase text-center leading-none">
              Challenge
            </div>
          </div>
        </div>
        <div className="text-sm">
          <form className="">
            <p className="mb-1">I want to read</p>
            <input
              type="number"
              className="bg-white border border-neutral-400 rounded-sm w-1/3
                    px-1 py-[2px] outline-none focus:shadow-md 
                    mb-1"
              min={0}
              defaultValue={0}
              value={challengeNumber}
              onChange={(e) =>
                setChallengeNumber(parseInt(e.currentTarget.value))
              }
            />
            <p className="mb-1">books in {new Date().getFullYear()}</p>
            <button
              className={`px-3 py-2 leading-none
                    bg-goodreads-beige hover:bg-[#ede6d6]
                    active:bg-goodreads-brown/20
                    border-goodreads-brown/20 border rounded-sm
                    ${
                      isDisabled
                        ? 'bg-[#F3F3F3] border-[#DDDDDD] text-[#CCCCCC] cursor-default'
                        : ''
                    }
                    `}
              disabled={isDisabled}
            >
              Start challenge
            </button>
          </form>
        </div>
        {/* <div>
                  <div className="text-2xl">
                    {booksReadFromThisYear ? booksReadFromThisYear.length : 0}
                  </div>
                  <div className="text-lg">
                    {booksReadFromThisYear && booksReadFromThisYear.length > 1
                      ? 'books completed'
                      : 'book completed'}
                  </div>
                </div> */}
      </div>
    </>
  );
};

export default HomeReadingChallenge;
