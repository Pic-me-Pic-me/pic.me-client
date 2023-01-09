import axios from 'axios';

export const client = axios.create({
  baseURL: 'http://3.36.80.168:3000',
  headers: {
    'Content-type': 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQ0LCJpYXQiOjE2NzMyMzMwOTEsImV4cCI6MTY3MzI0MDI5MX0.UrMYjEGXaYtWdXlNlx6dTpJ3ENZvMDr_BpQLT_i-Vp0',
  },
});
