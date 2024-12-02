'use client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface BitcoinData {
  id: string; // 자산 ID (예: bitcoin)
  rank: number; // 순위 (예: 1)
  symbol: string; // 자산 심볼 (예: BTC)
  name: string; // 자산 이름 (예: Bitcoin)
  supply: number; // 현재 공급량
  maxSupply: number; // 최대 공급량
  marketCapUsd: number; // 시가총액 (USD)
  volumeUsd24Hr: number; // 24시간 거래량 (USD)
  priceUsd: number; // 현재 가격 (USD)
  changePercent24Hr: number; // 24시간 가격 변동 퍼센트
  vwap24Hr: number; // 24시간 거래량 가중 평균 가격 (VWAP)
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
  const data = result.data;
  return data;
};

const useBitcoinQuery = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['bitcoins'],
    queryFn: getBitcoins,
    // queryFn 오류 시 select 호출 X
    select: data => {
      const [arr, time] = [data.data, data.timestamp];
      const coinIdArr = arr.map(coin => coin.id);
      const localTime = new Date(time).toLocaleTimeString();
      // rank 숫자로 변환
      // 24시간 변동률 소수점 2자리 + %
      // 24시간 거래량 소수점 2자리
      // 시가총액 소수점 2자리
      // 24시간 가중평균 소수점 2자리

      const coinArr = arr.map(coin => ({
        ...coin,
        supply: Number(coin.supply),
        maxSupply: Number(coin.maxSupply),
        rank: Number(coin.rank),
        priceUsd: Number(Number(coin.priceUsd).toFixed(5)),
        marketCapUsd: Number(Number(coin.marketCapUsd).toFixed(5)),
        changePercent24Hr: Number(Number(coin.changePercent24Hr).toFixed(2)),
        volumeUsd24Hr: Number(Number(coin.volumeUsd24Hr).toFixed(5)),
        vwap24Hr: Number(Number(coin.vwap24Hr).toFixed(5)),
      }));

      return { coinArr, coinIdArr, time, localTime };
    },
    refetchInterval: 10000, // 10초마다 새로 고침
    refetchOnWindowFocus: true, // 창을 포커스하면 자동으로 새로 고침
  });

  return { ...data, isLoading, error };
};

export default useBitcoinQuery;
