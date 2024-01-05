import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "@/App.vue";
import "@/style.css";

import {
  setupRequestInterceptor,
  setupResponseInterceptor,
} from "@/utils/axios-interceptor";

import { registerAppComponents } from "@/utils/register-global-component";

const app = createApp(App);
const pinia = createPinia();

setupRequestInterceptor();
setupResponseInterceptor();
registerAppComponents(app);

app.use(pinia);
app.mount("#app");
