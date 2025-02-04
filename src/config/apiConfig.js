import axios from "axios";

export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Interceptor to attach latest JWT
api.interceptors.request.use(
  (config) => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      config.headers.Authorization = `Bearer ${jwt}`;
    } else {
      delete config.headers.Authorization; // Remove auth header if no token
    }
    return config;
  },
  (error) => Promise.reject(error)
);
