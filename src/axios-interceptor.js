import axios from "axios";

// Request interceptor
export const setupRequestInterceptor = () => {
  axios.interceptors.request.use((config) => {
    return config;
  });
};

// Response interceptor
export const setupResponseInterceptor = () => {
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      alert(error.message);
      return Promise.reject(error);
    }
  );
};
