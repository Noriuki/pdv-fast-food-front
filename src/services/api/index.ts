import axios from 'axios';

const apiService = axios.create({
  baseURL: process.env.NEXT_API_URL || 'http://localhost:3030/api',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
});

export default apiService;
