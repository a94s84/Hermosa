import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/user',
    component: () => import('../views/Userboard.vue'),
    children: [
      {
        path: 'cart',
        component: () => import('../views/UserCart.vue')
      },
      {
        path: 'product/:productId',
        component: () => import('../views/UserProduct.vue')
      }
    ]
  },
  {
    path: '/dashboard',
    component: () => import('../views/Dashboard.vue'),
    children: [
      {
        path: 'productlist',
        component: () => import('../views/Productlist.vue')
      },
      {
        path: 'orderlist',
        component: () => import('../views/Orderlist.vue')
      },
      {
        path: 'coupons',
        component: () => import('../views/Coupons.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
