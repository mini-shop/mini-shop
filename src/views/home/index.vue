<template>
  <van-list class="home-page" @load="handleLoad" offset="50" :immediate-check="false" v-model="loading" :finished="finishedLoading">
    <!-- <van-sticky>
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
    <seckill></seckill>
    <category-menu :list="category"></category-menu>
    <activity></activity>
    <template v-if="category && category.length > 0 && productList && productList.length > 0">
      <div class="category-item">
        <div class="title-image">
          <img :src="category[0].titleImage" :alt="category[0].name">
        </div>
        <div class="list-wrap">
          <shop-item class="product-item" v-for="item in productList[0]" :key="item.code" :shop="item" @click="showDetail(item.code)">
            <van-icon class="add-cart" name="plus" />
          </shop-item>
        </div>
      </div>
      <div class="category-item" v-for="currentIndex of currentCategoryIndex" :key="currentIndex">
        <div class="title-image">
          <img :src="category[currentIndex].titleImage" :alt="category[0].name">
        </div>
        <div class="list-wrap">
          <shop-item class="product-item" v-for="item in productList[currentIndex]" :key="item.code" :shop="item" @click="showDetail(item.code)">
            <van-icon class="add-cart" name="plus" />
          </shop-item>
        </div>
      </div>
    </template> -->
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
  setup (e) {

    let keywords = ref('')
    let switchVal = ref(1)
    let swiperList = reactive([])
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

    onMounted (async () => {
      const { data } = await getSwiper()
      console.log(swiperList)
    })

    return { keywords, switchVal, swiperList, loading, finishedLoading, currentCategoryIndex, category, productList }
  }
}
</script>

<style lang="scss">
  .home {
    font-size: 30px;
    .txt {
      color: red;
    }
  }
</style>
