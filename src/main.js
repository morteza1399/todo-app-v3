import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "@/App.vue";
import axios from "axios";
import "@/style.css";

const app = createApp(App);
const pinia = createPinia();

axios.interceptors.request.use((config) => {
  return config;
});

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    alert(error.message);
    return Promise.reject(error);
  }
);

app.use(pinia);
app.mount("#app");
