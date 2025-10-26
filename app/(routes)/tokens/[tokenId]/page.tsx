import Image from 'next/image';
import { notFound } from 'next/navigation';
// import MainAppLayout from '@/app/components/layout/MainAppLayout';
import TokenDetailsClient from './components/TokenDetails';
import FormsWrapper from '@/app/components/FormsWrapper';
import Link from 'next/link';

interface CoinDetails {
  image: { large: string };
  id: string;
  symbol: string;
  name: string;
  market_data: {
    current_price: { usd: number };
    sparkline_7d: { price: number[] };
    market_cap: { usd: number };
    market_cap_rank: number;
    total_volume: { usd: number };
    high_24h: { usd: number };
    low_24h: { usd: number };
    price_change_percentage_1h_in_currency: { usd: number };
    price_change_percentage_24h_in_currency: { usd: number };
    price_change_percentage_7d_in_currency: { usd: number };
    price_change_percentage_30d_in_currency: { usd: number };
    price_change_percentage_1y_in_currency: { usd: number };
  };
  description: { en: string };
}

async function getCoinDetails(coinId: string): Promise<CoinDetails> {
  const res = await fetch(
    `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&sparkline=true`,
    { next: { revalidate: 300 } } // Revalidate every 5 mins
  );

  if (!res.ok) {
    notFound();
  }

  return res.json();
}

export default async function TokenPage({
  params,
}: {
  params: Promise<{ tokenId: string }>;
}) {
  const { tokenId } = await params;
  const coinDetails = await getCoinDetails(tokenId);

  return (
    <main className='lg:flex lg:gap-x-10 token-details-page px-[12px] xsm:px-4 sm:w-4/5 lg:w-full pt-4 md:pt-10 sm:mx-auto xl:w-4/5 2xl:w-3/5'>
      <section className='w-full lg:w-[calc(100%-300px)]'>
        {/* Token Header */}
        <div className='flex gap-6'>
          <section className='relative'>
            <div className='w-[75px] h-[75px] lg:w-[100px] lg:h-[100px]'>
              <Image
                src={coinDetails.image.large}
                alt={`${coinDetails.id} logo`}
                fill
                className='object-contain'
                sizes='(min-width: 1024px) 100px, 75px'
                priority
              />
            </div>
          </section>
          <div className='flex flex-col justify-center montserrat lg:gap-2'>
            <div className='flex items-center lg:gap-2'>
              <div className='text-2xl lg:text-3xl text--colors_primary font-bold'>
                {coinDetails.name}
              </div>
              <span className='pt-[5px] text--colors_secondary text-[14px] lg:text-base'>
                ({coinDetails.symbol})
              </span>
            </div>
            <div className='text-base lg:text-xl'>
              Price:{' '}
              <span className='text--colors_secondary'>
                $
                {coinDetails.market_data.current_price.usd > 0
                  ? coinDetails.market_data.current_price.usd.toLocaleString()
                  : coinDetails.market_data.current_price.usd
                      .toFixed(6)
                      .toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Client-only section (Chart + Sanitized Description) */}
        <TokenDetailsClient
          coinDetails={coinDetails}
          name={coinDetails.name}
          description={coinDetails.description.en}
        />
      </section>
      <div className='hidden lg:flex w-[300px] lg:flex-col'>
        <FormsWrapper />
        <div className='mt-3 text-center'>
          Not swap/send, use{' '}
          <Link
            href='/buy-and-sell'
            className='text-blue-600 font-normal underline'
          >
            buy/sell
          </Link>{' '}
          instead.
        </div>
      </div>
    </main>
  );
}
