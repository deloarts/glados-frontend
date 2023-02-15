import { createApp } from "vue";
import { ref } from 'vue';
import App from "./App.vue";
import router from "./router";

import "./assets/main.scss";
import "typeface-lobster/index.css"
import "typeface-play/index.css"

let app = createApp(App);
app.config.globalProperties.$notificationWarning = ref("");
app.config.globalProperties.$notificationInfo = ref("");

app.use(router);
app.mount("#app");
