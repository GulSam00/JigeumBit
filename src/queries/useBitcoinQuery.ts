'use client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

type BitcoinData = {
  changePercent24Hr: string; // 24시간 가격 변동 퍼센트
  explorer: string; // 관련 블록체인 탐색기 URL
  id: string; // 자산 ID (예: bitcoin)
  marketCapUsd: string; // 시가총액 (USD)
  maxSupply: string; // 최대 공급량
  name: string; // 자산 이름 (예: Bitcoin)
  priceUsd: string; // 현재 가격 (USD)
  rank: string; // 순위 (예: 1)
  supply: string; // 현재 공급량
  symbol: string; // 자산 심볼 (예: BTC)
  volumeUsd24Hr: string; // 24시간 거래량 (USD)
  vwap24Hr: string; // 24시간 거래량 가중 평균 가격 (VWAP)
};
interface BitcoinQuery {
  data: BitcoinData[];
  timestamp: number;
}
const getBitcoins = async () => {
  const result = await axios.get<BitcoinQuery>('/api/bitcoin/assets');
  // console.log('getBitcoins result', result);
  const data = result.data;
  return data;
};

const useBitcoinQuery = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['bitcoins'],
    queryFn: getBitcoins,
    refetchInterval: 1000, // 1초마다 새로 고침
    refetchOnWindowFocus: true, // 창을 포커스하면 자동으로 새로 고침
  });

  // console.log('useBitcoinQuery data', data);
  const [array, time] = [data?.data, data?.timestamp];
  return { array, time, isLoading, error };
};

export default useBitcoinQuery;
