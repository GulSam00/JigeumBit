'use client';

import { APIComponent, Clock } from '@/components';
import { useBitcoinQuery } from '@/queries';
import CoinChart from './CoinChart';

export default function Home() {
  const { coinArr, time, localTime, isLoading, error } = useBitcoinQuery();

  return (
    <div>
      {/* <Clock /> */}
      <APIComponent {...{ isLoading, error }}>
        <CoinChart {...{ coinArr, time, localTime }} />
      </APIComponent>
    </div>
  );
}
