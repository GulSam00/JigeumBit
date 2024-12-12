import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface BitHistoryQuery {
  priceUsd: string;
  time: number;
}

interface BitHistoryProps {
  coin: string;
  interval: string;
}
export interface useBitcoinQueryType {
  priceUsd: string;
  time: number;
  isLoading?: boolean;
  error?: any;
}

const getBitHistory = async ({ coin, interval }: BitHistoryProps) => {
  const url = `/api/bitcoin/assets/history?coin=${coin}&interval=${interval}`;
  console.log('url : ', url);
  const result = await axios.get(url);
  const data = result.data;
  console.log('getBitHistory : ', result);

  return data;
};

const useBitHistoryQuery = ({ coin, interval }: BitHistoryProps) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['bitHistory', coin, interval],
    queryFn: () => getBitHistory({ coin, interval }),
    // queryFn 오류 시 select 호출 X
    select: data => {
      console.log(data);
      const { priceUsd, time } = data;
      return { priceUsd, time };
    },
    refetchInterval: 10000, // 10초마다 새로 고침
    // refetchOnWindowFocus: true, // 창을 포커스하면 자동으로 새로 고침
  });
  return { ...data, isLoading, error };
};

export default useBitHistoryQuery;
