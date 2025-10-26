import React from 'react';
import CoinItem from './components/MarketPageCoinItem';
import MainAppLayout__Plain from '@/app/components/layout/MainAppLayout__Plain';
import MarketSearchDecoy from './components/SearchComponent';

export const revalidate = 300; // Revalidate every 5 minutes

interface Coin {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  total_volume: number;
  sparkline_in_7d: { price: number[] };
  image: string;
  market_cap_rank?: number;
}

async function getCoinsData(): Promise<Coin[]> {
  const res = await fetch(
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true',
    { next: { revalidate: 300 } }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch coins data');
  }

  return res.json();
}

export default async function MainMarketOverviewPage() {
  const coinsData = await getCoinsData();

  return (
    <MainAppLayout__Plain>
      <main className='px-3 sm:px-8 w-full md:w-10/12 mx-auto md:mt-8'>
        <MarketSearchDecoy />

        {/* Market Table Container */}
        <section className='coins-list-section mt-4 md:mt-6 rounded-2xl shadow-sm overflow-hidden border border-gray-200'>
          {/* Heading */}
          <div className='list-categories flex items-center justify-between bg-gray-50 px-4 py-3 border-b border-gray-200'>
            <div className='w-1/12 xl:w-[5%] text-center font-bold montserrat'>
              #
            </div>
            <div className='w-2/12 xl:w-[10%] text-center font-bold montserrat'>
              Coin
            </div>
            <div className='w-[calc(25%_-_15px)] xl:w-[10%] text-center font-bold montserrat'>
              Price
            </div>
            <div className='w-[calc(16.66%_+_15px)] xl:w-[10%] text-center font-bold montserrat'>
              24h
            </div>
            <div className='hidden xl:flex xl:w-[17%] justify-center font-bold montserrat'>
              Total vol
            </div>
            <div className='hidden xl:flex xl:w-[18%] justify-center font-bold montserrat'>
              Mkt cap
            </div>
            <div className='w-3/12 xl:w-[25%] text-center font-bold montserrat'>
              Last 7 days
            </div>
          </div>

          {/* Coin Rows */}
          <div className='divide-y divide-gray-200'>
            {coinsData.map((coin) => (
              <CoinItem coin={coin} key={coin.id} />
            ))}
          </div>
        </section>
      </main>
    </MainAppLayout__Plain>
  );
}
