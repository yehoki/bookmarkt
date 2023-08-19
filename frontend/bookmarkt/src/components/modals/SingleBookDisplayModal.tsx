'use client';

import useSingleBookDisplayModal from '@/hooks/useSingleBookDisplayModal';
import { RxCross1 } from 'react-icons/rx';
import Button from '../Button';
import { useCallback } from 'react';
interface SingleBookDisplayModalProps {}

const SingleBookDisplayModal: React.FC<SingleBookDisplayModalProps> = ({}) => {
  const singleBookModal = useSingleBookDisplayModal();

  const handleModalClose = useCallback(() => {
    singleBookModal.disableAnimate();
    setTimeout(() => {
      singleBookModal.onDisable();
    }, 300);
  }, [singleBookModal]);

  const handleWebsiteRoute = (url: string, ISBN: string) => {
    return window.open(`${url}${ISBN}`, '_blank');
  };

  return (
    <>
      {singleBookModal.isOn && (
        <div
          className={`h-[100vh] w-full z-[200]
      fixed flex flex-col justify-end items-center md:justify-center
    bg-black/20
      transition duration-75
      ${singleBookModal.isAnimate ? 'opacity-100' : 'opacity-0 delay-250'}
      `}
        >
          <div
            className={`bottom-0 bg-white
          rounded-t-xl md:rounded-xl relative
          min-w-[280px] max-w-[410px] w-full
          py-6
        transition
        ${singleBookModal.isAnimate ? 'translate-y-0' : 'translate-y-96'}
          `}
          >
            <button
              onClick={handleModalClose}
              className="absolute top-5 right-4 rounded-full 
              hover:bg-[#f4f4f4] transition p-2
              outline-black"
            >
              <RxCross1 size={18} />
            </button>
            <h3 className="pl-6 pr-4 pb-4 text-lg">
              Choose a shelf for this book
            </h3>
            <div className="pl-6 pr-4 pt-2">
              <ul>
                {singleBookModal.decideOption === 'bookshelf' && (
                  <>
                    {singleBookModal.bookshelfOptions.bookshelves.map(
                      (bookshelf) => {
                        return (
                          <li key={bookshelf.id} className="">
                            <Button border="border-[#271c14]/75 border-[0.15rem]">
                              <button
                                className="h-9 text-center w-full hover:bg-[#f4f4f4] 
        rounded-[3rem] transition font-semibold text-[#271c14]/90"
                              >
                                {bookshelf.name}
                              </button>
                            </Button>
                          </li>
                        );
                      }
                    )}
                  </>
                )}
                {singleBookModal.decideOption === 'buy' && (
                  <>
                    {singleBookModal.websiteOptions.websites.map((website) => {
                      return (
                        <li key={website.name} className="">
                          <Button border="border-[#271c14]/75 border-[0.15rem]">
                            <button
                              onClick={() =>
                                handleWebsiteRoute(
                                  website.url,
                                  singleBookModal.websiteOptions.ISBN
                                )
                              }
                              className="h-9 text-center w-full hover:bg-[#f4f4f4] 
rounded-[3rem] transition font-semibold text-[#271c14]/90"
                            >
                              {website.name}
                            </button>
                          </Button>
                        </li>
                      );
                    })}
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleBookDisplayModal;
