'use client';
import { useState } from 'react';

import { useWallet } from '@/app/lib/wallet/walletProvider';
import TokenTransferForm from '../components/TransferForm';

function Home() {
  const { connect, disconnect, address } = useWallet();

  const [loading, setLoading] = useState(false);

  const handleConnect = async () => {
    try {
      setLoading(true);
      await connect();
    } catch (err) {
      console.error('Wallet connect error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className='w-full min-h-screen bg-gray-100 px-3'>
      <nav className='flex items-center py-2 sm:py-4 flex-row-reverse w-full sm:w-[80%] md:w-[50%] mx-auto'>
        <div className='pl-3 w-[150px]'>
          {address ? (
            <button
              onClick={disconnect}
              className='py-2.5 px-3 bg-red-500 text-white w-full rounded-[10px] text-[14px] text-center cursor-pointer'
            >
              Disconnect
              {/* ({address.slice(0, 6)}...{address.slice(-4)}) */}
            </button>
          ) : (
            <button
              onClick={handleConnect}
              className='cursor-pointer py-2.5 px-3 bg-[#043D25] text-white w-full rounded-[10px] text-[14px] text-center flex items-center justify-center gap-2'
            >
              {loading && (
                <span className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></span>
              )}
              {loading ? 'Connecting...' : 'Connect Wallet'}
            </button>
          )}
        </div>
      </nav>
      <section className='form-area w-full sm:w-[400px] sm:mx-auto mt-[75px] sm:mt-[100px] md:mt-[150px] bg-white p-4 sm:p-6 rounded-[10px] shadow'>
        <section className='mb-6'>
          <h2 className='font-bold italic text-2xl mb-2'>Xento</h2>
          <span>Send Eth and Stablecoins Reliably...</span>
        </section>
        <TokenTransferForm />
      </section>
    </main>
  );
}

export default Home;
