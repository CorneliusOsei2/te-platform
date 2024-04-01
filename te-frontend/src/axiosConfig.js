import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://0.0.0.0:8000/v1/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});



export default axiosInstance;
