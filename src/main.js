import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import User from "./helpers/User";
const url = "http://127.0.0.1:8000/api";
const ImageUrl = "http://127.0.0.1:8000";
import axios from "./config";
import Echo from "laravel-echo"

window.Pusher = require('pusher-js');
window.Echo = new Echo({
    broadcaster: 'pusher',
    key: '0b1ff6ede72a26bc7c91',
    cluster: "ap1",
    forceTLS: true
});

window.axios = axios;
window.User = User;
window.url = url;
window.ImageUrl = ImageUrl;
Vue.config.productionTip = false;

import VueSimplemde from 'vue-simplemde'
import 'simplemde/dist/simplemde.min.css'

Vue.component('vue-simplemde', VueSimplemde)
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
