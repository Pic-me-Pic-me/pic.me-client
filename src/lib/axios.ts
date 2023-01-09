import axios from 'axios';

export const client = axios.create({
  baseURL: 'http://3.36.80.168:3000',
  headers: {
    'Content-type': 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUwLCJpYXQiOjE2NzMyNTY5NzEsImV4cCI6MTY3MzI2NDE3MX0.I_eXvOjVEyeBlE4N0HSHlhNHkOIVefrMRwKW9mQC1IY',
  },
});
