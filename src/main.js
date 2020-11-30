import Vue from 'vue'
import App from './App.vue'
import router from "./Routers"
import vuetify from './plugins/vuetify';
import VueAnalytics from 'vue-analytics'

Vue.config.productionTip = false

Vue.use(VueAnalytics, {
  id: 'G-7CL6863RH3',
  router
})

new Vue({
  vuetify,
  render: h => h(App),
  router: router
}).$mount('#app')
