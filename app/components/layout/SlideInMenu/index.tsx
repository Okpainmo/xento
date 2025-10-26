'use client';

import React from 'react';
import NavLinks from '../NavLinks';
import { HiOutlineXMark } from 'react-icons/hi2';
import { useAppDispatch, useAppSelector } from '@/app/rtk-base/store';
import { slideNavOut } from '@/app/rtk-base/slices/navToggleSlice';
// import { showModal } from '@/app/rtk-base/slices/modalSlice';

function SlideInMenu() {
  const { isNavSlidIn } = useAppSelector((store) => store.navToggle);

  const dispatch = useAppDispatch();

  return (
    <nav
      className={`${
        isNavSlidIn ? 'nav--slide-in' : 'nav--slide-out'
      } bg-glass_light w-full lg:hidden fixed top-0 left-0 right-0 min-h-screen z-100`}
    >
      <div className='relative flex items-center'>
        <div
          className='nav-bar-icon-wrapper cursor-pointer w-[35px] h-[35px] rounded-full border border-gray-500 z-40 px-[4px] pt-[5px] pb-[4.2px] absolute top-[30px] left-[30px]'
          onClick={() => dispatch(slideNavOut())} // add an update here - so as to also close the "learn" pop-up menu as well when ever you close the slide-in menu.
        >
          {/* <HiOutlineBars2 strokeWidth={1.5} className="w-6 h-6 text-black" /> */}
          <HiOutlineXMark className='w-6 h-6 text-black' />
        </div>
      </div>
      <NavLinks />
    </nav>
  );
}

export default SlideInMenu;
