import Lottie from 'react-lottie';
import coinAnimation from '@/assets/lottie/coin.json';

interface APIComponentProps {
  isLoading: boolean;
  error: any;
  children: React.ReactNode;
}

export default function APIComponent({ isLoading, error, children }: APIComponentProps) {
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
  if (error) {
    throw new Error('API 요청 중 에러가 발생했습니다.');
  }
  return (
    <div className='flex h-full w-full'>
      {isLoading ? (
        <div className='fixed left-0 top-0 flex h-full w-full items-center justify-center'>
          <div className='h-[10%] w-[10%]'>
            <Lottie options={defaultOptions} />
          </div>
        </div>
      ) : (
        children
      )}
    </div>
  );
}
