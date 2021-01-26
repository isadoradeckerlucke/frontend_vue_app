import { createApp } from "vue";
// import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import App from "./App.vue";

createApp(App)
  .use(VueAxios, axios)
  .mount("#app");

// const app = createApp(App)
//   .use(VueAxios, axios)
//   .mount("#app");
// app.config.globalProperties.axios = axios;
