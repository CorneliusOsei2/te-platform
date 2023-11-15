import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://0.0.0.0:8000/v1/',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json', // Adjust content type as needed
  },
});



export default axiosInstance;
