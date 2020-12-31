<template>
  <div class="category-page">
    <van-search
        v-model="keywords"
        placeholder="请输入搜索关键词"
        input-align="center"
        clearable />
    <div class="category-swipe swiper-container" ref="categorySwiper">
      <div class="swiper-wrapper">
        <div :class="['swiper-slide', 'swiper-item', swiperMenuIndex === index ? 'active' : '' ]" v-for="(item, index) in categoryList" :key="item.code">
          <van-image lazy-load :src="item.icon" @click="handleSwiperMenuClick(index)" />
          <span>{{ item.name }}</span>
        </div>
      </div>
    </div>
    <div class="category-content">
      <van-sidebar v-model="sidebarMenuIndex" v-if="sidebarMenu" @change="handleSidebarMenuChange">
        <van-sidebar-item v-for="item in sidebarMenu" :key="item.code" :title="item.name" />
      </van-sidebar>
      <div class="product" ref="productWrapper">
        <div class="product-content">
          <shop-item class="product-item" v-for="item in productList" :key="item.code" :shop="item" @click="showDetail(item.code)">
            <van-icon class="add-cart" name="plus" />
          </shop-item>
          <div class="pullup-tips">
            <template v-if="!noMore">
              <div v-if="!loading" class="before-trigger">
                <span class="pullup-txt" style="font-size: 14px;">加载更多</span>
              </div>
              <div v-else class="after-trigger">
                <van-loading size="24px">加载中...</van-loading>
              </div>
            </template>
            <div v-else class="after-trigger">
              <van-divider>到底了！！</van-divider>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { getCategory, getProductList } from '/@/api/index'
import ShopItem from '/@/components/ShopItem/index.vue'
import BScroll from '@better-scroll/core'
import ScrollBar from '@better-scroll/scroll-bar'
import Pullup from '@better-scroll/pull-up'
import Swiper from "swiper";

BScroll.use(ScrollBar)
BScroll.use(Pullup)

export default {
  name: 'Category',
  components: {
    ShopItem
  },
  setup (props, { attrs, emit, expose, slots }) {
    const router = useRouter()
    let keywords = ref('')
    let swiperMenuIndex = ref(0)
    let sidebarMenuIndex = ref(0)
    let categoryList = ref([])
    let productList = ref([])
    let loading = ref(false)
    let scroll = null
    let noMore = ref(false)
    let params = {
      categoryCode: 0,
      isAll: true,
      pageSize: 15,
      pageNum: 1
    }

    const categorySwiper = ref(null)
    const getAllCategory = async () => {
      const { data } = await getCategory()
      categoryList.value = data
      nextTick(() => {
        new Swiper(categorySwiper.value, {
          slidesPerView: 'auto',
          spaceBetween: 12,
          freeMode: true
        })
      })
      const { code } = sidebarMenu.value[sidebarMenuIndex.value]
      await getProduct(code)
    }

    const handleSwiperMenuClick = async (index) => {
      swiperMenuIndex.value = index
      sidebarMenuIndex.value = 0
      handleSidebarMenuChange()
    }

    const handleSidebarMenuChange = () => {
      const { code, parentCode } = sidebarMenu.value[sidebarMenuIndex.value]
      params.isAll = parentCode === 0
      params.pageNum = 1
      productList.value = []
      noMore.value = false
      getProduct(code)
      scroll.scrollTo(0, 0)
    }

    const showDetail = (code) => router.push(`/productDetail/${code}`)

    const sidebarMenu = computed(() => {
      if (categoryList.value.length > 0) {
        let { code, children } = categoryList.value[swiperMenuIndex.value]
        if (children[0].code !== code) {
          children = [
            {
              code: code,
              sort: 1,
              name: '全部分类',
              parentCode: 0
            },
            ...children
          ]
        }
        return children
      } else {
        return []
      }
    })

    const getProduct = async (categoryCode) => {
      params.categoryCode = categoryCode || params.categoryCode
      try {
        loading.value = true
        const { data: { list, totalPage } } = await getProductList(params)
        productList.value = [...productList.value, ...list]
        if (list.length === 0 || params.pageNum >= totalPage) {
          noMore.value = true
          scroll.closePullUp()
        } else {
          scroll.finishPullUp()
          loading.value = false
          params.pageNum++
        }
        nextTick(() => {
          scroll.refresh()
        })
      } catch (e) {
        console.log(e)
      }
    }
    const productWrapper = ref(null)
    onMounted(async (e) => {
      nextTick(() => {
        scroll = new BScroll(productWrapper.value, {
          scrollY: true,
          scrollbar: true,
          pullUpLoad: true,
          click: true
        })
        scroll.on('pullingUp', getProduct)
      })
      await getAllCategory()
    })

    return { keywords, swiperMenuIndex, sidebarMenuIndex, categoryList, productList, loading, scroll, noMore, sidebarMenu, productWrapper, categorySwiper, handleSwiperMenuClick, handleSidebarMenuChange, showDetail }
  }
}
</script>

<style lang="scss" scoped>
.category-page {
  height: calc(100vh - 13.33333vw);
  background-color: #f7f8fa;
  overflow: hidden;
  .category-swipe {
    background-color: #fff;
    padding: 10px 12px;
    .swiper-wrapper {
      display: flex;
      flex-direction: row;
      .swiper-slide {
        width: 56px;
        display: flex;
        flex-grow:0;
        flex-shrink:0;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 12px;
        color: #666;
        .van-image {
          width: 40px;
          height: 40px;
          padding: 1px;
          border: 1px solid #fff;
          border-radius: 18px;
          ::v-deep img {
            height: 44px;
            margin-top: -4px;
          }
        }
        span {
          width: 100%;
          height: 16px;
          line-height: 16px;
          background-color: #fff;
          margin-top: 3px;
          border-radius: 4px;
          text-align: center;
        }
        &.active {
          .van-image {
            border-color: #ef8e48;
          }
          span {
            background-color: #ef8e48;
            color: #fff;
          }
        }
      }
    }
  }
  .category-content {
    height: calc(100% - 136.97px);
    display: flex;
    .van-sidebar {
      width: 78px;
      height: 100%;
      background-color: #f5f5f5;
      .van-sidebar-item {
        background-color: #f5f5f5;
        font-size: 12px;
        color: #696969;
        text-align: center;
      }
    }
    .product {
      width: calc(100vw - 78px);
      height: 100%;
      overflow: hidden;
      position: relative;
      .product-content {
        width: calc(100% - 20px);
        padding: 0 10px;
        background-color: #fff;
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
}
</style>
