<template>
  <div id="shop-wrap">
    <keep-alive>
      <router-view :key="routeKey"/>
    </keep-alive>
    <van-tabbar v-model="active" route fixed placeholder active-color="#F18C43" v-if="showTabbar">
      <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="apps-o" to="/category">分类</van-tabbar-item>
      <van-tabbar-item icon="shopping-cart-o" to="/cart">购物车</van-tabbar-item>
      <van-tabbar-item icon="contact" to="/mine">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

export default {
  name: 'App',
  setup (props) {
    const route = useRoute()
    let active = ref(0)
    let showTabbar = ref(true)

    const routeKey = computed(() => {
      return route.path
    })

    return { active, showTabbar, routeKey }
  }
}
</script>

<style lang="css">
  #shop-wrap {
    width: 100%;
  }
</style>
