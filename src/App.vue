<template>
  <div id="app">
    <router-view/>
    <van-tabbar v-model="active" route fixed placeholder>
      <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="search" to="/category">分类</van-tabbar-item>
      <van-tabbar-item icon="friends-o" to="/cart">购物车</van-tabbar-item>
      <van-tabbar-item icon="setting-o" to="/mine">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'App'
})

export default class extends Vue {
  private active = 0
}
</script>
