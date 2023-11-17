import Vue from "vue";
import App from "@/App.vue";
import store from "@/store/index";
import "@/style.css";

new Vue({
  render: (h) => h(App),
  store,
}).$mount("#app");
