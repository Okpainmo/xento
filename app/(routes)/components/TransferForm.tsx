'use client';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useAppKitProvider } from '@reown/appkit/react';
import { BrowserProvider, Contract, ethers, formatUnits } from 'ethers';
import type { Eip1193Provider } from 'ethers';
import { deployedContracts } from '../../lib/contracts/deployedContracts';
import { USDLContractABI } from '../../lib/contracts/abi/USDL';
import { paymentsContractABI } from '../../lib/contracts/abi/Payments';
import { useWallet } from '@/app/lib/wallet/walletProvider';

export default function TokenTransferForm() {
  const [form, setForm] = useState({ amount: '', token: '', receiver: '' });
  const [isLoading, setIsLoading] = useState(false);
  const tokens = ['USDL', 'Ethereum'];

  const { walletProvider } = useAppKitProvider('eip155');
  const { connect, disconnect, address, provider } = useWallet();

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
    if (form.token === 'USDL') {
      await transferUSDL();
    } else if (form.token === 'Ethereum') {
      await sendEther();
    }
  }

  return (
    <form>
      <div className='input-group flex flex-col mb-6 text-[14px] sm:text-[14px]'>
        <label htmlFor='amount'>Amount To Send</label>
        <input
          className='mt-2 px-3 py-3 border-gray-300 border outline-none rounded-[10px]'
          type='number'
          id='amount'
          placeholder='Enter amount to send'
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
          required
        />
      </div>

      <div className='input-group flex flex-col mb-6 text-[14px] sm:text-[14px]'>
        <label htmlFor='token'>Token</label>
        <select
          id='token'
          className='mt-2 px-3 py-3 border-gray-300 border outline-none rounded-[10px]'
          value={form.token}
          onChange={(e) => setForm({ ...form, token: e.target.value })}
          required
        >
          <option value=''>Select a token</option>
          {tokens.map((token) => (
            <option key={token} value={token}>
              {token}
            </option>
          ))}
        </select>
      </div>

      <div className='input-group flex flex-col mb-6 text-[14px] sm:text-[14px]'>
        <label htmlFor='receiver'>Receiver</label>
        <input
          className='mt-2 px-3 py-3 border-gray-300 border outline-none rounded-[10px]'
          type='text'
          id='receiver'
          placeholder='Enter receiver address'
          value={form.receiver}
          onChange={(e) => setForm({ ...form, receiver: e.target.value })}
          required
        />
      </div>

      <button
        type='button'
        onClick={transferHandler}
        disabled={isLoading}
        className='submit poppins text-center bg-[#043D25] py-3 text-[14px] sm:text-[14px] text-white rounded-[10px] w-full'
      >
        {isLoading ? 'Processing...' : 'Send Tokens'}
      </button>
    </form>
  );
}
