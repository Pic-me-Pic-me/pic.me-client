import axios from 'axios';

export const client = axios.create({
  baseURL: 'https://0430d9f5-b8ae-4142-9a00-99d1827940ed.mock.pstmn.io',
  headers: {
    'Content-type': 'application/json',
  },
});
