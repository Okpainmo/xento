'use client';

import React, { useEffect } from 'react';
import { HiOutlineXMark, HiMagnifyingGlass } from 'react-icons/hi2';
import { useAppDispatch, useAppSelector } from '@/app/rtk-base/store';
import {
  closeTokenPopup,
  selectToken,
} from '@/app/rtk-base/slices/tokenSelectionSlice';
import { tokens } from '@/app/custom-data/tokens';
import Image from 'next/image';

function SelectTokenPopUp() {
  const { isPopupOpen, selectedToken } = useAppSelector(
    (store) => store.tokenSelection
  );
  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = React.useState('');

  // Filter tokens based on search term
  const filteredTokens = tokens.filter(
    (token) =>
      token.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      token.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTokenSelect = (token: any) => {
    dispatch(selectToken(token));
  };

  const handleClose = () => {
    dispatch(closeTokenPopup());
    setSearchTerm('');
  };

  // Close popup on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    if (isPopupOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isPopupOpen]);

  if (!isPopupOpen) return null;

  return (
    <div className='w-full fixed top-0 left-0 right-0 bottom-0 min-h-screen bg-black/50 transition-opacity duration-300 z-50 p-3'>
      {/* Popup */}
      <div className='flex justify-center items-center min-h-screen'>
        <div className='bg-white rounded-2xl shadow-2xl w-full sm:w-[400px] overflow-y-auto mb-[100px]'>
          {/* Header */}
          <div className='flex items-center justify-between px-6 py-4 border-b border-gray-100'>
            <h2 className='text-xl font-semibold text-gray-900'>
              Select Token
            </h2>
            <button
              onClick={handleClose}
              className='p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors'
            >
              <HiOutlineXMark className='w-5 h-5' />
            </button>
          </div>

          {/* Search */}
          <div className='p-6 border-b border-gray-100'>
            <div className='relative'>
              <HiMagnifyingGlass className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
              <input
                type='text'
                placeholder='Search tokens...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              />
            </div>
          </div>

          {/* Token List */}
          <div className='max-h-96 overflow-y-auto'>
            {filteredTokens.length > 0 ? (
              <div className='p-2'>
                {filteredTokens.map((token) => (
                  <button
                    key={token.address}
                    onClick={() => handleTokenSelect(token)}
                    className={`w-full flex items-center p-4 rounded-xl hover:bg-gray-50 transition-colors ${
                      selectedToken?.address === token.address
                        ? 'bg-blue-50 border border-blue-200'
                        : ''
                    }`}
                  >
                    <div className='flex items-center space-x-3 flex-1'>
                      <div className='w-10 h-10 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center'>
                        <Image
                          src={token.logo}
                          alt={token.name}
                          width={40}
                          height={40}
                          className='w-full h-full object-cover'
                        />
                      </div>
                      <div className='flex-1 text-left'>
                        <div className='font-medium text-gray-900'>
                          {token.symbol}
                        </div>
                        <div className='text-sm text-gray-500'>
                          {token.name}
                        </div>
                      </div>
                    </div>
                    {selectedToken?.address === token.address && (
                      <div className='w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center'>
                        <svg
                          className='w-4 h-4 text-white'
                          fill='currentColor'
                          viewBox='0 0 20 20'
                        >
                          <path
                            fillRule='evenodd'
                            d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                            clipRule='evenodd'
                          />
                        </svg>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            ) : (
              <div className='p-8 text-center text-gray-500'>
                <div className='w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <HiMagnifyingGlass className='w-8 h-8 text-gray-400' />
                </div>
                <p className='text-lg font-medium'>No tokens found</p>
                <p className='text-sm'>Try adjusting your search terms</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className='p-6 border-t border-gray-100 bg-gray-50'>
            <p className='text-sm text-gray-500 text-center'>
              Select a token to continue with your transaction
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SelectTokenPopUp;
