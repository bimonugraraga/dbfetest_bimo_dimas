import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import RegLog from '../views/RegLog.vue'
import Payment from '../views/Payment.vue'
import PaymentInfo from '../views/PaymentInfo.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: RegLog
  },
  {
    path: '/new-payment',
    name: 'Payment',
    component: Payment
  },
  {
    path: '/payment-info',
    name: 'PaymentInfo',
    component: PaymentInfo
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
