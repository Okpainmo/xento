'use client';

import React from 'react';
import {
  HiArrowUpRight,
  HiArrowDownLeft,
  HiCheckCircle,
  HiClock,
  HiXCircle,
} from 'react-icons/hi2';

interface Transaction {
  id: string;
  hash: string;
  type: 'send' | 'receive' | 'swap' | 'approve';
  amount: string;
  token: string;
  from: string;
  to: string;
  timestamp: number;
  status: 'pending' | 'confirmed' | 'failed';
  gasUsed?: string;
  gasPrice?: string;
  blockNumber?: number;
}

interface TransactionCardProps {
  transaction: Transaction;
  isUserTransaction?: boolean;
}

const TransactionCard: React.FC<TransactionCardProps> = ({
  transaction,
  isUserTransaction = false,
}) => {
  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60)
    );

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return date.toLocaleDateString();
  };

  const getStatusIcon = () => {
    switch (transaction.status) {
      case 'confirmed':
        return <HiCheckCircle className='w-4 h-4 text-green-500' />;
      case 'pending':
        return <HiClock className='w-4 h-4 text-yellow-500' />;
      case 'failed':
        return <HiXCircle className='w-4 h-4 text-red-500' />;
      default:
        return <HiClock className='w-4 h-4 text-gray-400' />;
    }
  };

  const getTypeIcon = () => {
    switch (transaction.type) {
      case 'send':
        return <HiArrowUpRight className='w-4 h-4 text-red-500' />;
      case 'receive':
        return <HiArrowDownLeft className='w-4 h-4 text-green-500' />;
      case 'swap':
        return (
          <div className='w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center'>
            <span className='text-white text-xs font-bold'>S</span>
          </div>
        );
      case 'approve':
        return (
          <div className='w-4 h-4 rounded-full bg-purple-500 flex items-center justify-center'>
            <span className='text-white text-xs font-bold'>A</span>
          </div>
        );
      default:
        return <HiArrowUpRight className='w-4 h-4 text-gray-400' />;
    }
  };

  const getStatusColor = () => {
    switch (transaction.status) {
      case 'confirmed':
        return 'text-green-600 bg-green-50';
      case 'pending':
        return 'text-yellow-600 bg-yellow-50';
      case 'failed':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className='transaction-card bg-white border border-gray-100 rounded-xl p-4 hover:shadow-md transition-all duration-200 hover:border-gray-200'>
      <div className='flex items-center justify-between mb-3'>
        <div className='flex items-center space-x-3'>
          {getTypeIcon()}
          <div>
            <h3 className='font-medium text-gray-900 capitalize'>
              {transaction.type}
            </h3>
            <p className='text-sm text-gray-500'>
              {formatTimestamp(transaction.timestamp)}
            </p>
          </div>
        </div>
        <div className='flex items-center space-x-2'>
          {getStatusIcon()}
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor()}`}
          >
            {transaction.status}
          </span>
        </div>
      </div>

      <div className='space-y-2'>
        <div className='flex justify-between items-center'>
          <span className='text-sm text-gray-600'>Amount</span>
          <span className='font-semibold text-gray-900'>
            {transaction.amount} {transaction.token}
          </span>
        </div>

        <div className='flex justify-between items-center'>
          <span className='text-sm text-gray-600'>From</span>
          <span className='text-sm font-mono text-gray-700'>
            {isUserTransaction ? 'You' : formatAddress(transaction.from)}
          </span>
        </div>

        <div className='flex justify-between items-center'>
          <span className='text-sm text-gray-600'>To</span>
          <span className='text-sm font-mono text-gray-700'>
            {isUserTransaction ? 'You' : formatAddress(transaction.to)}
          </span>
        </div>

        {transaction.gasUsed && (
          <div className='flex justify-between items-center'>
            <span className='text-sm text-gray-600'>Gas Used</span>
            <span className='text-sm text-gray-700'>
              {transaction.gasUsed} ETH
            </span>
          </div>
        )}

        <div className='pt-2 border-t border-gray-100'>
          <div className='flex justify-between items-center'>
            <span className='text-sm text-gray-600'>Transaction Hash</span>
            <button
              className='text-sm font-mono text-blue-600 hover:text-blue-800 hover:underline'
              onClick={() =>
                window.open(
                  `https://etherscan.io/tx/${transaction.hash}`,
                  '_blank'
                )
              }
            >
              {formatAddress(transaction.hash)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionCard;
