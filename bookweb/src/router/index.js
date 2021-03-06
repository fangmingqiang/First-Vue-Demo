import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/book',
    name: 'BookShow',
    component: () => import('../views/BookShow')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/bookshow',
    name: 'Book',
    component: () => import('../views/Book.vue'),
    meta: {
      loginRequest: true
    }
  },
  {
    path: '/layout',
    name: 'Layout',
    component: () => import('../views/Layout.vue')
  },
  {
    path: 'register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
