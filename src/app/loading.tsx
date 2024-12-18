'use client';

import Lottie from 'react-lottie';
import coinAnimation from '@/assets/lottie/coin.json';

export default function loading() {
  const defaultOptions = {
    height: 100,
    width: 100,
    loop: true,
    autoplay: true,
    animationData: coinAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div className='fixed left-0 top-0 flex h-full w-full items-center justify-center'>
      <div className='h-[10%] w-[10%]'>
        <Lottie options={defaultOptions} />
      </div>
    </div>
  );
}
