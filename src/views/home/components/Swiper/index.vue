<template>
  <van-swipe class="swipe" :autoplay="3000" indicator-color="white">
    <van-swipe-item v-for="item in list" :key="item.id">
      <van-image lazy-load :src="item.image" />
    </van-swipe-item>
  </van-swipe>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="item in list" :key="item.id">
        <van-image lazy-load :src="item.image" />
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue'
import Swiper from 'swiper'
import 'swiper/swiper-bundle.min.css'

export default {
  name: 'Swiper',
  setup (props, context) {
    console.log(props, context)
    return {}
  }
}
</script>

<style lang="scss">
  .swipe {
    width: 100%;
    height: 117px;
    .van-swipe-item {
      width: 100%;
      height: 100%;
      .van-image {
        width: 100%;
        height: 100%;
      }
    }
  }
</style>
