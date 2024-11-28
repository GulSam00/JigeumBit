'use client';

import { APIComponent, Clock } from '@/components';
import { useBitcoinQuery } from '@/queries';
import CoinChart from './CoinChart';
import CoinTable from './CoinTable';

export default function Home() {
  const { coinArr, time, localTime, isLoading, error } = useBitcoinQuery();

  return (
    <div>
      {/* <Clock /> */}
      <APIComponent {...{ isLoading, error }}>
        <CoinTable {...{ coinArr, time, localTime }} />
        <CoinChart {...{ coinArr, time, localTime }} />
      </APIComponent>
    </div>
  );
}
