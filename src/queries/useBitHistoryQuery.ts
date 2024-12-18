import { useQuery } from '@tanstack/react-query';

import axios from 'axios';
import { format } from 'date-fns';

interface HistoryArr {
  date: string;
  priceUsd: string;
  time: number;
}

interface ParsedArr {
  date: string;
  priceUsd: number;
  time: number;
}

interface GetBitHistoryRequest {
  coin: string;
  interval: string;
}

interface GetBitHistoryResponse {
  data: HistoryArr[];
}

export interface UseBitHistoryQueryType {
  data: ParsedArr[];
  isLoading?: boolean;
  error?: any;
}

const getBitHistory = async ({ coin, interval }: GetBitHistoryRequest): Promise<GetBitHistoryResponse> => {
  const url = `/api/bitcoin/assets/history?coin=${coin}&interval=${interval}`;
  const result = await axios.get(url);
  const { data } = result.data;
  return { data };
};

const getFormattedDate = (date: string, interval: string) => {
  switch (interval) {
    case 'm1':
    case 'm5':
    case 'm15':
    case 'm30':
      return format(new Date(date), 'yyyy-MM-dd HH:mm');
    case 'h1':
    case 'h2':
    case 'h6':
    case 'h12':
      return format(new Date(date), 'yyyy-MM-dd HH:mm');
    case 'd1':
      return format(new Date(date), 'yyyy-MM-dd');
    default:
      return format(new Date(date), 'yyyy-MM-dd');
  }
};

const useBitHistoryQuery = ({ coin, interval }: GetBitHistoryRequest) => {
  // useQuery 제네릭은 queryFn의 반환 값, error, select의 반환 값
  const { data, isLoading, error } = useQuery<GetBitHistoryResponse, unknown, ParsedArr[]>({
    queryKey: ['bitHistory', coin, interval],
    queryFn: () => getBitHistory({ coin, interval }),
    select: ({ data }: GetBitHistoryResponse) => {
      // queryFn의 반환 값인 GetBitHistoryResponse
      return data.map(item => ({
        // date: format(new Date(item.date), 'yyyy-MM-dd HH:ss'),
        date: getFormattedDate(item.date, interval),
        priceUsd: Number(item.priceUsd),
        time: item.time,
      }));
    },
    // queryFn 오류 시 select 호출 X

    refetchInterval: 10000, // 10초마다 새로 고침
  });
  return { data, isLoading, error };
};

export default useBitHistoryQuery;
