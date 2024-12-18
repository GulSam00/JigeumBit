'use client';

import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import { APIComponent } from '@/components';
import { useBitHistoryQuery } from '@/queries';

import { coinId } from '@/lib';
import Select from 'react-select';

export default function Home() {
  const [coin, setCoin] = useState<string>('bitcoin');
  const [selectInterval, setSelectInterval] = useState<number>(0);
  const intervalOptions = ['m1', 'm5', 'm15', 'm30', 'h1', 'h2', 'h6', 'h12', 'd1'];

  const { data, isLoading, error } = useBitHistoryQuery({ coin, interval: intervalOptions[selectInterval] });

  const onChangeCoin = (selectedOption: any) => {
    if (selectedOption) {
      console.log(selectedOption);
      setCoin(selectedOption.value);
    }
  };

  const coinOptions = Object.keys(coinId).map(key => {
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
    setCoin(coinOptions[0].value);
  }, []);

  return (
    <APIComponent {...{ isLoading, error }}>
      <div className='flex h-full w-full flex-col items-center justify-center p-4'>
        <div className='flex w-full justify-between'>
          <div className='w-[200px]'>
            선택한 코인 : {coin}
            <Select options={coinOptions} styles={customStyles} onChange={onChangeCoin} />
          </div>
          <div className='flex h-full w-full items-end justify-end'>
            {intervalOptions.map((option, index) => {
              const selectedOption = 'bg-black text-white';
              return (
                <div
                  key={option}
                  className={`m-1 h-8 w-10 cursor-pointer rounded text-center leading-8 ${selectInterval === index && selectedOption}`}
                  onClick={() => setSelectInterval(index)}
                >
                  {option}
                </div>
              );
            })}
          </div>
        </div>
        {data && (
          <ResponsiveContainer width='100%' height={400} className='bg-red-100'>
            <LineChart width={500} height={300} data={data} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='date' />
              <YAxis domain={['auto', 'auto']} />
              <Tooltip />
              <Line type='monotone' dataKey='priceUsd' stroke='#8884d8' />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </APIComponent>
  );
}
