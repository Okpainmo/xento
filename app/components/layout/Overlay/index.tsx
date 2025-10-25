'use client';

import React from 'react';
import { useAppDispatch, useAppSelector } from '@/app/rtk-base/store';
import { hideOverlay } from '@/app/rtk-base/slices/overlaySlice';
import { slideTrayOut } from '@/app/rtk-base/slices/transactionsTraySlice';

function Overlay() {
  const { isOverlayOn } = useAppSelector((store) => store.overlay);

  const dispatch = useAppDispatch();

  const handleOverlayClick = () => {
    dispatch(hideOverlay());
    dispatch(slideTrayOut());
  };

  return (
    <div
      onClick={handleOverlayClick}
      className={`overlay ${
        isOverlayOn ? 'block' : 'hidden'
      } shadow w-full fixed top-0 left-0 right-0 bottom-0 min-h-screen z-30 bg-black/50 transition-opacity duration-300`}
    >
      {/* overlay */}
    </div>
  );
}

export default Overlay;
