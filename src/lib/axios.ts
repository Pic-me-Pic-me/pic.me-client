import axios from 'axios';

export const client = axios.create({
  baseURL: 'https://with-picme-api.com',
  headers: {
    'Content-type': 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQ5LCJpYXQiOjE2NzM0NDM0MTcsImV4cCI6MTY3MzQ0NTIxN30.St0-_ezucq5X3UJRpDQy8yWaZGOD7dWEELRT0BBSGkI',
  },
});

export const picmeGetFetcher = (url: string) => client.get(url).then((res) => res.data);
