'use client';

import { Sparklines, SparklinesLine } from 'react-sparklines';
import sanitizeHtml from 'sanitize-html';
import React from 'react';

interface TokenDetailsClientProps {
  coinDetails: any;
  name: string;
  description: string;
}

export default function TokenDetailsClient({
  coinDetails,
  name,
  description,
}: TokenDetailsClientProps) {
  const sanitizedCoinDescription = sanitizeHtml(description, {
    allowedTags: [],
    allowedAttributes: {},
  });

  return (
    <>
      {/* Sparkline Chart and DEX UI*/}
      <div className='last-7-days-chart w-full mt-8'>
        <Sparklines data={coinDetails.market_data.sparkline_7d.price}>
          <SparklinesLine color='blue' />
        </Sparklines>
        <div className='text--colors_secondary text-[13px] text-center'>
          {name} market performance chart for the last seven (7) days.
        </div>
      </div>

      {/* Market Stats */}
      <section className='flex flex-col gap-4 mt-6'>
        <h1 className='montserrat font-bold text-xl lg:text-2xl text-gray-600'>
          Market Statistics
        </h1>
        <div className='grid grid-cols-2 lg:grid-cols-3 gap-y-6'>
          <div className='flex flex-col'>
            <span className='font-bold mb-2 text-base text-gray-600'>
              Market cap
            </span>
            <span className='text-black'>
              ${coinDetails.market_data.market_cap.usd.toLocaleString()}
            </span>
          </div>
          <div>
            <span className='font-bold mb-2 text-base text-gray-600'>
              Mkt cap rank:{' '}
            </span>
            <span className='text-black'>
              {coinDetails.market_data.market_cap_rank}
            </span>
          </div>
          <div className='flex flex-col'>
            <span className='font-bold mb-2 text-base text-gray-600'>
              Total volume
            </span>
            <span className='text-black'>
              ${coinDetails.market_data.total_volume.usd.toLocaleString()}
            </span>
          </div>
          <div className='flex flex-col'>
            <span className='font-bold mb-2 text-base text-gray-600'>
              24h high
            </span>
            <span className='text-black'>
              $
              {coinDetails.market_data.high_24h.usd.toFixed(6).toLocaleString()}
            </span>
          </div>
          <div className='flex flex-col'>
            <span className='font-bold mb-2 text-base text-gray-600'>
              24h Low
            </span>
            <span className='text-black'>
              ${coinDetails.market_data.low_24h.usd.toFixed(6).toLocaleString()}
            </span>
          </div>
        </div>
      </section>

      {/* Price Performance */}
      <section className='flex flex-col gap-4 mt-12'>
        <h1 className='montserrat font-bold text-xl lg:text-2xl text-gray-600'>
          Price Performance
        </h1>
        <div className='grid grid-cols-2 lg:grid-cols-3 gap-y-6'>
          {[
            {
              label: 'Last 1 hour',
              value:
                coinDetails.market_data.price_change_percentage_1h_in_currency
                  .usd,
            },
            {
              label: 'Last 24 hours',
              value:
                coinDetails.market_data.price_change_percentage_24h_in_currency
                  .usd,
            },
            {
              label: 'Last 7 days',
              value:
                coinDetails.market_data.price_change_percentage_7d_in_currency
                  .usd,
            },
            {
              label: 'Last 30 days',
              value:
                coinDetails.market_data.price_change_percentage_30d_in_currency
                  .usd,
            },
            {
              label: 'Last 1 year',
              value:
                coinDetails.market_data.price_change_percentage_1y_in_currency
                  .usd,
            },
          ].map(({ label, value }) => (
            <div key={label} className='flex flex-col'>
              <span className='font-bold mb-2 text-base text-gray-600'>
                {label}
              </span>
              <span
                className={`${
                  value > 0 ? 'gain-alert-color' : 'loss-alert-color'
                } text-black`}
              >
                {value.toFixed(4)}%
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className='mt-12'>
        <h1 className='montserrat font-bold text-xl lg:text-2xl text-gray-600'>
          About {name}
        </h1>
        <div className='pt-2 leading-[25px] text-black'>
          {sanitizedCoinDescription}
        </div>
      </section>
    </>
  );
}
