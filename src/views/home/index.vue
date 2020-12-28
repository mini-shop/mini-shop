<template>
  <van-list class="home-page" @load="handleLoad" offset="50" :immediate-check="false" v-model="loading" :finished="finishedLoading">
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
    <swiper :list="swiperList"></swiper>
<!--    <div class="tips">-->
<!--      <span>-->
<!--        <van-image lazy-load :src="require('@/assets/icon1.png')" /> 品质囤货-->
<!--      </span>-->
<!--      <span>-->
<!--        <van-image lazy-load :src="require('@/assets/icon2.png')" /> 畅享低价-->
<!--      </span>-->
<!--      <span>-->
<!--        <van-image lazy-load :src="require('@/assets/icon3.png')" /> 自营配送-->
<!--      </span>-->
<!--      <span>-->
<!--        <van-image lazy-load :src="require('@/assets/icon4.png')" /> 会员返现-->
<!--      </span>-->
<!--    </div>-->
<!--    <seckill></seckill>-->
<!--    <category-menu :list="category"></category-menu>-->
<!--    <activity></activity>-->
<!--    <template v-if="category && category.length > 0 && productList && productList.length > 0">-->
<!--      <div class="category-item">-->
<!--        <div class="title-image">-->
<!--          <img :src="category[0].titleImage" :alt="category[0].name">-->
<!--        </div>-->
<!--        <div class="list-wrap">-->
<!--          <shop-item class="product-item" v-for="item in productList[0]" :key="item.code" :shop="item" @click="showDetail(item.code)">-->
<!--            <van-icon class="add-cart" name="plus" />-->
<!--          </shop-item>-->
<!--        </div>-->
<!--      </div>-->
<!--      <div class="category-item" v-for="currentIndex of currentCategoryIndex" :key="currentIndex">-->
<!--        <div class="title-image">-->
<!--          <img :src="category[currentIndex].titleImage" :alt="category[0].name">-->
<!--        </div>-->
<!--        <div class="list-wrap">-->
<!--          <shop-item class="product-item" v-for="item in productList[currentIndex]" :key="item.code" :shop="item" @click="showDetail(item.code)">-->
<!--            <van-icon class="add-cart" name="plus" />-->
<!--          </shop-item>-->
<!--        </div>-->
<!--      </div>-->
<!--    </template>-->
  </van-list>
</template>

<script>
import { ref, reactive, onMounted } from 'vue'
import Swiper from './components/Swiper/index.vue'
import { getSwiper, getCategoryTopTen, getProductList } from '/@/api/index'
// import Seckill from './components/Seckill/index.vue'
// import CategoryMenu from './components/CategoryMenu/index.vue'
// import Activity from './components/Activity/index.vue'
// import ShopItem from '@/components/ShopItem/index.vue'

export default {
  name: 'Home',
  components: {
    Swiper
  },
  setup (props, context) {
    console.log(props, context)
    let keywords = ref('')
    let switchVal = ref(1)

    let loading = ref(false)
    let finishedLoading = ref(false)
    let currentCategoryIndex = ref(0)
    let category = reactive([])
    let productList = reactive([])
    let params = {
      categoryCode: 0,
      isAll: true,
      pageSize: 15,
      pageNum: 1
    }

    const getCategory = async () => {
      const { data } = await getCategoryTopTen()
      this.category = data
      this.getProduct(this.category[this.currentCategoryIndex].code)
    }

    const getProduct = async () => {
      this.params.categoryCode = categoryCode || this.params.categoryCode
      try {
        this.loading = true
        const { data: { list, totalPage } } = await getProductList(this.params)
        this.productList[this.currentCategoryIndex] = list
        this.currentCategoryIndex < 9 ? this.currentCategoryIndex++ : this.finishedLoading = true
      } catch (e) {
        console.log(e)
      } finally {
        this.loading = false
      }
    }

    const handleLoad = () => {
      this.getProduct(this.category[this.currentCategoryIndex].code)
    }

    let swiperList = reactive([])
    onMounted (async () => {
      const { data } = await getSwiper()
      swiperList = data
    })

    return { keywords, switchVal, swiperList, loading, finishedLoading, currentCategoryIndex, category, productList }
  }
}
</script>

<style lang="scss">
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
    .category-item {
      width: 100%;
      display: flex;
      flex-direction: column;
      .title-image {
        width: 100%;
        img {
          width: 100%;
        }
      }
      .list-wrap {
        background-color: #fff;
        margin: -35px 15px 0 15px;
        border-radius: 6px;
        overflow: hidden;
        .product-item {
          border-bottom: 1px solid #f4f4f4;
          .add-cart {
            width: 22px;
            height: 22px;
            line-height: 22px;
            text-align: center;
            font-size: 18px;
            background-color: #ef8e48;
            color: #fff;
            border-radius: 50%;
            font-weight: 600;
          }
        }
      }
    }
  }
</style>
