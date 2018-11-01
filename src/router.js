import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Tree from './views/Tree.vue'
import Login from './views/Login.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/:tree',
      name: 'tree',
      component: Tree,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ],
})

// auth guard
router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if(Vue.api.user) next()
    else next({ name: 'login' })
  }
  else next()
})

export default router
