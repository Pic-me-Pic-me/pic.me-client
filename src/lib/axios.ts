import axios from 'axios';

export const client = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}`,
  headers: {
    'Content-type': 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQ5LCJpYXQiOjE2NzM0MzA2MzAsImV4cCI6MTY3MzQzMjQzMH0.jgf8qvSE_o8mmlA9hCUZaTpsLygH_TMLhygjL_BahU4',
  },
});

export const picmeGetFetcher = (url: string) => client.get(url).then((res) => res.data);
