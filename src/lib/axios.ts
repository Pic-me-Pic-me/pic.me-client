import axios from 'axios';

export const client = axios.create({
  baseURL: 'https://2b75275e-7919-416d-b7e7-2a85c9d3cb70.mock.pstmn.io',
  headers: {
    'Content-type': 'application/json',
  },
});
