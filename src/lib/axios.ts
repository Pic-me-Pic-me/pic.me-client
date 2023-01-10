import axios from 'axios';

export const client = axios.create({
  baseURL: `http://3.36.80.168:3000`,
  headers: {
    'Content-type': 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQ2LCJpYXQiOjE2NzMzNjcwNzAsImV4cCI6MTY3MzM2ODg3MH0.xMEx2taPcscEc2bw7kaIQli7pX-1LPkeHTl-1K4-Y9E',
  },
});
export const picmeGetFetcher = (url: string) => client.get(url).then((response) => response.data);
