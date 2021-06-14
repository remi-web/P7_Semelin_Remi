import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue')

  },
  {
    path: '/messagerie',
    name: 'Messagerie',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Messagerie.vue')
  },
  {
    path: '/profil',
    name: 'Profil',
    component: () => import( '../views/Profil.vue')

  },
  
  {
    path: '/connexion',
    name: 'connexion',
    component: () => import( '../views/connexion.vue')

  },
]

const router = new VueRouter({
  // mode: history,
  routes
})

export default router
