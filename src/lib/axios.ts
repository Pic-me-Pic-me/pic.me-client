import axios from 'axios';

const client = axios.create({
  baseURL: `${process.env.REACT_APP_IP}`,
  headers: {
    'Content-type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  },
});

export { client };
