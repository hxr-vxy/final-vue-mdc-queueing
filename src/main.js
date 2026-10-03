import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import './composables/useTheme' // applies the saved theme before the first render

createApp(App).use(router).mount('#app')
