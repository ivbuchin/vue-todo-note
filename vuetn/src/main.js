import { createApp } from 'vue'
import store from './store'
import App from './App.vue'
import 'bootstrap/dist/js/bootstrap.bundle.min'

createApp(App).use(store).mount('#app')
