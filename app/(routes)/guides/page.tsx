'use client';

import React from 'react';
import MainAppLayout__Plain from '@/app/components/layout/MainAppLayout__Plain';

export default function GuidesPage() {
  return (
    <MainAppLayout__Plain>
      <main className='px-4 sm:px-8 w-full md:w-10/12 mx-auto mt-6 md:mt-8'>
        {/* Page Header */}
        <header className='text-center mb-8'>
          <h1 className='text-3xl sm:text-4xl font-bold text-gray-900'>
            Xento Guides
          </h1>
          <p className='mt-2 text-gray-500 text-sm sm:text-base'>
            Your complete guide to understanding, testing, and using Xento.
          </p>
        </header>

        {/* Guides Container */}
        <div className='flex flex-col items-center gap-6'>
          {/* Intro Section */}
          <section className='w-full sm:w-11/12 xl:w-1/2 bg-white p-6 rounded-2xl'>
            <h2 className='text-xl font-semibold text-gray-900 mb-3'>
              About the Project
            </h2>
            <p className='text-gray-600 leading-relaxed text-sm sm:text-base mb-3'>
              Xento is a decentralized exchange (DEX) platform that enables
              seamless, secure, and rewarding crypto transactions. Users can
              send, swap, buy, and sell digital assets efficiently on the
              platform.
            </p>
            <p className='text-gray-600 leading-relaxed text-sm sm:text-base mb-3'>
              What sets Xento apart is its innovative tokenomics: 10% of the
              platform’s valuation is tokenized as{' '}
              <span className='font-medium text-gray-900'>
                Xento (XNT) tokens
              </span>
              . As you interact with Xento, you earn XNT tokens, giving you
              economic participation in the platform—similar to being a
              shareholder—without traditional voting rights. This structure
              functions like a “soft IPO,” rewarding early users for
              contributing to the platform’s growth.
            </p>
            <p className='text-gray-600 leading-relaxed text-sm sm:text-base'>
              The value of XNT tokens is designed to increase as Xento’s
              valuation grows, ensuring that active participants are rewarded
              proportionally to the platform’s success. This approach provides
              long-term incentives for engagement and loyalty.
            </p>
          </section>

          {/* How to Get Tokens */}
          <section className='w-full sm:w-11/12 xl:w-1/2 bg-white p-6 rounded-2xl'>
            <h2 className='text-xl font-semibold text-gray-900 mb-3'>
              How to Get Tokens for Test Transactions
            </h2>
            <p className='text-gray-600 leading-relaxed text-sm sm:text-base mb-4'>
              Since Xento is currently on the testnet, you’ll need test tokens
              to explore the platform safely. To facilitate this, we are
              launching <span className='font-medium text-gray-900'>Airit</span>
              , a faucet designed to distribute airdrops of all ERC-20 tokens
              used in Xento.
            </p>
            <ul className='list-disc list-inside text-gray-600 space-y-2 text-sm sm:text-base'>
              <li>
                Connect your testnet wallet to Airit and request the tokens you
                need.
              </li>
              <li>
                Airit provides ERC-20 tokens that mirror the ones used in Xento,
                enabling you to test sending, swapping, buying, or selling
                without real financial risk.
              </li>
              <li>
                Use these tokens on Xento to experiment with transactions and
                understand the platform’s functionality.
              </li>
            </ul>
          </section>

          {/* Work With Me */}
          <section className='w-full sm:w-11/12 xl:w-1/2 bg-white p-6 rounded-2xl'>
            <h2 className='text-xl font-semibold text-gray-900 mb-3'>
              Work With Me
            </h2>
            <p className='text-gray-600 leading-relaxed text-sm sm:text-base mb-2'>
              Xento is open to collaboration! If you have ideas, development
              skills, or marketing strategies, I’d love to hear from you.
            </p>
            <p className='text-gray-600 text-sm sm:text-base'>
              Reach out via social media, GitHub, or email. Together, we can
              make the testnet more engaging, improve the platform, and help
              users understand the potential of Xento.
            </p>
          </section>
        </div>
      </main>
    </MainAppLayout__Plain>
  );
}
