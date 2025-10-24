'use client';

import React from 'react';
import { HiBars3BottomLeft } from 'react-icons/hi2';
import { useDispatch } from 'react-redux';
import { useAppDispatch, useAppSelector } from '@/app/rtk-base/store';

import { slideNavIn } from '@/app/rtk-base/slices/navToggleSlice';

function MenuToggleButtonForMobile() {
  const dispatch = useAppDispatch();

  return (
    <div
      className='inline-block cursor-pointer lg:hidden'
      onClick={() => {
        dispatch(slideNavIn());
      }}
    >
      <HiBars3BottomLeft className='text-[25px]' />
    </div>
  );
}

export default MenuToggleButtonForMobile;
