import axios from 'axios';

// Create an instance of axios to centralise configuration and base URL
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api', 
  
});

// Set up a request interceptor
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('userToken');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axiosInstance;
