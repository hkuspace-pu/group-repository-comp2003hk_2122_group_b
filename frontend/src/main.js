import Vue from 'vue'
import App from './App/App.vue'
import './registerServiceWorker'
import router from './router'
import axios from 'axios'
import store from './store'


Vue.config.productionTip = true

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')




