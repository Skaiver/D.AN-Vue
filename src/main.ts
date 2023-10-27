import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import $bus from './events/EventBus';

const app = createApp(App)

app.config.globalProperties.$bus = $bus;

app.use(createPinia())
app.use(router)

app.mount('#app')
