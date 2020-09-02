<template>
  <div class="category-page">
    <van-search
      v-model="keywords"
      placeholder="请输入搜索关键词"
      input-align="center"
      clearable />
    <swiper class="category-swipe" ref="categorySwiper" :options="swiperOptions">
      <swiper-slide :class="{ 'active': activeCategoryIndex === index }" v-for="(item, index) in categoryList" :key="item.code">
        <van-image lazy-load :src="item.icon" @click="selectCategory(index, item)" />
        <span>{{ item.name }}</span>
      </swiper-slide>
    </swiper>
    <div class="category-content">
      <van-sidebar v-model="activeSubCategory" v-if="sidebarMenu && sidebarMenu.children" @change="getProductByCode">
        <van-sidebar-item v-for="item in sidebarMenu.children" :key="item.code" :title="item.name" />
      </van-sidebar>
      <div class="product" ref="productWrapper">
        <div class="product-content">
          <van-card
            v-for="item in productList"
            :key="item.code"
            :tag="item.label"
            :price="item.price"
            :desc="item.promotion"
            :title="item.name"
            :thumb="item.image"
            :origin-price="item.originPrice" />
          <div class="pullup-tips">
            <div v-if="!loading" class="before-trigger">
              <span class="pullup-txt">加载更多</span>
            </div>
            <div v-else class="after-trigger">
              <span class="pullup-txt">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Ref } from 'vue-property-decorator'
import { getCategory, getProductList } from '@/api/index'
import { ICategory, IProduct } from '@/api/types'
import BScroll from '@better-scroll/core'
import ScrollBar from '@better-scroll/scroll-bar'
import Pullup from '@better-scroll/pull-up'

BScroll.use(ScrollBar)
BScroll.use(Pullup)

@Component({
  name: 'Category'
})
export default class extends Vue {
  private keywords = ''
  private swiperOptions = {
    slidesPerView: 'auto',
    spaceBetween: 12,
    freeMode: true
  }

  private activeCategoryIndex = 0
  private activeSubCategory = 0

  private categoryList: ICategory[] = []
  private productList: IProduct[] = []
  private categoryCode = 1
  private loading = false
  private selectAll = true
  private scroll = null

  private page = {
    pageSize: 10,
    pageNum: 1
  }

  @Ref('productWrapper')
  readonly productRef

  private get sidebarMenu () { // 给左侧分类添加全部分类选项
    const menu = this.categoryList[this.activeCategoryIndex]
    if (menu && menu.children[0].code !== menu.code) {
      menu.children.unshift({
        code: menu.code,
        icon: '',
        name: '全部分类',
        parentCode: null
      })
    }
    return menu
  }

  private async getAllCategory () { // 获取全部分类
    const { data } = await getCategory()
    this.categoryList = data
    this.categoryCode = this.categoryList[0].code
  }

  private getProductByCode () { // 点击左侧分类
    const currentCategory = this.sidebarMenu.children[this.activeSubCategory]
    this.categoryCode = currentCategory.code
    this.selectAll = currentCategory.parentCode === null
    this.page.pageNum = 1
    this.productList = []
    if (this.finished) {
      this.finished = false
    } else {
      this.getProduct()
    }
  }

  private async getProduct () { // 根据分类id获取商品列表
    const params = {
      categoryCode: this.categoryCode,
      isAll: this.selectAll,
      pageSize: this.page.pageSize,
      pageNum: this.page.pageNum
    }
    this.loading = true
    const { data: { list, totalPage } } = await getProductList(params)
    this.loading = false
    this.scroll.finishPullUp()
    this.productList = [...this.productList, ...list]
    if (totalPage === 0 || this.page.pageNum === totalPage) {
      
    }
    this.page.pageNum++
    this.$nextTick(() => {
      this.scroll = new BScroll(this.productRef, {
        scrollY: true,
        scrollbar: true,
        pullUpLoad: true
      })
      this.scroll.on('pullingUp', this.getProduct)
    })
  }

  private selectCategory (currentIndex: number, category: ICategory) { // 点击顶部一级分类
    this.activeCategoryIndex = currentIndex
    this.activeSubCategory = 0
    this.categoryCode = category.code
    this.page.pageNum = 1
    this.productList = []
    if (this.finished) {
      this.finished = false
    } else {
      this.getProduct()
    }
  }

  created () {
    this.getAllCategory()
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
      .swiper-slide {
        width: 56px;
        display: flex;
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
      }
    }
  }
</style>
