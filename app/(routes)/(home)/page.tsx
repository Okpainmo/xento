'use client';

import TokenTransferForm from '@/app/components/TransferForm';

function Home() {
  return (
    <main className='w-full min-h-screen px-3'>
      <section className='mb-6 text-2xl sm:text-3xl lg:text-4xl text-center sm:w-[400px] sm:mx-auto font-bold mt-[50px] nunito_sans'>
        Token Rewards <br /> For Every Transaction
      </section>
      <section className='form-area w-full sm:w-[400px] sm:mx-auto mt-[50px] p-4 sm:p-6 rounded-[10px] shadow card-glass_light'>
        <TokenTransferForm />
      </section>
      <section className='font-normal text-[16px] text-center w-full mt-6 sm:w-[400px] sm:mx-auto'>
        Send Ethereum and Stablecoins, and earn XNT(Xento) tokens as reward
      </section>
    </main>
  );
}

export default Home;
