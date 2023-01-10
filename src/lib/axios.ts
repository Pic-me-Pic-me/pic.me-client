import axios from 'axios';

export const client = axios.create({
  baseURL: 'http://3.36.80.168:3000',
  headers: {
    'Content-type': 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjkyLCJpYXQiOjE2NzMzNDg0MjQsImV4cCI6MTY3MzM1NTYyNH0.pJziaFp-GmDRCztGFxQdLzIBSzFWyruWxFPmc7vN2zM',
  },
});

export const picmeGetFetcher = (url: string) => client.get(url).then((res) => res.data);
