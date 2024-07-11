import axios from 'axios';

const axiosInstance = axios.create({ baseURL: "http://localhost:5000", withCredentials: true });
// const axiosInstance = axios.create({ baseURL: "https://afnosaman.onrender.com" });

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;
