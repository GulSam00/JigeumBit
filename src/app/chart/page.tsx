'use client';

import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import { APIComponent } from '@/components';
import { useBitHistoryQuery } from '@/queries';

import { coinId } from '@/lib';
import Select from 'react-select';

export default function Home() {
  const [coin, setCoin] = useState<string>('bitcoin');
  const [interval, setInterval] = useState<string>('d1');

  const { data, isLoading, error } = useBitHistoryQuery({ coin, interval });

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
      <div className='flex h-full w-full flex-col items-center justify-center'>
        <div>
          선택한 코인 : {coin}
          <Select options={coinOptions} styles={customStyles} onChange={onChangeCoin} />
        </div>

        {data && (
          <ResponsiveContainer width='100%' height={400}>
            <LineChart
              width={500}
              height={300}
              data={data}
              // margin={{
              //   top: 5,
              //   right: 30,
              //   left: 20,
              //   bottom: 5,
              // }}
            >
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='date' />
              <YAxis />
              <Tooltip />
              <Line type='monotone' dataKey='priceUsd' stroke='#8884d8' />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </APIComponent>
  );
}
