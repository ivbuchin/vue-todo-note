// import { MAX_SAFE_INTEGER } from 'core-js/core/number'
import { createApp } from 'vue'
import store from './store'
import App from './App.vue'
// import router from './router'
import 'bootstrap/dist/js/bootstrap.bundle.min'


// const vueApp = createApp(App)
createApp(App).use(store).mount('#app')
// .use(router)

// main.js > App.vue > router-view > router/index.js > HomeView.vue