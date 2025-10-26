'use client';

import React, { useEffect } from 'react';
import {
  HiOutlineXMark,
  HiMagnifyingGlass,
  HiArrowUpRight,
} from 'react-icons/hi2';
import { useAppDispatch, useAppSelector } from '@/app/rtk-base/store';
import { closeExplorePopup } from '@/app/rtk-base/slices/exploreSlice';
import { tokens } from '@/app/custom-data/tokens';
import Image from 'next/image';
import Link from 'next/link';
import useFetch from '@/app/hooks/useFetch';

function ExplorePopUp() {
  const { isPopupOpen } = useAppSelector((store) => store.explore);
  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = React.useState('');

  const url =
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true';
  const { data, isLoading, error }: any = useFetch(url);
  const topTenCurrencies = data ? data.slice(0, 10) : [];

  // ✅ Unified Search
  const filteredLocal = tokens.filter(
    (token) =>
      token.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      token.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredMarketTokens = data?.filter(
    (each: any) =>
      each.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      each.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleClose = () => {
    dispatch(closeExplorePopup());
    setSearchTerm('');
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
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
      <div className='flex justify-center items-center min-h-screen'>
        <div className='bg-white rounded-2xl shadow-2xl w-full sm:w-[400px] h-[600px] overflow-y-auto mb-[100px]'>
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

          {/* Market Overview Link */}
          <div className='px-6 pt-3 pb-0 border-t border-gray-100 text-center'>
            <Link
              href='/market'
              onClick={() => handleClose()}
              className='text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors'
            >
              View complete market overview →
            </Link>
          </div>

          {/* ✅ Guide Text (moved to top) */}
          <div className='px-6 pt-4 pb-4 text-sm text-gray-500 text-center border-b border-gray-100'>
            Select a token to view its history and current market stats
          </div>
          {/* Search */}
          <div className='px-6 py-4 border-b border-gray-100'>
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

          {/* ✅ When Searching */}
          {searchTerm ? (
            <div>
              <div className='px-6 py-4 border-b border-gray-100 font-medium'>
                Search Results
              </div>
              <div className='p-2'>
                {[...filteredLocal, ...filteredMarketTokens].length > 0 ? (
                  [...filteredLocal, ...filteredMarketTokens].map(
                    (item: any, index) => (
                      <Link
                        href={`/tokens/${item.id}`}
                        key={item.address || item.id || index}
                        onClick={() => handleClose()}
                        className='w-full flex items-center p-4 rounded-xl hover:bg-gray-100 transition-colors justify-between'
                      >
                        <div className='flex items-center space-x-3 flex-1'>
                          <div className='w-10 h-10 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center'>
                            <Image
                              src={item.logo || item.image}
                              alt={item.name}
                              width={40}
                              height={40}
                              className='w-full h-full object-cover'
                            />
                          </div>
                          <div className='flex-1 text-left'>
                            <div className='font-medium text-gray-900 text-[12px] uppercase'>
                              {item.symbol}
                            </div>
                            <div className='text-sm text-gray-500'>
                              {item.current_price
                                ? `$${item.current_price.toLocaleString()}`
                                : `${item.address?.slice(
                                    0,
                                    12
                                  )}...${item.address?.slice(-4)}`}
                            </div>
                          </div>
                        </div>
                        <HiArrowUpRight className='text-[12px] text-blue-400' />
                      </Link>
                    )
                  )
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
            </div>
          ) : (
            <>
              {/* Supported Tokens */}
              <div className='px-6 py-4 border-b border-gray-100 font-medium'>
                Supported Tokens
              </div>
              <div className='p-2'>
                {tokens.map((token) => (
                  <Link
                    href={`/tokens/${token.id}`}
                    key={token.address}
                    onClick={() => handleClose()}
                    className='w-full flex items-center p-4 rounded-xl hover:bg-gray-100 transition-colors justify-between'
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
                        <div className='font-medium text-gray-900 text-[12px]'>
                          {token.symbol}
                        </div>
                        <div className='text-sm text-gray-500'>
                          {token.name.toLocaleLowerCase().startsWith('eth')
                            ? token.name
                            : `${token.address.slice(
                                0,
                                12
                              )}...${token.address.slice(-4)}`}
                        </div>
                      </div>
                    </div>
                    <HiArrowUpRight className='text-[12px] text-blue-400' />
                  </Link>
                ))}
              </div>

              {/* Top Ten Market Tokens */}
              <div className='px-6 py-4 border-t border-b border-gray-100 font-medium'>
                Top Ten Market Tokens
              </div>

              <div className=''>
                {isLoading ? (
                  <div className='p-4 text-center text-gray-400'>
                    Loading top market tokens...
                  </div>
                ) : error ? (
                  <div className='p-4 text-center text-red-500'>
                    Error fetching market tokens.
                  </div>
                ) : (
                  <div className='p-2'>
                    {topTenCurrencies.map((each: any) => (
                      <Link
                        href={`/tokens/${each.id}`}
                        key={each.id}
                        onClick={() => handleClose()}
                        className='w-full flex items-center p-4 rounded-xl hover:bg-gray-100 transition-colors justify-between'
                      >
                        <div className='flex items-center space-x-3 flex-1'>
                          <div className='w-10 h-10 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center'>
                            <Image
                              src={each.image}
                              alt={each.name}
                              width={40}
                              height={40}
                              className='w-full h-full object-cover'
                            />
                          </div>
                          <div className='flex-1 text-left'>
                            <div className='font-medium text-gray-900 text-[12px] uppercase'>
                              {each.symbol}
                            </div>
                            <div className='text-sm text-gray-500'>
                              ${each.current_price.toLocaleString()}
                              {/* —{' '}
                              {each.price_change_percentage_24h.toFixed(2)}% */}
                            </div>
                          </div>
                        </div>
                        <HiArrowUpRight className='text-[12px] text-blue-400' />
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Market Overview Link */}
              <div className='p-6 border-t border-gray-100 text-center'>
                <Link
                  href='/market'
                  onClick={() => handleClose()}
                  className='text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors'
                >
                  View complete market overview →
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ExplorePopUp;
