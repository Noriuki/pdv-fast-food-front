import axios from 'axios';

const apiService = axios.create({
  baseURL: 'energetic-lamb-leather-jacket.cyclic.cloud/api',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
});

export default apiService;
