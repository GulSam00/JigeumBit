interface APIComponentProps {
  isLoading: boolean;
  error: any;
  children: React.ReactNode;
}

export default function APIComponent({ isLoading, error, children }: APIComponentProps) {
  if (error) {
    throw new Error('API 요청 중 에러가 발생했습니다.');
  }
  return <>{isLoading ? <div>로딩 중...</div> : children}</>;
}
