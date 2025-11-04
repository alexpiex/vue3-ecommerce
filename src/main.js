import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'


import { createApp } from 'vue'
import router from './router'

import App from './App.vue'


createApp(App)
    .use(router)
    .mount('#app')
