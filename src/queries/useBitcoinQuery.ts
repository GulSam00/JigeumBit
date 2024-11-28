'use client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface BitcoinData {
  id: string; // 자산 ID (예: bitcoin)
  rank: string; // 순위 (예: 1)
  symbol: string; // 자산 심볼 (예: BTC)
  name: string; // 자산 이름 (예: Bitcoin)
  supply: string; // 현재 공급량
  maxSupply: string; // 최대 공급량
  marketCapUsd: string; // 시가총액 (USD)
  volumeUsd24Hr: string; // 24시간 거래량 (USD)
  priceUsd: string; // 현재 가격 (USD)
  changePercent24Hr: string; // 24시간 가격 변동 퍼센트
  vwap24Hr: string; // 24시간 거래량 가중 평균 가격 (VWAP)
}
interface BitcoinQuery {
  data: BitcoinData[];
  timestamp: number;
}

export interface useBitcoinQueryType {
  coinArr: BitcoinData[] | undefined;
  time: number | undefined;
  localTime: string | undefined;
  isLoading?: boolean;
  error?: any;
}

const getBitcoins = async () => {
  const result = await axios.get<BitcoinQuery>('/api/bitcoin/assets');
  // console.log('getBitcoins result', result);
  const data = result.data;
  return data;
};

export const useBitcoinQuery = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['bitcoins'],
    queryFn: getBitcoins,
    // queryFn 오류 시 select 호출 X
    select: data => {
      const [coinArr, time] = [data.data, data.timestamp];
      const coinIdArr = coinArr.map(coin => coin.id);
      const localTime = new Date(time).toLocaleTimeString();
      return { coinArr, coinIdArr, time, localTime };
    },
    refetchInterval: 3000, // 3초마다 새로 고침
    refetchOnWindowFocus: true, // 창을 포커스하면 자동으로 새로 고침
  });

  // console.log('useBitcoinQuery data', data);

  return { ...data, isLoading, error };
};
