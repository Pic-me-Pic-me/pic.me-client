import axios from 'axios';

export const client = axios.create({

  baseURL: `${process.env.REACT_APP_BASE_URL}`,
  headers: {
    'Content-type': 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjk3LCJpYXQiOjE2NzMzNjMxMTAsImV4cCI6MTY3MzM2NDkxMH0.RASnG638WYWTBV8IDqKIQug5FRbiMpG4jqeIFMbbryU',
  },
});

export const picmeGetFetcher = (url: string) => client.get(url).then((res) => res.data);
