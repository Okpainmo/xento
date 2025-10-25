'use client';

import React from 'react';
import { useAppDispatch, useAppSelector } from '@/app/rtk-base/store';
import { setActiveTab } from '@/app/rtk-base/slices/formTabSlice';
import SwapForm from '../SwapForm';
import TokenTransferForm from '../TransferForm';

export default function FormsWrapper() {
  const dispatch = useAppDispatch();
  const { activeTab } = useAppSelector((store) => store.formTab);

  return (
    <div className='w-full mx-auto'>
      {/* Tab Navigation */}
      <div className='flex mb-6 bg-gray-100 rounded-xl p-1'>
        <button
          onClick={() => dispatch(setActiveTab('swap'))}
          className={`flex-1 py-3 px-4 text-center font-medium rounded-lg transition-all duration-200 ${
            activeTab === 'swap'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Swap
        </button>
        <button
          onClick={() => dispatch(setActiveTab('send'))}
          className={`flex-1 py-3 px-4 text-center font-medium rounded-lg transition-all duration-200 ${
            activeTab === 'send'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Send
        </button>
      </div>

      {/* Form Content */}
      <div className='form-content'>
        {activeTab === 'swap' ? <SwapForm /> : <TokenTransferForm />}
      </div>
    </div>
  );
}
