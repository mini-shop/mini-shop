import { createApp } from 'vue'
import App from './App.vue'
import './styles/index.scss'
import router from './router'
import { store } from './store'
import registVant from './vant'

const app = createApp(App)
registVant(app)
app.use(router)
app.mount('#app')

