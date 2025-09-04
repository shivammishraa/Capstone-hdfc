import axios from 'axios';

// const axiosInstance = axios.create({
//   // baseURL: import.meta.env.VITE_API_BASE_URL, // e.g. https://api.example.com
//   baseURL: localhost:8080
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });
const axiosInstance = axios.create({
  baseURL: "http://10.64.156.31:8080",
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login'; // Redirect to login on auth failure
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
