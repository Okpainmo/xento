'use client';

import FormsWrapper from '@/app/components/FormsWrapper';
import React from 'react';
import Link from 'next/link';

function BuyAndSellHomeScreen() {
  return (
    <main className='w-full min-h-screen px-3'>
      <section className='mb-6 text-2xl sm:text-3xl lg:text-4xl text-center sm:w-[400px] sm:mx-auto font-bold mt-[30px] lg:mt-[50px] nunito_sans'>
        Token Rewards <br /> For Every Transaction
      </section>
      <section className='form-area w-full sm:w-[400px] sm:mx-auto mt-[30px] lg:mt-[50px] p-4 sm:p-6 rounded-[12px] shadow card-glass_light'>
        <FormsWrapper />
        <div className='mt-3 text-center'>
          Not buy/sell, use{' '}
          <Link href='/' className='text-blue-600 font-normal underline'>
            swap/send
          </Link>{' '}
          instead.
        </div>
      </section>
      <section className='font-normal text-[16px] text-center w-full mt-6 sm:w-[400px] sm:mx-auto'>
        Transact seamlessly, and earn XNT(Xento) tokens as reward
      </section>
    </main>
  );
}

export default BuyAndSellHomeScreen;
