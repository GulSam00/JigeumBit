'use client';

import { useState, useEffect } from 'react';

import { APIComponent } from '@/components';
import { useBitcoinQuery, useBitHistoryQuery } from '@/queries';

import { coinId } from '@/lib';
import CoinChart from './CoinChart';
import Select from 'react-select';

export default function Home() {
  const [coin, setCoin] = useState('');

  const { coinArr, time, localTime, isLoading, error } = useBitcoinQuery();
  const { priceUsd, time: tt, isLoading: load, error: err } = useBitHistoryQuery({ coin: 'bitcoin', interval: 'd1' });

  const onChangeCoin = (selectedOption: any) => {
    if (selectedOption) {
      setCoin(selectedOption.value);
    }
  };

  const options = Object.keys(coinId).map(key => {
    return {
      value: key,
      label: key,
    };
  });

  const customStyles = {
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#FF5733' : state.isFocused ? '#FFC300' : 'white',
      color: state.isSelected ? 'white' : 'black',
      padding: 10,
      cursor: 'pointer',
    }),
  };

  useEffect(() => {
    setCoin(options[0].value);
  }, []);

  return (
    <APIComponent {...{ isLoading, error }}>
      <div>
        최신 데이터 : {localTime}
        선택한 코인 : {coin}
        <Select options={options} styles={customStyles} defaultValue={options[0]} onChange={onChangeCoin} />
        {coinArr?.map(item => {
          return (
            <div key={item.id}>
              {item.name} : {item.priceUsd}
            </div>
          );
        })}
      </div>

      <CoinChart {...{ coinArr, time, localTime }} />
    </APIComponent>
  );
}
