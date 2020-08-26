import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/home/index.vue')
  },
  {
    path: '/category',
    name: 'Category',
    component: () => import('@/views/category/index.vue')
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('@/views/cart/index.vue')
  },
  {
    path: '/mine',
    name: 'Mine',
    component: () => import('@/views/mine/index.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
