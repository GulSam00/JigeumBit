'use client';

import { APIComponent, Clock } from '@/components';
import { useBitcoinQuery } from '@/queries';
import CoinTable from './CoinTable';

export default function Home() {
  const { coinArr, time, localTime, isLoading, error } = useBitcoinQuery();

  return (
    <APIComponent {...{ isLoading, error }}>
      <CoinTable {...{ coinArr, time, localTime }} />
    </APIComponent>
  );
}
