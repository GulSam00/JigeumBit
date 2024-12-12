import axios from 'axios';

const coinToken = process.env.API_COIN_TOKEN;

const instance = axios.create({
  baseURL: 'https://api.coincap.io/v2',
  timeout: 5000,
  headers: { 'Accept-Encoding': 'gzip', Authorization: `Bearer ${coinToken}` },
});

export default instance;
