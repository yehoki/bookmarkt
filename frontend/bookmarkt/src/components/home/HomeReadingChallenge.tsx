'use client';

import { ReadingChallenge } from '@prisma/client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';
import ReadingChallengeProgress from './ReadingChallengeProgress';

interface HomeReadingChallengeProps {
  readingChallenge: ReadingChallenge | null;
  booksReadThisYear: number;
}

const HomeReadingChallenge: React.FC<HomeReadingChallengeProps> = ({
  readingChallenge,
  booksReadThisYear,
}) => {
  const [challengeNumber, setChallengeNumber] = useState(0);
  const [isDisabled, setIsDisabled] = useState(true);
  const router = useRouter();
  useEffect(() => {
    if (challengeNumber === 0) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [challengeNumber]);

  const handleReadingChallengeSubmit = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setIsDisabled(true);
    const res = await fetch('/api/users/readingChallenge', {
      method: 'POST',
      body: JSON.stringify({
        target: challengeNumber,
      }),
    });
    const userUpdated = await res.json();
    router.refresh();
  };

  return (
    <>
      {!readingChallenge && (
        <div className="my-2 text-sm">
          <p>Challenge yourself to read more this year!</p>
        </div>
      )}
      <div className="flex gap-4 mt-2">
        <div className="w-[110px] h-[130px] bg-[#7584e9] relative px-2">
          {readingChallenge && booksReadThisYear >= readingChallenge.target && (
            <div className="absolute top-0 left-0 z-50">
              <div className="relative w-[67px] h-[67px]">
                <Image
                  src={'/images/completed.svg'}
                  fill
                  alt="Completed reading challenge"
                />
              </div>
            </div>
          )}
          <div className="text-white text-4xl font-semibold text-center pb-1">
            2023
          </div>
          <div className="w-[95px] h-[40px] relative ">
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
        {!readingChallenge && (
          <div className={`text-sm`}>
            <form onSubmit={handleReadingChallengeSubmit} className="">
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
        )}

        {readingChallenge && booksReadThisYear < readingChallenge.target && (
          <div>
            <div className="text-2xl">{booksReadThisYear}</div>
            <div className="text-sm">
              {booksReadThisYear !== 1 ? 'books completed' : 'book completed'}
            </div>
            <div className="flex gap-1 text-sm items-center">
              <ReadingChallengeProgress
                percentage={parseInt(
                  ((booksReadThisYear / readingChallenge.target) * 100).toFixed(
                    0
                  )
                )}
              />
              <div>
                {booksReadThisYear}/{readingChallenge.target} (
                {((booksReadThisYear / readingChallenge.target) * 100).toFixed(
                  0
                )}
                %)
              </div>
            </div>
          </div>
        )}
        {readingChallenge && booksReadThisYear >= readingChallenge.target && (
          <div className="text-sm">
            <div>Congrats!</div>
            <div>
              You have read {booksReadThisYear} books of your goal of{' '}
              {readingChallenge.target}!
            </div>
            <div className="flex gap-1 text-sm items-center">
              <ReadingChallengeProgress
                percentage={parseInt(
                  ((booksReadThisYear / readingChallenge.target) * 100).toFixed(
                    0
                  )
                )}
              />
              <div>
                {booksReadThisYear}/{readingChallenge.target} (
                {((booksReadThisYear / readingChallenge.target) * 100).toFixed(
                  0
                )}
                %)
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default HomeReadingChallenge;
