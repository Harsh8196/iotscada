import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Home from '../components/HelloWorld.vue'
import Variable from '../views/Variable.vue'
import About from '../views/About.vue'
import Aakash from '../views/Aakash.vue'
import Alarm from '../views/Alarm.vue'
import Aakashreport from '../views/AakashReport.vue'
import Omkarreport from '../views/OmkarReport.vue'
import Omkar from '../views/Omkar.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/variable',
    name: 'variable',
    component: Variable,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/about',
    name: 'about',
    component: About,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/aakash',
    name: 'aakash',
    component: Aakash,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/alarm',
    name: 'alarm',
    component: Alarm,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/aakashreport',
    name: 'aakashreport',
    component: Aakashreport,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/omkarreport',
    name: 'omkarreport',
    component: Omkarreport,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/omkar',
    name: 'omkar',
    component: Omkar,
    meta: {
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     // if (!localStorage.getItem('isuserlogedin')) {
//     //   next('/login')
//     // } else {
//     //   next()
//     // }
//     window.location.href = to.fullPath
//     next()
//   } else {
//     next()
//   }
// })
router.beforeEach((to, from, next) => {
  // this will recursively go up from child to parent, useful if utilizing children routes. otherwise, you don't need it
  let matchedObject = to.matched.some(record => record.meta.requiresAuth === true)
  if (matchedObject && (from.fullPath !== '/')) {
    console.log('from' + matchedObject)
    if (matchedObject) {
      window.location.href = to.fullPath
      return
    }
  }
  next()
})

export default router
