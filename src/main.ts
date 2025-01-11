declare module 'vue3-particles'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import Particles from 'vue3-particles'
import vue3TsJsoneditor from 'vue3-ts-jsoneditor'

import App from './App.vue'
import router from './router'

import '@/scss/main.scss'
import 'typeface-lobster/index.css'
import 'typeface-play/index.css'

const pinia = createPinia()
const app = createApp(App)

app.use(router)
app.use(pinia)
app.use(Particles)
app.use(vue3TsJsoneditor, {
  componentName: 'JsonEditor',
  options: {
    darkTheme: true,
  },
})
app.mount('#app')
