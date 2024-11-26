import type { Metadata } from 'next';
import RootLayout from './rootLayout';

export const metadata: Metadata = {
  title: 'Jigeum Bit',
  description: 'Bitcoin data in real-time',
};

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <head></head>
      <RootLayout>{children}</RootLayout>
    </html>
  );
}
