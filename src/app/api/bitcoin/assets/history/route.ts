import { instance } from '@/app/api';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const coin = searchParams.get('coin');
  const interval = searchParams.get('interval');
  console.log(coin, interval);

  if (!coin || !interval) {
    return NextResponse.json({ error: 'Missing coin or interval' }, { status: 400 });
  }
  try {
    const url = `/assets/${coin}/history?interval=${interval}`;
    const { data } = await instance.get(url);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('error', error);
    return NextResponse.json({ error: 'GET error', status: 500 });
  }
}
