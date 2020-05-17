import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import User from './helpers/User';
const url = 'http://127.0.0.1:8000/api'
import axios from 'axios'

window.axios = axios
window.User = User;
window.url = url
Vue.config.productionTip = false
console.log(User.loggedIn())
console.log(User.name(), User.id())
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
