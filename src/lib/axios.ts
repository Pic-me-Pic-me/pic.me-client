import axios from 'axios';

const client = axios.create({
  baseURL: process.env.REACT_APP_IP,
  headers: {
    'Content-type': 'application/json',
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQ2LCJpYXQiOjE2NzM0MjIyMTAsImV4cCI6MTY3MzQyNDAxMH0.MhotxUJdzEhXGGSATYQVdYxMoC2ViStTRVSSdcaP7DE`,
  },
});

export { client };
