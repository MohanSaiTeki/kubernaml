import Vue from 'vue'
import App from './App.vue'
import router from "./Routers"
import vuetify from './plugins/vuetify';
import VueGtag from "vue-gtag"

Vue.use(VueGtag, {
  config: { id: "G-7CL6863RH3" }
}, router);

Vue.config.productionTip = false

new Vue({
  vuetify,
  router: router,
  render: h => h(App),
}).$mount('#app')
