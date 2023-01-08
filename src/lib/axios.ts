import axios from 'axios';

export const client = axios.create({
  baseURL: 'http://3.36.80.168:3000',
  headers: {
    'Content-type': 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQyLCJpYXQiOjE2NzMyMDE4NjUsImV4cCI6MTY3MzIwOTA2NX0.wZmpURZFSdaB6VWg9oNBW7eZmMJwwgbErMuyPflOIOo',
  },
});
