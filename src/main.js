import Vue from 'vue'
import App from './App.vue'
import router from "./Routers"
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App),
  router: router
}).$mount('#app')
