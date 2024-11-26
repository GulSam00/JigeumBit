'use client';

import { Clock } from '@/components';
import { useBitcoinQuery, useBitcoinQueryType } from '@/queries/useBitcoinQuery';

export default function Home() {
  const { array, time, localTime, isLoading, error } = useBitcoinQuery();

  return (
    <div className='grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20'>
      <Clock />
      <div>
        최신 데이터 : {localTime}
        {array?.map(item => {
          return (
            <div key={item.id}>
              {item.name} : {item.priceUsd}
            </div>
          );
        })}
      </div>
    </div>
  );
}
