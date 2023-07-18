'use client';

import useMobileSearch from '@/hooks/useMobileSearch';

const MobileSearchInput = () => {
  const mobileSearch = useMobileSearch();

  return (
    <div className="navOne:hidden flex w-full px-2 py-1 items-center gap-1">
      <input
        type="text"
        className="w-full px-2 py-[5px] 
        rounded-[4px] border-[1px] border-neutral-300
        outline-none
        focus:border-neutral-700 focus:shadow-sm"
        placeholder="Search books"
      />
      <div
        onClick={() => mobileSearch.onClose()}
        className="
  text-goodreads-mybooks-green text-sm hover:underline cursor-pointer"
      >
        Cancel
      </div>
    </div>
  );
};

export default MobileSearchInput;
