'use client';

import { useBitcoinQueryType } from '@/queries/useBitcoinQuery';
import Select from 'react-select';

export default function CoinChart({ coinArr, localTime }: useBitcoinQueryType) {
  const customStyles = {
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#FF5733' : state.isFocused ? '#FFC300' : 'white',
      color: state.isSelected ? 'white' : 'black',
      padding: 10,
      cursor: 'pointer',
    }),
  };
  return <div>코인 차트</div>;
}
