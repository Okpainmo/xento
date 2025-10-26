'use client';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useAppKitProvider } from '@reown/appkit/react';
import { BrowserProvider, Contract, ethers, formatUnits } from 'ethers';
import type { Eip1193Provider } from 'ethers';
import { deployedContracts__v1 } from '../../lib/contracts/deployedContracts';
import { USDLContractABI } from '../../lib/contracts/abi/USDL';
import { paymentsContractABI } from '../../lib/contracts/abi/Payments';
import { useWallet } from '@/app/lib/wallet/walletProvider';
import { useAppDispatch, useAppSelector } from '@/app/rtk-base/store';
import {
  openTokenPopup,
  selectToken,
} from '@/app/rtk-base/slices/tokenSelectionSlice';
import { tokens } from '@/app/custom-data/tokens';
import TokenSelectionPopup from '../SelectTokenPopUp';
import Image from 'next/image';
import { HiChevronDown } from 'react-icons/hi2';

export default function TokenTransferForm() {
  const [form, setForm] = useState({ amount: '', token: '', receiver: '' });
  const [isLoading, setIsLoading] = useState(false);
  const deployedContracts = deployedContracts__v1;

  const { walletProvider } = useAppKitProvider('eip155');
  const { connect, disconnect, address, provider } = useWallet();

  const dispatch = useAppDispatch();
  const { selectedToken } = useAppSelector((store) => store.tokenSelection);

  // Set default token to Ethereum on component mount
  useEffect(() => {
    if (!selectedToken && tokens.length > 0) {
      const ethToken = tokens.find((token) => token.symbol === 'ETH');
      if (ethToken) {
        dispatch(selectToken(ethToken));
      }
    }
  }, [selectedToken, dispatch]);

  async function getWalletUSDLBalance() {
    try {
      // console.log('USDL Token Address:', deployedContracts[2].address);
      // console.log('Signer Address:', address);
      // console.log('Contract ABI:', USDLContractABI);
      // console.log('Provider', provider);
      // console.log(
      //   'Network',
      //   await provider?.getNetwork().then((network) => network.name)
      // );

      await connect();

      setIsLoading(true);

      const signer = await provider?.getSigner();

      const USDLContract = new Contract(
        deployedContracts[2].address,
        USDLContractABI,
        signer
      );

      const USDLBalance = await USDLContract.balanceOf(address);
      const formattedBalance = formatUnits(USDLBalance, 18);

      console.log('USDL Balance:', formattedBalance);
      toast.success(`Your USDL balance: ${formattedBalance}`);
    } catch (error: unknown) {
      console.error(error);
      toast.error('Failed to fetch USDL balance');
    } finally {
      setIsLoading(false);
    }
  }

  // async function approveUSDLTransfer() {
  //   try {
  //     // console.log('USDL Token Address:', deployedContracts[2].address);
  //     // console.log('Signer Address:', address);
  //     // console.log('Contract ABI:', USDLContractABI);
  //     // console.log('Provider', provider);
  //     // console.log(
  //     //   'Network',
  //     //   await provider?.getNetwork().then((network) => network.name)
  //     // );

  //     await connect();

  //     setIsLoading(true);

  //     const signer = await provider?.getSigner();

  //     const PaymentsContract = new Contract(
  //       deployedContracts[1].address,
  //       paymentsContractABI,
  //       signer
  //     );

  //     const USDLBalance = await PaymentsContract.handleApproveERC20Transfer(20);
  //     const formattedBalance = formatUnits(USDLBalance, 18);

  //     console.log('USDL Balance:', USDLBalance);
  //     toast.success(`Your USDL balance: ${formattedBalance}`);
  //   } catch (error: unknown) {
  //     console.error(error);
  //     toast.error('Failed to approve USDL transfer');
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }

  async function transferUSDL() {
    try {
      // console.log('USDL Token Address:', deployedContracts[2].address);
      // console.log('Signer Address:', address);
      // console.log('Contract ABI:', USDLContractABI);
      // console.log('Provider', provider);
      // console.log(
      //   'Network',
      //   await provider?.getNetwork().then((network) => network.name)
      // );

      // await connect();

      setIsLoading(true);

      const signer = await provider?.getSigner();

      // const PaymentsContract = new Contract(
      //   deployedContracts[1].address,
      //   paymentsContractABI,
      //   signer
      // );

      const USDLContract = new Contract(
        deployedContracts[2].address,
        USDLContractABI,
        signer
      );

      const response = await USDLContract.transfer(form.receiver, form.amount);
      // const formattedBalance = formatUnits(USDLBalance, 18);

      console.log('txn response:', response);
      // toast.success(`Your USDL balance: ${formattedBalance}`);

      if (response.hash) {
        setForm({ amount: '', token: '', receiver: '' });
        toast.success(`transfer of ${form.amount}USDL was successful`);
      }
    } catch (error: unknown) {
      console.error(error);
      toast.error('Failed to transfer USDL');
    } finally {
      setIsLoading(false);
    }
  }

  async function sendEther() {
    try {
      // console.log('USDL Token Address:', deployedContracts[2].address);
      // console.log('Signer Address:', address);
      // console.log('Contract ABI:', USDLContractABI);
      // console.log('Provider', provider);
      // console.log(
      //   'Network',
      //   await provider?.getNetwork().then((network) => network.name)
      // );

      // await connect();

      setIsLoading(true);

      const signer = await provider?.getSigner();

      const PaymentsContract = new Contract(
        deployedContracts[1].address,
        paymentsContractABI,
        signer
      );

      const response = await PaymentsContract.sendEther__PassThrough(
        form.receiver,
        {
          value: ethers.parseEther(form.amount),
        }
      );
      // const formattedBalance = formatUnits(USDLBalance, 18);

      console.log('txn response:', response);

      if (response.hash) {
        setForm({ amount: '', token: '', receiver: '' });
        toast.success(`transfer of ${form.amount}Eth was successful`);
      }

      // toast.success(`Your USDL balance: ${formattedBalance}`);
    } catch (error: unknown) {
      console.error(error);
      toast.error('Failed to send ether');
    } finally {
      setIsLoading(false);
    }
  }

  async function transferHandler() {
    if (!selectedToken) {
      toast.error('Please select a token');
      return;
    }

    if (selectedToken.symbol === 'USDL') {
      await transferUSDL();
    } else if (selectedToken.symbol === 'ETH') {
      await sendEther();
    } else {
      toast.error(`Token ${selectedToken.symbol} is not supported yet`);
    }
  }

  return (
    <>
      <form>
        {/* Uniswap-like token selection and amount input */}
        <div className='mb-3'>
          <div className='bg-gray-50 border border-gray-200 rounded-[12px] p-4'>
            <div className='flex items-center justify-between mb-2'>
              <span className='text-sm text-gray-600'>You send</span>
              {/* <button
                type='button'
                onClick={
                  selectedToken
                    ? getWalletUSDLBalance
                    : () => toast.error('Please select a token first')
                }
                className='text-xs text-blue-600 hover:text-blue-800'
              >
                Balance
              </button> */}
            </div>
            <div className='flex items-center space-x-3'>
              <input
                className='flex-1 text-2xl font-medium bg-transparent border-none outline-none placeholder-gray-400 no-spinner'
                type='number'
                placeholder='0.0'
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
                // required
              />
              <div className='items-center relative'>
                <button
                  onClick={() => dispatch(openTokenPopup('send'))}
                  className='absolute cursor-pointer flex gap-1 items-center bg-white rounded-[20px] py-1 
              px-2 bottom-[-5px] right-[5px] border border-gray-200 hover:border-gray-300 transition-colors'
                >
                  {selectedToken ? (
                    <>
                      <Image
                        alt={selectedToken.name}
                        src={selectedToken.logo}
                        width={20}
                        height={20}
                        className='rounded-[4px]'
                      />
                      <div className='token-name font-medium text-[12px]'>
                        {selectedToken.symbol}
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

        {/* Receiver address field */}
        <div className='mb-6'>
          <div className='bg-gray-50 border border-gray-200 rounded-[12px] p-3'>
            <div className='flex items-center justify-between mb-2'>
              <span className='text-sm text-gray-600'>To</span>
            </div>
            <input
              className='w-full text-lg font-medium bg-transparent border-none outline-none placeholder-gray-400'
              type='text'
              id='receiver'
              placeholder='Enter receiver address'
              value={form.receiver}
              onChange={(e) => setForm({ ...form, receiver: e.target.value })}
              // required
            />
          </div>
        </div>

        <button
          type='button'
          onClick={transferHandler}
          disabled={isLoading}
          className='submit poppins font-normal text-center bg-blue-600 py-3 text-[14px] sm:text-[14px] text-white rounded-[10px] w-full hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
        >
          {isLoading ? 'Processing...' : 'Send Tokens'}
        </button>
      </form>
    </>
  );
}
