import axios from 'axios';

export const client = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}`,
  headers: {
    'Content-type': 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQ2LCJpYXQiOjE2NzM0NTk1MzEsImV4cCI6MTY3MzQ2MTMzMX0.ejzB7hUYJ8qI_1t7xNPp9xufbvUwd032BhGH_RHnPwo',
  },
});

export const picmeGetFetcher = (url: string) => client.get(url).then((res) => res.data);
