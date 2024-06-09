import axios from 'axios';

// Use environment variable for baseURL
const baseURL = process.env.REACT_APP_API_URL || "http://localhost:8081/api";

const axiosInstance = axios.create({
  baseURL
});

export default axiosInstance;
