import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "@/App.vue";
import "@/style.css";
import {
  setupRequestInterceptor,
  setupResponseInterceptor,
} from "@/axios-interceptor";

const app = createApp(App);
const pinia = createPinia();

setupRequestInterceptor();
setupResponseInterceptor();

app.use(pinia);
app.mount("#app");
