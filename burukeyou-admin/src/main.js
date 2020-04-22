import Vue from 'vue'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import '@/styles/index.scss' // global css
import App from './App'
import store from './store'
import router from './router'
Vue.config.productionTip = false
import '@/icons' // icon
import '@/permission' // permission control

// ======================= UI ===================
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

//======================= 1 - 自定义全局js ========================
import config from "@/utils/Config"
Vue.prototype.$config =  config

import api from "@/api/index"
Vue.prototype.$http = api;



new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
