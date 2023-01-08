import axios from 'axios';

export const client = axios.create({
  baseURL: 'http://3.36.80.168:3000',
  headers: {
    'Content-type': 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQyLCJpYXQiOjE2NzMyMTA0MTQsImV4cCI6MTY3MzIxNzYxNH0.8kuYtOSjW4-ISJTCC4bDpjG9O7Lykfs9t-EBPf3l0ZQ',
  },
});
