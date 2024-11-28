'use client';

import { APIComponent, Clock } from '@/components';
import { useBitcoinQuery } from '@/queries/useBitcoinQuery';
import CoinChart from './CoinChart';

export default function Home() {
  const { coinArr, time, localTime, isLoading, error } = useBitcoinQuery();

  return (
    <div className='grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20'>
      <Clock />
      <APIComponent {...{ isLoading, error }}>
        <CoinChart {...{ coinArr, time, localTime }} />
      </APIComponent>
    </div>
  );
}
