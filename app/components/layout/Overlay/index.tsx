'use client';

import React from 'react';
import NavLinks from '../NavLinks';
import { HiOutlineXMark } from 'react-icons/hi2';
import { useAppDispatch, useAppSelector } from '@/app/rtk-base/store';
import { slideTrayOut } from '@/app/rtk-base/slices/transactionsTraySlice';
// import { showModal } from '@/app/rtk-base/slices/modalSlice';

function Overlay() {
  const { isTraySlidIn } = useAppSelector((store) => store.transactionsTray);

  const dispatch = useAppDispatch();

  return (
    <div
      onClick={() => dispatch(slideTrayOut())}
      className={`overlay ${
        isTraySlidIn ? 'block' : 'hidden'
      } shadow w-full fixed top-0 left-0 right-0 bottom-0 min-h-screen z-30 bg-black/50`}
    >
      {/* overlay */}
    </div>
  );
}

export default Overlay;
