import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import VueCookies from 'vue-cookies'
const app = createApp(App).use(store).use(router).use(ElementPlus).use(VueCookies, {
    expires: '7d'
}).mount('#app')
app.$cookies.keys().forEach(cookie => app.$cookies.remove(cookie))
app.$cookies.set('login', JSON.stringify({ A:5}))
// app.$cookies.set('login2', JSON.stringify({ A: 5 }))
// app.$cookies.set('login3', JSON.stringify({ A: 5 }))

// const zzz=app.$cookies.keys() 

// console.log('%c zzz:', 'color: red', zzz);

//app.config.globalProperties.$cookies = VueCookies

//app.config.globalProperties.$store = store;
// import { createApp } from 'vue'
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
// import App from './App.vue'

// const app = createApp(App)

// app.use(ElementPlus)
// app.mount('#app')