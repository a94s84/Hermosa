import { createApp } from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'
import router from './router'
import 'bootstrap-icons/font/bootstrap-icons.css'

const app = createApp(App)
app.use(VueAxios, axios)
app.use(router)
app.mount('#app')
