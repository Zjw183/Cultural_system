/* eslint-disable no-undef */
import Vue from 'vue'
import VueRouter from 'vue-router'
//import HomeView from '../views/HomeView.vue'
import exhibitsofCulture from '../views/exhibitsOfCulture/exhibitsOfCulture_home.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'exhibitsofCulture',
    component:exhibitsofCulture
  },
  {
    path: '/center_content',
    name: 'center_content',
    component: () => import('../views/exhibitsOfCulture/exhibitsOfCulture_center_content.vue')
  },
  {
    path: '/chatbro',
    name: 'chatbro',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */'../views/exhibitsOfCulture/chatbro.vue')
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/exhibit_center',
    name: 'exhibit_center',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/exhibitsOfCulture/exhibit_center.vue')
  },
]
const router = new VueRouter({
  routes
})

export default router
