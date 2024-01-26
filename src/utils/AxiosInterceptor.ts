import axios from "axios";

export function setupRequestInterceptor() {
  axios.interceptors.request.use((config) => {
    return config;
  });
}

export function setupResponseInterceptor() {
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      alert(error.message);
      return Promise.reject(error);
    }
  );
}
