import axios from 'axios';

export const baseInstance = axios.create({
  //baseURL: `${process.env.REACT_APP_IP}`,
  headers: {
    'Content-type': 'application/json',
  },
});
