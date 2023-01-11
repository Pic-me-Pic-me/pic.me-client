import axios from 'axios';

export const client = axios.create({
  baseURL: 'https://with-picme-api.com',
  headers: {
    'Content-type': 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQ5LCJpYXQiOjE2NzM0Mzc3OTUsImV4cCI6MTY3MzQzOTU5NX0.46OAPI_oReKzXdfb41oSXkIIqWJ3qUyWmrh9bYqVedA',
  },
});

export const picmeGetFetcher = (url: string) => client.get(url).then((res) => res.data);
