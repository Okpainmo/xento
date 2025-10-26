'use client';

import { HiMagnifyingGlass } from 'react-icons/hi2';
import { useAppDispatch } from '@/app/rtk-base/store';
import { openExplorePopup } from '@/app/rtk-base/slices/exploreSlice';

export default function MarketSearchDecoy() {
  const dispatch = useAppDispatch();

  const handleOpenPopup = () => {
    dispatch(openExplorePopup());
  };

  return (
    <div className='coin-search-tab pt-4 flex justify-center'>
      <div className='relative w-full sm:w-[400px]'>
        <HiMagnifyingGlass className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
        <input
          type='text'
          placeholder='Search a coin'
          onFocus={handleOpenPopup}
          className='
            w-full
            px-10
            py-3
            rounded-xl
            border border-gray-200
            bg-white
            text-gray-900
            placeholder-gray-400
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
            focus:border-transparent
            transition-all
            shadow-sm
          '
        />
      </div>
    </div>
  );
}
