import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import firestorePlugin from 'vuefire'

Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  firestorePlugin,
  render: h => h(App)
}).$mount('#app')
