import axios from 'axios';

export const client = axios.create({
  baseURL: 'http://3.36.80.168:3000',
  headers: {
    'Content-type': 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQ5LCJpYXQiOjE2NzMyNzkxMzksImV4cCI6MTY3MzI4NjMzOX0.0y9WpGAEwYTKZVu4Yal8nT1m2G4XpRyXm3aeLolfRjA',
  },
});
