import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "@/App.vue";
import "@/style.css";

import {
  setupRequestInterceptor,
  setupResponseInterceptor,
} from "@/axios-interceptor";

import { registerAppComponents } from "@/register-global-component";

const app = createApp(App);
const pinia = createPinia();

setupRequestInterceptor();
setupResponseInterceptor();
registerAppComponents(app);

app.use(pinia);
app.mount("#app");
