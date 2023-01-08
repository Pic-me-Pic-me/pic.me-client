import axios from 'axios';

export const client = axios.create({
  baseURL: 'https://ed76eca9-2182-4ba8-9458-3321e7958ab4.mock.pstmn.io',
  headers: {
    'Content-type': 'application/json',
  },
});
