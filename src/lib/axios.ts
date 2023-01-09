import axios from 'axios';

export const client = axios.create({
  baseURL: 'http://3.36.80.168:3000',
  headers: {
    'Content-type': 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUyLCJpYXQiOjE2NzMyNjkwNzksImV4cCI6MTY3MzI3NjI3OX0.UI5oN2DW34GJz6zjnlIDC_JV_KSG9iZFtlQ4elHJKIE',
  },
});
