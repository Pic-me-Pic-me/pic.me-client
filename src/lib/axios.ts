import axios from 'axios';

export const client = axios.create({
  baseURL: 'http://3.36.80.168:3000',
  headers: {
    'Content-type': 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUyLCJpYXQiOjE2NzMyNjE3NjksImV4cCI6MTY3MzI2ODk2OX0.TOcoNrEe4O3Gpp3OdtFXRQ9noF57ULkLNvf5l7qxAKE',
  },
});
