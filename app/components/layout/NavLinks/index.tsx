import React, { useState } from 'react';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/app/rtk-base/store';
import { slideNavOut } from '@/app/rtk-base/slices/navToggleSlice';
import { slideTrayIn } from '@/app/rtk-base/slices/transactionsTraySlice';
import { showOverlay } from '@/app/rtk-base/slices/overlaySlice';
import {
  closeExplorePopup,
  openExplorePopup,
  // selectToken,
} from '@/app/rtk-base/slices/exploreSlice';

function NavLinks() {
  const [showLearnMenu, setShowLearnMenu] = useState(false);

  const dispatch = useAppDispatch();

  return (
    <ul
      className='relative mb-[150px] md:mb-0 uppercase font-normal flex flex-col text-center p-4 sm:p-0 w-[300px] 
    xsm:w-[400px] mx-auto mt-[120px] lg:mt-[0] lg:flex-row lg:gap-10 lg:w-full text-[12px]'
    >
      <li className='w-full'>
        <Link
          href='/'
          onClick={() => dispatch(slideNavOut())}
          className='flex justify-center border-b border-gray-300 py-5 lg:border-none lg:py-0 w-full'
        >
          Home
        </Link>
      </li>

      <li className='w-full'>
        <div
          onClick={() => {
            dispatch(slideNavOut());
            dispatch(slideTrayIn());
            dispatch(showOverlay());
          }}
          className='cursor-pointer flex justify-center border-b border-gray-300 py-5 lg:border-none lg:py-0 w-full'
        >
          Transactions
        </div>
      </li>
      <li className='w-full'>
        <div
          onClick={() => {
            dispatch(slideNavOut());
            dispatch(openExplorePopup());
            // dispatch(slideTrayIn());
          }}
          className='cursor-pointer flex justify-center border-b border-gray-300 py-5 lg:border-none lg:py-0 w-full'
        >
          Explore
        </div>
      </li>
      <li className='w-full'>
        <div
          onClick={() => {
            dispatch(slideNavOut());
            // dispatch(slideTrayIn());
          }}
          className='cursor-pointer flex justify-center border-b border-gray-300 py-5 lg:border-none lg:py-0 w-full'
        >
          Guides
        </div>
      </li>
    </ul>
  );
}

export default NavLinks;
