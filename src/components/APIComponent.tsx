import Lottie from 'react-lottie';
import coinAnimation from '@/assets/lottie/coin.json';

interface APIComponentProps {
  isLoading: boolean;
  error: any;
  children: React.ReactNode;
}

export default function APIComponent({ isLoading, error, children }: APIComponentProps) {
  const defaultOptions = {
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
  return <>{isLoading ? <Lottie options={defaultOptions} /> : children}</>;
}
