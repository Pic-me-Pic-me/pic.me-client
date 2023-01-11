import axios from 'axios';

export const client = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}`,
  headers: {
    'Content-type': 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE1NiwiaWF0IjoxNjczNDEyNjcxLCJleHAiOjE2NzM0MTQ0NzF9.1cNaIuDO9MJ676oK1mBpqNV_eMXfVkdAx-Gf5fSGYr8',
  },
});

export const picmeGetFetcher = (url: string) => client.get(url).then((res) => res.data);
