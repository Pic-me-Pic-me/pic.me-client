import axios from 'axios';

const client = axios.create({
  baseURL: process.env.REACT_APP_IP,
  headers: {
    'Content-type': 'application/json',
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQ2LCJpYXQiOjE2NzM0NDE4NTEsImV4cCI6MTY3MzQ0MzY1MX0.FEUT4-arqR9-nbeiPw8BlhbSrOBZbMqKRLkjiPZK2Wk`,
  },
});

export { client };
