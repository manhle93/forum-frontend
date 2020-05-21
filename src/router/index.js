import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/trangchu/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import("../views/login/login"),
  },
  {
    path: '/dangky',
    name: 'DangKy',
    component: () => import("../views/login/dangky"),
  },
  {
    path: '/baiviet/:id',
    name: 'BaiViet',
    component: () => import("../views/baiviet/baiviet"),
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
