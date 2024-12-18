'use client';

import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import { APIComponent } from '@/components';
import { useBitHistoryQuery } from '@/queries';

import { coinId } from '@/lib';
import Select from 'react-select';

type CoinOptionType = {
  value: string;
  label: string;
};

export default function Home() {
  const coinOptions: CoinOptionType[] = Object.keys(coinId).map(key => {
    return {
      value: key,
      label: key,
    };
  });
  const intervalOptions = ['m1', 'm5', 'm15', 'm30', 'h1', 'h2', 'h6', 'h12', 'd1'];

  const [selectOption, setSelectOption] = useState<CoinOptionType>(coinOptions[0]);
  const [selectInterval, setSelectInterval] = useState<number>(0);

  const { data, isLoading, error } = useBitHistoryQuery({
    coin: selectOption.value,
    interval: intervalOptions[selectInterval],
  });

  const onChangeCoin = (event: any) => {
    const selectedIndex = event.target.selectedIndex;
    console.log(selectedIndex);
    if (selectedIndex) {
      setSelectOption(coinOptions[selectedIndex]);
    }
  };
  const getTickValue = (value: string) => {
    if (selectInterval === intervalOptions.length - 1) {
      return value;
    }
    return value.split(' ')[1];
  };

  return (
    <APIComponent {...{ isLoading, error }}>
      <div className='flex h-full w-full flex-col items-center gap-4 p-4'>
        <div className='flex w-full justify-between'>
          <div className='flex w-[300px] flex-col gap-4'>
            선택한 코인 : {selectOption.label}
            <select
              title='코인 선택'
              value={selectOption.value} // 현재 선택된 옵션
              onChange={onChangeCoin}
              className='w-full rounded-md border border-foreground bg-background p-2 text-foreground'
            >
              {coinOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className='flex h-full w-full items-end justify-end'>
            {intervalOptions.map((option, index) => {
              const unSelectedOption = 'bg-background text-foreground border border-foreground';
              const selectedOption = 'bg-foreground text-background';

              return (
                <div
                  key={option}
                  className={`m-1 h-8 w-10 cursor-pointer rounded text-center leading-8 ${selectInterval === index ? selectedOption : unSelectedOption} `}
                  onClick={() => setSelectInterval(index)}
                >
                  {option}
                </div>
              );
            })}
          </div>
        </div>
        {data && (
          <ResponsiveContainer width='100%' height={400} className='bg-background text-foreground'>
            <LineChart width={500} height={300} data={data} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='date' tickFormatter={value => getTickValue(value)} />
              <YAxis domain={['auto', 'auto']} />
              <Tooltip />
              <Line type='monotone' dataKey='priceUsd' stroke='#8884d8' dot={false} />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </APIComponent>
  );
}
