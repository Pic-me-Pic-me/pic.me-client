import axios from 'axios';

export const client = axios.create({
  //baseURL: `${process.env.REACT_APP_IP}`,
  headers: {
    'Content-type': 'application/json',
  },
});
