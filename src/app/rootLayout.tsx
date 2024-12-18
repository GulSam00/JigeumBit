'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAtom } from 'jotai';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { isDarkAtom } from '@/atoms';
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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {},
  },
});

export default function rootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [darkMode, setDarkMode] = useAtom(isDarkAtom);
  const router = useRouter();
  const path = usePathname();

  // 다크 모드 토글 핸들러
  const onClickDarkMode = () => {
    const newMode = !darkMode;
    localStorage.setItem('darkMode', newMode ? 'true' : 'false');
    setDarkMode(newMode);
    document.documentElement.setAttribute('data-theme', newMode ? 'dark' : 'light');
  };

  const isDarkCSS = (dst: string) => {
    console.log(dst, path);
    if (dst === path) {
      return 'bg-foreground text-background';
    }
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
      <QueryClientProvider client={queryClient}>
        <div className='fixed flex h-[60px] w-full justify-between border-2 p-2'>
          <div className='flex gap-4'>
            <div>
              <div className='text-lg'>JigeumBit</div>
              <div className='text-sm'>비트코인 실시간 시세</div>
            </div>

            <div
              className={`flex h-full cursor-pointer items-center rounded p-2 ${isDarkCSS('/')}`}
              onClick={() => router.push('/')}
            >
              전체 시세
            </div>
            <div
              onClick={() => router.push('chart')}
              className={`flex h-full cursor-pointer items-center rounded p-2 ${isDarkCSS('/chart')}`}
            >
              코인별 시세
            </div>
          </div>
          <button className='rounded-md border border-gray-300 px-2 py-1' onClick={onClickDarkMode}>
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
        <div className='pt-15 flex h-full w-full pt-[60px]'>{children}</div>
      </QueryClientProvider>
    </body>
  );
}
