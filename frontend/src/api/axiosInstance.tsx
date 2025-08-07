import axios from "axios";
import { BACKEND_URL } from "../config";

// Create an axios instance
const axiosInstance = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true
});

// Request interceptor to attach access token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle token refresh
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
  
      if (
        (error.response?.status === 401 || error.response?.status === 403) && // include 403
        !originalRequest._retry &&
        error.response?.data?.error === "jwt expired"
      ) {
        originalRequest._retry = true;
        try {
          const res = await axios.post(
            `${BACKEND_URL}/api/auth/refreshToken`, 
            {},
            { withCredentials: true }
          );
  
          const newAccessToken = res.data.accessToken;
          localStorage.setItem("accessToken", newAccessToken);
  
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
  
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          console.error("Refresh token failed:", refreshError);
          return Promise.reject(refreshError);
        }
      }
  
      return Promise.reject(error);
    }
  );

export default axiosInstance;
