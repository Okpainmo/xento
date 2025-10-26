'use client';

import React from 'react';
import { useAppDispatch, useAppSelector } from '@/app/rtk-base/store';
import {
  setActiveTab,
  switchToBuy,
  switchToSell,
  switchToSwap, // Add switchToSwap here
} from '@/app/rtk-base/slices/formTabSlice'; // Import new actions
import SwapForm from '../SwapForm';
import TokenTransferForm from '../TransferForm';
import BuyForm from '../BuyForm'; // Import the new BuyForm
import SellForm from '../SellForm'; // Import the new BuyForm
import { usePathname } from 'next/navigation'; // Import usePathname

export default function FormsWrapper() {
  const dispatch = useAppDispatch();
  const { activeTab } = useAppSelector((store) => store.formTab);
  const pathname = usePathname(); // Get current pathname

  // Determine initial tab based on pathname
  React.useEffect(() => {
    if (pathname === '/buy-and-sell') {
      dispatch(switchToBuy()); // Default to Buy on buy-and-sell page
    } else {
      dispatch(switchToSwap()); // Default to Swap on other pages (e.g., home)
    }
  }, [pathname, dispatch]);

  return (
    <div className='w-full mx-auto'>
      {/* Tab Navigation */}
      <div className='flex mb-6 bg-gray-100 rounded-xl p-1'>
        {pathname !== '/buy-and-sell' && (
          <>
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
          </>
        )}
        {pathname === '/buy-and-sell' && (
          <>
            <button
              onClick={() => dispatch(setActiveTab('buy'))}
              className={`flex-1 py-3 px-4 text-center font-medium rounded-lg transition-all duration-200 ${
                activeTab === 'buy'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Buy
            </button>
            <button
              onClick={() => dispatch(setActiveTab('sell'))}
              className={`flex-1 py-3 px-4 text-center font-medium rounded-lg transition-all duration-200 ${
                activeTab === 'sell'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Sell
            </button>
          </>
        )}
      </div>

      {/* Form Content */}
      <div className='form-content'>
        {activeTab === 'swap' && <SwapForm />}
        {activeTab === 'send' && <TokenTransferForm />}
        {activeTab === 'buy' && <BuyForm />}
        {activeTab === 'sell' && <SellForm />}
      </div>
    </div>
  );
}
