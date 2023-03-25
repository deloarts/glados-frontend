declare module "vue3-particles";

import { createApp } from "vue";
import { ref } from 'vue';
import App from "./App.vue";
import router from "./router";
import Particles from "vue3-particles";

import "./assets/main.scss";
import "typeface-lobster/index.css";
import "typeface-play/index.css";

let app = createApp(App);
app.config.globalProperties.$notificationWarning = ref("");
app.config.globalProperties.$notificationInfo = ref("");

app.use(router);
app.use(Particles);
app.mount("#app");
