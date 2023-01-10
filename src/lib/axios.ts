import axios from 'axios';

export const client = axios.create({
  baseURL: 'http://3.36.80.168:3000',
  headers: {
    'Content-type': 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQ5LCJpYXQiOjE2NzMzMTgwNDcsImV4cCI6MTY3MzMyNTI0N30.q0Pr9-iigWy2oRHQXKmyQYM9AnIaBIuJXv3I6euvBj8',
  },
});
