'use client';

import React, { useState, useEffect } from 'react';
import { HiOutlineXMark, HiArrowPath } from 'react-icons/hi2';
import { useAppDispatch, useAppSelector } from '@/app/rtk-base/store';
import {
  slideTrayOut,
  setActiveView,
  setLoading,
} from '@/app/rtk-base/slices/transactionsTraySlice';
import { hideOverlay } from '@/app/rtk-base/slices/overlaySlice';
import TransactionCard from '../../TransactionCard';

// Mock data - replace with your actual blockchain data
const mockUserTransactions = [
  {
    id: '1',
    hash: '0x1234567890abcdef1234567890abcdef12345678',
    type: 'send' as const,
    amount: '1.5',
    token: 'USDL',
    from: '0x1234567890abcdef1234567890abcdef12345678',
    to: '0xabcdef1234567890abcdef1234567890abcdef12',
    timestamp: Date.now() - 300000, // 5 minutes ago
    status: 'confirmed' as const,
    gasUsed: '0.002',
    gasPrice: '20',
    blockNumber: 18500000,
  },
  {
    id: '2',
    hash: '0xabcdef1234567890abcdef1234567890abcdef12',
    type: 'receive' as const,
    amount: '0.8',
    token: 'ETH',
    from: '0xabcdef1234567890abcdef1234567890abcdef12',
    to: '0x1234567890abcdef1234567890abcdef12345678',
    timestamp: Date.now() - 900000, // 15 minutes ago
    status: 'pending' as const,
    gasUsed: '0.0015',
    gasPrice: '18',
    blockNumber: 18499995,
  },
  {
    id: '3',
    hash: '0x9876543210fedcba9876543210fedcba98765432',
    type: 'swap' as const,
    amount: '100',
    token: 'USDL',
    from: '0x1234567890abcdef1234567890abcdef12345678',
    to: '0x9876543210fedcba9876543210fedcba98765432',
    timestamp: Date.now() - 1800000, // 30 minutes ago
    status: 'confirmed' as const,
    gasUsed: '0.003',
    gasPrice: '22',
    blockNumber: 18499980,
  },
];

const mockAllTransactions = [
  ...mockUserTransactions,
  {
    id: '4',
    hash: '0x5555555555555555555555555555555555555555',
    type: 'approve' as const,
    amount: '1000',
    token: 'USDL',
    from: '0x4444444444444444444444444444444444444444',
    to: '0x3333333333333333333333333333333333333333',
    timestamp: Date.now() - 2400000, // 40 minutes ago
    status: 'failed' as const,
    gasUsed: '0.001',
    gasPrice: '15',
    blockNumber: 18499970,
  },
];

function TransactionsTray() {
  const { isTraySlidIn, activeView, isLoading } = useAppSelector(
    (store) => store.transactionsTray
  );
  const dispatch = useAppDispatch();
  const [transactions, setTransactions] = useState<any[]>(mockUserTransactions);

  useEffect(() => {
    if (activeView === 'my') {
      setTransactions(mockUserTransactions);
    } else {
      setTransactions(mockAllTransactions);
    }
  }, [activeView]);

  const handleRefresh = async () => {
    dispatch(setLoading(true));
    // Simulate API call
    setTimeout(() => {
      dispatch(setLoading(false));
    }, 1000);
  };

  const handleClose = () => {
    dispatch(slideTrayOut());
    dispatch(hideOverlay());
  };

  return (
    <nav
      className={`${
        isTraySlidIn ? 'tray--slide-in' : 'tray--slide-out'
      } bg-white shadow-lg w-full md:w-[400px] fixed top-0 left-0 right-0 bottom-0 min-h-screen z-50 rounded-tl-[15px] rounded-tr-[15px] md:rounded-[0px] flex flex-col`}
    >
      {/* Header */}
      <div className='flex items-center justify-between p-4 border-b border-gray-100'>
        <h2 className='text-xl font-semibold text-gray-900'>Transactions</h2>
        <div className='flex items-center space-x-3'>
          <button
            onClick={handleRefresh}
            disabled={isLoading}
            className='p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors'
          >
            <HiArrowPath
              className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`}
            />
          </button>
          <button
            onClick={handleClose}
            className='p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors'
          >
            <HiOutlineXMark className='w-5 h-5' />
          </button>
        </div>
      </div>

      {/* Toggle Tabs */}
      <div className='flex border-b border-gray-100'>
        <button
          onClick={() => dispatch(setActiveView('my'))}
          className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
            activeView === 'my'
              ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
          }`}
        >
          My Transactions
        </button>
        <button
          onClick={() => dispatch(setActiveView('all'))}
          className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
            activeView === 'all'
              ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
          }`}
        >
          All Transactions
        </button>
      </div>

      {/* Transactions List */}
      <div className='flex-1 overflow-y-auto p-4 transactions-scroll mb-[100px] md:mb-0'>
        {isLoading ? (
          <div className='flex items-center justify-center h-32'>
            <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600'></div>
          </div>
        ) : transactions.length > 0 ? (
          <div className='space-y-4 mb-[100px]'>
            {transactions.map((transaction) => (
              <TransactionCard
                key={transaction.id}
                transaction={transaction}
                isUserTransaction={activeView === 'my'}
              />
            ))}
          </div>
        ) : (
          <div className='flex flex-col items-center justify-center h-32 text-gray-500'>
            <div className='w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4'>
              <HiOutlineXMark className='w-8 h-8' />
            </div>
            <p className='text-lg font-medium'>No transactions found</p>
            <p className='text-sm'>Your transaction history will appear here</p>
          </div>
        )}
      </div>
    </nav>
  );
}

export default TransactionsTray;
