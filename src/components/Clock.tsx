'use client';

import { useState, useEffect } from 'react';

export default function Clock() {
  const [currentTime, setCurrentTime] = useState<string | null>(null);

  useEffect(() => {
    setCurrentTime(new Date().toLocaleTimeString());
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleTimeString());
      requestAnimationFrame(updateTime); // 매 프레임마다 갱신
    };

    const animationId = requestAnimationFrame(updateTime); // 애니메이션 프레임 시작
    return () => cancelAnimationFrame(animationId); // 애니메이션 프레임 종료
  });

  return (
    <div>
      {currentTime ? (
        <>
          <h1>현재 시간</h1>
          <h2>{currentTime}</h2>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
