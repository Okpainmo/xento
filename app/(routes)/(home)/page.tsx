'use client';

import FormsWrapper from '@/app/components/FormsWrapper';

function Home() {
  return (
    <main className='w-full min-h-screen px-3'>
      <section className='mb-6 text-2xl sm:text-3xl lg:text-4xl text-center sm:w-[400px] sm:mx-auto font-bold mt-[30px] lg:mt-[50px] nunito_sans'>
        Token Rewards <br /> For Every Transaction
      </section>
      <section className='form-area w-full sm:w-[400px] sm:mx-auto mt-[30px] lg:mt-[50px] p-4 sm:p-6 rounded-[12px] shadow card-glass_light'>
        <FormsWrapper />
      </section>
      <section className='font-normal text-[16px] text-center w-full mt-6 sm:w-[400px] sm:mx-auto'>
        Send or Swap tokens, and earn XNT(Xento) tokens as reward
      </section>
    </main>
  );
}

export default Home;
