import { createRouter, createWebHashHistory } from 'vue-router'
// import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Userboard',
    component: () => import('../views/front/Userboard.vue'),
    children: [
      {
        path: '',
        name: '',
        component: () => import('../views/front/Home.vue')
      },
      {
        path: 'cart',
        name: 'cart',
        component: () => import('../views/front/UserCart.vue')
      }, {
        path: 'check',
        name: 'check',
        component: () => import('../views/front/UserCheck.vue')
      }, {
        path: 'checkout/:orderId',
        name: 'checkout',
        component: () => import('../views/front/UserCheckout.vue')
      }, {
        path: 'orderfinish/:orderId',
        name: 'orderfinish',
        component: () => import('../views/front/UserOrderFinish.vue')
      }, {
        path: 'productlist',
        name: 'productlist',
        component: () => import('../views/front/UserPdList.vue')
      },
      {
        path: 'product/:productId',
        name: 'product',
        component: () => import('../views/front/UserProduct.vue')
      },
      {
        path: 'wishlist',
        name: 'wishlist',
        component: () => import('../views/front/UserWishList.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/dashboard',
    component: () => import('../views/back/Dashboard.vue'),
    children: [
      {
        path: 'productlist',
        component: () => import('../views/back/Productlist.vue')
      },
      {
        path: 'orderlist',
        component: () => import('../views/back/Orderlist.vue')
      },
      {
        path: 'coupons',
        component: () => import('../views/back/Coupons.vue')
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('../views/NotFound.vue')
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
