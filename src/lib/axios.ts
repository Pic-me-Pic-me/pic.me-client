import axios from 'axios';

export const client = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}`,
  headers: {
    'Content-type': 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjkyLCJpYXQiOjE2NzMzNTU4MDAsImV4cCI6MTY3MzM2MzAwMH0.dlPHJNuSjTjZGFiR9I4iFBo4y0YV1Ukz99kAkhRTXNY',
  },
});

export const picmeGetFetcher = (url: string) => client.get(url).then((res) => res.data);
