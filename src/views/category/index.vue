<template>
  <div class="category-page">
    <van-search
      v-model="keywords"
      placeholder="请输入搜索关键词"
      input-align="center"
      clearable />
    <swiper class="category-swipe" ref="categorySwiper" :options="swiperOptions">
      <swiper-slide :class="{ 'active': currentCategoryIndex === index }" v-for="(item, index) in categoryList" :key="item.code">
        <van-image lazy-load :src="item.icon" @click="selectCategory(index, item.code)" />
        <span>{{ item.name }}</span>
      </swiper-slide>
    </swiper>
    <div class="category-content">
      <van-sidebar v-model="currentSubCategory" v-if="sidebarMenu" @change="getProductByCode">
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

<script lang="ts">
import { Vue, Component, Ref } from 'vue-property-decorator'
import { getCategory, getProductList } from '@/api/index'
import BScroll from '@better-scroll/core'
import ScrollBar from '@better-scroll/scroll-bar'
import Pullup from '@better-scroll/pull-up'
import ShopItem from '@/components/ShopItem'

BScroll.use(ScrollBar)
BScroll.use(Pullup)

@Component({
  name: 'Category',
  components: {
    ShopItem
  }
})
export default class Category extends Vue {
  private keywords = ''
  private swiperOptions: object = {
    slidesPerView: 'auto',
    spaceBetween: 12,
    freeMode: true
  }

  private currentCategoryIndex = 0
  private currentSubCategory = 0
  private categoryList: ICategory.Main[] = []
  private productList: IProduct.List[] = []
  private currentCategory = 1
  private loading = false
  private scroll: BScroll
  private noMore = false

  private getProductListParams: IProduct.ListParams = {
    categoryCode: 0,
    isAll: true,
    pageSize: 15,
    pageNum: 1
  }

  @Ref('productWrapper')
  readonly productRef!: HTMLDivElement

  private async getAllCategory () { // 获取全部分类
    const { data } = await getCategory()
    this.categoryList = data
    this.getProductListParams.categoryCode = this.sidebarMenu[this.currentSubCategory].code
    await this.getProduct()
  }

  private get sidebarMenu (): ICategory.Sub[] { // 获取二级分类
    if (this.categoryList.length > 0) {
      let { code, children } = this.categoryList[this.currentCategoryIndex]
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
  }

  private selectCategory (index: number, code: number) { // 点击顶部一级分类
    this.currentCategoryIndex = index
    this.currentSubCategory = 0
    this.getProductListParams.categoryCode = code
    this.getProductListParams.isAll = true
    this.getProductListParams.pageNum = 1
    this.productList = []
    this.noMore = false
    this.getProduct()
    this.scroll.scrollTo(0, 0)
  }

  private getProductByCode () { // 点击左侧分类
    const { code, parentCode } = this.sidebarMenu[this.currentSubCategory]
    this.getProductListParams.categoryCode = code
    this.getProductListParams.isAll = parentCode === 0
    this.getProductListParams.pageNum = 1
    this.productList = []
    this.noMore = false
    this.getProduct()
    this.scroll.scrollTo(0, 0)
  }

  private showDetail (code: string) {
    console.log(code)
    this.$router.push(`/productDetail/${code}`)
  }

  private async getProduct () { // 根据分类id获取商品列表
    try {
      this.loading = true
      const { data: { list, totalPage } } = await getProductList(this.getProductListParams)
      this.productList = [...this.productList, ...list]
      if (list.length === 0 || this.getProductListParams.pageNum >= totalPage) {
        this.noMore = true
        this.scroll.closePullUp()
      } else {
        this.scroll.finishPullUp()
        this.loading = false
        this.getProductListParams.pageNum++
      }
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    } catch (e) {
      console.log(e)
    }
  }

  async created () {
    await this.getAllCategory()
  }

  mounted () {
    this.$nextTick(() => {
      this.scroll = new BScroll(this.productRef, {
        scrollY: true,
        scrollbar: true,
        pullUpLoad: true,
        click: true
      })
      this.scroll.on('pullingUp', this.getProduct)
    })
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
        .product-content {
          width: calc(100% - 20px);
          padding: 0 10px;
          background-color: #fff;
          .product-item {
            border-top: 1px solid #f4f4f4;
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
