'use client';

import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useAppDispatch, useAppSelector } from '@/app/rtk-base/store';
import {
  openTokenPopup,
  setFromToken,
  setToToken,
} from '@/app/rtk-base/slices/tokenSelectionSlice';
import { tokens } from '@/app/custom-data/tokens';
import TokenSelectionPopup from '../SelectTokenPopUp';
import Image from 'next/image';
import { HiChevronDown, HiArrowPath } from 'react-icons/hi2';
import { HiArrowSmallDown } from 'react-icons/hi2';

export default function SwapForm() {
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTokenSelector, setActiveTokenSelector] = useState<
    'from' | 'to' | null
  >(null);

  const dispatch = useAppDispatch();
  const { fromToken, toToken } = useAppSelector(
    (store) => store.tokenSelection
  );

  // Set default tokens on component mount
  useEffect(() => {
    if (!fromToken && tokens.length > 0) {
      const ethToken = tokens.find((token) => token.symbol === 'ETH');
      if (ethToken) {
        dispatch(setFromToken(ethToken));
      }
    }
    if (!toToken && tokens.length > 0) {
      const usdtToken = tokens.find((token) => token.symbol === 'USDT'); // Assuming USDT is img-4
      if (usdtToken) {
        dispatch(setToToken(usdtToken));
      }
    }
  }, [fromToken, toToken, dispatch]);

  const handleTokenSelect = (tokenType: 'from' | 'to') => {
    dispatch(openTokenPopup(tokenType));
  };

  const handleSwap = async () => {
    if (!fromAmount || !toAmount) {
      toast.error('Please enter amounts for both tokens');
      return;
    }

    setIsLoading(true);
    try {
      // Simulate swap transaction
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast.success('Swap completed successfully!');
      setFromAmount('');
      setToAmount('');
    } catch (error) {
      toast.error('Swap failed. Please try again.');

      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form className='relative'>
        {/* From Token Input */}
        <div className='mb-3'>
          <div className='bg-gray-50 border border-gray-200 rounded-[12px] p-4'>
            <div className='flex items-center justify-between mb-2'>
              <span className='text-sm text-gray-600'>You send</span>
              {/* <button
                type='button'
                className='text-xs text-blue-600 hover:text-blue-800'
              >
                Balance
              </button> */}
            </div>
            <div className='flex items-center space-x-3'>
              <input
                className='flex-1 text-2xl font-medium bg-transparent border-none outline-none placeholder-gray-400 no-spinner' // Added no-spinner
                type='number'
                placeholder='0.0'
                value={fromAmount}
                onChange={(e) => setFromAmount(e.target.value)}
                // required
              />
              <div className='items-center relative'>
                <button
                  type='button'
                  onClick={() => handleTokenSelect('from')}
                  className='absolute cursor-pointer flex gap-1 items-center bg-white rounded-[20px] py-1 px-2 bottom-[-5px] right-[5px] border border-gray-200 hover:border-gray-300 transition-colors'
                >
                  {fromToken ? (
                    <>
                      <Image
                        alt={fromToken.name}
                        src={fromToken.logo}
                        width={20}
                        height={20}
                        className='rounded-[4px]'
                      />
                      <div className='token-name font-medium text-[12px]'>
                        {fromToken.symbol}
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

        {/* Swap Direction Arrow */}
        <div className='flex justify-center absolute top-[75px] left-1/2 -translate-x-1/2'>
          <div className='bg-white border border-gray-200 rounded-[12px] p-3 shadow-sm'>
            <HiArrowSmallDown className='w-6 h-6 text-gray-600' />
          </div>
        </div>

        {/* To Token Input */}
        <div className='mb-6'>
          <div className='bg-gray-50 border border-gray-200 rounded-[12px] p-4'>
            <div className='flex items-center justify-between mb-2'>
              <span className='text-sm text-gray-600'>You receive</span>
              {/* <button
                type='button'
                className='text-xs text-blue-600 hover:text-blue-800'
              >
                Balance
              </button> */}
            </div>
            <div className='flex items-center space-x-3'>
              <input
                className='flex-1 text-2xl font-medium bg-transparent border-none outline-none placeholder-gray-400 no-spinner' // Added no-spinner
                type='number'
                placeholder='0.0'
                value={toAmount}
                onChange={(e) => setToAmount(e.target.value)}
                // required
              />
              <div className='items-center relative'>
                <button
                  type='button'
                  onClick={() => handleTokenSelect('to')}
                  className='absolute cursor-pointer flex gap-1 items-center bg-white rounded-[20px] py-1 px-2 bottom-[-5px] right-[5px] border border-gray-200 hover:border-gray-300 transition-colors'
                >
                  {toToken ? (
                    <>
                      <Image
                        alt={toToken.name}
                        src={toToken.logo}
                        width={20}
                        height={20}
                        className='rounded-[4px]'
                      />
                      <div className='token-name font-medium text-[12px]'>
                        {toToken.symbol}
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

        {/* Swap Button */}
        <button
          type='button'
          onClick={handleSwap}
          disabled={isLoading}
          className='submit poppins font-normal text-center bg-blue-600 py-3 text-[14px] sm:text-[14px] text-white rounded-[10px] w-full hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
        >
          {isLoading ? 'Swapping...' : 'Swap Tokens'}
        </button>
      </form>
    </>
  );
}
