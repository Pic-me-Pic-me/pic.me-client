import axios from 'axios';

export const client = axios.create({
  baseURL: 'http://3.36.80.168:3000',
  headers: {
    'Content-type': 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQ2LCJpYXQiOjE2NzMyODU2NjIsImV4cCI6MTY3MzI5Mjg2Mn0.jddpT-gfewPMrubCQVfdqGYX1bREumfONU-2wcja6gg',
  },
});
