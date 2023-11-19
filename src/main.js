import Vue from "vue";
import App from "@/App.vue";
import { createPinia, PiniaVuePlugin } from "pinia";
import "@/style.css";

Vue.use(PiniaVuePlugin);
const pinia = createPinia();

new Vue({
  render: (h) => h(App),
  pinia,
}).$mount("#app");
