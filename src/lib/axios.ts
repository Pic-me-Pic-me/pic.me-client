import axios from 'axios';

export const client = axios.create({
  baseURL: 'https://with-picme-api.com',
  headers: {
    'Content-type': 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQ5LCJpYXQiOjE2NzM0Mzk2NjAsImV4cCI6MTY3MzQ0MTQ2MH0.Ph6TwbiCMetGQXpkjeGChTyBW596W3eRRJlwfRZ_NQM',
  },
});

export const picmeGetFetcher = (url: string) => client.get(url).then((res) => res.data);
