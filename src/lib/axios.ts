import axios from 'axios';

export const client = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}`,
  headers: {
    'Content-type': 'application/json',
  },
});

export const picmeGetFetcher = (url: string) => client.get(url).then((res) => res.data);
