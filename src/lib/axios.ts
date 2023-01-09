import axios from 'axios';

export const client = axios.create({
  baseURL: 'http://3.36.80.168:3000',
  headers: {
    'Content-type': 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUyLCJpYXQiOjE2NzMyNzY4MjIsImV4cCI6MTY3MzI4NDAyMn0.GsJpPxvBCMRu5xLt3M2npBnsRNhd-cZcWquaTNJR3Rw',
  },
});
