import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {
      title: '首页'
    },
    component: () => import('/@/views/home/index.vue')
  },
  {
    path: '/category',
    name: 'Category',
    meta: {
      title: '分类'
    },
    component: () => import('/@/views/category/index.vue')
  },
  {
    path: '/cart',
    name: 'Cart',
    meta: {
      title: '购物车'
    },
    component: () => import('/@/views/cart/index.vue')
  },
  {
    path: '/mine',
    name: 'Mine',
    meta: {
      title: '我的'
    },
    component: () => import('/@/views/mine/index.vue')
  },
  {
    path: '/productDetail/:code',
    name: 'ProductDetail',
    meta: {
      title: '商品详情'
    },
    component: () => import('/@/views/product/detail/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
})

export default router
