import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/assets/css/main.css'
import '@/assets/css/media-query.css'

import instance from '@/plugins/axios.js'

Vue.prototype.$axios = instance
    // Vue.use(http)

Vue.config.ignoredElements = [/^ion-/]

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')