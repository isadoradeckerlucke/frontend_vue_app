import "@babel/polyfill";
import "mutationobserver-shim";
import { createApp } from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import App from "./App.vue";
import { BootstrapIconsPlugin } from "bootstrap-icons-vue";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

/** create and mount app. */

createApp(App)
  .use(VueAxios, axios)
  .use(BootstrapIconsPlugin)
  .mount("#app");
