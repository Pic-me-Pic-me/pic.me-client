import axios from 'axios';

export const client = axios.create({
  baseURL: 'http://3.36.80.168:3000',
  headers: {
    'Content-type': 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjU1LCJpYXQiOjE2NzMyNzg0NzIsImV4cCI6MTY3MzI4NTY3Mn0.rP_O90EYa_yV-_MpsWouSFYUwKiIdftmgg61sglp6oU',
  },
});

export const picmeGetFetcher = (url: string) => client.get(url).then((res) => res.data);
