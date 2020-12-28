import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import router from './router'
import { store } from './store'
import './vant'

import 'vant/lib/index.css'
const app = createApp(App)

router.isReady().then(() => app.mount('#app'))
