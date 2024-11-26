'use client';

import { useBitcoinQuery } from '@/queries';
export default function Home() {
  const { array, time, isLoading, error } = useBitcoinQuery();

  console.log('Home data', array);

  return (
    <div className='grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20'>
      main page
      <div>
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
