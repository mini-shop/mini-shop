<template>
  <van-swipe class="swipe" :autoplay="3000" indicator-color="white">
    <van-swipe-item v-for="item in list" :key="item.id">
      <van-image lazy-load :src="item.image" />
    </van-swipe-item>
  </van-swipe>
</template>

<script>
export default {
  name: 'Swiper',
  props: {
    list: {
      type: Array,
      required: true
    }
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
