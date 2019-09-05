import Vue from 'vue'
import App from './App.vue'
import router from './routers'
import store from './stores'

import axios from 'axios'
import VueAxios from "vue-axios";

Vue.use(VueAxios, axios)

Vue.filter('setWh',(url,arg) => {
  return url.replace(/w\.h/,arg)
})

Vue.config.productionTip = false

import BScroll from '@/components/BScroll'

Vue.component('BScroll',BScroll)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
