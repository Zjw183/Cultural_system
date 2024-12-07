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
]
const router = new VueRouter({
  routes
})
export default new Router({
  routes: [
    
  ]
})
