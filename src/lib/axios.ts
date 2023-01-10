import axios from 'axios';

export const client = axios.create({
  baseURL: 'http://3.36.80.168:3000',
  headers: {
    'Content-type': 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUyLCJpYXQiOjE2NzMzMjU2NDIsImV4cCI6MTY3MzMzMjg0Mn0.JuDjMmBkr9_vivFKAKXq2CuiF2FSrm09cxdbvCMLM0k',
  },
});
