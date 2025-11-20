// src/api/axiosInstance.js

import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "http://ec2-52-78-72-83.ap-northeast-2.compute.amazonaws.com:3001",
  baseURL: '/api',
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

export default axiosInstance;