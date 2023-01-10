import axios from 'axios';

export const client = axios.create({
  baseURL: 'http://3.36.80.168:3000',
  headers: {
    'Content-type': 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQ5LCJpYXQiOjE2NzMyOTA0MDcsImV4cCI6MTY3MzI5NzYwN30.6JdCYcoCb9N4EXbWL1wkT1HMYUN5-zDR8Td1_FaXv28',
  },
});
