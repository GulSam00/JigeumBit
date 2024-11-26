'use client';

import { useEffect, useState } from 'react';
import localFont from 'next/font/local';
import './globals.css';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export default function rootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [darkMode, setDarkMode] = useState<boolean | null>(null);

  // 다크 모드 토글 핸들러
  const onClickDarkMode = () => {
    const newMode = !darkMode;
    localStorage.setItem('darkMode', newMode ? 'true' : 'false');
    setDarkMode(newMode);
    document.documentElement.setAttribute('data-theme', newMode ? 'dark' : 'light');
  };

  useEffect(() => {
    // 클라이언트에서 초기 테마 설정
    const savedMode = localStorage.getItem('darkMode');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const initialMode = savedMode === 'true' || (savedMode === null && prefersDark);
    setDarkMode(initialMode);
    document.documentElement.setAttribute('data-theme', initialMode ? 'dark' : 'light');
  }, []);

  return (
    <body
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      data-theme={darkMode ? 'dark' : 'light'}
    >
      <div className='flex justify-end border-2 p-2'>
        <button className='rounded-md border border-gray-300 px-2 py-1' onClick={onClickDarkMode}>
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
      {children}
    </body>
  );
}
