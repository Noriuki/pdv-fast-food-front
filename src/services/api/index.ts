import axios from 'axios';

const apiService = axios.create({
  baseURL: 'https://charming-bat-costume.cyclic.cloud/api',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
});

export default apiService;
