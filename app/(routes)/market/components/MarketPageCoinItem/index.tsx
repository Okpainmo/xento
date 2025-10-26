'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Sparklines, SparklinesLine } from 'react-sparklines';

interface Coin {
  id: string;
  symbol: string;
  current_price: number;
  image: string;
  name: string;
  price_change_percentage_24h: number;
  market_cap_rank?: number;
  sparkline_in_7d: { price: number[] };
  total_volume: number;
  market_cap: number;
}

interface CoinItemProps {
  coin: Coin;
}

export default function CoinItem({ coin }: CoinItemProps) {
  const {
    id,
    symbol,
    current_price,
    image,
    name,
    price_change_percentage_24h,
    market_cap_rank,
    sparkline_in_7d,
    total_volume,
    market_cap,
  } = coin;

  return (
    <Link
      href={`/tokens/${id}`}
      className='py-3 px-4 flex items-center justify-between hover:bg-gray-50 transition-colors'
    >
      <div className='w-1/12 xl:w-[5%] text-center'>{market_cap_rank}</div>

      <div className='coin w-2/12 xl:w-[10%] flex flex-col justify-center items-center text-center'>
        <div className='flex flex-col items-center'>
          <div className='relative w-[25px] h-[25px]'>
            <Image src={image} alt={`${name} logo`} fill />
          </div>
          <span className='pt-[5px] text-sm uppercase text-[12px] sm:text-[14px]'>
            {symbol}
          </span>
        </div>
      </div>

      <div className='price w-[calc(25%_-_15px)] xl:w-[10%] flex justify-center items-center text-[12px] sm:text-[14px]'>
        ${current_price.toLocaleString()}
      </div>

      <div
        className={`last-24-hours w-[calc(16.66%_+_15px)] xl:w-[10%] flex justify-center items-center text-[12px] sm:text-[14px] ${
          price_change_percentage_24h > 0
            ? 'gain-alert-color'
            : 'loss-alert-color'
        }`}
      >
        {price_change_percentage_24h.toFixed(2)}%
      </div>

      <div className='hidden xl:flex xl:w-[17%] justify-center items-center'>
        {total_volume.toLocaleString()}
      </div>

      <div className='hidden xl:flex xl:w-[18%] justify-center items-center'>
        {market_cap.toLocaleString()}
      </div>

      <div className='last-7-days w-3/12 xl:w-[25%] flex justify-center h-[40px] sm:h-[50px]'>
        <Sparklines data={sparkline_in_7d.price}>
          <SparklinesLine
            color={price_change_percentage_24h > 0 ? 'green' : 'red'}
          />
        </Sparklines>
      </div>
    </Link>
  );
}
