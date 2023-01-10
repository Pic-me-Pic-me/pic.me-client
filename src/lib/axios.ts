import axios from 'axios';

export const client = axios.create({
  baseURL: `http://3.36.80.168:3000`,
  headers: {
    'Content-type': 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQ2LCJpYXQiOjE2NzMzNjM3MDMsImV4cCI6MTY3MzM2NTUwM30.aB1NrG2qbsB6z4XqX7NjzL1zs0Ef6MQmKh41De1TNIE',
  },
});
export const picmeGetFetcher = (url: string) => client.get(url).then((response) => response.data);
