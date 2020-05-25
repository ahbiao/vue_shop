import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'

// 导入全局样式表
import './assets/css/global.css'

import axios from 'axios'
Vue.prototype.$http = axios
axios.defaults.baseURL = 'https://www.liulongbin.top:8888/api/private/v1/'

import 'font-awesome/css/font-awesome.css';
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
