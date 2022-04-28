import { createRouter, createWebHashHistory } from 'vue-router'
// import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Userboard',
    component: () => import('../views/Userboard.vue'),
    children: [
      {
        path: '',
        name: '',
        component: () => import('../views/Home.vue')
      },
      {
        path: 'cart',
        name: 'cart',
        component: () => import('../views/UserCart.vue')
      }, {
        path: 'check',
        name: 'check',
        component: () => import('../views/UserCheck.vue')
      }, {
        path: 'checkout/:orderId',
        name: 'checkout',
        component: () => import('../views/UserCheckout.vue')
      }, {
        path: 'productlist',
        name: 'productlist',
        component: () => import('../views/UserPdList.vue')
      },
      {
        path: 'product/:productId',
        name: 'product',
        component: () => import('../views/UserProduct.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('../views/Login.vue')
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
  routes,
  scrollBehavior () {
    return { top: 0 }
  }
})

export default router
