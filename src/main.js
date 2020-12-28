import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import router from './router'
import { store } from './store'
import './vant'
const app = createApp(App)

app.use(store)
app.use(router)

router.isReady().then(() => app.mount('#app'))
