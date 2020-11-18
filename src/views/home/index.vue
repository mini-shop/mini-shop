<template>
  <div class="home-page">
    <van-sticky>
      <van-search
        v-model="keywords"
        placeholder="请输入搜索关键词"
        input-align="center"
        clearable />
      <div class="address-and-switch">
        <span class="address">
          <van-icon name="location-o" /> 鲁谷路6号店自提点 <van-icon name="arrow" />
        </span>
        <div class="switch-btn">
          <span :class="{ 'active': switchVal === 1 }" @click="switchVal = 1">自提</span>
          <span :class="{ 'active': switchVal === 2 }" @click="switchVal = 2">外送</span>
        </div>
      </div>
    </van-sticky>
    <van-swipe class="swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in swiperList" :key="item.id">
        <van-image lazy-load :src="item.image" />
      </van-swipe-item>
    </van-swipe>
    <div class="tips">
      <span>
        <van-image lazy-load :src="require('@/assets/icon1.png')" /> 品质囤货
      </span>
      <span>
        <van-image lazy-load :src="require('@/assets/icon2.png')" /> 畅享低价
      </span>
      <span>
        <van-image lazy-load :src="require('@/assets/icon3.png')" /> 自营配送
      </span>
      <span>
        <van-image lazy-load :src="require('@/assets/icon4.png')" /> 会员返现
      </span>
    </div>
    <div class="seckill">
      <div class="title">
        <h1>蜂超市1元菜场</h1>
        <span>新鲜便宜次日达</span>
      </div>
    </div>
    <div class="category">
      <div class="item" v-for="item in category" :key="item.code" @click="jumpToCategory(item.code)">
        <van-image lazy-load :src="item.icon" />
        <span>{{ item.name }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { getSwiper, getCategoryTopTen } from '@/api/index'

@Component
export default class Home extends Vue {
  private keywords = ''
  private switchVal = 1
  private swiperList = []

  private category = []

  private async getSwiper () { // 获取轮播图
    const { data } = await getSwiper()
    this.swiperList = data
  }

  private async getCategory () { // 获取一级分类前十
    const { data } = await getCategoryTopTen()
    this.category = data
  }

  private jumpToCategory (code: number) {
    console.log(code)
    this.$router.replace('/category')
  }

  created () {
    this.getSwiper()
    this.getCategory()
  }
}
</script>

<style lang="scss" scoped>
  .home-page {
    background-color: #fff;
    .address-and-switch {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 12px 10px 12px;
      background-color: #fff;
      .address {
        display: flex;
        justify-self: flex-start;
        align-items: center;
        color: #666;
        font-size: 13px;
      }
      .switch-btn {
        width: 98px;
        height: 26px;
        line-height: 26px;
        border: 1px solid #ef8e48;
        border-radius: 28px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        font-size: 14px;
        color: #ef8e48;
        span {
          width: 49px;
          height: 26px;
          border-radius: 28px;
          display: inline-block;
          text-align: center;
          &.active {
            background-color: #ef8e48;
            color: #fff;
          }
        }
      }
    }
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
    .tips {
      height: 28px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #fdf6ee;
      margin: 10px 14px;
      border-radius: 6px;
      padding: 0 8px;
      span {
        display: flex;
        justify-content: center;
        align-items: center;
        color: #ee7b4c;
        font-size: 12px;
        .van-image {
          width: 16px;
          height: 16px;
          margin-right: 3px;
        }
      }
    }
    .seckill {
      margin: 0 12px;
      width: calc(100% - 24px);
      height: 188px;
      background-image: url('~@/assets/seckill_bg.png');
      background-repeat: no-repeat;
      background-size: 100% 100%;
      .title {
        padding: 12px 14px;
        h1 {
          font-size: 16px;
          margin: 6px 0;
          color: #3a7421;
          display: inline-block;
        }
        span {
          font-size: 12px;
          color: #59923f;
          margin-left: 10px;
        }
      }
    }
    .category {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      padding: 10px 12px;
      .item {
        width: 20%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 12px;
        color: #373737;
        .van-image {
          width: 40px;
        }
        span {
          margin: 8px 0;
        }
      }
    }
  }
</style>
