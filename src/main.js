import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import { firestorePlugin } from 'vuefire'
import VueResource from 'vue-resource'

Vue.use(VueResource)
Vue.http.options.emulateJSON = true
const http=Vue.http
export default http

Vue.config.productionTip = false;

Vue.use(firestorePlugin)

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
