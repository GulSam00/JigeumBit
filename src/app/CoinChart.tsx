'use client';

import { useState, useEffect } from 'react';

import { useBitcoinQueryType } from '@/queries/useBitcoinQuery';
import Select from 'react-select';
import { coinId } from '@/lib';

export default function CoinChart({ coinArr, time, localTime }: useBitcoinQueryType) {
  const [coin, setCoin] = useState('');

  const onChangeCoin = (selectedOption: any) => {
    if (selectedOption) {
      setCoin(selectedOption.value);
    }
  };

  useEffect(() => {
    setCoin(options[0].value);
  }, []);
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
  return (
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
  );
}
