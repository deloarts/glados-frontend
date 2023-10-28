declare module "vue3-particles"

import { createApp } from "vue"
import { createPinia } from "pinia"
import App from "./App.vue"
import router from "./router"
import Particles from "vue3-particles"

import "@/scss/main.scss"
import "typeface-lobster/index.css"
import "typeface-play/index.css"

const pinia = createPinia()
const app = createApp(App)

app.use(router)
app.use(pinia)
app.use(Particles)
app.mount("#app")
