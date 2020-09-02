<template>
  <div class="category-page">
    <van-search
      v-model="keywords"
      placeholder="请输入搜索关键词"
      input-align="center"
      clearable />
    <swiper class="category-swipe" ref="categorySwiper" :options="swiperOptions">
      <swiper-slide :class="{ 'active': activeCategoryIndex === index }" v-for="(item, index) in categoryList" :key="item.id">
        <van-image lazy-load :src="item.icon" @click="selectCategory(index, item)" />
        <span>{{ item.name }}</span>
      </swiper-slide>
    </swiper>
    <div class="category-content">
      <van-sidebar v-model="activeSubCategory" v-if="sidebarMenu && sidebarMenu.children" @change="getProductById">
        <van-sidebar-item v-for="item in sidebarMenu.children" :key="item.id" :title="item.name" />
      </van-sidebar>
      <van-list
        class="product"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="getProduct">
          <van-card
            v-for="item in productList"
            :key="item.code"
            :tag="item.label"
            :price="item.price"
            :desc="item.promotion"
            :title="item.name"
            :thumb="item.image"
            :origin-price="item.originPrice" />
      </van-list>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { getCategory, getProductList } from '@/api/index'
import { ICategory, IProduct } from '@/api/types'

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
  private categoryId = 0
  private loading = false
  private finished = false

  private page = {
    pageSize: 10,
    pageNum: 1
  }

  private get sidebarMenu () { // 给左侧分类添加全部分类选项
    const menu = this.categoryList[this.activeCategoryIndex]
    if (menu.children[0].code !== menu.code) {
      menu.children.unshift({
        code: menu.code,
        icon: '',
        id: menu.id,
        name: '全部分类',
        parentCode: null
      })
    }
    return menu
  }

  private getAllCategory () { // 获取全部分类
    getCategory().then(res => {
      this.categoryList = res.data
      this.categoryId = this.categoryList[0].id
    })
  }

  private getProductById () { // 点击左侧分类
    this.categoryId = this.sidebarMenu.children[this.activeSubCategory].id
    this.finished = false
    this.page.pageNum = 1
    this.productList = []
  }

  private getProduct () { // 根据分类id获取商品列表
    const params = {
      categoryId: this.categoryId,
      pageSize: this.page.pageSize,
      pageNum: this.page.pageNum
    }
    getProductList(params).then(res => {
      this.loading = false
      const { list, totalPage } = res.data
      this.productList = [...this.productList, ...list]
      if (totalPage === 0 || this.page.pageNum === totalPage) {
        this.finished = true
      }
      this.page.pageNum++
    })
  }

  private selectCategory (currentIndex: number, category: ICategory) { // 点击顶部一级分类
    this.activeCategoryIndex = currentIndex
    this.categoryId = category.id
    this.finished = false
    this.page.pageNum = 1
    this.productList = []
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
        flex: 1;
        .van-list {
          height: auto;
        }
      }
    }
  }
</style>
