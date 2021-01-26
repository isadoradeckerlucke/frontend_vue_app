import { createApp } from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import App from "./App.vue";

/** create and mount app. */

createApp(App)
  .use(VueAxios, axios)
  .mount("#app");
