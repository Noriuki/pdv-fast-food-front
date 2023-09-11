import axios from 'axios';

const apiService = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
});

export default apiService;
