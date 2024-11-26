import axios from 'axios';
import { NextResponse } from 'next/server';

const coinToken = process.env.API_COIN_TOKEN;
const instance = axios.create({
  baseURL: 'https://api.coincap.io/v2',
  timeout: 5000,
  headers: { 'Accept-Encoding': 'gzip', Authorization: `Bearer ${coinToken}` },
});

export async function GET() {
  try {
    const { data } = await instance.get('/assets');
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('error', error);
    return NextResponse.json({ error: 'GET error' });
  }
}
