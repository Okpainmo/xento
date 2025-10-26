'use client';

// import Image from 'next/image';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/app/rtk-base/store';
// import Logo from '../../../assets/images/web3-mastery-logo.png';
import NavLinks from '../NavLinks';
import MenuToggleButtonForMobile from './components/MenuToggleButtonForMobile';
// import MenuToggleButtonForDesktop from './components/MenuToggleButtonForDesktop';
import { showModal } from '@/app/rtk-base/slices/modalSlice';
import { slideTrayIn } from '@/app/rtk-base/slices/transactionsTraySlice';
import { showOverlay } from '@/app/rtk-base/slices/overlaySlice';
import { useState } from 'react';

import { useWallet } from '@/app/lib/wallet/walletProvider';
// import { HiOutlineBars2 } from 'react-icons/hi2';

function Navbar() {
  const { isMenuOn } = useAppSelector((store) => store.navToggle);
  const dispatch = useAppDispatch();

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

  const handleOpenTransactions = () => {
    dispatch(slideTrayIn());
    dispatch(showOverlay());
  };

  return (
    <nav
      className={`w-full px-3 py-3 sm:px-[20px] lg:px-12 sm:py-4 md:pt-10 md:pb-6 flex justify-between items-center relative`}
    >
      <div className='nav-left flex gap-x-3 sm:gap-x-6 lg:gap-x-12 items-center'>
        <MenuToggleButtonForMobile />
        <Link href='/' className='text-xl italic font-bold'>
          Xento
        </Link>
        <div className='nav-links-wrapper hidden lg:inline-block lg:mt-[7px]'>
          <NavLinks />
        </div>
      </div>
      <div className='nav-right relative flex items-center gap-3'>
        {/* {address && (
          <button
            onClick={handleOpenTransactions}
            className='py-2.5 px-3 bg-blue-600 text-white rounded-[10px] text-[14px] text-center cursor-pointer hover:bg-blue-700 transition-colors'
          >
            Transactions
          </button>
        )} */}
        <div className='w-[150px]'>
          {address ? (
            <button
              onClick={disconnect}
              className='poppins font-normal py-2.5 px-3 bg-red-500 text-white w-full rounded-[10px] text-[14px] text-center cursor-pointer'
            >
              Disconnect
              {/* ({address.slice(0, 6)}...{address.slice(-4)}) */}
            </button>
          ) : (
            <button
              onClick={handleConnect}
              className='poppins font-normal cursor-pointer py-2.5 px-3 bg-blue-600 text-white w-full rounded-[10px] text-[14px] text-center flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors'
            >
              {loading && (
                <span className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></span>
              )}
              {loading ? 'Connecting...' : 'Connect Wallet'}
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
