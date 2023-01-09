import axios from 'axios';

export const client = axios.create({
  baseURL: 'http://3.36.80.168:3000',
  headers: {
    'Content-type': 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjU2LCJpYXQiOjE2NzMyODY0ODMsImV4cCI6MTY3MzI5MzY4M30.rPe1iUGNH3O5PCQxM40Uu1A0-5rIKiiHI-XCSQs2mKo',
  },
});

export const picmeGetFetcher = (url: string) => client.get(url).then((res) => res.data);
