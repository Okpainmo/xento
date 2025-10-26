'use client';

import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useAppDispatch, useAppSelector } from '@/app/rtk-base/store';
import {
  openTokenPopup,
  setFromToken,
} from '@/app/rtk-base/slices/tokenSelectionSlice';
import { tokens } from '@/app/custom-data/tokens';
import TokenSelectionPopup from '../SelectTokenPopUp';
import Image from 'next/image';
import { HiChevronDown } from 'react-icons/hi2';

export default function BuyForm() {
  const [form, setForm] = useState({ amount: '', usdValue: '0.00' });
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  const { fromToken } = useAppSelector((store) => store.tokenSelection);
  const currentToken = fromToken;

  // Default token for buying
  useEffect(() => {
    if (!currentToken && tokens.length > 0) {
      const defaultToken = tokens.find((token) => token.symbol === 'USDT');
      if (defaultToken) {
        dispatch(setFromToken(defaultToken));
      }
    }
  }, [currentToken, dispatch]);

  async function executeBuy() {
    if (!currentToken) {
      toast.error('Please select a token');
      return;
    }

    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast.success('Buy completed successfully!');
      setForm({ amount: '', usdValue: '0.00' });
    } catch {
      toast.error('Buy failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  const handleTokenSelect = () => {
    dispatch(openTokenPopup('from'));
  };

  return (
    <>
      <form>
        {/* Token Amount Input */}
        <div className='mb-3'>
          <div className='bg-gray-50 border border-gray-200 rounded-[12px] p-4'>
            <div className='flex items-center justify-between mb-2'>
              <span className='text-sm text-gray-600'>You want</span>
            </div>
            <div className='flex items-center space-x-3'>
              <input
                className='flex-1 text-2xl font-medium bg-transparent border-none outline-none placeholder-gray-400 no-spinner'
                type='number'
                placeholder='0.0'
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
              />
              <div className='items-center relative'>
                <button
                  type='button'
                  onClick={handleTokenSelect}
                  className='absolute cursor-pointer flex gap-1 items-center bg-white rounded-[20px] py-1 
                  px-2 bottom-[-5px] right-[5px] border border-gray-200 hover:border-gray-300 transition-colors z-10'
                >
                  {currentToken ? (
                    <>
                      <Image
                        alt={currentToken.name}
                        src={currentToken.logo}
                        width={20}
                        height={20}
                        className='rounded-[4px]'
                      />
                      <div className='token-name font-medium text-[12px]'>
                        {currentToken.symbol}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className='w-5 h-5 bg-gray-200 rounded-[4px]'></div>
                      <div className='token-name font-medium text-[12px] text-gray-500'>
                        Select
                      </div>
                    </>
                  )}
                  <HiChevronDown className='text-[30px] text-black font-bold' />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* USD Equivalent Display */}
        <div className='mb-6'>
          <div className='bg-gray-50 border border-gray-200 rounded-[12px] p-4'>
            <div className='flex items-center justify-between mb-2'>
              <span className='text-sm text-gray-600'>Amount to Pay (USD)</span>
            </div>
            <div className='flex items-center justify-between'>
              <span className='text-2xl font-medium text-gray-800'>
                ${form.usdValue}
              </span>
              <span className='text-sm text-gray-500'>USD</span>
            </div>
          </div>
        </div>

        <button
          type='button'
          onClick={executeBuy}
          disabled={isLoading}
          className='submit poppins font-normal text-center bg-blue-600 py-3 text-[14px] sm:text-[14px] text-white rounded-[10px] w-full hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
        >
          {isLoading ? 'Buying...' : 'Buy Tokens'}
        </button>
      </form>

      {/* <TokenSelectionPopup /> */}
    </>
  );
}
