import axios from 'axios';

export const client = axios.create({
  baseURL: 'http://3.36.80.168:3000',
  headers: {
    'Content-type': 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQ1LCJpYXQiOjE2NzMyMzkwNjMsImV4cCI6MTY3MzI0NjI2M30.jRbhdVvvVi1qxfbAUPOi4QqYJFKy1QbaicmvFL1bzM4',
  },
});
